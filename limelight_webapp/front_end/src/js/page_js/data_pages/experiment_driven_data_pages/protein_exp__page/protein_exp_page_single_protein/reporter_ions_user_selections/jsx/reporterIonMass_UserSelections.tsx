/**
 * reporterIonMass_UserSelections.tsx
 * 
 * Reporter Ion Mass Selections
 * 
 * 
 */

import React from 'react'

import { reporterIonMass_UserSelections_BuildData_ForReactComponent, ReporterIonMass_UserSelections_ComponentData } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reporter_ions_user_selections/js/reporterIonMass_UserSelections_BuildData_ForReactComponent';
import { ReporterIonMass_UserSelections_StateObject } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reporter_ions_user_selections/js/reporterIonMass_UserSelections_StateObject';


/**
 * 
 */
export interface ReporterIonMass_UserSelections_Props {

    reporterIons_UserSelections_ComponentData : ReporterIonMass_UserSelections_ComponentData;
    reporterIonMass_UserSelections_StateObject : ReporterIonMass_UserSelections_StateObject;
    updateMadeTo_reporterIonMass_UserSelections_StateObject_Callback : () => void;
}

/**
 * 
 */
export class ReporterIonMass_UserSelections extends React.Component< ReporterIonMass_UserSelections_Props, { } > {

    /**
     * 
     */    
    constructor(props : ReporterIonMass_UserSelections_Props) {
        super(props);

        //  bind to 'this' for passing as parameters
        // this._callbackMethodForSelectedProteinSequenceChange_BindThis = this._callbackMethodForSelectedProteinSequenceChange.bind(this);

        this.state = {  };
    }


    /**
     * After render()
     */
    // componentDidMount() {

    //     console.log("ReporterIonMass_UserSelections: componentDidMount");
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
    shouldComponentUpdate(nextProps : ReporterIonMass_UserSelections_Props, nextState) {

        // console.log("ReporterIonMass_UserSelections: shouldComponentUpdate")

        //  Only update if changed: props: 

        if ( this.props.reporterIons_UserSelections_ComponentData !== nextProps.reporterIons_UserSelections_ComponentData ) {
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

    //     // console.log("ReporterIonMass_UserSelections: componentDidUpdate")

    //     // if ( this.dataObject_columnEntry_NewValue_Callback ) {
    //     //     this.dataObject_columnEntry_NewValue_Callback({ dataObject_columnEntry : this.props.dataObject_columnEntry });
    //     // }
    // }

    /**
     * 
     */
    // _callbackMethodForSelectedProteinSequenceChange( params ) {

    //     console.log("ReporterIonMass_UserSelections: _callbackMethodForSelectedProteinSequenceChange. params: ");
    //     console.log( params );

    // }

    /**
     * 
     */    
    render() {

        const reporterIonsData = this.props.reporterIons_UserSelections_ComponentData;

        const showNoReporterIonsMsg = reporterIonsData.showNoReporterIonsMsg;
        const reporterIonEntries = reporterIonsData.reporterIonEntries;

        if ( showNoReporterIonsMsg ) {

            //  Nothing to Render
            return null;  // EARLY RETURN
        }

        let singleReporterIon_Entries = null;

        if ( reporterIonEntries ) {

            singleReporterIon_Entries = reporterIonEntries.map( (reporterIonEntry, index) => {

                return (
                    <SingleReporterIon_Entry key={ reporterIonEntry.reporterIonMass } 
                        reporterIonEntry={ reporterIonEntry }
                        reporterIonMass_UserSelections_StateObject={ this.props.reporterIonMass_UserSelections_StateObject }
                        updateMadeTo_reporterIonMass_UserSelections_StateObject_Callback={ this.props.updateMadeTo_reporterIonMass_UserSelections_StateObject_Callback }
                    />
                );
            });
        }

        return (
            <React.Fragment>

                <div className=" reporter-ion-mass-selection-outer-block ">

                    {/* Float Left */}
                    <div style={ { fontSize: 18, fontWeight: "bold", float: "left" } }>Filter On Reporter Ions:</div>

                    <div className="reporter-ion-mass-selection-block" >
                        <div style={ { marginTop: 2 } }>
                            <div >
                                { singleReporterIon_Entries }
                            </div>
                        </div>          
                    </div> 
                
                    <div style={ { clear: "left" } }></div>
                </div>

            </React.Fragment>
        );

    }    
}

////////////

/**
 * 
 */
interface SingleReporterIon_Entry_Props {
    reporterIonEntry
    reporterIonMass_UserSelections_StateObject : ReporterIonMass_UserSelections_StateObject;
    updateMadeTo_reporterIonMass_UserSelections_StateObject_Callback : () => void;
}

interface SingleReporterIon_Entry_State {
    checked
    prev_reporterIonEntry
}

/**
 * 
 */
class SingleReporterIon_Entry extends React.Component< SingleReporterIon_Entry_Props, SingleReporterIon_Entry_State > {

    //  bind to 'this' for passing as parameters
    private _checkboxChanged_BindThis = this._checkboxChanged.bind(this);

    /**
     * 
     */    
    constructor(props : SingleReporterIon_Entry_Props) {
        super(props);

        let checked = props.reporterIonEntry.selected;
        if ( ! checked ) {
            checked = false; // make false if not true
        }

        this.state = { checked, prev_reporterIonEntry : props.reporterIonEntry };
    }

    /**
     * Must be Static
     * Called before 
     *   Initial render: 'render()'
     *   Rerender : 'shouldComponentUpdate()'
     * 
     * Return new state (like return from setState(callback)) or null
     */
    static getDerivedStateFromProps( props : SingleReporterIon_Entry_Props, state : SingleReporterIon_Entry_State ) {

        // console.log("called: static getDerivedStateFromProps(): " );

        //    Return new state (like return from setState(callback)) or null

        if ( props.reporterIonEntry !== state.prev_reporterIonEntry ) {

            //   variableModificationEntry changed so update checked
            
            let checked = props.reporterIonEntry.selected;
            if ( ! checked ) {
                checked = false; // make false if not true
            }

            return { checked, prev_reporterIonEntry : props.reporterIonEntry };
        }
            
        return null;
    }
    
    /**
     * @returns true if should update, false otherwise
     */
    shouldComponentUpdate(nextProps : SingleReporterIon_Entry_Props, nextState : SingleReporterIon_Entry_State ) {

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

        const reporterIonMass = this.props.reporterIonEntry.reporterIonMass;

        // console.log( "_checkboxChanged: target.checked: " + checkedProperty_htmlElement + ", this.state.checked: " + this.state.checked )

        this.setState( (state, props) => {

            return { checked : checkedProperty_htmlElement }
        });

        if ( checkedProperty_htmlElement ) {
            this.props.reporterIonMass_UserSelections_StateObject.add_ReporterIons_Selected( reporterIonMass )
        } else {
            this.props.reporterIonMass_UserSelections_StateObject.delete_ReporterIons_Selected( reporterIonMass );
        }

        window.setTimeout( () => {
            this.props.updateMadeTo_reporterIonMass_UserSelections_StateObject_Callback();
        }, 1 );
    }

    /**
     * 
     */    
    render() {

        const reporterIonEntry = this.props.reporterIonEntry;

        return (
            <div className=" reporter-ion-mass-outer-div ">
                <label>
                <div style={ { display: "inline-block" } }>
                        <input type="checkbox"  checked={ this.state.checked } onChange={ this._checkboxChanged_BindThis } />
                    </div>
                    <div style={ { display: "inline-block" } }>
                        { reporterIonEntry.reporterIonMass }
                    </div>
                    
                </label>
            </div>
        );
    }
}
