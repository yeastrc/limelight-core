/**
 * setDefaultView_Create_Component_React.ts
 *
 * Returns
 *  * React Component for Save View Button as React Component
 *  * Parameter to pass to React Component
 *
 *
 *
 */

import { SetDefaultView_Component, SetDefaultView_Component_Props_Prop } from 'page_js/data_pages/setDefaultView_React/setDefaultView_Component_React'
import { SetDefaultView_Create_Component_React_Result, SetDefaultView_Create_Component_React_Type } from 'page_js/data_pages/setDefaultView_React/setDefaultView_Create_Component_React_FunctionTemplate';

/**
 *
 */
export const setDefaultView_Create_Component_React = function({ projectSearchId, experimentId } : {

    projectSearchId? : number
    experimentId? : number

}) : SetDefaultView_Create_Component_React_Result {

    const setDefaultView_Component_Props_Prop = new SetDefaultView_Component_Props_Prop({ projectSearchId, experimentId });


    const setDefaultView_Create_Component_React_Result = new SetDefaultView_Create_Component_React_Result({

        setDefaultView_Component_React : SetDefaultView_Component,
        setDefaultView_Component_Props_Prop
    });

    return setDefaultView_Create_Component_React_Result;
}

