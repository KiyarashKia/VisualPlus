// In popup.js
document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('toggleFAB');
    chrome.storage.local.get('isFABActive', (data) => {
        toggle.checked = data.isFABActive || false;
    });

    toggle.addEventListener('change', () => {
        chrome.storage.local.set({ isFABActive: toggle.checked });
        // Sending message to the background script
        chrome.runtime.sendMessage({ isFABActive: toggle.checked }, function(response) {
            if (chrome.runtime.lastError) {
                return;
            }
            console.log('Received response:', response);
        });
    });
});
