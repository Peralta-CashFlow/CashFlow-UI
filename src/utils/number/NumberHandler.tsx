export const parseLocaleNumber = (normalized: string, language: string): number => {
    return normalize(normalized, language);
}

export const parseLocaleNumberStr = (normalized: string | null, language: string): string | null => {
    if (!normalized) {
        return null;
    }
    return normalize(normalized, language).toString();
}

const normalize = (normalized: string, language: string): number => {
    if (language === 'pt') {
        normalized = normalized.replace(/\./g, '').replace(',', '.');
    } else if (language === 'en') {
        normalized = normalized.replace(/,/g, '');
    }
    return parseFloat(normalized)
}

export const toLocaleString = (value: string | null, language: string): string | null => {
    if (!value) {
        return null;
    }

    return parseFloat(value).toLocaleString(language, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

}