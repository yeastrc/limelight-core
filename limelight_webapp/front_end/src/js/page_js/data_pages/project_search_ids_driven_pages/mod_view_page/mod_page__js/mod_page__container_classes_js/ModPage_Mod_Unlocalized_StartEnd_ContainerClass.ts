/**
 * ModPage_Mod_Unlocalized_StartEnd_ContainerClass.ts
 */


export class ModPage_Mod_Unlocalized_StartEnd_ContainerClass {

    private readonly _start: number;
    private readonly _end: number;

    constructor(
        {
            start,
            end
        } : {
            start:number,
            end:number
        }
    ) {
        this._start = start;
        this._end = end;
    }

    toString(): string {
        if(this.start === this.end) {
            return this.start.toString();
        }

        return "[" + this.start + "-" + this.end + "]";
    }

    get start() {
        return this._start;
    }

    get end() {
        return this._end;
    }
}

