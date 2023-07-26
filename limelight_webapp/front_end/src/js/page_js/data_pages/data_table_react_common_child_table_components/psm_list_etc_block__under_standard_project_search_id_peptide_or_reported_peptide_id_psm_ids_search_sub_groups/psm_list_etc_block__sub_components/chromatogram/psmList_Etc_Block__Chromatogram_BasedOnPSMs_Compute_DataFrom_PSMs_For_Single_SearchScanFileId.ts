/**
 * psmList_Etc_Block__Chromatogram_BasedOnPSMs_Compute_DataFrom_PSMs_For_Single_SearchScanFileId.ts
 *
 * Compute Data based on PSMs for a Single searchScanFileId
 *
 */

import { PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_getPSMDataFromServer_Result_PSM_Item } from "page_js/data_pages/data_table_react_common_child_table_components/psm_list_etc_block__under_standard_project_search_id_peptide_or_reported_peptide_id_psm_ids_search_sub_groups/psm_list_etc_block__sub_components/psm_list/js/psmList_ForProjectSearchIdReportedPeptideId_GetDataFromServer";

export class PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Compute_DataFrom_PSMs_For_Single_SearchScanFileId__Result_Root {

    psm_RetentionTime_Seconds__With_ExtendRange_AddSubtract_Applied_Min: number
    psm_RetentionTime_Seconds__With_ExtendRange_AddSubtract_Applied_Max: number

    openModMass_MinMax__Map__Value_MinMax_Key_Charge: Map<number, PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Compute_DataFrom_PSMs_For_Single_SearchScanFileId_Single_OpenModMass_MinMax_SingleEntry>
    found_AtLeastOne_PSM_With_NO_OpenModMasses_For_Charge_Set: Set<number>
}

/**
 *
 */
export class PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Compute_DataFrom_PSMs_For_Single_SearchScanFileId_Single_OpenModMass_MinMax_SingleEntry {

    for_Charge: number
    min_OpenModMass: number
    max_OpenModMass: number
}

/**
 *
 * @param ppm_ExtendRange_AddSubtract_ToMinMaxValues
 * @param m_Over_Z_Mass
 */
export const psmList_Etc_Block__Chromatogram_BasedOnPSMs_Compute_DataFrom_PSMs_For_Single_SearchScanFileId = function (
    {
        psmList,
        searchScanFileId,
        retentionTime_Seconds_ExtendRange_AddSubtract_ToMinMaxValues
    } : {
        psmList: Array<PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_getPSMDataFromServer_Result_PSM_Item>
        searchScanFileId: number
        retentionTime_Seconds_ExtendRange_AddSubtract_ToMinMaxValues: number
    }
) : PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Compute_DataFrom_PSMs_For_Single_SearchScanFileId__Result_Root {

    const psm_ChargeValues: Set<number> = new Set()

    let psm_RetentionTime_Seconds_Min: number = undefined
    let psm_RetentionTime_Seconds_Max: number = undefined

    const openModMass_MinMax__Map__Value_MinMax_Key_Charge = new Map<number, PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Compute_DataFrom_PSMs_For_Single_SearchScanFileId_Single_OpenModMass_MinMax_SingleEntry>()

    const found_AtLeastOne_PSM_With_NO_OpenModMasses_For_Charge_Set: Set<number> = new Set()

    for ( const psmEntry of psmList ) {

        if ( psmEntry.searchScanFileId !== searchScanFileId ) {
            //  PSM NOT for selected searchScanFileId so SKIP
            continue;  // EARLY CONTINUE
        }

        // psmEntry.precursor_M_Over_Z  --  From Scan if not populated on PSM
        // psmEntry.retentionTimeSeconds  --  From Scan if not populated on PSM

        psm_ChargeValues.add( psmEntry.charge )

        if ( psm_RetentionTime_Seconds_Min === undefined ) {
            psm_RetentionTime_Seconds_Min = psmEntry.retentionTimeSeconds
            psm_RetentionTime_Seconds_Max = psmEntry.retentionTimeSeconds
        } else {
            if ( psm_RetentionTime_Seconds_Min > psmEntry.retentionTimeSeconds ) {
                psm_RetentionTime_Seconds_Min = psmEntry.retentionTimeSeconds
            }
            if ( psm_RetentionTime_Seconds_Max < psmEntry.retentionTimeSeconds ) {
                psm_RetentionTime_Seconds_Max = psmEntry.retentionTimeSeconds
            }
        }

        if ( psmEntry.openModificationMassAndPositionsList && psmEntry.openModificationMassAndPositionsList.length > 0 ) {

            let openModMasses_Summed = 0;

            for ( const openModificationMassAndPositions_Item of psmEntry.openModificationMassAndPositionsList ) {
                openModMasses_Summed += openModificationMassAndPositions_Item.openModMass;
            }

            const openModMass_MinMax__Map__Value_MinMax = openModMass_MinMax__Map__Value_MinMax_Key_Charge.get( psmEntry.charge )
            if ( openModMass_MinMax__Map__Value_MinMax ) {
                if ( openModMass_MinMax__Map__Value_MinMax.min_OpenModMass > openModMasses_Summed ) {
                    openModMass_MinMax__Map__Value_MinMax.min_OpenModMass = openModMasses_Summed
                }
                if ( openModMass_MinMax__Map__Value_MinMax.max_OpenModMass < openModMasses_Summed ) {
                    openModMass_MinMax__Map__Value_MinMax.max_OpenModMass = openModMasses_Summed
                }
            } else {
                openModMass_MinMax__Map__Value_MinMax_Key_Charge.set( psmEntry.charge, { for_Charge: psmEntry.charge, min_OpenModMass: openModMasses_Summed, max_OpenModMass: openModMasses_Summed } )
            }

        } else {
            found_AtLeastOne_PSM_With_NO_OpenModMasses_For_Charge_Set.add( psmEntry.charge );
        }
    }

    let psm_RetentionTime_Seconds__With_ExtendRange_AddSubtract_Applied_Min: number = psm_RetentionTime_Seconds_Min - retentionTime_Seconds_ExtendRange_AddSubtract_ToMinMaxValues
    let psm_RetentionTime_Seconds__With_ExtendRange_AddSubtract_Applied_Max: number = psm_RetentionTime_Seconds_Max + retentionTime_Seconds_ExtendRange_AddSubtract_ToMinMaxValues

    const resultRoot: PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Compute_DataFrom_PSMs_For_Single_SearchScanFileId__Result_Root = {
        psm_RetentionTime_Seconds__With_ExtendRange_AddSubtract_Applied_Min,
        psm_RetentionTime_Seconds__With_ExtendRange_AddSubtract_Applied_Max,
        openModMass_MinMax__Map__Value_MinMax_Key_Charge,
        found_AtLeastOne_PSM_With_NO_OpenModMasses_For_Charge_Set
    }

    return resultRoot
}

