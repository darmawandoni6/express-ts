// Declare a global type
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      PORT: string;
      NODE_ENV: "development" | "production";
      DATABASE_URL: string;
      ACCESS_TOKEN: string;
      EXP_TOKEN: string;
    }
  }
  interface ApiResponse<T> {
    success: boolean;
    data: T | null;
    message?: string;
    meta?: unknown;
  }
}

// Ensure TypeScript treats this as a module
export {};
