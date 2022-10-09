const catchAsync = (fn) => {
  return (ctx, next) => {
    fn(ctx, next).catch((err) => next(err));
  };
};
export default catchAsync;
