export class PsmScanInfo {

    private readonly _psmId:number;
    private readonly _scanNumber:number;
    private readonly _scanFilenameId:number;
    private readonly _scanFilename:string;

    constructor(
        {
            psmId,
            scanNumber,
            scanFilenameId,
            scanFilename

        } : {
            psmId:number,
            scanNumber:number,
            scanFilenameId:number,
            scanFilename:string
        }) {

        this._psmId = psmId;
        this._scanNumber = scanNumber;
        this._scanFilename = scanFilename;
        this._scanFilenameId = scanFilenameId;
    }


    get psmId(): number {
        return this._psmId;
    }

    get scanNumber(): number {
        return this._scanNumber;
    }

    get scanFilenameId(): number {
        return this._scanFilenameId;
    }

    get scanFilename(): string {
        return this._scanFilename;
    }
}