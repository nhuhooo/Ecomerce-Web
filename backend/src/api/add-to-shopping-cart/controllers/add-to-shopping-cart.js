'use strict';

/**
 * A set of functions called "actions" for `add-to-shopping-cart`
 */

module.exports ={
  
  addNew: async (ctx, next) => {
    try {
      const productId = ctx.request.body.productId;
      const amount = ctx.request.body.amount;
      const data = await strapi
            .service("api::add-to-shopping-cart.add-to-shopping-cart")
            .addNew(ctx.state.user,productId, amount);
      ctx.body = data;
      
    } catch (err) {
      ctx.body = err;
    }
  }
};
