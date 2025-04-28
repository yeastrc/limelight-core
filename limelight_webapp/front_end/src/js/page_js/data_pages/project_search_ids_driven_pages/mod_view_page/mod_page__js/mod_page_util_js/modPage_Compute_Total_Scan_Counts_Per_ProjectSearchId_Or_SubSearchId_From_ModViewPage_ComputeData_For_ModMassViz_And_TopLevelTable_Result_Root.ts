/**
 * modPage_Compute_Total_Scan_Counts_Per_ProjectSearchId_Or_SubSearchId_From_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root.ts
 */
import {
    ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable";


export class ModPage_Compute_Total_Scan_Counts_Per_ProjectSearchId_Or_SubSearchId_From_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root_Result_Root {

    result_Total_Scan_Counts_For_Single_ProjectSearchId_Or_SubSearchId_Map_Key_ProjectSearchId_Or_SubSearchId: ReadonlyMap<number, ModPage_Compute_Total_Scan_Counts_Per_ProjectSearchId_Or_SubSearchId_From_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root_Result_Single_ProjectSearchId_Or_SubSearchId>
}

export class ModPage_Compute_Total_Scan_Counts_Per_ProjectSearchId_Or_SubSearchId_From_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root_Result_Single_ProjectSearchId_Or_SubSearchId {

    readonly projectSearchId_Or_SubSearchId: number
    readonly scanNumbers_Set_Map_Key_SearchScanFileId_AcrossAllModMasses__OnlyWhen_SearchScanFileId_YES_Populated: ReadonlyMap<number, ReadonlySet<number>>
    readonly scanNumbers_Set_AcrossAllModMasses__OnlyWhen_SearchScanFileId_NOT_Populated: ReadonlySet<number>

    readonly unique_ScanNumber_SearchScanFileId_Pair_Count_AcrossAllModMasses: number
}

/**
 *
 * @param computeData_For_ModMassViz_And_TopLevelTable_Result_Root
 */
export const modPage_Compute_Total_Scan_Counts_Per_ProjectSearchId_Or_SubSearchId_From_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root = function (
    {
        computeData_For_ModMassViz_And_TopLevelTable_Result_Root
    } : {
        computeData_For_ModMassViz_And_TopLevelTable_Result_Root: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
    }
) : ModPage_Compute_Total_Scan_Counts_Per_ProjectSearchId_Or_SubSearchId_From_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root_Result_Root {

    const psmId_Set_Map_Key_ProjectSearchId_Or_SubSearchId: Map<number, Set<number>> = new Map()

    const scanNumbers_Set_Map_Key_SearchScanFileId_AcrossAllModMasses__OnlyWhen_SearchScanFileId_YES_Populated__Map_Key_ProjectSearchId_Or_SubSearchId: Map<number, Map<number, Set<number>>> = new Map()
    const scanNumbers_Set_AcrossAllModMasses__OnlyWhen_SearchScanFileId_NOT_Populated__Map_Key_ProjectSearchId_Or_SubSearchId: Map<number, Set<number>> = new Map()


    for ( const dataFor_ModMass of computeData_For_ModMassViz_And_TopLevelTable_Result_Root.get_Data_AllValues() ) {

        for ( const dataFor_ProjectSearchId_Or_SubSearchId of dataFor_ModMass.get_Data_AllValues() ) {

            const projectSearchId_Or_SubSearchId = dataFor_ProjectSearchId_Or_SubSearchId.projectSearchId_Or_SubSearchId

            let scanNumbers_Set_Map_Key_SearchScanFileId_AcrossAllModMasses__OnlyWhen_SearchScanFileId_YES_Populated = scanNumbers_Set_Map_Key_SearchScanFileId_AcrossAllModMasses__OnlyWhen_SearchScanFileId_YES_Populated__Map_Key_ProjectSearchId_Or_SubSearchId.get( projectSearchId_Or_SubSearchId )
            if ( ! scanNumbers_Set_Map_Key_SearchScanFileId_AcrossAllModMasses__OnlyWhen_SearchScanFileId_YES_Populated ) {
                scanNumbers_Set_Map_Key_SearchScanFileId_AcrossAllModMasses__OnlyWhen_SearchScanFileId_YES_Populated = new Map()
                scanNumbers_Set_Map_Key_SearchScanFileId_AcrossAllModMasses__OnlyWhen_SearchScanFileId_YES_Populated__Map_Key_ProjectSearchId_Or_SubSearchId.set( projectSearchId_Or_SubSearchId, scanNumbers_Set_Map_Key_SearchScanFileId_AcrossAllModMasses__OnlyWhen_SearchScanFileId_YES_Populated )
            }

            let scanNumbers_Set_AcrossAllModMasses__OnlyWhen_SearchScanFileId_NOT_Populated = scanNumbers_Set_AcrossAllModMasses__OnlyWhen_SearchScanFileId_NOT_Populated__Map_Key_ProjectSearchId_Or_SubSearchId.get( projectSearchId_Or_SubSearchId )
            if ( ! scanNumbers_Set_AcrossAllModMasses__OnlyWhen_SearchScanFileId_NOT_Populated ) {
                scanNumbers_Set_AcrossAllModMasses__OnlyWhen_SearchScanFileId_NOT_Populated = new Set()
                scanNumbers_Set_AcrossAllModMasses__OnlyWhen_SearchScanFileId_NOT_Populated__Map_Key_ProjectSearchId_Or_SubSearchId.set( projectSearchId_Or_SubSearchId, scanNumbers_Set_AcrossAllModMasses__OnlyWhen_SearchScanFileId_NOT_Populated )
            }

            for ( const dataFor_SinglePsm of dataFor_ProjectSearchId_Or_SubSearchId.get_DataFor_SinglePsm_All() ) {

                const psmTblData = dataFor_SinglePsm.modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_ForSingle_Psm.psmTblData

                if ( psmTblData.searchScanFileId === undefined || psmTblData.searchScanFileId === null ) {

                    scanNumbers_Set_AcrossAllModMasses__OnlyWhen_SearchScanFileId_NOT_Populated.add( psmTblData.scanNumber )

                } else {
                    let scanNumbers_Set = scanNumbers_Set_Map_Key_SearchScanFileId_AcrossAllModMasses__OnlyWhen_SearchScanFileId_YES_Populated.get( psmTblData.searchScanFileId )
                    if ( ! scanNumbers_Set ) {
                        scanNumbers_Set = new Set()
                        scanNumbers_Set_Map_Key_SearchScanFileId_AcrossAllModMasses__OnlyWhen_SearchScanFileId_YES_Populated.set( psmTblData.searchScanFileId, scanNumbers_Set )
                    }
                    scanNumbers_Set.add( psmTblData.scanNumber )
                }
            }

            let psmId_Set = psmId_Set_Map_Key_ProjectSearchId_Or_SubSearchId.get( projectSearchId_Or_SubSearchId )
            if ( ! psmId_Set ) {
                psmId_Set = new Set()
                psmId_Set_Map_Key_ProjectSearchId_Or_SubSearchId.set( projectSearchId_Or_SubSearchId, psmId_Set )
            }

            for ( const psmId of dataFor_ProjectSearchId_Or_SubSearchId.get_PsmIds() ) {
                psmId_Set.add( psmId )
            }
        }
    }

    const projectSearchId_Or_SubSearchId_All_Set = new Set( scanNumbers_Set_Map_Key_SearchScanFileId_AcrossAllModMasses__OnlyWhen_SearchScanFileId_YES_Populated__Map_Key_ProjectSearchId_Or_SubSearchId.keys() )
    for ( const projectSearchId_Or_SubSearchId of scanNumbers_Set_AcrossAllModMasses__OnlyWhen_SearchScanFileId_NOT_Populated__Map_Key_ProjectSearchId_Or_SubSearchId.keys() ) {
        projectSearchId_Or_SubSearchId_All_Set.add( projectSearchId_Or_SubSearchId )
    }

    const result_Single_ProjectSearchId_Or_SubSearchId_Map_Key_ProjectSearchId_Or_SubSearchId: Map<number, ModPage_Compute_Total_Scan_Counts_Per_ProjectSearchId_Or_SubSearchId_From_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root_Result_Single_ProjectSearchId_Or_SubSearchId> = new Map()

    for ( const projectSearchId_Or_SubSearchId of projectSearchId_Or_SubSearchId_All_Set ) {

        const scanNumbers_Set_Map_Key_SearchScanFileId_AcrossAllModMasses__OnlyWhen_SearchScanFileId_YES_Populated = scanNumbers_Set_Map_Key_SearchScanFileId_AcrossAllModMasses__OnlyWhen_SearchScanFileId_YES_Populated__Map_Key_ProjectSearchId_Or_SubSearchId.get( projectSearchId_Or_SubSearchId )
        const scanNumbers_Set_AcrossAllModMasses__OnlyWhen_SearchScanFileId_NOT_Populated = scanNumbers_Set_AcrossAllModMasses__OnlyWhen_SearchScanFileId_NOT_Populated__Map_Key_ProjectSearchId_Or_SubSearchId.get( projectSearchId_Or_SubSearchId )

        let unique_ScanNumber_SearchScanFileId_Pair_Count_AcrossAllModMasses = 0

        if ( scanNumbers_Set_Map_Key_SearchScanFileId_AcrossAllModMasses__OnlyWhen_SearchScanFileId_YES_Populated ) {
            for ( const scanNumbers_Set of scanNumbers_Set_Map_Key_SearchScanFileId_AcrossAllModMasses__OnlyWhen_SearchScanFileId_YES_Populated.values() ) {
                unique_ScanNumber_SearchScanFileId_Pair_Count_AcrossAllModMasses += scanNumbers_Set.size
            }
        }
        if ( scanNumbers_Set_AcrossAllModMasses__OnlyWhen_SearchScanFileId_NOT_Populated ) {
            unique_ScanNumber_SearchScanFileId_Pair_Count_AcrossAllModMasses += scanNumbers_Set_AcrossAllModMasses__OnlyWhen_SearchScanFileId_NOT_Populated.size
        }

        const resultEntry : ModPage_Compute_Total_Scan_Counts_Per_ProjectSearchId_Or_SubSearchId_From_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root_Result_Single_ProjectSearchId_Or_SubSearchId = {

            projectSearchId_Or_SubSearchId,
            scanNumbers_Set_Map_Key_SearchScanFileId_AcrossAllModMasses__OnlyWhen_SearchScanFileId_YES_Populated,
            scanNumbers_Set_AcrossAllModMasses__OnlyWhen_SearchScanFileId_NOT_Populated,
            unique_ScanNumber_SearchScanFileId_Pair_Count_AcrossAllModMasses
        }
        result_Single_ProjectSearchId_Or_SubSearchId_Map_Key_ProjectSearchId_Or_SubSearchId.set( projectSearchId_Or_SubSearchId, resultEntry )
    }

    return {
        result_Total_Scan_Counts_For_Single_ProjectSearchId_Or_SubSearchId_Map_Key_ProjectSearchId_Or_SubSearchId: result_Single_ProjectSearchId_Or_SubSearchId_Map_Key_ProjectSearchId_Or_SubSearchId
    }
}
