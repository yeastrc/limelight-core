/**
 * proteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component.tsx
 * 
 * Protein Page - Multiple Searches - Single Protein - Reported Peptide List section - 
 * 
 * Shown when A Protein is clicked
 */

import React from 'react'
//   From data_pages_common
import {DataPageStateManager} from 'page_js/data_pages/data_pages_common/dataPageStateManager'; // dataPageStateManager.ts
import {DataTable_TableRoot} from 'page_js/data_pages/data_table_react/dataTable_TableRoot_React';

import {DataTable_RootTableObject} from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';


import {Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result} from '../js/proteinPage_Display__SingleProtein_Create_GeneratedReportedPeptideListData';

import {Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds";
import {SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {
    createReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein,
    CreateReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein_proteinName_Clicked_Callback_Function,
    GetDataTableDataObjects_MultipleSearch_SingleProtein_Result
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__single_protein/js/proteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Create_TableData";
import {AnnotationTypesToDisplay__MainPageComponent_to_Open_SelectionOverlay__Component} from "page_js/data_pages/common_components__react/annotation_types_to_display__selection_update_component/annotationTypesToDisplay__MainPageComponent_to_Open_SelectionOverlay__Component";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {Blib_SpectralLibrary_File_Download__MainPage_Link_Component} from "page_js/data_pages/blib_spectral_library_file__download/Blib_SpectralLibrary_File_Download__MainPage_Link_Component";
import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";


export type ProteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component__downloadPeptides_Shown_ClickHandler_Callback = () => void;
export type ProteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component__downloadPSMs_Shown_ClickHandler_Callback = () => void;
export type ProteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component__downloadPSMs_With_ApexRetentionTime_ClickHandler_Callback = () => void;

/**
 * 
 */
export interface ProteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component_Props {

    create_GeneratedReportedPeptideListData_Result : Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result;  //  For displaying the peptide list in sub component

    for_SingleProtein: boolean              //  Used to control what is displayed

    searchSubGroup_Ids_Selected : Set<number>

    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds
    proteinSequenceVersionId : number
    projectSearchIds : Array<number>
    searchDataLookupParamsRoot : SearchDataLookupParameters_Root
    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    dataPageStateManager : DataPageStateManager
    showUpdatingMessage : boolean 
    showGettingDataMessage : boolean
    showProteins? : boolean  // For Peptide Page

    //  Required when showProteins is true.  For Peptide Page
    proteinName_Clicked_Callback_Function? : CreateReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein_proteinName_Clicked_Callback_Function

    // For Peptide Page
    downloadPeptides_Shown_ClickHandler? : ProteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component__downloadPeptides_Shown_ClickHandler_Callback
    downloadPsms_Shown_ClickHandler? : ProteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component__downloadPSMs_Shown_ClickHandler_Callback
    downloadPSMs_With_ApexRetentionTime_ClickHandler? : ProteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component__downloadPSMs_With_ApexRetentionTime_ClickHandler_Callback
    download_Blib_Spectral_Library_ClickHandler?: () => void
}

/**
 * 
 */
interface ProteinPage_Display__SingleProtein_ReportedPeptideListSection_Component_State {

    dataTable_RootTableObject?: DataTable_RootTableObject
    peptideList_Empty?: boolean
}


/**
 * 
 */
export class ProteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component extends React.Component< ProteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component_Props, ProteinPage_Display__SingleProtein_ReportedPeptideListSection_Component_State > {

    private _showGettingDataMessage : boolean = true
    private _showUpdatingMessage : boolean = false


    /**
     * 
     */    
    constructor(props : ProteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component_Props) {
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
     *
     */
    shouldComponentUpdate(nextProps: Readonly<ProteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component_Props>, nextState: Readonly<ProteinPage_Display__SingleProtein_ReportedPeptideListSection_Component_State>, nextContext: any): boolean {

        if (
            this.props.create_GeneratedReportedPeptideListData_Result !== nextProps.create_GeneratedReportedPeptideListData_Result
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
    componentDidUpdate(prevProps: Readonly<ProteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component_Props>, prevState: Readonly<ProteinPage_Display__SingleProtein_ReportedPeptideListSection_Component_State>, snapshot?: any) {

        if ( this.props.create_GeneratedReportedPeptideListData_Result !== prevProps.create_GeneratedReportedPeptideListData_Result ) {

            if ( ! this.props.create_GeneratedReportedPeptideListData_Result ) {

                //  No Data so exit

                return  // EARLY RETURN
            }

            //  Props changed so change state.  Put here since makes function call that returns Promise

            if ( this.props.create_GeneratedReportedPeptideListData_Result.peptideList_Length === 0 ) {

                this.setState({ peptideList_Empty: true, dataTable_RootTableObject: null })

            } else {

                this._showUpdatingMessage = true

                this.forceUpdate() // Force rerender

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

                this._showGettingDataMessage = false
                this._showUpdatingMessage = false

                return; // EARLY RETURN
            }

            //  Function returns a Promise

            const createReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein_Result = createReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein({ //  External Function

                create_GeneratedReportedPeptideListData_Result : this.props.create_GeneratedReportedPeptideListData_Result,

                for_SingleProtein: this.props.for_SingleProtein,

                searchSubGroup_Ids_Selected : this.props.searchSubGroup_Ids_Selected,

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

                const getDataTableDataObjects_Result : GetDataTableDataObjects_MultipleSearch_SingleProtein_Result = getDataTableDataObjects_Result_PromiseResult;

                const dataTable_RootTableObject : DataTable_RootTableObject = getDataTableDataObjects_Result.dataTable_RootTableObject;

                this._showGettingDataMessage = false
                this._showUpdatingMessage = false

                this.setState({ peptideList_Empty: false, dataTable_RootTableObject })

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     * 
     */    
    render() {
        //  Validate props
        if ( this.props.showProteins  // For Peptide Page
            && ( ! this.props.proteinName_Clicked_Callback_Function ) ) {  //  Required when showProteins is true.  For Peptide Page

            const msg = "( this.props.showProteins && ( ! this.props.proteinName_Clicked_Callback_Function ) )";
            console.warn(msg);
            throw Error(msg);
        }

        let updatingMessage = undefined;
        let gettingDataMessage = undefined;

        if ( this.props.showUpdatingMessage || this._showUpdatingMessage ) {

            updatingMessage = (
                <div  className=" block-updating-overlay-container " >
                    Updating Peptide List
                </div>
            )
        } else if ( this.props.showGettingDataMessage || this._showGettingDataMessage ) {

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

                        projectSearchIds={ this.props.projectSearchIds }
                        searchDataLookupParamsRoot={ this.props.searchDataLookupParamsRoot }
                        dataPageStateManager={ this.props.dataPageStateManager }
                        showUpdatingMessage={ this.props.showUpdatingMessage }
                        showProteins={ this.props.showProteins }
                        proteinName_Clicked_Callback_Function={ this.props.proteinName_Clicked_Callback_Function }
                        downloadPeptides_Shown_ClickHandler={ this.props.downloadPeptides_Shown_ClickHandler }
                        downloadPsms_Shown_ClickHandler={ this.props.downloadPsms_Shown_ClickHandler }
                        downloadPSMs_With_ApexRetentionTime_ClickHandler={ this.props.downloadPSMs_With_ApexRetentionTime_ClickHandler }
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

    projectSearchIds : Array<number>,
    searchDataLookupParamsRoot: SearchDataLookupParameters_Root,
    dataPageStateManager : DataPageStateManager
    showUpdatingMessage : boolean  //  shouldComponentUpdate: return false when showUpdatingMessage is true //  Never update when showing updating message
    showProteins : boolean  // For Peptide Page

    //  Required when showProteins is true.  For Peptide Page
    proteinName_Clicked_Callback_Function? : CreateReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein_proteinName_Clicked_Callback_Function

    downloadPeptides_Shown_ClickHandler : ProteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component__downloadPeptides_Shown_ClickHandler_Callback
    downloadPsms_Shown_ClickHandler : ProteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component__downloadPSMs_Shown_ClickHandler_Callback
    downloadPSMs_With_ApexRetentionTime_ClickHandler: ProteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component__downloadPSMs_With_ApexRetentionTime_ClickHandler_Callback
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

    private _show_downloadPSMs_With_ApexRetentionTime_Link = true

    /**
     * 
     */    
    constructor(props : ReportedPeptideList_Component_Props) { try {
        super(props);

        {
            const common_Searches_Flags = props.dataPageStateManager.get_DataPage_common_Searches_Flags()

            for ( const projectSearchId of props.projectSearchIds ) {

                const common_Flags_SingleSearch_ForProjectSearchId = common_Searches_Flags.get_DataPage_common_Flags_SingleSearch_ForProjectSearchId( projectSearchId )
                if ( ! common_Flags_SingleSearch_ForProjectSearchId ) {
                    throw Error( "common_Searches_Flags.get_DataPage_common_Flags_SingleSearch_ForProjectSearchId( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId )
                }

                if ( common_Flags_SingleSearch_ForProjectSearchId.anyPsmHas_OpenModifications || common_Flags_SingleSearch_ForProjectSearchId.anyPsmHas_DynamicModifications
                    || ( ! common_Flags_SingleSearch_ForProjectSearchId.hasScanData ) )  {

                    this._show_downloadPSMs_With_ApexRetentionTime_Link = false

                    break
                }
            }
        }

        this.state = {};

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

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

        let noPeptidesMessage : JSX.Element = undefined;
        let peptideListTable : JSX.Element = undefined;

        if ( this.props.peptideList_Empty ) {

            noPeptidesMessage = (
                <div
                    className=" padding-for-room-for-child-table-show-hide-icon "
                    style={ { marginBottom: 20 } }
                >
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
        const numberOfUniquePeptides = this.props.create_GeneratedReportedPeptideListData_Result.numberOfUniquePeptides.toLocaleString();
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

                    <div >
                        <AnnotationTypesToDisplay__MainPageComponent_to_Open_SelectionOverlay__Component
                            projectSearchIds={ this.props.projectSearchIds }
                            searchDataLookupParameters_Root={ this.props.searchDataLookupParamsRoot }
                            dataPageStateManager_DataFrom_Server={ this.props.dataPageStateManager }
                        />
                    </div>

                    <div style={ { marginTop: 10 } }>
                        <span style={ { fontWeight: "bold" } }>Total Found: </span>
                        <span >{ numberOfPeptidesShown }</span>
                        <span > peptides </span>

                        { this.props.showProteins ? (
                            <>
                                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                    title={
                                        <span>
                                            A unique peptide maps to a single protein
                                        </span>
                                    }
                                    { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                >
                                    <span>({ numberOfUniquePeptides } unique)</span>
                                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                <span> </span>
                            </>
                        ) : (
                            <span>&nbsp;</span>
                        ) }

                        <span >{ numberOfPSMsForReportedPeptidesShown } PSMs</span>

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

                        {/*  Keep next option commented out unless deploy on an alt URL for a specific user.  This is very slow when have more than a small number of peptides.  */}
                        {/*
                            { ( ( peptideListTable || havePeptideDataTableContentsForDownload ) && this.props.downloadPSMs_With_ApexRetentionTime_ClickHandler && this._show_downloadPSMs_With_ApexRetentionTime_Link ) ? (
                                // PSM Download Link  With_ApexRetentionTime  Special Version.  See 'this._show_downloadPSMs_With_ApexRetentionTime_Link' for when NOT shown
                                <span className=" fake-link "
                                      onClick={ this.props.downloadPSMs_With_ApexRetentionTime_ClickHandler }
                                >Download All PSMs with APEX Retention Time (Much Slower)  "MS1 Window hard coded: 15ppm (View downloaded file for actual 'ppm' value used since may be 25 for comparison to web app) "</span>
                                // '15ppm' hard coded in Java property 'MS1_WINDOW_HARD_CODED_PPM'
                            ) : null }
                        */}

                        { ( ( peptideListTable || havePeptideDataTableContentsForDownload ) && this.props.download_Blib_Spectral_Library_ClickHandler ) ? (
                            <Blib_SpectralLibrary_File_Download__MainPage_Link_Component
                                dataPageStateManager={ this.props.dataPageStateManager }
                                download_Blib_Spectral_Library_Callback={ this.props.download_Blib_Spectral_Library_ClickHandler }
                            />
                        ) : null }

                    </div>
                </div>

                <div >
                    {/* Container for Reported Peptides using Data Table - */}
                    <div>
                        { peptideListTable }
                    </div>
                    { noPeptidesMessage }
                </div>
            </div>
        );
    }

}

