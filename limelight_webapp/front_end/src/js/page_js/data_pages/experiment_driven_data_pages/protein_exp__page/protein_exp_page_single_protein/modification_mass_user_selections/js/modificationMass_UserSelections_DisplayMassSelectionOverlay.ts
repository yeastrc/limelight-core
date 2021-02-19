/**
 * modificationMass_UserSelections_DisplayMassSelectionOverlay.ts
 * 
 * Variable or Open Modification Mass Selection - Overlay for Large number of Modification masses
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



import { ModificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject } from './modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject';
import {
    get_ModificationMass_UserSelections_DisplayMassSelectionOverlay_Layout,
    ModificationMass_UserSelections_DisplayMassSelectionOverlay_OuterContainer_Component__Callback_updateSelectedMods_Params
} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/modification_mass_user_selections/jsx/modificationMass_UserSelections_DisplayMassSelectionOverlay_Layout";
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
import {SingleProtein_Filter_SelectionType} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinPage_SingleProtein_Filter_Enums";
// import {variable_is_type_number_Check} from "page_js/variable_is_type_number_Check";


//  Modal Dialog for selecting mod masses when count > _MAX_MODS_DISPLAY_NON_SELECTED

const _MOD_MASS_ENTRY_SELECTION_DIALOG_OVERALL_WIDTH = 800;
const _MOD_MASS_ENTRY_SELECTION_DIALOG_OVERALL_HEIGHT = 600;

/**
 *
 */
export class ModificationMass_UserSelections_DisplayMassSelectionOverlay {

    //  Exactly 1 of following has to be true
    private _variable_Modifications_DISPLAY : boolean
    private _open_Modifications_DISPLAY : boolean

    private _remove_ModalOverlay_BindThis = this._remove_ModalOverlay.bind(this);
    private _updateSelectedMods_BindThis = this._updateSelectedMods.bind(this);

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
    showModificationMassSelectionDialog() {

        let modUniqueMassesWithTheirPsmCountsArray : Array<{mass : number, psmCount: number}> = undefined

        if ( this._variable_Modifications_DISPLAY ) {

            modUniqueMassesWithTheirPsmCountsArray = this._createModsAndPsmCountsList_VariableModifications();

        } else if ( this._open_Modifications_DISPLAY ) {

            modUniqueMassesWithTheirPsmCountsArray = this._createModsAndPsmCountsList_OpenModifications()

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
    _createAndShowModalOverlay( { modUniqueMassesWithTheirPsmCountsArray }  : { modUniqueMassesWithTheirPsmCountsArray : Array<{mass : number, psmCount: number}> } ) {

        const overlayComponent = get_ModificationMass_UserSelections_DisplayMassSelectionOverlay_Layout({
            width : _MOD_MASS_ENTRY_SELECTION_DIALOG_OVERALL_WIDTH,
            height : _MOD_MASS_ENTRY_SELECTION_DIALOG_OVERALL_HEIGHT,
            title : 'Change Modification Selection',
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
        for ( const mapEntry of updated_selectedModificationMasses_Map.entries() ) {
            const entryKey = mapEntry[ 0 ]
            const entryValue = mapEntry[ 1 ]
            this._modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject.set_Modification_Selected( entryKey, entryValue );
        }

        this._modificationSelectionChanged_Callback();  //  Call function in object property _modificationSelectionChanged_Callback
    }

    ////////////

	/**
	 * Create Variable Mods and PSM Counts List
     * 
     * @returns Array<{mass : number, psmCount: number}>
	 */
	_createModsAndPsmCountsList_VariableModifications() : Array<{mass : number, psmCount: number}> {

        //    For Overlay
		//  Unique Mod masses And their PSM Counts for the protein or selected positions 
		const modUniqueMassesWithTheirPsmCountsMap : Map<number, {mass : number, psmCount: number}> = new Map(); // <mass, {mass, psmCount}>

        for ( const projectSearchId of this._projectSearchIds ) {

            const loadedDataPerProjectSearchIdHolder = this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
            if ( ! loadedDataPerProjectSearchIdHolder ) {
                throw Error("No entry in this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds for projectSearchId: " + projectSearchId );
            }

            const numPsmsForReportedPeptideIdMap = loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap();

            if ( this._proteinSequenceVersionId !== undefined && this._proteinSequenceVersionId !== null ) {

                //   Only process a const reportedPeptideId / ModMass (PossiblyRounded) Combination so only process once
                const reportedPeptideId_ModMass_PossiblyRounded_Combination_Processed = new Map<number,Set<number>>();

                const modificationsOnProtein_KeyProteinSequenceVersionId : Map<number, {mass: number, reportedPeptideId: number}[]> =
                    loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnProtein_KeyProteinSequenceVersionId();

                if ( modificationsOnProtein_KeyProteinSequenceVersionId ) {

                    const modificationsOnProtein = modificationsOnProtein_KeyProteinSequenceVersionId.get(this._proteinSequenceVersionId);

                    if ( modificationsOnProtein ) {

                        for ( const modificationOnProtein of modificationsOnProtein) {
                            //  Currently a single array of all  mods for the protein.  Maybe make it a Map of mods at positions

                            const reportedPeptideId = modificationOnProtein.reportedPeptideId;

                            let mass = modificationOnProtein.mass;

                            if ( this._modificationMass_CommonRounding_ReturnNumber ) {  //  Transform Modification masses before using

                                //  Used in multiple searches to round the modification mass
                                mass = this._modificationMass_CommonRounding_ReturnNumber( mass );
                            }

                            {
                                let modMass_PossiblyRounded_Set = reportedPeptideId_ModMass_PossiblyRounded_Combination_Processed.get(reportedPeptideId);
                                if ( ! modMass_PossiblyRounded_Set ) {
                                    modMass_PossiblyRounded_Set = new Set();
                                    reportedPeptideId_ModMass_PossiblyRounded_Combination_Processed.set(reportedPeptideId, modMass_PossiblyRounded_Set);
                                } else {
                                    if ( modMass_PossiblyRounded_Set.has( mass ) ) {
                                        //  reportedPeptideId / mass  combination has already been processed so skip

                                        continue; // EARLY CONTINUE
                                    }
                                }
                                modMass_PossiblyRounded_Set.add( mass ); //  Add to processed
                            }

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

            } else {

                //  NO this._proteinSequenceVersionId

                //   Only process a const reportedPeptideId / ModMass (PossiblyRounded) Combination so only process once
                const reportedPeptideId_ModMass_PossiblyRounded_Combination_Processed = new Map<number,Set<number>>();

                const reportedPeptideIds = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds();
                const dynamicModificationsOnReportedPeptide_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnReportedPeptide_KeyReportedPeptideId()

                for ( const reportedPeptideId of reportedPeptideIds ) {

                    const dynamicModificationsOnReportedPeptide = dynamicModificationsOnReportedPeptide_KeyReportedPeptideId.get( reportedPeptideId )
                    if ( ! dynamicModificationsOnReportedPeptide ) {

                        continue // EARLY CONTINUE
                    }

                    for ( const dynamicModificationEntry of dynamicModificationsOnReportedPeptide ) {

                        const reportedPeptideId = dynamicModificationEntry.reportedPeptideId;

                        let mass = dynamicModificationEntry.mass;

                        if ( this._modificationMass_CommonRounding_ReturnNumber ) {  //  Transform Modification masses before using

                            //  Used in multiple searches to round the modification mass
                            mass = this._modificationMass_CommonRounding_ReturnNumber( mass );
                        }

                        {
                            let modMass_PossiblyRounded_Set = reportedPeptideId_ModMass_PossiblyRounded_Combination_Processed.get(reportedPeptideId);
                            if ( ! modMass_PossiblyRounded_Set ) {
                                modMass_PossiblyRounded_Set = new Set();
                                reportedPeptideId_ModMass_PossiblyRounded_Combination_Processed.set(reportedPeptideId, modMass_PossiblyRounded_Set);
                            } else {
                                if ( modMass_PossiblyRounded_Set.has( mass ) ) {
                                    //  reportedPeptideId / mass  combination has already been processed so skip

                                    continue; // EARLY CONTINUE
                                }
                            }
                            modMass_PossiblyRounded_Set.add( mass ); //  Add to processed
                        }

                        const numPsmsForReportedPeptideId = numPsmsForReportedPeptideIdMap.get( reportedPeptideId );
                        if ( ! numPsmsForReportedPeptideId ) {
                            throw Error("No entry found in numPsmsForReportedPeptideId for reportedPeptideId: " + reportedPeptideId + ", projectSearchId: " + projectSearchId + ", not filtered on protein id" );
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

    ////////////

    /**
     * Create Open Mods and PSM Counts List
     *
     * @returns Array<{mass : number, psmCount: number}>
     */
    _createModsAndPsmCountsList_OpenModifications() : Array<{mass : number, psmCount: number}> {

        //    For Overlay
        //  Unique Mod masses And their PSM Counts for the protein or selected positions
        const modUniqueMassesWithTheirPsmCountsMap : Map<number, {mass : number, psmCount: number}> = new Map(); // <mass, {mass, psmCount}>

        for ( const projectSearchId of this._projectSearchIds ) {

            const loadedDataPerProjectSearchIdHolder = this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
            if ( ! loadedDataPerProjectSearchIdHolder ) {
                throw Error("No entry in this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds for projectSearchId: " + projectSearchId );
            }

            const psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap = loadedDataPerProjectSearchIdHolder.get_psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs()
            if ( ! psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap ) {

                //  No Open Mods for this search so skip search

                continue // EARLY CONTINUE
            }

            if ( this._proteinSequenceVersionId !== undefined && this._proteinSequenceVersionId !== null ) {

                const modificationsOnProtein_KeyProteinSequenceVersionId : Map<number, {mass: number, reportedPeptideId: number}[]> = loadedDataPerProjectSearchIdHolder.get_openModificationsOnProtein_KeyProteinSequenceVersionId();

                if ( modificationsOnProtein_KeyProteinSequenceVersionId ) {

                    const modificationsOnProtein = modificationsOnProtein_KeyProteinSequenceVersionId.get(this._proteinSequenceVersionId);

                    if ( modificationsOnProtein ) {
                        for ( const modificationOnProtein of modificationsOnProtein) {
                            //  Currently a single array of all  mods for the protein.  Maybe make it a Map of mods at positions
                            // const position = modificationOnProtein.position;
                            let mass = modificationOnProtein.mass;

                            //  No Mass rounding since for Open Mod all mass at Reported Peptide level have been rounded to whole number

                            let modMassPsmCount = modUniqueMassesWithTheirPsmCountsMap.get( mass );
                            if ( ! modMassPsmCount ) {
                                modMassPsmCount = { mass: mass, psmCount : 0 };
                                modUniqueMassesWithTheirPsmCountsMap.set( mass, modMassPsmCount );
                            }

                            const reportedPeptideId = modificationOnProtein.reportedPeptideId;

                            const psmOpenModificationMasses_PsmIdSet_Per_RoundedMassObject = psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap.get( reportedPeptideId )
                            if ( ! psmOpenModificationMasses_PsmIdSet_Per_RoundedMassObject ) {

                                continue // EARLY CONTINUE
                            }

                            const psmOpenModificationMasses_PsmIdSetObject = psmOpenModificationMasses_PsmIdSet_Per_RoundedMassObject.openModificationMass_RoundedMap.get( mass )
                            if ( ! psmOpenModificationMasses_PsmIdSetObject ) {

                                continue // EARLY CONTINUE
                            }

                            const psmOpenModificationMasses_PsmIdSet = psmOpenModificationMasses_PsmIdSetObject.psmIds_Set


                            modMassPsmCount.psmCount += psmOpenModificationMasses_PsmIdSet.size;

                        }
                    }
                }
            } else {

                // NO this._proteinSequenceVersionId

                const reportedPeptideIds = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds();
                const openModificationsOnReportedPeptide_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_openModificationsOnReportedPeptide_KeyReportedPeptideId()

                for ( const reportedPeptideId of reportedPeptideIds ) {

                    const psmOpenModificationMasses_PsmIdSet_Per_RoundedMassObject = psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap.get( reportedPeptideId )
                    if ( ! psmOpenModificationMasses_PsmIdSet_Per_RoundedMassObject ) {

                        continue // EARLY CONTINUE
                    }

                    const openModificationsOnReportedPeptide = openModificationsOnReportedPeptide_KeyReportedPeptideId.get( reportedPeptideId );
                    if ( ! openModificationsOnReportedPeptide ) {

                        continue // EARLY CONTINUE
                    }

                    for ( const openModificationEntry of openModificationsOnReportedPeptide ) {

                        const mass = openModificationEntry.mass

                        const psmOpenModificationMasses_PsmIdSetObject = psmOpenModificationMasses_PsmIdSet_Per_RoundedMassObject.openModificationMass_RoundedMap.get( mass )
                        if ( ! psmOpenModificationMasses_PsmIdSetObject ) {

                            continue // EARLY CONTINUE
                        }

                        const psmOpenModificationMasses_PsmIdSet = psmOpenModificationMasses_PsmIdSetObject.psmIds_Set

                        //  No Mass rounding since for Open Mod all mass at Reported Peptide level have been rounded to whole number

                        let modMassPsmCount = modUniqueMassesWithTheirPsmCountsMap.get( mass );
                        if ( ! modMassPsmCount ) {
                            modMassPsmCount = { mass: mass, psmCount : 0 };
                            modUniqueMassesWithTheirPsmCountsMap.set( mass, modMassPsmCount );
                        }

                        modMassPsmCount.psmCount += psmOpenModificationMasses_PsmIdSet.size;
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