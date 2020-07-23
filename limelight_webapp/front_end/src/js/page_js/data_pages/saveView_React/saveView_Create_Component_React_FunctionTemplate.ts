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
import {SaveView_Component_Props_Prop} from "page_js/data_pages/saveView_React/saveView_Component_React";
import React from "react";

export class SaveView_Create_Component_React_Result {
    saveView_Component_React : React.ReactNode
    saveView_Component_Props_Prop : SaveView_Component_Props_Prop //  The object to pass to prop 'propValues'

    constructor({ saveView_Component_React, saveView_Component_Props_Prop } : {

        saveView_Component_React : React.ReactNode,
        saveView_Component_Props_Prop : SaveView_Component_Props_Prop })
    {
        this.saveView_Component_React = saveView_Component_React;
        this.saveView_Component_Props_Prop = saveView_Component_Props_Prop;
    }
}

export type SaveView_Create_Component_React_Type = ({ projectSearchIds, experimentId } : {

    projectSearchIds : Array<number>
    experimentId : number
}) => SaveView_Create_Component_React_Result
