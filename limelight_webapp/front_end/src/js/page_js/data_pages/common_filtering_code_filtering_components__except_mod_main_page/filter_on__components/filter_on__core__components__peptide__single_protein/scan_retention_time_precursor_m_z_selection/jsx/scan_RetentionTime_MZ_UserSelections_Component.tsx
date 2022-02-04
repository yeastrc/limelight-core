/**
 * scan_RetentionTime_MZ_UserSelections_Component.tsx
 *
 * Filter on Scan Retention Time and M/Z
 *
 *
 //  Use these 2 lines to "Clear" the State object and update the Component Display
 // scan_RetentionTime_MZ_UserSelections_StateObject.clearAll();
 // Set Prop param 'scan_RetentionTime_MZ_UserSelections_Object_Force_ResetToStateObject' to new empty object  {}
 *
 */

import React from 'react'
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {Scan_RetentionTime_MZ_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_retention_time_precursor_m_z_selection/js/scan_RetentionTime_MZ_UserSelections_StateObject";

//  Delay after input change before call callback, to wait for additional keyboard input
const CALL_CALLBACK_DELAY = 200;  // in milliseconds

/**
 *
 */
export interface Scan_RetentionTime_MZ_UserSelections_Component_Props {

    allSearches_Have_PSM_RetentionTime_Precursor_MZ_OR_ScanData : boolean
    projectSearchIds : Array<number>
    scan_RetentionTime_MZ_UserSelections_StateObject : Scan_RetentionTime_MZ_UserSelections_StateObject;
    scan_RetentionTime_MZ_UserSelections_Object_Force_ResetToStateObject : object

    updateMadeTo_scan_RetentionTime_MZ_UserSelections_StateObject_Callback : () => void
}

interface Scan_RetentionTime_MZ_UserSelections_Component_State {

    //  Strings as entered by user
    scanRetentionTime__From__Filter? : string
    scanRetentionTime__To__Filter? : string
    scanMZ__From__Filter? : string
    scanMZ__To__Filter? : string

    prev_scan_RetentionTime_MZ_UserSelections_Object_Force_ResetToStateObject? : object
}

/**
 *
 */
export class Scan_RetentionTime_MZ_UserSelections_Component extends React.Component< Scan_RetentionTime_MZ_UserSelections_Component_Props, Scan_RetentionTime_MZ_UserSelections_Component_State > {

    private _scanRetentionTime__From__Filter_InputFieldChanged_BindThis = this._scanRetentionTime__From__Filter_InputFieldChanged.bind(this);
    private _scanRetentionTime__To__Filter_InputFieldChanged_BindThis = this._scanRetentionTime__To__Filter_InputFieldChanged.bind(this);
    private _scanMZ__From__Filter_InputFieldChanged_BindThis = this._scanMZ__From__Filter_InputFieldChanged.bind(this);
    private _scanMZ__To__Filter_InputFieldChanged_BindThis = this._scanMZ__To__Filter_InputFieldChanged.bind(this);

    private readonly _scanRetentionTime__From__Filter_Entry_Ref :  React.RefObject<HTMLInputElement>
    private readonly _scanRetentionTime__To__Filter_Entry_Ref :  React.RefObject<HTMLInputElement>
    private readonly _scanMZ__From__Filter_Entry_Ref :  React.RefObject<HTMLInputElement>
    private readonly _scanMZ__To__Filter_Entry_Ref :  React.RefObject<HTMLInputElement>

    private _inputFieldChanged_TimeoutId : number;


    /**
     *
     */
    constructor(props : Scan_RetentionTime_MZ_UserSelections_Component_Props) {
        super(props);

        this._scanRetentionTime__From__Filter_Entry_Ref = React.createRef();
        this._scanRetentionTime__To__Filter_Entry_Ref = React.createRef();
        this._scanMZ__From__Filter_Entry_Ref = React.createRef();
        this._scanMZ__To__Filter_Entry_Ref = React.createRef();

        let scanRetentionTime__From__Filter: string = undefined;
        let scanRetentionTime__To__Filter: string = undefined;
        let scanMZ__From__Filter: string = undefined;
        let scanMZ__To__Filter: string = undefined;

        if ( props.allSearches_Have_PSM_RetentionTime_Precursor_MZ_OR_ScanData ) {

            if ( props.scan_RetentionTime_MZ_UserSelections_StateObject.get_retentionTime_InMinutes__From__Filter() !== undefined
                && props.scan_RetentionTime_MZ_UserSelections_StateObject.get_retentionTime_InMinutes__From__Filter() !== null ) {
                scanRetentionTime__From__Filter = props.scan_RetentionTime_MZ_UserSelections_StateObject.get_retentionTime_InMinutes__From__Filter().toString();
            }
            if ( props.scan_RetentionTime_MZ_UserSelections_StateObject.get_retentionTime_InMinutes__To__Filter() !== undefined
                && props.scan_RetentionTime_MZ_UserSelections_StateObject.get_retentionTime_InMinutes__To__Filter() !== null ) {
                scanRetentionTime__To__Filter = props.scan_RetentionTime_MZ_UserSelections_StateObject.get_retentionTime_InMinutes__To__Filter().toString();
            }
            if ( props.scan_RetentionTime_MZ_UserSelections_StateObject.get_mz__From__Filter() !== undefined && props.scan_RetentionTime_MZ_UserSelections_StateObject.get_mz__From__Filter() !== null ) {
                scanMZ__From__Filter = props.scan_RetentionTime_MZ_UserSelections_StateObject.get_mz__From__Filter().toString();
            }
            if ( props.scan_RetentionTime_MZ_UserSelections_StateObject.get_mz__To__Filter() !== undefined && props.scan_RetentionTime_MZ_UserSelections_StateObject.get_mz__To__Filter() !== null ) {
                scanMZ__To__Filter = props.scan_RetentionTime_MZ_UserSelections_StateObject.get_mz__To__Filter().toString();
            }
        }

        this.state = {
            scanRetentionTime__From__Filter,
            scanRetentionTime__To__Filter,
            scanMZ__From__Filter,
            scanMZ__To__Filter,
            prev_scan_RetentionTime_MZ_UserSelections_Object_Force_ResetToStateObject : props.scan_RetentionTime_MZ_UserSelections_Object_Force_ResetToStateObject
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
    static getDerivedStateFromProps(props : Scan_RetentionTime_MZ_UserSelections_Component_Props, state : Scan_RetentionTime_MZ_UserSelections_Component_State ) : Scan_RetentionTime_MZ_UserSelections_Component_State {

        // console.log("called: static getDerivedStateFromProps(): " );

        //    Return new state (like return from setState(callback)) or null

        if ( props.allSearches_Have_PSM_RetentionTime_Precursor_MZ_OR_ScanData ) {

            if ( props.scan_RetentionTime_MZ_UserSelections_Object_Force_ResetToStateObject
                !== state.prev_scan_RetentionTime_MZ_UserSelections_Object_Force_ResetToStateObject ) {

                let scanRetentionTime__From__Filter: string = undefined;
                if ( props.scan_RetentionTime_MZ_UserSelections_StateObject.get_retentionTime_InMinutes__From__Filter() !== undefined
                    && props.scan_RetentionTime_MZ_UserSelections_StateObject.get_retentionTime_InMinutes__From__Filter() !== null ) {
                    scanRetentionTime__From__Filter = props.scan_RetentionTime_MZ_UserSelections_StateObject.get_retentionTime_InMinutes__From__Filter().toString();
                }
                let scanRetentionTime__To__Filter: string = undefined;
                if ( props.scan_RetentionTime_MZ_UserSelections_StateObject.get_retentionTime_InMinutes__To__Filter() !== undefined
                    && props.scan_RetentionTime_MZ_UserSelections_StateObject.get_retentionTime_InMinutes__To__Filter() !== null ) {
                    scanRetentionTime__To__Filter = props.scan_RetentionTime_MZ_UserSelections_StateObject.get_retentionTime_InMinutes__To__Filter().toString();
                }
                let scanMZ__From__Filter: string = undefined;
                if ( props.scan_RetentionTime_MZ_UserSelections_StateObject.get_mz__From__Filter() !== undefined && props.scan_RetentionTime_MZ_UserSelections_StateObject.get_mz__From__Filter() !== null ) {
                    scanMZ__From__Filter = props.scan_RetentionTime_MZ_UserSelections_StateObject.get_mz__From__Filter().toString();
                }
                let scanMZ__To__Filter: string = undefined;
                if ( props.scan_RetentionTime_MZ_UserSelections_StateObject.get_mz__To__Filter() !== undefined && props.scan_RetentionTime_MZ_UserSelections_StateObject.get_mz__To__Filter() !== null ) {
                    scanMZ__To__Filter = props.scan_RetentionTime_MZ_UserSelections_StateObject.get_mz__To__Filter().toString();
                }

                return {
                    scanRetentionTime__From__Filter,
                    scanRetentionTime__To__Filter,
                    scanMZ__From__Filter,
                    scanMZ__To__Filter,
                    prev_scan_RetentionTime_MZ_UserSelections_Object_Force_ResetToStateObject : props.scan_RetentionTime_MZ_UserSelections_Object_Force_ResetToStateObject
                };
            }
        }

        return null;
    }

    /**
     * @returns true if should update, false otherwise
     */
    shouldComponentUpdate(nextProps : Scan_RetentionTime_MZ_UserSelections_Component_Props, nextState : Scan_RetentionTime_MZ_UserSelections_Component_State ) : boolean {

        // console.log(" shouldComponentUpdate")

        //  Only update if changed: props or state:


        if ( this.props.allSearches_Have_PSM_RetentionTime_Precursor_MZ_OR_ScanData ) {

            if ( this.state.scanRetentionTime__From__Filter !== nextState.scanRetentionTime__From__Filter
                || this.state.scanRetentionTime__To__Filter !== nextState.scanRetentionTime__To__Filter
                || this.state.scanMZ__From__Filter !== nextState.scanMZ__From__Filter
                || this.state.scanMZ__To__Filter !== nextState.scanMZ__To__Filter ) {
                return true;
            }
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
    _scanRetentionTime__From__Filter_InputFieldChanged( event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {
        try {
            const compute_numberString_From_InputField_Result = this._compute_numberString_From_InputField( this._scanRetentionTime__From__Filter_Entry_Ref.current.value)

            if ( compute_numberString_From_InputField_Result ) {

                this.setState({scanRetentionTime__From__Filter: compute_numberString_From_InputField_Result.inputFieldValue_Display});

                this.props.scan_RetentionTime_MZ_UserSelections_StateObject.set_retentionTime_InMinutes__From__Filter(compute_numberString_From_InputField_Result.inputFieldValue_Number);

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
    _scanRetentionTime__To__Filter_InputFieldChanged( event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {
        try {
            const compute_numberString_From_InputField_Result = this._compute_numberString_From_InputField( this._scanRetentionTime__To__Filter_Entry_Ref.current.value)

            if ( compute_numberString_From_InputField_Result ) {

                this.setState({scanRetentionTime__To__Filter: compute_numberString_From_InputField_Result.inputFieldValue_Display});

                this.props.scan_RetentionTime_MZ_UserSelections_StateObject.set_retentionTime_InMinutes__To__Filter(compute_numberString_From_InputField_Result.inputFieldValue_Number);

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
    _scanMZ__From__Filter_InputFieldChanged( event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {
        try {
            const compute_numberString_From_InputField_Result = this._compute_numberString_From_InputField( this._scanMZ__From__Filter_Entry_Ref.current.value)

            if ( compute_numberString_From_InputField_Result ) {

                this.setState({scanMZ__From__Filter: compute_numberString_From_InputField_Result.inputFieldValue_Display});

                this.props.scan_RetentionTime_MZ_UserSelections_StateObject.set_mz__From__Filter(compute_numberString_From_InputField_Result.inputFieldValue_Number);

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
    _scanMZ__To__Filter_InputFieldChanged( event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {
        try {
            const compute_numberString_From_InputField_Result = this._compute_numberString_From_InputField( this._scanMZ__To__Filter_Entry_Ref.current.value)

            if ( compute_numberString_From_InputField_Result ) {
                this.setState({scanMZ__To__Filter: compute_numberString_From_InputField_Result.inputFieldValue_Display});

                this.props.scan_RetentionTime_MZ_UserSelections_StateObject.set_mz__To__Filter(compute_numberString_From_InputField_Result.inputFieldValue_Number);

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
                this.props.updateMadeTo_scan_RetentionTime_MZ_UserSelections_StateObject_Callback();

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
        let scanRetentionTime__From__Filter_UserSelection_String = "";
        let scanRetentionTime__To__Filter_UserSelection_String = "";
        let scanMZ__From__Filter_UserSelection_String = "";
        let scanMZ__To__Filter_UserSelection_String = "";

        if ( this.props.allSearches_Have_PSM_RetentionTime_Precursor_MZ_OR_ScanData ) {

            const scanRetentionTime__From__Filter_UserSelection = this.state.scanRetentionTime__From__Filter;
            const scanRetentionTime__To__Filter_UserSelection = this.state.scanRetentionTime__To__Filter;
            const scanMZ__From__Filter_UserSelection = this.state.scanMZ__From__Filter;
            const scanMZ__To__Filter_UserSelection = this.state.scanMZ__To__Filter;

            if ( scanRetentionTime__From__Filter_UserSelection !== undefined && scanRetentionTime__From__Filter_UserSelection !== null ) {
                scanRetentionTime__From__Filter_UserSelection_String = scanRetentionTime__From__Filter_UserSelection.toString();
            }

            if ( scanRetentionTime__To__Filter_UserSelection !== undefined && scanRetentionTime__To__Filter_UserSelection !== null ) {
                scanRetentionTime__To__Filter_UserSelection_String = scanRetentionTime__To__Filter_UserSelection.toString();
            }

            if ( scanMZ__From__Filter_UserSelection !== undefined && scanMZ__From__Filter_UserSelection !== null ) {
                scanMZ__From__Filter_UserSelection_String = scanMZ__From__Filter_UserSelection.toString();
            }

            if ( scanMZ__To__Filter_UserSelection !== undefined && scanMZ__To__Filter_UserSelection !== null ) {
                scanMZ__To__Filter_UserSelection_String = scanMZ__To__Filter_UserSelection.toString();
            }
        }

        return (
            <React.Fragment>

                {/* Parent is CSS Grid with 2 Columns */}

                <div className=" filter-common-filter-label ">
                    Filter on Retention Time (Minutes):
                    {/*
                    <div className=" filter-common-block-selection--section-label--help-tip-symbol ">
                        <div className=" inner-absolute-pos ">
                            <div className=" main-div ">
                                <p className="help-tip-actual">
                                    Tooltip Contents HERE
                                </p>
                            </div>
                        </div>
                    </div>
                    */}
                </div>

                <div className=" filter-common-selection-block " >

                    {/*  Remove className=" filter-common-selection-inner-block " since have Input Field  */}
                    <div style={ { marginBottom: 3 } }>  {/* marginBottom: 3 - Add vertical space between input boxes for Retention Time and M/Z.  With No marginBottom they are touching */}

                        <div className=" left-margin-same-as-checkbox ">  {/* left-margin-same-as-checkbox; to align with checkbox in Unique Peptide */}
                            { ( ! this.props.allSearches_Have_PSM_RetentionTime_Precursor_MZ_OR_ScanData ) ? (
                                <div>
                                    Not all searches have Retention Time data
                                </div>
                            ) : (
                                <React.Fragment>
                                    <span >From</span>
                                    <span> </span>
                                    <input
                                        type="text" maxLength={ 10 } style={ { width: 50 } }
                                        value={ scanRetentionTime__From__Filter_UserSelection_String }
                                        onChange={ this._scanRetentionTime__From__Filter_InputFieldChanged_BindThis }
                                        ref={ this._scanRetentionTime__From__Filter_Entry_Ref }
                                    />
                                    <span> </span>
                                    <span >To</span>
                                    <span> </span>
                                    <input
                                        type="text" maxLength={ 10 } style={ { width: 50 } }
                                        value={ scanRetentionTime__To__Filter_UserSelection_String }
                                        onChange={ this._scanRetentionTime__To__Filter_InputFieldChanged_BindThis }
                                        ref={ this._scanRetentionTime__To__Filter_Entry_Ref }
                                    />
                                </React.Fragment>
                            )}
                        </div>
                    </div>
                </div>

                <div className=" filter-common-filter-label ">
                    Filter on Precursor M/Z:
                    {/*
                    <div className=" filter-common-block-selection--section-label--help-tip-symbol ">
                        <div className=" inner-absolute-pos ">
                            <div className=" main-div ">
                                <p className="help-tip-actual">
                                    Tooltip Contents HERE
                                </p>
                            </div>
                        </div>
                    </div>
                    */}
                </div>

                <div className=" filter-common-selection-block " >

                    {/*  Remove className=" filter-common-selection-inner-block " since have Input Field  */}
                    <div style={ { marginBottom: 6 } }>

                        <div className=" left-margin-same-as-checkbox ">  {/* left-margin-same-as-checkbox; to align with checkbox in Unique Peptide */}
                            { ( ! this.props.allSearches_Have_PSM_RetentionTime_Precursor_MZ_OR_ScanData ) ? (
                                <div>
                                    Not all searches have Precursor M/Z data
                                </div>
                            ) : (
                                <React.Fragment>
                                    <span >From</span>
                                    <span> </span>
                                    <input
                                        type="text" maxLength={ 10 } style={ { width: 50 } }
                                        value={ scanMZ__From__Filter_UserSelection_String }
                                        onChange={ this._scanMZ__From__Filter_InputFieldChanged_BindThis }
                                        ref={ this._scanMZ__From__Filter_Entry_Ref }
                                    />
                                    <span> </span>
                                    <span >To</span>
                                    <span> </span>
                                    <input
                                        type="text" maxLength={ 10 } style={ { width: 50 } }
                                        value={ scanMZ__To__Filter_UserSelection_String }
                                        onChange={ this._scanMZ__To__Filter_InputFieldChanged_BindThis }
                                        ref={ this._scanMZ__To__Filter_Entry_Ref }
                                    />
                                </React.Fragment>
                            )}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );

    }
}



