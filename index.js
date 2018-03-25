// external dependencies:
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

const args = argParser.parseArgs();

getStdin()
    .then(str => {
        const parser = new Parser(str);
        parser.search(args.search);
    })
    .catch(error => console.error(error));
