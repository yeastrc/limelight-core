/**
 * ModPage_OptionsSection_UserInput_Display_MainContent_Component.tsx
 *
 *     HeatMap Tab Options Section
 *
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



//  Delay after input change before call callback, to wait for additional keyboard input
const CALL_CALLBACK_DELAY = 400;  // in milliseconds



/**
 *
 */
export class ModPage_OptionsSection_UserInput_Display_MainContent_Component_Props_Prop {

    modViewPage_DataVizOptions_VizSelections_PageStateManager: ModViewPage_DataVizOptions_VizSelections_PageStateManager
    valueChanged_Callback: () => void
}

/**
 *
 */
export interface ModPage_OptionsSection_UserInput_Display_MainContent_Component_Props {

    propsValue : ModPage_OptionsSection_UserInput_Display_MainContent_Component_Props_Prop
}

/**
 *
 */
interface ModPage_OptionsSection_UserInput_Display_MainContent_Component_State {

    forceReRender_Object? : object
}

/**
 *  HeatMap Options Section
 */
export class ModPage_OptionsSection_UserInput_Display_MainContent_Component extends React.Component< ModPage_OptionsSection_UserInput_Display_MainContent_Component_Props, ModPage_OptionsSection_UserInput_Display_MainContent_Component_State > {

    //  bind to 'this' for passing as parameters

    private _quantType_Psms_Clicked_Callback_BindThis = this._quantType_Psms_Clicked_Callback.bind(this)
    private _quantType_Scans_Clicked_Callback_BindThis = this._quantType_Scans_Clicked_Callback.bind(this)


    private _psmQuantMethod_Counts_Clicked_Callback_BindThis = this._psmQuantMethod_Counts_Clicked_Callback.bind(this)
    private _psmQuantMethod_Ratios_Clicked_Callback_BindThis = this._psmQuantMethod_Ratios_Clicked_Callback.bind(this)

    private _psmQuant_Ratios_Use_SecondaryFilteringResultForDenominator_Clicked_BindThis = this._psmQuant_Ratios_Use_SecondaryFilteringResultForDenominator_Clicked.bind(this)

    private _colorCutoffRatio_InputFieldChanged_Callback_BindThis = this._colorCutoffRatio_InputFieldChanged_Callback.bind(this)
    private _colorCutoffCount_InputFieldChanged_Callback_BindThis = this._colorCutoffCount_InputFieldChanged_Callback.bind(this)
    private _modMassCutoffMin_InputFieldChanged_Callback_BindThis = this._modMassCutoffMin_InputFieldChanged_Callback.bind(this)
    private _modMassCutoffMax_InputFieldChanged_Callback_BindThis = this._modMassCutoffMax_InputFieldChanged_Callback.bind(this)
    private _clear_ModMass_MinMax_Cutoffs_BindThis = this._clear_ModMass_MinMax_Cutoffs.bind(this)

    private _excludeUnlocalizedMods_InputFieldChanged_Callback_BindThis = this._excludeUnlocalizedMods_InputFieldChanged_Callback.bind(this)

    private _transformations_InputFieldChanged_Callback_BindThis = this._transformations_InputFieldChanged_Callback.bind(this)

    /**
     *
     */
    constructor(props : ModPage_OptionsSection_UserInput_Display_MainContent_Component_Props) { try {
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

    private _psmQuantMethod_Counts_Clicked_Callback( event: React.ChangeEvent<HTMLInputElement> ) { try {

        this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.set_psmQuant_WhenDisplay_HEATMAP_ONLY( ModViewPage_DataVizOptions_VizSelections_PageStateManager__PSM_QUANT_METHOD_Values_Enum.counts )

        this._rerender_Then_After_SetTimeout_Call_valueChanged_Callback()

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    private _psmQuant_Ratios_Use_SecondaryFilteringResultForDenominator_Clicked( event: React.ChangeEvent<HTMLInputElement> ) { try {

        this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.set_psmQuant_Ratios_Use_SecondaryFilteringResultForDenominator( event.target.checked )

        this._rerender_Then_After_SetTimeout_Call_valueChanged_Callback()

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}


    private _psmQuantMethod_Ratios_Clicked_Callback( event: React.ChangeEvent<HTMLInputElement> ) { try {

        this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.set_psmQuant_WhenDisplay_HEATMAP_ONLY( ModViewPage_DataVizOptions_VizSelections_PageStateManager__PSM_QUANT_METHOD_Values_Enum.ratios )

        this._rerender_Then_After_SetTimeout_Call_valueChanged_Callback()

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    private _excludeUnlocalizedMods_InputFieldChanged_Callback( event: React.ChangeEvent<HTMLInputElement> ) { try {

        const newValue = event.target.checked

        this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.set_excludeUnlocalizedOpenMods( newValue )

        this._rerender_Then_After_SetTimeout_Call_valueChanged_Callback()

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}


    //////////////

    private _transformations_InputFieldChanged_Callback( event: React.ChangeEvent<HTMLSelectElement> ) { try {

         const newValue = event.target.value

        if ( newValue === ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.none ) {
            this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.set_dataTransformation_For__WhenDisplay_HEATMAP_ONLY( ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.none )
        } else if ( newValue === ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.scaled_mean_diff ) {
            this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.set_dataTransformation_For__WhenDisplay_HEATMAP_ONLY( ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.scaled_mean_diff )
        } else if ( newValue === ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.per_mod_zscore ) {
            this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.set_dataTransformation_For__WhenDisplay_HEATMAP_ONLY( ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.per_mod_zscore )
        } else if ( newValue === ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.global_zscore ) {
            this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.set_dataTransformation_For__WhenDisplay_HEATMAP_ONLY( ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.global_zscore )
        } else if ( newValue === ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.global_pvalue_bonf ) {
            this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.set_dataTransformation_For__WhenDisplay_HEATMAP_ONLY( ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.global_pvalue_bonf )
        } else if ( newValue === ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.global_qvalue_bh ) {
            this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.set_dataTransformation_For__WhenDisplay_HEATMAP_ONLY( ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.global_qvalue_bh )
        } else {
            const msg = "_transformations_InputFieldChanged_Callback: event.target.value is NOT any value in ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum "
            console.warn(msg)
            throw Error(msg)
        }

        this._rerender_Then_After_SetTimeout_Call_valueChanged_Callback()

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    /////////

    //  Process onChange on <input> text fields containing integers

    /**
     *
     */
    private _colorCutoffRatio_InputFieldChanged_Callback( newValue_Number: number ) { try {

        if ( newValue_Number === this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_colorCutoffRatio_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY() ) {
            // No change so exit
            return // EARLY RETURN
        }

        this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.set_colorCutoffRatio_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY( newValue_Number )

        this._inputField_TypeText_Changed()

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    /**
     *
     */
    private _colorCutoffCount_InputFieldChanged_Callback( event: React.ChangeEvent<HTMLInputElement> ) { try {

        const newValue_String = event.target.value

        const newValue_Number = _inputNumberField_Compute_IntegerNumberFromFieldContents( newValue_String )

        if ( newValue_Number === this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_colorCutoffCount_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY() ) {
            // No change so exit
            return // EARLY RETURN
        }

        this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.set_colorCutoffCount_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY( newValue_Number )

        this._inputField_TypeText_Changed()

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    /**
     *
     */
    private _modMassCutoffMin_InputFieldChanged_Callback( newValue_Number: number ) { try {

        if ( newValue_Number === this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMassCutoffMin_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY() ) {
            // No change so exit
            return // EARLY RETURN
        }

        this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.set_modMassCutoffMin_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY( newValue_Number )

        this._inputField_TypeText_Changed()

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    /**
     *
     */
    private _modMassCutoffMax_InputFieldChanged_Callback( newValue_Number: number ) { try {

        if ( newValue_Number === this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMassCutoffMax_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY() ) {
            // No change so exit
            return // EARLY RETURN
        }

        this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.set_modMassCutoffMax_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY( newValue_Number )

        this._inputField_TypeText_Changed()

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    /**
     *
     */
    private _clear_ModMass_MinMax_Cutoffs( event: React.MouseEvent<HTMLSpanElement, MouseEvent> ) { try {

        this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.set_modMassCutoffMin_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY( undefined )
        this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.set_modMassCutoffMax_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY( undefined )

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

        const tooltipContents__PsmQuant_Counts_Label = (
            <span>
                View as count of PSMs or scans with mod mass in search.
            </span>
        )

        const tooltipContents__PsmQuant_Ratios_Label = (
            <span>
                View as ratio of # of PSMs or scans with mod mass / total number
                of PSMs or scans in search.
            </span>
        )

        const tooltipContents__PsmQuant_Ratios_Total_use_secondary_filters_Label = (
            <span>
                { "Ratios are normally counted using all PSMs passing primary filters for each search (e.g., q-value <= 0.01) in the denominator. Select this option to only use PSMs that also pass all secondary filters on the page (e.g., a specified retention time range or min/max mod mass range) in the denominator. " }
            </span>
        )

        const tooltipContents__Max_cutoff_for_color_scale_Label = (
            <span>
                Override maximum values used when determining the color scale in the
                visualization.
            </span>
        )

        const tooltipContents__Max_cutoff_for_color_scale_Count_Label = (
            <div>
                <div>
                    Override maximum value for PSM or scan count when scaling color in visualization.
                </div>
                <div>
                    Only used when quant method is set to counts.
                </div>
            </div>
        )

        const tooltipContents__Max_cutoff_for_color_scale_Ratio_Label = (
            <div>
                <div>
                    Override maximum value for ratio when scaling color in visualization.
                </div>
                <div>
                    Only used when quant method is set to ratios.
                </div>
            </div>
        )

        const tooltipContents__Min_and_max_mod_masses_Label = (
            <div>
                <div>
                    Override the minimum and maximum modification masses to be shown in the visualization and data table.
                </div>
                <div>
                    Masses outside this range are also excluded from Z-score and P-value calculations.
                </div>
                <div>
                    The modification masses are rounded before comparing to the minimum and maximum.
                </div>
            </div>
        )

        const tooltipContents__Min_and_max_mod_masses_Minimum_Label = (
            <div>
                <div>
                    Override the minimum modification mass to be shown in the visualization and data table.
                </div>
                <div>
                    Masses below this value are also excluded from Z-score and P-value calculations.
                </div>
                <div>
                    The modification masses are rounded before comparing to the minimum.
                </div>
            </div>
        )

        const tooltipContents__Min_and_max_mod_masses_Maximum_Label = (
            <div>
                <div>
                    Override the maximum modification mass to be shown in the visualization and data table.
                </div>
                <div>
                    Masses greater than this value are also excluded from Z-score and P-value calculations.
                </div>
                <div>
                    The modification masses are rounded before comparing to the minimum and maximum.
                </div>
            </div>
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


        const tooltipContents__Transformations_Label = (
            <span>
                Instead of raw data show a transformation of the data, typically the result of a statistical test. For example, show p-values associated with the PSM count for each mod mass in each search.
            </span>
        )

        const tooltipContents__Transformations_OptionEntry_title_attribute__none =
            "No data transformation."

        const tooltipContents__Transformations_OptionEntry_title_attribute__scaled_mean_diff =
            "For each mod mass and search display: (x - μ) / μ, where x is the count or ratio for a mod mass in a search and μ is the mean for a mod mass across all searches."

        const tooltipContents__Transformations_OptionEntry_title_attribute__per_mod_zscore =
            "For each mod mass and search display: (x - μ) / s, where x is the count or ratio for a mod mass in a search, μ is the mean for a mod mass across all searches, and s is the standard deviation for this mod mass across all searches."

        const tooltipContents__Transformations_OptionEntry_title_attribute__global_zscore =
            "For each mod mass and search display: (x - μ) / s, where x is the count or ratio for a mod mass in a search, μ is the mean for all mod masses across all searches, and s is the standard deviation across all mod masses in all searches."

        const tooltipContents__Transformations_OptionEntry_title_attribute__global_pvalue_bonf =
            "For each mod mass and search display: p, where p is the Bonferroni-corrected p-value associated with the global z-score (the probability of observing a z-score of that magnitude or greater by chance given a normal distribution with the observed mean and standard deviation."

        const tooltipContents__Transformations_OptionEntry_title_attribute__global_qvalue_bh =
            "For each mod mass and search display: q, where q is the Benjamini-Hochberg q-value associated with the global z-score (the probability of observing a z-score of that magnitude or greater by chance given a normal distribution with the observed mean and standard deviation."

        let tooltipContents__Transformations__SelectElement: string = undefined

        switch ( this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_dataTransformation_For__WhenDisplay_HEATMAP_ONLY() ) {

            case ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.none:
                tooltipContents__Transformations__SelectElement = tooltipContents__Transformations_OptionEntry_title_attribute__none
                break
            case ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.scaled_mean_diff:
                tooltipContents__Transformations__SelectElement = tooltipContents__Transformations_OptionEntry_title_attribute__scaled_mean_diff
                break
            case ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.per_mod_zscore:
                tooltipContents__Transformations__SelectElement = tooltipContents__Transformations_OptionEntry_title_attribute__per_mod_zscore
                break
            case ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.global_zscore:
                tooltipContents__Transformations__SelectElement = tooltipContents__Transformations_OptionEntry_title_attribute__global_zscore
                break
            case ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.global_pvalue_bonf:
                tooltipContents__Transformations__SelectElement = tooltipContents__Transformations_OptionEntry_title_attribute__global_pvalue_bonf
                break
            case ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.global_qvalue_bh:
                tooltipContents__Transformations__SelectElement = tooltipContents__Transformations_OptionEntry_title_attribute__global_qvalue_bh
                break

            //  TODO Add case for any new values added to ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum

            default:
                //  Leave undefined.  TODO  consider throwing Error
        }


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

                        {/*  Columns in "flex".  Each column has in CSS: "  flex-grow: 0; flex-shrink: 0;" so that the width of each stays at 'max-content'  */}

                        {/*  <div> Holding inner flexbox and "Update Visualization" button below it  */}

                        {/*  Column In "flex"  */}
                        <div className="viz-form-section">

                            {/*  Inner FlexBox -- First 4 blocks as separate items  */}
                            <div
                                style={ {
                                    display: "flex",
                                    columnGap: 15,
                                    alignItems: "flex-start"  // Each item vertical is only as tall as the item, not stretched to the tallest item.  Default is "stretch".
                                } }
                            >

                                {/*  1 of 4 Inner Flex Box Items  */}

                                {/*  Column In "flex"  */}
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

                                    <div style={ { marginTop: 10 } }>

                                        <div>
                                            <label>
                                                <input
                                                    type="radio"
                                                    checked={ this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_psmQuant_WhenDisplay_HEATMAP_ONLY() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__PSM_QUANT_METHOD_Values_Enum.counts }
                                                    onChange={ this._psmQuantMethod_Counts_Clicked_Callback_BindThis }
                                                />
                                                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                                    title={ tooltipContents__PsmQuant_Counts_Label }
                                                    { ...tooltip_Main_Props }
                                                >
                                                    <span>
                                                        Counts
                                                    </span>
                                                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                            </label>

                                            <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                                                title={ tooltipContents__PsmQuant_Counts_Label }
                                            />

                                        </div>


                                        <div>
                                            <label>
                                                <input
                                                    type="radio"
                                                    checked={ this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_psmQuant_WhenDisplay_HEATMAP_ONLY() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__PSM_QUANT_METHOD_Values_Enum.ratios }
                                                    onChange={ this._psmQuantMethod_Ratios_Clicked_Callback_BindThis }
                                                />
                                                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                                    title={ tooltipContents__PsmQuant_Ratios_Label }
                                                    { ...tooltip_Main_Props }
                                                    placement={ "right" }
                                                >
                                                    <span>
                                                        Ratios
                                                    </span>
                                                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                            </label>

                                            <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                                                title={ tooltipContents__PsmQuant_Ratios_Label }
                                            />

                                        </div>

                                        { this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_psmQuant_WhenDisplay_HEATMAP_ONLY() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__PSM_QUANT_METHOD_Values_Enum.ratios ? (
                                            //  'ratios' selected

                                            <div style={ { marginTop: 5, marginLeft: 10 } }>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        checked={ this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_psmQuant_Ratios_Use_SecondaryFilteringResultForDenominator() ? true : false }
                                                        onChange={ this._psmQuant_Ratios_Use_SecondaryFilteringResultForDenominator_Clicked_BindThis }
                                                    />
                                                    <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                                        title={ tooltipContents__PsmQuant_Ratios_Total_use_secondary_filters_Label }
                                                        { ...tooltip_Main_Props }
                                                    >
                                                        <span>
                                                            Ratios Total use secondary filters
                                                        </span>
                                                    </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                                </label>

                                                <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                                                    title={ tooltipContents__PsmQuant_Ratios_Total_use_secondary_filters_Label }
                                                />

                                            </div>

                                            ) : null }

                                    </div>

                                </div>

                                {/*  2 of 4 Inner Flex Box Items  */ }

                                {/*  Column In "flex"  */ }
                                <div className="viz-form-section">

                                    <div>
                                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                            title={ tooltipContents__Max_cutoff_for_color_scale_Label }
                                            { ...tooltip_Main_Props }
                                        >
                                            <span>
                                                Max cutoff for color scale:
                                            </span>
                                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>

                                        <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                                            title={ tooltipContents__Max_cutoff_for_color_scale_Label }
                                        />
                                    </div>

                                    <div>
                                        <span style={ { fontSize: 10 } }>(Leave blank to not filter.)</span>
                                    </div>

                                    <div style={ { marginTop: 10 } }>

                                        { this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_psmQuant_WhenDisplay_HEATMAP_ONLY() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__PSM_QUANT_METHOD_Values_Enum.counts ? (
                                            //  'counts' selected
                                            <>
                                                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                                    title={ tooltipContents__Max_cutoff_for_color_scale_Count_Label }
                                                    { ...tooltip_Main_Props }
                                                >
                                                    <span>Count:</span>
                                                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>

                                                <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                                                    title={ tooltipContents__Max_cutoff_for_color_scale_Count_Label }
                                                />

                                                <span> </span>

                                                <input
                                                    type="text"
                                                    size={ 4 }
                                                    className={
                                                        this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_colorCutoffCount_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY() !== undefined
                                                        && this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_colorCutoffCount_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY() !== null ? "mod-page-user-selection-entered" : null
                                                    }
                                                    value={
                                                        this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_colorCutoffCount_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY() !== undefined
                                                        && this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_colorCutoffCount_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY() !== null
                                                            ? this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_colorCutoffCount_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY()
                                                            : ""
                                                    }
                                                    onChange={ this._colorCutoffCount_InputFieldChanged_Callback_BindThis }
                                                />
                                            </>
                                        ) : null }

                                        { this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_psmQuant_WhenDisplay_HEATMAP_ONLY() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__PSM_QUANT_METHOD_Values_Enum.ratios ? (
                                            //  'ratios' selected
                                            <>
                                                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                                    title={ tooltipContents__Max_cutoff_for_color_scale_Ratio_Label }
                                                    { ...tooltip_Main_Props }
                                                >
                                                    <span>Ratio:</span>
                                                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>

                                                <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                                                    title={ tooltipContents__Max_cutoff_for_color_scale_Ratio_Label }
                                                />

                                                <span> </span>

                                                <INTERNAL__MaxCutoff_ForColorScale_Ratio_Filter_InputField_Component
                                                    existingValue_In_ModViewPage_DataVizOptions_VizSelections_PageStateManager={ this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_colorCutoffRatio_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY() }
                                                    valueChanged_Callback={ this._colorCutoffRatio_InputFieldChanged_Callback_BindThis }
                                                />
                                            </>
                                        ) : null }

                                    </div>
                                </div>

                                {/*  3 of 4 Inner Flex Box Items  */}

                                {/*  Column In "flex"  */}
                                <div className="viz-form-section">

                                    <div>
                                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                            title={ tooltipContents__Min_and_max_mod_masses_Label }
                                            { ...tooltip_Main_Props }
                                        >
                                            <span>Min and max mod masses:</span>
                                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>

                                        <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                                            title={ tooltipContents__Min_and_max_mod_masses_Label }
                                        />

                                    </div>
                                    <div>
                                        <span style={ { fontSize: 10 } }>(Filter on rounded mass values.)</span>
                                    </div>
                                    <div>
                                        <span style={ { fontSize: 10 } }>(Leave blank to not filter.)</span>
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
                                                this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMassCutoffMin_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY() !== undefined
                                                && this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMassCutoffMin_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY() !== null ? "mod-page-user-selection-entered" : null
                                            }
                                        >
                                            <INTERNAL__Min_Or_Max_ModMass_FilterInputField_Component
                                                existingValue_In_ModViewPage_DataVizOptions_VizSelections_PageStateManager={ this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMassCutoffMin_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY() }
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
                                                existingValue_In_ModViewPage_DataVizOptions_VizSelections_PageStateManager={ this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMassCutoffMax_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY() }
                                                valueChanged_Callback={ this._modMassCutoffMax_InputFieldChanged_Callback_BindThis }
                                            />
                                        </div>
                                        {/*  Column 3 to allow the bottom row 3 to be longer  */ }
                                        <div></div>
                                        {/*  Row 3  */ }
                                        { this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMassCutoffMin_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY() !== undefined ||
                                        this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMassCutoffMax_For_ROUNDED_ModMass__WhenDisplay_HEATMAP_ONLY() !== undefined ? (

                                            <div style={ { gridColumn: "1 / -1 " } }>{/*  Span All Columns  */ }
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

                                    <div style={ { marginTop: 10 } }>
                                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                            title={ tooltipContents__Transformations_Label }
                                            { ...tooltip_Main_Props }
                                        >
                                            <span>Transformations:</span>
                                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>

                                        <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                                            title={ tooltipContents__Transformations_Label }
                                        />

                                    </div>

                                    <div>
                                        <select
                                            value={ this.props.propsValue.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_dataTransformation_For__WhenDisplay_HEATMAP_ONLY() }
                                            title={ tooltipContents__Transformations__SelectElement }
                                            onChange={ this._transformations_InputFieldChanged_Callback_BindThis  }
                                        >
                                            <option
                                                value={ ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.none }
                                                title={ tooltipContents__Transformations_OptionEntry_title_attribute__none }
                                            >
                                                None
                                            </option>
                                            <option
                                                value={ ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.scaled_mean_diff }
                                                title={ tooltipContents__Transformations_OptionEntry_title_attribute__scaled_mean_diff}
                                            >
                                                Scaled Mean Diff.
                                            </option>
                                            <option
                                                value={ ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.per_mod_zscore }
                                                title={ tooltipContents__Transformations_OptionEntry_title_attribute__per_mod_zscore }
                                            >
                                                Per-mod Z-Score
                                            </option>
                                            <option
                                                value={ ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.global_zscore }
                                                title={ tooltipContents__Transformations_OptionEntry_title_attribute__global_zscore }
                                            >
                                                Global Z-Score
                                            </option>
                                            <option
                                                value={ ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.global_pvalue_bonf }
                                                title={ tooltipContents__Transformations_OptionEntry_title_attribute__global_pvalue_bonf }
                                            >
                                                Global P-Value (Bonferroni)
                                            </option>
                                            <option
                                                value={ ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.global_qvalue_bh }
                                                title={ tooltipContents__Transformations_OptionEntry_title_attribute__global_qvalue_bh }
                                            >
                                                Global Q-Value (B-H)
                                            </option>
                                        </select>

                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*  2 of 2 Outer Flex Box Items  */}

                    </div>
                    {/* <!-- end form sections --> */ }

                </div>

            </div>
        );
    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}
}


///////////////////

//   Input Field for Min or Max Mod Mass - Allow Negative numbers

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

    forceReRender_Object? : object
}

/**
 *
 */
export class INTERNAL__Min_Or_Max_ModMass_FilterInputField_Component extends React.Component< INTERNAL__Min_Or_Max_ModMass_FilterInputField_Component_Props, INTERNAL__Min_Or_Max_ModMass_FilterInputField_Component_State > {

    //  bind to 'this' for passing as parameters

    private _inputFieldChanged_BindThis = this._inputFieldChanged.bind( this )

    private _value_ForInputField: string

    /**
     *
     */
    constructor( props: INTERNAL__Min_Or_Max_ModMass_FilterInputField_Component_Props ) { try {
        super( props );

        this._value_ForInputField = ""

        if ( this.props.existingValue_In_ModViewPage_DataVizOptions_VizSelections_PageStateManager !== undefined && this.props.existingValue_In_ModViewPage_DataVizOptions_VizSelections_PageStateManager !== null ) {

            this._value_ForInputField = this.props.existingValue_In_ModViewPage_DataVizOptions_VizSelections_PageStateManager.toString()
        }

        this.state = {
            forceReRender_Object: {}
        };
    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    /**
     *
     */
    componentDidUpdate( prevProps: Readonly<INTERNAL__Min_Or_Max_ModMass_FilterInputField_Component_Props>, prevState: Readonly<INTERNAL__Min_Or_Max_ModMass_FilterInputField_Component_State>, snapshot?: any ) { try {

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

        const newValue_Number = _inputNumberField_Compute_IntegerNumberFromFieldContents( newValue_String )

        if ( newValue_String === "-" ) {

            this._value_ForInputField = newValue_String

        } else {

            this._value_ForInputField = ""

            if ( newValue_Number !== undefined && newValue_Number !== null ) {

                this._value_ForInputField = newValue_Number.toString()
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
                size={ 4 }
                className={ this._value_ForInputField !== "" ? "mod-page-user-selection-entered" : null }
                value={ this._value_ForInputField }
                onChange={ this._inputFieldChanged_BindThis }
            />
        )

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}
}

///////////////////

//   Input Field for Max Cutoff for Color Scale for Ratio - Allow Decimal numbers

/**
 *
 */
export interface INTERNAL__MaxCutoff_ForColorScale_Ratio_Filter_InputField_Component_Props {

    existingValue_In_ModViewPage_DataVizOptions_VizSelections_PageStateManager: number
    valueChanged_Callback: ( newValue: number ) => void
}

/**
 *
 */
interface INTERNAL__MaxCutoff_ForColorScale_Ratio_Filter_InputField_Component_State {

    forceReRender_Object? : object
}

/**
 *
 */
export class INTERNAL__MaxCutoff_ForColorScale_Ratio_Filter_InputField_Component extends React.Component< INTERNAL__MaxCutoff_ForColorScale_Ratio_Filter_InputField_Component_Props, INTERNAL__MaxCutoff_ForColorScale_Ratio_Filter_InputField_Component_State > {

    //  bind to 'this' for passing as parameters

    private _inputFieldChanged_BindThis = this._inputFieldChanged.bind( this )

    private _value_ForInputField: string

    /**
     *
     */
    constructor( props: INTERNAL__MaxCutoff_ForColorScale_Ratio_Filter_InputField_Component_Props ) { try {
        super( props );

        this._value_ForInputField = ""

        if ( this.props.existingValue_In_ModViewPage_DataVizOptions_VizSelections_PageStateManager !== undefined && this.props.existingValue_In_ModViewPage_DataVizOptions_VizSelections_PageStateManager !== null ) {

            this._value_ForInputField = this.props.existingValue_In_ModViewPage_DataVizOptions_VizSelections_PageStateManager.toString()
        }

        this.state = {
            forceReRender_Object: {}
        };
    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    /**
     *
     */
    componentDidUpdate( prevProps: Readonly<INTERNAL__MaxCutoff_ForColorScale_Ratio_Filter_InputField_Component_Props>, prevState: Readonly<INTERNAL__MaxCutoff_ForColorScale_Ratio_Filter_InputField_Component_State>, snapshot?: any ) { try {

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


        if ( /^[+-]?((\d+(\.\d*)?)|(\.\d+))$/.test( newValue_String ) ) {
            //  value is a valid decimal number, based on regex

            this._value_ForInputField = newValue_String

        } else {

            this._value_ForInputField = ""

            if ( newValue_Number !== undefined && newValue_Number !== null ) {

                this._value_ForInputField = newValue_Number.toString()
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
                size={ 4 }
                className={ this._value_ForInputField !== "" ? "mod-page-user-selection-entered" : null }
                value={ this._value_ForInputField }
                onChange={ this._inputFieldChanged_BindThis }
            />
        )

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}
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
