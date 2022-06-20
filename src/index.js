import { findKanjiNumbers } from '@geolonia/japanese-numeral'

export default function(context, options = {}) {
    const {Syntax, RuleError, report, getSource} = context;
    return {
        [Syntax.Str](node){ // "Str" node
            const text = getSource(node); // Get text
            const numbers = findKanjiNumbers(text);

            function getRuleError(word){
                const re = new RegExp(word);
                const indexOfBugs = re.exec(text).index;
                const ruleError = new RuleError("Found bugs.", {
                    index: indexOfBugs // padding of index
                });
                return ruleError
            };
            for(const num of numbers){
                // judge number
                const matchNumCount = /^\d{5,}[万億兆]$/.test(num);
                if(matchNumCount === true){
                    report(node, getRuleError(num));
                }
            }
        }      
    }
};
