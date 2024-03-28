/**
 * reporterIonMass_UserSelections.tsx
 * 
 * Reporter Ion Mass Selections
 * 
 * 
 */

import React from 'react'

import { ReporterIonMass_UserSelections_ComponentData } from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/reporter_ions_user_selections/js/reporterIonMass_UserSelections_BuildData_ForReactComponent';
import { ReporterIonMass_UserSelections_StateObject } from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/reporter_ions_user_selections/js/reporterIonMass_UserSelections_StateObject';
import {SingleProtein_Filter_SelectionType} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinPage_SingleProtein_Filter_Enums";
import {SingleProtein_Filter_PerUniqueIdentifier_Entry} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinPage_SingleProtein_Filter_CommonObjects";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import { Filter_selectionItem_Any_All_SelectionItem_Container } from '../../filter_selectionItem_Any_All_SelectionItem/jsx/filter_selection_item__any__all__selection_item__container';
import {ModificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_reporter_ion__user_selections__coordinator/js/modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class";
import {SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData} from "page_js/data_pages/search_sub_group/search_sub_group_in_search_details_outer_block/jsx/searchSubGroup_In_SearchDetailsOuterBlock";
import {
    Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
} from "page_js/common_all_pages/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component";


/**
 * 
 */
export interface ReporterIonMass_UserSelections_Props {

    reporterIons_UserSelections_ComponentData : ReporterIonMass_UserSelections_ComponentData;

    modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class: ModificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class

    reporterIonMass_UserSelections_StateObject : ReporterIonMass_UserSelections_StateObject;
    updateMadeTo_reporterIonMass_UserSelections_StateObject_Callback : () => void;
}

interface ReporterIonMass_UserSelections_State {
    _placeholder: any
}

/**
 * 
 */
export class ReporterIonMass_UserSelections extends React.Component< ReporterIonMass_UserSelections_Props, ReporterIonMass_UserSelections_State > {

    /**
     * 
     */    
    constructor(props : ReporterIonMass_UserSelections_Props) {
        super(props);

        //  bind to 'this' for passing as parameters
        // this._callbackMethodForSelectedProteinSequenceChange_BindThis = this._callbackMethodForSelectedProteinSequenceChange.bind(this);

        this.state = { _placeholder: null };
    }

    /**
     * NOT a React function override
     *
     * Called by this component and parent components
     *
     * @returns - true if component will render, false otherwise
     */
    static limelight_willComponentRender(
        {
            reporterIons_UserSelections_ComponentData
        } : {
            reporterIons_UserSelections_ComponentData : ReporterIonMass_UserSelections_ComponentData
        }
    ) : boolean {

        if ( ( ! reporterIons_UserSelections_ComponentData ) || reporterIons_UserSelections_ComponentData.showNoReporterIonsMsg ) {

            //  Nothing to display so return false

            return false;  //  EARLY RETURN
        }

        return true;
    }

    /**
     * @returns true if should update, false otherwise
     */
    // shouldComponentUpdate(nextProps : ReporterIonMass_UserSelections_Props, nextState:ReporterIonMass_UserSelections_State) {
    //
    //     //  Only update if changed: props:
    //
    //     if ( this.props.reporterIons_UserSelections_ComponentData !== nextProps.reporterIons_UserSelections_ComponentData ) {
    //         return true;
    //     }
    //     return false;
    //
    //      //  If Comment out prev code, comment out this method
    // }

    /**
     * 
     */    
    render() {

        const reporterIonsData = this.props.reporterIons_UserSelections_ComponentData;

        // const showNoReporterIonsMsg = reporterIonsData.showNoReporterIonsMsg;
        const reporterIonEntries = reporterIonsData.reporterIonEntries;

        if ( ! ReporterIonMass_UserSelections.limelight_willComponentRender({ reporterIons_UserSelections_ComponentData: reporterIonsData }) ) {

            //  Nothing to Render
            return null;  // EARLY RETURN
        }

        let singleReporterIon_Entries = null;

        if ( reporterIonEntries ) {

            singleReporterIon_Entries = reporterIonEntries.map( (reporterIonEntry, index) => {

                return (
                    <SingleReporterIon_Entry
                        key={ reporterIonEntry.reporterIonMass }
                        reporterIonEntry={ reporterIonEntry }
                        modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class={ this.props.modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class }
                        reporterIonMass_UserSelections_StateObject={ this.props.reporterIonMass_UserSelections_StateObject }
                        updateMadeTo_reporterIonMass_UserSelections_StateObject_Callback={ this.props.updateMadeTo_reporterIonMass_UserSelections_StateObject_Callback }
                    />
                );
            });
        }

        return (
            <React.Fragment>

                {/* Parent is CSS Grid with 2 Columns */}

                <div className=" filter-common-filter-label ">
                    Filter On Reporter Ions:

                    <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                        title={
                            <span>
                                Filter peptides based on reporter ions.
                                All peptides will contain all reporter ions selected with the “AND” option.
                                All peptides will contain at least one of the reporter ions selected with the “OR” option.
                                And no peptides will contain any reporter ion selected with the “EXCLUDE” option.
                            </span>
                        }
                    />
                </div>

                <div className="filter-common-selection-block" >
                    <div className=" filter-common-selection-inner-block ">
                        <div >
                            { singleReporterIon_Entries }
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );

    }    
}

////////////

/**
 * 
 */
interface SingleReporterIon_Entry_Props {
    reporterIonEntry : {reporterIonMass: number, selected: boolean} //  selected NOT USED
    modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class: ModificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class
    reporterIonMass_UserSelections_StateObject : ReporterIonMass_UserSelections_StateObject;
    updateMadeTo_reporterIonMass_UserSelections_StateObject_Callback : () => void;
}

interface SingleReporterIon_Entry_State {
    selection_SelectionType : SingleProtein_Filter_SelectionType
    prev_reporterIonEntry? : {reporterIonMass: number, selected: boolean}
}

/**
 * 
 */
class SingleReporterIon_Entry extends React.Component< SingleReporterIon_Entry_Props, SingleReporterIon_Entry_State > {

    //  bind to 'this' for passing as parameters
    private _choice_ANY_Clicked_Callback_BindThis = this._choice_ANY_Clicked_Callback.bind(this)
    private _choice_ALL_Clicked_Callback_BindThis = this._choice_ALL_Clicked_Callback.bind(this)
    private _choice_NOT_Clicked_Callback_BindThis = this._choice_NOT_Clicked_Callback.bind(this)
    private _choice_Remove_Clicked_Callback_BindThis = this._choice_Remove_Clicked_Callback.bind(this)

    /**
     * 
     */    
    constructor(props : SingleReporterIon_Entry_Props) {
        super(props);

        let selection_SelectionType = SingleReporterIon_Entry._compute_new_selection_SelectionType_StateValue( props );

        this.state = { selection_SelectionType, prev_reporterIonEntry : props.reporterIonEntry };
    }

    /**
     *
     */
    private static _compute_new_selection_SelectionType_StateValue( props : SingleReporterIon_Entry_Props ) : SingleProtein_Filter_SelectionType {

        let selection_SelectionType : SingleProtein_Filter_SelectionType = null;

        {
            const entry = props.reporterIonMass_UserSelections_StateObject.get_ReporterIon_Selected_Entry(props.reporterIonEntry.reporterIonMass)

            if (entry) {
                selection_SelectionType = entry.selectionType;
            }
        }

        return selection_SelectionType;
    }

    /**
     * Must be Static
     * Called before 
     *   Initial render: 'render()'
     *   Rerender : 'shouldComponentUpdate()'
     * 
     * Return new state (like return from setState(callback)) or null
     */
    static getDerivedStateFromProps( props : SingleReporterIon_Entry_Props, state : SingleReporterIon_Entry_State ) {

        // console.log("called: static getDerivedStateFromProps(): " );

        //    Return new state (like return from setState(callback)) or null

        if ( props.reporterIonEntry !== state.prev_reporterIonEntry ) {

            //   reporterIonEntry changed so update SelectionType

            let selection_SelectionType = SingleReporterIon_Entry._compute_new_selection_SelectionType_StateValue( props );

            return { selection_SelectionType, prev_reporterIonEntry : props.reporterIonEntry };
        }
            
        return null;
    }
    
    /**
     * @returns true if should update, false otherwise
     */
    // shouldComponentUpdate(nextProps : SingleReporterIon_Entry_Props, nextState : SingleReporterIon_Entry_State ) {
    //
    //     //  Only update if changed: props or state:
    //
    //     if ( this.state.selection_SelectionType !== nextState.selection_SelectionType ) {
    //         return true;
    //     }
    //     if ( this.props.modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class !== nextProps.modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class ) {
    //         return true;
    //     }
    //
    //     return false;
    //
    //     //  If Comment out prev code, comment out this method
    // }

    /**
     *
     */
    private _choice_ANY_Clicked_Callback() {
        try {
            const selectionType = SingleProtein_Filter_SelectionType.ANY

            this.setState( (state, props) : SingleReporterIon_Entry_State => {

                return { selection_SelectionType : selectionType }
            });

            const reporterIonMass = this.props.reporterIonEntry.reporterIonMass;

            const newEntry = new SingleProtein_Filter_PerUniqueIdentifier_Entry({ selectionType })
            this.props.reporterIonMass_UserSelections_StateObject.set_ReporterIons_Selected( reporterIonMass, newEntry )

            this._updateRestofPage();

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _choice_ALL_Clicked_Callback() {
        try {
            const selectionType = SingleProtein_Filter_SelectionType.ALL

            this.setState( (state, props) : SingleReporterIon_Entry_State => {

                return { selection_SelectionType : selectionType }
            });

            const reporterIonMass = this.props.reporterIonEntry.reporterIonMass;

            const newEntry = new SingleProtein_Filter_PerUniqueIdentifier_Entry({ selectionType })
            this.props.reporterIonMass_UserSelections_StateObject.set_ReporterIons_Selected( reporterIonMass, newEntry )

            this._updateRestofPage();

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _choice_NOT_Clicked_Callback() {
        try {
            const selectionType = SingleProtein_Filter_SelectionType.NOT

            this.setState( (state, props) : SingleReporterIon_Entry_State => {

                return { selection_SelectionType : selectionType }
            });

            const reporterIonMass = this.props.reporterIonEntry.reporterIonMass;

            const newEntry = new SingleProtein_Filter_PerUniqueIdentifier_Entry({ selectionType })
            this.props.reporterIonMass_UserSelections_StateObject.set_ReporterIons_Selected( reporterIonMass, newEntry )

            this._updateRestofPage();

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _choice_Remove_Clicked_Callback() {
        try {
            this.setState( (state, props) : SingleReporterIon_Entry_State => {

                return { selection_SelectionType : null }
            });
            const reporterIonMass = this.props.reporterIonEntry.reporterIonMass;

            this.props.reporterIonMass_UserSelections_StateObject.delete_ReporterIons_Selected( reporterIonMass );

            this._updateRestofPage();

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _updateRestofPage() {
        try {
            window.setTimeout( () => {
                try {
                    this.props.updateMadeTo_reporterIonMass_UserSelections_StateObject_Callback();

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }, 1 );

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     * 
     */    
    render() {

        const reporterIonEntry = this.props.reporterIonEntry;

        const textLabel = reporterIonEntry.reporterIonMass.toString()

        return (
            <Filter_selectionItem_Any_All_SelectionItem_Container
                textLabel={ textLabel }
                current_selection_SelectionType={ this.state.selection_SelectionType }
                modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class={ this.props.modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class }
                any_Selected_Callback={ this._choice_ANY_Clicked_Callback_BindThis }
                all_Selected_Callback={ this._choice_ALL_Clicked_Callback_BindThis }
                not_Selected_Callback={ this._choice_NOT_Clicked_Callback_BindThis }
                remove_Selected_Callback={ this._choice_Remove_Clicked_Callback_BindThis }
            />
        );
    }
}
