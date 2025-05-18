import { EventEmitter } from 'events';
import { TwitterApi, TweetV2 } from 'twitter-api-v2';
import { Platform, PlatformConfig, MessageData } from '@floraai/core';

// Define interfaces to match the Platform abstract class requirements
export interface TwitterApiTokens {
  appKey: string;
  appSecret: string;
  accessToken: string;
  accessSecret: string;
}

export interface TwitterConfig extends PlatformConfig {
  parameters: TwitterApiTokens & {
    commandPrefix: string;
    autoReply?: boolean;
    mentionsOnly?: boolean;
  };
}

export class TwitterConnector extends Platform {
  private client: TwitterApi;
  private commandPrefix: string;
  private autoReply: boolean;
  private mentionsOnly: boolean;
  private userId?: string;
  private streamRules: Map<string, string> = new Map();

  constructor(config: TwitterConfig) {
    super(config);
    this.commandPrefix = config.parameters.commandPrefix;
    this.autoReply = config.parameters.autoReply || false;
    this.mentionsOnly = config.parameters.mentionsOnly || false;
    
    this.client = new TwitterApi({
      appKey: config.parameters.appKey,
      appSecret: config.parameters.appSecret,
      accessToken: config.parameters.accessToken,
      accessSecret: config.parameters.accessSecret
    });
  }

  async connect(): Promise<void> {
    try {
      const me = await this.client.v2.me();
      this.userId = me.data.id;
      await this.setupStreamRules();
      await this.startStreaming();
      this.setConnected(true);
      console.log(`Twitter connector ${this.name} connected successfully`);
    } catch (error) {
      console.error('Failed to connect to Twitter:', error);
      this.emit('error', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.cleanupStreamRules();
      this.setConnected(false);
      console.log(`Twitter connector ${this.name} disconnected`);
    } catch (error) {
      console.error('Failed to disconnect from Twitter:', error);
      this.emit('error', error);
      throw error;
    }
  }

  async start(): Promise<void> {
    if (!this.isActive()) {
      await this.connect();
    }
  }

  async stop(): Promise<void> {
    if (this.isActive()) {
      await this.disconnect();
    }
  }

  async sendMessage(message: string, recipientId: string): Promise<void> {
    try {
      if (recipientId.startsWith('tweet:')) {
        const tweetId = recipientId.replace('tweet:', '');
        await this.client.v2.reply(message, tweetId);
      } else {
        await this.client.v1.sendDm({
          recipient_id: recipientId,
          text: message
        });
      }
    } catch (error) {
      console.error('Failed to send Twitter message:', error);
      this.emit('error', error);
      throw error;
    }
  }

  private async setupStreamRules() {
    await this.cleanupStreamRules();

    const rules = [];

    if (this.mentionsOnly) {
      rules.push({ value: `@${this.userId}` });
    }

    if (this.commandPrefix) {
      rules.push({ value: `${this.commandPrefix}` });
    }

    if (rules.length > 0) {
      const result = await this.client.v2.updateStreamRules({ add: rules });
      result.data?.forEach(rule => {
        this.streamRules.set(rule.id, rule.value);
      });
    }
  }

  private async cleanupStreamRules() {
    const rules = await this.client.v2.streamRules();
    if (rules.data?.length) {
      await this.client.v2.updateStreamRules({
        delete: { ids: rules.data.map(rule => rule.id) }
      });
    }
    this.streamRules.clear();
  }

  private async startStreaming() {
    const stream = await this.client.v2.searchStream({
      'tweet.fields': ['referenced_tweets', 'author_id', 'created_at'],
      'user.fields': ['username'],
      expansions: ['author_id', 'referenced_tweets.id']
    });

    stream.on('data', async (tweet: TweetV2) => {
      if (tweet.author_id === this.userId) return;
      await this.processTweet(tweet);
    });

    stream.on('error', error => {
      console.error('Twitter stream error:', error);
      this.emit('error', error);
    });
  }

  private async processTweet(tweet: TweetV2) {
    try {
      const tweetText = tweet.text;
      const author = tweet.author_id;
      const tweetId = tweet.id;
      const createdAt = tweet.created_at ? new Date(tweet.created_at) : new Date();

      if (tweetText.startsWith(this.commandPrefix)) {
        const commandContent = tweetText.slice(this.commandPrefix.length).trim();
        const commandParts = commandContent.split(/\s+/);
        const command = commandParts[0];
        const args = commandParts.slice(1);

        this.emit('command', {
          command,
          args,
          content: commandContent,
          sender: author,
          tweetId,
          timestamp: createdAt
        });
        return;
      }

      const messageData: MessageData = {
        content: tweetText,
        sender: author || 'unknown',
        channelId: `tweet:${tweetId}`,
        timestamp: createdAt
      };

      this.emit('message', messageData);

      if (this.autoReply) {
        await this.client.v2.reply('Thank you for your tweet! I am an automated agent.', tweetId);
      }
    } catch (error) {
      console.error('Error processing tweet:', error);
      this.emit('error', error);
    }
  }
}
