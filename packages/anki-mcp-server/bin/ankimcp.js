#!/usr/bin/env node

// Runtime Node.js version check (require(esm) needs Node 20.19+ or 22.12+)
const [major, minor] = process.versions.node.split('.').map(Number);
if (
    (major < 20) ||
    (major === 21) ||
    (major === 20 && minor < 19) ||
    (major === 22 && minor < 12)
) {
  console.error(
    `Error: Node.js ${process.versions.node} is not supported.\n` +
    'This package requires Node.js 20.19.0+ or 22.12.0+ (Node 21.x is not supported).\n' +
    'Download: https://nodejs.org/'
  );
  process.exit(1);
}

if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log('Usage: anki-card-builder-mcp --stdio [--read-only] [--anki-connect URL]');
  console.log('Requires Anki with AnkiConnect. See https://github.com/Jia-57/anki-card-builder');
  process.exit(0);
}

// Determine mode based on CLI flags
const isStdioMode = process.argv.includes('--stdio');
const isTunnelMode = process.argv.some(arg =>
  arg === '--tunnel' ||
  arg.startsWith('--tunnel=') ||
  arg === '--login' ||
  arg === '--logout'
);

if (isTunnelMode) {
  console.error('Remote tunnel mode is not supported by this fork. Use --stdio with a local MCP client.');
  process.exit(1);
}

if (isStdioMode) {
  // STDIO mode - for MCP clients like Cursor, Cline, Zed, etc.
  require('../dist/main-stdio.js');
} else if (isTunnelMode) {
  // Tunnel mode - for remote MCP access via tunnel service
  require('../dist/main-tunnel.js');
} else {
  // HTTP mode (default) - for web-based AI assistants
  require('../dist/main-http.js');
}
