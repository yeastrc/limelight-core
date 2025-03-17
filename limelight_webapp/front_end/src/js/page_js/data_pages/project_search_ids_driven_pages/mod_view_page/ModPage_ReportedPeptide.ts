export class ModPage_ReportedPeptide {

    private readonly _reportedPeptideId:number;
    private readonly _reportedPeptideString:string;
    private readonly _sequence:string;
    private readonly _proteinMatches:Map<number, Array<number>>;
    private readonly _variableMods:Map<number, ReportedPeptideVariableMod>;

    constructor({
        reportedPeptideId,
        reportedPeptideString,
        sequence,
        proteinMatches,
        variableMods
                } : {
        reportedPeptideId:number,
        reportedPeptideString:string,
        sequence:string,
        proteinMatches:Map<number, Array<number>>,
        variableMods:Map<number, ReportedPeptideVariableMod>
    }) {

        this._reportedPeptideId = reportedPeptideId;
        this._reportedPeptideString = reportedPeptideString;
        this._sequence = sequence;
        this._proteinMatches = proteinMatches;
        this._variableMods = variableMods;
    }


    get reportedPeptideId(): number {
        return this._reportedPeptideId;
    }

    get reportedPeptideString(): string {
        return this._reportedPeptideString;
    }

    get sequence(): string {
        return this._sequence;
    }

    get proteinMatches(): Map<number, Array<number>> {
        return this._proteinMatches;
    }

    get variableMods(): Map<number, ReportedPeptideVariableMod> {
        return this._variableMods;
    }
}

export class ReportedPeptideVariableMod {
    private readonly _isNTerm:boolean;
    private readonly _isCTerm:boolean;
    private readonly _positions:Array<number>;

    constructor({isNTerm, isCTerm, positions} : {isNTerm:boolean, isCTerm:boolean, positions:Array<number>}) {
        this._isCTerm = isCTerm;
        this._isNTerm = isNTerm;
        this._positions = positions;
    }


    get isNTerm(): boolean {
        return this._isNTerm;
    }

    get isCTerm(): boolean {
        return this._isCTerm;
    }

    get positions(): Array<number> {
        return this._positions;
    }
}