module.exports = async (ctx, next) => {

  let entity;
  entity = await strapi.services.idea.findOne(ctx.params);
  if (entity.user_creator.id == ctx.state.user.id) {
    return await next();
  }
  ctx.unauthorized("Not idea creator!");
};
