/**
 * saveView_Component_React.tsx
 * 
 * Save View Button as React Component
 * 
 * 
 * 
 */


//  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// When user adds or removes in the experiment builder, the data in 'conditionGroupsDataContainer' is removed.  

//  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


import React from 'react'

import { SaveView_dataPages } from 'page_js/data_pages/data_pages_common/saveView_dataPages';

/**
 * 
 */
export class SaveView_Component_Props_Prop {

    projectSearchIds : Array<number>;
    experimentId? : number

    constructor({ projectSearchIds, experimentId } : {

        projectSearchIds : Array<number>;
        experimentId? : number
    }) {
        this.projectSearchIds = projectSearchIds
        this.experimentId = experimentId
    }
}

/**
 * 
 */
export class SaveView_Component_Props {

    propsValue : SaveView_Component_Props_Prop
}

/**
 * 
 */
class SaveView_Component_State {

    _placeholder: any  // Used so don't put anything in the state
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

        if ( ! ( props.propsValue instanceof SaveView_Component_Props_Prop ) ) {
            const msg = "SaveView_Component: props.propsValue NOT instanceof SaveView_Component_Props_Prop";
            console.warn( msg );
            throw Error( msg );
        }
    }

	/**
	 * 
	 */
	_saveViewButton_ClickHandler( event : React.MouseEvent<HTMLHeadingElement, MouseEvent> ) : void {

        event.preventDefault();

        const saveView_dataPages = new SaveView_dataPages();
        saveView_dataPages.initializeFrom_SaveView_Component_React({ 
            experimentId : this.props.propsValue.experimentId, 
            projectSearchIds : this.props.propsValue.projectSearchIds
        });

        saveView_dataPages.saveView_MainPage_ButtonClicked_SaveView_Component_React();
    }
    
    /**
     * 
     */    
    render() {

        return (
            <div className=" save-view-container ">
                <input type="button" value="Save View" 
                    onClick={ this._saveViewButton_ClickHandler_BindThis }
                />
            </div>
        );

    }

}




