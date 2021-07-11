/**
 * proteinViewPage_DisplayData_ProteinList__DistinctPeptide_UserSelections_Root_Component.tsx
 *
 * Distinct Peptide User Selections - Root
 *
 * Where the User Selects what is used to make up a "Distinct Peptide" for the Protein List
 *
 *    Currently can choose Variable Modifications and Open Modifications
 */

import React from 'react'
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {ProteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject";


/**
 *
 */
export interface ProteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_Root_Component_Props {

    proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject : ProteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject
    searchContains_VariableModifications : boolean
    searchContains_OpenModifications : boolean
    updateMadeTo_proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject_Callback : () => void
}

/**
 *
 */
interface ProteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_Root_Component_State {

    fakeStateValue? : object  // Update to re-render component
    // _placeholder
}


/**
 *
 */
export class ProteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_Root_Component extends React.Component< ProteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_Root_Component_Props, ProteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_Root_Component_State > {

    private _variableModifications_Selected_Changed_BindThis = this._variableModifications_Selected_Changed.bind(this);
    private _openModifications_WithLocalization_Selected_Changed_BindThis = this._openModifications_WithLocalization_Selected_Changed.bind(this);

    /**
     *
     */
    constructor(props: ProteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_Root_Component_Props) {
        super(props);

        this.state = { fakeStateValue: {} };
    }

    /**
     *
     */
    private _variableModifications_Selected_Changed() {
        try {
            if ( this.props.proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject.getVariableModifications_Selected() ) {
                this.props.proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject.setVariableModifications_Selected( false );
            } else {
                this.props.proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject.setVariableModifications_Selected( true );
            }

            this.setState({ fakeStateValue: {} } ) //  Set state to force re-render component

            this.props.updateMadeTo_proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject_Callback();

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _openModifications_WithLocalization_Selected_Changed() {
        try {
            if ( this.props.proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject.getOpenModifications_WithLocalization_Selected() ) {
                this.props.proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject.setOpenModifications_WithLocalization_Selected( false );
            } else {
                this.props.proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject.setOpenModifications_WithLocalization_Selected( true );
            }

            this.setState({ fakeStateValue: {} } ) //  Set state to force re-render component

            this.props.updateMadeTo_proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject_Callback();

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    render() {
        // if ( ( ! this.props.searchContains_VariableModifications )
        //     && ( ! this.props.searchContains_OpenModifications ) ) {
        //
        //     //  NOTHING to Display
        //
        //     return null // EARLY RETURN
        // }

        let variableModsSelection : JSX.Element = undefined;
        let openModsSelection : JSX.Element = undefined;

        if ( this.props.searchContains_VariableModifications ) {

            variableModsSelection = (

                <span style={ { paddingRight: 10, whiteSpace: "nowrap" } }>
                    <span> </span>
                    <span>
                        +
                    </span>
                    <span> </span>
                    <label>
                        <input
                            type="checkbox"
                            checked={ this.props.proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject.getVariableModifications_Selected() }
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
                    <span> </span>
                    <span>
                        +
                    </span>
                    <span> </span>
                    <label>
                        <input
                            type="checkbox"
                            checked={ this.props.proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject.getOpenModifications_WithLocalization_Selected() }
                            onChange={ this._openModifications_WithLocalization_Selected_Changed_BindThis }
                        />
                        <span>Open Modifications</span>  {/* For openModifications_WithLocalization_Selected but labeled 'Open Modifications' */}
                    </label>
                </span>
            );
        }

        return (
            <React.Fragment>

                {/*  Add to 2 column CSS Grid for "Filter On" Section  */}

                <div >
                    <span className="  filter-common-filter-label  ">
                        Distinct peptide is:
                    </span>
                </div>

                <div className="  left-margin-same-as-checkbox  ">
                    <span>
                         sequence
                    </span>
                    <span> </span>
                    { variableModsSelection }
                    { openModsSelection }
                </div>
            </React.Fragment>
        );
    }
}