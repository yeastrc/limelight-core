
/**
 * sharePage_Component_React.tsx
 * 
 * Share Page Button as React Component
 * 
 */


//  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// When user adds or removes in the experiment builder, the data in 'conditionGroupsDataContainer' is removed.  

//  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


import React from 'react'

import { SharePage_dataPages } from 'page_js/data_pages/data_pages_common/sharePage_dataPages';


/**
 * 
 */
export class SharePage_Component_Props {

    experimentId? : number
    projectSearchIds : Array<number>;
}

/**
 * 
 */
class SharePage_Component_State {

    _placeholder: any  // Used so don't put anything in the state
}


/**
 * 
 */
export class SharePage_Component extends React.Component< SharePage_Component_Props, SharePage_Component_State > {

    //  bind to 'this' for passing as parameters

    private _shareButton_ClickHandler_BindThis = this._shareButton_ClickHandler.bind(this);

    /**
     * 
     */    
    constructor(props : SharePage_Component_Props) {
        super(props);
    }

	/**
	 * 
	 */
	_shareButton_ClickHandler( event : React.MouseEvent<HTMLHeadingElement, MouseEvent> ) : void {

        event.preventDefault();

        const sharePage_dataPages = new SharePage_dataPages();
        sharePage_dataPages.initializeFrom_SharePage_Component_React({ experimentId : this.props.experimentId, projectSearchIds : this.props.projectSearchIds });

        sharePage_dataPages.sharePage_MainPage_ButtonClicked_SharePage_Component_React();
    }
    
    /**
     * 
     */    
    render() {

        return (
            <div className=" share-page-container ">
                <input type="button" value="Share Page" 
                    onClick={ this._shareButton_ClickHandler_BindThis }
                />
            </div>
        );

    }

}




