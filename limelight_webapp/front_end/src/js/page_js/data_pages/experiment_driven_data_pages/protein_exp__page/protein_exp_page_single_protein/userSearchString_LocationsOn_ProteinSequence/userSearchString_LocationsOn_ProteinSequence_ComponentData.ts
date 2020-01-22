/**
 * userSearchString_LocationsOn_ProteinSequence_ComponentData.ts
 * 
 * Computed/created in userSearchString_LocationsOn_ProteinSequence_Compute.ts
 * 
 * Lists positions in Protein Sequence for User entered string
 * 
*/

/**
 * 
*/
export class UserSearchString_LocationsOn_ProteinSequence_Root {

    /**
     * No User Search String
    */
    noUserSearchString : boolean; 

    userSearchString_LocationsOn_ProteinSequence_Entries : Array<UserSearchString_LocationsOn_ProteinSequence_Entry>;
    proteinPositions_CoveredBy_SearchStrings : Array<boolean>
}

/**
 * 
*/
export class UserSearchString_LocationsOn_ProteinSequence_Entry {

    startPosition : number;
    endPosition : number
}

