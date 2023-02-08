export const createError = (status, message) => {
  const err = new Error();
  err.stack = status;
  err.message = message;
  return err;
};
