export type LogLevel = 'silent' | 'fatal' | 'error' | 'warn' | 'info' | 'debug';

const levels: Record<LogLevel, number> = {
  silent: 0,
  fatal: 10,
  error: 20,
  warn: 30,
  info: 40,
  debug: 50,
};

export class logger {
  static level: LogLevel = (process.env.LOG_LEVEL as any) || 'info';
  private static shouldLog(targetLevel: LogLevel) {
    return levels[targetLevel] <= levels[this.level];
  }

  static fatal(...args: any[]) {
    if (this.shouldLog('fatal')) console.error('[FATAL]', ...args);
  }

  static error(...args: any[]) {
    if (this.shouldLog('error')) console.error('[ERROR]', ...args);
  }

  static warn(...args: any[]) {
    if (this.shouldLog('warn')) console.warn('[WARN]', ...args);
  }

  static info(...args: any[]) {
    if (this.shouldLog('info')) console.log('[INFO]', ...args);
  }

  static debug(...args: any[]) {
    if (this.shouldLog('debug')) console.debug('[DEBUG]', ...args);
  }
}
export const Logger = logger;
