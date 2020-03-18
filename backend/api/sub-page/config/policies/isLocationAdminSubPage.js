'use strict';

/**
 * `isLocationAdmin` policy.
 */

module.exports = async (ctx, next) => {
  let loc;
  let sp;

  // if creating a subpage 
  if (ctx.request.method == "POST") {
    loc = await strapi.query("location").findOne({
      id: ctx.request.body.location
    });
  }

  // if updating or fetching an existing subpage
  if (ctx.request.method == "PUT" || ctx.request.method == "GET" || ctx.request.method == "DELETE") {
    sp = await strapi.query("sub-page").findOne(ctx.params);
    if (!sp) {
      ctx.throw(400, "sub-page not found!");
    }
    loc = await strapi.query("location").findOne(sp.location);
  }

  let admin = (loc.admins.find(element => element.id == ctx.state.user.id) != undefined);
  if (admin) {
    return await next();
  }
  ctx.unauthorized("Insufficient Privileges.");
};
