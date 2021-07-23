/**
 * proteinPositionFilter_UserInput__Component__ProteinData.ts
 *
 *  Protein Position Filter:  Overlay for user to add/change filters
 *
 *  Protein Data:  List of Proteins and their data for the user to choose from
 *
 *
 */


export class ProteinPositionFilter_UserInput__Component__ProteinData_Root {

    proteins: Array<ProteinPositionFilter_UserInput__Component__ProteinData_SingleProtein>

}

export class ProteinPositionFilter_UserInput__Component__ProteinData_SingleProtein {

    proteinSequenceVersionId: number
    proteinName: string
    proteinDescription: string
    proteinLength: number

    proteinNameDescriptionForTooltip_Entries: Array<ProteinPositionFilter_UserInput__Component__ProteinData_SingleProtein__SingleProteinNameDescription>
}


/**
 *
 */
export class ProteinPositionFilter_UserInput__Component__ProteinData_SingleProtein__SingleProteinNameDescription {
    name : string
    description: string
}
