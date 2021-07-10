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

// /**
//  * Entry in incoming Map
//  */
// export class CountsFor_proteinSequenceVersionIdEntry {
//     numReportedPeptides : number
//     numReportedPeptidesUnique : number
//     numPsms : number
// }


/////////////////////////

/**
 * Create Protein Data for Display - Before create final for Grouped or NOT Grouped
 *
 */
export const protein_view_page__display_data__protein_list__create_protein_display_data__before__not_grouped__grouped = function(
    {
        //   from call to fcn proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides
        proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result,

        projectSearchIds,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,

    }: {
        proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result : ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result
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

            const dataPerReportedPeptideId_Map_Key_reportedPeptideId = dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId.get( projectSearchId );
            if ( ! dataPerReportedPeptideId_Map_Key_reportedPeptideId ) {
                //  Not found for projectSearchId
                continue;  // EARLY CONTINUE
            }

            const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
            if (!loadedDataPerProjectSearchIdHolder) {
                throw Error("loadedDataPerProjectSearchIdHolder not populated for projectSearchId: " + projectSearchId); // Must have loadedDataPerProjectSearchIdHolder populated
            }

            const proteinSequenceVersionIds_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_proteinSequenceVersionIds_KeyReportedPeptideId()
            if ( !proteinSequenceVersionIds_KeyReportedPeptideId ) {
                throw Error("loadedDataPerProjectSearchIdHolder.get_proteinSequenceVersionIds_KeyReportedPeptideId() not populated for projectSearchId: " + projectSearchId);
            }

            const proteinInfoMapKeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_proteinInfoMapKeyProteinSequenceVersionId()
            if ( !proteinInfoMapKeyProteinSequenceVersionId ) {
                throw Error("loadedDataPerProjectSearchIdHolder.get_proteinInfoMapKeyProteinSequenceVersionId() not populated for projectSearchId: " + projectSearchId);
            }

            //  Process dataPerReportedPeptideId map

            for ( const dataPerReportedPeptideId_MapEntry of dataPerReportedPeptideId_Map_Key_reportedPeptideId.entries() ) {

                const dataPerReportedPeptideId = dataPerReportedPeptideId_MapEntry[ 1 ];

                const reportedPeptideId = dataPerReportedPeptideId.reportedPeptideId
                // dataPerReportedPeptideId.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId
                // dataPerReportedPeptideId.psmIdsSet

                const proteinSequenceVersionIds = proteinSequenceVersionIds_KeyReportedPeptideId.get(reportedPeptideId);
                if (!proteinSequenceVersionIds) {
                    throw Error("proteinSequenceVersionIds not populated for reportedPeptideId: " + reportedPeptideId + ", projectSearchId: " + projectSearchId);
                }

                for (const proteinSequenceVersionId of proteinSequenceVersionIds) {

                    let proteinInfo = proteinInfoMapKeyProteinSequenceVersionId.get(proteinSequenceVersionId);
                    if (proteinInfo === undefined) {
                        throw Error("No proteinInfo found.  proteinSequenceVersionId: " + proteinSequenceVersionId);
                    }

                    let proteinList_Item = proteinList_Item_Map_KeyProteinSequenceVersionId.get( proteinSequenceVersionId );
                    if ( ! proteinList_Item ) {
                        proteinList_Item = new ProteinDataDisplay_ProteinList_Item();
                        proteinList_Item_Map_KeyProteinSequenceVersionId.set( proteinSequenceVersionId, proteinList_Item );
                        proteinList_Item.proteinSequenceVersionId = proteinSequenceVersionId;
                    }

                    let protein_SubItem = proteinList_Item.protein_SubItem_Records_Map_Key_projectSearchId.get( projectSearchId );

                    if ( ! protein_SubItem ) {
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

                    protein_SubItem.reportedPeptide_CommonValue_EncodedString_ForProtein_Set.add( reportedPeptide_CommonValue_EncodedString );

                    if ( dataPerReportedPeptideId.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId ) {

                        protein_SubItem.reportedPeptideIds_NoPsmFilters.add( reportedPeptideId );
                        protein_SubItem.reportedPeptideIds_AndTheirPsmIds.delete( reportedPeptideId );

                    } else {
                        if ( ! protein_SubItem.reportedPeptideIds_NoPsmFilters.has( reportedPeptideId ) ) {

                            let reportedPeptideIds_AndTheirPsmIds_Entry = protein_SubItem.reportedPeptideIds_AndTheirPsmIds.get( reportedPeptideId );
                            if ( ! reportedPeptideIds_AndTheirPsmIds_Entry ) {
                                reportedPeptideIds_AndTheirPsmIds_Entry = new Set<number>();
                                protein_SubItem.reportedPeptideIds_AndTheirPsmIds.set( reportedPeptideId, reportedPeptideIds_AndTheirPsmIds_Entry );
                            }
                            for ( const psmId of dataPerReportedPeptideId.psmIdsSet ) {
                                reportedPeptideIds_AndTheirPsmIds_Entry.add( psmId );
                            }
                        }
                    }

                    const psmCountsMap_Key_SubSearchGroup_Id = generatedPeptideEntry.psmCountsMap_Key_SubSearchGroup_Id; // ONLY populated for Single Search that has Sub Groups

                    if ( psmCountsMap_Key_SubSearchGroup_Id ) {

                        for ( const psmCountsMapEntry of psmCountsMap_Key_SubSearchGroup_Id.entries() ) {

                            const subSearchGroup_Id = psmCountsMapEntry[0];
                            const psmCount = psmCountsMapEntry[1];

                            let protein_SubItem = proteinList_Item.protein_SubItem_Records_Map_Key_SubGroup_Id.get( subSearchGroup_Id );
                            if ( ! protein_SubItem ) {
                                protein_SubItem = new ProteinDataDisplay_ProteinList_Sub_Item({
                                    proteinSequenceVersionId,
                                    proteinInfo,
                                    reportedPeptide_CommonValue_EncodedString_ForProtein_Set: new Set(),
                                    reportedPeptideIds_NoPsmFilters: new Set(),
                                    reportedPeptideIds_AndTheirPsmIds: new Map(),
                                    numPsms: 0,
                                    uniquePeptideCount: -9998
                                });
                                proteinList_Item.protein_SubItem_Records_Map_Key_SubGroup_Id.set( subSearchGroup_Id, protein_SubItem );
                            }

                            protein_SubItem.reportedPeptide_CommonValue_EncodedString_ForProtein_Set.add( reportedPeptide_CommonValue_EncodedString );

                            protein_SubItem.numPsms += psmCount;
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

            //  Have Sub Group Data

            proteinEntry_InMap.numPsms_Overall = 0;
            proteinEntry_InMap.generatedPeptides_Overall_Set.clear();

            for (const protein_SubItem_Records_MapEntry of proteinEntry_InMap.protein_SubItem_Records_Map_Key_SubGroup_Id.entries()) {

                const protein_SubItem = protein_SubItem_Records_MapEntry[1];

                proteinEntry_InMap.numPsms_Overall += protein_SubItem.numPsms;

                for (const reportedPeptide_CommonValue_EncodedString of protein_SubItem.reportedPeptide_CommonValue_EncodedString_ForProtein_Set) {

                    proteinEntry_InMap.generatedPeptides_Overall_Set.add(reportedPeptide_CommonValue_EncodedString);
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
