/**
 * peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Implicit__ALL_AND__Selections__INTERSECTION_Together.ts
 *
 * Implicit All / AND / Intersection
 *
 * These are selections that are not user chooses "AND" but are AND by their nature
 *
 */


import {ProteinViewPage_LoadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder";
import {
    Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS,
    Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS,
    Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId";
import {PeptideUnique_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_StateObject";
import {PeptideSequence_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_sequence_selected/js/peptideSequence_UserSelections_StateObject";
import {ProteinPositionFilter_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__peptide_page__components/protein_position_filter_component/js/proteinPositionFilter_UserSelections_StateObject";
import {ProteinSequenceWidget_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__protein_page__components/protein_sequence_display_widget/js/proteinSequenceWidget_StateObject";
import {ProteinView_LoadedDataCommonHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder";
import {UserSearchString_LocationsOn_ProteinSequence_Root} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/userSearchString_LocationsOn_ProteinSequence/userSearchString_LocationsOn_ProteinSequence_ComponentData";
import {Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_COMMON} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_COMMON";
import {ScanFilenameId_On_PSM_Filter_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_file_name_on_psms_selection/js/scanFilenameId_On_PSM_Filter_UserSelection_StateObject";
import {Scan_RetentionTime_MZ_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_retention_time_precursor_m_z_selection/js/scan_RetentionTime_MZ_UserSelections_StateObject";


////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////


/////    Process "ALL"/"AND" Selections (Including Protein Position and Peptide String)

//      Apply "ALL" as an Intersection to the input entries (either all or a UNION of the "ANY" selections)

/**
 *
 *
 */
export const peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Implicit__ALL_AND__Selections__INTERSECTION_Together = function (
    {
        reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,    //  NOT (always) Used when proteinSequenceVersionId is populated
        proteinSequenceVersionId,  //  OPTIONAL - Restrict results to this proteinSequenceVersionId
        loadedDataPerProjectSearchIdHolder,
        loadedDataCommonHolder,
        scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
        scan_RetentionTime_MZ_UserSelection_StateObject,
        peptideUnique_UserSelection_StateObject,
        peptideSequence_UserSelections_StateObject,
        proteinSequenceWidget_StateObject,
        proteinPositionFilter_UserSelections_StateObject,
        userSearchString_LocationsOn_ProteinSequence_Root
    }: {
        reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId: Array<number>
        proteinSequenceVersionId: number
        loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        loadedDataCommonHolder: ProteinView_LoadedDataCommonHolder
        scanFilenameId_On_PSM_Filter_UserSelection_StateObject : ScanFilenameId_On_PSM_Filter_UserSelection_StateObject
        scan_RetentionTime_MZ_UserSelection_StateObject : Scan_RetentionTime_MZ_UserSelections_StateObject
        peptideUnique_UserSelection_StateObject : PeptideUnique_UserSelection_StateObject
        peptideSequence_UserSelections_StateObject : PeptideSequence_UserSelections_StateObject
        proteinSequenceWidget_StateObject: ProteinSequenceWidget_StateObject
        proteinPositionFilter_UserSelections_StateObject : ProteinPositionFilter_UserSelections_StateObject
        userSearchString_LocationsOn_ProteinSequence_Root: UserSearchString_LocationsOn_ProteinSequence_Root
    }): Array<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS> {

//  Implicit ALL

    const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array : Array<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS> = [];

    {
        const result = _getFor__SelectionType_ALL___For__ScanFilenameId_On_PSM_Filter_UserSelection({
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
            loadedDataPerProjectSearchIdHolder,
            scanFilenameId_On_PSM_Filter_UserSelection_StateObject
        });

        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.push( result );
    }

    {
        const result = _getFor__SelectionType_ALL___For__Scan_RetentionTime_MZ_UserSelection({
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
            loadedDataPerProjectSearchIdHolder,
            scan_RetentionTime_MZ_UserSelection_StateObject
        });

        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.push( result );
    }

    {
        const result = _getFor__peptideUniqueSelected({
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
            loadedDataPerProjectSearchIdHolder,
            peptideUnique_UserSelection_StateObject
        })

        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.push( result );
    }

    {
        const result = _getFor__UserSearchString({
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
            proteinSequenceVersionId,
            loadedDataPerProjectSearchIdHolder,
            loadedDataCommonHolder,
            peptideSequence_UserSelections_StateObject,
            userSearchString_LocationsOn_ProteinSequence_Root
        });

        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.push( result );
    }

    {
        const result = _getFor__is_proteinPositionFilter_PeptidePage({
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
            loadedDataPerProjectSearchIdHolder,
            proteinPositionFilter_UserSelections_StateObject
        })

        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.push( result );
    }

    {
        const result = _getFor__selectedProteinSequencePositions({
            proteinSequenceVersionId,
            loadedDataPerProjectSearchIdHolder,
            proteinSequenceWidget_StateObject
        });

        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.push( result );
    }

    return reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array;
}

/**
 * User has selected 'Filter On Scan Filename:'
 *
 */
const _getFor__SelectionType_ALL___For__ScanFilenameId_On_PSM_Filter_UserSelection = function (
    {
        reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
        loadedDataPerProjectSearchIdHolder,
        scanFilenameId_On_PSM_Filter_UserSelection_StateObject
    }: {
        reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId: Array<number>
        loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        scanFilenameId_On_PSM_Filter_UserSelection_StateObject : ScanFilenameId_On_PSM_Filter_UserSelection_StateObject
    }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

    if ( ( ! scanFilenameId_On_PSM_Filter_UserSelection_StateObject )
        || ( scanFilenameId_On_PSM_Filter_UserSelection_StateObject.areAllSelected__scanFilenameIds() ) ) {

        //  NO Filtering

        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: true, includeAll_ReportedPeptideIds: false
        });
        const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
            result: resultData
        };

        return result; // EARLY RETURN
    }

    const scanFilenameIds_Selected = scanFilenameId_On_PSM_Filter_UserSelection_StateObject.get__scanFilenameIds_Selected();
    if ( ! scanFilenameIds_Selected ) {
        const msg = "scanFilenameId_On_PSM_Filter_UserSelection_StateObject.get__scanFilenameIds_Selected(); returned nothing. ";
        console.warn(msg);
        throw Error(msg);
    }
    const psmIdsForReportedPeptideIdMap = loadedDataPerProjectSearchIdHolder.get_psmIdsForReportedPeptideIdMap();
    if ( ! psmIdsForReportedPeptideIdMap ) {
        const msg = "loadedDataPerProjectSearchIdHolder.get_psmIdsForReportedPeptideIdMap(); returned nothing. ";
        console.warn(msg);
        throw Error(msg);
    }
    const dataPage_common_Data_Holder_SingleSearch_PsmTblData_Root = loadedDataPerProjectSearchIdHolder.get_DataPage_common_Data_Holder_SingleSearch_PsmTblData_Root();
    if ( ! dataPage_common_Data_Holder_SingleSearch_PsmTblData_Root ) {
        const msg = "loadedDataPerProjectSearchIdHolder.get_DataPage_common_Data_Holder_SingleSearch_PsmTblData_Root(); returned nothing. ";
        console.warn(msg);
        throw Error(msg);
    }

    const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
        noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
    });

    for (const reportedPeptideId of reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId) {

        const psmTblData_For_ReportedPeptideId = dataPage_common_Data_Holder_SingleSearch_PsmTblData_Root.get_PsmTblData_For_ReportedPeptideId(reportedPeptideId);
        if ( ! psmTblData_For_ReportedPeptideId ) {
            const msg = "dataPage_common_Data_Holder_SingleSearch_PsmTblData_Root.get_PsmTblData_For_ReportedPeptideId(reportedPeptideId); returned nothing. " + reportedPeptideId;
            console.warn(msg);
            throw Error(msg);
        }

        let psmIds_to_CheckForSearchScanFileId = psmIdsForReportedPeptideIdMap.get(reportedPeptideId);
        if ( ! psmIds_to_CheckForSearchScanFileId ) {
            const msg = "psmIdsForReportedPeptideIdMap.get(reportedPeptideId); returned nothing. " + reportedPeptideId;
            console.warn(msg);
            throw Error(msg);
        }

        const psmIds_Include__FilteredFor_SearchScanFileId = new Set<number>();

        for ( const psmId of psmIds_to_CheckForSearchScanFileId ) {

            const psmTblData_For_PsmId = psmTblData_For_ReportedPeptideId.get_PsmTblData_For_PsmId(psmId);
            if ( ! psmTblData_For_PsmId ) {
                const msg = "psmTblData_For_ReportedPeptideId.get_PsmTblData_For_PsmId(reportedPeptideId); returned nothing. " + psmId;
                console.warn(msg);
                throw Error(msg);
            }
            if ( scanFilenameIds_Selected.has( psmTblData_For_PsmId.searchScanFileId ) ) {
                psmIds_Include__FilteredFor_SearchScanFileId.add( psmId );
            }
        }

        const entry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({
            reportedPeptideId, psmIds_Include: psmIds_Include__FilteredFor_SearchScanFileId
        });

        resultData.set_Entry_Using_entry_reportedPeptideId_AsKey( entry );
    }

    const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
        result: resultData
    };

    return result; // EARLY RETURN
}

/**
 * User has selected 'Filter on Retention Time (Minutes):' and/or 'Filter on Precursor M/Z:'
 *
 */
const _getFor__SelectionType_ALL___For__Scan_RetentionTime_MZ_UserSelection = function (
    {
        reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
        loadedDataPerProjectSearchIdHolder,
        scan_RetentionTime_MZ_UserSelection_StateObject
    }: {
        reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId: Array<number>
        loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        scan_RetentionTime_MZ_UserSelection_StateObject : Scan_RetentionTime_MZ_UserSelections_StateObject
    }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

    if ( ( ! scan_RetentionTime_MZ_UserSelection_StateObject )
        || ( ! scan_RetentionTime_MZ_UserSelection_StateObject.is_Any_FilterHaveValue()  ) ) {

        //  NO Filtering

        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: true, includeAll_ReportedPeptideIds: false
        });
        const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
            result: resultData
        };

        return result; // EARLY RETURN
    }

    //  Any of these may return undefined or null
    const scanRetentionTime__From__Filter = scan_RetentionTime_MZ_UserSelection_StateObject.get_retentionTime_InMinutes__From__Filter();
    const scanRetentionTime__To__Filter = scan_RetentionTime_MZ_UserSelection_StateObject.get_retentionTime_InMinutes__To__Filter();
    const scanMZ__From__Filter = scan_RetentionTime_MZ_UserSelection_StateObject.get_mz__From__Filter();
    const scanMZ__To__Filter = scan_RetentionTime_MZ_UserSelection_StateObject.get_mz__To__Filter();


    const psmIdsForReportedPeptideIdMap = loadedDataPerProjectSearchIdHolder.get_psmIdsForReportedPeptideIdMap();
    if ( ! psmIdsForReportedPeptideIdMap ) {
        const msg = "loadedDataPerProjectSearchIdHolder.get_psmIdsForReportedPeptideIdMap(); returned nothing. ";
        console.warn(msg);
        throw Error(msg);
    }
    const dataPage_common_Data_Holder_SingleSearch_PsmTblData_Root = loadedDataPerProjectSearchIdHolder.get_DataPage_common_Data_Holder_SingleSearch_PsmTblData_Root();
    if ( ! dataPage_common_Data_Holder_SingleSearch_PsmTblData_Root ) {
        const msg = "loadedDataPerProjectSearchIdHolder.get_DataPage_common_Data_Holder_SingleSearch_PsmTblData_Root(); returned nothing. ";
        console.warn(msg);
        throw Error(msg);
    }
    const dataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_Data_Root = loadedDataPerProjectSearchIdHolder.get_DataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_Data_Root();
    if ( ! dataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_Data_Root ) {
        const msg = "loadedDataPerProjectSearchIdHolder.get_DataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_Data_Root(); returned nothing. ";
        console.warn(msg);
        throw Error(msg);
    }


    const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
        noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
    });

    for (const reportedPeptideId of reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId) {

        const psmTblData_For_ReportedPeptideId = dataPage_common_Data_Holder_SingleSearch_PsmTblData_Root.get_PsmTblData_For_ReportedPeptideId(reportedPeptideId);
        if ( ! psmTblData_For_ReportedPeptideId ) {
            const msg = "dataPage_common_Data_Holder_SingleSearch_PsmTblData_Root.get_PsmTblData_For_ReportedPeptideId(reportedPeptideId); returned nothing. " + reportedPeptideId;
            console.warn(msg);
            throw Error(msg);
        }

        let psmIds_to_CheckForSearchScanFileId = psmIdsForReportedPeptideIdMap.get(reportedPeptideId);
        if ( ! psmIds_to_CheckForSearchScanFileId ) {
            const msg = "psmIdsForReportedPeptideIdMap.get(reportedPeptideId); returned nothing. " + reportedPeptideId;
            console.warn(msg);
            throw Error(msg);
        }

        const psmIds_Include__FilteredFor_SearchScanFileId = new Set<number>();

        for ( const psmId of psmIds_to_CheckForSearchScanFileId ) {

            const psmTblData_For_PsmId = psmTblData_For_ReportedPeptideId.get_PsmTblData_For_PsmId(psmId);
            if ( ! psmTblData_For_PsmId ) {
                const msg = "psmTblData_For_ReportedPeptideId.get_PsmTblData_For_PsmId(psmId); returned nothing. psmId: " + psmId;
                console.warn(msg);
                throw Error(msg);
            }

            if ( psmTblData_For_PsmId.searchScanFileId === undefined || psmTblData_For_PsmId.searchScanFileId === null ) {
                const msg = "( psmTblData_For_PsmId.searchScanFileId === undefined || psmTblData_For_PsmId.searchScanFileId === null ). psmId: " + psmId;
                console.warn(msg);
                throw Error(msg);
            }

            const spectralStorage_NO_Peaks_Data_For_searchScanFileId = dataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_Data_Root.get_SpectralStorage_NO_Peaks_DataFor_SearchScanFileId(psmTblData_For_PsmId.searchScanFileId);
            if ( ! spectralStorage_NO_Peaks_Data_For_searchScanFileId ) {
                const msg = "dataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_Data_Root.get_SpectralStorage_NO_Peaks_DataFor_SearchScanFileId(psmTblData_For_PsmId.searchScanFileId); returned nothing. psmTblData_For_PsmId.searchScanFileId: " + psmTblData_For_PsmId.searchScanFileId + ", psmId: " + psmId;
                console.warn(msg);
                throw Error(msg);
            }
            let spectralStorage_NO_Peaks_Data_For_ScanNumber = spectralStorage_NO_Peaks_Data_For_searchScanFileId.get_SpectralStorage_NO_Peaks_DataFor_ScanNumber( psmTblData_For_PsmId.scanNumber);
            if ( ! spectralStorage_NO_Peaks_Data_For_searchScanFileId ) {
                const msg = "spectralStorage_NO_Peaks_Data_For_searchScanFileId.get_SpectralStorage_NO_Peaks_DataFor_ScanNumber( psmTblData_For_PsmId.scanNumber); returned nothing. psmTblData_For_PsmId.scanNumber: " + psmTblData_For_PsmId.scanNumber + ", psmTblData_For_PsmId.searchScanFileId: " + psmTblData_For_PsmId.searchScanFileId + ", psmId: " + psmId;
                console.warn(msg);
                throw Error(msg);
            }

            let spectralStorage_NO_Peaks_Data_For_ScanNumber_ScanLevel_2 = spectralStorage_NO_Peaks_Data_For_ScanNumber;

            while ( spectralStorage_NO_Peaks_Data_For_ScanNumber_ScanLevel_2.level !== 2 ) {

                // have scan level > 2 so get MS 2 scan for filtering

                const parentScanNumber = spectralStorage_NO_Peaks_Data_For_ScanNumber_ScanLevel_2.parentScanNumber;
                spectralStorage_NO_Peaks_Data_For_ScanNumber_ScanLevel_2 = spectralStorage_NO_Peaks_Data_For_searchScanFileId.get_SpectralStorage_NO_Peaks_DataFor_ScanNumber(parentScanNumber);
                if ( ! spectralStorage_NO_Peaks_Data_For_ScanNumber_ScanLevel_2 ) {
                    const msg = "spectralStorage_NO_Peaks_Data_For_searchScanFileId.get_SpectralStorage_NO_Peaks_DataFor_ScanNumber( parentScanNumber); returned nothing. parentScanNumber: " + parentScanNumber + ", psmTblData_For_PsmId.scanNumber: " + psmTblData_For_PsmId.scanNumber + ", psmTblData_For_PsmId.searchScanFileId: " + psmTblData_For_PsmId.searchScanFileId + ", psmId: " + psmId;
                    console.warn(msg);
                    throw Error(msg);
                }
            }


            let scanMeetsFilters = true;

            {
                const retentionTime_InMinutes = spectralStorage_NO_Peaks_Data_For_ScanNumber.retentionTime_InSeconds / 60;

                if ( scanRetentionTime__From__Filter !== undefined && scanRetentionTime__From__Filter !== null ) {
                    if ( retentionTime_InMinutes < scanRetentionTime__From__Filter ) {
                        scanMeetsFilters = false;
                    }
                }
                if ( scanMeetsFilters ) {
                    if ( scanRetentionTime__To__Filter !== undefined && scanRetentionTime__To__Filter !== null ) {
                        if ( retentionTime_InMinutes > scanRetentionTime__To__Filter ) {
                            scanMeetsFilters = false;
                        }
                    }
                }
            }
            {
                if ( scanMeetsFilters ) {
                    if ( scanMZ__From__Filter !== undefined && scanMZ__From__Filter !== null ) {
                        if ( spectralStorage_NO_Peaks_Data_For_ScanNumber.precursor_M_Over_Z < scanMZ__From__Filter ) {
                            scanMeetsFilters = false;
                        }
                    }
                }
                if ( scanMeetsFilters ) {
                    if ( scanMZ__To__Filter !== undefined && scanMZ__To__Filter !== null ) {
                        if ( spectralStorage_NO_Peaks_Data_For_ScanNumber.precursor_M_Over_Z > scanMZ__To__Filter ) {
                            scanMeetsFilters = false;
                        }
                    }
                }
            }

            if ( scanMeetsFilters ) {
                psmIds_Include__FilteredFor_SearchScanFileId.add(psmId);
            }
        }

        const entry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({
            reportedPeptideId, psmIds_Include: psmIds_Include__FilteredFor_SearchScanFileId
        });

        resultData.set_Entry_Using_entry_reportedPeptideId_AsKey( entry );
    }

    const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
        result: resultData,
    };

    return result;
}

/**
 * User has selected 'Show only Unique Peptides:'
 *
 */
const _getFor__peptideUniqueSelected = function (
    {
        reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
        loadedDataPerProjectSearchIdHolder,
        peptideUnique_UserSelection_StateObject
    }: {
        reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId: Array<number>
        loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        peptideUnique_UserSelection_StateObject : PeptideUnique_UserSelection_StateObject
    }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

    if ( ( ! peptideUnique_UserSelection_StateObject )
        || ( ! peptideUnique_UserSelection_StateObject.getPeptideUnique() ) ) {

        //  NO Filtering

        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: true, includeAll_ReportedPeptideIds: false
        });
        const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
            result: resultData
        };

        return result; // EARLY RETURN
    }

    const proteinSequenceVersionIdsKeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_proteinSequenceVersionIdsKeyReportedPeptideId()

    const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
        noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
    });

    for (const reportedPeptideId of reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId) {
        const proteinSequenceVersionIds_For_ReportedPeptideId = proteinSequenceVersionIdsKeyReportedPeptideId.get(reportedPeptideId);
        if (!proteinSequenceVersionIds_For_ReportedPeptideId) {
            throw Error("_getFor__peptideUniqueSelected: proteinSequenceVersionIdsKeyReportedPeptideId.get( existing_reportedPeptideId ); returned nothing reportedPeptideId: " + reportedPeptideId)
        }
        if (proteinSequenceVersionIds_For_ReportedPeptideId.length === 1) {

            const entry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({ reportedPeptideId, psmIds_Include: undefined });
            resultData.set_Entry_Using_entry_reportedPeptideId_AsKey(entry);
        }
    }

    const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
        result: resultData,
    };

    return result;
}

/**
 * User has entered Protein Sequence "Filter On Peptide:" to filter on
 *
 */
const _getFor__UserSearchString = function (
    {
        reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
        proteinSequenceVersionId,
        loadedDataPerProjectSearchIdHolder,
        loadedDataCommonHolder,
        peptideSequence_UserSelections_StateObject,
        userSearchString_LocationsOn_ProteinSequence_Root
    }: {
        reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId: Array<number>
        proteinSequenceVersionId: number
        loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        loadedDataCommonHolder: ProteinView_LoadedDataCommonHolder
        peptideSequence_UserSelections_StateObject : PeptideSequence_UserSelections_StateObject
        userSearchString_LocationsOn_ProteinSequence_Root: UserSearchString_LocationsOn_ProteinSequence_Root
    }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

    if (proteinSequenceVersionId === undefined || proteinSequenceVersionId === null) {

        //  For processing with NO _proteinSequenceVersionId

        return _getFor__UserSearchString__NOT_Have_proteinSequenceVersionId({
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
            loadedDataPerProjectSearchIdHolder,
            loadedDataCommonHolder,
            peptideSequence_UserSelections_StateObject
        });

    } else {

        return _getFor__UserSearchString_Have_proteinSequenceVersionId({
            proteinSequenceVersionId,
            loadedDataPerProjectSearchIdHolder,
            userSearchString_LocationsOn_ProteinSequence_Root,
            peptideSequence_UserSelections_StateObject
        });
    }
}

/**
 * Get for Static Modification mass Selection Type ALL.  NOT proteinSequenceVersionId value
 *
 * User has selected entry(s) in the Static Modification mass filter section
 *
 * Uses getReportedPeptideIdsForDisplay_ProteinPositionsSelected(...) Once it gets the positions of the selected static mods
 *
 * @returns reportedPeptideIds (Of All) that meet the Static Modifications Filters
 */
const _getFor__UserSearchString__NOT_Have_proteinSequenceVersionId = function (
    {
        reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
        loadedDataPerProjectSearchIdHolder,
        loadedDataCommonHolder,
        peptideSequence_UserSelections_StateObject
    }: {
        reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId: Array<number>
        loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        loadedDataCommonHolder: ProteinView_LoadedDataCommonHolder
        peptideSequence_UserSelections_StateObject : PeptideSequence_UserSelections_StateObject
    }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

    if ( ( ! peptideSequence_UserSelections_StateObject )
        || ( ! peptideSequence_UserSelections_StateObject.isPeptideSearchString_AtLeastOneNotEmptyString() ) ) {

        //  NO Filtering

        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: true, includeAll_ReportedPeptideIds: false
        });
        const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
            result: resultData
        };

        return result; // EARLY RETURN
    }

    const searchStrings = peptideSequence_UserSelections_StateObject.getPeptideSearchStrings();

    if (searchStrings === undefined || searchStrings === null || searchStrings.length === 0) {
        // Not searching for anything so exit
        const msg = "peptideSequence_UserSelections_StateObject.isPeptideSearchString_AtLeastOneNotEmptyString() returned true but (searchStrings === undefined || searchStrings === null || searchStrings.length === 0)";
        console.warn(msg);
        throw Error(msg);
    }

    const searchStrings_Set__ToGetReportedPeptideIdsFor: Set<string> = new Set(searchStrings);

    let reportedPeptideIds_SearchedAllAtCutoffs_Contain_SearchString: Set<number> = undefined;

    {  //  ONLY use cached results IF staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor matches cached results

        const getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data = loadedDataPerProjectSearchIdHolder.get_getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data();
        if (getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data) {

            const userSearchString_CachedResults = getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data.userSearchString_CachedResults;
            if (userSearchString_CachedResults) {

                const searchStrings_Set__ToGetReportedPeptideIdsFor_Cached = userSearchString_CachedResults.searchStrings_Set__ToGetReportedPeptideIdsFor;
                //  compare staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor_Cached to local staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor

                if (searchStrings_Set__ToGetReportedPeptideIdsFor_Cached.size === searchStrings_Set__ToGetReportedPeptideIdsFor.size) {

                    let currentAndCachedContentsSame = true;
                    for (const searchString of searchStrings_Set__ToGetReportedPeptideIdsFor) {
                        if (!searchStrings_Set__ToGetReportedPeptideIdsFor_Cached.has(searchString)) {
                            currentAndCachedContentsSame = false;
                            break;
                        }
                    }
                    if (currentAndCachedContentsSame) {
                        //  Search data same as cached so re-use cached data
                        reportedPeptideIds_SearchedAllAtCutoffs_Contain_SearchString = userSearchString_CachedResults.reportedPeptideIds_SearchedAllAtCutoffs_Contain_SearchString;
                    }
                }
            }
        }
    }

    if (!reportedPeptideIds_SearchedAllAtCutoffs_Contain_SearchString) {

        const searchStrings_I_To_L__ToGetReportedPeptideIdsFor = new Set<string>();
        {
            const findAll_I_Regex = /I/g; //  Regex with trailing 'g' is the only way to do replace all

            //  The Peptide Search Strings will be used to search the protein sequence.
            //  Reported Peptides will be selected where their Protein Coverage records fully contain
            //     the locations of the search strings on the protein sequence.

            //  The amino acid letters I and L will be equivalent.

            for (const searchString of searchStrings) {

                if (searchString && (searchString !== "")) {  //  Skip searchString === ""

                    const searchStringUpperCase = searchString.toLocaleUpperCase();
                    const searchString_UpperCase_I_to_L = searchStringUpperCase.replace(findAll_I_Regex, "L");
                    searchStrings_I_To_L__ToGetReportedPeptideIdsFor.add(searchString_UpperCase_I_to_L);
                }
            }
        }

        reportedPeptideIds_SearchedAllAtCutoffs_Contain_SearchString = new Set();

        // Start from All Reported Peptide Ids at Cutoff.  Have to search more peptide strings but since covers all it can be safely cached and re-used on next call

        for (const reportedPeptideId of reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId) {

            const peptideId = loadedDataPerProjectSearchIdHolder.get_peptideId_For_reportedPeptideId({reportedPeptideId});
            if (peptideId === undefined || peptideId === null) {
                throw Error("peptideId not found for reportedPeptideId. _getFor__SelectionType_ALL__StaticModifications__NOT_Have_proteinSequenceVersionId   reportedPeptideId: " + reportedPeptideId)
            }
            const peptideSequenceString_I_To_L = loadedDataCommonHolder.get_peptideSequenceString_I_To_L_For_peptideId({peptideId})
            if (peptideSequenceString_I_To_L === undefined || peptideSequenceString_I_To_L === null) {
                throw Error("peptideSequenceString_I_To_L not found for peptideId. _getFor__SelectionType_ALL__StaticModifications__NOT_Have_proteinSequenceVersionId  peptideId: " + peptideId + ", reportedPeptideId: " + reportedPeptideId)
            }

            for (const searchString_I_To_L of searchStrings_I_To_L__ToGetReportedPeptideIdsFor) {

                if (peptideSequenceString_I_To_L.includes(searchString_I_To_L)) {
                    reportedPeptideIds_SearchedAllAtCutoffs_Contain_SearchString.add(reportedPeptideId);
                    break;
                }
            }
        }

        let getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data = loadedDataPerProjectSearchIdHolder.get_getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data();
        if (!getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data) {
            getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data = {};
            loadedDataPerProjectSearchIdHolder.set_getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data(getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data);
        }

        getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data.userSearchString_CachedResults = {
            searchStrings_Set__ToGetReportedPeptideIdsFor,
            reportedPeptideIds_SearchedAllAtCutoffs_Contain_SearchString: reportedPeptideIds_SearchedAllAtCutoffs_Contain_SearchString
        }
    }

    const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
        noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
    });

    for (const reportedPeptideId of reportedPeptideIds_SearchedAllAtCutoffs_Contain_SearchString) {

        const entry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({ reportedPeptideId, psmIds_Include: undefined });
        resultData.set_Entry_Using_entry_reportedPeptideId_AsKey(entry);
    }

    const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
        result: resultData,
    };

    return result;
}

/**
 * User has entered Protein Sequence "Filter On Peptide:" to filter on
 *
 */
const _getFor__UserSearchString_Have_proteinSequenceVersionId = function (
    {
        proteinSequenceVersionId,
        loadedDataPerProjectSearchIdHolder,
        userSearchString_LocationsOn_ProteinSequence_Root,
        peptideSequence_UserSelections_StateObject
    }: {
        proteinSequenceVersionId: number
        loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        userSearchString_LocationsOn_ProteinSequence_Root: UserSearchString_LocationsOn_ProteinSequence_Root
        peptideSequence_UserSelections_StateObject : PeptideSequence_UserSelections_StateObject
    }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

    if ( ( ! peptideSequence_UserSelections_StateObject )
        || ( ! peptideSequence_UserSelections_StateObject.isPeptideSearchString_AtLeastOneNotEmptyString() ) ) {

        //  NO Filtering

        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: true, includeAll_ReportedPeptideIds: false
        });
        const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
            result: resultData
        };

        return result; // EARLY RETURN
    }

    const proteinPositions_CoveredBy_SearchStrings = userSearchString_LocationsOn_ProteinSequence_Root.proteinPositions_CoveredBy_SearchStrings
    const proteinPositions_CoveredBy_SearchStrings_length = proteinPositions_CoveredBy_SearchStrings.length

    const selectedProteinSequencePositions = new Set<number>()

    for (let position = 1; position < proteinPositions_CoveredBy_SearchStrings_length; position++) {
        if (proteinPositions_CoveredBy_SearchStrings[position]) {
            selectedProteinSequencePositions.add(position)
        }
    }

    const dataForPositions_ForEnteredSequence: Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = (
        Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_COMMON.getReportedPeptideIdsForDisplay_ProteinPositionsSelected({
            selectedProteinSequencePositions,
            proteinSequenceVersionId,
            loadedDataPerProjectSearchIdHolder
        })
    )

    return dataForPositions_ForEnteredSequence;
}

/**
 * User has selected Protein Positions to filter on (Peptide Page) Valid for all proteins for selected reported peptide ids
 *
 */
const _getFor__is_proteinPositionFilter_PeptidePage = function (
    {
        reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
        loadedDataPerProjectSearchIdHolder,
        proteinPositionFilter_UserSelections_StateObject
    }: {
        reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId: Array<number>
        loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        proteinPositionFilter_UserSelections_StateObject : ProteinPositionFilter_UserSelections_StateObject
    }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

    if ( ( ! proteinPositionFilter_UserSelections_StateObject )
        || ( ! proteinPositionFilter_UserSelections_StateObject.isAnySelections() ) ) {

        //  NO Filtering

        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: true, includeAll_ReportedPeptideIds: false
        });
        const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
            result: resultData
        };

        return result; // EARLY RETURN
    }

    if (!proteinPositionFilter_UserSelections_StateObject.getSelections_Ranges()) {
        const msg = "_getFor__is_proteinPositionFilter_PeptidePage(...): proteinPositionFilter_UserSelections_StateObject.getSelections_Ranges(); returned nothing";
        console.warn(msg)
        throw Error(msg)
    }
    const proteinPositionFilter_UserSelectionsMap_Key_proteinSequenceVersionId = proteinPositionFilter_UserSelections_StateObject.getSelections_Ranges().entriesMap_Key_proteinSequenceVersionId;
    if (!proteinPositionFilter_UserSelectionsMap_Key_proteinSequenceVersionId) {
        const msg = "_getFor__is_proteinPositionFilter_PeptidePage(...): proteinPositionFilter_UserSelections_StateObject.getSelections_Ranges().entriesMap_Key_proteinSequenceVersionId; returned nothing";
        console.warn(msg)
        throw Error(msg)
    }
    const proteinCoverage_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyReportedPeptideId();
    if (!proteinCoverage_KeyReportedPeptideId) {
        throw Error("_getFor__is_proteinPositionFilter_PeptidePage(...): loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyReportedPeptideId(); returned nothing")
    }

    const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
        noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
    });

    for (const reportedPeptideId of reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId) {

        const proteinCoverage_Entries_For_ReportedPeptideId = proteinCoverage_KeyReportedPeptideId.get(reportedPeptideId);
        if (!proteinCoverage_Entries_For_ReportedPeptideId) {
            throw Error("_getFor__is_proteinPositionFilter_PeptidePage(...): proteinCoverage_KeyReportedPeptideId.get( reportedPeptideId ); returned nothing")
        }

        let found_proteinCoverage_Entry_For_ProteinPositionFilter = false;

        for (const proteinCoverage_Entry of proteinCoverage_Entries_For_ReportedPeptideId) {

            const proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId = proteinPositionFilter_UserSelectionsMap_Key_proteinSequenceVersionId.get(proteinCoverage_Entry.proteinSequenceVersionId);
            if (!proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId) {
                //  No Selection entries for proteinSequenceVersionId so skip proteinCoverage_Entry
                continue; // EARLY CONTINUE
            }

            if (proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.fullProteinSelected) {
                // Filter selection is Full Protein
                found_proteinCoverage_Entry_For_ProteinPositionFilter = true;
                break;  // BREAK LOOP
            }

            if (!proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.rangeEntries) {
                throw Error("_getFor__is_proteinPositionFilter_PeptidePage(...): proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.rangeEntries contains nothing")
            }
            if (proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.rangeEntries.length === 0) {
                throw Error("_getFor__is_proteinPositionFilter_PeptidePage(...): proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.rangeEntries empty array")
            }

            const proteinPositionFilter_UserSelections_RangeEntries = proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.rangeEntries;
            for (const proteinPositionFilter_UserSelections_RangeEntry of proteinPositionFilter_UserSelections_RangeEntries) {

                const selectRange_Start = proteinPositionFilter_UserSelections_RangeEntry.proteinPosition_Start;
                const selectRange_End = proteinPositionFilter_UserSelections_RangeEntry.proteinPosition_End;

                //  x1 <= y2 && y1 <= x2
                if (selectRange_Start <= proteinCoverage_Entry.proteinEndPosition && proteinCoverage_Entry.proteinStartPosition <= selectRange_End) { // coverage entry overlaps select range
                    found_proteinCoverage_Entry_For_ProteinPositionFilter = true;
                    break
                }
            }
        }

        if (found_proteinCoverage_Entry_For_ProteinPositionFilter) {

            const entry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({ reportedPeptideId, psmIds_Include: undefined });
            resultData.set_Entry_Using_entry_reportedPeptideId_AsKey(entry);
        }
    }

    const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
        result: resultData,
    };

    return result;
}

/**
 * User has selected Protein Positions to filter on (Single Protein view) (Requires Single proteinSequenceVersionId)
 *
 */
const _getFor__selectedProteinSequencePositions = function (
    {
        proteinSequenceVersionId,
        loadedDataPerProjectSearchIdHolder,
        proteinSequenceWidget_StateObject
    }: {
        proteinSequenceVersionId: number
        loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        proteinSequenceWidget_StateObject: ProteinSequenceWidget_StateObject
    }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

    if ( ( ! proteinSequenceWidget_StateObject )
        || ( ! proteinSequenceWidget_StateObject.is_Any_selectedProteinSequencePosition() ) ) {

        //  NO Filtering

        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: true, includeAll_ReportedPeptideIds: false
        });
        const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
            result: resultData
        };

        return result; // EARLY RETURN
    }

    const selectedProteinSequencePositions = proteinSequenceWidget_StateObject.get_selectedProteinSequencePositions();

    const dataForPositions_ForEnteredSequence: Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = (
        Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_COMMON.getReportedPeptideIdsForDisplay_ProteinPositionsSelected({
            selectedProteinSequencePositions,
            proteinSequenceVersionId,
            loadedDataPerProjectSearchIdHolder
        })
    )

    return dataForPositions_ForEnteredSequence;
}
