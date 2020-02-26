module.exports = async (ctx, next) => {
  console.log(ctx.state)
  return await next();
};
