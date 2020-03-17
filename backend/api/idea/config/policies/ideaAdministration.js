'use strict';

module.exports = async (ctx, next) => {
  let loc;
  let idea;

  idea = await strapi.query("idea").findOne(ctx.params);
  if (!idea) {
    ctx.throw(400, "idea not found!");
  }
  loc = await strapi.query("location").findOne(idea.location);

  let creator = (idea.user_creator.id == ctx.state.user.id);
  let admin = (idea.admins.find(element => element.id == ctx.state.user.id) != undefined);
  let locadmin = (loc.admins.find(element => element.id == ctx.state.user.id) != undefined);
  let msg;

  // can edit  if idea creator or admin
  if (ctx.request.method == "PUT" && (creator || admin)) {
    return await next();
  } else {
    msg = " Cannot edit!";
  }
  // can delete if idea creator or location admin
  if (ctx.request.method == "DELETE" && (creator || locadmin)) {
    return await next();
  } else {
    msg = " Cannot delete!";
  }

  ctx.unauthorized("Insufficient Privileges." + msg);
};
