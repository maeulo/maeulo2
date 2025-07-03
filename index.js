// --- TEMPLATES ---

const templateHTML = `
<div class="{{#if {{equal::{{role}}::char}} }}char{{/if}}{{#if {{not_equal::{{role}}::char}} }}user{{/if}}-box-wrapper">
    <div class="profile-and-button">
        <div class="{{#if {{equal::{{role}}::char}} }}char-image{{/if}}{{#if {{not_equal::{{role}}::char}} }}user-image{{/if}} profile-container">
            <risuicon></risuicon>
        </div>
        <div class="character-button">
            <risubuttons></risubuttons>
        </div>
{{#if {{equal::{{role}}::char}} }}
       <risugeninfo></risugeninfo>
{{/if}}
    </div>
    <div class="{{#if {{equal::{{role}}::char}} }}char{{/if}}{{#if {{not_equal::{{role}}::char}} }}user{{/if}}-chat-box chat-box">
        <risutextbox></risutextbox>
    </div>
</div>
`.trim();

const previewHTML = `
<div class="chat-container">
    <div class="message-row character-row">
        <div class="profile-area">
            <div class="profile-pic character-pic"></div>
            <div class="actions">
                <span class="action-icon-normal">←</span>
                <span class="action-icon-hover">→</span>
                <span class="more-icon">...</span>
            </div>
        </div>
        <div class="bubble character-bubble">
            이건 캐릭터 말풍선입니다.
        </div>
    </div>
    <div class="message-row user-row">
        <div class="bubble user-bubble">
            이건 유저의 말풍선입니다.
        </div>
        <div class="profile-area">
             <div class="profile-pic user-pic"></div>
        </div>
    </div>
    <div class="input-bar">
        <div class="input-field"></div>
        <div class="send-button"></div>
    </div>
</div>
`;

// --- EDITOR CONFIGURATION ---

const controlsConfig = [
    { type: 'color', id: 'body-bg', label: '바디 배경색', defaultValue: '#1a1b1b' },
    { type: 'color', id: 'char-bubble-bg', label: '캐릭터 말풍선 배경', defaultValue: '#262727' },
    { type: 'color', id: 'user-bubble-bg', label: '유저 말풍선 배경', defaultValue: '#121211' },
    { type: 'color', id: 'action-icon-color', label: '액션 아이콘 색상', defaultValue: '#cccccc' },
    { type: 'color', id: 'action-icon-hover-color', label: '액션 아이콘 호버 색상', defaultValue: '#7c67ff' },
    { type: 'color', id: 'more-icon-color', label: '더보기 아이콘 색상', defaultValue: '#ffffff' },
    { type: 'color', id: 'send-button-color', label: '전송 버튼 색상', defaultValue: '#99aab5' },
    { type: 'range', id: 'profile-radius', label: '프로필 이미지 Radius', defaultValue: 15, min: 0, max: 50, step: 1, unit: 'px' },
];

const generateFinalCss = (values) => `
body {
    background-color: ${values['body-bg']};
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0; 
    padding: 0;
}

.risu-chat > div > div {
    margin-left: auto;
    margin-right: auto;
    width: 90%;  
    max-width: 500px;
    position: relative;
}

.char-image > div,
.user-image > div {
    background-position: center !important;
    background-size: cover !important;
    border-radius: ${values['profile-radius']}px;
    width: 50px !important;
    height: 50px !important;
}

.char-box-wrapper,
.user-box-wrapper {
    position: relative;
    width: 100%;
    margin-bottom: 0.5rem;
    display: flex;
    justify-content: center;
}

.profile-and-button {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.char-box-wrapper .profile-and-button {
    left: -20px; 
    top: 0;
}

.user-box-wrapper .profile-and-button {
    right: -15px;
    top: 0; 
}

.char-box-wrapper, .user-box-wrapper{
   display: flex;
}

.char-chat-box,
.user-chat-box {
    width: calc(100% - 50px - 5px); 
    display: flex;
    margin-left: calc(50px + 10px);
    flex-direction: column;
}

.user-chat-box {
    align-items: flex-end;
}

.char-chat-box{
    margin-left: 60px; 
}
.user-chat-box{
    margin-right: calc(50px + 5px + 20px);
}

.chat-box > span {
    max-width: 100%; 
    width: fit-content;
    display: inline-block;
    border-radius: 15px;
    padding: 0.7rem 1rem; 
    word-break: break-word;
    overflow-wrap: break-word;
    margin-bottom: 0.2rem;
}

.char-chat-box > span {
    background-color: ${values['char-bubble-bg']};
    box-shadow: rgba(114, 137, 218, 0.3);
}

.user-chat-box > span {
    background-color: ${values['user-bubble-bg']};
    text-align: left;
    box-shadow: rgba(114, 137, 218, 0.2);
}

.character-button {
    width: 50px;
    left: -0px;
    position: relative;    
}

.character-button > div {
    display: flex;
    flex-direction: row; 
    justify-content: center; 
    align-items: center;
    gap: 1.3px;
    transform: scale(0.6);
    margin-top: 0.1rem;
    pointer-events: auto;
}

.character-button > div > button {
    margin: 0 !important;
    padding: 0.5px 0.5px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.character-button > div > button.ml-2:hover {
    color: #7289da !important;
}

.character-button > div > span {
    font-size: 0;
}

.character-button > div > button.ml-2.text-blue-400 {
    color: #43b581 !important;
}

#app > main .default-chat-screen > :first-child {
    width: 100%; 
    max-width: 40rem; 
    margin-left: auto;
    margin-right: auto;
}

button.peer-focus\\:border-textcolor {
    color: ${values['send-button-color']} !important;
}

button.peer-focus\\:border-textcolor:hover {
    background-color: #7289da !important;
}

@media (max-width: 600px) {  
   .risu-chat > div > div{
        width: 95%;
   }

    .char-chat-box,
    .user-chat-box {
        width: calc(100% - 50px - 5px); 
    }

    .chat-box > span{
        margin-bottom: 0; 
    }
    .char-chat-box{
        margin-left: 30px; 
    }
    .user-chat-box{
        margin-right: calc(50px + 5px);
    }
}

span.ml-1 {
  display: none !important;
}

button > svg.lucide-bot {
  display: none !important;
}

button.text-sm.p-1::before {
  content: "⋯";
  font-size: 20px;
  color: ${values['more-icon-color']};
  margin-right: 4px;
  margin-left: 10px;
  vertical-align: middle;
  display: inline-block;
}

.button-icon-copy svg,
.button-icon-edit svg,
.button-icon-remove svg,
.button-icon-translate svg,
.button-icon-unreroll svg,
.button-icon-reroll svg {
  color: ${values['action-icon-color']};
}

.button-icon-copy:hover svg,
.button-icon-edit:hover svg,
.button-icon-remove:hover svg,
.button-icon-translate:hover svg,
.button-icon-unreroll:hover svg,
.button-icon-reroll:hover svg {
  color: ${values['action-icon-hover-color']};
}
`;

const generatePreviewCss = (values) => `
body {
    background-color: ${values['body-bg']};
    font-family: sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    padding: 20px;
    display: flex;
    justify-content: center;
    color: #e0e0e0;
}
.chat-container {
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}
.message-row {
    display: flex;
    align-items: flex-start;
    gap: 10px;
}
.user-row {
    justify-content: flex-end;
}
.profile-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
}
.profile-pic {
    width: 50px;
    height: 50px;
    background-color: #ffffff;
    border-radius: ${values['profile-radius']}px;
    background-size: cover;
    background-position: center;
}
.character-pic {
    background-image: url('https://source.unsplash.com/random/50x50?anime,character');
}
.user-pic {
     background-image: url('https://source.unsplash.com/random/50x50?person');
}
.actions {
    display: flex;
    gap: 5px;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
}
.action-icon-normal {
    color: ${values['action-icon-color']};
}
.action-icon-hover {
    color: ${values['action-icon-hover-color']};
}
.more-icon {
    color: ${values['more-icon-color']};
    font-weight: bold;
    letter-spacing: 1px;
    padding-bottom: 8px;
}
.bubble {
    padding: 12px 16px;
    border-radius: 18px;
    color: #ffffff;
    max-width: 75%;
    font-size: 14px;
    line-height: 1.5;
}
.character-bubble {
    background-color: ${values['char-bubble-bg']};
    border-top-left-radius: 4px;
}
.user-bubble {
    background-color: ${values['user-bubble-bg']};
    border-top-right-radius: 4px;
}
.input-bar {
    margin-top: 10px;
    width: 100%;
    height: 40px;
    background-color: transparent;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 5px 0 20px;
}
.input-field {
    flex-grow: 1;
    height: 100%;
}
.send-button {
    width: 30px;
    height: 30px;
    background-color: ${values['send-button-color']};
    clip-path: polygon(0 0, 0 100%, 100% 50%);
}
`;


// --- APPLICATION LOGIC ---

document.addEventListener('DOMContentLoaded', () => {
    const controlsContainer = document.getElementById('controls-container');
    const previewFrame = document.getElementById('preview-frame');
    const htmlCodeDisplay = document.getElementById('html-code-display');
    const cssCodeDisplay = document.getElementById('css-code-display');
    const copyHtmlButton = document.getElementById('copy-html-button');
    const copyCssButton = document.getElementById('copy-css-button');

    const controlElements = {};

    controlsConfig.forEach(config => {
        const group = document.createElement('div');
        group.className = 'control-group';
        
        const label = document.createElement('label');
        label.setAttribute('for', config.id);
        label.textContent = config.label;

        let input;
        if (config.type === 'range') {
            const valueDisplay = document.createElement('span');
            valueDisplay.className = 'value-display';
            valueDisplay.id = `${config.id}-value`;
            valueDisplay.textContent = `${config.defaultValue}${config.unit}`;
            label.appendChild(valueDisplay);

            input = document.createElement('input');
            input.type = 'range';
            input.min = config.min;
            input.max = config.max;
            input.step = config.step;
        } else { // color
            input = document.createElement('input');
            input.type = 'color';
        }
        
        input.id = config.id;
        input.value = config.defaultValue;
        group.appendChild(label);
        group.appendChild(input);
        controlsContainer.appendChild(group);

        controlElements[config.id] = input;
    });

    previewFrame.addEventListener('load', () => {
        const iframeDoc = previewFrame.contentDocument;
        iframeDoc.body.innerHTML = previewHTML;
        const styleTag = iframeDoc.createElement('style');
        styleTag.id = 'dynamic-styles';
        iframeDoc.head.appendChild(styleTag);
        update();
    });
    
    previewFrame.src = 'about:blank';

    const update = () => {
        const currentValues = {};
        controlsConfig.forEach(config => {
            currentValues[config.id] = controlElements[config.id].value;
            if (config.type === 'range') {
                const valueDisplay = document.getElementById(`${config.id}-value`);
                valueDisplay.textContent = `${currentValues[config.id]}${config.unit}`;
            }
        });

        const previewCss = generatePreviewCss(currentValues);
        const finalCss = generateFinalCss(currentValues);
        
        const styleTag = previewFrame.contentDocument.getElementById('dynamic-styles');
        if (styleTag) {
            styleTag.textContent = previewCss;
        }
        
        cssCodeDisplay.textContent = finalCss.trim();
    };

    Object.values(controlElements).forEach(input => {
        input.addEventListener('input', update);
    });

    htmlCodeDisplay.textContent = templateHTML;

    const handleCopy = (button, text) => {
        navigator.clipboard.writeText(text).then(() => {
            const originalText = button.textContent;
            button.textContent = '복사 완료!';
            button.classList.add('copied');
            setTimeout(() => {
                button.textContent = originalText;
                button.classList.remove('copied');
            }, 2000);
        }).catch(err => {
            console.error('클립보드 복사 실패:', err);
            button.textContent = '복사 실패';
             setTimeout(() => {
                button.textContent = '복사';
            }, 2000);
        });
    };
    
    copyHtmlButton.addEventListener('click', () => handleCopy(copyHtmlButton, templateHTML));
    copyCssButton.addEventListener('click', () => handleCopy(copyCssButton, cssCodeDisplay.textContent));

    update();
});