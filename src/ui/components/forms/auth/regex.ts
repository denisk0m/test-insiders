interface IRegex {
    value: RegExp
    shortDescription: string,
}

export const emailRegex: IRegex = {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    shortDescription: "Must be valid email"
};
export const userNameRegex: IRegex = {
    value: /^[a-zA-Z0-9._-]{3,20}$/,
    shortDescription: "Must be valid email"
};
export const passwordRegex: IRegex = {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/,
    shortDescription: 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.'
};