/**
 * proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_Component.tsx
 *
 * Filter on Counts - PSM, Peptide, Unique Peptide Selections
 *
 *
 //  Use these 2 lines to "Clear" the State object and update the Component Display
 // proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject.clearAll();
 // Set Prop param 'proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_Object_Force_ResetToStateObject' to new empty object  {}
 *
 */

import React from 'react'
import {ProteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/filter_on__components/filter_on_counts__psm_peptide_unique_peptide/proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";

//  Delay after input change before call callback, to wait for additional keyboard input
const CALL_CALLBACK_DELAY = 200;  // in milliseconds

/**
 *
 */
export interface ProteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_Component_Props {

    proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject : ProteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject;
    proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_Object_Force_ResetToStateObject : object

    updateMadeTo_proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject_Callback : () => void
}

interface ProteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_Component_State {

    psmFilterOnCount_UserSelection? : number
    peptideFilterOnCount_UserSelection? : number
    uniquePeptideFilterOnCount_UserSelection? : number
    prev_proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_Object_Force_ResetToStateObject? : object
}

/**
 *
 */
export class ProteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_Component extends React.Component< ProteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_Component_Props, ProteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_Component_State > {

    private _psmCount_InputFieldChanged_BindThis = this._psmCount_InputFieldChanged.bind(this);
    private _peptideCount_InputFieldChanged_BindThis = this._peptideCount_InputFieldChanged.bind(this);
    private _uniquePeptideCount_InputFieldChanged_BindThis = this._uniquePeptideCount_InputFieldChanged.bind(this);

    private readonly _psmEntry_Ref :  React.RefObject<HTMLInputElement>
    private readonly _peptideEntry_Ref :  React.RefObject<HTMLInputElement>
    private readonly _uniquePeptideEntry_Ref :  React.RefObject<HTMLInputElement>


    private _inputFieldChanged_TimeoutId : number;


    /**
     *
     */
    constructor(props : ProteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_Component_Props) {
        super(props);

        this._psmEntry_Ref = React.createRef();
        this._peptideEntry_Ref = React.createRef();
        this._uniquePeptideEntry_Ref = React.createRef();

        this.state = {
            psmFilterOnCount_UserSelection: props.proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject.get_PSM_CountFilter(),
            peptideFilterOnCount_UserSelection: props.proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject.get_Peptide_CountFilter(),
            uniquePeptideFilterOnCount_UserSelection: props.proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject.get_UniquePeptide_CountFilter()
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
    static getDerivedStateFromProps( props : ProteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_Component_Props, state : ProteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_Component_State ) : ProteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_Component_State {

        // console.log("called: static getDerivedStateFromProps(): " );

        //    Return new state (like return from setState(callback)) or null

        if ( props.proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_Object_Force_ResetToStateObject
            !== state.prev_proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_Object_Force_ResetToStateObject ) {

            return {
                psmFilterOnCount_UserSelection: props.proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject.get_PSM_CountFilter(),
                peptideFilterOnCount_UserSelection: props.proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject.get_Peptide_CountFilter(),
                uniquePeptideFilterOnCount_UserSelection: props.proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject.get_UniquePeptide_CountFilter(),
                prev_proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_Object_Force_ResetToStateObject : props.proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_Object_Force_ResetToStateObject
            };
        }

        return null;
    }

    /**
     * @returns true if should update, false otherwise
     */
    shouldComponentUpdate( nextProps : ProteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_Component_Props, nextState : ProteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_Component_State ) : boolean {

        // console.log(" shouldComponentUpdate")

        //  Only update if changed: props or state:

        if ( this.state.psmFilterOnCount_UserSelection !== nextState.psmFilterOnCount_UserSelection ) {
            return true;
        }
        if ( this.state.peptideFilterOnCount_UserSelection !== nextState.peptideFilterOnCount_UserSelection ) {
            return true;
        }
        if ( this.state.uniquePeptideFilterOnCount_UserSelection !== nextState.uniquePeptideFilterOnCount_UserSelection ) {
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

    // }

    /**
     *
     */
    _psmCount_InputFieldChanged( event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {
        try {
            let newValue : number = undefined;

            {
                const value_htmlElement = this._psmEntry_Ref.current.value;  //  New Value

                if ( value_htmlElement !== "" ) {

                    const valueNumber = Number.parseInt( value_htmlElement );
                    if ( Number.isNaN( valueNumber ) ) {
                        //  Not a valid integer. ignore new value
                        return; // EARLY RETURN
                    }
                    newValue = valueNumber;
                }
            }

            this.setState({ psmFilterOnCount_UserSelection: newValue });

            this.props.proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject.set_PSM_CountFilter( newValue );

            this._callUpdateCallback_AfterTimeout();

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    _peptideCount_InputFieldChanged( event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {
        try {
            let newValue : number = undefined;

            {
                const value_htmlElement = this._peptideEntry_Ref.current.value;  //  New Value

                if ( value_htmlElement !== "" ) {

                    const valueNumber = Number.parseInt( value_htmlElement );
                    if ( Number.isNaN( valueNumber ) ) {
                        //  Not a valid integer. ignore new value
                        return; // EARLY RETURN
                    }
                    newValue = valueNumber;
                }
            }

            this.setState({ peptideFilterOnCount_UserSelection: newValue });

            this.props.proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject.set_Peptide_CountFilter( newValue );

            this._callUpdateCallback_AfterTimeout();

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    _uniquePeptideCount_InputFieldChanged( event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {
        try {
            let newValue : number = undefined;

            {
                const value_htmlElement = this._uniquePeptideEntry_Ref.current.value;  //  New Value

                if ( value_htmlElement !== "" ) {

                    const valueNumber = Number.parseInt( value_htmlElement );
                    if ( Number.isNaN( valueNumber ) ) {
                        //  Not a valid integer. ignore new value
                        return; // EARLY RETURN
                    }
                    newValue = valueNumber;
                }
            }

            this.setState({ uniquePeptideFilterOnCount_UserSelection: newValue });

            this.props.proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject.set_UniquePeptide_CountFilter( newValue );

            this._callUpdateCallback_AfterTimeout();

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _callUpdateCallback_AfterTimeout() {

        if ( this._inputFieldChanged_TimeoutId ) {
            window.clearTimeout( this._inputFieldChanged_TimeoutId );
        }

        this._inputFieldChanged_TimeoutId = window.setTimeout( () => {
            try {
                this.props.updateMadeTo_proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject_Callback();

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        }, CALL_CALLBACK_DELAY );

    }

    /**
     *
     */
    render() {

        let psmFilterOnCount_UserSelection_String = "";
        if ( this.state.psmFilterOnCount_UserSelection ) {
            psmFilterOnCount_UserSelection_String = this.state.psmFilterOnCount_UserSelection.toString();
        }

        let peptideFilterOnCount_UserSelection_String = "";
        if ( this.state.peptideFilterOnCount_UserSelection ) {
            peptideFilterOnCount_UserSelection_String = this.state.peptideFilterOnCount_UserSelection.toString();
        }

        let uniquePeptideFilterOnCount_UserSelection_String = "";
        if ( this.state.uniquePeptideFilterOnCount_UserSelection ) {
            uniquePeptideFilterOnCount_UserSelection_String = this.state.uniquePeptideFilterOnCount_UserSelection.toString();
        }

        return (
            <React.Fragment>

                {/* Parent is CSS Grid with 2 Columns */}

                <div className=" filter-common-filter-label ">
                    Minimum PSM Count:

                    <div className=" filter-common-block-selection--section-label--help-tip-symbol ">
                        <div className=" inner-absolute-pos ">
                            <div className=" main-div ">
                                <p className="help-tip-actual">
                                    All proteins will have at least this many PSMs in at least one search or condition.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" filter-common-selection-block " >
                    <div className=" filter-common-selection-inner-block ">
                        <div className=" left-margin-same-as-checkbox ">  {/* left-margin-same-as-checkbox; to align with checkbox in Unique Peptide */}
                            <input
                                type="text" maxLength={ 10 } style={ { width: 50 } }
                                value={ psmFilterOnCount_UserSelection_String }
                                   onChange={ this._psmCount_InputFieldChanged_BindThis }
                                ref={ this._psmEntry_Ref }
                            />
                        </div>
                    </div>
                </div>

                <div className=" filter-common-filter-label ">
                    Minimum Distinct Peptide Count:

                    <div className=" filter-common-block-selection--section-label--help-tip-symbol ">
                        <div className=" inner-absolute-pos ">
                            <div className=" main-div ">
                                <p className="help-tip-actual">
                                    All proteins will have at least this many distinct peptides in at least one search or condition.
                                    <br/>
                                    A distinct peptide is the unique combination of amino acid sequence and, optionally, variable and open modifications.
                                    See the option under "Options."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" filter-common-selection-block " >
                    <div className=" filter-common-selection-inner-block ">
                        <div className=" left-margin-same-as-checkbox ">  {/* left-margin-same-as-checkbox; to align with checkbox in Unique Peptide */}
                            <input
                                type="text" maxLength={ 10 } style={ { width: 50 } }
                                value={ peptideFilterOnCount_UserSelection_String }
                                onChange={ this._peptideCount_InputFieldChanged_BindThis }
                                ref={ this._peptideEntry_Ref }
                            />
                        </div>
                    </div>
                </div>

                <div className=" filter-common-filter-label ">
                    Minimum Unique Peptide Count:

                    <div className=" filter-common-block-selection--section-label--help-tip-symbol ">
                        <div className=" inner-absolute-pos ">
                            <div className=" main-div ">
                                <p className="help-tip-actual">
                                    All proteins will have at least this many unique peptides in at least one search or condition.
                                    A unique peptide is a distinct peptide only found for a single protein or protein group.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" filter-common-selection-block " >
                    <div className=" filter-common-selection-inner-block ">
                        <div className=" left-margin-same-as-checkbox ">  {/* left-margin-same-as-checkbox; to align with checkbox in Unique Peptide */}
                            <input
                                type="text" maxLength={ 10 } style={ { width: 50 } }
                                value={ uniquePeptideFilterOnCount_UserSelection_String }
                                onChange={ this._uniquePeptideCount_InputFieldChanged_BindThis }
                                ref={ this._uniquePeptideEntry_Ref }
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );

    }
}



