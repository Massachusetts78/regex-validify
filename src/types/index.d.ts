/**
 * Validation level options for password complexity
 * @type {string} 
 */
export type ValidationLevel = 'simple' | 'medium' | 'complex';

/**
 * Country code options for postal code validation
 * @type {string}
 */
export type CountryCode = 'US' | 'UK' | 'CA' | 'ANY';

/**
 * Cryptocurrency type options for wallet address validation
 * @type {string}
 */
export type CryptoType = 'BTC' | 'ETH';

/**
 * Validator mode options
 * - 'verbose': Returns detailed validation information
 * - undefined: Returns boolean result only
 * @type {string|undefined}
 */
export type ValidatorMode = 'verbose' | undefined;

/**
 * Validation result interface providing detailed information about validation outcomes
 * @interface
 */
export interface ValidationResult {
    isValid: boolean;
    message?: string;
    matches?: RegExpMatchArray | null;
}

/**
 * Configuration options for the RegExpValidator
 * @interface
 */
export interface ValidatorOptions {
    timeout?: number;
    caseSensitive?: boolean;
    multiline?: boolean;
    unicode?: boolean;
}

/**
 * Password validation options
 * @interface
 */
export interface PasswordOptions {
    minLength?: number;
    requireUppercase?: boolean;
    requireNumbers?: boolean;
    requireSpecialChars?: boolean;
}

/**
 * RegExpValidator - A comprehensive utility for validating strings against common patterns
 * 
 * @class
 * @description
 * Provides extensive validation capabilities for common string formats including emails,
 * dates, IP addresses, and more. The validator supports both simple boolean validation
 * and detailed verbose results with matched patterns.
 * 
 * Features:
 * - 45+ built-in validation methods
 * - Configurable timeout protection
 * - Detailed validation results
 * - Support for common data formats and conventions
 * - Country-specific validations (postal codes, phone numbers)
 * - Cryptocurrency address validation
 * 
 * @example
 * ```typescript
 * // Create a validator with default options
 * const validator = new RegExpValidator();
 * 
 * // Perform simple validation
 * const isValid = validator.isValidEmail('user@example.com');
 * 
 * // Get detailed validation results
 * const result = validator.isValidEmail('user@example.com', 'verbose');
 * ```
 */
declare class RegExpValidator {
    /**
     * @constructor
     * @param {ValidatorOptions} [options] - Configuration options for the validator
     * 
     * @example
     * ```typescript
     * // Create with default options
     * const validator = new RegExpValidator();
     * 
     * // Create with custom options
     * const validator = new RegExpValidator({
     *   timeout: 3000,
     *   caseSensitive: true,
     *   multiline: true,
     *   unicode: true
     * });
     * ```
     */
    constructor(options?: ValidatorOptions);

    /**
     * Generic validation method for arbitrary regex patterns
     * 
     * @param {string} value - The string to validate
     * @param {RegExp} pattern - The regular expression pattern to test against
     * @param {ValidatorMode} [mode] - Validation mode (verbose or undefined)
     * @returns {ValidationResult | boolean} Validation result or boolean
     * 
     * @example
     * ```typescript
     * // Custom pattern validation
     * const customPattern = /^[A-Z]{3}-\d{4}$/;
     * const isValid = validator.isValid('ABC-1234', customPattern);
     * 
     * // With verbose results
     * const result = validator.isValid('ABC-1234', customPattern, 'verbose');
     * ```
     */
    public isValid(value: string, pattern: RegExp, mode?: ValidatorMode): ValidationResult | boolean;

    /**
     * Validates an email address
     * 
     * @param {string} email - Email address to validate
     * @param {ValidatorMode} [mode] - Validation mode
     * @returns {ValidationResult | boolean} Validation result
     * 
     * @example
     * ```typescript
     * // Simple validation
     * const isValid = validator.isValidEmail('user@example.com');
     * 
     * // Verbose validation
     * const result = validator.isValidEmail('user@example.com', 'verbose');
     * ```
     * 
     * @remarks
     * Validates emails with the pattern:
     * /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
     */
    public isValidEmail(email: string, mode?: ValidatorMode): ValidationResult | boolean;

    /**
     * Validates a date string against a specified format
     * 
     * @param {string} date - Date string to validate
     * @param {string} [format='DD/MM/YYYY'] - Date format to validate against
     * @param {ValidatorMode} [mode] - Validation mode
     * @returns {ValidationResult | boolean} Validation result
     * 
     * @example
     * ```typescript
     * // Default format (DD/MM/YYYY)
     * validator.isValidDate('25/12/2023');
     * 
     * // Custom format
     * validator.isValidDate('2023-12-25', 'YYYY-MM-DD');
     * 
     * // Supported formats: 'DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD', 'YYYY/MM/DD'
     * ```
     */
    public isValidDate(date: string, format?: string, mode?: ValidatorMode): ValidationResult | boolean;

    /**
     * Validates an IPv4 address
     * 
     * @param {string} ip - IPv4 address to validate
     * @param {ValidatorMode} [mode] - Validation mode
     * @returns {ValidationResult | boolean} Validation result
     * 
     * @example
     * ```typescript
     * validator.isValidIPv4('192.168.1.1');
     * validator.isValidIPv4('255.255.255.255');
     * ```
     * 
     * @remarks
     * Validates each octet to be between 0-255 and properly formatted
     */
    public isValidIPv4(ip: string, mode?: ValidatorMode): ValidationResult | boolean;

    /**
     * Validates an IPv6 address
     * 
     * @param {string} ip - IPv6 address to validate
     * @param {ValidatorMode} [mode] - Validation mode
     * @returns {ValidationResult | boolean} Validation result
     * 
     * @example
     * ```typescript
     * validator.isValidIPv6('2001:0db8:85a3:0000:0000:8a2e:0370:7334');
     * ```
     */
    public isValidIPv6(ip: string, mode?: ValidatorMode): ValidationResult | boolean;

    /**
     * Validates a MAC address
     * 
     * @param {string} mac - MAC address to validate
     * @param {ValidatorMode} [mode] - Validation mode
     * @returns {ValidationResult | boolean} Validation result
     * 
     * @example
     * ```typescript
     * // Valid MAC address
     * validator.isValidMacAddress('00:1A:2B:3C:4D:5E');
     * validator.isValidMacAddress('00-1A-2B-3C-4D-5E');
     * ```
     */
    public isValidMacAddress(mac: string, mode?: ValidatorMode): ValidationResult | boolean;

    /**
     * Validates a URL
     * 
     * @param {string} url - URL to validate
     * @param {ValidatorMode} [mode] - Validation mode
     * @returns {ValidationResult | boolean} Validation result
     * 
     * @example
     * ```typescript
     * validator.isValidUrl('https://example.com');
     * validator.isValidUrl('http://subdomain.example.co.uk/path');
     * ```
     * 
     * @remarks
     * Validates URLs with or without protocol and optional path components
     */
    public isValidUrl(url: string, mode?: ValidatorMode): ValidationResult | boolean;

    /**
     * Validates a username
     * 
     * @param {string} name - Username to validate
     * @param {ValidatorMode} [mode] - Validation mode
     * @returns {ValidationResult | boolean} Validation result
     * 
     * @example
     * ```typescript
     * // Valid usernames (3-16 chars, alphanumeric with _ . -)
     * validator.isValidUsername('john_doe');
     * validator.isValidUsername('user.name-123');
     * ```
     */
    public isValidUsername(name: string, mode?: ValidatorMode): ValidationResult | boolean;

    /**
     * Validates a hexadecimal color code
     * 
     * @param {string} color - Hex color code to validate
     * @param {ValidatorMode} [mode] - Validation mode
     * @returns {ValidationResult | boolean} Validation result
     * 
     * @example
     * ```typescript
     * // With or without # prefix
     * validator.isValidHexColor('#ff5500');
     * validator.isValidHexColor('f50');
     * ```
     */
    public isValidHexColor(color: string, mode?: ValidatorMode): ValidationResult | boolean;

    /**
     * Validates if a string contains only integer values
     * 
     * @param {string} value - String to validate
     * @param {ValidatorMode} [mode] - Validation mode
     * @returns {ValidationResult | boolean} Validation result
     * 
     * @example
     * ```typescript
     * validator.isInteger('123');
     * validator.isInteger('-456');
     * ```
     */
    public isInteger(value: string, mode?: ValidatorMode): ValidationResult | boolean;

    /**
     * Validates if a string contains only alphabetic characters
     * 
     * @param {string} value - String to validate
     * @param {ValidatorMode} [mode] - Validation mode
     * @returns {ValidationResult | boolean} Validation result
     * 
     * @example
     * ```typescript
     * validator.isAlpha('HelloWorld');
     * ```
     */
    public isAlpha(value: string, mode?: ValidatorMode): ValidationResult | boolean;

    /**
     * Validates if a string contains only emoji characters
     * 
     * @param {string} value - String to validate
     * @param {ValidatorMode} [mode] - Validation mode
     * @returns {ValidationResult | boolean} Validation result
     * 
     * @example
     * ```typescript
     * validator.isEmoji('😀👍🎉');
     * ```
     */
    public isEmoji(value: string, mode?: ValidatorMode): ValidationResult | boolean;

    /**
     * Validates if a string is valid ANSI art (contains only printable ASCII)
     * 
     * @param {string} value - String to validate
     * @param {ValidatorMode} [mode] - Validation mode
     * @returns {ValidationResult | boolean} Validation result
     * 
     * @example
     * ```typescript
     * validator.isAnsiArt(asciiArtString);
     * ```
     */
    public isAnsiArt(value: string, mode?: ValidatorMode): ValidationResult | boolean;

    /**
     * Validates a JWT token
     * 
     * @param {string} jwt - JWT token to validate
     * @param {ValidatorMode} [mode] - Validation mode
     * @returns {ValidationResult | boolean} Validation result
     * 
     * @example
     * ```typescript
     * // Checks for the three-part structure: header.payload.signature
     * validator.isValidJwt('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U');
     * ```
     */
    public isValidJwt(jwt: string, mode?: ValidatorMode): ValidationResult | boolean;

    /**
     * Validates a domain name
     * 
     * @param {string} domain - Domain name to validate
     * @param {ValidatorMode} [mode] - Validation mode
     * @returns {ValidationResult | boolean} Validation result
     * 
     * @example
     * ```typescript
     * validator.isValidDomain('example.com');
     * validator.isValidDomain('sub.example.co.uk');
     * ```
     */
    public isValidDomain(domain: string, mode?: ValidatorMode): ValidationResult | boolean;

    /**
     * Validates a semantic version string
     * 
     * @param {string} version - Semver string to validate
     * @param {ValidatorMode} [mode] - Validation mode
     * @returns {ValidationResult | boolean} Validation result
     * 
     * @example
     * ```typescript
     * validator.isValidSemver('1.2.3');
     * validator.isValidSemver('2.0.0-alpha.1+build.2023');
     * ```
     */
    public isValidSemver(version: string, mode?: ValidatorMode): ValidationResult | boolean;

    /**
     * Validates a phone number
     * 
     * @param {string} phone - Phone number to validate
     * @param {ValidatorMode} [mode] - Validation mode
     * @returns {ValidationResult | boolean} Validation result
     * 
     * @example
     * ```typescript
     * validator.isValidPhoneNumber('1234567890');
     * validator.isValidPhoneNumber('+1-123-456-7890');
     * ```
     */
    public isValidPhoneNumber(phone: string, mode?: ValidatorMode): ValidationResult | boolean;

    /**
     * Validates a credit card number
     * 
     * @param {string} card - Credit card number to validate
     * @param {ValidatorMode} [mode] - Validation mode
     * @returns {ValidationResult | boolean} Validation result
     * 
     * @example
     * ```typescript
     * // Validates common credit card formats (Visa, MasterCard, Amex, Discover)
     * validator.isValidCreditCard('4111111111111111'); // Visa
     * validator.isValidCreditCard('5500000000000004'); // MasterCard
     * ```
     */
    public isValidCreditCard(card: string, mode?: ValidatorMode): ValidationResult | boolean;

    /**
     * Validates a US Social Security Number
     * 
     * @param {string} ssn - SSN to validate
     * @param {ValidatorMode} [mode] - Validation mode
     * @returns {ValidationResult | boolean} Validation result
     * 
     * @example
     * ```typescript
     * validator.isValidSSN('123-45-6789');
     * ```
     * 
     * @remarks
     * Performs format validation and some basic rules (no 000, 666, or 900+ area numbers)
     */
    public isValidSSN(ssn: string, mode?: ValidatorMode): ValidationResult | boolean;

    /**
     * Validates an ISBN (International Standard Book Number)
     * 
     * @param {string} isbn - ISBN to validate
     * @param {ValidatorMode} [mode] - Validation mode
     * @returns {ValidationResult | boolean} Validation result
     * 
     * @example
     * ```typescript
     * validator.isValidISBN('0-306-40615-2');   // ISBN-10
     * validator.isValidISBN('978-3-16-148410-0'); // ISBN-13
     * ```
     */
    public isValidISBN(isbn: string, mode?: ValidatorMode): ValidationResult | boolean;

    /**
     * Validates a time string
     * 
     * @param {string} time - Time string to validate
     * @param {ValidatorMode} [mode] - Validation mode
     * @returns {ValidationResult | boolean} Validation result
     * 
     * @example
     * ```typescript
     * validator.isValidTime('14:30');       // 24-hour
     * validator.isValidTime('02:30 PM');    // 12-hour with AM/PM
     * validator.isValidTime('23:59:59');    // With seconds
     * ```
     */
    public isValidTime(time: string, mode?: ValidatorMode): ValidationResult | boolean;

    /**
     * Validates a positive integer
     * 
     * @param {string} value - String to validate
     * @param {ValidatorMode} [mode] - Validation mode
     * @returns {ValidationResult | boolean} Validation result
     * 
     * @example
     * ```typescript
     * validator.isPositiveInteger('123');  // true
     * validator.isPositiveInteger('0');    // true
     * validator.isPositiveInteger('-5');   // false
     * ```
     */
    public isPositiveInteger(value: string, mode?: ValidatorMode): ValidationResult | boolean;

    /**
     * Validates a negative integer
     * 
     * @param {string} value - String to validate
     * @param {ValidatorMode} [mode] - Validation mode
     * @returns {ValidationResult | boolean} Validation result
     * 
     * @example
     * ```typescript
     * validator.isNegativeInteger('-123'); // true
     * validator.isNegativeInteger('5');    // false
     * ```
     */
    public isNegativeInteger(value: string, mode?: ValidatorMode): ValidationResult | boolean;

    /**
     * Validates a non-zero integer
     * 
     * @param {string} value - String to validate
     * @param {ValidatorMode} [mode] - Validation mode
     * @returns {ValidationResult | boolean} Validation result
     * 
     * @example
     * ```typescript
     * validator.isNonZeroInteger('123');  // true
     * validator.isNonZeroInteger('-456'); // true
     * validator.isNonZeroInteger('0');    // false
     * ```
     */
    public isNonZeroInteger(value: string, mode?: ValidatorMode): ValidationResult | boolean;

    /**
     * Validates a floating point number
     * 
     * @param {string} value - String to validate
     * @param {ValidatorMode} [mode] - Validation mode
     * @returns {ValidationResult | boolean} Validation result
     * 
     * @example
     * ```typescript
     * validator.isFloat('123.45');  // true
     * validator.isFloat('-67.89');  // true
     * validator.isFloat('42');      // true (integers are valid floats)
     * ```
     */
    public isFloat(value: string, mode?: ValidatorMode): ValidationResult | boolean;

    /**
     * Validates a positive floating point number
     * 
     * @param {string} value - String to validate
     * @param {ValidatorMode} [mode] - Validation mode
     * @returns {ValidationResult | boolean} Validation result
     * 
     * @example
     * ```typescript
     * validator.isPositiveFloat('123.45'); // true
     * validator.isPositiveFloat('0.0');    // true
     * validator.isPositiveFloat('-5.5');   // false
     * ```
     */
    public isPositiveFloat(value: string, mode?: ValidatorMode): ValidationResult | boolean;

    /**
     * Validates a negative floating point number
     * 
     * @param {string} value - String to validate
     * @param {ValidatorMode} [mode] - Validation mode
     * @returns {ValidationResult | boolean} Validation result
     * 
     * @example
     * ```typescript
     * validator.isNegativeFloat('-123.45'); // true
     * validator.isNegativeFloat('5.5');     // false
     * ```
     */
    public isNegativeFloat(value: string, mode?: ValidatorMode): ValidationResult | boolean;

    /**
     * Validates if a string contains only alphanumeric characters
     * 
     * @param {string} value - String to validate
     * @param {ValidatorMode} [mode] - Validation mode
     * @returns {ValidationResult | boolean} Validation result
     * 
     * @example
     * ```typescript
     * validator.isAlphanumeric('abc123'); // true
     * validator.isAlphanumeric('abc-123'); // false (contains hyphen)
     * ```
     */
    public isAlphanumeric(value: string, mode?: ValidatorMode): ValidationResult | boolean;
    /**
     * Validates if a string contains only hexadecimal characters
     * 
     * @param {string} value - String to validate
     * @param {ValidatorMode} [mode] - Validation mode
     * @returns {ValidationResult | boolean} Validation result
     * 
     * @example
     * ```typescript
     * validator.isHexadecimal('a1b2c3'); // true
     * validator.isHexadecimal('G123');   // false (G is not a hex digit)
     * ```
     */
    public isHexadecimal(value: string, mode?: ValidatorMode): ValidationResult | boolean;

    /**
     * Validates if a string contains only binary digits (0 and 1)
     * 
     * @param {string} value - String to validate
     * @param {ValidatorMode} [mode] - Validation mode
     * @returns {ValidationResult | boolean} Validation result
     * 
     * @example
     * ```typescript
     * validator.isBinary('10101');  // true
     * validator.isBinary('10102');  // false (contains 2)
     * ```
     */
    public isBinary(value: string, mode?: ValidatorMode): ValidationResult | boolean;

    /**
     * Validates an MD5 hash
     * 
     * @param {string} value - String to validate
     * @param {ValidatorMode} [mode] - Validation mode
     * @returns {ValidationResult | boolean} Validation result
     * 
     * @example
     * ```typescript
     * validator.isValidMD5('d41d8cd98f00b204e9800998ecf8427e'); // true
     * ```
     * 
     * @remarks
     * Validates the format only (32 hex characters), not the hash integrity
     */
    public isValidMD5(value: string, mode?: ValidatorMode): ValidationResult | boolean;

    /**
     * Validates a SHA-1 hash
     * 
     * @param {string} value - String to validate
     * @param {ValidatorMode} [mode] - Validation mode
     * @returns {ValidationResult | boolean} Validation result
     * 
     * @example
     * ```typescript
     * validator.isValidSHA1('da39a3ee5e6b4b0d3255bfef95601890afd80709'); // true
     * ```
     * 
     * @remarks
     * Validates the format only (40 hex characters), not the hash integrity
     */
    public isValidSHA1(value: string, mode?: ValidatorMode): ValidationResult | boolean;

    /**
     * Validates a SHA-256 hash
     * 
     * @param {string} value - String to validate
     * @param {ValidatorMode} [mode] - Validation mode
     * @returns {ValidationResult | boolean} Validation result
     * 
     * @example
     * ```typescript
     * validator.isValidSHA256('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'); // true
     * ```
     * 
     * @remarks
     * Validates the format only (64 hex characters), not the hash integrity
     */
    public isValidSHA256(value: string, mode?: ValidatorMode): ValidationResult | boolean;

    /**
     * Checks if a string contains HTML tags
     * 
     * @param {string} value - String to check
     * @param {ValidatorMode} [mode] - Validation mode
     * @returns {ValidationResult | boolean} Validation result
     * 
     * @example
     * ```typescript
     * validator.containsHtmlTag('<div>Content</div>'); // true
     * validator.containsHtmlTag('Plain text');         // false
     * ```
     */
    public containsHtmlTag(value: string, mode?: ValidatorMode): ValidationResult | boolean;

    /**
     * Validates a file path
     * 
     * @param {string} value - File path to validate
     * @param {ValidatorMode} [mode] - Validation mode
     * @returns {ValidationResult | boolean} Validation result
     * 
     * @example
     * ```typescript
     * validator.isValidFilePath('C:/Users/user/documents/file.txt'); // true
     * validator.isValidFilePath('/home/user/docs/file.txt');         // true
     * ```
     */
    public isValidFilePath(value: string, mode?: ValidatorMode): ValidationResult | boolean;

    /**
     * Validates a filename
     * 
     * @param {string} value - Filename to validate
     * @param {ValidatorMode} [mode] - Validation mode
     * @returns {ValidationResult | boolean} Validation result
     * 
     * @example
     * ```typescript
     * validator.isValidFileName('document.pdf'); // true
     * validator.isValidFileName('file?.txt');    // false (contains invalid character)
     * ```
     */
    public isValidFileName(value: string, mode?: ValidatorMode): ValidationResult | boolean;

    /**
     * Validates if a string is in kebab-case format
     * 
     * @param {string} value - String to validate
     * @param {ValidatorMode} [mode] - Validation mode
     * @returns {ValidationResult | boolean} Validation result
     * 
     * @example
     * ```typescript
     * validator.isKebabCase('my-variable-name'); // true
     * validator.isKebabCase('myVariableName');   // false
     * ```
     */
    public isKebabCase(value: string, mode?: ValidatorMode): ValidationResult | boolean;

    /**
     * Validates if a string is in camelCase format
     * 
     * @param {string} value - String to validate
     * @param {ValidatorMode} [mode] - Validation mode
     * @returns {ValidationResult | boolean} Validation result
     * 
     * @example
     * ```typescript
     * validator.isCamelCase('myVariableName'); // true
     * validator.isCamelCase('my-variable');    // false
     * ```
     */
    public isCamelCase(value: string, mode?: ValidatorMode): ValidationResult | boolean;

    /**
     * Validates if a string is in snake_case format
     * 
     * @param {string} value - String to validate
     * @param {ValidatorMode} [mode] - Validation mode
     * @returns {ValidationResult | boolean} Validation result
     * 
     * @example
     * ```typescript
     * validator.isSnakeCase('my_variable_name'); // true
     * validator.isSnakeCase('myVariableName');   // false
     * ```
     */
    public isSnakeCase(value: string, mode?: ValidatorMode): ValidationResult | boolean;

    /**
     * Validates if a string is in PascalCase format
     * 
     * @param {string} value - String to validate
     * @param {ValidatorMode} [mode] - Validation mode
     * @returns {ValidationResult | boolean} Validation result
     * 
     * @example
     * ```typescript
     * validator.isPascalCase('MyClassName'); // true
     * validator.isPascalCase('myClassName'); // false (doesn't start with capital)
     * ```
     */
    public isPascalCase(value: string, mode?: ValidatorMode): ValidationResult | boolean;

    /**
     * Validates a password against specified complexity level
     * 
     * @param {string} password - Password to validate
     * @param {ValidationLevel} [level='medium'] - Complexity level
     * @param {ValidatorMode} [mode] - Validation mode
     * @returns {ValidationResult | boolean} Validation result
     * 
     * @example
     * ```typescript
     * // Different complexity levels
     * validator.isValidPassword('password123', 'simple');   // true (length >= 6)
     * validator.isValidPassword('password123', 'medium');   // true (length >= 8)
     * validator.isValidPassword('P@ssw0rd!', 'complex');    // true (uppercase, lowercase, number, special char)
     * ```
     * 
     * @remarks
     * - 'simple': At least 6 characters
     * - 'medium': At least 8 characters
     * - 'complex': At least 8 characters, uppercase, lowercase, number, and special character
     */
    public isValidPassword(
        password: string,
        level?: ValidationLevel,
        mode?: ValidatorMode
    ): ValidationResult | boolean;

    /**
     * Validates a postal code for the specified country
     * 
     * @param {string} code - Postal code to validate
     * @param {CountryCode} country - Country code
     * @param {ValidatorMode} [mode] - Validation mode
     * @returns {ValidationResult | boolean} Validation result
     * 
     * @example
     * ```typescript
     * validator.isValidPostalCode('90210', 'US');       // US ZIP code
     * validator.isValidPostalCode('SW1A 1AA', 'UK');    // UK postcode
     * validator.isValidPostalCode('M5V 2N4', 'CA');     // Canadian postal code
     * validator.isValidPostalCode('123456', 'ANY');     // Generic format
     * ```
     */
    public isValidPostalCode(
        code: string,
        country: CountryCode,
        mode?: ValidatorMode
    ): ValidationResult | boolean;

    /**
   * Validates a cryptocurrency wallet address
   * 
   * @param {string} address - Crypto address to validate
   * @param {CryptoType} type - Cryptocurrency type
   * @param {ValidatorMode} [mode] - Validation mode
   * @returns {ValidationResult | boolean} Validation result
   * 
   * @example
   * ```typescript
   * // Bitcoin address
   * validator.isValidCryptoAddress('1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2', 'BTC'); // true
   * // Ethereum address
   * validator.isValidCryptoAddress('0x742d35Cc6634C0532925a3b844Bc454e4438f44e', 'ETH'); // true
   * // Litecoin address
   * validator.isValidCryptoAddress('LQ5yJgwoFkzUN6BiR6HfTFbCUv6Pu6XKP8', 'LTC'); // true
   * ```
   * 
   * @remarks
   * Validates addresses for various cryptocurrencies including Bitcoin (BTC), 
   * Ethereum (ETH), Litecoin (LTC), and others based on their respective formats.
   */
    public isValidCryptoAddress(
        address: string,
        type: CryptoType,
        mode?: ValidatorMode
    ): ValidationResult | boolean;

    /**
     * Validates geographic coordinates (latitude and longitude)
     * 
     * @param {string} lat - Latitude coordinate
     * @param {string} lng - Longitude coordinate
     * @param {ValidatorMode} [mode] - Validation mode
     * @returns {ValidationResult | boolean} Validation result
     * 
     * @example
     * ```typescript
     * validator.isValidCoordinates('37.7749', '-122.4194'); // San Francisco
     * validator.isValidCoordinates('51.5074', '0.1278');    // London
     * validator.isValidCoordinates('90.0001', '45');        // Invalid latitude
     * ```
     * 
     * @remarks
     * - Latitude must be between -90 and 90 degrees
     * - Longitude must be between -180 and 180 degrees
     */
    public isValidCoordinates(
        lat: string,
        lng: string,
        mode?: ValidatorMode
    ): ValidationResult | boolean;

    /**
     * Validates a date string against a specified format
     * 
     * @param {string} date - Date string to validate
     * @param {string} [format='DD/MM/YYYY'] - Expected date format
     * @param {ValidatorMode} [mode] - Validation mode
     * @returns {ValidationResult | boolean} Validation result
     * 
     * @example
     * ```typescript
     * validator.isValidDate('31/12/2023');                 // DD/MM/YYYY (default)
     * validator.isValidDate('12/31/2023', 'MM/DD/YYYY');   // MM/DD/YYYY
     * validator.isValidDate('2023-12-31', 'YYYY-MM-DD');   // YYYY-MM-DD
     * validator.isValidDate('2023/12/31', 'YYYY/MM/DD');   // YYYY/MM/DD
     * ```
     * 
     * @remarks
     * Supports common date formats with appropriate validation for day/month ranges.
     * Does not perform full date validation (e.g., leap years).
     */
    public isValidDate(
        date: string,
        format?: string,
        mode?: ValidatorMode
    ): ValidationResult | boolean;

    /**
     * Validates a UUID string
     * 
     * @param {string} uuid - UUID string to validate
     * @param {ValidatorMode} [mode] - Validation mode
     * @returns {ValidationResult | boolean} Validation result
     * 
     * @example
     * ```typescript
     * validator.isValidUUID('123e4567-e89b-12d3-a456-426614174000');  // true
     * validator.isValidUUID('123e4567-e89b-12d3-a456-42661417400');   // false (too short)
     * validator.isValidUUID('123e4567-e89b-62d3-a456-426614174000');  // false (invalid version)
     * ```
     * 
     * @remarks
     * Validates UUID formats versions 1-5, with the appropriate format of 8-4-4-4-12 hexadecimal characters.
     */
    public isValidUUID(
        uuid: string,
        mode?: ValidatorMode
    ): ValidationResult | boolean;

    /**
     * Validates a password against customizable strength criteria
     * 
     * @param {string} password - Password to validate
     * @param {object} [options] - Password requirements
     * @param {number} [options.minLength=8] - Minimum length
     * @param {boolean} [options.requireUppercase=true] - Require uppercase letters
     * @param {boolean} [options.requireNumbers=true] - Require numbers
     * @param {boolean} [options.requireSpecialChars=true] - Require special characters
     * @param {ValidatorMode} [mode] - Validation mode
     * @returns {ValidationResult | boolean} Validation result
     * 
     * @example
     * ```typescript
     * // Default options (8+ chars, uppercase, numbers, special chars)
     * validator.isStrongPassword('P@ssw0rd');  // true
     * 
     * // Custom requirements
     * validator.isStrongPassword('password123', { 
     *   minLength: 6, 
     *   requireUppercase: false,
     *   requireSpecialChars: false
     * });  // true
     * ```
     * 
     * @remarks
     * Allows for flexible password validation with customizable security requirements.
     */
    public isStrongPassword(
        password: string,
        options?: {
            minLength?: number;
            requireUppercase?: boolean;
            requireNumbers?: boolean;
            requireSpecialChars?: boolean;
        },
        mode?: ValidatorMode
    ): ValidationResult | boolean;

    /**
     * Validates a URL slug string
     * 
     * @param {string} slug - Slug to validate
     * @param {ValidatorMode} [mode] - Validation mode
     * @returns {ValidationResult | boolean} Validation result
     * 
     * @example
     * ```typescript
     * validator.isValidSlug('my-blog-post');      // true
     * validator.isValidSlug('product123');        // true
     * validator.isValidSlug('invalid slug');      // false (contains space)
     * validator.isValidSlug('invalid_slug');      // false (contains underscore)
     * ```
     * 
     * @remarks
     * Valid slugs contain only lowercase letters, numbers, and hyphens.
     * Hyphens must not appear at the beginning or end, and not consecutively.
     */
    public isValidSlug(
        slug: string,
        mode?: ValidatorMode
    ): ValidationResult | boolean;

    /**
     * Validates a Base64 encoded string
     * 
     * @param {string} base64 - Base64 string to validate
     * @param {ValidatorMode} [mode] - Validation mode
     * @returns {ValidationResult | boolean} Validation result
     * 
     * @example
     * ```typescript
     * validator.isBase64('SGVsbG8gV29ybGQ=');      // true
     * validator.isBase64('SGVsbG8gV29ybGQ');       // false (missing padding)
     * validator.isBase64('SGVsbG8_V29ybGQ=');      // false (invalid character)
     * ```
     * 
     * @remarks
     * Validates strings according to the standard Base64 encoding scheme,
     * including proper padding with = or == characters.
     */
    public isBase64(
        base64: string,
        mode?: ValidatorMode
    ): ValidationResult | boolean;
}
export default RegExpValidator;