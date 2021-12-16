/**
 * proteinFiltersDisplay.tsx
 *
 * Display currently applied Protein Filters.  Shown above the Protein List.
 *
 * Includes the "clear all" link to clear all filters
 *
 * For use in proteinExperimentPage_SingleProtein_Root_Component.tsx
 *
 */

import React from 'react'

import {SingleProtein_Filter_SelectionType} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinPage_SingleProtein_Filter_Enums";
import {ProteinFiltersDisplay_ComponentData} from "page_js/data_pages/protein_list__common_shared__psb_and_experiment/protein_filters_display/js/proteinFiltersDisplay_ComponentData";




/**
 *
 */
export type ProteinFiltersDisplay_clearAllFiltersClickHandler = () => void;

/**
 *
 */
export interface ProteinFiltersDisplay_Props {

    proteinFiltersDisplay_ComponentData : ProteinFiltersDisplay_ComponentData;

    //  All called clearAllFiltersClickHandler  has been modified to NOT clear ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
    clearAllFiltersClickHandler : ProteinFiltersDisplay_clearAllFiltersClickHandler;
}

/**
 *
 */
interface ProteinFiltersDisplay_State {

    prev_proteinFiltersDisplay_ComponentData : ProteinFiltersDisplay_ComponentData;
}

/**
 *
 */
export class ProteinFiltersDisplay extends React.Component< ProteinFiltersDisplay_Props, ProteinFiltersDisplay_State > {

    //  bind to 'this' for passing as parameters
    private _clearAllFiltersClickHandler_BindThis = this._clearAllFiltersClickHandler.bind(this);

    /**
     *
     */
    constructor(props : ProteinFiltersDisplay_Props) {
        super(props);

        this.state = { prev_proteinFiltersDisplay_ComponentData : props.proteinFiltersDisplay_ComponentData };
    }

    /**
     *
     */
    shouldComponentUpdate( nextProps: Readonly<ProteinFiltersDisplay_Props>, nextState: Readonly<ProteinFiltersDisplay_State>, nextContext: any) : boolean {

        if ( nextProps.proteinFiltersDisplay_ComponentData !== this.props.proteinFiltersDisplay_ComponentData ) {
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

            //  searchSubGroup properties not always populated
            const searchSubGroup_Are_All_SearchSubGroupIds_Selected = this.props.proteinFiltersDisplay_ComponentData.searchSubGroup_Are_All_SearchSubGroupIds_Selected;
            // const searchSubGroup_PropValue = this.props.proteinFiltersDisplay_ComponentData.searchSubGroup_PropValue;

            const modificationMass_UserSelections_StateObject = this.props.proteinFiltersDisplay_ComponentData.modificationMass_UserSelections_StateObject;

            const is_Any_VariableModification_Selected = modificationMass_UserSelections_StateObject.get_VariableModificationSelections().is_Any_Modification_Selected();
            const is_Any_OpenModification_Selected = modificationMass_UserSelections_StateObject.get_OpenModificationSelections().is_Any_Modification_Selected();
            const is_Any_StaticModification_Selected = modificationMass_UserSelections_StateObject.is_Any_StaticModification_Selected();


            //  Comment out since never display this info

            // let is_Treat_Mass_0_As_Unmodified_Selected = false;

            // if ( this.props.proteinFiltersDisplay_ComponentData.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
            //     && this.props.proteinFiltersDisplay_ComponentData.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.getTreatOpenModMassZeroAsUnmodified_Selection() ) {
            //     is_Treat_Mass_0_As_Unmodified_Selected = true;
            // }

            const reporterIonssSelectedsSet = this.props.proteinFiltersDisplay_ComponentData.reporterIonMass_UserSelections_StateObject.get_ReporterIonssSelected_MassesOnly_AsSet();

            let proteinPage_PSM_DistinctPeptide_CountFilter_HasValue = false;
            {
                //  Test here is ONLY for whether or not to render the component.  The State Object value is tested again below for showing the specific value on the page

                if ( this.props.proteinFiltersDisplay_ComponentData.proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject ) {
                    { // PSM Count
                        const countFilter = this.props.proteinFiltersDisplay_ComponentData.proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject.get_PSM_CountFilter();
                        if ( countFilter !== undefined && countFilter !== null ) {
                            // Only display has value
                            proteinPage_PSM_DistinctPeptide_CountFilter_HasValue = true
                        }
                    }
                    { // Distinct Peptide Count
                        const countFilter = this.props.proteinFiltersDisplay_ComponentData.proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject.get_Peptide_CountFilter();
                        if ( countFilter !== undefined && countFilter !== null ) {
                            // Only display has value
                            proteinPage_PSM_DistinctPeptide_CountFilter_HasValue = true
                        }
                    }
                    { // Unique Peptide Count
                        const countFilter = this.props.proteinFiltersDisplay_ComponentData.proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject.get_UniquePeptide_CountFilter();
                        if ( countFilter !== undefined && countFilter !== null ) {
                            // Only display has value
                            proteinPage_PSM_DistinctPeptide_CountFilter_HasValue = true
                        }
                    }
                }
            }

            if ( ( searchSubGroup_Are_All_SearchSubGroupIds_Selected )
                && ( ! is_Any_VariableModification_Selected )
                && ( ! is_Any_OpenModification_Selected )
                && ( ! is_Any_StaticModification_Selected )
                // && ( ! is_Treat_Mass_0_As_Unmodified_Selected )  //  Comment out since never display this info
                && ( ( ! reporterIonssSelectedsSet ) || ( reporterIonssSelectedsSet.size === 0 ) )
                && ( ! proteinPage_PSM_DistinctPeptide_CountFilter_HasValue )
            ) {

                // Nothing to display

                return null;  //  EARLY RETURN
            }

        }

        let selectedSearchSubGroupsList : Array<JSX.Element> = null;
        {
            const searchSubGroup_Are_All_SearchSubGroupIds_Selected = this.props.proteinFiltersDisplay_ComponentData.searchSubGroup_Are_All_SearchSubGroupIds_Selected;
            const searchSubGroup_PropValue = this.props.proteinFiltersDisplay_ComponentData.searchSubGroup_PropValue;

            if ( ( ! searchSubGroup_Are_All_SearchSubGroupIds_Selected ) && searchSubGroup_PropValue ) {  // searchSubGroup_PropValue may not be populated

                selectedSearchSubGroupsList = [];

                for ( const searchSubGroupEntry of searchSubGroup_PropValue.searchSubGroupEntryArray ) {
                    if ( ! searchSubGroupEntry.selectedEntry ) {
                        //  Not Selected so SKIP
                        continue;
                    }

                    const entry = (
                        <span key={ searchSubGroupEntry.searchSubGroup_Id } style={ { paddingRight: 10 } } >{ searchSubGroupEntry.subgroupName_Display }</span>
                    );

                    selectedSearchSubGroupsList.push( entry );
                }
            }
        }

        const AND_SEPARATOR_STRING = "AND"
        const OR_SEPARATOR_STRING = "OR"
        const NOT_SEPARATOR_STRING = "OR"

        let selection_AND_Group_Display_Entries : Array<JSX.Element> = new Array<JSX.Element>()  //  Will be set to undefined in next block if empty at end of block
        let selection_OR_Group_Display_Entries : Array<JSX.Element> = new Array<JSX.Element>()  //  Will be set to undefined in next block if empty at end of block
        let selection_NOT_Group_Display_Entries : Array<JSX.Element> = new Array<JSX.Element>()  //  Will be set to undefined in next block if empty at end of block

        let selection_NOT_UnModified_Variable_Mods_Selected = false;
        let selection_NOT_UnModified_Open_Mods_Selected = false;

        {
            const modificationMass_UserSelections_StateObject = this.props.proteinFiltersDisplay_ComponentData.modificationMass_UserSelections_StateObject;
            const variable_ModificationSelections_StateObject = modificationMass_UserSelections_StateObject.get_VariableModificationSelections()
            const open_ModificationSelections_StateObject = modificationMass_UserSelections_StateObject.get_OpenModificationSelections()

            //  Variable Mods
            if ( variable_ModificationSelections_StateObject.is_Any_Modification_Selected() ) {

                const no_Modification_SelectionEntry = variable_ModificationSelections_StateObject.get_NO_Modification_AKA_Unmodified_Selected()
                if ( no_Modification_SelectionEntry ) {
                    const key = "Var_NoMod"
                    const display = <span key={ key } style={ { whiteSpace: "nowrap" } }>no variable modification mass(es)</span>
                    if ( no_Modification_SelectionEntry.selectionType === SingleProtein_Filter_SelectionType.ANY ) {
                        _add_separatorLabel_IfNeeded_To__selection_Group_Display_Entries_Local({ separatorString : OR_SEPARATOR_STRING, selection_Group_Display_Entries_Local : selection_OR_Group_Display_Entries })
                        selection_OR_Group_Display_Entries.push( display )
                    } else if ( no_Modification_SelectionEntry.selectionType === SingleProtein_Filter_SelectionType.ALL ) {
                        _add_separatorLabel_IfNeeded_To__selection_Group_Display_Entries_Local({ separatorString: AND_SEPARATOR_STRING, selection_Group_Display_Entries_Local : selection_AND_Group_Display_Entries })
                        selection_AND_Group_Display_Entries.push( display )
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
                        _add_separatorLabel_IfNeeded_To__selection_Group_Display_Entries_Local({ separatorString : OR_SEPARATOR_STRING, selection_Group_Display_Entries_Local : selection_OR_Group_Display_Entries })
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
                        _add_separatorLabel_IfNeeded_To__selection_Group_Display_Entries_Local({ separatorString: AND_SEPARATOR_STRING, selection_Group_Display_Entries_Local: selection_AND_Group_Display_Entries})
                        const display = <span key={key} style={{whiteSpace: "nowrap"}}><span>Variable mod: </span><span> </span><span>{selectedModMass}</span></span>
                        selection_AND_Group_Display_Entries.push(display)
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
                        _add_separatorLabel_IfNeeded_To__selection_Group_Display_Entries_Local({ separatorString: NOT_SEPARATOR_STRING, selection_Group_Display_Entries_Local: selection_NOT_Group_Display_Entries})
                        const display = <span key={key} style={{whiteSpace: "nowrap"}}><span>Variable mod: </span><span> </span><span>{selectedModMass}</span></span>
                        selection_NOT_Group_Display_Entries.push(display)
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
                        _add_separatorLabel_IfNeeded_To__selection_Group_Display_Entries_Local({ separatorString : OR_SEPARATOR_STRING, selection_Group_Display_Entries_Local : selection_OR_Group_Display_Entries })
                        selection_OR_Group_Display_Entries.push( display )
                    } else if ( no_Modification_SelectionEntry.selectionType === SingleProtein_Filter_SelectionType.ALL ) {
                        _add_separatorLabel_IfNeeded_To__selection_Group_Display_Entries_Local({ separatorString: AND_SEPARATOR_STRING, selection_Group_Display_Entries_Local : selection_AND_Group_Display_Entries })
                        selection_AND_Group_Display_Entries.push( display )
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
                        _add_separatorLabel_IfNeeded_To__selection_Group_Display_Entries_Local({ separatorString : OR_SEPARATOR_STRING, selection_Group_Display_Entries_Local : selection_OR_Group_Display_Entries })
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
                        _add_separatorLabel_IfNeeded_To__selection_Group_Display_Entries_Local({ separatorString : AND_SEPARATOR_STRING, selection_Group_Display_Entries_Local: selection_AND_Group_Display_Entries })
                        const display = <span key={ key } style={{whiteSpace: "nowrap"}}><span>Open mod: </span><span> </span><span>{selectedModMass}</span></span>
                        selection_AND_Group_Display_Entries.push(display)
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
                        _add_separatorLabel_IfNeeded_To__selection_Group_Display_Entries_Local({ separatorString : NOT_SEPARATOR_STRING, selection_Group_Display_Entries_Local: selection_NOT_Group_Display_Entries })
                        const display = <span key={ key } style={{whiteSpace: "nowrap"}}><span>Open mod: </span><span> </span><span>{selectedModMass}</span></span>
                        selection_NOT_Group_Display_Entries.push(display)
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
                    selection_Group_Display_Entries_Local : selection_OR_Group_Display_Entries
                })

                _userSelectionDisplay_Add_Static_ModificationsFormatted_For_ANY_or_ALL({
                    staticModificationMassesToFilterOn_ANY_or_ALL :  selection_ALL,
                    seperatorString : AND_SEPARATOR_STRING,
                    selection_Group_Display_Entries_Local : selection_AND_Group_Display_Entries
                })

                _userSelectionDisplay_Add_Static_ModificationsFormatted_For_ANY_or_ALL({
                    staticModificationMassesToFilterOn_ANY_or_ALL :  selection_NOT,
                    seperatorString : NOT_SEPARATOR_STRING,
                    selection_Group_Display_Entries_Local : selection_NOT_Group_Display_Entries
                })
            }

            const reporterIonMass_UserSelections_StateObject = this.props.proteinFiltersDisplay_ComponentData.reporterIonMass_UserSelections_StateObject;

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
                        _add_separatorLabel_IfNeeded_To__selection_Group_Display_Entries_Local({ separatorString : OR_SEPARATOR_STRING, selection_Group_Display_Entries_Local : selection_OR_Group_Display_Entries })
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
                        _add_separatorLabel_IfNeeded_To__selection_Group_Display_Entries_Local({ separatorString : AND_SEPARATOR_STRING, selection_Group_Display_Entries_Local: selection_AND_Group_Display_Entries })
                        const display = <span key={ key } style={{whiteSpace: "nowrap"}}><span>Reporter ion: </span><span> </span><span>{selectedReporterIonMass}</span></span>
                        selection_AND_Group_Display_Entries.push(display)
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
                        _add_separatorLabel_IfNeeded_To__selection_Group_Display_Entries_Local({ separatorString : NOT_SEPARATOR_STRING, selection_Group_Display_Entries_Local: selection_NOT_Group_Display_Entries })
                        const display = <span key={ key } style={{whiteSpace: "nowrap"}}><span>Reporter ion: </span><span> </span><span>{selectedReporterIonMass}</span></span>
                        selection_NOT_Group_Display_Entries.push(display)
                    }
                }
            }

            if ( selection_OR_Group_Display_Entries.length === 1 && selection_AND_Group_Display_Entries.length > 0 ) {
                //  OR only has 1 entry so move to AND and delete OR
                _add_separatorLabel_IfNeeded_To__selection_Group_Display_Entries_Local({ separatorString : AND_SEPARATOR_STRING, selection_Group_Display_Entries_Local: selection_AND_Group_Display_Entries })
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
            if ( selection_NOT_Group_Display_Entries && selection_NOT_Group_Display_Entries.length === 0 ) {
                selection_NOT_Group_Display_Entries = undefined
            }
        }

        //  Comment out since never display this info

        // let is_Treat_Mass_0_As_Unmodified_Selected : boolean = false;
        //
        // if ( this.props.proteinFiltersDisplay_ComponentData.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
        //     && this.props.proteinFiltersDisplay_ComponentData.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.getTreatOpenModMassZeroAsUnmodified_Selection() ) {
        //     is_Treat_Mass_0_As_Unmodified_Selected = true;
        // }

        let proteinPage_PSM_CountFilter : number = undefined;
        let proteinPage_DistinctPeptide_CountFilter : number = undefined;
        let proteinPage_UniquePeptide_CountFilter : number = undefined;
        {
            //  Test here is ONLY for showing the specific value on the page.  The State Object value is tested above for whether or not to render the component

            if ( this.props.proteinFiltersDisplay_ComponentData.proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject ) {
                const proteinPage_PSM_CountFilter_Local = this.props.proteinFiltersDisplay_ComponentData.proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject.get_PSM_CountFilter();
                if ( proteinPage_PSM_CountFilter_Local !== undefined && proteinPage_PSM_CountFilter_Local !== null ) {
                    // Only display has value
                    proteinPage_PSM_CountFilter = proteinPage_PSM_CountFilter_Local
                }
            }
            if ( this.props.proteinFiltersDisplay_ComponentData.proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject ) {
                const proteinPage_DistinctPeptide_CountFilter_Local = this.props.proteinFiltersDisplay_ComponentData.proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject.get_Peptide_CountFilter();
                if ( proteinPage_DistinctPeptide_CountFilter_Local !== undefined && proteinPage_DistinctPeptide_CountFilter_Local !== null ) {
                    // Only display has value
                    proteinPage_DistinctPeptide_CountFilter = proteinPage_DistinctPeptide_CountFilter_Local
                }
            }
            if ( this.props.proteinFiltersDisplay_ComponentData.proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject ) {
                const proteinPage_UniquePeptide_CountFilter_Local = this.props.proteinFiltersDisplay_ComponentData.proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject.get_UniquePeptide_CountFilter();
                if ( proteinPage_UniquePeptide_CountFilter_Local !== undefined && proteinPage_UniquePeptide_CountFilter_Local !== null ) {
                    // Only display has value
                    proteinPage_UniquePeptide_CountFilter = proteinPage_UniquePeptide_CountFilter_Local
                }
            }
        }

        return (
            <React.Fragment>
                <div className="   ">
                    <span  style={ { fontSize: 18, fontWeight: "bold" } } >
                        Current filters:
                    </span>
                    <span> </span>
                    <span style={ { fontSize: 12, fontWeight: "normal" } } className="fake-link " onClick={ this._clearAllFiltersClickHandler_BindThis } >clear all</span>
                </div>
                <div className=" filter-common-selection-block  " style={ { marginTop: 4, marginBottom: 2, marginLeft: 6 } }>

                    { ( proteinPage_PSM_CountFilter !== undefined && proteinPage_PSM_CountFilter !== null ) ? (
                        <div >
                            <span>The protein must have least </span>
                            <span> </span>
                            <span>{ proteinPage_PSM_CountFilter }</span>
                            <span> </span>
                            <span>PSM</span>
                            { ( proteinPage_PSM_CountFilter > 1 ) ? ( // Make "PSM" plural to "PSMs"
                                <span>s</span>
                            ) : null }
                            <span> </span>
                            <span>
                                in at least one search or condition
                            </span>
                        </div>
                    ) : null }

                    { ( proteinPage_DistinctPeptide_CountFilter !== undefined && proteinPage_DistinctPeptide_CountFilter !== null ) ? (
                        <div >
                            <span>The protein must have least </span>
                            <span> </span>
                            <span>{ proteinPage_DistinctPeptide_CountFilter }</span>
                            <span> </span>
                            <span>distinct peptide</span>
                            { ( proteinPage_DistinctPeptide_CountFilter > 1 ) ? ( // Make "peptide" plural to "peptides"
                                <span>s</span>
                            ) : null }
                            <span> </span>
                            <span>
                                in at least one search or condition
                            </span>
                        </div>
                    ) : null }

                    { ( proteinPage_UniquePeptide_CountFilter !== undefined && proteinPage_UniquePeptide_CountFilter !== null ) ? (
                        <div >
                            <span>The protein must have least </span>
                            <span> </span>
                            <span>{ proteinPage_UniquePeptide_CountFilter }</span>
                            <span> </span>
                            <span>unique peptide</span>
                            { ( proteinPage_UniquePeptide_CountFilter > 1 ) ? ( // Make "peptide" plural to "PSMs"
                                <span>s</span>
                            ) : null }
                            <span> </span>
                            <span>
                                in at least one search or condition
                            </span>
                        </div>
                    ) : null }

                    { ( selectedSearchSubGroupsList ) ?
                        <div>
                            Filter on Sub Groups: { selectedSearchSubGroupsList }
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

                      {/*  Comment out since never display this info  */}
                    {/*{ ( is_Treat_Mass_0_As_Unmodified_Selected ) ?*/}
                    {/*    <div >*/}
                    {/*        <span style={{whiteSpace: "nowrap"}}>{"Do not treat open modification masses that round to 0 (0.5 <= mass < 0.5) as open modifications."}</span>*/}
                    {/*    </div>*/}
                    {/*    : null / * Display nothing * / }*/}

                </div>
            </React.Fragment>
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
    selection_Group_Display_Entries_Local : Array<JSX.Element>
}) : void {
    if ( selection_Group_Display_Entries_Local.length > 0 ) {
        const key = separatorString + "_Seperator_" + selection_Group_Display_Entries_Local.length
        const entry = <span key={ key } ><span > </span><span>{ separatorString }</span><span> </span></span>
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



/**
 *
 */
class ProteinPositionFilter_UserSelections_Component_SelectionDisplay_Entry {

    proteinSequenceVersionId : number
    proteinName : string
    proteinName_Truncated : string
    proteinDescription : string
    proteinPosition_Start : number
    proteinPosition_End : number
    proteinFullLengthSelected : boolean
}
