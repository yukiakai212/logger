
# @yukiakai/logger

[![NPM Version][npm-version-image]][npm-url]
[![NPM Downloads][npm-downloads-image]][npm-downloads-url]

[![Build Status][github-build-url]][github-url]
[![codecov][codecov-image]][codecov-url]

A lightweight **static logger** for Node.js using native `console.log` but with log levels and `debug`-style control. Zero dependencies.

> **Human-friendly output.**  
> Keep Node's beautiful console formatting, but control `level` like `pino` or `debug`.

---

## 🚀 Features

- Uses Node.js **native `console`**, keeps `util.inspect` formatting (colors, depth, etc.)
- Support `debug`, `info`, `warn`, `error`, `fatal`, `silent`
- **Static & global**, no instance needed.
- Control log level via `process.env.LOG_LEVEL` or code.
- Filter logs by caller file path via `Logger.path`.
- No dependencies. Zero overhead.

---

## 📦 Install

```bash
npm i @yukiakai/logger
```

---

## 🔧 Usage

#### ESM (TS)

```ts
import { Logger } from '@yukiakai/logger';

// Set level once (global, static)
Logger.level = process.env.LOG_LEVEL as any || 'info';

// Custom filter log path
Logger.path = './src/';

Logger.info('Server started', { port: 3000 });
Logger.debug('Debug data', { foo: 123, bar: 456 });
Logger.warn('Warning', 'some detail');
Logger.error('Something failed', new Error('Oops'));
```

#### CJS

```ts
const { Logger } = require('@yukiakai/logger');

// Set level once (global, static)
Logger.level = process.env.LOG_LEVEL || 'info';

// Custom filter log path
Logger.path = './src/';

Logger.info('Server started', { port: 3000 });
Logger.debug('Debug data', { foo: 123, bar: 456 });
Logger.warn('Warning', 'some detail');
Logger.error('Something failed', new Error('Oops'));
```

### Output example:

```
[INFO] Server started { port: 3000 }

[DEBUG] Debug data {
  foo: 123,
  bar: 456
}

[WARN] Warning some detail

[ERROR] Something failed Error: Oops
    at ...
```

---

## 🌈 Why?

- You **don’t want to delete `console.log`** everywhere when done debugging.
- You **love Node’s `console.log(a, b, c)`** style (no JSON lines, no forced format).
- You want `debug`-style control, but for **structured console output**.
- **No external packages. No bloat.**

---

## 🔧 Log Levels

| Level   | Logs           |
|----------|----------------|
| `fatal` | Fatal only      |
| `error` | Error + Fatal   |
| `warn`  | Warn + Error    |
| `info`  | Info + Warn + Error |
| `debug` | All logs        |
| `silent`| Nothing         |

Set via:

```bash
LOG_LEVEL=debug node app.js
```

Or in code:

```ts
Logger.level = 'warn';
```

## 🔧 Log Path

You can configure the logger to only log messages when called from specific files by setting the `Logger.path` option.

Set via code

```ts
Logger.path = './src/';
```
#### Default behavior

If `Logger.path` is not set, the logger will **log from all files under the current working directory (`process.cwd()`)**, excluding any files inside `node_modules/`.

---

## 🗂️ API

| Method | Description |
|---------|-------------|
| `Logger.debug(...args)` | Debug logs |
| `Logger.info(...args)` | Info logs |
| `Logger.warn(...args)` | Warn logs |
| `Logger.error(...args)` | Error logs |
| `Logger.fatal(...args)` | Fatal logs |

All methods accept `console.log` style arguments:  
`log(a, b, c, {d: 1})`

---

## 📦 Changelog

See full release notes in [CHANGELOG.md][changelog-url]

---


## 🛡️ License

MIT © [Yuki](https://github.com/yukiakai212/)

---

[npm-downloads-image]: https://badgen.net/npm/dm/@yukiakai/logger
[npm-downloads-url]: https://www.npmjs.com/package/@yukiakai/logger
[npm-url]: https://www.npmjs.com/package/@yukiakai/logger
[npm-version-image]: https://badgen.net/npm/v/@yukiakai/logger
[github-build-url]: https://github.com/yukiakai212/logger/actions/workflows/build.yml/badge.svg
[github-url]: https://github.com/yukiakai212/logger/
[codecov-image]: https://codecov.io/gh/yukiakai212/logger/branch/main/graph/badge.svg
[codecov-url]: https://codecov.io/gh/yukiakai212/logger
[changelog-url]: https://github.com/yukiakai212/logger/blob/main/CHANGELOG.md
