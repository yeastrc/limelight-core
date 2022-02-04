/**
 * userSearchString_LocationsOn_ProteinSequence_Compute.ts
 * 
 * Search Protein Sequence for User entered string
 * 
*/

import { UserSearchString_LocationsOn_ProteinSequence_Root, UserSearchString_LocationsOn_ProteinSequence_Entry } from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/userSearchString_LocationsOn_ProteinSequence/userSearchString_LocationsOn_ProteinSequence_ComponentData';

/**
 * 
 * 
 * Get Protein Sequence Locations for User entered string
 * 
 * Convert L to I before comparisons
 * 
*/
export const userSearchString_LocationsOn_ProteinSequence_Compute = function({ 
	
	proteinSequenceString,
	searchStrings,
} : {
	proteinSequenceString : string,
	searchStrings : Array<string>
}) : UserSearchString_LocationsOn_ProteinSequence_Root {

	if ( proteinSequenceString === undefined ) {
		throw Error("proteinExp_Search_ProteinSequence_For_UserEnteredString proteinSequenceString === undefined");
	}
	if ( searchStrings === undefined ) {
		
		//  NO Search Strings

		const result = new UserSearchString_LocationsOn_ProteinSequence_Root();

		result.noUserSearchString = true;
		result.userSearchString_LocationsOn_ProteinSequence_Entries = [];
		result.proteinPositions_CoveredBy_SearchStrings = [];
	
		return result;  //  EARLY RETURN
	}
	if ( searchStrings.length === 0 ) {
		
		//  NO Search Strings

		const result = new UserSearchString_LocationsOn_ProteinSequence_Root();

		result.noUserSearchString = true;
		result.userSearchString_LocationsOn_ProteinSequence_Entries = [];
		result.proteinPositions_CoveredBy_SearchStrings = [];
	
		return result;  //  EARLY RETURN
	}

	const findAll_L_Regex = /L/g; //  Regex with trailing 'g' is the only way to do replace all
	
	//  The Peptide Search Strings will be used to search the protein sequence.
	//  Reported Peptides will be selected where their Protein Coverage records fully contain 
	//     the locations of the search strings on the protein sequence.

	//  The amino acid letters I and L will be equivalent.

	const searchStrings_UpperCase_L_to_I = []
	for ( const searchString of searchStrings ) {

		if ( searchString && ( searchString !== "" ) ) {  //  Skip searchString === ""

			const searchStringUpperCase = searchString.toLocaleUpperCase();
			const searchString_UpperCase_L_to_I = searchStringUpperCase.replace( findAll_L_Regex, "I" );
			searchStrings_UpperCase_L_to_I.push( searchString_UpperCase_L_to_I );
		}
	}

	//  Results:
	const searchStringProteinPositions : Array<UserSearchString_LocationsOn_ProteinSequence_Entry> = []; // array of objects of { startPosition: , endPosition: }
	const proteinPositions_CoveredBy_SearchStrings : Array<boolean> = [];
	let noUserSearchString = false;

	if ( searchStrings_UpperCase_L_to_I.length < 1 ) {

		//  NO Search Strings that are not empty

		noUserSearchString = true;

	} else {
	
		//  Have at least one Search String that exists and is not empty

		const proteinSequenceString_L_to_I = proteinSequenceString.replace( findAll_L_Regex, "I" );

		//  Find Search Strings in the Protein Sequence

		for ( const searchString of searchStrings_UpperCase_L_to_I ) {

			const searchStringLength = searchString.length;

			let searchStartIndex = 0;
			let searchStringFoundIndex = -1;
			while ( ( searchStringFoundIndex = proteinSequenceString_L_to_I.indexOf( searchString, searchStartIndex ) ) != -1 ) {
				
				const searchStringFound_StartPosition = searchStringFoundIndex + 1;  //  Position is 1 based
				const searchStringFound_EndPosition = searchStringFoundIndex + searchStringLength;

				const foundEntry = new UserSearchString_LocationsOn_ProteinSequence_Entry();
				foundEntry.startPosition = searchStringFound_StartPosition; // Start + 1 since Protein Coverage Positions are 1 based
				foundEntry.endPosition = searchStringFound_EndPosition;
				searchStringProteinPositions.push( foundEntry );
				
				for ( let position = searchStringFound_StartPosition; position <= searchStringFound_EndPosition ; position++ ) {
						proteinPositions_CoveredBy_SearchStrings[ position ] = true;
				}

				searchStartIndex = searchStringFoundIndex + 1;
			}
		}
	}

	const result = new UserSearchString_LocationsOn_ProteinSequence_Root();

	result.noUserSearchString = noUserSearchString;
	result.userSearchString_LocationsOn_ProteinSequence_Entries = searchStringProteinPositions;
	result.proteinPositions_CoveredBy_SearchStrings = proteinPositions_CoveredBy_SearchStrings;

	return result;
}
