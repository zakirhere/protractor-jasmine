exports.config = {

  specs: [
    'asapp/*.spec.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  // baseUrl: 'http://google.com',

  directConnect: true,

  onPrepare: function() {
		browser.ignoreSynchronization = true;		
	}
};
