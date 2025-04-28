
import React from 'react'
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";


export const modPage_Get_WholeModTable_ShowCount_ExternalReactComponent = function (
    {
        modMass,
        projectSearchId,
        d3ColorScaler,
        numericValue,
        displayedValue
    } : {
        modMass : number,
        projectSearchId : number,
        d3ColorScaler : any   // treated as a function in code below so unknown what the type is since ".range(" returns an array per d3 Typescript types
        numericValue : number,
        displayedValue : string | number,

    }) : JSX.Element { try {

    return (
        <WholeModTable_ShowCount_ExternalReactComponent
            modMass={ modMass }
            projectSearchId={ projectSearchId }
            d3ColorScaler={ d3ColorScaler }
            numericValue={ numericValue }
            displayedValue={ displayedValue }
        />
    )
} catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

/**
 *
 */
interface WholeModTable_ShowCount_ExternalReactComponent_Props {

    modMass : number
    projectSearchId : number
    d3ColorScaler : any   // treated as a function in code below so unknown what the type is since ".range(" returns an array per d3 Typescript types
    numericValue : number
    displayedValue : string | number
}

/**
 *
 */
class WholeModTable_ShowCount_ExternalReactComponent extends React.Component< WholeModTable_ShowCount_ExternalReactComponent_Props, {} > {

    /**
     *
     */
    constructor(props : WholeModTable_ShowCount_ExternalReactComponent_Props) {
        super(props);

        this.state = {};
    }

    render() { try {

        const fillColor = (this.props.d3ColorScaler(this.props.numericValue));

        return (
            <div>
                <svg width="15" height="15" style={{marginRight:"10px"}}>
                    <rect width="15" height="15" style={{fill:fillColor,strokeWidth:"1",stroke:"rgb(0,0,0)"}} />
                </svg>

                <span>{this.props.displayedValue}</span>
            </div>
        );
    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}
}

