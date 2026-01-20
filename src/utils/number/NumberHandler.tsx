export const parseLocaleNumber = (stringNumber: string, language: string): number => {
    let normalized = stringNumber;

    if (language === 'pt') {
        normalized = normalized.replace(/\./g, '').replace(',', '.');
    } else if (language === 'en') {
        normalized = normalized.replace(/,/g, '');
    }
    return parseFloat(normalized);
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