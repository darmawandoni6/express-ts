export type ResponseBody<T = null> = {
  message: string;
  status: 200 | 400 | 404 | 500;
  data: T;
};
