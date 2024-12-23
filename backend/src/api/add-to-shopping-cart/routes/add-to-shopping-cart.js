module.exports = {
  routes: [
    {
     method: 'POST',
     path: '/add-to-shopping-cart',
     handler: 'add-to-shopping-cart.addNew',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
