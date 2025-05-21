/**
 * proteinPositionFilter_UserSelections_Component__Container__GetsProteinData.tsx
 *
 * Protein Position Filter User Selections - Container that Gets Protein Data when requested
 *
 *
 */

import React from 'react'

import {
    ProteinPositionFilter_UserSelections_StateObject,
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__peptide_page__components/protein_position_filter_component/js/proteinPositionFilter_UserSelections_StateObject";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {
    ProteinPositionFilter_UserSelections
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__peptide_page__components/protein_position_filter_component/jsx/proteinPositionFilter_UserSelections_Component";

export type ProteinPositionFilter_UserSelections_Component__UpdateMadeTo_proteinPositionFilter_UserSelections_StateObject = () => void;


/**
 *
 */
export interface ProteinPositionFilter_UserSelections__GetsProteinData_Props {

    proteinPositionFilter_UserSelections_Component_Force_ReRender_Object : object
    proteinPositionFilter_UserSelections_StateObject : ProteinPositionFilter_UserSelections_StateObject;

    updateMadeTo_proteinPositionFilter_UserSelections_StateObject_Callback : ProteinPositionFilter_UserSelections_Component__UpdateMadeTo_proteinPositionFilter_UserSelections_StateObject

    projectSearchIds : Array<number>

    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
}

interface ProteinPositionFilter_UserSelections__GetsProteinData_State {

    _placeholder?: any
    // show_LoadingMessage?: boolean  // Only used if use proteinPositionFilter_UserSelections_Component_GetData_Callback
}

/**
 *
 */
export class ProteinPositionFilter_UserSelections__GetsProteinData extends React.Component< ProteinPositionFilter_UserSelections__GetsProteinData_Props, ProteinPositionFilter_UserSelections__GetsProteinData_State > {

    /**
     *
     */
    constructor(props : ProteinPositionFilter_UserSelections__GetsProteinData_Props) {
        super(props);

        this.state = {
        }
    }

    render() {

        return (

            <ProteinPositionFilter_UserSelections
                proteinPositionFilter_UserSelections_Component_Force_ReRender_Object={ this.props.proteinPositionFilter_UserSelections_Component_Force_ReRender_Object }
                proteinPositionFilter_UserSelections_StateObject={ this.props.proteinPositionFilter_UserSelections_StateObject }

                projectSearchIds={ this.props.projectSearchIds }
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root={ this.props.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root }

                updateMadeTo_proteinPositionFilter_UserSelections_StateObject_Callback={ this.props.updateMadeTo_proteinPositionFilter_UserSelections_StateObject_Callback }
            />
        )
    }
}