/**
 * protein_view_page__display_data__protein_list__create_protein_display_data__before__not_grouped__grouped.ts
 *
 * Create Display Data for Protein List - Before create final for either Protein Grouping applied or NO Protein Grouping
 */


import {ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides";
import {proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Get_ProteinNameDescription_From_SubParts} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Get_ProteinNameDescription_From_SubParts";

import {
    ProteinDataDisplay_ProteinList_Item,
    ProteinDataDisplay_ProteinList_Sub_Item,
    ProteinDisplayData_From_createProteinDisplayData_ProteinList
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__ProteinDisplayData_Classes";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_FunctionResult} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters";
import {CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters__get_ProteinSequenceVersionIds_And_ProteinCoverage__FunctionResult} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters";
import {CommonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters__get_ProteinInfoHolder__FunctionResult} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters";
import {CommonData_LoadedFromServer_SingleSearch__Num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__Num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters";


/**
 * Entry in incoming Map
 */
export class ProteinNameDescriptionCacheEntry {
    name : string
    description: string
}


/////////////////////////

/**
 * Create Protein Data for Display - Before create final for Grouped or NOT Grouped.
 *
 */
export const protein_view_page__display_data__protein_list__create_protein_display_data__before__not_grouped__grouped = function(
    {
        //   from call to fcn proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides
        proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result,

        searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection

        projectSearchIds,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    }: {
        proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result : ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result

        searchSubGroup_Ids_Selected : Set<number>; //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection

        projectSearchIds: Array<number>
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    }):
    //  Returned Promise with Object
    Promise<{
        proteinDisplayData : ProteinDisplayData_From_createProteinDisplayData_ProteinList

        //   Cached: Protein Name and Description in a Map, Key ProteinSequenceVersionId
        proteinNameDescription_Key_ProteinSequenceVersionId : Map<number, ProteinNameDescriptionCacheEntry>

        //   Clear: Cached: Protein Name(s) and Description(s) for Tooltip in a Map, Key ProteinSequenceVersionId
        proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId : Map<number, Array<ProteinNameDescriptionCacheEntry>>
    }> {

    return new Promise<{
        proteinDisplayData : ProteinDisplayData_From_createProteinDisplayData_ProteinList

        //   Cached: Protein Name and Description in a Map, Key ProteinSequenceVersionId
        proteinNameDescription_Key_ProteinSequenceVersionId : Map<number, ProteinNameDescriptionCacheEntry>

        //   Clear: Cached: Protein Name(s) and Description(s) for Tooltip in a Map, Key ProteinSequenceVersionId
        proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId : Map<number, Array<ProteinNameDescriptionCacheEntry>>
    }>( (resolve, reject) => {

        const get_data_RetrievedFromServer_Result = _get_data_RetrievedFromServer({
            projectSearchIds, searchSubGroup_Ids_Selected, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        });

        if ( get_data_RetrievedFromServer_Result.data ) {

            const internalFunction_AfterLoadData_Result = internalFunction_AfterLoadData({
                proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result,
                searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
                projectSearchIds,
                data_RetrievedFromServer: get_data_RetrievedFromServer_Result.data
            });

            resolve(internalFunction_AfterLoadData_Result);

        } else if ( get_data_RetrievedFromServer_Result.promise ) {

            get_data_RetrievedFromServer_Result.promise.catch(reason => {
                reject(reason);
            });
            get_data_RetrievedFromServer_Result.promise.then(value => {
                try {

                    const internalFunction_AfterLoadData_Result = internalFunction_AfterLoadData({
                        proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result,
                        searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
                        projectSearchIds,
                        data_RetrievedFromServer: value
                    });

                    resolve(internalFunction_AfterLoadData_Result);

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            })
        } else {
            throw Error("get_data_RetrievedFromServer_Result 'data' and 'promise' both NOT have value");
        }

    });

}


/**
 * Create Protein Data for Display - Before create final for Grouped or NOT Grouped.
 *
 */
const internalFunction_AfterLoadData = function(
    {
        //   from call to fcn proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides
        proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result,

        searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection

        projectSearchIds,

        data_RetrievedFromServer
    }: {
        proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result : ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result

        searchSubGroup_Ids_Selected : Set<number>; //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection

        projectSearchIds: Array<number>

        data_RetrievedFromServer: Internal__Get_data_RetrievedFromServer_Result
    }):
    //  Returned Promise with Object
    {
        proteinDisplayData : ProteinDisplayData_From_createProteinDisplayData_ProteinList

        //   Cached: Protein Name and Description in a Map, Key ProteinSequenceVersionId
        proteinNameDescription_Key_ProteinSequenceVersionId : Map<number, ProteinNameDescriptionCacheEntry>

        //   Clear: Cached: Protein Name(s) and Description(s) for Tooltip in a Map, Key ProteinSequenceVersionId
        proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId : Map<number, Array<ProteinNameDescriptionCacheEntry>>
    }
{
    try {
        //  Accumulated data to be returned from function

        const proteinList_Item_Map_KeyProteinSequenceVersionId : Map<number, ProteinDataDisplay_ProteinList_Item> = new Map();
        // let summaryMap_Key_ProjectSearchId : Map<number, ProteinDataDisplay__Summary_PerSearch> = undefined;


        //   Protein Name and Description in a Map, Key ProteinSequenceVersionId
        const proteinNameDescription_Key_ProteinSequenceVersionId : Map<number, ProteinNameDescriptionCacheEntry> = new Map();

        //   Protein Name(s) and Description(s) for Tooltip in a Map, Key ProteinSequenceVersionId
        const proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId : Map<number, Array<ProteinNameDescriptionCacheEntry>> = new Map();

        ////////////

        for ( const generatedPeptideEntry of proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result.peptideList ) {

            const reportedPeptide_CommonValue_EncodedString = generatedPeptideEntry.reportedPeptide_CommonValue_EncodedString;
            const dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId = generatedPeptideEntry.dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId;

            //  generatedPeptideEntry.psmCountsMap_Key_SubSearchGroup_Id processed below ONLY if populated for Single Search that has Sub Groups

            for (const projectSearchId of projectSearchIds) {

                const dataPerReportedPeptideId_Map_Key_reportedPeptideId = dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId.get(projectSearchId);
                if (!dataPerReportedPeptideId_Map_Key_reportedPeptideId) {
                    //  Not found for projectSearchId
                    continue;  // EARLY CONTINUE
                }

                const proteinSequenceVersionIds_And_ProteinCoverage__For_ProjectSearchId = data_RetrievedFromServer.proteinSequenceVersionIds_And_ProteinCoverage__Map_Key_ProjectSearchId.get(projectSearchId)
                if (!proteinSequenceVersionIds_And_ProteinCoverage__For_ProjectSearchId) {
                    throw Error("data_RetrievedFromServer.proteinSequenceVersionIds_And_ProteinCoverage__Map_Key_ProjectSearchId.get(projectSearchId) not populated for projectSearchId: " + projectSearchId);
                }

                const proteinInfo__For_ProjectSearchId = data_RetrievedFromServer.proteinInfo_For_MainFilters__Map_Key_ProjectSearchId.get(projectSearchId)
                if (!proteinInfo__For_ProjectSearchId) {
                    throw Error("data_RetrievedFromServer.proteinInfo_For_MainFilters__Map_Key_ProjectSearchId.get(projectSearchId) not populated for projectSearchId: " + projectSearchId);
                }

                //  Process dataPerReportedPeptideId map

                for (const dataPerReportedPeptideId_MapEntry of dataPerReportedPeptideId_Map_Key_reportedPeptideId.entries()) {

                    const dataPerReportedPeptideId = dataPerReportedPeptideId_MapEntry[1];

                    const reportedPeptideId = dataPerReportedPeptideId.reportedPeptideId

                    //  Process Proteins (proteinSequenceVersionIds) that reportedPeptideId maps to

                    const proteinSequenceVersionIds =
                        proteinSequenceVersionIds_And_ProteinCoverage__For_ProjectSearchId.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder.
                        get_proteinSequenceVersionIds_For_ReportedPeptideId(reportedPeptideId);
                    if (!proteinSequenceVersionIds) {
                        throw Error("proteinSequenceVersionIds not populated for reportedPeptideId: " + reportedPeptideId + ", projectSearchId: " + projectSearchId);
                    }

                    for (const proteinSequenceVersionId of proteinSequenceVersionIds) {

                        const proteinInfo = proteinInfo__For_ProjectSearchId.proteinInfo_For_MainFilters_Holder.get_ProteinInfo_For_ProteinSequenceVersionId(proteinSequenceVersionId);
                        if ( ! proteinInfo ) {
                            const msg = "proteinInfo__For_ProjectSearchId.proteinInfo_For_MainFilters_Holder.get_ProteinInfo_For_ProteinSequenceVersionId(proteinSequenceVersionId); returned nothing for proteinSequenceVersionId: " +
                                proteinSequenceVersionId + ", projectSearchId: " + projectSearchId
                            console.warn(msg)
                            throw Error(msg)
                        }

                        let proteinList_Item = proteinList_Item_Map_KeyProteinSequenceVersionId.get(proteinSequenceVersionId);
                        if (!proteinList_Item) {
                            proteinList_Item = new ProteinDataDisplay_ProteinList_Item();
                            proteinList_Item_Map_KeyProteinSequenceVersionId.set(proteinSequenceVersionId, proteinList_Item);
                            proteinList_Item.proteinSequenceVersionId = proteinSequenceVersionId;
                        }

                        //  Protein Sub Data for projectSearchId

                        let protein_SubItem = proteinList_Item.protein_SubItem_Records_Map_Key_projectSearchId.get(projectSearchId);

                        if ( ! protein_SubItem) {

                            //  loadedDataPerProjectSearchIdHolder used for calling
                            // protein_SubItem_For_ProjectSearchId.loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyProteinSequenceVersionId();

                            protein_SubItem = new ProteinDataDisplay_ProteinList_Sub_Item({
                                proteinSequenceVersionId,
                                projectSearchId,
                                proteinInfo,
                                reportedPeptide_CommonValue_EncodedString_ForProtein_Set: new Set(),
                                reportedPeptideIds_NoPsmFilters: new Set(),
                                reportedPeptideIds_AndTheirPsmIds: new Map(),
                                // loadedDataPerProjectSearchIdHolder,
                                numPsms: -9997,
                                uniquePeptideCount: -9998
                            });
                            proteinList_Item.protein_SubItem_Records_Map_Key_projectSearchId.set(projectSearchId, protein_SubItem);
                        }

                        protein_SubItem.dataPerReportedPeptideId_Entries_Array.push( dataPerReportedPeptideId );

                        protein_SubItem.reportedPeptide_CommonValue_EncodedString_ForProtein_Set.add(reportedPeptide_CommonValue_EncodedString);

                        if (dataPerReportedPeptideId.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId) {

                            //  No SubFiltering On PsmIds For ReportedPeptideId

                            protein_SubItem.reportedPeptideIds_NoPsmFilters.add(reportedPeptideId);

                            //  remove possible entry in reportedPeptideIds_AndTheirPsmIds for this reportedPeptideId
                            protein_SubItem.reportedPeptideIds_AndTheirPsmIds.delete(reportedPeptideId);

                            //  If Single Search and Sub Groups

                            if (projectSearchIds.length === 1 && searchSubGroup_Ids_Selected) {

                                //  Single Search and Sub Groups

                                const dataPerReportedPeptideId_Map_Key_SearchSubgroupId = generatedPeptideEntry.dataPerReportedPeptideId_Map_Key_SearchSubgroupId_Map_Key_reportedPeptideId.get(reportedPeptideId);

                                if ( dataPerReportedPeptideId_Map_Key_SearchSubgroupId ) {
                                    for (const searchSubGroup_Id of searchSubGroup_Ids_Selected) {

                                        const dataPerReportedPeptideId = dataPerReportedPeptideId_Map_Key_SearchSubgroupId.get(searchSubGroup_Id);
                                        if ( dataPerReportedPeptideId ) {

                                            let protein_SubItem_For_SubGroup_Id = proteinList_Item.protein_SubItem_Records_Map_Key_SubGroup_Id.get(searchSubGroup_Id);
                                            if (!protein_SubItem_For_SubGroup_Id) {

                                                //  loadedDataPerProjectSearchIdHolder used for calling
                                                // protein_SubItem_For_ProjectSearchId.loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyProteinSequenceVersionId();

                                                protein_SubItem_For_SubGroup_Id = new ProteinDataDisplay_ProteinList_Sub_Item({
                                                    proteinSequenceVersionId,
                                                    projectSearchId,
                                                    proteinInfo,
                                                    reportedPeptide_CommonValue_EncodedString_ForProtein_Set: new Set(),
                                                    reportedPeptideIds_NoPsmFilters: new Set(),
                                                    reportedPeptideIds_AndTheirPsmIds: new Map(),
                                                    // loadedDataPerProjectSearchIdHolder,
                                                    numPsms: 0,
                                                    uniquePeptideCount: -9998
                                                });
                                                proteinList_Item.protein_SubItem_Records_Map_Key_SubGroup_Id.set(searchSubGroup_Id, protein_SubItem_For_SubGroup_Id);
                                            }

                                            protein_SubItem_For_SubGroup_Id.reportedPeptide_CommonValue_EncodedString_ForProtein_Set.add(reportedPeptide_CommonValue_EncodedString);

                                            //  No SubFiltering On PsmIds For ReportedPeptideId

                                            protein_SubItem_For_SubGroup_Id.reportedPeptideIds_NoPsmFilters.add(reportedPeptideId);

                                            //  remove possible entry in reportedPeptideIds_AndTheirPsmIds for this reportedPeptideId
                                            protein_SubItem_For_SubGroup_Id.reportedPeptideIds_AndTheirPsmIds.delete(reportedPeptideId);
                                        }
                                    }
                                }
                            }

                        } else {

                            //  else of: No SubFiltering On PsmIds For ReportedPeptideId

                            if ( ! protein_SubItem.reportedPeptideIds_NoPsmFilters.has(reportedPeptideId) ) {

                                //  Not in reportedPeptideIds_NoPsmFilters so add to or update entry in reportedPeptideIds_AndTheirPsmIds for psmIdsSet

                                let reportedPeptideIds_AndTheirPsmIds_Entry = protein_SubItem.reportedPeptideIds_AndTheirPsmIds.get(reportedPeptideId);
                                if ( ! reportedPeptideIds_AndTheirPsmIds_Entry) {
                                    reportedPeptideIds_AndTheirPsmIds_Entry = new Set<number>();
                                    protein_SubItem.reportedPeptideIds_AndTheirPsmIds.set(reportedPeptideId, reportedPeptideIds_AndTheirPsmIds_Entry);
                                }
                                for (const psmId of dataPerReportedPeptideId.psmIdsSet) {
                                    reportedPeptideIds_AndTheirPsmIds_Entry.add(psmId);
                                }


                                //  If Single Search and Sub Groups

                                if (projectSearchIds.length === 1 && searchSubGroup_Ids_Selected) {

                                    //  Single Search and Sub Groups

                                    const dataPerReportedPeptideId_Map_Key_SearchSubgroupId = generatedPeptideEntry.dataPerReportedPeptideId_Map_Key_SearchSubgroupId_Map_Key_reportedPeptideId.get(reportedPeptideId);

                                    if ( dataPerReportedPeptideId_Map_Key_SearchSubgroupId ) {
                                        for (const searchSubGroup_Id of searchSubGroup_Ids_Selected) {

                                            const dataPerReportedPeptideId = dataPerReportedPeptideId_Map_Key_SearchSubgroupId.get(searchSubGroup_Id);
                                            if ( dataPerReportedPeptideId ) {

                                                let protein_SubItem_For_SubGroup_Id = proteinList_Item.protein_SubItem_Records_Map_Key_SubGroup_Id.get(searchSubGroup_Id);
                                                if (!protein_SubItem_For_SubGroup_Id) {

                                                    protein_SubItem_For_SubGroup_Id = new ProteinDataDisplay_ProteinList_Sub_Item({
                                                        proteinSequenceVersionId,
                                                        projectSearchId,
                                                        proteinInfo,
                                                        reportedPeptide_CommonValue_EncodedString_ForProtein_Set: new Set(),
                                                        reportedPeptideIds_NoPsmFilters: new Set(),
                                                        reportedPeptideIds_AndTheirPsmIds: new Map(),
                                                        numPsms: 0,
                                                        uniquePeptideCount: -9998
                                                    });
                                                    proteinList_Item.protein_SubItem_Records_Map_Key_SubGroup_Id.set(searchSubGroup_Id, protein_SubItem_For_SubGroup_Id);
                                                }

                                                protein_SubItem_For_SubGroup_Id.reportedPeptide_CommonValue_EncodedString_ForProtein_Set.add(reportedPeptide_CommonValue_EncodedString);

                                                if ( ! protein_SubItem_For_SubGroup_Id.reportedPeptideIds_NoPsmFilters.has(reportedPeptideId) ) {

                                                    //  Not already NO SubFiltering On PsmIds For Sub Group

                                                    let reportedPeptideIds_AndTheirPsmIds_Entry = protein_SubItem_For_SubGroup_Id.reportedPeptideIds_AndTheirPsmIds.get(reportedPeptideId);
                                                    if ( ! reportedPeptideIds_AndTheirPsmIds_Entry) {
                                                        reportedPeptideIds_AndTheirPsmIds_Entry = new Set<number>();
                                                        protein_SubItem_For_SubGroup_Id.reportedPeptideIds_AndTheirPsmIds.set(reportedPeptideId, reportedPeptideIds_AndTheirPsmIds_Entry);
                                                    }

                                                    for (const psmId of dataPerReportedPeptideId.psmIdsSet) {
                                                        reportedPeptideIds_AndTheirPsmIds_Entry.add(psmId);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                        }

                    }
                }
            }
        }

        const proteinResultList: Array<ProteinDataDisplay_ProteinList_Item> = [];

        for ( const proteinMapEntry of proteinList_Item_Map_KeyProteinSequenceVersionId.entries() ) {

            const proteinEntry_InMap = proteinMapEntry[ 1 ];

            const proteinSequenceVersionId = proteinEntry_InMap.proteinSequenceVersionId;
            proteinEntry_InMap.numPsms_Overall = 0;

            for ( const protein_SubItem_For_projectSearchId_MapEntry of proteinEntry_InMap.protein_SubItem_Records_Map_Key_projectSearchId.entries() ) {

                const projectSearchId = protein_SubItem_For_projectSearchId_MapEntry[ 0 ];
                const protein_SubItem_For_projectSearchId_MapValue = protein_SubItem_For_projectSearchId_MapEntry[ 1 ];

                protein_SubItem_For_projectSearchId_MapValue.numPsms = 0;

                if ( protein_SubItem_For_projectSearchId_MapValue.reportedPeptideIds_NoPsmFilters && protein_SubItem_For_projectSearchId_MapValue.reportedPeptideIds_NoPsmFilters.size > 0 ) {

                    const reportedPeptideId_Based_Data__Map_Key_ProjectSearchId_For_ProjectSearchId = data_RetrievedFromServer.reportedPeptideId_Based_Data__Map_Key_ProjectSearchId.get( projectSearchId );
                    if (!reportedPeptideId_Based_Data__Map_Key_ProjectSearchId_For_ProjectSearchId) {
                        throw Error("data_RetrievedFromServer.reportedPeptideId_Based_Data__Map_Key_ProjectSearchId.get( projectSearchId ); returned NOTHING for projectSearchId: " + projectSearchId);
                    }

                    for ( const reportedPeptideId of protein_SubItem_For_projectSearchId_MapValue.reportedPeptideIds_NoPsmFilters ) {

                        const numPsms_For_ReportedPeptideId = reportedPeptideId_Based_Data__Map_Key_ProjectSearchId_For_ProjectSearchId.numPsmsForReportedPeptideIdMap.get(reportedPeptideId);
                        if ( numPsms_For_ReportedPeptideId ) {
                            protein_SubItem_For_projectSearchId_MapValue.numPsms += numPsms_For_ReportedPeptideId;
                        }
                    }
                }
                if ( protein_SubItem_For_projectSearchId_MapValue.reportedPeptideIds_AndTheirPsmIds && protein_SubItem_For_projectSearchId_MapValue.reportedPeptideIds_AndTheirPsmIds.size > 0 ) {

                    for ( const reportedPeptideIds_AndTheirPsmIds_MapEntry of protein_SubItem_For_projectSearchId_MapValue.reportedPeptideIds_AndTheirPsmIds.entries() ) {

                        // const reportedPeptideId = reportedPeptideIds_AndTheirPsmIds_MapEntry[ 0 ];
                        const psmIds = reportedPeptideIds_AndTheirPsmIds_MapEntry[ 1 ];
                        protein_SubItem_For_projectSearchId_MapValue.numPsms += psmIds.size;
                    }
                }

                proteinEntry_InMap.numPsms_Overall += protein_SubItem_For_projectSearchId_MapValue.numPsms;

                for ( const reportedPeptide_CommonValue_EncodedString of protein_SubItem_For_projectSearchId_MapValue.reportedPeptide_CommonValue_EncodedString_ForProtein_Set ) {
                    proteinEntry_InMap.generatedPeptides_Overall_Set.add( reportedPeptide_CommonValue_EncodedString );
                }

                const protein_SubItem_Records_Array : Array<ProteinDataDisplay_ProteinList_Sub_Item> = [];

                //  Process Project Search Ids Map
                for ( const protein_SubItem_For_projectSearchId_MapEntry of proteinEntry_InMap.protein_SubItem_Records_Map_Key_projectSearchId.entries() ) {
                    protein_SubItem_Records_Array.push( protein_SubItem_For_projectSearchId_MapEntry[ 1 ] );
                }

                const {
                    proteinNameDescriptionEntry,
                    proteinNamesAndDescriptionsArray
                } =
                    proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Get_ProteinNameDescription_From_SubParts({
                        proteinSequenceVersionId, protein_SubItem_Records_Array
                    });

                proteinNameDescription_Key_ProteinSequenceVersionId.set( proteinSequenceVersionId, proteinNameDescriptionEntry );
                proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId.set( proteinSequenceVersionId, proteinNamesAndDescriptionsArray );

                proteinEntry_InMap.proteinNames = proteinNameDescriptionEntry.name;
                proteinEntry_InMap.proteinDescriptions = proteinNameDescriptionEntry.description;
            }

            if ( proteinEntry_InMap.protein_SubItem_Records_Map_Key_SubGroup_Id && proteinEntry_InMap.protein_SubItem_Records_Map_Key_SubGroup_Id.size > 0 ) {

                if ( projectSearchIds.length !== 1 ) {
                    const msg = "( proteinEntry_InMap.protein_SubItem_Records_Map_Key_SubGroup_Id && proteinEntry_InMap.protein_SubItem_Records_Map_Key_SubGroup_Id.size > 0 ) AND ( projectSearchIds.length !== 1 )";
                    console.warn(msg);
                    throw Error(msg);
                }

                const projectSearchId = projectSearchIds[0];

                const numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder =
                    data_RetrievedFromServer.numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.get(projectSearchId);
                if (!numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder) {
                    throw Error("numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder not populated for projectSearchId: " + projectSearchId);
                }

                //  Have Sub Group Data.  Update the proteinEntry_InMap  Overall data for PSM Count and generatedPeptides_Overall_Set

                proteinEntry_InMap.numPsms_Overall = 0;
                proteinEntry_InMap.generatedPeptides_Overall_Set.clear();

                for ( const protein_SubItem_For_SubGroup_Id_MapEntry of proteinEntry_InMap.protein_SubItem_Records_Map_Key_SubGroup_Id.entries() ) {

                    const subGroup_Id = protein_SubItem_For_SubGroup_Id_MapEntry[ 0 ];
                    const protein_SubItem_For_SubGroup_Id_MapValue = protein_SubItem_For_SubGroup_Id_MapEntry[ 1 ];

                    protein_SubItem_For_SubGroup_Id_MapValue.numPsms = 0;

                    if ( protein_SubItem_For_SubGroup_Id_MapValue.reportedPeptideIds_NoPsmFilters && protein_SubItem_For_SubGroup_Id_MapValue.reportedPeptideIds_NoPsmFilters.size > 0 ) {

                        for ( const reportedPeptideId of protein_SubItem_For_SubGroup_Id_MapValue.reportedPeptideIds_NoPsmFilters ) {

                            const numPsmsMap_SearchSubGroupId_For_ReportedPeptideId =
                                numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder.get_numPsmsFor_SearchSubGroupId__For_ReportedPeptideId(reportedPeptideId);
                            if ( numPsmsMap_SearchSubGroupId_For_ReportedPeptideId ) {
                                const numPsms_For_SearchSubGroupId = numPsmsMap_SearchSubGroupId_For_ReportedPeptideId.get(subGroup_Id);
                                if ( numPsms_For_SearchSubGroupId ) {
                                    protein_SubItem_For_SubGroup_Id_MapValue.numPsms += numPsms_For_SearchSubGroupId;
                                }
                            }
                        }
                    }
                    if ( protein_SubItem_For_SubGroup_Id_MapValue.reportedPeptideIds_AndTheirPsmIds && protein_SubItem_For_SubGroup_Id_MapValue.reportedPeptideIds_AndTheirPsmIds.size > 0 ) {

                        for ( const reportedPeptideIds_AndTheirPsmIds_MapEntry of protein_SubItem_For_SubGroup_Id_MapValue.reportedPeptideIds_AndTheirPsmIds.entries() ) {

                            // const reportedPeptideId = reportedPeptideIds_AndTheirPsmIds_MapEntry[ 0 ];
                            const psmIds = reportedPeptideIds_AndTheirPsmIds_MapEntry[ 1 ];
                            protein_SubItem_For_SubGroup_Id_MapValue.numPsms += psmIds.size;
                        }
                    }

                    for (const protein_SubItem_Records_MapEntry of proteinEntry_InMap.protein_SubItem_Records_Map_Key_SubGroup_Id.entries()) {

                        const protein_SubItem = protein_SubItem_Records_MapEntry[1];

                        proteinEntry_InMap.numPsms_Overall += protein_SubItem.numPsms;

                        for (const reportedPeptide_CommonValue_EncodedString of protein_SubItem.reportedPeptide_CommonValue_EncodedString_ForProtein_Set) {

                            proteinEntry_InMap.generatedPeptides_Overall_Set.add(reportedPeptide_CommonValue_EncodedString);
                        }
                    }
                }
            }

            proteinResultList.push( proteinEntry_InMap );
        }

        /////////////////

        //  Final result

        const proteinDisplayData = new ProteinDisplayData_From_createProteinDisplayData_ProteinList();
        proteinDisplayData.proteinList = proteinResultList;

        // proteinDisplayData.proteinGroupsList = undefined; //  Not populated yet, if at all
        // proteinDisplayData.distinctPeptide_TotalCount = undefined; //  Not populated yet
        // proteinDisplayData.psm_TotalCount = undefined  //  Not populated yet
        // ,
        // proteinGroups_ArrayOf_ProteinGroup, summaryMap_Key_ProjectSearchId

        return {
            proteinDisplayData,
            proteinNameDescription_Key_ProteinSequenceVersionId,
            proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId
        };

    } catch( e ) {
        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
        throw e;
    }
}

//////////////////////////////////

//   Get Data from server

class Internal__Get_data_RetrievedFromServer_Result {

    reportedPeptideId_Based_Data__Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_FunctionResult>
    proteinSequenceVersionIds_And_ProteinCoverage__Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters__get_ProteinSequenceVersionIds_And_ProteinCoverage__FunctionResult>
    proteinInfo_For_MainFilters__Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters__get_ProteinInfoHolder__FunctionResult>
    numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__Num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder>
}

/**
 *
 * @param projectSearchIds
 * @param commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
 * @private
 */
const _get_data_RetrievedFromServer = function(
    {
        projectSearchIds, searchSubGroup_Ids_Selected, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    } : {
        projectSearchIds: Array<number>
        searchSubGroup_Ids_Selected : Set<number>; //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    }) : {
    data: Internal__Get_data_RetrievedFromServer_Result
    promise: Promise<Internal__Get_data_RetrievedFromServer_Result>
}
{
    try {
        // Returned Data

        const reportedPeptideId_Based_Data__Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_FunctionResult> = new Map()
        const proteinSequenceVersionIds_And_ProteinCoverage__Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters__get_ProteinSequenceVersionIds_And_ProteinCoverage__FunctionResult> = new Map()
        const proteinInfo_For_MainFilters__Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters__get_ProteinInfoHolder__FunctionResult> = new Map()
        let numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__Num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder> = undefined;

        //  Promises

        const promises: Array<Promise<void>> = [];

        for ( const projectSearchId of projectSearchIds ) {

            const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId);
            if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
                throw Error("commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId); returned NOTHING for projectSearchId: " + projectSearchId )
            }

            {  // Get  numPsmsForReportedPeptideIdMap_Result

                const get_numPsmsForReportedPeptideIdMap_Result =
                    commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters().get_numPsmsForReportedPeptideIdMap();

                if ( get_numPsmsForReportedPeptideIdMap_Result.data ) {

                    reportedPeptideId_Based_Data__Map_Key_ProjectSearchId.set( projectSearchId, get_numPsmsForReportedPeptideIdMap_Result.data );

                } else if ( get_numPsmsForReportedPeptideIdMap_Result.promise ) {

                    const promise = new Promise<void>( (resolve, reject) => {
                        try {
                            get_numPsmsForReportedPeptideIdMap_Result.promise.catch(reason => {
                                try {
                                    reject(reason);
                                } catch( e ) {
                                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                    throw e;
                                }
                            })
                            get_numPsmsForReportedPeptideIdMap_Result.promise.then( value => {
                                try {
                                    reportedPeptideId_Based_Data__Map_Key_ProjectSearchId.set( projectSearchId, value );

                                    resolve();

                                } catch( e ) {
                                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                    throw e;
                                }
                            })
                        } catch( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                            throw e;
                        }
                    });

                    promises.push(promise)

                } else {
                    throw Error("get_numPsmsForReportedPeptideIdMap(): NOT populated: data or promise")
                }
            }

            {  // Get  ProteinSequenceVersionIds_And_ProteinCoverage

                const get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result =
                    commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                    get_commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters().
                    get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch()

                if ( get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.data ) {

                    proteinSequenceVersionIds_And_ProteinCoverage__Map_Key_ProjectSearchId.set( projectSearchId, get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.data );

                } else if ( get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise ) {

                    const promise = new Promise<void>( (resolve, reject) => {
                        try {
                            get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise.catch(reason => {
                                try {
                                    reject(reason);
                                } catch( e ) {
                                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                    throw e;
                                }
                            })
                            get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise.then( value => {
                                try {
                                    proteinSequenceVersionIds_And_ProteinCoverage__Map_Key_ProjectSearchId.set( projectSearchId, value );

                                    resolve();

                                } catch( e ) {
                                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                    throw e;
                                }
                            })
                        } catch( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                            throw e;
                        }
                    });

                    promises.push(promise)

                } else {
                    throw Error("get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch(): NOT populated: data or promise")
                }
            }

            {  // Get  ProteinSequenceVersionIds_And_ProteinCoverage

                const get_ProteinInfoHolder_AllForSearch_Result =
                    commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                    get_commonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters().
                    get_ProteinInfoHolder_AllForSearch()

                if ( get_ProteinInfoHolder_AllForSearch_Result.data ) {

                    proteinInfo_For_MainFilters__Map_Key_ProjectSearchId.set( projectSearchId, get_ProteinInfoHolder_AllForSearch_Result.data );

                } else if ( get_ProteinInfoHolder_AllForSearch_Result.promise ) {

                    const promise = new Promise<void>( (resolve, reject) => {
                        try {
                            get_ProteinInfoHolder_AllForSearch_Result.promise.catch(reason => {
                                try {
                                    reject(reason);
                                } catch( e ) {
                                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                    throw e;
                                }
                            })
                            get_ProteinInfoHolder_AllForSearch_Result.promise.then( value => {
                                try {
                                    proteinInfo_For_MainFilters__Map_Key_ProjectSearchId.set( projectSearchId, value );

                                    resolve();

                                } catch( e ) {
                                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                    throw e;
                                }
                            })
                        } catch( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                            throw e;
                        }
                    });

                    promises.push(promise)

                } else {
                    throw Error("get_ProteinInfoHolder_AllForSearch(): NOT populated: data or promise")
                }
            }
            if ( searchSubGroup_Ids_Selected ) {

                {  //  searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId

                    if ( ! numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId ) {
                        numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId = new Map()
                    }

                    const get_Num_PSMs_By_SearchSubGroup_For_ReportedPeptideIdHolder_AllForSearch_Result =
                        commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                        get_commonData_LoadedFromServer_SingleSearch__Num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters().
                        get_Num_PSMs_By_SearchSubGroup_For_ReportedPeptideIdHolder_AllForSearch();

                    if ( get_Num_PSMs_By_SearchSubGroup_For_ReportedPeptideIdHolder_AllForSearch_Result.data ) {

                        numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.set(
                            projectSearchId, get_Num_PSMs_By_SearchSubGroup_For_ReportedPeptideIdHolder_AllForSearch_Result.data.numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder
                        );

                    } else if ( get_Num_PSMs_By_SearchSubGroup_For_ReportedPeptideIdHolder_AllForSearch_Result.promise ) {

                        const promise = new Promise<void>( (resolve, reject) => {
                            get_Num_PSMs_By_SearchSubGroup_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.catch(reason => {
                                reject(reason);
                            })
                            get_Num_PSMs_By_SearchSubGroup_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.then(value => {
                                try {

                                    numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.set(
                                        projectSearchId, value.numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder
                                    );

                                    resolve();

                                } catch( e ) {
                                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                    throw e;
                                }
                            });
                        });

                        promises.push(promise);

                    } else {
                        throw Error("get_Num_PSMs_By_SearchSubGroup_For_ReportedPeptideIdHolder_AllForSearch_Result 'data' 'promise' both NOT have value");
                    }
                }
            }
        }

        if ( promises.length === 0 ) {

            return {
                data: {
                    reportedPeptideId_Based_Data__Map_Key_ProjectSearchId,
                    proteinSequenceVersionIds_And_ProteinCoverage__Map_Key_ProjectSearchId,
                    proteinInfo_For_MainFilters__Map_Key_ProjectSearchId,
                    numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId
                },
                promise: undefined
            }
        }

        const promisesAll = Promise.all( promises );

        const promise = new Promise<Internal__Get_data_RetrievedFromServer_Result>( (resolve, reject) => {
            try {
                promisesAll.catch( reason => {
                    reject(reason)
                });
                promisesAll.then( value => {
                    try {
                        resolve({
                            reportedPeptideId_Based_Data__Map_Key_ProjectSearchId,
                            proteinSequenceVersionIds_And_ProteinCoverage__Map_Key_ProjectSearchId,
                            proteinInfo_For_MainFilters__Map_Key_ProjectSearchId,
                            numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId
                        });

                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                })
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });

        return {
            promise, data: undefined
        }
    } catch( e ) {
        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
        throw e;
    }

}
