/**
 * proteinPosition_Of_Modification_Filter_UserSelections_Component.tsx
 *
 * Protein Position Of Modification Filter User Selections
 *
 * Used in the 2 column format in Peptide, Single Protein, QC Filters and Options block
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
} from "page_js/data_pages/common_components__react/protein_position_filter_component__not_single_protein/protein_position_filter__user_input_component/proteinPositionFilter_UserInput__Component__UserSelectionData";
import {
    ProteinPositionFilter_UserInput__Component__ProteinData_Root
} from "page_js/data_pages/common_components__react/protein_position_filter_component__not_single_protein/protein_position_filter__user_input_component/proteinPositionFilter_UserInput__Component__ProteinData";
import {
    ProteinPositionFilter_UserInput__Component,
    ProteinPositionFilter_UserInput__Component__Get_ProteinData_Root_UserSelectionData_Root_ReturnPromise_CallbackFunction,
    ProteinPositionFilter_UserInput__Component__Save_CallbackFunction,
    ProteinPositionFilter_UserInput__Component__Save_CallbackFunction_Params
} from "page_js/data_pages/common_components__react/protein_position_filter_component__not_single_protein/protein_position_filter__user_input_component/proteinPositionFilter_UserInput__Component";
import {
    ProteinPosition_Of_Modification_Filter_UserSelections_StateObject,
    ProteinPosition_Of_Modification_Filter_UserSelections_StateObject_Get_RangeEntries_For_ProteinSequenceVersionId,
    ProteinPosition_Of_Modification_Filter_UserSelections_StateObject_Get_RangeEntries_Root,
    ProteinPosition_Of_Modification_Filter_UserSelections_StateObject_Get_RangeEntries_SingleRange
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__peptide_page__components/protein_position_of_modification_filter_component/js/proteinPosition_Of_Modification_Filter_UserSelections_StateObject";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import {
    Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
} from "page_js/common_all_pages/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component";

export type ProteinPosition_Of_Modification_Filter_UserSelections_Component__UpdateMadeTo_proteinPosition_Of_Modification_Filter_UserSelections_StateObject = () => void;


export class ProteinPosition_Of_Modification_Filter_UserSelections_Component_GetData_Callback_ReturnedValue {
    proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data : ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data
    promise_proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data : Promise<ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data>
}

export type ProteinPosition_Of_Modification_Filter_UserSelections_Component_GetData_Callback =
    () => ProteinPosition_Of_Modification_Filter_UserSelections_Component_GetData_Callback_ReturnedValue


/**
 *
 */
export interface ProteinPosition_Of_Modification_Filter_UserSelections_Props {

    proteinPosition_Of_Modification_Filter_UserSelections_Component_Force_ReRender_Object : object
    proteinPosition_Of_Modification_Filter_UserSelections_StateObject : ProteinPosition_Of_Modification_Filter_UserSelections_StateObject;

    // one of next 2 is required
    proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data : ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data
    proteinPosition_Of_Modification_Filter_UserSelections_Component_GetData_Callback : ProteinPosition_Of_Modification_Filter_UserSelections_Component_GetData_Callback

    updateMadeTo_proteinPosition_Of_Modification_Filter_UserSelections_StateObject_Callback : ProteinPosition_Of_Modification_Filter_UserSelections_Component__UpdateMadeTo_proteinPosition_Of_Modification_Filter_UserSelections_StateObject
}

interface ProteinPosition_Of_Modification_Filter_UserSelections_State {

    forceRerender_Object?: object
}

/**
 *
 */
export class ProteinPosition_Of_Modification_Filter_UserSelections extends React.Component< ProteinPosition_Of_Modification_Filter_UserSelections_Props, ProteinPosition_Of_Modification_Filter_UserSelections_State > {

    private _get_ProteinData_ReturnPromise_CallbackFunction_BindThis = this._get_ProteinData_ReturnPromise_CallbackFunction.bind(this)
    private _update_PageState_FromChildComponent_SaveCall_BindThis = this._update_PageState_FromChildComponent_SaveCall.bind(this);

    private _DO_NOT_CALL_BoundMethods_TypeTest() { // Function only to test that methods that are .bind(this) are correct function signature

        const _get_ProteinData_ReturnPromise_CallbackFunction: ProteinPositionFilter_UserInput__Component__Get_ProteinData_Root_UserSelectionData_Root_ReturnPromise_CallbackFunction = this._get_ProteinData_ReturnPromise_CallbackFunction
        const _update_PageState_FromChildComponent_SaveCall_BindThis : ProteinPositionFilter_UserInput__Component__Save_CallbackFunction = this._update_PageState_FromChildComponent_SaveCall
    }

    private _proteinPosition_Of_Modification_Filter_UserInput__Component__ProteinData : ProteinPositionFilter_UserInput__Component__ProteinData_Root
    private _proteinPosition_Of_Modification_Filter_UserInput__Component__Existing_userSelections : ProteinPositionFilter_UserInput__Component__UserSelectionData_Root

    /**
     *
     */
    constructor(props : ProteinPosition_Of_Modification_Filter_UserSelections_Props) {
        super(props);

        try {
            if ( ( ! props.proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data ) && ( ! props.proteinPosition_Of_Modification_Filter_UserSelections_Component_GetData_Callback ) ) {
                const msg = "Invalid Props: ( ( ! props.proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data ) && ( ! props.proteinPosition_Of_Modification_Filter_UserSelections_Component_GetData_Callback ) )"
                console.warn(msg)
                throw Error(msg)
            }

            if ( props.proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data ) {
                this._proteinPosition_Of_Modification_Filter_UserInput__Component__ProteinData = props.proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data.proteinPositionFilter_UserInput__Component__ProteinData_Root
            }

            this._update_Local_Property_From_Props___proteinPosition_Of_Modification_Filter_UserInput__Component__Existing_userSelections({ proteinPosition_Of_Modification_Filter_UserSelections_StateObject: props.proteinPosition_Of_Modification_Filter_UserSelections_StateObject })

            this.state = {
                forceRerender_Object: {}
            }
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    shouldComponentUpdate(nextProps: Readonly<ProteinPosition_Of_Modification_Filter_UserSelections_Props>, nextState: Readonly<ProteinPosition_Of_Modification_Filter_UserSelections_State>, nextContext: any): boolean {

        if (
            this.props.proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data !== nextProps.proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data
            || this.props.proteinPosition_Of_Modification_Filter_UserSelections_Component_Force_ReRender_Object !== nextProps.proteinPosition_Of_Modification_Filter_UserSelections_Component_Force_ReRender_Object
            || this.state.forceRerender_Object !== nextState.forceRerender_Object ) {
            return true;
        }

        return false;
    }

    /**
     *
     */
    componentDidUpdate( prevProps: Readonly<ProteinPosition_Of_Modification_Filter_UserSelections_Props>, prevState: Readonly<ProteinPosition_Of_Modification_Filter_UserSelections_State>, snapshot?: any ) {
        try {
            if ( this.props.proteinPosition_Of_Modification_Filter_UserSelections_Component_Force_ReRender_Object !== prevProps.proteinPosition_Of_Modification_Filter_UserSelections_Component_Force_ReRender_Object ) {

                //  One of the Props objects changed so create new versions of Local Properties

                this._update_Local_Property_From_Props___proteinPosition_Of_Modification_Filter_UserInput__Component__Existing_userSelections({ proteinPosition_Of_Modification_Filter_UserSelections_StateObject: this.props.proteinPosition_Of_Modification_Filter_UserSelections_StateObject })

                this.setState({ forceRerender_Object: {} })
            }

            if ( this.props.proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data !== prevProps.proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data ) {

                this._proteinPosition_Of_Modification_Filter_UserInput__Component__ProteinData = this.props.proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data.proteinPositionFilter_UserInput__Component__ProteinData_Root

                this.setState({ forceRerender_Object: {} })
            }

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    private _update_Local_Property_From_Props___proteinPosition_Of_Modification_Filter_UserInput__Component__Existing_userSelections(
        {
            proteinPosition_Of_Modification_Filter_UserSelections_StateObject
        } : {
            proteinPosition_Of_Modification_Filter_UserSelections_StateObject: ProteinPosition_Of_Modification_Filter_UserSelections_StateObject
        }
    ): void {


        this._proteinPosition_Of_Modification_Filter_UserInput__Component__Existing_userSelections = new ProteinPositionFilter_UserInput__Component__UserSelectionData_Root();

        {
            const selectedProteins_ForChildComponent: Array<ProteinPositionFilter_UserInput__Component__UserSelectionData_SingleProtein> = []

            const proteinPosition_Of_Modification_Filter_UserSelections = proteinPosition_Of_Modification_Filter_UserSelections_StateObject.getSelections_Ranges();

            if ( proteinPosition_Of_Modification_Filter_UserSelections && proteinPosition_Of_Modification_Filter_UserSelections.entriesMap_Key_proteinSequenceVersionId ) {

                for ( const proteinPosition_Of_Modification_Filter_MapEntry of proteinPosition_Of_Modification_Filter_UserSelections.entriesMap_Key_proteinSequenceVersionId.entries() ) {

                    const proteinPosition_Of_Modification_Filter = proteinPosition_Of_Modification_Filter_MapEntry[ 1 ];

                    const selectedProtein_ForChildComponent = new ProteinPositionFilter_UserInput__Component__UserSelectionData_SingleProtein()
                    selectedProteins_ForChildComponent.push( selectedProtein_ForChildComponent );

                    selectedProtein_ForChildComponent.proteinSequenceVersionId = proteinPosition_Of_Modification_Filter.proteinSequenceVersionId;

                    if ( ! proteinPosition_Of_Modification_Filter.fullProteinSelected ) {

                        selectedProtein_ForChildComponent.ranges = []
                        for ( const range of proteinPosition_Of_Modification_Filter.rangeEntries ) {

                            const selectedProteinRange_ForChildComponent = new ProteinPositionFilter_UserInput__Component__UserSelectionData_SingleRange();
                            selectedProtein_ForChildComponent.ranges.push( selectedProteinRange_ForChildComponent );

                            selectedProteinRange_ForChildComponent.start = range.proteinPosition_Start;
                            selectedProteinRange_ForChildComponent.end = range.proteinPosition_End;
                        }
                    }

                }
            }

            this._proteinPosition_Of_Modification_Filter_UserInput__Component__Existing_userSelections.proteins = selectedProteins_ForChildComponent;
        }

    }

    /**
     *
     */
    private _get_ProteinData_ReturnPromise_CallbackFunction() : Promise<ProteinPositionFilter_UserInput__Component__ProteinData_Root> {

        if ( this._proteinPosition_Of_Modification_Filter_UserInput__Component__ProteinData ) {

            return Promise.resolve( this._proteinPosition_Of_Modification_Filter_UserInput__Component__ProteinData )  // EARLY RETURN
        }

        if ( ! this.props.proteinPosition_Of_Modification_Filter_UserSelections_Component_GetData_Callback ) {
            const msg = "In _get_ProteinData_ReturnPromise_CallbackFunction(): else of ( this._proteinPosition_Of_Modification_Filter_UserInput__Component__ProteinData )  AND ( ! this.props.proteinPosition_Of_Modification_Filter_UserSelections_Component_GetData_Callback )"
            console.warn(msg)
            throw Error(msg)
        }

        const getData_Callback_Result = this.props.proteinPosition_Of_Modification_Filter_UserSelections_Component_GetData_Callback()

        if ( getData_Callback_Result.proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data ) {

            this._proteinPosition_Of_Modification_Filter_UserInput__Component__ProteinData = getData_Callback_Result.proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data.proteinPositionFilter_UserInput__Component__ProteinData_Root

            return Promise.resolve( this._proteinPosition_Of_Modification_Filter_UserInput__Component__ProteinData )   // EARLY RETURN

        } else if ( getData_Callback_Result.promise_proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data ) {

        return new Promise((resolve, reject) => { try {

            getData_Callback_Result.promise_proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data.catch(reason => reject(reason))
            getData_Callback_Result.promise_proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data.then(value => { try {

                this._proteinPosition_Of_Modification_Filter_UserInput__Component__ProteinData = value.proteinPositionFilter_UserInput__Component__ProteinData_Root

                resolve( this._proteinPosition_Of_Modification_Filter_UserInput__Component__ProteinData )

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        } else {
            throw Error("getData_Callback_Result NO proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data or promise_proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data")
        }
    }

    /**
     *
     */
    private _update_PageState_FromChildComponent_SaveCall( params: ProteinPositionFilter_UserInput__Component__Save_CallbackFunction_Params ) {

        const entriesMap_Key_proteinSequenceVersionId : Map<number, ProteinPosition_Of_Modification_Filter_UserSelections_StateObject_Get_RangeEntries_For_ProteinSequenceVersionId> = new Map();

        for ( const protein_FromChild of params.userSelections.proteins ) {

            const proteinSequenceVersionId = protein_FromChild.proteinSequenceVersionId;

            const result_SingleProtein = new ProteinPosition_Of_Modification_Filter_UserSelections_StateObject_Get_RangeEntries_For_ProteinSequenceVersionId();
            entriesMap_Key_proteinSequenceVersionId.set( proteinSequenceVersionId, result_SingleProtein );

            result_SingleProtein.proteinSequenceVersionId = proteinSequenceVersionId;

            if ( protein_FromChild.ranges && protein_FromChild.ranges.length > 0 ) {

                result_SingleProtein.rangeEntries = [];

                for ( const protein_FromChild_range of protein_FromChild.ranges ) {
                    const resultRange = new ProteinPosition_Of_Modification_Filter_UserSelections_StateObject_Get_RangeEntries_SingleRange();
                    result_SingleProtein.rangeEntries.push( resultRange );

                    resultRange.proteinPosition_Start = protein_FromChild_range.start;
                    resultRange.proteinPosition_End = protein_FromChild_range.end;
                }
            } else {
                result_SingleProtein.fullProteinSelected = true;
            }
        }

        const new_PageState = new ProteinPosition_Of_Modification_Filter_UserSelections_StateObject_Get_RangeEntries_Root();
        new_PageState.entriesMap_Key_proteinSequenceVersionId = entriesMap_Key_proteinSequenceVersionId;

        this.props.proteinPosition_Of_Modification_Filter_UserSelections_StateObject.setSelections_Ranges( new_PageState );

        this.props.updateMadeTo_proteinPosition_Of_Modification_Filter_UserSelections_StateObject_Callback();
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
                    Filter on Modifications at Protein Position:

                    <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                        title={
                            <span>
                                Use this option to define one or more proteins and (optionally) regions in those proteins.
                                Only results that have modifications in at least one of those proteins (or regions) will be shown.
                                Click "Add Protein" to add a new protein or region to the filter.
                            </span>
                        }
                    />
                </div>

                <div className=" filter-common-selection-block "  style={ { paddingTop: paddingTopSize } }>
                    <div className=" filter-common-selection-inner-block ">
                        <div className=" left-margin-same-as-checkbox ">
                            {/* left-margin-same-as-checkbox; to align with checkbox in Unique Peptide */}

                            {/*   ProteinPosition_Of_Modification_Filter_UserInputOverlay__MainOverlay_Component   */}

                            {/*{ ( ! this.state.proteinPosition_Of_Modification_Filter_UserInput__Component__ProteinData ) ? (*/}

                            {/*    <div>*/}
                            {/*        Loading Data...*/}
                            {/*    </div>*/}
                            {/*) : (*/}

                            <div >
                                <ProteinPositionFilter_UserInput__Component
                                    proteinData_InitiallyProvided={ this._proteinPosition_Of_Modification_Filter_UserInput__Component__ProteinData }
                                    get_ProteinData_Root_UserSelectionData_Root_ReturnPromise_CallbackFunction={ this._get_ProteinData_ReturnPromise_CallbackFunction_BindThis }
                                    userSelections={ this._proteinPosition_Of_Modification_Filter_UserInput__Component__Existing_userSelections }
                                    callbackOn_Save_Clicked={ this._update_PageState_FromChildComponent_SaveCall_BindThis }
                                />
                            </div>

                            {/*)}*/}
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }

}
