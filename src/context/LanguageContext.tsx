import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import en from "../locales/en.json";
import id from "../locales/id.json";

type Language = "en" | "id";
type Translations = typeof en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<Language>("id");
  const [translations, setTranslations] = useState<Translations>(id);

  useEffect(() => {
    // Check if we have a stored language preference
    const storedLanguage = localStorage.getItem("language") as Language | null;
    if (
      storedLanguage &&
      (storedLanguage === "en" || storedLanguage === "id")
    ) {
      setLanguageState(storedLanguage);
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split("-")[0];
      if (browserLang === "en") {
        setLanguageState("en");
      }
      // Default to Indonesian if not English
    }
  }, []);

  useEffect(() => {
    // Update translations when language changes
    setTranslations(language === "en" ? en : id);

    // Save language preference
    localStorage.setItem("language", language);

    // Update HTML lang attribute for SEO
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, t: translations }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
