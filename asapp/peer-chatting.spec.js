var EC = protractor.ExpectedConditions;
	
describe('Chat between two users', function() {
	beforeEach(function() {
		console.log('Test started');
	});

	it('launch the chat session', function() {
		browser.get('https://simple-chat-asapp.herokuapp.com/');
		loginToChat('Zakir', 'Sayed');
	});

	it('login is successful and I could see who is chatting with whom', function() {
		expect($('.app h4').getText()).toBe('You\'re Zakir, and you\'re chatting with Sayed.');
	});
});

describe('Open a new window and swap the user details', function() {
	beforeEach(function() {
		console.log('Second window session started');
	});

	it('open the new tab session', function() {
		openNewSession('https://simple-chat-asapp.herokuapp.com/', 1)
		// browser.sleep(2000);
	});

	it('launch the chat session', function() {
		loginToChat('Sayed', 'Zakir');
	});

	it('login is successful and I could see who is chatting with whom', function() {
		// browser.sleep(5000);
		expect($('.app h4').getText()).toBe('You\'re Sayed, and you\'re chatting with Zakir.');
	});
});

describe('send message between users', function() {
	it('First user sending message to Second user', function() {
		switchToWindowByHandle(0);
		sendMessage('Message from First user to Second user');
		browser.wait(EC.visibilityOf($('.message span.text')), 5000);
		expect($('.message span.text').getText()).toBe('Message from First user to Second user');
	});

	it('Second user receives the message from first user', function() {
		switchToWindowByHandle(1);
		// browser.sleep(5000);
		expect($('.message span.text').getText()).toBe('Message from First user to Second user');
	});

	it('Second user sending message to First user', function() {
		switchToWindowByHandle(1);
		sendMessage('Message from Second user to First user');
		browser.wait(EC.visibilityOf($('.message span.text')), 5000);
		expect($('.message:nth-child(2) span.text').getText()).toBe('Message from Second user to First user');
	});

	it('First user receives the message from Second user', function() {
		switchToWindowByHandle(0);
		// browser.sleep(5000);
		expect($('.message:nth-child(2) span.text').getText()).toBe('Message from Second user to First user');
	});
});

describe('Third user should not see any message when chatting with first user', function() {
	it('open the new tab session', function() {
		openNewSession('https://simple-chat-asapp.herokuapp.com/', 2)
		// browser.sleep(2000);
	});

	it('launch the chat session', function() {
		loginToChat('Zakir', 'ASAPP');
	});

	it('login is successful and I could see who is chatting with whom', function() {
		// browser.sleep(5000);
		expect($('.app h4').getText()).toBe('You\'re Zakir, and you\'re chatting with ASAPP.');
	});

	it('First user sending message to third user', function() {
		switchToWindowByHandle(2);
		sendMessage('Message from Third user to First user');
		browser.wait(EC.visibilityOf($('.message span.text')), 5000);
		expect($('.message span.text').getText()).toBe('Message from Third user to First user');
	});

	it('Second user should not see first & third user message', function() {
		switchToWindowByHandle(1);
		// browser.sleep(5000);
		expect($('.message:nth-child(3) span.text').isPresent()).toBe(false);
		expect($('#chatBox').getText()).not.toEqual('Message from First user to Third user')
	});
});

function sendMessage(msg) {
	$('.app input').sendKeys(msg);
	$('.app button').click();
}

function loginToChat(first, second) {
	var fromText = $('form.login div:nth-child(1) input');
	var toText = $('form.login div:nth-child(2) input')
	browser.wait(EC.visibilityOf(fromText), 5000);
	fromText.sendKeys(first);
	$('form.login div:nth-child(2) input').sendKeys(second);
	$('button[type="submit"]').click();
}

function openNewSession(page, id) {
	browser.executeScript('window.open()').then(function () {
		switchToWindowByHandle(id)
		return browser.get(page);
	});
}

function switchToWindowByHandle(id) {
	     browser.getAllWindowHandles().then(function (handles) {
            var secondWindow = handles[id];
            browser.switchTo().window(secondWindow).then(function () {
                return browser.sleep(1);
            });
     });
}