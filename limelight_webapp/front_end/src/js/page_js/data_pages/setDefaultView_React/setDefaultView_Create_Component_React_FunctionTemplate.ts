/**
 * setDefaultView_Create_Component_React_FunctionTemplate.ts
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
export class SetDefaultView_Component_React_Params {

    projectSearchId? : number;
    experimentId? : number

    constructor({ projectSearchId, experimentId } : {

        projectSearchId? : number
        experimentId? : number
    }) {
        if ( ! projectSearchId && ( ! experimentId ) ) {
            throw Error("Must populate projectSearchId || experimentId")
        }
        this.projectSearchId = projectSearchId
        this.experimentId = experimentId
    }
}


export type Get_SetDefaultView_Component_React_Type = ( params : SetDefaultView_Component_React_Params ) => JSX.Element
