
export class QValueCalculator {

    private readonly _qvalueMap : Map<number,number>;

    constructor({pValueArray}:{pValueArray:Array<number>}) {
        this._qvalueMap = this.createQValueMap(pValueArray);
    }

    createQValueMap(pvalueArray:Array<number>) : Map<number,number> {

        //console.log('called createQValueMap', pvalueArray);

        // sort the pvalues
        pvalueArray.sort((a,b) => a - b );

        //console.log('sorted pvalues', pvalueArray);

        // determine the rank of each p-value, the rank of tied pvalue is the largest index + 1 for that pvalue
        // e.g. 0.01, 0.02, 0.02, 0.03 woudl be rank: 1, 3, 3, 4
        const pValueRanks = Array(pvalueArray.length);

        {
            let lastPvalue;
            let lastRank;
            for (let i = pvalueArray.length - 1; i >= 0; i--) {
                let rank;
                if (lastPvalue !== undefined && lastPvalue === pvalueArray[i]) {
                    rank = lastRank;
                } else {
                    rank = i + 1;
                }

                pValueRanks[i] = rank;

                lastRank = rank;
                lastPvalue = pvalueArray[i];
            }
        }

        //console.log('ranks', pValueRanks);

        // create the qvalues
        const qvalueArray = new Array<number>(pvalueArray.length);
        for (let i = pvalueArray.length - 1; i >= 0; i--) {
            const pvalue = pvalueArray[i];
            const rank = pValueRanks[i];

            let qvalue = pvalue * pvalueArray.length / rank;

            // ensure qvalue is never greater than the next worse pvalue
            if( i < qvalueArray.length - 1 ) {
                if(qvalue > qvalueArray[i + 1]) {
                    qvalue = qvalueArray[i + 1];
                }
            }

            qvalueArray[i] = qvalue;
        }

        const qvalueMap = new Map<number,number>();
        for(let i = 0; i < pvalueArray.length; i++ ) {
            const pvalue = pvalueArray[i];
            const qvalue = qvalueArray[i];

            qvalueMap.set(pvalue, qvalue);
        }

        //console.log('qvalues', qvalueMap);

        return qvalueMap;
    }

    getQvalueForPValue(pvalue:number) : number {
        if(!this._qvalueMap.has(pvalue)) {
            throw new Error("Requested q-value for non-existent p-value: " + pvalue);
        }

        return this._qvalueMap.get(pvalue);
    }

}