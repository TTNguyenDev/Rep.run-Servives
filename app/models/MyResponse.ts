type MyResponse = {
  status: string;
  error?: string;
  result?: any;
};

const failedResponse = (msg: string): MyResponse => ({
  status: "failed",
  error: msg,
});

const successResponse = (result: any = {}): MyResponse => ({
  status: "success",
  result: result,
});

export { failedResponse, successResponse };
