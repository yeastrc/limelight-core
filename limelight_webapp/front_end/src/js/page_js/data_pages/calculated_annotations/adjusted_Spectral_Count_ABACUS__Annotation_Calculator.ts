/**
 * adjusted_Spectral_Count_ABACUS__Annotation_Calculator.ts
 */


import {
    ProteinDataDisplay_ProteinList_Item, ProteinDataDisplay_ProteinList_Sub_Item,
    ProteinDisplayData_From_createProteinDisplayData_ProteinList
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__ProteinDisplayData_Classes";
import {
    CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters";



const _DEBUG_LOGGING = true


/**
 * Process 1 Project Search Id OR 1 Sub Group Id or 1 Condition Id
 *
 *
 */
export const adjusted_Spectral_Count_ABACUS__Annotation_Calculator = function (
    {
        id_For_DebugLogging_Only__ProjectSearchId_OR_SubGroupId_OR_ConditionId,
        proteinDisplayData,
        get_Protein_SubItem_From_ProteinItem__FOR_InputData_Callback: get_Protein_SubItem_ProjectSearchId_Pair_Array_From_ProteinItem__FOR_InputData_Callback,
        psmFilter_Callback,
        update_ProteinItem_Callback,
        psmTblData_For_ReportedPeptideId_For_MainFilters_Holder__Map_Key_ProjectSearchId
    } : {
        id_For_DebugLogging_Only__ProjectSearchId_OR_SubGroupId_OR_ConditionId: number

        proteinDisplayData: ProteinDisplayData_From_createProteinDisplayData_ProteinList

        //  Return Array to handle multiple searches in one condition
        get_Protein_SubItem_From_ProteinItem__FOR_InputData_Callback: ({ proteinItem } : { proteinItem: ProteinDataDisplay_ProteinList_Item }) => { protein_Sub_Item_Array: Array<{ protein_Sub_Item: ProteinDataDisplay_ProteinList_Sub_Item, projectSearchId: number }> } //  Array to support multiple searches in condition

        /**
         * psmFilter_Callback:  ONLY Populated when need to filter PSMs.   Used for filter to Search Sub Group Id being Processed
         */
        psmFilter_Callback: INTERNAL__PsmFilter_Callback_Type

        update_ProteinItem_Callback: ({ adjusted_Spectral_Count_ABACUS, proteinItem }  : { adjusted_Spectral_Count_ABACUS: number, proteinItem: ProteinDataDisplay_ProteinList_Item }) =>  void

        psmTblData_For_ReportedPeptideId_For_MainFilters_Holder__Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder>
    }
) {


    {  //  Validate all all entries in proteinDisplayData have unique proteinSequenceVersionId

        const proteinSequenceVersionId_ValuesProcessed_Set: Set<number> = new Set()  // Ensure only process a proteinSequenceVersionId once

        if ( proteinDisplayData.proteinGroupsList ) {
            for ( const proteinGroupItem of proteinDisplayData.proteinGroupsList ) {
                for ( const proteinItem of proteinGroupItem.proteinList_Grouped ) {
                    if ( proteinSequenceVersionId_ValuesProcessed_Set.has( proteinItem.proteinSequenceVersionId ) ) {
                        const msg = "proteinDisplayData has more than one instance of proteinSequenceVersionId.  proteinSequenceVersionId: " + proteinItem.proteinSequenceVersionId
                        console.warn( msg )
                        throw Error( msg )
                    }
                    proteinSequenceVersionId_ValuesProcessed_Set.add( proteinItem.proteinSequenceVersionId );
                }
            }
        } else {
            for ( const proteinItem of proteinDisplayData.proteinList ) {
                if ( proteinSequenceVersionId_ValuesProcessed_Set.has( proteinItem.proteinSequenceVersionId ) ) {
                    const msg = "proteinDisplayData has more than one instance of proteinSequenceVersionId.  proteinSequenceVersionId: " + proteinItem.proteinSequenceVersionId
                    console.warn( msg )
                    throw Error( msg )
                }
                proteinSequenceVersionId_ValuesProcessed_Set.add( proteinItem.proteinSequenceVersionId );
            }
        }
    }

    //  !!   AFTER --  VALIDATION

    ///////////////////

    //  MAIN COMPUTATION

    //   First Create Map<SearchScanFileId, Map<ScanNumber, Set<proteinSequenceVersionId>>> -- unique proteinSequenceVersionIds for each < scan number / search scan file id > pair

    const proteinSequenceVersionId_Set__Map_Key_ScanNumber_Map_Key_SearchScanFileId: Map<number, Map<number, Set<number>>> = new Map()  // SearchScanFileId when NOT on PSM is set to _SEARCH_SCAN_FILE_ID__FAKE__FOR_INTERNAL_DATASTRUCTURES__USE_WHEN_NOT_POPULATED

    // Keep proteins in Groups.  Treat a group like a single protein for this processing

    //  Process the Protein Groups List if exists, else process the Protein List

    const crossValidation_DataCollection_Root: INTERNAL__CrossValidation_DataCollection_Root = {
        scansAll__ScanNumber_Set_Map_Key_SearchScanFileId: new Map()
    }

    if ( proteinDisplayData.proteinGroupsList ) {

        for ( const proteinGroupItem of proteinDisplayData.proteinGroupsList ) {

            //  Each Protein Group Item

            //  Use "FIRST" proteinSequenceVersionId in the group
            let proteinSequenceVersionId_First: number
            {
                const proteinItem_FIRST = proteinGroupItem.proteinList_Grouped[ 0 ]
                proteinSequenceVersionId_First = proteinItem_FIRST.proteinSequenceVersionId
            }

            for ( const proteinItem of proteinGroupItem.proteinList_Grouped ) {

                //  Each Protein Item IN A SINGLE Protein Group Item

                const get_Protein_SubItem_ProjectSearchId_Result = get_Protein_SubItem_ProjectSearchId_Pair_Array_From_ProteinItem__FOR_InputData_Callback({ proteinItem })
                if ( ( ! get_Protein_SubItem_ProjectSearchId_Result ) || get_Protein_SubItem_ProjectSearchId_Result.protein_Sub_Item_Array.length === 0 ) {
                    //  no data so skip
                    continue // EARLY CONTINUE
                }

                _process__Single_Protein__Step_1({
                    proteinSequenceVersionId_TO_USE: proteinSequenceVersionId_First,
                    get_Protein_SubItem_ProjectSearchId_Result,
                    psmTblData_For_ReportedPeptideId_For_MainFilters_Holder__Map_Key_ProjectSearchId,
                    psmFilter_Callback,
                    proteinSequenceVersionId_Set__Map_Key_ScanNumber_Map_Key_SearchScanFileId,
                    crossValidation_DataCollection_Root
                })

            }
        }
    } else {

        for ( const proteinItem of proteinDisplayData.proteinList ) {

            const get_Protein_SubItem_ProjectSearchId_Result = get_Protein_SubItem_ProjectSearchId_Pair_Array_From_ProteinItem__FOR_InputData_Callback({ proteinItem })
            if ( ( ! get_Protein_SubItem_ProjectSearchId_Result ) || get_Protein_SubItem_ProjectSearchId_Result.protein_Sub_Item_Array.length === 0 ) {
                //  no data so skip
                continue // EARLY CONTINUE
            }

            _process__Single_Protein__Step_1({
                proteinSequenceVersionId_TO_USE: proteinItem.proteinSequenceVersionId,
                get_Protein_SubItem_ProjectSearchId_Result,
                psmTblData_For_ReportedPeptideId_For_MainFilters_Holder__Map_Key_ProjectSearchId,
                psmFilter_Callback,
                proteinSequenceVersionId_Set__Map_Key_ScanNumber_Map_Key_SearchScanFileId,
                crossValidation_DataCollection_Root
            })
        }
    }


    if ( _DEBUG_LOGGING ) {

        const perScan_Array = []


        for ( const proteinSequenceVersionId_Set__Map_Key_ScanNumber_Map_Key_SearchScanFileId_ENTRY of proteinSequenceVersionId_Set__Map_Key_ScanNumber_Map_Key_SearchScanFileId.entries() ) {

            let searchScanFileId = proteinSequenceVersionId_Set__Map_Key_ScanNumber_Map_Key_SearchScanFileId_ENTRY[ 0 ]

            // if ( searchScanFileId === _SEARCH_SCAN_FILE_ID__FAKE__FOR_INTERNAL_DATASTRUCTURES__USE_WHEN_NOT_POPULATED ) {
            //     searchScanFileId = undefined
            // }
            const proteinSequenceVersionId_Set__Map_Key_ScanNumber__FOR_SearchScanFileId = proteinSequenceVersionId_Set__Map_Key_ScanNumber_Map_Key_SearchScanFileId_ENTRY[ 1 ]

            for ( const proteinSequenceVersionId_Set__Map_Key_ScanNumber__FOR_SearchScanFileId_ENTRY of proteinSequenceVersionId_Set__Map_Key_ScanNumber__FOR_SearchScanFileId.entries() ) {

                const scanNumber = proteinSequenceVersionId_Set__Map_Key_ScanNumber__FOR_SearchScanFileId_ENTRY[ 0 ]
                const proteinSequenceVersionId_Set__For_ScanNumber = proteinSequenceVersionId_Set__Map_Key_ScanNumber__FOR_SearchScanFileId_ENTRY[ 1 ]

                const proteinSequenceVersionIds = Array.from( proteinSequenceVersionId_Set__For_ScanNumber )

                perScan_Array.push( { searchScanFileId, scanNumber, proteinSequenceVersionIds } )
            }
        }

        const log_Output = { id_For_DebugLogging_Only__ProjectSearchId_OR_SubGroupId_OR_ConditionId, perScan_Array }

        const log_Output_JSON = JSON.stringify( log_Output )

        //  logoutputJSON ( searchScanFileId is -1 if not populated in DB) : { id_For_DebugLogging_Only__ProjectSearchId_OR_SubGroupId_OR_ConditionId: #, perScan_Array: [ { searchScanFileId: #, scanNumber: #, proteinSequenceVersionIds: [ #, # ] } ] }

        console.warn( "DEBUG INFO::  per scan data format (searchScanFileId is -1 if not populated in DB) : { id_For_DebugLogging_Only__ProjectSearchId_OR_SubGroupId_OR_ConditionId: #, perScan_Array: [ { searchScanFileId: #, scanNumber: #, proteinSequenceVersionIds: [ #, # ] } ] }" )

        console.warn( "DEBUG INFO::  per scan data: " + log_Output_JSON )
    }

    //  NEXT:  Compute Unique Scan Count ( Scan Number / Search Scan File Id Pair ) for each ProteinSequenceVersionId

    const unique_ScanCount_For_ProteinSequenceVersionId__Map_Key_ProteinSequenceVersionId: Map<number, number> = new Map()
    {
        for ( const proteinSequenceVersionId_Set__Map_Key_ScanNumber__FOR_SearchScanFileId of proteinSequenceVersionId_Set__Map_Key_ScanNumber_Map_Key_SearchScanFileId.values() ) {

            for ( const proteinSequenceVersionId_Set__For_ScanNumber of proteinSequenceVersionId_Set__Map_Key_ScanNumber__FOR_SearchScanFileId.values() ) {

                if ( proteinSequenceVersionId_Set__For_ScanNumber.size === 1 ) {
                    //  Scan maps to ONLY ONE proteinSequenceVersionId

                    let proteinSequenceVersionId: number
                    for ( const proteinSequenceVersionId_Entry of proteinSequenceVersionId_Set__For_ScanNumber ) {
                        proteinSequenceVersionId = proteinSequenceVersionId_Entry
                        break
                    }

                    let unique_ScanCount = unique_ScanCount_For_ProteinSequenceVersionId__Map_Key_ProteinSequenceVersionId.get( proteinSequenceVersionId )
                    if ( ! unique_ScanCount ) {
                        //  initialize
                        unique_ScanCount = 1
                    } else {
                        // increment
                        unique_ScanCount++
                    }
                    unique_ScanCount_For_ProteinSequenceVersionId__Map_Key_ProteinSequenceVersionId.set( proteinSequenceVersionId, unique_ScanCount )
                }
            }
        }
    }

    //  NEXT:  Compute Adjusted Scan Count for each ProteinSequenceVersionId

    const adjusted_ScanCount_For_ProteinSequenceVersionId__Map_Key_ProteinSequenceVersionId: Map<number, number> = new Map()

    { // First populate Adjusted Scan Count with the Unique Scan Count

        for ( const mapEntry of unique_ScanCount_For_ProteinSequenceVersionId__Map_Key_ProteinSequenceVersionId.entries() ) {
            adjusted_ScanCount_For_ProteinSequenceVersionId__Map_Key_ProteinSequenceVersionId.set( mapEntry[ 0 ], mapEntry[ 1 ] )
        }
    }

    { // Next, process all ( Scan Number / Search Scan File Id )  Pairs that are NOT unique


        //  DEBUGGING/Information ONLY
        // let unique_ScanCount_SUM_All_Proteins__ZERO_COUNT = 0


        for ( const proteinSequenceVersionId_Set__Map_Key_ScanNumber__FOR_SearchScanFileId of proteinSequenceVersionId_Set__Map_Key_ScanNumber_Map_Key_SearchScanFileId.values() ) {

            for ( const proteinSequenceVersionId_Set__For_ScanNumber of proteinSequenceVersionId_Set__Map_Key_ScanNumber__FOR_SearchScanFileId.values() ) {

                if ( proteinSequenceVersionId_Set__For_ScanNumber.size !== 1 ) {

                    //  (Scan Number / Search Scan File Id) Pair is NOT Unique.   Scan maps to MORE THAN ONE proteinSequenceVersionId

                    //  Get unique_ScanCount SUM for all values in proteinSequenceVersionId_Set__For_ScanNumber

                    let unique_ScanCount_SUM_All_Proteins = 0

                    for ( const proteinSequenceVersionId_Entry of proteinSequenceVersionId_Set__For_ScanNumber ) {
                        const unique_ScanCount = unique_ScanCount_For_ProteinSequenceVersionId__Map_Key_ProteinSequenceVersionId.get( proteinSequenceVersionId_Entry )
                        if ( unique_ScanCount ) {
                            unique_ScanCount_SUM_All_Proteins += unique_ScanCount
                        }
                    }

                    //  NEXT:  Process all values in proteinSequenceVersionId_Set__For_ScanNumber

                    //  DEBUGGING Code Validation ONLY variable
                    // let apportionmentToProtein__TOTAL = 0

                    for ( const proteinSequenceVersionId_Entry of proteinSequenceVersionId_Set__For_ScanNumber ) {

                        //  Each proteinSequenceVersionId

                        // Initialize 'apportionmentToProtein' to backup value of 1 / ( # proteins )

                        let apportionmentToProtein = 1 / proteinSequenceVersionId_Set__For_ScanNumber.size

                        {  //  Compute apportionmentToProtein

                            let unique_ScanCount_For_ProteinSequenceVersionId = unique_ScanCount_For_ProteinSequenceVersionId__Map_Key_ProteinSequenceVersionId.get( proteinSequenceVersionId_Entry )
                            if ( ! unique_ScanCount_For_ProteinSequenceVersionId ) {
                                unique_ScanCount_For_ProteinSequenceVersionId = 0 // NOT in Map so set to zero
                            }

                            if ( unique_ScanCount_SUM_All_Proteins !== 0 ) {

                                //  Skip next when unique_ScanCount_SUM_All_Proteins is zero to avoid divide by zero

                                apportionmentToProtein = unique_ScanCount_For_ProteinSequenceVersionId / unique_ScanCount_SUM_All_Proteins //  Assign Primary Expected value
                            } else {
                                //  DEBUGGING/Information ONLY
                                // unique_ScanCount_SUM_All_Proteins__ZERO_COUNT++
                            }
                        }

                        //  DEBUGGING Code Validation ONLY variable
                        // apportionmentToProtein__TOTAL += apportionmentToProtein

                        const adjustedSpectralCount_ForScan = apportionmentToProtein // since only 1 scan being processed

                        //  Add adjustedSpectralCount_ForScan to value for adjustedSpectralCount_For_ProteinSequenceVersionId

                        let adjusted_ScanCount_For_ProteinSequenceVersionId = adjusted_ScanCount_For_ProteinSequenceVersionId__Map_Key_ProteinSequenceVersionId.get( proteinSequenceVersionId_Entry )
                        if ( ! adjusted_ScanCount_For_ProteinSequenceVersionId ) {
                            adjusted_ScanCount_For_ProteinSequenceVersionId = 0 //  NO Value in Map for proteinSequenceVersionId_Entry so initialize to zero
                        }
                        adjusted_ScanCount_For_ProteinSequenceVersionId += adjustedSpectralCount_ForScan
                        adjusted_ScanCount_For_ProteinSequenceVersionId__Map_Key_ProteinSequenceVersionId.set( proteinSequenceVersionId_Entry, adjusted_ScanCount_For_ProteinSequenceVersionId )


                        // Example:
                        //
                        //     Two proteins, protein1 and protein2.
                        //
                        // protein1: unique spectral count 10
                        // protein2: unique spectral count 20
                        //
                        // peptideA maps to protein1 and protein2. peptideA spectral count is 5.
                        //
                        // ap for protein1 for peptideA is: 10/(10+20) or 0.33333
                        // ap for protein2 for peptideA is 20/(10+20) or 0.66667
                        //
                        // adjusted spectral count for protein1: 10 + 5 0.3333 = 11.665
                        // adjusted spectral count for protein2: 20 + 5 0.6667 = 23.3335
                    }

                    //  DEBUGGING/Information ONLY
                    //  Following test NOT throw Error so this section seems to be working
                    // if ( Math.abs( apportionmentToProtein__TOTAL - 1 ) > .01 ) {
                    //     const msg = "( Math.abs( apportionmentToProtein__TOTAL - 1 ) > .01 ). apportionmentToProtein__TOTAL: " + apportionmentToProtein__TOTAL
                    //     console.warn(msg)
                    //     throw Error(msg)
                    // }

                }
            }
        }

        //  DEBUGGING/Information ONLY
        // var z = unique_ScanCount_SUM_All_Proteins__ZERO_COUNT
    }

    { //  Set Adjusted Spectral Count on each Protein

        let adjusted_ScanCount_TOTAL = 0

        let adjusted_ScanCount_For_ProteinSequenceVersionId__Map_Key_ProteinSequenceVersionId_NOTCONTAIN = 0

        // Keep proteins in Groups.  Treat a group like a single protein for this processing

        //  Process the Protein Groups List if exists, else process the Protein List

        if ( proteinDisplayData.proteinGroupsList ) {

            for ( const proteinGroupItem of proteinDisplayData.proteinGroupsList ) {

                //  Each Protein Group Item

                //  Use "FIRST" proteinSequenceVersionId in the group
                let proteinSequenceVersionId_First: number
                {
                    const proteinItem_FIRST = proteinGroupItem.proteinList_Grouped[ 0 ]
                    proteinSequenceVersionId_First = proteinItem_FIRST.proteinSequenceVersionId
                }

                for ( const proteinItem of proteinGroupItem.proteinList_Grouped ) {

                    //  Each Protein Item IN A SINGLE Protein Group Item

                    let adjusted_Spectral_Count_ABACUS = adjusted_ScanCount_For_ProteinSequenceVersionId__Map_Key_ProteinSequenceVersionId.get( proteinSequenceVersionId_First )
                    if ( adjusted_Spectral_Count_ABACUS === undefined || adjusted_Spectral_Count_ABACUS === null ) {
                        adjusted_Spectral_Count_ABACUS = 0

                        adjusted_ScanCount_For_ProteinSequenceVersionId__Map_Key_ProteinSequenceVersionId_NOTCONTAIN++
                    }

                    update_ProteinItem_Callback({ adjusted_Spectral_Count_ABACUS, proteinItem })

                    if ( proteinItem.proteinSequenceVersionId === proteinSequenceVersionId_First ) {
                        //  Only for first protein in group since the adjusted_Spectral_Count_ABACUS is for all the scans in the group so each protein has the same value
                        adjusted_ScanCount_TOTAL += adjusted_Spectral_Count_ABACUS
                    }
                }
            }
        } else {

            for ( const proteinItem of proteinDisplayData.proteinList ) {

                let adjusted_Spectral_Count_ABACUS = adjusted_ScanCount_For_ProteinSequenceVersionId__Map_Key_ProteinSequenceVersionId.get( proteinItem.proteinSequenceVersionId )
                if ( adjusted_Spectral_Count_ABACUS === undefined || adjusted_Spectral_Count_ABACUS === null ) {
                    adjusted_Spectral_Count_ABACUS = 0

                    adjusted_ScanCount_For_ProteinSequenceVersionId__Map_Key_ProteinSequenceVersionId_NOTCONTAIN++
                }

                update_ProteinItem_Callback({ adjusted_Spectral_Count_ABACUS, proteinItem })

                adjusted_ScanCount_TOTAL += adjusted_Spectral_Count_ABACUS
            }
        }

        const z = adjusted_ScanCount_For_ProteinSequenceVersionId__Map_Key_ProteinSequenceVersionId_NOTCONTAIN


        //  Cross Validate scan count

        {
            //  Sum Scan Count from crossValidation_DataCollection_Root.scansAll__ScanNumber_Set_Map_Key_SearchScanFileId

            let scanCount_Total = 0
            for ( const scansAll__ScanNumber_Set of crossValidation_DataCollection_Root.scansAll__ScanNumber_Set_Map_Key_SearchScanFileId.values() ) {
                scanCount_Total += scansAll__ScanNumber_Set.size
            }

            const scanCount_Total_Difference = Math.abs( scanCount_Total -  adjusted_ScanCount_TOTAL )

            if ( scanCount_Total_Difference > 0.1 ) {
                const msg = "Math.abs( scanCount_Total -  adjusted_ScanCount_TOTAL ) > 0.1.  value: " + scanCount_Total_Difference
                console.warn(msg)
                throw Error(msg)
            }

        }
    }

}




/**
 * Process  Single Protein
 *
 *
 */
const _process__Single_Protein__Step_1 = function (
    {
        proteinSequenceVersionId_TO_USE,
        get_Protein_SubItem_ProjectSearchId_Result,
        psmTblData_For_ReportedPeptideId_For_MainFilters_Holder__Map_Key_ProjectSearchId,
        psmFilter_Callback,

        //  UPDATED

        proteinSequenceVersionId_Set__Map_Key_ScanNumber_Map_Key_SearchScanFileId, // SearchScanFileId when NOT on PSM is set to _SEARCH_SCAN_FILE_ID__FAKE__FOR_INTERNAL_DATASTRUCTURES__USE_WHEN_NOT_POPULATED

        crossValidation_DataCollection_Root
    } : {
        proteinSequenceVersionId_TO_USE : number  //  For Protein Group is first protein in group

        get_Protein_SubItem_ProjectSearchId_Result: { protein_Sub_Item_Array: Array<{ protein_Sub_Item: ProteinDataDisplay_ProteinList_Sub_Item, projectSearchId: number }> } //  Array to support multiple searches in condition

        psmTblData_For_ReportedPeptideId_For_MainFilters_Holder__Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder>

        /**
         * psmFilter_Callback:  ONLY Populated when need to filter PSMs.   Used for filter to Search Sub Group Id being Processed
         */
        psmFilter_Callback: INTERNAL__PsmFilter_Callback_Type

        //  UPDATED

        proteinSequenceVersionId_Set__Map_Key_ScanNumber_Map_Key_SearchScanFileId: Map<number, Map<number, Set<number>>>  // SearchScanFileId when NOT on PSM is set to _SEARCH_SCAN_FILE_ID__FAKE__FOR_INTERNAL_DATASTRUCTURES__USE_WHEN_NOT_POPULATED

        crossValidation_DataCollection_Root: INTERNAL__CrossValidation_DataCollection_Root
    }
) {

    for ( const protein_SubItem_ProjectSearchId_Entry of get_Protein_SubItem_ProjectSearchId_Result.protein_Sub_Item_Array ) {

        const psmTblData_For_ReportedPeptideId_For_MainFilters_Holder = psmTblData_For_ReportedPeptideId_For_MainFilters_Holder__Map_Key_ProjectSearchId.get( protein_SubItem_ProjectSearchId_Entry.projectSearchId )
        if ( ! psmTblData_For_ReportedPeptideId_For_MainFilters_Holder ) {
            const msg = "psmTblData_For_ReportedPeptideId_For_MainFilters_Holder__Map_Key_ProjectSearchId.get( protein_SubItem_ProjectSearchId_Entry.projectSearchId ) returned NOTHING for protein_SubItem_ProjectSearchId_Entry.projectSearchId: " + protein_SubItem_ProjectSearchId_Entry.projectSearchId
            console.warn(msg)
            throw Error(msg)
        }

        for ( const dataPerReportedPeptideId_Entry of protein_SubItem_ProjectSearchId_Entry.protein_Sub_Item.dataPerReportedPeptideId_Entries_Array ) {

            if ( dataPerReportedPeptideId_Entry.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId ) {

                const psmTblData_For_ReportedPeptideId = psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_ReportedPeptideId( dataPerReportedPeptideId_Entry.reportedPeptideId )
                if ( ! psmTblData_For_ReportedPeptideId ) {
                    const msg = "In 'NOW Process Each Protein': psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_ReportedPeptideId( dataPerReportedPeptideId_Entry.reportedPeptideId ). dataPerReportedPeptideId_Entry.reportedPeptideId:  " + dataPerReportedPeptideId_Entry.reportedPeptideId
                    console.warn( msg )
                    throw Error( msg )
                }

                for ( const psmTblData of psmTblData_For_ReportedPeptideId.get_PsmTblData_Entries_IterableIterator() ) {

                    if ( psmFilter_Callback && ( ! psmFilter_Callback({ psmId: psmTblData.psmId })  ) ) {
                        //  Have psmFilter_Callback and returned false so skip PSM
                        continue
                    }

                    let searchScanFileId_ToUse = psmTblData.searchScanFileId

                    if ( searchScanFileId_ToUse === null || searchScanFileId_ToUse === undefined ) {
                        //  psmTblData.searchScanFileId NOT set to set searchScanFileId_ToUse to arbitrary value that psmTblData.searchScanFileId cannot be set to
                        searchScanFileId_ToUse = _compute__searchScanFileId_ToUse__When_psmTblData_searchScanFileId__NO_Value({ projectSearchId: protein_SubItem_ProjectSearchId_Entry.projectSearchId })
                    }

                    let proteinSequenceVersionId_Set__Map_Key_ScanNumber = proteinSequenceVersionId_Set__Map_Key_ScanNumber_Map_Key_SearchScanFileId.get( searchScanFileId_ToUse )
                    if ( ! proteinSequenceVersionId_Set__Map_Key_ScanNumber ) {
                        proteinSequenceVersionId_Set__Map_Key_ScanNumber = new Map()
                        proteinSequenceVersionId_Set__Map_Key_ScanNumber_Map_Key_SearchScanFileId.set( searchScanFileId_ToUse, proteinSequenceVersionId_Set__Map_Key_ScanNumber )
                    }

                    let proteinSequenceVersionId_Set = proteinSequenceVersionId_Set__Map_Key_ScanNumber.get( psmTblData.scanNumber )
                    if ( ! proteinSequenceVersionId_Set ) {
                        proteinSequenceVersionId_Set = new Set()
                        proteinSequenceVersionId_Set__Map_Key_ScanNumber.set( psmTblData.scanNumber, proteinSequenceVersionId_Set )
                    }

                    proteinSequenceVersionId_Set.add( proteinSequenceVersionId_TO_USE )

                    //  Populate crossValidation_DataCollection_Root
                    {
                        let scansAll__ScanNumber_Set = crossValidation_DataCollection_Root.scansAll__ScanNumber_Set_Map_Key_SearchScanFileId.get( searchScanFileId_ToUse )
                        if ( ! scansAll__ScanNumber_Set ) {
                            scansAll__ScanNumber_Set = new Set()
                            crossValidation_DataCollection_Root.scansAll__ScanNumber_Set_Map_Key_SearchScanFileId.set( searchScanFileId_ToUse, scansAll__ScanNumber_Set )
                        }

                        scansAll__ScanNumber_Set.add( psmTblData.scanNumber )
                    }
                }

            } else {

                for ( const psmId of dataPerReportedPeptideId_Entry.psmIdsSet ) {

                    if ( psmFilter_Callback && ( ! psmFilter_Callback({ psmId })  ) ) {
                        //  Have psmFilter_Callback and returned false so skip PSM
                        continue
                    }

                    const psmTblData = psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_PsmId( psmId )
                    if ( ! psmTblData ) {
                        const msg = "In 'NOW Process Each Protein': psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_PsmId( psmId ). psmId: " + psmId + ", dataPerReportedPeptideId_Entry.reportedPeptideId:  " + dataPerReportedPeptideId_Entry.reportedPeptideId
                        console.warn( msg )
                        throw Error( msg )
                    }

                    let searchScanFileId_ToUse = psmTblData.searchScanFileId
                    if ( searchScanFileId_ToUse === null || searchScanFileId_ToUse === undefined ) {
                        //  psmTblData.searchScanFileId NOT set to set searchScanFileId_ToUse to arbitrary value that psmTblData.searchScanFileId cannot be set to
                        searchScanFileId_ToUse = _compute__searchScanFileId_ToUse__When_psmTblData_searchScanFileId__NO_Value({ projectSearchId: protein_SubItem_ProjectSearchId_Entry.projectSearchId })
                    }

                    let proteinSequenceVersionId_Set__Map_Key_ScanNumber = proteinSequenceVersionId_Set__Map_Key_ScanNumber_Map_Key_SearchScanFileId.get( searchScanFileId_ToUse )
                    if ( ! proteinSequenceVersionId_Set__Map_Key_ScanNumber ) {
                        proteinSequenceVersionId_Set__Map_Key_ScanNumber = new Map()
                        proteinSequenceVersionId_Set__Map_Key_ScanNumber_Map_Key_SearchScanFileId.set( searchScanFileId_ToUse, proteinSequenceVersionId_Set__Map_Key_ScanNumber )
                    }

                    let proteinSequenceVersionId_Set = proteinSequenceVersionId_Set__Map_Key_ScanNumber.get( psmTblData.scanNumber )
                    if ( ! proteinSequenceVersionId_Set ) {
                        proteinSequenceVersionId_Set = new Set()
                        proteinSequenceVersionId_Set__Map_Key_ScanNumber.set( psmTblData.scanNumber, proteinSequenceVersionId_Set )
                    }

                    proteinSequenceVersionId_Set.add( proteinSequenceVersionId_TO_USE )

                    //  Populate crossValidation_DataCollection_Root
                    {
                        let scansAll__ScanNumber_Set = crossValidation_DataCollection_Root.scansAll__ScanNumber_Set_Map_Key_SearchScanFileId.get( searchScanFileId_ToUse )
                        if ( ! scansAll__ScanNumber_Set ) {
                            scansAll__ScanNumber_Set = new Set()
                            crossValidation_DataCollection_Root.scansAll__ScanNumber_Set_Map_Key_SearchScanFileId.set( searchScanFileId_ToUse, scansAll__ScanNumber_Set )
                        }

                        scansAll__ScanNumber_Set.add( psmTblData.scanNumber )
                    }
                }
            }
        }
    }
}



/////////////////////


/**
 * Internal type
 */
type INTERNAL__PsmFilter_Callback_Type = ( { psmId } : { psmId: number } ) => boolean


class INTERNAL__CrossValidation_DataCollection_Root {

    scansAll__ScanNumber_Set_Map_Key_SearchScanFileId: Map<number, Set<number>>
}

/**
 *
 * @param projectSearchId
 */
const _compute__searchScanFileId_ToUse__When_psmTblData_searchScanFileId__NO_Value = function ( { projectSearchId } : { projectSearchId: number } ) {

    //  return negative of projectSearchId since:
    //   1) searchScanFileId in database cannot be negative
    //   2) it groups the scans by projectSearchId which is needed for Experiment Conditions
    return - projectSearchId
}