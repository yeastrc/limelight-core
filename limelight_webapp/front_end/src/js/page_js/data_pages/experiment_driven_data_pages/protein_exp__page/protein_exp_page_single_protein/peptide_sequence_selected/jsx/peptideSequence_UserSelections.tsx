/**
 * peptideSequence_UserSelections.tsx
 * 
 * Peptide Sequence Selections
 * 
 * 
 */

import React from 'react'

import { UserSearchString_LocationsOn_ProteinSequence_Root } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/userSearchString_LocationsOn_ProteinSequence/userSearchString_LocationsOn_ProteinSequence_ComponentData';
import { userSearchString_LocationsOn_ProteinSequence_Compute } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/userSearchString_LocationsOn_ProteinSequence/userSearchString_LocationsOn_ProteinSequence_Compute';

import { PeptideSequence_UserSelections_StateObject } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_sequence_selected/js/peptideSequence_UserSelections_StateObject';
import { PeptideSequence_UserSelections_ComponentData } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_sequence_selected/js/peptideSequence_UserSelections_ComponentData';


//  Delay after input change before call callback, to wait for additional keyboard input
const CALL_CALLBACK_DELAY = 200;  // in milliseconds


/**
 * 
 */
export interface PeptideSequence_UserSelections_Props {

    peptideSequence_UserSelections_ComponentData : PeptideSequence_UserSelections_ComponentData
    peptideSequence_UserSelections_StateObject : PeptideSequence_UserSelections_StateObject;
    proteinSequenceString : string;
    updateMadeTo_peptideSequence_UserSelections_StateObject_New_UserSearchString_LocationsOn_ProteinSequence_Root_Callback : ({ 
        userSearchString_LocationsOn_ProteinSequence_Root 
    } : { 
        userSearchString_LocationsOn_ProteinSequence_Root : UserSearchString_LocationsOn_ProteinSequence_Root
    }) => void;
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

        const userSearchString_LocationsOn_ProteinSequence_Root : UserSearchString_LocationsOn_ProteinSequence_Root = _compute_userSearchString_LocationsOn_ProteinSequence_Compute({ 
    
            searchString : peptideSequence_UserSelection, 
            proteinSequenceString 
        });

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

            const userSearchString_LocationsOn_ProteinSequence_Root : UserSearchString_LocationsOn_ProteinSequence_Root = _compute_userSearchString_LocationsOn_ProteinSequence_Compute({ 
    
                searchString : peptideSequence_UserSelection, 
                proteinSequenceString 
            });

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

            this.props.peptideSequence_UserSelections_StateObject.setPeptideSearchStringFirstEntry( peptideSequence_UserSelection );

            const userSearchString_LocationsOn_ProteinSequence_Root : UserSearchString_LocationsOn_ProteinSequence_Root = _compute_userSearchString_LocationsOn_ProteinSequence_Compute({ 
    
                searchString : peptideSequence_UserSelection, 
                proteinSequenceString : this.state.proteinSequenceString
            });

            this.setState( (state : PeptideSequence_UserSelections_State, props : PeptideSequence_UserSelections_Props) : PeptideSequence_UserSelections_State => {

                return { userSearchString_LocationsOn_ProteinSequence_Root };
            });

            this.props.updateMadeTo_peptideSequence_UserSelections_StateObject_New_UserSearchString_LocationsOn_ProteinSequence_Root_Callback({ userSearchString_LocationsOn_ProteinSequence_Root });

        }, CALL_CALLBACK_DELAY );
    }

    /**
     * 
     */    
    render() {

        const peptideSequence_UserSelection = this.state.peptideSequence_UserSelection;

        const noUserSearchString = this.state.userSearchString_LocationsOn_ProteinSequence_Root.noUserSearchString;

        let notFoundMessage = undefined;

        if ( ( ! noUserSearchString ) && this.state.userSearchString_LocationsOn_ProteinSequence_Root.userSearchString_LocationsOn_ProteinSequence_Entries.length === 0 ) {
            notFoundMessage = (
                <React.Fragment>
                    <span > </span>
                    <span style={ { fontSize: 10, color: "red" } }
                    >*not found in protein</span>
                </React.Fragment>
            );
        }

        return (
            <React.Fragment>


                <div className=" filter-common-block-selection-outer-block peptide-sequence-selection-outer-block " >

                    <div>
                        <div style={ { fontSize: 18, fontWeight: "bold", float: "left" } }>Filter On Peptide:</div>
                        <div className=" filter-common-selection-block peptide-sequence-selection-block " >
                            <div style={ {  marginTop: 2 } }>
                                <div className=" ">  {/* left-margin-same-as-checkbox; to align with checkbox in Variable and Static Mods */}
                                    <input type="text" maxLength={ 400 } style={ { width: 180} } value={ peptideSequence_UserSelection }
                                        onChange={ this._inputFieldChanged_BindThis }
                                    />
                                    { notFoundMessage }
                                </div>
                            </div>
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



