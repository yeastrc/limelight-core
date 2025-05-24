
import React from 'react'
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import {
    ModView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/ModView_DataViz_Compute_ColorScale_WidthHeight_Etc";

/**
 * Contents for Limelight Data Table cell
 *
 * Must be put in a block element.  Does NOT have its own block element.
 *
 * @param params
 */
export const modPage_Get_WholeModTable_ShowCount_ExternalReactComponent = function (
    params: WholeModTable_ShowCount_ExternalReactComponent_Props ) : JSX.Element { try {

    return (
        <WholeModTable_ShowCount_ExternalReactComponent
            { ...params }
        />
    )
} catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

/**
 *
 */
interface WholeModTable_ShowCount_ExternalReactComponent_Props {

    modMass : number
    projectSearchId : number
    modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result: ModView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
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

        let valueForColor = this.props.numericValue

        if ( valueForColor < this.props.modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.minValue_ForViz ) {
            valueForColor = this.props.modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.minValue_ForViz
        }
        if ( valueForColor > this.props.modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.maxValue_ForViz ) {
            valueForColor = this.props.modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.maxValue_ForViz
        }

        const fillColor = (this.props.modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.colorScale( valueForColor ));

        return (
            <>
                <svg width="15" height="15" style={ { marginRight: "10px" } }>
                    <rect width="15" height="15" style={ { fill: fillColor, strokeWidth: "1", stroke: "rgb(0,0,0)" } } />
                </svg>

                <span>{this.props.displayedValue}</span>
            </>
        );
    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}
}

