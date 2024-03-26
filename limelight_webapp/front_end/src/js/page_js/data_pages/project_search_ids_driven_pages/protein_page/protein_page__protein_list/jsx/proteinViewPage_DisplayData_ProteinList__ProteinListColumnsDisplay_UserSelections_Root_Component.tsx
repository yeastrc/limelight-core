/**
 * proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplay_UserSelections_Root_Component.tsx
 *
 * Protein List Columns Display Contents - Root
 *
 * Where the User Selects which columns are displayed on the Protein List
 *
 *    Currently can choose PSM Count, Distinct Peptide Count, Unique Peptide Count, Sequence Coverage
 */

import React from 'react'
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {ProteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject";


/**
 *
 */
export interface ProteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_Root_Component_Props {

    proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject : ProteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject
    updateMadeTo_proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject_Callback : () => void
    showSequenceCoverageOption: boolean
}

/**
 *
 */
interface ProteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_Root_Component_State {

    fakeStateValue? : object  // Update to re-render component
    // _placeholder
}


/**
 *
 */
export class ProteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_Root_Component extends React.Component< ProteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_Root_Component_Props, ProteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_Root_Component_State > {

    private _nsaf_Selected_Changed_BindThis = this._nsaf_Selected_Changed.bind(this);
    private _adjusted_Spectral_Count_ABACUS_Changed_BindThis = this._adjusted_Spectral_Count_ABACUS_Changed.bind(this);
    private _nsaf_USING__Adjusted_Spectral_Count_ABACUS_Changed_BindThis = this._nsaf_USING__Adjusted_Spectral_Count_ABACUS_Changed.bind(this)
    private _psmCount_Selected_Changed_BindThis = this._psmCount_Selected_Changed.bind(this);
    private _distinctPeptideCountSelected_Changed_BindThis = this._distinctPeptideCountSelected_Changed.bind(this);
    private _uniquePeptideCountSelected_Changed_BindThis = this._uniquePeptideCountSelected_Changed.bind(this);
    private _sequenceCoverage_Selected_Changed_BindThis = this._sequenceCoverage_Selected_Changed.bind(this);

    /**
     *
     */
    constructor(props: ProteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_Root_Component_Props) {
        super(props);

        this.state = { fakeStateValue: {} };
    }

    /**
     *
     */
    private _nsaf_Selected_Changed() {
        try {
            if ( this.props.proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_NSAF_Selected() ) {
                this.props.proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.set_NSAF_Selected( false );
            } else {
                this.props.proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.set_NSAF_Selected( true );
            }

            this.setState({ fakeStateValue: {} } ) //  Set state to force re-render component

            this.props.updateMadeTo_proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject_Callback();

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _adjusted_Spectral_Count_ABACUS_Changed() {
        try {
            if ( this.props.proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_Adjusted_Spectral_Count_ABACUS_Selected() ) {
                this.props.proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.set_Adjusted_Spectral_Count_ABACUS_Selected( false );
            } else {
                this.props.proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.set_Adjusted_Spectral_Count_ABACUS_Selected( true );
            }

            this.setState({ fakeStateValue: {} } ) //  Set state to force re-render component

            this.props.updateMadeTo_proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject_Callback();

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _nsaf_USING__Adjusted_Spectral_Count_ABACUS_Changed() {
        try {
            if ( this.props.proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_NSAF_USING__Adjusted_Spectral_Count_ABACUS_Selected() ) {
                this.props.proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.set_NSAF_USING__Adjusted_Spectral_Count_ABACUS_Selected( false );
            } else {
                this.props.proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.set_NSAF_USING__Adjusted_Spectral_Count_ABACUS_Selected( true );
            }

            this.setState({ fakeStateValue: {} } ) //  Set state to force re-render component

            this.props.updateMadeTo_proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject_Callback();

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _psmCount_Selected_Changed() {
        try {
            if ( this.props.proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_PsmCount_Selected() ) {
                this.props.proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.set_PsmCount_Selected( false );
            } else {
                this.props.proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.set_PsmCount_Selected( true );
            }

            this.setState({ fakeStateValue: {} } ) //  Set state to force re-render component

            this.props.updateMadeTo_proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject_Callback();

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _distinctPeptideCountSelected_Changed() {
        try {
            if ( this.props.proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_DistinctPeptideCount_Selected() ) {
                this.props.proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.set_DistinctPeptideCount_Selected( false );
            } else {
                this.props.proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.set_DistinctPeptideCount_Selected( true );
            }

            this.setState({ fakeStateValue: {} } ) //  Set state to force re-render component

            this.props.updateMadeTo_proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject_Callback();

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _uniquePeptideCountSelected_Changed() {
        try {
            if ( this.props.proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_UniquePeptideCount_Selected() ) {
                this.props.proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.set_UniquePeptideCount_Selected( false );
            } else {
                this.props.proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.set_UniquePeptideCount_Selected( true );
            }

            this.setState({ fakeStateValue: {} } ) //  Set state to force re-render component

            this.props.updateMadeTo_proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject_Callback();

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _sequenceCoverage_Selected_Changed() {
        try {
            if ( this.props.proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_SequenceCoverage_Selected() ) {
                this.props.proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.set_SequenceCoverage_Selected( false );
            } else {
                this.props.proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.set_SequenceCoverage_Selected( true );
            }

            this.setState({ fakeStateValue: {} } ) //  Set state to force re-render component

            this.props.updateMadeTo_proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject_Callback();

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    render() {

        const paddingTop_BothTopLevelDiv = 2;

        return (
            <React.Fragment>

                {/*  Add to 2 column CSS Grid for "Filter On" Section  */}

                <div >
                    <span className="  filter-common-filter-label  " style={ { paddingTop: paddingTop_BothTopLevelDiv } }>
                        Show In Table:

                        <div className=" help-tip-symbol--next-to-standard-font-size-text ">
                            <div className=" inner-absolute-pos ">
                                <div className=" main-div ">
                                    <p className="help-tip-actual">
                                        The columns to show.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </span>
                </div>

                <div style={ { paddingTop: paddingTop_BothTopLevelDiv } }>

                    { ( this.props.showSequenceCoverageOption ) ? (
                        <span style={ { paddingRight: 10, whiteSpace: "nowrap" } }>
                        <label>
                            <input
                                type="checkbox"
                                checked={ this.props.proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_SequenceCoverage_Selected() }
                                onChange={ this._sequenceCoverage_Selected_Changed_BindThis }
                            />
                            <span>Sequence Coverage</span>
                        </label>
                    </span>
                    ) : null }

                    <span style={ { paddingRight: 10, whiteSpace: "nowrap" } }>
                        <label>
                            <input
                                type="checkbox"
                                checked={ this.props.proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_PsmCount_Selected() }
                                onChange={ this._psmCount_Selected_Changed_BindThis }
                            />
                            <span>PSM Count</span>
                        </label>
                    </span>
                    <span style={ { paddingRight: 10, whiteSpace: "nowrap" } }>
                        <label>
                            <input
                                type="checkbox"
                                checked={ this.props.proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_NSAF_Selected() }
                                onChange={ this._nsaf_Selected_Changed_BindThis }
                            />
                            <span>NSAF</span>
                        </label>
                    </span>

                    <span style={ { paddingRight: 10, whiteSpace: "nowrap" } }>
                        <label>
                            <input
                                type="checkbox"
                                checked={ this.props.proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_Adjusted_Spectral_Count_ABACUS_Selected() }
                                onChange={ this._adjusted_Spectral_Count_ABACUS_Changed_BindThis }
                            />
                            <span>Adjusted Spectral Count (ABACUS)</span>
                        </label>
                    </span>

                    <span style={ { paddingRight: 10, whiteSpace: "nowrap" } }>
                        <label>
                            <input
                                type="checkbox"
                                checked={ this.props.proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_NSAF_USING__Adjusted_Spectral_Count_ABACUS_Selected() }
                                onChange={ this._nsaf_USING__Adjusted_Spectral_Count_ABACUS_Changed_BindThis }
                            />
                            <span>NSAF Using Adjusted Spectral Count (ABACUS)</span>
                        </label>
                    </span>

                    <span style={ { paddingRight: 10, whiteSpace: "nowrap" } }>
                        <label>
                            <input
                                type="checkbox"
                                checked={ this.props.proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_DistinctPeptideCount_Selected() }
                                onChange={ this._distinctPeptideCountSelected_Changed_BindThis }
                            />
                            <span>Distinct Peptide Count</span>
                        </label>
                    </span>
                    <span style={ { paddingRight: 10, whiteSpace: "nowrap" } }>
                        <label>
                            <input
                                type="checkbox"
                                checked={ this.props.proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_UniquePeptideCount_Selected() }
                                onChange={ this._uniquePeptideCountSelected_Changed_BindThis }
                            />
                            <span>Unique Peptide Count</span> {/* For distinctPeptideCountSelected but labeled 'Open Modifications' */ }
                        </label>
                    </span>
                </div>
            </React.Fragment>
        );
    }
}
