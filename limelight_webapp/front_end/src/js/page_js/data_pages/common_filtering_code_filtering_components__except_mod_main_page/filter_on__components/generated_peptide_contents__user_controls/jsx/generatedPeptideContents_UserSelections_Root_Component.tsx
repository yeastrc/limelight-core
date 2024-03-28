/**
 * generatedPeptideContents_UserSelections_Root_Component.tsx
 *
 * Generated Peptide Contents User Selections - Root
 *
 * Where the User Selects what is put into the Generated Peptide shown in the Peptide List
 *
 *    Currently can choose Variable Modifications and variations on Open Modifications
 */

import React from 'react'
import {GeneratedPeptideContents_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/generated_peptide_contents__user_controls/js/generatedPeptideContents_UserSelections_StateObject";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {
    Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
} from "page_js/common_all_pages/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component";


/**
 *
 */
export interface GeneratedPeptideContents_UserSelects_Root_Component_Props {

    generatedPeptideContents_UserSelections_StateObject : GeneratedPeptideContents_UserSelections_StateObject
    searchContains_VariableModifications : boolean
    searchContains_OpenModifications : boolean
    searchContains_StaticModifications : boolean
    updateMadeTo_generatedPeptideContents_UserSelections_StateObject_Callback : () => void
}

/**
 *
 */
interface GeneratedPeptideContents_UserSelects_Root_Component_State {

    fakeStateValue? : object  // Update to re-render component
    // _placeholder
}


/**
 *
 */
export class GeneratedPeptideContents_UserSelections_Root_Component extends React.Component< GeneratedPeptideContents_UserSelects_Root_Component_Props, GeneratedPeptideContents_UserSelects_Root_Component_State > {

    private _variableModifications_Selected_Changed_BindThis = this._variableModifications_Selected_Changed.bind(this);
    // private _openModifications_Selected_Changed_BindThis = this._openModifications_Selected_Changed.bind(this);
    private _openModifications_WithLocalization_Selected_Changed_BindThis = this._openModifications_WithLocalization_Selected_Changed.bind(this);
    private _staticModifications_Selected_Changed_BindThis = this._staticModifications_Selected_Changed.bind(this);

    /**
     *
     */
    constructor(props: GeneratedPeptideContents_UserSelects_Root_Component_Props) {
        super(props);

        //  bind to 'this' for passing as parameters
        // this._callbackMethodForSelectedProteinSequenceChange_BindThis = this._callbackMethodForSelectedProteinSequenceChange.bind(this);

        this.state = { fakeStateValue: {} };
    }

    /**
     *
     */
    private _variableModifications_Selected_Changed() {
        try {
            if ( this.props.generatedPeptideContents_UserSelections_StateObject.getVariableModifications_Selected() ) {
                this.props.generatedPeptideContents_UserSelections_StateObject.setVariableModifications_Selected( false );
            } else {
                this.props.generatedPeptideContents_UserSelections_StateObject.setVariableModifications_Selected( true );
            }

            this.setState({ fakeStateValue: {} } ) //  Set state to force re-render component

            this.props.updateMadeTo_generatedPeptideContents_UserSelections_StateObject_Callback();

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    // private _openModifications_Selected_Changed() {
    //     try {
    //         if ( this.props.generatedPeptideContents_UserSelections_StateObject.getOpenModifications_Selected() ) {
    //             this.props.generatedPeptideContents_UserSelections_StateObject.setOpenModifications_Selected( false );
    //         } else {
    //             this.props.generatedPeptideContents_UserSelections_StateObject.setOpenModifications_Selected( true );
    //         }
    //
    //         this.setState({ fakeStateValue: {} } ) //  Set state to force re-render component
    //
    //         this.props.updateMadeTo_generatedPeptideContents_UserSelections_StateObject_Callback();
    //
    //     } catch( e ) {
    //         reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
    //         throw e;
    //     }
    // }

    /**
     *
     */
    private _openModifications_WithLocalization_Selected_Changed() {
        try {
            if ( this.props.generatedPeptideContents_UserSelections_StateObject.getOpenModifications_WithLocalization_Selected() ) {
                this.props.generatedPeptideContents_UserSelections_StateObject.setOpenModifications_Selected( false );
                this.props.generatedPeptideContents_UserSelections_StateObject.setOpenModifications_WithLocalization_Selected( false );
            } else {
                this.props.generatedPeptideContents_UserSelections_StateObject.setOpenModifications_Selected( true );
                this.props.generatedPeptideContents_UserSelections_StateObject.setOpenModifications_WithLocalization_Selected( true );
            }

            this.setState({ fakeStateValue: {} } ) //  Set state to force re-render component

            this.props.updateMadeTo_generatedPeptideContents_UserSelections_StateObject_Callback();

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _staticModifications_Selected_Changed() {
        try {
            if ( this.props.generatedPeptideContents_UserSelections_StateObject.getStaticModifications_Selected() ) {
                this.props.generatedPeptideContents_UserSelections_StateObject.setStaticModifications_Selected( false );
            } else {
                this.props.generatedPeptideContents_UserSelections_StateObject.setStaticModifications_Selected( true );
            }

            this.setState({ fakeStateValue: {} } ) //  Set state to force re-render component

            this.props.updateMadeTo_generatedPeptideContents_UserSelections_StateObject_Callback();

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    render() {
        if ( ( ! this.props.searchContains_VariableModifications )
            && ( ! this.props.searchContains_OpenModifications )
            && ( ! this.props.searchContains_StaticModifications ) ) {

            //  NOTHING to Display

            return null // EARLY RETURN
        }

        let variableModsSelection : JSX.Element = undefined;
        let openModsSelection : JSX.Element = undefined;
        let staticModsSelection : JSX.Element = undefined;

        if ( this.props.searchContains_VariableModifications ) {
            variableModsSelection = (

                <span style={ { paddingRight: 10, whiteSpace: "nowrap" } }>
                    <label>
                        <input type="checkbox"
                               checked={ this.props.generatedPeptideContents_UserSelections_StateObject.getVariableModifications_Selected() }
                               onChange={ this._variableModifications_Selected_Changed_BindThis }
                        />
                        <span>Variable Modifications</span>
                    </label>
                </span>
            )
        }

        if ( this.props.searchContains_OpenModifications ) {
            openModsSelection = (

                <span style={ { paddingRight: 10, whiteSpace: "nowrap" } }>
                    <label>
                        <input type="checkbox"
                               checked={ this.props.generatedPeptideContents_UserSelections_StateObject.getOpenModifications_WithLocalization_Selected() }
                               onChange={ this._openModifications_WithLocalization_Selected_Changed_BindThis }
                        />
                        <span>Open Modifications</span>  {/* For penModifications_WithLocalization_Selected but labeled 'Open Modifications' */}
                    </label>
                </span>
            );
            //                 <span style={ { paddingRight: 10, whiteSpace: "nowrap" } }>
            //                     <label>
            //                         <input type="checkbox"
            //                                checked={ this.props.generatedPeptideContents_UserSelections_StateObject.getOpenModifications_Selected() }
            //                                onChange={ this._openModifications_Selected_Changed_BindThis }
            //                         />
            //                         <span>Open Modifications</span>
            //                     </label>
            //                 </span>
        }

        if ( this.props.searchContains_StaticModifications ) {
            staticModsSelection = (
                <span style={{paddingRight: 10, whiteSpace: "nowrap"}}>
                    <label>
                        <input type="checkbox"
                               checked={this.props.generatedPeptideContents_UserSelections_StateObject.getStaticModifications_Selected()}
                               onChange={this._staticModifications_Selected_Changed_BindThis}
                        />
                        <span>Static Modifications</span>
                    </label>
                </span>
            );
        }

        return (
            <React.Fragment>

                {/* Parent is CSS Grid with 2 Columns */}

                <div className=" filter-common-filter-label ">
                    <div style={ { marginTop: 10, marginBottom: 10 } }>
                        Collate Peptides Using:

                        <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                            title={
                                <span>
                                    This option does not filter peptides, instead it affects how peptides are collated in the table below. Peptides (and their PSMs) will be collated according to their amino acid sequence AND the options that are filtered here.
                                </span>
                            }
                        />
                    </div>
                </div>

                <div className=" filter-common-selection-block " >
                    <div className=" filter-common-selection-inner-block ">
                        <div style={ { marginTop: 10, marginBottom: 10 } }>

                            { variableModsSelection }
                            { openModsSelection }
                            { staticModsSelection }

                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}
