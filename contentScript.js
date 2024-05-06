function toggleTheme() {
    document.body.classList.toggle('dark-theme');
}


// Font Resize
const originalFontSize = window.getComputedStyle(document.body).fontSize;
let currentFontSize = parseFloat(originalFontSize);
let fontSizeIncreased = false;

function adjustFontSize() {
    if (!fontSizeIncreased) {
        document.body.style.fontSize = `${currentFontSize * 1.1}px`;
    fontSizeIncreased = true;
    } else {
        document.body.style.fontSize = originalFontSize; // Reset to original
        fontSizeIncreased = false; 
    }
}
function toggleContrast () {
    document.body.classList.toggle('high-contrast');
}

const styleSheet = document.createElement('style');
styleSheet.innerText = `
    .dark-theme {
        background-color: #333;
        color: #eee;
        filter: invert(1) hue-rotate(180deg);
    }
    .dark-theme img {
        filter: invert(1) hue-rotate(180deg);
    }
    .high-contrast {
        filter: contrast(2);
    }
`;
document.head.appendChild(styleSheet);


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch (message.command) {
        case 'toggle-theme':
            toggleTheme();
            break;
        case 'adjust-font-size':
            adjustFontSize();
            break;
        case 'toggle-contrast':
            toggleContrast();
            break;
    }
});
