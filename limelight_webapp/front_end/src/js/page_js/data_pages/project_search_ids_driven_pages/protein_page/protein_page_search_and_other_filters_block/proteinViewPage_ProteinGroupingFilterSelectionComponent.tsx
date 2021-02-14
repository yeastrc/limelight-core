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
    // private _proteinGroup_GroupProteins_Parsimonious_RadioButton_OnChange_Handler_BindThis = this._proteinGroup_GroupProteins_Parsimonious_RadioButton_OnChange_Handler.bind(this)

    /**
     *
     */
    constructor(props: ProteinPage_ProteinGroupingFilterSelection_Component_Root_Props) {
        super(props);

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
    // Comment out since not currently supported
    // private _proteinGroup_GroupProteins_Parsimonious_RadioButton_OnChange_Handler(event: React.MouseEvent<HTMLInputElement, MouseEvent>) {
    //     try {
    //             this.props.propValue.proteinGrouping_CentralStateManagerObjectClass.setGroupProteins_Parsimonious_Groups();  // Update state in URL
    //
    //             if (  this.props.propValue.filterValuesChanged_Callback ) {
    //                 const param = new ProteinPage_ProteinGroupingFilterSelection_FilterValuesChanged_Callback_Param();
    //                 this.props.propValue.filterValuesChanged_Callback( param );
    //             }
    //     } catch( e ) {
    //         reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
    //         throw e;
    //     }
    // }

    ////////////////////////////////////

    /**
     *
     */
    render(): React.ReactNode {


        //  Convert groupProteins value into booleans for handlebars template

        let proteinGroupNone = false;
        let proteinGroup_GroupProteins = false;
        let proteinGroup_GroupProteins_NonSubset = false;
        // let proteinGroup_GroupProteins_Parsimonious = false;

        if ( this.props.propValue.proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_No_Grouping() ) {

            proteinGroupNone = true;

        } else if ( this.props.propValue.proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_All_Groups() ) {

            proteinGroup_GroupProteins = true;

        } else if ( this.props.propValue.proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_NonSubset_Groups() ) {

            proteinGroup_GroupProteins_NonSubset = true;

        // } else if ( this.props.propValue.proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_Parsimonious_Groups() ) {
        //
        //     proteinGroup_GroupProteins_Parsimonious = true;

        } else {

            const msg = "ProteinPage_ProteinGroupingFilterSelection_Component_Root: NO this.props.propValue.proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_... function returned true ";
            console.warn( msg );
            throw Error( msg );
        }

        const eachRadioButtonStyle : React.CSSProperties = { marginLeft: 0 }

        return (

             // <input margin-left: 0px;> so radio button left aligns with other content above and below it.  Browser default has > 0px for margin-left.

            <tr >
                <td style={ { verticalAlign: "top", paddingBottom: 4, paddingRight: 6, whiteSpace: "nowrap" } }>Protein Grouping:</td>
                <td colSpan={ 5 } style={ { verticalAlign: "top", paddingBottom: 4 } }>
                    <span style={ { paddingRight: 3, whiteSpace: "nowrap" } }>
                        <label>
                            <input type="radio" name="filter_show_protein_groups" style={ eachRadioButtonStyle }
                               checked={ proteinGroupNone } onChange={ this._proteinGroupNone_RadioButton_OnChange_Handler_BindThis }
                            />
                            No Grouping
                        </label>
                    </span>
                    <span style={ { paddingRight: 3, whiteSpace: "nowrap" } }>
                        <label>
                            <input type="radio" name="filter_show_protein_groups" style={ eachRadioButtonStyle }
                               checked={ proteinGroup_GroupProteins } onChange={ this._proteinGroup_GroupProteins_RadioButton_OnChange_Handler_BindThis }
                            />
                            All Groups
                        </label>
                    </span>
                    <span style={ { paddingRight: 3, whiteSpace: "nowrap" } }>
                        <label>
                            <input type="radio" name="filter_show_protein_groups" style={ eachRadioButtonStyle }
                               checked={ proteinGroup_GroupProteins_NonSubset } onChange={ this._proteinGroup_GroupProteins_NonSubset_RadioButton_OnChange_Handler_BindThis }
                            />
                            Non-Subset Groups
                        </label>
                    </span>

                        {/* Comment out since not currently supported

                                private _proteinGroup_GroupProteins_Parsimonious_RadioButton_OnChange_Handler_BindThis = this._proteinGroup_GroupProteins_Parsimonious_RadioButton_OnChange_Handler.bind(this)

                            <span style="white-space: nowrap;">
                            <label><input type="radio" name="filter_show_protein_groups" className=" selector_filter_show_protein_groups_do_protein_groups_parsimonious " style="margin-left: 0px;"
                        {{#if proteinGroup_GroupProteins_Parsimonious }} checked {{/if}}/> Parsimonious Groups</label></span>
                            */}
                </td>
            </tr>
        )
    }
}
