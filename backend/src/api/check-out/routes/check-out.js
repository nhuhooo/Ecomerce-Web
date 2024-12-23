module.exports = {
  routes: [
    {
     method: 'POST',
     path: '/check-out',
     handler: 'check-out.checkout',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
