import { CsvParser } from "csv-parser";
describe("csv-parser", () => {
    it("should return empty for malformed csv", () => {
        class Message {
            name;
            message;
            remark;
            constructor(payload) {
                Object.assign(this, payload);
            }
        }
        const messages = CsvParser.toObject(`name,message,remark\r\n"'`);
        expect(messages.length).toBe(0);
    });
    it("should return empty array for empty raws", () => {
        class Message {
            name;
            message;
            remark;
            constructor(payload) {
                Object.assign(this, payload);
            }
        }
        const messages = CsvParser.toObject(`name,message,remark\r\n`);
        expect(messages.length).toBe(0);
    });
    it("should parse simple csv", () => {
        class Message {
            name;
            message;
            constructor(name, message) {
                this.name = name;
                this.message = message;
            }
        }
        const messages = CsvParser.toObject(`name,message\r\nnolleh,hello`);
        expect(messages).not.toBe(null);
        expect(messages?.length).toBe(1);
        expect(messages[0].name).toBe("nolleh");
        expect(messages[0].message).toBe("hello");
    });
    it("should parse multiple data csv", () => {
        class Message {
            name;
            message;
            constructor(payload) {
                Object.assign(this, payload);
            }
        }
        const messages = CsvParser.toObject(`name,message\r\nnolleh,hello\nnolleh,hello2`);
        expect(messages.length).toBe(2);
        expect(messages[0].name).toBe("nolleh");
        expect(messages[0].message).toBe("hello");
        expect(messages[1].name).toBe("nolleh");
        expect(messages[1].message).toBe("hello2");
    });
    it("should parse ending with espaced csv", () => {
        class Message {
            name;
            message;
            constructor(payload) {
                Object.assign(this, payload);
            }
        }
        const messages = CsvParser.toObject(`name,message\r\nnolleh,"hello, world"\nnolleh,hello2`);
        expect(messages.length).toBe(2);
        expect(messages[0].name).toBe("nolleh");
        expect(messages[0].message).toBe("hello, world");
        expect(messages[1].name).toBe("nolleh");
        expect(messages[1].message).toBe("hello2");
    });
    it("should parse contain espaced csv", () => {
        class Message {
            name;
            message;
            remark;
            constructor(payload) {
                Object.assign(this, payload);
            }
        }
        const messages = CsvParser.toObject(`name,message,remark\r\nnolleh,"hello, world",1\nnolleh,hello2,2`);
        expect(messages.length).toBe(2);
        expect(messages[0].name).toBe("nolleh");
        expect(messages[0].message).toBe("hello, world");
        expect(messages[0].remark).toBe("1");
        expect(messages[1].name).toBe("nolleh");
        expect(messages[1].message).toBe("hello2");
        expect(messages[1].remark).toBe("2");
    });
    it("should pass empty line", () => {
        class Message {
            name;
            message;
            remark;
            constructor(payload) {
                Object.assign(this, payload);
            }
        }
        const messages = CsvParser.toObject(`name,message,remark\r\n\nnolleh,hello2,2`);
        expect(messages.length).toBe(1);
        expect(messages[0].name).toBe("nolleh");
        expect(messages[0].message).toBe("hello2");
        expect(messages[0].remark).toBe("2");
    });
    it("should handle empty last value for empty value", () => {
        class Message {
            name;
            message;
            remark;
            constructor(payload) {
                Object.assign(this, payload);
            }
        }
        const messages = CsvParser.toObject(`name,message,remark\r\n\nnolleh,hello2,`);
        expect(messages.length).toBe(1);
        expect(messages[0].name).toBe("nolleh");
        expect(messages[0].message).toBe("hello2");
        expect(messages[0].remark).toBe("");
    });
    it("should espape in single quoated value", () => {
        class Message {
            name;
            message;
            remark;
            constructor(payload) {
                Object.assign(this, payload);
            }
        }
        const cmxmsg = "escape back slash,single quote";
        const messages = CsvParser.toObject(`name,message,remark\r\nnolleh, '${cmxmsg}', 'with,comma'`);
        expect(messages.length).toBe(1);
        expect(messages[0].name).toBe("nolleh");
        expect(messages[0].message).toBe(cmxmsg);
        expect(messages[0].remark).toBe("with,comma");
    });
});
