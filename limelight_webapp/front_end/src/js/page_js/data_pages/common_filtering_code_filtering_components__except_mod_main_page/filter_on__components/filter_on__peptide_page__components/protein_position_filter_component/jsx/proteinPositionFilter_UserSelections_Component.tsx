/**
 * proteinPositionFilter_UserSelections_Component.tsx
 *
 * Protein Position Filter User Selections
 *
 *
 */

import React from 'react'

import {
    ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data,
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__peptide_page__components/protein_position_filter_component/js/proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data";
import {
    ProteinPositionFilter_UserInput__Component__UserSelectionData_Root,
    ProteinPositionFilter_UserInput__Component__UserSelectionData_SingleProtein,
    ProteinPositionFilter_UserInput__Component__UserSelectionData_SingleRange
} from "page_js/data_pages/common_components__react/protein_position_filter_component__not_single_protein/protein_position_filter__user_input_component/proteinPositionFilter_UserInput__Component__UserSelectionData.ts";
import {
    ProteinPositionFilter_UserInput__Component__ProteinData_Root
} from "page_js/data_pages/common_components__react/protein_position_filter_component__not_single_protein/protein_position_filter__user_input_component/proteinPositionFilter_UserInput__Component__ProteinData";
import {
    ProteinPositionFilter_UserInput__Component,
    ProteinPositionFilter_UserInputOverlay__MainOverlay_Save_CallbackFunction,
    ProteinPositionFilter_UserInputOverlay__MainOverlay_Save_CallbackFunction_Params
} from "page_js/data_pages/common_components__react/protein_position_filter_component__not_single_protein/protein_position_filter__user_input_component/proteinPositionFilter_UserInput__Component";
import {
    ProteinPositionFilter_UserSelections_StateObject,
    ProteinPositionFilter_UserSelections_StateObject_Get_RangeEntries_For_ProteinSequenceVersionId,
    ProteinPositionFilter_UserSelections_StateObject_Get_RangeEntries_Root,
    ProteinPositionFilter_UserSelections_StateObject_Get_RangeEntries_SingleRange
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__peptide_page__components/protein_position_filter_component/js/proteinPositionFilter_UserSelections_StateObject";

export type ProteinPositionFilter_UserSelections_Component__UpdateMadeTo_proteinPositionFilter_UserSelections_StateObject = () => void;


// export class ProteinPositionFilter_UserSelections_Component_GetData_Callback_ReturnedValue {
//     proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data : ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data
//     promise_proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data : Promise<ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data>
// }
//
// export type ProteinPositionFilter_UserSelections_Component_GetData_Callback =
//     () => ProteinPositionFilter_UserSelections_Component_GetData_Callback_ReturnedValue


/**
 *
 */
export interface ProteinPositionFilter_UserSelections_Props {

    proteinPositionFilter_UserSelections_Component_Force_ReRender_Object : object
    proteinPositionFilter_UserSelections_StateObject : ProteinPositionFilter_UserSelections_StateObject;
    // one of next 2 is required
    proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data : ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data
    // proteinPositionFilter_UserSelections_Component_GetData_Callback: ProteinPositionFilter_UserSelections_Component_GetData_Callback

    updateMadeTo_proteinPositionFilter_UserSelections_StateObject_Callback : ProteinPositionFilter_UserSelections_Component__UpdateMadeTo_proteinPositionFilter_UserSelections_StateObject
}

interface ProteinPositionFilter_UserSelections_State {

    prev_proteinPositionFilter_UserSelections_Component_Force_ReRender_Object? : object
    prev_proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data? : ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data

    proteinPositionFilter_UserInput__Component__ProteinData? : ProteinPositionFilter_UserInput__Component__ProteinData_Root
    proteinPositionFilter_UserInput__Component__Existing_userSelections? : ProteinPositionFilter_UserInput__Component__UserSelectionData_Root
}

/**
 *
 */
export class ProteinPositionFilter_UserSelections extends React.Component< ProteinPositionFilter_UserSelections_Props, ProteinPositionFilter_UserSelections_State > {

    private _update_PageState_FromChildComponent_SaveCall_BindThis = this._update_PageState_FromChildComponent_SaveCall.bind(this);

    private _DO_NOT_CALL_BoundMethods_TypeTest() { // Function only to test that methods that are .bind(this) are correct function signature

        const _update_PageState_FromChildComponent_SaveCall_BindThis : ProteinPositionFilter_UserInputOverlay__MainOverlay_Save_CallbackFunction = this._update_PageState_FromChildComponent_SaveCall
    }


    /**
     *
     */
    constructor(props : ProteinPositionFilter_UserSelections_Props) {
        super(props);

        this.state = {
            prev_proteinPositionFilter_UserSelections_Component_Force_ReRender_Object: {}
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
    static getDerivedStateFromProps(props: ProteinPositionFilter_UserSelections_Props, state: ProteinPositionFilter_UserSelections_State): ProteinPositionFilter_UserSelections_State {

        if ( props.proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data
            && ( props.proteinPositionFilter_UserSelections_Component_Force_ReRender_Object !== state.prev_proteinPositionFilter_UserSelections_Component_Force_ReRender_Object
                || props.proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data !== state.prev_proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data )
        ) {

            //  One of the Props objects changed so create new versions of derived objects

            const proteinPositionFilter_UserInput__Component__Existing_userSelections = new ProteinPositionFilter_UserInput__Component__UserSelectionData_Root();

            {
                const selectedProteins_ForChildComponent: Array<ProteinPositionFilter_UserInput__Component__UserSelectionData_SingleProtein> = []

                const proteinPositionFilter_UserSelections = props.proteinPositionFilter_UserSelections_StateObject.getSelections_Ranges();

                if ( proteinPositionFilter_UserSelections && proteinPositionFilter_UserSelections.entriesMap_Key_proteinSequenceVersionId ) {

                    for ( const proteinPositionFilter_MapEntry of proteinPositionFilter_UserSelections.entriesMap_Key_proteinSequenceVersionId.entries() ) {

                        const proteinPositionFilter = proteinPositionFilter_MapEntry[ 1 ];

                        const selectedProtein_ForChildComponent = new ProteinPositionFilter_UserInput__Component__UserSelectionData_SingleProtein()
                        selectedProteins_ForChildComponent.push( selectedProtein_ForChildComponent );

                        selectedProtein_ForChildComponent.proteinSequenceVersionId = proteinPositionFilter.proteinSequenceVersionId;

                        if ( ! proteinPositionFilter.fullProteinSelected ) {

                            selectedProtein_ForChildComponent.ranges = []
                            for ( const range of proteinPositionFilter.rangeEntries ) {

                                const selectedProteinRange_ForChildComponent = new ProteinPositionFilter_UserInput__Component__UserSelectionData_SingleRange();
                                selectedProtein_ForChildComponent.ranges.push( selectedProteinRange_ForChildComponent );

                                selectedProteinRange_ForChildComponent.start = range.proteinPosition_Start;
                                selectedProteinRange_ForChildComponent.end = range.proteinPosition_End;
                            }
                        }

                    }
                }

                proteinPositionFilter_UserInput__Component__Existing_userSelections.proteins = selectedProteins_ForChildComponent;
            }

            return {
                prev_proteinPositionFilter_UserSelections_Component_Force_ReRender_Object : props.proteinPositionFilter_UserSelections_Component_Force_ReRender_Object,
                prev_proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data : props.proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data,
                proteinPositionFilter_UserInput__Component__ProteinData: props.proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data.proteinPositionFilter_UserInput__Component__ProteinData_Root,
                proteinPositionFilter_UserInput__Component__Existing_userSelections
            };
        }

        return null;
    }

    /**
     *
     */
    shouldComponentUpdate(nextProps: Readonly<ProteinPositionFilter_UserSelections_Props>, nextState: Readonly<ProteinPositionFilter_UserSelections_State>, nextContext: any): boolean {

        if (
            this.props.proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data !== nextProps.proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data
            || this.state.proteinPositionFilter_UserInput__Component__ProteinData !== nextState.proteinPositionFilter_UserInput__Component__ProteinData
            || this.state.proteinPositionFilter_UserInput__Component__Existing_userSelections !== nextState.proteinPositionFilter_UserInput__Component__Existing_userSelections ) {
            return true;
        }

        return false;
    }

    /**
     *
     */
    private _update_PageState_FromChildComponent_SaveCall( params: ProteinPositionFilter_UserInputOverlay__MainOverlay_Save_CallbackFunction_Params ) {

        const entriesMap_Key_proteinSequenceVersionId : Map<number, ProteinPositionFilter_UserSelections_StateObject_Get_RangeEntries_For_ProteinSequenceVersionId> = new Map();

        for ( const protein_FromChild of params.userSelections.proteins ) {

            const proteinSequenceVersionId = protein_FromChild.proteinSequenceVersionId;

            const result_SingleProtein = new ProteinPositionFilter_UserSelections_StateObject_Get_RangeEntries_For_ProteinSequenceVersionId();
            entriesMap_Key_proteinSequenceVersionId.set( proteinSequenceVersionId, result_SingleProtein );

            result_SingleProtein.proteinSequenceVersionId = proteinSequenceVersionId;

            if ( protein_FromChild.ranges && protein_FromChild.ranges.length > 0 ) {

                result_SingleProtein.rangeEntries = [];

                for ( const protein_FromChild_range of protein_FromChild.ranges ) {
                    const resultRange = new ProteinPositionFilter_UserSelections_StateObject_Get_RangeEntries_SingleRange();
                    result_SingleProtein.rangeEntries.push( resultRange );

                    resultRange.proteinPosition_Start = protein_FromChild_range.start;
                    resultRange.proteinPosition_End = protein_FromChild_range.end;
                }
            } else {
                result_SingleProtein.fullProteinSelected = true;
            }
        }

        const new_PageState = new ProteinPositionFilter_UserSelections_StateObject_Get_RangeEntries_Root();
        new_PageState.entriesMap_Key_proteinSequenceVersionId = entriesMap_Key_proteinSequenceVersionId;

        this.props.proteinPositionFilter_UserSelections_StateObject.setSelections_Ranges( new_PageState );

        this.props.updateMadeTo_proteinPositionFilter_UserSelections_StateObject_Callback();
    }

    /**
     *
     */
    render() {

        const paddingTopSize = 4;

        return (
            <React.Fragment>

                {/* Parent is CSS Grid with 2 Columns */}

                <div className=" filter-common-filter-label " style={ { paddingTop: paddingTopSize } }>
                    Filter On Protein Position:

                    <div className=" filter-common-block-selection--section-label--help-tip-symbol ">
                        <div className=" inner-absolute-pos ">
                            <div className=" main-div ">
                                <p className="help-tip-actual">
                                    Use this option to define a one or more proteins and (optionally) regions in those proteins.
                                    Only results that map to at least one of those proteins (or regions) will be shown.
                                    Click "Add Protein" to add a new protein or region to the filter.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" filter-common-selection-block "  style={ { paddingTop: paddingTopSize } }>
                    <div className=" filter-common-selection-inner-block ">
                        <div className=" left-margin-same-as-checkbox ">
                            {/* left-margin-same-as-checkbox; to align with checkbox in Unique Peptide */}

                            {/*   ProteinPositionFilter_UserInputOverlay__MainOverlay_Component   */}

                            { ( ! this.state.proteinPositionFilter_UserInput__Component__ProteinData ) ? (

                                <div>
                                    Loading Data...
                                </div>
                            ) : (

                            <div >
                                <ProteinPositionFilter_UserInput__Component
                                    proteinData={ this.state.proteinPositionFilter_UserInput__Component__ProteinData }
                                    userSelections={ this.state.proteinPositionFilter_UserInput__Component__Existing_userSelections }
                                    callbackOn_Save_Clicked={ this._update_PageState_FromChildComponent_SaveCall_BindThis }
                                />
                            </div>

                            )}
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }

}
