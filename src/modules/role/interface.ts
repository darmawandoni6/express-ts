export interface RoleAtributes {
  id: number;
  name: string;
  status: boolean;
}

export interface RequestBody {
  name: string;
  status: boolean;
}
export interface ResValidation extends IError {
  value?: RequestBody;
}

export interface ResponseBody extends IResult {
  message: string;
  status: number;
}

export interface IError {
  error?: string;
}
export interface IResult extends IError {
  data: RoleAtributes | RoleAtributes[] | null;
}

export type TWhere = {
  id?: number;
  name?: string;
  status?: boolean;
};
