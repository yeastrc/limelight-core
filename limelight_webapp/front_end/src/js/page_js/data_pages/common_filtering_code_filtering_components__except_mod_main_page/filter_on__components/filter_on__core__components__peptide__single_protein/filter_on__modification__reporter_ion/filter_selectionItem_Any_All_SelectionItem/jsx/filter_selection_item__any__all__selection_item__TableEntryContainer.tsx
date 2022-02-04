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
import {Filter_selectionItem_Any_All_SelectionItem} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/filter_selectionItem_Any_All_SelectionItem/jsx/filter_selection_item__any__all__selection_item";
import {SingleProtein_Filter_SelectionType} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinPage_SingleProtein_Filter_Enums";

export const get_Filter_selectionItem_Any_All_SelectionItem_TableEntryContainer = function (
    {
        textLabel,
        current_selection_SelectionType
    } : {
        textLabel : string
        current_selection_SelectionType : SingleProtein_Filter_SelectionType

    }) : JSX.Element {

    return (
        <Filter_selectionItem_Any_All_SelectionItem_TableEntryContainer
            textLabel={ textLabel }
            current_selection_SelectionType={ current_selection_SelectionType }
        />
    )
}

/**
 *
 */
export interface Filter_selectionItem_Any_All_SelectionItem_TableEntryContainer_Props {

    textLabel : string
    current_selection_SelectionType : SingleProtein_Filter_SelectionType
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

        // this.state = {  };
    }

    /**
     *
     */
    // shouldComponentUpdate(nextProps: Readonly<Filter_selectionItem_Any_All_SelectionItem_TableEntryContainer_Props>, nextState: Readonly<Filter_selectionItem_Any_All_SelectionItem_TableEntryContainer_State>, nextContext: any): boolean {
    //
    //     return true
    // }

    /**
     *
     */
    render() {
        return (
            <Filter_selectionItem_Any_All_SelectionItem
                textLabel={ this.props.textLabel }
                current_selection_SelectionType={ this.props.current_selection_SelectionType }
                modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class={ null }  // Not Passed in for now
            />
        );
    }

}