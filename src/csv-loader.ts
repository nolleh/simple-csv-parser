export class CsvLoader {
  static CSVtoArray(text: string) {
    var re_valid =
      /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
    var re_value =
      /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
    // Return NULL if input string is not well formed CSV string.
    if (!re_valid.test(text)) return null;
    var a = []; // Initialize array to receive values.
    text.replace(
      re_value, // "Walk" the string using replace with callback.
      function (_, m1, m2, m3) {
        // Remove backslash from \' in single quoted values.
        if (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"));
        // Remove backslash from \" in double quoted values.
        else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'));
        else if (m3 !== undefined) a.push(m3);
        return ""; // Return empty string.
      }
    );
    // Handle special case of empty last value.
    if (/,\s*$/.test(text)) a.push("");
    return a;
  }

  static toObject<T>(raw:string): T[] {
    
    const lines = raw.split(/\r?\n/);

    if (lines.length <= 1) return [];

    const columns = lines[0].split(",");
    // console.log(columns);
    const output: T[] = [];
    const data = lines.slice(1);
    for (const d of data) {
      const object:any ={};
      const value = CsvLoader.CSVtoArray(d);
      if (!value)
        continue;
      let i = 0;
      for (const c of columns)
        object[`${c}`] = value[i++];
      output.push(object);
    }
    return output;
  }
}
