'use strict';



/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const {
  sanitizeEntity
} = require('strapi-utils');

function removeUserArray(arr, value) {

  return arr.filter(function (ele) {
    return ele.id != value.id;
  });

}

module.exports = {
  async setAdmin(ctx) {
    let entity;
    entity = await strapi.services.idea.findOne(ctx.params);

    let user, action;
    user = {
      id: ctx.request.body.user
    };
    action = ctx.request.body.action;

    if (user == undefined || action == undefined) {
      return "Missing Parameters."
    }

    var admins = entity.admins;
    let found = (admins.find(element => element.id == user.id) != undefined);

    if (action == "add" && !found) {
      admins.push(user.id)
    }
    if (action == "remove" && found) {
      admins = removeUserArray(admins, user)
    }

    let updated;
    updated = await strapi.services.idea.update(entity, {
      'admins': admins
    });

    return sanitizeEntity(updated, {
      model: strapi.models.idea
    });
  },
  async upvote(ctx) {

    let entity;
    entity = await strapi.services.idea.findOne(ctx.params);

    var upvoters = entity.user_upvoters;
    if (upvoters.find(element => element.id == ctx.state.user.id) != undefined) {
      upvoters = removeUserArray(upvoters, ctx.state.user)
    } else {
      upvoters.push(ctx.state.user)
    }

    let updated;
    updated = await strapi.services.idea.update(entity, {
      'user_upvoters': upvoters
    });

    return sanitizeEntity(updated, {
      model: strapi.models.idea
    });
  },

  async volunteer(ctx) {

    let entity;
    entity = await strapi.services.idea.findOne(ctx.params);

    var volunteers = entity.volunteers;
    if (volunteers.find(element => element.id == ctx.state.user.id) != undefined) {
      volunteers = removeUserArray(volunteers, ctx.state.user)
    } else {
      volunteers.push(ctx.state.user)
    }

    let updated;
    updated = await strapi.services.idea.update(entity, {
      'volunteers': volunteers
    });

    return sanitizeEntity(updated, {
      model: strapi.models.idea
    });
  },

  async follow(ctx) {

    let entity;
    entity = await strapi.services.idea.findOne(ctx.params);

    var followers = entity.followers;
    if (followers.find(element => element.id == ctx.state.user.id) != undefined) {
      followers = removeUserArray(followers, ctx.state.user)
    } else {
      followers.push(ctx.state.user)
    }

    let updated;
    updated = await strapi.services.idea.update(entity, {
      'followers': followers
    });

    return sanitizeEntity(updated, {
      model: strapi.models.idea
    });
  },
};
