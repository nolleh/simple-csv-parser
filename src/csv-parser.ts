export class CsvParser {
    static CSVtoArray(text: string) {
        const re_valid =
      /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
        const re_value =
      /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
        if (!re_valid.test(text)) return null;
        const a = [];
        text.replace(re_value, function (_, m1, m2, m3) {
            // Remove backslash from \' in single quoted values.
            if (m1 !== undefined) a.push(m1.replace(/\\'/g, '\''));
            // Remove backslash from \" in double quoted values.
            else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'));
            else if (m3 !== undefined) a.push(m3);
            return ''; // Return empty string.
        });
        // Handle special case of empty last value.
        if (/,\s*$/.test(text)) a.push('');
        return a;
    }

    static toObject<T>(raw: string): T[] {
        const lines = raw.split(/\r?\n/);
        const columns = lines[0].split(',');
        const output: T[] = [];
        const data = lines.slice(1);
        for (const d of data) {
            const object: any = {};
            const value = CsvParser.CSVtoArray(d);
            if (!value || value?.length === 0) continue;
            let i = 0;
            for (const c of columns) object[`${c}`] = value[i++];
            output.push(object);
        }
        return output;
    }
}
