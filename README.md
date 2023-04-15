[![Coverage Status](https://github.com/nolleh/simple-csv-parser/raw/gh-pages/badges/coverage-jest%20coverage.svg?raw=true)](https://nolleh.github.io/simple-csv-parser/badges/coverage-jest%20coverage.svg?raw=true)
[![npm version](https://badge.fury.io/js/simple-csv-parser.svg)](https://badge.fury.io/js/simple-csv-parser)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

`simple-csv-parser`
for javascript / typescript.  
marshal/serialize csv string to Object.

## Usage

No need other dependency. super simple usage.

```typescript
class Message {
  name: string;
  message: string;
  constructor(name: string, message: string) {
    this.name = name;
    this.message = message;
  }
}

const messages: Message[] = CsvParser.toObject<Message>(
  `name,message\r\nnolleh,"hello, world"`
);

// do something with messages...
const messages = CsvParser.toObject<Message>(
  `name,message\r\nnolleh,"hello, world"\nnolleh,hello2`
);
console.log({ messages });
```

result is

```bash
{
  messages: [
    { name: 'nolleh', message: 'hello, world' },
    { name: 'nolleh', message: 'hello2' }
  ]
}
```

if input string is malformed csv, then it return empty array.
