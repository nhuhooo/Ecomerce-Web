module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/my-orders',
     handler: 'my-orders.myorders',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
