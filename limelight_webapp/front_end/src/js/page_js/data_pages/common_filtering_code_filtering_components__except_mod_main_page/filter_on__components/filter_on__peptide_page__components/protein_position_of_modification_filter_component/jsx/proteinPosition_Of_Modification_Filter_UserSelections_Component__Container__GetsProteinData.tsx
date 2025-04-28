/**
 * proteinPosition_Of_Modification_Filter_UserSelections_Component__Container__GetsProteinData.tsx
 *
 * Protein Position Filter User Selections - Container that Gets Protein Data when requested
 *
 *
 */

import React from 'react'

import {
    ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data,
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__peptide_page__components/protein_position_filter_component/js/proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {proteinPositionFilter_UserSelections_Build_ProteinNamesLengths_Data_ForComponent} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__peptide_page__components/protein_position_filter_component/js/proteinPositionFilter_UserSelections_Build_ProteinNamesLengths_Data_ForComponent";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
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

    proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data? : ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data  //  Loaded on Mount

    // _placeholder?: any
    // show_LoadingMessage?: boolean  // Only used if use proteinPosition_Of_Modification_Filter_UserSelections_Component_GetData_Callback
}

/**
 *
 */
export class ProteinPosition_Of_Modification_Filter_UserSelections__GetsProteinData extends React.Component< ProteinPosition_Of_Modification_Filter_UserSelections__GetsProteinData_Props, ProteinPosition_Of_Modification_Filter_UserSelections__GetsProteinData_State > {

    // private _getProteinData_Callback_BindThis = this._getProteinData_Callback.bind(this);
    //
    // private _DONOTCALL() {  //  Test Funcion cast
    //     const getProteinData_Callback : ProteinPosition_Of_Modification_Filter_UserSelections_Component_GetData_Callback = this._getProteinData_Callback;
    // }

    /**
     *
     */
    constructor(props : ProteinPosition_Of_Modification_Filter_UserSelections__GetsProteinData_Props) {
        super(props);

        this.state = {
        }
    }

    /**
     *
     */
    componentDidMount() { try {

        this._loadDataOnMount();

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    /**
     *
     */
    private _loadDataOnMount() {

        //  Load data on mount
        const promise_proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data = proteinPositionFilter_UserSelections_Build_ProteinNamesLengths_Data_ForComponent({
            projectSearchIds: this.props.projectSearchIds,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: this.props.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        })

        promise_proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data.catch(reason => {})
        promise_proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data.then(proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data => { try {

            this.setState({ proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data })

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
    }

    // private _getProteinData_Callback() : ProteinPosition_Of_Modification_Filter_UserSelections_Component_GetData_Callback_ReturnedValue {
    //
    //     const promise_proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data = proteinPosition_Of_Modification_Filter_UserSelections_Build_ProteinNamesLengths_Data_ForComponent({
    //         projectSearchIds: this.props.projectSearchIds,
    //         commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: this.props.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    //     })
    //
    //     return {
    //         promise_proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data,
    //         proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data: undefined
    //     }
    // }

    render() {

        if ( ! this.state.proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data ) {
            return null;
        }

        return (

            <ProteinPosition_Of_Modification_Filter_UserSelections
                proteinPosition_Of_Modification_Filter_UserSelections_Component_Force_ReRender_Object={ this.props.proteinPosition_Of_Modification_Filter_UserSelections_Component_Force_ReRender_Object }
                proteinPosition_Of_Modification_Filter_UserSelections_StateObject={ this.props.proteinPosition_Of_Modification_Filter_UserSelections_StateObject }
                proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data={ this.state.proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data }
                proteinPosition_Of_Modification_Filter_UserSelections_Component_GetData_Callback={ undefined }
                updateMadeTo_proteinPosition_Of_Modification_Filter_UserSelections_StateObject_Callback={ this.props.updateMadeTo_proteinPosition_Of_Modification_Filter_UserSelections_StateObject_Callback }
            />
        )
    }
}