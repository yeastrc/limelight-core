/**
 * filter_selection_item__any__all__selection_item__TableEntryContainer.tsx
 *
 * In Filter Section of Single Protein
 *
 * A Container Component to interface Filter_selectionItem_Any_All_SelectionItem with being in a Data Table Cell
 *
 *
 */

import React from "react";
import {Filter_selectionItem_Any_All_SelectionItem} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/filter_selectionItem_Any_All_SelectionItem/jsx/filter_selection_item__any__all__selection_item";
import {SingleProtein_Filter_SelectionType} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinPage_SingleProtein_Filter_Enums";

/**
 *
 */
export class Filter_selectionItem_Any_All_SelectionItem_TableEntryContainer_CellMgmt_Data {

    textLabel : string
    current_selection_SelectionType : SingleProtein_Filter_SelectionType

    constructor({ textLabel, current_selection_SelectionType } : {
        textLabel : string
        current_selection_SelectionType : SingleProtein_Filter_SelectionType
    }) {
        this.textLabel = textLabel
        this.current_selection_SelectionType = current_selection_SelectionType
    }
}

/**
 *
 */
export interface Filter_selectionItem_Any_All_SelectionItem_TableEntryContainer_Props {

    cellMgmt_ExternalReactComponent_Data : Filter_selectionItem_Any_All_SelectionItem_TableEntryContainer_CellMgmt_Data
}

interface Filter_selectionItem_Any_All_SelectionItem_TableEntryContainer_State { //  Keep shouldComponentUpdate up to date

    _placeholder: any
}

/**
 *
 */
export class Filter_selectionItem_Any_All_SelectionItem_TableEntryContainer extends React.Component< Filter_selectionItem_Any_All_SelectionItem_TableEntryContainer_Props, Filter_selectionItem_Any_All_SelectionItem_TableEntryContainer_State > {

    /**
     *
     */
    constructor(props: Filter_selectionItem_Any_All_SelectionItem_TableEntryContainer_Props) {
        super(props);

        if ( ! ( props.cellMgmt_ExternalReactComponent_Data ) ) {
            const msg = "Filter_selectionItem_Any_All_SelectionItem_TableEntryContainer: ( ! ( props.cellMgmt_ExternalReactComponent_Data ) ) "
            console.warn( msg )
            throw Error( msg )
        }
        if ( ! ( props.cellMgmt_ExternalReactComponent_Data instanceof Filter_selectionItem_Any_All_SelectionItem_TableEntryContainer_CellMgmt_Data ) ) {
            const msg = "Filter_selectionItem_Any_All_SelectionItem_TableEntryContainer: ( ! ( props.cellMgmt_ExternalReactComponent_Data instanceof Filter_selectionItem_Any_All_SelectionItem_TableEntryContainer_CellMgmt_Data ) ) "
            console.warn( msg + ". props.cellMgmt_ExternalReactComponent_Data: ", props.cellMgmt_ExternalReactComponent_Data )
            throw Error( msg )
        }
        // this.state = {  };
    }

    /**
     *
     */
    shouldComponentUpdate(nextProps: Readonly<Filter_selectionItem_Any_All_SelectionItem_TableEntryContainer_Props>, nextState: Readonly<Filter_selectionItem_Any_All_SelectionItem_TableEntryContainer_State>, nextContext: any): boolean {

        if ( ! ( nextProps.cellMgmt_ExternalReactComponent_Data ) ) {
            const msg = "Filter_selectionItem_Any_All_SelectionItem_TableEntryContainer:shouldComponentUpdate: ( ! ( props.cellMgmt_ExternalReactComponent_Data ) ) "
            console.warn( msg )
            throw Error( msg )
        }
        if ( ! ( nextProps.cellMgmt_ExternalReactComponent_Data instanceof Filter_selectionItem_Any_All_SelectionItem_TableEntryContainer_CellMgmt_Data ) ) {
            const msg = "Filter_selectionItem_Any_All_SelectionItem_TableEntryContainer:shouldComponentUpdate: ( ! ( props.cellMgmt_ExternalReactComponent_Data instanceof Filter_selectionItem_Any_All_SelectionItem_TableEntryContainer_CellMgmt_Data ) ) "
            console.warn( msg + ". props.cellMgmt_ExternalReactComponent_Data: ", nextProps.cellMgmt_ExternalReactComponent_Data )
            throw Error( msg )
        }
        return true
    }

    /**
     *
     */
    render() {
        return (
            <Filter_selectionItem_Any_All_SelectionItem
                textLabel={ this.props.cellMgmt_ExternalReactComponent_Data.textLabel }
                current_selection_SelectionType={ this.props.cellMgmt_ExternalReactComponent_Data.current_selection_SelectionType }
            />
        );
    }

}