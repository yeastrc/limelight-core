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
import {SetDefaultView_Component_Props_Prop} from "page_js/data_pages/setDefaultView_React/setDefaultView_Component_React";
import React from "react";

export class SetDefaultView_Create_Component_React_Result {
    setDefaultView_Component_React : React.ReactNode
    setDefaultView_Component_Props_Prop : SetDefaultView_Component_Props_Prop //  The object to pass to prop 'propValues'

    constructor({ setDefaultView_Component_React, setDefaultView_Component_Props_Prop } : {

        setDefaultView_Component_React : React.ReactNode,
        setDefaultView_Component_Props_Prop : SetDefaultView_Component_Props_Prop })
    {
        this.setDefaultView_Component_React = setDefaultView_Component_React;
        this.setDefaultView_Component_Props_Prop = setDefaultView_Component_Props_Prop;
    }
}

export type SetDefaultView_Create_Component_React_Type = ({ projectSearchIds, experimentId } : {

    projectSearchIds : Array<number>
    experimentId : number
}) => SetDefaultView_Create_Component_React_Result
