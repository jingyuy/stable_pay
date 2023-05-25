This is a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Getting Started

### Prerequites:

Create a .env file with the following env variables

```bash
PAYMENT_API_URL="http://localhost:3000"
PAYMENT_API_USER="xxxx"
PAYMENT_API_PASSWORD="xxxx"
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

The port is 8080.

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
