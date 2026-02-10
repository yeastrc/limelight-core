
/**
 * sharePage_Component_React.tsx
 * 
 * Share Page Button as React Component
 * 
 */


import React from 'react'

import {sharePage_MainPage_ProcessRequest_Common} from "page_js/data_pages/data_pages_common/sharePage_dataPages_Common";


/**
 *
 * @param experimentId
 * @param projectSearchIds
 */
export const getSharePage_MainPage_Component = function (
    {
        experimentId,
        projectSearchIds
    } : {
    experimentId? : number
    projectSearchIds : Array<number>;

    }) : React.JSX.Element {

    return (
        <SharePage_Component
            experimentId={ experimentId }
            projectSearchIds={ projectSearchIds}
        />
    );
}

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

        sharePage_MainPage_ProcessRequest_Common({ experimentId : this.props.experimentId, projectSearchIds : this.props.projectSearchIds })
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




