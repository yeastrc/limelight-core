/**
 * modificationMass_UserSelections_DisplayMassSelectionOverlay.ts
 * 
 * Variable Modification Mass Selection - Overlay for Large number of Modification masses
 * 
 * Re-uses Selection from Project Search based code for Large number of Modification masses
 * 
 */

//   Modification Mass Rounding to provide some level of commonality between searches
import { 
    modificationMass_CommonRounding_ReturnNumber_Function,
    modificationMass_CommonRounding_ReturnString_Function,
    modificationMass_CommonRounding_ReturnNumber, 
    modificationMass_CommonRounding_ReturnString 
} from 'page_js/data_pages/modification_mass_common/modification_mass_rounding';

import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';



import { ModificationMass_UserSelections_StateObject } from './modificationMass_UserSelections_StateObject';
import {
    get_ModificationMass_UserSelections_DisplayMassSelectionOverlay_Layout,
    ModificationMass_UserSelections_DisplayMassSelectionOverlay_OuterContainer_Component__Callback_updateSelectedMods_Params
} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/modification_mass_user_selections/jsx/modificationMass_UserSelections_DisplayMassSelectionOverlay_Layout";
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
import {variable_is_type_number_Check} from "page_js/variable_is_type_number_Check";


//  Modal Dialog for selecting mod masses when count > _MAX_MODS_DISPLAY_NON_SELECTED

const _MOD_MASS_ENTRY_SELECTION_DIALOG_OVERALL_WIDTH = 800;
const _MOD_MASS_ENTRY_SELECTION_DIALOG_OVERALL_HEIGHT = 700;

/**
 *
 */
export class ModificationMass_UserSelections_DisplayMassSelectionOverlay {

    private _remove_ModalOverlay_BindThis = this._remove_ModalOverlay.bind(this);
    private _updateSelectedMods_BindThis = this._updateSelectedMods.bind(this);

    private _proteinNames : string
    private _proteinDescriptions : string

    private _modificationSelectionChanged_Callback : () => void;

    private _modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject;

    private _proteinSequenceVersionId : number
    private _projectSearchIds : Array<number> 
    private _loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>
    private _modificationMass_CommonRounding_ReturnNumber : modificationMass_CommonRounding_ReturnNumber_Function // Always passed for Experiment - Made a parameter to make easier to copy this code for Protein Page Single Search

    private _modMassOverlay_AddedTo_DocumentBody_Holder : Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder;

	/**
	 * 
	 */
	constructor({ 
        modificationMass_UserSelections_StateObject,
        proteinNames,
        proteinDescriptions,
        proteinSequenceVersionId, 
        projectSearchIds, 
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
        modificationMass_CommonRounding_ReturnNumber,
        modificationSelectionChanged_Callback
    } : { 
        modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject,
        proteinNames : string
        proteinDescriptions : string
        proteinSequenceVersionId : number,
        projectSearchIds : Array<number>, 
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>,
        modificationMass_CommonRounding_ReturnNumber : modificationMass_CommonRounding_ReturnNumber_Function // Always passed for Experiment - Made a parameter to make easier to copy this code for Protein Page Single Search
        modificationSelectionChanged_Callback : () => void
    }) {
        if ( ! modificationSelectionChanged_Callback ) {
            const msg = "ModificationMass_UserSelections_DisplayMassSelectionOverlay: constructor: Invalid: modificationSelectionChanged_Callback not populated ";
            console.warn( msg );
            throw Error( msg );
        }
        this._modificationMass_UserSelections_StateObject = modificationMass_UserSelections_StateObject;
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
    showVariableModificationMassSelectionDialog() {

        const modUniqueMassesWithTheirPsmCountsArray : Array<{mass : number, psmCount: number}> = this._createModsAndPsmCountsList();

        this._createAndShowModalOverlay( { modUniqueMassesWithTheirPsmCountsArray } );
    }

    /**
     * Create and return the overlay, but don't show it
     * 
     * @param {*} param0 
     */
    _createAndShowModalOverlay( { modUniqueMassesWithTheirPsmCountsArray }  : { modUniqueMassesWithTheirPsmCountsArray : Array<{mass : number, psmCount: number}> } ) {

        let modMassOverlay_AddedTo_DocumentBody_Holder : Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder = undefined;

        const overlayComponent = get_ModificationMass_UserSelections_DisplayMassSelectionOverlay_Layout({
            width : _MOD_MASS_ENTRY_SELECTION_DIALOG_OVERALL_WIDTH,
            height : _MOD_MASS_ENTRY_SELECTION_DIALOG_OVERALL_HEIGHT,
            title : 'Change Modification Selection',
            proteinName : this._proteinNames,
            modUniqueMassesWithTheirPsmCountsArray,
            modificationMasses_Selected : this._modificationMass_UserSelections_StateObject.get_VariableModificationsSelected_ExcludingNoModificationOption(),
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

        const updated_selectedModificationMasses = params.updated_selectedModificationMasses

        this._remove_ModalOverlay();


        //  Clear main mod mass selections
        this._modificationMass_UserSelections_StateObject.clear_selectedVariableModifications();

        //  Add in newly selected mod masses
        for ( const modSelected of updated_selectedModificationMasses ) {
            this._modificationMass_UserSelections_StateObject.add_VariableModification_Selected( modSelected );
        }

        this._modificationSelectionChanged_Callback();
    }

    ////////////

	/**
	 * Create Variable Mods and PSM Counts List
     * 
     * @returns Array<{mass : number, psmCount: number}>
	 */
	_createModsAndPsmCountsList() : Array<{mass : number, psmCount: number}> {

        //    For Overlay
		//  Unique Mod masses And their PSM Counts for the protein or selected positions 
		const modUniqueMassesWithTheirPsmCountsMap : Map<number, {mass : number, psmCount: number}> = new Map(); // <mass, {mass, psmCount}>

        for ( const projectSearchId of this._projectSearchIds ) {

            const loadedDataPerProjectSearchIdHolder = this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
            if ( ! loadedDataPerProjectSearchIdHolder ) {
                throw Error("No entry in this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds for projectSearchId: " + projectSearchId );
            }

            const numPsmsForReportedPeptideIdMap = loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap();

            let modificationsOnProtein_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnProtein_KeyProteinSequenceVersionId();

            if ( modificationsOnProtein_KeyProteinSequenceVersionId ) {

                const modificationsOnProtein = modificationsOnProtein_KeyProteinSequenceVersionId.get(this._proteinSequenceVersionId);
            
                if ( modificationsOnProtein ) {
                    for ( const modificationOnProtein of modificationsOnProtein) {
                        //  Currently a single array of all  mods for the protein.  Maybe make it a Map of mods at positions
                        const position = modificationOnProtein.position;
                        let mass = modificationOnProtein.mass;

                        if ( ! variable_is_type_number_Check( mass ) ) {
                            const msg = "Modification mass from loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnProtein_KeyProteinSequenceVersionId(); is not a number.  is: " + mass;
                            console.warn( msg );
                            throw Error( msg );
                        }

                        if ( this._modificationMass_CommonRounding_ReturnNumber ) {  //  Transform Modification masses before using
            
                            //  Used in multiple searches to round the modification mass
                            mass = this._modificationMass_CommonRounding_ReturnNumber( mass );
                        }

                        const reportedPeptideId = modificationOnProtein.reportedPeptideId;

                        const numPsmsForReportedPeptideId = numPsmsForReportedPeptideIdMap.get( reportedPeptideId );
                        if ( ! numPsmsForReportedPeptideId ) {
                            throw Error("No entry found in numPsmsForReportedPeptideId for reportedPeptideId: " + reportedPeptideId + ", projectSearchId: " + projectSearchId + ", proteinSequenceVersionId: " + this._proteinSequenceVersionId );
                        }

                        let modMassPsmCount = modUniqueMassesWithTheirPsmCountsMap.get( mass );
                        if ( ! modMassPsmCount ) {
                            modMassPsmCount = { mass: mass, psmCount : 0 };
                            modUniqueMassesWithTheirPsmCountsMap.set( mass, modMassPsmCount );
                        }
                        modMassPsmCount.psmCount += numPsmsForReportedPeptideId;
                        
                    }
                }
            }
        }

        const modUniqueMassesWithTheirPsmCountsArray : Array<{mass : number, psmCount: number}> = []; // {mass, psmCount}

        for ( const entry of modUniqueMassesWithTheirPsmCountsMap.entries() ) {
            modUniqueMassesWithTheirPsmCountsArray.push( entry[ 1 ] );  // Put 'value' of Map entry into Array
        }

        //  Sort on masses
        modUniqueMassesWithTheirPsmCountsArray.sort( function(a, b) {
            if ( a.mass < b.mass ) {
                return -1;
            }
            if ( a.mass > b.mass ) {
                return 1;
            }
            return 0;
        });

        return modUniqueMassesWithTheirPsmCountsArray;
    }

	
}