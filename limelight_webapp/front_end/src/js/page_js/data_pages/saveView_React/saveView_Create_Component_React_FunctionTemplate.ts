/**
 * saveView_Create_Component_React_FunctionTemplate.ts
 *
 * Returns
 *  * React Component for Save View Button as React Component
 *  * Parameter to pass to React Component
 *
 *
 *
 */


/**
 *
 */
export class SaveView_Component_React_Params {

    projectSearchIds : Array<number>;
    experimentId? : number

    constructor({ projectSearchIds, experimentId } : {

        projectSearchIds : Array<number>;
        experimentId? : number
    }) {
        this.projectSearchIds = projectSearchIds
        this.experimentId = experimentId
    }

    private _DO_NOT_Call() {} // Only here to force use of constructor
}


export type Get_SaveView_Component_React_Type = ( params : SaveView_Component_React_Params ) => React.JSX.Element
