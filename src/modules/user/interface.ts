export interface UserAttributes {
  id: number;
  username: string;
  password: string;
}

export interface IError {
  error?: string;
}

export interface RequestBody {
  username: string;
  password: string;
  roleId?: number;
}
export interface ResValidation extends IError {
  value?: RequestBody;
}

export interface ILogin {
  token: string;
  expired: Date;
}

export interface IResult extends IError {
  data?: ILogin | UserAttributes | null;
}

export interface ResponseBody extends IResult {
  message: string;
  status: number;
}

export type IWhere = {
  id?: number;
  username?: string;
};

export type TEdit = {
  id: number;
  payload: RequestBody;
};
