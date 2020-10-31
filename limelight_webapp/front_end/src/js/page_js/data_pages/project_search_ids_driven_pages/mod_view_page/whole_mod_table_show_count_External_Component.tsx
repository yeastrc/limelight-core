
import React from 'react'

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';


/**
 *
 */
export interface wholeModTable_ShowCount_ExternalReactComponent_Props {

    cellMgmt_ExternalReactComponent_Data : {
        modMass : number,
        projectSearchId : number,
        d3ColorScaler : any,
        numericValue : number,
        displayedValue : any,
    }
}

/**
 *
 */
export class wholeModTable_ShowCount_ExternalReactComponent extends React.Component< wholeModTable_ShowCount_ExternalReactComponent_Props, {} > {

    /**
     *
     */
    constructor(props : wholeModTable_ShowCount_ExternalReactComponent_Props) {
        super(props);

        this.state = {};
    }

    render() {

        const fillColor = (this.props.cellMgmt_ExternalReactComponent_Data.d3ColorScaler(this.props.cellMgmt_ExternalReactComponent_Data.numericValue));

        return (
            <div>
                <svg width="15" height="15" style={{marginRight:"10px"}}>
                    <rect width="15" height="15" style={{fill:fillColor,strokeWidth:"1",stroke:"rgb(0,0,0)"}} />
                </svg>

                <span>{this.props.cellMgmt_ExternalReactComponent_Data.displayedValue}</span>
            </div>
        );
    }
}

