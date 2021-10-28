/**
 * qcPage_UpdatingData_BlockCover.tsx
 *
 * Cover when Area is updating
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
    _placeHolder?: unknown
}

/**
 *  Parent <div> MUST have position: relative
 */
export const QcPage_UpdatingData_BlockCover : React.FC<QcPage_ChartFiller_NoData_Props> = function ( props: QcPage_ChartFiller_NoData_Props ) : JSX.Element {

    return (

        <div className=" block-updating-overlay-container ">
            Updating Data
        </div>

    )
}