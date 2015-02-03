var assert = require('assert'),
    calculate = require('../index').calculateStats,
    emptyStats = {secondLetters: {}, letters: {}, penultimateLetters: {},
        lastLetters: {}};

describe('word-stats', function() {
    describe('calculate', function() {
        it('no words', function() {
            var result = calculate();
            assert.deepEqual(emptyStats, result);
            result = calculate([]);
            assert.deepEqual(emptyStats, result);
        });

        it('no words long enough', function() {
            var result = calculate(['ab']);
            assert.deepEqual(emptyStats, result);
        });
    
        it('3 letter word correct stats', function() {
            assert.deepEqual(calculate(['aaa']), {
                    firstLetters: {total: 1, a: 1},
                    secondLetters: {a: {total: 1, a: 1}},
                    letters: {},
                    penultimateLetters: {},
                    lastLetters: {aa: {total: 1, a: 1}}
                });
    
            assert.deepEqual(calculate(['abc']), {
                    firstLetters: {total: 1, a: 1},
                    secondLetters: {a: {total: 1, b: 1}},
                    letters: {},
                    penultimateLetters: {},
                    lastLetters: {ab: {total: 1, c: 1}}
                });
        });
    
        it('4 letter word correct stats', function() {
            assert.deepEqual(calculate(['aaaa']), {
                    firstLetters: {total: 1, a: 1},
                    secondLetters: {a: {total: 1, a: 1}},
                    letters: {},
                    penultimateLetters: {aa: {total: 1, a: 1}},
                    lastLetters: {aa: {total: 1, a: 1}}
                });
    
            assert.deepEqual(calculate(['abcd']), {
                    firstLetters: {total: 1, a: 1},
                    secondLetters: {a: {total: 1, b: 1}},
                    letters: {},
                    penultimateLetters: {ab: {total: 1, c: 1}},
                    lastLetters: {bc: {total: 1, d: 1}}
                });
        });
    
        it('5 letter word correct stats', function() {
            assert.deepEqual(calculate(['aaaaa']), {
                    firstLetters: {total: 1, a: 1},
                    secondLetters: {a: {total: 1, a: 1}},
                    letters: {aa: {total: 1, a: 1}},
                    penultimateLetters: {aa: {total: 1, a: 1}},
                    lastLetters: {aa: {total: 1, a: 1}}
                });
    
            assert.deepEqual(calculate(['abcde']), {
                    firstLetters: {total: 1, a: 1},
                    secondLetters: {a: {total: 1, b: 1}},
                    letters: {ab: {total: 1, c: 1}},
                    penultimateLetters: {bc: {total: 1, d: 1}},
                    lastLetters: {cd: {total: 1, e: 1}}
                });
        });
    
        it('multiple words correct stats', function() {
            assert.deepEqual(calculate(['abcde', 'abcde']), {
                    firstLetters: {total: 2, a: 2},
                    secondLetters: {a: {total: 2, b: 2}},
                    letters: {ab: {total: 2, c: 2}},
                    penultimateLetters: {bc: {total: 2, d: 2}},
                    lastLetters: {cd: {total: 2, e: 2}}
                });
            assert.deepEqual(calculate(['abcde', 'fghij']), {
                    firstLetters: {total: 2, a: 1, f: 1},
                    secondLetters: {a: {total: 1, b: 1}, f: {total: 1, g: 1}},
                    letters: {ab: {total: 1, c: 1}, fg: {total: 1, h: 1}},
                    penultimateLetters: {bc: {total: 1, d: 1}, gh: {total: 1, i: 1}}
                    , lastLetters: {cd: {total: 1, e: 1}, hi: {total: 1, j: 1}}
                });
        });
    });
});
