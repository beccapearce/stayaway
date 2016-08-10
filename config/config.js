module.exports = function() {
  express: {
    port: 3000
  }
  switch(process.env.NODE_ENV) {
    case 'dev':
      return {
        host: 'localhost',
      	port: 28015,
      	db: 'stayaway_dev'
      };

    default:
      return {
        host: 'localhost',
    	  port: 28015,
    	  db: 'stayaway_test'
    };
  }
};
