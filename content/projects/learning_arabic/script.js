// Arabic Learning Platform - Enhanced Interactive JavaScript

// Use enhanced audio data from audio-data.js
const arabicAlphabet = Object.keys(ArabicAudio.letters).map((letter, index) => ({
    letter: letter,
    name: ArabicAudio.letters[letter].name,
    sound: ArabicAudio.letters[letter].phonetic,
    englishSound: ArabicAudio.letters[letter].englishSound,
    examples: ArabicAudio.letters[letter].examples,
    position: index + 1
}));

const arabicNumbers = Object.keys(ArabicAudio.numbers).map(arabicNum => ({
    arabic: arabicNum,
    english: ArabicAudio.numbers[arabicNum].english,
    word: ArabicAudio.numbers[arabicNum].arabic,
    phonetic: ArabicAudio.numbers[arabicNum].phonetic
}));

// Current game state
let currentLevel = 'intro';
let currentLetter = null;
let currentProgress = 0;

// Initialize app when DOM loads
document.addEventListener('DOMContentLoaded', async function() {
    console.log('DOM Content Loaded - Starting Arabic Learning Platform');
    await initializeApp();
});

async function initializeApp() {
    // Load voices first for better pronunciation
    await ArabicAudio.loadVoices();
    
    setupNavigation();
    generateAlphabet();
    generateNumbers();
    initializeRecognitionGame();
    initializeGreetingPractice();
    showLevel('intro');
    
    console.log('Arabic Learning Platform initialized with enhanced audio');
}

// Navigation functionality
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    console.log('Found nav items:', navItems.length);
    
    navItems.forEach(item => {
        console.log('Setting up navigation for:', item.dataset.level);
        item.addEventListener('click', () => {
            const level = item.dataset.level;
            console.log('Navigation clicked:', level);
            showLevel(level);
            
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });
}

function showLevel(levelId) {
    console.log('Showing level:', levelId);
    
    // Hide all sections
    const sections = document.querySelectorAll('.level-section');
    console.log('Found sections:', sections.length);
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(levelId);
    console.log('Target section found:', !!targetSection);
    if (targetSection) {
        targetSection.classList.add('active');
        currentLevel = levelId;
        console.log('Level changed to:', currentLevel);
        
        // Update progress for non-intro levels
        if (levelId !== 'intro') {
            updateProgress(levelId);
        }
    } else {
        console.error('Section not found:', levelId);
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
    console.log('Start Learning clicked');
    showLevel('foundation');
    
    // Update nav buttons
    const foundationBtn = document.querySelector('[data-level="foundation"]');
    const introBtn = document.querySelector('[data-level="intro"]');
    
    if (foundationBtn) {
        foundationBtn.classList.add('active');
        console.log('Foundation button made active');
    }
    if (introBtn) {
        introBtn.classList.remove('active');
        console.log('Intro button made inactive');
    }
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
    // Use enhanced audio system
    const success = ArabicAudio.speak(letterData.letter, {
        phonetic: letterData.sound,
        rate: 0.7,
        onStart: () => console.log(`Playing: ${letterData.letter} (${letterData.name})`),
        onEnd: () => console.log(`Finished: ${letterData.letter}`)
    });
    
    if (!success) {
        console.warn('Could not play letter sound:', letterData.letter);
    }
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
    if (numberData) {
        ArabicAudio.speak(numberData.word, {
            phonetic: numberData.phonetic,
            rate: 0.7
        });
        
        // Visual feedback
        const numberItems = document.querySelectorAll('.number-item');
        const targetItem = numberItems[number - 1];
        if (targetItem) {
            targetItem.classList.add('playing');
            setTimeout(() => {
                targetItem.classList.remove('playing');
            }, 1000);
        }
    }
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

// Letter Connections functionality
function showLetterForms() {
    const letterSelector = document.getElementById('letterSelector');
    const selectedLetter = letterSelector.value;
    
    if (!selectedLetter || !ArabicAudio.letterForms[selectedLetter]) {
        // Clear displays if no selection
        document.getElementById('isolatedForm').textContent = '-';
        document.getElementById('initialForm').textContent = '-';
        document.getElementById('medialForm').textContent = '-';
        document.getElementById('finalForm').textContent = '-';
        document.getElementById('exampleWordsList').innerHTML = '';
        return;
    }
    
    const letterData = ArabicAudio.letterForms[selectedLetter];
    
    // Update letter forms display
    document.getElementById('isolatedForm').textContent = letterData.isolated;
    document.getElementById('initialForm').textContent = letterData.initial;
    document.getElementById('medialForm').textContent = letterData.medial;
    document.getElementById('finalForm').textContent = letterData.final;
    
    // Update example words
    const examplesList = document.getElementById('exampleWordsList');
    examplesList.innerHTML = '';
    
    letterData.examples.forEach(word => {
        const wordElement = document.createElement('div');
        wordElement.className = 'example-word';
        wordElement.innerHTML = `
            <span class="arabic-word">${word}</span>
            <button class="play-word-btn" onclick="playWord('${word}')" title="Play pronunciation">🔊</button>
        `;
        examplesList.appendChild(wordElement);
    });
    
    // Add visual feedback
    const forms = document.querySelectorAll('.form-letter');
    forms.forEach(form => {
        form.style.animation = 'letterReveal 0.5s ease-out';
    });
}

function playWord(word) {
    ArabicAudio.speak(word, {
        rate: 0.6,
        onStart: () => {
            const buttons = document.querySelectorAll('.play-word-btn');
            buttons.forEach(btn => {
                if (btn.onclick.toString().includes(word)) {
                    btn.style.transform = 'scale(1.2)';
                    btn.style.background = 'var(--secondary-color)';
                }
            });
        },
        onEnd: () => {
            const buttons = document.querySelectorAll('.play-word-btn');
            buttons.forEach(btn => {
                if (btn.onclick.toString().includes(word)) {
                    btn.style.transform = 'scale(1)';
                    btn.style.background = 'var(--accent-color)';
                }
            });
        }
    });
}

// Enhanced Greeting functions
function playGreeting(greeting) {
    const greetingMap = {
        'salam': 'السلام عليكم',
        'ahlan': 'أهلاً وسهلاً',
        'marhaban': 'مرحباً',
        'kayf-halak': 'كيف حالك؟',
        'kayf-halik': 'كيف حالكِ؟',
        'hamdulillah': 'الحمد لله',
        'bikhayr': 'بخير، شكراً',
        'ma-salamah': 'مع السلامة',
        'ila-liqa': 'إلى اللقاء'
    };
    
    const arabicText = greetingMap[greeting];
    if (arabicText && ArabicAudio.greetings[arabicText]) {
        const greetingData = ArabicAudio.greetings[arabicText];
        ArabicAudio.speak(arabicText, {
            phonetic: greetingData.phonetic,
            rate: 0.7,
            onStart: () => {
                // Visual feedback for the greeting being played
                const greetingItems = document.querySelectorAll('.greeting-item');
                greetingItems.forEach(item => {
                    if (item.dataset.greeting === arabicText) {
                        item.style.transform = 'scale(1.05)';
                        item.style.background = 'var(--gradient-arabic)';
                        item.style.color = 'white';
                    }
                });
            },
            onEnd: () => {
                // Reset visual feedback
                const greetingItems = document.querySelectorAll('.greeting-item');
                greetingItems.forEach(item => {
                    if (item.dataset.greeting === arabicText) {
                        item.style.transform = 'scale(1)';
                        item.style.background = '';
                        item.style.color = '';
                    }
                });
            }
        });
    }
}

// Greeting Practice functionality
let currentGreetingQuestion = 0;
const greetingQuestions = [
    {
        question: 'السلام عليكم',
        questionEn: 'Peace be upon you',
        correct: 'وعليكم السلام',
        options: ['وعليكم السلام', 'أهلاً وسهلاً', 'مع السلامة']
    },
    {
        question: 'كيف حالك؟',
        questionEn: 'How are you?',
        correct: 'الحمد لله',
        options: ['الحمد لله', 'مرحباً', 'شكراً']
    },
    {
        question: 'شكراً',
        questionEn: 'Thank you',
        correct: 'عفواً',
        options: ['عفواً', 'بخير', 'إلى اللقاء']
    }
];

function initializeGreetingPractice() {
    loadGreetingQuestion();
}

function loadGreetingQuestion() {
    const question = greetingQuestions[currentGreetingQuestion];
    document.getElementById('practiceQuestion').textContent = question.question;
    document.getElementById('practiceQuestionEn').textContent = question.questionEn;
    
    // Update option buttons
    const practiceButtons = document.querySelectorAll('.practice-btn');
    question.options.forEach((option, index) => {
        if (practiceButtons[index]) {
            practiceButtons[index].textContent = option;
            practiceButtons[index].onclick = () => checkGreetingAnswer(option);
            practiceButtons[index].classList.remove('correct', 'incorrect');
        }
    });
    
    // Clear feedback
    document.getElementById('greetingFeedback').textContent = '';
    document.getElementById('greetingFeedback').className = 'practice-feedback';
}

function checkGreetingAnswer(answer) {
    const question = greetingQuestions[currentGreetingQuestion];
    const feedback = document.getElementById('greetingFeedback');
    const practiceButtons = document.querySelectorAll('.practice-btn');
    
    if (answer === question.correct) {
        feedback.textContent = 'ممتاز! Excellent!';
        feedback.className = 'practice-feedback success';
        
        // Highlight correct button
        practiceButtons.forEach(btn => {
            if (btn.textContent === answer) {
                btn.classList.add('correct');
            }
        });
        
        // Move to next question after delay
        setTimeout(() => {
            currentGreetingQuestion = (currentGreetingQuestion + 1) % greetingQuestions.length;
            loadGreetingQuestion();
        }, 2000);
        
    } else {
        feedback.textContent = `خطأ - Wrong! The correct answer is "${question.correct}"`;
        feedback.className = 'practice-feedback error';
        
        // Highlight correct and incorrect buttons
        practiceButtons.forEach(btn => {
            if (btn.textContent === answer) {
                btn.classList.add('incorrect');
            } else if (btn.textContent === question.correct) {
                btn.classList.add('correct');
            }
        });
        
        setTimeout(() => {
            loadGreetingQuestion();
        }, 3000);
    }
}

// Enhanced Conversation Simulator
let conversationStep = 1;
let conversationScenario = 0;

const conversationScenarios = [
    {
        title: "Meeting Someone New",
        description: "You're meeting Ahmed, a new colleague. Practice the greeting exchange.",
        steps: [
            {
                message: { arabic: 'السلام عليكم', transliteration: 'as-salāmu ʿalaykum', english: 'Peace be upon you' },
                responses: [
                    { arabic: 'وعليكم السلام', transliteration: 'wa ʿalaykumu as-salām', english: 'And upon you peace', correct: true },
                    { arabic: 'شكراً', transliteration: 'shukran', english: 'Thank you', correct: false },
                    { arabic: 'مع السلامة', transliteration: 'maʿa as-salāma', english: 'Goodbye', correct: false }
                ],
                tip: '"السلام عليكم" is the traditional Islamic greeting. The proper response is "وعليكم السلام" which mirrors back the greeting.',
                feedback: {
                    correct: 'Perfect! You responded with the traditional Islamic greeting response.',
                    incorrect: 'In Arabic culture, when someone says "السلام عليكم", the proper response is "وعليكم السلام".'
                }
            },
            {
                message: { arabic: 'كيف حالك؟', transliteration: 'kayf ḥālak?', english: 'How are you?' },
                responses: [
                    { arabic: 'الحمد لله', transliteration: 'al-ḥamdu lillāh', english: 'Praise be to God', correct: true },
                    { arabic: 'مرحباً', transliteration: 'marḥaban', english: 'Hello', correct: false },
                    { arabic: 'إلى اللقاء', transliteration: 'ilā al-liqā\'', english: 'See you later', correct: false }
                ],
                tip: '"الحمد لله" is a common response meaning you\'re doing well by God\'s grace.',
                feedback: {
                    correct: 'Excellent! "الحمد لله" shows gratitude and is a culturally appropriate response.',
                    incorrect: 'When asked "كيف حالك?" (How are you?), "الحمد لله" is the most common positive response.'
                }
            },
            {
                message: { arabic: 'ما اسمك؟', transliteration: 'mā ismuk?', english: 'What is your name?' },
                responses: [
                    { arabic: 'اسمي...', transliteration: 'ismī...', english: 'My name is...', correct: true },
                    { arabic: 'شكراً', transliteration: 'shukran', english: 'Thank you', correct: false },
                    { arabic: 'بخير', transliteration: 'bi-khayr', english: 'Fine', correct: false }
                ],
                tip: 'Use "اسمي" (my name is) to introduce yourself.',
                feedback: {
                    correct: 'Great! You properly introduced yourself using "اسمي".',
                    incorrect: 'When asked for your name, respond with "اسمي" followed by your name.'
                }
            },
            {
                message: { arabic: 'تشرفنا بلقائك', transliteration: 'tasharrafnā bi-liqā\'ik', english: 'Pleased to meet you' },
                responses: [
                    { arabic: 'وأنا كذلك', transliteration: 'wa anā kadhālik', english: 'Me too / Likewise', correct: true },
                    { arabic: 'السلام عليكم', transliteration: 'as-salāmu ʿalaykum', english: 'Peace be upon you', correct: false },
                    { arabic: 'كيف حالك؟', transliteration: 'kayf ḥālak?', english: 'How are you?', correct: false }
                ],
                tip: '"وأنا كذلك" means "me too" or "likewise" - perfect for responding to "pleased to meet you".',
                feedback: {
                    correct: 'Perfect! You responded appropriately with "وأنا كذلك" (likewise).',
                    incorrect: 'When someone says they\'re pleased to meet you, "وأنا كذلك" (likewise) is the appropriate response.'
                }
            }
        ]
    }
];

function handleConversationResponse(arabic, transliteration, english, isCorrect) {
    const chatWindow = document.getElementById('chatWindow');
    const responseSection = document.getElementById('responseSection');
    const culturalTip = document.getElementById('culturalTip');
    
    // Add user's response to chat
    const userMessage = document.createElement('div');
    userMessage.className = 'message sent';
    userMessage.innerHTML = `
        <div class="arabic">${arabic}</div>
        <div class="transliteration">${transliteration}</div>
        <div class="english">${english}</div>
    `;
    chatWindow.appendChild(userMessage);
    
    // Hide response section temporarily
    responseSection.style.display = 'none';
    
    const currentScenario = conversationScenarios[conversationScenario];
    const currentStepData = currentScenario.steps[conversationStep - 1];
    
    // Show feedback
    setTimeout(() => {
        const feedbackMessage = document.createElement('div');
        feedbackMessage.className = `message received ${isCorrect ? 'success' : 'error'}`;
        feedbackMessage.innerHTML = `
            <div class="feedback-text">${isCorrect ? currentStepData.feedback.correct : currentStepData.feedback.incorrect}</div>
        `;
        chatWindow.appendChild(feedbackMessage);
        chatWindow.scrollTop = chatWindow.scrollHeight;
        
        // Move to next step or complete conversation
        setTimeout(() => {
            if (conversationStep < currentScenario.steps.length) {
                conversationStep++;
                loadNextConversationStep();
            } else {
                completeConversation();
            }
        }, 2000);
    }, 1000);
    
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function loadNextConversationStep() {
    const chatWindow = document.getElementById('chatWindow');
    const responseSection = document.getElementById('responseSection');
    const culturalTip = document.getElementById('culturalTip');
    const currentStepEl = document.getElementById('currentStep');
    const progressBar = document.getElementById('conversationProgress');
    
    const currentScenario = conversationScenarios[conversationScenario];
    const currentStepData = currentScenario.steps[conversationStep - 1];
    
    // Add Ahmed's next message
    const aiMessage = document.createElement('div');
    aiMessage.className = 'message received';
    aiMessage.innerHTML = `
        <div class="arabic">${currentStepData.message.arabic}</div>
        <div class="transliteration">${currentStepData.message.transliteration}</div>
        <div class="english">${currentStepData.message.english}</div>
    `;
    chatWindow.appendChild(aiMessage);
    
    // Update response options
    const responseOptions = document.getElementById('responseOptions');
    responseOptions.innerHTML = '';
    
    currentStepData.responses.forEach(response => {
        const button = document.createElement('button');
        button.className = `response-btn ${response.correct ? 'correct' : ''}`;
        button.innerHTML = `
            <div class="option-arabic">${response.arabic}</div>
            <div class="option-english">${response.english}</div>
        `;
        button.onclick = () => handleConversationResponse(
            response.arabic, 
            response.transliteration, 
            response.english, 
            response.correct
        );
        responseOptions.appendChild(button);
    });
    
    // Update cultural tip
    culturalTip.querySelector('.tip-content').innerHTML = `
        <strong>Cultural Tip:</strong> ${currentStepData.tip}
    `;
    
    // Update progress
    currentStepEl.textContent = conversationStep;
    const progressPercent = (conversationStep / currentScenario.steps.length) * 100;
    progressBar.style.width = progressPercent + '%';
    
    // Show response section
    responseSection.style.display = 'block';
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function completeConversation() {
    const chatWindow = document.getElementById('chatWindow');
    const responseSection = document.getElementById('responseSection');
    
    // Add completion message
    const completionMessage = document.createElement('div');
    completionMessage.className = 'message received success';
    completionMessage.innerHTML = `
        <div class="completion-text">
            <strong>🎉 تهانينا! Congratulations!</strong><br>
            You've successfully completed this conversation scenario. 
            You've learned the proper way to greet someone and respond culturally appropriately in Arabic.
        </div>
    `;
    chatWindow.appendChild(completionMessage);
    
    // Hide response section and show controls
    responseSection.style.display = 'none';
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function restartConversation() {
    conversationStep = 1;
    const chatWindow = document.getElementById('chatWindow');
    const responseSection = document.getElementById('responseSection');
    const currentStepEl = document.getElementById('currentStep');
    const progressBar = document.getElementById('conversationProgress');
    
    // Reset chat window to initial state
    chatWindow.innerHTML = `
        <div class="conversation-start">
            <div class="character-intro">
                <div class="character-avatar">👨</div>
                <div class="character-name">Ahmed</div>
            </div>
            <div class="message received" id="initialMessage">
                <div class="arabic">السلام عليكم</div>
                <div class="transliteration">as-salāmu ʿalaykum</div>
                <div class="english">Peace be upon you</div>
            </div>
        </div>
    `;
    
    // Reset progress
    currentStepEl.textContent = '1';
    progressBar.style.width = '25%';
    
    // Reset response section
    const responseOptions = document.getElementById('responseOptions');
    const firstStepData = conversationScenarios[conversationScenario].steps[0];
    
    responseOptions.innerHTML = '';
    firstStepData.responses.forEach(response => {
        const button = document.createElement('button');
        button.className = `response-btn ${response.correct ? 'correct' : ''}`;
        button.innerHTML = `
            <div class="option-arabic">${response.arabic}</div>
            <div class="option-english">${response.english}</div>
        `;
        button.onclick = () => handleConversationResponse(
            response.arabic, 
            response.transliteration, 
            response.english, 
            response.correct
        );
        responseOptions.appendChild(button);
    });
    
    responseSection.style.display = 'block';
}

function nextScenario() {
    // For now, just restart the same scenario
    // In the future, this could load different scenarios
    restartConversation();
}

// Navigation between levels
function nextLevel() {
    const levels = ['intro', 'foundation', 'building', 'completion'];
    const currentIndex = levels.indexOf(currentLevel);
    
    if (currentIndex < levels.length - 1) {
        const nextLevelName = levels[currentIndex + 1];
        showLevel(nextLevelName);
        
        // Update nav
        updateActiveNav(nextLevelName);
    }
}

function previousLevel() {
    const levels = ['intro', 'foundation', 'building', 'completion'];
    const currentIndex = levels.indexOf(currentLevel);
    
    if (currentIndex > 0) {
        const prevLevelName = levels[currentIndex - 1];
        showLevel(prevLevelName);
        
        // Update nav
        updateActiveNav(prevLevelName);
    }
}

function updateActiveNav(levelName) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.level === levelName) {
            item.classList.add('active');
        }
    });
}

// Restart course function
function restartCourse() {
    showLevel('intro');
    updateActiveNav('intro');
    
    // Reset progress
    currentProgress = 0;
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        bar.style.width = '0%';
    });
    
    // Reset recognition game
    initializeRecognitionGame();
    
    console.log('Course restarted');
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