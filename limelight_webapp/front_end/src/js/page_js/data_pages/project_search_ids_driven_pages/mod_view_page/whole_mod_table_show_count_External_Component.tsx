
import React from 'react'


export const get_WholeModTable_ShowCount_ExternalReactComponent = function (
    {
        modMass,
        projectSearchId,
        d3ColorScaler,
        numericValue,
        displayedValue
    } : {
        modMass : number,
        projectSearchId : number,
        d3ColorScaler : any,
        numericValue : number,
        displayedValue : any,

    }) : JSX.Element {

    return (
        <WholeModTable_ShowCount_ExternalReactComponent
            modMass={ modMass }
            projectSearchId={ projectSearchId }
            d3ColorScaler={ d3ColorScaler }
            numericValue={ numericValue }
            displayedValue={ displayedValue }
        />
    )
}

/**
 *
 */
interface WholeModTable_ShowCount_ExternalReactComponent_Props {

    modMass : number
    projectSearchId : number
    d3ColorScaler : any
    numericValue : number
    displayedValue : any
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

    render() {

        const fillColor = (this.props.d3ColorScaler(this.props.numericValue));

        return (
            <div>
                <svg width="15" height="15" style={{marginRight:"10px"}}>
                    <rect width="15" height="15" style={{fill:fillColor,strokeWidth:"1",stroke:"rgb(0,0,0)"}} />
                </svg>

                <span>{this.props.displayedValue}</span>
            </div>
        );
    }
}

