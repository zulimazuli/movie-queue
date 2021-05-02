import React from 'react';
import { render, screen } from '@testing-library/react';

import * as Validators from './validators';

describe('validateUrl tests', () => {
    const testCases = [
        { url: 'https://filmweb.pl/xyz-123', expected: true },
        { url: 'https://www.filmweb.pl/film/Syn+Szawła-2015-725060', expected: true },
        { url: 'https://filmwebx.pl/xyz-123', expected: false },
    ];

    testCases.forEach(test => {
        it(`should match the url: ${test.url} as ${test.expected}`, () => {            
            const result = Validators.validateUrl(test.url);
            expect(result).toEqual(test.expected);
        });
    })
    
});

describe('validateExists tests', () => {
    it('array contains item', () => {
        var array = [{ prop: "abc" }, { prop: 'xyz' }, { prop: '123' }];
        const result = Validators.validateExists(array, 'prop', 'xyz');
        expect(result).toBeTruthy();
    });
  
    it('array does not contain item', () => {
        var array = [{ prop: "abc" }, { prop: 'xyz' }, { prop: '123' }];
        const result = Validators.validateExists(array, 'prop', 'qwe');
        expect(result).toBeFalsy();
    });
  
    it('array does not contain property', () => {
        var array = [{ prop: "abc" }, { prop: 'xyz' }, { prop: '123' }];
        const result = Validators.validateExists(array, 'props', 'xyz');
        expect(result).toBeFalsy();
    });
});

describe('validateIncludes tests', () => {
    it('array contains item that includes a string', () => {
        var array = [{ prop: "abc" }, { prop: 'abcthis123' }, { prop: '123' }];
        const result = Validators.validateExists(array, 'prop', '123');
        expect(result).toBeTruthy();
    });
  
    it('array does not contain item that includes a string', () => {
        var array = [{ prop: "abc" }, { prop: 'thisthat' }, { prop: '123' }];
        const result = Validators.validateExists(array, 'prop', 'qwe');
        expect(result).toBeFalsy();
    });
  
    it('array does not contain property', () => {
        var array = [{ prop: "abc" }, { prop: 'xyz' }, { prop: '123' }];
        const result = Validators.validateExists(array, 'props', 'xyz');
        expect(result).toBeFalsy();
    });
});


