// external dependencies:
const fs = require('fs');
const getStdin = require('get-stdin');
const ArgumentParser = require('argparse').ArgumentParser;

// internal dependencies:
const Parser = require('./parser.js');

const argParser = new ArgumentParser({
    version: '0.1',
    addHelp: true,
    description: 'A simple search utility for diff files.',
});

argParser.addArgument(
    [ '-s', '--search' ],
    {
        help: 'Search terms to search for',
        nargs: '+',
        required: true,
    }
);

argParser.addArgument(
    [ '-i', '--input' ],
    {
        help: 'Use input diff file. If not present uses STDIN.',
        required: false,
    }
);

const args = argParser.parseArgs();

if (args.input) {
    const input = fs.readFileSync(args.input, { encoding: 'utf8' });
    new Parser(input).search(args.search);
} else {
    getStdin()
        .then(input => {
            new Parser(input).search(args.search);
        })
        .catch(error => console.error(error));
}
