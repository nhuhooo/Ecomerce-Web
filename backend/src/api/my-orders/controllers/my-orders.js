'use strict';

/**
 * A set of functions called "actions" for `my-orders`
 */

module.exports = {
  myorders: async (ctx, next) => {
    try {
      const user = ctx.state.user
      const data = await strapi
            .service("api::my-orders.my-orders")
            .myorders(user);
      ctx.body = data;
    } catch (err) {
      ctx.body = err;
    }
  }
};
