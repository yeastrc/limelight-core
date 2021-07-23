/**
 * proteinSelection_Generic__ProteinData.ts
 *
 *  Protein Selection:  Overlay for user to select proteins
 *
 *  Protein Data:  List of Proteins and their data for the user to choose from
 *
 *
 */


export class ProteinSelection_Generic__ProteinData_Root {

    proteins: Array<ProteinSelection_Generic__ProteinData_SingleProtein>
}

export class ProteinSelection_Generic__ProteinData_SingleProtein {

    proteinSequenceVersionId: number
    proteinName: string
    proteinDescription: string
}