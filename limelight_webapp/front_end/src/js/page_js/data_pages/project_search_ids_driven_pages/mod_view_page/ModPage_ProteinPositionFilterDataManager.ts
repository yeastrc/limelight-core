
export class ModPage_ProteinPositionFilterDataManager {

    // key1: proteinId, key2: start position value: end position
    private readonly _proteinPositionFilterData = new Map<number, Map<number, number>>();

    constructor() {
    }

    /**
     * Get all current protein position ranges defined in the protein position filter
     */
    getProteinRanges():Array<ProteinRange> {

        const ranges = new Array<ProteinRange>();

        for(const proteinId of this._proteinPositionFilterData.keys()) {
            for( const start of this._proteinPositionFilterData.get(proteinId).keys()) {
                const end = this._proteinPositionFilterData.get(proteinId).get(start);

                const range = new ProteinRange({proteinId, start, end});
                ranges.push(range);
            }
        }

        return ranges;
    }

    /**
     * Return true if the supplied position in the supplied protein is contained in a defined range in
     * the protein position filter
     *
     * @param proteinId
     * @param position
     */
    isProteinPositionInFilter(
        {
            proteinId,
            position
        } : {
            proteinId:number,
            position:number
        }
    ):boolean {

        if(this._proteinPositionFilterData.size < 1) { return true; }
        if(!(this._proteinPositionFilterData.has(proteinId))) { return false; }

        for(const [rstart, rend] of this._proteinPositionFilterData.get(proteinId)) {
            if(position >= rstart && position <= rend) {
                return true;
            }
        }

        return false;
    }

    /**
     * Return true if any part of the supplied range is contained in any of the ranges defined in
     * the protein position filter. E.g: 1-5 and 3-8 would overlap.
     *
     * @param proteinId
     * @param position
     */
    isProteinRangeInFilter(
        {
            proteinId,
            start,
            end
        } : {
            proteinId:number,
            start:number,
            end:number
        }
    ):boolean {

        if(this._proteinPositionFilterData.size < 1) { return true; }
        if(!(this._proteinPositionFilterData.has(proteinId))) { return false; }

        for(const [rstart, rend] of this._proteinPositionFilterData.get(proteinId)) {
            if(start <= rend && rstart <= end) { return true; }
        }

        return false;
    }

    /**
     * Return true if any position in the supplied protein is in the current protein position filter
     *
     * @param proteinId
     */
    isProteinInFilter(
        {
            proteinId
        } : {
            proteinId:number
        }
    ):boolean {
        if(this._proteinPositionFilterData.size < 1) { return true; }
        if(!(this._proteinPositionFilterData.has(proteinId))) { return false; }
        return this._proteinPositionFilterData.get(proteinId).size > 0;
    }

    /**
     * Delete the given range for the given protein from the protein position filter.
     * Returns true if it was found and deleted, false otherwise
     *
     * @param proteinId
     * @param start
     * @param end
     */
    deleteProteinRange(
        {
            proteinId,
            start,
            end
        } : {
            proteinId:number,
            start:number,
            end:number
        }
    ):boolean {

        if(
            this._proteinPositionFilterData.has(proteinId) &&
            this._proteinPositionFilterData.get(proteinId).has(start) &&
            this._proteinPositionFilterData.get(proteinId).get(start) === end
        ) {

            // assume that no two ranges associated with a protein will start with the same position...
            this._proteinPositionFilterData.get(proteinId).delete(start);

            if(this._proteinPositionFilterData.get(proteinId).size < 1) {
                this._proteinPositionFilterData.delete(proteinId);
            }

            return true;
        }

        return false;   // nothing was deleted
    }

    /**
     * Add the given protein range to the protein position filter.
     * Returns true if a new range was added, false otherwise
     * Reasons new range may not be added: fully contained in existing range, bad data
     * Attempts to fuse existing ranges with the supplied range
     *
     * @param proteinId
     * @param start
     * @param end
     */
    addProteinRange(
        {
            proteinId,
            start,
            end
        } : {
            proteinId:number,
            start:number,
            end:number
        }
    ):boolean {

        if(end < start) { return false; }

        // if first range for this protein, just add it
        if(!(this._proteinPositionFilterData.has(proteinId))) {
            this._proteinPositionFilterData.set(proteinId, new Map());
            this._proteinPositionFilterData.get(proteinId).set(start, end);
            return true;
        }

        if(this.rangeContainedInExistingRange({proteinId, start, end})) {
            return false;
        }

        if(!(this.rangeOverlapsExistingRange({proteinId, start, end}))) {
            this._proteinPositionFilterData.get(proteinId).set(start, end);
            return true;
        }

        // merge ranges that can be combined
        for(const [rstart, rend] of this._proteinPositionFilterData.get(proteinId)) {

            if(start <= rstart && end >= rend) {
                this._proteinPositionFilterData.get(proteinId).delete(rstart);
            }

            else if( start <= rstart && end <= rend ) {
                this._proteinPositionFilterData.get(proteinId).delete(rstart);
                end = rend;
            }

            else if( start <= rend && end >= rend ) {
                this._proteinPositionFilterData.get(proteinId).delete(rstart);
                start = rstart;
            }

        }

        this._proteinPositionFilterData.get(proteinId).set(start, end);
        return true;
    }

    private rangeOverlapsExistingRange(
        {
            proteinId,
            start,
            end
        } : {
            proteinId:number,
            start:number,
            end:number
        }
    ):boolean {

        // merge ranges that can be combined
        for(const [rstart, rend] of this._proteinPositionFilterData.get(proteinId)) {
            if(start <= rstart && end >= rstart) { return true; }
            if(start >= rstart && start <= rend) { return true; }
        }

        return false;
    }

    private rangeContainedInExistingRange(
        {
            proteinId,
            start,
            end
        } : {
            proteinId:number,
            start:number,
            end:number
        }
    ):boolean {

        // merge ranges that can be combined
        for(const [rstart, rend] of this._proteinPositionFilterData.get(proteinId)) {
            if(start >= rstart && end <=rend) { return true;}
        }

        return false;
    }

}

export class ProteinRange {
    private readonly _start:number;
    private readonly _end:number;
    private readonly _proteinId:number;

    constructor({proteinId, start, end}:{proteinId:number, start:number, end:number}) {
        this._start = start;
        this._end = end;
        this._proteinId = proteinId;
    }

    get proteinId(): number {
        return this._proteinId;
    }

    get start(): number {
        return this._start;
    }

    get end(): number {
        return this._end;
    }
}