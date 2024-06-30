export type Pagination = {
  page: number;
  perPage: number;
  lastPage: number;
  count: number;
};

export type ResJSON<T = null> = {
  status: number;
  data: T;
  message: string;
  meta?: Pagination;
};

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
}
