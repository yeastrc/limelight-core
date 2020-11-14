/**
 * peptideSequence_UserSelection_BuildData_ForReactComponent.ts
 * 
 * Peptide Sequence Selection - Build Data for React Component
 * 
 *  !!!! React Version !!!!
 * 
 * Display Data used in: peptideSequence_UserSelections_Root.tsx
 */

//  At bottom:  export { peptideSequence_UserSelections_BuildData_ForReactComponent }


import { PeptideSequence_UserSelections_StateObject } from './peptideSequence_UserSelections_StateObject';

import { PeptideSequence_UserSelections_ComponentData } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_sequence_selected/js/peptideSequence_UserSelections_ComponentData';

/**
 * 
 * 
 */
const peptideSequence_UserSelections_BuildData_ForReactComponent = function({ 
    
    peptideSequence_UserSelections_StateObject
} : { 
    
    peptideSequence_UserSelections_StateObject : PeptideSequence_UserSelections_StateObject
}) : PeptideSequence_UserSelections_ComponentData {

    let peptideSearchString = peptideSequence_UserSelections_StateObject.getPeptideSearchString();

    if ( ! peptideSearchString ) {
        peptideSearchString = "";
    }

    return { 
        peptideSequence_UserSelection : peptideSearchString
    };
}

export { peptideSequence_UserSelections_BuildData_ForReactComponent }
