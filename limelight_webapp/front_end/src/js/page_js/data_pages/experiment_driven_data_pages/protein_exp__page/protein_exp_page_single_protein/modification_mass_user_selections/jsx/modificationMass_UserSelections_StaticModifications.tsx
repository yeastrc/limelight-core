/**
 * modificationMass_UserSelections_StaticModifications.tsx
 * 
 * Modification Mass Selections - Static Modifications
 * 
 * 
 */

import React from 'react'

import { ModificationMass_UserSelections_StateObject } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject';


/**
 * 
 */
export interface ModificationMass_UserSelections_StaticModifications_Props {

    staticModificationsData
    modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject;
    updateMadeTo_modificationMass_UserSelections_StateObject_Callback : () => void;
}

interface ModificationMass_UserSelections_StaticModifications_State {

    // prev_staticModificationsData
}

/**
 * 
 */
export class ModificationMass_UserSelections_StaticModifications extends React.Component< ModificationMass_UserSelections_StaticModifications_Props, ModificationMass_UserSelections_StaticModifications_State > {

    /**
     * 
     */    
    constructor(props : ModificationMass_UserSelections_StaticModifications_Props) {
        super(props);

        //  bind to 'this' for passing as parameters
        // this._callbackMethodForSelectedProteinSequenceChange_BindThis = this._callbackMethodForSelectedProteinSequenceChange.bind(this);

        // this.state = { prev_staticModificationsData : props.staticModificationsData };
    }


    /**
     * After render()
     */
    // componentDidMount() {

    //     console.log("ModificationMass_UserSelections_StaticModifications: componentDidMount");
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
    // static getDerivedStateFromProps( props : ModificationMass_UserSelections_StaticModifications_Props, state : ModificationMass_UserSelections_StaticModifications_State ) {

    // //   console.log("called: static getDerivedStateFromProps(): " );

    // //    Return new state (like return from setState(callback)) or null

    //   return { staticModificationsData : props.staticModificationsData };;

    // }
  

    /**
     * @returns true if should update, false otherwise
     */
    shouldComponentUpdate( nextProps : ModificationMass_UserSelections_StaticModifications_Props, nextState : ModificationMass_UserSelections_StaticModifications_State ) {

        // console.log("ModificationMass_UserSelections_StaticModifications: shouldComponentUpdate")

        //  Only update if changed: props: dataPerSequencePosition_length

        if ( this.props.staticModificationsData !== nextProps.staticModificationsData ) {
            return true;
        }
        return false;

        //  If Comment out prev code, comment out this function
    }

    // getSnapshotBeforeUpdate( <see docs> ) {


    // }


    /**
     * After render()
     */
    // componentDidUpdate(prevProps, prevState, snapshot) {

    //     // console.log("ModificationMass_UserSelections_StaticModifications: componentDidUpdate")

    //     // if ( this.dataObject_columnEntry_NewValue_Callback ) {
    //     //     this.dataObject_columnEntry_NewValue_Callback({ dataObject_columnEntry : this.props.dataObject_columnEntry });
    //     // }
    // }

    /**
     * 
     */
    // _callbackMethodForSelectedProteinSequenceChange( params ) {

    //     console.log("ModificationMass_UserSelections_StaticModifications: _callbackMethodForSelectedProteinSequenceChange. params: ");
    //     console.log( params );

    // }

    /**
     * 
     */    
    render() {

        const staticModificationsData = this.props.staticModificationsData;

        const showNoStaticModificationsMsg = staticModificationsData.showNoStaticModificationsMsg;
        const staticModificationEntries = staticModificationsData.staticModificationEntries;

        if ( showNoStaticModificationsMsg ) {

            //  Nothing to Render
            return null;  // EARLY RETURN
        }

        let singleModification_Entries = null;

        if ( staticModificationEntries ) {

            singleModification_Entries = staticModificationEntries.map( (staticModificationEntry, index) => {

                return (
                    <SingleModification_Entry key={ staticModificationEntry.modMass + "," + staticModificationEntry.residueLetter } 
                        staticModificationEntry={ staticModificationEntry }
                        modificationMass_UserSelections_StateObject={ this.props.modificationMass_UserSelections_StateObject }
                        updateMadeTo_modificationMass_UserSelections_StateObject_Callback={ this.props.updateMadeTo_modificationMass_UserSelections_StateObject_Callback }
                    />
                );
            });
        }

        return (
            <React.Fragment>

                {/* Float Left */}
                <div style={ { fontSize: 18, fontWeight: "bold", float: "left" } }>Filter On Static Modifications:</div>

                <div className="modification-mass-selection-block" >
                    <div style={ { marginTop: 2 } }>
                        <div >
                            { singleModification_Entries }
                        </div>
                    </div>          
                </div> 
            
                <div style={ { clear: "left" } }></div>

            </React.Fragment>
        );

    }    
}

interface SingleModification_Entry_Props {
    staticModificationEntry
    modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject;
    updateMadeTo_modificationMass_UserSelections_StateObject_Callback : () => void;
}

interface SingleModification_Entry_State {
    checked : boolean
    prevProp_staticModificationEntry
}

/**
 * 
 */
class SingleModification_Entry extends React.Component< SingleModification_Entry_Props, SingleModification_Entry_State > {

    private _checkboxChanged_BindThis;

    /**
     * 
     */    
    constructor(props : SingleModification_Entry_Props) {
        super(props);

        //  bind to 'this' for passing as parameters
        this._checkboxChanged_BindThis = this._checkboxChanged.bind(this);

        let checked = this.props.staticModificationEntry.selected;
        if ( ! checked ) {
            checked = false; // make false if not true
        }

        this.state = { checked, prevProp_staticModificationEntry : props.staticModificationEntry };
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

        if ( props.staticModificationEntry !== state.prevProp_staticModificationEntry ) {

            //   staticModificationEntry changed so update checked
            
            let checked = props.staticModificationEntry.selected;
            if ( ! checked ) {
                checked = false; // make false if not true
            }

            return { checked, prevProp_staticModificationEntry : props.staticModificationEntry };
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

        const staticModificationEntry = this.props.staticModificationEntry;

        const residueLetter = staticModificationEntry.residueLetter;
        const modMass = staticModificationEntry.modMass;

        if ( checkedProperty_htmlElement ) {
            this.props.modificationMass_UserSelections_StateObject.add_StaticModification_Selected({ residueLetter, modMass });
        } else {
            this.props.modificationMass_UserSelections_StateObject.delete_StaticModification_Selected({ residueLetter, modMass });
        }

        window.setTimeout( () => {
            this.props.updateMadeTo_modificationMass_UserSelections_StateObject_Callback();
        }, 1 );
    }
    
    /**
     * 
     */    
    render() {

        const staticModificationEntry = this.props.staticModificationEntry;

        return (
            <div className=" mod-mass-outer-div ">
                <label>
                <div style={ { display: "inline-block" } }>
                        <input type="checkbox"  checked={ this.state.checked } onChange={ this._checkboxChanged_BindThis } />
                    </div>
                    <div style={ { display: "inline-block" } }>
                        { staticModificationEntry.modMass } ({ staticModificationEntry.residueLetter })
                    </div>
                    
                </label>
            </div>
        );
    }
}
