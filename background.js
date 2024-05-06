let isFABActive = false;

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ isFABActive: false });
});

chrome.action.onClicked.addListener(() => {
    chrome.storage.local.get('isFABActive', (data) => {
        isFABActive = !data.isFABActive;
        chrome.storage.local.set({ isFABActive: isFABActive });

        chrome.tabs.query({url: "<all_urls>"}, (tabs) => {
            tabs.forEach(tab => {
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    files: ['contentScript.js']
                }, () => {
                    if (chrome.runtime.lastError) {
                        console.error(`Error injecting script into tab ${tab.id}: ${chrome.runtime.lastError.message}`);
                    } else {
                        // Only send the message if the script is successfully injected
                        chrome.tabs.sendMessage(tab.id, { isFABActive: isFABActive });
                    }
                });
            });
        });
    });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        // Ensure the script is injected before sending a message
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['contentScript.js']
        }, () => {
            if (!chrome.runtime.lastError) {
                chrome.tabs.sendMessage(tabId, { isFABActive: isFABActive });
            }
        });
    }
});

// In background.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.isFABActive !== undefined) {
        // Handle the toggle change here
        console.log('FAB Active state changed to:', request.isFABActive);
        // Further logic to broadcast changes to content scripts or manage state
    }
});

