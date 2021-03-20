/**
 * modificationMass_UserSelections_DisplayMassSelectionOverlay.ts
 * 
 * Variable or Open Modification Mass Selection - Overlay for Large number of Modification masses
 * 
 * Re-uses Selection from Project Search based code for Large number of Modification masses
 *
 */

//   Modification Mass Rounding to provide some level of commonality between searches
import {modificationMass_CommonRounding_ReturnNumber_Function} from 'page_js/data_pages/modification_mass_common/modification_mass_rounding';

import {ProteinViewPage_LoadedDataPerProjectSearchIdHolder} from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';


import {ModificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject} from './modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject';
import {
    get_ModificationMass_UserSelections_DisplayMassSelectionOverlay_Layout,
    ModificationMass_UserSelections_DisplayMassSelectionOverlay_OuterContainer_Component__Callback_updateSelectedMods,
    ModificationMass_UserSelections_DisplayMassSelectionOverlay_OuterContainer_Component__Callback_updateSelectedMods_Params
} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/modification_mass_user_selections/jsx/modificationMass_UserSelections_DisplayMassSelectionOverlay_Layout";
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
import {
    ModificationMass_UserSelections_ModMasses_PSM_Counts_PerMass,
    ModificationMass_UserSelections_ModMasses_PSM_Counts_PerMass_Result
} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/modification_mass_user_selections/js/modificationMass_UserSelections_ModMasses_PSM_Counts_PerMass";
import {SingleProtein_Filter_SelectionType} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinPage_SingleProtein_Filter_Enums";

//  Modal Dialog for selecting mod masses when count > _MAX_MODS_DISPLAY_NON_SELECTED

/**
 *
 */
export class ModificationMass_UserSelections_DisplayMassSelectionOverlay {

    //  Exactly 1 of following has to be true
    private _variable_Modifications_DISPLAY : boolean
    private _open_Modifications_DISPLAY : boolean

    private _remove_ModalOverlay_BindThis = this._remove_ModalOverlay.bind(this);
    private _updateSelectedMods_BindThis = this._updateSelectedMods.bind(this);

    private _DO_NOT_CALL() {
        const updateSelectedMods : ModificationMass_UserSelections_DisplayMassSelectionOverlay_OuterContainer_Component__Callback_updateSelectedMods = this._updateSelectedMods
    }

    private _proteinNames : string  //  Not populated on Peptide page
    private _proteinDescriptions : string  //  Not populated on Peptide page

    private _modificationSelectionChanged_Callback : () => void;

    private _modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject : ModificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject;
    private _proteinSequenceVersionId : number  //  Not populated on Peptide page
    private _projectSearchIds : Array<number> 
    private _loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>
    private _modificationMass_CommonRounding_ReturnNumber : modificationMass_CommonRounding_ReturnNumber_Function // Always passed for Experiment - Made a parameter to make easier to copy this code for Protein Page Single Search

    private _modMassOverlay_AddedTo_DocumentBody_Holder : Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF;

	/**
	 * 
	 */
	constructor(
	    {
            variable_Modifications_DISPLAY,
            open_Modifications_DISPLAY,
            modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject,
            proteinNames,  //  Not populated on Peptide page
            proteinDescriptions,  //  Not populated on Peptide page
            proteinSequenceVersionId,  //  Not populated on Peptide page
            projectSearchIds,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            modificationMass_CommonRounding_ReturnNumber,
            modificationSelectionChanged_Callback
        } : {
            variable_Modifications_DISPLAY : boolean
            open_Modifications_DISPLAY : boolean
            modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject : ModificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject,
            proteinNames : string  //  Not populated on Peptide page
            proteinDescriptions : string  //  Not populated on Peptide page
            proteinSequenceVersionId : number,  //  Not populated on Peptide page
            projectSearchIds : Array<number>,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>,
            modificationMass_CommonRounding_ReturnNumber : modificationMass_CommonRounding_ReturnNumber_Function // Always passed for Experiment - Made a parameter to make easier to copy this code for Protein Page Single Search
            modificationSelectionChanged_Callback : () => void
        }) {

        if ( variable_Modifications_DISPLAY && open_Modifications_DISPLAY ) {
            const msg = "Cannot BOTH be true: variable_Modifications_DISPLAY && open_Modifications_DISPLAY"
            console.warn( msg )
            throw Error( msg )
        }
        if ( ( ! variable_Modifications_DISPLAY )  && ( ! open_Modifications_DISPLAY ) ) {
            const msg = "Cannot BOTH be false: variable_Modifications_DISPLAY && open_Modifications_DISPLAY"
            console.warn( msg )
            throw Error( msg )
        }
        if ( ! modificationSelectionChanged_Callback ) {
            const msg = "ModificationMass_UserSelections_DisplayMassSelectionOverlay: constructor: Invalid: modificationSelectionChanged_Callback not populated ";
            console.warn( msg );
            throw Error( msg );
        }
        this._variable_Modifications_DISPLAY = variable_Modifications_DISPLAY;
        this._open_Modifications_DISPLAY = open_Modifications_DISPLAY;

        this._modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject = modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject;

        this._proteinNames = proteinNames;
        this._proteinDescriptions = proteinDescriptions;
        this._modificationSelectionChanged_Callback = modificationSelectionChanged_Callback;

        this._proteinSequenceVersionId = proteinSequenceVersionId
        this._projectSearchIds = projectSearchIds
        this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds;
        this._modificationMass_CommonRounding_ReturnNumber = modificationMass_CommonRounding_ReturnNumber;
    
    }

	/**
	 * Display Dialog for "Change Mods"
	 */
    showModificationMassSelectionDialog() : void {

        let modUniqueMassesWithTheirPsmCountsArray : ModificationMass_UserSelections_ModMasses_PSM_Counts_PerMass_Result = undefined

        if ( this._variable_Modifications_DISPLAY ) {

            modUniqueMassesWithTheirPsmCountsArray =
                ModificationMass_UserSelections_ModMasses_PSM_Counts_PerMass.createModsAndPsmCountsList_VariableModifications({
                    proteinSequenceVersionId: this._proteinSequenceVersionId,  //  Not populated on Peptide page
                    projectSearchIds: this._projectSearchIds,
                    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds: this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                    modificationMass_CommonRounding_ReturnNumber: this._modificationMass_CommonRounding_ReturnNumber
                });

        } else if ( this._open_Modifications_DISPLAY ) {

            modUniqueMassesWithTheirPsmCountsArray =
                ModificationMass_UserSelections_ModMasses_PSM_Counts_PerMass.createModsAndPsmCountsList_OpenModifications({
                    proteinSequenceVersionId: this._proteinSequenceVersionId,  //  Not populated on Peptide page
                    projectSearchIds: this._projectSearchIds,
                    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds: this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                    modificationMass_CommonRounding_ReturnNumber: this._modificationMass_CommonRounding_ReturnNumber
                });

        } else {
            const msg = "Neither of these is true: this._variable_Modifications_DISPLAY, this._open_Modifications_DISPLAY "
            console.warn(msg)
            throw Error( msg )
        }


        this._createAndShowModalOverlay( { modUniqueMassesWithTheirPsmCountsArray } );
    }

    /**
     * Create and return the overlay, but don't show it
     * 
     * @param {*} param0 
     */
    _createAndShowModalOverlay( { modUniqueMassesWithTheirPsmCountsArray }  : { modUniqueMassesWithTheirPsmCountsArray : ModificationMass_UserSelections_ModMasses_PSM_Counts_PerMass_Result } ) {

        const overlayComponent = get_ModificationMass_UserSelections_DisplayMassSelectionOverlay_Layout({
            proteinName : this._proteinNames,
            modUniqueMassesWithTheirPsmCountsArray,
            modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject : this._modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject,
            callbackOn_Cancel_Close_Clicked : this._remove_ModalOverlay_BindThis,
            callback_updateSelectedMods : this._updateSelectedMods_BindThis
        });

        this._modMassOverlay_AddedTo_DocumentBody_Holder = limelight_add_ReactComponent_JSX_Element_To_DocumentBody({ componentToAdd : overlayComponent })
    }

    ////////////////////////

    /**
     *
     */
    _remove_ModalOverlay() {

        this._modMassOverlay_AddedTo_DocumentBody_Holder.removeContents_AndContainer_FromDOM();

        this._modMassOverlay_AddedTo_DocumentBody_Holder.removeContents_AndContainer_FromDOM();

        this._modMassOverlay_AddedTo_DocumentBody_Holder = undefined;
    }

	/**
	 * 
	 */
    _updateSelectedMods( params : ModificationMass_UserSelections_DisplayMassSelectionOverlay_OuterContainer_Component__Callback_updateSelectedMods_Params ) {

        const updated_selectedModificationMasses_Map = params.updated_selectedModificationMasses_Map

        this._remove_ModalOverlay();

        //  Clear main mod mass selections
        this._modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject.clear_selectedModifications_ExceptUnmodified();

        //  Add in newly selected mod masses

        //  First add Type AND (Triggers processing in called code)

        for ( const mapEntry of updated_selectedModificationMasses_Map.entries() ) {
            const entryKey = mapEntry[ 0 ]
            const entryValue = mapEntry[ 1 ]
            if ( entryValue.selectionType === SingleProtein_Filter_SelectionType.ALL ) {
                this._modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject.set_Modification_Selected(entryKey, entryValue);
            }
        }

        //  Second add Type other than AND (Triggers processing in called code)

        for ( const mapEntry of updated_selectedModificationMasses_Map.entries() ) {
            const entryKey = mapEntry[ 0 ]
            const entryValue = mapEntry[ 1 ]
            if ( entryValue.selectionType !== SingleProtein_Filter_SelectionType.ALL ) {
                this._modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject.set_Modification_Selected(entryKey, entryValue);
            }
        }

        this._modificationSelectionChanged_Callback();  //  Call function in object property _modificationSelectionChanged_Callback
    }

}