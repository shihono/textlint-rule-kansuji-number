# textlint-rule-kansuji-number

check number with kanji

## Install

Install with [npm](https://www.npmjs.com/):

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
- allowFigure: `false` でアラビア数字を利用しているかチェックします

#### Examples

漢数字がNG
```
{ "allowKansuji": false, "allowFigure": true}

// OK
アラビア数字の10億円。
// NG
漢数字の十億円。
```

アラビア数字がNG

```
{ "allowKansuji": true, "allowFigure": false}

// OK
漢数字の十億円。
// NG
アラビア数字の10億円。
```


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
