exports.generalResponse = (
  response,
  data = null,
  message = "",
  responseType = "success",
  toast = false,
  statusCode = 200
) => {
  response.status(statusCode).send({
    data: data,
    message: message,
    toast: toast,
    response_type: responseType,
  });
};
