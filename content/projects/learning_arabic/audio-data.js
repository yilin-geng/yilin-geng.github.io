// Enhanced Arabic Audio Data with better pronunciation
// Using phonetic representations for Web Speech API

const ArabicAudio = {
    // Arabic Letters with enhanced pronunciation data
    letters: {
        'ا': { 
            name: 'alif', 
            phonetic: 'aa', 
            englishSound: 'a as in father',
            examples: ['أب (ab) - father', 'أم (um) - mother']
        },
        'ب': { 
            name: 'ba', 
            phonetic: 'ba', 
            englishSound: 'b as in book',
            examples: ['بيت (bayt) - house', 'باب (bab) - door']
        },
        'ت': { 
            name: 'ta', 
            phonetic: 'ta', 
            englishSound: 't as in top',
            examples: ['تفاح (tuffah) - apple', 'تلميذ (tilmeedh) - student']
        },
        'ث': { 
            name: 'tha', 
            phonetic: 'th a', 
            englishSound: 'th as in think',
            examples: ['ثلج (thalj) - snow', 'ثلاثة (thalaatha) - three']
        },
        'ج': { 
            name: 'jim', 
            phonetic: 'jee m', 
            englishSound: 'j as in jam',
            examples: ['جميل (jameel) - beautiful', 'جبل (jabal) - mountain']
        },
        'ح': { 
            name: 'ha', 
            phonetic: 'h aa', 
            englishSound: 'h (breathy)',
            examples: ['حب (hub) - love', 'حديقة (hadeeqa) - garden']
        },
        'خ': { 
            name: 'kha', 
            phonetic: 'kh aa', 
            englishSound: 'ch as in loch',
            examples: ['خبز (khubz) - bread', 'خير (khayr) - good']
        },
        'د': { 
            name: 'dal', 
            phonetic: 'daal', 
            englishSound: 'd as in door',
            examples: ['دار (dar) - house', 'درس (dars) - lesson']
        },
        'ذ': { 
            name: 'dhal', 
            phonetic: 'th aa l', 
            englishSound: 'th as in that',
            examples: ['ذهب (dhahab) - gold', 'ذئب (dhi\'b) - wolf']
        },
        'ر': { 
            name: 'ra', 
            phonetic: 'raa', 
            englishSound: 'r (rolled)',
            examples: ['رجل (rajul) - man', 'رسالة (risala) - letter']
        },
        'ز': { 
            name: 'zay', 
            phonetic: 'zaay', 
            englishSound: 'z as in zoo',
            examples: ['زهرة (zahra) - flower', 'زيت (zayt) - oil']
        },
        'س': { 
            name: 'sin', 
            phonetic: 'seen', 
            englishSound: 's as in sun',
            examples: ['سلام (salam) - peace', 'سيارة (sayyara) - car']
        },
        'ش': { 
            name: 'shin', 
            phonetic: 'sheen', 
            englishSound: 'sh as in ship',
            examples: ['شمس (shams) - sun', 'شكرا (shukran) - thank you']
        },
        'ص': { 
            name: 'sad', 
            phonetic: 's aad', 
            englishSound: 's (emphatic)',
            examples: ['صباح (sabah) - morning', 'صديق (sadeeq) - friend']
        },
        'ض': { 
            name: 'dad', 
            phonetic: 'd aad', 
            englishSound: 'd (emphatic)',
            examples: ['ضوء (daw\') - light', 'أضافة (idafa) - addition']
        },
        'ط': { 
            name: 'ta', 
            phonetic: 't aa', 
            englishSound: 't (emphatic)',
            examples: ['طعام (ta\'am) - food', 'طالب (talib) - student']
        },
        'ظ': { 
            name: 'za', 
            phonetic: 'z aa', 
            englishSound: 'z (emphatic)',
            examples: ['ظهر (zuhr) - noon', 'نظارة (nazzara) - glasses']
        },
        'ع': { 
            name: 'ayn', 
            phonetic: 'ayn', 
            englishSound: '\' (glottal)',
            examples: ['عين (ayn) - eye', 'علم (ilm) - knowledge']
        },
        'غ': { 
            name: 'ghayn', 
            phonetic: 'ghayn', 
            englishSound: 'gh (gargled r)',
            examples: ['غابة (ghaba) - forest', 'غريب (ghareeb) - strange']
        },
        'ف': { 
            name: 'fa', 
            phonetic: 'faa', 
            englishSound: 'f as in fun',
            examples: ['فيل (feel) - elephant', 'فاكهة (fakiha) - fruit']
        },
        'ق': { 
            name: 'qaf', 
            phonetic: 'qaaf', 
            englishSound: 'q (deep k)',
            examples: ['قلم (qalam) - pen', 'قمر (qamar) - moon']
        },
        'ك': { 
            name: 'kaf', 
            phonetic: 'kaaf', 
            englishSound: 'k as in key',
            examples: ['كتاب (kitab) - book', 'كلب (kalb) - dog']
        },
        'ل': { 
            name: 'lam', 
            phonetic: 'laam', 
            englishSound: 'l as in love',
            examples: ['لون (lawn) - color', 'ليل (layl) - night']
        },
        'م': { 
            name: 'mim', 
            phonetic: 'meem', 
            englishSound: 'm as in moon',
            examples: ['ماء (ma\') - water', 'مدرسة (madrasa) - school']
        },
        'ن': { 
            name: 'nun', 
            phonetic: 'noon', 
            englishSound: 'n as in noon',
            examples: ['نار (nar) - fire', 'نجمة (najma) - star']
        },
        'ه': { 
            name: 'ha', 
            phonetic: 'haa', 
            englishSound: 'h as in house',
            examples: ['هدية (hadiyya) - gift', 'هواء (hawa\') - air']
        },
        'و': { 
            name: 'waw', 
            phonetic: 'waaw', 
            englishSound: 'w as in water',
            examples: ['ورد (ward) - roses', 'ولد (walad) - boy']
        },
        'ي': { 
            name: 'ya', 
            phonetic: 'yaa', 
            englishSound: 'y as in yes',
            examples: ['يد (yad) - hand', 'يوم (yawm) - day']
        }
    },

    // Arabic Numbers with pronunciation
    numbers: {
        '١': { english: '1', arabic: 'واحد', phonetic: 'waa hid' },
        '٢': { english: '2', arabic: 'اثنان', phonetic: 'ith naan' },
        '٣': { english: '3', arabic: 'ثلاثة', phonetic: 'tha laa tha' },
        '٤': { english: '4', arabic: 'أربعة', phonetic: 'ar ba a' },
        '٥': { english: '5', arabic: 'خمسة', phonetic: 'kham sa' },
        '٦': { english: '6', arabic: 'ستة', phonetic: 'sit ta' },
        '٧': { english: '7', arabic: 'سبعة', phonetic: 'sab a' },
        '٨': { english: '8', arabic: 'ثمانية', phonetic: 'tha maa ni ya' },
        '٩': { english: '9', arabic: 'تسعة', phonetic: 'tis a' },
        '١٠': { english: '10', arabic: 'عشرة', phonetic: 'ash a ra' }
    },

    // Letter forms for connection practice
    letterForms: {
        'ب': { isolated: 'ب', initial: 'بـ', medial: 'ـبـ', final: 'ـب', examples: ['بيت', 'كتب', 'حبيب'] },
        'ت': { isolated: 'ت', initial: 'تـ', medial: 'ـتـ', final: 'ـت', examples: ['تفاح', 'كتاب', 'بيت'] },
        'ج': { isolated: 'ج', initial: 'جـ', medial: 'ـجـ', final: 'ـج', examples: ['جميل', 'رجل', 'برج'] },
        'د': { isolated: 'د', initial: 'د', medial: 'د', final: 'ـد', examples: ['دار', 'يد', 'جديد'] },
        'ر': { isolated: 'ر', initial: 'ر', medial: 'ر', final: 'ـر', examples: ['رجل', 'بر', 'كبير'] },
        'س': { isolated: 'س', initial: 'سـ', medial: 'ـسـ', final: 'ـس', examples: ['سلام', 'رأس', 'درس'] },
        'ع': { isolated: 'ع', initial: 'عـ', medial: 'ـعـ', final: 'ـع', examples: ['علم', 'معرفة', 'سمع'] },
        'ف': { isolated: 'ف', initial: 'فـ', medial: 'ـفـ', final: 'ـف', examples: ['فيل', 'مفتاح', 'صف'] },
        'ق': { isolated: 'ق', initial: 'قـ', medial: 'ـقـ', final: 'ـق', examples: ['قلم', 'وقت', 'حق'] },
        'ل': { isolated: 'ل', initial: 'لـ', medial: 'ـلـ', final: 'ـل', examples: ['ليل', 'كلام', 'جمل'] },
        'م': { isolated: 'م', initial: 'مـ', medial: 'ـمـ', final: 'ـم', examples: ['ماء', 'كلمة', 'اسم'] },
        'ن': { isolated: 'ن', initial: 'نـ', medial: 'ـنـ', final: 'ـن', examples: ['نار', 'منزل', 'لون'] },
        'ه': { isolated: 'ه', initial: 'هـ', medial: 'ـهـ', final: 'ـه', examples: ['هدية', 'فهم', 'وجه'] },
        'ي': { isolated: 'ي', initial: 'يـ', medial: 'ـيـ', final: 'ـي', examples: ['يد', 'بيت', 'كبير'] }
    },

    // Enhanced greetings with more options
    greetings: {
        'السلام عليكم': {
            transliteration: 'as-salāmu ʿalaykum',
            phonetic: 'as sa laa mu a lay kum',
            english: 'Peace be upon you',
            response: 'وعليكم السلام',
            responsePhonetic: 'wa a lay ku mus sa laam'
        },
        'أهلاً وسهلاً': {
            transliteration: 'ahlan wa sahlan',
            phonetic: 'ah lan wa sah lan',
            english: 'Welcome',
            usage: 'Welcoming guests or visitors'
        },
        'مرحباً': {
            transliteration: 'marḥaban', 
            phonetic: 'mar ha ban',
            english: 'Hello (informal)',
            usage: 'Casual greeting'
        },
        'كيف حالك؟': {
            transliteration: 'kayf ḥālak?',
            phonetic: 'kayf haa lak',
            english: 'How are you? (to male)',
            responses: ['بخير', 'الحمد لله', 'تمام']
        },
        'كيف حالك؟ (f)': {
            transliteration: 'kayf ḥālik?',
            phonetic: 'kayf haa lik',
            english: 'How are you? (to female)',
            note: 'Note the ِ ending for feminine'
        },
        'الحمد لله': {
            transliteration: 'al-ḥamdu lillāh',
            phonetic: 'al ham du lil laah',
            english: 'Praise be to God (I\'m fine)',
            usage: 'Common response meaning fine'
        },
        'بخير': {
            transliteration: 'bi-khayr, shukran',
            phonetic: 'bi khayr shuk ran',
            english: 'Fine, thank you',
            usage: 'Simple positive response'
        },
        'شكراً': {
            transliteration: 'shukran',
            phonetic: 'shuk ran',
            english: 'Thank you',
            response: 'عفواً'
        },
        'مع السلامة': {
            transliteration: 'maʿa as-salāma',
            phonetic: 'ma a as sa laa ma',
            english: 'Go with peace (goodbye)',
            usage: 'Formal farewell'
        },
        'إلى اللقاء': {
            transliteration: 'ilā al-liqā\'',
            phonetic: 'i laa al li qaa',
            english: 'Until we meet again',
            usage: 'See you later'
        }
    },

    // Enhanced pronunciation function
    speak: function(text, options = {}) {
        if (!('speechSynthesis' in window)) {
            console.warn('Speech synthesis not supported');
            return false;
        }

        // Cancel any ongoing speech
        speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance();
        
        // Try to find Arabic voice, fallback to default
        const voices = speechSynthesis.getVoices();
        const arabicVoice = voices.find(voice => 
            voice.lang.startsWith('ar') || 
            voice.name.toLowerCase().includes('arabic') ||
            voice.name.toLowerCase().includes('نادية') ||
            voice.name.toLowerCase().includes('hoda')
        );

        if (arabicVoice) {
            utterance.voice = arabicVoice;
            utterance.lang = arabicVoice.lang;
        } else {
            utterance.lang = 'ar-SA'; // Saudi Arabic
        }

        // Use phonetic if Arabic voice not available
        utterance.text = arabicVoice ? text : (options.phonetic || text);
        utterance.rate = options.rate || 0.7; // Slower for learning
        utterance.pitch = options.pitch || 1;
        utterance.volume = options.volume || 1;

        // Add event listeners
        utterance.onstart = () => options.onStart && options.onStart();
        utterance.onend = () => options.onEnd && options.onEnd();
        utterance.onerror = (event) => {
            console.warn('Speech synthesis error:', event);
            options.onError && options.onError(event);
        };

        speechSynthesis.speak(utterance);
        return true;
    },

    // Batch load voices (call this on page load)
    loadVoices: function() {
        return new Promise((resolve) => {
            const voices = speechSynthesis.getVoices();
            if (voices.length > 0) {
                resolve(voices);
            } else {
                speechSynthesis.onvoiceschanged = () => {
                    resolve(speechSynthesis.getVoices());
                };
            }
        });
    }
};

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ArabicAudio;
} else {
    window.ArabicAudio = ArabicAudio;
}