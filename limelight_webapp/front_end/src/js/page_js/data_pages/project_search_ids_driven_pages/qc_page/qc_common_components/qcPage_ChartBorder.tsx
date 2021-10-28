/**
 * qcPage_ChartBorder.tsx
 *
 * Filler for standard size chart with no data
 *
 */


import React from 'react'
import {
    qcPage_StandardChartLayout_StandardHeight,
    qcPage_StandardChartLayout_StandardWidth
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartLayout";

/**
 *
 */
export interface QcPage_ChartBorder_Props {
    width_OverrideStandard?: number
    height_OverrideStandard?: number
}

/**
 *
 */
interface QcPage_ChartBorder_State {
    _placeholder?: any
}

/**
 * Chart Border
 *
 */
export class QcPage_ChartBorder extends React.Component< QcPage_ChartBorder_Props, QcPage_ChartBorder_State > {

    /**
     *
     *
     */
    constructor(props : QcPage_ChartBorder_Props) {
        super(props);

    }

    /**
     *
     */
    render () {

        let width = qcPage_StandardChartLayout_StandardWidth();
        let height = qcPage_StandardChartLayout_StandardHeight();

        if ( this.props.width_OverrideStandard ) {
            width = this.props.width_OverrideStandard
        }
        if ( this.props.height_OverrideStandard ) {
            height = this.props.height_OverrideStandard
        }

        return (

            <div style={ { width, height, borderWidth: 1, borderStyle: "solid" } } className=" standard-border-color-gray ">
                { this.props.children }
            </div>
        )
    }
}
