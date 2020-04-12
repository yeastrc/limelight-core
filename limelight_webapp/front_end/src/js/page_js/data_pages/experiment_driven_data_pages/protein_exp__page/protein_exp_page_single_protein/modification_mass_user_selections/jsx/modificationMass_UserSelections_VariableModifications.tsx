/**
 * modificationMass_UserSelections_VariableModifications.tsx
 * 
 * Modification Mass Selections - Variable Modifications
 * 
 * 
 */

import React from 'react'

//   Modification Mass Rounding to provide some level of commonality between searches
import { 
    modificationMass_CommonRounding_ReturnNumber_Function,
    modificationMass_CommonRounding_ReturnString_Function,
    modificationMass_CommonRounding_ReturnNumber, 
    modificationMass_CommonRounding_ReturnString 
} from 'page_js/data_pages/modification_mass_common/modification_mass_rounding';

import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';

import { ModificationMass_UserSelections_StateObject } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject';

import { ModificationMass_UserSelections_DisplayMassSelectionOverlay } from '../js/modificationMass_UserSelections_DisplayMassSelectionOverlay';



/**
 * 
 */
export interface ModificationMass_UserSelections_VariableModifications_Props {

    variableModificationsData;
    modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject;
    updateMadeTo_modificationMass_UserSelections_StateObject_Callback : () => void;
    update_modificationMass_UserSelections_ComponentData_Callback : () => void;  //  Called when need to update other checkboxes or when updates from overlay
    //  For Selection in Overlay
    proteinSequenceVersionId : number, 
    projectSearchIds : Array<number>,
    proteinNames : string
    proteinDescriptions : string
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>,
    modificationMass_CommonRounding_ReturnNumber : modificationMass_CommonRounding_ReturnNumber_Function
}

/**
 * 
 */
export class ModificationMass_UserSelections_VariableModifications extends React.Component< ModificationMass_UserSelections_VariableModifications_Props, { } > {

    //  bind to 'this' for passing as parameters
    private _onClick_addModificationsLink_BindThis = this._onClick_addModificationsLink.bind(this);
    private _onClick_changeSelectionLink_BindThis = this._onClick_changeSelectionLink.bind(this);
    private _updateFor_OverlaySelectionChanges_BindThis = this._updateFor_OverlaySelectionChanges.bind(this);

    /**
     * 
     */    
    constructor(props : ModificationMass_UserSelections_VariableModifications_Props) {
        super(props);

        this.state = {  };
    }


    /**
     * After render()
     */
    // componentDidMount() {

    //     console.log("ModificationMass_UserSelections_VariableModifications: componentDidMount");
    // }

    /**
     * Clean Up
     */
    // componentWillUnmount() {

    // }


    /**
     * Must be Static
     * Called before 
     *   Initial render: 'render()'
     *   Rerender : 'shouldComponentUpdate()'
     * 
     * Return new state (like return from setState(callback)) or null
     */
    // static getDerivedStateFromProps( props, state ) {

      // console.log("called: static getDerivedStateFromProps(): " );

      //  Return new state (like return from setState(callback)) or null

    //   return null;

    // }
  

    /**
     * @returns true if should update, false otherwise
     */
    shouldComponentUpdate(nextProps : ModificationMass_UserSelections_VariableModifications_Props, nextState) {

        // console.log("ModificationMass_UserSelections_VariableModifications: shouldComponentUpdate")

        //  Only update if changed: props: 

        if ( this.props.variableModificationsData !== nextProps.variableModificationsData ) {
            return true;
        }
        return false;

        //  If Comment out prev code, comment out this method
    }

    // getSnapshotBeforeUpdate( <see docs> ) {


    // }


    /**
     * After render()
     */
    // componentDidUpdate(prevProps, prevState, snapshot) {

    //     // console.log("ModificationMass_UserSelections_VariableModifications: componentDidUpdate")

    //     // if ( this.dataObject_columnEntry_NewValue_Callback ) {
    //     //     this.dataObject_columnEntry_NewValue_Callback({ dataObject_columnEntry : this.props.dataObject_columnEntry });
    //     // }
    // }

    /**
     * 
     */
    _onClick_addModificationsLink( event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {

        // console.log("ModificationMass_UserSelections_VariableModifications: _onClick_addModificationsLink");

        this._open_OverlaySelectionChanges();
    }

    /**
     * 
     */
    _onClick_changeSelectionLink( event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {

        // console.log("ModificationMass_UserSelections_VariableModifications: _onClick_changeSelectionLink");

        this._open_OverlaySelectionChanges();
    }

    /**
     * 
     */
    _open_OverlaySelectionChanges( ) {

        // console.log("ModificationMass_UserSelections_VariableModifications: _open_OverlaySelectionChanges");

        const modificationMass_UserSelections_StateObject = this.props.variableModificationsData.modificationMass_UserSelections_StateObject
        const proteinSequenceVersionId = this.props.variableModificationsData.proteinSequenceVersionId
        const projectSearchIds = this.props.variableModificationsData.projectSearchIds
        const loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds = this.props.variableModificationsData.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
        const modificationMass_CommonRounding_ReturnNumber = this.props.variableModificationsData.modificationMass_CommonRounding_ReturnNumber

        const modificationMass_UserSelections_DisplayMassSelectionOverlay = new ModificationMass_UserSelections_DisplayMassSelectionOverlay({

            modificationMass_UserSelections_StateObject,
            proteinNames : this.props.proteinNames,
            proteinDescriptions : this.props.proteinDescriptions,
            proteinSequenceVersionId, 
            projectSearchIds, 
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            modificationMass_CommonRounding_ReturnNumber, // Always passed for Experiment - Made a parameter to make easier to copy this code for Protein Page Single Search
            modificationSelectionChanged_Callback : this._updateFor_OverlaySelectionChanges_BindThis
        });

        modificationMass_UserSelections_DisplayMassSelectionOverlay.showVariableModificationMassSelectionDialog();
    }

    /**
     * 
     */
    _updateFor_OverlaySelectionChanges() : void {

        console.log("_updateFor_OverlaySelectionChanges(): modificationSelectionChanged_Callback");
            
        this.props.updateMadeTo_modificationMass_UserSelections_StateObject_Callback();
        
        window.setTimeout( () => {
            this.props.update_modificationMass_UserSelections_ComponentData_Callback();
        }, 1 );   

    }

    /**
     * 
     */    
    render() {

        const variableModificationsData = this.props.variableModificationsData;
 
        const showNoVariableModificationsMsg = variableModificationsData.showNoVariableModificationsMsg;

        const variableModificationEntries = variableModificationsData.variableModificationEntries;
        
        const showAddVariableModificationsSelectionLink = variableModificationsData.showAddVariableModificationsSelectionLink;
        const showChangeVariableModificationsSelectionLink = variableModificationsData.showChangeVariableModificationsSelectionLink;
        

        let singleModification_Entries = null;

        if ( variableModificationEntries ) {

            singleModification_Entries = variableModificationEntries.map( (variableModificationEntry, index) => {

                return (
                    <SingleModification_Entry key={ variableModificationEntry.modMass } 
                        variableModificationEntry={ variableModificationEntry }
                        modificationMass_UserSelections_StateObject={ this.props.modificationMass_UserSelections_StateObject }
                        updateMadeTo_modificationMass_UserSelections_StateObject_Callback={ this.props.updateMadeTo_modificationMass_UserSelections_StateObject_Callback }
                        update_modificationMass_UserSelections_ComponentData_Callback={ this.props.update_modificationMass_UserSelections_ComponentData_Callback }
                    />
                );
            });
        }

        let addModificationsLink = null;
        let changeSelectionLink = null;

        if ( showAddVariableModificationsSelectionLink ) {

            addModificationsLink = (
                <span className=" fake-link " style={ { whiteSpace: "nowrap" } } onClick={ this._onClick_addModificationsLink_BindThis }>
                    Add Modification Filters
                </span>
            )
        }

        if ( showChangeVariableModificationsSelectionLink ) {

            changeSelectionLink = (
                <div style={ { whiteSpace: "nowrap", marginTop: 2 } } className=" left-margin-same-as-checkbox "> {/*  left-margin-same-as-checkbox; to align with checkbox */}
                    <span className=" fake-link " onClick={ this._onClick_changeSelectionLink_BindThis }
                    >Change Modification Filters</span>
                </div>
            )
        }

        return (

            <React.Fragment>
                {/* Float Left */}
                <div style={ { fontSize: 18, fontWeight: "bold", float: "left" } }>Filter On Variable Modifications:</div>

                <div className="modification-mass-selection-block" >
                    <div style={ { marginTop: 2 } }>
                        { ( showNoVariableModificationsMsg ?
                            <div className=" left-margin-same-as-checkbox "> {/*   left-margin-same-as-checkbox; to align with checkbox in Static Mods */}
                                No Variable Modifications
                            </div>
                        :
                            <React.Fragment>
                                <div >
                                    <Unmodified_Entry 
                                        variableModificationsData={ variableModificationsData }
                                        modificationMass_UserSelections_StateObject={ this.props.modificationMass_UserSelections_StateObject }
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

                <div style={ { clear: "left" } }></div>
            </React.Fragment>
        );

    }    
}

//   Single Mod Mass Entry with Checkbox

interface SingleModification_Entry_Props {
    variableModificationEntry;
    modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject;
    updateMadeTo_modificationMass_UserSelections_StateObject_Callback : () => void;
    update_modificationMass_UserSelections_ComponentData_Callback : () => void;  //  Called when need to update other checkboxes or when updates from overlay
}

interface SingleModification_Entry_State {
    checked : boolean
    prevProp_variableModificationEntry
}

/**
 * 
 */
class SingleModification_Entry extends React.Component< SingleModification_Entry_Props, SingleModification_Entry_State > {

    //  bind to 'this' for passing as parameters
    private _checkboxChanged_BindThis = this._checkboxChanged.bind(this);

    /**
     * 
     */    
    constructor(props : SingleModification_Entry_Props) {
        super(props);

        let checked = props.variableModificationEntry.selected;
        if ( ! checked ) {
            checked = false; // make false if not true
        }

        this.state = { checked, prevProp_variableModificationEntry : props.variableModificationEntry };
    }

    /**
     * Must be Static
     * Called before 
     *   Initial render: 'render()'
     *   Rerender : 'shouldComponentUpdate()'
     * 
     * Return new state (like return from setState(callback)) or null
     */
    static getDerivedStateFromProps( props : SingleModification_Entry_Props, state : SingleModification_Entry_State ) {

        // console.log("called: static getDerivedStateFromProps(): " );

        //    Return new state (like return from setState(callback)) or null

        if ( props.variableModificationEntry !== state.prevProp_variableModificationEntry ) {

            //   variableModificationEntry changed so update checked
            
            let checked = props.variableModificationEntry.selected;
            if ( ! checked ) {
                checked = false; // make false if not true
            }

            return { checked, prevProp_variableModificationEntry : props.variableModificationEntry };
        }
            
        return null;
    }
    
    /**
     * @returns true if should update, false otherwise
     */
    shouldComponentUpdate(nextProps : SingleModification_Entry_Props, nextState : SingleModification_Entry_State ) {

        // console.log("ModificationMass_UserSelections_VariableModifications: shouldComponentUpdate")

        //  Only update if changed: props or state: 

        if ( this.state.checked !== nextState.checked ) {
            return true;
        }
        return false;

        //  If Comment out prev code, comment out this method
    }

    /**
     * 
     */    
    _checkboxChanged( event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {

        const target_htmlElement = event.target as HTMLInputElement;
        const checkedProperty_htmlElement = target_htmlElement.checked;  //  New Value

        // console.log( "_checkboxChanged: target.checked: " + checkedProperty_htmlElement + ", this.state.checked: " + this.state.checked )

        this.setState( (state, props) => {

            return { checked : checkedProperty_htmlElement }
        });

        const modMass = this.props.variableModificationEntry.modMass;

        let cleared_NO_VariableModification_AKA_Unmodified_Selected = false;

        if ( checkedProperty_htmlElement ) {
            if ( this.props.modificationMass_UserSelections_StateObject.is_NO_VariableModification_AKA_Unmodified_Selected() ) {
                //  First clear is_NO_VariableModification_AKA_Unmodified_Selected selection
                cleared_NO_VariableModification_AKA_Unmodified_Selected = true;
                this.props.modificationMass_UserSelections_StateObject.remove_NO_VariableModification_AKA_Unmodified_Selected();
            }
        }

        if ( checkedProperty_htmlElement ) {
            this.props.modificationMass_UserSelections_StateObject.add_VariableModification_Selected( modMass );
        } else {
            this.props.modificationMass_UserSelections_StateObject.delete_VariableModification_Selected( modMass );
        }

        if ( cleared_NO_VariableModification_AKA_Unmodified_Selected ) {
            //  Cleared is_NO_VariableModification_AKA_Unmodified_Selected selection so need to redraw all selections
            this.props.update_modificationMass_UserSelections_ComponentData_Callback();
        } else {
            this.props.updateMadeTo_modificationMass_UserSelections_StateObject_Callback();
        }

    }

    /**
     * 
     */    
    render() {

        const variableModificationEntry = this.props.variableModificationEntry;

        const modMass = variableModificationEntry.modMass;
        
        return (
            <div className=" mod-mass-outer-div ">
                <label>
                <div style={ { display: "inline-block" } }>
                        <input type="checkbox"  checked={ this.state.checked } onChange={ this._checkboxChanged_BindThis } />
                    </div>
                    <div style={ { display: "inline-block" } }>
                        { modMass }
                    </div>
                    
                </label>
            </div>
        );
    }
}


//   Unmodified Entry with Checkbox

interface Unmodified_Entry_Props {
    variableModificationsData;
    modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject;
    updateMadeTo_modificationMass_UserSelections_StateObject_Callback : () => void;
    update_modificationMass_UserSelections_ComponentData_Callback : () => void;  //  Called when need to update other checkboxes or when updates from overlay
}

interface Unmodified_Entry_State {
    checked : boolean;
    prevProp_variableModificationsData
}

/**
 * 
 */
class Unmodified_Entry extends React.Component< Unmodified_Entry_Props, Unmodified_Entry_State > {

    //  bind to 'this' for passing as parameters
    private _checkboxChanged_BindThis = this._checkboxChanged.bind(this);

    /**
     * 
     */    
    constructor(props : Unmodified_Entry_Props) {
        super(props);

        let checked = props.variableModificationsData.is_NO_VariableModification_AKA_Unmodified_Selected;
        if ( ! checked ) {
            checked = false; // make false if not true
        }

        this.state = { checked, prevProp_variableModificationsData : props.variableModificationsData };
    }
        
    /**
     * Must be Static
     * Called before 
     *   Initial render: 'render()'
     *   Rerender : 'shouldComponentUpdate()'
     * 
     * Return new state (like return from setState(callback)) or null
     */
    static getDerivedStateFromProps( props : Unmodified_Entry_Props, state : Unmodified_Entry_State ) {

        // console.log("called: static getDerivedStateFromProps(): " );

        //    Return new state (like return from setState(callback)) or null

        if ( props.variableModificationsData !== state.prevProp_variableModificationsData ) {

            //   variableModificationsData changed so update checked
            let checked = props.variableModificationsData.is_NO_VariableModification_AKA_Unmodified_Selected;
            if ( ! checked ) {
                checked = false; // make false if not true
            }
            return { checked, prevProp_variableModificationsData : props.variableModificationsData };
        }
            
        return null;
    }
  
    /**
     * @returns true if should update, false otherwise
     */
    shouldComponentUpdate(nextProps : Unmodified_Entry_Props, nextState : Unmodified_Entry_State ) {

        // console.log("ModificationMass_UserSelections_VariableModifications: shouldComponentUpdate")

        //  Only update if changed: props or state: 

        if ( this.state.checked !== nextState.checked ) {
            return true;
        }
        return false;

        //  If Comment out prev code, comment out this method
    }

    /**
     * 
     */    
    _checkboxChanged( event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {

        const target_htmlElement = event.target as HTMLInputElement;
        const checkedProperty_htmlElement = target_htmlElement.checked;  //  New Value

        // console.log( "_checkboxChanged: target.checked: " + checkedProperty_htmlElement + ", this.state.checked: " + this.state.checked )

        this.setState( (state, props) => {

            return { checked : checkedProperty_htmlElement }
        });

        if ( checkedProperty_htmlElement ) {
            //  First clear any modification mass selections
            this.props.modificationMass_UserSelections_StateObject.clear_selectedVariableModifications();
            this.props.modificationMass_UserSelections_StateObject.set_NO_VariableModification_AKA_Unmodified_Selected();
        } else {
            this.props.modificationMass_UserSelections_StateObject.remove_NO_VariableModification_AKA_Unmodified_Selected();
        }

        window.setTimeout( () => {
            this.props.updateMadeTo_modificationMass_UserSelections_StateObject_Callback();
        }, 1 );
        if ( checkedProperty_htmlElement ) {
            window.setTimeout( () => {
                this.props.update_modificationMass_UserSelections_ComponentData_Callback();
            }, 1 );
        }
    }

    /**
     * 
     */    
    render() {

        return (
            <div className=" mod-mass-outer-div ">
                <label>
                    <div style={ { display: "inline-block" } }>
                        <input type="checkbox" checked={ this.state.checked } onChange={ this._checkboxChanged_BindThis }  />
                    </div>
                    <div style={ { display: "inline-block" } }>
                        unmodified
                    </div>
                    
                </label>
            </div>
        );
    }
}

