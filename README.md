# textlint-rule-kansuji-number

WIP

check number with kanji

## Install

~~Install with [npm](https://www.npmjs.com/):~~

    npm install textlint-rule-kansuji-number

## Usage

Via `.textlintrc`(Recommended)

```json
{
    "rules": {
        "kansuji-number": {
            "allowKansuji": false  // default to false
            // "allowFigure": false
        }
    }
}
```

Via CLI

```
textlint --rule kansuji-number README.md
```

### Options

- allowKansuji: `false` で漢数字を利用しているかチェックします。デフォルトで `false` です。
- allowFigures: `false` でアラビア数字を利用しているかチェックします

### Build

Builds source codes for publish to the `lib` folder.
You can write ES2015+ source codes in `src/` folder.

    npm run build

### Tests

Run test code in `test` folder.
Test textlint rule by [textlint-tester](https://github.com/textlint/textlint/tree/master/packages/textlint-tester).

    npm test

## License

MIT © Hono Shirai
