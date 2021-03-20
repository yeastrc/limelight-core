/**
 * proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data.ts
 *
 * For User Input
 * 
 * Protein Names and Lengths Data for:  proteinPositionFilter_UserSelections_....tsx
 */

export class ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data_Entry {

    proteinSequenceVersionId : number
    proteinName : string
    proteinName_Truncated : string
    proteinDescription : string
    proteinLength : number
}

export class ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data {

    proteins_Names_Lengths_Array : Array<ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data_Entry>
    proteins_Names_Lengths_Map_Key_proteinSequenceVersionId : Map<number, ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data_Entry>
}
