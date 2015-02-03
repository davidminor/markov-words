// increase counts for a single letter, creating a property if necessary
function countLetter(totals, letter) {
    var stat = totals[letter];
    if (!stat) {
      totals[letter] = 1;
    } else {
      totals[letter] = stat + 1;
    }
    totals.total += 1;
}

// incorporate the statistics for a single word into the existing
// stats object
function incorporateWord(stats, word) {
    var totals, l1, l2, l3, di;

    if (word.length < 3) {
        return;
    }

    if (!stats.firstLetters) {
        stats.firstLetters = {total: 0};
    }

    // first letter stats
    l1 = word.charAt(0);
    countLetter(stats.firstLetters, l1);

    // second letter stats, relative to first letter
    l2 = word.charAt(1);
    totals = stats.secondLetters[l1];
    if (!totals) {
        stats.secondLetters[l1] = totals = {total: 0};
    }
    countLetter(totals, l2);

    // remaining letter stats, relative to preceding 2 letters
    di = l1 + l2
    for(var j = 2, strlen = word.length; j < strlen; j++) {
        l3 = word.charAt(j);
        if (j < strlen - 2) {
            totals = stats.letters[di];
            if (!totals) {
                stats.letters[di] = totals = {total: 0};
            }
        } else if (j < strlen - 1) {
            totals = stats.penultimateLetters[di];
            if (!totals) {
                stats.penultimateLetters[di] = totals = {total: 0};
            }
        } else {
            totals = stats.lastLetters[di];
            if (!totals) {
                stats.lastLetters[di] = totals = {total: 0};
            }
        }
      
        countLetter(totals, l3);
        di = di.charAt(1) + l3;
    }

}

// calculate the statistics to be used for generating the Markov words.
// wordList should be long enough to avoid not having word endings for
// most letter combinations.
function calculateStats(wordList) {
    var firstLetters,
        secondLetters = {},
        letters = {}
        penLetters = {},
        lastLetters = {};

    var stats = { 
        secondLetters: secondLetters, 
        letters: letters, 
        penultimateLetters: penLetters,
        lastLetters: lastLetters};

    if (!wordList || !wordList.length) {
        return stats;
    }

    var word;
    for(var i = 0, len = wordList.length; i < len; i++) {
        incorporateWord(stats, wordList[i]);
    }
 
    return stats;
}

module.exports = {
    calculateStats: calculateStats,
    incorporateWord: incorporateWord
};

