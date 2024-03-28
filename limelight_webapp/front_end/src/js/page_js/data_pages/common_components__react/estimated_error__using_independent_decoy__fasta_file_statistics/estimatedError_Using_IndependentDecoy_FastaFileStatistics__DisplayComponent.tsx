/**
 * estimatedError_Using_IndependentDecoy_FastaFileStatistics__DisplayComponent.tsx
 *
 *  Estimated Error: Using Independent Decoy flag AND Fasta File Statistics
 *
 *
 *
 *  Display Component
 *
 */


import React from "react";
import {Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds";
import {DataPageStateManager} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters";
import {Psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/psm_exclude_independent_decoy_psms/psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject";
import {CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters";
import {
    DataTable_Column,
    DataTable_Column_DownloadTable,
    DataTable_DataRow_ColumnEntry,
    DataTable_DataRow_ColumnEntry_SearchTableData,
    DataTable_DataRowEntry,
    DataTable_DataRowEntry_DownloadTable,
    DataTable_DataRowEntry_DownloadTable_SingleColumn,
    DataTable_RootTableDataObject,
    DataTable_RootTableObject,
    DataTable_TableOptions
} from "page_js/data_pages/data_table_react/dataTable_React_DataObjects";
import {DataTable_TableRoot} from "page_js/data_pages/data_table_react/dataTable_TableRoot_React";
import {CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters";
import {Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__single_protein/js/proteinPage_Display__SingleProtein_Create_GeneratedReportedPeptideListData";
import {ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides";
import {EstimatedError_Using_IndependentDecoy_FastaFileStatistics__ComponentData_FastaFileStatistics_Etc} from "page_js/data_pages/common_components__react/estimated_error__using_independent_decoy__fasta_file_statistics/estimatedError_Using_IndependentDecoy_FastaFileStatistics__ComponentData_FastaFileStatistics_Etc";
import {Estimated_Error__From_IndependentDecoy__CommonCode} from "page_js/data_pages/data_pages_common/estimated_Error__From_IndependentDecoy__CommonCode";


const _ESTIMATED_ERROR_ROUNDING_SIGNIFICANT_DIGITS_COUNT = 3;

/**
 *
 */
interface EstimatedError_Using_IndependentDecoy_FastaFileStatistics__DisplayComponent_Props {

    projectSearchIds : Array<number>;
    searchSubGroup_Ids_Selected : Set<number>;

    dataPageStateManager : DataPageStateManager
    psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject : Psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject
    psm_Exclude_IndependentDecoy_PSMs_UserSelection_Object_Force_ResetToStateObject : object  //  Changes whenever the State Object changes

    psm_EstimatedPsmLevelError_Using_PsmIndependentDecoy_FastaFileStatistics__ComponentData_FastaFileStatistics_Etc: EstimatedError_Using_IndependentDecoy_FastaFileStatistics__ComponentData_FastaFileStatistics_Etc

    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

    //  Recompute when this reference changes
    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds

    //  Peptide Page: Peptide List, Recompute when this reference changes
    create_GeneratedReportedPeptideListData_Result : Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result
    //  Protein Page: Peptide List, Recompute when this reference changes
    proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result : ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result

    show_UpdatingMessage: boolean
}

/**
 *
 */
interface EstimatedError_Using_IndependentDecoy_FastaFileStatistics__DisplayComponent_State {

    error_Computed_DisplayItems?: Array<Internal__DisplayItem>
}

/**
 *
 */
export class EstimatedError_Using_IndependentDecoy_FastaFileStatistics__DisplayComponent extends React.Component< EstimatedError_Using_IndependentDecoy_FastaFileStatistics__DisplayComponent_Props, EstimatedError_Using_IndependentDecoy_FastaFileStatistics__DisplayComponent_State > {

    private _renderComponent: boolean;

    private _componentMounted: boolean = false;

    private _proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder>

    private _psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder>

    private _searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder>;

    /**
     *
     */
    constructor(props: EstimatedError_Using_IndependentDecoy_FastaFileStatistics__DisplayComponent_Props) {
        super(props);

        if ( ( ! props.create_GeneratedReportedPeptideListData_Result ) && ( ! props.proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result ) ) {
            const msg = "props.create_GeneratedReportedPeptideListData_Result AND props.proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result NOT populated.  EstimatedError_Using_IndependentDecoy_FastaFileStatistics__DisplayComponent::constructor"
            console.warn(msg)
            throw Error(msg)
        }

        if ( ( props.create_GeneratedReportedPeptideListData_Result ) && ( props.proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result ) ) {
            const msg = "props.create_GeneratedReportedPeptideListData_Result AND props.proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result BOTH populated.  EstimatedError_Using_IndependentDecoy_FastaFileStatistics__DisplayComponent::constructor"
            console.warn(msg)
            throw Error(msg)
        }

        let anySearch_Have_Both__PSMs_with_IndependentDecoy_True_AND_FastaFileStatistics = false;

        for ( const projectSearchId of props.projectSearchIds ) {

            let have__fastaFileStatistics_For_ProjectSearchId = false;
            if ( props.psm_EstimatedPsmLevelError_Using_PsmIndependentDecoy_FastaFileStatistics__ComponentData_FastaFileStatistics_Etc.fastaFileStatistics_Holder ) {
                const fastaFileStatistics_For_ProjectSearchId =
                    props.psm_EstimatedPsmLevelError_Using_PsmIndependentDecoy_FastaFileStatistics__ComponentData_FastaFileStatistics_Etc.fastaFileStatistics_Holder.
                    get_FastaFileStatistics_For_ProjectSearchId(projectSearchId);

                if ( fastaFileStatistics_For_ProjectSearchId ) {
                    have__fastaFileStatistics_For_ProjectSearchId = true;
                }
            }
            const flags_SingleSearch_ForProjectSearchId = props.dataPageStateManager.get_DataPage_common_Searches_Flags().get_DataPage_common_Flags_SingleSearch_ForProjectSearchId(projectSearchId)
            if ( ! flags_SingleSearch_ForProjectSearchId ) {
                throw Error("props.dataPageStateManager.get_DataPage_common_Searches_Flags().get_DataPage_common_Flags_SingleSearch_ForProjectSearchId(projectSearchId) returned NOTHING for projectSearchId: " + projectSearchId)
            }

            if ( have__fastaFileStatistics_For_ProjectSearchId && flags_SingleSearch_ForProjectSearchId.anyPsmHas_IsIndependentDecoy_True ) {
                anySearch_Have_Both__PSMs_with_IndependentDecoy_True_AND_FastaFileStatistics = true;
                break;
            }
        }

        if ( anySearch_Have_Both__PSMs_with_IndependentDecoy_True_AND_FastaFileStatistics ) {
            this._renderComponent = true;
        } else {
            this._renderComponent = false;
        }

        this.state = {}
    }

    /**
     *
     */
    componentDidMount() {
        this._componentMounted = true;
        try {
            if ( ! this._renderComponent ) {
                //  Component not rendering so skip
                return; // EARLY RETURN
            }

            const promise = this._get_Data();
            if ( ! promise ) {

                this._compute_Error_SetInState();

                return; // EARLY RETURN
            }

            promise.catch(reason => {

            })

            promise.then(noValue => { try {
                if ( ! this._componentMounted ) {
                    // component not mounted so exit
                    return; // EARLY RETURN
                }

                this._compute_Error_SetInState();

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})


        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    componentWillUnmount() {
        this._componentMounted = false;
    }

    /**
     *
     */
    componentDidUpdate(prevProps: Readonly<EstimatedError_Using_IndependentDecoy_FastaFileStatistics__DisplayComponent_Props>, prevState: Readonly<EstimatedError_Using_IndependentDecoy_FastaFileStatistics__DisplayComponent_State>, snapshot?: any) {
        try {
            if ( ! this._renderComponent ) {
                //  Component not rendering so skip
                return; // EARLY RETURN
            }

            if ( ! this._psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId ) {
                //  still loading data so ignore.
                //  will compute using latest reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds, etc after promises resolve
                return; // EARLY RETURN
            }

            if (prevProps.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds !== this.props.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds
                || prevProps.create_GeneratedReportedPeptideListData_Result !== this.props.create_GeneratedReportedPeptideListData_Result
                || prevProps.proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result !== this.props.proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result
                || prevProps.psm_EstimatedPsmLevelError_Using_PsmIndependentDecoy_FastaFileStatistics__ComponentData_FastaFileStatistics_Etc !== this.props.psm_EstimatedPsmLevelError_Using_PsmIndependentDecoy_FastaFileStatistics__ComponentData_FastaFileStatistics_Etc
                || prevProps.psm_Exclude_IndependentDecoy_PSMs_UserSelection_Object_Force_ResetToStateObject !== this.props.psm_Exclude_IndependentDecoy_PSMs_UserSelection_Object_Force_ResetToStateObject ) {

                this._compute_Error_SetInState();
            }
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     * @returns Promise or null
     */
    private _get_Data() : Promise<void> {

        const proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder> = new Map();

        const psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder> = new Map();

        //  Populate when this.props.searchSubGroup_Ids_Selected is populated

        let searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder>

        const promises: Array<Promise<void>> = [];

        for ( const projectSearchId of this.props.projectSearchIds ) {

            const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
                this.props.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
                    .get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId);
            if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
                throw Error("commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId); returned Nothing for projectSearchId: " + projectSearchId )
            }

            {
                const get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result =
                    commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                    get_commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters().
                    get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch();

                if ( get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.data ) {
                    proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId.set(
                        projectSearchId, get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.data.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder
                    )
                } else if ( get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise ) {
                    const promise = new Promise<void>((resolve, reject) => { try {
                        get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise.catch(reason => reject(reason))
                        get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise.then(value => { try {
                            proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId.set(
                                projectSearchId, value.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder
                            );
                            resolve();
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    promises.push(promise)
                } else {
                    throw Error("get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result no  data or promise")
                }
            }
            {
                const get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result =
                    commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                    get_commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters().
                    get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch();

                if ( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.data ) {
                    psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.set(
                        projectSearchId, get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.data.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
                    );
                } else if ( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise ) {
                    const promise = new Promise<void>((resolve, reject) => { try {
                        get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.catch(reason => reject(reason))
                        get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.then(value => { try {
                            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.set(
                                projectSearchId, value.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
                            );
                            resolve();
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    promises.push(promise)
                } else {
                    throw Error("get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result no  data or promise")
                }
            }
            {
                if ( this.props.projectSearchIds.length === 1 && this.props.searchSubGroup_Ids_Selected ) {
                    //  Get data per Search Sub Group

                    {  //  Mapping PSM Id to searchSubGroup_Id

                        const get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder_AllForSearch_Result =
                            commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                            get_commonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters().
                            get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder_AllForSearch();

                        if ( get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder_AllForSearch_Result.data ) {
                            if ( ! searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId ) {
                                searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId = new Map();
                            }
                            searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.set(
                                projectSearchId, get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder_AllForSearch_Result.data.searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder
                            );
                        } else if ( get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder_AllForSearch_Result.promise ) {
                            const promise = new Promise<void>((resolve, reject) => { try {
                                get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder_AllForSearch_Result.promise.catch(reason => reject(reason))
                                get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder_AllForSearch_Result.promise.then(value => { try {
                                    if ( ! searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId ) {
                                        searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId = new Map();
                                    }
                                    searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.set(
                                        projectSearchId, value.searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder
                                    );
                                    resolve();
                                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                            promises.push(promise)
                        } else {
                            throw Error("get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result no  data or promise")
                        }
                    }
                }
            }
        }

        if ( promises.length === 0 ) {

            this._proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId = proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId;
            this._psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId = psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId;
            this._searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId = searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId;

            return null; // EARLY RETURN;
        }

        const promisesAll = Promise.all(promises);

        return new Promise<void>((resolve, reject) => {
            promisesAll.catch(reason => reject(reason))
            promisesAll.then(noValue => { try {
                this._proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId = proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId;
                this._psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId = psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId;
                this._searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId = searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId;

                resolve();

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        })
    }

    /**
     *
     */
    private _compute_Error_SetInState() {

        if (
            ( ( ! this.props.proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result )
                    && ( ! this.props.create_GeneratedReportedPeptideListData_Result ) )
            || ( ! this.props.psm_EstimatedPsmLevelError_Using_PsmIndependentDecoy_FastaFileStatistics__ComponentData_FastaFileStatistics_Etc )
        ) {
            //  Not have all data yet so exit
            return; // EARLY RETURN
        }

        const peptideList_InternalCommonClass = this._copy_PeptidePSM_Data_To_Internal_Classes();

        const error_Computed_DisplayItems: Array<Internal__DisplayItem> = [];

        for ( const projectSearchId of this.props.projectSearchIds ) {

            const error_Computed_DisplayItem = this._compute_Error_SingleSearch({ projectSearchId, peptideList_InternalCommonClass });
            if ( error_Computed_DisplayItem ) {
                error_Computed_DisplayItems.push(error_Computed_DisplayItem)
            }
        }

        this.setState({ error_Computed_DisplayItems });
    }

    /**
     *
     */
    private _copy_PeptidePSM_Data_To_Internal_Classes() : Internal_Common__PeptideList {

        const result_peptideList: Array<Internal_Common__PeptideList_Entry> = []

        if ( this.props.proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result ) {

            for ( const peptideEntry of this.props.proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result.peptideList ) {

                const result_dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId : Map<number, Map<number, Internal_Common__PeptideList_PerReportedPeptideId_Entry>> = new Map()

                for ( const mapEntry of peptideEntry.dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId.entries() ) {
                    const projectSearchId = mapEntry[0];
                    const dataPerReportedPeptideId_Map_Key_reportedPeptideId = mapEntry[1]

                    const result_dataPerReportedPeptideId_Map_Key_reportedPeptideId : Map<number, Internal_Common__PeptideList_PerReportedPeptideId_Entry> = new Map()
                    result_dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId.set(projectSearchId, result_dataPerReportedPeptideId_Map_Key_reportedPeptideId)

                    for ( const dataPerReportedPeptideId of dataPerReportedPeptideId_Map_Key_reportedPeptideId.values() ) {

                        const resultEntry = new Internal_Common__PeptideList_PerReportedPeptideId_Entry({
                            reportedPeptideId: dataPerReportedPeptideId.reportedPeptideId,
                            no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId: dataPerReportedPeptideId.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId,
                            psmIdsSet: dataPerReportedPeptideId.psmIdsSet
                        })
                        result_dataPerReportedPeptideId_Map_Key_reportedPeptideId.set( dataPerReportedPeptideId.reportedPeptideId, resultEntry );
                    }
                }

                const result_peptideEntry: Internal_Common__PeptideList_Entry = { dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId: result_dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId };

                result_peptideList.push( result_peptideEntry )
            }

        } else if ( this.props.create_GeneratedReportedPeptideListData_Result ) {

            for ( const peptideEntry of this.props.create_GeneratedReportedPeptideListData_Result.peptideList ) {

                const result_dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId : Map<number, Map<number, Internal_Common__PeptideList_PerReportedPeptideId_Entry>> = new Map()

                for ( const mapEntry of peptideEntry.dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId.entries() ) {
                    const projectSearchId = mapEntry[0];
                    const dataPerReportedPeptideId_Map_Key_reportedPeptideId = mapEntry[1]

                    const result_dataPerReportedPeptideId_Map_Key_reportedPeptideId : Map<number, Internal_Common__PeptideList_PerReportedPeptideId_Entry> = new Map()
                    result_dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId.set(projectSearchId, result_dataPerReportedPeptideId_Map_Key_reportedPeptideId)

                    for ( const dataPerReportedPeptideId of dataPerReportedPeptideId_Map_Key_reportedPeptideId.values() ) {

                        const resultEntry = new Internal_Common__PeptideList_PerReportedPeptideId_Entry({
                            reportedPeptideId: dataPerReportedPeptideId.reportedPeptideId,
                            no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId: dataPerReportedPeptideId.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId,
                            psmIdsSet: dataPerReportedPeptideId.psmIdsSet
                        })
                        result_dataPerReportedPeptideId_Map_Key_reportedPeptideId.set( dataPerReportedPeptideId.reportedPeptideId, resultEntry );
                    }
                }

                const result_peptideEntry: Internal_Common__PeptideList_Entry = { dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId: result_dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId };

                result_peptideList.push( result_peptideEntry )
            }

        } else {
            const msg = "Both are NOT populated:  this.props.proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result, this.props.create_GeneratedReportedPeptideListData_Result"
            console.warn(msg)
            throw Error(msg)
        }

        const result: Internal_Common__PeptideList = { peptideList: result_peptideList };

        return result;
    }

    /**
     *
     */
    private _compute_Error_SingleSearch(
        {
            projectSearchId, peptideList_InternalCommonClass
        } : {
            projectSearchId: number
            peptideList_InternalCommonClass: Internal_Common__PeptideList

        }) : Internal__DisplayItem {


        const searchNames_AsMap_Entry = this.props.dataPageStateManager.get_searchNames_AsMap().get(projectSearchId);
        if ( ! searchNames_AsMap_Entry ) {
            throw Error("this.props.dataPageStateManager.get_searchNames_AsMap().get(projectSearchId); returned Nothing for projectSearchId: " + projectSearchId)
        }
        const searchId = searchNames_AsMap_Entry.searchId

        const result: Internal__DisplayItem = {
            searchId
        }

        // I = total independent decoys in FASTA
        // T = total targets (non-independent decoys and non-decoys) in FASTA
        //
        // p = I/(I+T)
        //
        // i = total independent decoys that pass filters
        // t = total targets (non-independent decoys and non-decoys) that pass filters
        //
        // estimated error = (i/p) / (i+t)

        const fastaFileStatistics_SingleSearch_Entry =
            this.props.psm_EstimatedPsmLevelError_Using_PsmIndependentDecoy_FastaFileStatistics__ComponentData_FastaFileStatistics_Etc.fastaFileStatistics_Holder.get_FastaFileStatistics_For_ProjectSearchId(projectSearchId)

        if ( ! fastaFileStatistics_SingleSearch_Entry ) {
            //  No Fasta File Statistics so flag as N/A
            result.noErrorComputed = true;

            return result; // EARLY RETURN
        }

        if ( fastaFileStatistics_SingleSearch_Entry.numIndependentDecoys === 0 ) {
            //  No PSM Independent Decoys in Fasta File Statistics so flag as N/A
            result.noErrorComputed = true;

            return result; // EARLY RETURN
        }

        let number_PSM_Target = 0;
        let number_PSM_IndependentDecoy = 0;

        // Independent decoy peptide is a peptide that either has either: 1) only independent decoy PSMs or 2) maps exclusively to independent decoy proteins

        let number_DistinctPeptide_Target = 0;
        let number_DistinctPeptide_IndependentDecoy = 0;


        const psmTblData_For_ReportedPeptideId_For_MainFilters_Holder = this._psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.get(projectSearchId);
        if ( ! psmTblData_For_ReportedPeptideId_For_MainFilters_Holder ) {
            throw Error("this._psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.get(projectSearchId); returned Nothing for projectSearchId: " + projectSearchId)
        }


        const peptideList = peptideList_InternalCommonClass.peptideList;

        for ( const peptide_Entry of peptideList ) {

            const dataPerReportedPeptideId_Map_Key_reportedPeptideId = peptide_Entry.dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId.get(projectSearchId);

            if ( ! dataPerReportedPeptideId_Map_Key_reportedPeptideId ) {
                //  Nothing for projectSearchId so skip
                continue; // EARLY CONTINUE
            }

            let all_PSM_For_DistinctPeptide__Are__IndependentDecoy = true;

            for ( const dataPerReportedPeptideId of dataPerReportedPeptideId_Map_Key_reportedPeptideId.values() ) {

                const reportedPeptideId = dataPerReportedPeptideId.reportedPeptideId;

                if ( dataPerReportedPeptideId.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId ) {

                    const psmTblData_For_ReportedPeptideId = psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_ReportedPeptideId(reportedPeptideId);
                    if ( ! psmTblData_For_ReportedPeptideId ) {
                        throw Error("psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_ReportedPeptideId(reportedPeptideId); returned Nothing for reportedPeptideId: " + reportedPeptideId)
                    }
                    for ( const psmTblData of psmTblData_For_ReportedPeptideId.get_PsmTblData_Entries_IterableIterator() ) {

                        if ( this.props.projectSearchIds.length === 1 && this.props.searchSubGroup_Ids_Selected && this._searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId ) {

                            const searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder = this._searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.get(projectSearchId);
                            if ( ! searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder ) {
                                throw Error("this._searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.get(projectSearchId); returned Nothing for projectSearchId: " + projectSearchId );
                            }

                            const searchSubGroupId = searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder.get_subGroupId_For_PsmId(psmTblData.psmId);
                            if ( searchSubGroupId === undefined || searchSubGroupId === null ) {
                                throw Error("searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder.get_subGroupId_For_PsmId(psmTblData.psmId); returned Nothing for psmTblData.psmId: " + psmTblData.psmId );
                            }

                            if ( ! this.props.searchSubGroup_Ids_Selected.has( searchSubGroupId ) ) {
                                // Skip since PSM is not in selected searchSubGroupIds
                                continue;  //  EARLY CONTINUE
                            }
                        }

                        if ( psmTblData.independentDecoyPSM ) {
                            number_PSM_IndependentDecoy++;
                        } else {
                            //  NO Decoy PSMs are in this data so this is Target PSM
                            number_PSM_Target++;

                            all_PSM_For_DistinctPeptide__Are__IndependentDecoy = false;
                        }
                    }
                } else if ( dataPerReportedPeptideId.psmIdsSet ) {
                    for ( const psmId of dataPerReportedPeptideId.psmIdsSet ) {
                        const psmTblData = psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_PsmId(psmId);
                        if ( ! psmTblData ) {
                            throw Error("psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_PsmId(psmId); returned Nothing for psmId: " + psmId)
                        }
                        if ( psmTblData.independentDecoyPSM ) {
                            number_PSM_IndependentDecoy++;
                        } else {
                            //  NO Decoy PSMs are in this data so this is Target PSM
                            number_PSM_Target++;

                            all_PSM_For_DistinctPeptide__Are__IndependentDecoy = false;
                        }
                    }
                } else {
                    const msg = "dataPerReportedPeptideId no psmIdsSet or no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId"
                    console.warn(msg)
                    throw Error(msg)
                }
            }

            if ( all_PSM_For_DistinctPeptide__Are__IndependentDecoy ) {

                number_DistinctPeptide_IndependentDecoy++;
            } else {

                //  Check if all mapped Proteins are Independent Decoy

                let all_Proteins_For_DistinctPeptide__Are__IndependentDecoy = true;

                const proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder = this._proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId.get(projectSearchId);
                if ( ! proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder ) {
                    const msg = "this._proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId.get(projectSearchId); returned Nothing for projectSearchId: " + projectSearchId;
                    console.warn(msg)
                    throw Error(msg)
                }

                for ( const dataPerReportedPeptideId of dataPerReportedPeptideId_Map_Key_reportedPeptideId.values() ) {

                    const reportedPeptideId = dataPerReportedPeptideId.reportedPeptideId;

                    const all_ProteinSequenceVersionId_Entries__IndependentDecoy_True = proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder.get_all_ProteinSequenceVersionId_Entries__IndependentDecoy_True_Map_Key_ReportedPeptideId(reportedPeptideId)
                    if ( all_ProteinSequenceVersionId_Entries__IndependentDecoy_True === undefined || all_ProteinSequenceVersionId_Entries__IndependentDecoy_True === null ) {
                        const msg = "proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder.get_all_ProteinSequenceVersionId_Entries__IndependentDecoy_True_Map_Key_ReportedPeptideId(reportedPeptideId); returned undefined or null for reportedPeptideId: " + reportedPeptideId + ", projectSearchId: " + projectSearchId;
                        console.warn(msg)
                        throw Error(msg)
                    }
                    if ( ! all_ProteinSequenceVersionId_Entries__IndependentDecoy_True ) {
                        all_Proteins_For_DistinctPeptide__Are__IndependentDecoy = false;
                        break;
                    }
                }

                if ( all_Proteins_For_DistinctPeptide__Are__IndependentDecoy ) {

                    number_DistinctPeptide_IndependentDecoy++;
                } else {

                    number_DistinctPeptide_Target++;
                }

            }
        }

        if ( ( number_PSM_IndependentDecoy + number_PSM_Target ) === 0 ) {
            //  No PSMs pass filter
            result.noPsmsPassFilter = true;

            return result; // EARLY RETURN
        }

        // I = total independent decoys in FASTA
        // T = total targets (non-independent decoys and non-decoys) in FASTA
        //
        // p = I/(I+T)
        const p = fastaFileStatistics_SingleSearch_Entry.numIndependentDecoys / ( fastaFileStatistics_SingleSearch_Entry.numIndependentDecoys + fastaFileStatistics_SingleSearch_Entry.numTargets );

        {  //  Compute psm_Estimated_Error

            // i = total independent decoys that pass filters
            // t = total targets (non-independent decoys and non-decoys) that pass filters
            //
            // estimated error = (i/p) / (i+t)

            const estimated_Error = ( number_PSM_IndependentDecoy / p ) / ( number_PSM_IndependentDecoy + number_PSM_Target );

            const estimated_Error_Clamped = Estimated_Error__From_IndependentDecoy__CommonCode.estimatedError_ClampTo_Zero_To_One( estimated_Error );

            result.psm_Estimated_Error = estimated_Error_Clamped;
        }

        {  //  Compute distinctPeptide_Estimated_Error

            // i = number of distinct independent decoy peptides
            // t = number of distinct target peptides (non independent decoys)
            //
            // estimated error = (i/p) / (i+t)
            const estimated_Error = ( number_DistinctPeptide_IndependentDecoy / p ) / ( number_DistinctPeptide_IndependentDecoy + number_DistinctPeptide_Target );

            const estimated_Error_Clamped = Estimated_Error__From_IndependentDecoy__CommonCode.estimatedError_ClampTo_Zero_To_One( estimated_Error );

            result.distinctPeptide_Estimated_Error = estimated_Error_Clamped;
        }

        return result;
    }

    /**
     *
     */
    render() {
        if ( ! this._renderComponent) {
            //  Nothing to render since no input data

            return null; // EARLY RETURN
        }

        const mainBlock_Style: React.CSSProperties = { marginLeft: 20 };


        if ( this.props.psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject.get_psm_Exclude_IndependentDecoy_PSMs() ) {

            return (
                <div>
                    { this._render_CommonHeading() }
                    <div style={ mainBlock_Style }>
                        N/A: Currently excluding independent decoys
                    </div>
                </div>
            )
        }

        if ( ! this.state.error_Computed_DisplayItems ) {
            return (
                <div>
                    { this._render_CommonHeading() }
                    <div style={ mainBlock_Style }>
                        Loading Data...
                    </div>
                </div>
            )
        }

        if ( this.props.show_UpdatingMessage ) {
            return (
                <div>
                    { this._render_CommonHeading() }
                    <div style={ mainBlock_Style }>
                        Updating...
                    </div>
                </div>
            )
        }

        const psm_Exclude_IndependentDecoy_PSMs__FromStateObject = this.props.psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject.get_psm_Exclude_IndependentDecoy_PSMs();

        if ( ( ! psm_Exclude_IndependentDecoy_PSMs__FromStateObject ) && ( ! ( this.state.error_Computed_DisplayItems && this.state.error_Computed_DisplayItems.length > 0 ) ) ) {

            //  Nothing to display yet
            return null; // EARLY RETURN
        }

        return (
            <div>
                { this._render_CommonHeading() }
                <div style={ mainBlock_Style }>
                    { ( this.props.projectSearchIds.length === 1 ) ? (
                        this._render_SingleSearch()
                    ) : (
                        this._render_MultipleSearches()
                    )}
                </div>
            </div>
        )
    }

    /**
     * Common heading, used below
     */
    private _render_CommonHeading() {

        return (
            <div style={ { fontSize: 18, fontWeight: "bold", marginTop: 10, marginBottom: 10 } }>
                Estimated Error Using Independent Decoys:
            </div>
        )
    }

    /**
     * Single Search
     */
    private _render_SingleSearch() {

        const error_Computed_DisplayItem: Internal__DisplayItem = this.state.error_Computed_DisplayItems[0];

        const style_LeftColumn: React.CSSProperties = { whiteSpace: "nowrap", marginRight: 10 }
        const style_RightColumn: React.CSSProperties = { whiteSpace: "nowrap" }

        return (
            <div style={ { display: "grid", gridTemplateColumns: "min-content min-content"} }>
                <div style={ style_LeftColumn }>
                    PSM Estimated Error:
                </div>
                <div style={ style_RightColumn }>
                    { error_Computed_DisplayItem.noErrorComputed ? (
                        <span>N/A</span>
                    ) : ( error_Computed_DisplayItem.noPsmsPassFilter ) ? (
                        <span>N/A: No PSMs</span>
                    ) : (
                        <span>{ error_Computed_DisplayItem.psm_Estimated_Error.toPrecision( _ESTIMATED_ERROR_ROUNDING_SIGNIFICANT_DIGITS_COUNT ) }</span>
                    ) }
                </div>
                <div style={ style_LeftColumn }>
                    Peptide Estimated Error:
                </div>
                <div style={ style_RightColumn }>
                    { error_Computed_DisplayItem.noErrorComputed ? (
                        <span>N/A</span>
                    ) : ( error_Computed_DisplayItem.noPsmsPassFilter ) ? (
                        <span>N/A: No PSMs</span>
                    ) : (
                        <span>{ error_Computed_DisplayItem.distinctPeptide_Estimated_Error.toPrecision( _ESTIMATED_ERROR_ROUNDING_SIGNIFICANT_DIGITS_COUNT ) }</span>
                    ) }
                </div>
            </div>
        );
    }

    /**
     * Multiple Searches
     */
    private _render_MultipleSearches() {

        // column widths:  80, 110

        const dataTable_Columns : Array<DataTable_Column> = [];
        const dataTable_Column_DownloadTable_Entries : Array<DataTable_Column_DownloadTable> = [];

        {
            {
                const displayName = "Search Id";

                const dataTable_Column = new DataTable_Column({
                    id : "search id", // Used for tracking sort order. Keep short
                    displayName,
                    width : 56,
                    sortable : false
                });
                dataTable_Columns.push( dataTable_Column );

                const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
                dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
            }

            { // PSM Estimated Error for a single search

                const displayName = "PSM Est. Error";

                const dataTable_Column = new DataTable_Column({
                    id : "PSM Est. Error", // Used for tracking sort order. Keep short
                    displayName,
                    width : 105,
                    sortable : false
                });
                dataTable_Columns.push( dataTable_Column );

                const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
                dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
            }
            { // Distinct Peptide Estimated Error for a single search

                const displayName = "Peptide Est. Error";

                const dataTable_Column = new DataTable_Column({
                    id : "Peptide Est. Error", // Used for tracking sort order. Keep short
                    displayName,
                    width : 105,
                    sortable : false
                });
                dataTable_Columns.push( dataTable_Column );

                const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
                dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
            }
        }

        const dataTable_DataRowEntries : Array<DataTable_DataRowEntry> = [];
        {
            let index = 0;
            for ( const error_Computed_DisplayItem of this.state.error_Computed_DisplayItems ) {

                const columnEntries: DataTable_DataRow_ColumnEntry[] = [];
                const dataColumns_tableDownload : Array<DataTable_DataRowEntry_DownloadTable_SingleColumn> = [];

                {
                    { // Search Id
                        const searchId_Display = error_Computed_DisplayItem.searchId.toString();
                        const valueDisplay = searchId_Display;
                        const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                        const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                        const columnEntry = new DataTable_DataRow_ColumnEntry({
                            searchTableData,
                            valueDisplay,
                            valueSort: searchId_Display,
                            tooltipText: searchId_Display
                        });
                        columnEntries.push(columnEntry);

                        const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                        dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
                    }
                    { // PSM Estimated Error

                        let valueDisplay: string = undefined;
                        let valueSort: any = undefined;

                        if ( error_Computed_DisplayItem.noErrorComputed ) {
                            valueDisplay = "N/A"
                            valueSort = "N/A"
                        } else if ( error_Computed_DisplayItem.noPsmsPassFilter ) {
                            valueDisplay = "N/A: No PSMs";
                            valueSort = "N/A: No PSMs";
                        } else {
                            valueDisplay = error_Computed_DisplayItem.psm_Estimated_Error.toPrecision( _ESTIMATED_ERROR_ROUNDING_SIGNIFICANT_DIGITS_COUNT );
                            valueSort = error_Computed_DisplayItem.psm_Estimated_Error
                        }

                        const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                        const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                        const columnEntry = new DataTable_DataRow_ColumnEntry({
                            searchTableData,
                            valueDisplay,
                            valueSort
                        });
                        columnEntries.push(columnEntry);

                        const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                        dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
                    }
                    { // Distinct Peptide Estimated Error

                        let valueDisplay: string = undefined;
                        let valueSort: any = undefined;

                        if ( error_Computed_DisplayItem.noErrorComputed ) {
                            valueDisplay = "N/A"
                            valueSort = "N/A"
                        } else if ( error_Computed_DisplayItem.noPsmsPassFilter ) {
                            valueDisplay = "N/A: No Peptides";
                            valueSort = "N/A: No Peptides";
                        } else {
                            valueDisplay = error_Computed_DisplayItem.distinctPeptide_Estimated_Error.toPrecision( _ESTIMATED_ERROR_ROUNDING_SIGNIFICANT_DIGITS_COUNT );
                            valueSort = error_Computed_DisplayItem.distinctPeptide_Estimated_Error
                        }

                        const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                        const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                        const columnEntry = new DataTable_DataRow_ColumnEntry({
                            searchTableData,
                            valueDisplay,
                            valueSort
                        });
                        columnEntries.push(columnEntry);

                        const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                        dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
                    }
                }

                const dataTable_DataRowEntry_DownloadTable = new DataTable_DataRowEntry_DownloadTable({ dataColumns_tableDownload });

                const dataTable_DataRowEntry = new DataTable_DataRowEntry({
                    uniqueId: error_Computed_DisplayItem.searchId,
                    sortOrder_OnEquals: index,
                    columnEntries,
                    dataTable_DataRowEntry_DownloadTable
                })

                dataTable_DataRowEntries.push(dataTable_DataRowEntry);

                index++;
            }
        }

        const dataTable_RootTableDataObject = new DataTable_RootTableDataObject({
            columns: dataTable_Columns,
            columns_tableDownload : dataTable_Column_DownloadTable_Entries,
            dataTable_DataRowEntries
        });

        const dataTable_TableOptions = new DataTable_TableOptions({enable_Pagination_Download_Search: false});

        const dataTable_RootTableObject = new DataTable_RootTableObject({
            tableDataObject : dataTable_RootTableDataObject,
            dataTableId : "Per Search Summary Table",
            tableOptions : dataTable_TableOptions
        })

        return (
            <div >
                <DataTable_TableRoot
                    tableObject={ dataTable_RootTableObject }
                />
            </div>
        );
    }

}

/**
 *
 */
class Internal__DisplayItem {

    searchId: number
    psm_Estimated_Error?: number
    distinctPeptide_Estimated_Error?: number
    noErrorComputed?: boolean
    noPsmsPassFilter?: boolean
}


/**
 * Common between Peptide Page and Protein Page
 */
class Internal_Common__PeptideList {

    peptideList: Array<Internal_Common__PeptideList_Entry>
}

/**
 * Common between Peptide Page and Protein Page
 */
class Internal_Common__PeptideList_Entry {

    dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId : Map<number, Map<number, Internal_Common__PeptideList_PerReportedPeptideId_Entry>>
}

/**
 * Common between Peptide Page and Protein Page
 */
class Internal_Common__PeptideList_PerReportedPeptideId_Entry {

    reportedPeptideId : Readonly<number>

    //  Only 1 of the next 2 is set
    no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId : Readonly<boolean>  //  Also within Sub Group
    psmIdsSet : Set<number>

    constructor({ reportedPeptideId, no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId, psmIdsSet } : {
        reportedPeptideId : Readonly<number>
        //  Only 1 of the next 2 is set
        no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId : Readonly<boolean>
        psmIdsSet : Set<number>
    }) {
        if ( no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId && psmIdsSet ) {
            const msg = "( allPsmIds_For_ReportedPeptideId_within_ProjectSearchId && psmIdsSet ): Internal_Common__PeptideList_PerReportedPeptideId_Entry. "
            console.warn( msg )
            throw Error( msg )
        }
        this.reportedPeptideId = reportedPeptideId
        this.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId = no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId
        this.psmIdsSet = psmIdsSet
    }
}