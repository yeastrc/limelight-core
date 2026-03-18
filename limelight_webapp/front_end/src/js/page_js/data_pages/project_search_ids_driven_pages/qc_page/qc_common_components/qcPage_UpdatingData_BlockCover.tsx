/**
 * qcPage_UpdatingData_BlockCover.tsx
 *
 * Cover when Area is updating
 *
 */


import React from 'react'

/**
 *
 */
interface QcPage_UpdatingData_BlockCover_Props {
    _placeHolder?: unknown
}

/**
 *  Parent <div> MUST have position: relative
 */
export const QcPage_UpdatingData_BlockCover : React.FC<QcPage_UpdatingData_BlockCover_Props> = function ( props: QcPage_UpdatingData_BlockCover_Props ) : React.JSX.Element {

    return (

        <div className=" create--update--chart--msg--cover-overlay ">
            Updating Data
        </div>

    )
}