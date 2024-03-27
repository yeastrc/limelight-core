/**
 * proteinViewPage_ProteinGroupingFilterSelectionComponent.tsx
 *
 * Protein Group Option Selection for Filter Section just below Searches
 *
 * !!!!  WARNING:
 *
 *      The way to make this rerender (Root class ProteinPage_ProteinGroupingFilterSelection_Component_Root)
 *      is to create a new propValue : ProteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue object
 *      and pass that as the props
 *
 */

import React from "react";
import {ProteinGrouping_CentralStateManagerObjectClass} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_protein_list_common/proteinGrouping_CentralStateManagerObjectClass";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {
    Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
} from "page_js/common_all_pages/tooltip__green_i_in_circle__tooltip_on_hover__react_component/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component";

export type ProteinPage_ProteinGroupingFilterSelection_FilterValuesChanged_Callback =
    ( params: ProteinPage_ProteinGroupingFilterSelection_FilterValuesChanged_Callback_Param ) => void

export class ProteinPage_ProteinGroupingFilterSelection_FilterValuesChanged_Callback_Param {
    
}


/**
 * Create new Instance of this class whenever any value changes in any of these properties so that this component will re-render
 */
export class ProteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue {

    displayOnly : boolean // No Click Handlers for changing Filters (PSM, Peptide, Protein)
    proteinGrouping_CentralStateManagerObjectClass : ProteinGrouping_CentralStateManagerObjectClass
    filterValuesChanged_Callback : ( params : ProteinPage_ProteinGroupingFilterSelection_FilterValuesChanged_Callback_Param ) => void

    constructor(
        {
            displayOnly, // No Click Handlers for changing Filters (PSM, Peptide, Protein)
            proteinGrouping_CentralStateManagerObjectClass,
            filterValuesChanged_Callback
        } : {

            displayOnly : boolean // No Click Handlers for changing Filters
            proteinGrouping_CentralStateManagerObjectClass : ProteinGrouping_CentralStateManagerObjectClass
            filterValuesChanged_Callback : ( params : ProteinPage_ProteinGroupingFilterSelection_FilterValuesChanged_Callback_Param ) => void
        }) {

        this.displayOnly = displayOnly
        this.proteinGrouping_CentralStateManagerObjectClass = proteinGrouping_CentralStateManagerObjectClass
        this.filterValuesChanged_Callback = filterValuesChanged_Callback
    }
}
/**
 *
 */
interface ProteinPage_ProteinGroupingFilterSelection_Component_Root_Props {

    propValue : ProteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue
}

/**
 *
 */
interface ProteinPage_ProteinGroupingFilterSelection_Component_Root_State {

    _placeHolder: any
}

/**
 *
 * !!!!  WARNING:
 *
 *      The way to make this rerender (Root class ProteinPage_ProteinGroupingFilterSelection_Component_Root)
 *      is to create a new propValue : ProteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue object
 *      and pass that as the props
 */
export class ProteinPage_ProteinGroupingFilterSelection_Component_Root extends React.Component< ProteinPage_ProteinGroupingFilterSelection_Component_Root_Props, ProteinPage_ProteinGroupingFilterSelection_Component_Root_State > {

    private _proteinGroupNone_RadioButton_OnChange_Handler_BindThis = this._proteinGroupNone_RadioButton_OnChange_Handler.bind(this)
    private _proteinGroup_GroupProteins_RadioButton_OnChange_Handler_BindThis = this._proteinGroup_GroupProteins_RadioButton_OnChange_Handler.bind(this)
    private _proteinGroup_GroupProteins_NonSubset_RadioButton_OnChange_Handler_BindThis = this._proteinGroup_GroupProteins_NonSubset_RadioButton_OnChange_Handler.bind(this)
    private _proteinGroup_GroupProteins_Parsimonious_RadioButton_OnChange_Handler_BindThis = this._proteinGroup_GroupProteins_Parsimonious_RadioButton_OnChange_Handler.bind(this)
    private _showHiddenProteins_CheckBox_OnChange_Handler_BindThis = this._showHiddenProteins_CheckBox_OnChange_Handler.bind(this);

    private _showHiddenProteins_Checkbox_Ref :  React.RefObject<HTMLInputElement>

    /**
     *
     */
    constructor(props: ProteinPage_ProteinGroupingFilterSelection_Component_Root_Props) {
        super(props);

        this._showHiddenProteins_Checkbox_Ref = React.createRef();

    }

    /**
     * Only update when propValue is new object.
     */
    shouldComponentUpdate(nextProps: Readonly<ProteinPage_ProteinGroupingFilterSelection_Component_Root_Props>, nextState: Readonly<ProteinPage_ProteinGroupingFilterSelection_Component_Root_State>, nextContext: any): boolean {

        if ( nextProps.propValue !== this.props.propValue ) {
            return  true
        }
        return false;
    }

    //  Click Handlers for the Radio Buttons

    private _proteinGroupNone_RadioButton_OnChange_Handler(event: React.MouseEvent<HTMLInputElement, MouseEvent>) {
        try {
            this.props.propValue.proteinGrouping_CentralStateManagerObjectClass.setGroupProteins_No_Grouping();  // Update state in URL

            if (  this.props.propValue.filterValuesChanged_Callback ) {
                const param = new ProteinPage_ProteinGroupingFilterSelection_FilterValuesChanged_Callback_Param();
                this.props.propValue.filterValuesChanged_Callback( param );
            }
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }
    private _proteinGroup_GroupProteins_RadioButton_OnChange_Handler(event: React.MouseEvent<HTMLInputElement, MouseEvent>) {
        try {
            this.props.propValue.proteinGrouping_CentralStateManagerObjectClass.setGroupProteins_All_Groups();  // Update state in URL

            if (  this.props.propValue.filterValuesChanged_Callback ) {
                const param = new ProteinPage_ProteinGroupingFilterSelection_FilterValuesChanged_Callback_Param();
                this.props.propValue.filterValuesChanged_Callback( param );
            }
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }
    private _proteinGroup_GroupProteins_NonSubset_RadioButton_OnChange_Handler(event: React.MouseEvent<HTMLInputElement, MouseEvent>) {
        try {
            this.props.propValue.proteinGrouping_CentralStateManagerObjectClass.setGroupProteins_NonSubset_Groups();  // Update state in URL

            if (  this.props.propValue.filterValuesChanged_Callback ) {
                const param = new ProteinPage_ProteinGroupingFilterSelection_FilterValuesChanged_Callback_Param();
                this.props.propValue.filterValuesChanged_Callback( param );
            }
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }
    private _proteinGroup_GroupProteins_Parsimonious_RadioButton_OnChange_Handler(event: React.MouseEvent<HTMLInputElement, MouseEvent>) {
        try {
                this.props.propValue.proteinGrouping_CentralStateManagerObjectClass.setGroupProteins_Parsimonious_Groups();  // Update state in URL

                if (  this.props.propValue.filterValuesChanged_Callback ) {
                    const param = new ProteinPage_ProteinGroupingFilterSelection_FilterValuesChanged_Callback_Param();
                    this.props.propValue.filterValuesChanged_Callback( param );
                }
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    //  Click Handlers for the Check Boxes

    private _showHiddenProteins_CheckBox_OnChange_Handler(event: React.MouseEvent<HTMLInputElement, MouseEvent>) {
        try {
            if ( ! this._showHiddenProteins_Checkbox_Ref.current ) {
                console.warn( "this._showHiddenProteins_Checkbox_Ref.current NOT POPULATED.  Exit before Update.  In _showHiddenProteins_CheckBox_OnChange_Handler" );
                return;
            }

            const checked = this._showHiddenProteins_Checkbox_Ref.current.checked;

            this.props.propValue.proteinGrouping_CentralStateManagerObjectClass.set_ShowHiddenProteins_Selected( checked );  // Update state in URL

            if (  this.props.propValue.filterValuesChanged_Callback ) {
                const param = new ProteinPage_ProteinGroupingFilterSelection_FilterValuesChanged_Callback_Param();
                this.props.propValue.filterValuesChanged_Callback( param );
            }
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    ////////////////////////////////////

    /**
     *
     */
    render(): React.ReactNode {


        //  Convert groupProteins value into booleans for handlebars template

        let proteinGroupNone = false;
        let proteinGroup_GroupProteins = false;
        let proteinGroup_GroupProteins_NonSubset = false;
        let proteinGroup_GroupProteins_Parsimonious = false;

        if ( this.props.propValue.proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_No_Grouping() ) {

            proteinGroupNone = true;

        } else if ( this.props.propValue.proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_All_Groups() ) {

            proteinGroup_GroupProteins = true;

        } else if ( this.props.propValue.proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_NonSubset_Groups() ) {

            proteinGroup_GroupProteins_NonSubset = true;

        } else if ( this.props.propValue.proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_Parsimonious_Groups() ) {
             proteinGroup_GroupProteins_Parsimonious = true;

        } else {

            const msg = "ProteinPage_ProteinGroupingFilterSelection_Component_Root: NO this.props.propValue.proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_... function returned true ";
            console.warn( msg );
            throw Error( msg );
        }

        const eachRadioButtonStyle : React.CSSProperties = { marginLeft: 0 }

        const paddingTop_BothTopLevelDiv = 0;

        return (

             // <input margin-left: 0px;> so radio button left aligns with other content above and below it.  Browser default has > 0px for margin-left.
            <React.Fragment>

                {/* Parent is CSS Grid with 2 Columns */}

                <div className=" filter-common-filter-label " style={ { paddingBottom: 4, paddingTop: paddingTop_BothTopLevelDiv } }>
                    Protein Grouping:

                    <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                        title={
                            <span>
                                Proteins will be grouped into indistinguishable protein groups—groups of peptides identified by the same set of peptides.
                                The grouping option will optionally grey out groups that do not conform to the selected option.
                            </span>
                        }
                    />
                </div>
                <div className=" filter-common-selection-block " style={ { paddingBottom: 4, paddingTop: paddingTop_BothTopLevelDiv } }>
                    <div className=" filter-common-selection-inner-block ">
                        <div className=" left-margin-same-as-checkbox ">  {/* left-margin-same-as-checkbox; to align with checkbox in Unique Peptide */}
                            <span style={ { paddingRight: 8, whiteSpace: "nowrap" } }>
                                <label>
                                    <input type="radio" name="filter_show_protein_groups" style={ eachRadioButtonStyle }
                                           checked={ proteinGroup_GroupProteins_Parsimonious } onChange={ this._proteinGroup_GroupProteins_Parsimonious_RadioButton_OnChange_Handler_BindThis }
                                    />
                                    Parsimonious
                                </label>

                                <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                                    title={
                                        <span>
                                            Proteins are grouped by indistinguishable protein groups.
                                            That is, all proteins in the same protein group have the same list of identified peptides.
                                            Then a greedy set cover algorithm is used to estimate fewest number of protein groups necessary to explain the found peptides. Non-parsimonious groups are greyed out.
                                        </span>
                                    }
                                />
                            </span>

                            <span style={ { paddingRight: 8, whiteSpace: "nowrap" } }>
                                <label>
                                    <input type="radio" name="filter_show_protein_groups" style={ eachRadioButtonStyle }
                                           checked={ proteinGroup_GroupProteins_NonSubset } onChange={ this._proteinGroup_GroupProteins_NonSubset_RadioButton_OnChange_Handler_BindThis }
                                    />
                                    No Subgroups
                                </label>

                                <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                                    title={
                                        <span>
                                            Proteins are grouped by indistinguishable protein groups.
                                            That is, all proteins in the same protein group have the same list of identified peptides.
                                            All protein groups whose peptide list is a subset of another group’s peptide list will be greyed out.
                                        </span>
                                    }
                                />
                            </span>

                            <span style={ { paddingRight: 8, whiteSpace: "nowrap" } }>
                                <label>
                                    <input type="radio" name="filter_show_protein_groups" style={ eachRadioButtonStyle }
                                       checked={ proteinGroup_GroupProteins } onChange={ this._proteinGroup_GroupProteins_RadioButton_OnChange_Handler_BindThis }
                                    />
                                    Simple
                                </label>

                                <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                                    title={
                                        <span>
                                            Proteins are grouped by indistinguishable protein groups. That is, all proteins in the same protein group have the same list of identified peptides.
                                        </span>
                                    }
                                />
                            </span>

                            <span style={ { paddingRight: 8, whiteSpace: "nowrap" } }>
                                <label>
                                    <input type="radio" name="filter_show_protein_groups" style={ eachRadioButtonStyle }
                                           checked={ proteinGroupNone } onChange={ this._proteinGroupNone_RadioButton_OnChange_Handler_BindThis }
                                    />
                                    No Groups
                                </label>

                                <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                                    title={
                                        <span>
                                            Each row contains the name(s), description(s), and statistics for a single protein sequence. Proteins are not grouped.
                                        </span>
                                    }
                                />
                            </span>
                        </div>
                        {/*{ ( proteinGroup_GroupProteins_NonSubset || proteinGroup_GroupProteins_Parsimonious ) ? (*/}
                            <div style={ { marginTop: 4 } }>  {/* left-margin-same-as-checkbox; to align with checkbox in Unique Peptide */}
                                <label>
                                    <input
                                        type="checkbox" ref={ this._showHiddenProteins_Checkbox_Ref }
                                        checked={ this.props.propValue.proteinGrouping_CentralStateManagerObjectClass.get_ShowHiddenProteins_Selected() }
                                        onChange={ this._showHiddenProteins_CheckBox_OnChange_Handler_BindThis }
                                    />
                                    Show removed proteins
                                </label>

                                <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                                    title={
                                        <span>
                                            Protein groups that would be removed by the option above will instead be shown as greyed-out entries in the table below.
                                        </span>
                                    }
                                />
                            </div>
                        {/*) : null}*/}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
