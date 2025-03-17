
export class ModPage_Protein {

    private readonly _id:number;
    private readonly _annotations:Map<string, Set<string>>;   //key == names, values = set of descriptions for that name
    private readonly _length:number;

    constructor({id, annotations, length}:{id:number, annotations:Map<string, Set<string>>, length:number}) {
        this._id = id;
        this._annotations = annotations;
        this._length = length;
    }

    get id(): number {
        return this._id;
    }

    get annotations(): Map<string, Set<string>> {
        return this._annotations;
    }

    get length(): number {
        return this._length;
    }
}
