// In contentScript.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.isFABActive !== undefined) {
        console.log('Content script handling FAB visibility:', request.isFABActive);
        if (request.isFABActive) {
            createFAB();
            fabContainer.style.display = 'flex';
        } else {
            fabContainer.style.display = 'none';
        }
    }
});


function createFAB() {
    fabContainer = document.createElement('div');
    fabContainer.id = 'fab-container';
    fabContainer.style.position = 'fixed';
    fabContainer.style.right = '20px';
    fabContainer.style.bottom = '20px';
    fabContainer.style.display = 'none'; // Start hidden
    document.body.appendChild(fabContainer);

    // Add buttons here as previously described
}



// Function to apply or toggle dark theme
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
}

// Function to adjust the font size
function adjustFontSize() {
    let currentFontSize = parseFloat(window.getComputedStyle(document.body).fontSize);
    // Toggle between increased size and normal size, reset on third click
    if (!document.body.dataset.fontSizeIncreased || document.body.dataset.fontSizeIncreased === 'reset') {
        document.body.style.fontSize = `${currentFontSize * 1.1}px`;
        document.body.dataset.fontSizeIncreased = 'increased';
    } else if (document.body.dataset.fontSizeIncreased === 'increased') {
        document.body.style.fontSize = `${currentFontSize * 1.1 * 1.1}px`; // Another increment
        document.body.dataset.fontSizeIncreased = 'reset';
    } else {
        document.body.style.fontSize = ''; // Reset to stylesheet value
        document.body.dataset.fontSizeIncreased = 'reset';
    }
}

// Function to toggle high contrast
function toggleContrast() {
    document.body.classList.toggle('high-contrast');
}

// Injecting buttons into the web page
document.addEventListener('DOMContentLoaded', function () {
    const fabContainer = document.createElement('div');
    fabContainer.id = 'fab-container';
    fabContainer.style.position = 'fixed';
    fabContainer.style.right = '20px';
    fabContainer.style.bottom = '20px';
    fabContainer.style.display = 'flex';
    fabContainer.style.flexDirection = 'column';
    fabContainer.style.alignItems = 'center';
    document.body.appendChild(fabContainer);

    // Create a button for each function
    const themesBtn = document.createElement('button');
    themesBtn.textContent = 'Toggle Theme';
    themesBtn.onclick = toggleTheme;
    fabContainer.appendChild(themesBtn);

    const fontSizeBtn = document.createElement('button');
    fontSizeBtn.textContent = 'Adjust Font Size';
    fontSizeBtn.onclick = adjustFontSize;
    fabContainer.appendChild(fontSizeBtn);

    const contrastBtn = document.createElement('button');
    contrastBtn.textContent = 'Toggle Contrast';
    contrastBtn.onclick = toggleContrast;
    fabContainer.appendChild(contrastBtn);
});

// In the content script
document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get('isFABActive', (data) => {
        fabContainer.style.display = data.isFABActive ? 'flex' : 'none';
    });
});
