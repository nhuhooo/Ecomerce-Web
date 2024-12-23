'use strict';

const getRevenue = require("../routes/get-revenue");

/**
 * A set of functions called "actions" for `get-revenue`
 */

module.exports = {
  getRevenue: async (ctx, next) => {
    try {
      const data = await strapi
      .service("api::get-revenue.get-revenue")
      .getRevenue();
      ctx.body = data;
    } catch (err) {
      ctx.body = err;
    }
  }
};
