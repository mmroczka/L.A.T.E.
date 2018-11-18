chrome.runtime.onMessage.addListener(function (msg, sender) {
    // First, validate the message's structure
    alert("background.js fired!");
    if ((msg.from === 'content') && (msg.subject === 'reload')) {
        chrome.tabs.reload();
    }
});
