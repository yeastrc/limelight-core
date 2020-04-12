/**
 * proteinPage_Display_SingleSearch__SingleProtein_MainContent_Component.tsx
 * 
 * Single Protein Main Content:
 * 
 * Main Content of Protein Page - Multiple Searches - Single Protein - Contained inside Component <ProteinPage_Display_SingleSearch_SingleProtein_MainContent_Component>
 * 
 */

import React from 'react'

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { StringDownloadUtils } from 'page_js/data_pages/data_pages_common/downloadStringAsFile';

//   From data_pages_common
import { DataPageStateManager, SearchNames_AsMap }  from 'page_js/data_pages/data_pages_common/dataPageStateManager'; // dataPageStateManager.ts

import { DataPages_LoggedInUser_CommonObjectsFactory } from 'page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory';

import { psm_ReporterIonMasses_FilterOnSelectedValues } from 'page_js/data_pages/data_pages_common/psm_ReporterIonMasses_FilterOnSelectedValues';


import { SearchDetailsAndFilterBlock_MainPage, SearchDetailsAndFilterBlock_MainPage__PopulatePage_Params } from 'page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsAndFilterBlock_MainPage';
import { DataTable_TableRoot } from 'page_js/data_pages/data_table_react/dataTable_TableRoot_React';
import { DataTable_RootTableObject } from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';
import { dataTable_React_convert_DataTableObjects_with_dataTable_DataRowEntries__To_Tab_Delim_String } from 'page_js/data_pages/data_table_react/dataTable_React_convert_DataTableObjects_with_dataTable_DataRowEntries__To_Tab_Delim_String';

import { SaveView_Create_Component_React_Type, SaveView_Create_Component_React_Result } from 'page_js/data_pages/saveView_React/saveView_Create_Component_React_FunctionTemplate'

import { SharePage_Component } from 'page_js/data_pages/sharePage_React/sharePage_Component_React';


// import { psm_ReporterIonMasses_FilterOnSelectedValues } from 'page_js/data_pages/data_pages_common/psm_ReporterIonMasses_FilterOnSelectedValues';


//   Modification Mass Rounding to provide some level of commonality between searches
// import {
// 	modificationMass_CommonRounding_ReturnNumber_Function,
//     modificationMass_CommonRounding_ReturnString_Function,
//     modificationMass_CommonRounding_ReturnNumber, 
//     modificationMass_CommonRounding_ReturnString 
// } from 'page_js/data_pages/modification_mass_common/modification_mass_rounding';

//   Reporter Ion Mass Rounding to provide some level of commonality between searches
// import { 
    // reporterIonMass_CommonRounding_ReturnNumber_Function,
    // reporterIonMass_CommonRounding_ReturnString_Function,
    // reporterIonMass_CommonRounding_ReturnNumber, 
    // reporterIonMass_CommonRounding_ReturnString, 
    // _REPORTER_ION_MASS_DECIMAL_PLACE_ROUNDING_NORMAL_DEFAULT 
// } from 'page_js/data_pages/reporter_ion_mass_common/reporter_ion_mass_rounding';

import { ProteinView_LoadedDataCommonHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder';
import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';

import { SingleProtein_ExpPage_CentralStateManagerObjectClass }	from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_root/js/singleProtein_ExpPage_CentralStateManagerObjectClass';
import { ProteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reported_peptide_ids_for_display/proteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId';


import { ProteinSequenceWidgetDisplay_Component_Data } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/protein_sequence_display_widget/js/proteinSequenceWidgetDisplay_Component_Data';
import { ProteinSequenceWidget_StateObject } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/protein_sequence_display_widget/js/proteinSequenceWidget_StateObject';

import { UserSearchString_LocationsOn_ProteinSequence_Root } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/userSearchString_LocationsOn_ProteinSequence/userSearchString_LocationsOn_ProteinSequence_ComponentData';

import { PeptideSequence_UserSelections_StateObject } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_sequence_selected/js/peptideSequence_UserSelections_StateObject';
import { PeptideSequence_UserSelections_ComponentData } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_sequence_selected/js/peptideSequence_UserSelections_ComponentData';

import { ModificationMass_UserSelections_StateObject } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject';
import { ModificationMass_UserSelections_ComponentData } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/modification_mass_user_selections/js/modificationMass_UserSelections_ComponentData';

import { ReporterIonMass_UserSelections_ComponentData } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reporter_ions_user_selections/js/reporterIonMass_UserSelections_BuildData_ForReactComponent';
import { ReporterIonMass_UserSelections_StateObject } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reporter_ions_user_selections/js/reporterIonMass_UserSelections_StateObject';

import { ModificationMass_UserSelections_Root } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/modification_mass_user_selections/jsx/modificationMass_UserSelections_Root';

import { ReporterIonMass_UserSelections } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reporter_ions_user_selections/jsx/reporterIonMass_UserSelections';

import { PeptideSequence_UserSelections } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_sequence_selected/jsx/peptideSequence_UserSelections';

import { ProteinSequenceWidgetDisplay_Root_Component_React } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/protein_sequence_display_widget/jsx/proteinSequenceWidgetDisplay_Root_Component_React'

import { PeptideFiltersDisplay } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_filters_display/jsx/peptideFiltersDisplay';
import { PeptideFiltersDisplay_ComponentData } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_filters_display/js/peptideFiltersDisplay_ComponentData'


import { getReportedPeptideIdsForDisplay_AllProjectSearchIds } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reported_peptide_ids_for_display/proteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds'


import { 
    downloadPsmsFor_projectSearchIds_FilterCriteria_ExperimentData_RepPeptProtSeqVIds, 
    DownloadPSMs_PerProjectSearchId_Entry, 
    DownloadPSMs_PerReportedPeptideId, 
    DownloadPSMs_PerConditionGroupConditionData 
} from 'page_js/data_pages/experiment_driven_data_pages/common__experiment_driven_data_pages/psm_downloadForCriteria_ExperimentData_OptionalRepPepIdsProtSeqVIds';


////

import { 
    initialPopulate, 
    create_ModificationMass_UserSelections_ComponentData, 
    create_ReporterIons_UserSelections_ComponentData, 
    create_PeptideSequence_UserSelections_ComponentData,
    create_ProteinSequenceWidgetDisplay_Component_Data, 
    load_ReporterIonMasses_IfNeeded,
    LinksToExternalResources
} from './proteinPage_Display_SingleSearch_SingleProtein_MainContent_Component_nonClass_Functions';

import { reportedPeptides_DataTableOjbects_ForSingleSearch_SingleProtein_createChildTableObjects, ReportedPeptides_DataTableObjects_ForSingleSearch_SingleProtein_Result } from '../js/proteinPage_Display_SingleSearch_SingleProtein_ReportedPeptideListSection_Create_TableData'




/////////////////////////

//  Constants

// Min width for outer container. Increase to 1120 to fit 5 digits.
const _OUTERMOST_CONTAINER_MIN_WIDTH = 1120; 

const _BOXES_ON_RIGHT_CONTAINER_WIDTH__SUMMARY_ETC = 229;
const _BOXES_ON_RIGHT_CONTAINER_PADDING_LEFT__SUMMARY_ETC = 20;
// const _BOXES_ON_RIGHT_CONTAINER_PADDING_RIGHT__SUMMARY_ETC = 10;


//////////////////////////////////


/**
 * 
 */
export interface ProteinPage_Display_SingleSearch_SingleProtein_MainContent_Component_closeOverlayClickHandler {
    () : void
}

/**
 * 
 */
export class ProteinPage_Display_SingleSearch_SingleProtein_MainContent_Component_Props_Prop {

    projectSearchId : number;
    projectSearchIds : Array<number>; // projectSearchId in an array of size 1
    proteinSequenceVersionId : number;
    proteinNames : string;
    proteinDescriptions : string
    proteinSequenceString : string

    peptideCountForUnfilteredDisplay : string;
    uniquePeptideCountForUnfilteredDisplay : string;

    loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>; // loadedDataPerProjectSearchIdHolder in Map key projectSearchId
    loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder
    dataPageStateManager : DataPageStateManager
    searchDetailsAndFilterBlock_MainPage : SearchDetailsAndFilterBlock_MainPage

    searchNamesMap_KeyProjectSearchId : SearchNames_AsMap;
    searchDataLookupParamsRoot;
    
    singleProtein_ExpPage_CentralStateManagerObjectClass : SingleProtein_ExpPage_CentralStateManagerObjectClass
    modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject;
	reporterIonMass_UserSelections_StateObject : ReporterIonMass_UserSelections_StateObject;
	peptideSequence_UserSelections_StateObject : PeptideSequence_UserSelections_StateObject;
    proteinSequenceWidget_StateObject : ProteinSequenceWidget_StateObject;
    
    dataPages_LoggedInUser_CommonObjectsFactory : DataPages_LoggedInUser_CommonObjectsFactory
}

/**
 * 
 */
export interface ProteinPage_Display_SingleSearch_SingleProtein_MainContent_Component_Props {

    propsValue : ProteinPage_Display_SingleSearch_SingleProtein_MainContent_Component_Props_Prop

    // view_single_protein_inner_overlay_div
    view_single_protein_inner_overlay_div_Width_Initial : number;
    setWidth__view_single_protein_inner_overlay_div // Function in Root Component Class _setWidth__view_single_protein_inner_overlay_div({ width } : { width : number })

    // view_single_protein_overlay_body
    view_single_protein_overlay_body_PaddingLeft : number
    view_single_protein_overlay_body_PaddingRight : number

}

/**
 * 
 */
interface ProteinPage_Display_SingleSearch_SingleProtein_MainContent_Component_State {

    widthOf_proteinSequenceWidgetDisplay_Component? : number; // Width of <ProteinSequenceWidgetDisplay_Root_Component_React> (assumed to not change after this component mounts)
    
    linksToExternalResources? : LinksToExternalResources;
    protein_fractionCovered_Unfiltered? : number;
    protein_percentageCovered_Unfiltered_Rounded? : string;
    psmCountForUnfilteredDisplay? : string;

    modificationMass_UserSelections_ComponentData? : ModificationMass_UserSelections_ComponentData; // Only updated when new updated need to push new values from above components
    reporterIons_UserSelections_ComponentData? : ReporterIonMass_UserSelections_ComponentData;
    peptideSequence_UserSelections_ComponentData? : PeptideSequence_UserSelections_ComponentData;
    userSearchString_LocationsOn_ProteinSequence_Root? : UserSearchString_LocationsOn_ProteinSequence_Root;
    proteinSequenceWidgetDisplay_Component_Data? : ProteinSequenceWidgetDisplay_Component_Data;
    sequenceCoverageBooleanArray_Unfiltered? : Array<boolean>;
    peptideFiltersDisplay_ComponentData? : PeptideFiltersDisplay_ComponentData;

    reportedPeptideIdsForDisplay_ForPeptideList? : Array<number>;  //  For dispaying the peptide list in sub component

    reportedPeptideList_RootTableObject? :  DataTable_RootTableObject
    
    reportedPeptideList_numberOfReportedPeptides? : number          //  Values related to contents of reportedPeptideList_RootTableObject
    reportedPeptideList_numberOfReportedPeptides_Display? : string
    reportedPeptideList_numberOfPsmsForReportedPeptides? : number
    reportedPeptideList_numberOfPsmsForReportedPeptides_Display? : string

    updating_Next_reportedPeptideIdsForDisplay_Map_KeyProjectSearchId_ForPeptideList? : boolean;

    //  User made a selection that resulted in a AJAX request for data.  Page update for filtered Peptides will wait for the AJAX to complete.  Display message loading data.
    gettingDataFor_Filtering_reportedPeptideIdsForDisplay? : boolean;

    saveView_Component_React? //  React Component for Save View
    saveView_Component_Props_Prop? //  Object passed to saveView_Component_React as property propsValue
}

/**
 * 
 */
export class ProteinPage_Display_SingleSearch_SingleProtein_MainContent_Component extends React.Component< ProteinPage_Display_SingleSearch_SingleProtein_MainContent_Component_Props, ProteinPage_Display_SingleSearch_SingleProtein_MainContent_Component_State > {

    //  bind to 'this' for passing as parameters

    private _resizeWindow_Handler_BindThis = this._resizeWindow_Handler.bind(this);

    private _downloadPeptides_All_ClickHandler_BindThis = this._downloadPeptides_All_ClickHandler.bind(this);
    private _downloadPeptides_Shown_ClickHandler_BindThis = this._downloadPeptides_Shown_ClickHandler.bind(this);
    private _downloadPsms_All_ClickHandler_BindThis = this._downloadPsms_All_ClickHandler.bind(this);
    private _downloadPsms_Shown_ClickHandler_BindThis = this._downloadPsms_Shown_ClickHandler.bind(this);

    private _clearAllSelections_BindThis = this._clearAllSelections.bind(this);

    private _modificationMass_UserSelections_UpdateMadeTo_StateObject_Callback_BindThis : () => void = this._modificationMass_UserSelections_UpdateMadeTo_StateObject_Callback.bind(this);
    private _modificationMass_Update_modificationMass_UserSelections_ComponentData_Callback_BindThis : () => void = this._modificationMass_Update_modificationMass_UserSelections_ComponentData_Callback.bind(this);

    private _updateMadeTo_reporterIonMass_UserSelections_StateObject_Callback_BindThis : () => void = this._updateMadeTo_reporterIonMass_UserSelections_StateObject_Callback.bind(this);
    
    private _updateMadeTo_peptideSequence_UserSelections_StateObject_New_UserSearchString_LocationsOn_ProteinSequence_Root_Callback_BindThis : ({ 
        userSearchString_LocationsOn_ProteinSequence_Root 
    } : { 
        userSearchString_LocationsOn_ProteinSequence_Root : UserSearchString_LocationsOn_ProteinSequence_Root
    }) => void = this._updateMadeTo_peptideSequence_UserSelections_StateObject_New_UserSearchString_LocationsOn_ProteinSequence_Root.bind(this);

    private _updateMadeTo_proteinSequenceWidgetDisplay_UserSelections_StateObject_Callback_BindThis : () => void = this._updateMadeTo_proteinSequenceWidgetDisplay_UserSelections_StateObject_Callback.bind(this);

    private _load_ReporterIonMasses_InProgress = false;  //  Flag that Loading Reporter Ion Masses is In Progress

    private _div_MainGridAtTop_Ref : React.RefObject<HTMLDivElement>; //  React.createRef()  for Main <div> containing grid of left and on right the boxes Summary ...
    private _div_MainContent_LeftGridEntry_AtTop_Ref : React.RefObject<HTMLDivElement>; //  React.createRef()  for Left <div> inside this._div_MainGridAtTop_Ref

    private _div_SearchDetailsContainer_Ref : React.RefObject<HTMLTableSectionElement>; //  React.createRef()  for  <div> Contain Search Details
    private _proteinSequenceWidgetDisplay_Root_Component_React_Container_Ref : React.RefObject<HTMLDivElement>; //  React.createRef()  for container <div> around <ProteinSequenceWidgetDisplay_Root_Component_React>

    private _proteinPage_Display_SingleSearch__SingleProtein_GeneratedReportedPeptideListSection_Component_React_Container_Ref : React.RefObject<HTMLDivElement>; //  React.createRef()  for container <div> around <ProteinPage_Display_SingleSearch_SingleProtein_GeneratedReportedPeptideListSection_Component>

    private _domMutationObserver_reported_peptides_outer_container : MutationObserver;

    private _updated_OverlayWidth = undefined;  // Updated whenever call function in parent Component to update width of overlay

    private _width_LeftGridEntry_TopMainSection_LastUpdatedValue = undefined;  // Updated whenever update width left grid entry Top Main Section

    /**
     * 
     */    
    constructor(props : ProteinPage_Display_SingleSearch_SingleProtein_MainContent_Component_Props) {
        super(props);

        this._div_MainGridAtTop_Ref = React.createRef<HTMLDivElement>();
        this._div_MainContent_LeftGridEntry_AtTop_Ref = React.createRef<HTMLDivElement>();

        this._div_SearchDetailsContainer_Ref = React.createRef<HTMLTableSectionElement>();
        this._proteinSequenceWidgetDisplay_Root_Component_React_Container_Ref = React.createRef<HTMLDivElement>();

        this._proteinPage_Display_SingleSearch__SingleProtein_GeneratedReportedPeptideListSection_Component_React_Container_Ref = React.createRef<HTMLDivElement>();

        const {
            linksToExternalResources,
            protein_fractionCovered_Unfiltered,
            psmCountForUnfiltered,
            modificationMass_UserSelections_ComponentData,
            reporterIons_UserSelections_ComponentData,
            peptideSequence_UserSelections_ComponentData,
            userSearchString_LocationsOn_ProteinSequence_Root,
            proteinSequenceWidgetDisplay_Component_Data,
            sequenceCoverageBooleanArray_Unfiltered,
            reportedPeptideIdsForDisplay

        } :  {
            linksToExternalResources : LinksToExternalResources,
            protein_fractionCovered_Unfiltered : number,
            psmCountForUnfiltered : number,
            modificationMass_UserSelections_ComponentData : ModificationMass_UserSelections_ComponentData,
            reporterIons_UserSelections_ComponentData : ReporterIonMass_UserSelections_ComponentData,
            peptideSequence_UserSelections_ComponentData : PeptideSequence_UserSelections_ComponentData,
            userSearchString_LocationsOn_ProteinSequence_Root : UserSearchString_LocationsOn_ProteinSequence_Root,
            proteinSequenceWidgetDisplay_Component_Data : ProteinSequenceWidgetDisplay_Component_Data,
            sequenceCoverageBooleanArray_Unfiltered : Array<boolean>,
            reportedPeptideIdsForDisplay : Array<number>

        }  = initialPopulate({

            proteinSequenceVersionId : this.props.propsValue.proteinSequenceVersionId,
            proteinSequenceString : this.props.propsValue.proteinSequenceString,
            projectSearchId : this.props.propsValue.projectSearchId,
            loadedDataPerProjectSearchIdHolder : this.props.propsValue.loadedDataPerProjectSearchIdHolder,
            loadedDataCommonHolder : this.props.propsValue.loadedDataCommonHolder,
            modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
            reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
            peptideSequence_UserSelections_StateObject : this.props.propsValue.peptideSequence_UserSelections_StateObject,
            proteinSequenceWidget_StateObject : this.props.propsValue.proteinSequenceWidget_StateObject
        });


        const peptideFiltersDisplay_ComponentData : PeptideFiltersDisplay_ComponentData = {
            modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
            reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
            peptideSequence_UserSelections_StateObject : this.props.propsValue.peptideSequence_UserSelections_StateObject,
            proteinSequenceWidget_StateObject : this.props.propsValue.proteinSequenceWidget_StateObject
        };

        let protein_percentageCovered_Unfiltered_Rounded = ( protein_fractionCovered_Unfiltered * 100 ).toFixed( 1 );

        if ( protein_percentageCovered_Unfiltered_Rounded.endsWith(".0" ) ) {
            protein_percentageCovered_Unfiltered_Rounded = protein_fractionCovered_Unfiltered.toString();
        }

        const psmCountForUnfilteredDisplay = psmCountForUnfiltered.toLocaleString();
        
        //  Data for Reported Peptide List Table

        let reportedPeptideList_RootTableObject : DataTable_RootTableObject = null;
        let reportedPeptideList_numberOfReportedPeptides : number = 0;
        let reportedPeptideList_numberOfPsmsForReportedPeptides : number = 0;

        if ( reportedPeptideIdsForDisplay.length > 0 ) {

            const reportedPeptides_DataTableObjects_ForSingleSearch_SingleProtein_Result : ReportedPeptides_DataTableObjects_ForSingleSearch_SingleProtein_Result = (
                reportedPeptides_DataTableOjbects_ForSingleSearch_SingleProtein_createChildTableObjects({
                    projectSearchId : this.props.propsValue.projectSearchId,
                    reportedPeptideIds : new Set( reportedPeptideIdsForDisplay ),
                    reporterIonMassesSelected : this.props.propsValue.reporterIonMass_UserSelections_StateObject.get_ReporterIonssSelected(),
                    searchDataLookupParamsRoot : this.props.propsValue.searchDataLookupParamsRoot,
                    loadedDataPerProjectSearchIdHolder : this.props.propsValue.loadedDataPerProjectSearchIdHolder,
                    loadedDataCommonHolder : this.props.propsValue.loadedDataCommonHolder,
                    dataPageStateManager : this.props.propsValue.dataPageStateManager
                })
            );

            reportedPeptideList_RootTableObject = reportedPeptides_DataTableObjects_ForSingleSearch_SingleProtein_Result.dataTable_RootTableObject;
            reportedPeptideList_numberOfReportedPeptides = reportedPeptides_DataTableObjects_ForSingleSearch_SingleProtein_Result.numberOfReportedPeptides;
            reportedPeptideList_numberOfPsmsForReportedPeptides = reportedPeptides_DataTableObjects_ForSingleSearch_SingleProtein_Result.numberOfPsmsForReportedPeptides;
        }

        let reportedPeptideList_numberOfReportedPeptides_Display : string = reportedPeptideList_numberOfReportedPeptides.toString();
        let reportedPeptideList_numberOfPsmsForReportedPeptides_Display : string = reportedPeptideList_numberOfPsmsForReportedPeptides.toString();

        try {
            reportedPeptideList_numberOfReportedPeptides_Display = reportedPeptideList_numberOfReportedPeptides.toLocaleString();
        } catch (e) {
            console.warn("calling reportedPeptideList_numberOfReportedPeptides.toLocaleString(); failed", e)
        }
        try {
            reportedPeptideList_numberOfPsmsForReportedPeptides_Display = reportedPeptideList_numberOfPsmsForReportedPeptides.toLocaleString();
        } catch (e) {
            console.warn("calling reportedPeptideList_numberOfPsmsForReportedPeptides.toLocaleString(); failed", e)
        }

        let saveView_Component_React = undefined;
        let saveView_Component_Props_Prop = undefined;

        if ( props.propsValue.dataPages_LoggedInUser_CommonObjectsFactory ) {

            if ( props.propsValue.dataPages_LoggedInUser_CommonObjectsFactory.getFunctionToGet_SaveView_dataPages_ComponentAndProps ) {
                const saveView_Create_Component_React_Type : SaveView_Create_Component_React_Type = (
                    props.propsValue.dataPages_LoggedInUser_CommonObjectsFactory.getFunctionToGet_SaveView_dataPages_ComponentAndProps()
                );
                
                const enableSetDefault = false; // false since Single Protein Overlay

                const result : SaveView_Create_Component_React_Result = saveView_Create_Component_React_Type({ projectSearchIds : props.propsValue.projectSearchIds, experimentId : undefined, enableSetDefault });
                saveView_Component_React = result.saveView_Component_React
                saveView_Component_Props_Prop = result.saveView_Component_Props_Prop
            }
        }

        this.state = { 
            widthOf_proteinSequenceWidgetDisplay_Component : 787, // Initial Width for component to handle sequence length of 1500
            linksToExternalResources,
            protein_fractionCovered_Unfiltered,
            protein_percentageCovered_Unfiltered_Rounded,
            psmCountForUnfilteredDisplay,
            modificationMass_UserSelections_ComponentData, 
            reporterIons_UserSelections_ComponentData, 
            peptideSequence_UserSelections_ComponentData,
            userSearchString_LocationsOn_ProteinSequence_Root, 
            proteinSequenceWidgetDisplay_Component_Data,
            sequenceCoverageBooleanArray_Unfiltered,
            reportedPeptideIdsForDisplay_ForPeptideList: reportedPeptideIdsForDisplay,
            reportedPeptideList_RootTableObject,
            reportedPeptideList_numberOfReportedPeptides,
            reportedPeptideList_numberOfReportedPeptides_Display,
            reportedPeptideList_numberOfPsmsForReportedPeptides,
            reportedPeptideList_numberOfPsmsForReportedPeptides_Display,
            peptideFiltersDisplay_ComponentData,
            saveView_Component_React, 
            saveView_Component_Props_Prop
        };
    }

    /**
     * 
     */   
    componentDidMount() {
        try {
            {
                this.props.propsValue.searchDetailsAndFilterBlock_MainPage.initialize({ rootElementJQuerySelectorToSearchUnderForDOMElementInsertInto : undefined });

                const params : SearchDetailsAndFilterBlock_MainPage__PopulatePage_Params = {
                    filter_section_HTMLElement : this._div_SearchDetailsContainer_Ref.current
                }

                this.props.propsValue.searchDetailsAndFilterBlock_MainPage.populatePage( params )
            }

            //  Get width of contained <ProteinSequenceWidgetDisplay_Root_Component_React>  (assumed to not change after this component mounts)

            const proteinSequenceWidgetDisplay_Root_Component_React_Container_Ref_DOM = this._proteinSequenceWidgetDisplay_Root_Component_React_Container_Ref.current;

            const containerRect = proteinSequenceWidgetDisplay_Root_Component_React_Container_Ref_DOM.getBoundingClientRect();

            const containerRect_Width = Math.ceil( containerRect.width );
            // const containerRect_Height = containerRect.height;

            this.setState( (state: ProteinPage_Display_SingleSearch_SingleProtein_MainContent_Component_State, props: ProteinPage_Display_SingleSearch_SingleProtein_MainContent_Component_Props ) : ProteinPage_Display_SingleSearch_SingleProtein_MainContent_Component_State => {

                if ( state.widthOf_proteinSequenceWidgetDisplay_Component >= containerRect_Width ) {
                    //  Already >= containerRect_Width so no change
                    return null;
                }

                return { widthOf_proteinSequenceWidgetDisplay_Component : containerRect_Width }
            });

            this._resize_OverlayWidth_BasedOnReportedPeptidesTableWidth();

            this._add_MutationObserver_To_reported_peptides_outer_container_For_MakingWidthChangesAsNeeded();

            this._adjustBoxesOnRight_So_AtRigthtEdgeOfViewPort();

            this._resizeWindow_Handler_Attach();

        } catch( e ) {
			console.log("Exception caught in _resizeWindow_Handler()");
			console.log( e );
			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
			throw e;
		}
    }

    /**
     * 
     */   
    componentWillUnmount() {
        try {
            {
                const $container = $( this._div_SearchDetailsContainer_Ref.current )
                $container.empty()
            }
            this._resizeWindow_Handler_Remove();

            this._remove_MutationObserver_From_reported_peptides_outer_container();
            
        } catch( e ) {
			console.log("Exception caught in _resizeWindow_Handler()");
			console.log( e );
			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
			throw e;
		}
    }

	/**
	 * 
	 */
	private _resizeWindow_Handler_Attach() : void {

		//  Attach resize handler
		window.addEventListener( "resize", this._resizeWindow_Handler_BindThis );
	}

	/**
	 * 
	 */
	private _resizeWindow_Handler_Remove() : void {

		//  Remove resize handler
		window.removeEventListener( "resize", this._resizeWindow_Handler_BindThis );
	}
	
	/**
	 * copied to this._resizeWindow_Handler_BindThis = this._resizeWindow_Handler.bind(this) in constructor
	 */
	private _resizeWindow_Handler() : void {
		try {
			this._adjustBoxesOnRight_So_AtRigthtEdgeOfViewPort();

		} catch( e ) {
			console.log("Exception caught in _resizeWindow_Handler()");
			console.log( e );
			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
			throw e;
		}
	}

	/**
	 * 
	 */
	_downloadPeptides_All_ClickHandler( event : React.MouseEvent<HTMLHeadingElement, MouseEvent> ) : void {

        const projectSearchId = this.props.propsValue.projectSearchId;

        const proteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId = new ProteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId({
            forSingleSearch : true,
            forMultipleSearch : false,
            proteinSequenceVersionId : this.props.propsValue.proteinSequenceVersionId,
            loadedDataCommonHolder : this.props.propsValue.loadedDataCommonHolder,
            proteinSequenceWidget_StateObject : this.props.propsValue.proteinSequenceWidget_StateObject,
            modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
            reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
            userSearchString_LocationsOn_ProteinSequence_Root : this.state.userSearchString_LocationsOn_ProteinSequence_Root
        });
    
        const getReportedPeptideIdsForDisplay_SingleProjectSearchId_Result = (
            proteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId.
            getReportedPeptideIdsForDisplay_SingleProjectSearchId({
                not_filtered_position_modification_selections : true, //  true since download all / unfiltered
                loadedDataPerProjectSearchIdHolder : this.props.propsValue.loadedDataPerProjectSearchIdHolder,
                projectSearchId : projectSearchId
            })
        );

        const reportedPeptideIdsForDisplay : Array<number> = getReportedPeptideIdsForDisplay_SingleProjectSearchId_Result.reportedPeptides_Filtered_Array;

        const reportedPeptides_DataTableObjects_ForSingleSearch_SingleProtein_Result : ReportedPeptides_DataTableObjects_ForSingleSearch_SingleProtein_Result = (
            reportedPeptides_DataTableOjbects_ForSingleSearch_SingleProtein_createChildTableObjects({
                projectSearchId : this.props.propsValue.projectSearchId,
                reportedPeptideIds : new Set( reportedPeptideIdsForDisplay ),
                reporterIonMassesSelected : this.props.propsValue.reporterIonMass_UserSelections_StateObject.get_ReporterIonssSelected(),
                searchDataLookupParamsRoot : this.props.propsValue.searchDataLookupParamsRoot,
                loadedDataPerProjectSearchIdHolder : this.props.propsValue.loadedDataPerProjectSearchIdHolder,
                loadedDataCommonHolder : this.props.propsValue.loadedDataCommonHolder,
                dataPageStateManager : this.props.propsValue.dataPageStateManager
            })
        );

        const reportedPeptideList_RootTableObject = reportedPeptides_DataTableObjects_ForSingleSearch_SingleProtein_Result.dataTable_RootTableObject;

        const tableDataRootObject = reportedPeptideList_RootTableObject.tableDataObject;

        const tableDataAsString = (
            dataTable_React_convert_DataTableObjects_with_dataTable_DataRowEntries__To_Tab_Delim_String({ tableDataRootObject })
        )

        StringDownloadUtils.downloadStringAsFile({ stringToDownload : tableDataAsString, filename: 'peptides_for_protein.txt' });
	}

	/**
	 * 
	 */
	_downloadPeptides_Shown_ClickHandler( event : React.MouseEvent<HTMLHeadingElement, MouseEvent> ) : void {

        const reportedPeptideList_RootTableObject = this.state.reportedPeptideList_RootTableObject;

        if ( !reportedPeptideList_RootTableObject  ) {

            window.alert("No Peptides to Download")
            return; // EARLY RETURN
        }
        
        if ( reportedPeptideList_RootTableObject ) {

            const tableDataRootObject = reportedPeptideList_RootTableObject.tableDataObject;

            const tableDataAsString = (
                dataTable_React_convert_DataTableObjects_with_dataTable_DataRowEntries__To_Tab_Delim_String({ tableDataRootObject })
            )

            StringDownloadUtils.downloadStringAsFile({ stringToDownload : tableDataAsString, filename: 'peptides_for_protein.txt' });
        }
    }
    

	
    /**
     * Download ALL PSMs for Protein based on current cutoff/filter criteria.  
	 * 
	 * Open URL in new window to download from server
     */    
    _downloadPsms_All_ClickHandler( event : React.MouseEvent<HTMLHeadingElement, MouseEvent> ) : void {
        try {

            const proteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId = new ProteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId({
                forSingleSearch : true,
                forMultipleSearch : false,
                proteinSequenceVersionId : this.props.propsValue.proteinSequenceVersionId,
                loadedDataCommonHolder : this.props.propsValue.loadedDataCommonHolder,
                proteinSequenceWidget_StateObject : this.props.propsValue.proteinSequenceWidget_StateObject,
                modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
                reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
                userSearchString_LocationsOn_ProteinSequence_Root : this.state.userSearchString_LocationsOn_ProteinSequence_Root
            });
        
            const getReportedPeptideIdsForDisplay_SingleProjectSearchId_Result = (
                proteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId.
                getReportedPeptideIdsForDisplay_SingleProjectSearchId({
                    not_filtered_position_modification_selections : true, //  true since download all / unfiltered
                    loadedDataPerProjectSearchIdHolder : this.props.propsValue.loadedDataPerProjectSearchIdHolder,
                    projectSearchId : this.props.propsValue.projectSearchId
                })
            );

            const reportedPeptideIdsForDisplay : Array<number> = getReportedPeptideIdsForDisplay_SingleProjectSearchId_Result.reportedPeptides_Filtered_Array;

            //  Build data for serializing to JSON

            const projectSearchIdsReportedPeptideIdsPsmIds : Array<DownloadPSMs_PerProjectSearchId_Entry> = [];

            const reportedPeptideIdsAndTheirPsmIds = [];

            for ( const reportedPeptideId of reportedPeptideIdsForDisplay ) {

                const reportedPeptideIdsAndTheirPsmIdsEntry = { reportedPeptideId };
                reportedPeptideIdsAndTheirPsmIds.push( reportedPeptideIdsAndTheirPsmIdsEntry );
            }

            const projectSearchIdsReportedPeptideIdsPsmIds_Entry = { projectSearchId : this.props.propsValue.projectSearchId, reportedPeptideIdsAndTheirPsmIds };
            projectSearchIdsReportedPeptideIdsPsmIds.push( projectSearchIdsReportedPeptideIdsPsmIds_Entry );

            if ( projectSearchIdsReportedPeptideIdsPsmIds.length === 0 ) {
                throw Error(
                    "_downloadPsmsClickHandler_All: No reportedPeptideIds for projectSearchId for proteinSequenceVersionId: " 
                    + this.props.propsValue.proteinSequenceVersionId 
                    + ", projectSearchId: " + this.props.propsValue.projectSearchId
                );
            }
            
            this._downloadPsms( { projectSearchIdsReportedPeptideIdsPsmIds } );

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }


	/**
	 * Download PSMs for Shown Reported Peptides for Protein based on current cutoff/filter criteria.  
	 * 
	 * Open URL in new window to download from server
	 */   
    _downloadPsms_Shown_ClickHandler( event : React.MouseEvent<HTMLHeadingElement, MouseEvent> ) : void {
        try {

            const projectSearchId = this.props.propsValue.projectSearchId;

            const proteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId = new ProteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId({
                forSingleSearch : true,
                forMultipleSearch : false,
                proteinSequenceVersionId : this.props.propsValue.proteinSequenceVersionId,
                loadedDataCommonHolder : this.props.propsValue.loadedDataCommonHolder,
                proteinSequenceWidget_StateObject : this.props.propsValue.proteinSequenceWidget_StateObject,
                modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
                reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
                userSearchString_LocationsOn_ProteinSequence_Root : this.state.userSearchString_LocationsOn_ProteinSequence_Root
            });
        
            const getReportedPeptideIdsForDisplay_SingleProjectSearchId_Result = (
                proteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId.
                getReportedPeptideIdsForDisplay_SingleProjectSearchId({
                    not_filtered_position_modification_selections : false, //  false since NOT download all / unfiltered
                    loadedDataPerProjectSearchIdHolder : this.props.propsValue.loadedDataPerProjectSearchIdHolder,
                    projectSearchId : projectSearchId
                })
            );

            const reportedPeptideIdsForDisplay : Array<number> = getReportedPeptideIdsForDisplay_SingleProjectSearchId_Result.reportedPeptides_Filtered_Array;


            //  Set
            const reporterIonMassesSelected = this.props.propsValue.reporterIonMass_UserSelections_StateObject.get_ReporterIonssSelected();

            let haveValuesIn_reporterIonMassesSelected = false;

            if ( reporterIonMassesSelected && reporterIonMassesSelected.size !== 0 ) {
                
                //  YES reporterIonMassesSelected.  Send PSM Ids as filtered.
                haveValuesIn_reporterIonMassesSelected = true;
            }

            //  Build data for serializing to JSON

            const projectSearchIdsReportedPeptideIdsPsmIds = [];

            {
                const loadedDataPerProjectSearchIdHolder = this.props.propsValue.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );

                let psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs = undefined;

                if ( haveValuesIn_reporterIonMassesSelected ) {

                    psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs = loadedDataPerProjectSearchIdHolder.get_psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs();
                    if ( ! psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs ) {
                        const msg = "haveValuesIn_reporterIonMassesSelected is true but no value in loadedDataPerProjectSearchIdHolder.get_psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs(). projectSearchId: " + projectSearchId;
                        console.warn( msg );
                        throw Error( msg );
                    }
                }

                const reportedPeptideIdsAndTheirPsmIds = [];

                for ( const reportedPeptideId of reportedPeptideIdsForDisplay ) {
                    
                    if ( haveValuesIn_reporterIonMassesSelected ) {

                        //  Yes Filtered on Reporter Ion Masses so Yes passing PSM IDs to filter on

                        if ( ! psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs ) {
                            const msg = "haveValuesIn_reporterIonMassesSelected is true but no value in psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs. projectSearchId: " + projectSearchId;
                            console.warn( msg );
                            throw Error( msg );
                        }

                        const psmReporterIonMassesPerPSM_ForPsmIdMap_Object = psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs.get( reportedPeptideId );

                        if ( ! psmReporterIonMassesPerPSM_ForPsmIdMap_Object ) {
                            
                            // No data for this reported peptide

                            continue;  //  EARLY CONTINUE
                        }
        
                        const psmReporterIonMassesPerPSM_ForPsmIdMap = psmReporterIonMassesPerPSM_ForPsmIdMap_Object.psmReporterIonMassesPerPSM_ForPsmIdMap;
        
                        const psm_ReporterIonMasses_FilterOnSelectedValues_Result = (  // Call External Function
                            psm_ReporterIonMasses_FilterOnSelectedValues({ reporterIonMassesSelected, psmReporterIonMassesPerPSM_ForPsmIdMap, returnPsmIds : true, reporterIonMassTransformer : undefined })
                        );

                        const reportedPeptideIdAndPsmIds = {
                            reportedPeptideId,
                            psmIds : psm_ReporterIonMasses_FilterOnSelectedValues_Result.psmIds
                        };
        
                        reportedPeptideIdsAndTheirPsmIds.push( reportedPeptideIdAndPsmIds );

                    } else {

                        //  Not Filtered on Reporter Ion Masses so No passing PSM IDs to filter on

                        const reportedPeptideIdsAndTheirPsmIdsEntry = { reportedPeptideId };
                        reportedPeptideIdsAndTheirPsmIds.push( reportedPeptideIdsAndTheirPsmIdsEntry );
                    }
                }

                const projectSearchIdsReportedPeptideIdsPsmIds_Entry = { projectSearchId, reportedPeptideIdsAndTheirPsmIds };
                projectSearchIdsReportedPeptideIdsPsmIds.push( projectSearchIdsReportedPeptideIdsPsmIds_Entry );
            }

            if ( projectSearchIdsReportedPeptideIdsPsmIds.length === 0 ) {
                throw Error(
                    "_downloadPsms_Shown_ClickHandler: No reportedPeptideIds for projectSearchId for proteinSequenceVersionId: " 
                    + this.props.propsValue.proteinSequenceVersionId 
                    + ", projectSearchId: " + projectSearchId
                );
            }
            
            this._downloadPsms( { projectSearchIdsReportedPeptideIdsPsmIds } );

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
	}
	
	/**
	 * Download PSMs for Protein.  
	 * 
	 * Don't have all PSMs in memory and may be many so open URL in new window to download from server
	 */
	_downloadPsms( { projectSearchIdsReportedPeptideIdsPsmIds } ) {

        downloadPsmsFor_projectSearchIds_FilterCriteria_ExperimentData_RepPeptProtSeqVIds( {  // External Function
            experimentId : undefined,
			projectSearchIdsReportedPeptideIdsPsmIds,
			searchDataLookupParamsRoot : this.props.propsValue.searchDataLookupParamsRoot,
			proteinSequenceVersionIds : undefined  //  Already filtered to reported peptide ids for this proteinSequenceVersionId
		} );
    }
    
    //////////////////

    /**
     * Clear All Selections
     * 
     */
    _clearAllSelections() {
        try {
            this.props.propsValue.modificationMass_UserSelections_StateObject.clear_selectedModifications();

            this.props.propsValue.reporterIonMass_UserSelections_StateObject.clear_selectedReporterIons();
        
            this.props.propsValue.peptideSequence_UserSelections_StateObject.clearPeptideSearchStrings();
        
            //     In ProteinViewPage_RootClass_Common, the data in private _proteinSequenceWidget_StateObject is transfered to object of class SingleProtein_CentralStateManagerObjectClass which interfaces with centralPageStateManager
            
            this.props.propsValue.proteinSequenceWidget_StateObject.clear_selectedProteinSequencePositions();

            //  Update URL and Page

            window.setTimeout( () => {
                try {
                    this._selectedModificationsChange_UpdateURL();  //  Update URL
                    this._reporterIonMassesChange_UpdateURL();  //  Update URL
                    this._selectedPeptideSequenceChange_UpdateURL();  //  Update URL
                    this._selectedProteinPositionsChange_UpdateURL();

                    window.setTimeout( () => {
                        try {
                            this._modificationMass_Update_modificationMass_UserSelections_ComponentData();
            
                            this._reporterIonMass_Update_reporterIonMass_UserSelections_ComponentData();
            
                            this._peptideSequence_Update_peptideSequence_UserSelections_ComponentData();
            
                            this._proteinSequenceWidgetDisplay_Update_proteinSequenceWidgetDisplay_Component_Data();

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
     * Change was made to modification selection.  this.props.propsValue.modificationMass_UserSelections_StateObject has been updated
     * 
     * Not called if this._modificationMass_Update_modificationMass_UserSelections_ComponentData_Callback() is called
     */
    _modificationMass_UserSelections_UpdateMadeTo_StateObject_Callback() : void {
        try {
            window.setTimeout( () => {
                try {
                    this._selectedModificationsChange_UpdateURL();  //  Update URL

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

                    window.setTimeout( () => {
                        try {
                            this._modificationMass_Update_modificationMass_UserSelections_ComponentData();

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
     * create new this.state.modificationMass_UserSelections_ComponentData
     */ 
    _modificationMass_Update_modificationMass_UserSelections_ComponentData() {

        const modificationMass_UserSelections_ComponentData : ModificationMass_UserSelections_ComponentData = create_ModificationMass_UserSelections_ComponentData({
            modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
            proteinSequenceVersionId : this.props.propsValue.proteinSequenceVersionId,
            projectSearchId : this.props.propsValue.projectSearchId,
            loadedDataPerProjectSearchIdHolder : this.props.propsValue.loadedDataPerProjectSearchIdHolder
        })

        this.setState( (state: ProteinPage_Display_SingleSearch_SingleProtein_MainContent_Component_State, props: ProteinPage_Display_SingleSearch_SingleProtein_MainContent_Component_Props ) : ProteinPage_Display_SingleSearch_SingleProtein_MainContent_Component_State => {

            return { modificationMass_UserSelections_ComponentData };
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

                    if ( this._load_ReporterIonMasses_InProgress ) {

                        //  Already loading Reporter Ion Masses so exit.
                        //   *  When the existing Promise for loading Reporter Ion Masses, the page will be updated for the current selection change as well.

                        return; // EARLY RETURN
                    }
                    
                    let promise = undefined;

                    if ( this.props.propsValue.reporterIonMass_UserSelections_StateObject.is_Any_ReporterIons_Selected() ) {
                
                        promise = load_ReporterIonMasses_IfNeeded({     
                            proteinSequenceVersionId : this.props.propsValue.proteinSequenceVersionId,
                            projectSearchIds : this.props.propsValue.projectSearchIds,
                            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.props.propsValue.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                            loadedDataCommonHolder : this.props.propsValue.loadedDataCommonHolder,
                            searchDataLookupParamsRoot : this.props.propsValue.searchDataLookupParamsRoot
                        });
                    }

                    if ( promise ) {
                        this._load_ReporterIonMasses_InProgress = true;

                        // console.log("_updateMadeTo_reporterIonMass_UserSelections_StateObject_Callback(): Loading Reporter Ion Masses so display Loading Data Message");
                        this.setState( (state: ProteinPage_Display_SingleSearch_SingleProtein_MainContent_Component_State, props: ProteinPage_Display_SingleSearch_SingleProtein_MainContent_Component_Props ) : ProteinPage_Display_SingleSearch_SingleProtein_MainContent_Component_State => {

                            return { gettingDataFor_Filtering_reportedPeptideIdsForDisplay : true };
                        });
                        
                        //  Show loading message for peptide list since may take time to load new values from DB
                        // reportedPeptideList_ShowLoadingMessage();

                        promise.catch( (reason) => {
                            try {
                                this._load_ReporterIonMasses_InProgress = false;

                                this.setState( (state: ProteinPage_Display_SingleSearch_SingleProtein_MainContent_Component_State, props: ProteinPage_Display_SingleSearch_SingleProtein_MainContent_Component_Props ) : ProteinPage_Display_SingleSearch_SingleProtein_MainContent_Component_State => {

                                    return { gettingDataFor_Filtering_reportedPeptideIdsForDisplay : false };
                                });
                            } catch( e ) {
                                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                throw e;
                            }
                        });

                        promise.then( (result) => {
                            try {
                                this._load_ReporterIonMasses_InProgress = false;

                                this.setState( (state: ProteinPage_Display_SingleSearch_SingleProtein_MainContent_Component_State, props: ProteinPage_Display_SingleSearch_SingleProtein_MainContent_Component_Props ) : ProteinPage_Display_SingleSearch_SingleProtein_MainContent_Component_State => {

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

    /**
     * create new this.state.modificationMass_UserSelections_ComponentData
     */ 
    _reporterIonMass_Update_reporterIonMass_UserSelections_ComponentData() {

        const reporterIons_UserSelections_ComponentData : ReporterIonMass_UserSelections_ComponentData = create_ReporterIons_UserSelections_ComponentData({
            reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
            proteinSequenceVersionId : this.props.propsValue.proteinSequenceVersionId,
            projectSearchId : this.props.propsValue.projectSearchId,
            loadedDataPerProjectSearchIdHolder : this.props.propsValue.loadedDataPerProjectSearchIdHolder
        });

        this.setState( (state: ProteinPage_Display_SingleSearch_SingleProtein_MainContent_Component_State, props: ProteinPage_Display_SingleSearch_SingleProtein_MainContent_Component_Props ) : ProteinPage_Display_SingleSearch_SingleProtein_MainContent_Component_State => {

            return { reporterIons_UserSelections_ComponentData };
        });
    }

    /**
     * Change to peptide string selection, this.props.propsValue.peptideSequence_UserSelections_StateObject
     */ 
    _updateMadeTo_peptideSequence_UserSelections_StateObject_New_UserSearchString_LocationsOn_ProteinSequence_Root({ 
        userSearchString_LocationsOn_ProteinSequence_Root 
    } : { 
        userSearchString_LocationsOn_ProteinSequence_Root : UserSearchString_LocationsOn_ProteinSequence_Root
    }) : void {
        try {
            window.setTimeout( () => {
                try {
                    this._selectedPeptideSequenceChange_UpdateURL();  //  Update URL

                    window.setTimeout( () => {
                        try {
                            this.setState( (state: ProteinPage_Display_SingleSearch_SingleProtein_MainContent_Component_State, props: ProteinPage_Display_SingleSearch_SingleProtein_MainContent_Component_Props ) : ProteinPage_Display_SingleSearch_SingleProtein_MainContent_Component_State => {

                                return { userSearchString_LocationsOn_ProteinSequence_Root };
                            });

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

        const peptideSequence_UserSelections_ComponentData : PeptideSequence_UserSelections_ComponentData = create_PeptideSequence_UserSelections_ComponentData({
            peptideSequence_UserSelections_StateObject : this.props.propsValue.peptideSequence_UserSelections_StateObject
        });

        this.setState( (state: ProteinPage_Display_SingleSearch_SingleProtein_MainContent_Component_State, props: ProteinPage_Display_SingleSearch_SingleProtein_MainContent_Component_Props ) : ProteinPage_Display_SingleSearch_SingleProtein_MainContent_Component_State => {

            return { peptideSequence_UserSelections_ComponentData };
        });
    }

    /**
     * Change to protein sequence position selection
     */ 
    _updateMadeTo_proteinSequenceWidgetDisplay_UserSelections_StateObject_Callback() : void {
        try {
            // let newSelection = false;
            
            window.setTimeout( () => {
                try {
                    this._selectedProteinPositionsChange_UpdateURL();

                    window.setTimeout( () => {
                        try {
                            this._proteinSequenceWidgetDisplay_Update_proteinSequenceWidgetDisplay_Component_Data();
        
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
     * create new this.state.proteinSequenceWidgetDisplay_Component_Data
     */ 
    _proteinSequenceWidgetDisplay_Update_proteinSequenceWidgetDisplay_Component_Data() {
        
        const proteinSequenceWidgetDisplay_Component_Data : ProteinSequenceWidgetDisplay_Component_Data  = this.state.proteinSequenceWidgetDisplay_Component_Data.shallowClone();
    
        proteinSequenceWidgetDisplay_Component_Data.selectedProteinSequencePositions = this.props.propsValue.proteinSequenceWidget_StateObject.get_selectedProteinSequencePositions();

        this.setState( (state: ProteinPage_Display_SingleSearch_SingleProtein_MainContent_Component_State, props: ProteinPage_Display_SingleSearch_SingleProtein_MainContent_Component_Props ) : ProteinPage_Display_SingleSearch_SingleProtein_MainContent_Component_State => {

            return { proteinSequenceWidgetDisplay_Component_Data };
        });
    }

	//  Handling Specific Changes by updating the URL

	/**
	 * Update State to URL for Modification selection change (Variable or Static Modifications)
	 */
	_selectedModificationsChange_UpdateURL() {

		const modsSelectedEncodedStateData = this.props.propsValue.modificationMass_UserSelections_StateObject.getEncodedStateData();
		this.props.propsValue.singleProtein_ExpPage_CentralStateManagerObjectClass.setModsSelectedEncodedStateData( { modsSelectedEncodedStateData : modsSelectedEncodedStateData } );
    }

	/**
	 * 
	 */
	_reporterIonMassesChange_UpdateURL() {

		const reporterIonMassesSelectedEncodedStateData = this.props.propsValue.reporterIonMass_UserSelections_StateObject.getEncodedStateData();
		this.props.propsValue.singleProtein_ExpPage_CentralStateManagerObjectClass.setReporterIonMassesSelectedEncodedStateData( { reporterIonMassesSelectedEncodedStateData } );
	}

    
	/**
	 * Update State to URL for Peptide Sequence selection change
	 */
	_selectedPeptideSequenceChange_UpdateURL() {

		const peptideSequenceSelectedEncodedStateData = this.props.propsValue.peptideSequence_UserSelections_StateObject.getEncodedStateData();
		this.props.propsValue.singleProtein_ExpPage_CentralStateManagerObjectClass.setPeptideSequenceFilterSelectedEncodedStateData({ peptideSequenceFilterSelectedEncodedStateData : peptideSequenceSelectedEncodedStateData });
    }
    
	/**
	 * Update State to URL for Protein Sequence Positions selection change
	 */
	_selectedProteinPositionsChange_UpdateURL() {

		const widgetEncodedStateData = this.props.propsValue.proteinSequenceWidget_StateObject.getEncodedStateData();
		this.props.propsValue.singleProtein_ExpPage_CentralStateManagerObjectClass.setProteinSequenceFormattedDisplayWidgetEncodedStateData( { proteinSequenceFormattedDisplayWidgetEncodedStateData : widgetEncodedStateData } );
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

                            const proteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId = new ProteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId({
                                forSingleSearch : true,
                                forMultipleSearch : false,
                                proteinSequenceVersionId : this.props.propsValue.proteinSequenceVersionId,
                                loadedDataCommonHolder : this.props.propsValue.loadedDataCommonHolder,
                                proteinSequenceWidget_StateObject : this.props.propsValue.proteinSequenceWidget_StateObject,
                                modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
                                reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
                                userSearchString_LocationsOn_ProteinSequence_Root : this.state.userSearchString_LocationsOn_ProteinSequence_Root
                            });
                        
                            const getReportedPeptideIdsForDisplay_SingleProjectSearchId_Result = (
                                proteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId.
                                getReportedPeptideIdsForDisplay_SingleProjectSearchId({
                                    not_filtered_position_modification_selections : false, 
                                    loadedDataPerProjectSearchIdHolder : this.props.propsValue.loadedDataPerProjectSearchIdHolder,
                                    projectSearchId : this.props.propsValue.projectSearchId
                                })
                            );

                            const reportedPeptideIdsForDisplay : Array<number> = getReportedPeptideIdsForDisplay_SingleProjectSearchId_Result.reportedPeptides_Filtered_Array;

                            //  Data for Reported Peptide List Table
                                                
                            let reportedPeptideList_RootTableObject : DataTable_RootTableObject = null;
                            let reportedPeptideList_numberOfReportedPeptides : number = 0;
                            let reportedPeptideList_numberOfPsmsForReportedPeptides : number = 0;

                            if ( reportedPeptideIdsForDisplay.length > 0 ) {

                                const reportedPeptides_DataTableObjects_ForSingleSearch_SingleProtein_Result : ReportedPeptides_DataTableObjects_ForSingleSearch_SingleProtein_Result = (
                                    reportedPeptides_DataTableOjbects_ForSingleSearch_SingleProtein_createChildTableObjects({
                                        projectSearchId : this.props.propsValue.projectSearchId,
                                        reportedPeptideIds : new Set( reportedPeptideIdsForDisplay ),
                                        reporterIonMassesSelected : this.props.propsValue.reporterIonMass_UserSelections_StateObject.get_ReporterIonssSelected(),
                                        searchDataLookupParamsRoot : this.props.propsValue.searchDataLookupParamsRoot,
                                        loadedDataPerProjectSearchIdHolder : this.props.propsValue.loadedDataPerProjectSearchIdHolder,
                                        loadedDataCommonHolder : this.props.propsValue.loadedDataCommonHolder,
                                        dataPageStateManager : this.props.propsValue.dataPageStateManager
                                    })
                                );

                                reportedPeptideList_RootTableObject = reportedPeptides_DataTableObjects_ForSingleSearch_SingleProtein_Result.dataTable_RootTableObject;
                                reportedPeptideList_numberOfReportedPeptides = reportedPeptides_DataTableObjects_ForSingleSearch_SingleProtein_Result.numberOfReportedPeptides;
                                reportedPeptideList_numberOfPsmsForReportedPeptides = reportedPeptides_DataTableObjects_ForSingleSearch_SingleProtein_Result.numberOfPsmsForReportedPeptides;
                            }

                            let reportedPeptideList_numberOfReportedPeptides_Display : string = reportedPeptideList_numberOfReportedPeptides.toString();
                            let reportedPeptideList_numberOfPsmsForReportedPeptides_Display : string = reportedPeptideList_numberOfPsmsForReportedPeptides.toString();

                            try {
                                reportedPeptideList_numberOfReportedPeptides_Display = reportedPeptideList_numberOfReportedPeptides.toLocaleString();
                            } catch (e) {
                                console.warn("calling reportedPeptideList_numberOfReportedPeptides.toLocaleString(); failed", e)
                            }
                            try {
                                reportedPeptideList_numberOfPsmsForReportedPeptides_Display = reportedPeptideList_numberOfPsmsForReportedPeptides.toLocaleString();
                            } catch (e) {
                                console.warn("calling reportedPeptideList_numberOfPsmsForReportedPeptides.toLocaleString(); failed", e)
                            }


                            const sequenceCoverageBooleanArray_Unfiltered = this.state.sequenceCoverageBooleanArray_Unfiltered;
            
                            let proteinSequenceWidgetDisplay_Component_Data : ProteinSequenceWidgetDisplay_Component_Data = undefined;
            
                            {
                                let proteinPositions_CoveredBy_SearchStrings = this.state.userSearchString_LocationsOn_ProteinSequence_Root.proteinPositions_CoveredBy_SearchStrings;
                                if ( proteinPositions_CoveredBy_SearchStrings.length < 1 ) {
                                    proteinPositions_CoveredBy_SearchStrings = undefined;
                                }
            
                                proteinSequenceWidgetDisplay_Component_Data = create_ProteinSequenceWidgetDisplay_Component_Data({ // External Function Call
            
                                    proteinSequenceWidget_StateObject : this.props.propsValue.proteinSequenceWidget_StateObject,
            
                                    reportedPeptideIdsForDisplay,  
            
                                    proteinSequenceVersionId : this.props.propsValue.proteinSequenceVersionId,
                                    proteinSequenceString : this.props.propsValue.proteinSequenceString,
                                    projectSearchId : this.props.propsValue.projectSearchId,
                                    proteinCoverageArrayOfBoolean : sequenceCoverageBooleanArray_Unfiltered, //  All Peptides
                                    proteinPositions_CoveredBy_PeptideSearchStrings: proteinPositions_CoveredBy_SearchStrings,  //  User entered a Peptide String and these Protein Positions are covered by matched peptides - Array of boolean
                                    loadedDataPerProjectSearchIdHolder : this.props.propsValue.loadedDataPerProjectSearchIdHolder,
                                    modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
                                    reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject
                                });
                            }
            
                            window.setTimeout( () => {
                                try {
                                    this.setState( (state : ProteinPage_Display_SingleSearch_SingleProtein_MainContent_Component_State, props : ProteinPage_Display_SingleSearch_SingleProtein_MainContent_Component_Props ) : ProteinPage_Display_SingleSearch_SingleProtein_MainContent_Component_State => {
                                        return { proteinSequenceWidgetDisplay_Component_Data }
                                    });
                                } catch( e ) {
                                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                    throw e;
                                }
                            }, 10 );
            
                            window.setTimeout( () => {
                                try {
                                    if ( reportedPeptideList_numberOfReportedPeptides && reportedPeptideList_numberOfReportedPeptides > 300 ) { //  The cutoff number is an arbitrary guess
                                        //  Since going to take a while to put new peptide list in DOM, show updating message first, then update peptide list
            
                                        this.setState( (state : ProteinPage_Display_SingleSearch_SingleProtein_MainContent_Component_State, props : ProteinPage_Display_SingleSearch_SingleProtein_MainContent_Component_Props ) : ProteinPage_Display_SingleSearch_SingleProtein_MainContent_Component_State => {
                                            return { updating_Next_reportedPeptideIdsForDisplay_Map_KeyProjectSearchId_ForPeptideList : true }
                                        });
            
                                        window.setTimeout( () => {
                                            try {
                                                //  calls this.setState(...)
                                                this._updateRestOfPage_ForUserInteraction__setState_Call({
                                                    updating_Next_reportedPeptideIdsForDisplay_Map_KeyProjectSearchId_ForPeptideList : false,
                                                    reportedPeptideIdsForDisplay_ForPeptideList: reportedPeptideIdsForDisplay,
                                                    reportedPeptideList_RootTableObject,
                                                    reportedPeptideList_numberOfReportedPeptides,
                                                    reportedPeptideList_numberOfReportedPeptides_Display,
                                                    reportedPeptideList_numberOfPsmsForReportedPeptides,
                                                    reportedPeptideList_numberOfPsmsForReportedPeptides_Display
                                                });
                                            } catch( e ) {
                                                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                                throw e;
                                            }
                                        }, 10 );
                                    } else {
                                        //  Should not take long to update DOM for new peptide list so do directly
                                        //  calls this.setState(...)
                                        this._updateRestOfPage_ForUserInteraction__setState_Call({
                                            updating_Next_reportedPeptideIdsForDisplay_Map_KeyProjectSearchId_ForPeptideList : false,
                                            reportedPeptideIdsForDisplay_ForPeptideList: reportedPeptideIdsForDisplay,
                                            reportedPeptideList_RootTableObject,
                                            reportedPeptideList_numberOfReportedPeptides,
                                            reportedPeptideList_numberOfReportedPeptides_Display,
                                            reportedPeptideList_numberOfPsmsForReportedPeptides,
                                            reportedPeptideList_numberOfPsmsForReportedPeptides_Display
                                        });
                                    }
                                } catch( e ) {
                                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                    throw e;
                                }
                            }, 20 );

                        } catch( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                            throw e;
                        }
                    }, 10 );
            
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
	 * setState(...) call for updateRestOfPage_ForUserInteraction
	 */
	_updateRestOfPage_ForUserInteraction__setState_Call({
        updating_Next_reportedPeptideIdsForDisplay_Map_KeyProjectSearchId_ForPeptideList,
        reportedPeptideIdsForDisplay_ForPeptideList,
        reportedPeptideList_RootTableObject,
        reportedPeptideList_numberOfReportedPeptides,
        reportedPeptideList_numberOfReportedPeptides_Display,
        reportedPeptideList_numberOfPsmsForReportedPeptides,
        reportedPeptideList_numberOfPsmsForReportedPeptides_Display
    } : {
        updating_Next_reportedPeptideIdsForDisplay_Map_KeyProjectSearchId_ForPeptideList : boolean
        reportedPeptideIdsForDisplay_ForPeptideList : Array<number>
        reportedPeptideList_RootTableObject : DataTable_RootTableObject
        reportedPeptideList_numberOfReportedPeptides : number
        reportedPeptideList_numberOfReportedPeptides_Display : string
        reportedPeptideList_numberOfPsmsForReportedPeptides : number
        reportedPeptideList_numberOfPsmsForReportedPeptides_Display : string

    }) : void {

        this.setState( (state : ProteinPage_Display_SingleSearch_SingleProtein_MainContent_Component_State, props : ProteinPage_Display_SingleSearch_SingleProtein_MainContent_Component_Props ) : ProteinPage_Display_SingleSearch_SingleProtein_MainContent_Component_State => {
            return { 
                updating_Next_reportedPeptideIdsForDisplay_Map_KeyProjectSearchId_ForPeptideList,
                reportedPeptideIdsForDisplay_ForPeptideList,
                reportedPeptideList_RootTableObject,
                reportedPeptideList_numberOfReportedPeptides,
                reportedPeptideList_numberOfReportedPeptides_Display,
                reportedPeptideList_numberOfPsmsForReportedPeptides,
                reportedPeptideList_numberOfPsmsForReportedPeptides_Display
            }
        });


    }


	/**
	 * Update section above the peptide list that shows the current Peptide Filters
	 */
    _updateCurrentPeptideFiltersSection() {

        const peptideFiltersDisplay_ComponentData : PeptideFiltersDisplay_ComponentData = {
            modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
            reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
            peptideSequence_UserSelections_StateObject : this.props.propsValue.peptideSequence_UserSelections_StateObject,
            proteinSequenceWidget_StateObject : this.props.propsValue.proteinSequenceWidget_StateObject
        };

        this.setState( (state: ProteinPage_Display_SingleSearch_SingleProtein_MainContent_Component_State, props: ProteinPage_Display_SingleSearch_SingleProtein_MainContent_Component_Props ) : ProteinPage_Display_SingleSearch_SingleProtein_MainContent_Component_State => {

            return { peptideFiltersDisplay_ComponentData };
        });
    }



    //////////////
    
    //   Since the Peptide List can end up wider than the current width, 
    //   have a way to detect that and change the width to wider

	/**
	 * called by this._createSingleProteinModalOverlay
	 */
	_remove_MutationObserver_From_reported_peptides_outer_container() {

		{
			//  Remove _domMutationObserver_reported_peptides_outer_container if set
			// stop observing
			try {
				if ( this._domMutationObserver_reported_peptides_outer_container ) {
					this._domMutationObserver_reported_peptides_outer_container.disconnect();
				}
			} catch ( e ) {
				var z = 0;
			}
			this._domMutationObserver_reported_peptides_outer_container = undefined;
		}
    }

	/**
	 * called by this.componentDidMount()
	 */
	_add_MutationObserver_To_reported_peptides_outer_container_For_MakingWidthChangesAsNeeded() {

		{
			//  Remove _domMutationObserver_reported_peptides_outer_container if set
			// stop observing
			try {
				if ( this._domMutationObserver_reported_peptides_outer_container ) {
					this._domMutationObserver_reported_peptides_outer_container.disconnect();
				}
			} catch ( e ) {
				var z = 0;
			}
			this._domMutationObserver_reported_peptides_outer_container = undefined;
		}

		//  Add MutationObserver to DOM element .selector_reported_peptides_outer_container
	
		// const $selector_reported_peptides_outer_container = $view_single_protein_overlay_body.find(".selector_reported_peptides_outer_container");
		// if ( $selector_reported_peptides_outer_container.length === 0 ) {
		// 	throw Error("Failed find DOM element with class 'selector_reported_peptides_outer_container'");
		// }
		// if ( $selector_reported_peptides_outer_container.length > 1 ) {
		// 	throw Error("Found > 1 DOM element with class 'selector_reported_peptides_outer_container'");
		// }
		// const DOMElement = $selector_reported_peptides_outer_container[ 0 ];

		// Options for the observer (which mutations to observe)
		// const config = { attributes: true, childList: true, subtree: true };
		const config = { childList: true, subtree: true };

		let timeoutId = null;

		// Callback function to execute when mutations are observed
		const domMutationCallback = ( mutationsList, observer ) => {

			let foundChildListMutation = false;

			for ( const mutation of mutationsList ) {
				if  ( mutation.type == 'childList' ) {
					foundChildListMutation = true;
				}
				// else if ( mutation.type == 'attributes' ) {
				// 	console.log( 'The ' + mutation.attributeName + ' attribute was modified.' );
				// }
			}
			if ( foundChildListMutation ) {
				if ( timeoutId ) {
					window.clearTimeout( timeoutId );
				}
				timeoutId = window.setTimeout( () => {
					timeoutId = null;
					// console.log('At least 1 child node has been added or removed.');
					this._resize_OverlayWidth_BasedOnReportedPeptidesTableWidth();
				}, 200 );
			}

		};
		// Create an observer instance linked to the callback function
        this._domMutationObserver_reported_peptides_outer_container = new MutationObserver( domMutationCallback );
        

        const proteinPage_Display_SingleSearch__SingleProtein_GeneratedReportedPeptideListSection_Component_React_Container_Ref_DOM = this._proteinPage_Display_SingleSearch__SingleProtein_GeneratedReportedPeptideListSection_Component_React_Container_Ref.current;

		// Start observing the target node for configured mutations
		this._domMutationObserver_reported_peptides_outer_container.observe( proteinPage_Display_SingleSearch__SingleProtein_GeneratedReportedPeptideListSection_Component_React_Container_Ref_DOM, config );

		// stop observing
		// this._domMutationObserver_reported_peptides_outer_container.disconnect();
	}

	/**
	 * Adjust overlay width to fit reported peptide 
	 * 
	 * called internally from this class
	 */
	_resize_OverlayWidth_BasedOnReportedPeptidesTableWidth() {

		//  Adjust overlay width to fit reported peptide list

        const proteinPage_Display_SingleSearch__SingleProtein_GeneratedReportedPeptideListSection_Component_React_Container_Ref_DOM = this._proteinPage_Display_SingleSearch__SingleProtein_GeneratedReportedPeptideListSection_Component_React_Container_Ref.current;

        const containerRect_GeneratedReportedPeptideListSection = proteinPage_Display_SingleSearch__SingleProtein_GeneratedReportedPeptideListSection_Component_React_Container_Ref_DOM.getBoundingClientRect();
		
		const reported_peptides_data_table_container_Width = containerRect_GeneratedReportedPeptideListSection.width;
			
		let overlayWidth = (
            reported_peptides_data_table_container_Width 
            + this.props.view_single_protein_overlay_body_PaddingLeft 
            + this.props.view_single_protein_overlay_body_PaddingRight
            + 2 //  Little Extra
        );
		if ( overlayWidth < _OUTERMOST_CONTAINER_MIN_WIDTH ) {
			overlayWidth = _OUTERMOST_CONTAINER_MIN_WIDTH; // Min width
        }
        
        if ( overlayWidth !== this._updated_OverlayWidth ) {

            //  overlayWidth has changed

            this.props.setWidth__view_single_protein_inner_overlay_div({ width : overlayWidth });

            this._updated_OverlayWidth = overlayWidth;
        }

		this._adjustBoxesOnRight_So_AtRigthtEdgeOfViewPort();
	}

	/**
	 * _adjustBoxesOnRight So AtRigthtEdgeOfViewPort or right edge of overlay, whichever is further left.
     * 
     * This is done by adjusting the width of the containing <div> that contains the grid definition "auto min-content"
     * 
     * Called from _resize_OverlayWidth_BasedOnReportedPeptidesTableWidth() or whenever the width of the viewport changes.
	 */
	_adjustBoxesOnRight_So_AtRigthtEdgeOfViewPort() {

        // console.log("_adjustBoxesOnRight_So_AtRigthtEdgeOfViewPort() entered")

        let widthOverall_For_TopSection = undefined;  // Section above Peptide List.  Keep in viewport if possible
        {
            let overlayWidth = undefined;
            
            if ( this._updated_OverlayWidth !== undefined ) {
                
                overlayWidth = this._updated_OverlayWidth;

            } else {

                overlayWidth = this.props.view_single_protein_inner_overlay_div_Width_Initial;
            }

            //   window.innerWidth: Per MDN: Width (in pixels) of the browser window viewport INCLUDING, if rendered, the vertical scrollbar.
            // const window_innerWidth = window.innerWidth

            //  Get Width (in pixels) of the browser window viewport EXCLUDING, if rendered, the vertical scrollbar.  
            //     Done to position boxes on right correctly from right side, including if vertical scrollbar is rendered
            const rootHTMLelement_Collection = document.getElementsByTagName("html");
            if ( ! ( rootHTMLelement_Collection.length > 0 ) ) {
                const msg = "_adjustBoxesOnRight_So_AtRigthtEdgeOfViewPort(): element 'html' not found: true: if ( ! ( rootHTMLelement_Collection.length > 0 ) )"
                console.warn( msg );
                throw Error( msg );
            }
            const rootHTMLelement = rootHTMLelement_Collection[ 0 ];
            const rootHTMLelement_clientWidth = rootHTMLelement.clientWidth; // Width (in pixels) of the browser window viewport EXCLUDING, if rendered, the vertical scrollbar. 
    
            // console.log("_adjustBoxesOnRight_So_AtRigthtEdgeOfViewPort() rootHTMLelement_clientWidth: " + rootHTMLelement_clientWidth + ", window_innerWidth: " + window_innerWidth )
    
            if ( overlayWidth < rootHTMLelement_clientWidth ) {

                widthOverall_For_TopSection = overlayWidth;

            } else {

                widthOverall_For_TopSection = rootHTMLelement_clientWidth;
            }
        }

        //  Subtract left and right adding of containing <div>
        widthOverall_For_TopSection = widthOverall_For_TopSection - this.props.view_single_protein_overlay_body_PaddingLeft - this.props.view_single_protein_overlay_body_PaddingRight;
        {
            const div_MainGridAtTo_DOM = this._div_MainGridAtTop_Ref.current;

            div_MainGridAtTo_DOM.style.width = widthOverall_For_TopSection + "px";

            div_MainGridAtTo_DOM.style.maxWidth = widthOverall_For_TopSection + "px";
        }
        {
            const div_MainContent_LeftGridEntry_AtTop_DOM = this._div_MainContent_LeftGridEntry_AtTop_Ref.current;

            let width_LeftGridEntry = (
                widthOverall_For_TopSection 
                - _BOXES_ON_RIGHT_CONTAINER_WIDTH__SUMMARY_ETC - _BOXES_ON_RIGHT_CONTAINER_PADDING_LEFT__SUMMARY_ETC // - _BOXES_ON_RIGHT_CONTAINER_PADDING_RIGHT__SUMMARY_ETC 
                - 10 //  border width on boxes and just extra
            );

            if ( width_LeftGridEntry < this.state.widthOf_proteinSequenceWidgetDisplay_Component ) {
                width_LeftGridEntry = this.state.widthOf_proteinSequenceWidgetDisplay_Component
            }

            if ( width_LeftGridEntry !== this._width_LeftGridEntry_TopMainSection_LastUpdatedValue ) {

                // Has changed so update saved value and DOM

                this._width_LeftGridEntry_TopMainSection_LastUpdatedValue = width_LeftGridEntry;

                div_MainContent_LeftGridEntry_AtTop_DOM.style.width = width_LeftGridEntry + "px";
                div_MainContent_LeftGridEntry_AtTop_DOM.style.maxWidth = width_LeftGridEntry + "px";
                div_MainContent_LeftGridEntry_AtTop_DOM.style.minWidth = width_LeftGridEntry + "px";
            }
        }
	}


    ////////////////////////////////////////

    /**
     * 
     */    
    render() {

        //  Main block without boxes on right for Summary Statistics, etc
        const width_mainBlockAbovePeptideList = this.state.widthOf_proteinSequenceWidgetDisplay_Component;

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


        let updatingMessage : JSX.Element = undefined;
        let gettingDataMessage : JSX.Element = undefined;

        if ( this.state.updating_Next_reportedPeptideIdsForDisplay_Map_KeyProjectSearchId_ForPeptideList ) {

            updatingMessage = (
                <div className=" block-updating-overlay-container " >
                    Updating Peptide List
                </div>
            )
        } else if ( this.state.gettingDataFor_Filtering_reportedPeptideIdsForDisplay ) {

            gettingDataMessage = (
                <div className=" block-updating-overlay-container " >
                    Loading Data to show Peptides
                </div>
            )
        }

        return (
            <React.Fragment>

                    {/* Apply a width to this <div> so that the boxes on right stay within viewport when main overlay is widened to exceed viewport.
                        Need to take into account padding in class="view-single-protein-overlay-body" which is currently 20px or read that from DOM element */}

                    {/* Fake 'width' so that grid width not auto fill to width 100%.  Grid will exceed the 80px width to fill the width of the 2 columns.
                            This keeps boxes on right in viewport when main overlay width > viewport width. */}

                <div style={ { display: "grid", gridTemplateColumns: "auto min-content", width: 80 } } ref={ this._div_MainGridAtTop_Ref } >
                
                    {/* display of data above Reported Peptides  */}

                    <div ref={ this._div_MainContent_LeftGridEntry_AtTop_Ref } 
                        style={ { 
                            display: "inline-block",
                            width : width_mainBlockAbovePeptideList,
                            minWidth : width_mainBlockAbovePeptideList,
                            maxWidth : width_mainBlockAbovePeptideList
                        } } >  
                    
                        {/* Main Content above Reported Peptides  */}

                        <table>
                            <tbody ref={ this._div_SearchDetailsContainer_Ref }>
                            </tbody>
                        </table>

                        <div style={ { paddingBottom: 15 } }>

                            { saveView_Component }

                            <SharePage_Component
                                projectSearchIds={ this.props.propsValue.projectSearchIds }
                            />
                        </div>

                        <div style={ { paddingBottom: 15 } }>
                            <div style={ { fontSize: 24, fontWeight: "bold" } }>
                                Name (from FASTA): <span style={ { overflowWrap : "break-word" } }>{ this.props.propsValue.proteinNames }</span>
                            </div>
                            { ( ! this.props.propsValue.proteinDescriptions ? null :
                                <div style={ { fontSize: 14, fontWeight: "bold", paddingTop: 10 } }>
                                    <span style={ { overflowWrap : "break-word" } }>{ this.props.propsValue.proteinDescriptions }</span>
                                </div>
                            ) }
                        </div>

                        <div style={ { marginBottom: 10 } } >

                            <ModificationMass_UserSelections_Root
                                modificationMass_UserSelections_ComponentData={ this.state.modificationMass_UserSelections_ComponentData } // Only updated when new updated need to push from above
                                modificationMass_UserSelections_StateObject={ this.props.propsValue.modificationMass_UserSelections_StateObject } // Updated in the component
                                proteinSequenceVersionId={ this.props.propsValue.proteinSequenceVersionId }
                                projectSearchIds={ this.props.propsValue.projectSearchIds }
                                proteinNames={ this.props.propsValue.proteinNames }
                                proteinDescriptions={ this.props.propsValue.proteinDescriptions }
                                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds={ this.props.propsValue.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds }
                                modificationMass_CommonRounding_ReturnNumber={ undefined } // Always passed for Experiment - Made a parameter to make easier to copy this code for Protein Page Single Search
                                updateMadeTo_modificationMass_UserSelections_StateObject_Callback={ this._modificationMass_UserSelections_UpdateMadeTo_StateObject_Callback_BindThis } // this.props.propsValue.modificationMass_UserSelections_StateObject has been updated.
                                update_modificationMass_UserSelections_ComponentData_Callback={ this._modificationMass_Update_modificationMass_UserSelections_ComponentData_Callback_BindThis } // create new this.state.modificationMass_UserSelections_ComponentData
                            />

                            <ReporterIonMass_UserSelections
                                reporterIons_UserSelections_ComponentData={ this.state.reporterIons_UserSelections_ComponentData }
                                reporterIonMass_UserSelections_StateObject={ this.props.propsValue.reporterIonMass_UserSelections_StateObject }
                                updateMadeTo_reporterIonMass_UserSelections_StateObject_Callback={ this._updateMadeTo_reporterIonMass_UserSelections_StateObject_Callback_BindThis }
                            />

                            <PeptideSequence_UserSelections
                                peptideSequence_UserSelections_ComponentData={ this.state.peptideSequence_UserSelections_ComponentData }
                                peptideSequence_UserSelections_StateObject={ this.props.propsValue.peptideSequence_UserSelections_StateObject }
                                proteinSequenceString={ this.props.propsValue.proteinSequenceString }
                                updateMadeTo_peptideSequence_UserSelections_StateObject_New_UserSearchString_LocationsOn_ProteinSequence_Root_Callback
                                ={ this._updateMadeTo_peptideSequence_UserSelections_StateObject_New_UserSearchString_LocationsOn_ProteinSequence_Root_Callback_BindThis }
                            />
                        </div>
                        
                        <div >
                            <span style={ { fontSize: 18, fontWeight: "bold" } }>Sequence Coverage: </span> 
                        </div> 

                        <div style={ { display: "inline-block" } } ref={ this._proteinSequenceWidgetDisplay_Root_Component_React_Container_Ref }> {/* ref to allow measuring width of component */}
                            <ProteinSequenceWidgetDisplay_Root_Component_React
                                proteinSequenceWidgetDisplay_Component_Data={ this.state.proteinSequenceWidgetDisplay_Component_Data }
                                proteinSequenceWidget_StateObject={ this.props.propsValue.proteinSequenceWidget_StateObject }
                                updateMadeTo_proteinSequenceWidgetDisplay_UserSelections_StateObject_Callback={ this._updateMadeTo_proteinSequenceWidgetDisplay_UserSelections_StateObject_Callback_BindThis }
                            />
                        </div>

                        {/* Display of User Selected Modifications and Protein Positions filtering on  */}
                        
                        <PeptideFiltersDisplay
                            peptideFiltersDisplay_ComponentData={ this.state.peptideFiltersDisplay_ComponentData }
                            clearAllFiltersClickHandler={ this._clearAllSelections_BindThis }
                        />

                    </div>  {/* END: Main Content above Reported Peptides  */}

                    {/* Display of Boxes to right of Main Content above Reported Peptides (Summary Statistics, External Links, Downloads) */}

                    <div style={ {  
                        position: "relative", 
                        width: _BOXES_ON_RIGHT_CONTAINER_WIDTH__SUMMARY_ETC, 
                        minWidth: _BOXES_ON_RIGHT_CONTAINER_WIDTH__SUMMARY_ETC, 
                        maxWidth: _BOXES_ON_RIGHT_CONTAINER_WIDTH__SUMMARY_ETC, 
                        paddingLeft: _BOXES_ON_RIGHT_CONTAINER_PADDING_LEFT__SUMMARY_ETC, 
                        paddingRight: 0, // _BOXES_ON_RIGHT_CONTAINER_PADDING_RIGHT__SUMMARY_ETC, 
                        marginBottom: 15 
                    } }>

                        <div className="single-protein-box-on-right"> {/*  Summary Data */}
                            <div className="header-label">
                                Summary Statistics:
                            </div>
                            <div className="box-contents" style={ { display: "grid", gridTemplateColumns: "150px 55px" } }>
                                <div className="box-line" style={ { textAlign: "right", paddingRight: 10 } }>
                                    Sequence coverage:
                                </div>
                                <div className="box-line" >
                                    { this.state.protein_percentageCovered_Unfiltered_Rounded }%
                                </div>
                                
                                <div className="box-line" style={ { textAlign: "right", paddingRight: 10 } }>
                                    Peptides:
                                </div>
                                <div className="box-line"  >
                                    { this.props.propsValue.peptideCountForUnfilteredDisplay }
                                </div>
                                <div className="box-line" style={ { textAlign: "right", paddingRight: 10 } }>
                                    Unique peptides:
                                </div>
                                <div className="box-line"  >
                                    { this.props.propsValue.uniquePeptideCountForUnfilteredDisplay }
                                </div>

                                <div className="box-line" style={ { textAlign: "right", paddingRight: 10 } }>
                                    Spectral count:
                                </div>
                                <div className="box-line"  >
                                    { this.state.psmCountForUnfilteredDisplay }
                                </div>

                            </div>	
                        </div>


                        <div className="single-protein-box-on-right" style={ { marginTop: 15 } }> {/*  External Links: */}
                            <div className="header-label">
                                External Links:
                            </div>
                            
                            <div className="box-contents" >
                                <div className="box-line" >
                                    NCBI Blast 
                                    <a href={ this.state.linksToExternalResources.NCBI_Blast_URL }
                                        target="_blank" 
                                        style={ { marginLeft: 5 } }
                                        ><img className=" icon-small "
                                            src="static/images/icon-linkout-dark.png"
                                        />
                                    </a>
                                </div>
                                <div className="box-line"  >
                                    PDR Blast 
                                    <a href={ this.state.linksToExternalResources.PDR_Blast_URL }
                                        target="_blank" 
                                        style={ { marginLeft: 5 } }
                                        ><img className=" icon-small "
                                            src="static/images/icon-linkout-dark.png"
                                        />
                                    </a>
                                </div>
                                <div className="box-line"  >
                                    UniProtKB Search
                                    <a href={ this.state.linksToExternalResources.UniProtKB_Search_URL }
                                        target="_blank" 
                                        style={ { marginLeft: 5 } }
                                        ><img className=" icon-small "
                                            src="static/images/icon-linkout-dark.png"
                                        />
                                    </a>
                                </div>
                                <div className="box-line"  >
                                    NCBI Search
                                    <a href={ this.state.linksToExternalResources.NCBI_Search_URL }
                                        target="_blank" 
                                        style={ { marginLeft: 5 } }
                                        ><img className=" icon-small "
                                            src="static/images/icon-linkout-dark.png"
                                        />
                                    </a>
                                </div>
                            </div>	
                        </div>

                        <div className=" selector_downloads_block single-protein-box-on-right " 
                            style={ { marginTop: 15 } }> {/* Reports: */}

                            <div className="header-label">  {/* Hide when loading Reporter Ion Data for filtering? */}
                                Reports:  {/*  Downloads of data */}
                            </div>
                            
                            <div className="box-contents" style={ { display: "grid", gridTemplateColumns: "65px 35px 20px 60px 20px" } }>
                                <div className="box-line" >
                                    Peptides 
                                </div>

                                <div className="box-line" style={ { textAlign: "right", paddingRight: 5 } }>
                                    all
                                </div>
                                <div className="box-line" >
                                    <img className=" icon-small " style={ { cursor: "pointer" } } 
                                        onClick={ this._downloadPeptides_All_ClickHandler_BindThis }
                                        src="static/images/icon-download-dark.png"
                                    />
                                </div>
                                <div className="box-line" style={ { textAlign: "right", paddingRight: 5 } }>
                                    shown
                                </div>
                                <div className="box-line" >
                                    <img className=" icon-small " style={ { cursor: "pointer" } } 
                                        onClick={ this._downloadPeptides_Shown_ClickHandler_BindThis }
                                        src="static/images/icon-download-dark.png"/>
                                </div>
                                <div className="box-line"  >
                                    PSMs 
                                </div>
                                <div className="box-line" style={ { textAlign: "right", paddingRight: 5 } }>
                                    all
                                </div>
                                <div className="box-line" >
                                    <img className="  icon-small " style={ { cursor: "pointer" } } 
                                        onClick={ this._downloadPsms_All_ClickHandler_BindThis }
                                        src="static/images/icon-download-dark.png"/>
                                </div>
                                <div className="box-line" style={ { textAlign: "right", paddingRight: 5 } }>
                                    shown
                                </div>
                                <div className="box-line" >
                                    <img className=" icon-small " style={ { cursor: "pointer" } } 
                                        onClick={ this._downloadPsms_Shown_ClickHandler_BindThis }
                                        src="static/images/icon-download-dark.png"/>
                                </div>
                            </div>	
                        </div>
                        
                    </div>

                </div>  {/* Close display of data above Reported Peptides */}

                    {/* Display of Reported Peptides  */}

                                    
                <div style={ { display: "inline-block" } }  //  display: "inline-block" so can measure width of this div, including width of Peptide table and sub-tables
                    ref={ this._proteinPage_Display_SingleSearch__SingleProtein_GeneratedReportedPeptideListSection_Component_React_Container_Ref }> {/* ref to allow measuring width of component */}
                          
                    <div style={ { marginTop: 10, paddingBottom: 10 } }>
                        <div>
                            <span style={ { fontSize: 18 } } >
                                <span style={ { fontWeight: "bold" } }>Peptides:</span>
                                <span >(Click row to expand.)</span>
                            </span>
                        </div>
                        <div >
                            <span >Currently showing: </span>
                            <span >{ this.state.reportedPeptideList_numberOfReportedPeptides_Display }</span>
                            <span > peptides </span>
                            <span >({ this.state.reportedPeptideList_numberOfPsmsForReportedPeptides_Display } PSMs)</span>
                        </div>
                    </div>

                    { ( this.state.reportedPeptideList_RootTableObject ) ? 
                        <div style={ { position: "relative" }}>
                            <DataTable_TableRoot 
                                tableObject={ this.state.reportedPeptideList_RootTableObject }
                            />

                            { updatingMessage }
                            { gettingDataMessage }
                        </div>

                        : (
                            <div >
                                No peptides meet the current filtering criteria.
                            </div>
                        )
                    }

                </div>
            </React.Fragment>

        );
    }

}

