export const formatDateToScreen = (date: string): string => {
    if (!date) return '';
    const splittedString = date.split('-');
    return `${splittedString[2]}/${splittedString[1]}/${splittedString[0]}`;
}

export const formatDateToBackend = (date: string | null): string | null => {
    if (!date) return null;
    const splittedString = date.split('/');
    return `${splittedString[2]}-${splittedString[1]}-${splittedString[0]}`;
}

export const formatStringInputToDate = (date: string): string => {

    const onlyNumbers = date.replace(/\D/g, '');
    
    const limitedNumbers = onlyNumbers.slice(0, 8);
    
    let formatted = '';
    if (limitedNumbers.length > 0) {
        formatted = limitedNumbers.slice(0, 2);
        if (limitedNumbers.length >= 3) {
            formatted += '/' + limitedNumbers.slice(2, 4);
        }
        if (limitedNumbers.length >= 5) {
            formatted += '/' + limitedNumbers.slice(4, 8);
        }
    }

    return formatted;
}