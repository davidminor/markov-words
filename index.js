
function chooseLetter(letterStats) {
    if (!letterStats) {
        throw { name: "NoStats" };
    }
    var draw = Math.floor(Math.random() * letterStats.total);
    var count = 0;
    for(var letter in letterStats) {
        if (letter === 'total') {
            continue;
        }
        count += letterStats[letter];
        if (count > draw) {
            return letter;
        }
    }
    throw { name: "NoStats" };
}

module.exports.generate = function(stats, wordLength, numberOfWords) {
    if (arguments.length < 2 || arguments.length > 3) {
        throw "Incorrect number of arguments";
    }
    if (!stats.firstLetters || stats.firstLetters.total < 1) {
        throw "Invalid letter stats";
    }
    if (wordLength < 3) {
        throw "Word length must be at least 3 letters";
    }
    numberOfWords = numberOfWords || 1;
    if (numberOfWords < 1) {
        throw "Invalid number of words";
    }

    var result = [],
        currentWord,
        l1,
        l2,
        nextLetter,
        firstLetters = stats.firstLetters,
        secondLetters = stats.secondLetters,
        letters = stats.letters,
        penLetters = stats.penultimateLetters,
        lastLetters = stats.lastLetters,
        retries = 0;
    for(var i = 0; i < numberOfWords; i++) {
        try {
            l1 = chooseLetter(firstLetters);
            l2 = chooseLetter(secondLetters[l1]);
            currentWord = l1 + l2;
            for(var j = 2; j < wordLength - 2; j++) {
                nextLetter = chooseLetter(letters[l1 + l2]);
                currentWord += nextLetter;
                l1 = l2;
                l2 = nextLetter;
            }
            if (j < wordLength - 1) {
                nextLetter = chooseLetter(penLetters[l1 + l2]);
                currentWord += nextLetter;
                l1 = l2;
                l2 = nextLetter;
            }
            currentWord += chooseLetter(lastLetters[l1 + l2]);
            result.push(currentWord);
            retries = 0;
        } catch(ex) {
            // occasionally word endings won't work out - retry
            if (ex.name && ex.name === "NoStats") {
                if (retries > 2) {
                    throw new Error("Error generating words");
                }
                retries++;
                i--;
            } else {
                throw ex;
            }
        }
    }
    return result;
}
 
