// Declare a global type
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      PORT: string;
      NODE_ENV: string;
      DATABASE_HOST: string;
      DATABASE_NAME: string;
      DATABASE_PORT: string;
      DATABASE_USER: string;
      DATABASE_PASSWORD: string;
      DATABASE_URL: string;
      ACCESS_TOKEN: string;
      EXP_TOKEN: string;
    }
  }
  interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
  }
}

// Ensure TypeScript treats this as a module
export {};
