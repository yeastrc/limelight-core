/**
 * proteinPosition_Of_Modification_Filter_UserSelections_Component__Container__GetsProteinData.tsx
 *
 * Protein Position Filter User Selections - Container that Gets Protein Data when requested
 *
 *
 */

import React from 'react'

import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {
    ProteinPosition_Of_Modification_Filter_UserSelections_StateObject
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__peptide_page__components/protein_position_of_modification_filter_component/js/proteinPosition_Of_Modification_Filter_UserSelections_StateObject";
import {
    ProteinPosition_Of_Modification_Filter_UserSelections
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__peptide_page__components/protein_position_of_modification_filter_component/jsx/proteinPosition_Of_Modification_Filter_UserSelections_Component";



export type ProteinPosition_Of_Modification_Filter_UserSelections_Component__UpdateMadeTo_proteinPosition_Of_Modification_Filter_UserSelections_StateObject = () => void;


/**
 *
 */
export interface ProteinPosition_Of_Modification_Filter_UserSelections__GetsProteinData_Props {

    proteinPosition_Of_Modification_Filter_UserSelections_Component_Force_ReRender_Object : object
    proteinPosition_Of_Modification_Filter_UserSelections_StateObject : ProteinPosition_Of_Modification_Filter_UserSelections_StateObject;

    updateMadeTo_proteinPosition_Of_Modification_Filter_UserSelections_StateObject_Callback : ProteinPosition_Of_Modification_Filter_UserSelections_Component__UpdateMadeTo_proteinPosition_Of_Modification_Filter_UserSelections_StateObject

    projectSearchIds : Array<number>

    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
}

interface ProteinPosition_Of_Modification_Filter_UserSelections__GetsProteinData_State {

    _placeholder?: any
    // show_LoadingMessage?: boolean  // Only used if use proteinPosition_Of_Modification_Filter_UserSelections_Component_GetData_Callback
}

/**
 *
 */
export class ProteinPosition_Of_Modification_Filter_UserSelections__GetsProteinData extends React.Component< ProteinPosition_Of_Modification_Filter_UserSelections__GetsProteinData_Props, ProteinPosition_Of_Modification_Filter_UserSelections__GetsProteinData_State > {

    /**
     *
     */
    constructor(props : ProteinPosition_Of_Modification_Filter_UserSelections__GetsProteinData_Props) {
        super(props);

        this.state = {
        }
    }

    render() {

        return (
            <ProteinPosition_Of_Modification_Filter_UserSelections
                proteinPosition_Of_Modification_Filter_UserSelections_Component_Force_ReRender_Object={ this.props.proteinPosition_Of_Modification_Filter_UserSelections_Component_Force_ReRender_Object }
                proteinPosition_Of_Modification_Filter_UserSelections_StateObject={ this.props.proteinPosition_Of_Modification_Filter_UserSelections_StateObject }
                projectSearchIds={ this.props.projectSearchIds }
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root={ this.props.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root }
                updateMadeTo_proteinPosition_Of_Modification_Filter_UserSelections_StateObject_Callback={ this.props.updateMadeTo_proteinPosition_Of_Modification_Filter_UserSelections_StateObject_Callback }
            />
        )
    }
}