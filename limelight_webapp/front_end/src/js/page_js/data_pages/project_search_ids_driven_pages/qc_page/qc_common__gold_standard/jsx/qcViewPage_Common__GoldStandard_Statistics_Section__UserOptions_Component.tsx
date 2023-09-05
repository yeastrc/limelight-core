/**
 * qcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component.tsx
 *
 * QC Page Common - Section - Gold Standard Statistics
 *
 * Component near top of section where User can select options
 *
 */

import React from "react";
import { reportWebErrorToServer } from "page_js/reportWebErrorToServer";


const _MODIFICATION_MASS__MAX_DIFFERENCE_FOR_CONSIDERED_EQUAL_DEFAULT = 3  //    DEFAULT VALUE



/**
 *
 */
export enum QcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component_Selections_Enum {

    MATCH_VARIABLE_MODIFICATIONS_OPEN_MODIFICATIONS_MATCH_POSITIONS = "MATCH_VARIABLE_MODIFICATIONS_OPEN_MODIFICATIONS_MATCH_POSITIONS",
    MATCH_VARIABLE_MODIFICATIONS_OPEN_MODIFICATIONS__NOT__MATCH_POSITIONS = "MATCH_VARIABLE_MODIFICATIONS_OPEN_MODIFICATIONS__NOT__MATCH_POSITIONS",
    MATCH_TOTAL_MODIFICATION_MASS = "MATCH_TOTAL_MODIFICATION_MASS"
}

/**
 *
 */
export const qcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component_OptionsSelections__GetDefaultValues = function () {

    const returnValue: QcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component_OptionsSelections = {

        modification_Mass__Max_Difference_For_Considered_Equal: _MODIFICATION_MASS__MAX_DIFFERENCE_FOR_CONSIDERED_EQUAL_DEFAULT,
        userOptions_Component_Selections: QcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component_Selections_Enum.MATCH_VARIABLE_MODIFICATIONS_OPEN_MODIFICATIONS_MATCH_POSITIONS
    }

    return returnValue;
}

/**
 *
 */
export class QcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component_OptionsSelections {

    readonly modification_Mass__Max_Difference_For_Considered_Equal: number
    readonly userOptions_Component_Selections: QcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component_Selections_Enum
}

/**
 *
 */
export class QcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component_OptionsSelections_Callback_Params {

    userOptions: QcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component_OptionsSelections
}

export type QcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component_OptionsSelections_Callback =
    ( params: QcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component_OptionsSelections_Callback_Params ) => void

/**
 *
 */
export interface QcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component_Props {

    callback__UserOptionsChanged: QcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component_OptionsSelections_Callback
}

/**
 *
 */
interface QcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component_State {

    force_ReRender_Object?: object
}

/**
 *
 */
export class QcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component extends React.Component< QcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component_Props, QcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component_State > {

    //  bind to 'this' for passing as parameters

    private _userOptions_Component_OptionsSelections = qcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component_OptionsSelections__GetDefaultValues()

    private _modification_Mass__Max_Difference_For_Considered_Equal__InputFieldValue_String: string
    private _modification_Mass__Max_Difference_For_Considered_Equal__InputFieldValue_ERROR_MESSAGE: string = null

    /**
     *
     */
    constructor(props: QcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component_Props) {
        super(props);

        this._modification_Mass__Max_Difference_For_Considered_Equal__InputFieldValue_String = this._userOptions_Component_OptionsSelections.modification_Mass__Max_Difference_For_Considered_Equal.toString()

        this.state = { force_ReRender_Object: {} }
    }

    /**
     *
     */
    render() {

        return (

            <div style={ { marginBottom: 15 } }  data-component-class-name={ this.constructor ? this.constructor.name : "Unknown: No this.constructor" }>

                <div>

                    <div style={ { marginTop: 5 } }>
                        <div>
                            <input
                                style={ { width: 50 } }
                                value={
                                    this._modification_Mass__Max_Difference_For_Considered_Equal__InputFieldValue_String
                                }
                                onChange={ event => { try {

                                    const fieldValue_String = event.target.value.trim()

                                    this._modification_Mass__Max_Difference_For_Considered_Equal__InputFieldValue_String = fieldValue_String

                                    this._modification_Mass__Max_Difference_For_Considered_Equal__InputFieldValue_ERROR_MESSAGE = null

                                    if ( fieldValue_String === "" || fieldValue_String === "." ) {

                                        this._modification_Mass__Max_Difference_For_Considered_Equal__InputFieldValue_ERROR_MESSAGE =
                                            "A value is required.  Displayed data based on last value of " +
                                            this._userOptions_Component_OptionsSelections.modification_Mass__Max_Difference_For_Considered_Equal

                                        this.setState({ force_ReRender_Object: {} })

                                        return  // EARLY RETURN
                                    }

                                    const fieldValue_Number = Number.parseFloat( fieldValue_String )

                                    if ( Number.isNaN( fieldValue_Number ) ) {

                                        this._modification_Mass__Max_Difference_For_Considered_Equal__InputFieldValue_ERROR_MESSAGE =
                                            "Entered value is not a valid number.  Displayed data based on last value of " +
                                            this._userOptions_Component_OptionsSelections.modification_Mass__Max_Difference_For_Considered_Equal +
                                            "."

                                        this.setState({ force_ReRender_Object: {} })

                                        return  // EARLY RETURN
                                    }

                                    // Have valid number so copy string version to input field

                                    this._modification_Mass__Max_Difference_For_Considered_Equal__InputFieldValue_String = fieldValue_Number.toString()


                                    if ( fieldValue_String.endsWith( "." ) ) {

                                        //  Entered string ends in '.' so append to number

                                        this._modification_Mass__Max_Difference_For_Considered_Equal__InputFieldValue_String += "."
                                    }

                                    //  Force display of updated this._modification_Mass__Max_Difference_For_Considered_Equal__InputFieldValue_String

                                    this.setState({ force_ReRender_Object: {} })

                                    window.setTimeout( ()=> {
                                        try {
                                            this._userOptions_Component_OptionsSelections = {
                                                modification_Mass__Max_Difference_For_Considered_Equal: fieldValue_Number,
                                                userOptions_Component_Selections: this._userOptions_Component_OptionsSelections.userOptions_Component_Selections
                                            }

                                            this.props.callback__UserOptionsChanged({ userOptions: this._userOptions_Component_OptionsSelections })

                                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
                                    }, 10 )

                                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}}
                            />
                            <span> modification mass max difference for considered equal</span>
                        </div>
                        { this._modification_Mass__Max_Difference_For_Considered_Equal__InputFieldValue_ERROR_MESSAGE ? (
                            <div
                                className=" error-text "
                                style={ { marginBottom: 5 } }
                            >
                                { this._modification_Mass__Max_Difference_For_Considered_Equal__InputFieldValue_ERROR_MESSAGE }
                            </div>
                        ) : null }
                    </div>

                    <div style={ { marginTop: 5 } }>
                        <label>
                            <input
                                type="radio"
                                checked={
                                    this._userOptions_Component_OptionsSelections.userOptions_Component_Selections
                                    === QcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component_Selections_Enum.MATCH_VARIABLE_MODIFICATIONS_OPEN_MODIFICATIONS_MATCH_POSITIONS
                                }
                                onChange={ event => { try {

                                    if ( event.target.checked ) {

                                        this._userOptions_Component_OptionsSelections = {
                                            modification_Mass__Max_Difference_For_Considered_Equal: this._userOptions_Component_OptionsSelections.modification_Mass__Max_Difference_For_Considered_Equal,
                                            userOptions_Component_Selections: QcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component_Selections_Enum.MATCH_VARIABLE_MODIFICATIONS_OPEN_MODIFICATIONS_MATCH_POSITIONS
                                        }

                                        this.setState({ force_ReRender_Object: {} })

                                        window.setTimeout( ()=> {
                                            try {
                                                this.props.callback__UserOptionsChanged({ userOptions: this._userOptions_Component_OptionsSelections })

                                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
                                        }, 10 )
                                    }

                                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}}
                            />
                            <span> Match Variable and Open Modifications and Match Positions</span>
                        </label>
                    </div>


                    <div style={ { marginTop: 5 } }>
                        <label>
                            <input
                                type="radio"
                                checked={
                                    this._userOptions_Component_OptionsSelections.userOptions_Component_Selections
                                    === QcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component_Selections_Enum.MATCH_VARIABLE_MODIFICATIONS_OPEN_MODIFICATIONS__NOT__MATCH_POSITIONS
                                }
                                onChange={ event => { try {

                                    if ( event.target.checked ) {
                                        this._userOptions_Component_OptionsSelections = {
                                            modification_Mass__Max_Difference_For_Considered_Equal: this._userOptions_Component_OptionsSelections.modification_Mass__Max_Difference_For_Considered_Equal,
                                            userOptions_Component_Selections: QcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component_Selections_Enum.MATCH_VARIABLE_MODIFICATIONS_OPEN_MODIFICATIONS__NOT__MATCH_POSITIONS
                                        }

                                        this.setState({ force_ReRender_Object: {} })

                                        window.setTimeout( ()=> {
                                            try {
                                                this.props.callback__UserOptionsChanged({ userOptions: this._userOptions_Component_OptionsSelections })

                                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
                                        }, 10 )
                                    }

                                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}}
                            />
                            <span> Match Variable and Open Modifications and NOT Match Positions</span>
                        </label>
                    </div>


                    <div style={ { marginTop: 5 } }>
                        <label>
                            <input
                                type="radio"
                                checked={
                                    this._userOptions_Component_OptionsSelections.userOptions_Component_Selections
                                    === QcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component_Selections_Enum.MATCH_TOTAL_MODIFICATION_MASS
                                }
                                onChange={ event => { try {

                                    if ( event.target.checked ) {

                                        this._userOptions_Component_OptionsSelections = {
                                            modification_Mass__Max_Difference_For_Considered_Equal: this._userOptions_Component_OptionsSelections.modification_Mass__Max_Difference_For_Considered_Equal,
                                            userOptions_Component_Selections: QcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component_Selections_Enum.MATCH_TOTAL_MODIFICATION_MASS
                                        }

                                        this.setState({ force_ReRender_Object: {} })

                                        window.setTimeout( ()=> {
                                            try {
                                                this.props.callback__UserOptionsChanged({ userOptions: this._userOptions_Component_OptionsSelections })

                                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
                                        }, 10 )
                                    }

                                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}}
                            />
                            <span> Match Total Modification Mass (Sum all variable and open modification masses) and NOT compare positions</span>
                        </label>
                    </div>
                </div>

            </div>
        );
    }

}
