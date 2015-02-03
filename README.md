# markov-words
Node package to generate pronounceable random words via Markov chains.
```js
var markov = require('markov-words'),
    result = markov.generate(stats, 8); // generate an array of one 8 letter word
```
To get the stats, use `calculateStats`:
```js
var markov = require('markov-words'),
    stats = markov.calculateStats(array_of_words),
    result = markov.generate(stats, 8, 40); //40 8 letter words
```
