var assert = require('assert'),
    wordStats = require('word-stats'),
    markov = require('../index');

describe('Markov words', function() {
    describe('generate', function() {
        it('should fail', function() {
            assert.throws(function() {
                markov.generate();
            });
            assert.throws(function() {
                markov.generate(wordStats.calculate(), 3);
            });
        });

        it('should generate aaa', function() {
            var result = markov.generate(wordStats.calculate(['aaa']), 3);
            assert.equal('aaa', result[0]);
            assert.equal(1, result.length);
            result = markov.generate(wordStats.calculate(['aaa']), 3, 1);
            assert.equal('aaa', result[0]);
            assert.equal(1, result.length);
        });

        it('should generate aaa twice', function() {
            var result = markov.generate(wordStats.calculate(['aaa']), 3, 2);
            assert.equal('aaa', result[0]);
            assert.equal('aaa', result[1]);
            assert.equal(2, result.length);
        });

        it('should generate aaa and aab', function() {
            var stats = wordStats.calculate(['aaa', 'aab']);
            var aaa = false;
            var aab = false;
            for(var i = 0; i < 100000; i++) {
                var result = markov.generate(stats, 3);
                assert.equal(1, result.length);
                if (result[0] === 'aaa') {
                    aaa = true;
                    if (aab) {
                        assert(true, 'generated aaa and aab');
                        return;
                    }
                } else if (result[0] === 'aab') {
                    aab = true;
                    if (aaa) {
                        assert(true, 'generated aaa and aab');
                        return;
                    }
                } else {
                    assert.fail(result[0], 'aaa or aab', 
                        'Should be one of', '===');
                }
            }
        });
    });
});
