export class ProteinGroup {

    private _passesFilter: boolean;
    private _proteins: Set<number>;
    private _peptides: Set<number|string>;
    private _uniquePeptides: Set<number|string>;

    constructor() {
        this._proteins = new Set<number>();
        this._peptides = new Set<number>();
        this._uniquePeptides = new Set<number>();
        this._passesFilter = true;
    }

    get passesFilter(): boolean {
        return this._passesFilter;
    }

    set passesFilter(passes:boolean) {
        this._passesFilter = passes;
    }

    get proteins(): Set<number> {
        return this._proteins;
    }

    set proteins(proteins:Set<number>) {
        this._proteins = proteins;
    }

    get peptides(): Set<number|string> {
        return this._peptides;
    }

    set peptides(peptides:Set<number|string>) {
        this._peptides = peptides;
    }

    addProtein(proteinId:number) {
        this._proteins.add(proteinId);
    }

    get uniquePeptides(): Set<number | string> {
        return this._uniquePeptides;
    }

    set uniquePeptides(value: Set<number | string>) {
        this._uniquePeptides = value;
    }

}