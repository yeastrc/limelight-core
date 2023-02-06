/**
 * qcPage_ChartFiller_NoData.tsx
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
export interface QcPage_ChartFiller_NoData_Props {

    chartTitle: string

    displayMessages_Replace_NoData_Message?: Array<string>

    width_OverrideStandard?: number
    height_OverrideStandard?: number
}

/**
 *
 */
interface QcPage_ChartFiller_NoData_State {
    _placeholder?: any
}

/**
 * Chart Border
 *
 */
export class QcPage_ChartFiller_NoData extends React.Component< QcPage_ChartFiller_NoData_Props, QcPage_ChartFiller_NoData_State > {

    /**
     *
     *
     */
    constructor(props : QcPage_ChartFiller_NoData_Props) {
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

            <div style={ { width, height, display: "grid", gridTemplateRows: "1fr 1fr 1fr" } }>
                <div>
                    <div style={ { textAlign: "center", marginTop: 20, marginLeft: 20, marginRight: 20 } }>
                        { this.props.chartTitle }
                    </div>
                </div>
                <div
                    style={
                        {
                            textAlign: "center", fontSize: 18,
                            height: "100%",
                            display: "flex", flexDirection: "column", justifyContent: "center"
                        }
                    }
                //     text-align: center;
                // display: flex;
                // flex-direction: column;
                // /* align-content: center; */
                // justify-content: center;
                // height: 100%;
                >
                    { this.props.displayMessages_Replace_NoData_Message ? (
                        this.props.displayMessages_Replace_NoData_Message.map((value, index) => {
                            return (
                                <div key={ index }>
                                    { value }
                                </div>
                            )
                        })
                    ) : (
                        "No Data"
                    )}
                </div>
                <div></div>
            </div>
        )
    }
}
