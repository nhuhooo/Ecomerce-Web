module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/my-shopping-cart',
     handler: 'my-shopping-cart.getMyShoppingCart',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
