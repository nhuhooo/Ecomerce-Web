'use strict';

const { getMyShoppingCart } = require("../controllers/my-shopping-cart");

/**
 * my-shopping-cart service
 */

module.exports = () => ({
    getMyShoppingCart: async (shoppingcart) => {
        for(var i = 0; i < shoppingcart.length; i++){
            const amount = shoppingcart[i].amount
            shoppingcart[i] = await strapi.entityService.findOne('api::product.product', shoppingcart[i].productId, {
                populate: { category: true , image: true},
              });
            shoppingcart[i].amount = amount;
        }
       return shoppingcart
    },
});
