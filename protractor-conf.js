exports.config = {

  specs: [
    'schl/*.spec.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://google.com',

  directConnect: true,

  onPrepare: function() {
		browser.ignoreSynchronization = true;		
	}
};
