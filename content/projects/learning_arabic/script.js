// Arabic Learning Platform - Interactive JavaScript

// Arabic alphabet data
const arabicAlphabet = [
    { letter: 'ا', name: 'alif', sound: 'a', position: 1 },
    { letter: 'ب', name: 'ba', sound: 'b', position: 2 },
    { letter: 'ت', name: 'ta', sound: 't', position: 3 },
    { letter: 'ث', name: 'tha', sound: 'th', position: 4 },
    { letter: 'ج', name: 'jim', sound: 'j', position: 5 },
    { letter: 'ح', name: 'ha', sound: 'ḥ', position: 6 },
    { letter: 'خ', name: 'kha', sound: 'kh', position: 7 },
    { letter: 'د', name: 'dal', sound: 'd', position: 8 },
    { letter: 'ذ', name: 'dhal', sound: 'dh', position: 9 },
    { letter: 'ر', name: 'ra', sound: 'r', position: 10 },
    { letter: 'ز', name: 'zay', sound: 'z', position: 11 },
    { letter: 'س', name: 'sin', sound: 's', position: 12 },
    { letter: 'ش', name: 'shin', sound: 'sh', position: 13 },
    { letter: 'ص', name: 'sad', sound: 'ṣ', position: 14 },
    { letter: 'ض', name: 'dad', sound: 'ḍ', position: 15 },
    { letter: 'ط', name: 'ta', sound: 'ṭ', position: 16 },
    { letter: 'ظ', name: 'za', sound: 'ẓ', position: 17 },
    { letter: 'ع', name: 'ayn', sound: 'ʿ', position: 18 },
    { letter: 'غ', name: 'ghayn', sound: 'gh', position: 19 },
    { letter: 'ف', name: 'fa', sound: 'f', position: 20 },
    { letter: 'ق', name: 'qaf', sound: 'q', position: 21 },
    { letter: 'ك', name: 'kaf', sound: 'k', position: 22 },
    { letter: 'ل', name: 'lam', sound: 'l', position: 23 },
    { letter: 'م', name: 'mim', sound: 'm', position: 24 },
    { letter: 'ن', name: 'nun', sound: 'n', position: 25 },
    { letter: 'ه', name: 'ha', sound: 'h', position: 26 },
    { letter: 'و', name: 'waw', sound: 'w', position: 27 },
    { letter: 'ي', name: 'ya', sound: 'y', position: 28 }
];

// Arabic numbers data
const arabicNumbers = [
    { arabic: '١', english: '1', word: 'واحد', transliteration: 'wahid' },
    { arabic: '٢', english: '2', word: 'اثنان', transliteration: 'ithnan' },
    { arabic: '٣', english: '3', word: 'ثلاثة', transliteration: 'thalatha' },
    { arabic: '٤', english: '4', word: 'أربعة', transliteration: 'arba\'a' },
    { arabic: '٥', english: '5', word: 'خمسة', transliteration: 'khamsa' },
    { arabic: '٦', english: '6', word: 'ستة', transliteration: 'sitta' },
    { arabic: '٧', english: '7', word: 'سبعة', transliteration: 'sab\'a' },
    { arabic: '٨', english: '8', word: 'ثمانية', transliteration: 'thamaniya' },
    { arabic: '٩', english: '9', word: 'تسعة', transliteration: 'tis\'a' },
    { arabic: '١٠', english: '10', word: 'عشرة', transliteration: 'ashara' }
];

// Current game state
let currentLevel = 'intro';
let currentLetter = null;
let currentProgress = 0;

// Initialize app when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupNavigation();
    generateAlphabet();
    generateNumbers();
    initializeRecognitionGame();
    showLevel('intro');
}

// Navigation functionality
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const level = item.dataset.level;
            showLevel(level);
            
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });
}

function showLevel(levelId) {
    // Hide all sections
    const sections = document.querySelectorAll('.level-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(levelId);
    if (targetSection) {
        targetSection.classList.add('active');
        currentLevel = levelId;
        
        // Update progress for non-intro levels
        if (levelId !== 'intro') {
            updateProgress(levelId);
        }
    }
}

function updateProgress(level) {
    const progressMap = {
        'foundation': 20,
        'building': 40,
        'structure': 60,
        'communication': 80,
        'fluency': 100
    };
    
    const progressBars = document.querySelectorAll('.progress-fill');
    const targetProgress = progressMap[level] || 0;
    
    progressBars.forEach(bar => {
        bar.style.width = targetProgress + '%';
    });
}

// Start learning from intro
function startLearning() {
    showLevel('foundation');
    document.querySelector('[data-level="foundation"]').classList.add('active');
    document.querySelector('[data-level="intro"]').classList.remove('active');
}

// Alphabet generation
function generateAlphabet() {
    const alphabetGrid = document.getElementById('alphabetGrid');
    if (!alphabetGrid) return;
    
    alphabetGrid.innerHTML = '';
    
    arabicAlphabet.forEach(letterData => {
        const letterCard = document.createElement('div');
        letterCard.className = 'letter-card';
        letterCard.innerHTML = `
            <div class="arabic-letter">${letterData.letter}</div>
        `;
        
        letterCard.addEventListener('click', () => {
            playLetterSound(letterData);
            highlightLetter(letterCard);
        });
        
        alphabetGrid.appendChild(letterCard);
    });
}

function playLetterSound(letterData) {
    // Create speech synthesis for Arabic letter
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(letterData.name);
        utterance.lang = 'ar';
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
    }
    
    // Show letter information (could be expanded)
    console.log(`Playing sound for: ${letterData.letter} (${letterData.name})`);
}

function highlightLetter(letterCard) {
    // Remove previous highlights
    document.querySelectorAll('.letter-card').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Add highlight to clicked letter
    letterCard.classList.add('highlighted');
    
    // Add CSS for highlight effect
    if (!document.querySelector('#highlight-style')) {
        const style = document.createElement('style');
        style.id = 'highlight-style';
        style.textContent = `
            .letter-card.highlighted {
                background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                color: white;
                transform: scale(1.1);
                box-shadow: 0 5px 20px rgba(0,0,0,0.3);
            }
        `;
        document.head.appendChild(style);
    }
}

function playAllLetters() {
    let index = 0;
    const letterCards = document.querySelectorAll('.letter-card');
    
    function playNext() {
        if (index < arabicAlphabet.length) {
            const letterData = arabicAlphabet[index];
            highlightLetter(letterCards[index]);
            playLetterSound(letterData);
            index++;
            setTimeout(playNext, 1500); // Wait 1.5s between letters
        }
    }
    
    playNext();
}

function shuffleLetters() {
    const alphabetGrid = document.getElementById('alphabetGrid');
    const letterCards = Array.from(alphabetGrid.children);
    
    // Shuffle array
    for (let i = letterCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [letterCards[i], letterCards[j]] = [letterCards[j], letterCards[i]];
    }
    
    // Clear and re-add shuffled cards
    alphabetGrid.innerHTML = '';
    letterCards.forEach(card => alphabetGrid.appendChild(card));
}

// Numbers generation
function generateNumbers() {
    const numbersGrid = document.querySelector('.numbers-grid');
    if (!numbersGrid) return;
    
    // Clear existing numbers (keep first 2 that are in HTML)
    const existingNumbers = numbersGrid.children.length;
    
    arabicNumbers.slice(2).forEach(numberData => {
        const numberItem = document.createElement('div');
        numberItem.className = 'number-item';
        numberItem.innerHTML = `
            <div class="arabic-number">${numberData.arabic}</div>
            <div class="english-number">${numberData.english}</div>
            <div class="number-word">${numberData.word}</div>
        `;
        
        numberItem.addEventListener('click', () => {
            playNumber(parseInt(numberData.english));
        });
        
        numbersGrid.appendChild(numberItem);
    });
}

function playNumber(number) {
    const numberData = arabicNumbers.find(n => parseInt(n.english) === number);
    if (numberData && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(numberData.word);
        utterance.lang = 'ar';
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
    }
    
    // Visual feedback
    const numberItems = document.querySelectorAll('.number-item');
    numberItems[number - 1]?.classList.add('playing');
    setTimeout(() => {
        numberItems[number - 1]?.classList.remove('playing');
    }, 1000);
}

// Recognition Game
function initializeRecognitionGame() {
    startNewRecognitionRound();
}

function startNewRecognitionRound() {
    // Select random letter
    currentLetter = arabicAlphabet[Math.floor(Math.random() * arabicAlphabet.length)];
    
    // Update display
    const letterDisplay = document.getElementById('currentLetter');
    if (letterDisplay) {
        letterDisplay.textContent = currentLetter.letter;
    }
    
    // Generate options (3 wrong + 1 correct)
    const options = [currentLetter];
    while (options.length < 4) {
        const randomLetter = arabicAlphabet[Math.floor(Math.random() * arabicAlphabet.length)];
        if (!options.find(opt => opt.sound === randomLetter.sound)) {
            options.push(randomLetter);
        }
    }
    
    // Shuffle options
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }
    
    // Update option buttons
    const optionButtons = document.querySelectorAll('.option-btn');
    options.forEach((option, index) => {
        if (optionButtons[index]) {
            optionButtons[index].textContent = `${option.sound} (${option.name})`;
            optionButtons[index].onclick = () => checkAnswer(option.sound);
            optionButtons[index].classList.remove('correct', 'incorrect');
        }
    });
}

function checkAnswer(selectedSound) {
    const feedback = document.getElementById('gameFeedback');
    const optionButtons = document.querySelectorAll('.option-btn');
    
    if (selectedSound === currentLetter.sound) {
        feedback.textContent = 'صحيح! Correct!';
        feedback.className = 'game-feedback success';
        
        // Highlight correct button
        optionButtons.forEach(btn => {
            if (btn.textContent.includes(selectedSound)) {
                btn.classList.add('correct');
            }
        });
        
        // Start new round after delay
        setTimeout(() => {
            startNewRecognitionRound();
            feedback.textContent = '';
            feedback.className = 'game-feedback';
        }, 2000);
        
    } else {
        feedback.textContent = `خطأ - Wrong! The correct answer is ${currentLetter.sound} (${currentLetter.name})`;
        feedback.className = 'game-feedback error';
        
        // Highlight correct and incorrect buttons
        optionButtons.forEach(btn => {
            if (btn.textContent.includes(selectedSound)) {
                btn.classList.add('incorrect');
            } else if (btn.textContent.includes(currentLetter.sound)) {
                btn.classList.add('correct');
            }
        });
        
        // Start new round after delay
        setTimeout(() => {
            startNewRecognitionRound();
            feedback.textContent = '';
            feedback.className = 'game-feedback';
        }, 3000);
    }
}

// Greeting functions
function playGreeting(greeting) {
    const greetings = {
        'salam': 'السلام عليكم',
        'ahlan': 'أهلاً وسهلاً',
        'kayf-halak': 'كيف حالك؟'
    };
    
    const arabicText = greetings[greeting];
    if (arabicText && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(arabicText);
        utterance.lang = 'ar';
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
    }
}

// Conversation Simulator
function sendResponse(arabicResponse, englishResponse) {
    const chatWindow = document.getElementById('chatWindow');
    
    // Create user message
    const userMessage = document.createElement('div');
    userMessage.className = 'message sent';
    userMessage.innerHTML = `
        <div class="arabic">${arabicResponse}</div>
        <div class="english">${englishResponse}</div>
    `;
    
    chatWindow.appendChild(userMessage);
    
    // Scroll to bottom
    chatWindow.scrollTop = chatWindow.scrollHeight;
    
    // Generate AI response after delay
    setTimeout(() => {
        generateAIResponse();
    }, 1500);
}

function generateAIResponse() {
    const responses = [
        { arabic: 'كيف حالك؟', english: 'How are you?' },
        { arabic: 'ما اسمك؟', english: 'What is your name?' },
        { arabic: 'من أين أنت؟', english: 'Where are you from?' },
        { arabic: 'أهلاً وسهلاً', english: 'Welcome' }
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    const chatWindow = document.getElementById('chatWindow');
    
    const aiMessage = document.createElement('div');
    aiMessage.className = 'message received';
    aiMessage.innerHTML = `
        <div class="arabic">${randomResponse.arabic}</div>
        <div class="english">${randomResponse.english}</div>
    `;
    
    chatWindow.appendChild(aiMessage);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Navigation between levels
function nextLevel() {
    const levels = ['intro', 'foundation', 'building', 'structure', 'communication', 'fluency'];
    const currentIndex = levels.indexOf(currentLevel);
    
    if (currentIndex < levels.length - 1) {
        const nextLevel = levels[currentIndex + 1];
        showLevel(nextLevel);
        
        // Update nav
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.level === nextLevel) {
                item.classList.add('active');
            }
        });
    }
}

function previousLevel() {
    const levels = ['intro', 'foundation', 'building', 'structure', 'communication', 'fluency'];
    const currentIndex = levels.indexOf(currentLevel);
    
    if (currentIndex > 0) {
        const prevLevel = levels[currentIndex - 1];
        showLevel(prevLevel);
        
        // Update nav
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.level === prevLevel) {
                item.classList.add('active');
            }
        });
    }
}

// Journey step clicks
document.addEventListener('click', function(e) {
    if (e.target.closest('.journey-step')) {
        const step = e.target.closest('.journey-step');
        const level = step.dataset.level;
        if (level) {
            showLevel(level);
            
            // Update nav
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
                if (item.dataset.level === level) {
                    item.classList.add('active');
                }
            });
        }
    }
});

// Add playing animation CSS
const playingStyle = document.createElement('style');
playingStyle.textContent = `
    .number-item.playing {
        animation: pulse 1s ease-in-out;
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        color: white;
        transform: scale(1.1);
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.15); }
    }
`;
document.head.appendChild(playingStyle);