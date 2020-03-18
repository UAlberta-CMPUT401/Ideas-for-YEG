'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async isAdmin(ctx) {
    let locations;
    locations = await strapi.query('location').find({
      admins: ctx.state.user.id
    });
    return {
      "managedLocations": locations.map(loc => loc.id)
    };
  },

};
