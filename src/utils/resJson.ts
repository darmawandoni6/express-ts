export const resJson = <T, M = null>(code: number, data?: T, pagination?: M) => {
  return {
    status: code,
    data: data ?? null,
    message: "success",
    pagination,
  };
};
