/**
 * proteinPositionFilter_UserSelections_ComponentData.ts
 *
 * For Display of User Selections
 * 
 * Component Data for:  proteinPositionFilter_UserSelections_....tsx
 */

/**
 *
 */
export class ProteinPositionFilter_UserSelections_ComponentData_SelectionDisplay_Entry {

    proteinSequenceVersionId : number
    proteinName : string
    proteinName_Truncated : string
    proteinDescription : string
    proteinPosition_Start : number
    proteinPosition_End : number
    proteinFullLengthSelected : boolean
}

/**
 *
 */
export class ProteinPositionFilter_UserSelections_ComponentData {

    proteinPosition_SelectionDisplay_Entries : Array<ProteinPositionFilter_UserSelections_ComponentData_SelectionDisplay_Entry>

}
