/**
 * modificationMass_ShowOtherPeptidesWherePeptideSequenceMatchPeptidesMeetModFilters_UserSelections.tsx
 *
 * ShowOtherPeptidesWherePeptideSequenceMatchPeptidesMeetModFilters Selection
 *
 *
 */

import React from 'react'

import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {ModificationMass_UserSelections_ComponentData} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_ComponentData";
import {ModificationMass_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject";
import {
    Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
} from "page_js/common_all_pages/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component";
import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";

/**
 *
 */
export interface ModificationMass_ShowOtherPeptidesWherePeptideSequenceMatchPeptidesMeetModFilters_UserSelections_Props {

    modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject

    updateMadeTo_modificationMass_ShowOtherPeptidesWherePeptideSequenceMatchPeptidesMeetModFilters_UserSelections_StateObject_Callback : () => void;

    modificationMass_UserSelections_ComponentData : ModificationMass_UserSelections_ComponentData
}

interface ModificationMass_ShowOtherPeptidesWherePeptideSequenceMatchPeptidesMeetModFilters_UserSelections_State {

    forceUpdate?: object
}

/**
 *
 */
export class ModificationMass_ShowOtherPeptidesWherePeptideSequenceMatchPeptidesMeetModFilters_UserSelections extends React.Component< ModificationMass_ShowOtherPeptidesWherePeptideSequenceMatchPeptidesMeetModFilters_UserSelections_Props, ModificationMass_ShowOtherPeptidesWherePeptideSequenceMatchPeptidesMeetModFilters_UserSelections_State > {

    private _inputFieldChanged_BindThis = this._inputFieldChanged.bind(this);

    /**
     *
     */
    constructor(props : ModificationMass_ShowOtherPeptidesWherePeptideSequenceMatchPeptidesMeetModFilters_UserSelections_Props) {
        super(props);

        this.state = {
            forceUpdate: {}
        };
    }

    /**
     * @returns true if should update, false otherwise
     */
    shouldComponentUpdate(nextProps : ModificationMass_ShowOtherPeptidesWherePeptideSequenceMatchPeptidesMeetModFilters_UserSelections_Props, nextState : ModificationMass_ShowOtherPeptidesWherePeptideSequenceMatchPeptidesMeetModFilters_UserSelections_State ) : boolean {

        // console.log(" shouldComponentUpdate")

        //  Only update if changed: props or state:

        if ( this.props.modificationMass_UserSelections_ComponentData !== nextProps.modificationMass_UserSelections_ComponentData
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

    //     // console.log("ModificationMass_ShowOtherPeptidesWherePeptideSequenceMatchPeptidesMeetModFilters_UserSelection: componentDidUpdate")

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
            if ( this.props.modificationMass_UserSelections_StateObject.get_showOtherPeptidesWherePeptideSequenceMatchPeptidesMeetModFilters_UserSelection() ) {
                this.props.modificationMass_UserSelections_StateObject.set_showOtherPeptidesWherePeptideSequenceMatchPeptidesMeetModFilters_UserSelection( false );
                newValue = false;
            } else {
                this.props.modificationMass_UserSelections_StateObject.set_showOtherPeptidesWherePeptideSequenceMatchPeptidesMeetModFilters_UserSelection( true );
            }

            this.setState({ forceUpdate: {} } );

            this.props.updateMadeTo_modificationMass_ShowOtherPeptidesWherePeptideSequenceMatchPeptidesMeetModFilters_UserSelections_StateObject_Callback();

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    render() {

        if (
            ( ( ! this.props.modificationMass_UserSelections_ComponentData.staticModificationsData ) ||
                this.props.modificationMass_UserSelections_ComponentData.staticModificationsData.showNoStaticModificationsMsg ) &&
            ( ( ! this.props.modificationMass_UserSelections_ComponentData.variableModificationsData ) ||
                this.props.modificationMass_UserSelections_ComponentData.variableModificationsData.showNo_Variable_or_Open_ModificationsMsg ) &&
            ( ( ! this.props.modificationMass_UserSelections_ComponentData.open_ModificationsData ) ||
                this.props.modificationMass_UserSelections_ComponentData.open_ModificationsData.showNo_Variable_or_Open_ModificationsMsg ) ) {

            //  No Mod data so not render

            return null; // EARLY RETURN
        }

        let selected = this.props.modificationMass_UserSelections_StateObject.get_showOtherPeptidesWherePeptideSequenceMatchPeptidesMeetModFilters_UserSelection();

        if ( selected ) {
            selected = true
        } else {
            selected = false
        }

        const marginBottomSize = 4;

        const tooltipText = "For all peptides found using the modification filters, include all modified and unmodified versions of those peptides (I.e., the same peptide with different modifications)."

        return (
            <React.Fragment>

                {/* Parent is CSS Grid with 2 Columns */}

                <div className=" filter-common-filter-label " style={ { marginBottom : marginBottomSize } }>
                    Include all versions of peptides found using modification filters:

                    <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                        title={ tooltipText }
                    />
                </div>
                <div className=" filter-common-selection-block peptide-sequence-selection-block "  style={ { marginBottom : marginBottomSize } } >
                    <div className=" filter-common-selection-inner-block ">
                        <div className=" ">  {/* left-margin-same-as-checkbox; to align with checkbox in Unique Peptide */}
                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                title={ tooltipText }
                                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                            >
                                <input type="checkbox" checked={ selected }
                                       onChange={ this._inputFieldChanged_BindThis }
                                />
                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );

    }
}


