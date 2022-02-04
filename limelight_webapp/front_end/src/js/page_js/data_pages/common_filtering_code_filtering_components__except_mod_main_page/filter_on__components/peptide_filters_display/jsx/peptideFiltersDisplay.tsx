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

import { PeptideFiltersDisplay_ComponentData } from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/peptide_filters_display/js/peptideFiltersDisplay_ComponentData'
import {SingleProtein_Filter_SelectionType} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinPage_SingleProtein_Filter_Enums";
import {ProteinPositionFilter_UserInput__Component__ProteinData_SingleProtein} from "page_js/data_pages/common_components__react/protein_position_filter_component__not_single_protein/protein_position_filter__user_input_component/proteinPositionFilter_UserInput__Component__ProteinData";
import {DataPage_common_Data_Holder_Holder_SingleSearch_SearchScanFileDataForSingleSearchScanFileId} from "page_js/data_pages/data_pages_common/search_scan_file_data__scan_file_data/dataPage_common_Data_Holder_SearchScanFileData_Data";





const _PROTEIN_NAME_TRUNCATION = 20;

/**
 * 
 */
export type PeptideFiltersDisplay_clearAllFiltersClickHandler = () => void;

/**
 * 
 */
export interface PeptideFiltersDisplay_Props {

    peptideFiltersDisplay_ComponentData : PeptideFiltersDisplay_ComponentData;

    //  All called clearAllFiltersClickHandler  has been modified to NOT clear ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
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

            //  searchSubGroup properties not always populated
            const searchSubGroup_Are_All_SearchSubGroupIds_Selected = this.props.peptideFiltersDisplay_ComponentData.searchSubGroup_Are_All_SearchSubGroupIds_Selected;
            // const searchSubGroup_PropValue = this.props.peptideFiltersDisplay_ComponentData.searchSubGroup_PropValue;

            let selectedProteinSequencePositionsSet : Set<number> = undefined;

            if ( this.props.peptideFiltersDisplay_ComponentData.proteinSequenceWidget_StateObject ) {
                selectedProteinSequencePositionsSet = this.props.peptideFiltersDisplay_ComponentData.proteinSequenceWidget_StateObject.get_selectedProteinSequencePositions();
            }

            const modificationMass_UserSelections_StateObject = this.props.peptideFiltersDisplay_ComponentData.modificationMass_UserSelections_StateObject;

            const is_Any_VariableModification_Selected = modificationMass_UserSelections_StateObject.get_VariableModificationSelections().is_Any_Modification_Selected();
            const is_Any_OpenModification_Selected = modificationMass_UserSelections_StateObject.get_OpenModificationSelections().is_Any_Modification_Selected();
            const is_Any_StaticModification_Selected = modificationMass_UserSelections_StateObject.is_Any_StaticModification_Selected();

            //  Comment out since never display this info

            // let is_Treat_Mass_0_As_Unmodified_Selected = false;

            // if ( this.props.peptideFiltersDisplay_ComponentData.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
            //     && this.props.peptideFiltersDisplay_ComponentData.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.getTreatOpenModMassZeroAsUnmodified_Selection() ) {
            //     is_Treat_Mass_0_As_Unmodified_Selected = true;
            // }

            const reporterIonssSelectedsSet = this.props.peptideFiltersDisplay_ComponentData.reporterIonMass_UserSelections_StateObject.get_ReporterIonssSelected_MassesOnly_AsSet();

            let is_ScanFilenameId_Filter_AllSelected = false;
            if ( this.props.peptideFiltersDisplay_ComponentData.scanFilenameId_On_PSM_Filter_UserSelection_StateObject ) {
                if (this.props.peptideFiltersDisplay_ComponentData.scanFilenameId_On_PSM_Filter_UserSelection_StateObject.areAllSelected__scanFilenameIds()) {
                    is_ScanFilenameId_Filter_AllSelected = true;
                }
            }

            let is_any_scan_RetentionTime_MZ_FilterValue = false;
            if ( this.props.peptideFiltersDisplay_ComponentData.scan_RetentionTime_MZ_UserSelections_StateObject ) {
                if (this.props.peptideFiltersDisplay_ComponentData.scan_RetentionTime_MZ_UserSelections_StateObject.is_Any_FilterHaveValue()) {
                    is_any_scan_RetentionTime_MZ_FilterValue = true;
                }
            }

            let peptideUniqueSelected = false;
            if ( this.props.peptideFiltersDisplay_ComponentData.peptideUnique_UserSelection_StateObject ) {
                peptideUniqueSelected = this.props.peptideFiltersDisplay_ComponentData.peptideUnique_UserSelection_StateObject.getPeptideUnique();
            }

            const peptideSearchString = this.props.peptideFiltersDisplay_ComponentData.peptideSequence_UserSelections_StateObject.getPeptideSearchString();

            let isAny_proteinPositionFilterSelections = false;
            if ( this.props.peptideFiltersDisplay_ComponentData.proteinPositionFilter_UserSelections_StateObject ) {
                isAny_proteinPositionFilterSelections = this.props.peptideFiltersDisplay_ComponentData.proteinPositionFilter_UserSelections_StateObject.isAnySelections();
            }

            let peptidePage_PSM_CountFilter_HasValue = false;
            {
                //  Test here is ONLY for whether or not to render the component.  The State Object value is tested again below for showing the specific value on the page

                if ( this.props.peptideFiltersDisplay_ComponentData.peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject ) {
                    const peptidePage_PSM_CountFilter_Local = this.props.peptideFiltersDisplay_ComponentData.peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject.get_PSM_CountFilter();
                    if ( peptidePage_PSM_CountFilter_Local !== undefined && peptidePage_PSM_CountFilter_Local !== null ) {
                        // Only display has value
                        peptidePage_PSM_CountFilter_HasValue = true
                    }
                }
            }

            if ( ( searchSubGroup_Are_All_SearchSubGroupIds_Selected )
                && ( ( ! selectedProteinSequencePositionsSet ) || ( selectedProteinSequencePositionsSet.size === 0 ) )
                && ( ! is_Any_VariableModification_Selected )
                && ( ! is_Any_OpenModification_Selected )
                && ( ! is_Any_StaticModification_Selected )
                // && ( ! is_Treat_Mass_0_As_Unmodified_Selected )  //  Comment out since never display this info
                && ( ( ! reporterIonssSelectedsSet ) || ( reporterIonssSelectedsSet.size === 0 ) )
                && ( is_ScanFilenameId_Filter_AllSelected )  //  If 'All' selected then do nothing
                && ( ! is_any_scan_RetentionTime_MZ_FilterValue )
                && ( ! peptideUniqueSelected )
                && ( ! peptideSearchString )
                && ( ! isAny_proteinPositionFilterSelections )
                && ( ! peptidePage_PSM_CountFilter_HasValue )
            ) {

                // Nothing to display

                return null;  //  EARLY RETURN
            }

        }

        let selectedSearchSubGroupsList : Array<JSX.Element> = null;
        {
            const searchSubGroup_Are_All_SearchSubGroupIds_Selected = this.props.peptideFiltersDisplay_ComponentData.searchSubGroup_Are_All_SearchSubGroupIds_Selected;
            const searchSubGroup_PropValue = this.props.peptideFiltersDisplay_ComponentData.searchSubGroup_PropValue;

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

        let selectedProteinSequencePositions_DisplayString : string = undefined;

        {
            if ( this.props.peptideFiltersDisplay_ComponentData.proteinSequenceWidget_StateObject ) {
                const selectedProteinSequencePositionsSet = this.props.peptideFiltersDisplay_ComponentData.proteinSequenceWidget_StateObject.get_selectedProteinSequencePositions();

                if ( selectedProteinSequencePositionsSet && ( selectedProteinSequencePositionsSet.size !== 0 ) ) {

                    const selectedProteinSequencePositionsArray = Array.from( selectedProteinSequencePositionsSet );
                    selectedProteinSequencePositionsArray.sort();

                    selectedProteinSequencePositions_DisplayString = _userSelectionDisplay_CombineArrayIntoFormattedString({ array : selectedProteinSequencePositionsArray });
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

        let is_Treat_Mass_0_As_Unmodified_Selected : boolean = false;

        //  Comment out since never display this info
        // if ( this.props.peptideFiltersDisplay_ComponentData.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
        //     && this.props.peptideFiltersDisplay_ComponentData.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.getTreatOpenModMassZeroAsUnmodified_Selection() ) {
        //     is_Treat_Mass_0_As_Unmodified_Selected = true;
        // }


        let scan_Filenames_Selected : JSX.Element = null;
        {
            const scanFilenameId_On_PSM_Filter_UserSelection_StateObject = this.props.peptideFiltersDisplay_ComponentData.scanFilenameId_On_PSM_Filter_UserSelection_StateObject;

            if ( scanFilenameId_On_PSM_Filter_UserSelection_StateObject ) {

                if ( ! scanFilenameId_On_PSM_Filter_UserSelection_StateObject.areAllSelected__scanFilenameIds() ) {

                    if ( this.props.peptideFiltersDisplay_ComponentData.dataPage_common_Data_Holder_Holder_SearchScanFileData_Root ) {

                        const scanFilenameIds_Selected = scanFilenameId_On_PSM_Filter_UserSelection_StateObject.get__scanFilenameIds_Selected();

                        if ( scanFilenameIds_Selected.size === 0 ) {

                            scan_Filenames_Selected = (
                                <div key={ "none-selected-message" }>
                                    Not showing data from any scan filename
                                </div>
                            )

                        } else {

                            const searchScanFileDataEntries: Array<DataPage_common_Data_Holder_Holder_SingleSearch_SearchScanFileDataForSingleSearchScanFileId> = [];

                            for ( const scanFilenameId of scanFilenameIds_Selected ) {
                                for ( const data_Holder_Holder_SingleSearch_SearchScanFileData of this.props.peptideFiltersDisplay_ComponentData.dataPage_common_Data_Holder_Holder_SearchScanFileData_Root.get_DataPage_common_Data_Holder_Holder_SingleSearch_SearchScanFileData_IterableIterator() ) {
                                    const searchScanFileData = data_Holder_Holder_SingleSearch_SearchScanFileData.get_SearchScanFileDataFor_SearchScanFileId(scanFilenameId);
                                    if (searchScanFileData) {
                                        searchScanFileDataEntries.push(searchScanFileData);
                                    }
                                }
                            }
                            if ( searchScanFileDataEntries.length > 0 ) {

                                searchScanFileDataEntries.sort( (a, b) => {
                                    return a.filename.localeCompare(b.filename)
                                })


                                let scan_Filename_Entries_Elements : Array<JSX.Element> = [];

                                let firstEntry = true;
                                for ( const searchScanFileDataEntry of searchScanFileDataEntries ) {

                                    if ( ! firstEntry ) {
                                        // Not first entry so add ' and ' separator
                                        const and_Separator = (
                                            <span key={ searchScanFileDataEntry.searchScanFileId + "_AND" }> and </span>
                                        );
                                        scan_Filename_Entries_Elements.push(and_Separator);
                                    }

                                    const scan_Filename_Selected = (
                                        <span key={ searchScanFileDataEntry.searchScanFileId }>
                                            { searchScanFileDataEntry.filename }
                                        </span>
                                    )
                                    scan_Filename_Entries_Elements.push(scan_Filename_Selected);

                                    firstEntry = false;  // Clear first entry flag
                                }

                                scan_Filenames_Selected = (
                                    <div key={ "scan_Filename_Entries_Elements" }>
                                        <span>
                                            Only showing data from scan file
                                        </span>
                                        {( searchScanFileDataEntries.length > 1 ) ? (
                                            //  Make 'file' plural to 'files'
                                            <span>s</span>
                                        ) : null }
                                        <span> </span>
                                        { scan_Filename_Entries_Elements }
                                    </div>
                                )
                            }
                        }
                    }
                }
            }
        }

        let scan_RetentionTimes_PrecursorMZ_Selected : Array<JSX.Element> = undefined;
        {
            const scan_RetentionTime_MZ_UserSelections_StateObject = this.props.peptideFiltersDisplay_ComponentData.scan_RetentionTime_MZ_UserSelections_StateObject

            if ( scan_RetentionTime_MZ_UserSelections_StateObject && scan_RetentionTime_MZ_UserSelections_StateObject.is_Any_FilterHaveValue() ) {

                scan_RetentionTimes_PrecursorMZ_Selected = [];

                const retentionTime_InMinutes__From__Filter = scan_RetentionTime_MZ_UserSelections_StateObject.get_retentionTime_InMinutes__From__Filter();
                const retentionTime_InMinutes__To__Filter = scan_RetentionTime_MZ_UserSelections_StateObject.get_retentionTime_InMinutes__To__Filter();
                const mz__From__Filter = scan_RetentionTime_MZ_UserSelections_StateObject.get_mz__From__Filter();
                const mz__To__Filter = scan_RetentionTime_MZ_UserSelections_StateObject.get_mz__To__Filter();

                //  Retention Time filter

                if ( retentionTime_InMinutes__From__Filter !== undefined && retentionTime_InMinutes__From__Filter !== null
                    && retentionTime_InMinutes__To__Filter !== undefined && retentionTime_InMinutes__To__Filter !== null ) {

                    const filterEntry = (
                        <div key="RetentionTime__From_To">
                            <span>Only showing data with Retention Time between </span>
                            <span>{ retentionTime_InMinutes__From__Filter }</span>
                            <span> and </span>
                            <span>{ retentionTime_InMinutes__To__Filter }</span>
                            <span> minutes</span>
                        </div>
                    )

                    scan_RetentionTimes_PrecursorMZ_Selected.push( filterEntry );

                } else if ( retentionTime_InMinutes__From__Filter !== undefined && retentionTime_InMinutes__From__Filter !== null ) {

                    const filterEntry = (
                        <div key="RetentionTime__From">
                            <span>Only showing data with Retention Time </span>
                            <span>{ retentionTime_InMinutes__From__Filter }</span>
                            <span> minutes or more</span>
                        </div>
                    )

                    scan_RetentionTimes_PrecursorMZ_Selected.push( filterEntry );

                } else if ( retentionTime_InMinutes__To__Filter !== undefined && retentionTime_InMinutes__To__Filter !== null ) {

                    const filterEntry = (
                        <div key="RetentionTime__To">
                            <span>Only showing data with Retention Time </span>
                            <span>{ retentionTime_InMinutes__To__Filter }</span>
                            <span> minutes or less</span>
                        </div>
                    )

                    scan_RetentionTimes_PrecursorMZ_Selected.push( filterEntry );
                }

                //  M/Z filter

                if ( mz__From__Filter !== undefined && mz__From__Filter !== null
                    && mz__To__Filter !== undefined && mz__To__Filter !== null ) {

                    const filterEntry = (
                        <div key="mz__From_To">
                            <span>Only showing data with m/z between </span>
                            <span>{ mz__From__Filter }</span>
                            <span> and </span>
                            <span>{ mz__To__Filter }</span>
                        </div>
                    )

                    scan_RetentionTimes_PrecursorMZ_Selected.push( filterEntry );

                } else if ( mz__From__Filter !== undefined && mz__From__Filter !== null ) {

                    const filterEntry = (
                        <div key="mz__From">
                            <span>Only showing data with m/z </span>
                            <span>{ mz__From__Filter }</span>
                            <span> or more</span>
                        </div>
                    )

                    scan_RetentionTimes_PrecursorMZ_Selected.push( filterEntry );

                } else if ( mz__To__Filter !== undefined && mz__To__Filter !== null ) {

                    const filterEntry = (
                        <div key="RetentionTime__To">
                            <span>Only showing data with m/z </span>
                            <span>{ mz__To__Filter }</span>
                            <span> or less</span>
                        </div>
                    )

                    scan_RetentionTimes_PrecursorMZ_Selected.push( filterEntry );
                }
            }
        }

        let peptideUniqueSelected : boolean = false;

        if ( this.props.peptideFiltersDisplay_ComponentData.peptideUnique_UserSelection_StateObject ) {
            peptideUniqueSelected = this.props.peptideFiltersDisplay_ComponentData.peptideUnique_UserSelection_StateObject.getPeptideUnique();
        }

        let peptideSequenceSearchStrings_DisplayString : string = undefined;
        {
            peptideSequenceSearchStrings_DisplayString = this.props.peptideFiltersDisplay_ComponentData.peptideSequence_UserSelections_StateObject.getPeptideSearchString();
        }

        let proteinPositionFilter_JSX : JSX.Element = null;
        if ( this.props.peptideFiltersDisplay_ComponentData.proteinPositionFilter_UserSelections_StateObject
            && this.props.peptideFiltersDisplay_ComponentData.proteinPositionFilter_UserSelections_StateObject.isAnySelections() ) {

            if ( ! this.props.peptideFiltersDisplay_ComponentData.proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data ) {
                const msg = "this.props.peptideFiltersDisplay_ComponentData.proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data not populated when this.props.peptideFiltersDisplay_ComponentData.proteinPositionFilter_UserSelections_StateObject is populated";
                console.warn( msg )
                throw Error( msg );
            }

            const proteinPosition_SelectionDisplay_Entries : Array<ProteinPositionFilter_UserSelections_Component_SelectionDisplay_Entry> = [];

            const selections_Ranges = this.props.peptideFiltersDisplay_ComponentData.proteinPositionFilter_UserSelections_StateObject.getSelections_Ranges();

            for ( const mapEntry of selections_Ranges.entriesMap_Key_proteinSequenceVersionId.entries() ) {
                const per_proteinSequenceVersionId_Entry  = mapEntry[ 1 ];
                const proteinSequenceVersionId = per_proteinSequenceVersionId_Entry.proteinSequenceVersionId

                let proteins_Names_LengthsData: ProteinPositionFilter_UserInput__Component__ProteinData_SingleProtein = undefined;
                for ( const protein of
                    this.props.peptideFiltersDisplay_ComponentData.proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data.
                        proteinPositionFilter_UserInput__Component__ProteinData_Root.proteins ) {
                    if ( protein.proteinSequenceVersionId === proteinSequenceVersionId ) {
                        proteins_Names_LengthsData = protein;
                        break;
                    }
                }

                if ( ! proteins_Names_LengthsData ) {
                    const msg = " nothing in proteins_Names_LengthsData for proteinSequenceVersionId: " + proteinSequenceVersionId;
                    console.warn( msg, proteinSequenceVersionId )
                    throw Error( msg + proteinSequenceVersionId )
                }

                const proteinName_Truncated = proteins_Names_LengthsData.proteinName.substring( 0, _PROTEIN_NAME_TRUNCATION );


                if ( per_proteinSequenceVersionId_Entry.fullProteinSelected ){
                    const resultEntry: ProteinPositionFilter_UserSelections_Component_SelectionDisplay_Entry = {
                        proteinSequenceVersionId,
                        proteinName: proteins_Names_LengthsData.proteinName,
                        proteinName_Truncated: proteinName_Truncated,
                        proteinDescription: proteins_Names_LengthsData.proteinDescription,
                        proteinPosition_Start: 1,
                        proteinPosition_End: proteins_Names_LengthsData.proteinLength,
                        proteinFullLengthSelected : true
                    }
                    proteinPosition_SelectionDisplay_Entries.push(resultEntry);
                }

                if ( per_proteinSequenceVersionId_Entry.rangeEntries && per_proteinSequenceVersionId_Entry.rangeEntries.length > 0 ) {
                    for (const entry_For_ProteinSequenceVersionId of per_proteinSequenceVersionId_Entry.rangeEntries) {
                        let proteinFullLengthSelected = false;
                        if (entry_For_ProteinSequenceVersionId.proteinPosition_Start === 1 && entry_For_ProteinSequenceVersionId.proteinPosition_End === proteins_Names_LengthsData.proteinLength) {
                            proteinFullLengthSelected = true;
                        }
                        const resultEntry: ProteinPositionFilter_UserSelections_Component_SelectionDisplay_Entry = {
                            proteinSequenceVersionId,
                            proteinName: proteins_Names_LengthsData.proteinName,
                            proteinName_Truncated: proteinName_Truncated,
                            proteinDescription: proteins_Names_LengthsData.proteinDescription,
                            proteinPosition_Start: entry_For_ProteinSequenceVersionId.proteinPosition_Start,
                            proteinPosition_End: entry_For_ProteinSequenceVersionId.proteinPosition_End,
                            proteinFullLengthSelected
                        }
                        proteinPosition_SelectionDisplay_Entries.push(resultEntry);
                    }
                }
            }
            proteinPosition_SelectionDisplay_Entries.sort( (a,b) => {
                if ( a.proteinName < b.proteinName ) {
                    return -1;
                }
                if ( a.proteinName > b.proteinName ) {
                    return 1;
                }
                if ( a.proteinSequenceVersionId < b.proteinSequenceVersionId ) {
                    return -1;
                }
                if ( a.proteinSequenceVersionId > b.proteinSequenceVersionId ) {
                    return 1;
                }
                if ( a.proteinPosition_Start < b.proteinPosition_Start ) {
                    return -1;
                }
                if ( a.proteinPosition_Start > b.proteinPosition_Start ) {
                    return 1;
                }
                return 0;
            });

            const proteinPositionFilter_JSX_Entries : Array<JSX.Element> = [];
            {
                let index = 0;
                for (const proteinPosition_SelectionDisplay_Entry of proteinPosition_SelectionDisplay_Entries) {

                    let orSeparator : JSX.Element = null;
                    if ( index !== 0 ) {
                        //  Add separator "OR"
                        const separatorKey = "separator_" + index;
                        orSeparator = (
                            <span style={ { whiteSpace: "nowrap" } }>
                                {/* <span>&nbsp;</span> remove since each entry has trailing space */}
                                <span key={ separatorKey } >
                                    OR
                                </span>
                                <span>&nbsp;</span>
                            </span>
                        );
                    }

                    const proteinNameTitle = proteinPosition_SelectionDisplay_Entry.proteinName + "\n\n" + proteinPosition_SelectionDisplay_Entry.proteinDescription;

                    if ( proteinPosition_SelectionDisplay_Entry.proteinFullLengthSelected ) {
                        const rootElement_Key = proteinPosition_SelectionDisplay_Entry.proteinSequenceVersionId
                        const jsx = (
                            <span key={ rootElement_Key }>
                                <span style={ { whiteSpace: "nowrap" } }>

                                    { orSeparator } {/* Populated for all entries after the first one */}

                                    <span>
                                        Any position in&nbsp;
                                    </span>
                                    <span title={ proteinNameTitle }>
                                        { proteinPosition_SelectionDisplay_Entry.proteinName_Truncated }
                                    </span>
                                </span>
                                <span> </span>  {/* Empty span to allow line breaks */}
                            </span>
                        )
                        proteinPositionFilter_JSX_Entries.push( jsx );
                    } else {
                        const rootElement_Key = proteinPosition_SelectionDisplay_Entry.proteinSequenceVersionId + "_" + proteinPosition_SelectionDisplay_Entry.proteinPosition_Start;
                        const rootElement_SpanAfter_Key = proteinPosition_SelectionDisplay_Entry.proteinSequenceVersionId + "_" + proteinPosition_SelectionDisplay_Entry.proteinPosition_Start + "_SpanAfter";
                        const jsx = (
                            <span key={ rootElement_Key }>
                                <span style={ { whiteSpace: "nowrap" } }>

                                    { orSeparator } {/* Populated for all entries after the first one */}

                                    <span>
                                        Any position from&nbsp;
                                        { proteinPosition_SelectionDisplay_Entry.proteinPosition_Start }
                                        &nbsp;to&nbsp;
                                        { proteinPosition_SelectionDisplay_Entry.proteinPosition_End }
                                        &nbsp;in
                                    </span>
                                    <span>
                                        &nbsp;
                                    </span>
                                    <span title={ proteinNameTitle }>
                                        { proteinPosition_SelectionDisplay_Entry.proteinName_Truncated }
                                    </span>
                                </span>
                                <span key={ rootElement_SpanAfter_Key }> </span>  {/* Empty span to allow line breaks */}
                            </span>
                        )
                        proteinPositionFilter_JSX_Entries.push( jsx );
                    }
                    index++;
                }
            }

            proteinPositionFilter_JSX = (
                <div >
                    All peptides must cover: { proteinPositionFilter_JSX_Entries }
                </div>
            )
        }

        let peptidePage_PSM_CountFilter : number = undefined;
        {
            //  Test here is ONLY for showing the specific value on the page.  The State Object value is tested above for whether or not to render the component

            if ( this.props.peptideFiltersDisplay_ComponentData.peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject ) {
                const peptidePage_PSM_CountFilter_Local = this.props.peptideFiltersDisplay_ComponentData.peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject.get_PSM_CountFilter();
                if ( peptidePage_PSM_CountFilter_Local !== undefined && peptidePage_PSM_CountFilter_Local !== null ) {
                    // Only display has value
                    peptidePage_PSM_CountFilter = peptidePage_PSM_CountFilter_Local
                }
            }
        }

        return (
            <React.Fragment>
                <div className="  filter-common-filter-label ">
                    <span  style={ { fontWeight: "bold" } } >
                        Current filters:
                    </span>
                    <span> </span>
                    <span style={ { fontSize: 12, fontWeight: "normal" } } className="fake-link " onClick={ this._clearAllFiltersClickHandler_BindThis } >clear all</span>
                </div>
                <div className=" filter-common-selection-block  " style={ { marginTop: 4, marginBottom: 10, marginLeft: 6 } }>

                    { ( peptidePage_PSM_CountFilter !== undefined && peptidePage_PSM_CountFilter !== null ) ? (
                        <div >
                            <span>The peptide must have least </span>
                            <span> </span>
                            <span>{ peptidePage_PSM_CountFilter }</span>
                            <span> </span>
                            <span>PSM</span>
                            { ( peptidePage_PSM_CountFilter > 1 ) ? ( // Make "PSM" plural to "PSMs"
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
                            { ( selectedSearchSubGroupsList.length === 0 ) ? (
                                <span>
                                    Not showing data from any sub search
                                </span>
                            ) : (
                                <React.Fragment>
                                    <span>Filter on Sub Search: </span>
                                    { selectedSearchSubGroupsList }
                                </React.Fragment>
                            )}
                        </div>
                        : null /* Display nothing */ }

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

                    { ( scan_Filenames_Selected ) ? (

                        scan_Filenames_Selected

                    ) : null }

                    { ( scan_RetentionTimes_PrecursorMZ_Selected ) ? (

                        scan_RetentionTimes_PrecursorMZ_Selected

                    ) : null }

                    { ( peptideUniqueSelected ) ?
                        <div >
                            <span style={{whiteSpace: "nowrap"}}>Peptides must be Unique</span>
                        </div>
                        : null /* Display nothing */ }

                    { ( peptideSequenceSearchStrings_DisplayString ) ?
                        <div >
                            <span style={{whiteSpace: "nowrap"}}>Peptide sequences must contain: </span> <span>{ peptideSequenceSearchStrings_DisplayString }</span>
                        </div>
                        : null /* Display nothing */
                    }

                    { ( proteinPositionFilter_JSX ) ?
                        <div>
                            { proteinPositionFilter_JSX }
                        </div>
                        : null /* Display nothing */
                    }

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
