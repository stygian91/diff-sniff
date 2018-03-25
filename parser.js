const parseDiff = require('parse-diff');

// const parseFile = (file) => {
//     for(let chunk of file.chunks) {
//         parseChunk(chunk);
//     }
// };

// const parseChunk = (chunk) => {
//     console.log(chunk);
// };

// const parse = (diff) => {
//     parseDiff(diff).forEach(parseFile);
// };

class Parser {
    constructor(diff) {
        this.files = parseDiff(diff);
    }

    search(terms = []) {
        if (typeof terms === 'string') {
            terms = [terms];
        }

        for (let file of this.files) {
            for(let chunk of file.chunks) {
                for (let change of chunk.changes) {
                    this.searchChange(change, terms, file.to);
                }
            }
        }
    }

    searchChange(change, terms, fileName) {
        if (change.type !== 'add') {
            return;
        }

        for(let term of terms) {
            if (!change.content.includes(term)) {
                continue;
            }

            console.log(`Found "${term}" in ${fileName}:${change.ln}`);
        }
    }
}

module.exports = Parser;
