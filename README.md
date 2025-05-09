🌿 FloraAI: Open Source AI Agent & Swarm Framework
Pronunciation: FLOR-uh-AI /ˈflɔːrə.eɪ.aɪ/

Noun: A powerful, community-driven framework for AI and swarm technological innovation, inspired by the elegance of natural ecosystems.

🌸 Overview
FloraAI is a comprehensive framework designed for building decentralized applications (DApps) with a focus on agent-based architectures, swarm intelligence, and cross-chain operations. It offers both a Command-Line Interface (CLI) for rapid deployment and a flexible API for custom implementations. By leveraging AI-powered agents and swarm optimization, FloraAI enables sophisticated strategies across multiple blockchains.

📚 Documentation
📖 Overview: Project vision and objectives

🤝 Partners: Collaborators and ecosystem participants

🛠️ Technical
🚀 Getting Started: Quick start guide

🏗️ Architecture: System architecture overview

🧑‍💻 Developer Hub: Resources for developers

🌟 Features
🌿 Core Features & Concepts: Fundamental principles and functionalities

🤖 Agents: Intelligent agents and their behaviors

🐝 Swarms: Swarm intelligence mechanisms

🧠 Neural Networks: Integration with neural network models

⛓️ Blockchains: Supported blockchain platforms

🌉 Bridges: Cross-chain bridge implementations

🔌 Integrations: Third-party service integrations

💾 Storage: Data storage solutions

👛 Wallets: Supported cryptocurrency wallets

🚩 Use Cases: Practical applications and examples

🔵 API: Backend API reference
Authentic Florida
+12
All Free Download
+12
Logowik
+12

⚡ Quick Start
Prerequisites
Option 1: Using Docker (Recommended)

Docker (v20.10 or later)

Docker Compose (v2.0 or later)

Option 2: Manual Installation

Node.js (v18 or later)

npm (v7 or later)

Python (v3.8 or later, optional for Python wrapper)

Ensure that node and python commands are available in your system's PATH.

🛠️ Installation and Setup
Option 1: Quick Start with Docker (Recommended)
bash
Copy
Edit
# Clone the repository
git clone https://github.com/florawizard/FloraAI.git
cd FloraAI

# Run FloraAI using the quick start script
chmod +x run-floraai.sh
./run-floraai.sh
This will build and start FloraAI in Docker containers. The CLI will automatically connect to the FloraAI server.

Option 2: Manual Installation
Clone the Repository:

bash
Copy
Edit
git clone https://github.com/florawizard/FloraAI.git
cd FloraAI
Install Node.js Dependencies:

bash
Copy
Edit
npm install
Install Python Dependencies (Optional):

bash
Copy
Edit
# Option 1: Install directly from GitHub (recommended)
pip install git+https://github.com/florawizard/FloraAI.git#subdirectory=packages/python-wrapper

# Option 2: Install with LLM support
pip install "git+https://github.com/florawizard/FloraAI.git@main#egg=floraai[llm]&subdirectory=packages/python-wrapper"

# Option 3: Install with Google ADK support
pip install "git+https://github.com/florawizard/FloraAI.git@main#egg=floraai[adk]&subdirectory=packages/python-wrapper"

# Option 4: For development (after cloning the repository)
cd packages/python-wrapper
pip install -e .
cd ../..
Set Up Environment Variables:

bash
Copy
Edit
# Copy the example environment file
cp .env.example .env
nano .env # Add your keys (OpenAI, RPC URLs, etc.)
Required keys for full functionality:

OPENAI_API_KEY: For OpenAI integration

ETHEREUM_RPC_URL: For Ethereum blockchain interaction

POLYGON_RPC_URL: For Polygon blockchain interaction

SOLANA_RPC_URL: For Solana blockchain interaction

ARBITRUM_RPC_URL: For Arbitrum blockchain interaction

OPTIMISM_RPC_URL: For Optimism blockchain interaction

AVALANCHE_RPC_URL: For Avalanche blockchain interaction

BSC_RPC_URL: For Binance Smart Chain interaction

BASE_RPC_URL: For Base blockchain interaction

ARWEAVE_WALLET_FILE: Path to your Arweave wallet file (for decentralized storage)

ANTHROPIC_API_KEY: For Claude integration

COHERE_API_KEY: For Cohere integration

MISTRAL_API_KEY: For Mistral integration

GOOGLE_API_KEY: For Gemini integration
Authentic Florida
+8
LinkedIn
+8
FanBuzz
+8

Build the Project (if not using Docker):

bash
Copy
Edit
npm run build
🧪 Local Machine Deployment and Running Guide
Use Git Bash or another Unix-like terminal for Windows users.

Clone the Repository:

bash
Copy
Edit
git clone --single-branch --branch main https://github.com/florawizard/FloraAI.git
cd FloraAI
Install Node.js Dependencies:

bash
Copy
Edit
npm install --force
Install Python Dependencies (Optional):

bash
Copy
Edit
# Option 1: Install directly from GitHub (recommended)
pip install git+https://github.com/florawizard/FloraAI.git#subdirectory=packages/python-wrapper

# Option 2: Install with LLM support
pip install "git+https://github.com/florawizard/FloraAI.git@main#egg=floraai[llm]&subdirectory=packages/python-wrapper"

# Option 3: Install with Google ADK support
pip install "git+https://github.com/florawizard/FloraAI.git@main#egg=floraai[adk]&subdirectory=packages/python-wrapper"
Alternative: Start the FloraAI Server and Run the Interactive CLI in Two Separate Terminals:

Run build command:

bash
Copy
Edit
npm run build
Terminal 1: Start the FloraAI Server

bash
Copy
Edit
cd server
# Activate the environment and install packages
# This might take some time on the first run as it downloads and precompiles packages
python server.py
Wait until you see messages indicating the server has started (e.g., "Server started successfully on localhost:8052"). The server will initialize all modules and display their status.

Terminal 2: Run the Interactive CLI

bash
Copy
Edit
# Ensure you are in the project root directory (FloraAI)
# If not, cd back to it

# Run the interactive CLI script
node scripts/interactive.cjs
You should now see the FloraAI CLI menu with options for Agent Management, Swarm Intelligence, Blockchain Operations, and more.

🧑‍🤝‍🧑 Community & Contribution
FloraAI is an open-source project, and we welcome contributions from the community! Whether you're a developer, researcher, or enthusiast in decentralized technologies, AI, and blockchain, there are many ways to get involved.

Join Our Community
The primary hub for the FloraAI community is our GitHub repository:

GitHub Repository: https://github.com/florawizard/FloraAI

Issues: Report bugs, request features, or discuss specific technical challenges.

Discussions: (Consider enabling GitHub Discussions) For broader questions, ideas, and community conversations.

Pull Requests: Contribute code, documentation, and improvements.

Ways to Contribute
We appreciate all forms of contributions, including but not limited to:

💻 Code Contributions:

Implementing new features for agents, swarms, or neural network capabilities.

Adding support for new blockchains or bridges.

Improving existing code, performance, or security.

Writing unit and integration tests.

Developing new use cases or example applications.

📖 Documentation:

Improving existing documentation for clarity and completeness.

Writing new tutorials or guides.

Adding examples to the API reference.

Translating documentation.

🐞 Bug Reports & Testing:

Identifying and reporting bugs with clear reproduction steps.

Helping test new releases and features.

💡 Ideas & Feedback:

Suggesting new features or enhancements.
