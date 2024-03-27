/**
 * modificationMass_UserSelections_Variable_or_Open_Modifications.tsx
 * 
 * Modification Mass Selections - Variable Modifications
 * 
 * 
 */

import React from 'react'
//   Modification Mass Rounding to provide some level of commonality between searches
import {modificationMass_CommonRounding_ReturnNumber_Function} from 'page_js/data_pages/modification_mass_common/modification_mass_rounding';

import {ModificationMass_UserSelections_DisplayMassSelectionOverlay} from '../js/modificationMass_UserSelections_DisplayMassSelectionOverlay';
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {
    ModificationMass_UserSelections_ComponentData_Variable_or_Open_ModificationsData,
    ModificationMass_UserSelections_ComponentData_Variable_or_Open_ModificationsData_Entry
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_ComponentData";
import {ModificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject";
import {SingleProtein_Filter_SelectionType} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinPage_SingleProtein_Filter_Enums";
import {SingleProtein_Filter_PerUniqueIdentifier_Entry} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinPage_SingleProtein_Filter_CommonObjects";
import {Filter_selectionItem_Any_All_SelectionItem_Container} from '../../filter_selectionItem_Any_All_SelectionItem/jsx/filter_selection_item__any__all__selection_item__container';
import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_Component} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/jsx/modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Component";
import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData";
import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass";
import {ModificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_reporter_ion__user_selections__coordinator/js/modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class";
import {
    Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
} from "page_js/common_all_pages/tooltip__green_i_in_circle__tooltip_on_hover__react_component/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component";


const _MAX_MODS_DISPLAY_NON_SELECTED__VARIABLE_MODS = 20;

// for Open Mods: Always display Add/Change Links. Never initially show not selected mass values
const _MAX_MODS_DISPLAY_NON_SELECTED__OPEN_MODS = 0;


/**
 * 
 */
export interface ModificationMass_UserSelections_Variable_or_Open_Modifications_Props {

    //  Exactly 1 of following has to be true
    variable_Modifications_DISPLAY : boolean
    open_Modifications_DISPLAY : boolean

    modificationMassSelections_AlwaysShow__ClearOn_ObjectReferenceChange: object  //  Clear modificationMassSelections_AlwaysShow when this object reference changes

    openSelectMassOverlay_Override_Callback : () => void  //  Overrides default behavior of open "Add/Change selected modification mass" overlay

    variable_or_Open_ModificationsData : ModificationMass_UserSelections_ComponentData_Variable_or_Open_ModificationsData;
    modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class: ModificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class

    modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject : ModificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject;
    updateMadeTo_modificationMass_UserSelections_StateObject_Callback : () => void;
    update_modificationMass_UserSelections_ComponentData_Callback : () => void;  //  Called when need to update other checkboxes or when updates from overlay
    //  For Selection in Overlay
    proteinSequenceVersionId : number, 
    projectSearchIds : Array<number>,
    proteinNames : string
    proteinDescriptions : string
    modificationMass_CommonRounding_ReturnNumber : modificationMass_CommonRounding_ReturnNumber_Function

    //  For Enclosed <ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_Component>

    modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData
    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass;
    updateMadeTo_modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_Callback : () => void;
}

interface ModificationMass_UserSelections_Variable_or_Open_Modifications_State {

    showChange_Variable_or_Open_ModificationsSelectionLink?: boolean
    modificationMassSelections_AlwaysShow? : Set<number>   //  Always show these Modification Masses, even if not selected

    prevFromProps__modificationMassSelections_AlwaysShow__ClearOn_ObjectReferenceChange?: object  //  Also updated with new {} in _updateFor_OverlaySelectionChanges

    // _placeholder: any
}

/**
 * 
 */
export class ModificationMass_UserSelections_Variable_or_Open_Modifications extends React.Component< ModificationMass_UserSelections_Variable_or_Open_Modifications_Props, ModificationMass_UserSelections_Variable_or_Open_Modifications_State > {

    //  bind to 'this' for passing as parameters
    private _open_OverlaySelectionChanges_BindThis = this._open_OverlaySelectionChanges.bind(this);
    private _updateFor_OverlaySelectionChanges_BindThis = this._updateFor_OverlaySelectionChanges.bind(this);
    private _modificationMassSelection_Removed_Callback_BindThis = this._modificationMassSelection_Removed_Callback.bind(this);

    /**
     * 
     */    
    constructor(props : ModificationMass_UserSelections_Variable_or_Open_Modifications_Props) {
        super(props);

        if ( this.props.variable_Modifications_DISPLAY && this.props.open_Modifications_DISPLAY ) {
            const msg = "Cannot BOTH be true: this.props.variable_Modifications_DISPLAY && this.props.open_Modifications_DISPLAY"
            console.warn( msg )
            throw Error( msg )
        }
        if ( ( ! this.props.variable_Modifications_DISPLAY )  && ( ! this.props.open_Modifications_DISPLAY ) ) {
            const msg = "Cannot BOTH be false: this.props.variable_Modifications_DISPLAY && this.props.open_Modifications_DISPLAY"
            console.warn( msg )
            throw Error( msg )
        }

        this.state = {
            showChange_Variable_or_Open_ModificationsSelectionLink: false,
            modificationMassSelections_AlwaysShow: new Set(),
            prevFromProps__modificationMassSelections_AlwaysShow__ClearOn_ObjectReferenceChange: props.modificationMassSelections_AlwaysShow__ClearOn_ObjectReferenceChange
        };
    }

    /**
     * Must be Static, called by React
     * Called before
     *   Initial render: 'render()'
     *   Rerender : 'shouldComponentUpdate()'
     *
     * Check out getSnapshotBeforeUpdate( <see docs> )
     *
     * Return new state (like return from setState(callback)) or null
     */
    static getDerivedStateFromProps( props : ModificationMass_UserSelections_Variable_or_Open_Modifications_Props, state: ModificationMass_UserSelections_Variable_or_Open_Modifications_State ) : ModificationMass_UserSelections_Variable_or_Open_Modifications_State {

        let maxModsDisplay_Unselected = _MAX_MODS_DISPLAY_NON_SELECTED__VARIABLE_MODS;

        if ( props.open_Modifications_DISPLAY ) {
            maxModsDisplay_Unselected = _MAX_MODS_DISPLAY_NON_SELECTED__OPEN_MODS;
        }

        //   Set
        const modificationsSelected__OnlyModMasses_AsSet = props.modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject.get_ModificationsSelected__OnlyModMasses_AsSet()

        // if ( ( modificationsSelected__OnlyModMasses_AsSet.size === 0 ) && ( modificationsUniqueMassesSet.size > maxModsDisplay_Unselected ) ) {
        //
        //     result.showAdd_Variable_or_Open_ModificationsSelectionLink = true;
        //     return result; // EARLY EXIT
        // }

        let showChange_Variable_or_Open_ModificationsSelectionLink = false;

        if ( props.variable_or_Open_ModificationsData && props.variable_or_Open_ModificationsData.variable_or_Open_ModificationEntries ) {

            if ( ( props.variable_or_Open_ModificationsData.variable_or_Open_ModificationEntries.length > maxModsDisplay_Unselected )
                && ( props.variable_or_Open_ModificationsData.variable_or_Open_ModificationEntries.length !== ( modificationsSelected__OnlyModMasses_AsSet.size ) ) ) {

                //  more mod masses than normally display and not all are selected
                showChange_Variable_or_Open_ModificationsSelectionLink = true;
            }
        }

        let newState : ModificationMass_UserSelections_Variable_or_Open_Modifications_State = {
            showChange_Variable_or_Open_ModificationsSelectionLink
        };

        if ( state.prevFromProps__modificationMassSelections_AlwaysShow__ClearOn_ObjectReferenceChange !== props.modificationMassSelections_AlwaysShow__ClearOn_ObjectReferenceChange ) {

            newState.prevFromProps__modificationMassSelections_AlwaysShow__ClearOn_ObjectReferenceChange = props.modificationMassSelections_AlwaysShow__ClearOn_ObjectReferenceChange;

            newState.modificationMassSelections_AlwaysShow = new Set();  //  Reset to empty
        }


        return newState;
    }

                                         /**
     * After render()
     */
    // componentDidMount() {

    //     console.log("ModificationMass_UserSelections_Variable_or_Open_Modifications: componentDidMount");
    // }

    /**
     * Clean Up
     */
    // componentWillUnmount() {

    // }


    /**
     * @returns true if should update, false otherwise
     */
    // shouldComponentUpdate(nextProps : ModificationMass_UserSelections_Variable_or_Open_Modifications_Props, nextState: ModificationMass_UserSelections_Variable_or_Open_Modifications_State ) {
    //
    //     // console.log("ModificationMass_UserSelections_Variable_or_Open_Modifications: shouldComponentUpdate")
    //
    //     //  Only update if changed: props:
    //     if ( this.props.variable_or_Open_ModificationsData !== nextProps.variable_or_Open_ModificationsData ) {
    //         return true;
    //     }
    //     if ( this.props.modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class !== nextProps.modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class ) {
    //         return true;
    //     }
    //     if ( this.props.modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData !== nextProps.modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData ) {
    //         return true;
    //     }
    //     return false;
    //
    //     //  If Comment out prev code, comment out this method
    // }

    /**
     * After render()
     */
    // componentDidUpdate(prevProps, prevState, snapshot) {

    //     // console.log("ModificationMass_UserSelections_Variable_or_Open_Modifications: componentDidUpdate")

    //     // if ( this.dataObject_columnEntry_NewValue_Callback ) {
    //     //     this.dataObject_columnEntry_NewValue_Callback({ dataObject_columnEntry : this.props.dataObject_columnEntry });
    //     // }
    // }

    private _modificationMassSelection_Removed_Callback( modificationMass: number ) {

        this.setState( (state: ModificationMass_UserSelections_Variable_or_Open_Modifications_State, props: ModificationMass_UserSelections_Variable_or_Open_Modifications_Props) : ModificationMass_UserSelections_Variable_or_Open_Modifications_State => {

            const modificationMassSelections_AlwaysShow = new Set( state.modificationMassSelections_AlwaysShow );
            modificationMassSelections_AlwaysShow.add( modificationMass );

            return { modificationMassSelections_AlwaysShow }
        });
    }

    /**
     * 
     */
    _open_OverlaySelectionChanges( event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {

        // console.log("ModificationMass_UserSelections_Variable_or_Open_Modifications: _open_OverlaySelectionChanges");

        const modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject = this.props.variable_or_Open_ModificationsData.modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject
        const proteinSequenceVersionId = this.props.variable_or_Open_ModificationsData.proteinSequenceVersionId
        const projectSearchIds = this.props.variable_or_Open_ModificationsData.projectSearchIds
        const commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root = this.props.variable_or_Open_ModificationsData.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        const modificationMass_CommonRounding_ReturnNumber = this.props.variable_or_Open_ModificationsData.modificationMass_CommonRounding_ReturnNumber

        const modificationMass_UserSelections_DisplayMassSelectionOverlay = new ModificationMass_UserSelections_DisplayMassSelectionOverlay({

            variable_Modifications_DISPLAY : this.props.variable_Modifications_DISPLAY,
            open_Modifications_DISPLAY : this.props.open_Modifications_DISPLAY,
            modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject,
            proteinNames : this.props.proteinNames,
            proteinDescriptions : this.props.proteinDescriptions,
            proteinSequenceVersionId, 
            projectSearchIds,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
            modificationMass_CommonRounding_ReturnNumber, // Always passed for Experiment - Made a parameter to make easier to copy this code for Protein Page Single Search
            modificationSelectionChanged_Callback : this._updateFor_OverlaySelectionChanges_BindThis
        });

        modificationMass_UserSelections_DisplayMassSelectionOverlay.showModificationMassSelectionDialog();
    }

    /**
     * 
     */
    _updateFor_OverlaySelectionChanges() : void {

        // console.log("_updateFor_OverlaySelectionChanges(): modificationSelectionChanged_Callback");
            
        this.props.updateMadeTo_modificationMass_UserSelections_StateObject_Callback();
        
        window.setTimeout( () => {

            this.setState({ prevFromProps__modificationMassSelections_AlwaysShow__ClearOn_ObjectReferenceChange: {} })

            this.props.update_modificationMass_UserSelections_ComponentData_Callback();
        }, 1 );   

    }

    /**
     * 
     */    
    render() {

        // const variable_Modifications_DISPLAY = this.props.variable_Modifications_DISPLAY;
        // const open_Modifications_DISPLAY = this.props.open_Modifications_DISPLAY;

        const variable_or_Open_ModificationsData = this.props.variable_or_Open_ModificationsData;
 
        const showNo_Variable_or_Open_ModificationsMsg = variable_or_Open_ModificationsData.showNo_Variable_or_Open_ModificationsMsg;

        if ( this.props.open_Modifications_DISPLAY && showNo_Variable_or_Open_ModificationsMsg ) {

            //  Display nothing if open mod and nothing to display

            return null;  //  EARLY RETURN
        }

        const variable_or_Open_ModificationEntries = variable_or_Open_ModificationsData.variable_or_Open_ModificationEntries;
        
        const showAdd_Variable_or_Open_ModificationsSelectionLink = variable_or_Open_ModificationsData.showAdd_Variable_or_Open_ModificationsSelectionLink;
        const showChange_Variable_or_Open_ModificationsSelectionLink = this.state.showChange_Variable_or_Open_ModificationsSelectionLink;
        

        let singleModification_Entries: Array<JSX.Element> = [];

        if ( variable_or_Open_ModificationEntries ) {

            for ( const variable_or_Open_ModificationEntry of variable_or_Open_ModificationEntries ) {

                if ( ( ! showChange_Variable_or_Open_ModificationsSelectionLink )  //  Not show link so show all entries
                    || variable_or_Open_ModificationEntry.selectionType || this.state.modificationMassSelections_AlwaysShow.has( variable_or_Open_ModificationEntry.modMass ) ) {

                    const entry = (
                        <SingleModification_Entry
                            key={ variable_or_Open_ModificationEntry.modMass }
                            variable_or_Open_ModificationEntry={ variable_or_Open_ModificationEntry }
                            modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class={ this.props.modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class }
                            modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject={ this.props.modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject }
                            updateMadeTo_modificationMass_UserSelections_StateObject_Callback={ this.props.updateMadeTo_modificationMass_UserSelections_StateObject_Callback }
                            update_modificationMass_UserSelections_ComponentData_Callback={ this.props.update_modificationMass_UserSelections_ComponentData_Callback }
                            modificationMassSelection_Removed={ this._modificationMassSelection_Removed_Callback_BindThis }
                        />
                    );

                    singleModification_Entries.push( entry )
                }
            }
        }

        let open_OverlaySelectionChanges = this._open_OverlaySelectionChanges_BindThis

        if ( this.props.openSelectMassOverlay_Override_Callback ) {

            open_OverlaySelectionChanges = this.props.openSelectMassOverlay_Override_Callback
        }

        let addModificationsLink = null;
        let changeSelectionLink = null;

        if ( showAdd_Variable_or_Open_ModificationsSelectionLink ) {

            addModificationsLink = (
                <span className=" fake-link " style={ { whiteSpace: "nowrap" } } onClick={ open_OverlaySelectionChanges }>
                    Add Modification Filters
                </span>
            )
        }

        if ( showChange_Variable_or_Open_ModificationsSelectionLink ) {

            changeSelectionLink = (
                <div style={ { whiteSpace: "nowrap", marginTop: 1, marginBottom : 2 } }>
                     <div className=" left-margin-same-as-checkbox ">  {/*  left-margin-same-as-checkbox; to align with checkbox */}
                        <span className=" fake-link " onClick={ open_OverlaySelectionChanges }
                        >Change Modification Filters</span>
                     </div>
                </div>
            )
        }

        let variable_Open_Label__CapitalFirstLetter = "Variable"
        let variable_Open_Label__AllLowerCase = "variable"

        if ( this.props.open_Modifications_DISPLAY ) {
            variable_Open_Label__CapitalFirstLetter = "Open"
            variable_Open_Label__AllLowerCase = "open"
        }

        return (

            <React.Fragment>

                {/* Parent is CSS Grid with 2 Columns */}

                <div className=" filter-common-filter-label ">
                    Filter On { variable_Open_Label__CapitalFirstLetter } Modifications:

                    <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                        title={
                            <span>
                                Filter peptides based on { variable_Open_Label__AllLowerCase } modifications. All peptides will contain all modifications selected with the “AND” option.
                                All peptides will contain at least one of the modifications selected with the “OR” option.
                                And no peptides will contain any modification selected with the “EXCLUDE” option.
                            </span>
                        }
                    />
                </div>

                <div className="filter-common-selection-block" >
                    <div >  {/*  className=" filter-common-selection-inner-block " no longer needed since adding border around mass entries: */}
                        { ( showNo_Variable_or_Open_ModificationsMsg ?
                                <div className=" filter-common-selection-block " >
                                    <div className=" filter-common-selection-inner-block ">

                                        <div style={ { paddingTop: 2 }} className=" left-margin-same-as-checkbox "> {/*   left-margin-same-as-checkbox; to align with checkbox in Unique Peptide */}
                                            No { variable_Open_Label__CapitalFirstLetter } Modifications Found
                                        </div>
                                    </div>
                                </div>
                        :
                            <React.Fragment>
                                <div >
                                    <Unmodified_Entry 
                                        variable_or_Open_ModificationsData={ variable_or_Open_ModificationsData }
                                        modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class={ this.props.modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class }
                                        modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject={ this.props.modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject }
                                        updateMadeTo_modificationMass_UserSelections_StateObject_Callback={ this.props.updateMadeTo_modificationMass_UserSelections_StateObject_Callback }
                                        update_modificationMass_UserSelections_ComponentData_Callback={ this.props.update_modificationMass_UserSelections_ComponentData_Callback }
                                    /> {/* Unmodified entry is always shown */}

                                    { singleModification_Entries }
                                    { addModificationsLink }
                                </div>
                                { changeSelectionLink }
                            </React.Fragment>
                        ) }
                    </div>
                </div>
                { this.props.modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData ?
                    <ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_Component
                        modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData={ this.props.modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData }
                        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass={ this.props.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass }
                        updateMadeTo_modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_Callback={ this.props.updateMadeTo_modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_Callback }
                        skipRenderConditional={ true }
                    />
                : null }
            </React.Fragment>
        );

    }    
}

//   Single Mod Mass Entry

interface SingleModification_Entry_Props {
    variable_or_Open_ModificationEntry :  ModificationMass_UserSelections_ComponentData_Variable_or_Open_ModificationsData_Entry;
    modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class: ModificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class;
    modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject : ModificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject;
    updateMadeTo_modificationMass_UserSelections_StateObject_Callback : () => void;
    update_modificationMass_UserSelections_ComponentData_Callback : () => void;  //  Called when need to update other checkboxes or when updates from overlay

    // Internal
    modificationMassSelection_Removed: ( mass: number ) => void;  // Called when a modification mass is removed
}

interface SingleModification_Entry_State {
    selection_SelectionType : SingleProtein_Filter_SelectionType
    prevProp_variable_or_Open_ModificationEntry? :  ModificationMass_UserSelections_ComponentData_Variable_or_Open_ModificationsData_Entry
}

/**
 * 
 */
class SingleModification_Entry extends React.Component< SingleModification_Entry_Props, SingleModification_Entry_State > {

    //  bind to 'this' for passing as parameters
    private _choice_ANY_Clicked_Callback_BindThis = this._choice_ANY_Clicked_Callback.bind(this)
    private _choice_ALL_Clicked_Callback_BindThis = this._choice_ALL_Clicked_Callback.bind(this)
    private _choice_NOT_Clicked_Callback_BindThis = this._choice_NOT_Clicked_Callback.bind(this)
    private _choice_Remove_Clicked_Callback_BindThis = this._choice_Remove_Clicked_Callback.bind(this)

    /**
     * 
     */    
    constructor(props : SingleModification_Entry_Props) {
        super(props);

        let selection_SelectionType : SingleProtein_Filter_SelectionType = props.variable_or_Open_ModificationEntry.selectionType;

        this.state = { selection_SelectionType, prevProp_variable_or_Open_ModificationEntry : props.variable_or_Open_ModificationEntry };
    }

    /**
     * Must be Static
     * Called before 
     *   Initial render: 'render()'
     *   Rerender : 'shouldComponentUpdate()'
     * 
     * Return new state (like return from setState(callback)) or null
     */
    static getDerivedStateFromProps( props : SingleModification_Entry_Props, state : SingleModification_Entry_State ) : SingleModification_Entry_State {

        // console.log("called: static getDerivedStateFromProps(): " );

        //    Return new state (like return from setState(callback)) or null

        if ( props.variable_or_Open_ModificationEntry !== state.prevProp_variable_or_Open_ModificationEntry ) {

            //   variable_or_Open_ModificationEntry changed so update checked
            const selectionType : SingleProtein_Filter_SelectionType = props.variable_or_Open_ModificationEntry.selectionType

            return { selection_SelectionType: selectionType, prevProp_variable_or_Open_ModificationEntry : props.variable_or_Open_ModificationEntry };
        }
            
        return null;
    }
    
    /**
     * @returns true if should update, false otherwise
     */
    // shouldComponentUpdate(nextProps : SingleModification_Entry_Props, nextState : SingleModification_Entry_State ) {
    //
    //     // console.log("ModificationMass_UserSelections_Variable_or_Open_Modifications: shouldComponentUpdate")
    //
    //     //  Only update if changed: props or state:
    //
    //     if ( this.state.selection_SelectionType !== nextState.selection_SelectionType ) {
    //         return true;
    //     }
    //     if ( this.props.modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class !== nextProps.modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class ) {
    //         return true;
    //     }
    //     return false;
    //
    //     //  If Comment out prev code, comment out this method
    // }

    /**
     *
     */
    private _choice_ANY_Clicked_Callback() {
        try {
            const selectionType = SingleProtein_Filter_SelectionType.ANY

            this.setState( (state, props) : SingleModification_Entry_State => {

                return { selection_SelectionType : selectionType }
            });

            const modMass = this.props.variable_or_Open_ModificationEntry.modMass;

            const newEntry = new SingleProtein_Filter_PerUniqueIdentifier_Entry({ selectionType })
            this.props.modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject.set_Modification_Selected( modMass, newEntry );

            this._updateRestofPage();

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _choice_ALL_Clicked_Callback() {
        try {
            const selectionType = SingleProtein_Filter_SelectionType.ALL

            this.setState( (state, props) : SingleModification_Entry_State => {

                return { selection_SelectionType : selectionType }
            });

            const modMass = this.props.variable_or_Open_ModificationEntry.modMass;

            const newEntry = new SingleProtein_Filter_PerUniqueIdentifier_Entry({ selectionType })
            this.props.modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject.set_Modification_Selected( modMass, newEntry );

            this._updateRestofPage();

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _choice_NOT_Clicked_Callback() {
        try {
            const selectionType = SingleProtein_Filter_SelectionType.NOT

            this.setState( (state, props) : SingleModification_Entry_State => {

                return { selection_SelectionType : selectionType }
            });

            const modMass = this.props.variable_or_Open_ModificationEntry.modMass;

            const newEntry = new SingleProtein_Filter_PerUniqueIdentifier_Entry({ selectionType })
            this.props.modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject.set_Modification_Selected( modMass, newEntry );

            this._updateRestofPage();

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _choice_Remove_Clicked_Callback() {
        try {
            this.setState( (state, props) : SingleModification_Entry_State => {

                return { selection_SelectionType : null }
            });
            const modMass = this.props.variable_or_Open_ModificationEntry.modMass;

            this.props.modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject.delete_Modification_Selected( modMass );

            this.props.modificationMassSelection_Removed( modMass );

            this._updateRestofPage();

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _updateRestofPage() {
        try {
            window.setTimeout( () => {
                try {
                    this.props.updateMadeTo_modificationMass_UserSelections_StateObject_Callback();

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }, 1 );

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     * 
     */    
    render() {

        //   SingleModification_Entry class

        const variable_or_Open_ModificationEntry = this.props.variable_or_Open_ModificationEntry;

        const modMass = variable_or_Open_ModificationEntry.modMass.toString();

        return (
            <Filter_selectionItem_Any_All_SelectionItem_Container
                textLabel={ modMass }
                current_selection_SelectionType={ this.state.selection_SelectionType }
                modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class={ this.props.modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class }
                any_Selected_Callback={ this._choice_ANY_Clicked_Callback_BindThis }
                all_Selected_Callback={ this._choice_ALL_Clicked_Callback_BindThis }
                not_Selected_Callback={ this._choice_NOT_Clicked_Callback_BindThis }
                remove_Selected_Callback={ this._choice_Remove_Clicked_Callback_BindThis }
            />
        );
    }
}

//////////////////////

//   Unmodified Entry

interface Unmodified_Entry_Props {
    variable_or_Open_ModificationsData : ModificationMass_UserSelections_ComponentData_Variable_or_Open_ModificationsData;
    modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class: ModificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class
    modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject : ModificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject;
    updateMadeTo_modificationMass_UserSelections_StateObject_Callback : () => void;
    update_modificationMass_UserSelections_ComponentData_Callback : () => void;  //  Called when need to update other checkboxes or when updates from overlay
}

interface Unmodified_Entry_State { //  Keep shouldComponentUpdate up to date
    selection_SelectionType? : SingleProtein_Filter_SelectionType;
    prevProp_variable_or_Open_ModificationsData? : ModificationMass_UserSelections_ComponentData_Variable_or_Open_ModificationsData
}

/**
 * 
 */
class Unmodified_Entry extends React.Component< Unmodified_Entry_Props, Unmodified_Entry_State > {

    //  bind to 'this' for passing as parameters
    private _choice_ANY_Clicked_Callback_BindThis = this._choice_ANY_Clicked_Callback.bind(this)
    private _choice_ALL_Clicked_Callback_BindThis = this._choice_ALL_Clicked_Callback.bind(this)
    private _choice_NOT_Clicked_Callback_BindThis = this._choice_NOT_Clicked_Callback.bind(this)
    private _choice_Remove_Clicked_Callback_BindThis = this._choice_Remove_Clicked_Callback.bind(this)

    /**
     * 
     */    
    constructor(props : Unmodified_Entry_Props) {
        super(props);

        let selection_SelectionType : SingleProtein_Filter_SelectionType = null

        if ( props.variable_or_Open_ModificationsData && props.variable_or_Open_ModificationsData.unmodified_Selection_Variable_or_Open_Modifications ) {
            selection_SelectionType = props.variable_or_Open_ModificationsData.unmodified_Selection_Variable_or_Open_Modifications.selectionType;
        }

        this.state = { selection_SelectionType, prevProp_variable_or_Open_ModificationsData : props.variable_or_Open_ModificationsData };
    }
        
    /**
     * Must be Static
     * Called before 
     *   Initial render: 'render()'
     *   Rerender : 'shouldComponentUpdate()'
     * 
     * Return new state (like return from setState(callback)) or null
     */
    static getDerivedStateFromProps( props : Unmodified_Entry_Props, state : Unmodified_Entry_State ) : Unmodified_Entry_State {

        // console.log("called: static getDerivedStateFromProps(): " );

        //    Return new state (like return from setState(callback)) or null

        if ( props.variable_or_Open_ModificationsData !== state.prevProp_variable_or_Open_ModificationsData ) {

            //   variable_or_Open_ModificationsData changed so update checked

            let selectionType : SingleProtein_Filter_SelectionType = null;
            if ( props.variable_or_Open_ModificationsData.unmodified_Selection_Variable_or_Open_Modifications ) {
                selectionType = props.variable_or_Open_ModificationsData.unmodified_Selection_Variable_or_Open_Modifications.selectionType;
            }

            return { selection_SelectionType: selectionType, prevProp_variable_or_Open_ModificationsData : props.variable_or_Open_ModificationsData };
        }
            
        return null;
    }
  
    /**
     * @returns true if should update, false otherwise
     */
    // shouldComponentUpdate(nextProps : Unmodified_Entry_Props, nextState : Unmodified_Entry_State ) {
    //
    //     // console.log("ModificationMass_UserSelections_Variable_or_Open_Modifications: shouldComponentUpdate")
    //
    //     //  Only update if changed: props or state:
    //
    //     if ( this.state.selection_SelectionType !== nextState.selection_SelectionType ) {
    //         return true;
    //     }
    //     if ( this.props.modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class !== nextProps.modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class ) {
    //         return true;
    //     }
    //
    //     return false;
    //
    //     //  If Comment out prev code, comment out this method
    // }

    /**
     *
     */
    private _choice_ANY_Clicked_Callback() {
        try {
            const selectionType = SingleProtein_Filter_SelectionType.ANY

            this.setState( (state, props) : Unmodified_Entry_State => {

                return { selection_SelectionType : selectionType }
            });

            const newEntry = new SingleProtein_Filter_PerUniqueIdentifier_Entry({ selectionType })
            this.props.modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject.set_NO_Modification_AKA_Unmodified_Selected( newEntry );

            this._updateRestofPage();

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _choice_ALL_Clicked_Callback() {
        try {
            const selectionType = SingleProtein_Filter_SelectionType.ALL

            this.setState( (state, props) : Unmodified_Entry_State => {

                return { selection_SelectionType : selectionType }
            });

            const newEntry = new SingleProtein_Filter_PerUniqueIdentifier_Entry({ selectionType })
            this.props.modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject.set_NO_Modification_AKA_Unmodified_Selected( newEntry );

            this._updateRestofPage();

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _choice_NOT_Clicked_Callback() {
        try {
            const selectionType = SingleProtein_Filter_SelectionType.NOT

            this.setState( (state, props) : Unmodified_Entry_State => {

                return { selection_SelectionType : selectionType }
            });

            const newEntry = new SingleProtein_Filter_PerUniqueIdentifier_Entry({ selectionType })
            this.props.modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject.set_NO_Modification_AKA_Unmodified_Selected( newEntry );

            this._updateRestofPage();

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _choice_Remove_Clicked_Callback() {
        try {
            this.setState( (state, props) : Unmodified_Entry_State => {

                return { selection_SelectionType : null }
            });

            this.props.modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject.remove_NO_Modification_AKA_Unmodified_Selected();

            this._updateRestofPage();

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _updateRestofPage() {
        try {
            window.setTimeout( () => {
                try {
                    this.props.updateMadeTo_modificationMass_UserSelections_StateObject_Callback();

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }, 1 );

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     * 
     */    
    render() {

        return (
            <Filter_selectionItem_Any_All_SelectionItem_Container
                textLabel={ "Unmodified" }
                current_selection_SelectionType={ this.state.selection_SelectionType }
                modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class={ this.props.modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class }
                any_Selected_Callback={ this._choice_ANY_Clicked_Callback_BindThis }
                all_Selected_Callback={ this._choice_ALL_Clicked_Callback_BindThis }
                not_Selected_Callback={ this._choice_NOT_Clicked_Callback_BindThis }
                remove_Selected_Callback={ this._choice_Remove_Clicked_Callback_BindThis }
            />
        );
    }
}

