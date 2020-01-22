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

	/**
	 * Add User Selected Variable Modifications Formatted to array
	 */
	_userSelectionDisplay_Add_Variable_ModificationsFormatted({ variableModificationMassesToFilterOn, modsFilteringOnForDisplayArray }) {

		const modificationsSelectedArray = Array.from( variableModificationMassesToFilterOn );

		if ( modificationsSelectedArray.length === 1 ) {
			//  Single selected modification so put in string
			const modificationFormatted = modificationsSelectedArray[ 0 ].toString(); 
			modsFilteringOnForDisplayArray.push( modificationFormatted );
			return; // EARLY RETURN
		}

		// Multiple selected modifications so sort, and put in comma delim string with ' or ' before last entry

		modificationsSelectedArray.sort( function( a, b ) {
			//  Sort Ascending
			if ( a < b ) {
				return -1;
			}
			if ( a > b ) {
				return 1;
			}
			return 0;
		});

		//  Add to list using toString()
		for ( const modification of modificationsSelectedArray ) {
			const modificationFormatted = modification.toString();
			modsFilteringOnForDisplayArray.push( modificationFormatted );
		}
	}

	/**
	 * Add User Selected Static Modifications Formatted to array
	 */
	_userSelectionDisplay_Add_Static_ModificationsFormatted({ staticModificationMassesToFilterOn, modsFilteringOnForDisplayArray }) {

		//  staticModificationMassesToFilterOn is Map<String (Residue), Set< Number ( Mod Mass ) >>

		const modificationsSelectedEntriesArray = [];

		for ( const entry of staticModificationMassesToFilterOn.entries() ) {

			const residue = entry[ 0 ];
			const modMasses = entry[ 1 ];

			for ( const modMass of modMasses ) {
				const modificationSelectedEntry = { residue : residue, modMass : modMass };
				modificationsSelectedEntriesArray.push( modificationSelectedEntry );
			} 
		}

		if ( modificationsSelectedEntriesArray.length === 1 ) {
			//  Single selected modification so put in string
			const modificationFormatted = modificationsSelectedEntriesArray[ 0 ].modMass.toString() + " (" + modificationsSelectedEntriesArray[ 0 ].residue + ")";
			modsFilteringOnForDisplayArray.push( modificationFormatted );
			return; // EARLY RETURN
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
			const modificationFormatted = modification.modMass.toString() + " (" + modification.residue + ")";
			modsFilteringOnForDisplayArray.push( modificationFormatted );
		}
	}

	/**
	 * put in comma delim string with ' or ' before last entry
	 */
	_userSelectionDisplay_CombineArrayIntoFormattedString({ array } : { array : Array<any> }) {

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

    ////////////////////////////////////////

    /**
     * 
     */    
    render() {
        {
            // if nothing selected, return null
            const selectedProteinSequencePositionsSet = this.props.peptideFiltersDisplay_ComponentData.proteinSequenceWidget_StateObject.get_selectedProteinSequencePositions();

            const modificationMass_UserSelections_StateObject = this.props.peptideFiltersDisplay_ComponentData.modificationMass_UserSelections_StateObject;

            const is_Any_VariableModification_Selected = modificationMass_UserSelections_StateObject.is_Any_VariableModification_Selected();
            const is_Any_StaticModification_Selected = modificationMass_UserSelections_StateObject.is_Any_StaticModification_Selected();

            const reporterIonssSelectedsSet = this.props.peptideFiltersDisplay_ComponentData.reporterIonMass_UserSelections_StateObject.get_ReporterIonssSelected();

            const peptideSearchString = this.props.peptideFiltersDisplay_ComponentData.peptideSequence_UserSelections_StateObject.getPeptideSearchString();

            if ( ( ( ! selectedProteinSequencePositionsSet ) || ( selectedProteinSequencePositionsSet.size === 0 ) )
                && ( ! is_Any_VariableModification_Selected )
                && ( ! is_Any_StaticModification_Selected )
                && ( ( ! reporterIonssSelectedsSet ) || ( reporterIonssSelectedsSet.size === 0 ) )
                && ( ! peptideSearchString )
            ) {

                // Nothing to display

                return null;  //  EARLY RETURN
            }

        }

        let selectedProteinSequencePositions_Display = undefined;

        {
            const selectedProteinSequencePositionsSet = this.props.peptideFiltersDisplay_ComponentData.proteinSequenceWidget_StateObject.get_selectedProteinSequencePositions();

            if ( selectedProteinSequencePositionsSet && ( selectedProteinSequencePositionsSet.size !== 0 ) ) {

                const selectedProteinSequencePositionsArray = Array.from( selectedProteinSequencePositionsSet );
                selectedProteinSequencePositionsArray.sort();

                const selectedProteinSequencePositionsString = this._userSelectionDisplay_CombineArrayIntoFormattedString({ array : selectedProteinSequencePositionsArray });

                selectedProteinSequencePositions_Display = (
                    <div >
                        <span>Must cover protein position(s): </span> <span>{ selectedProteinSequencePositionsString }</span> {/* example: 3, 6 or 987 */}
                    </div>
                );
            }
        }

        let selectedModificationsMasses_Display = undefined;
        {
            const modificationMass_UserSelections_StateObject = this.props.peptideFiltersDisplay_ComponentData.modificationMass_UserSelections_StateObject;

            const is_Any_VariableModification_Selected = modificationMass_UserSelections_StateObject.is_Any_VariableModification_Selected();
            const is_Any_StaticModification_Selected = modificationMass_UserSelections_StateObject.is_Any_StaticModification_Selected();

            if ( is_Any_VariableModification_Selected || is_Any_StaticModification_Selected ) {

                let modificationMassesVariableStatic : string = undefined;

                {
                    const variableModificationMassesToFilterOn = modificationMass_UserSelections_StateObject.get_VariableModificationsSelected_ExcludingNoModificationOption();
                    const staticModificationMassesToFilterOn = modificationMass_UserSelections_StateObject.get_StaticModifications_Selected();

                    
                    const modsFilteringOnForDisplayArray = [];

                    if ( variableModificationMassesToFilterOn && variableModificationMassesToFilterOn.size !== 0 ) {
                        //  Have Variable Mod Mass selected so add to display array
                        this._userSelectionDisplay_Add_Variable_ModificationsFormatted({ variableModificationMassesToFilterOn, modsFilteringOnForDisplayArray });
                    }
                    if ( staticModificationMassesToFilterOn && staticModificationMassesToFilterOn.size !== 0 ) {
                        //  Have Static Mod Mass selected so add to display array
                        this._userSelectionDisplay_Add_Static_ModificationsFormatted({ staticModificationMassesToFilterOn, modsFilteringOnForDisplayArray });
                    }

                    if ( modsFilteringOnForDisplayArray.length !== 0 ) {
                        modificationMassesVariableStatic = this._userSelectionDisplay_CombineArrayIntoFormattedString({ array : modsFilteringOnForDisplayArray });
                    }
                }

                // Any Variable or Static mods selected or Variable 'unmodified' selected
                    
                if ( modificationMass_UserSelections_StateObject.is_NO_VariableModification_AKA_Unmodified_Selected() ) {

                    // 'unmodified' in Variable Mods selected.

                    if ( is_Any_StaticModification_Selected ) {

                        //  Static Mods Selected
                        
                        selectedModificationsMasses_Display = (
                            <React.Fragment>
                                <div >
                                    Must contain no variable modifications
                                </div>
                                <div>
                                    <span >Must contain static modifications: </span> <span >{ modificationMassesVariableStatic }</span>
                                </div>
                            </React.Fragment>
                        );
                    } else {
                        selectedModificationsMasses_Display = (
                            <div>
                                Must contain no variable modification mass(es)
                            </div>
                        );
                    }
                } else {
                    selectedModificationsMasses_Display = (

                        // 'unmodified' not selected.  Combine Variable and Static modification selection

                        <div>
                            <span >Must contain modification mass(es): </span> <span>{ modificationMassesVariableStatic }</span> {/* ex: 57.99, 23.33 or 57.02 (C)  */}
                        </div>
                    );
                }
            }
        }

        let selectedReporterIonMasses_Display = undefined;
        {
            const reporterIonssSelectedsSet = this.props.peptideFiltersDisplay_ComponentData.reporterIonMass_UserSelections_StateObject.get_ReporterIonssSelected();

            if ( reporterIonssSelectedsSet && ( reporterIonssSelectedsSet.size !== 0 ) ) {

                const reporterIonssSelectedsArray = Array.from( reporterIonssSelectedsSet );
                reporterIonssSelectedsArray.sort();

                const reporterIonssSelectedsString = this._userSelectionDisplay_CombineArrayIntoFormattedString({ array : reporterIonssSelectedsArray });

                selectedReporterIonMasses_Display = (
                    <div >
                        <span>PSM reporter ion mass(es) must contain: </span> <span>{ reporterIonssSelectedsString }</span>
                    </div>
                );
            }
        }

        let peptideSequenceSearchStrings_Display = undefined;
        {
            const peptideSearchString = this.props.peptideFiltersDisplay_ComponentData.peptideSequence_UserSelections_StateObject.getPeptideSearchString();
            if ( peptideSearchString ) {
                peptideSequenceSearchStrings_Display = (
                    <div >
                        <span>Peptide sequences must contain: </span> <span>{ peptideSearchString }</span>
                    </div>
                );
            }
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

                    { selectedProteinSequencePositions_Display }
                    { selectedModificationsMasses_Display }
                    { selectedReporterIonMasses_Display }
                    { peptideSequenceSearchStrings_Display }
                </div>
            </div>
        );
    }
}
