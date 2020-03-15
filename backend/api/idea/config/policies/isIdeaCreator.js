module.exports = async (ctx, next) => {
  let entity;
  entity = await strapi.services.idea.findOne(ctx.params);
  let creator = (entity.user_creator.id == ctx.state.user.id);
  if (creator) {
    return await next();
  }
  ctx.unauthorized("Not idea creator!");;
};
