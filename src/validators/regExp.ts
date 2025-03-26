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

class RegExpValidator {
    private readonly patterns: {
        [key: string]: RegExp;
    } = {
            email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            date: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
            ipv4: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
            ipv6: /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/,
            macAddress: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/,
            url: /^(https?:\/\/)(localhost|\d{1,3}(\.\d{1,3}){3}|([a-zA-Z0-9.-]+\.[a-zA-Z]{2,}))(:\d{1,5})?(\/[^\s]*)?$/,
            username: /^[a-zA-Z0-9._-]{3,16}$/,
            hexColor: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,
            onlyIntegers: /^-?\d+$/,
            onlyAlpha: /^[a-zA-Z]+$/,
            emoji: /^[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2300}-\u{23FF}\u{2B50}\u{203C}\u{2049}\u{2122}\u{2139}]+$/u,
            ansiArt: /^[\x20-\x7E\x0A\x0D]+$/,
            jwt: /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/,
            domain: /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/,
            semver: /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/,
            phone: /^(?:\+?([1-9]\d{0,2}))?[-.\s]?\(?\d{2,4}\)?[-.\s]?\d{6,10}$/,
            creditCard: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})$/,
            ssn: /^(?!000|666|9\d{2})\d{3}-(?!00)\d{2}-(?!0000)\d{4}$/,
            isbn: /^(?:\d[- ]?){9}[\dXx]$|^(?:\d[- ]?){13}$/,
            time: /^(?:[01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?( ?(?:AM|PM))?$/i,
            positiveInteger: /^\d+$/,
            negativeInteger: /^-\d+$/,
            nonZeroInteger: /^-?[1-9]\d*$/,
            float: /^-?\d+(\.\d+)?$/,
            positiveFloat: /^\d+(\.\d+)?$/,
            negativeFloat: /^-\d+(\.\d+)?$/,
            alphanumeric: /^[a-zA-Z0-9]+$/,
            hexadecimal: /^[0-9a-fA-F]+$/,
            binary: /^[01]+$/,
            md5: /^[a-f0-9]{32}$/i,
            sha1: /^[a-f0-9]{40}$/i,
            sha256: /^[a-f0-9]{64}$/i,
            htmlTag: /<\/?[a-z][^>]*>/i,
            filePath: /^(?:[a-zA-Z]:)?(?:\/|\\)?(?:[^\\/:*?"<>|\r\n]+(?:\/|\\)?)+$/,
            fileName: /^[^\\/:*?"<>|\r\n]+\.[^\\/:*?"<>|\r\n]+$/,
            kebabCase: /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/,
            camelCase: /^[a-z][a-zA-Z0-9]*$/,
            snakeCase: /^[a-z][a-z0-9]*(?:_[a-z0-9]+)*$/,
            pascalCase: /^[A-Z][a-zA-Z0-9]*$/,
        };

    private readonly complexPatterns = {
        postalCode: {
            US: /^\d{5}(-\d{4})?$/,
            UK: /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i,
            CA: /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z] ?\d[ABCEGHJ-NPRSTV-Z]\d$/i,
            ANY: /^[A-Z0-9]{3,10}$/i,
        },
        crypto: {
            BTC: /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/,
            ETH: /^0x[a-fA-F0-9]{40}$/,
        },
        password: {
            simple: /^.{6,}$/,
            medium: /^.{8,}$/,
            complex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&!@#%^&*()_+\-=~`{}[\]:;"'<>,.?\/]{8,}$/,
        },
        coordinates: {
            latitude: /^-?([1-8]?\d(?:\.\d+)?|90(?:\.0+)?)$/,
            longitude: /^-?((1[0-7]|[1-9])?\d(?:\.\d+)?|180(?:\.0+)?)$/,
        },
    };

    constructor(private options: ValidatorOptions = {}) {
        this.options = {
            timeout: 5000,
            caseSensitive: true,
            multiline: false,
            unicode: true,
            ...options,
        };
    }

    private validate(
        value: string,
        pattern: RegExp,
        mode?: ValidatorMode,
    ): boolean | ValidationResult {
        const startTime = Date.now();
        try {
            if (Date.now() - startTime > (this.options.timeout || 5000)) {
                return mode === 'verbose'
                    ? {
                        isValid: false,
                        message: 'Validation timeout exceeded',
                    }
                    : false;
            }

            const isValid = pattern.test(value);

            if (mode === 'verbose') {
                return {
                    isValid,
                    matches: value.match(pattern),
                    message: isValid
                        ? 'Validation successful'
                        : 'Validation failed',
                };
            }

            return isValid;
        } catch (error) {
            return mode === 'verbose'
                ? {
                    isValid: false,
                    message: `Validation error: ${error}`,
                }
                : false;
        }
    }

    public isValid(value: string, pattern: RegExp, mode?: ValidatorMode): ValidationResult | boolean {
        return this.validate(value, pattern, mode);
    }

    public isValidEmail(email: string, mode?: ValidatorMode): ValidationResult | boolean {
        return this.validate(email, this.patterns.email, mode);
    }

    public isValidIPv4(ip: string, mode?: ValidatorMode): ValidationResult | boolean {
        return this.validate(ip, this.patterns.ipv4, mode);
    }

    public isValidIPv6(ip: string, mode?: ValidatorMode): ValidationResult | boolean {
        return this.validate(ip, this.patterns.ipv6, mode);
    }

    public isValidMacAddress(mac: string, mode?: ValidatorMode): ValidationResult | boolean {
        return this.validate(mac, this.patterns.macAddress, mode);
    }

    public isValidUrl(url: string, mode?: ValidatorMode): ValidationResult | boolean {
        return this.validate(url, this.patterns.url, mode);
    }

    public isValidUsername(name: string, mode?: ValidatorMode): ValidationResult | boolean {
        return this.validate(name, this.patterns.username, mode);
    }

    public isValidHexColor(color: string, mode?: ValidatorMode): ValidationResult | boolean {
        return this.validate(color, this.patterns.hexColor, mode);
    }

    public isInteger(value: string, mode?: ValidatorMode): ValidationResult | boolean {
        return this.validate(value, this.patterns.onlyIntegers, mode);
    }

    public isAlpha(value: string, mode?: ValidatorMode): ValidationResult | boolean {
        return this.validate(value, this.patterns.onlyAlpha, mode);
    }

    public isEmoji(value: string, mode?: ValidatorMode): ValidationResult | boolean {
        return this.validate(value, this.patterns.emoji, mode);
    }

    public isAnsiArt(value: string, mode?: ValidatorMode): ValidationResult | boolean {
        return this.validate(value, this.patterns.ansiArt, mode);
    }

    public isValidJwt(jwt: string, mode?: ValidatorMode): ValidationResult | boolean {
        return this.validate(jwt, this.patterns.jwt, mode);
    }

    public isValidDomain(domain: string, mode?: ValidatorMode): ValidationResult | boolean {
        return this.validate(domain, this.patterns.domain, mode);
    }

    public isValidSemver(version: string, mode?: ValidatorMode): ValidationResult | boolean {
        return this.validate(version, this.patterns.semver, mode);
    }

    public isValidPhoneNumber(phone: string, mode?: ValidatorMode): ValidationResult | boolean {
        return this.validate(phone, this.patterns.phone, mode);
    }

    public isValidCreditCard(card: string, mode?: ValidatorMode): ValidationResult | boolean {
        return this.validate(card, this.patterns.creditCard, mode);
    }

    public isValidSSN(ssn: string, mode?: ValidatorMode): ValidationResult | boolean {
        return this.validate(ssn, this.patterns.ssn, mode);
    }

    public isValidISBN(isbn: string, mode?: ValidatorMode): ValidationResult | boolean {
        return this.validate(isbn, this.patterns.isbn, mode);
    }

    public isValidTime(time: string, mode?: ValidatorMode): ValidationResult | boolean {
        return this.validate(time, this.patterns.time, mode);
    }

    public isPositiveInteger(value: string, mode?: ValidatorMode): ValidationResult | boolean {
        return this.validate(value, this.patterns.positiveInteger, mode);
    }

    public isNegativeInteger(value: string, mode?: ValidatorMode): ValidationResult | boolean {
        return this.validate(value, this.patterns.negativeInteger, mode);
    }

    public isNonZeroInteger(value: string, mode?: ValidatorMode): ValidationResult | boolean {
        return this.validate(value, this.patterns.nonZeroInteger, mode);
    }

    public isFloat(value: string, mode?: ValidatorMode): ValidationResult | boolean {
        return this.validate(value, this.patterns.float, mode);
    }

    public isPositiveFloat(value: string, mode?: ValidatorMode): ValidationResult | boolean {
        return this.validate(value, this.patterns.positiveFloat, mode);
    }

    public isNegativeFloat(value: string, mode?: ValidatorMode): ValidationResult | boolean {
        return this.validate(value, this.patterns.negativeFloat, mode);
    }

    public isAlphanumeric(value: string, mode?: ValidatorMode): ValidationResult | boolean {
        return this.validate(value, this.patterns.alphanumeric, mode);
    }

    public isHexadecimal(value: string, mode?: ValidatorMode): ValidationResult | boolean {
        return this.validate(value, this.patterns.hexadecimal, mode);
    }

    public isBinary(value: string, mode?: ValidatorMode): ValidationResult | boolean {
        return this.validate(value, this.patterns.binary, mode);
    }

    public isValidMD5(value: string, mode?: ValidatorMode): ValidationResult | boolean {
        return this.validate(value, this.patterns.md5, mode);
    }

    public isValidSHA1(value: string, mode?: ValidatorMode): ValidationResult | boolean {
        return this.validate(value, this.patterns.sha1, mode);
    }

    public isValidSHA256(value: string, mode?: ValidatorMode): ValidationResult | boolean {
        return this.validate(value, this.patterns.sha256, mode);
    }

    public containsHtmlTag(value: string, mode?: ValidatorMode): ValidationResult | boolean {
        return this.validate(value, this.patterns.htmlTag, mode);
    }

    public isValidFilePath(value: string, mode?: ValidatorMode): ValidationResult | boolean {
        return this.validate(value, this.patterns.filePath, mode);
    }

    public isValidFileName(value: string, mode?: ValidatorMode): ValidationResult | boolean {
        return this.validate(value, this.patterns.fileName, mode);
    }

    public isKebabCase(value: string, mode?: ValidatorMode): ValidationResult | boolean {
        return this.validate(value, this.patterns.kebabCase, mode);
    }

    public isCamelCase(value: string, mode?: ValidatorMode): ValidationResult | boolean {
        return this.validate(value, this.patterns.camelCase, mode);
    }

    public isSnakeCase(value: string, mode?: ValidatorMode): ValidationResult | boolean {
        return this.validate(value, this.patterns.snakeCase, mode);
    }

    public isPascalCase(value: string, mode?: ValidatorMode): ValidationResult | boolean {
        return this.validate(value, this.patterns.pascalCase, mode);
    }

    public isValidPassword(
        password: string,
        level: ValidationLevel = 'medium',
        mode?: ValidatorMode,
    ): ValidationResult | boolean {
        return this.validate(password, this.complexPatterns.password[level], mode);
    }

    public isValidPostalCode(
        code: string,
        country: CountryCode,
        mode?: ValidatorMode,
    ): ValidationResult | boolean {
        return this.validate(code, this.complexPatterns.postalCode[country], mode);
    }

    public isValidCryptoAddress(
        address: string,
        type: CryptoType,
        mode?: ValidatorMode,
    ): ValidationResult | boolean {
        return this.validate(address, this.complexPatterns.crypto[type], mode);
    }

    public isValidCoordinates(
        lat: string,
        lng: string,
        mode?: ValidatorMode,
    ): ValidationResult | boolean {
        const latValid = this.validate(lat, this.complexPatterns.coordinates.latitude, mode);
        const lngValid = this.validate(lng, this.complexPatterns.coordinates.longitude, mode);

        return mode === 'verbose'
            ? {
                isValid:
                    typeof latValid === 'boolean'
                        ? latValid && typeof lngValid === 'boolean'
                            ? lngValid
                            : false
                        : false,
                message: 'Both latitude and longitude must be valid',
            }
            : typeof latValid === 'boolean'
                ? latValid && typeof lngValid === 'boolean'
                    ? lngValid
                    : false
                : false;
    }

    public isValidDate(
        date: string,
        format: string = 'DD/MM/YYYY',
        mode?: ValidatorMode,
    ): ValidationResult | boolean {
        const patterns: { [key: string]: RegExp } = {
            'DD/MM/YYYY': /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
            'MM/DD/YYYY': /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/,
            'YYYY-MM-DD': /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
            'YYYY/MM/DD': /^\d{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/,
        };
        return this.validate(date, patterns[format] || patterns['DD/MM/YYYY'], mode);
    }

    public isValidUUID(uuid: string, mode?: ValidatorMode): ValidationResult | boolean {
        const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        return this.validate(uuid, uuidPattern, mode);
    }

    public isStrongPassword(
        password: string,
        options: {
            minLength?: number;
            requireUppercase?: boolean;
            requireNumbers?: boolean;
            requireSpecialChars?: boolean;
        } = {},
        mode?: ValidatorMode,
    ): ValidationResult | boolean {
        const opts = {
            minLength: 8,
            requireUppercase: true,
            requireNumbers: true,
            requireSpecialChars: true,
            ...options,
        };

        let pattern = '^';
        if (opts.requireUppercase) pattern += '(?=.*[A-Z])';
        if (opts.requireNumbers) pattern += '(?=.*\\d)';
        if (opts.requireSpecialChars) pattern += '(?=.*[!@#$%^&*])';
        pattern += `.{${opts.minLength},}$`;

        return this.validate(password, new RegExp(pattern), mode);
    }


    public isValidSlug(slug: string, mode?: ValidatorMode): ValidationResult | boolean {
        const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
        return this.validate(slug, slugPattern, mode);
    }

    public isBase64(base64: string, mode?: ValidatorMode): ValidationResult | boolean {
        const base64Pattern = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
        return this.validate(base64, base64Pattern, mode);
    }
}

export default RegExpValidator;