/**
 * Psm_Exclude_IndependentDecoy_PSMs_UserSelection.tsx
 *
 * Peptide Unique Selection
 *
 *
 */

import React from 'react'

import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {Psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/psm_exclude_independent_decoy_psms/psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject";

/**
 *
 */
export interface psm_Exclude_IndependentDecoy_PSMs_UserSelection_Props {

    psm_Exclude_IndependentDecoy_PSMs_UserSelection_StateObject : Psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject;
    psm_Exclude_IndependentDecoy_PSMs_UserSelection_Object_Force_ResetToStateObject : object

    updateMadeTo_Psm_Exclude_IndependentDecoy_PSMs_UserSelection_StateObject_Callback : () => void;
}

interface psm_Exclude_IndependentDecoy_PSMs_UserSelection_State {

    forceUpdate?: object
}

/**
 *
 */
export class Psm_Exclude_IndependentDecoy_PSMs_UserSelection extends React.Component< psm_Exclude_IndependentDecoy_PSMs_UserSelection_Props, psm_Exclude_IndependentDecoy_PSMs_UserSelection_State > {

    private _inputFieldChanged_BindThis = this._inputFieldChanged.bind(this);

    /**
     *
     */
    constructor(props : psm_Exclude_IndependentDecoy_PSMs_UserSelection_Props) {
        super(props);

        this.state = {
            forceUpdate: {}
        };
    }

    /**
     * @returns true if should update, false otherwise
     */
    shouldComponentUpdate( nextProps : psm_Exclude_IndependentDecoy_PSMs_UserSelection_Props, nextState : psm_Exclude_IndependentDecoy_PSMs_UserSelection_State ) : boolean {

        // console.log(" shouldComponentUpdate")

        //  Only update if changed: props or state: 

        if (
            this.props.psm_Exclude_IndependentDecoy_PSMs_UserSelection_Object_Force_ResetToStateObject !== nextProps.psm_Exclude_IndependentDecoy_PSMs_UserSelection_Object_Force_ResetToStateObject
            || this.state.forceUpdate !== nextState.forceUpdate
        ) {
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

    //     // console.log("psm_Exclude_IndependentDecoy_PSMs_UserSelection: componentDidUpdate")

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
            if ( this.props.psm_Exclude_IndependentDecoy_PSMs_UserSelection_StateObject.get_psm_Exclude_IndependentDecoy_PSMs() ) {
                this.props.psm_Exclude_IndependentDecoy_PSMs_UserSelection_StateObject.set_psm_Exclude_IndependentDecoy_PSMs( false );
                newValue = false;
            } else {
                this.props.psm_Exclude_IndependentDecoy_PSMs_UserSelection_StateObject.set_psm_Exclude_IndependentDecoy_PSMs( true );
            }

            this.setState({ forceUpdate: {} } );

            this.props.updateMadeTo_Psm_Exclude_IndependentDecoy_PSMs_UserSelection_StateObject_Callback();

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    render() {

        const Psm_Exclude_IndependentDecoy_PSMs_UserSelection = this.props.psm_Exclude_IndependentDecoy_PSMs_UserSelection_StateObject.get_psm_Exclude_IndependentDecoy_PSMs();

        const marginBottomSize = 4;

        return (
            <React.Fragment>

                {/* Parent is CSS Grid with 2 Columns */}

                <div className=" filter-common-filter-label " style={ { marginBottom : marginBottomSize } }>
                    Exclude Independent Decoys:
                </div>
                <div className=" filter-common-selection-block peptide-sequence-selection-block "  style={ { marginBottom : marginBottomSize } } >
                    <div className=" filter-common-selection-inner-block ">
                        <div className=" ">  {/* left-margin-same-as-checkbox; to align with checkbox in Unique Peptide */}
                            <input type="checkbox" checked={ Psm_Exclude_IndependentDecoy_PSMs_UserSelection }
                                   onChange={ this._inputFieldChanged_BindThis }
                            />
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );

    }
}


