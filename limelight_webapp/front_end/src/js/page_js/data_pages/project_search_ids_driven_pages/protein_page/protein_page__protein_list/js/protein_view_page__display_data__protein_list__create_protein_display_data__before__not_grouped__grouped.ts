/**
 * protein_view_page__display_data__protein_list__create_protein_display_data__before__not_grouped__grouped.ts
 *
 * Create Display Data for Protein List - Before create final for either Protein Grouping applied or NO Protein Grouping
 */



import {ProteinViewPage_LoadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder";
import {ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides.ts";
import {proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Get_ProteinNameDescription_From_SubParts} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Get_ProteinNameDescription_From_SubParts.ts";

import {
    ProteinDisplayData_From_createProteinDisplayData_ProteinList,
    ProteinDataDisplay_ProteinList_Item,
    ProteinDataDisplay_ProteinList_Sub_Item
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__ProteinDisplayData_Classes";


/**
 * Entry in incoming Map
 */
export class ProteinNameDescriptionCacheEntry {
    name : string
    description: string
}


/////////////////////////

/**
 * Create Protein Data for Display - Before create final for Grouped or NOT Grouped
 *
 */
export const protein_view_page__display_data__protein_list__create_protein_display_data__before__not_grouped__grouped = function(
    {
        //   from call to fcn proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides
        proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result,

        searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection

        projectSearchIds,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,

    }: {
        proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result : ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result

        searchSubGroup_Ids_Selected : Set<number>; //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection

        projectSearchIds: Array<number>
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds: Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>

    }): {

    proteinDisplayData : ProteinDisplayData_From_createProteinDisplayData_ProteinList

    //   Cached: Protein Name and Description in a Map, Key ProteinSequenceVersionId
    proteinNameDescription_Key_ProteinSequenceVersionId : Map<number, ProteinNameDescriptionCacheEntry>

    //   Clear: Cached: Protein Name(s) and Description(s) for Tooltip in a Map, Key ProteinSequenceVersionId
    proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId : Map<number, Array<ProteinNameDescriptionCacheEntry>>
} {


    //  Validate loadedDataPerProjectSearchIdHolder populated for all projectSearchIds
    for (const projectSearchId of projectSearchIds) {
        const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get(projectSearchId);
        if (!loadedDataPerProjectSearchIdHolder) {
            throw Error("loadedDataPerProjectSearchIdHolder not populated for projectSearchId: " + projectSearchId); // Must have loadedDataPerProjectSearchIdHolder populated
        }
    }

    //  Validate num PSMs populated for all projectSearchIds
    for (const projectSearchId of projectSearchIds) {
        const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get(projectSearchId);
        if (!loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap()) {
            throw Error("loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap() not populated for projectSearchId: " + projectSearchId); // Must have num PSMs populated
        }
    }

    let proteinList_Item_Map_KeyProteinSequenceVersionId : Map<number, ProteinDataDisplay_ProteinList_Item> = new Map();
    // let summaryMap_Key_ProjectSearchId : Map<number, ProteinDataDisplay__Summary_PerSearch> = undefined;


    //   Protein Name and Description in a Map, Key ProteinSequenceVersionId
    let proteinNameDescription_Key_ProteinSequenceVersionId : Map<number, ProteinNameDescriptionCacheEntry> = new Map();

    //   Protein Name(s) and Description(s) for Tooltip in a Map, Key ProteinSequenceVersionId
    let proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId : Map<number, Array<ProteinNameDescriptionCacheEntry>> = new Map();


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

            const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get(projectSearchId);
            if (!loadedDataPerProjectSearchIdHolder) {
                throw Error("loadedDataPerProjectSearchIdHolder not populated for projectSearchId: " + projectSearchId); // Must have loadedDataPerProjectSearchIdHolder populated
            }

            const proteinSequenceVersionIds_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_proteinSequenceVersionIds_KeyReportedPeptideId()
            if (!proteinSequenceVersionIds_KeyReportedPeptideId) {
                throw Error("loadedDataPerProjectSearchIdHolder.get_proteinSequenceVersionIds_KeyReportedPeptideId() not populated for projectSearchId: " + projectSearchId);
            }

            const proteinInfoMapKeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_proteinInfoMapKeyProteinSequenceVersionId()
            if (!proteinInfoMapKeyProteinSequenceVersionId) {
                throw Error("loadedDataPerProjectSearchIdHolder.get_proteinInfoMapKeyProteinSequenceVersionId() not populated for projectSearchId: " + projectSearchId);
            }

            //  Process dataPerReportedPeptideId map

            for (const dataPerReportedPeptideId_MapEntry of dataPerReportedPeptideId_Map_Key_reportedPeptideId.entries()) {

                const dataPerReportedPeptideId = dataPerReportedPeptideId_MapEntry[1];

                const reportedPeptideId = dataPerReportedPeptideId.reportedPeptideId

                //  Process Proteins (proteinSequenceVersionIds) that reportedPeptideId maps to

                const proteinSequenceVersionIds = proteinSequenceVersionIds_KeyReportedPeptideId.get(reportedPeptideId);
                if (!proteinSequenceVersionIds) {
                    throw Error("proteinSequenceVersionIds not populated for reportedPeptideId: " + reportedPeptideId + ", projectSearchId: " + projectSearchId);
                }

                for (const proteinSequenceVersionId of proteinSequenceVersionIds) {

                    let proteinInfo = proteinInfoMapKeyProteinSequenceVersionId.get(proteinSequenceVersionId);
                    if (proteinInfo === undefined) {
                        throw Error("No proteinInfo found.  proteinSequenceVersionId: " + proteinSequenceVersionId);
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
                        protein_SubItem = new ProteinDataDisplay_ProteinList_Sub_Item({
                            proteinSequenceVersionId,
                            proteinInfo,
                            reportedPeptide_CommonValue_EncodedString_ForProtein_Set: new Set(),
                            reportedPeptideIds_NoPsmFilters: new Set(),
                            reportedPeptideIds_AndTheirPsmIds: new Map(),
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
                                            protein_SubItem_For_SubGroup_Id = new ProteinDataDisplay_ProteinList_Sub_Item({
                                                proteinSequenceVersionId,
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

                const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
                if (!loadedDataPerProjectSearchIdHolder) {
                    throw Error("loadedDataPerProjectSearchIdHolder not populated for projectSearchId: " + projectSearchId); // Must have loadedDataPerProjectSearchIdHolder populated
                }

                const numPsmsForReportedPeptideIdMap = loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap();
                if (!numPsmsForReportedPeptideIdMap) {
                    throw Error("loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap() returned nothing for projectSearchId: " + projectSearchId);
                }

                for ( const reportedPeptideId of protein_SubItem_For_projectSearchId_MapValue.reportedPeptideIds_NoPsmFilters ) {

                    const numPsms_For_ReportedPeptideId = numPsmsForReportedPeptideIdMap.get(reportedPeptideId);
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

            const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
            if (!loadedDataPerProjectSearchIdHolder) {
                throw Error("loadedDataPerProjectSearchIdHolder not populated for projectSearchId: " + projectSearchId); // Must have loadedDataPerProjectSearchIdHolder populated
            }

            const numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map = loadedDataPerProjectSearchIdHolder.get_numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map();
            if (!numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map) {
                throw Error("loadedDataPerProjectSearchIdHolder.get_numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map() returned nothing for projectSearchId: " + projectSearchId);
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

                        const numPsmsMap_SearchSubGroupId_For_ReportedPeptideId = numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map.get(reportedPeptideId);
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
    }
}
