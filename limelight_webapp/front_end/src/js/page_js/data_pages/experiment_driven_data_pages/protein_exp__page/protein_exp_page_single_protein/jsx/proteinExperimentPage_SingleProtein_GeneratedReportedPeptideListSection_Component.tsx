/**
 * proteinExperimentPage_SingleProtein_GeneratedReportedPeptideListSection_Component.tsx
 * 
 * Protein Experiment Page - Single Protein - Reported Peptide List section - 
 * 
 * Shown when A Protein is clicked
 */


 ///  Removed "Updating Message" since wasn't being displayed anyway.  
 ///  Need a paint cycle to end after add updating message before actually updating the peptide list


import React from 'react'

import {reportWebErrorToServer} from 'page_js/reportWebErrorToServer';
//   From data_pages_common
import {DataPageStateManager} from 'page_js/data_pages/data_pages_common/dataPageStateManager'; // dataPageStateManager.ts
import {DataTable_TableRoot} from 'page_js/data_pages/data_table_react/dataTable_TableRoot_React';

import {DataTable_RootTableObject,} from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';


import {Experiment_ConditionGroupsContainer} from 'page_js/data_pages/experiment_data_pages_common/experiment_ConditionGroupsContainer_AndChildren_Classes';
import {Experiment_ConditionGroupsDataContainer} from 'page_js/data_pages/experiment_data_pages_common/experiment_conditionGroupsDataContainer_Class';

import {
    createReportedPeptideDisplayData_DataTableDataObjects_GeneratedReportedPeptideListSection,
    GetDataTableDataObjects_GeneratedReportedPeptideListSection_Result
} from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/js/proteinExperimentPage_SingleProtein_GeneratedReportedPeptideListSection_Create_TableData';
import {Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds";
import {SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__single_protein/js/proteinPage_Display__SingleProtein_Create_GeneratedReportedPeptideListData";
import {CreateReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein_proteinName_Clicked_Callback_Function} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__single_protein/js/proteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Create_TableData";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {Blib_SpectralLibrary_File_Download__MainPage_Link_Component} from "page_js/data_pages/blib_spectral_library_file__download/Blib_SpectralLibrary_File_Download__MainPage_Link_Component";


export type ProteinExperimentPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component__downloadPeptides_Shown_ClickHandler_Callback = () => void;
export type ProteinExperimentPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component__downloadPSMs_Shown_ClickHandler_Callback = () => void;

/**
 * 
 */
export interface ProteinExperimentPage_SingleProtein_GeneratedReportedPeptideListSection_Component_Props {

    showProteins? : boolean

    //  Required when showProteins is true.  For Peptide Page
    proteinName_Clicked_Callback_Function? : CreateReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein_proteinName_Clicked_Callback_Function

    create_GeneratedReportedPeptideListData_Result : Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result;  //  For displaying the peptide list in sub component

    conditionGroupsContainer : Experiment_ConditionGroupsContainer;
    conditionGroupsDataContainer : Experiment_ConditionGroupsDataContainer;

    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds
    proteinSequenceVersionId : number, 
    projectSearchIds : Array<number>,
    searchDataLookupParamsRoot: SearchDataLookupParameters_Root
    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    dataPageStateManager : DataPageStateManager
    showUpdatingMessage : boolean 
    showGettingDataMessage : boolean

    // For Peptide Page
    downloadPeptides_Shown_ClickHandler? : ProteinExperimentPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component__downloadPeptides_Shown_ClickHandler_Callback
    downloadPsms_Shown_ClickHandler? : ProteinExperimentPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component__downloadPSMs_Shown_ClickHandler_Callback
    download_Blib_Spectral_Library_ClickHandler?: () => void
}

/**
 * 
 */
interface ProteinExperimentPage_SingleProtein_ReportedPeptideListSection_Component_State {

    dataTable_RootTableObject?: DataTable_RootTableObject
    peptideList_Empty?: boolean
}


/**
 * 
 */
export class ProteinExperimentPage_SingleProtein_GeneratedReportedPeptideListSection_Component extends React.Component< ProteinExperimentPage_SingleProtein_GeneratedReportedPeptideListSection_Component_Props, ProteinExperimentPage_SingleProtein_ReportedPeptideListSection_Component_State > {

    /**
     * 
     */    
    constructor(props : ProteinExperimentPage_SingleProtein_GeneratedReportedPeptideListSection_Component_Props) {
        super(props);

        this.state = { peptideList_Empty: false, dataTable_RootTableObject: null };
    }

    componentDidMount() {
        window.setTimeout( () => { try {

            this._get__GetDataTableDataObjects_MultipleSearch_SingleProtein_Result__SetState();

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
        }, 10 )
    }

    /**
     * @returns true if should update, false otherwise
     */
    shouldComponentUpdate(nextProps : ProteinExperimentPage_SingleProtein_GeneratedReportedPeptideListSection_Component_Props, nextState : ProteinExperimentPage_SingleProtein_ReportedPeptideListSection_Component_State ) {

        if ( this.props.create_GeneratedReportedPeptideListData_Result !== nextProps.create_GeneratedReportedPeptideListData_Result
            || this.props.showUpdatingMessage !== nextProps.showUpdatingMessage
            || this.props.showGettingDataMessage !== nextProps.showGettingDataMessage
            || this.state.dataTable_RootTableObject !== nextState.dataTable_RootTableObject
            || this.state.peptideList_Empty !== nextState.peptideList_Empty
        ) {
            return true;
        }

        return false;

        //  If Comment out prev code, comment out this method
    }

    /**
     *
     */
    componentDidUpdate(prevProps: Readonly<ProteinExperimentPage_SingleProtein_GeneratedReportedPeptideListSection_Component_Props>, prevState: Readonly<ProteinExperimentPage_SingleProtein_ReportedPeptideListSection_Component_State>, snapshot?: any) {

        if ( this.props.create_GeneratedReportedPeptideListData_Result !== prevProps.create_GeneratedReportedPeptideListData_Result ) {

            if ( ! this.props.create_GeneratedReportedPeptideListData_Result ) {

                //  No Data so exit

                return  // EARLY RETURN
            }

            //  Props changed so change state.  Put here since makes function call that returns Promise

            if ( this.props.create_GeneratedReportedPeptideListData_Result.peptideList_Length === 0 ) {

                this.setState({ peptideList_Empty: true, dataTable_RootTableObject: null })

            } else {
                window.setTimeout( () => {

                    this._get__GetDataTableDataObjects_MultipleSearch_SingleProtein_Result__SetState()
                }, 10 )
            }
        }
    }

    /**
     *
     */
    private _get__GetDataTableDataObjects_MultipleSearch_SingleProtein_Result__SetState() {
        try {
            if ( ! this.props.create_GeneratedReportedPeptideListData_Result ) {
                //  No Data so just skip
                return; // EARLY RETURN
            }

            let for_MultipleSearches_Overall = false;

            if ( this.props.projectSearchIds.length > 1 ) {

                for_MultipleSearches_Overall = true;
            }

            let for_SingleProtein = false;

            if ( this.props.proteinSequenceVersionId !== undefined && this.props.proteinSequenceVersionId !== null ) {

                for_SingleProtein = true;
            }

            //  Function returns a Promise

            const createReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein_Result = createReportedPeptideDisplayData_DataTableDataObjects_GeneratedReportedPeptideListSection({ //  External Function

                for_MultipleSearches_Overall,
                for_SingleProtein,

                create_GeneratedReportedPeptideListData_Result : this.props.create_GeneratedReportedPeptideListData_Result,

                conditionGroupsContainer : this.props.conditionGroupsContainer,
                conditionGroupsDataContainer : this.props.conditionGroupsDataContainer,

                reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : this.props.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
                projectSearchIds : this.props.projectSearchIds,
                searchDataLookupParamsRoot : this.props.searchDataLookupParamsRoot,
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root : this.props.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
                dataPageStateManager : this.props.dataPageStateManager,
                showProteins : this.props.showProteins,
                proteinName_Clicked_Callback_Function : this.props.proteinName_Clicked_Callback_Function
            });

            createReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein_Result.catch(reason => {
                console.warn("createReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein_Result.catch(reason : ", reason )
            })
            createReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein_Result.then(getDataTableDataObjects_Result_PromiseResult => { try {

                const getDataTableDataObjects_Result : GetDataTableDataObjects_GeneratedReportedPeptideListSection_Result = getDataTableDataObjects_Result_PromiseResult;

                const dataTable_RootTableObject : DataTable_RootTableObject = getDataTableDataObjects_Result.dataTable_RootTableObject;

                this.setState({ peptideList_Empty: false, dataTable_RootTableObject })

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     * 
     */    
    render() {

        let updatingMessage = undefined;
        let gettingDataMessage = undefined;

        if ( this.props.showUpdatingMessage ) {

            updatingMessage = (
                <div  className=" block-updating-overlay-container " >
                    Updating Peptide List
                </div>
            )
        } else if ( this.props.showGettingDataMessage ) {

            gettingDataMessage = (
                <div  className=" block-updating-overlay-container " >
                    Loading Data to show Peptides
                </div>
            )
        }

        return (

            <div style={ { position: "relative" }}>
                <div style={ { position: "relative" }}>

                    <ReportedPeptideList_Component

                        dataTable_RootTableObject={ this.state.dataTable_RootTableObject }
                        peptideList_Empty={ this.state.peptideList_Empty }
                        create_GeneratedReportedPeptideListData_Result={ this.props.create_GeneratedReportedPeptideListData_Result }

                        conditionGroupsContainer={ this.props.conditionGroupsContainer }
                        conditionGroupsDataContainer={ this.props.conditionGroupsDataContainer }

                        reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds={ this.props.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds }
                        proteinSequenceVersionId={ this.props.proteinSequenceVersionId }
                        projectSearchIds={ this.props.projectSearchIds }
                        searchDataLookupParamsRoot={ this.props.searchDataLookupParamsRoot }
                        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root={ this.props.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root }
                        dataPageStateManager={ this.props.dataPageStateManager }
                        showUpdatingMessage={ this.props.showUpdatingMessage }
                        showProteins={ this.props.showProteins }
                        proteinName_Clicked_Callback_Function={ this.props.proteinName_Clicked_Callback_Function }
                        downloadPeptides_Shown_ClickHandler={ this.props.downloadPeptides_Shown_ClickHandler }
                        downloadPsms_Shown_ClickHandler={ this.props.downloadPsms_Shown_ClickHandler }
                        download_Blib_Spectral_Library_ClickHandler={ this.props.download_Blib_Spectral_Library_ClickHandler }
                    />
                </div>
                { updatingMessage }
                { gettingDataMessage }
            </div>
            
        );
    }
}




/**
 * 
 */
export interface ReportedPeptideList_Component_Props {

    dataTable_RootTableObject : DataTable_RootTableObject
    peptideList_Empty: boolean

    create_GeneratedReportedPeptideListData_Result : Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result;  //  For displaying the peptide list in sub component
    
    conditionGroupsContainer : Experiment_ConditionGroupsContainer
    conditionGroupsDataContainer : Experiment_ConditionGroupsDataContainer

    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds
    proteinSequenceVersionId : number, 
    projectSearchIds : Array<number>,
    searchDataLookupParamsRoot: SearchDataLookupParameters_Root
    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    dataPageStateManager : DataPageStateManager
    showUpdatingMessage : boolean

    showProteins? : boolean  // For Peptide Page
    //  Required when showProteins is true.  For Peptide Page
    proteinName_Clicked_Callback_Function? : CreateReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein_proteinName_Clicked_Callback_Function

    // For Peptide Page
    downloadPeptides_Shown_ClickHandler : ProteinExperimentPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component__downloadPeptides_Shown_ClickHandler_Callback
    downloadPsms_Shown_ClickHandler : ProteinExperimentPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component__downloadPSMs_Shown_ClickHandler_Callback
    download_Blib_Spectral_Library_ClickHandler: () => void
}

/**
 * 
 */
interface ReportedPeptideList_Component_State {

    placeholder?: any
}


/**
 * 
 */
class ReportedPeptideList_Component extends React.Component< ReportedPeptideList_Component_Props, ReportedPeptideList_Component_State > {

    /**
     * 
     */    
    constructor(props : ReportedPeptideList_Component_Props) {
        super(props);

        this.state = {};
    }

    /**
     * @returns true if should update, false otherwise
     */
    shouldComponentUpdate(nextProps : ReportedPeptideList_Component_Props, nextState : ReportedPeptideList_Component_State ) {

        //  Only update if changed: props or state:

        if ( nextProps.showUpdatingMessage ) {

            return false;  //  Never update when showing updating message
        }

        if (
            this.props.dataTable_RootTableObject !== nextProps.dataTable_RootTableObject
            || this.props.peptideList_Empty !== nextProps.peptideList_Empty
        ) {

            return true;
        }

        return false;

        //  If Comment out prev code, comment out this method
    }

    /**
     * 
     */    
    render() {
        if ( ! this.props.create_GeneratedReportedPeptideListData_Result ) {
            //  No Data so return
            return null; // EARLY RETURN
        }

        //  Validate props
        if ( this.props.showProteins  // For Peptide Page
            && ( ! this.props.proteinName_Clicked_Callback_Function ) ) {  //  Required when showProteins is true.  For Peptide Page

            const msg = "( this.props.showProteins && ( ! this.props.proteinName_Clicked_Callback_Function ) )";
            console.warn(msg);
            throw Error(msg);
        }

        let havePeptideDataTableContentsForDownload : boolean = false;

        let noPeptidesMessage = undefined;
        let peptideListTable = undefined;

        if ( this.props.peptideList_Empty ) {

            noPeptidesMessage = (
                <div className=" padding-for-room-for-child-table-show-hide-icon "> 
                {/* add className padding-for-room-for-child-table-show-hide-icon to match positioning of peptide list table */}
                    No peptides meet the current filtering criteria.
                </div>
            );
        } else {

            if ( this.props.dataTable_RootTableObject ) {
                havePeptideDataTableContentsForDownload = true;

                peptideListTable = (
                    <DataTable_TableRoot
                        tableObject={this.props.dataTable_RootTableObject}
                    />
                );
            }
        }

        const numberOfPeptidesShown = this.props.create_GeneratedReportedPeptideListData_Result.peptideList_Length.toLocaleString();
        const numberOfPSMsForReportedPeptidesShown = this.props.create_GeneratedReportedPeptideListData_Result.numberOfPsmIds_NonRedundant_AcrossAllPeptides.toLocaleString();

        return (
            

            <div >
                                                    
                <div style={ { marginTop: 10, paddingBottom: 10 } }>
                    <div>
                        <span style={ { fontSize: 18 } } >
                            <span style={ { fontWeight: "bold" } }>Peptides:</span>
                            <span >(Click row to expand.)</span>
                        </span>
                    </div>

                    <div style={ { marginTop: 10 } }>
                        <span style={ { fontWeight: "bold" } }>Total Found: </span>
                        <span >{ numberOfPeptidesShown }</span>
                        <span > peptides </span>
                        <span >({ numberOfPSMsForReportedPeptidesShown } PSMs)</span>

                        {/*   Displayed on Peptide page   */}

                        { ( ( peptideListTable || havePeptideDataTableContentsForDownload ) && ( this.props.downloadPeptides_Shown_ClickHandler || this.props.downloadPsms_Shown_ClickHandler ) ) ? (
                            //  Separator
                            <React.Fragment>
                                <span style={ { paddingLeft : 20 } }>&nbsp;</span>
                            </React.Fragment>
                        ) : null }

                        { ( ( peptideListTable || havePeptideDataTableContentsForDownload ) && ( this.props.downloadPeptides_Shown_ClickHandler ) ) ? (
                            // Peptide Download Link
                            <span className=" fake-link "
                                  onClick={ this.props.downloadPeptides_Shown_ClickHandler }
                            >Download All Peptides</span>
                        ) : null }
                        { ( ( peptideListTable || havePeptideDataTableContentsForDownload ) && ( this.props.downloadPeptides_Shown_ClickHandler && this.props.downloadPsms_Shown_ClickHandler ) ) ? (
                            //  Separator
                            <span style={ { paddingLeft : 10 } }>&nbsp;</span>
                        ) : null }
                        { ( ( peptideListTable || havePeptideDataTableContentsForDownload ) && this.props.downloadPsms_Shown_ClickHandler ) ? (
                            // PSM Download Link
                            <span className=" fake-link "
                                  onClick={ this.props.downloadPsms_Shown_ClickHandler }
                            >Download All PSMs</span>
                        ) : null }

                        { ( ( peptideListTable || havePeptideDataTableContentsForDownload ) && this.props.download_Blib_Spectral_Library_ClickHandler ) ? (
                            <Blib_SpectralLibrary_File_Download__MainPage_Link_Component
                                dataPageStateManager={ this.props.dataPageStateManager }
                                download_Blib_Spectral_Library_Callback={ this.props.download_Blib_Spectral_Library_ClickHandler }
                            />
                        ) : null }

                    </div>
                </div>

                <div >  {/* Remove paddingLeft.  peptideListTable will make room for show/hide child table icons as is needed style={ { paddingLeft: 20 } } */}

                    {/* Container for Reported Peptides using Data Table - */}
                    <div className="  "
                        >  {/* Padding to make room for expand icon to left of each row of data  */}
                        {/* Loading Reported Peptides  */}
                        { peptideListTable }
                    </div>
                    { noPeptidesMessage }
                </div>
            </div>
        );
    }

}

