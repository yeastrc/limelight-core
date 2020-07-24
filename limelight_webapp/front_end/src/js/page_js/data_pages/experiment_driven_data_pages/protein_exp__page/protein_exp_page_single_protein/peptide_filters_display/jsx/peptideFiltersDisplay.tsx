/**
 * peptideFiltersDisplay.tsx
 * 
 * Display currently applied Peptide Filters.  Shown above the Peptide List.
 * 
 * Includes the "clear all" link to clear all filters
 * 
 * For use in proteinExperimentPage_SingleProtein_Root_Component.tsx
 * 
 */

import React from 'react'

import { ProteinSequenceWidget_StateObject } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/protein_sequence_display_widget/js/proteinSequenceWidget_StateObject';
import { PeptideSequence_UserSelections_StateObject } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_sequence_selected/js/peptideSequence_UserSelections_StateObject';
import { ModificationMass_UserSelections_StateObject } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject';
import { ReporterIonMass_UserSelections_StateObject } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reporter_ions_user_selections/js/reporterIonMass_UserSelections_StateObject';

import { PeptideFiltersDisplay_ComponentData } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_filters_display/js/peptideFiltersDisplay_ComponentData'
import {SingleProtein_Filter_SelectionType} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinPage_SingleProtein_Filter_Enums";

/**
 * 
 */
export interface PeptideFiltersDisplay_clearAllFiltersClickHandler {
    () : void
}

/**
 * 
 */
export interface PeptideFiltersDisplay_Props {

    peptideFiltersDisplay_ComponentData : PeptideFiltersDisplay_ComponentData;
    clearAllFiltersClickHandler : PeptideFiltersDisplay_clearAllFiltersClickHandler;

}

/**
 * 
 */
interface PeptideFiltersDisplay_State {

    prev_peptideFiltersDisplay_ComponentData : PeptideFiltersDisplay_ComponentData;

}

/**
 * 
 */
export class PeptideFiltersDisplay extends React.Component< PeptideFiltersDisplay_Props, PeptideFiltersDisplay_State > {

    //  bind to 'this' for passing as parameters
    private _clearAllFiltersClickHandler_BindThis = this._clearAllFiltersClickHandler.bind(this);

    /**
     * 
     */    
    constructor(props : PeptideFiltersDisplay_Props) {
        super(props);

        this.state = { prev_peptideFiltersDisplay_ComponentData : props.peptideFiltersDisplay_ComponentData };
    }

    /**
     * 
     */   
    shouldComponentUpdate( nextProps: Readonly<PeptideFiltersDisplay_Props>, nextState: Readonly<PeptideFiltersDisplay_State>, nextContext: any) : boolean {

        if ( nextProps.peptideFiltersDisplay_ComponentData !== this.props.peptideFiltersDisplay_ComponentData ) {
            return true;
        }
        return false;
    }

    /**
     * 
     */    
    _clearAllFiltersClickHandler( event : React.MouseEvent<HTMLSpanElement, MouseEvent> ) : void {

        // event.preventDefault();
        // event.stopPropagation();

        if ( this.props.clearAllFiltersClickHandler ) {
            this.props.clearAllFiltersClickHandler();
        }
    }

    ////////////////////////////////////////

    /**
     * 
     */    
    render() {
        {
            // if nothing selected, return null
            const selectedProteinSequencePositionsSet = this.props.peptideFiltersDisplay_ComponentData.proteinSequenceWidget_StateObject.get_selectedProteinSequencePositions();

            const modificationMass_UserSelections_StateObject = this.props.peptideFiltersDisplay_ComponentData.modificationMass_UserSelections_StateObject;

            const is_Any_VariableModification_Selected = modificationMass_UserSelections_StateObject.get_VariableModificationSelections().is_Any_Modification_Selected();
            const is_Any_OpenModification_Selected = modificationMass_UserSelections_StateObject.get_OpenModificationSelections().is_Any_Modification_Selected();
            const is_Any_StaticModification_Selected = modificationMass_UserSelections_StateObject.is_Any_StaticModification_Selected();

            const reporterIonssSelectedsSet = this.props.peptideFiltersDisplay_ComponentData.reporterIonMass_UserSelections_StateObject.get_ReporterIonssSelected_MassesOnly_AsSet();

            const peptideSearchString = this.props.peptideFiltersDisplay_ComponentData.peptideSequence_UserSelections_StateObject.getPeptideSearchString();

            if ( ( ( ! selectedProteinSequencePositionsSet ) || ( selectedProteinSequencePositionsSet.size === 0 ) )
                && ( ! is_Any_VariableModification_Selected )
                && ( ! is_Any_OpenModification_Selected )
                && ( ! is_Any_StaticModification_Selected )
                && ( ( ! reporterIonssSelectedsSet ) || ( reporterIonssSelectedsSet.size === 0 ) )
                && ( ! peptideSearchString )
            ) {

                // Nothing to display

                return null;  //  EARLY RETURN
            }

        }

        let selectedProteinSequencePositions_DisplayString : string = undefined;

        {
            const selectedProteinSequencePositionsSet = this.props.peptideFiltersDisplay_ComponentData.proteinSequenceWidget_StateObject.get_selectedProteinSequencePositions();

            if ( selectedProteinSequencePositionsSet && ( selectedProteinSequencePositionsSet.size !== 0 ) ) {

                const selectedProteinSequencePositionsArray = Array.from( selectedProteinSequencePositionsSet );
                selectedProteinSequencePositionsArray.sort();

                selectedProteinSequencePositions_DisplayString = _userSelectionDisplay_CombineArrayIntoFormattedString({ array : selectedProteinSequencePositionsArray });
            }
        }

        const AND_SEPERATOR_STRING = "AND"
        const OR_SEPERATOR_STRING = "OR"

        let selection_AND_Group_Display_Entries : Array<JSX.Element> = new Array<JSX.Element>()  //  Will be set to undefined in next block if empty at end of block
        let selection_OR_Group_Display_Entries : Array<JSX.Element> = new Array<JSX.Element>()  //  Will be set to undefined in next block if empty at end of block
        {
            const modificationMass_UserSelections_StateObject = this.props.peptideFiltersDisplay_ComponentData.modificationMass_UserSelections_StateObject;
            const variable_ModificationSelections_StateObject = modificationMass_UserSelections_StateObject.get_VariableModificationSelections()
            const open_ModificationSelections_StateObject = modificationMass_UserSelections_StateObject.get_OpenModificationSelections()

            //  Variable Mods
            if ( variable_ModificationSelections_StateObject.is_Any_Modification_Selected() ) {

                const no_Modification_SelectionEntry = variable_ModificationSelections_StateObject.get_NO_Modification_AKA_Unmodified_Selected()
                if ( no_Modification_SelectionEntry ) {
                    const key = "Var_NoMod"
                    const display = <span key={ key } style={ { whiteSpace: "nowrap" } }>no variable modification mass(es)</span>
                    if ( no_Modification_SelectionEntry.selectionType === SingleProtein_Filter_SelectionType.ANY ) {
                        _add_separatorLabel_IfNeeded_To__selection_Group_Display_Entries_Local({ seperatorString : OR_SEPERATOR_STRING, selection_Group_Display_Entries_Local : selection_OR_Group_Display_Entries })
                        selection_OR_Group_Display_Entries.push( display )
                    } else if ( no_Modification_SelectionEntry.selectionType === SingleProtein_Filter_SelectionType.ALL ) {
                        _add_separatorLabel_IfNeeded_To__selection_Group_Display_Entries_Local({ seperatorString: AND_SEPERATOR_STRING, selection_Group_Display_Entries_Local : selection_AND_Group_Display_Entries })
                        selection_AND_Group_Display_Entries.push( display )
                    } else {
                        const msg = "variable_ModificationSelections_StateObject.get_NO_Modification_AKA_Unmodified_Selected() returned value but value.selectionType is not ANY or ALL"
                        console.warn( msg )
                        throw Error( msg )
                    }
                }
                {
                    const selectedModMasses = Array.from( variable_ModificationSelections_StateObject.get_ModificationsSelected__OnlyModMasses_Only__ANY_SelectionType_AsSet() )
                    selectedModMasses.sort(function( a, b ) {
                        //  Sort Ascending
                        if ( a < b ) {
                            return -1;
                        }
                        if ( a > b ) {
                            return 1;
                        }
                        return 0;
                    })
                    for ( const selectedModMass of selectedModMasses ) {
                        const key = "Var_Mod_" + selectedModMass
                        _add_separatorLabel_IfNeeded_To__selection_Group_Display_Entries_Local({ seperatorString : OR_SEPERATOR_STRING, selection_Group_Display_Entries_Local : selection_OR_Group_Display_Entries })
                        const display = <span key={ key } style={ { whiteSpace: "nowrap" } }><span >Variable mod: </span><span> </span><span>{ selectedModMass }</span></span>
                        selection_OR_Group_Display_Entries.push( display )
                    }
                }
                {
                    const selectedModMasses = Array.from(variable_ModificationSelections_StateObject.get_ModificationsSelected__OnlyModMasses_Only__ALL_SelectionType_AsSet())
                    selectedModMasses.sort(function (a, b) {
                        //  Sort Ascending
                        if (a < b) {
                            return -1;
                        }
                        if (a > b) {
                            return 1;
                        }
                        return 0;
                    })
                    for (const selectedModMass of selectedModMasses) {
                        const key = "Var_Mod_" + selectedModMass
                        _add_separatorLabel_IfNeeded_To__selection_Group_Display_Entries_Local({ seperatorString: AND_SEPERATOR_STRING, selection_Group_Display_Entries_Local: selection_AND_Group_Display_Entries})
                        const display = <span key={key} style={{whiteSpace: "nowrap"}}><span>Variable mod: </span><span> </span><span>{selectedModMass}</span></span>
                        selection_AND_Group_Display_Entries.push(display)
                    }
                }
            }

            //  Open Mods
            if ( open_ModificationSelections_StateObject.is_Any_Modification_Selected() ) {

                const no_Modification_SelectionEntry = open_ModificationSelections_StateObject.get_NO_Modification_AKA_Unmodified_Selected()
                if ( no_Modification_SelectionEntry ) {
                    const key = "Open_NoMod"
                    const display = <span key={ key } style={ { whiteSpace: "nowrap" } }>no open modification mass(es)</span>
                    if ( no_Modification_SelectionEntry.selectionType === SingleProtein_Filter_SelectionType.ANY ) {
                        _add_separatorLabel_IfNeeded_To__selection_Group_Display_Entries_Local({ seperatorString : OR_SEPERATOR_STRING, selection_Group_Display_Entries_Local : selection_OR_Group_Display_Entries })
                        selection_OR_Group_Display_Entries.push( display )
                    } else if ( no_Modification_SelectionEntry.selectionType === SingleProtein_Filter_SelectionType.ALL ) {
                        _add_separatorLabel_IfNeeded_To__selection_Group_Display_Entries_Local({ seperatorString: AND_SEPERATOR_STRING, selection_Group_Display_Entries_Local : selection_AND_Group_Display_Entries })
                        selection_AND_Group_Display_Entries.push( display )
                    } else {
                        const msg = "open_ModificationSelections_StateObject.get_NO_Modification_AKA_Unmodified_Selected() returned value but value.selectionType is not ANY or ALL"
                        console.warn( msg )
                        throw Error( msg )
                    }
                }
                {
                    const selectedModMasses = Array.from( open_ModificationSelections_StateObject.get_ModificationsSelected__OnlyModMasses_Only__ANY_SelectionType_AsSet() )
                    selectedModMasses.sort(function( a, b ) {
                        //  Sort Ascending
                        if ( a < b ) {
                            return -1;
                        }
                        if ( a > b ) {
                            return 1;
                        }
                        return 0;
                    })
                    for ( const selectedModMass of selectedModMasses ) {
                        const key = "Open_Mod_" + selectedModMass
                        _add_separatorLabel_IfNeeded_To__selection_Group_Display_Entries_Local({ seperatorString : OR_SEPERATOR_STRING, selection_Group_Display_Entries_Local : selection_OR_Group_Display_Entries })
                        const display = <span key={ key } style={ { whiteSpace: "nowrap" } }><span >Open mod: </span><span> </span><span>{ selectedModMass }</span></span>
                        selection_OR_Group_Display_Entries.push( display )
                    }
                }
                {
                    const selectedModMasses = Array.from( open_ModificationSelections_StateObject.get_ModificationsSelected__OnlyModMasses_Only__ALL_SelectionType_AsSet() )
                    selectedModMasses.sort(function( a, b ) {
                        //  Sort Ascending
                        if ( a < b ) {
                            return -1;
                        }
                        if ( a > b ) {
                            return 1;
                        }
                        return 0;
                    })
                    for (const selectedModMass of selectedModMasses) {
                        const key = "Open_Mod_" + selectedModMass
                        _add_separatorLabel_IfNeeded_To__selection_Group_Display_Entries_Local({ seperatorString : AND_SEPERATOR_STRING, selection_Group_Display_Entries_Local: selection_AND_Group_Display_Entries })
                        const display = <span key={ key } style={{whiteSpace: "nowrap"}}><span>Open mod: </span><span> </span><span>{selectedModMass}</span></span>
                        selection_AND_Group_Display_Entries.push(display)
                    }
                }
            }

            // Static Mods
            if ( modificationMass_UserSelections_StateObject.is_Any_StaticModification_Selected() ) {

                const selection_ANY = modificationMass_UserSelections_StateObject.get_StaticModifications_Selected_Residue_Mass_Map_Set__ONLY__ANY_SelectionType()
                const selection_ALL = modificationMass_UserSelections_StateObject.get_StaticModifications_Selected_Residue_Mass_Map_Set__ONLY__ALL_SelectionType()

                _userSelectionDisplay_Add_Static_ModificationsFormatted_For_ANY_or_ALL({
                    staticModificationMassesToFilterOn_ANY_or_ALL :  selection_ANY,
                    seperatorString : OR_SEPERATOR_STRING,
                    selection_Group_Display_Entries_Local : selection_OR_Group_Display_Entries
                })

                _userSelectionDisplay_Add_Static_ModificationsFormatted_For_ANY_or_ALL({
                    staticModificationMassesToFilterOn_ANY_or_ALL :  selection_ALL,
                    seperatorString : AND_SEPERATOR_STRING,
                    selection_Group_Display_Entries_Local : selection_AND_Group_Display_Entries
                })
            }

            const reporterIonMass_UserSelections_StateObject = this.props.peptideFiltersDisplay_ComponentData.reporterIonMass_UserSelections_StateObject;

            if ( reporterIonMass_UserSelections_StateObject.is_Any_ReporterIons_Selected() ) {
                {
                    const selectedReporterIonMasses = Array.from( reporterIonMass_UserSelections_StateObject.get_ReporterIonssSelected_MassesOnly__SelectionType__ANY__AsSet() )
                    selectedReporterIonMasses.sort(function( a, b ) {
                        //  Sort Ascending
                        if ( a < b ) {
                            return -1;
                        }
                        if ( a > b ) {
                            return 1;
                        }
                        return 0;
                    })
                    for ( const selectedReporterIonMass of selectedReporterIonMasses ) {
                        const key = "Reporter_Ion_" + selectedReporterIonMass
                        _add_separatorLabel_IfNeeded_To__selection_Group_Display_Entries_Local({ seperatorString : OR_SEPERATOR_STRING, selection_Group_Display_Entries_Local : selection_OR_Group_Display_Entries })
                        const display = <span key={ key } style={ { whiteSpace: "nowrap" } }><span >Reporter ion: </span><span> </span><span>{ selectedReporterIonMass }</span></span>
                        selection_OR_Group_Display_Entries.push( display )
                    }
                }
                {
                    const selectedReporterIonMasses = Array.from( reporterIonMass_UserSelections_StateObject.get_ReporterIonssSelected_MassesOnly__SelectionType__ALL__AsSet() )
                    selectedReporterIonMasses.sort(function( a, b ) {
                        //  Sort Ascending
                        if ( a < b ) {
                            return -1;
                        }
                        if ( a > b ) {
                            return 1;
                        }
                        return 0;
                    })
                    for (const selectedReporterIonMass of selectedReporterIonMasses) {
                        const key = "Reporter_Ion_" + selectedReporterIonMass
                        _add_separatorLabel_IfNeeded_To__selection_Group_Display_Entries_Local({ seperatorString : AND_SEPERATOR_STRING, selection_Group_Display_Entries_Local: selection_AND_Group_Display_Entries })
                        const display = <span key={ key } style={{whiteSpace: "nowrap"}}><span>Reporter ion: </span><span> </span><span>{selectedReporterIonMass}</span></span>
                        selection_AND_Group_Display_Entries.push(display)
                    }
                }
            }

            if ( selection_OR_Group_Display_Entries.length === 1 && selection_AND_Group_Display_Entries.length > 0 ) {
                //  OR only has 1 entry so move to AND and delete OR
                _add_separatorLabel_IfNeeded_To__selection_Group_Display_Entries_Local({ seperatorString : AND_SEPERATOR_STRING, selection_Group_Display_Entries_Local: selection_AND_Group_Display_Entries })
                selection_AND_Group_Display_Entries.push( selection_OR_Group_Display_Entries[ 0 ] )
                selection_OR_Group_Display_Entries = undefined //  delete OR entry
            }

            //  Set to undefined if empty
            if ( selection_OR_Group_Display_Entries && selection_OR_Group_Display_Entries.length === 0 ) {
                selection_OR_Group_Display_Entries = undefined
            }
            if ( selection_AND_Group_Display_Entries && selection_AND_Group_Display_Entries.length === 0 ) {
                selection_AND_Group_Display_Entries = undefined
            }
        }

        let peptideSequenceSearchStrings_DisplayString : string = undefined;
        {
            peptideSequenceSearchStrings_DisplayString = this.props.peptideFiltersDisplay_ComponentData.peptideSequence_UserSelections_StateObject.getPeptideSearchString();
        }

        return (
            <div style={ { marginTop: 10 } }>
                <div>
                    <span  style={ { fontSize: 18, fontWeight: 700 } } >
                        Current peptide filters:
                    </span>
                    <span> </span>
                    <span style={ { fontSize: 12 } } className="fake-link " onClick={ this._clearAllFiltersClickHandler_BindThis } >clear all</span>
                </div>
                <div style={ { marginLeft: 80 } }>

                    { ( selectedProteinSequencePositions_DisplayString ) ?
                        <div >
                            <span style={{whiteSpace: "nowrap"}}>Must cover protein position(s): </span> <span>{ selectedProteinSequencePositions_DisplayString }</span> {/* example: 3, 6 or 987 */}
                        </div>
                        : null /* Display nothing */ }

                    { ( selection_AND_Group_Display_Entries ) ? //  Filter Values "AND" relationship
                        <div>
                            All peptides must contain: { selection_AND_Group_Display_Entries }
                        </div>
                        : null /* Display nothing */ }
                    { ( selection_OR_Group_Display_Entries ) ? //  Filter Values "OR" relationship
                        <div>
                            All peptides must contain: { selection_OR_Group_Display_Entries }
                        </div>
                        : null /* Display nothing */ }

                    { ( peptideSequenceSearchStrings_DisplayString ) ?
                        <div >
                            <span style={{whiteSpace: "nowrap"}}>Peptide sequences must contain: </span> <span>{ peptideSequenceSearchStrings_DisplayString }</span>
                        </div>
                        : null /* Display nothing */ }

                </div>
            </div>
        );
    }
}

//////////////////////
//////////////////////
//////////////////////

//  NOT in any class


/**
 * Add User Selected Static Modifications Formatted to array
 *
 * Called once for "ANY" and once for "ALL"
 */
const _userSelectionDisplay_Add_Static_ModificationsFormatted_For_ANY_or_ALL = function(
    { staticModificationMassesToFilterOn_ANY_or_ALL, seperatorString, selection_Group_Display_Entries_Local } : {
    staticModificationMassesToFilterOn_ANY_or_ALL : Map<string, Set<number>>
    seperatorString : string
    selection_Group_Display_Entries_Local : Array<JSX.Element>
}) {

    //  staticModificationMassesToFilterOn_ANY_or_ALL is Map<String (Residue), Set< Number ( Mod Mass ) >>

    const modificationsSelectedEntriesArray : Array<{ residue : string, modMass : number }> = [];

    for ( const entry of staticModificationMassesToFilterOn_ANY_or_ALL.entries() ) {

        const residue = entry[ 0 ];
        const modMasses = entry[ 1 ];

        for ( const modMass of modMasses ) {
            const modificationSelectedEntry = { residue : residue, modMass : modMass };
            modificationsSelectedEntriesArray.push( modificationSelectedEntry );
        }
    }

    // Multiple selected modifications so sort, and put in comma delim string with ' or ' before last entry

    modificationsSelectedEntriesArray.sort( function( a, b ) {
        //  Sort Ascending on Mod Mass then Residue
        if ( a.modMass < b.modMass ) {
            return -1;
        }
        if ( a.modMass > b.modMass ) {
            return 1;
        }
        if ( a.residue < b.residue ) {
            return -1;
        }
        if ( a.residue > b.residue ) {
            return 1;
        }
        return 0;
    });

    //  Add to list using toString()
    for ( const modification of modificationsSelectedEntriesArray ) {
        _add_separatorLabel_IfNeeded_To__selection_Group_Display_Entries_Local({ seperatorString, selection_Group_Display_Entries_Local })
        const modificationFormatted = modification.modMass.toString() + " (" + modification.residue + ")";
        const key = seperatorString + "_StaticMod_" + modificationFormatted
        const entry = <span key={ key }  style={{whiteSpace: "nowrap"}}><span >Static mod:</span><span > </span><span >{ modificationFormatted }</span></span>
        selection_Group_Display_Entries_Local.push( entry )
    }
}

/**
 *
 */
const _add_separatorLabel_IfNeeded_To__selection_Group_Display_Entries_Local = function({ seperatorString, selection_Group_Display_Entries_Local } : {
    seperatorString : string
    selection_Group_Display_Entries_Local : Array<JSX.Element>
}) : void {
    if ( selection_Group_Display_Entries_Local.length > 0 ) {
        const key = seperatorString + "_Seperator_" + selection_Group_Display_Entries_Local.length
        const entry = <span key={ key } ><span > </span><span>{ seperatorString }</span><span> </span></span>
        selection_Group_Display_Entries_Local.push( entry )
    }
}

/**
 * put in comma delim string with ' or ' before last entry
 */
const _userSelectionDisplay_CombineArrayIntoFormattedString = function({ array } : { array : Array<any> }) {

    const numEntries = array.length;

    if ( numEntries === 1 ) {
        //  Single Element so return
        return array[ 0 ]; // EARLY RETURN
    }

    //  > 1 entry so format with Comma Delim except before last entry.  Put ' or ' before last entry

    const lastEntryIndex = numEntries - 1;
    const allEntriesButLast = array.slice( 0, lastEntryIndex );

    let allEntriesButLastCommaDelim = allEntriesButLast.join(", ");

    const result = allEntriesButLastCommaDelim + " or " + array[ lastEntryIndex ];
    return result;
}
