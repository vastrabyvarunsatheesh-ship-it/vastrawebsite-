export type LogLevel = "debug" | "info" | "warn" | "error";

export interface LogPayload {
  message: string;
  level: LogLevel;
  timestamp: string;
  context?: Record<string, unknown>;
  traceId?: string;
  isAudit?: boolean;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV !== "production";

  private formatLog(level: LogLevel, message: string, context?: Record<string, unknown>, isAudit = false): LogPayload {
    return {
      message,
      level,
      timestamp: new Date().toISOString(),
      ...(context && { context }),
      ...(isAudit && { isAudit: true }),
    };
  }

  debug(message: string, context?: Record<string, unknown>) {
    if (this.isDevelopment || process.env.LOG_LEVEL === "debug") {
      console.info(JSON.stringify(this.formatLog("debug", message, context)));
    }
  }

  info(message: string, context?: Record<string, unknown>) {
    console.info(JSON.stringify(this.formatLog("info", message, context)));
  }

  warn(message: string, context?: Record<string, unknown>) {
    console.warn(JSON.stringify(this.formatLog("warn", message, context)));
  }

  error(message: string, error?: Error | unknown, context?: Record<string, unknown>) {
    const errorDetails = error instanceof Error
      ? { name: error.name, message: error.message, stack: error.stack }
      : { rawError: error };

    console.error(
      JSON.stringify(
        this.formatLog("error", message, { ...context, error: errorDetails })
      )
    );
  }

  audit(action: string, actorId: string, details: Record<string, unknown>) {
    if (process.env.ENABLE_AUDIT_LOGS !== "false") {
      console.info(
        JSON.stringify(
          this.formatLog("info", `[AUDIT] ${action}`, { actorId, ...details }, true)
        )
      );
    }
  }
}

export const logger = new Logger();
