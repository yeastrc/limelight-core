/**
 * peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_Component.tsx
 *
 * Filter on Peptide Meets the Digestion selection - State Object
 *
 *     -  Peptide meets rules of being Tryptic or Non-Tryptic or other such/similar rules
 *
 //  Use these 2 lines to "Clear" the State object and update the Component Display
 // peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject.clearAll();
 // Set Prop param 'peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_Object_Force_ResetToStateObject' to new empty object  {}
 *
 */

import React from 'react'
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {
    PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject,
    PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject__SelectionEnum
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__peptide_meets_digestion__aka_tryptic_peptide_etc/peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject";

//  Delay after input change before call callback, to wait for additional keyboard input
const CALL_CALLBACK_DELAY = 200;  // in milliseconds

/**
 *
 */
export interface PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_Component_Props {

    peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject : PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject;
    peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_Object_Force_ResetToStateObject : object

    updateMadeTo_peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject_Callback : () => void
}

interface PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_Component_State {

    prev_peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_Object_Force_ResetToStateObject? : object
    force_Rerender?: object
}

/**
 *
 */
export class PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_Component extends React.Component< PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_Component_Props, PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_Component_State > {

    private _userSelection_InputFieldChanged_BindThis = this._userSelection_InputFieldChanged.bind(this);

    private readonly _userSelection_SelectElement_Ref :  React.RefObject<HTMLSelectElement>

    private _inputFieldChanged_TimeoutId : number;


    /**
     *
     */
    constructor(props : PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_Component_Props) {
        super(props);

        this._userSelection_SelectElement_Ref = React.createRef();

        this.state = {
            prev_peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_Object_Force_ResetToStateObject : props.peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_Object_Force_ResetToStateObject,
            force_Rerender: {}
        };
    }

    /**
     * @returns true if should update, false otherwise
     */
    // shouldComponentUpdate(nextProps : PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_Component_Props, nextState : PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_Component_State ) : boolean {
    //
    //     // console.log(" shouldComponentUpdate")
    //
    //     //  Only update if changed: props or state:
    //
    //     if ( this.state.missedCleavageCount__From__Filter !== nextState.missedCleavageCount__From__Filter
    //         || this.state.missedCleavageCount__To__Filter !== nextState.missedCleavageCount__To__Filter ) {
    //         return true;
    //     }
    //
    //     return false;
    //
    //     //  If Comment out prev code, comment out this method
    // }

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
    _userSelection_InputFieldChanged( event: React.ChangeEvent<HTMLSelectElement> ) {
        try {
            if ( ( ! this._userSelection_SelectElement_Ref ) || ( ! this._userSelection_SelectElement_Ref.current ) ) {
                // Ref no longer available so exit
                return
            }

            const selectionValue = this._userSelection_SelectElement_Ref.current.value;

            if ( selectionValue === PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject__SelectionEnum.NONE ) {
                this.props.peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject.set_PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelection( selectionValue );
            } else if ( selectionValue === PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject__SelectionEnum.TRYPTIC_PEPTIDES ) {
                this.props.peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject.set_PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelection( selectionValue );
            } else if ( selectionValue === PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject__SelectionEnum.NON_TRYPTIC_PEPTIDES ) {
                this.props.peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject.set_PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelection( selectionValue );
            } else {
                const msg = "selectionValue is not a value in enum PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject__SelectionEnum.  selectionValue: " + selectionValue;
                console.warn(msg)
                throw Error(msg)
            }

            this._commonProcessing_After_Update_StateObject();

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _commonProcessing_After_Update_StateObject() : void {

        this.setState({ force_Rerender: {} })
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
                this.props.updateMadeTo_peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject_Callback();

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

        let currentSelectValue: string = this.props.peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject.get_PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelection()

        return (
            <React.Fragment>

                {/* Parent is CSS Grid with 2 Columns */}

                <div className=" filter-common-filter-label ">
                    Digestion filter:

                    <div className=" filter-common-block-selection--section-label--help-tip-symbol ">
                        <div className=" inner-absolute-pos ">
                            <div className=" main-div ">
                                <p className="help-tip-actual">
                                    Filter peptides based on protease digestion motif.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

                <div className=" filter-common-selection-block " >

                    {/*  Remove className=" filter-common-selection-inner-block " since have Input Field  */}
                    <div style={ { marginBottom: 3 } }>  {/* marginBottom: 3 - Add vertical space between input boxes for Retention Time and M/Z.  With No marginBottom they are touching */}

                        <div className=" left-margin-same-as-checkbox ">  {/* left-margin-same-as-checkbox; to align with checkbox in Unique Peptide */}

                            <select
                                ref={ this._userSelection_SelectElement_Ref }
                                onChange={ this._userSelection_InputFieldChanged_BindThis }
                                value={ currentSelectValue }
                            >
                                <option value={ PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject__SelectionEnum.NONE }>None</option>
                                <option value={ PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject__SelectionEnum.TRYPTIC_PEPTIDES }>Tryptic Peptides</option>
                                <option value={ PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject__SelectionEnum.NON_TRYPTIC_PEPTIDES }>Non Tryptic Peptides</option>
                            </select>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );

    }
}



