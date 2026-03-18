/**
 * modPage_DataTable_Display_Positions_Cell_Component.tsx
 *
 * Create JSX Elements for "Positions" Data Table Cell
 */

import React from 'react'
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import {
    ModPage_Mod_Unlocalized_StartEnd_ContainerClass
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page__container_classes_js/ModPage_Mod_Unlocalized_StartEnd_ContainerClass";


/**
 * Contents for cell Positions
 */
export const modPage_DataTable_Display_Positions_Cell_ReturnComponent = function (
    props : Cell_ModificationPositions_DataTable_Cell_Contents_Component_Props) : React.JSX.Element { try {

    return (
        <Cell_ModificationPositions_DataTable_Cell_Contents_Component
            { ...props }
        />
    )
} catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}


interface Cell_ModificationPositions_DataTable_Cell_Contents_Component_Props {

    positions: Array<ModPage_Mod_Unlocalized_StartEnd_ContainerClass>
}

interface Cell_ModificationPositions_DataTable_Cell_Contents_Component_State {
    _placeholder: unknown
}

/**
 *
 *
 */
class Cell_ModificationPositions_DataTable_Cell_Contents_Component extends React.Component< Cell_ModificationPositions_DataTable_Cell_Contents_Component_Props, Cell_ModificationPositions_DataTable_Cell_Contents_Component_State > {

    /**
     *
     *
     */
    constructor(props: Cell_ModificationPositions_DataTable_Cell_Contents_Component_Props) { try {

        super(props);

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    /**
     *
     */
    render() { try {

        const positionElementsArray: Array<React.JSX.Element> = []

        if ( this.props.positions && this.props.positions.length > 0 ) {

            for ( let index = 0; index < this.props.positions.length; index++ ) {

                const position = this.props.positions[ index ]

                let commaSeparator_Element = undefined
                if ( index < this.props.positions.length - 1 ) {
                    //  on all but last entry

                    commaSeparator_Element = (
                        <span>,</span>
                    )
                }

                let spaceAfter_Element = undefined
                if ( index < this.props.positions.length - 1 ) {
                    //  on all but last entry

                    spaceAfter_Element = (
                        <span> </span>
                    )
                }


                const element = (
                    <React.Fragment
                        key={ index }
                    >
                        <span
                            style={ { whiteSpace: "nowrap" } }
                        >
                            { position.toString() }

                            { commaSeparator_Element }
                        </span>
                        { spaceAfter_Element }
                    </React.Fragment>
                )

                positionElementsArray.push( element )
            }
        }

        return (
            <>
                { positionElementsArray }
            </>
        );
    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}
}
