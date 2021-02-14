/**
 * setDefaultView_Component_React.tsx
 *
 * Set Default View Button as React Component
 *
 *
 *
 */


//  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// When user adds or removes in the experiment builder, the data in 'conditionGroupsDataContainer' is removed.

//  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


import React from 'react'

import { SetDefaultView_dataPages } from 'page_js/data_pages/data_pages_common/setDefaultView_dataPages';
import {
    Get_SetDefaultView_Component_React_Type,
    SetDefaultView_Component_React_Params
} from "page_js/data_pages/setDefaultView_React/setDefaultView_Create_Component_React_FunctionTemplate";

/**
 *
 */
export const setDefaultView_Create_Component_React : Get_SetDefaultView_Component_React_Type = function( params : SetDefaultView_Component_React_Params ) : JSX.Element {

    return (
        <SetDefaultView_Component
            propsValue={ params }
            />
    );
}


/**
 *
 */
export class SetDefaultView_Component_Props {

    propsValue : SetDefaultView_Component_React_Params
}

/**
 *
 */
class SetDefaultView_Component_State {

    _placeholder: any  // Used so don't put anything in the state
}


/**
 *
 */
export class SetDefaultView_Component extends React.Component< SetDefaultView_Component_Props, SetDefaultView_Component_State > {

    //  bind to 'this' for passing as parameters

    private _setDefaultViewButton_ClickHandler_BindThis = this._setDefaultViewButton_ClickHandler.bind(this);

    /**
     *
     */
    constructor(props : SetDefaultView_Component_Props) {
        super(props);

        if ( ! ( props.propsValue instanceof SetDefaultView_Component_React_Params ) ) {
            const msg = "SetDefaultView_Component: props.propsValue NOT instanceof SetDefaultView_Component_React_Params";
            console.warn( msg );
            throw Error( msg );
        }
    }

    /**
     *
     */
    _setDefaultViewButton_ClickHandler( event : React.MouseEvent<HTMLHeadingElement, MouseEvent> ) : void {

        event.preventDefault();

        const setDefaultView_dataPages = new SetDefaultView_dataPages();
        setDefaultView_dataPages.initializeFrom_SetDefaultView_Component_React({
            experimentId : this.props.propsValue.experimentId,
            projectSearchId : this.props.propsValue.projectSearchId
        });

        setDefaultView_dataPages.setDefaultView_MainPage_ButtonClicked_SetDefaultView_Component_React();
    }

    /**
     *
     */
    render() {

        return (
            <React.Fragment>
                <div className=" set-default-view-container ">
                    <input type="button" value="Save As Default"
                           onClick={ this._setDefaultViewButton_ClickHandler_BindThis }
                    />
                </div>
                <span>&nbsp;</span>
            </React.Fragment>
        );

    }

}




