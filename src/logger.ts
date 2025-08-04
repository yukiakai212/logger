import ms from 'ms';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { esm, cjs, cjsNon } from './extractor.js';

export type LogLevel = 'silent' | 'fatal' | 'error' | 'warn' | 'info' | 'debug';

const levels: Record<LogLevel, number> = {
  silent: 0,
  fatal: 10,
  error: 20,
  warn: 30,
  info: 40,
  debug: 50,
};

export class Logger {
  static level: LogLevel = (process.env.LOG_LEVEL as any) || 'info';
  static path: string;
  static time: number;
  private static shouldLog(targetLevel: LogLevel) {
    const file = this.filename();
    if (this.path) {
      const pathFileCustom = path.resolve(this.path);
      if (!file.startsWith(pathFileCustom)) return false;
    } else if (file.includes('node_modules')) {
      return false;
    }
    return levels[targetLevel] <= levels[this.level];
  }
  private static shouldLogTest(targetLevel: LogLevel) {
    return this.shouldLog(targetLevel);
  }
  private static filename() {
    const depth = 4;
    const e = new Error();
    const stack = e.stack.split('\n')[depth];
    const file = esm(stack) || cjs(stack) || cjsNon(stack);
    if (process.env?.DEBUG === 'vanipath') console.log('debug stack', stack);
    return file ? (file.startsWith('file') ? fileURLToPath(file) : file) : null;
  }
  private static metadata(): string {
    const file = path.basename(this.filename());

    const now = Date.now();
    const time = this.time ? ms(now - this.time) : ms(0);
    this.time = now;
    return `[${file}][+${time}]`;
  }
  static fatal(...args: any[]) {
    if (this.shouldLog('fatal')) console.error('[FATAL]' + this.metadata(), ...args);
  }

  static error(...args: any[]) {
    if (this.shouldLog('error')) console.error('[ERROR]' + this.metadata(), ...args);
  }

  static warn(...args: any[]) {
    if (this.shouldLog('warn')) console.warn('[WARN]' + this.metadata(), ...args);
  }

  static info(...args: any[]) {
    if (this.shouldLog('info')) console.log('[INFO]' + this.metadata(), ...args);
  }

  static debug(...args: any[]) {
    if (this.shouldLog('debug')) console.debug('[DEBUG]' + this.metadata(), ...args);
  }
}
export const logger = Logger;
