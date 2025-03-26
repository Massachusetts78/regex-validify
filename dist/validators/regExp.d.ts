export type ValidationLevel = 'simple' | 'medium' | 'complex';
export type CountryCode = 'US' | 'UK' | 'CA' | 'ANY';
export type CryptoType = 'BTC' | 'ETH';
export type ValidatorMode = 'verbose' | undefined;
export interface ValidationResult {
    isValid: boolean;
    message?: string;
    matches?: RegExpMatchArray | null;
}
export interface ValidatorOptions {
    timeout?: number;
    caseSensitive?: boolean;
    multiline?: boolean;
    unicode?: boolean;
}
declare class RegExpValidator {
    private options;
    private readonly patterns;
    private readonly complexPatterns;
    constructor(options?: ValidatorOptions);
    private validate;
    isValid(value: string, pattern: RegExp, mode?: ValidatorMode): ValidationResult | boolean;
    isValidEmail(email: string, mode?: ValidatorMode): ValidationResult | boolean;
    isValidIPv4(ip: string, mode?: ValidatorMode): ValidationResult | boolean;
    isValidIPv6(ip: string, mode?: ValidatorMode): ValidationResult | boolean;
    isValidMacAddress(mac: string, mode?: ValidatorMode): ValidationResult | boolean;
    isValidUrl(url: string, mode?: ValidatorMode): ValidationResult | boolean;
    isValidUsername(name: string, mode?: ValidatorMode): ValidationResult | boolean;
    isValidHexColor(color: string, mode?: ValidatorMode): ValidationResult | boolean;
    isInteger(value: string, mode?: ValidatorMode): ValidationResult | boolean;
    isAlpha(value: string, mode?: ValidatorMode): ValidationResult | boolean;
    isEmoji(value: string, mode?: ValidatorMode): ValidationResult | boolean;
    isAnsiArt(value: string, mode?: ValidatorMode): ValidationResult | boolean;
    isValidJwt(jwt: string, mode?: ValidatorMode): ValidationResult | boolean;
    isValidDomain(domain: string, mode?: ValidatorMode): ValidationResult | boolean;
    isValidSemver(version: string, mode?: ValidatorMode): ValidationResult | boolean;
    isValidPhoneNumber(phone: string, mode?: ValidatorMode): ValidationResult | boolean;
    isValidCreditCard(card: string, mode?: ValidatorMode): ValidationResult | boolean;
    isValidSSN(ssn: string, mode?: ValidatorMode): ValidationResult | boolean;
    isValidISBN(isbn: string, mode?: ValidatorMode): ValidationResult | boolean;
    isValidTime(time: string, mode?: ValidatorMode): ValidationResult | boolean;
    isPositiveInteger(value: string, mode?: ValidatorMode): ValidationResult | boolean;
    isNegativeInteger(value: string, mode?: ValidatorMode): ValidationResult | boolean;
    isNonZeroInteger(value: string, mode?: ValidatorMode): ValidationResult | boolean;
    isFloat(value: string, mode?: ValidatorMode): ValidationResult | boolean;
    isPositiveFloat(value: string, mode?: ValidatorMode): ValidationResult | boolean;
    isNegativeFloat(value: string, mode?: ValidatorMode): ValidationResult | boolean;
    isAlphanumeric(value: string, mode?: ValidatorMode): ValidationResult | boolean;
    isHexadecimal(value: string, mode?: ValidatorMode): ValidationResult | boolean;
    isBinary(value: string, mode?: ValidatorMode): ValidationResult | boolean;
    isValidMD5(value: string, mode?: ValidatorMode): ValidationResult | boolean;
    isValidSHA1(value: string, mode?: ValidatorMode): ValidationResult | boolean;
    isValidSHA256(value: string, mode?: ValidatorMode): ValidationResult | boolean;
    containsHtmlTag(value: string, mode?: ValidatorMode): ValidationResult | boolean;
    isValidFilePath(value: string, mode?: ValidatorMode): ValidationResult | boolean;
    isValidFileName(value: string, mode?: ValidatorMode): ValidationResult | boolean;
    isKebabCase(value: string, mode?: ValidatorMode): ValidationResult | boolean;
    isCamelCase(value: string, mode?: ValidatorMode): ValidationResult | boolean;
    isSnakeCase(value: string, mode?: ValidatorMode): ValidationResult | boolean;
    isPascalCase(value: string, mode?: ValidatorMode): ValidationResult | boolean;
    isValidPassword(password: string, level?: ValidationLevel, mode?: ValidatorMode): ValidationResult | boolean;
    isValidPostalCode(code: string, country: CountryCode, mode?: ValidatorMode): ValidationResult | boolean;
    isValidCryptoAddress(address: string, type: CryptoType, mode?: ValidatorMode): ValidationResult | boolean;
    isValidCoordinates(lat: string, lng: string, mode?: ValidatorMode): ValidationResult | boolean;
    isValidDate(date: string, format?: string, mode?: ValidatorMode): ValidationResult | boolean;
    isValidUUID(uuid: string, mode?: ValidatorMode): ValidationResult | boolean;
    isStrongPassword(password: string, options?: {
        minLength?: number;
        requireUppercase?: boolean;
        requireNumbers?: boolean;
        requireSpecialChars?: boolean;
    }, mode?: ValidatorMode): ValidationResult | boolean;
    isValidSlug(slug: string, mode?: ValidatorMode): ValidationResult | boolean;
    isBase64(base64: string, mode?: ValidatorMode): ValidationResult | boolean;
}
export default RegExpValidator;
//# sourceMappingURL=regExp.d.ts.map