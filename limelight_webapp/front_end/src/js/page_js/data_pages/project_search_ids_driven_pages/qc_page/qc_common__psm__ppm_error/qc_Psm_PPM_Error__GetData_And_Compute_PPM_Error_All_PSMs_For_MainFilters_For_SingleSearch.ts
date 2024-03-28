/**
 * qc_Psm_PPM_Error__GetData_And_Compute_PPM_Error_All_PSMs_For_MainFilters_For_SingleSearch.ts
 *
 * PSM PPM Error - Get Data and Compute PPM Error for All PSMs that pass Main PSM/Peptide/Protein Filters in Search Details
 *
 * For Single Search
 *
 */

import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import { QcViewPage_CommonData_To_AllComponents_From_MainComponent } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import { CommonData_LoadedFromServer_SingleSearch__ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch";
import {
    CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder,
    CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_DataForSingleScanNumber
} from "page_js/data_pages/common_data_loaded_from_server__scan_data__from_project_scan_file_id/commonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data";
import { CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters_Holder } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters";
import { CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters";
import { CommonData_LoadedFromServer_SingleSearch__StaticModifications_Holder } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__StaticModifications";
import { CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters";
import { CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters";
import { CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_common_across_searches_sub_parts__returned_objects/commonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters";
import { C13_MASS_DELTA, PeptideMassCalculator } from "page_js/data_pages/peptide_mass_utils/PeptideMassCalculator";


/**
 *
 */
export class Qc_Psm_PPM_Error__GetData_And_Compute_PPM_Error_All_PSMs_For_MainFilters_For_SingleSearch__Result {

    private _ppm_Error_Map_Key_PsmId: Map<number, Qc_Psm_PPM_Error__GetData_And_Compute_PPM_Error_All_PSMs_For_MainFilters_For_SingleSearch__Result__Single_PSM>
    private _ppm_Error_For_PSMs_For_ReportedPeptideId_Map_Key_ReportedPeptideId: Map<number, Qc_Psm_PPM_Error__GetData_And_Compute_PPM_Error_All_PSMs_For_MainFilters_For_SingleSearch__Result_For_PSMs_For_ReportedPeptideId>

    constructor(
        {
            ppm_Error_Map_Key_PsmId, ppm_Error_For_PSMs_For_ReportedPeptideId_Map_Key_ReportedPeptideId
        } : {
            ppm_Error_Map_Key_PsmId: Map<number, Qc_Psm_PPM_Error__GetData_And_Compute_PPM_Error_All_PSMs_For_MainFilters_For_SingleSearch__Result__Single_PSM>
            ppm_Error_For_PSMs_For_ReportedPeptideId_Map_Key_ReportedPeptideId: Map<number, Qc_Psm_PPM_Error__GetData_And_Compute_PPM_Error_All_PSMs_For_MainFilters_For_SingleSearch__Result_For_PSMs_For_ReportedPeptideId>
        }
    ) {
        this._ppm_Error_Map_Key_PsmId = ppm_Error_Map_Key_PsmId
        this._ppm_Error_For_PSMs_For_ReportedPeptideId_Map_Key_ReportedPeptideId = ppm_Error_For_PSMs_For_ReportedPeptideId_Map_Key_ReportedPeptideId
    }

    get_PPM_Error_For_PsmId( psmId: number ) {
        return this._ppm_Error_Map_Key_PsmId.get( psmId )
    }

    get_PPM_Error__PSMs_For_ReportedPeptideId( reportedPeptideId: number ) {
        return this._ppm_Error_For_PSMs_For_ReportedPeptideId_Map_Key_ReportedPeptideId.get( reportedPeptideId )
    }
}

/**
 *
 */
export class Qc_Psm_PPM_Error__GetData_And_Compute_PPM_Error_All_PSMs_For_MainFilters_For_SingleSearch__Result_For_PSMs_For_ReportedPeptideId {

    dataForPsms_For_ReportedPeptideId_Array: ReadonlyArray<Qc_Psm_PPM_Error__GetData_And_Compute_PPM_Error_All_PSMs_For_MainFilters_For_SingleSearch__Result__Single_PSM>
}

/**
 *
 */
export class Qc_Psm_PPM_Error__GetData_And_Compute_PPM_Error_All_PSMs_For_MainFilters_For_SingleSearch__Result__Single_PSM {

    readonly psmId: number;
    readonly reportedPeptideId: number;
    readonly ppmError: number;
    readonly retentionTimeSeconds: number;
    readonly precursor_M_Over_Z: number;
}


export const qc_Psm_PPM_Error__GetData_And_Compute_PPM_Error_All_PSMs_For_MainFilters_For_SingleSearch = function (
    {
        projectSearchId,
        qcViewPage_CommonData_To_AllComponents_From_MainComponent
    } : {
        projectSearchId: number
        qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    }
) : Promise<Qc_Psm_PPM_Error__GetData_And_Compute_PPM_Error_All_PSMs_For_MainFilters_For_SingleSearch__Result> {

    return new Promise<Qc_Psm_PPM_Error__GetData_And_Compute_PPM_Error_All_PSMs_For_MainFilters_For_SingleSearch__Result>((resolve, reject) => {
        try {
            _actualGet_Call_Resolve_Reject({ resolve_TopLevel: resolve, reject_TopLevel: reject, projectSearchId, qcViewPage_CommonData_To_AllComponents_From_MainComponent })

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    })
}

/**
 *
 */
const _actualGet_Call_Resolve_Reject = function (
    {
        resolve_TopLevel,
        reject_TopLevel,
        projectSearchId,
        qcViewPage_CommonData_To_AllComponents_From_MainComponent
    } : {
        resolve_TopLevel: ( result: Qc_Psm_PPM_Error__GetData_And_Compute_PPM_Error_All_PSMs_For_MainFilters_For_SingleSearch__Result ) => void
        reject_TopLevel: ( reason: any ) => void

        projectSearchId: number
        qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    }
) {

    const qcPage_Flags_SingleSearch_ForProjectSearchId =
        qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcPage_Searches_Flags.get_DataPage_common_Flags_SingleSearch_ForProjectSearchId( projectSearchId );
    if ( ! qcPage_Flags_SingleSearch_ForProjectSearchId ) {
        const msg = "qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcPage_Searches_Flags.get_QcPage_Flags_SingleSearch_ForProjectSearchId( projectSearchId ); returned nothing for projectSearchId: " + projectSearchId;
        console.warn(msg);
        throw Error(msg);
    }
    const qcPage_Searches_Info_SingleSearch_ForProjectSearchId =
        qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcPage_Searches_Info.get_DataPage_common_Searches_Info_SingleSearch_ForProjectSearchId( projectSearchId );
    if ( ! qcPage_Searches_Info_SingleSearch_ForProjectSearchId ) {
        const msg = "qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcPage_Searches_Info.get_QcPage_Searches_Info_SingleSearch_ForProjectSearchId( projectSearchId ); returned nothing for projectSearchId: " + projectSearchId;
        console.warn(msg);
        throw Error(msg);
    }

    
    
    const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
        qcViewPage_CommonData_To_AllComponents_From_MainComponent.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId)
    if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
        throw Error("qcViewPage_CommonData_To_AllComponents_From_MainComponent.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId) returned NOTHING for projectSearchId: " + projectSearchId )
    }

    let peptideSequences_For_MainFilters_Holder: CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder
    let peptideIds_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder
    let variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder
    let staticMods_Holder: CommonData_LoadedFromServer_SingleSearch__StaticModifications_Holder
    let psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder
    let openModifications_On_PSM_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters_Holder
    let scanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder: CommonData_LoadedFromServer_SingleSearch__ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder
    const scanData_NO_Peaks_Data_Holder__Map_Key_SearchScanFileId: Map<number, CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder> = new Map()

    const promises_Internal_TopLevel: Array<Promise<void>> = []

    {  // Peptide Sequences
        const promise = new Promise<void>((resolve, reject) => { try {
            const promise__get_PeptideSequencesHolder_AllForAllSearches_ReturnPromise =
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                get_ParentObject().get__commonData_LoadedFromServer__CommonAcrossSearches().
                get_commonData_LoadedFromServer_SingleSearch__PeptideSequences_For_MainFilters().
                get_PeptideSequencesHolder_AllForAllSearches_ReturnPromise()
            promise__get_PeptideSequencesHolder_AllForAllSearches_ReturnPromise.catch(reason => reject(reason))
            promise__get_PeptideSequencesHolder_AllForAllSearches_ReturnPromise.then(value => { try {
                peptideSequences_For_MainFilters_Holder = value.peptideSequences_For_MainFilters_Holder
                resolve()
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        promises_Internal_TopLevel.push(promise)
    }

    {  // Peptide Ids
        const promise = new Promise<void>((resolve, reject) => { try {
            const promise__get_PeptideIdsHolder_AllForSearch_ReturnPromise =
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters().
                get_PeptideIdsHolder_AllForSearch_ReturnPromise()
            promise__get_PeptideIdsHolder_AllForSearch_ReturnPromise.catch(reason => reject(reason))
            promise__get_PeptideIdsHolder_AllForSearch_ReturnPromise.then(value => { try {
                peptideIds_For_MainFilters_Holder = value.peptideIds_For_MainFilters_Holder
                resolve()
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        promises_Internal_TopLevel.push(promise)
    }

    {  //  Reported Peptide level Variable Mods
        const promise = new Promise<void>((resolve, reject) => { try {
            const promise__get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_ReturnPromise =
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters().
                get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_ReturnPromise()
            promise__get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_ReturnPromise.catch(reason => reject(reason))
            promise__get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_ReturnPromise.then(value => { try {
                variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder = value.variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder
                resolve()
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        promises_Internal_TopLevel.push(promise)
    }

    {  //  Static Mods
        const promise = new Promise<void>((resolve, reject) => { try {
            const promise__get_StaticModsHolder_ReturnPromise =
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__StaticModifications().
                get_StaticModsHolder_ReturnPromise()
            promise__get_StaticModsHolder_ReturnPromise.catch(reason => reject(reason))
            promise__get_StaticModsHolder_ReturnPromise.then(value => { try {
                staticMods_Holder = value.staticMods_Holder
                resolve()
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        promises_Internal_TopLevel.push(promise)
    }

    {  //  PSM Data
        const promise = new Promise<void>((resolve, reject) => { try {
            const promise__get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_ReturnPromise =
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters().
                get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_ReturnPromise()
            promise__get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_ReturnPromise.catch(reason => reject(reason))
            promise__get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_ReturnPromise.then(value => { try {
                psmTblData_For_ReportedPeptideId_For_MainFilters_Holder = value.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
                resolve()
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        promises_Internal_TopLevel.push(promise)
    }

    if ( qcPage_Flags_SingleSearch_ForProjectSearchId.anyPsmHas_OpenModifications ) {
        //  PSM Open Mods
        const promise = new Promise<void>((resolve, reject) => { try {
            const promise__get_OpenModifications_On_PSMHolder_AllForSearch_ReturnPromise =
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters()
                    .get_OpenModifications_On_PSMHolder_AllForSearch_ReturnPromise()
            promise__get_OpenModifications_On_PSMHolder_AllForSearch_ReturnPromise.catch(reason => { reject(reason) })
            promise__get_OpenModifications_On_PSMHolder_AllForSearch_ReturnPromise.then(value => { try {
                openModifications_On_PSM_For_MainFilters_Holder = value.openModifications_On_PSM_For_MainFilters_Holder
                resolve()
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        promises_Internal_TopLevel.push(promise)
    }

    if ( ( ! qcPage_Flags_SingleSearch_ForProjectSearchId.allPsmHave_Precursor_M_Over_Z_PossiblyNull ) || ( ! qcPage_Flags_SingleSearch_ForProjectSearchId.allPsmHave_Precursor_RetentionTime_PossiblyNull ) ) {

        if ( ! qcPage_Flags_SingleSearch_ForProjectSearchId.hasScanData ) {
            throw Error("( ! qcPage_Flags_SingleSearch_ForProjectSearchId.hasScanData ) AND ( ( ! qcPage_Flags_SingleSearch_ForProjectSearchId.allPsmHave_Precursor_M_Over_Z_PossiblyNull ) || ( ! qcPage_Flags_SingleSearch_ForProjectSearchId.allPsmHave_Precursor_RetentionTime_PossiblyNull ) ) projectSearchId: " + projectSearchId)
        }

        //  NOT all PSM have Precursor mz so Load Scan Data to get Precursor mz

        const promise__All_ScanDataLoaded = new Promise<void>((resolve__promise__All_ScanDataLoaded, reject__promise__All_ScanDataLoaded) => { try {

            const promise__get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_ReturnPromise =
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch().get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_ReturnPromise()
            promise__get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_ReturnPromise.catch(reason => { reject__promise__All_ScanDataLoaded(reason) })
            promise__get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_ReturnPromise.then(value__promise__get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_ReturnPromise => { try {

                scanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder = value__promise__get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_ReturnPromise.scanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder

                const promises_Internal_Each_ScanDataLoaded : Array<Promise<void>> = []

                for ( const scanFile_ProjectScanFileId_SearchScanFileId_Entry of scanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder.get_All() ) {

                    const promise__Each_ScanDataLoaded = new Promise<void>((resolve__promise_Each_ScanDataLoaded, reject__promise__Each_ScanDataLoaded) => { try {
                        const promise__get_ScanData_NO_Peaks_DataHolder_ReturnPromise =
                            commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_ParentObject().get__commonData_LoadedFromServer_From_ProjectScanFileId___ROOT().
                            get_commonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data().get_ScanData_NO_Peaks_DataHolder_ReturnPromise({
                                projectScanFileId: scanFile_ProjectScanFileId_SearchScanFileId_Entry.projectScanFileId, retrieved_ALL_Scans_ForFile: true, scanNumbers_RetrievedDataFor: undefined, get_ParentScanData: undefined
                            } )
                        promise__get_ScanData_NO_Peaks_DataHolder_ReturnPromise.catch(reason => { reject__promise__Each_ScanDataLoaded(reason)})
                        promise__get_ScanData_NO_Peaks_DataHolder_ReturnPromise.then(value__get_ScanData_NO_Peaks_DataHolder_ReturnPromise => { try {
                            scanData_NO_Peaks_Data_Holder__Map_Key_SearchScanFileId.set( scanFile_ProjectScanFileId_SearchScanFileId_Entry.searchScanFileId, value__get_ScanData_NO_Peaks_DataHolder_ReturnPromise.scanData_NO_Peaks_Data_Holder )
                            resolve__promise_Each_ScanDataLoaded()
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

                    promises_Internal_Each_ScanDataLoaded.push( promise__Each_ScanDataLoaded )
                }

                const promises_Internal_Each_ScanDataLoaded_ALL = Promise.all( promises_Internal_Each_ScanDataLoaded );

                promises_Internal_Each_ScanDataLoaded_ALL.catch(reason => { reject__promise__All_ScanDataLoaded( reason )})
                promises_Internal_Each_ScanDataLoaded_ALL.then(novalue => { try {

                    resolve__promise__All_ScanDataLoaded()

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        promises_Internal_TopLevel.push( promise__All_ScanDataLoaded )
    }

    const promises_Internal_TopLevel_All = Promise.all( promises_Internal_TopLevel )

    promises_Internal_TopLevel_All.catch(reason => reject_TopLevel(reason))
    promises_Internal_TopLevel_All.then(novalue => { try {

        const result = _process_LoadedData({
            projectSearchId,
            peptideSequences_For_MainFilters_Holder,
            peptideIds_For_MainFilters_Holder,
            variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder,
            staticMods_Holder,
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder,
            openModifications_On_PSM_For_MainFilters_Holder,
            scanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder,
            scanData_NO_Peaks_Data_Holder__Map_Key_SearchScanFileId
        })

        resolve_TopLevel(result)

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
}


/**
 *
 */
const _process_LoadedData = function (
    {
        projectSearchId,
        peptideSequences_For_MainFilters_Holder,
        peptideIds_For_MainFilters_Holder,
        variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder,
        staticMods_Holder,
        psmTblData_For_ReportedPeptideId_For_MainFilters_Holder,
        openModifications_On_PSM_For_MainFilters_Holder,
        scanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder,
        scanData_NO_Peaks_Data_Holder__Map_Key_SearchScanFileId
    } : {
        projectSearchId: number
        peptideSequences_For_MainFilters_Holder: CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder
        peptideIds_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder
        variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder
        staticMods_Holder: CommonData_LoadedFromServer_SingleSearch__StaticModifications_Holder
        psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder
        openModifications_On_PSM_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters_Holder
        scanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder: CommonData_LoadedFromServer_SingleSearch__ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder
        scanData_NO_Peaks_Data_Holder__Map_Key_SearchScanFileId: Map<number, CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder>
    }
) : Qc_Psm_PPM_Error__GetData_And_Compute_PPM_Error_All_PSMs_For_MainFilters_For_SingleSearch__Result {

    //  Cache
    const modifications_StaticOnly_Array__Map_Key_PeptideId__CachePerPeptideId: Map<number, Array<number>> = new Map()


    const ppm_Error_Map_Key_PsmId: Map<number, Qc_Psm_PPM_Error__GetData_And_Compute_PPM_Error_All_PSMs_For_MainFilters_For_SingleSearch__Result__Single_PSM> = new Map()

    const dataForPsms_For_ReportedPeptideId_Array__Map_Key_ReportedPeptideId: Map<number, Array<Qc_Psm_PPM_Error__GetData_And_Compute_PPM_Error_All_PSMs_For_MainFilters_For_SingleSearch__Result__Single_PSM>> = new Map()



    // let CSV_Logging_TEMP = "\n\nPeptide Sequence, mods (variable and open mods semicolon separator,charge, peptideMass_Calculated = PeptideMassCalculator.calculatePeptideMass(peptideSequence comma modifications_All_For_PSM), precursorMZ, 1000000 * (peptideMass_From_PrecursorMZ - peptideMass_Calculated_C13_Add_Closest) / peptideMass_From_PrecursorMZ, ScanNumber, SearchScanFileId, PsmId\n"


    for ( const psm of psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_Entries_IterableIterator() ) {

        let peptideMass_From_PrecursorMZ: number

        let peptideMass_Calculated: number
        let precursor_MZ: number
        let retentionTimeSeconds: number

        {
            let scanData_NO_Peaks_For_ScanNumber: CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_DataForSingleScanNumber

            if ( ( ! psm.precursor_M_Over_Z ) || ( ! psm.retentionTimeSeconds ) ) {
                if ( ( ! scanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder ) || ( ! scanData_NO_Peaks_Data_Holder__Map_Key_SearchScanFileId ) ) {
                    throw Error( "ELSE of ( psm.precursor_M_Over_Z ) AND ( ( ! scanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder ) || ( ! scanData_NO_Peaks_Data_Holder__Map_Key_SearchScanFileId ) ). psmId: " + psm.psmId + ", projectSearchId: " + projectSearchId)
                }

                const scanData_NO_Peaks_Data_Holder_For_SearchScanFileId = scanData_NO_Peaks_Data_Holder__Map_Key_SearchScanFileId.get( psm.searchScanFileId )
                if ( ! scanData_NO_Peaks_Data_Holder_For_SearchScanFileId ) {
                    throw Error("scanData_NO_Peaks_Data_Holder__Map_Key_SearchScanFileId.get( psm.searchScanFileId ) returned NOTHING. psm.searchScanFileId: " + psm.searchScanFileId + ", psmId: " + psm.psmId + ", projectSearchId: " + projectSearchId )
                }

                scanData_NO_Peaks_For_ScanNumber = scanData_NO_Peaks_Data_Holder_For_SearchScanFileId.scanData.get_ScanData_NO_Peaks_For_ScanNumber( psm.scanNumber )
                if ( ! scanData_NO_Peaks_For_ScanNumber ) {
                    throw Error("scanData_NO_Peaks_Data_Holder_For_SearchScanFileId.scanData.get_ScanData_NO_Peaks_For_ScanNumber( psm.scanNumber ) returned NOTHING for psm.scanNumber: " + psm.scanNumber + ". psm.searchScanFileId: " + psm.searchScanFileId + ", psmId: " + psm.psmId + ", projectSearchId: " + projectSearchId)
                }
            }

            if ( psm.precursor_M_Over_Z ) {
                precursor_MZ = psm.precursor_M_Over_Z
            } else {
                if ( ! scanData_NO_Peaks_For_ScanNumber ) {
                    throw Error("else of  ( psm.precursor_M_Over_Z ) AND ( ! scanData_NO_Peaks_For_ScanNumber )")
                }
                precursor_MZ = scanData_NO_Peaks_For_ScanNumber.precursor_M_Over_Z
            }

            if ( psm.retentionTimeSeconds ) {
                retentionTimeSeconds = psm.retentionTimeSeconds
            } else {
                if ( ! scanData_NO_Peaks_For_ScanNumber ) {
                    throw Error("else of  ( psm.retentionTimeSeconds ) AND ( ! scanData_NO_Peaks_For_ScanNumber )")
                }
                retentionTimeSeconds = scanData_NO_Peaks_For_ScanNumber.retentionTime_InSeconds
            }

            peptideMass_From_PrecursorMZ = PeptideMassCalculator.calculate_MonoisotopicMass_From_MZ_Charge({ mz: precursor_MZ, charge: psm.charge })
        }


        const peptideId = peptideIds_For_MainFilters_Holder.get_PeptideId_For_ReportedPeptideId(psm.reportedPeptideId)
        if ( ! peptideId ) {
            throw Error( "peptideIds_For_MainFilters_Holder.get_PeptideId_For_ReportedPeptideId(psm.reportedPeptideId) returned NOTHING for psm.reportedPeptideId: " + psm.reportedPeptideId + ", projectSearchId: " + projectSearchId )
        }
        const peptideSequence = peptideSequences_For_MainFilters_Holder.get_PeptideSequence_For_PeptideId( peptideId )
        if ( ! peptideSequence ) {
            throw Error( "peptideSequences_For_MainFilters_Holder.get_PeptideSequence_For_PeptideId( peptideId ) returned NOTHING for peptideId: " + peptideId + ", psm.reportedPeptideId: " + psm.reportedPeptideId + ", projectSearchId: " + projectSearchId )
        }

        let modifications_All_For_PSM: number[]

        { //  Static Mods

            if ( staticMods_Holder && staticMods_Holder.get_StaticMods() ) {

                let modifications_StaticOnly_Array = modifications_StaticOnly_Array__Map_Key_PeptideId__CachePerPeptideId.get( peptideId )
                if ( ! modifications_StaticOnly_Array ) {
                    //  Compute static mods for Peptide Id
                    modifications_StaticOnly_Array = []
                    for ( const staticMod of staticMods_Holder.get_StaticMods() ) {

                        for ( let peptideSequence_Index = 0; peptideSequence_Index < peptideSequence.length; peptideSequence_Index++ ) {
                            const peptideSequence_AtIndex = peptideSequence[ peptideSequence_Index ]
                            if ( peptideSequence_AtIndex === staticMod.residue ) {
                                modifications_StaticOnly_Array.push( staticMod.mass )
                            }
                        }
                    }
                    modifications_StaticOnly_Array__Map_Key_PeptideId__CachePerPeptideId.set( peptideId, modifications_StaticOnly_Array )
                }
                modifications_All_For_PSM = Array.from( modifications_StaticOnly_Array )
            }
        }
        if ( ! modifications_All_For_PSM ) {
            modifications_All_For_PSM = []  //  No Static Mods so create empty array
        }

        if ( variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder ) {
            const variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId = variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder.get_Variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId( psm.reportedPeptideId )
            if ( variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId ) {
                for ( const variable_Dynamic_Modification of variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId ) {
                    modifications_All_For_PSM.push( variable_Dynamic_Modification.mass )
                }
            }
        }

        if ( openModifications_On_PSM_For_MainFilters_Holder ) {
            const psmOpenModificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId = openModifications_On_PSM_For_MainFilters_Holder.get_psmOpenModificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId(psm.reportedPeptideId)
            if ( psmOpenModificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId ) {
                const psmOpenModificationMassPerPSM = psmOpenModificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId.psmOpenModificationMassPerPSM_ForPsmIdMap.get( psm.psmId )
                if ( psmOpenModificationMassPerPSM ) {
                    modifications_All_For_PSM.push( psmOpenModificationMassPerPSM.openModificationMass )
                }
            }
        }

        peptideMass_Calculated = PeptideMassCalculator.calculatePeptideMass(peptideSequence, modifications_All_For_PSM)



        // let peptideMass_From_PrecursorMZ: number
        //
        // let peptideMass_Calculated: number

        let peptideMass_Calculated_C13_Add_Closest: number

        {
            let peptideMass_Calculated_C13_Add_Closest__Difference: number

            for ( let multiplier__C13_MASS_DELTA = 0; multiplier__C13_MASS_DELTA <= 3; multiplier__C13_MASS_DELTA++ ) {

                const peptideMass_Calculated_C13_Add = peptideMass_Calculated + ( multiplier__C13_MASS_DELTA * C13_MASS_DELTA )
                const difference = Math.abs( peptideMass_From_PrecursorMZ - peptideMass_Calculated_C13_Add )

                if ( multiplier__C13_MASS_DELTA === 0 ) {
                    peptideMass_Calculated_C13_Add_Closest__Difference = difference
                    peptideMass_Calculated_C13_Add_Closest = peptideMass_Calculated_C13_Add
                } else {
                    if ( peptideMass_Calculated_C13_Add_Closest__Difference > difference ) {
                        peptideMass_Calculated_C13_Add_Closest__Difference =difference
                        peptideMass_Calculated_C13_Add_Closest = peptideMass_Calculated_C13_Add
                    }
                }
            }
        }


        // 3. Determine which of these cMass values is closest to pMass:
        //
        //     cMass
        // cMass + 1 x c13Δ
        // cMass + 2 x c13Δ
        // cMass + 3 x c13Δ
        //
        // 4. Calculate PPM error as:
        //
        // 1000000 * (pMass - mass chosen from step 3) / pMass

        const ppm_Error = 1000000 * (peptideMass_From_PrecursorMZ - peptideMass_Calculated_C13_Add_Closest) / peptideMass_From_PrecursorMZ

        const ppm_Error_Map_Entry: Qc_Psm_PPM_Error__GetData_And_Compute_PPM_Error_All_PSMs_For_MainFilters_For_SingleSearch__Result__Single_PSM = {
            psmId: psm.psmId,
            reportedPeptideId: psm.reportedPeptideId,
            ppmError: ppm_Error,
            retentionTimeSeconds,
            precursor_M_Over_Z: precursor_MZ
        }

        ppm_Error_Map_Key_PsmId.set( psm.psmId, ppm_Error_Map_Entry )

        {
            let dataForPsms_For_ReportedPeptideId_Array = dataForPsms_For_ReportedPeptideId_Array__Map_Key_ReportedPeptideId.get( psm.reportedPeptideId )
            if ( ! dataForPsms_For_ReportedPeptideId_Array ) {
                dataForPsms_For_ReportedPeptideId_Array = []
                dataForPsms_For_ReportedPeptideId_Array__Map_Key_ReportedPeptideId.set( psm.reportedPeptideId, dataForPsms_For_ReportedPeptideId_Array )
            }

            dataForPsms_For_ReportedPeptideId_Array.push( ppm_Error_Map_Entry )
        }

        // CSV_Logging_TEMP += peptideSequence + "," + modifications_All_For_PSM.join(";") + "," + psm.charge + "," + peptideMass_Calculated + "," + peptideMass_From_PrecursorMZ + "," + ppm_Error + "," + psm.scanNumber + "," + psm.searchScanFileId + "," + psm.psmId + "\n"
    }


    // console.warn( "PPM Error: ", CSV_Logging_TEMP )


    const ppm_Error_For_PSMs_For_ReportedPeptideId_Map_Key_ReportedPeptideId: Map<number, Qc_Psm_PPM_Error__GetData_And_Compute_PPM_Error_All_PSMs_For_MainFilters_For_SingleSearch__Result_For_PSMs_For_ReportedPeptideId> = new Map()

    for ( const mapEntry of dataForPsms_For_ReportedPeptideId_Array__Map_Key_ReportedPeptideId.entries() ) {
        const newMapValue: Qc_Psm_PPM_Error__GetData_And_Compute_PPM_Error_All_PSMs_For_MainFilters_For_SingleSearch__Result_For_PSMs_For_ReportedPeptideId = {
            dataForPsms_For_ReportedPeptideId_Array: mapEntry[1]
        }
        ppm_Error_For_PSMs_For_ReportedPeptideId_Map_Key_ReportedPeptideId.set( mapEntry[0], newMapValue)
    }

    const result = new Qc_Psm_PPM_Error__GetData_And_Compute_PPM_Error_All_PSMs_For_MainFilters_For_SingleSearch__Result({ ppm_Error_Map_Key_PsmId, ppm_Error_For_PSMs_For_ReportedPeptideId_Map_Key_ReportedPeptideId })

    return result
}