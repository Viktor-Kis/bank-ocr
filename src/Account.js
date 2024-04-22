export default class Account {

    constructor(options) {
        this.ocr = options.ocr;
        this._fragment(options.lines);
        this._parse();
        this._verify();
        if (options.autoRepair) {
            this._repair();
        }
    }

    _parse() {
        const parsedData = this.ocr.parseDigits(this.digits);
        Object.assign(this, parsedData);
    }

    _verify() {
        if (this.wrongDigitsCount === 0) {
            this.checksum = calculateChecksum(this.numbers);
            this.validationCode = this.checksum === 0 ? 0 : -1;
        }
    }

    _repair() {
        if (this.wrongDigitsCount === 0 && !this.isValidChecksum()) {
            // TODO
        }
        
        else if (this.wrongDigitsCount === 1 ) {
            const repaired = this.ocr.repair(this.digits, this.unrecognizedIndex, (numbers) => { return calculateChecksum(numbers) === 0 });
            if (repaired !== -1) {
                Object.assign(this, repaired);
                this.checksum = 0;
                this.validationCode = 0;
            }
        }
    }

    _fragment(accountLine) {
        this.digits = Array(this.ocr.digitsCount).fill("");
        this.numbers = [];
        accountLine.forEach((line) => {
            for (let col = 0; col < this.ocr.digitsCount; col++) {
                this.digits[col] += line.substring(col * 3, (col + 1) * 3);
            }
        });
    }

    getString() {
        return this.numbers.map((number) => {
            if (number === -1) {
                return '?';
            } else if (number > 9) {
                return number.toString(16).toUpperCase();
            } else {
                return number.toString();
            }
        }).join('');
    }

    getStatus() {
        let result;
        if (this.validationCode === 0)
            result = "OK";
        else if (this.validationCode === -1)
            result = "ERR";
        else if (this.validationCode === 1)
            result = "AMB";
        else if (this.wrongDigitsCount > 0)
            result = "ILL";
        return result;
    }

    getChecksum() {
        return this.checksum !== undefined ? this.checksum : "N/A";
    }

    isValidChecksum() {
        return this.checksum === 0;
    }
}

function calculateChecksum(numbers) {
    let checksum = numbers[8];
    for (let i = 1; i < 9; i++) {
        checksum += numbers[8 - i] * (i + 1);
    }
    console.log(checksum % 11);
    return checksum % 11;
}
