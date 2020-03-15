module.exports = async (ctx, next) => {
  let entity;
  entity = await strapi.services.idea.findOne(ctx.params);
  let creator = (entity.user_creator.id == ctx.state.user.id);
  let admin = (entity.admins.find(element => element.id == ctx.state.user.id) != undefined);
  if (creator || admin) {
    return await next();
  }
  ctx.unauthorized("Insufficient Privileges.");
};
