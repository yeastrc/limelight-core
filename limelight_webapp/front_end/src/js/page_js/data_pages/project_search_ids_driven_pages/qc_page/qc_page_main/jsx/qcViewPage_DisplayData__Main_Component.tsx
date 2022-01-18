/**
 * qcViewPage_DisplayData__Main_Component.tsx
 *
 * QC Page Main Content:
 *
 * Main Content of QC Page
 *
 */

import React from "react";

import {
    SearchDataLookupParameters_Root,
    SearchDataLookupParams_For_Single_ProjectSearchId
} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {ProteinViewPage_LoadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder";
import {ProteinView_LoadedDataCommonHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder";
import {
    SearchDetailsAndFilterBlock_MainPage_Root,
    SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue
} from "page_js/data_pages/search_details_block__project_search_id_based/jsx/searchDetailsAndFilterBlock_MainPage_Root";
import {
    SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData,
    SearchSubGroup_In_SingleProtein_FilterOn_Block_Root_Component
} from "page_js/data_pages/search_sub_group/search_sub_group_in_search_details_outer_block/jsx/searchSubGroup_In_SearchDetailsOuterBlock";
import {ModificationMass_UserSelections_ComponentData} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_ComponentData";
import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData";
import {ReporterIonMass_UserSelections_ComponentData} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/reporter_ions_user_selections/js/reporterIonMass_UserSelections_BuildData_ForReactComponent";
import {PeptideUnique_UserSelection_ComponentData} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_ComponentData";
import {PeptideSequence_UserSelections_ComponentData} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_sequence_selected/js/peptideSequence_UserSelections_ComponentData";
import {ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__peptide_page__components/protein_position_filter_component/js/proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data";
import {PeptideFiltersDisplay_ComponentData} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/peptide_filters_display/js/peptideFiltersDisplay_ComponentData";
import {
    getReportedPeptideIdsForDisplay_AllProjectSearchIds,
    Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds
} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds";
import {ModificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_reporter_ion__user_selections__coordinator/js/modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class";
import {ProteinPositionFilter_UserSelections} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__peptide_page__components/protein_position_filter_component/jsx/proteinPositionFilter_UserSelections_Component";
import {PeptideSequence_UserSelections} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_sequence_selected/jsx/peptideSequence_UserSelections";
import {PeptideUnique_UserSelection} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_unique_user_filter_selection/jsx/peptideUnique_UserSelection";
import {ReporterIonMass_UserSelections} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/reporter_ions_user_selections/jsx/reporterIonMass_UserSelections";
import {ModificationMass_UserSelections_Root} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/jsx/modificationMass_UserSelections_Root";
import {
    ModificationMass_ReporterIon__UserSelections__Coordinator_Class,
    ModificationMass_ReporterIon__UserSelections__Coordinator_Class__Contents_Changed_Callback
} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_reporter_ion__user_selections__coordinator/js/modificationMass_ReporterIon__UserSelections__Coordinator_Class";
import {Spinner_Limelight_Component} from "page_js/common_all_pages/spinner_ReactComponent_Limelight";
import {
    SaveView_Create_Component_React_Result,
    SaveView_Create_Component_React_Type
} from "page_js/data_pages/saveView_React/saveView_Create_Component_React_FunctionTemplate";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {peptidePage_Load_Base_Data_For_Cutoffs_PSM_Peptide_Protein} from "page_js/data_pages/project_search_ids_driven_pages/peptide_page/peptidePage_Load_Base_Data_For_Cutoffs_PSM_Peptide_Protein";
import {PeptidePage_Display_MainContent_Component_nonClass_Functions} from "page_js/data_pages/project_search_ids_driven_pages/peptide_page/peptidePage_Display_MainContent_Component_nonClass_Functions";
import {PeptidePage_Display_MainContent_Component_Props_Prop} from "page_js/data_pages/project_search_ids_driven_pages/peptide_page/peptidePage_Display_MainContent_Component";
import {load_PsmOpenModificationMasses_IfNeeded} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/load_PsmOpenModificationMasses_IfNeeded_To_loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds";
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
import {get_ModificationMass_UserSelections_DisplayMassSelectionOverlay_Layout_LoadingMessage} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/jsx/modificationMass_UserSelections_DisplayMassSelectionOverlay_Layout";
import {modificationMass_CommonRounding_ReturnNumber} from "page_js/data_pages/modification_mass_common/modification_mass_rounding";
import {modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData";
import {peptideUnique_UserSelection_BuildData_ForReactComponent} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_BuildData_ForReactComponent";
import {
    Get_SetDefaultView_Component_React_Type,
    SetDefaultView_Component_React_Params
} from "page_js/data_pages/setDefaultView_React/setDefaultView_Create_Component_React_FunctionTemplate";
import {searchSubGroup_Get_Selected_SearchSubGroupIds} from "page_js/data_pages/search_sub_group/js/searchSubGroup_Get_Selected_SearchSubGroupIds";
import {SearchDetailsAndOtherFiltersOuterBlock_Layout} from "page_js/data_pages/search_details_and_other_filters_outer_block__project_search_id_based/jsx/searchDetailsAndOtherFiltersOuterBlock_Layout";
import {SharePage_Component} from "page_js/data_pages/sharePage_React/sharePage_Component_React";
import {ModificationMass_UserSelections_DisplayMassSelectionOverlay} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_DisplayMassSelectionOverlay";
import {ProteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_Root_Component} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/jsx/proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_Root_Component";
import {ProteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject";
import {PeptideFiltersDisplay} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/peptide_filters_display/jsx/peptideFiltersDisplay";
import {
    proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides,
    ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides";
import {
    DataPageStateManager,
    SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry
} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {Qc_SingleSearch_AA__Root_DisplayBlock} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_sections/jsx/qc_SingleSearch_AA__Root_DisplayBlock";
import {
    qcPage_Get_Searches_Flags,
    QcPage_Searches_Flags
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/js/qcPage_Get_Searches_Flags";
import {
    qcPage_Get_Searches_Info,
    QcPage_Searches_Info
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/js/qcPage_Get_QC_Page__Searches_Info";
import {QcPage_UpdatingData_BlockCover} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_UpdatingData_BlockCover";
import {Qc_MultipleSearches_AA__Root_DisplayBlock} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_multiple_searches_sections/jsx/qc_MultipleSearches_AA__Root_DisplayBlock";
import {Qc_compute_Cache_create_GeneratedReportedPeptideListData} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_compute/generatedReportedPeptideList_Compute/qc_compute_Cache_create_GeneratedReportedPeptideListData";
import {Limelight_Colors_For_MultipleSearches} from "page_js/data_pages/color_manager/limelight_Colors_For_MultipleSearches";
import {Qc_SingleSearch__SubSearches_AA__Root_DisplayBlock} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__sections/jsx/qc_SingleSearch__SubSearches_AA__Root_DisplayBlock";
import {Limelight_Colors_For_SingleSearch__SubSearches} from "page_js/data_pages/color_manager/limelight_Colors_For_SingleSearch__SubSearches";
import {load_subGroupIdMap_Key_PsmId_ForSearch_ReportedPeptideIds_SearchDataLookupParams_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder/load_subGroupIdMap_Key_PsmId_ForSearch_ReportedPeptideIds_SearchDataLookupParams_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder";
import {QcPage_ShowSingleSearch_Not_SubSearches_UserSelections_StateObject} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_root/qcPage_ShowSingleSearch_Not_SubSearches_UserSelections_StateObject";



/**
 *  Common Data that is passed from this component to all children components for display in
 */
export class QcViewPage_CommonData_To_AllComponents_From_MainComponent {

    projectSearchIds : Array<number>

    searchSubGroup_Ids_Selected : Set<number>

    propsValue : PeptidePage_Display_MainContent_Component_Props_Prop
    propsValue_QC: QcViewPage_DisplayData__Main_Component_Props_Prop

    dataPageStateManager : DataPageStateManager
    searchDataLookupParamsRoot: SearchDataLookupParameters_Root
    qcPage_Searches_Flags: QcPage_Searches_Flags
    qcPage_Searches_Info: QcPage_Searches_Info
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds: Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>;
    loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder
    proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result : ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result
    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForCharts : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds
    qc_compute_Cache_create_GeneratedReportedPeptideListData: Qc_compute_Cache_create_GeneratedReportedPeptideListData
}


/**
 *
 */
export interface QcViewPage_DisplayData__Main_Component_Props_Prop {

    proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject : ProteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject
    qcPage_ShowSingleSearch_Not_SubSearches_UserSelections_StateObject : QcPage_ShowSingleSearch_Not_SubSearches_UserSelections_StateObject
}

/**
 *
 */
export interface QcViewPage_DisplayData__Main_Component_Props {

    propsValue : PeptidePage_Display_MainContent_Component_Props_Prop
    propsValue_QC: QcViewPage_DisplayData__Main_Component_Props_Prop
}

/**
 *
 */
interface QcViewPage_DisplayData__Main_Component_State {

    searchDataLookupParamsRoot? : SearchDataLookupParameters_Root;

    mainDisplayData_Loaded? : boolean;

    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds? : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>
    loadedDataCommonHolder? : ProteinView_LoadedDataCommonHolder

    searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue? : SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue

    searchSubGroup_Are_All_SearchSubGroupIds_Selected? : boolean
    searchSubGroup_PropValue? : SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData;

    modificationMassSelections_AlwaysShow__ClearOn_ObjectReferenceChange?: object  //  Clear modificationMassSelections_AlwaysShow in Modifications Filter On Component when this object reference changes
    modificationMass_UserSelections_ComponentData? : ModificationMass_UserSelections_ComponentData; // Only updated when new updated need to push new values from above components
    modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData? : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData; // Only updated when new updated need to push new values from above components
    reporterIons_UserSelections_ComponentData? : ReporterIonMass_UserSelections_ComponentData;
    peptideUnique_UserSelection_ComponentData? : PeptideUnique_UserSelection_ComponentData;
    peptideSequence_UserSelections_ComponentData? : PeptideSequence_UserSelections_ComponentData;
    proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data? : ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data;
    proteinPositionFilter_UserSelections_Component_Force_ReRender_Object? : object;

    peptideFiltersDisplay_ComponentData? : PeptideFiltersDisplay_ComponentData;

    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForCharts? : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds;  //  For displaying the Main Content

    updating_Next_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForCharts? : boolean;

    proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result? : ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result

    //  User made a selection that resulted in a AJAX request for data.  Page update for filtered Peptides will wait for the AJAX to complete.  Display message loading data.
    gettingDataFor_Filtering_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds? : boolean;

    //  User made a selection that resulted in a AJAX request for data.  Page update for filtered Peptides will wait for the AJAX to complete.  Display message loading data.
    gettingDataFor_Filtering_reportedPeptideIdsForDisplay? : boolean;

    //
    modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class? : ModificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class

    saveView_Component_React?: any //  React Component for Save View
    saveView_Component_Props_Prop?: any //  Object passed to saveView_Component_React as property propsValue

    qcViewPage_CommonData_To_AllComponents_From_MainComponent?: QcViewPage_CommonData_To_AllComponents_From_MainComponent //  Updated and passed to child components
}

/**
 *
 */
export class QcViewPage_DisplayData__Main_Component extends React.Component< QcViewPage_DisplayData__Main_Component_Props, QcViewPage_DisplayData__Main_Component_State > {

    //  bind to 'this' for passing as parameters

    private _modificationMass_ReporterIon__UserSelections__Coordinator_Class__Contents_Changed_Callback_BindThis = this._modificationMass_ReporterIon__UserSelections__Coordinator_Class__Contents_Changed_Callback.bind(this);

    private _NOT_CALLED_Function() {

        //  Test function cast

        const modificationMass_ReporterIon__UserSelections__Coordinator_Class__Contents_Changed_Callback : ModificationMass_ReporterIon__UserSelections__Coordinator_Class__Contents_Changed_Callback =
            this._modificationMass_ReporterIon__UserSelections__Coordinator_Class__Contents_Changed_Callback;
    }

    private _qcPage_ShowSingleSearch_Not_SubSearches_UserSelections_Changed_BindThis = this._qcPage_ShowSingleSearch_Not_SubSearches_UserSelections_Changed.bind(this);
    private _searchSubGroup_SelectionsChanged_Callback_BindThis = this._searchSubGroup_SelectionsChanged_Callback.bind(this);
    private _clearAllSelections_BindThis = this._clearAllSelections.bind(this);

    private _openModificationMass_OpenUserSelections_Overlay_Override_BindThis : () => void = this._openModificationMass_OpenUserSelections_Overlay_Override.bind(this)
    private _openModificationMass_OpenUserSelections_Overlay_SelectionChangedCallback_BindThis : () => void = this._openModificationMass_OpenUserSelections_Overlay_SelectionChangedCallback.bind(this)

    private _modificationMass_UserSelections_UpdateMadeTo_StateObject_Callback_BindThis : () => void = this._modificationMass_UserSelections_UpdateMadeTo_StateObject_Callback.bind(this);
    private _modificationMass_Update_modificationMass_UserSelections_ComponentData_Callback_BindThis : () => void = this._modificationMass_Update_modificationMass_UserSelections_ComponentData_Callback.bind(this);
    private _updateMadeTo_modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_Callback_BindThis : () => void = this._updateMadeTo_modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_Callback.bind(this);

    private _updateMadeTo_reporterIonMass_UserSelections_StateObject_Callback_BindThis : () => void = this._updateMadeTo_reporterIonMass_UserSelections_StateObject_Callback.bind(this);
    private _updateMadeTo_peptideUnique_UserSelection_StateObject_Callback_BindThis : () => void = this._updateMadeTo_peptideUnique_UserSelection_StateObject_Callback.bind(this);

    private _updateMadeTo_peptideSequence_UserSelections_StateObject_Callback_BindThis : () => void = this._updateMadeTo_peptideSequence_UserSelections_StateObject.bind(this);
    private _updateMadeTo_proteinPositionFilter_UserSelections_StateObject_Callback_BindThis = this._updateMadeTo_proteinPositionFilter_UserSelections_StateObject_Callback.bind(this);


    private _updateMadeTo_generatedPeptideContents_UserSelections_StateObject_Callback_BindThis : () => void = this._updateMadeTo_generatedPeptideContents_UserSelections_StateObject_Callback.bind(this);

    private _load_PsmOpenModificationMasses_InProgress = false;  //  Flag that Loading PSM Open Modification Masses is In Progress
    private _load_ReporterIonMasses_InProgress = false;  //  Flag that Loading Reporter Ion Masses is In Progress
    private _load_ProteinCoverage_InProgress = false;  //  Flag that Loading Protein Coverage is In Progress

    private _div_MainGridAtTop_Ref : React.RefObject<HTMLDivElement>; //  React.createRef()  for Main <div> containing grid of left and on right the boxes Summary ...
    private _div_MainContent_LeftGridEntry_AtTop_Ref : React.RefObject<HTMLDivElement>; //  React.createRef()  for Left <div> inside this._div_MainGridAtTop_Ref

    private _modificationMass_ReporterIon__UserSelections__Coordinator_Class : ModificationMass_ReporterIon__UserSelections__Coordinator_Class

    private _qcPage_Searches_Flags: QcPage_Searches_Flags; // Retrieved form server
    private _qcPage_Searches_Info: QcPage_Searches_Info; // Retrieved form server

    /**
     *
     */
    constructor(props : QcViewPage_DisplayData__Main_Component_Props) {
        super(props);

        this._div_MainGridAtTop_Ref = React.createRef<HTMLDivElement>();
        this._div_MainContent_LeftGridEntry_AtTop_Ref = React.createRef<HTMLDivElement>();

        this._modificationMass_ReporterIon__UserSelections__Coordinator_Class =
            new ModificationMass_ReporterIon__UserSelections__Coordinator_Class({
                contents_Changed_Callback: this._modificationMass_ReporterIon__UserSelections__Coordinator_Class__Contents_Changed_Callback_BindThis,
                modificationMass_UserSelections_StateObject: props.propsValue.modificationMass_UserSelections_StateObject,
                reporterIonMass_UserSelections_StateObject: props.propsValue.reporterIonMass_UserSelections_StateObject
            })

        const modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class =
            this._modificationMass_ReporterIon__UserSelections__Coordinator_Class.get_Current_ModificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class();

        const searchDataLookupParamsRoot: SearchDataLookupParameters_Root =
            props.propsValue.searchDetailsBlockDataMgmtProcessing.getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_AllProjectSearchIds();


        const searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue : SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue =
            PeptidePage_Display_MainContent_Component_nonClass_Functions.compute_searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue({
                propsValue : props.propsValue
            });

        //  Only for Multiple Search

        if ( props.propsValue.projectSearchIds.length > 1 ) {
            searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue.limelight_Colors_For_MultipleSearches = Limelight_Colors_For_MultipleSearches.getInstance({projectSearchIds: props.propsValue.projectSearchIds});
        }

        let saveView_Component_React = undefined;
        let saveView_Component_Props_Prop = undefined;

        if ( props.propsValue.dataPages_LoggedInUser_CommonObjectsFactory ) {

            if ( props.propsValue.dataPages_LoggedInUser_CommonObjectsFactory.getFunctionToGet_SaveView_dataPages_ComponentAndProps ) {
                const saveView_Create_Component_React_Type : SaveView_Create_Component_React_Type = (
                    props.propsValue.dataPages_LoggedInUser_CommonObjectsFactory.getFunctionToGet_SaveView_dataPages_ComponentAndProps()
                );

                const result : SaveView_Create_Component_React_Result = saveView_Create_Component_React_Type({ projectSearchIds : props.propsValue.projectSearchIds, experimentId : undefined });
                saveView_Component_React = result.saveView_Component_React
                saveView_Component_Props_Prop = result.saveView_Component_Props_Prop
            }
        }

        this.state = {
            searchDataLookupParamsRoot,
            searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue,
            saveView_Component_React,
            saveView_Component_Props_Prop,
            modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class,
            proteinPositionFilter_UserSelections_Component_Force_ReRender_Object: {}
        };
    }

    /**
     *
     */
    componentDidMount() {
        try {
            window.setTimeout( () => {
                try {
                    this._runOnPageLoad();

                } catch( e ) {
                    console.warn("Exception caught in componentDidMount inside setTimeout");
                    console.warn( e );
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }, 10 );

        } catch( e ) {
            console.warn("Exception caught in componentDidMount");
            console.warn( e );
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    // componentWillUnmount() {
    //     try {
    //
    //     } catch( e ) {
    // 		console.log("Exception caught in componentWillUnmount()");
    // 		console.log( e );
    // 		reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
    // 		throw e;
    // 	}
    // }

    /**
     *  Run on Page Load.  call from componentDidMount
     */
    private _runOnPageLoad() {

        this._recompute_FullPage_Except_SearchDetails({ initialPageLoad: true });
    }

    /**
     *
     */
    private _recompute_FullPage_Except_SearchDetails({ initialPageLoad } : { initialPageLoad : boolean }) {

        //  New variable to populate and put in state
        const loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder> = new Map();
        const loadedDataCommonHolder = new ProteinView_LoadedDataCommonHolder();

        const promise_qcPage_Get_Searches_Flags = qcPage_Get_Searches_Flags({ projectSearchIds : this.props.propsValue.projectSearchIds });

        const promise_qcPage_Get_Searches_Info = qcPage_Get_Searches_Info({ projectSearchIds : this.props.propsValue.projectSearchIds });

        const promise_peptidePage_Load_Base_Data_For_Cutoffs_PSM_Peptide_Protein = peptidePage_Load_Base_Data_For_Cutoffs_PSM_Peptide_Protein({
            projectSearchIds : this.props.propsValue.projectSearchIds,
            dataPageStateManager_DataFrom_Server : this.props.propsValue.dataPageStateManager,
            searchDetailsBlockDataMgmtProcessing : this.props.propsValue.searchDetailsBlockDataMgmtProcessing,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,  //  Updated in this function
            loadedDataCommonHolder  //  Updated in this function
        })

        const promises_All_TopLevel = Promise.all( [ promise_qcPage_Get_Searches_Flags, promise_qcPage_Get_Searches_Info, promise_peptidePage_Load_Base_Data_For_Cutoffs_PSM_Peptide_Protein ]);

        promises_All_TopLevel.catch( (reason) => {
            console.warn("promise_peptidePage_Load_Base_Data_For_Cutoffs_PSM_Peptide_Protein.catch  reason: " + reason )
            throw Error("promise_peptidePage_Load_Base_Data_For_Cutoffs_PSM_Peptide_Protein.catch  reason: " + reason )
        })

        promises_All_TopLevel.then( (promiseResults ) => {
            try {
                this._qcPage_Searches_Flags = promiseResults[0];

                this._qcPage_Searches_Info = promiseResults[1];

                const promises_Load_ = [];

                {
                    if ( this.props.propsValue.projectSearchIds.length === 1 && this.props.propsValue.dataPageStateManager.get_SearchSubGroups_Root() ) {

                        const projectSearchId = this.props.propsValue.projectSearchIds[0];

                        const searchDataLookupParamsRoot: SearchDataLookupParameters_Root =
                            this.props.propsValue.searchDetailsBlockDataMgmtProcessing.getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_AllProjectSearchIds();

                        let searchDataLookupParams_For_Single_ProjectSearchId: SearchDataLookupParams_For_Single_ProjectSearchId = undefined;

                        for ( const searchDataLookupParams_For_Single_ProjectSearchId_In_List of searchDataLookupParamsRoot.paramsForProjectSearchIds.paramsForProjectSearchIdsList ) {

                            if ( searchDataLookupParams_For_Single_ProjectSearchId_In_List.projectSearchId === projectSearchId ) {
                                searchDataLookupParams_For_Single_ProjectSearchId = searchDataLookupParams_For_Single_ProjectSearchId_In_List;
                                break;
                            }
                        }
                        if ( ! searchDataLookupParams_For_Single_ProjectSearchId ) {
                            const msg = "No entry in searchDataLookupParamsRoot.paramsForProjectSearchIds.paramsForProjectSearchIdsList for projectSearchId: " + projectSearchId;
                            console.warn(msg);
                            throw Error(msg);
                        }

                        const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get(projectSearchId);
                        if ( ! loadedDataPerProjectSearchIdHolder ) {
                            const msg = "No entry in loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds for projectSearchId: " + projectSearchId;
                            console.warn(msg);
                            throw Error(msg);
                        }

                        //  Single Search and Has Search Sub Groups
                        const promise = load_subGroupIdMap_Key_PsmId_ForSearch_ReportedPeptideIds_SearchDataLookupParams_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder({
                            projectSearchId, loadedDataPerProjectSearchIdHolder, searchDataLookupParams_For_Single_ProjectSearchId
                        });
                        if ( promise ) {
                            promises_Load_.push( promise );
                        }
                    }

                }

                const modificationMass_UserSelections_StateObject = this.props.propsValue.modificationMass_UserSelections_StateObject;
                const generatedPeptideContents_UserSelections_StateObject = this.props.propsValue.generatedPeptideContents_UserSelections_StateObject;

                if ( ( modificationMass_UserSelections_StateObject.get_OpenModificationSelections()
                    && modificationMass_UserSelections_StateObject.get_OpenModificationSelections().is_Any_Modification_Selected() )
                    || generatedPeptideContents_UserSelections_StateObject.getOpenModifications_Selected()
                    || generatedPeptideContents_UserSelections_StateObject.getOpenModifications_WithLocalization_Selected() ) {

                    const promise = PeptidePage_Display_MainContent_Component_nonClass_Functions.load_OpenModificationMasses_IfNeeded({
                        searchSubGroups_Root: this.props.propsValue.dataPageStateManager.get_SearchSubGroups_Root(), // May be null or undefined
                        projectSearchIds : this.props.propsValue.projectSearchIds,
                        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                        searchDataLookupParamsRoot : this.state.searchDataLookupParamsRoot
                    });
                    if ( promise ) {
                        promises_Load_.push( promise );
                    }
                }
                if ( this.props.propsValue.reporterIonMass_UserSelections_StateObject.is_Any_ReporterIons_Selected() ) {

                    const promise = PeptidePage_Display_MainContent_Component_nonClass_Functions.load_ReporterIonMasses_IfNeeded({
                        searchSubGroups_Root: this.props.propsValue.dataPageStateManager.get_SearchSubGroups_Root(), // May be null or undefined
                        projectSearchIds : this.props.propsValue.projectSearchIds,
                        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                        searchDataLookupParamsRoot : this.state.searchDataLookupParamsRoot
                    });
                    if ( promise ) {
                        promises_Load_.push( promise );
                    }
                }

                if ( this.props.propsValue.proteinPositionFilter_UserSelections_StateObject.isAnySelections() ) {

                    const promise = PeptidePage_Display_MainContent_Component_nonClass_Functions.load_ProteinCoverage_IfNeeded({
                        projectSearchIds : this.props.propsValue.projectSearchIds,
                        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
                    });
                    if ( promise ) {
                        promises_Load_.push( promise );
                    }
                }

                if ( promises_Load_.length === 0 ) {
                    this._recompute_FullPage_Except_SearchDetails__SubPart_RunBeforeMain({
                        initialPageLoad,
                        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                        loadedDataCommonHolder
                    });
                } else {
                    const promiseAll = Promise.all( promises_Load_ );
                    promiseAll.catch( (reason) => {
                        throw Error( "load_OpenModificationMasses_IfNeeded or load_ReporterIonMasses_IfNeeded failed in _recompute_FullPage_Except_SearchDetails ") ;
                    })
                    promiseAll.then( (result) => {
                        try {
                            this._recompute_FullPage_Except_SearchDetails__SubPart_RunBeforeMain({
                                initialPageLoad,
                                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                                loadedDataCommonHolder
                            });
                        } catch( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                            throw e;
                        }
                    })
                }

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });
    }

    //////

    /**
     *
     */
    private _recompute_FullPage_Except_SearchDetails__SubPart_RunBeforeMain(
        {
            initialPageLoad,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            loadedDataCommonHolder
        } : {
            initialPageLoad : boolean
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>
            loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder
        }
    ) : void {

        this._recompute_FullPage_Except_SearchDetails__SubPart_Main({
            initialPageLoad,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            loadedDataCommonHolder
        });
    }

    /**
     *
     * @param initialPageLoad
     * @param proteinPositionFilter_UserSelections_StateObject
     * @param loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
     * @param loadedDataCommonHolder
     * @private
     */
    private _recompute_FullPage_Except_SearchDetails__SubPart_Main(
        {
            initialPageLoad,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            loadedDataCommonHolder
        } : {
            initialPageLoad : boolean
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>
            loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder
        }
    ) : void {

        if ( initialPageLoad ) {  // Always true currently but will keep

            //  remove from selection state objects values that are not in the loaded data. (Values that have been for: searches removed, or for values that don't meet new filter cutoffs)

            PeptidePage_Display_MainContent_Component_nonClass_Functions.purge_Selections_OfValues_NotInCurrentLoadedData({
                projectSearchIds : this.props.propsValue.projectSearchIds,
                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
                reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
                proteinPositionFilter_UserSelections_StateObject: this.props.propsValue.proteinPositionFilter_UserSelections_StateObject
            });
        }

        const {
            searchSubGroup_Ids_Selected,
            searchSubGroup_Are_All_SearchSubGroupIds_Selected,
            searchSubGroup_PropValue,
            modificationMass_UserSelections_ComponentData,
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData,
            reporterIons_UserSelections_ComponentData,
            peptideUnique_UserSelection_ComponentData,
            peptideSequence_UserSelections_ComponentData,
            proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data,
            reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds

        } :  {
            searchSubGroup_Ids_Selected : Set<number>
            searchSubGroup_Are_All_SearchSubGroupIds_Selected : boolean
            searchSubGroup_PropValue : SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData
            modificationMass_UserSelections_ComponentData : ModificationMass_UserSelections_ComponentData,
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData
            reporterIons_UserSelections_ComponentData : ReporterIonMass_UserSelections_ComponentData,
            peptideUnique_UserSelection_ComponentData : PeptideUnique_UserSelection_ComponentData;
            peptideSequence_UserSelections_ComponentData : PeptideSequence_UserSelections_ComponentData,
            proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data : ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data
            reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds

        }  = PeptidePage_Display_MainContent_Component_nonClass_Functions.compute_FullPage_Except_SearchDetails({

            propsValue : this.props.propsValue,
            projectSearchIds : this.props.propsValue.projectSearchIds,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            loadedDataCommonHolder,
            modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
            reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
            peptideUnique_UserSelection_StateObject : this.props.propsValue.peptideUnique_UserSelection_StateObject,
            peptideSequence_UserSelections_StateObject : this.props.propsValue.peptideSequence_UserSelections_StateObject,
            proteinPositionFilter_UserSelections_StateObject : this.props.propsValue.proteinPositionFilter_UserSelections_StateObject
        });

        const proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result : ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result =
            proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides({
                proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject: this.props.propsValue_QC.proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject,
                modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
                reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds: reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
                projectSearchIds : this.props.propsValue.projectSearchIds,
                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds: loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
            });

        const qc_compute_Cache_create_GeneratedReportedPeptideListData = new Qc_compute_Cache_create_GeneratedReportedPeptideListData({
            reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
            proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject: this.props.propsValue_QC.proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject,
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
            projectSearchIds: this.props.propsValue.projectSearchIds,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            loadedDataCommonHolder
        });

        const qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent = {
            projectSearchIds: this.props.propsValue.projectSearchIds,
            searchSubGroup_Ids_Selected,
            propsValue : this.props.propsValue,
            propsValue_QC : this.props.propsValue_QC,
            searchDataLookupParamsRoot : this.state.searchDataLookupParamsRoot,
            qcPage_Searches_Flags: this._qcPage_Searches_Flags,
            qcPage_Searches_Info: this._qcPage_Searches_Info,
            proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result: proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result,
            reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForCharts: reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds: loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            loadedDataCommonHolder: loadedDataCommonHolder,
            dataPageStateManager: this.props.propsValue.dataPageStateManager,
            qc_compute_Cache_create_GeneratedReportedPeptideListData
        };

        const peptideFiltersDisplay_ComponentData : PeptideFiltersDisplay_ComponentData = {
            modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
            reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
            peptideUnique_UserSelection_StateObject : this.props.propsValue.peptideUnique_UserSelection_StateObject,
            peptideSequence_UserSelections_StateObject : this.props.propsValue.peptideSequence_UserSelections_StateObject,
            proteinPositionFilter_UserSelections_StateObject : this.props.propsValue.proteinPositionFilter_UserSelections_StateObject,
            proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data : proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data,
            peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject : undefined,  //  TNot Used Yet
            proteinSequenceWidget_StateObject : undefined,  //  NOT USED on Peptide Page
            searchSubGroup_Are_All_SearchSubGroupIds_Selected,
            searchSubGroup_PropValue
        };

        this.setState({
            mainDisplayData_Loaded : true,

            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            loadedDataCommonHolder,

            searchSubGroup_Are_All_SearchSubGroupIds_Selected,
            searchSubGroup_PropValue,

            modificationMass_UserSelections_ComponentData,
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData,
            reporterIons_UserSelections_ComponentData,
            peptideUnique_UserSelection_ComponentData,
            peptideSequence_UserSelections_ComponentData,
            proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data,
            peptideFiltersDisplay_ComponentData,

            reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForCharts : reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
            proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result,
            qcViewPage_CommonData_To_AllComponents_From_MainComponent
        });
    }

    /**
     *
     */
    private _modificationMass_ReporterIon__UserSelections__Coordinator_Class__Contents_Changed_Callback() {

        const modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class =
            this._modificationMass_ReporterIon__UserSelections__Coordinator_Class.get_Current_ModificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class();

        this.setState({ modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class });

        this._modificationMass_Update_modificationMass_UserSelections_ComponentData();

        this._reporterIonMass_Update_reporterIonMass_UserSelections_ComponentData();
    }

    /**
     * User has changed the ShowSingleSearch_Not_SubSearches Selections.
     *
     * The Page State object has already been updated
     */
    private _qcPage_ShowSingleSearch_Not_SubSearches_UserSelections_Changed() : void {
        try {

            if ( this.props.propsValue_QC.qcPage_ShowSingleSearch_Not_SubSearches_UserSelections_StateObject.get_showSingleSearch_Not_SubSearches() ) {
                this.props.propsValue_QC.qcPage_ShowSingleSearch_Not_SubSearches_UserSelections_StateObject.set_showSingleSearch_Not_SubSearches( false );
            } else {
                this.props.propsValue_QC.qcPage_ShowSingleSearch_Not_SubSearches_UserSelections_StateObject.set_showSingleSearch_Not_SubSearches( true );
            }

            // this.setState({ fakeStateValue: {} } ) //  Set state to force re-render component

            window.setTimeout( () => {
                try {
                    //  Now update dependent page parts
                    this._updateRestOfPage_ForUserInteraction();

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }, 0 );

        } catch( e ) {
            console.warn("Exception caught in _searchSubGroup_SelectionsChanged_Callback()");
            console.warn( e );
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     * User has changed the Search Sub Group Selections.
     *
     * The Page State object has already been updated
     */
    private _searchSubGroup_SelectionsChanged_Callback() : void {
        try {
            this._searchSubGroup_CentralStateManagerObjectClass_Changed_UpdateState();

            window.setTimeout( () => {
                try {
                    //  Now update dependent page parts
                    this._updateRestOfPage_ForUserInteraction();

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }, 0 );

        } catch( e ) {
            console.warn("Exception caught in _searchSubGroup_SelectionsChanged_Callback()");
            console.warn( e );
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _searchSubGroup_CentralStateManagerObjectClass_Changed_UpdateState() {

        const searchSubGroup_PropValue: SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData =
            PeptidePage_Display_MainContent_Component_nonClass_Functions.compute_searchSubGroup_PropValue({ propsValue : this.props.propsValue });

        const searchSubGroup_Are_All_SearchSubGroupIds_Selected : boolean =
            PeptidePage_Display_MainContent_Component_nonClass_Functions.compute_searchSubGroup_Are_All_SearchSubGroupIds_Selected({ propsValue : this.props.propsValue });

        this.setState( (state: QcViewPage_DisplayData__Main_Component_State, props: QcViewPage_DisplayData__Main_Component_Props ) : QcViewPage_DisplayData__Main_Component_State => {

            return { searchSubGroup_PropValue, searchSubGroup_Are_All_SearchSubGroupIds_Selected };
        });
    }

    //////////////////

    /**
     * Clear All Selections
     *
     */
    _clearAllSelections() {
        try {
            this.props.propsValue.searchSubGroup_CentralStateManagerObjectClass.clearAll();

            this.props.propsValue.modificationMass_UserSelections_StateObject.clear_selectedModifications();

            //  NOT Reset this for "Clear All"
            // this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.clearTreatOpenModMassZeroAsUnmodified_Selection();

            this.props.propsValue.reporterIonMass_UserSelections_StateObject.clear_selectedReporterIons();

            this.props.propsValue.peptideUnique_UserSelection_StateObject.clearPeptideUnique();

            this.props.propsValue.peptideSequence_UserSelections_StateObject.clearPeptideSearchStrings();

            this.props.propsValue.proteinPositionFilter_UserSelections_StateObject.clearSelections();

            //  Update URL and Page

            window.setTimeout( () => {
                try {
                    this._searchSubGroup_CentralStateManagerObjectClass_Changed_UpdateState();

                    this._selectedModificationsChange_UpdateURL();  //  Update URL
                    this._reporterIonMassesChange_UpdateURL();  //  Update URL
                    this._selectedPeptideUniqueChange_UpdateURL();  //  Update URL
                    this._selectedPeptideSequenceChange_UpdateURL();  //  Update URL
                    this._selectedProteinPositionFilterChange_UpdateURL(); //  Update URL

                    window.setTimeout( () => {
                        try {
                            //  Clear modificationMassSelections_AlwaysShow in Modifications Filter On Component when this object reference changes
                            this.setState({ modificationMassSelections_AlwaysShow__ClearOn_ObjectReferenceChange: {} });

                            this._modificationMass_Update_modificationMass_UserSelections_ComponentData();

                            //  NOT Reset this for "Clear All"
                            // this._modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Update_ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData_ComponentData();

                            this._reporterIonMass_Update_reporterIonMass_UserSelections_ComponentData();

                            this._peptideUnique_Update_PeptideUnique_UserSelection_ComponentData();

                            this._peptideSequence_Update_peptideSequence_UserSelections_ComponentData();

                            this._proteinPositionFilter_Update_proteinPositionFilter_UserSelections_Component_Force_ReRender_Object();

                            window.setTimeout( () => {
                                try {
                                    //  Now update dependent page parts

                                    this._updateRestOfPage_ForUserInteraction();

                                } catch( e ) {
                                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                    throw e;
                                }
                            }, 0 );

                        } catch( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                            throw e;
                        }
                    }, 0 );

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }, 0 );

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }


    //////////////////

    /**
     * Open Modification Only
     *
     * Add or Change Mass Selection was clicked for Open Modification and this method is called
     *
     * First load open mod masses if not loaded
     *
     * Second open the overlay for Add/Change Mass Selection
     *
     */
    _openModificationMass_OpenUserSelections_Overlay_Override() : void {
        try {

            if ( this.props.propsValue.modificationMass_UserSelections_StateObject.get_OpenModificationSelections().is_Any_Modification_Selected()
                && this._load_PsmOpenModificationMasses_InProgress ) {

                //  Already loading PSM Open Modification Masses so exit.
                //   *  When the existing Promise for loading PSM Open Modification Masses, the page will be updated for the current selection change as well.

                return; // EARLY RETURN
            }

            let getSearchSubGroupIds = false;
            if ( this.props.propsValue.dataPageStateManager.get_SearchSubGroups_Root() ) {
                getSearchSubGroupIds = true;
            }

            let promise = load_PsmOpenModificationMasses_IfNeeded({
                getSearchSubGroupIds,
                proteinSequenceVersionId : undefined,
                projectSearchIds : this.props.propsValue.projectSearchIds,
                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                searchDataLookupParamsRoot : this.state.searchDataLookupParamsRoot
            });

            if ( promise ) {
                this._load_PsmOpenModificationMasses_InProgress = true;

                this.setState( (state: QcViewPage_DisplayData__Main_Component_State, props: QcViewPage_DisplayData__Main_Component_Props ) : QcViewPage_DisplayData__Main_Component_State => {

                    return { gettingDataFor_Filtering_reportedPeptideIdsForDisplay : true };
                });

                //  Show Loading Message

                let modificationMass_UserSelections_DisplayMassSelectionOverlay_Layout_LoadingMessage_Overlay : Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF = undefined;
                {
                    const overlayComponent = get_ModificationMass_UserSelections_DisplayMassSelectionOverlay_Layout_LoadingMessage({});

                    modificationMass_UserSelections_DisplayMassSelectionOverlay_Layout_LoadingMessage_Overlay =
                        limelight_add_ReactComponent_JSX_Element_To_DocumentBody({ componentToAdd : overlayComponent })
                }

                promise.catch( (reason) => {
                    try {
                        this._load_PsmOpenModificationMasses_InProgress = false;

                        //  Remove Loading Message
                        modificationMass_UserSelections_DisplayMassSelectionOverlay_Layout_LoadingMessage_Overlay.removeContents_AndContainer_FromDOM();

                        this.setState( (state: QcViewPage_DisplayData__Main_Component_State, props: QcViewPage_DisplayData__Main_Component_Props ) : QcViewPage_DisplayData__Main_Component_State => {

                            return { gettingDataFor_Filtering_reportedPeptideIdsForDisplay : false };
                        });
                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                });

                promise.then( (result) => {
                    try {
                        this._load_PsmOpenModificationMasses_InProgress = false;

                        //  Remove Loading Message
                        modificationMass_UserSelections_DisplayMassSelectionOverlay_Layout_LoadingMessage_Overlay.removeContents_AndContainer_FromDOM();

                        this.setState( (state: QcViewPage_DisplayData__Main_Component_State, props: QcViewPage_DisplayData__Main_Component_Props ) : QcViewPage_DisplayData__Main_Component_State => {

                            return { gettingDataFor_Filtering_reportedPeptideIdsForDisplay : false };
                        });

                        //  Now open the overlay

                        this._openModificationMass_OpenUserSelections_Overlay_ActualOpenOverlay()

                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                });

                return;  // EARLY RETURN
            }

            //  No Promise so run immediately

            window.setTimeout( () => {
                //  Now open the overlay

                this._openModificationMass_OpenUserSelections_Overlay_ActualOpenOverlay()

            }, 0 );
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     * Open Modification Only
     *
     * Second open the overlay for Add/Change Mass Selection
     *
     * called from immediately above method: _openModificationMass_OpenUserSelections_Overlay_Override()
     */
    _openModificationMass_OpenUserSelections_Overlay_ActualOpenOverlay() : void {

        let modificationMass_CommonRounding_ReturnNumber_Local = modificationMass_CommonRounding_ReturnNumber;

        if ( this.props.propsValue.projectSearchIds.length === 1 ) {
            modificationMass_CommonRounding_ReturnNumber_Local = undefined;  // NO rounding for Single Search
        }

        const modificationMass_UserSelections_DisplayMassSelectionOverlay = new ModificationMass_UserSelections_DisplayMassSelectionOverlay({

            variable_Modifications_DISPLAY: false,
            open_Modifications_DISPLAY: true,
            modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject.get_OpenModificationSelections(),
            proteinNames: null,
            proteinDescriptions: null,
            proteinSequenceVersionId : null,
            projectSearchIds : this.props.propsValue.projectSearchIds,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            modificationMass_CommonRounding_ReturnNumber : modificationMass_CommonRounding_ReturnNumber_Local, // Always passed for Experiment - Made a parameter to make easier to copy this code for Protein Page Single Search
            modificationSelectionChanged_Callback: this._openModificationMass_OpenUserSelections_Overlay_SelectionChangedCallback_BindThis
        });

        modificationMass_UserSelections_DisplayMassSelectionOverlay.showModificationMassSelectionDialog();
    }

    /**
     * Open Modification Only
     *
     * Second open the overlay for Add/Change Mass Selection
     *
     * called from immediately above method: _openModificationMass_OpenUserSelections_Overlay_Override()
     */
    _openModificationMass_OpenUserSelections_Overlay_SelectionChangedCallback() : void {

        this._modificationMass_UserSelections_UpdateMadeTo_StateObject_Callback();

        window.setTimeout( () => {
            try {
                //  Clear modificationMassSelections_AlwaysShow in Modifications Filter On Component when this object reference changes
                this.setState({ modificationMassSelections_AlwaysShow__ClearOn_ObjectReferenceChange: {} });

                this._modificationMass_Update_modificationMass_UserSelections_ComponentData_Callback();

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        }, 1 );
    }

    //////////////////

    /**
     * Change was made to modification selection.  this.props.propsValue.modificationMass_UserSelections_StateObject has been updated
     *
     * Not called if this._modificationMass_Update_modificationMass_UserSelections_ComponentData_Callback() is called
     */
    _modificationMass_UserSelections_UpdateMadeTo_StateObject_Callback() : void {
        try {
            window.setTimeout( () => {
                try {
                    this._selectedModificationsChange_UpdateURL();  //  Update URL

                    if ( ! this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds ) {
                        //  State NOT SET yet so skip this update
                        return; // EARLY RETURN
                    }

                    window.setTimeout( () => {
                        try {

                            if ( this.props.propsValue.modificationMass_UserSelections_StateObject.get_OpenModificationSelections().is_Any_Modification_Selected()
                                && this._load_PsmOpenModificationMasses_InProgress ) {

                                //  Already loading PSM Open Modification Masses so exit.
                                //   *  When the existing Promise for loading PSM Open Modification Masses, the page will be updated for the current selection change as well.

                                return; // EARLY RETURN
                            }

                            let promise = undefined;

                            if ( this.props.propsValue.modificationMass_UserSelections_StateObject.get_OpenModificationSelections().is_Any_Modification_Selected() ) {

                                promise = PeptidePage_Display_MainContent_Component_nonClass_Functions.load_OpenModificationMasses_IfNeeded({
                                    searchSubGroups_Root: this.props.propsValue.dataPageStateManager.get_SearchSubGroups_Root(), // May be null or undefined
                                    projectSearchIds : this.props.propsValue.projectSearchIds,
                                    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                                    searchDataLookupParamsRoot : this.state.searchDataLookupParamsRoot
                                });
                            }

                            if ( promise ) {
                                this._load_PsmOpenModificationMasses_InProgress = true;

                                this.setState( (state: QcViewPage_DisplayData__Main_Component_State, props: QcViewPage_DisplayData__Main_Component_Props ) : QcViewPage_DisplayData__Main_Component_State => {

                                    return { gettingDataFor_Filtering_reportedPeptideIdsForDisplay : true };
                                });

                                //  Show loading message for peptide list since may take time to load new values from DB
                                // reportedPeptideList_ShowLoadingMessage();

                                promise.catch( (reason) => {
                                    try {
                                        this._load_PsmOpenModificationMasses_InProgress = false;

                                        this.setState( (state: QcViewPage_DisplayData__Main_Component_State, props: QcViewPage_DisplayData__Main_Component_Props ) : QcViewPage_DisplayData__Main_Component_State => {

                                            return { gettingDataFor_Filtering_reportedPeptideIdsForDisplay : false };
                                        });
                                    } catch( e ) {
                                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                        throw e;
                                    }
                                });

                                promise.then( (result) => {
                                    try {
                                        this._load_PsmOpenModificationMasses_InProgress = false;

                                        this.setState( (state: QcViewPage_DisplayData__Main_Component_State, props: QcViewPage_DisplayData__Main_Component_Props ) : QcViewPage_DisplayData__Main_Component_State => {

                                            return { gettingDataFor_Filtering_reportedPeptideIdsForDisplay : false };
                                        });

                                        //  Now update dependent page parts

                                        this._updateRestOfPage_ForUserInteraction();

                                    } catch( e ) {
                                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                        throw e;
                                    }
                                });

                                return;  // EARLY RETURN
                            }

                            //  No Promise so run immediately

                            window.setTimeout( () => {
                                //  Now update dependent page parts

                                this._updateRestOfPage_ForUserInteraction();
                            }, 0 );
                        } catch( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                            throw e;
                        }
                    }, 0 );
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }, 0 );
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     * Change was made to modification selection.  this.props.propsValue.modificationMass_UserSelections_StateObject has been updated.
     *
     * Need to create new this.state.modificationMass_UserSelections_ComponentData
     *
     * This is called after the Variable Mod overlay has updated the selected variable mods.
     * Need to re-render the modification selection to display any new variable modification masses that were not displayed before
     */
    _modificationMass_Update_modificationMass_UserSelections_ComponentData_Callback() : void {
        try {
            window.setTimeout( () => {
                try {
                    this._selectedModificationsChange_UpdateURL();  //  Update URL

                    if ( ! this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds ) {
                        //  State NOT SET yet so skip this update
                        return; // EARLY RETURN
                    }

                    window.setTimeout( () => {
                        try {
                            this._modificationMass_Update_modificationMass_UserSelections_ComponentData();

                            if ( this.props.propsValue.modificationMass_UserSelections_StateObject.get_OpenModificationSelections().is_Any_Modification_Selected()
                                && this._load_PsmOpenModificationMasses_InProgress ) {

                                //  Already loading PSM Open Modification Masses so exit.
                                //   *  When the existing Promise for loading PSM Open Modification Masses, the page will be updated for the current selection change as well.

                                return; // EARLY RETURN
                            }

                            let promise = undefined;

                            if ( this.props.propsValue.modificationMass_UserSelections_StateObject.get_OpenModificationSelections().is_Any_Modification_Selected() ) {

                                promise = load_PsmOpenModificationMasses_IfNeeded({
                                    getSearchSubGroupIds : undefined,
                                    proteinSequenceVersionId : null, // TODO
                                    projectSearchIds : this.props.propsValue.projectSearchIds,
                                    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                                    searchDataLookupParamsRoot : this.state.searchDataLookupParamsRoot
                                });
                            }

                            if ( promise ) {
                                this._load_PsmOpenModificationMasses_InProgress = true;

                                this.setState( (state: QcViewPage_DisplayData__Main_Component_State, props: QcViewPage_DisplayData__Main_Component_Props ) : QcViewPage_DisplayData__Main_Component_State => {

                                    return { gettingDataFor_Filtering_reportedPeptideIdsForDisplay : true };
                                });

                                //  Show loading message for peptide list since may take time to load new values from DB
                                // reportedPeptideList_ShowLoadingMessage();

                                promise.catch( (reason) => {
                                    try {
                                        this._load_PsmOpenModificationMasses_InProgress = false;

                                        this.setState( (state: QcViewPage_DisplayData__Main_Component_State, props: QcViewPage_DisplayData__Main_Component_Props ) : QcViewPage_DisplayData__Main_Component_State => {

                                            return { gettingDataFor_Filtering_reportedPeptideIdsForDisplay : false };
                                        });
                                    } catch( e ) {
                                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                        throw e;
                                    }
                                });

                                promise.then( (result) => {
                                    try {
                                        this._load_PsmOpenModificationMasses_InProgress = false;

                                        this.setState( (state: QcViewPage_DisplayData__Main_Component_State, props: QcViewPage_DisplayData__Main_Component_Props ) : QcViewPage_DisplayData__Main_Component_State => {

                                            return { gettingDataFor_Filtering_reportedPeptideIdsForDisplay : false };
                                        });

                                        //  Now update dependent page parts

                                        this._updateRestOfPage_ForUserInteraction();

                                    } catch( e ) {
                                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                        throw e;
                                    }
                                });

                                return;  // EARLY RETURN
                            }

                            //  No Promise so run immediately

                            window.setTimeout( () => {
                                try {
                                    //  Now update dependent page parts

                                    this._updateRestOfPage_ForUserInteraction();

                                } catch( e ) {
                                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                    throw e;
                                }
                            }, 0 );
                        } catch( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                            throw e;
                        }
                    }, 0 );
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }, 0 );
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }
    /**
     * create new this.state.modificationMass_UserSelections_ComponentData
     */
    _modificationMass_Update_modificationMass_UserSelections_ComponentData() {

        if ( ! this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds ) {
            //  State NOT SET yet so skip this update
            return; // EARLY RETURN
        }

        const modificationMass_UserSelections_ComponentData : ModificationMass_UserSelections_ComponentData =
            PeptidePage_Display_MainContent_Component_nonClass_Functions.create_ModificationMass_UserSelections_ComponentData({
                modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
                projectSearchIds : this.props.propsValue.projectSearchIds,
                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
            });

        this.setState( (state: QcViewPage_DisplayData__Main_Component_State, props: QcViewPage_DisplayData__Main_Component_Props ) : QcViewPage_DisplayData__Main_Component_State => {

            return { modificationMass_UserSelections_ComponentData };
        });
    }

    /**
     * Change to peptide unique selection, this.props.propsValue.peptideUnique_UserSelection_StateObject
     */
    _updateMadeTo_modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_Callback() : void {
        try {
            window.setTimeout( () => {
                try {
                    this._modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Update_ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData_ComponentData();

                    //  Now update dependent page parts
                    this._updateRestOfPage_ForUserInteraction();

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }, 0 );
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     * create new this.state.modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData
     */
    _modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Update_ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData_ComponentData() {

        if ( ! this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds ) {
            //  State NOT SET yet so skip this update
            return; // EARLY RETURN
        }

        const modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData =
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent({
                modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                projectSearchIds : this.props.propsValue.projectSearchIds,
                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
            });

        this.setState( (state: QcViewPage_DisplayData__Main_Component_State, props: QcViewPage_DisplayData__Main_Component_Props ) : QcViewPage_DisplayData__Main_Component_State => {

            return { modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData };
        });
    }


    /**
     * Change to reporter ion selection
     */
    _updateMadeTo_reporterIonMass_UserSelections_StateObject_Callback() : void {
        try {
            window.setTimeout( () => {
                try {
                    this._reporterIonMassesChange_UpdateURL();  //  Update URL

                    if ( ! this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds ) {
                        //  State NOT SET yet so skip this update
                        return; // EARLY RETURN
                    }

                    if ( this._load_ReporterIonMasses_InProgress ) {

                        //  Already loading Reporter Ion Masses so exit.
                        //   *  When the existing Promise for loading Reporter Ion Masses, the page will be updated for the current selection change as well.

                        return; // EARLY RETURN
                    }

                    let promise = undefined;

                    if ( this.props.propsValue.reporterIonMass_UserSelections_StateObject.is_Any_ReporterIons_Selected() ) {

                        promise = PeptidePage_Display_MainContent_Component_nonClass_Functions.load_ReporterIonMasses_IfNeeded({
                            searchSubGroups_Root: this.props.propsValue.dataPageStateManager.get_SearchSubGroups_Root(), // May be null or undefined
                            projectSearchIds : this.props.propsValue.projectSearchIds,
                            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                            searchDataLookupParamsRoot : this.state.searchDataLookupParamsRoot
                        });
                    }

                    if ( promise ) {
                        this._load_ReporterIonMasses_InProgress = true;

                        // console.log("_updateMadeTo_reporterIonMass_UserSelections_StateObject_Callback(): Loading Reporter Ion Masses so display Loading Data Message");
                        this.setState( (state: QcViewPage_DisplayData__Main_Component_State, props: QcViewPage_DisplayData__Main_Component_Props ) : QcViewPage_DisplayData__Main_Component_State => {

                            return { gettingDataFor_Filtering_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : true };
                        });

                        //  Show loading message for peptide list since may take time to load new values from DB
                        // reportedPeptideList_ShowLoadingMessage();

                        promise.catch( (reason) => {
                            try {
                                this._load_ReporterIonMasses_InProgress = false;

                                this.setState( (state: QcViewPage_DisplayData__Main_Component_State, props: QcViewPage_DisplayData__Main_Component_Props ) : QcViewPage_DisplayData__Main_Component_State => {

                                    return { gettingDataFor_Filtering_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : false };
                                });
                            } catch( e ) {
                                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                throw e;
                            }
                        });

                        promise.then( (result) => {
                            try {
                                this._load_ReporterIonMasses_InProgress = false;

                                this.setState( (state: QcViewPage_DisplayData__Main_Component_State, props: QcViewPage_DisplayData__Main_Component_Props ) : QcViewPage_DisplayData__Main_Component_State => {

                                    return { gettingDataFor_Filtering_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : false };
                                });

                                //  Now update dependent page parts

                                this._updateRestOfPage_ForUserInteraction();

                            } catch( e ) {
                                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                throw e;
                            }
                        });

                        return;  // EARLY RETURN
                    }

                    //  No Promise so run immediately

                    window.setTimeout( () => {
                        try {
                            //  Now update dependent page parts
                            this._updateRestOfPage_ForUserInteraction();

                        } catch( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                            throw e;
                        }
                    }, 0 );

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }, 0 );

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     * create new this.state.modificationMass_UserSelections_ComponentData
     */
    _reporterIonMass_Update_reporterIonMass_UserSelections_ComponentData() {

        if ( ! this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds ) {
            //  State NOT SET yet so skip this update
            return; // EARLY RETURN
        }

        const reporterIons_UserSelections_ComponentData : ReporterIonMass_UserSelections_ComponentData = PeptidePage_Display_MainContent_Component_nonClass_Functions.create_ReporterIons_UserSelections_ComponentData({
            reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
            projectSearchIds : this.props.propsValue.projectSearchIds,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
        });

        this.setState( (state: QcViewPage_DisplayData__Main_Component_State, props: QcViewPage_DisplayData__Main_Component_Props ) : QcViewPage_DisplayData__Main_Component_State => {

            return { reporterIons_UserSelections_ComponentData };
        });
    }

    /**
     * Change to peptide unique selection, this.props.propsValue.peptideUnique_UserSelection_StateObject
     */
    _updateMadeTo_peptideUnique_UserSelection_StateObject_Callback() : void {
        try {
            window.setTimeout( () => {
                try {
                    this._selectedPeptideUniqueChange_UpdateURL();  //  Update URL

                    if ( ! this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds ) {
                        //  State NOT SET yet so skip this update
                        return; // EARLY RETURN
                    }

                    window.setTimeout( () => {
                        try {
                            this._peptideUnique_Update_PeptideUnique_UserSelection_ComponentData();

                            //  Now update dependent page parts
                            this._updateRestOfPage_ForUserInteraction();

                        } catch( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                            throw e;
                        }
                    }, 0 );
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }, 0 );
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     * create new this.state.peptideUnique_UserSelection_ComponentData
     */
    _peptideUnique_Update_PeptideUnique_UserSelection_ComponentData() {

        if ( ! this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds ) {
            //  State NOT SET yet so skip this update
            return; // EARLY RETURN
        }

        const peptideUnique_UserSelection_ComponentData : PeptideUnique_UserSelection_ComponentData = peptideUnique_UserSelection_BuildData_ForReactComponent({
            peptideUnique_UserSelection_StateObject : this.props.propsValue.peptideUnique_UserSelection_StateObject
        });

        this.setState( (state: QcViewPage_DisplayData__Main_Component_State, props: QcViewPage_DisplayData__Main_Component_Props ) : QcViewPage_DisplayData__Main_Component_State => {

            return { peptideUnique_UserSelection_ComponentData };
        });
    }

    /**
     * Change to peptide string selection, this.props.propsValue.peptideSequence_UserSelections_StateObject
     */
    _updateMadeTo_peptideSequence_UserSelections_StateObject() : void {
        try {
            window.setTimeout( () => {
                try {
                    this._selectedPeptideSequenceChange_UpdateURL();  //  Update URL

                    if ( ! this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds ) {
                        //  State NOT SET yet so skip this update
                        return; // EARLY RETURN
                    }

                    window.setTimeout( () => {
                        try {
                            //  Now update dependent page parts
                            this._updateRestOfPage_ForUserInteraction();

                        } catch( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                            throw e;
                        }
                    }, 0 );
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }, 0 );
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     * create new this.state.peptideSequence_UserSelections_ComponentData
     */
    _peptideSequence_Update_peptideSequence_UserSelections_ComponentData() {

        if ( ! this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds ) {
            //  State NOT SET yet so skip this update
            return; // EARLY RETURN
        }

        const peptideSequence_UserSelections_ComponentData : PeptideSequence_UserSelections_ComponentData = PeptidePage_Display_MainContent_Component_nonClass_Functions.create_PeptideSequence_UserSelections_ComponentData({
            peptideSequence_UserSelections_StateObject : this.props.propsValue.peptideSequence_UserSelections_StateObject
        });

        this.setState( (state: QcViewPage_DisplayData__Main_Component_State, props: QcViewPage_DisplayData__Main_Component_Props ) : QcViewPage_DisplayData__Main_Component_State => {

            return { peptideSequence_UserSelections_ComponentData };
        });
    }

    /**
     * Change to Protein Position Filter Selections, this.props.propsValue.updateMadeTo_proteinPositionFilter_UserSelections_StateObject_Callback
     */
    _updateMadeTo_proteinPositionFilter_UserSelections_StateObject_Callback() : void {
        try {
            window.setTimeout( () => {
                try {
                    this._selectedProteinPositionFilterChange_UpdateURL();  //  Update URL

                    if ( ! this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds ) {
                        //  State NOT SET yet so skip this update
                        return; // EARLY RETURN
                    }

                    this._proteinPositionFilter_Update_proteinPositionFilter_UserSelections_Component_Force_ReRender_Object();

                    if ( this._load_ProteinCoverage_InProgress ) {

                        //  Already loading Reporter Ion Masses so exit.
                        //   *  When the existing Promise for loading Reporter Ion Masses, the page will be updated for the current selection change as well.

                        return; // EARLY RETURN
                    }

                    let promise = undefined;

                    if ( this.props.propsValue.proteinPositionFilter_UserSelections_StateObject.isAnySelections() ) {

                        promise = PeptidePage_Display_MainContent_Component_nonClass_Functions.load_ProteinCoverage_IfNeeded({
                            projectSearchIds : this.props.propsValue.projectSearchIds,
                            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
                        });
                    }
                    if ( promise ) {
                        this._load_ProteinCoverage_InProgress = true;

                        // console.log("_updateMadeTo_reporterIonMass_UserSelections_StateObject_Callback(): Loading Reporter Ion Masses so display Loading Data Message");
                        this.setState( (state: QcViewPage_DisplayData__Main_Component_State, props: QcViewPage_DisplayData__Main_Component_Props ) : QcViewPage_DisplayData__Main_Component_State => {

                            return { gettingDataFor_Filtering_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : true };
                        });

                        //  Show loading message for peptide list since may take time to load new values from DB
                        // reportedPeptideList_ShowLoadingMessage();

                        promise.catch( (reason) => {
                            try {
                                this._load_ProteinCoverage_InProgress = false;

                                this.setState( (state: QcViewPage_DisplayData__Main_Component_State, props: QcViewPage_DisplayData__Main_Component_Props ) : QcViewPage_DisplayData__Main_Component_State => {

                                    return { gettingDataFor_Filtering_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : false };
                                });
                            } catch( e ) {
                                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                throw e;
                            }
                        });

                        promise.then( (result) => {
                            try {
                                this._load_ProteinCoverage_InProgress = false;

                                this.setState( (state: QcViewPage_DisplayData__Main_Component_State, props: QcViewPage_DisplayData__Main_Component_Props ) : QcViewPage_DisplayData__Main_Component_State => {

                                    return { gettingDataFor_Filtering_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : false };
                                });

                                //  Now update dependent page parts

                                this._updateRestOfPage_ForUserInteraction();

                            } catch( e ) {
                                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                throw e;
                            }
                        });

                        return;  // EARLY RETURN
                    }

                    //  No Promise so run immediately

                    window.setTimeout( () => {
                        try {
                            //  Now update dependent page parts
                            this._updateRestOfPage_ForUserInteraction();

                        } catch( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                            throw e;
                        }
                    }, 0 );

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }, 0 );

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     * create new this.state.proteinPositionFilter_UserSelections_ComponentData
     */
    _proteinPositionFilter_Update_proteinPositionFilter_UserSelections_Component_Force_ReRender_Object() {

        this.setState( { proteinPositionFilter_UserSelections_Component_Force_ReRender_Object: {} } );
    }

    /////
    /**
     * Change to protein sequence position selection
     */
    _updateMadeTo_generatedPeptideContents_UserSelections_StateObject_Callback() : void {
        try {
            if ( ! this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds ) {
                //  State NOT SET yet so skip this update
                return; // EARLY RETURN
            }

            window.setTimeout( () => {
                try {
                    if ( ( this.props.propsValue.generatedPeptideContents_UserSelections_StateObject.getOpenModifications_Selected()
                        || this.props.propsValue.generatedPeptideContents_UserSelections_StateObject.getOpenModifications_WithLocalization_Selected() )
                        && this._load_PsmOpenModificationMasses_InProgress ) {

                        //  Already loading PSM Open Modification Masses so exit.
                        //   *  When the existing Promise for loading PSM Open Modification Masses, the page will be updated for the current selection change as well.

                        return; // EARLY RETURN
                    }

                    let promise = undefined;

                    if ( this.props.propsValue.generatedPeptideContents_UserSelections_StateObject.getOpenModifications_Selected()
                        || this.props.propsValue.generatedPeptideContents_UserSelections_StateObject.getOpenModifications_WithLocalization_Selected() ) {

                        promise = load_PsmOpenModificationMasses_IfNeeded({
                            getSearchSubGroupIds : undefined,
                            proteinSequenceVersionId : null,
                            projectSearchIds : this.props.propsValue.projectSearchIds,
                            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                            searchDataLookupParamsRoot : this.state.searchDataLookupParamsRoot
                        });
                    }

                    if ( promise ) {
                        this._load_PsmOpenModificationMasses_InProgress = true;

                        this.setState( (state: QcViewPage_DisplayData__Main_Component_State, props: QcViewPage_DisplayData__Main_Component_Props ) : QcViewPage_DisplayData__Main_Component_State => {

                            return { gettingDataFor_Filtering_reportedPeptideIdsForDisplay : true };
                        });

                        //  Show loading message for peptide list since may take time to load new values from DB
                        // reportedPeptideList_ShowLoadingMessage();

                        promise.catch( (reason) => {
                            try {
                                this._load_PsmOpenModificationMasses_InProgress = false;

                                this.setState( (state: QcViewPage_DisplayData__Main_Component_State, props: QcViewPage_DisplayData__Main_Component_Props ) : QcViewPage_DisplayData__Main_Component_State => {

                                    return { gettingDataFor_Filtering_reportedPeptideIdsForDisplay : false };
                                });
                            } catch( e ) {
                                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                throw e;
                            }
                        });

                        promise.then( (result) => {
                            try {
                                this._load_PsmOpenModificationMasses_InProgress = false;

                                this.setState( (state: QcViewPage_DisplayData__Main_Component_State, props: QcViewPage_DisplayData__Main_Component_Props ) : QcViewPage_DisplayData__Main_Component_State => {

                                    return { gettingDataFor_Filtering_reportedPeptideIdsForDisplay : false };
                                });

                                //  Now update dependent page parts

                                this._updateRestOfPage_ForUserInteraction();

                            } catch( e ) {
                                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                throw e;
                            }
                        });

                        return;  // EARLY RETURN
                    }

                    //  No Promise so run immediately

                    window.setTimeout( () => {
                        try {
                            //  Now update dependent page parts

                            this._updateRestOfPage_ForUserInteraction();

                        } catch( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                            throw e;
                        }
                    }, 0 );

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }, 0 );

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    //  Handling Specific Changes by updating the URL

    /**
     * Update State to URL for Modification selection change (Variable or Static Modifications)
     */
    _selectedModificationsChange_UpdateURL() {

        const modsSelectedEncodedStateData = this.props.propsValue.modificationMass_UserSelections_StateObject.getEncodedStateData();
        this.props.propsValue.peptidePageRoot_CentralStateManagerObjectClass.setModsSelectedEncodedStateData( { modsSelectedEncodedStateData : modsSelectedEncodedStateData } );
    }

    /**
     *
     */
    _reporterIonMassesChange_UpdateURL() {

        const reporterIonMassesSelectedEncodedStateData = this.props.propsValue.reporterIonMass_UserSelections_StateObject.getEncodedStateData();
        this.props.propsValue.peptidePageRoot_CentralStateManagerObjectClass.setReporterIonMassesSelectedEncodedStateData( { reporterIonMassesSelectedEncodedStateData } );
    }

    /**
     * Update State to URL for Peptide Unique selection change
     */
    _selectedPeptideUniqueChange_UpdateURL() {

        const encodedStateData = this.props.propsValue.peptideUnique_UserSelection_StateObject.getEncodedStateData();
        this.props.propsValue.peptidePageRoot_CentralStateManagerObjectClass.setPeptideUniqueFilterSelectedEncodedStateData({ peptideUniqueFilterSelectedEncodedStateData : encodedStateData });
    }

    /**
     * Update State to URL for Peptide Sequence selection change
     */
    _selectedPeptideSequenceChange_UpdateURL() {

        const peptideSequenceSelectedEncodedStateData = this.props.propsValue.peptideSequence_UserSelections_StateObject.getEncodedStateData();
        this.props.propsValue.peptidePageRoot_CentralStateManagerObjectClass.setPeptideSequenceFilterSelectedEncodedStateData({ peptideSequenceFilterSelectedEncodedStateData : peptideSequenceSelectedEncodedStateData });
    }

    /**
     * Update State to URL for Protein Position Filter Selections change
     */
    _selectedProteinPositionFilterChange_UpdateURL() {

        const encodedStateData = this.props.propsValue.proteinPositionFilter_UserSelections_StateObject.getEncodedStateData();
        this.props.propsValue.peptidePageRoot_CentralStateManagerObjectClass.set_proteinPositionFilter_UserSelections_EncodedStateData({ proteinPositionFilter_UserSelections_EncodedStateData : encodedStateData });
    }

    ////////////////////////////////////////

    //  Handle Update Rest of the page beyond what the user manipulated

    /**
     * Handle Update Rest of the page beyond what the user manipulated
     */
    _updateRestOfPage_ForUserInteraction() {
        try {
            window.setTimeout( () => {
                try {
                    this._updateCurrentPeptideFiltersSection();

                    window.setTimeout( () => {
                        try {
                            const searchSubGroup_Ids_Selected : Set<number> = PeptidePage_Display_MainContent_Component_nonClass_Functions.compute_searchSubGroup_Ids_Selected({ propsValue : this.props.propsValue });

                            const getReportedPeptideIdsForDisplay_AllProjectSearchIds_result = getReportedPeptideIdsForDisplay_AllProjectSearchIds({ // External Function Call
                                not_filtered_position_modification_selections : false,
                                proteinSequenceVersionId : null,
                                projectSearchIds : this.props.propsValue.projectSearchIds,
                                searchSubGroup_Ids_Selected,
                                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                                loadedDataCommonHolder : this.state.loadedDataCommonHolder,
                                proteinSequenceWidget_StateObject : undefined,
                                modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
                                modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                                reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
                                peptideUnique_UserSelection_StateObject : this.props.propsValue.peptideUnique_UserSelection_StateObject,
                                peptideSequence_UserSelections_StateObject : this.props.propsValue.peptideSequence_UserSelections_StateObject,
                                userSearchString_LocationsOn_ProteinSequence_Root : null,
                                proteinPositionFilter_UserSelections_StateObject : this.props.propsValue.proteinPositionFilter_UserSelections_StateObject
                            });

                            const reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds = getReportedPeptideIdsForDisplay_AllProjectSearchIds_result.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds;

                            const proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result : ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result =
                                proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides({
                                    proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject: this.props.propsValue_QC.proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject,
                                    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                                    searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
                                    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds: getReportedPeptideIdsForDisplay_AllProjectSearchIds_result.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
                                    projectSearchIds : this.props.propsValue.projectSearchIds,
                                    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds: this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                                });

                            const qc_compute_Cache_create_GeneratedReportedPeptideListData = new Qc_compute_Cache_create_GeneratedReportedPeptideListData({
                                reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
                                proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject: this.props.propsValue_QC.proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject,
                                modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                                projectSearchIds: this.props.propsValue.projectSearchIds,
                                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds: this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                                loadedDataCommonHolder: this.state.loadedDataCommonHolder
                            });

                            const qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent = {
                                projectSearchIds: this.props.propsValue.projectSearchIds,
                                searchSubGroup_Ids_Selected,
                                propsValue : this.props.propsValue,
                                propsValue_QC : this.props.propsValue_QC,
                                searchDataLookupParamsRoot : this.state.searchDataLookupParamsRoot,
                                qcPage_Searches_Flags: this._qcPage_Searches_Flags,
                                qcPage_Searches_Info: this._qcPage_Searches_Info,
                                proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result: proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result,
                                reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForCharts: reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
                                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds: this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                                loadedDataCommonHolder: this.state.loadedDataCommonHolder,
                                dataPageStateManager: this.props.propsValue.dataPageStateManager,
                                qc_compute_Cache_create_GeneratedReportedPeptideListData
                            }


                            window.setTimeout( () => {
                                try {
                                    //  Since going to take a while to put new peptide list in DOM, show updating message first, then update charts
                                    this.setState( (state : QcViewPage_DisplayData__Main_Component_State, props : QcViewPage_DisplayData__Main_Component_Props ) : QcViewPage_DisplayData__Main_Component_State => {
                                        return { updating_Next_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForCharts : true }
                                    });

                                    window.setTimeout( () => {
                                        try {
                                            this.setState( (state : QcViewPage_DisplayData__Main_Component_State, props : QcViewPage_DisplayData__Main_Component_Props ) : QcViewPage_DisplayData__Main_Component_State => {
                                                return {
                                                    updating_Next_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForCharts : false,
                                                    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForCharts: reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
                                                    proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result,
                                                    qcViewPage_CommonData_To_AllComponents_From_MainComponent
                                                }
                                            });
                                        } catch( e ) {
                                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                            throw e;
                                        }
                                    }, 0 );
                                } catch( e ) {
                                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                    throw e;
                                }
                            }, 0 );

                        } catch( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                            throw e;
                        }
                    }, 0 );

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
                //  Update more parts like protein coverage and peptide list
            }, 0 );

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     * Update section above the peptide list that shows the current Peptide Filters
     */
    _updateCurrentPeptideFiltersSection() {

        const peptideFiltersDisplay_ComponentData : PeptideFiltersDisplay_ComponentData = {
            modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
            reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
            peptideUnique_UserSelection_StateObject : this.props.propsValue.peptideUnique_UserSelection_StateObject,
            peptideSequence_UserSelections_StateObject : this.props.propsValue.peptideSequence_UserSelections_StateObject,
            proteinPositionFilter_UserSelections_StateObject : this.props.propsValue.proteinPositionFilter_UserSelections_StateObject,
            proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data : this.state.proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data,
            peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject : undefined,  //  Not Used Yet
            proteinSequenceWidget_StateObject : undefined,
            searchSubGroup_Are_All_SearchSubGroupIds_Selected : this.state.searchSubGroup_Are_All_SearchSubGroupIds_Selected,
            searchSubGroup_PropValue : this.state.searchSubGroup_PropValue
        };

        this.setState( (state: QcViewPage_DisplayData__Main_Component_State, props: QcViewPage_DisplayData__Main_Component_Props ) : QcViewPage_DisplayData__Main_Component_State => {

            return { peptideFiltersDisplay_ComponentData };
        });
    }

    ////////////////////////////////////////

    /**
     *
     */
    render() {

        let setDefaultView_Component : JSX.Element = undefined;

        if ( this.props.propsValue.dataPages_LoggedInUser_CommonObjectsFactory &&  this.props.propsValue.projectSearchIds.length === 1 ) {

            const get_SetDefaultView_Component_React : Get_SetDefaultView_Component_React_Type =
                this.props.propsValue.dataPages_LoggedInUser_CommonObjectsFactory.getFunctionToGet_SetDefaultView_Component_React();

            const param = new SetDefaultView_Component_React_Params({ projectSearchId : this.props.propsValue.projectSearchIds[ 0 ] });
            setDefaultView_Component = get_SetDefaultView_Component_React( param )
        }

        let saveView_Component : JSX.Element = undefined;

        if ( this.state.saveView_Component_React ) {

            //  Create "Save View" Component

            //  variable must start with Constant "S" since is React Component
            const SaveView_Component_React = this.state.saveView_Component_React;
            const saveView_Component_Props_Prop = this.state.saveView_Component_Props_Prop;

            saveView_Component = (

                <React.Fragment>

                    <SaveView_Component_React
                        propsValue={ saveView_Component_Props_Prop }
                    />

                    <span >&nbsp;</span>

                </React.Fragment>
            );
        }

        //  Only create these once main display data is loaded

        let filterOn_AND_generatedPeptideContents_UserSelections_Root_Component_Section : JSX.Element = null;

        if ( this.state.mainDisplayData_Loaded ) {

            let display_ShowAsSingleSearchOption = false;

            if ( this.props.propsValue.projectSearchIds.length === 1 && this.state.qcViewPage_CommonData_To_AllComponents_From_MainComponent.searchSubGroup_Ids_Selected ) {

                display_ShowAsSingleSearchOption = true;
            }

            filterOn_AND_generatedPeptideContents_UserSelections_Root_Component_Section = this._render_filterOn_AND_generatedPeptideContents_UserSelections_Root_Component_Section({ display_ShowAsSingleSearchOption });
        }

        // if ( this.state.updating_Next_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForCharts ) {
        //     console.warn("In Render: this.state.updating_Next_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForCharts true")
        // }

        return (
            <React.Fragment>

                {/* Apply a width to this <div> so that the boxes on right stay within viewport when main overlay is widened to exceed viewport.
                        Need to take into account padding in class="view-single-protein-overlay-body" which is currently 20px or read that from DOM element */}

                {/* Fake 'width' so that grid width not auto fill to width 100%.  Grid will exceed the 80px width to fill the width of the 2 columns.
                            This keeps boxes on right in viewport when main overlay width > viewport width. */}

                {/*style={ { display: "grid", gridTemplateColumns: "auto min-content", width: 80 } }*/}
                <div ref={ this._div_MainGridAtTop_Ref } >

                    {/* display of data above Reported Peptides  */}

                    <div ref={ this._div_MainContent_LeftGridEntry_AtTop_Ref }
                         style={ {
                             // display: "inline-block",
                             // width : width_mainBlockAbovePeptideList,
                             // minWidth : width_mainBlockAbovePeptideList,
                             // maxWidth : width_mainBlockAbovePeptideList
                         } } >

                        {/* Main Content above Reported Peptides  */}

                        <SearchDetailsAndOtherFiltersOuterBlock_Layout>
                            <SearchDetailsAndFilterBlock_MainPage_Root
                                propValue={ this.state.searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue }
                                searchSubGroup_CentralStateManagerObjectClass={ this.props.propsValue.searchSubGroup_CentralStateManagerObjectClass }
                                searchSubGroup_SelectionsChanged_Callback={ this._searchSubGroup_SelectionsChanged_Callback_BindThis }
                                searchSubGroup_ManageGroupNames_Clicked_Callback={ () => { window.alert("searchSubGroup_ManageGroupNames_Clicked_Callback called"); throw Error("callback not handled")} }
                            />
                        </SearchDetailsAndOtherFiltersOuterBlock_Layout>

                        <div style={ { paddingBottom: 15 } }>

                            { setDefaultView_Component }
                            { saveView_Component }

                            <SharePage_Component
                                projectSearchIds={ this.props.propsValue.projectSearchIds }
                            />
                        </div>

                        { filterOn_AND_generatedPeptideContents_UserSelections_Root_Component_Section }

                    </div>  {/* END: Main Content above Main QC data like charts, etc  */}

                </div>  {/* Close display of data above Main QC data like charts, etc */}

                {/* Display of Main QC data like charts, etc  */}


                { ( ! this.state.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForCharts ) ? (

                    <div >
                        <div >
                            Loading Data
                        </div>
                        <div style={ { paddingTop: 40, paddingBottom: 80 } }>
                            <Spinner_Limelight_Component/>
                        </div>
                    </div>

                ) : (
                    <React.Fragment>

                        {/*  Remove ' display: "inline-block" ' since is causing Firefox rendering issues  */}
                        {/*<div style={ { display: "inline-block", position: "relative", marginTop: 20 } } >*/}

                        {/*  Replace commented out <div> with following <div>  */}

                        <div style={ { position: "relative", marginTop: 20 } }>

                            { ( this.props.propsValue.projectSearchIds.length === 1 ) ? (

                                ( this.state.qcViewPage_CommonData_To_AllComponents_From_MainComponent ) ? (

                                    ( this.state.qcViewPage_CommonData_To_AllComponents_From_MainComponent.searchSubGroup_Ids_Selected
                                    && ( ! this.props.propsValue_QC.qcPage_ShowSingleSearch_Not_SubSearches_UserSelections_StateObject.get_showSingleSearch_Not_SubSearches()  ) ) ? (

                                        // Single Search with Sub Search Groups

                                        <Qc_SingleSearch__SubSearches_AA__Root_DisplayBlock
                                            qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.state.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                                        />

                                    ) : (

                                        // Single Search

                                        <Qc_SingleSearch_AA__Root_DisplayBlock
                                            qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.state.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                                        />
                                    )

                                ) : null

                            ) : (
                                // Multiple Searches

                                <Qc_MultipleSearches_AA__Root_DisplayBlock
                                    qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.state.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                                />
                            )}

                            {( this.state.updating_Next_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForCharts ) ? (

                                <QcPage_UpdatingData_BlockCover/>

                            ) : null }

                        </div>
                    </React.Fragment>
                ) }

            </React.Fragment>

        );
    }

    //////////////////////////////


    /**
     *
     */
    private _render_filterOn_AND_generatedPeptideContents_UserSelections_Root_Component_Section(
        {
            display_ShowAsSingleSearchOption,
        } : {
            display_ShowAsSingleSearchOption: boolean
        }
    ) : JSX.Element{

        let modificationMass_CommonRounding_ReturnNumber_Param = modificationMass_CommonRounding_ReturnNumber;

        // if ( this.props.propsValue.projectSearchIds.length === 1 ) {
        //     modificationMass_CommonRounding_ReturnNumber_Param = undefined;  //  NO Rounding for Single Project Search Id
        // }

        let searchContains_VariableModifications = false;
        let searchContains_OpenModifications = false;
        let searchContains_StaticModifications = false;

        for ( const projectSearchId of this.props.propsValue.projectSearchIds ) {

            const loadedDataPerProjectSearchIdHolder = this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
            if ( ! loadedDataPerProjectSearchIdHolder ) {
                throw new Error("No value in this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds for projectSearchId: " + projectSearchId );
            }
            if ( loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds_HasDynamicModifications()
                && loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds_HasDynamicModifications().size > 0
            ) {
                searchContains_VariableModifications = true;
            }
            if ( loadedDataPerProjectSearchIdHolder.get_openModificationsOnReportedPeptide_KeyReportedPeptideId()
                && loadedDataPerProjectSearchIdHolder.get_openModificationsOnReportedPeptide_KeyReportedPeptideId().size > 0
            ) {
                searchContains_OpenModifications = true;
            }
            if ( loadedDataPerProjectSearchIdHolder.get_staticMods()
                && loadedDataPerProjectSearchIdHolder.get_staticMods().length > 0
            ) {
                searchContains_StaticModifications = true;
            }
        }

        let limelight_Colors_For_SingleSearch__SubSearches : Limelight_Colors_For_SingleSearch__SubSearches = undefined;

        if ( this.props.propsValue.projectSearchIds.length === 1 && this.props.propsValue.dataPageStateManager.get_SearchSubGroups_Root() ) {
            const projectSearchId = this.props.propsValue.projectSearchIds[0];
            const searchSubGroupIds_DisplayOrder : Array<number> = [];
            const searchSubGroups = this.props.propsValue.dataPageStateManager.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId(projectSearchId);
            for ( const searchSubGroup of searchSubGroups.get_searchSubGroups_Array_OrderByDisplayOrder_OR_SortedOn_subgroupName_Display_ByServerCode() ) {
                searchSubGroupIds_DisplayOrder.push(searchSubGroup.searchSubGroup_Id);
            }
            limelight_Colors_For_SingleSearch__SubSearches = Limelight_Colors_For_SingleSearch__SubSearches.getInstance({ searchSubGroupIds: searchSubGroupIds_DisplayOrder })
        }

        return (

            <React.Fragment>

                <div style={ { } } > {/*marginBottom: 10*/}

                    <div className=" filter-common-block-selection-container-block no-section-labels ">

                        { ( this.state.peptideFiltersDisplay_ComponentData ) ? (
                            <React.Fragment >

                                {/* Display of User Selected Modifications and Protein Positions filtering on  */}

                                <PeptideFiltersDisplay
                                    peptideFiltersDisplay_ComponentData={ this.state.peptideFiltersDisplay_ComponentData }
                                    clearAllFiltersClickHandler={ this._clearAllSelections_BindThis }
                                />

                            </React.Fragment>

                        ): null }

                        {( display_ShowAsSingleSearchOption ) ? (
                            <React.Fragment>
                                <div className=" filter-common-filter-label " style={ { marginBottom: 8, paddingTop: 0 } }> {/*  filter-common-filter-label has paddingTop so add paddingTop: 0 to reset to zero  */}
                                    View as Single Search?

                                    <div className=" filter-common-block-selection--section-label--help-tip-symbol ">
                                        <div className=" inner-absolute-pos ">
                                            <div className=" main-div ">
                                                <p className="help-tip-actual">
                                                    When checked, view as standard Single Search
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="  filter-common-selection-block   ">
                                    <input
                                        type="checkbox"
                                        checked={ this.props.propsValue_QC.qcPage_ShowSingleSearch_Not_SubSearches_UserSelections_StateObject.get_showSingleSearch_Not_SubSearches() }
                                        onChange={ this._qcPage_ShowSingleSearch_Not_SubSearches_UserSelections_Changed_BindThis }
                                    />
                                </div>
                            </React.Fragment>
                            ): null}

                        <SearchSubGroup_In_SingleProtein_FilterOn_Block_Root_Component
                            projectSearchId={ this.props.propsValue.projectSearchIds[0] }
                            dataPageStateManager={ this.props.propsValue.dataPageStateManager }
                            displayData={ this.state.searchSubGroup_PropValue }
                            searchSubGroup_CentralStateManagerObjectClass={ this.props.propsValue.searchSubGroup_CentralStateManagerObjectClass }
                            searchSubGroup_SelectionsChanged_Callback={ this._searchSubGroup_SelectionsChanged_Callback_BindThis }
                            searchSubGroup_ManageGroupNames_Clicked_Callback={ undefined }
                            limelight_Colors_For_SingleSearch__SubSearches={ limelight_Colors_For_SingleSearch__SubSearches }  //  Only for QC Page
                        />

                        <ModificationMass_UserSelections_Root
                            modificationMassSelections_AlwaysShow__ClearOn_ObjectReferenceChange={ this.state.modificationMassSelections_AlwaysShow__ClearOn_ObjectReferenceChange }
                            openModification_OpenSelectMassOverlay_Override_Callback={ this._openModificationMass_OpenUserSelections_Overlay_Override_BindThis }
                            modificationMass_UserSelections_ComponentData={ this.state.modificationMass_UserSelections_ComponentData } // Only updated when new updated need to push from above
                            modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class={ this.state.modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class }
                            modificationMass_UserSelections_StateObject={ this.props.propsValue.modificationMass_UserSelections_StateObject } // Updated in the component
                            modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData={ this.state.modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData } // Only updated when new updated need to push from above
                            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass={ this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass } // Updated in the component
                            updateMadeTo_modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_Callback={ this._updateMadeTo_modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_Callback_BindThis }
                            proteinSequenceVersionId={ null }
                            projectSearchIds={ this.props.propsValue.projectSearchIds }
                            proteinNames={ null }
                            proteinDescriptions={ null }
                            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds={ this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds }
                            modificationMass_CommonRounding_ReturnNumber={ modificationMass_CommonRounding_ReturnNumber_Param } // Always passed for Experiment - Made a parameter to make easier to copy this code for Protein Page Single Search
                            updateMadeTo_modificationMass_UserSelections_StateObject_Callback={ this._modificationMass_UserSelections_UpdateMadeTo_StateObject_Callback_BindThis } // this.props.propsValue.modificationMass_UserSelections_StateObject has been updated.
                            update_modificationMass_UserSelections_ComponentData_Callback={ this._modificationMass_Update_modificationMass_UserSelections_ComponentData_Callback_BindThis } // create new this.state.modificationMass_UserSelections_ComponentData
                        />

                        <ReporterIonMass_UserSelections
                            reporterIons_UserSelections_ComponentData={ this.state.reporterIons_UserSelections_ComponentData }
                            modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class={ this.state.modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class }
                            reporterIonMass_UserSelections_StateObject={ this.props.propsValue.reporterIonMass_UserSelections_StateObject }
                            updateMadeTo_reporterIonMass_UserSelections_StateObject_Callback={ this._updateMadeTo_reporterIonMass_UserSelections_StateObject_Callback_BindThis }
                        />

                        <PeptideUnique_UserSelection
                            peptideUnique_UserSelection_ComponentData={ this.state.peptideUnique_UserSelection_ComponentData }
                            peptideUnique_UserSelection_StateObject={ this.props.propsValue.peptideUnique_UserSelection_StateObject }
                            updateMadeTo_peptideUnique_UserSelection_StateObject_Callback={ this._updateMadeTo_peptideUnique_UserSelection_StateObject_Callback_BindThis }
                        />

                        <PeptideSequence_UserSelections
                            peptideSequence_UserSelections_ComponentData={ this.state.peptideSequence_UserSelections_ComponentData }
                            peptideSequence_UserSelections_StateObject={ this.props.propsValue.peptideSequence_UserSelections_StateObject }
                            proteinSequenceString={ null }
                            updateMadeTo_peptideSequence_UserSelections_StateObject_New_UserSearchString_LocationsOn_ProteinSequence_Root_Callback={ null }
                            updateMadeTo_peptideSequence_UserSelections_StateObject_Callback={ this._updateMadeTo_peptideSequence_UserSelections_StateObject_Callback_BindThis }
                        />

                        <ProteinPositionFilter_UserSelections
                            proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data={ this.state.proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data }
                            proteinPositionFilter_UserSelections_Component_Force_ReRender_Object={ this.state.proteinPositionFilter_UserSelections_Component_Force_ReRender_Object }
                            proteinPositionFilter_UserSelections_StateObject={ this.props.propsValue.proteinPositionFilter_UserSelections_StateObject }
                            updateMadeTo_proteinPositionFilter_UserSelections_StateObject_Callback={ this._updateMadeTo_proteinPositionFilter_UserSelections_StateObject_Callback_BindThis }
                        />

                        <ProteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_Root_Component
                            proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject={ this.props.propsValue_QC.proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject }
                            searchContains_VariableModifications={ searchContains_VariableModifications }
                            searchContains_OpenModifications={ searchContains_OpenModifications }
                            updateMadeTo_proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject_Callback={ this._updateMadeTo_generatedPeptideContents_UserSelections_StateObject_Callback_BindThis }
                        />

                    </div>

                </div>

            </React.Fragment>
        )
    }

}
