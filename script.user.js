// ==UserScript==
// @name         10 Hacker Finger
// @version      4.1
// @description  Ultimate Speed for - Dev: @tc4dy
// @author       @tc4dy
// @match        *://10fastfingers.com/*
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    let speed = 50;
    let botInterval = null;
    let isUIInjected = false;

    const injectUI = () => {
        if (isUIInjected || document.getElementById('hacker-panel')) return;

        const panel = document.createElement('div');
        panel.id = 'hacker-panel';
        panel.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 2147483647;
            background: rgba(0, 0, 0, 0.95);
            color: #00ff00;
            padding: 20px;
            border: 2px solid #00ff00;
            border-radius: 10px;
            font-family: monospace;
            box-shadow: 0 0 30px rgba(0, 255, 0, 0.6);
            width: 250px;
        `;

        panel.innerHTML = `
            <div style="text-align:center; font-weight:bold; font-size:18px; border-bottom:1px solid #00ff00; margin-bottom:10px; padding-bottom:10px;">10 HACKER FINGER</div>
            <div style="font-size:12px; color:#fff; text-align:center; margin-bottom:15px;">User: Tuğra Babapro</div>
            <div style="margin-bottom:5px;">SPEED: <span id="speed-num" style="color:#fff; font-weight:bold;">${speed}</span>ms</div>
            <input type="range" min="1" max="500" value="${speed}" id="speed-slider" style="width:100%; cursor:pointer; accent-color:#00ff00; margin-bottom:10px;">
            <div style="font-size:10px; margin-top:15px; text-align:right; opacity:0.5;">Dev: @tc4dy</div>
        `;

        document.body.appendChild(panel);
        isUIInjected = true;

        // Event listener ekle
        const slider = document.getElementById('speed-slider');
        slider.addEventListener('input', function() {
            speed = parseInt(this.value);
            document.getElementById('speed-num').textContent = speed;
            startBot(speed);
        });
    };

    const startBot = (ms) => {
        if (botInterval) {
            clearInterval(botInterval);
            botInterval = null;
        }

        botInterval = setInterval(() => {
            try {
                const inputField = document.getElementById('inputfield');
                const highlight = document.querySelector('.highlight');

                if (highlight && inputField) {
                    const targetWord = highlight.textContent.trim();
                    const currentValue = inputField.value.trim();

                    if (currentValue !== targetWord && targetWord !== '') {
                        inputField.value = targetWord;

                        const spaceEvent = new KeyboardEvent('keyup', {
                            key: ' ',
                            code: 'Space',
                            keyCode: 32,
                            which: 32,
                            bubbles: true
                        });

                        inputField.dispatchEvent(spaceEvent);

                        const inputEvent = new Event('input', { bubbles: true });
                        inputField.dispatchEvent(inputEvent);
                    }
                }
            } catch (error) {
                console.error('Bot error:', error);
            }
        }, ms);
    };

    const init = () => {
        if (document.readyState === 'loading') {
            setTimeout(init, 100);
            return;
        }

        injectUI();
        startBot(speed);
    };

    // Başlat
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        setTimeout(init, 500);
    }

})();
