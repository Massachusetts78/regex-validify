# Regex Validify
         ____                       __     __    _ _     _ _  __       
        |  _ \ ___  __ _  _____  __ \ \   / /_ _| (_) __| (_)/ _|_   _
        | |_) / _ \/ _` |/ _ \ \/ /  \ \ / / _` | | |/ _` | | |_| | | |
        |  _ <  __/ (_| |  __/>  <    \ V / (_| | | | (_| | |  _| |_| |
        |_| \_\___|\__, |\___/_/\_\    \_/ \__,_|_|_|\__,_|_|_|  \__, |
                   |___/                                         |___/
---                  
A comprehensive TypeScript validation library using regular expressions for common data formats and patterns.
> "Regex-Validify leverages AI for efficiency while ensuring human-level precision and reliability in every validation."

## Installation

```bash
npm install regex-validify
# or
yarn add regex-validify
# or clone the repository from github
git clone https://github.com/Massachusetts78/regex-validify
```

## Features

- 40+ built-in validation patterns
- Supports multiple validation modes (boolean or verbose with detailed results)
- Customizable validation options
- No external dependencies
- Written in TypeScript with full type definitions
- Lightweight and efficient

## Basic Usage

```typescript
import RegExpValidator from 'regex-validify';

// Create new validator instance
const validator = new RegExpValidator();

// Basic validations
validator.isValidEmail('user@example.com');       // true
validator.isValidUrl('https://example.com');      // true
validator.isInteger('123');                       // true

// Verbose mode for detailed results
validator.isValidEmail('invalid@email', 'verbose');
// Returns: { 
//   isValid: false, 
//   message: 'Validation failed',
//   matches: null 
// }
```

## Validation Methods

### Basic Validations

| Method | Description |
|--------|-------------|
| `isValidEmail(email)` | Validates email addresses |
| `isValidIPv4(ip)` | Validates IPv4 addresses |
| `isValidIPv6(ip)` | Validates IPv6 addresses |
| `isValidMacAddress(mac)` | Validates MAC addresses |
| `isValidUrl(url)` | Validates URLs |
| `isValidUsername(name)` | Validates usernames |
| `isValidHexColor(color)` | Validates hex color codes |
| `isValidJwt(jwt)` | Validates JWT tokens |
| `isValidDomain(domain)` | Validates domain names |
| `isValidSemver(version)` | Validates semantic version strings |
| `isValidPhoneNumber(phone)` | Validates phone numbers |
| `isValidCreditCard(card)` | Validates credit card numbers |
| `isValidSSN(ssn)` | Validates Social Security Numbers |
| `isValidISBN(isbn)` | Validates ISBN numbers |
| `isValidTime(time)` | Validates time strings |

### Number Validations

| Method | Description |
|--------|-------------|
| `isInteger(value)` | Validates integer numbers |
| `isPositiveInteger(value)` | Validates positive integers |
| `isNegativeInteger(value)` | Validates negative integers |
| `isNonZeroInteger(value)` | Validates non-zero integers |
| `isFloat(value)` | Validates floating-point numbers |
| `isPositiveFloat(value)` | Validates positive floating-point numbers |
| `isNegativeFloat(value)` | Validates negative floating-point numbers |

### String Format Validations

| Method | Description |
|--------|-------------|
| `isAlpha(value)` | Validates alphabetic-only strings |
| `isAlphanumeric(value)` | Validates alphanumeric strings |
| `isEmoji(value)` | Validates emoji characters |
| `isAnsiArt(value)` | Validates ANSI art strings |
| `isHexadecimal(value)` | Validates hexadecimal strings |
| `isBinary(value)` | Validates binary strings |
| `isBase64(base64)` | Validates Base64 encoded strings |

### Naming Convention Validations

| Method | Description |
|--------|-------------|
| `isKebabCase(value)` | Validates kebab-case strings |
| `isCamelCase(value)` | Validates camelCase strings |
| `isSnakeCase(value)` | Validates snake_case strings |
| `isPascalCase(value)` | Validates PascalCase strings |

### Complex Validations

| Method | Description |
|--------|-------------|
| `isValidPassword(password, level?)` | Validates passwords with configurable security levels |
| `isStrongPassword(password, options?)` | Validates passwords with custom strength requirements |
| `isValidPostalCode(code, country)` | Validates postal codes for different countries |
| `isValidCryptoAddress(address, type)` | Validates cryptocurrency addresses |
| `isValidCoordinates(lat, lng)` | Validates geographic coordinates |
| `isValidDate(date, format?)` | Validates dates in various formats |
| `isValidUUID(uuid)` | Validates UUID strings |
| `isValidSlug(slug)` | Validates URL slugs |
| `isValidMD5(value)` | Validates MD5 hashes |
| `isValidSHA1(value)` | Validates SHA1 hashes |
| `isValidSHA256(value)` | Validates SHA256 hashes |
| `isValidFilePath(value)` | Validates file paths |
| `isValidFileName(value)` | Validates file names |
| `containsHtmlTag(value)` | Checks if string contains HTML tags |

## Advanced Usage

### Custom Validation Patterns

```typescript
// Use isValid method with custom regex
validator.isValid('abc123', /^[a-z0-9]+$/);  // true
```

### Verbose Mode

Get detailed validation results:

```typescript
const emailResult = validator.isValidEmail('test@example', 'verbose');
console.log(emailResult);
// {
//   isValid: false,
//   message: 'Validation failed',
//   matches: null
// }
```

### Password Validation Options

```typescript
// Different complexity levels
validator.isValidPassword('password123', 'simple');   // true (length >= 6)
validator.isValidPassword('password123', 'medium');   // true (length >= 8)
validator.isValidPassword('P@ssw0rd!', 'complex');    // true (uppercase, lowercase, number, special char)

// Custom password requirements
validator.isStrongPassword('mySecretPass1', {
  minLength: 10,
  requireUppercase: false,
  requireSpecialChars: false
});  // true
```

## Configuration

You can pass options when creating a validator instance:

```typescript
const validator = new RegExpValidator({
  timeout: 3000  // Set validation timeout to 3 seconds
});
```

## Types

The library includes TypeScript definitions for all methods and return types.

```typescript
// Available validation modes
type ValidatorMode = 'verbose' | undefined;

// Password complexity levels
type ValidationLevel = 'simple' | 'medium' | 'complex';

// Country codes for postal validation
type CountryCode = 'US' | 'UK' | 'CA' | 'AU' | 'DE' | 'FR' | 'JP' | 'ANY';

// Cryptocurrency types
type CryptoType = 'BTC' | 'ETH' | 'LTC' | 'XRP' | 'BCH' | 'DOT' | 'ADA' | 'SOL';

// Verbose validation result
interface ValidationResult {
  isValid: boolean;
  message?: string;
  matches?: RegExpMatchArray | null;
}
```
## Documentation

For detailed information on all available methods, advanced usage, and configuration options, refer to the full documentation in the docs directory:

### Key Sections in the Documentation

- **index.html**: Overview of the library and its core features.
- **regExp.ts.html**: TypeScript implementation details and code structure.
- **RegExpValidator.html**: Detailed information about the main `RegExpValidator` class and its methods.
- **ValidationResult.html**: Explanation of the validation result format and how to interpret the output.
- **ValidatorOptions.html**: Configuration options for customizing the behavior of the validator.

Explore the full documentation to see all available features and how to use them effectively.

## License
This project is licensed under ISC.

## Contributing

Contributions are welcome and encouraged! 🚀 Regex-Validify aims to be the most comprehensive regex validation library, and your contributions can help make it even better.

### How to Contribute

1. **Fork the Repository**  
   Click the "Fork" button at the top right of this repository to create your own copy.

2. **Clone Your Fork**  
```bash
   git clone https://github.com/Massachusetts78/regex-validify.git
   cd regex-validify
```
### Create a New Branch

```bash
git checkout -b feature/your-feature-name
```
### Make Your Changes

- Add new validation patterns
- Improve existing regex patterns
- Optimize performance
- Fix bugs
- Improve documentation

### Run Tests
Ensure your changes don’t break anything:

```bash
npm test
```
### Commit Your Changes

```bash
git commit -m "Add feature: your feature description"
git push origin feature/your-feature-name
```
## Acknowledgement

I sincerely appreciate every contribution, suggestion, and piece of feedback that helps make Regex-Validify better. Whether you're reporting an issue, improving the code, or simply using this tool, your support means a lot to me.

Thank you for being a part of this journey! Your involvement makes a real difference, and I’m grateful for it.