const grammar = (num, word) => {
    switch (word) {
        case 'is/are':
            return num > 1 ? "are" : "is"

        case 's':
            return num > 1 ? "s" : ""

        case 'it/them':
            return num > 1 ? "them" : "it"

        default:
            break;
    }
};

module.exports = grammar;