/**
 * proteinSequenceWidgetDisplay_Component_Data__Build.ts
 * 
 * Protein Sequence Widget - Build Data for React Component
 * 
 *  !!!! React Version !!!!
 * 
 * Display Object used in: proteinSequenceWidgetDisplay_Component_React.tsx
 */

import { ProteinSequenceWidget_SinglePositionFlags } from './proteinSequenceWidget_SinglePositionFlags';
import { ProteinSequenceWidget_StateObject } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/protein_sequence_display_widget/js/proteinSequenceWidget_StateObject';
import { 
    ProteinSequenceWidgetDisplay_Component_Data, 
    ProteinSequenceWidgetDisplay_Component_DataPerSequencePositionEntry,
    ProteinSequenceWidgetDisplay_Component_DataPerSequencePosition_VariableModificationEntry,
    ProteinSequenceWidgetDisplay_Component_DataPerSequencePosition_StaticModificationEntry
} from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/protein_sequence_display_widget/js/proteinSequenceWidgetDisplay_Component_Data';

//  At bottom:  export { proteinSequenceWidgetDisplay_Component_Data__Build }

/**
 *
 */
export class ProteinSequenceWidgetDisplay_Component_Data__Build__staticModificationMassesForProteinPositions_PARAM_Entry {
    residue : string
    massesSet : Set<number>
    massesArray: Array<number>
}

/**
 *
 */
export type ProteinSequenceWidgetDisplay_Component_Data__Build__staticModificationMassesForProteinPositions_PARAM =
    Map<number,ProteinSequenceWidgetDisplay_Component_Data__Build__staticModificationMassesForProteinPositions_PARAM_Entry>


/**
 * 
 * @param variableModificationMassesForProteinPositions : Variable Modification masses per sequence position:  Map < {integer: position 1 based} : [ <mass> ] >.
 * 
 * @param staticModificationMassesForProteinPositions : Static Modification masses per sequence position:  
 * 	     Map <integer, Map<integer, Object> <proteinSequenceVersionId, Map < position 1 based (integer) : { Object: residue  (string), masses: [ mass (number) ] } >>
 * 
 * @param variableModificationSelectionUnmodifiedSelected : True if User has chosen 'unmodified' under Variable Modifications - Initial Value - Boolean
 * @param variableModificationMassesToFilterOn : Variable Modification masses that the user has selected to filter on - Initial value - Set
 * @param staticModificationMassesToFilterOn : Static Modification masses that the user has selected to filter on - Initial value - Set
 * 
 */
export const proteinSequenceWidgetDisplay_Component_Data__Build = function({
    
    proteinSequenceString, 
    
    proteinSequenceWidget_StateObject, //  class ProteinSequenceWidget_StateObject

    proteinCoverageArrayOfBoolean, //  All Peptides
    proteinCoverageArrayOfBoolean_UserSelectedPeptides,  // - null or undefined if not set - Only User Selected Peptides using any of the filters
    variableModificationSelectionUnmodifiedSelected,  //  boolean
    variableModificationMassesToFilterOn, //  Provided for Tooltip highlighting (bold) only
    staticModificationMassesToFilterOn,   //  Provided for Tooltip highlighting (bold) only
    variableModificationMassesForProteinPositions,  //  Provided for Tooltip display only
    staticModificationMassesForProteinPositions,    //  Provided for Tooltip display only
    proteinPositions_CoveredBy_PeptideSearchStrings  //  User entered a Peptide String and these Protein Positions are covered by matched peptides - Array of boolean
} : { 
    proteinSequenceString : string, 
    
    proteinSequenceWidget_StateObject : ProteinSequenceWidget_StateObject, //  class ProteinSequenceWidget_StateObject

    proteinCoverageArrayOfBoolean : Array<boolean>, //  All Peptides
    proteinCoverageArrayOfBoolean_UserSelectedPeptides : Array<boolean>,  // - null or undefined if not set - Only User Selected Peptides 
    variableModificationSelectionUnmodifiedSelected : boolean,  //  boolean
    variableModificationMassesToFilterOn : Set<number>, // Expected to be undefined or null if none selected
    staticModificationMassesToFilterOn : Map<string, Set<number>>,   // Expected to be undefined or null if none selected
    variableModificationMassesForProteinPositions : Map<number, Array<number>>, 
    staticModificationMassesForProteinPositions: ProteinSequenceWidgetDisplay_Component_Data__Build__staticModificationMassesForProteinPositions_PARAM
    proteinPositions_CoveredBy_PeptideSearchStrings : Array<boolean> //  User entered a Peptide String and these Protein Positions are covered by matched peptides - Array of boolean
}) 
: ProteinSequenceWidgetDisplay_Component_Data {

    // console.log("proteinSequenceWidgetDisplay_Component_Data__Build")

    if ( ! proteinSequenceString ) {
        const msg = "proteinSequenceWidgetDisplay_Component_Data__Build: No value for proteinSequenceString";
        console.warn( msg );
        throw Error( msg );
    }

    //  The rest of the code assumes that if these are empty that they are set to undefined

    if ( variableModificationMassesToFilterOn && variableModificationMassesToFilterOn.size === 0 ) {
        variableModificationMassesToFilterOn = undefined;
    }
    if ( staticModificationMassesToFilterOn && staticModificationMassesToFilterOn.size === 0 ) {
        staticModificationMassesToFilterOn = undefined;
    }

    const proteinSequence_AsArray = proteinSequenceString.split("");

    const dataPerSequencePosition : Array<ProteinSequenceWidgetDisplay_Component_DataPerSequencePositionEntry> = [];

    let proteinSequencePosition = 0;
    for ( const proteinSequence_Entry of proteinSequence_AsArray ) {

        proteinSequencePosition++;

        const sequencePosition_Flags = new ProteinSequenceWidget_SinglePositionFlags();

        _get_primary_flags_ForProteinSequencePosition({ 
            
            sequencePosition_Flags, // Updated

            proteinSequencePosition, 
            proteinCoverageArrayOfBoolean, //  All Peptides
            proteinCoverageArrayOfBoolean_UserSelectedPeptides,  // - null or undefined if not set - Only User Selected Peptides
            variableModificationSelectionUnmodifiedSelected,
            variableModificationMassesToFilterOn,
            staticModificationMassesToFilterOn,
            variableModificationMassesForProteinPositions,
            staticModificationMassesForProteinPositions
        });

        //  Secondary highlighting of user enters peptide search string
        if ( proteinPositions_CoveredBy_PeptideSearchStrings && 
            proteinPositions_CoveredBy_PeptideSearchStrings[ proteinSequencePosition ] &&

            //  Not any of these primary flags:
            ( ! sequencePosition_Flags.get_Sequence_Position_Covered_Outside_Filter_Mod()  ) && 
            ( ! sequencePosition_Flags.get_Sequence_Position_Covered_Within_Filter_Mod_No_Filter()  ) && 
            ( ! sequencePosition_Flags.get_Sequence_Position_Covered_Within_Filter_Mod_Within_Filter()  ) && 
            ( ! sequencePosition_Flags.get_Sequence_Position_Covered_Within_Filter_Mod_Outside_Filter()  ) && 
            ( ! sequencePosition_Flags.get_Sequence_Position_No_Filters_Mod() ) ) {

            sequencePosition_Flags.set_Sequence_Position_Match_User_Peptide_Filter_Search_String()
        }

        //  User Selected Protein Sequence Positions

         // Not currently Read

        if ( proteinSequenceWidget_StateObject.has_selectedProteinSequencePosition({ position : proteinSequencePosition }) ) {

            sequencePosition_Flags.set_UserSelected_ProteinSequencePosition();
        }


        const variableModifications : Array<ProteinSequenceWidgetDisplay_Component_DataPerSequencePosition_VariableModificationEntry> = [];
        const staticModifications : Array<ProteinSequenceWidgetDisplay_Component_DataPerSequencePosition_StaticModificationEntry> = [];

        const variableModificationMassesForCurrentProteinPosition = variableModificationMassesForProteinPositions.get( proteinSequencePosition );

        if ( variableModificationMassesForCurrentProteinPosition && variableModificationMassesForCurrentProteinPosition.length !== 0 ) {

            for ( const variableModificationMassForCurrentProteinPosition of variableModificationMassesForCurrentProteinPosition ) {
                let isSelected = false;
                if ( variableModificationMassesToFilterOn && variableModificationMassesToFilterOn.has( variableModificationMassForCurrentProteinPosition ) ) { //  Provided for Tooltip highlighting (bold) only
                    isSelected = true;
                }
                const variableModificationEntry = new ProteinSequenceWidgetDisplay_Component_DataPerSequencePosition_VariableModificationEntry({ 
                    variableModificationMass: variableModificationMassForCurrentProteinPosition, isSelected 
                });
                variableModifications.push( variableModificationEntry );
            }
        }

        if ( staticModificationMassesForProteinPositions && staticModificationMassesForProteinPositions.size > 0 ) {  //  Static Modification Masses for display.  Only Add Static Mods that User has Selected
            const staticModificationMassesDataObject = staticModificationMassesForProteinPositions.get( proteinSequencePosition );

            if ( staticModificationMassesDataObject ) {
                const staticModificationResidue = staticModificationMassesDataObject.residue;
                const staticModificationMasses = staticModificationMassesDataObject.massesArray;
                if ( staticModificationMasses && staticModificationMasses.length !== 0 ) {

                    for ( const staticModificationMass of staticModificationMasses ) {

                        if ( staticModificationMassesToFilterOn ) {
                            const staticModificationMassesToFilterOn_Set_ForResidue = staticModificationMassesToFilterOn.get( staticModificationResidue );
                            if ( staticModificationMassesToFilterOn_Set_ForResidue ) {
                                if ( staticModificationMassesToFilterOn_Set_ForResidue.has( staticModificationMass ) ) {

                                    const staticModificationEntry = new ProteinSequenceWidgetDisplay_Component_DataPerSequencePosition_StaticModificationEntry({ 
                                        staticModificationMass: staticModificationMass, isSelected : true //  Always isSelected : true
                                    });
                                    staticModifications.push( staticModificationEntry );
                                }
                            }
                        }

                    }
                }
            }
        }

        const resultEntry = new ProteinSequenceWidgetDisplay_Component_DataPerSequencePositionEntry({
            residue : proteinSequence_Entry,
            sequencePosition_Flags, // class ProteinSequenceWidget_SinglePositionFlags
            variableModifications,
            staticModifications
        });
        dataPerSequencePosition.push( resultEntry );
    }

    const proteinSequenceWidgetDisplay_Component_Data = new ProteinSequenceWidgetDisplay_Component_Data();

    proteinSequenceWidgetDisplay_Component_Data.dataPerSequencePosition = dataPerSequencePosition;
    proteinSequenceWidgetDisplay_Component_Data.selectedProteinSequencePositions = proteinSequenceWidget_StateObject.get_selectedProteinSequencePositions();
    
    return proteinSequenceWidgetDisplay_Component_Data;
}


/**
 * Get the Flags for this Protein Sequence Position
 */
const _get_primary_flags_ForProteinSequencePosition = function({ 

    sequencePosition_Flags, // Updated

    proteinSequencePosition, 
    proteinCoverageArrayOfBoolean, //  All Peptides
    proteinCoverageArrayOfBoolean_UserSelectedPeptides,  // - null or undefined if not set - Only User Selected Peptides
    variableModificationSelectionUnmodifiedSelected,
    variableModificationMassesToFilterOn,
    staticModificationMassesToFilterOn,
    variableModificationMassesForProteinPositions,
    staticModificationMassesForProteinPositions
}: {

    sequencePosition_Flags: ProteinSequenceWidget_SinglePositionFlags, // Updated

    proteinSequencePosition: number,
    proteinCoverageArrayOfBoolean: Array<boolean>, //  All Peptides
    proteinCoverageArrayOfBoolean_UserSelectedPeptides : Array<boolean>,  // - null or undefined if not set - Only User Selected Peptides
    variableModificationSelectionUnmodifiedSelected : boolean,
    variableModificationMassesToFilterOn : Set<number>,
    staticModificationMassesToFilterOn : Map<string, Set<number>>,
    variableModificationMassesForProteinPositions : Map<number, Array<number>>,
    staticModificationMassesForProteinPositions: ProteinSequenceWidgetDisplay_Component_Data__Build__staticModificationMassesForProteinPositions_PARAM
}) {

if ( ! proteinCoverageArrayOfBoolean[ proteinSequencePosition ] ) {

        //  position has no sequence coverage, by default, then has no mods

        sequencePosition_Flags.set_Sequence_Position_Uncovered();

        return; // EARLY RETURN   // uncovered residue:
    }

    if ( ! proteinCoverageArrayOfBoolean_UserSelectedPeptides ) {

        //  no user selection

        if ( _proteinSequencePosition_ContainsAnyVariableModificationMassesOrSelectedStaticModificationMasses({ 
            proteinSequencePosition,
            variableModificationMassesForProteinPositions,
            staticModificationMassesForProteinPositions,
            staticModificationMassesToFilterOn
        }) ) {

            sequencePosition_Flags.set_Sequence_Position_No_Filters_Mod();

            return; // EARLY RETURN // modded residue, no filters (mod or position)
        }

        sequencePosition_Flags.set_Sequence_Position_No_Filters_No_Mod();

        return; // EARLY RETURN  // not modded residue, no filters (mod or position)
    }

    //  Have User Selection

    if ( proteinCoverageArrayOfBoolean_UserSelectedPeptides[ proteinSequencePosition ] ) {

        //  Position is inside selected peptides coverage

        if ( _proteinSequencePosition_ContainsAnyVariableModificationMassesOrSelectedStaticModificationMasses_No_Selected_ModificationMasses({ 
            proteinSequencePosition,
            variableModificationSelectionUnmodifiedSelected,
            variableModificationMassesToFilterOn,
            variableModificationMassesForProteinPositions,
            staticModificationMassesForProteinPositions,
            staticModificationMassesToFilterOn
        }) ) {

            sequencePosition_Flags.set_Sequence_Position_Covered_Within_Filter_Mod_No_Filter();

            return; // EARLY RETURN // covered residue,  covered by filtered peptide list, mod, no mod filter
        }

        if ( _proteinSequencePosition_Contains_Selected_ModificationMasses({ 
            proteinSequencePosition,
            variableModificationMassesToFilterOn,
            staticModificationMassesToFilterOn,
            variableModificationMassesForProteinPositions,
            staticModificationMassesForProteinPositions
        }) ) {

            sequencePosition_Flags.set_Sequence_Position_Covered_Within_Filter_Mod_Within_Filter();

            return; // EARLY RETURN   // modded residue in filtered peptide list, has a mod == a mod filter
        }

        if ( _proteinSequencePosition_ContainsAnyVariableModificationMassesOrSelectedStaticModificationMasses({ 
            proteinSequencePosition,
            variableModificationMassesForProteinPositions,
            staticModificationMassesForProteinPositions,
            staticModificationMassesToFilterOn
        }) ) {

            sequencePosition_Flags.set_Sequence_Position_Covered_Within_Filter_Mod_Outside_Filter();

            return; // EARLY RETURN  // modded residue in filtered peptide list, does not have a mod in mod filter 
        }

        sequencePosition_Flags.set_Sequence_Position_Covered_Within_Filter_No_Mod();

        return; // EARLY RETURN    // modded residue in filtered peptide list
    }

    //  Position is outside selected peptides coverage

    if ( _proteinSequencePosition_ContainsAnyVariableModificationMassesOrSelectedStaticModificationMasses({ 
        proteinSequencePosition,
        variableModificationMassesForProteinPositions,
        staticModificationMassesForProteinPositions,
        staticModificationMassesToFilterOn
    }) ) {

        sequencePosition_Flags.set_Sequence_Position_Covered_Outside_Filter_Mod();

        return; // EARLY RETURN   // covered residue. not in filtered peptide list or no filters selected
    }

    sequencePosition_Flags.set_Sequence_Position_Covered_Outside_Filter_No_Mod();

    return;  // covered residue, covered by filtered peptide list
}

////////////////////

/**
 * Does this Protein Sequence Position contain any Variable modification masses AND there are NO SELECTED modification masses
 */
const _proteinSequencePosition_ContainsAnyVariableModificationMassesOrSelectedStaticModificationMasses_No_Selected_ModificationMasses = function({ 
    proteinSequencePosition,
    variableModificationSelectionUnmodifiedSelected,
    variableModificationMassesToFilterOn,
    variableModificationMassesForProteinPositions,
    staticModificationMassesForProteinPositions,
    staticModificationMassesToFilterOn
}: {
    proteinSequencePosition: number,
    variableModificationSelectionUnmodifiedSelected : boolean,
    variableModificationMassesToFilterOn : Set<number>,
    staticModificationMassesToFilterOn : Map<string, Set<number>>,
    variableModificationMassesForProteinPositions : Map<number, Array<number>>,
    staticModificationMassesForProteinPositions: ProteinSequenceWidgetDisplay_Component_Data__Build__staticModificationMassesForProteinPositions_PARAM
}) {

    if ( variableModificationSelectionUnmodifiedSelected || variableModificationMassesToFilterOn || staticModificationMassesToFilterOn ) {
        //  YES selections
        return false;  // EARLY RETURN
    }

    return _proteinSequencePosition_ContainsAnyVariableModificationMassesOrSelectedStaticModificationMasses({ 
        proteinSequencePosition,
        variableModificationMassesForProteinPositions,
        staticModificationMassesForProteinPositions,
        staticModificationMassesToFilterOn
    });
}

/**
 * Does this Protein Sequence Position contain any SELECTED Variable or Static Modification masses
 */
const _proteinSequencePosition_Contains_Selected_ModificationMasses = function({ 
    proteinSequencePosition,
    variableModificationMassesToFilterOn,
    staticModificationMassesToFilterOn,
    variableModificationMassesForProteinPositions,
    staticModificationMassesForProteinPositions
}: {
    proteinSequencePosition: number,
    variableModificationMassesToFilterOn : Set<number>,
    staticModificationMassesToFilterOn : Map<string, Set<number>>,
    variableModificationMassesForProteinPositions : Map<number, Array<number>>,
    staticModificationMassesForProteinPositions: ProteinSequenceWidgetDisplay_Component_Data__Build__staticModificationMassesForProteinPositions_PARAM
}) {

    if ( ( ! variableModificationMassesToFilterOn ) && ( ! staticModificationMassesToFilterOn ) ) {
        //  No SELECTED Variable or Static Modification masses
        return false;  // EARLY RETURN
    }

    if ( variableModificationMassesForProteinPositions ) {
        const variableModificationMassesAtPosition = variableModificationMassesForProteinPositions.get( proteinSequencePosition ); // modification masses per sequence position:  Map < {integer: position 1 based} : [ <mass> ] >. )

        if ( variableModificationMassesAtPosition && variableModificationMassesAtPosition.length !== 0 &&
            variableModificationMassesToFilterOn ) { 
            //  Variable Modification Masses found at position

            for ( const variableModificationMassAtPosition of variableModificationMassesAtPosition ) {
                for ( const variableModificationMassToFilterOn of variableModificationMassesToFilterOn ) {

                    if ( variableModificationMassAtPosition === variableModificationMassToFilterOn ) {
                        //  Found Variable Modification mass at position that are filtering on
                        return true; // EARLY RETURN
                    }
                }
            }
        }
    }

    //     _staticModificationMassesForProteinPositions :
    //  Map<integer, Object> < position 1 based (integer) : { Object: residue  (string), masses: [ mass (number) ] } >>
    if ( staticModificationMassesForProteinPositions ) {
        const staticModificationDataAtPosition = staticModificationMassesForProteinPositions.get( proteinSequencePosition ); // modification masses per sequence position:  Map < {integer: position 1 based} : [ <mass> ] >. )

        if ( staticModificationDataAtPosition && staticModificationMassesToFilterOn ) { 

            //  Static Modification Masses found at position AND _staticModificationMassesToFilterOn is populated

            const staticModificationAtPosition_Residue = staticModificationDataAtPosition.residue;
            const staticModificationAtPosition_Masses = staticModificationDataAtPosition.massesArray;

            for ( const staticModificationAtPosition_Mass of staticModificationAtPosition_Masses ) {

                const staticModificationMassesToFilterOn_Masses_ForResidue = staticModificationMassesToFilterOn.get( staticModificationAtPosition_Residue );
                if ( staticModificationMassesToFilterOn_Masses_ForResidue ) {
                    for ( const staticModificationToFilterOn_Mass of staticModificationMassesToFilterOn_Masses_ForResidue ) {

                        if ( staticModificationAtPosition_Mass === staticModificationToFilterOn_Mass ) {
                            //  Found Static Modification mass at position that are filtering on
                            return true; // EARLY RETURN
                        }
                    }
                }
            }
        }
    }

    return false;
}

/**
 * Does this Protein Sequence Position contain any Variable Modification masses
 */
const _proteinSequencePosition_ContainsAnyVariableModificationMassesOrSelectedStaticModificationMasses = function({ 
    proteinSequencePosition, 
    variableModificationMassesForProteinPositions,
    staticModificationMassesForProteinPositions,
    staticModificationMassesToFilterOn
}: {
    proteinSequencePosition: number,
    staticModificationMassesToFilterOn : Map<string, Set<number>>,
    variableModificationMassesForProteinPositions : Map<number, Array<number>>,
    staticModificationMassesForProteinPositions: ProteinSequenceWidgetDisplay_Component_Data__Build__staticModificationMassesForProteinPositions_PARAM
}) {

    if ( variableModificationMassesForProteinPositions ) {
        const variableModificationMassesAtPosition = variableModificationMassesForProteinPositions.get( proteinSequencePosition ); // modification masses per sequence position:  Map < {integer: position 1 based} : [ <mass> ] >. )

        if ( variableModificationMassesAtPosition && variableModificationMassesAtPosition.length !== 0 ) { 
            //  Variable Modification Masses found at position
            return true; // EARLY RETURN
        }
    }

    //     _staticModificationMassesForProteinPositions :
    //  Map<integer, Object> < position 1 based (integer) : { Object: residue  (string), masses: [ mass (number) ] } >>
    if ( staticModificationMassesForProteinPositions ) {
        const staticModificationDataAtPosition = staticModificationMassesForProteinPositions.get( proteinSequencePosition ); // modification masses per sequence position:  Map < {integer: position 1 based} : [ <mass> ] >. )

        if ( staticModificationDataAtPosition && staticModificationMassesToFilterOn ) { 

            //  Static Modification Masses found at position AND _staticModificationMassesToFilterOn is populated

            const staticModificationAtPosition_Residue = staticModificationDataAtPosition.residue;
            const staticModificationAtPosition_Masses = staticModificationDataAtPosition.massesArray;

            for ( const staticModificationAtPosition_Mass of staticModificationAtPosition_Masses ) {

                const staticModificationMassesToFilterOn_Masses_ForResidue = staticModificationMassesToFilterOn.get( staticModificationAtPosition_Residue );
                if ( staticModificationMassesToFilterOn_Masses_ForResidue ) {
                    for ( const staticModificationToFilterOn_Mass of staticModificationMassesToFilterOn_Masses_ForResidue ) {

                        if ( staticModificationAtPosition_Mass === staticModificationToFilterOn_Mass ) {
                            //  Found Static Modification mass at position that are filtering on
                            return true; // EARLY RETURN
                        }
                    }
                }
            }
        }
    }

    return false;
}

