This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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
