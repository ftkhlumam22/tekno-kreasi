import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./LanguageSwitcher.module.css";

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={styles.switcher}>
      <button
        onClick={() => setLanguage("id")}
        className={`${styles.languageButton} ${
          language === "id" ? styles.active : ""
        }`}
        aria-label="Switch to Indonesian language"
      >
        ID
      </button>
      <span className={styles.divider}>|</span>
      <button
        onClick={() => setLanguage("en")}
        className={`${styles.languageButton} ${
          language === "en" ? styles.active : ""
        }`}
        aria-label="Switch to English language"
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;
