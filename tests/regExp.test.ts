import { describe, beforeEach, test, expect } from "@jest/globals";
import RegExpValidator from "../../dist/validators/regExp.js";

describe('RegExpValidator Comprehensive Test Suite', () => {
    let validator: RegExpValidator;

    beforeEach(() => {
        validator = new RegExpValidator();
    });

    // Email Validation
    describe('Email Validation', () => {
        const validCases = [
            'user@example.com',
            'firstname.lastname@domain.co.uk',
            'user+tag@gmail.com',
            'valid123@subdomain.example.org'
        ];

        const invalidCases = [
            'invalid-email',
            '@missingusername.com',
            'missing@domain',
            'spaces not@allowed.com',
            'invalid@domain.',
            'invalid@.com'
        ];

        validCases.forEach(email => {
            test(`Should validate valid email: ${email}`, () => {
                expect(validator.isValidEmail(email)).toBe(true);
            });
        });

        invalidCases.forEach(email => {
            test(`Should invalidate email: ${email}`, () => {
                expect(validator.isValidEmail(email)).toBe(false);
            });
        });
    });

    // URL Validation
    describe('URL Validation', () => {
        const validUrls = [
            'https://www.example.com',
            'https://github.com/massachusetts78/',
            'http://localhost',
            'https://example.com/path?param=value',
            'http://192.168.1.1'
        ];

        const invalidUrls = [
            'invalid url',
            'htp://missing-protocol.com',
            'http://.com',
            'https://invalid domain.com',
            'ftp://unsupported-protocol.com'
        ];

        validUrls.forEach(url => {
            test(`Should validate valid URL: ${url}`, () => {
                expect(validator.isValidUrl(url)).toBe(true);
            });
        });

        invalidUrls.forEach(url => {
            test(`Should invalidate URL: ${url}`, () => {
                expect(validator.isValidUrl(url)).toBe(false);
            });
        });
    });
    // Strong Password Validation
    describe('Strong Password Validation', () => {
        test('Should validate strong password with default options', () => {
            const strongPasswords = [
                'StrongP@ssw0rd000!',
                'Se(ure123!#',
                'Comp!ex2025P@ss'
            ];

            strongPasswords.forEach(password => {
                expect(validator.isStrongPassword(password)).toBe(true);
            });
        });

        test('Should invalidate weak passwords', () => {
            const weakPasswords = [
                'short',
                'nouppercase01',
                'NOLOWERCASE78',
                'NoSpechars123'
            ];

            weakPasswords.forEach(password => {
                expect(validator.isStrongPassword(password)).toBe(false);
            });
        });
    });

    // Date Validation
    describe('Date Validation', () => {
        const validDates = [
            { date: '31/12/2023', format: 'DD/MM/YYYY' },
            { date: '12/31/2023', format: 'MM/DD/YYYY' },
            { date: '2023-12-31', format: 'YYYY-MM-DD' },
            { date: '2023/12/31', format: 'YYYY/MM/DD' }
        ];

        const invalidDates = [
            { date: '32/12/2023', format: 'DD/MM/YYYY' },
            { date: '00/01/2023', format: 'DD/MM/YYYY' },
            { date: '2023/13/01', format: 'YYYY/MM/DD' },
            { date: 'invalid-date', format: 'DD/MM/YYYY' }
        ];

        validDates.forEach(({ date, format }) => {
            test(`Should validate date: ${date} with format ${format}`, () => {
                expect(validator.isValidDate(date, format)).toBe(true);
            });
        });

        invalidDates.forEach(({ date, format }) => {
            test(`Should invalidate date: ${date} with format ${format}`, () => {
                expect(validator.isValidDate(date, format)).toBe(false);
            });
        });
    });

    // UUID Validation
    describe('UUID Validation', () => {
        const validUUIDs = [
            '123e4567-e89b-12d3-a456-426614174000',
            'f47ac10b-58cc-4372-a567-0e02b2c3d479',
            '550e8400-e29b-41d4-a716-446655440000'
        ];

        const invalidUUIDs = [
            'invalid-uuid',
            '123e4567-e89b-12d3-a456-42661417400',
            'g47ac10b-58cc-4372-a567-0e02b2c3d479',
            '550e8400-e29b-61d4-a716-446655440000'
        ];

        validUUIDs.forEach(uuid => {
            test(`Should validate UUID: ${uuid}`, () => {
                expect(validator.isValidUUID(uuid)).toBe(true);
            });
        });

        invalidUUIDs.forEach(uuid => {
            test(`Should invalidate UUID: ${uuid}`, () => {
                expect(validator.isValidUUID(uuid)).toBe(false);
            });
        });
    });
});

