/**
 * qcPage_CreatingPlot_BlockCover.tsx
 *
 * Cover when Chart is being created (Getting Data and Rendering Chart)
 *
 */


import React from 'react'

/**
 *
 */
interface QcPage_CreatingPlot_BlockCover_Props {
    _placeHolder?: unknown
}

/**
 *  Parent <div> MUST have position: relative
 */
export const QcPage_CreatingPlot_BlockCover : React.FC<QcPage_CreatingPlot_BlockCover_Props> = function ( props: QcPage_CreatingPlot_BlockCover_Props ) : JSX.Element {

    return (

        <div className=" create--update--chart--msg--cover-overlay ">
            Creating Chart
        </div>

    )
}