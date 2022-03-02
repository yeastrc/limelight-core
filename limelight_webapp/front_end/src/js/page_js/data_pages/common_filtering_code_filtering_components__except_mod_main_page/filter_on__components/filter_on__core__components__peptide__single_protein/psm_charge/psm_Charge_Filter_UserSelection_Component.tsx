/**
 * psm_Charge_Filter_UserSelection_Component.tsx
 *
 * Filter on Charge on PSM
 *
 *
 //  Use these 2 lines to "Clear" the State object and update the Component Display
 // psm_Charge_Filter_UserSelection_Component.clearAll();
 // Set Prop param 'psm_Charge_Filter_UserSelection_Object_Force_ResetToStateObject' to new empty object  {}
 *
 */

import React from 'react'
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {Psm_Charge_Filter_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/psm_charge/psm_Charge_Filter_UserSelection_StateObject";
import {limelight__Sort_ArrayOfNumbers_SortArrayInPlace} from "page_js/common_all_pages/limelight__Sort_ArrayOfNumbers_SortArrayInPlace";


/**
 *
 */
export class Psm_Charge_Filter_UserSelection_Component__Get_ChargeValues_ForSearches_Callback_Return_DataValue {
    charge_Values: Set<number>
}
/**
 *
 */
export class Psm_Charge_Filter_UserSelection_Component__Get_ChargeValues_ForSearches_Callback_ReturnValue {
    result: Psm_Charge_Filter_UserSelection_Component__Get_ChargeValues_ForSearches_Callback_Return_DataValue
    promise: Promise<Psm_Charge_Filter_UserSelection_Component__Get_ChargeValues_ForSearches_Callback_Return_DataValue>
}
/**
 *
 */
export type Psm_Charge_Filter_UserSelection_Component__Get_ChargeValues_ForSearches_Callback =
    () => Psm_Charge_Filter_UserSelection_Component__Get_ChargeValues_ForSearches_Callback_ReturnValue


/**
 *
 */
export interface Psm_Charge_Filter_UserSelection_Component_Props {

    psm_Charge_Filter_UserSelection_StateObject : Psm_Charge_Filter_UserSelection_StateObject;
    psm_Charge_Filter_UserSelection_Object_Force_ResetToStateObject : object

    psm_Charge_Filter_UserSelection_Component__Get_ChargeValues_ForSearches_Callback: Psm_Charge_Filter_UserSelection_Component__Get_ChargeValues_ForSearches_Callback

    updateMadeTo_psm_Charge_Filter_UserSelection_StateObject_Callback : () => void
}

interface Psm_Charge_Filter_UserSelection_Component_State {

    all_ChargeValues?: Set<number>
    show_LoadingData_Message?: boolean
    show_LoadingData_Error_Message?: boolean
    skip_show_ShowingAll_Message?: boolean
    prev_psm_Charge_Filter_UserSelection_Object_Force_ResetToStateObject? : object
    forceUpdate?: object
}

/**
 *
 */
export class Psm_Charge_Filter_UserSelection_Component extends React.Component< Psm_Charge_Filter_UserSelection_Component_Props, Psm_Charge_Filter_UserSelection_Component_State > {

    /**
     *
     */
    constructor(props : Psm_Charge_Filter_UserSelection_Component_Props) {
        super(props);

        let skip_show_ShowingAll_Message = false;
        let show_LoadingData_Message = false;

        if ( ! props.psm_Charge_Filter_UserSelection_StateObject.areAllSelected__chargeValues_OnPSMs() ) {
            show_LoadingData_Message = true;
            skip_show_ShowingAll_Message = true;
        }

        this.state = {
            show_LoadingData_Message,
            skip_show_ShowingAll_Message,
            prev_psm_Charge_Filter_UserSelection_Object_Force_ResetToStateObject: props.psm_Charge_Filter_UserSelection_Object_Force_ResetToStateObject,
            forceUpdate: {}
        }
    }

    /**
     *
     */
    componentDidMount() {

        if ( ! this.props.psm_Charge_Filter_UserSelection_StateObject.areAllSelected__chargeValues_OnPSMs() ) {
            //  Charge values selected on Mount so need to load Charge Values

            const { result, promise } =
                this.props.psm_Charge_Filter_UserSelection_Component__Get_ChargeValues_ForSearches_Callback();

            if ( result ) {
                this.setState({ show_LoadingData_Message: false, all_ChargeValues: result.charge_Values })
            } else {
                this.setState({ show_LoadingData_Message: true });
                promise.catch(reason => {
                    this.setState({ show_LoadingData_Message: false, show_LoadingData_Error_Message: true });
                });
                promise.then(value => { try {
                    this.setState({ show_LoadingData_Message: false, all_ChargeValues: value.charge_Values });

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            }
        }

    }

    /**
     * Must be Static
     * Called before
     *   Initial render: 'render()'
     *   Rerender : 'shouldComponentUpdate()'
     *
     * Return new state (like return from setState(callback)) or null
     */
    static getDerivedStateFromProps(props : Psm_Charge_Filter_UserSelection_Component_Props, state : Psm_Charge_Filter_UserSelection_Component_State ) : Psm_Charge_Filter_UserSelection_Component_State {

        // console.log("called: static getDerivedStateFromProps(): " );

        //    Return new state (like return from setState(callback)) or null

        if ( props.psm_Charge_Filter_UserSelection_Object_Force_ResetToStateObject
            !== state.prev_psm_Charge_Filter_UserSelection_Object_Force_ResetToStateObject ) {

            return {
                skip_show_ShowingAll_Message: false,
                prev_psm_Charge_Filter_UserSelection_Object_Force_ResetToStateObject : props.psm_Charge_Filter_UserSelection_Object_Force_ResetToStateObject
            };
        }

        return null;
    }

    /**
     * @returns true if should update, false otherwise
     */
    shouldComponentUpdate(nextProps : Psm_Charge_Filter_UserSelection_Component_Props, nextState : Psm_Charge_Filter_UserSelection_Component_State ) : boolean {

        // console.log(" shouldComponentUpdate: this.props.psm_Charge_Filter_UserSelection_Object_Force_ResetToStateObject: ", this.props.psm_Charge_Filter_UserSelection_Object_Force_ResetToStateObject )

        //  Only update if changed: props or state:

        if (
            this.props.psm_Charge_Filter_UserSelection_Object_Force_ResetToStateObject !== nextProps.psm_Charge_Filter_UserSelection_Object_Force_ResetToStateObject
            || this.state.skip_show_ShowingAll_Message !== nextState.skip_show_ShowingAll_Message
            || this.state.show_LoadingData_Message !== nextState.show_LoadingData_Message
            || this.state.show_LoadingData_Error_Message !== nextState.show_LoadingData_Error_Message
            || this.state.forceUpdate !== nextState.forceUpdate
        ) {
            return true;
        }

        return false;

        //  If Comment out prev code, comment out this method
    }


    // getSnapshotBeforeUpdate( <see docs> ) {


    // }

    // /**
    //  * After render()
    //  */
    // componentDidUpdate(prevProps, prevState, snapshot) {

    // }

    private _remove_ShowingAllMessage() {

        const { result, promise } =
            this.props.psm_Charge_Filter_UserSelection_Component__Get_ChargeValues_ForSearches_Callback();

        if ( result ) {
            this.setState({ all_ChargeValues: result.charge_Values })
        } else {
            this.setState({ show_LoadingData_Message: true });
            promise.catch(reason => {
                this.setState({ show_LoadingData_Message: false, show_LoadingData_Error_Message: true });
            });
            promise.then(value => { try {
                this.setState({ show_LoadingData_Message: false, all_ChargeValues: value.charge_Values });

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        }
        this.setState({ skip_show_ShowingAll_Message: true });
    }

    /**
     *
     */
    render() {
        try {
            let selectionsElements: Array<JSX.Element> = undefined;
            let show_ShowingAll_Message : boolean = false;

            const chargeValues_OnPSMs_Selected = this.props.psm_Charge_Filter_UserSelection_StateObject.get__chargeValues_OnPSMs_Selected();

            let showingForAll_ChargeValues = true;
            if ( chargeValues_OnPSMs_Selected ) {
                showingForAll_ChargeValues = false;
            }

            if ( ! this.state.show_LoadingData_Message ) {

                if ( showingForAll_ChargeValues && ( ! this.state.skip_show_ShowingAll_Message ) ) {

                    show_ShowingAll_Message = true;

                } else {
                    //  Render all selections
                    selectionsElements = this._render_ChargeValues_Selections();
                }
            }

            return (
                <React.Fragment>

                    {/* Parent is CSS Grid with 2 Columns */}

                    <div className=" filter-common-filter-label ">
                        Filter On Precursor Charge:

                        <div className=" filter-common-block-selection--section-label--help-tip-symbol ">
                            <div className=" inner-absolute-pos ">
                                <div className=" main-div ">
                                    <p className="help-tip-actual">
                                        Only PSMs with one of the checked precursor charges will be used.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className=" filter-common-selection-block " >

                        {/*  Remove className=" filter-common-selection-inner-block " since have Input Field  */}
                        <div style={ { marginBottom: 6 } }>

                            <div className=" left-margin-same-as-checkbox ">  {/* left-margin-same-as-checkbox; to align with checkbox in Unique Peptide */}

                                { ( this.state.show_LoadingData_Message ) ? (
                                    <div>
                                        Loading Data...
                                    </div>
                                ) : ( this.state.show_LoadingData_Error_Message ) ? (
                                    <div>
                                        Failed to load data
                                    </div>
                                ) : ( show_ShowingAll_Message ) ? (
                                    <div>
                                        <span
                                            className=" filter-single-value-display-block clickable "
                                            onClick={ event => { this._remove_ShowingAllMessage() } }
                                        >
                                            Showing All
                                        </span>
                                        <span> </span>
                                        <span
                                            className=" fake-link "
                                            style={ { fontSize: 10 } }
                                            onClick={ event => { this._remove_ShowingAllMessage() } }
                                        >
                                            Change Selection
                                        </span>
                                    </div>
                                ) : (
                                    selectionsElements
                                )}
                            </div>
                        </div>
                    </div>

                </React.Fragment>
            );

        } catch( e ) {
            console.warn("Exception caught in render", e );
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    //////////////////////

    /**
     *  Render PSM Charge Values Selections
     *
     *
     */
    private _render_ChargeValues_Selections() : Array<JSX.Element> {

        const selectionsElements: Array<JSX.Element> = [];

        const chargeValues_Array : Array<number> = [];

        for ( const chargeValue of this.state.all_ChargeValues ) {
            chargeValues_Array.push(chargeValue);
        }

        limelight__Sort_ArrayOfNumbers_SortArrayInPlace(chargeValues_Array);

        const chargeValues_OnPSMs_Selected = this.props.psm_Charge_Filter_UserSelection_StateObject.get__chargeValues_OnPSMs_Selected();

        let showingForAll_ChargeValues = true;
        if ( chargeValues_OnPSMs_Selected ) {
            showingForAll_ChargeValues = false;
        }

        for ( const chargeValue of chargeValues_Array ) {

            const element = (

                <span key={ chargeValue } style={ { whiteSpace: "nowrap" } }>
                    <label>
                        <input
                            type="checkbox" checked={ showingForAll_ChargeValues || chargeValues_OnPSMs_Selected.has( chargeValue ) }
                            onChange={ event => {
                                let chargeValues_OnPSMs_Selected_InOnChange = this.props.psm_Charge_Filter_UserSelection_StateObject.get__chargeValues_OnPSMs_Selected();
                                if ( ! chargeValues_OnPSMs_Selected_InOnChange ) {
                                    chargeValues_OnPSMs_Selected_InOnChange = new Set( this.state.all_ChargeValues );
                                }

                                if ( event.target.checked ) {
                                    chargeValues_OnPSMs_Selected_InOnChange.add( chargeValue );

                                    if ( chargeValues_OnPSMs_Selected_InOnChange.size === this.state.all_ChargeValues.size ) {
                                        // All Selected so set to undefined
                                        chargeValues_OnPSMs_Selected_InOnChange = undefined;
                                    }
                                } else {
                                    chargeValues_OnPSMs_Selected_InOnChange.delete( chargeValue );
                                }
                                this.props.psm_Charge_Filter_UserSelection_StateObject.set__chargeValues_OnPSMs_Selected(chargeValues_OnPSMs_Selected_InOnChange);

                                this.setState({ forceUpdate: {} });

                                this.props.updateMadeTo_psm_Charge_Filter_UserSelection_StateObject_Callback();

                            }}
                        />
                        <span>
                             +{ chargeValue }
                        </span>
                    </label>
                </span>
            );
            selectionsElements.push(element);

        }

        return selectionsElements;
    }
}



