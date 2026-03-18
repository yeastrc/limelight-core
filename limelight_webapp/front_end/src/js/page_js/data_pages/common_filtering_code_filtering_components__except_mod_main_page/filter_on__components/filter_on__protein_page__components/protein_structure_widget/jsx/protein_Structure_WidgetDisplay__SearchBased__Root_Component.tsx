/**
 * protein_Structure_WidgetDisplay__SearchBased__Root_Component.tsx
 * 
 * Protein Structure Widget Display - On Search Based pages --  Different for Experiment pages
 * 
 */




import React from 'react'
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";

import {
    CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {
    Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds";
import {
    CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_multiple_searches_sub_parts__returned_objects/commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId";
import { DataPageStateManager, SearchNames_AsMap } from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {
    SearchDetailsBlockDataMgmtProcessing
} from "page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsBlockDataMgmtProcessing";
import {
    SearchDataLookupParameters_Root
} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {
    ProteinSequenceWidget_StateObject
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__protein_page__components/protein_sequence_display_widget/js/proteinSequenceWidget_StateObject";
import { ProteinSequence_Bar_Widget_StateObject } from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__protein_page__components/protein_sequence_bar_widget/js/proteinSequence_Bar_Widget_StateObject";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { limelight__IsVariableAString } from "page_js/common_all_pages/limelight__IsVariableAString";
import {
    CommonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters";
import { limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer, Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component } from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";
import { Limelight_AnyFilter__HasFilterValue } from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/any_filter__has_filter_value/Limelight_AnyFilter__HasFilterValue";
import {
    ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass";
import { ModificationMass_UserSelections_StateObject } from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject";
import { Protein_Structure_WidgetDisplay__Main_Component } from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__protein_page__components/protein_structure_widget/jsx/protein_Structure_WidgetDisplay__Main_Component";


const _MAX_PROTEIN_LENGTH_TO_DISPLAY = 100000

const _PROTEIN_BAR__SELECTED_PROJECT_SEARCH_ID__FOR__ALL_COMBINED = 0
const _PROTEIN_BAR__SELECTED_PROJECT_SEARCH_ID__DEFAULT = _PROTEIN_BAR__SELECTED_PROJECT_SEARCH_ID__FOR__ALL_COMBINED

/**
 * 
 */
export interface Protein_Structure_WidgetDisplay__SearchBased__Root_Component_Props {

    proteinSequence_Bar_Widget_StateObject : ProteinSequence_Bar_Widget_StateObject

    proteinSequenceWidget_StateObject : ProteinSequenceWidget_StateObject

    modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject;  // Used for filtering modification masses

    limelight_AnyFilter__HasFilterValue : Limelight_AnyFilter__HasFilterValue

    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass

    /**
     * Use change of object to trigger computation of new data to display
     */
    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds

    projectSearchIds : Array<number>;
    proteinSequenceVersionId : number;
    proteinNames : string;
    proteinDescriptions : string
    proteinSequenceString : string

    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

    commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder: CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder

    dataPageStateManager : DataPageStateManager
    dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager;
    searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing;

    searchNamesMap_KeyProjectSearchId : SearchNames_AsMap;
    searchDataLookupParamsRoot : SearchDataLookupParameters_Root;

    updateMadeTo_proteinSequenceWidgetDisplay_UserSelections_StateObject_Callback: () => void
}

interface Protein_Structure_WidgetDisplay__SearchBased__Root_Component_State {

    _placeholder?: unknown
}

/**
 * Search Based -- as opposed to Experiment Based
 */
export class Protein_Structure_WidgetDisplay__SearchBased__Root_Component extends React.Component< Protein_Structure_WidgetDisplay__SearchBased__Root_Component_Props, Protein_Structure_WidgetDisplay__SearchBased__Root_Component_State > {

    //  bind to 'this' for passing as parameters
    // private _selected_Search_OnChange_Callback_BindThis = this._selected_Search_OnChange_Callback.bind(this);
    private _selected_Search_OnChange_From_MUI_Select_Callback_BindThis = this._selected_Search_OnChange_From_MUI_Select_Callback.bind(this)

    private _neverRender_ActualValue = false

    private _renderMsg__ProteinLength_TooLong = false

    private _projectSearchIds_WithData_ForThis_ProteinSequenceVersionId: Array<number>

    /**
     * Store as Array so that can just pass to child component instead of create new Array object on every render()
     */
    private _selected_ProjectSearchId_As_Array = [ _PROTEIN_BAR__SELECTED_PROJECT_SEARCH_ID__DEFAULT ]

    /**
     * 
     */    
    constructor(props : Protein_Structure_WidgetDisplay__SearchBased__Root_Component_Props) { try {
        super(props);


        if ( this.props.proteinSequenceString.length > _MAX_PROTEIN_LENGTH_TO_DISPLAY ) {

            this._renderMsg__ProteinLength_TooLong = true

            this._neverRender_ActualValue = true
        }

        this.state = {  };

    } catch ( e ) { reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } ); throw e } }


    /**
     * After render()
     */
    componentDidMount() { try {

        if ( this._neverRender_ActualValue ) {
            return // EARLY RETURN
        }

        this._loadData_OnMount()

    } catch ( e ) { reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } ); throw e } }


    /**
     *
     */
    private _loadData_OnMount() {

        if ( this.props.projectSearchIds.length > 1 ) {

            //  Have > 1 search so need to compute which searches have THIS ProteinSequenceVersionId for the Search Selection

            const proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder> = new Map()

            const promises: Array<Promise<void>> = [];

            for ( const projectSearchId of this.props.projectSearchIds ) {

                const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId = this.props.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId( projectSearchId )

                const get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder_AllForSearch_Result =
                    commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                    get_commonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters().
                    get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder_AllForSearch()

                if ( get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder_AllForSearch_Result.data ) {
                    proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder_Map_Key_ProjectSearchId.set( projectSearchId,
                        get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder_AllForSearch_Result.data.proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder )
                } else if ( get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder_AllForSearch_Result.promise ) {
                    const promise = new Promise<void>((resolve, reject) => { try {
                        get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder_AllForSearch_Result.promise.catch(reason => reject(reason))
                        get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder_AllForSearch_Result.promise.then(value => { try {
                            proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder_Map_Key_ProjectSearchId.set(
                                projectSearchId, value.proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder
                            );
                            resolve();
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    promises.push(promise)
                } else {
                    throw Error("get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder_AllForSearch_Result Not has data or promise")
                }
            }

            if ( promises.length === 0 ) {

                this._loadData_OnMount_After_LoadData({
                    proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder_Map_Key_ProjectSearchId
                })
            }

            const promisesAll = Promise.all(promises)

            promisesAll.catch(reason => {
                try {
                    // reject(reason);
                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                    throw e;
                }
            });
            promisesAll.then(result => {
                try {
                    this._loadData_OnMount_After_LoadData({
                        proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder_Map_Key_ProjectSearchId
                    })

                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                    throw e;
                }
            });
        }
    }

    private _loadData_OnMount_After_LoadData(
        {
            proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder_Map_Key_ProjectSearchId
        } : {
            proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder>
        }
    ) {

        this._projectSearchIds_WithData_ForThis_ProteinSequenceVersionId = []

        //  Have > 1 search so need to compute which searches have THIS ProteinSequenceVersionId for the Search Selection

        const proteinSequenceVersionId = this.props.proteinSequenceVersionId

        for ( const projectSearchId of this.props.projectSearchIds ) {

            const proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder =
                proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder_Map_Key_ProjectSearchId.get( projectSearchId )

            const proteinSequenceCoverageData_For_ProteinSequenceVersionId =
                proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder.get_ProteinSequenceCoverageData_For_ProteinSequenceVersionId( proteinSequenceVersionId )

            if ( proteinSequenceCoverageData_For_ProteinSequenceVersionId ) {

                this._projectSearchIds_WithData_ForThis_ProteinSequenceVersionId.push( projectSearchId )
            }
        }

        this.forceUpdate()
    }

    /**
     * Clean Up
     */
    // componentWillUnmount() {

    // }

    /**
     * @returns true if should update, false otherwise
     */
    shouldComponentUpdate( nextProps: Readonly<Protein_Structure_WidgetDisplay__SearchBased__Root_Component_Props>, nextState: Readonly<Protein_Structure_WidgetDisplay__SearchBased__Root_Component_State>, nextContext: any ): boolean { try {

        if ( nextProps.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds !== this.props.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds) {

            return true
        }

        return false

    } catch ( e ) { reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } ); throw e } }

    /**
     * After render()
     *
     * @param prevProps
     * @param prevState
     * @param snapshot
     */
    // componentDidUpdate( prevProps: Readonly<Protein_Structure_WidgetDisplay__SearchBased__Root_Component_Props>, prevState: Readonly<Protein_Structure_WidgetDisplay__SearchBased__Root_Component_State>, snapshot?: any ) { try {
    //
    // } catch ( e ) { reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } ); throw e } }

    /**
     *
     * @param event
     */
    // private _selected_Search_OnChange_Callback( event: React.ChangeEvent<HTMLSelectElement> )  { try {
    //
    //     this._selected_ProjectSearchId_As_Array = [ Number.parseInt( event.target.value ) ]
    //
    //     this.forceUpdate()
    //
    // } catch ( e ) { reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } ); throw e } }

    /**
     *
     * @param event
     */
    private _selected_Search_OnChange_From_MUI_Select_Callback( event: SelectChangeEvent )  { try {

        const newValue = event.target.value

        if ( ! limelight__IsVariableAString( newValue ) ) {
            const msg = "in '_selected_Search_OnChange_From_MUI_Select_Callback': 'event.target.value' is NOT type string"
            console.warn(msg)
            throw Error(msg)
        }

        this._selected_ProjectSearchId_As_Array = [ Number.parseInt( newValue ) ]

        if ( Number.isNaN( this._selected_ProjectSearchId_As_Array ) ) {
            const msg = "in '_selected_Search_OnChange_From_MUI_Select_Callback': 'Number.parseInt( event.target.value )' results in NaN"
            console.warn(msg)
            throw Error(msg)
        }

        this.forceUpdate()

    } catch ( e ) { reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } ); throw e } }

    /**
     * 
     */    
    render() { try {

        if ( ! this.props.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds ) {
            const msg = "No value for this.props.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds";
            console.warn( msg );
            throw Error( msg );
        }

        {
            if ( this._renderMsg__ProteinLength_TooLong ) {

                //  Protein sequence is too long to display so display this message instead

                return (
                    <div style={ { marginTop: 10 } }>
                        <div>
                            Unable to display sequence coverage for proteins with length greater than { _MAX_PROTEIN_LENGTH_TO_DISPLAY.toLocaleString() }.
                        </div>
                        <div style={ { marginTop: 5 } }>
                            Length of current protein sequence is { this.props.proteinSequenceString.length.toLocaleString() }.
                        </div>
                    </div>
                )
            }
        }

        if ( this._neverRender_ActualValue ) {

            return null  // EARLY RETURN
        }

        if (
            this.props.projectSearchIds.length > 1
            && ( ! this._projectSearchIds_WithData_ForThis_ProteinSequenceVersionId )
        ) {
            //  Have > 1 search AND not yet computed which searches have data for this protein so render loading message

            return (  // EARLY RETURN

                <div>
                    LOADING...
                </div>
            )
        }


        const searchName_Select_MenuItem_MaxWidth = 900

        let searchNameOptions_ElementArray: Array<React.JSX.Element> = undefined

        if ( this._projectSearchIds_WithData_ForThis_ProteinSequenceVersionId && ( this._projectSearchIds_WithData_ForThis_ProteinSequenceVersionId.length > 1 ) ) {

            searchNameOptions_ElementArray = []

            { //  Selection of search to display

                {
                    searchNameOptions_ElementArray.push(
                        <MenuItem
                            key={ _PROTEIN_BAR__SELECTED_PROJECT_SEARCH_ID__FOR__ALL_COMBINED }
                            value={ _PROTEIN_BAR__SELECTED_PROJECT_SEARCH_ID__FOR__ALL_COMBINED.toString() }
                        >
                            All searches combined
                        </MenuItem>
                    )
                }

                // searchNameOptions_ElementArray.push(
                //     <option
                //         key={ _PROTEIN_BAR__SELECTED_PROJECT_SEARCH_ID__FOR__ALL_COMBINED }
                //         value={ _PROTEIN_BAR__SELECTED_PROJECT_SEARCH_ID__FOR__ALL_COMBINED }
                //     >
                //         All searches combined
                //     </option>
                // )

                const searchData_SearchName_Etc_Root = this.props.dataPageStateManager.get_searchData_SearchName_Etc_Root()

                for ( const projectSearchId of this._projectSearchIds_WithData_ForThis_ProteinSequenceVersionId ) {

                    const searchData_For_ProjectSearchId = searchData_SearchName_Etc_Root.get_SearchData_For_ProjectSearchId( projectSearchId )
                    if ( ! searchData_For_ProjectSearchId ) {
                        throw Error( "searchData_SearchName_Etc_Root.get_SearchData_For_ProjectSearchId( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId )
                    }

                    const displayName = "(" + searchData_For_ProjectSearchId.searchId + ") " + searchData_For_ProjectSearchId.name

                    searchNameOptions_ElementArray.push(
                        <MenuItem
                            key={ searchData_For_ProjectSearchId.projectSearchId }
                            value={ searchData_For_ProjectSearchId.projectSearchId.toString() }
                            sx={ { whiteSpace: 'normal', maxWidth: searchName_Select_MenuItem_MaxWidth } }
                        >
                            { displayName }
                        </MenuItem>
                    )

                    // searchNameOptions_ElementArray.push(
                    //     <option
                    //         key={ searchData_For_ProjectSearchId.projectSearchId }
                    //         value={ searchData_For_ProjectSearchId.projectSearchId }
                    //     >
                    //         { displayName }
                    //     </option>
                    // )
                }
            }
        }

        let projectSearchIds_For_ChildComponent: Array<number> = undefined

        if ( this._selected_ProjectSearchId_As_Array[ 0 ] === _PROTEIN_BAR__SELECTED_PROJECT_SEARCH_ID__FOR__ALL_COMBINED ) {

            projectSearchIds_For_ChildComponent = this.props.projectSearchIds

        } else {
            projectSearchIds_For_ChildComponent = this._selected_ProjectSearchId_As_Array
        }

        let searchSelection_SelectedSearchName: string = undefined

        if ( searchNameOptions_ElementArray ) {

            if ( this._selected_ProjectSearchId_As_Array[ 0 ] !== _PROTEIN_BAR__SELECTED_PROJECT_SEARCH_ID__FOR__ALL_COMBINED ) {

                const projectSearchId = this._selected_ProjectSearchId_As_Array[ 0 ]
                const searchData_SearchName_Etc_Root = this.props.dataPageStateManager.get_searchData_SearchName_Etc_Root()

                const searchData_For_ProjectSearchId = searchData_SearchName_Etc_Root.get_SearchData_For_ProjectSearchId( projectSearchId )
                if ( ! searchData_For_ProjectSearchId ) {
                    throw Error( "searchData_SearchName_Etc_Root.get_SearchData_For_ProjectSearchId( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId )
                }

                searchSelection_SelectedSearchName = "(" + searchData_For_ProjectSearchId.searchId + ") " + searchData_For_ProjectSearchId.name
            }
        }

        return (
            <div style={ { marginBottom: 10 } }>

                {/*  Comment out Search Select
  */}
                { searchNameOptions_ElementArray ? (

                    //  Have > 1 search for this protein so show a <Select> to choose "Combined" or a specific search

                    <div style={ { marginTop: 5, marginBottom: 10 } }>

                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                            title={ searchSelection_SelectedSearchName }
                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                        >
                            <Select
                                sx={ { maxWidth: searchName_Select_MenuItem_MaxWidth } }
                                // sx={ { width: searchName_Select_MenuItem_MaxWidth } }
                                MenuProps={{ sx: { maxWidth: searchName_Select_MenuItem_MaxWidth } }}
                                value={ this._selected_ProjectSearchId_As_Array[ 0 ].toString() }
                                onChange={ this._selected_Search_OnChange_From_MUI_Select_Callback_BindThis }
                            >
                                { searchNameOptions_ElementArray }
                            </Select>
                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>

                        {/*<select*/}
                        {/*    value={ this._selected_ProjectSearchId_As_Array[ 0 ] }*/}
                        {/*    onChange={ this._selected_Search_OnChange_Callback_BindThis }*/}
                        {/*>*/}
                        {/*    { searchNameOptions_ElementArray }*/}
                        {/*</select>*/}
                    </div>
                ) : null }

                <Protein_Structure_WidgetDisplay__Main_Component

                    proteinSequence_Bar_Widget_StateObject={ this.props.proteinSequence_Bar_Widget_StateObject }

                    proteinSequenceWidget_StateObject={ this.props.proteinSequenceWidget_StateObject }

                    modificationMass_UserSelections_StateObject={ this.props.modificationMass_UserSelections_StateObject }

                    limelight_AnyFilter__HasFilterValue={ this.props.limelight_AnyFilter__HasFilterValue }

                    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass={ this.props.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass }

                    projectSearchIds={ projectSearchIds_For_ChildComponent }
                    proteinSequenceVersionId={ this.props.proteinSequenceVersionId }
                    proteinNames={ this.props.proteinNames }
                    proteinDescriptions={ this.props.proteinDescriptions }
                    proteinSequenceString={ this.props.proteinSequenceString }

                    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root={ this.props.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root }

                    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds={ this.props.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds }

                    commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder={ this.props.commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder }

                    dataPageStateManager={ this.props.dataPageStateManager }
                    dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay={ this.props.dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay }
                    searchDetailsBlockDataMgmtProcessing={ this.props.searchDetailsBlockDataMgmtProcessing }

                    searchNamesMap_KeyProjectSearchId={ this.props.searchNamesMap_KeyProjectSearchId }
                    searchDataLookupParamsRoot={ this.props.searchDataLookupParamsRoot }

                    updateMadeTo_proteinSequenceWidgetDisplay_UserSelections_StateObject_Callback={ this.props.updateMadeTo_proteinSequenceWidgetDisplay_UserSelections_StateObject_Callback }
                />

            </div>
        )

    } catch ( e ) { reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } ); throw e } }

}
