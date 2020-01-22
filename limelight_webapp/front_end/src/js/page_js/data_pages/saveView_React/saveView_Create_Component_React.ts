/**
 * saveView_Create_Component_React.ts
 * 
 * Returns 
 *  * React Component for Save View Button as React Component
 *  * Parameter to pass to React Component
 * 
 * 
 * 
 */

import { SaveView_Component, SaveView_Component_Props_Prop } from 'page_js/data_pages/saveView_React/saveView_Component_React'
import { SaveView_Create_Component_React_Result, SaveView_Create_Component_React_Type } from 'page_js/data_pages/saveView_React/saveView_Create_Component_React_FunctionTemplate';

/**
 * 
 */
export const saveView_Create_Component_React = function({ projectSearchIds, experimentId, enableSetDefault } : {

    projectSearchIds : Array<number>
    experimentId? : number
    enableSetDefault : boolean

}) : SaveView_Create_Component_React_Result {

    const saveView_Component_Props_Prop = new SaveView_Component_Props_Prop({ projectSearchIds, experimentId, enableSetDefault });


    const saveView_Create_Component_React_Result = new SaveView_Create_Component_React_Result({

        saveView_Component_React : SaveView_Component,
        saveView_Component_Props_Prop
    });

    return saveView_Create_Component_React_Result;
}

