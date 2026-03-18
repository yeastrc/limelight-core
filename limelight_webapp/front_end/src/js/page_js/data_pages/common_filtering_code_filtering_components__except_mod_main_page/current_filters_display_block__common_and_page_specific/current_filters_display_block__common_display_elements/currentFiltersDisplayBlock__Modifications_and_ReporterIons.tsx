/**
 * currentFiltersDisplayBlock__Modifications_and_ReporterIons.tsx
 *
 * ONLY on Single Protein
 *
 * "Current Filters:"   For "Must cover protein position(s):"
 *
 *
 */

import React from "react";
import {SingleProtein_Filter_SelectionType} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinPage_SingleProtein_Filter_Enums";
import {ModificationMass_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject";
import {ReporterIonMass_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/reporter_ions_user_selections/js/reporterIonMass_UserSelections_StateObject";

//  Set since what is returned is put into an Array.  Simply set to root function name.
const _ROOT_REACT_ELEMENT_RETURNED__KEY = "currentFiltersDisplayBlock__Modifications_and_ReporterIons";

/**
 *
 * @param modificationMass_UserSelections_StateObject
 * @param reporterIonMass_UserSelections_StateObject
 */
export const currentFiltersDisplayBlock__Modifications_and_ReporterIons = function (
    {
        modificationMass_UserSelections_StateObject,
        reporterIonMass_UserSelections_StateObject
    } : {
        modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject;
        reporterIonMass_UserSelections_StateObject : ReporterIonMass_UserSelections_StateObject;
    }
) : React.JSX.Element {

    const AND_SEPARATOR_STRING = "AND"
    const OR_SEPARATOR_STRING = "OR"
    const NOT_SEPARATOR_STRING = "OR"

    let selection_AND_Group_Display_Entries__For_ModificationSelects : Array<React.JSX.Element> = new Array<React.JSX.Element>()  //  Will be set to undefined in next block if empty at end of block
    let selection_OR_Group_Display_Entries__For_ModificationSelects : Array<React.JSX.Element> = new Array<React.JSX.Element>()  //  Will be set to undefined in next block if empty at end of block
    let selection_NOT_Group_Display_Entries__For_ModificationSelects : Array<React.JSX.Element> = new Array<React.JSX.Element>()  //  Will be set to undefined in next block if empty at end of block

    let selection_NOT_UnModified_Variable_Mods_Selected = false;
    let selection_NOT_UnModified_Open_Mods_Selected = false;


    let selection_AND_Group_Display_Entries__For_ReporterIonSelections : Array<React.JSX.Element> = new Array<React.JSX.Element>()  //  Will be set to undefined in next block if empty at end of block
    let selection_OR_Group_Display_Entries__For_ReporterIonSelections : Array<React.JSX.Element> = new Array<React.JSX.Element>()  //  Will be set to undefined in next block if empty at end of block
    let selection_NOT_Group_Display_Entries__For_ReporterIonSelections : Array<React.JSX.Element> = new Array<React.JSX.Element>()  //  Will be set to undefined in next block if empty at end of block

    {
        const variable_ModificationSelections_StateObject = modificationMass_UserSelections_StateObject.get_VariableModificationSelections()
        const open_ModificationSelections_StateObject = modificationMass_UserSelections_StateObject.get_OpenModificationSelections()

        //  Variable Mods
        if ( variable_ModificationSelections_StateObject.is_Any_Modification_Selected() ) {

            const no_Modification_SelectionEntry = variable_ModificationSelections_StateObject.get_NO_Modification_AKA_Unmodified_Selected()
            if ( no_Modification_SelectionEntry ) {
                const key = "Var_NoMod"
                const display = <span key={ key } style={ { whiteSpace: "nowrap" } }>no variable modification mass(es)</span>
                if ( no_Modification_SelectionEntry.selectionType === SingleProtein_Filter_SelectionType.ANY ) {
                    _add_separatorLabel_IfNeeded_To__selection_Group_Display_Entries_Local({ separatorString : OR_SEPARATOR_STRING, selection_Group_Display_Entries_Local : selection_OR_Group_Display_Entries__For_ModificationSelects })
                    selection_OR_Group_Display_Entries__For_ModificationSelects.push( display )
                } else if ( no_Modification_SelectionEntry.selectionType === SingleProtein_Filter_SelectionType.ALL ) {
                    _add_separatorLabel_IfNeeded_To__selection_Group_Display_Entries_Local({ separatorString: AND_SEPARATOR_STRING, selection_Group_Display_Entries_Local : selection_AND_Group_Display_Entries__For_ModificationSelects })
                    selection_AND_Group_Display_Entries__For_ModificationSelects.push( display )
                } else if ( no_Modification_SelectionEntry.selectionType === SingleProtein_Filter_SelectionType.NOT ) {
                    selection_NOT_UnModified_Variable_Mods_Selected = true;
                } else {
                    const msg = "variable_ModificationSelections_StateObject.get_NO_Modification_AKA_Unmodified_Selected() returned value but value.selectionType is not ANY or ALL or NOT"
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
                    _add_separatorLabel_IfNeeded_To__selection_Group_Display_Entries_Local({ separatorString : OR_SEPARATOR_STRING, selection_Group_Display_Entries_Local : selection_OR_Group_Display_Entries__For_ModificationSelects })
                    const display = <span key={ key } style={ { whiteSpace: "nowrap" } }><span >Variable mod: </span><span> </span><span>{ selectedModMass }</span></span>
                    selection_OR_Group_Display_Entries__For_ModificationSelects.push( display )
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
                    _add_separatorLabel_IfNeeded_To__selection_Group_Display_Entries_Local({ separatorString: AND_SEPARATOR_STRING, selection_Group_Display_Entries_Local: selection_AND_Group_Display_Entries__For_ModificationSelects })
                    const display = <span key={key} style={{whiteSpace: "nowrap"}}><span>Variable mod: </span><span> </span><span>{selectedModMass}</span></span>
                    selection_AND_Group_Display_Entries__For_ModificationSelects.push(display)
                }
            }
            {
                const selectedModMasses = Array.from(variable_ModificationSelections_StateObject.get_ModificationsSelected__OnlyModMasses_Only__NOT_SelectionType_AsSet())
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
                    _add_separatorLabel_IfNeeded_To__selection_Group_Display_Entries_Local({ separatorString: NOT_SEPARATOR_STRING, selection_Group_Display_Entries_Local: selection_NOT_Group_Display_Entries__For_ModificationSelects })
                    const display = <span key={key} style={{whiteSpace: "nowrap"}}><span>Variable mod: </span><span> </span><span>{selectedModMass}</span></span>
                    selection_NOT_Group_Display_Entries__For_ModificationSelects.push(display)
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
                    _add_separatorLabel_IfNeeded_To__selection_Group_Display_Entries_Local({ separatorString : OR_SEPARATOR_STRING, selection_Group_Display_Entries_Local : selection_OR_Group_Display_Entries__For_ModificationSelects })
                    selection_OR_Group_Display_Entries__For_ModificationSelects.push( display )
                } else if ( no_Modification_SelectionEntry.selectionType === SingleProtein_Filter_SelectionType.ALL ) {
                    _add_separatorLabel_IfNeeded_To__selection_Group_Display_Entries_Local({ separatorString: AND_SEPARATOR_STRING, selection_Group_Display_Entries_Local : selection_AND_Group_Display_Entries__For_ModificationSelects })
                    selection_AND_Group_Display_Entries__For_ModificationSelects.push( display )
                } else if ( no_Modification_SelectionEntry.selectionType === SingleProtein_Filter_SelectionType.NOT ) {
                    selection_NOT_UnModified_Open_Mods_Selected = true;
                } else {
                    const msg = "open_ModificationSelections_StateObject.get_NO_Modification_AKA_Unmodified_Selected() returned value but value.selectionType is not ANY or ALL or NOT"
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
                    _add_separatorLabel_IfNeeded_To__selection_Group_Display_Entries_Local({ separatorString : OR_SEPARATOR_STRING, selection_Group_Display_Entries_Local : selection_OR_Group_Display_Entries__For_ModificationSelects })
                    const display = <span key={ key } style={ { whiteSpace: "nowrap" } }><span >Open mod: </span><span> </span><span>{ selectedModMass }</span></span>
                    selection_OR_Group_Display_Entries__For_ModificationSelects.push( display )
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
                    _add_separatorLabel_IfNeeded_To__selection_Group_Display_Entries_Local({ separatorString : AND_SEPARATOR_STRING, selection_Group_Display_Entries_Local: selection_AND_Group_Display_Entries__For_ModificationSelects })
                    const display = <span key={ key } style={{whiteSpace: "nowrap"}}><span>Open mod: </span><span> </span><span>{selectedModMass}</span></span>
                    selection_AND_Group_Display_Entries__For_ModificationSelects.push(display)
                }
            }
            {
                const selectedModMasses = Array.from( open_ModificationSelections_StateObject.get_ModificationsSelected__OnlyModMasses_Only__NOT_SelectionType_AsSet() )
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
                    _add_separatorLabel_IfNeeded_To__selection_Group_Display_Entries_Local({ separatorString : NOT_SEPARATOR_STRING, selection_Group_Display_Entries_Local: selection_NOT_Group_Display_Entries__For_ModificationSelects })
                    const display = <span key={ key } style={{whiteSpace: "nowrap"}}><span>Open mod: </span><span> </span><span>{selectedModMass}</span></span>
                    selection_NOT_Group_Display_Entries__For_ModificationSelects.push(display)
                }
            }
        }

        // Static Mods
        if ( modificationMass_UserSelections_StateObject.is_Any_StaticModification_Selected() ) {

            const selection_ANY = modificationMass_UserSelections_StateObject.get_StaticModifications_Selected_Residue_Mass_Map_Set__ONLY__ANY_SelectionType()
            const selection_ALL = modificationMass_UserSelections_StateObject.get_StaticModifications_Selected_Residue_Mass_Map_Set__ONLY__ALL_SelectionType()
            const selection_NOT = modificationMass_UserSelections_StateObject.get_StaticModifications_Selected_Residue_Mass_Map_Set__ONLY__NOT_SelectionType()

            _userSelectionDisplay_Add_Static_ModificationsFormatted_For_ANY_or_ALL({
                staticModificationMassesToFilterOn_ANY_or_ALL :  selection_ANY,
                seperatorString : OR_SEPARATOR_STRING,
                selection_Group_Display_Entries_Local : selection_OR_Group_Display_Entries__For_ModificationSelects
            })

            _userSelectionDisplay_Add_Static_ModificationsFormatted_For_ANY_or_ALL({
                staticModificationMassesToFilterOn_ANY_or_ALL :  selection_ALL,
                seperatorString : AND_SEPARATOR_STRING,
                selection_Group_Display_Entries_Local : selection_AND_Group_Display_Entries__For_ModificationSelects
            })

            _userSelectionDisplay_Add_Static_ModificationsFormatted_For_ANY_or_ALL({
                staticModificationMassesToFilterOn_ANY_or_ALL :  selection_NOT,
                seperatorString : NOT_SEPARATOR_STRING,
                selection_Group_Display_Entries_Local : selection_NOT_Group_Display_Entries__For_ModificationSelects
            })
        }

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
                    _add_separatorLabel_IfNeeded_To__selection_Group_Display_Entries_Local({ separatorString : OR_SEPARATOR_STRING, selection_Group_Display_Entries_Local : selection_OR_Group_Display_Entries__For_ReporterIonSelections })
                    const display = <span key={ key } style={ { whiteSpace: "nowrap" } }><span >Reporter ion: </span><span> </span><span>{ selectedReporterIonMass }</span></span>
                    selection_OR_Group_Display_Entries__For_ReporterIonSelections.push( display )
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
                    _add_separatorLabel_IfNeeded_To__selection_Group_Display_Entries_Local({ separatorString : AND_SEPARATOR_STRING, selection_Group_Display_Entries_Local: selection_AND_Group_Display_Entries__For_ReporterIonSelections })
                    const display = <span key={ key } style={{whiteSpace: "nowrap"}}><span>Reporter ion: </span><span> </span><span>{selectedReporterIonMass}</span></span>
                    selection_AND_Group_Display_Entries__For_ReporterIonSelections.push(display)
                }
            }
            {
                const selectedReporterIonMasses = Array.from( reporterIonMass_UserSelections_StateObject.get_ReporterIonssSelected_MassesOnly__SelectionType__NOT__AsSet() )
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
                    _add_separatorLabel_IfNeeded_To__selection_Group_Display_Entries_Local({ separatorString : NOT_SEPARATOR_STRING, selection_Group_Display_Entries_Local: selection_NOT_Group_Display_Entries__For_ReporterIonSelections })
                    const display = <span key={ key } style={{whiteSpace: "nowrap"}}><span>Reporter ion: </span><span> </span><span>{selectedReporterIonMass}</span></span>
                    selection_NOT_Group_Display_Entries__For_ReporterIonSelections.push(display)
                }
            }
        }

        if ( selection_OR_Group_Display_Entries__For_ModificationSelects.length === 1 && selection_AND_Group_Display_Entries__For_ModificationSelects.length > 0 ) {
            //  OR only has 1 entry so move to AND and delete OR
            _add_separatorLabel_IfNeeded_To__selection_Group_Display_Entries_Local({ separatorString : AND_SEPARATOR_STRING, selection_Group_Display_Entries_Local: selection_AND_Group_Display_Entries__For_ModificationSelects })
            selection_AND_Group_Display_Entries__For_ModificationSelects.push( selection_OR_Group_Display_Entries__For_ModificationSelects[ 0 ] )
            selection_OR_Group_Display_Entries__For_ModificationSelects = undefined //  delete OR entry
        }

        if ( selection_OR_Group_Display_Entries__For_ReporterIonSelections.length === 1 && selection_AND_Group_Display_Entries__For_ReporterIonSelections.length > 0 ) {
            //  OR only has 1 entry so move to AND and delete OR
            _add_separatorLabel_IfNeeded_To__selection_Group_Display_Entries_Local({ separatorString : AND_SEPARATOR_STRING, selection_Group_Display_Entries_Local: selection_AND_Group_Display_Entries__For_ReporterIonSelections })
            selection_AND_Group_Display_Entries__For_ReporterIonSelections.push( selection_OR_Group_Display_Entries__For_ReporterIonSelections[ 0 ] )
            selection_OR_Group_Display_Entries__For_ReporterIonSelections = undefined //  delete OR entry
        }

        //  Set to undefined if empty
        if ( selection_OR_Group_Display_Entries__For_ModificationSelects && selection_OR_Group_Display_Entries__For_ModificationSelects.length === 0 ) {
            selection_OR_Group_Display_Entries__For_ModificationSelects = undefined
        }
        if ( selection_AND_Group_Display_Entries__For_ModificationSelects && selection_AND_Group_Display_Entries__For_ModificationSelects.length === 0 ) {
            selection_AND_Group_Display_Entries__For_ModificationSelects = undefined
        }
        if ( selection_NOT_Group_Display_Entries__For_ModificationSelects && selection_NOT_Group_Display_Entries__For_ModificationSelects.length === 0 ) {
            selection_NOT_Group_Display_Entries__For_ModificationSelects = undefined
        }

        //  Set to undefined if empty
        if ( selection_OR_Group_Display_Entries__For_ReporterIonSelections && selection_OR_Group_Display_Entries__For_ReporterIonSelections.length === 0 ) {
            selection_OR_Group_Display_Entries__For_ReporterIonSelections = undefined
        }
        if ( selection_AND_Group_Display_Entries__For_ReporterIonSelections && selection_AND_Group_Display_Entries__For_ReporterIonSelections.length === 0 ) {
            selection_AND_Group_Display_Entries__For_ReporterIonSelections = undefined
        }
        if ( selection_NOT_Group_Display_Entries__For_ReporterIonSelections && selection_NOT_Group_Display_Entries__For_ReporterIonSelections.length === 0 ) {
            selection_NOT_Group_Display_Entries__For_ReporterIonSelections = undefined
        }
    }

    if ( ( ! selection_AND_Group_Display_Entries__For_ModificationSelects )
        && ( ! selection_OR_Group_Display_Entries__For_ModificationSelects )
        && ( ! selection_NOT_Group_Display_Entries__For_ModificationSelects )
        && ( ! selection_AND_Group_Display_Entries__For_ReporterIonSelections )
        && ( ! selection_OR_Group_Display_Entries__For_ReporterIonSelections )
        && ( ! selection_NOT_Group_Display_Entries__For_ReporterIonSelections )
        && ( ! selection_NOT_UnModified_Variable_Mods_Selected )
        && ( ! selection_NOT_UnModified_Open_Mods_Selected )

        //  NOT display "Include all modified and unmodified versions of peptides found using modification filters.
        //   I.E.:
        //    Ignore if no mods selected
            // ( modificationMass_ShowOtherPeptidesWherePeptideSequenceMatchPeptidesMeetModFilters_UserSelections_StateObject &&
            //     modificationMass_ShowOtherPeptidesWherePeptideSequenceMatchPeptidesMeetModFilters_UserSelections_StateObject.getSelected() )
    ) {
        //  Nothing to display

        return null;  // EARLY RETURN
    }

    return (
        <React.Fragment key={ _ROOT_REACT_ELEMENT_RETURNED__KEY }>
            {/*Modifications*/}
            <CurrentFiltersDisplayBlock__Modifications_and_ReporterIons
                selection_AND_Group_Display_Entries={ selection_AND_Group_Display_Entries__For_ModificationSelects }
                selection_OR_Group_Display_Entries={ selection_OR_Group_Display_Entries__For_ModificationSelects }
                selection_NOT_Group_Display_Entries={ selection_NOT_Group_Display_Entries__For_ModificationSelects }

                selection_NOT_UnModified_Variable_Mods_Selected={ selection_NOT_UnModified_Variable_Mods_Selected }
                selection_NOT_UnModified_Open_Mods_Selected={ selection_NOT_UnModified_Open_Mods_Selected }

                modificationMass_UserSelections_StateObject={ modificationMass_UserSelections_StateObject }
            />
            {/*Reporter Ions*/}
            <CurrentFiltersDisplayBlock__Modifications_and_ReporterIons
                selection_AND_Group_Display_Entries={ selection_AND_Group_Display_Entries__For_ReporterIonSelections }
                selection_OR_Group_Display_Entries={ selection_OR_Group_Display_Entries__For_ReporterIonSelections }
                selection_NOT_Group_Display_Entries={ selection_NOT_Group_Display_Entries__For_ReporterIonSelections }

                selection_NOT_UnModified_Variable_Mods_Selected={ undefined }
                selection_NOT_UnModified_Open_Mods_Selected={ undefined }

                modificationMass_UserSelections_StateObject={ undefined }
            />
        </React.Fragment>
    );
}

/**
 *
 * @param selectedProteinSequencePositions_DisplayString
 */
const CurrentFiltersDisplayBlock__Modifications_and_ReporterIons = function(
    {
        selection_AND_Group_Display_Entries,
        selection_OR_Group_Display_Entries,
        selection_NOT_Group_Display_Entries,

        selection_NOT_UnModified_Variable_Mods_Selected,
        selection_NOT_UnModified_Open_Mods_Selected,

        modificationMass_UserSelections_StateObject

    } : {
        selection_AND_Group_Display_Entries : Array<React.JSX.Element>
        selection_OR_Group_Display_Entries : Array<React.JSX.Element>
        selection_NOT_Group_Display_Entries : Array<React.JSX.Element>

        selection_NOT_UnModified_Variable_Mods_Selected: boolean
        selection_NOT_UnModified_Open_Mods_Selected: boolean

        modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject

    }
) : React.JSX.Element {

    //  CANNOT return null since wrapped in <React.Fragment>

    return (
        <React.Fragment key="currentFiltersDisplayBlock__Modifications_and_ReporterIons">

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

            {/*  Special text for "NOT" of Unmodified (Variable and/or Open Modifications)   */}
            { ( selection_NOT_UnModified_Variable_Mods_Selected || selection_NOT_UnModified_Open_Mods_Selected ) ? //  Filter Values "NOT" Unmodified entries
                <div>
                    <span>
                        All peptides must contain
                    </span>
                    {(selection_NOT_UnModified_Variable_Mods_Selected) ?
                        <span>
                            &nbsp;a variable modification
                        </span>
                        : null /* Display nothing */}
                    {(selection_NOT_UnModified_Variable_Mods_Selected && selection_NOT_UnModified_Open_Mods_Selected) ?
                        <span>
                            &nbsp;and
                        </span>
                        : null /* Display nothing */}
                    {(selection_NOT_UnModified_Open_Mods_Selected) ?
                        <span>
                            &nbsp;an open modification
                        </span>
                        : null /* Display nothing */}
                </div>
                : null /* Display nothing */}

            { ( selection_NOT_Group_Display_Entries ) ? //  Filter Values "NOT" relationship
                <div>
                    No peptides may contain: { selection_NOT_Group_Display_Entries }
                </div>
                : null /* Display nothing */ }

            { ( modificationMass_UserSelections_StateObject &&
                modificationMass_UserSelections_StateObject.get_showOtherPeptidesWherePeptideSequenceMatchPeptidesMeetModFilters_UserSelection() &&
                (
                    selection_AND_Group_Display_Entries || selection_OR_Group_Display_Entries || selection_NOT_Group_Display_Entries ||
                    selection_NOT_UnModified_Variable_Mods_Selected || selection_NOT_UnModified_Open_Mods_Selected
                )
            ) ? (
                    <div>
                        Include all modified and unmodified versions of peptides found using modification filters.
                    </div>

            ) : null }
        </React.Fragment>
    );
}


/**
 * Add User Selected Static Modifications Formatted to array
 *
 * Called once for "ANY" and once for "ALL"
 */
const _userSelectionDisplay_Add_Static_ModificationsFormatted_For_ANY_or_ALL = function(
    { staticModificationMassesToFilterOn_ANY_or_ALL, seperatorString, selection_Group_Display_Entries_Local } : {
        staticModificationMassesToFilterOn_ANY_or_ALL : Map<string, Set<number>>
        seperatorString : string
        selection_Group_Display_Entries_Local : Array<React.JSX.Element>
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
        _add_separatorLabel_IfNeeded_To__selection_Group_Display_Entries_Local({ separatorString: seperatorString, selection_Group_Display_Entries_Local })
        const modificationFormatted = modification.modMass.toString() + " (" + modification.residue + ")";
        const key = seperatorString + "_StaticMod_" + modificationFormatted
        const entry = <span key={ key }  style={{whiteSpace: "nowrap"}}><span >Static mod:</span><span > </span><span >{ modificationFormatted }</span></span>
        selection_Group_Display_Entries_Local.push( entry )
    }
}

/**
 *
 */
const _add_separatorLabel_IfNeeded_To__selection_Group_Display_Entries_Local = function({ separatorString, selection_Group_Display_Entries_Local } : {
    separatorString : string
    selection_Group_Display_Entries_Local : Array<React.JSX.Element>
}) : void {
    if ( selection_Group_Display_Entries_Local.length > 0 ) {
        const key = separatorString + "_Seperator_" + selection_Group_Display_Entries_Local.length
        const entry = <span key={ key } ><span > </span><span>{ separatorString }</span><span> </span></span>
        selection_Group_Display_Entries_Local.push( entry )
    }
}
