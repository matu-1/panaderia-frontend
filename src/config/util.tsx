import { OFF_SERVER_ERROR } from "./../constants";

function isNetworkError(err) {
  return !!err.isAxiosError && !err.response;
}
export interface ErrorServer {
  statusCode: number;
  error: string;
  message: string | object;
}
function HandleError(
  statusCode,
  message,
  error = OFF_SERVER_ERROR
): ErrorServer {
  return { statusCode: statusCode, message: message, error: error };
}
export { isNetworkError, HandleError };
