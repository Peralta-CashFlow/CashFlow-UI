export default interface TableEditionField {
    fieldName: string,
    fieldMaxLength: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, rowIndex: number) => void,
    helperText?: string;
}