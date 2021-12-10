/**
 * peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_Component.tsx
 *
 * Filter on Counts - PSM
 *
 *
 //  Use these 2 lines to "Clear" the State object and update the Component Display
 // peptideList_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject.clearAll();
 // Set Prop param 'peptideList_SingleProtein_FilterOnCounts_psm_UserSelections_Object_Force_ResetToStateObject' to new empty object  {}
 *
 */

import React from 'react'
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {PeptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on_counts_psm/js/peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject";

//  Delay after input change before call callback, to wait for additional keyboard input
const CALL_CALLBACK_DELAY = 200;  // in milliseconds

/**
 *
 */
export interface PeptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_Component_Props {

    peptideList_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject : PeptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject;
    peptideList_SingleProtein_FilterOnCounts_psm_UserSelections_Object_Force_ResetToStateObject : object

    updateMadeTo_peptideList_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject_Callback : () => void
}

interface PeptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_Component_State {

    psmFilterOnCount_UserSelection? : number
    prev_peptideList_SingleProtein_FilterOnCounts_psm_UserSelections_Object_Force_ResetToStateObject? : object
}

/**
 *
 */
export class PeptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_Component extends React.Component< PeptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_Component_Props, PeptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_Component_State > {

    private _psmCount_InputFieldChanged_BindThis = this._psmCount_InputFieldChanged.bind(this);

    private readonly _psmEntry_Ref :  React.RefObject<HTMLInputElement>

    private _inputFieldChanged_TimeoutId : number;


    /**
     *
     */
    constructor(props : PeptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_Component_Props) {
        super(props);

        this._psmEntry_Ref = React.createRef();

        this.state = {
            psmFilterOnCount_UserSelection: props.peptideList_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject.get_PSM_CountFilter()
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
    static getDerivedStateFromProps(props : PeptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_Component_Props, state : PeptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_Component_State ) : PeptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_Component_State {

        // console.log("called: static getDerivedStateFromProps(): " );

        //    Return new state (like return from setState(callback)) or null

        if ( props.peptideList_SingleProtein_FilterOnCounts_psm_UserSelections_Object_Force_ResetToStateObject
            !== state.prev_peptideList_SingleProtein_FilterOnCounts_psm_UserSelections_Object_Force_ResetToStateObject ) {

            return {
                psmFilterOnCount_UserSelection: props.peptideList_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject.get_PSM_CountFilter(),
                prev_peptideList_SingleProtein_FilterOnCounts_psm_UserSelections_Object_Force_ResetToStateObject : props.peptideList_SingleProtein_FilterOnCounts_psm_UserSelections_Object_Force_ResetToStateObject
            };
        }

        return null;
    }

    /**
     * @returns true if should update, false otherwise
     */
    shouldComponentUpdate(nextProps : PeptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_Component_Props, nextState : PeptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_Component_State ) : boolean {

        // console.log(" shouldComponentUpdate")

        //  Only update if changed: props or state:

        if ( this.state.psmFilterOnCount_UserSelection !== nextState.psmFilterOnCount_UserSelection ) {
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

            this.props.peptideList_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject.set_PSM_CountFilter( newValue );

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
                this.props.updateMadeTo_peptideList_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject_Callback();

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
        const psmFilterOnCount_UserSelection = this.state.psmFilterOnCount_UserSelection;

        let psmFilterOnCount_UserSelection_String = "";
        if ( psmFilterOnCount_UserSelection !== undefined && psmFilterOnCount_UserSelection !== null ) {
            psmFilterOnCount_UserSelection_String = psmFilterOnCount_UserSelection.toString();
        }

        return (
            <React.Fragment>

                {/* Parent is CSS Grid with 2 Columns */}

                <div className=" filter-common-filter-label ">
                    Filter On Minimum PSM Count:

                    <div className=" filter-common-block-selection--section-label--help-tip-symbol ">
                        <div className=" inner-absolute-pos ">
                            <div className=" main-div ">
                                <p className="help-tip-actual">
                                    All peptides will have at least this many PSMs in at least one search or condition.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" filter-common-selection-block " >

                    {/*  Remove className=" filter-common-selection-inner-block " since have Input Field  */}
                    <div style={ { marginBottom: 6 } }>

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

            </React.Fragment>
        );

    }
}



