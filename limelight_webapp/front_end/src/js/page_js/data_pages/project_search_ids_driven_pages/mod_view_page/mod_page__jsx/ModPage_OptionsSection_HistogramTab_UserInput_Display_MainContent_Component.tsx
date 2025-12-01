/**
 * ModPage_OptionsSection_HistogramTab_UserInput_Display_MainContent_Component.tsx
 *
 *     Histogram Tab Options Section
 *
 */

import React from "react";
import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";
import {
    ModViewPage_DataVizOptions_VizSelections_PageStateManager,
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum,
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__PSM_QUANT_METHOD_Values_Enum,
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewPage_DataVizOptions_VizSelections_PageStateManager";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import {
    Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
} from "page_js/common_all_pages/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component";
import {
    ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering";
import {
    INTERNAL__MaxCutoff_ForColorScale_Ratio_Filter_InputField_Component
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__jsx/ModPage_OptionsSection_UserInput_Display_MainContent_Component";



//  Delay after input change before call callback, to wait for additional keyboard input
const CALL_CALLBACK_DELAY = 400;  // in milliseconds



/**
 *
 */
export class ModPage_OptionsSection_HistogramTab_UserInput_Display_MainContent_Component_Props_Prop {

    modViewPage_DataVizOptions_VizSelections_PageStateManager: ModViewPage_DataVizOptions_VizSelections_PageStateManager
    modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root: ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
    valueChanged_Callback: () => void
}

/**
 *
 */
export interface ModPage_OptionsSection_HistogramTab_UserInput_Display_MainContent_Component_Props {

    propsValue : ModPage_OptionsSection_HistogramTab_UserInput_Display_MainContent_Component_Props_Prop
}

/**
 *
 */
interface ModPage_OptionsSection_HistogramTab_UserInput_Display_MainContent_Component_State {

    forceReRender_Object? : object
}

/**
 *  Histogram Tab Options Section
 */
export class ModPage_OptionsSection_HistogramTab_UserInput_Display_MainContent_Component extends React.Component< ModPage_OptionsSection_HistogramTab_UserInput_Display_MainContent_Component_Props, ModPage_OptionsSection_HistogramTab_UserInput_Display_MainContent_Component_State > {

    //  bind to 'this' for passing as parameters

    private _quantType_Psms_Clicked_Callback_BindThis = this._quantType_Psms_Clicked_Callback.bind(this)
    private _quantType_Scans_Clicked_Callback_BindThis = this._quantType_Scans_Clicked_Callback.bind(this)


    private _barHeight_CutoffCount_InputFieldChanged_Callback_BindThis = this._barHeight_CutoffCount_InputFieldChanged_Callback.bind(this)
    private _modMassCutoffMin_InputFieldChanged_Callback_BindThis = this._modMassCutoffMin_InputFieldChanged_Callback.bind(this)
    private _modMassCutoffMax_InputFieldChanged_Callback_BindThis = this._modMassCutoffMax_InputFieldChanged_Callback.bind(this)
    private _clear_ModMass_MinMax_Cutoffs_BindThis = this._clear_ModMass_MinMax_Cutoffs.bind(this)

    private _excludeUnlocalizedMods_InputFieldChanged_Callback_BindThis = this._excludeUnlocalizedMods_InputFieldChanged_Callback.bind(this)

    /**
     *
     */
    constructor(props : ModPage_OptionsSection_HistogramTab_UserInput_Display_MainContent_Component_Props) { try {
        super(props);

        this.state = {
            forceReRender_Object: {}
        };
    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    //////////////

    private _rerender_Then_After_SetTimeout_Call_valueChanged_Callback() {

        this.setState({ forceReRender_Object: {} })

        window.setTimeout( () => { try {

            this.props.propsValue.valueChanged_Callback()

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}, 10 )
    }

    //////////////

    private _quantType_Psms_Clicked_Callback( event: React.ChangeEvent<HTMLInputElement> ) { try {

        this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.set_quantType( ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum.psms )

        this._rerender_Then_After_SetTimeout_Call_valueChanged_Callback()

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    private _quantType_Scans_Clicked_Callback( event: React.ChangeEvent<HTMLInputElement> ) { try {

        this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.set_quantType( ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum.scans )

        this._rerender_Then_After_SetTimeout_Call_valueChanged_Callback()

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    private _excludeUnlocalizedMods_InputFieldChanged_Callback( event: React.ChangeEvent<HTMLInputElement> ) { try {

        const newValue = event.target.checked

        this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.set_excludeUnlocalizedOpenMods( newValue )

        this._rerender_Then_After_SetTimeout_Call_valueChanged_Callback()

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}


    /////////

    //  Process onChange on <input> text fields containing integers

    private _barHeight_CutoffCount_InputFieldChanged_Callback( event: React.ChangeEvent<HTMLInputElement> ) { try {

        const newValue_String = event.target.value

        const newValue_Number = _inputNumberField_Compute_IntegerNumberFromFieldContents( newValue_String )

        if ( newValue_Number === this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY() ) {
            // No change so exit
            return // EARLY RETURN
        }

        this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.set_histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY( newValue_Number )

        this._inputField_TypeText_Changed()

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}


    /**
     *
     */
    private _modMassCutoffMin_InputFieldChanged_Callback( newValue_Number: number ) { try {

        if ( newValue_Number === this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMassCutoffMin_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY() ) {
            // No change so exit
            return // EARLY RETURN
        }

        this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.set_modMassCutoffMin_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY( newValue_Number )

        this._inputField_TypeText_Changed()

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    /**
     *
     */
    private _modMassCutoffMax_InputFieldChanged_Callback( newValue_Number: number ) { try {

        if ( newValue_Number === this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMassCutoffMax_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY() ) {
            // No change so exit
            return // EARLY RETURN
        }

        this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.set_modMassCutoffMax_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY( newValue_Number )

        this._inputField_TypeText_Changed()

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    /**
     *
     */
    private _clear_ModMass_MinMax_Cutoffs( event: React.MouseEvent<HTMLSpanElement, MouseEvent> ) { try {

        this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.set_modMassCutoffMin_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY( undefined )
        this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.set_modMassCutoffMax_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY( undefined )

        this.setState({ forceReRender_Object: {} })

        window.setTimeout( () => { try {

            this.props.propsValue.valueChanged_Callback();

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    /**
     *
     */
    private _inputField_TypeText_Changed() { try {

        this.setState({ forceReRender_Object: {} })

        this._callUpdateCallback_AfterTimeout()

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    /**
     * TimeoutId for delaying updating rest of page for user update <input> fields with numbers
     * @private
     */
    private _inputFieldChanged_TimeoutId : number;

    /**
     *
     */
    private _callUpdateCallback_AfterTimeout() { try {

        if ( this._inputFieldChanged_TimeoutId ) {
            window.clearTimeout( this._inputFieldChanged_TimeoutId );
            this._inputFieldChanged_TimeoutId = undefined;
        }

        this._inputFieldChanged_TimeoutId = window.setTimeout( () => {
            try {
                this.props.propsValue.valueChanged_Callback();

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        }, CALL_CALLBACK_DELAY );

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    ////////////////////////////////////////

    /**
     *
     */
    render() { try {

        const tooltip_Main_Props = limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer();


        const tooltipContents__QuantMethod_Label = (
            <span>
                Choose how modification masses are quantified in each search. Either as
                PSM or scan counts and either as raw counts or ratios.
            </span>
        )

        const tooltipContents__QuantMethod_PSMs_Label = (
            <span>
                Counts are based on # of distinct peptide-spectrum matches
                containing a mod mass. Each scan may result in multiple PSMs if
                multiple peptides are IDed by the same scan.
            </span>
        )

        const tooltipContents__QuantMethod_Scans_Label = (
            <span>
                Counts are based on the # of distinct scans that were IDed as a
                peptide containing a mod mass. A scan will only count once even
                if multiple peptides are IDed by the same scan.
            </span>
        )

        const tooltipContents__Max_cutoff_for_bar_height_Label = (
            <span>
                Override maximum values used when determining the bar height in the histogram.
            </span>
        )

        const tooltipContents__Max_cutoff_for_bar_height_Count_Label = (
            <div>
                <div>
                    Override maximum value for PSM or scan count when computing bar height.
                </div>
            </div>
        )

        const tooltipContents__Min_and_max_mod_masses_Label = (
            <div>
                Override the minimum and maximum modification masses to be shown in the visualization and data table.
            </div>
        )

        const tooltipContents__Min_and_max_mod_masses_Minimum_Label = (
            <span>
                Override the minimum modification mass to be shown in the visualization and data table.
            </span>
        )

        const tooltipContents__Min_and_max_mod_masses_Maximum_Label = (
            <span>
                Override the maximum modification mass to be shown in the
                visualization and data table.
            </span>
        )

        const tooltipContents__Min_and_max_mod_masses_Clear_Minimum_Maximum_Label = (
            <span>
                Clear the values for "Minimum:" and "Maximum:"
            </span>
        )

        const tooltipContents__Exclude_unlocalized_mods_Label = (
            <span>
                Exclude all PSMs that do not localize to any specific position(s) in a peptide.
            </span>
        )

        ///////

        return (
            <div className="data-viz-options-container">

                <div className="data-viz-form">

                    {/*  Outer FlexBox -- First 4 blocks together and then Protein Filter as Second  */ }
                    <div
                        style={ {
                            marginLeft: 15,
                            display: "flex",
                            columnGap: 15,
                            alignItems: "flex-start"  // Each item vertical is only as tall as the item, not stretched to the tallest item.  Default is "stretch".
                        } } // Could add 'flexWrap: "wrap"' but would need to move the "Update Visualization" button.  If do that probably also add 'rowGap'.
                    >

                        {/*  Columns in "flex".  Each column has in CSS: "  flex-grow: 0; flex-shrink: 0;" so that the width of each stays at 'max-content'  */ }

                        {/*  <div> Holding inner flexbox and "Update Visualization" button below it  */ }

                        {/*  Column In "flex"  */ }
                        <div className="viz-form-section">

                            {/*  Inner FlexBox -- First 4 blocks as separate items  */ }
                            <div
                                style={ {
                                    display: "flex",
                                    columnGap: 15,
                                    alignItems: "flex-start"  // Each item vertical is only as tall as the item, not stretched to the tallest item.  Default is "stretch".
                                } }
                            >

                                {/*  1 of 4 Inner Flex Box Items  */ }

                                {/*  Column In "flex"  */ }

                                <div className="viz-form-section">

                                    <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                        title={ tooltipContents__QuantMethod_Label }
                                        { ...tooltip_Main_Props }
                                    >
                                        <span>
                                            Quant method:
                                        </span>
                                    </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>

                                    <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                                        title={ tooltipContents__QuantMethod_Label }
                                    />

                                    <div style={ { marginTop: 10 } }>
                                        <div>
                                            <label>
                                                <input
                                                    type="radio"
                                                    checked={ this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_quantType() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum.psms }
                                                    onChange={ this._quantType_Psms_Clicked_Callback_BindThis }
                                                />
                                                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                                    title={ tooltipContents__QuantMethod_PSMs_Label }
                                                    { ...tooltip_Main_Props }
                                                >
                                                    <span>
                                                        PSMs
                                                    </span>
                                                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                            </label>

                                            <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                                                title={ tooltipContents__QuantMethod_PSMs_Label }
                                            />

                                        </div>

                                        <div>
                                            <label>
                                                <input
                                                    type="radio"
                                                    checked={ this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_quantType() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum.scans }
                                                    onChange={ this._quantType_Scans_Clicked_Callback_BindThis }
                                                />
                                                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                                    title={ tooltipContents__QuantMethod_Scans_Label }
                                                    { ...tooltip_Main_Props }
                                                >
                                                    <span>
                                                        Scans
                                                    </span>
                                                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                            </label>

                                            <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                                                title={ tooltipContents__QuantMethod_Scans_Label }
                                            />

                                        </div>
                                    </div>

                                </div>

                                {/*  2 of 4 Inner Flex Box Items  */ }

                                {/*  Column In "flex"  */ }
                                <div className="viz-form-section">

                                    <div>
                                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                            title={ null }
                                            { ...tooltip_Main_Props }
                                        >
                                            <span>
                                                Max cutoff for count bar height:
                                            </span>
                                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>

                                        <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                                            title={ tooltipContents__Max_cutoff_for_bar_height_Label }
                                        />
                                    </div>

                                    <div>
                                        <span style={ { fontSize: 10 } }>(Leave blank to use defaults.)</span>
                                    </div>

                                    <div style={ { marginTop: 10 } }>

                                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                            title={ tooltipContents__Max_cutoff_for_bar_height_Count_Label }
                                            { ...tooltip_Main_Props }
                                        >
                                            <span>Count:</span>
                                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>

                                        <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                                            title={ tooltipContents__Max_cutoff_for_bar_height_Count_Label }
                                        />

                                        <span> </span>

                                        <input
                                            type="text"
                                            size={ 4 }
                                            className={
                                                this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY() !== undefined
                                                && this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY() !== null ? "mod-page-user-selection-entered" : null
                                            }
                                            value={
                                                this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY() !== undefined
                                                && this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY() !== null
                                                    ? this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_histogramBarHeight_Count_Cutoff_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY()
                                                    : ""
                                            }
                                            onChange={ this._barHeight_CutoffCount_InputFieldChanged_Callback_BindThis }
                                        />

                                    </div>
                                </div>

                                {/*  3 of 4 Inner Flex Box Items  */ }

                                {/*  Column In "flex"  */ }
                                <div className="viz-form-section">

                                    <div>
                                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                            title={ tooltipContents__Min_and_max_mod_masses_Label }
                                            { ...tooltip_Main_Props }
                                        >
                                            <span>
                                                Min and max mod masses:
                                            </span>
                                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>

                                        <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                                            title={ tooltipContents__Min_and_max_mod_masses_Label }
                                        />

                                    </div>
                                    <div>
                                        <span style={ { fontSize: 10 } }>(Filter on Actual Values.)</span>
                                    </div>
                                    <div>
                                        <span style={ { fontSize: 10 } }>(Leave blank to use defaults.)</span>
                                    </div>

                                    <div
                                        style={ {
                                            marginTop: 10,
                                            display: "grid",
                                            gridTemplateColumns: "min-content min-content auto",
                                            alignItems: "baseline",
                                            rowGap: 3,
                                            columnGap: 5
                                        } }
                                    >
                                        {/*  Row 1  */ }
                                        <div>
                                            <span style={ { whiteSpace: "nowrap" } }>
                                                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                                    title={ tooltipContents__Min_and_max_mod_masses_Minimum_Label }
                                                    { ...tooltip_Main_Props }
                                                >
                                                    <span style={ { whiteSpace: "nowrap" } }>
                                                        Minimum:
                                                    </span>
                                                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>

                                                <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                                                    title={ tooltipContents__Min_and_max_mod_masses_Minimum_Label }
                                                />
                                            </span>

                                        </div>
                                        <div
                                            className={
                                                this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMassCutoffMin_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY() !== undefined
                                                && this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMassCutoffMin_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY() !== null ? "mod-page-user-selection-entered" : null
                                            }
                                        >
                                            <INTERNAL__Min_Or_Max_ModMass_FilterInputField_Component
                                                existingValue_In_ModViewPage_DataVizOptions_VizSelections_PageStateManager={ this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMassCutoffMin_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY() }
                                                valueChanged_Callback={ this._modMassCutoffMin_InputFieldChanged_Callback_BindThis }
                                            />
                                        </div>
                                        {/*  Column 3 to allow the bottom row 3 to be longer  */ }
                                        <div></div>
                                        {/*  Row 2  */ }
                                        <div>
                                            <span style={ { whiteSpace: "nowrap" } }>
                                                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                                    title={ tooltipContents__Min_and_max_mod_masses_Maximum_Label }
                                                    { ...tooltip_Main_Props }
                                                >
                                                    <span style={ { whiteSpace: "nowrap" } }>
                                                        Maximum:
                                                    </span>
                                                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>

                                                <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                                                    title={ tooltipContents__Min_and_max_mod_masses_Maximum_Label }
                                                />
                                            </span>

                                        </div>
                                        <div>
                                            <INTERNAL__Min_Or_Max_ModMass_FilterInputField_Component
                                                existingValue_In_ModViewPage_DataVizOptions_VizSelections_PageStateManager={ this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMassCutoffMax_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY() }
                                                valueChanged_Callback={ this._modMassCutoffMax_InputFieldChanged_Callback_BindThis }
                                            />
                                        </div>
                                        {/*  Column 3 to allow the bottom row 3 to be longer  */ }
                                        <div></div>
                                        {/*  Row 3  */ }
                                        { this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMassCutoffMin_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY() !== undefined ||
                                        this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMassCutoffMax_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY() !== undefined ? (

                                            <div style={ { gridColumn: "1 / -1 " } }>{/*  Span All Columns  */ }
                                                <div style={ { marginTop: 6 } }>
                                                    <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                                        title={ tooltipContents__Min_and_max_mod_masses_Clear_Minimum_Maximum_Label }
                                                        { ...tooltip_Main_Props }
                                                    >
                                                        <span
                                                            className="fake-link"
                                                            onClick={ this._clear_ModMass_MinMax_Cutoffs_BindThis }
                                                        >
                                                            Clear Minimum/Maximum
                                                        </span>
                                                    </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                                </div>

                                                { this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMassCutoffMin_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY() !== undefined ||
                                                this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMassCutoffMax_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY() !== undefined ? (

                                                    <div style={ { marginTop: 8 } }>
                                                        <span
                                                            className=" fake-link "
                                                            onClick={ event => {
                                                                const modMassCutoffMin = this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMassCutoffMin_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY()
                                                                const modMassCutoffMax = this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMassCutoffMax_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY()

                                                                let modMassMin_BeforeZoomOut = modMassCutoffMin
                                                                let modMassMax_BeforeZoomOut = modMassCutoffMax

                                                                if ( modMassMin_BeforeZoomOut === undefined ) {

                                                                    modMassMin_BeforeZoomOut = this.props.propsValue.modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root.get_modMass_Min_Across_All_Searches__Unfiltered_ModMass_MinMax()
                                                                }
                                                                if ( modMassMax_BeforeZoomOut === undefined ) {

                                                                    modMassMax_BeforeZoomOut = this.props.propsValue.modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root.get_modMass_Max_Across_All_Searches__Unfiltered_ModMass_MinMax()
                                                                }

                                                                const minMax_Diff = Math.abs( modMassMax_BeforeZoomOut - modMassMin_BeforeZoomOut )

                                                                let modMassMin_AfterZoomOut = modMassMin_BeforeZoomOut - minMax_Diff
                                                                let modMassMax_AfterZoomOut = modMassMax_BeforeZoomOut + minMax_Diff

                                                                if ( modMassMin_AfterZoomOut < this.props.propsValue.modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root.get_modMass_Min_Across_All_Searches__Unfiltered_ModMass_MinMax() ) {
                                                                    modMassMin_AfterZoomOut = undefined
                                                                }

                                                                if ( modMassMax_AfterZoomOut > this.props.propsValue.modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root.get_modMass_Max_Across_All_Searches__Unfiltered_ModMass_MinMax() ) {
                                                                    modMassMax_AfterZoomOut = undefined
                                                                }

                                                                if ( modMassCutoffMin !== undefined ) {
                                                                    this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.set_modMassCutoffMin_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY( modMassMin_AfterZoomOut )
                                                                }

                                                                if ( modMassCutoffMax !== undefined ) {
                                                                    this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.set_modMassCutoffMax_For_ACTUAL_ModMass__WhenDisplay_HISTOGRAM_ONLY( modMassMax_AfterZoomOut )
                                                                }

                                                                this.props.propsValue.valueChanged_Callback()

                                                            } }
                                                        >
                                                            Zoom out - Mod Mass Min Max
                                                        </span>
                                                    </div>
                                                ) : null }

                                            </div>
                                        ) : null }
                                    </div>
                                </div>

                                {/*  4 of 4 Inner Flex Box Items  */ }

                                {/*  Column In "flex"  */ }
                                <div className="viz-form-section">

                                    <div>
                                        <label>
                                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                                title={ tooltipContents__Exclude_unlocalized_mods_Label }
                                                { ...tooltip_Main_Props }
                                            >
                                                <span>Exclude unlocalized mods:</span>
                                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>

                                            <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                                                title={ tooltipContents__Exclude_unlocalized_mods_Label }
                                            />

                                            <span> </span>
                                            <input
                                                type="checkbox"
                                                checked={ this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_excludeUnlocalizedOpenMods() }
                                                onChange={ this._excludeUnlocalizedMods_InputFieldChanged_Callback_BindThis }
                                            />
                                        </label>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/*  2 of 2 Outer Flex Box Items  */ }

                    </div>
                    {/* <!-- end form sections --> */ }

                </div>

            </div>
        );
    } catch ( e ) {
        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
        throw e
    }
    }
}


///////////////////

//   Input Field for Min or Max Mod Mass - Allow Negative numbers and decimal numbers

/**
 *
 */
export interface INTERNAL__Min_Or_Max_ModMass_FilterInputField_Component_Props {

    existingValue_In_ModViewPage_DataVizOptions_VizSelections_PageStateManager: number
    valueChanged_Callback: ( newValue: number ) => void
}

/**
 *
 */
interface INTERNAL__Min_Or_Max_ModMass_FilterInputField_Component_State {

    forceReRender_Object?: object
}

/**
 *
 */
export class INTERNAL__Min_Or_Max_ModMass_FilterInputField_Component extends React.Component<INTERNAL__Min_Or_Max_ModMass_FilterInputField_Component_Props, INTERNAL__Min_Or_Max_ModMass_FilterInputField_Component_State> {

    //  bind to 'this' for passing as parameters

    private _inputFieldChanged_BindThis = this._inputFieldChanged.bind( this )

    private _value_ForInputField: string

    /**
     *
     */
    constructor( props: INTERNAL__Min_Or_Max_ModMass_FilterInputField_Component_Props ) {
        try {
            super( props );

            this._value_ForInputField = ""

            if ( this.props.existingValue_In_ModViewPage_DataVizOptions_VizSelections_PageStateManager !== undefined && this.props.existingValue_In_ModViewPage_DataVizOptions_VizSelections_PageStateManager !== null ) {

                this._value_ForInputField = this.props.existingValue_In_ModViewPage_DataVizOptions_VizSelections_PageStateManager.toString()
            }

            this.state = {
                forceReRender_Object: {}
            };
        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

    /**
     *
     */
    componentDidUpdate( prevProps: Readonly<INTERNAL__Min_Or_Max_ModMass_FilterInputField_Component_Props>, prevState: Readonly<INTERNAL__Min_Or_Max_ModMass_FilterInputField_Component_State>, snapshot?: any ) {
        try {

            if ( prevProps.existingValue_In_ModViewPage_DataVizOptions_VizSelections_PageStateManager !== this.props.existingValue_In_ModViewPage_DataVizOptions_VizSelections_PageStateManager ) {

                //  Upstream value changed so update input field

                this._value_ForInputField = ""

            if ( this.props.existingValue_In_ModViewPage_DataVizOptions_VizSelections_PageStateManager !== undefined && this.props.existingValue_In_ModViewPage_DataVizOptions_VizSelections_PageStateManager !== null ) {

                this._value_ForInputField = this.props.existingValue_In_ModViewPage_DataVizOptions_VizSelections_PageStateManager.toString()
            }

            this.setState({ forceReRender_Object: {} })
        }

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    /**
     *
     */
    private _inputFieldChanged( event: React.ChangeEvent<HTMLInputElement> ) { try {

        const newValue_String = event.target.value.trim()

        const newValue_Number = _inputNumberField_Compute_DecimalNumberFromFieldContents( newValue_String )

        if ( newValue_String === "-" ) {

            this._value_ForInputField = newValue_String

        } else {

            this._value_ForInputField = ""

            if ( newValue_Number !== undefined && newValue_Number !== null ) {

                this._value_ForInputField = newValue_Number.toString()

                if ( /^[+-]?((\d+(\.\d*)?)|(\.\d+))$/.test( newValue_String ) ) {
                    //  value is a valid decimal number, based on regex

                    this._value_ForInputField = newValue_String
                }
            }
        }

        this.setState({ forceReRender_Object: {} })

        if ( newValue_Number === this.props.existingValue_In_ModViewPage_DataVizOptions_VizSelections_PageStateManager ) {
            // No change so exit
            return // EARLY RETURN
        }

        this.props.valueChanged_Callback( newValue_Number )

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    /**
     *
     */
    render() { try {

        return (
            <input
                type="text"
                className={ this._value_ForInputField !== "" ? "mod-page-user-selection-entered" : null }
                style={ { width: 160 } }
                value={ this._value_ForInputField }
                onChange={ this._inputFieldChanged_BindThis }
            />
        )

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}
}

//////////////

/**
 *
 */
const _inputNumberField_Compute_DecimalNumberFromFieldContents = function ( inputFieldValue_AsString: string ) : number {

    const inputFieldValue_AsString_Trimmed = inputFieldValue_AsString.trim()

    if ( inputFieldValue_AsString_Trimmed.length === 0 ) {
        return undefined
    }

    const inputFieldValue_AsNumber = Number.parseFloat( inputFieldValue_AsString_Trimmed )

    if ( Number.isNaN( inputFieldValue_AsNumber ) ) {
        return undefined
    }

    return inputFieldValue_AsNumber
}

////////////

/**
 *
 */
const _inputNumberField_Compute_IntegerNumberFromFieldContents = function ( inputFieldValue_AsString: string ) : number {

    const inputFieldValue_AsString_Trimmed = inputFieldValue_AsString.trim()

    if ( inputFieldValue_AsString_Trimmed.length === 0 ) {
        return undefined
    }

    const inputFieldValue_AsNumber = Number.parseInt( inputFieldValue_AsString_Trimmed )

    if ( Number.isNaN( inputFieldValue_AsNumber ) ) {
        return undefined
    }

    return inputFieldValue_AsNumber
}
