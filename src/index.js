import { findKanjiNumbers, kanji2number } from '@geolonia/japanese-numeral'

const defaultOptions = {
    allowKansuji: false,
    allowFigure: true
};

const regexKansuji = /[一二三四五六七八九十]/g;
const regexFigure = /\d/g;

export default function(context, options = {}) {
    const {Syntax, RuleError, report, getSource} = context;
    const allowKansuji = "allowKansuji" in options ? options.allowKansuji : defaultOptions.allowKansuji;
    const allowFigure = "allowFigure" in options ? options.allowFigure : defaultOptions.allowFigure;
    return {
        [Syntax.Str](node){ // "Str" node
            const text = getSource(node); // Get text
            const numbers = findKanjiNumbers(text);

            function getRuleError(word, message="Found bugs."){
                const re = new RegExp(word);
                const indexOfBugs = re.exec(text).index;
                const ruleError = new RuleError(message, {
                    index: indexOfBugs // padding of index
                });
                return ruleError
            };
            for(const num of numbers){
                // judge number
                const kansujiIndex = num.search(regexKansuji);
                const figureIndex = num.search(regexFigure);
                if(allowKansuji===false&kansujiIndex>=0&kanji2number(num)>10){
                    report(node, getRuleError(num, "漢数字が含まれています"));
                }
                else if(allowFigure===false&figureIndex>=0){
                    report(node, getRuleError(num, "アラビア数字が含まれています"));
                }
            }
        }      
    }
};
