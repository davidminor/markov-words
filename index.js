var generate = require('./markov').generate,
    stats = require('./stats');

module.exports = {
    generate: generate,
    calculateStats: stats.calculateStats,
    incorporateWord: stats.incorporateWord
};

