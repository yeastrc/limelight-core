/**
 * proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_Combine_ReportedPeptideIdsPsmIds_Per_ProjectSearchId__After_ALL_Filtering.ts
 *
 * Create Display Data for Protein List - Combine Reported Peptide Ids Peptide and PSM Ids per Project Search Id for the final displayed Protein List
 *
 *      Created since same Reported Peptide Ids Peptide and PSM Ids can be under multiple proteins
 *
 *      Used for computing total PSM and for downloads
 */


import {
    ProteinDisplayData_From_createProteinDisplayData_ProteinList,
    ProteinDataDisplay_ProteinList_Item,
    ProteinDataDisplay_ProteinList_Sub_Item,
    ProteinDataDisplay__ReportedPeptideIds_AndTheir_PsmIds_PerSearch_Container,
    ProteinDataDisplay__ReportedPeptideIds_AndTheir_PsmIds_PerSearch_SingleSearch,
    ProteinDataDisplay__ReportedPeptideIds_AndTheir_PsmIds_PerSearch_SingleReportedPeptideId
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__ProteinDisplayData_Classes";
import {
    Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__SingleReportedPeptideId_ForSinglePsmId
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId";


/**
 *  Called after final filtering of protein list to populate data accumulated across proteins in the final list
 */
export const proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_Combine_ReportedPeptideIdsPsmIds_Per_ProjectSearchId__After_ALL_Filtering = function (
    {
        process_SubGroups,
        projectSearchIds,
        proteinDisplayData
    } : {
        process_SubGroups: boolean
        projectSearchIds: Array<number>
        proteinDisplayData: ProteinDisplayData_From_createProteinDisplayData_ProteinList
    }) : void {

    const reportedPeptideIds_AndTheir_PsmIds_PerSearch_Container = new ProteinDataDisplay__ReportedPeptideIds_AndTheir_PsmIds_PerSearch_Container();
    proteinDisplayData.reportedPeptideIds_AndTheir_PsmIds_PerSearch_Container__After_All_Filtering = reportedPeptideIds_AndTheir_PsmIds_PerSearch_Container;

    if ( proteinDisplayData.proteinGroupsList ) {
        for (const proteinGroupItem of proteinDisplayData.proteinGroupsList) {

            _processProteinList({
                process_SubGroups,
                projectSearchIds,
                proteinList: proteinGroupItem.proteinList_Grouped,
                reportedPeptideIds_AndTheir_PsmIds_PerSearch_Container
            });
        }
    } else {

        _processProteinList({
            process_SubGroups,
            projectSearchIds,
            proteinList: proteinDisplayData.proteinList,
            reportedPeptideIds_AndTheir_PsmIds_PerSearch_Container
        });
    }

}

/**
 *
 */
const _processProteinList = function(
    {
        process_SubGroups,
        projectSearchIds,
        proteinList,
        //  Updated
        reportedPeptideIds_AndTheir_PsmIds_PerSearch_Container
    } : {
        process_SubGroups: boolean
        projectSearchIds: Array<number>
        proteinList: Array<ProteinDataDisplay_ProteinList_Item>
        reportedPeptideIds_AndTheir_PsmIds_PerSearch_Container: ProteinDataDisplay__ReportedPeptideIds_AndTheir_PsmIds_PerSearch_Container
    }) : void {

    // if ( process_SubGroups ) {
    //
    //     _processProteinList_SubGroupId_Map({ projectSearchIds, proteinList, reportedPeptideIds_AndTheir_PsmIds_PerSearch_Container });
    // } else {

        _processProteinList_ProjectSearchId_Map({ projectSearchIds, proteinList, reportedPeptideIds_AndTheir_PsmIds_PerSearch_Container });
    // }

}

/**
 *
 */
// const _processProteinList_SubGroupId_Map = function(
//     {
//         projectSearchIds,
//         proteinList,
//         //  Updated
//         reportedPeptideIds_AndTheir_PsmIds_PerSearch_Container
//     } : {
//         projectSearchIds: Array<number>
//         proteinList: Array<ProteinDataDisplay_ProteinList_Item>
//         reportedPeptideIds_AndTheir_PsmIds_PerSearch_Container: ProteinDataDisplay__ReportedPeptideIds_AndTheir_PsmIds_PerSearch_Container
//     }) : void {
//
//     if ( projectSearchIds.length !== 1 ) {
//         const msg = "( projectSearchIds.length !== 1 ): _processProteinList_SubGroupId_Map: proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_Combine_ReportedPeptideIdsPsmIds_Per_ProjectSearchId";
//         console.warn(msg);
//         throw Error(msg);
//     }
//
//     const projectSearchId = projectSearchIds[0];
//
//     for (const proteinItem of proteinList) {
//
//         // const proteinSequenceVersionId = proteinItem.proteinSequenceVersionId
//
//         for (const mapEntry of proteinItem.protein_SubItem_Records_Map_Key_SubGroup_Id) {
//
//             // const subGroupId = mapEntry[0];
//             const protein_SubItem = mapEntry[1];
//
//             _processProteinSubItem({ protein_SubItem, projectSearchId, reportedPeptideIds_AndTheir_PsmIds_PerSearch_Container });
//         }
//     }
// }

/**
 *
 */
const _processProteinList_ProjectSearchId_Map = function(
    {
        projectSearchIds,
        proteinList,
        //  Updated
        reportedPeptideIds_AndTheir_PsmIds_PerSearch_Container
    } : {
        projectSearchIds: Array<number>
        proteinList: Array<ProteinDataDisplay_ProteinList_Item>
        reportedPeptideIds_AndTheir_PsmIds_PerSearch_Container: ProteinDataDisplay__ReportedPeptideIds_AndTheir_PsmIds_PerSearch_Container
    }) : void {


    for (const proteinItem of proteinList) {

        // const proteinSequenceVersionId = proteinItem.proteinSequenceVersionId

        for (const mapEntry of proteinItem.protein_SubItem_Records_Map_Key_projectSearchId) {

            const projectSearchId = mapEntry[0];
            const protein_SubItem = mapEntry[1];

            _processProteinSubItem({ protein_SubItem, projectSearchId, reportedPeptideIds_AndTheir_PsmIds_PerSearch_Container });
        }
    }
}

/**
 *
 */
const _processProteinSubItem = function (
    {
        protein_SubItem,
        projectSearchId,
        //  Updated
        reportedPeptideIds_AndTheir_PsmIds_PerSearch_Container

    } : {
        protein_SubItem: ProteinDataDisplay_ProteinList_Sub_Item
        projectSearchId: number
        reportedPeptideIds_AndTheir_PsmIds_PerSearch_Container: ProteinDataDisplay__ReportedPeptideIds_AndTheir_PsmIds_PerSearch_Container
    }) : void {

    if ( ! reportedPeptideIds_AndTheir_PsmIds_PerSearch_Container.data_Per_ProjectSearchId_Map_Key_ProjectSearchId ) {
        reportedPeptideIds_AndTheir_PsmIds_PerSearch_Container.data_Per_ProjectSearchId_Map_Key_ProjectSearchId = new Map();
    }

    let data_For_ProjectSearchId = reportedPeptideIds_AndTheir_PsmIds_PerSearch_Container.data_Per_ProjectSearchId_Map_Key_ProjectSearchId.get( projectSearchId );
    if ( ! data_For_ProjectSearchId ) {
        data_For_ProjectSearchId = new ProteinDataDisplay__ReportedPeptideIds_AndTheir_PsmIds_PerSearch_SingleSearch({ projectSearchId });
        reportedPeptideIds_AndTheir_PsmIds_PerSearch_Container.data_Per_ProjectSearchId_Map_Key_ProjectSearchId.set( projectSearchId, data_For_ProjectSearchId );
    }


    if (protein_SubItem.reportedPeptideIds_NoPsmFilters && protein_SubItem.reportedPeptideIds_NoPsmFilters.size > 0) {
        for (const reportedPeptideId of protein_SubItem.reportedPeptideIds_NoPsmFilters) {

            let data_For_ReportedPeptideId = data_For_ProjectSearchId.data_Per_ReportedPeptideId_Map_Key_ReportedPeptideId.get(reportedPeptideId);
            if ( ! data_For_ReportedPeptideId ) {
                data_For_ReportedPeptideId = new ProteinDataDisplay__ReportedPeptideIds_AndTheir_PsmIds_PerSearch_SingleReportedPeptideId({ reportedPeptideId, all_PsmIds_BasedOnFilterCutoffs: true });
                data_For_ProjectSearchId.data_Per_ReportedPeptideId_Map_Key_ReportedPeptideId.set(reportedPeptideId, data_For_ReportedPeptideId);
            } else {
                data_For_ReportedPeptideId.all_PsmIds_BasedOnFilterCutoffs = true;
                data_For_ReportedPeptideId.psmEntries_Include_Map_Key_PsmId = undefined;
            }
        }
    }

    if (protein_SubItem.reportedPeptideIds_AndTheirPsmEntries__PsmEntry_Map_Key_PsmId_Map_Key_ReportedPeptideId && protein_SubItem.reportedPeptideIds_AndTheirPsmEntries__PsmEntry_Map_Key_PsmId_Map_Key_ReportedPeptideId.size > 0) {

        for (const reportedPeptideId_AndItsPsmIds of protein_SubItem.reportedPeptideIds_AndTheirPsmEntries__PsmEntry_Map_Key_PsmId_Map_Key_ReportedPeptideId) {

            const reportedPeptideId = reportedPeptideId_AndItsPsmIds[ 0 ];
            const psmEntry_Map_Key_PsmId_Input = reportedPeptideId_AndItsPsmIds[ 1 ];

            let data_For_ReportedPeptideId = data_For_ProjectSearchId.data_Per_ReportedPeptideId_Map_Key_ReportedPeptideId.get(reportedPeptideId);
            if ( ! data_For_ReportedPeptideId ) {
                data_For_ReportedPeptideId = new ProteinDataDisplay__ReportedPeptideIds_AndTheir_PsmIds_PerSearch_SingleReportedPeptideId({ reportedPeptideId, all_PsmIds_BasedOnFilterCutoffs: false });
                data_For_ProjectSearchId.data_Per_ReportedPeptideId_Map_Key_ReportedPeptideId.set(reportedPeptideId, data_For_ReportedPeptideId);
            }
            if ( ! data_For_ReportedPeptideId.all_PsmIds_BasedOnFilterCutoffs ) {

                if ( ! data_For_ReportedPeptideId.psmEntries_Include_Map_Key_PsmId ) {
                    data_For_ReportedPeptideId.psmEntries_Include_Map_Key_PsmId = new Map();
                }
                for (const psmEntry of psmEntry_Map_Key_PsmId_Input.values() ) {

                    const psmEntry_InMap = data_For_ReportedPeptideId.psmEntries_Include_Map_Key_PsmId.get( psmEntry.psmId )
                    if ( ! psmEntry_InMap ) {
                        //  NOT in map so just add
                        data_For_ReportedPeptideId.psmEntries_Include_Map_Key_PsmId.set( psmEntry.psmId, psmEntry )
                    } else {
                        //  In Map so merge new entry with entry in map and store new merged entry in map

                        const psmEntry_Merged = Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__SingleReportedPeptideId_ForSinglePsmId.merge_ExistingObjectsOfThisType([ psmEntry, psmEntry_InMap ])

                        data_For_ReportedPeptideId.psmEntries_Include_Map_Key_PsmId.set( psmEntry.psmId, psmEntry_Merged )
                    }
                }
            }
        }
    }
}

