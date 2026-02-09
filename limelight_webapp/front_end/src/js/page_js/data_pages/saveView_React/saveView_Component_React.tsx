/**
 * saveView_Component_React.tsx
 *
 * 'Save to Highlighted Results'  Button as React Component
 *
 * WAS:
 * Save View Button as React Component
 * 
 */


import React from 'react'
import { Get_SaveView_Component_React_Type, SaveView_Component_React_Params } from "page_js/data_pages/saveView_React/saveView_Create_Component_React_FunctionTemplate";
import {saveView_dataPages_MainPage_ProcessRequest_Common} from "page_js/data_pages/data_pages_common/saveView_dataPages_Common";

/**
 *
 * @param projectSearchIds
 * @param experimentId
 */
export const get_SaveView_Component : Get_SaveView_Component_React_Type = function (
   params: SaveView_Component_React_Params ) : JSX.Element {

    return (
        <SaveView_Component
          propsValue={ params }
        />
    )
}

/**
 * 
 */
export class SaveView_Component_Props {

    propsValue : SaveView_Component_React_Params
}

/**
 * 
 */
class SaveView_Component_State {

    _placeholder: unknown  // Used so don't put anything in the state
}


/**
 * 
 */
export class SaveView_Component extends React.Component< SaveView_Component_Props, SaveView_Component_State > {

    //  bind to 'this' for passing as parameters

    private _saveViewButton_ClickHandler_BindThis = this._saveViewButton_ClickHandler.bind(this);

    /**
     * 
     */    
    constructor(props : SaveView_Component_Props) {
        super(props);

        if ( ! ( props.propsValue instanceof SaveView_Component_React_Params ) ) {
            const msg = "SaveView_Component: props.propsValue NOT instanceof SaveView_Component_React_Params";
            console.warn( msg );
            throw Error( msg );
        }
    }

	/**
	 * 
	 */
	_saveViewButton_ClickHandler( event : React.MouseEvent<HTMLHeadingElement, MouseEvent> ) : void {

        event.preventDefault();

        saveView_dataPages_MainPage_ProcessRequest_Common({
            experimentId : this.props.propsValue.experimentId, 
            projectSearchIds : this.props.propsValue.projectSearchIds
        });
    }
    
    /**
     * 
     */    
    render() {

        return (
            <React.Fragment>
                <div className=" save-view-container ">
                    <input type="button" value="Save to Highlighted Results"
                           onClick={ this._saveViewButton_ClickHandler_BindThis }
                    />
                </div>
                <span>&nbsp;</span>
            </React.Fragment>
        );

    }

}




