This is a node.js express server.

## Getting Started

### Prerequites:

1. Get a google oauth client credentials
2. Create a .env.local file with the following env variables

```bash
MONGODB_USERNAME = 'xxx'
MONGODB_PASSWARD = 'xxx'
MONGODB_CLUSTER_HOSTNAME = 'xxx'
MONGODB_DB_NAME = 'xxx'
ETHEREUM_NETWORK_SEPOLIA = 'sepolia'
INFURA_API_KEY = 'xxx'
```

First, run the server:

```bash
PORT=3001 nodemon server.js
```

Use postman script to test the APIs.
