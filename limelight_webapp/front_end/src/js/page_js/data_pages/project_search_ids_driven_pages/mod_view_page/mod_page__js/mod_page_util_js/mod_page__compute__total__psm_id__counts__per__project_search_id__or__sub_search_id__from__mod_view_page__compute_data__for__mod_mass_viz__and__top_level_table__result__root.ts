/**
 * modPage_Compute_TotalPsmIdCounts_From_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root.ts
 */
import {
    ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable";


export class ModPage_Compute_Total_PsmId_Counts_Per_ProjectSearchId_Or_SubSearchId_From_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root_Result_Root {

    result_Total_PsmId_Counts_For_Single_ProjectSearchId_Or_SubSearchId_Map_Key_ProjectSearchId_Or_SubSearchId: ReadonlyMap<number, ModPage_Compute_Total_PsmId_Counts_Per_ProjectSearchId_Or_SubSearchId_From_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root_Result_Single_ProjectSearchId_Or_SubSearchId>
}

export class ModPage_Compute_Total_PsmId_Counts_Per_ProjectSearchId_Or_SubSearchId_From_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root_Result_Single_ProjectSearchId_Or_SubSearchId {

    readonly projectSearchId_Or_SubSearchId: number
    readonly psmIds_AcrossAllModMasses_Set: ReadonlySet<number>

    readonly uniquePsmIdCount_AcrossAllModMasses: number
}

/**
 *
 * @param computeData_For_ModMassViz_And_TopLevelTable_Result_Root
 */
export const modPage_Compute_Total_PsmId_Counts_Per_ProjectSearchId_Or_SubSearchId_From_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root = function (
    {
        computeData_For_ModMassViz_And_TopLevelTable_Result_Root
    } : {
        computeData_For_ModMassViz_And_TopLevelTable_Result_Root: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
    }
) : ModPage_Compute_Total_PsmId_Counts_Per_ProjectSearchId_Or_SubSearchId_From_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root_Result_Root {

    const psmId_Set_Map_Key_ProjectSearchId_Or_SubSearchId: Map<number, Set<number>> = new Map()

    for ( const dataFor_ModMass of computeData_For_ModMassViz_And_TopLevelTable_Result_Root.get_Data_AllValues() ) {

        for ( const dataFor_ProjectSearchId_Or_SubSearchId of dataFor_ModMass.get_Data_AllValues() ) {

            const projectSearchId_Or_SubSearchId = dataFor_ProjectSearchId_Or_SubSearchId.projectSearchId_Or_SubSearchId

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

    const result_Single_ProjectSearchId_Or_SubSearchId_Map_Key_ProjectSearchId_Or_SubSearchId: Map<number, ModPage_Compute_Total_PsmId_Counts_Per_ProjectSearchId_Or_SubSearchId_From_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root_Result_Single_ProjectSearchId_Or_SubSearchId> = new Map()

    for ( const psmId_Set_Map_Key_ProjectSearchId_Or_SubSearchId_MapEntry of psmId_Set_Map_Key_ProjectSearchId_Or_SubSearchId.entries() ) {

        const projectSearchId_Or_SubSearchId = psmId_Set_Map_Key_ProjectSearchId_Or_SubSearchId_MapEntry[ 0 ]
        const psmId_Set = psmId_Set_Map_Key_ProjectSearchId_Or_SubSearchId_MapEntry[ 1 ]

        const resultEntry : ModPage_Compute_Total_PsmId_Counts_Per_ProjectSearchId_Or_SubSearchId_From_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root_Result_Single_ProjectSearchId_Or_SubSearchId = {

            projectSearchId_Or_SubSearchId,
            psmIds_AcrossAllModMasses_Set: psmId_Set,
            uniquePsmIdCount_AcrossAllModMasses: psmId_Set.size
        }
        result_Single_ProjectSearchId_Or_SubSearchId_Map_Key_ProjectSearchId_Or_SubSearchId.set( projectSearchId_Or_SubSearchId, resultEntry )
    }

    return {
        result_Total_PsmId_Counts_For_Single_ProjectSearchId_Or_SubSearchId_Map_Key_ProjectSearchId_Or_SubSearchId: result_Single_ProjectSearchId_Or_SubSearchId_Map_Key_ProjectSearchId_Or_SubSearchId
    }
}
