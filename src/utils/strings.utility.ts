export const canBeSplitByComma = (input: unknown): input is string => {
    return typeof input == "string" && input.split(',').every(s => s.trim() != '');
};

export const splitByComma = (input: string): string[] => {
    return input.split(',').map(s => s.trim());
};