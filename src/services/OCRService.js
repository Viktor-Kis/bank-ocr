export default class OCRService {

    constructor(glyphs, correctors) {
        this.glyphs = glyphs;
        this.digitsCount = 9;
        this.correctors = correctors;
    }

    parseDigits(digits) {
        const result = {
            numbers: [],
            wrongDigitsCount: 0,
            unrecognizedIndex: -1
        };
        for (let i = 0; i < this.digitsCount; i++) {
            result.numbers[i] = this.recognize(digits[i]);
            if (result.numbers[i] === -1) {
                result.wrongDigitsCount++;
                result.unrecognizedIndex = i;
            }
        }
        return result;
    }

    recognize(digit) {
        for (const [glyph, glyphValue] of this.glyphs) {
            if (digit === glyph) return glyphValue;
        }
        return -1;
    }

    repair(digits, index, validate) {
        let dgs = digits.slice();
        let wrongDigit = dgs[index];
        let wd = [...wrongDigit];
        const keys = Object.keys(this.correctors);
        for (let i = 0; i < keys.length; i++) {
            const ndx = parseInt(keys[i]);
            if (wd[ndx] === " ") {
                const corrs = this.correctors[keys[i]];
                for (const cor of corrs) {
                    wd[ndx] = cor;
                    const repairedDigit = wd.join('');
                    const number = this.recognize(repairedDigit);
                    if (number !== -1) {
                        dgs[index] = repairedDigit;
                        const parsedData = this.parseDigits(dgs);
                        if (validate(parsedData.numbers)) {
                            return parsedData;
                        }
                    }
                    wd[ndx] = " ";
                }
            }
        }
        return -1;
    }
}