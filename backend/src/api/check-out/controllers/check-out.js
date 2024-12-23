'use strict';

/**
 * A set of functions called "actions" for `check-out`
 */

module.exports = {
  checkout: async (ctx, next) => {
    try {
      const user = ctx.state.user;
      const body = ctx.request.body
      const data = await strapi
            .service("api::check-out.check-out")
            .checkout(user, body);
      ctx.body = data;
    } catch (err) {
      ctx.body = err;
    }
  }
};
