/**
 * peptideSequence_UserSelections.tsx
 * 
 * Peptide Sequence Selections
 * 
 * 
 */

import React from 'react'

import { UserSearchString_LocationsOn_ProteinSequence_Root } from 'page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/userSearchString_LocationsOn_ProteinSequence/userSearchString_LocationsOn_ProteinSequence_ComponentData';
import { userSearchString_LocationsOn_ProteinSequence_Compute } from 'page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/userSearchString_LocationsOn_ProteinSequence/userSearchString_LocationsOn_ProteinSequence_Compute';

import { PeptideSequence_UserSelections_StateObject } from 'page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_sequence_selected/js/peptideSequence_UserSelections_StateObject';
import { PeptideSequence_UserSelections_ComponentData } from 'page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_sequence_selected/js/peptideSequence_UserSelections_ComponentData';
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";


//  Delay after input change before call callback, to wait for additional keyboard input
const CALL_CALLBACK_DELAY = 200;  // in milliseconds

export class PeptideSequence_UserSelections_Component__UpdateMadeTo_peptideSequence_UserSelections_StateObject_New_UserSearchString_LocationsOn_ProteinSequence_Root_Callback_Params {
    userSearchString_LocationsOn_ProteinSequence_Root : UserSearchString_LocationsOn_ProteinSequence_Root
}

export type PeptideSequence_UserSelections_Component__UpdateMadeTo_peptideSequence_UserSelections_StateObject_New_UserSearchString_LocationsOn_ProteinSequence_Root_Callback = (
    params : PeptideSequence_UserSelections_Component__UpdateMadeTo_peptideSequence_UserSelections_StateObject_New_UserSearchString_LocationsOn_ProteinSequence_Root_Callback_Params
    ) => void

export type PeptideSequence_UserSelections_Component__UpdateMadeTo_peptideSequence_UserSelections_StateObject = () => void;


/**
 * 
 */
export interface PeptideSequence_UserSelections_Props {

    peptideSequence_UserSelections_ComponentData : PeptideSequence_UserSelections_ComponentData
    peptideSequence_UserSelections_StateObject : PeptideSequence_UserSelections_StateObject;
    proteinSequenceString : string;

    updateMadeTo_peptideSequence_UserSelections_StateObject_New_UserSearchString_LocationsOn_ProteinSequence_Root_Callback : PeptideSequence_UserSelections_Component__UpdateMadeTo_peptideSequence_UserSelections_StateObject_New_UserSearchString_LocationsOn_ProteinSequence_Root_Callback
    updateMadeTo_peptideSequence_UserSelections_StateObject_Callback : PeptideSequence_UserSelections_Component__UpdateMadeTo_peptideSequence_UserSelections_StateObject
}

interface PeptideSequence_UserSelections_State {

    peptideSequence_UserSelection? : string
    proteinSequenceString? : string
    prev_peptideSequence_UserSelections_ComponentData? : PeptideSequence_UserSelections_ComponentData
    userSearchString_LocationsOn_ProteinSequence_Root? : UserSearchString_LocationsOn_ProteinSequence_Root
}

/**
 * 
 */
export class PeptideSequence_UserSelections extends React.Component< PeptideSequence_UserSelections_Props, PeptideSequence_UserSelections_State > {

    private _inputFieldChanged_BindThis = this._inputFieldChanged.bind(this);

    private _inputFieldChanged_TimeoutId : number;

    /**
     * 
     */    
    constructor(props : PeptideSequence_UserSelections_Props) {
        super(props);

        let peptideSequence_UserSelection = props.peptideSequence_UserSelections_ComponentData.peptideSequence_UserSelection;

        if ( ! peptideSequence_UserSelection ) {
            peptideSequence_UserSelection = "";
        }

        let proteinSequenceString = props.proteinSequenceString;

        let userSearchString_LocationsOn_ProteinSequence_Root : UserSearchString_LocationsOn_ProteinSequence_Root = null;

        if ( proteinSequenceString ) {
            userSearchString_LocationsOn_ProteinSequence_Root = _compute_userSearchString_LocationsOn_ProteinSequence_Compute({

                searchString : peptideSequence_UserSelection,
                proteinSequenceString
            });
        }

        this.state = { 
            peptideSequence_UserSelection, 
            proteinSequenceString,
            prev_peptideSequence_UserSelections_ComponentData : props.peptideSequence_UserSelections_ComponentData ,
            userSearchString_LocationsOn_ProteinSequence_Root
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
    static getDerivedStateFromProps( props : PeptideSequence_UserSelections_Props, state : PeptideSequence_UserSelections_State ) : PeptideSequence_UserSelections_State {

        // console.log("called: static getDerivedStateFromProps(): " );

        //    Return new state (like return from setState(callback)) or null

        if ( props.peptideSequence_UserSelections_ComponentData !== state.prev_peptideSequence_UserSelections_ComponentData ) {

            //   peptideSequence_UserSelections_ComponentData changed so update peptideSequence_UserSelection
                
            let peptideSequence_UserSelection = props.peptideSequence_UserSelections_ComponentData.peptideSequence_UserSelection;

            if ( ! peptideSequence_UserSelection ) {
                peptideSequence_UserSelection = "";
            }
    
            let proteinSequenceString = props.proteinSequenceString;
            let userSearchString_LocationsOn_ProteinSequence_Root : UserSearchString_LocationsOn_ProteinSequence_Root = null;

            if ( proteinSequenceString ) {
                userSearchString_LocationsOn_ProteinSequence_Root = _compute_userSearchString_LocationsOn_ProteinSequence_Compute({

                    searchString : peptideSequence_UserSelection,
                    proteinSequenceString
                });
            }

            return { 
                peptideSequence_UserSelection, 
                proteinSequenceString,
                prev_peptideSequence_UserSelections_ComponentData : props.peptideSequence_UserSelections_ComponentData,
                userSearchString_LocationsOn_ProteinSequence_Root
            };
        }
            
        return null;
    }
  
    /**
     * @returns true if should update, false otherwise
     */
    shouldComponentUpdate( nextProps : PeptideSequence_UserSelections_Props, nextState : PeptideSequence_UserSelections_State ) : boolean {

        // console.log(" shouldComponentUpdate")

        //  Only update if changed: props or state: 

        if ( this.state.peptideSequence_UserSelection !== nextState.peptideSequence_UserSelection ) {
            return true;
        }
        if ( this.state.proteinSequenceString !== nextState.proteinSequenceString ) {
            return true;
        }
        if ( this.state.userSearchString_LocationsOn_ProteinSequence_Root !== nextState.userSearchString_LocationsOn_ProteinSequence_Root ) {
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

    //     // console.log("PeptideSequence_UserSelections: componentDidUpdate")

    //     // if ( this.dataObject_columnEntry_NewValue_Callback ) {
    //     //     this.dataObject_columnEntry_NewValue_Callback({ dataObject_columnEntry : this.props.dataObject_columnEntry });
    //     // }
    // }
     
    /**
     * 
     */    
    _inputFieldChanged( event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {
        try {
            const target_htmlElement = event.target as HTMLInputElement;
            const value_htmlElement = target_htmlElement.value;  //  New Value

            const peptideSequence_UserSelection = value_htmlElement;

            // console.log( "_inputFieldChanged: target.value: " + value_htmlElement + ", this.state.peptideSequence_UserSelection: " + this.state.peptideSequence_UserSelection );

            this.setState( (state : PeptideSequence_UserSelections_State, props : PeptideSequence_UserSelections_Props ) : PeptideSequence_UserSelections_State => {

                return { peptideSequence_UserSelection };
            });

            if ( this._inputFieldChanged_TimeoutId ) {
                window.clearTimeout( this._inputFieldChanged_TimeoutId );
            }

            this._inputFieldChanged_TimeoutId = window.setTimeout( () => {
                try {
                    this.props.peptideSequence_UserSelections_StateObject.setPeptideSearchStringFirstEntry( peptideSequence_UserSelection );

                    if ( this.state.proteinSequenceString ) {

                        const userSearchString_LocationsOn_ProteinSequence_Root : UserSearchString_LocationsOn_ProteinSequence_Root = _compute_userSearchString_LocationsOn_ProteinSequence_Compute({

                            searchString : peptideSequence_UserSelection,
                            proteinSequenceString : this.state.proteinSequenceString
                        });

                        this.setState( (state : PeptideSequence_UserSelections_State, props : PeptideSequence_UserSelections_Props) : PeptideSequence_UserSelections_State => {

                            return { userSearchString_LocationsOn_ProteinSequence_Root };
                        });

                        this.props.updateMadeTo_peptideSequence_UserSelections_StateObject_New_UserSearchString_LocationsOn_ProteinSequence_Root_Callback({ userSearchString_LocationsOn_ProteinSequence_Root });
                    } else {

                        this.props.updateMadeTo_peptideSequence_UserSelections_StateObject_Callback();
                    }


                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }, CALL_CALLBACK_DELAY );
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     * 
     */    
    render() {

        const peptideSequence_UserSelection = this.state.peptideSequence_UserSelection;

        let notFoundMessage : JSX.Element = undefined;

        if ( this.state.userSearchString_LocationsOn_ProteinSequence_Root ) {

            const noUserSearchString = this.state.userSearchString_LocationsOn_ProteinSequence_Root.noUserSearchString;

            if ( ( ! noUserSearchString ) && this.state.userSearchString_LocationsOn_ProteinSequence_Root.userSearchString_LocationsOn_ProteinSequence_Entries.length === 0 ) {
                notFoundMessage = (
                    <React.Fragment>
                        <span > </span>
                        <span style={ { fontSize: 10, color: "red" } }
                        >*not found in protein</span>
                    </React.Fragment>
                );
            }
        }

        return (
            <React.Fragment>

                {/* Parent is CSS Grid with 2 Columns */}

                <div className=" filter-common-filter-label ">
                    Filter On Peptide Sequence:

                    <div className=" filter-common-block-selection--section-label--help-tip-symbol ">
                        <div className=" inner-absolute-pos ">
                            <div className=" main-div ">
                                <p className="help-tip-actual">
                                    All shown peptides will contain the entered sequence.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" filter-common-selection-block " >
                    <div className=" filter-common-selection-inner-block ">
                        <div className=" left-margin-same-as-checkbox ">  {/* left-margin-same-as-checkbox; to align with checkbox in Unique Peptide */}
                            <input type="text" maxLength={ 400 } style={ { width: 250} } value={ peptideSequence_UserSelection }
                                   onChange={ this._inputFieldChanged_BindThis }
                            />
                            { notFoundMessage }
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );

    }    
}

/////////////////////////////

/**
 * @returns null if search string is empty or not set
 */
const _compute_userSearchString_LocationsOn_ProteinSequence_Compute = function({ 
    
    searchString, 
    proteinSequenceString 
} : { 
    searchString : string, 
    proteinSequenceString : string 
}) : UserSearchString_LocationsOn_ProteinSequence_Root {

    const searchStrings = [ searchString ];
    return userSearchString_LocationsOn_ProteinSequence_Compute({ proteinSequenceString, searchStrings });
}



