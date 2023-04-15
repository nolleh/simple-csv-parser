"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvParser = void 0;
class CsvParser {
    static CSVtoArray(text) {
        var re_valid = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
        var re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
        if (!re_valid.test(text))
            return null;
        var a = [];
        text.replace(re_value, function (_, m1, m2, m3) {
            // Remove backslash from \' in single quoted values.
            if (m1 !== undefined)
                a.push(m1.replace(/\\'/g, "'"));
            // Remove backslash from \" in double quoted values.
            else if (m2 !== undefined)
                a.push(m2.replace(/\\"/g, '"'));
            else if (m3 !== undefined)
                a.push(m3);
            return ""; // Return empty string.
        });
        // Handle special case of empty last value.
        if (/,\s*$/.test(text))
            a.push("");
        return a;
    }
    static toObject(raw) {
        const lines = raw.split(/\r?\n/);
        const columns = lines[0].split(",");
        const output = [];
        const data = lines.slice(1);
        for (const d of data) {
            const object = {};
            const value = CsvParser.CSVtoArray(d);
            if (!value || (value === null || value === void 0 ? void 0 : value.length) === 0)
                continue;
            let i = 0;
            for (const c of columns)
                object[`${c}`] = value[i++];
            output.push(object);
        }
        return output;
    }
}
exports.CsvParser = CsvParser;
