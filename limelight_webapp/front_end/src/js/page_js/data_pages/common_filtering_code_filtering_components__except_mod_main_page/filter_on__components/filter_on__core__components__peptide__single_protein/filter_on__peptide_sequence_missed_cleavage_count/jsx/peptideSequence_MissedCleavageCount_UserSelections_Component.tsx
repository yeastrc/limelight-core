/**
 * peptideSequence_MissedCleavageCount_UserSelections_Component.tsx
 *
 * Filter on Peptide Sequence Missed Cleavage Count Range
 *
 *
 //  Use these 2 lines to "Clear" the State object and update the Component Display
 // peptideSequence_MissedCleavageCount_UserSelections_StateObject.clearAll();
 // Set Prop param 'peptideSequence_MissedCleavageCount_UserSelections_Object_Force_ResetToStateObject' to new empty object  {}
 *
 */

import React from 'react'
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {PeptideSequence_MissedCleavageCount_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__peptide_sequence_missed_cleavage_count/js/peptideSequence_MissedCleavageCount_UserSelections_StateObject";
import {
    Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
} from "page_js/common_all_pages/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component";

//  Delay after input change before call callback, to wait for additional keyboard input
const CALL_CALLBACK_DELAY = 200;  // in milliseconds

/**
 *
 */
export interface PeptideSequence_MissedCleavageCount_UserSelections_Component_Props {

    projectSearchIds : Array<number>
    peptideSequence_MissedCleavageCount_UserSelections_StateObject : PeptideSequence_MissedCleavageCount_UserSelections_StateObject;
    peptideSequence_MissedCleavageCount_UserSelections_Object_Force_ResetToStateObject : object

    updateMadeTo_peptideSequence_MissedCleavageCount_UserSelections_StateObject_Callback : () => void
}

interface PeptideSequence_MissedCleavageCount_UserSelections_Component_State {

    //  Strings as entered by user
    missedCleavageCount__From__Filter? : string
    missedCleavageCount__To__Filter? : string

    prev_peptideSequence_MissedCleavageCount_UserSelections_Object_Force_ResetToStateObject? : object
}

/**
 *
 */
export class PeptideSequence_MissedCleavageCount_UserSelections_Component extends React.Component< PeptideSequence_MissedCleavageCount_UserSelections_Component_Props, PeptideSequence_MissedCleavageCount_UserSelections_Component_State > {

    private _missedCleavageCount__From__Filter_InputFieldChanged_BindThis = this._missedCleavageCount__From__Filter_InputFieldChanged.bind(this);
    private _missedCleavageCount__To__Filter_InputFieldChanged_BindThis = this._missedCleavageCount__To__Filter_InputFieldChanged.bind(this);

    private readonly _missedCleavageCount__From__Filter_Entry_Ref :  React.RefObject<HTMLInputElement>
    private readonly _missedCleavageCount__To__Filter_Entry_Ref :  React.RefObject<HTMLInputElement>

    private _inputFieldChanged_TimeoutId : number;


    /**
     *
     */
    constructor(props : PeptideSequence_MissedCleavageCount_UserSelections_Component_Props) {
        super(props);

        this._missedCleavageCount__From__Filter_Entry_Ref = React.createRef();
        this._missedCleavageCount__To__Filter_Entry_Ref = React.createRef();

        let missedCleavageCount__From__Filter: string = undefined;
        let missedCleavageCount__To__Filter: string = undefined;

        if ( props.peptideSequence_MissedCleavageCount_UserSelections_StateObject.get_missedCleavageCount__From__Filter() !== undefined
            && props.peptideSequence_MissedCleavageCount_UserSelections_StateObject.get_missedCleavageCount__From__Filter() !== null ) {
            missedCleavageCount__From__Filter = props.peptideSequence_MissedCleavageCount_UserSelections_StateObject.get_missedCleavageCount__From__Filter().toString();
        }
        if ( props.peptideSequence_MissedCleavageCount_UserSelections_StateObject.get_missedCleavageCount__To__Filter() !== undefined
            && props.peptideSequence_MissedCleavageCount_UserSelections_StateObject.get_missedCleavageCount__To__Filter() !== null ) {
            missedCleavageCount__To__Filter = props.peptideSequence_MissedCleavageCount_UserSelections_StateObject.get_missedCleavageCount__To__Filter().toString();
        }

        this.state = {
            missedCleavageCount__From__Filter,
            missedCleavageCount__To__Filter,
            prev_peptideSequence_MissedCleavageCount_UserSelections_Object_Force_ResetToStateObject : props.peptideSequence_MissedCleavageCount_UserSelections_Object_Force_ResetToStateObject
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
    static getDerivedStateFromProps(props : PeptideSequence_MissedCleavageCount_UserSelections_Component_Props, state : PeptideSequence_MissedCleavageCount_UserSelections_Component_State ) : PeptideSequence_MissedCleavageCount_UserSelections_Component_State {

        // console.log("called: static getDerivedStateFromProps(): " );

        //    Return new state (like return from setState(callback)) or null

        if ( props.peptideSequence_MissedCleavageCount_UserSelections_Object_Force_ResetToStateObject
            !== state.prev_peptideSequence_MissedCleavageCount_UserSelections_Object_Force_ResetToStateObject ) {

            let missedCleavageCount__From__Filter: string = undefined;
            if ( props.peptideSequence_MissedCleavageCount_UserSelections_StateObject.get_missedCleavageCount__From__Filter() !== undefined
                && props.peptideSequence_MissedCleavageCount_UserSelections_StateObject.get_missedCleavageCount__From__Filter() !== null ) {
                missedCleavageCount__From__Filter = props.peptideSequence_MissedCleavageCount_UserSelections_StateObject.get_missedCleavageCount__From__Filter().toString();
            }
            let missedCleavageCount__To__Filter: string = undefined;
            if ( props.peptideSequence_MissedCleavageCount_UserSelections_StateObject.get_missedCleavageCount__To__Filter() !== undefined
                && props.peptideSequence_MissedCleavageCount_UserSelections_StateObject.get_missedCleavageCount__To__Filter() !== null ) {
                missedCleavageCount__To__Filter = props.peptideSequence_MissedCleavageCount_UserSelections_StateObject.get_missedCleavageCount__To__Filter().toString();
            }

            return {
                missedCleavageCount__From__Filter,
                missedCleavageCount__To__Filter,
                prev_peptideSequence_MissedCleavageCount_UserSelections_Object_Force_ResetToStateObject : props.peptideSequence_MissedCleavageCount_UserSelections_Object_Force_ResetToStateObject
            };
        }

        return null;
    }

    /**
     * @returns true if should update, false otherwise
     */
    shouldComponentUpdate(nextProps : PeptideSequence_MissedCleavageCount_UserSelections_Component_Props, nextState : PeptideSequence_MissedCleavageCount_UserSelections_Component_State ) : boolean {

        // console.log(" shouldComponentUpdate")

        //  Only update if changed: props or state:

        if ( this.state.missedCleavageCount__From__Filter !== nextState.missedCleavageCount__From__Filter
            || this.state.missedCleavageCount__To__Filter !== nextState.missedCleavageCount__To__Filter ) {
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
    _missedCleavageCount__From__Filter_InputFieldChanged( event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {
        try {
            const compute_numberString_From_InputField_Result = this._compute_numberString_From_InputField( this._missedCleavageCount__From__Filter_Entry_Ref.current.value)

            if ( compute_numberString_From_InputField_Result ) {

                this.setState({missedCleavageCount__From__Filter: compute_numberString_From_InputField_Result.inputFieldValue_Display});

                this.props.peptideSequence_MissedCleavageCount_UserSelections_StateObject.set_missedCleavageCount__From__Filter(compute_numberString_From_InputField_Result.inputFieldValue_Number);

                this._commonProcessing_After_Update_StateObject();
            }

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    _missedCleavageCount__To__Filter_InputFieldChanged( event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {
        try {
            const compute_numberString_From_InputField_Result = this._compute_numberString_From_InputField( this._missedCleavageCount__To__Filter_Entry_Ref.current.value)

            if ( compute_numberString_From_InputField_Result ) {

                this.setState({missedCleavageCount__To__Filter: compute_numberString_From_InputField_Result.inputFieldValue_Display});

                this.props.peptideSequence_MissedCleavageCount_UserSelections_StateObject.set_missedCleavageCount__To__Filter(compute_numberString_From_InputField_Result.inputFieldValue_Number);

                this._commonProcessing_After_Update_StateObject();
            }

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     * @param inputFieldValue
     */
    private _compute_numberString_From_InputField( inputFieldValue: string) : {
        inputFieldValue_Number: number
        inputFieldValue_Display: string
    } {

        if ( inputFieldValue === "" ) {

            return { inputFieldValue_Display: "", inputFieldValue_Number: undefined };
        }

        let inputFieldValue_Display : string = undefined;
        let inputFieldValue_Number : number = undefined;

        {
            const valueNumber = Number.parseFloat( inputFieldValue );
            if ( Number.isNaN( valueNumber ) ) {
                //  Not a valid integer. ignore new value
                return undefined; // EARLY RETURN
            }
            inputFieldValue_Number = valueNumber;

            inputFieldValue_Display = inputFieldValue_Number.toString();
            if ( inputFieldValue.endsWith( "." ) ) {
                inputFieldValue_Display += ".";
            }
        }

        return {
            inputFieldValue_Number, inputFieldValue_Display
        }
    }


    /**
     *
     */
    private _commonProcessing_After_Update_StateObject() : void {

        this._callUpdateCallback_AfterTimeout();
    }

    /**
     *
     */
    private _callUpdateCallback_AfterTimeout() {

        if ( this._inputFieldChanged_TimeoutId ) {
            window.clearTimeout( this._inputFieldChanged_TimeoutId );
            this._inputFieldChanged_TimeoutId = undefined;
        }

        this._inputFieldChanged_TimeoutId = window.setTimeout( () => {
            try {
                this.props.updateMadeTo_peptideSequence_MissedCleavageCount_UserSelections_StateObject_Callback();

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
        let missedCleavageCount__From__Filter_UserSelection_String = "";
        let missedCleavageCount__To__Filter_UserSelection_String = "";

        {
            const missedCleavageCount__From__Filter_UserSelection = this.state.missedCleavageCount__From__Filter;
            const missedCleavageCount__To__Filter_UserSelection = this.state.missedCleavageCount__To__Filter;

            if ( missedCleavageCount__From__Filter_UserSelection !== undefined && missedCleavageCount__From__Filter_UserSelection !== null ) {
                missedCleavageCount__From__Filter_UserSelection_String = missedCleavageCount__From__Filter_UserSelection.toString();
            }
            if ( missedCleavageCount__To__Filter_UserSelection !== undefined && missedCleavageCount__To__Filter_UserSelection !== null ) {
                missedCleavageCount__To__Filter_UserSelection_String = missedCleavageCount__To__Filter_UserSelection.toString();
            }
        }

        return (
            <React.Fragment>

                {/* Parent is CSS Grid with 2 Columns */}

                <div className=" filter-common-filter-label ">
                    Missed Cleavage Count:

                    <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                        title={
                            <span>
                                Only Peptides with a missed cleavage count in the supplied range will be used.
                            </span>
                        }
                    />
                </div>

                <div className=" filter-common-selection-block " >

                    {/*  Remove className=" filter-common-selection-inner-block " since have Input Field  */}
                    <div style={ { marginBottom: 6 } }>  {/* marginBottom: 3 - Add vertical space between input boxes for Retention Time and M/Z.  With No marginBottom they are touching */}

                        <div className=" left-margin-same-as-checkbox ">  {/* left-margin-same-as-checkbox; to align with checkbox in Unique Peptide */}

                            <span >From</span>
                            <span> </span>
                            <input
                                type="text" maxLength={ 10 } style={ { width: 50 } }
                                value={ missedCleavageCount__From__Filter_UserSelection_String }
                                onChange={ this._missedCleavageCount__From__Filter_InputFieldChanged_BindThis }
                                ref={ this._missedCleavageCount__From__Filter_Entry_Ref }
                            />
                            <span> </span>
                            <span >To</span>
                            <span> </span>
                            <input
                                type="text" maxLength={ 10 } style={ { width: 50 } }
                                value={ missedCleavageCount__To__Filter_UserSelection_String }
                                onChange={ this._missedCleavageCount__To__Filter_InputFieldChanged_BindThis }
                                ref={ this._missedCleavageCount__To__Filter_Entry_Ref }
                            />

                        </div>
                    </div>
                </div>

            </React.Fragment>
        );

    }
}



