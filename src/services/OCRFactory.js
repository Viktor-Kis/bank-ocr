import OCRService from './OCRService';

const ocrs = {};
const decimalGlyphs = [
    [
        " _ " +
        "| |" +
        "|_|", 0
    ],
    [
        "   " +
        "  |" +
        "  |", 1
    ],
    [
        " _ " +
        " _|" +
        "|_ ", 2
    ],
    [
        " _ " +
        " _|" +
        " _|", 3
    ],
    [
        "   " +
        "|_|" +
        "  |", 4
    ],
    [
        " _ " +
        "|_ " +
        " _|", 5
    ],
    [
        " _ " +
        "|_ " +
        "|_|", 6
    ],
    [
        " _ " +
        "  |" +
        "  |", 7
    ],
    [
        " _ " +
        "|_|" +
        "|_|", 8
    ],
    [
        " _ " +
        "|_|" +
        " _|", 9
    ]
];

const hexaGlyphs = [
    [
        " _ " +
        "|_|" +
        "| |", 10
    ],
    [
        " _ " +
        "|_\\" +
        "|_/", 11
    ],
    [
        " _ " +
        "|  " +
        "|_ ", 12
    ],
    [
        " _ " +
        "| \\" +
        "|_/", 13
    ],
    [
        " _ " +
        "|_ " +
        "|_ ", 14
    ],
    [
        " _ " +
        "|_ " +
        "|  ", 15
    ]
];

const decimalCorrectors = {
    1: "_",
    3: "|",
    4: "_",
    5: "|",
    6: "|",
    7: "_",
    8: "|"
}

const hexaCorrectors = {
    1: "_",
    3: "|",
    4: "_",
    5: "|\\",
    6: "|",
    7: "_",
    8: "|\\"
}

export default function createOCR(hexaMode) {
    if (!ocrs[hexaMode]) {
        if (hexaMode) {
            ocrs[hexaMode] = new OCRService(decimalGlyphs.concat(hexaGlyphs), hexaCorrectors);
        } else {
            ocrs[hexaMode] = new OCRService(decimalGlyphs, decimalCorrectors);
        }
    }
    return ocrs[hexaMode];
}
