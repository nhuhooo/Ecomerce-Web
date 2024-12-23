module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/get-revenue',
     handler: 'get-revenue.getRevenue',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
