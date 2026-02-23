'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'hi' | 'ta' | 'te' | 'kn' | 'ml';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations.en) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation dictionaries
const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.examples': 'Examples',
    'nav.documentation': 'Documentation',

    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.retry': 'Try Again',
    'common.submit': 'Submit',
    'common.cancel': 'Cancel',

    // API related
    'api.key.placeholder': 'Enter your Sarvam API key',
    'api.key.required': 'API key is required',
    'api.key.invalid': 'Invalid API key format',
    'api.rate.limit': 'Rate limit exceeded. Please try again later.',
    'api.error.network': 'Network error. Please check your connection.',
    'api.error.server': 'Server error. Please try again later.',

    // Accessibility
    'a11y.skip.to.main': 'Skip to main content',
    'a11y.theme.toggle': 'Toggle theme',
    'a11y.language.select': 'Select language',
  },
  hi: {
    // Navigation
    'nav.home': 'होम',
    'nav.examples': 'उदाहरण',
    'nav.documentation': 'दस्तावेज़ीकरण',

    // Common
    'common.loading': 'लोड हो रहा है...',
    'common.error': 'एक त्रुटि हुई',
    'common.retry': 'पुनः प्रयास करें',
    'common.submit': 'सबमिट करें',
    'common.cancel': 'रद्द करें',

    // API related
    'api.key.placeholder': 'अपना सर्वम API कुंजी दर्ज करें',
    'api.key.required': 'API कुंजी आवश्यक है',
    'api.key.invalid': 'अमान्य API कुंजी प्रारूप',
    'api.rate.limit': 'दर सीमा पार हो गई। कृपया बाद में पुनः प्रयास करें।',
    'api.error.network': 'नेटवर्क त्रुटि। कृपया अपना कनेक्शन जांचें।',
    'api.error.server': 'सर्वर त्रुटि। कृपया बाद में पुनः प्रयास करें।',

    // Accessibility
    'a11y.skip.to.main': 'मुख्य सामग्री पर जाएं',
    'a11y.theme.toggle': 'थीम टॉगल करें',
    'a11y.language.select': 'भाषा चुनें',
  },
  ta: {
    // Navigation
    'nav.home': 'முகப்பு',
    'nav.examples': 'எடுத்துக்காட்டுகள்',
    'nav.documentation': 'ஆவணங்கள்',

    // Common
    'common.loading': 'ஏற்றப்படுகிறது...',
    'common.error': 'பிழை ஏற்பட்டது',
    'common.retry': 'மீண்டும் முயற்சிக்கவும்',
    'common.submit': 'சமர்ப்பிக்கவும்',
    'common.cancel': 'ரத்துசெய்யவும்',

    // API related
    'api.key.placeholder': 'உங்கள் சர்வம் API விசையை உள்ளீடு செய்யவும்',
    'api.key.required': 'API விசை தேவை',
    'api.key.invalid': 'தவறான API விசை வடிவம்',
    'api.rate.limit': 'விகித வரம்பு மீறப்பட்டது. பின்னர் மீண்டும் முயற்சிக்கவும்.',
    'api.error.network': 'பிணைய பிழை. உங்கள் இணைப்பை சரிபார்க்கவும்.',
    'api.error.server': 'சேவையக பிழை. பின்னர் மீண்டும் முயற்சிக்கவும்.',

    // Accessibility
    'a11y.skip.to.main': 'முக்கிய உள்ளடக்கத்திற்கு செல்லவும்',
    'a11y.theme.toggle': 'தீம் மாற்று',
    'a11y.language.select': 'மொழியைத் தேர்ந்தெடுக்கவும்',
  },
  te: {
    // Navigation
    'nav.home': 'హోమ్',
    'nav.examples': 'ఉదాహరణలు',
    'nav.documentation': 'పత్రం',

    // Common
    'common.loading': 'లోడ్ అవుతోంది...',
    'common.error': 'ఒక లోపం సంభవించింది',
    'common.retry': 'మళ్లీ ప్రయత్నించండి',
    'common.submit': 'సమర్పించు',
    'common.cancel': 'రద్దు చేయు',

    // API related
    'api.key.placeholder': 'మీ సర్వం API కీని నమోదు చేయండి',
    'api.key.required': 'API కీ అవసరం',
    'api.key.invalid': 'చెల్లని API కీ ఫార్మాట్',
    'api.rate.limit': 'రేట్ పరిమితి మించిపోయింది. దయచేసి తర్వాత మళ్లీ ప్రయత్నించండి.',
    'api.error.network': 'నెట్వర్క్ లోపం. దయచేసి మీ కనెక్షన్‌ను తనిఖీ చేయండి.',
    'api.error.server': 'సర్వర్ లోపం. దయచేసి తర్వాత మళ్లీ ప్రయత్నించండి.',

    // Accessibility
    'a11y.skip.to.main': 'ప్రధాన కంటెంట్‌కు వెళ్లు',
    'a11y.theme.toggle': 'థీమ్ టోగుల్ చేయి',
    'a11y.language.select': 'భాష ఎంచుకోండి',
  },
  kn: {
    // Navigation
    'nav.home': 'ಮುಖ್ಯ ಪುಟ',
    'nav.examples': 'ಉದಾಹರಣೆಗಳು',
    'nav.documentation': 'ದಾಖಲಾತಿ',

    // Common
    'common.loading': 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
    'common.error': 'ದೋಷ ಸಂಭವಿಸಿದೆ',
    'common.retry': 'ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ',
    'common.submit': 'ಸಲ್ಲಿಸಿ',
    'common.cancel': 'ರದ್ದುಗೊಳಿಸಿ',

    // API related
    'api.key.placeholder': 'ನಿಮ್ಮ ಸರ್ವಂ API ಕೀ ನಮೂದಿಸಿ',
    'api.key.required': 'API ಕೀ ಅಗತ್ಯವಿದೆ',
    'api.key.invalid': 'ಅಮಾನ್ಯ API ಕೀ ಸ್ವರೂಪ',
    'api.rate.limit': 'ದರ ಮಿತಿ ಮೀರಿದೆ. ದಯವಿಟ್ಟು ನಂತರ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
    'api.error.network': 'ನೆಟ್‌ವರ್ಕ್ ದೋಷ. ದಯವಿಟ್ಟು ನಿಮ್ಮ ಸಂಪರ್ಕವನ್ನು ಪರಿಶೀಲಿಸಿ.',
    'api.error.server': 'ಸರ್ವರ್ ದೋಷ. ದಯವಿಟ್ಟು ನಂತರ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',

    // Accessibility
    'a11y.skip.to.main': 'ಮುಖ್ಯ ವಿಷಯಕ್ಕೆ ಹೋಗಿ',
    'a11y.theme.toggle': 'ಥೀಮ್ ಟೋಗಲ್ ಮಾಡಿ',
    'a11y.language.select': 'ಭಾಷೆ ಆಯ್ಕೆ ಮಾಡಿ',
  },
  ml: {
    // Navigation
    'nav.home': 'ഹോം',
    'nav.examples': 'ഉദാഹരണങ്ങൾ',
    'nav.documentation': 'രേഖകൾ',

    // Common
    'common.loading': 'ലോഡ് ചെയ്യുന്നു...',
    'common.error': 'ഒരു പിശക് സംഭവിച്ചു',
    'common.retry': 'വീണ്ടും ശ്രമിക്കുക',
    'common.submit': 'സമർപ്പിക്കുക',
    'common.cancel': 'റദ്ദാക്കുക',

    // API related
    'api.key.placeholder': 'നിങ്ങളുടെ സർവം API കീ നൽകുക',
    'api.key.required': 'API കീ ആവശ്യമാണ്',
    'api.key.invalid': 'അസാധുവായ API കീ ഫോർമാറ്റ്',
    'api.rate.limit': 'റേറ്റ് പരിധി കവിഞ്ഞു. ദയവായി പിന്നീട് വീണ്ടും ശ്രമിക്കുക.',
    'api.error.network': 'നെറ്റ്‌വർക്ക് പിശക്. ദയവായി നിങ്ങളുടെ കണക്ഷൻ പരിശോധിക്കുക.',
    'api.error.server': 'സെർവർ പിശക്. ദയവായി പിന്നീട് വീണ്ടും ശ്രമിക്കുക.',

    // Accessibility
    'a11y.skip.to.main': 'പ്രധാന ഉള്ളടക്കത്തിലേക്ക് പോകുക',
    'a11y.theme.toggle': 'തീം മാറ്റുക',
    'a11y.language.select': 'ഭാഷ തിരഞ്ഞെടുക്കുക',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  // Load language from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved && Object.keys(translations).includes(saved)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLanguage(saved);
    }
  }, []);

  // Save language to localStorage when changed
  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);

    // Update document language attribute for screen readers
    document.documentElement.lang = lang === 'en' ? 'en' : `${lang}-IN`;
  };

  const t = (key: keyof typeof translations.en): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export function useTranslation() {
  const { t } = useLanguage();
  return t;
}
