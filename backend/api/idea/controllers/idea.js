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
  async upvote(ctx) {

    let entity;
    entity = await strapi.services.idea.findOne(ctx.params);

    let upvoters = entity.user_upvoters;
    if (upvoters.find(element => element.id == ctx.state.user.id) != undefined) {
      upvoters = removeUserArray(upvoters, ctx.state.user)
    } else {
      upvoters.push(ctx.state.user)
    }

    let thing;
    thing = await strapi.services.idea.update(entity, {
      'user_upvoters': upvoters
    });

    return sanitizeEntity(thing, {
      model: strapi.models.idea
    });
  },

  async volunteer(ctx) {

    let entity;
    entity = await strapi.services.idea.findOne(ctx.params);

    let volunteers = entity.volunteers;
    if (volunteers.find(element => element.id == ctx.state.user.id) != undefined) {
      volunteers = removeUserArray(volunteers, ctx.state.user)
    } else {
      volunteers.push(ctx.state.user)
    }

    let thing;
    thing = await strapi.services.idea.update(entity, {
      'volunteers': volunteers
    });

    return sanitizeEntity(thing, {
      model: strapi.models.idea
    });
  },

  async follow(ctx) {

    let entity;
    entity = await strapi.services.idea.findOne(ctx.params);

    let followers = entity.followers;
    if (followers.find(element => element.id == ctx.state.user.id) != undefined) {
      followers = removeUserArray(followers, ctx.state.user)
    } else {
      followers.push(ctx.state.user)
    }

    let thing;
    thing = await strapi.services.idea.update(entity, {
      'followers': followers
    });

    return sanitizeEntity(thing, {
      model: strapi.models.idea
    });
  },

  async search(ctx){
    let resLimit = 100;
    let skip = 0;
    const queryParams = {$and:[]};
    let sortBy = {'createdAt':1};

    // Query params include: searchTerm, sortBy, limit, skip,
    const qParams = ctx.request.query;
    if( qParams.locId ){
      let loc = await strapi.query('location').findOne({route: qParams.locId});
      if(!loc){
        ctx.throw(400, 'invalid location id provided');
      }
      queryParams.$and.push({location: loc._id})
    }
    else{
      ctx.throw(400, 'location id parameter (locId) required');
    }

    if( qParams.searchTerm ){
      // Push clause that looks if titles or documents contain the search term as a substring
      queryParams.$and.push({
        $or:[
          {"title" : {$regex : `.*${qParams.searchTerm}.*`, $options : 'i'}},
          {"description" : {$regex : `.*${qParams.searchTerm}.*`, $options : 'i'}},
          // {"categories" : {$regex : `.*${qParams.searchTerm}.*`}},
          ]
      });
    }
    if( qParams.sortBy ){
      if( qParams.sortBy === 'new'){
        sortBy = {'createdAt':1};
      }
      else if (qParams.sortBy === 'top'){
        sortBy = {};
      }
    }
    if( qParams.limit && qParams.limit < resLimit ){
      resLimit = qParams.limit;
    }
    if( qParams.skip ){
      skip = qParams.skip;
    }

    const result = strapi.query('idea').model.find(queryParams).limit(resLimit).skip(skip).sort(sortBy);

    return result;
  }
};
