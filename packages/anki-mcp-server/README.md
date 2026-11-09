# Anki Card Builder MCP

This package is an independent fork of [Anki MCP Server](https://github.com/ankimcp/anki-mcp-server) by Anatoly Tarnavsky. It provides the MCP server used by [Anki Card Builder](https://github.com/Jia-57/anki-card-builder). It requires Anki and the [AnkiConnect add-on](https://github.com/FooSoft/anki-connect). The npm package installs the server only; the skill is distributed in the repository.

## Install from npm

```sh
npm install -g @cardbuilder/anki-card-builder
```

Start an MCP stdio connection with command `anki-card-builder-mcp` and argument `--stdio`. For local Streamable HTTP, run `anki-card-builder-mcp` and connect to `http://127.0.0.1:3000/`.

## Local build

```sh
npm ci
npm run build
npm install -g .
anki-card-builder-mcp --help
```


## Upstream and changes

Derived from [ankimcp/anki-mcp-server](https://github.com/ankimcp/anki-mcp-server), commit `e0e347f` (upstream package version 0.27.0). This fork changes `createDeck` to allow deck names with more than two hierarchy levels and updates its tool description, manifest, and tests. The original MIT copyright and permission notice remain in [LICENSE](LICENSE).

This is an independent fork and is not affiliated with the upstream maintainers.
