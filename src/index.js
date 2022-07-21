import { findKanjiNumbers, kanji2number } from '@geolonia/japanese-numeral'

const defaultOptions = {
    prohibitKansuji: false,
    prohibitFigure: false
};

const regexKansuji = /[一二三四五六七八九十]/g;
const regexFigures = /\d/g;

export default function(context, options = {}) {
    const {Syntax, RuleError, report, getSource} = context;
    const prohibitKansuji = options.prohibitKansuji ? options.prohibitKansuji : defaultOptions.prohibitKansuji;
    const prohibitFigure = options.prohibitFigure ? options.prohibitFigure : defaultOptions.prohibitFigure;
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
                const figureIndex = num.search(regexFigures);
                if(prohibitKansuji===true&kansujiIndex>=0&kanji2number(num)>10){
                    report(node, getRuleError(num, "漢数字が含まれています"));
                }
                else if(prohibitFigure===true&figureIndex>=0){
                    report(node, getRuleError(num, "アラビア数字が含まれています"));
                }
            }
        }      
    }
};
