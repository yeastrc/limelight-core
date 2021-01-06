/**
 * peptideUnique_UserSelection.tsx
 *
 * Peptide Unique Selection
 *
 *
 */

import React from 'react'

import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {PeptideUnique_UserSelection_ComponentData} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_ComponentData";
import {PeptideUnique_UserSelection_StateObject} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_StateObject";

/**
 *
 */
export interface PeptideUnique_UserSelection_Props {

    peptideUnique_UserSelection_ComponentData : PeptideUnique_UserSelection_ComponentData
    peptideUnique_UserSelection_StateObject : PeptideUnique_UserSelection_StateObject;
    updateMadeTo_peptideUnique_UserSelection_StateObject_Callback : () => void;
}

interface PeptideUnique_UserSelection_State {

    peptideUnique_UserSelection? : boolean
    prev_peptideUnique_UserSelection_ComponentData? : PeptideUnique_UserSelection_ComponentData
}

/**
 *
 */
export class PeptideUnique_UserSelection extends React.Component< PeptideUnique_UserSelection_Props, PeptideUnique_UserSelection_State > {

    private _inputFieldChanged_BindThis = this._inputFieldChanged.bind(this);

    /**
     *
     */
    constructor(props : PeptideUnique_UserSelection_Props) {
        super(props);

        let peptideUnique_UserSelection = props.peptideUnique_UserSelection_ComponentData.peptideUnique_UserSelection;

        if ( ! peptideUnique_UserSelection ) {
            peptideUnique_UserSelection = false;
        }

        this.state = {
            peptideUnique_UserSelection,
            prev_peptideUnique_UserSelection_ComponentData : props.peptideUnique_UserSelection_ComponentData ,
        };
    }

    /**
     * Must be Static
     * Called before
     *   Initial render: 'render()'
     *   Rerender : 'shouldComponentUpdate()'
     *
     * Return new state (like return from setState(callback)) or null
     */
    static getDerivedStateFromProps( props : PeptideUnique_UserSelection_Props, state : PeptideUnique_UserSelection_State ) : PeptideUnique_UserSelection_State {

        // console.log("called: static getDerivedStateFromProps(): " );

        //    Return new state (like return from setState(callback)) or null

        if ( props.peptideUnique_UserSelection_ComponentData !== state.prev_peptideUnique_UserSelection_ComponentData ) {

            //   peptideUnique_UserSelection_ComponentData changed so update peptideUnique_UserSelection

            let peptideUnique_UserSelection = props.peptideUnique_UserSelection_ComponentData.peptideUnique_UserSelection;

            if ( ! peptideUnique_UserSelection ) {
                peptideUnique_UserSelection = false;
            }

            return {
                peptideUnique_UserSelection,
                prev_peptideUnique_UserSelection_ComponentData : props.peptideUnique_UserSelection_ComponentData,
            };
        }

        return null;
    }

    /**
     * @returns true if should update, false otherwise
     */
    shouldComponentUpdate( nextProps : PeptideUnique_UserSelection_Props, nextState : PeptideUnique_UserSelection_State ) : boolean {

        // console.log(" shouldComponentUpdate")

        //  Only update if changed: props or state: 

        if ( this.state.peptideUnique_UserSelection !== nextState.peptideUnique_UserSelection ) {
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

    //     // console.log("PeptideUnique_UserSelection: componentDidUpdate")

    //     // if ( this.dataObject_columnEntry_NewValue_Callback ) {
    //     //     this.dataObject_columnEntry_NewValue_Callback({ dataObject_columnEntry : this.props.dataObject_columnEntry });
    //     // }
    // }

    /**
     *
     */
    private _inputFieldChanged() {
        try {
            let newValue = true;
            if ( this.props.peptideUnique_UserSelection_StateObject.getPeptideUnique() ) {
                this.props.peptideUnique_UserSelection_StateObject.setPeptideUnique( false );
                newValue = false;
            } else {
                this.props.peptideUnique_UserSelection_StateObject.setPeptideUnique( true );
            }

            this.setState({ peptideUnique_UserSelection: newValue } );

            this.props.updateMadeTo_peptideUnique_UserSelection_StateObject_Callback();

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    render() {

        const peptideUnique_UserSelection = this.state.peptideUnique_UserSelection;

        return (
            <React.Fragment>

                <div className=" filter-common-block-selection-outer-block peptide-sequence-selection-outer-block " style={ { marginBottom : 8 } } >

                    <div>
                        <div style={ { fontSize: 18, fontWeight: "bold", float: "left" } }>Filter on Unique Peptides:</div>
                        <div className=" filter-common-selection-block peptide-sequence-selection-block " >
                            <div style={ {  marginTop: 2 } }>
                                <div className=" ">  {/* left-margin-same-as-checkbox; to align with checkbox in Variable and Static Mods */}
                                    <input type="checkbox" checked={ peptideUnique_UserSelection }
                                           onChange={ this._inputFieldChanged_BindThis }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );

    }
}

