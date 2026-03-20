#!/usr/bin/env node
import { UIUXProServer } from './server';

async function main() {
  const server = new UIUXProServer();
  await server.run();
}

main().catch((error) => {
  console.error('Fatal error starting UI/UX Pro server:', error);
  process.exit(1);
});
