import { create } from 'zustand';
import i18n from '../../config/Internationalization';

type InternationalizationStore = {
    language: string;
    setLanguage: (language: string) => void;
}

export const useInternationalizationStore = create<InternationalizationStore>((set) => ({
    language: 'en',
    setLanguage: (language: string) => {
        set(() => ({ language: language }));
        i18n.changeLanguage(language);
    }
}))