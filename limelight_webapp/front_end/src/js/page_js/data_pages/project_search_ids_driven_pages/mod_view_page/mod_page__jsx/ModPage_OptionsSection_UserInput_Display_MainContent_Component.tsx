/**
 * ModPage_OptionsSection_UserInput_Display_MainContent_Component.tsx
 *
 *
 *          WARNING WARNING WARNING
 *
 * NOT a normal React Component.
 *
 * DOM input elements are assigned and read using jQuery using the 'id' on the elements as well as jQuery .find(  )
 *
 *
 * DO NOT call jQuery.empty() on any DOM element
 *
 *
 * Over time this may be migrated to be fully React.
 *
 * In the meantime, it supports inserting React based components for filtering/options
 *
 */

import React from "react";
import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";
import {
    proteinPositionFilter_UserSelections_Build_ProteinNamesLengths_Data_ForComponent
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__peptide_page__components/protein_position_filter_component/js/proteinPositionFilter_UserSelections_Build_ProteinNamesLengths_Data_ForComponent";
import {
    CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {
    ProteinPositionFilter_UserInput__Component,
    ProteinPositionFilter_UserInput__Component__Get_ProteinData_Root_UserSelectionData_Root_ReturnPromise_CallbackFunction,
    ProteinPositionFilter_UserInput__Component__Save_CallbackFunction,
    ProteinPositionFilter_UserInput__Component__Save_CallbackFunction_Params
} from "page_js/data_pages/common_components__react/protein_position_filter_component__not_single_protein/protein_position_filter__user_input_component/proteinPositionFilter_UserInput__Component";
import {
    ProteinPositionFilter_UserInput__Component__ProteinData_Root,
    ProteinPositionFilter_UserInput__Component__ProteinData_SingleProtein
} from "page_js/data_pages/common_components__react/protein_position_filter_component__not_single_protein/protein_position_filter__user_input_component/proteinPositionFilter_UserInput__Component__ProteinData";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import {
    ModView_VizOptionsData
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modView_VizOptionsData";
import {
    ProteinPositionFilterDataManager
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/ProteinPositionFilterDataManager";
import {
    ProteinPositionFilter_UserInput__Component__UserSelectionData_Root,
    ProteinPositionFilter_UserInput__Component__UserSelectionData_SingleProtein,
    ProteinPositionFilter_UserInput__Component__UserSelectionData_SingleRange
} from "page_js/data_pages/common_components__react/protein_position_filter_component__not_single_protein/protein_position_filter__user_input_component/proteinPositionFilter_UserInput__Component__UserSelectionData";

/**
 *
 */
export class ModPage_OptionsSection_UserInput_Display_MainContent_Component_Props_Prop {

    vizOptionsData : ModView_VizOptionsData
    projectSearchIds : Array<number>
    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
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

    _placeHolder? : unknown
}

/**
 *
 */
export class ModPage_OptionsSection_UserInput_Display_MainContent_Component extends React.Component< ModPage_OptionsSection_UserInput_Display_MainContent_Component_Props, ModPage_OptionsSection_UserInput_Display_MainContent_Component_State > {

    //  bind to 'this' for passing as parameters

    /**
     *
     */
    constructor(props : ModPage_OptionsSection_UserInput_Display_MainContent_Component_Props) {
        super(props);

        this.state = {
        };
    }

    /**
     *
     */
    // componentDidMount() {
    //
    // }

    /**
     *
     */
    componentWillUnmount() {
    }

    ////////////////////////////////////////

    /**
     *
     */
    render() {


        const tooltip_Main_Props = limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer();


        // WARNING WARNING WARNING
        //
        // NOT a normal React Component.  See message at TOP of file.
        //
        // DO NOT call jQuery.empty() on any DOM element


        return (
            <div className="data-viz-options-container">
                <div className="data-viz-title" style={ { marginBottom: 0 } }>Data Visualization Options:</div>
                <div style={ { marginTop: 0, fontSize: "10pt" } }>Mouse over items for help.
                </div>
                <div id="data-viz-form" className="data-viz-form">

                    <div
                        style={ {
                            marginLeft: 15,
                            display: "flex",
                            columnGap: 15,
                            alignItems: "flex-start"  // Each item vertical is only as tall as the item, not stretched to the tallest item.  Default is "stretch".
                        } } // Could add 'flexWrap: "wrap"' but would need to move the "Update Visualization" button.  If do that probably also add 'rowGap'.
                    >

                        {/*  Columns in "flex".  Each column has in CSS: "  flex-grow: 0; flex-shrink: 0;" so that the width of each stays at 'max-content'  */}

                        {/*  Column In "flex"  */}
                        <div className="viz-form-section">

                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                title={ 
                                    <span> 
                                        Choose how modification masses are quantified in each search. Either as PSM or scan counts and either as raw counts or ratios.
                                    </span>
                                }
                                { ...tooltip_Main_Props }
                            >
                                <span>
                                    Quant method:
                                </span>
                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>

                            <div style={ { marginTop: 10 } }>

                                <label>
                                    <input type="radio" name="psm-quant" id="psm-quant-option-ratios" value="ratios" defaultChecked={ false } />
                                    <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                        title={
                                            <span>
                                                View as ratio of # of PSMs or scans with mod mass / total number of PSMs or scans in search.
                                            </span>
                                        }
                                        { ...tooltip_Main_Props }
                                    >
                                        <span>
                                            Ratios
                                        </span>
                                    </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                </label>
                                <br/>
                                <label>
                                    <input type="radio" name="psm-quant" id="psm-quant-option-counts" value="counts"  defaultChecked={ true } />
                                    <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                        title={
                                            <span>
                                                View as count of PSMs or scans with mod mass in search.
                                            </span>
                                        }
                                        { ...tooltip_Main_Props }
                                    >
                                        <span>
                                            Counts
                                        </span>
                                    </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                </label>
                            </div>

                            <div style={ { marginTop: 10 } }>
                                <label>
                                    <input type="radio" name="quant-type" id="quant-type-option-psms" value="psms" defaultChecked={ true } />
                                    <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                        title={
                                            <span>
                                            Counts are based on # of distinct peptide-spectrum matches containing a mod mass. Each scan may result in multiple PSMs if multiple peptides are IDed by the same scan.
                                        </span>
                                        }
                                        { ...tooltip_Main_Props }
                                    >
                                    <span>
                                        PSMs
                                    </span>
                                    </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                </label>
                                <br/>
                                <label>
                                    <input type="radio" name="quant-type" id="quant-type-option-scans" value="scans" defaultChecked={ false } />
                                    <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                        title={
                                            <span>
                                            Counts are based on the # of distinct scans that were IDed as a peptide containing a mod mass. A scan will only count once even if multiple peptides are IDed by the same scan.
                                        </span>
                                        }
                                        { ...tooltip_Main_Props }
                                    >
                                    <span>
                                        Scans
                                    </span>
                                    </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                </label>
                            </div>

                            <div style={ { marginTop: 10 } }>
                                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                        title={ 
                                        <span> 
                                            Update the data visualization and table below with new options.
                                        </span>
                                    }
                                    { ...tooltip_Main_Props }
                                >
                                    <input
                                        type="button" id="update-viz-button"
                                        className="button" value="Update Visualization"
                                    />
                                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                            </div>
                        </div>

                        {/*  Column In "flex"  */}
                        <div className="viz-form-section">

                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                    title={ 
                                        <span> 
                                            Override maximum values used when determining the color scale in the visualization.
                                        </span>
                                    }
                                { ...tooltip_Main_Props }
                            >
                                <span>
                                    Max cutoff for color scale:
                                </span>
                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                            <br/>
                            <span style={ { fontSize: 10 } }>(Leave blank to use defaults.)</span>

                            <table style={ { marginTop: 10 } }>
                                <tbody>
                                    <tr>
                                        <td>
                                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                                    title={
                                            <span>
                                                Override maximum value for ratio when scaling color in visualization. Only used when quant method is set to ratios.
                                            </span>
                                        }
                                                { ...tooltip_Main_Props }
                                            >
                                                <span>
                                                    Ratio:
                                                </span>
                                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                        </td>
                                        <td><input type="text" id="color-cutoff-ratio" name="color-cutoff-ratio" size={ 4 } defaultValue="" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                                    title={
                                                        <span>
                                                            Override maximum value for PSM or scan count when scaling color in visualization. Only used when quant method is set to counts.
                                                        </span>
                                                    }
                                                { ...tooltip_Main_Props }
                                            >
                                                <span>
                                                    Count:
                                                </span>
                                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                        </td>
                                        <td><input type="text" id="color-cutoff-count" name="color-cutoff-count" size={ 4 } defaultValue="" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/*  Column In "flex"  */}
                        <div className="viz-form-section">

                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                    title={ 
                                        <span> 
                                            Override the minimum and maximum modification masses to be shown in the visualization and data table. Masses outside this range are also excluded from Z-score and P-value calculations.
                                        </span>
                                    }
                                { ...tooltip_Main_Props }
                            >
                                <span>Min and max mod masses:</span>
                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                            <br/>
                            <span style={ { fontSize: 10 } }>(Leave blank to use defaults.)</span>

                            <table style={ { marginTop: 10 } }>
                                <tbody>
                                    <tr>
                                        <td>
                                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                                    title={
                                            <span>
                                                Override the minimum modification mass to be shown in the visualization and data table. Masses below this value are also excluded from Z-score and P-value calculations.
                                            </span>
                                        }
                                                { ...tooltip_Main_Props }
                                            >
                                                <span>Minimum:</span>
                                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                        </td>
                                        <td><input type="text" id="modmass-cutoff-min" name="modmass-cutoff-min" size={ 4 } defaultValue="" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                                    title={
                                            <span>
                                                Override the maximum modification mass to be shown in the visualization and data table. Masses greater than this value are also excluded from Z-score and P-value calculations.
                                            </span>
                                        }
                                                { ...tooltip_Main_Props }
                                            >
                                                <span>Maximum:</span>
                                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                        </td>
                                        <td>
                                            <input type="text" id="modmass-cutoff-max" name="modmass-cutoff-max" size={ 4 }  defaultValue="" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/*  Column In "flex"  */}
                        <div className="viz-form-section">

                            <div>
                                <label>
                                    <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                            title={
                                            <span>
                                                Exclude all PSMs that do not localize to any specific position(s) in a peptide.
                                            </span>
                                        }
                                        { ...tooltip_Main_Props }
                                    >
                                        <span>Exclude unlocalized mods:</span>
                                    </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                    <span> </span>
                                    <input
                                        type="checkbox" name="exclude-unlocalized-mods" id="exclude-unlocalized-mods-checkbox"
                                    />
                                </label>
                            </div>

                            <div style={ { marginTop: 10 } }>
                                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                    title={
                                        <span>
                                            Instead of raw data show a transformation of the data, typically the result of a statistical test. For example, show p-values associated with the PSM count for each mod mass in each search.
                                        </span>
                                    }
                                    { ...tooltip_Main_Props }
                                >
                                    <span>Transformations:</span>
                                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                            </div>

                            <div>
                                <select id="transformation-pulldown">
                                    <option value="none" title="No data transformation.">None</option>
                                    <option value="scaled-mean-diff"
                                            title="For each mod mass and search display: (x - μ) / μ, where x is the count or ratio for a mod mass in a search and μ is the mean for a mod mass across all searches.">Scaled
                                        Mean Diff.
                                    </option>
                                    <option value="per-mod-zscore"
                                            title="For each mod mass and search display: (x - μ) / s, where x is the count or ratio for a mod mass in a search, μ is the mean for a mod mass across all searches, and s is the standard deviation for this mod mass across all searches.">Per-mod
                                        Z-Score
                                    </option>
                                    <option value="global-zscore"
                                            title="For each mod mass and search display: (x - μ) / s, where x is the count or ratio for a mod mass in a search, μ is the mean for all mod masses across all searches, and s is the standard deviation across all mod masses in all searches.">Global
                                        Z-Score
                                    </option>
                                    <option value="global-pvalue-bonf"
                                            title="For each mod mass and search display: p, where p is the Bonferroni-corrected p-value associated with the global z-score (the probability of observing a z-score of that magnitude or greater by chance given a normal distribution with the observed mean and standard deviation.">Global
                                        P-Value (Bonferroni)
                                    </option>
                                    <option value="global-qvalue-bh"
                                            title="For each mod mass and search display: q, where q is the Benjamini-Hochberg q-value associated with the global z-score (the probability of observing a z-score of that magnitude or greater by chance given a normal distribution with the observed mean and standard deviation.">Global
                                        Q-Value (B-H)
                                    </option>
                                </select>

                            </div>
                        </div>

                        {/*  Column In "flex"  */}
                        <div className="viz-form-section">

                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                title={
                                    <span>
                                        Filter results to only include specific proteins or positions in proteins.
                                    </span>
                                }
                                { ...tooltip_Main_Props }
                            >
                                <span>Protein position filters:</span>
                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                            <br/>

                            <div style={ { marginTop: 5 } }>

                                <INTERNAL__ModPage_OptionsSection_UserInput_Display_ProteinPosition_Component
                                    vizOptionsData={ this.props.propsValue.vizOptionsData }
                                    projectSearchIds={ this.props.propsValue.projectSearchIds }
                                    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root={ this.props.propsValue.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root }
                                />
                            </div>
                        </div>

                    </div>
                    {/* <!-- end form sections --> */ }

                </div>

            </div>
        );
    }

}

///////////////////////


/**
 *
 */
export interface INTERNAL__ModPage_OptionsSection_UserInput_Display_ProteinPosition_Component_Props {

    vizOptionsData: ModView_VizOptionsData
    projectSearchIds: Array<number>
    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
}

/**
 *
 */
interface INTERNAL__ModPage_OptionsSection_UserInput_Display_ProteinPosition_Component_State {

    force_RerenderObject? : object
}

/**
 *
 */
export class INTERNAL__ModPage_OptionsSection_UserInput_Display_ProteinPosition_Component extends React.Component< INTERNAL__ModPage_OptionsSection_UserInput_Display_ProteinPosition_Component_Props, INTERNAL__ModPage_OptionsSection_UserInput_Display_ProteinPosition_Component_State > {

    //  bind to 'this' for passing as parameters

    private _get_ProteinData_ReturnPromise_CallbackFunction_BindThis = this._get_ProteinData_ReturnPromise_CallbackFunction.bind(this)
    private _update_PageState_FromChildComponent_SaveCall_BindThis = this._update_PageState_FromChildComponent_SaveCall.bind(this);

    private _DONOTCALL() {  //  Test Funcion cast
        const _get_ProteinData_ReturnPromise_CallbackFunction: ProteinPositionFilter_UserInput__Component__Get_ProteinData_Root_UserSelectionData_Root_ReturnPromise_CallbackFunction = this._get_ProteinData_ReturnPromise_CallbackFunction
        const _update_PageState_FromChildComponent_SaveCall_BindThis : ProteinPositionFilter_UserInput__Component__Save_CallbackFunction = this._update_PageState_FromChildComponent_SaveCall
    }

    private _proteinPositionFilter_UserInput__Component__ProteinData : ProteinPositionFilter_UserInput__Component__ProteinData_Root
    private _promise__proteinPositionFilter_UserInput__Component__ProteinData : Promise<ProteinPositionFilter_UserInput__Component__ProteinData_Root>

    private _proteinPositionFilter_UserInput__Component__Existing_userSelections : ProteinPositionFilter_UserInput__Component__UserSelectionData_Root

    private _load_ProteinData_For_Populating_ProteinRanges = false

    private _show_LoadingData_Message = false

    /**
     *
     */
    constructor(props : INTERNAL__ModPage_OptionsSection_UserInput_Display_ProteinPosition_Component_Props) {
        super(props);

        try {
            this._proteinPositionFilter_UserInput__Component__Existing_userSelections = new ProteinPositionFilter_UserInput__Component__UserSelectionData_Root()

            if ( this.props.vizOptionsData.data.proteinPositionFilter ) {
                const proteinRanges = this.props.vizOptionsData.data.proteinPositionFilter.getProteinRanges()
                if ( proteinRanges && proteinRanges.length > 0 ) {

                    //  Need to load protein first before display since need protein lengths

                    this._load_ProteinData_For_Populating_ProteinRanges = true

                    this._show_LoadingData_Message = true
                }
            }

            this.state = {
                force_RerenderObject: {}
            };
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    componentDidMount() {
        try {
            if ( this._load_ProteinData_For_Populating_ProteinRanges ) {

                this._load_ProteinData_For_Populating_ProteinRanges = false

                if ( this._no_Input_ProteinRanges_In_VizOptionsData() ) {

                    // NO longer protein ranges

                    this._show_LoadingData_Message = false

                    this.setState({ force_RerenderObject: {} })

                    return // EARLY RETURN
                }

                const promise = this._get_ProteinData_ReturnPromise_CallbackFunction()
                promise.catch(reason => {})
                promise.then( proteinData => { try {

                    if ( this._no_Input_ProteinRanges_In_VizOptionsData() ) {

                        // NO longer protein ranges

                        this._show_LoadingData_Message = false

                        this.setState({ force_RerenderObject: {} })

                        return // EARLY RETURN
                    }

                    const proteinData_Map_Key_ProteinSequenceVersionId: Map<number, ProteinPositionFilter_UserInput__Component__ProteinData_SingleProtein> = new Map()
                    for ( const protein of proteinData.proteins ) {
                        proteinData_Map_Key_ProteinSequenceVersionId.set( protein.proteinSequenceVersionId, protein )
                    }

                    const vizOptionsData = this.props.vizOptionsData

                    const selectedProteins_Map_Key_ProteinSequenceVersionId: Map<number, ProteinPositionFilter_UserInput__Component__UserSelectionData_SingleProtein> = new Map()

                    for ( const proteinRange of vizOptionsData.data.proteinPositionFilter.getProteinRanges() ) {

                        const proteinData_For_ProteinSequenceVersionId = proteinData_Map_Key_ProteinSequenceVersionId.get( proteinRange.proteinId )
                        if ( ! proteinData_For_ProteinSequenceVersionId ) {

                            //  Protein NOT in the Proteins for current PSM/Peptide/etc filters.

                            //  One source of this error is when change searches and remove all searches that contain this protein
                            //  One source of this error is when change PSM/Peptide/etc filters to remove this protein

                            //  TODO  Would be best to remove this entry from State stored in the URL

                            //  CANNOT skip this since previous code did NOT drop these.

                            // const msg = "proteinData_Map_Key_ProteinSequenceVersionId.get( proteinRange.proteinId ) returned NOTHING for proteinRange.proteinId: " + proteinRange.proteinId
                            // console.warn(msg)
                            // throw Error(msg)
                        }

                        let selectedProtein_result = selectedProteins_Map_Key_ProteinSequenceVersionId.get( proteinRange.proteinId )
                        if ( ! selectedProtein_result ) {
                            selectedProtein_result = new ProteinPositionFilter_UserInput__Component__UserSelectionData_SingleProtein()
                            selectedProtein_result.proteinSequenceVersionId = proteinRange.proteinId
                            selectedProteins_Map_Key_ProteinSequenceVersionId.set( proteinRange.proteinId, selectedProtein_result )
                        }

                        if ( ( ! proteinData_For_ProteinSequenceVersionId ) || ( proteinRange.start !== 1 || proteinRange.end !== proteinData_For_ProteinSequenceVersionId.proteinLength ) ) {

                            if ( ! selectedProtein_result.ranges ) {
                                selectedProtein_result.ranges = []
                            }

                            const selectedProteinRange_ForChildComponent = new ProteinPositionFilter_UserInput__Component__UserSelectionData_SingleRange();
                            selectedProtein_result.ranges.push( selectedProteinRange_ForChildComponent );

                            selectedProteinRange_ForChildComponent.start = proteinRange.start
                            selectedProteinRange_ForChildComponent.end = proteinRange.end
                        }
                    }

                    const selectedProteins_ForChildComponent: Array<ProteinPositionFilter_UserInput__Component__UserSelectionData_SingleProtein> = Array.from( selectedProteins_Map_Key_ProteinSequenceVersionId.values() )

                    this._proteinPositionFilter_UserInput__Component__Existing_userSelections.proteins = selectedProteins_ForChildComponent

                    this._show_LoadingData_Message = false

                    this.setState({ force_RerenderObject: {} })

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            }

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    private _no_Input_ProteinRanges_In_VizOptionsData() : boolean {

        let noProteinRanges = false

        if ( this.props.vizOptionsData.data.proteinPositionFilter ) {
            const proteinRanges = this.props.vizOptionsData.data.proteinPositionFilter.getProteinRanges()
            if ( ( ! proteinRanges ) || ( ! ( proteinRanges.length > 0 ) ) ) {

                noProteinRanges = true
            }
        } else {
            noProteinRanges = true
        }
        return noProteinRanges
    }

    /**
     *
     */
    private _get_ProteinData_ReturnPromise_CallbackFunction() : Promise<ProteinPositionFilter_UserInput__Component__ProteinData_Root> {

        if ( this._proteinPositionFilter_UserInput__Component__ProteinData ) {

            return Promise.resolve( this._proteinPositionFilter_UserInput__Component__ProteinData )  // EARLY RETURN
        }

        if ( this._promise__proteinPositionFilter_UserInput__Component__ProteinData ) {
            return this._promise__proteinPositionFilter_UserInput__Component__ProteinData
        }


        const promise_proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data = proteinPositionFilter_UserSelections_Build_ProteinNamesLengths_Data_ForComponent({
            projectSearchIds: this.props.projectSearchIds,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: this.props.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        })

        this._promise__proteinPositionFilter_UserInput__Component__ProteinData = new Promise<ProteinPositionFilter_UserInput__Component__ProteinData_Root>((resolve, reject) => { try {

            promise_proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data.catch(reason => reject(reason))
            promise_proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data.then(value => { try {

                this._proteinPositionFilter_UserInput__Component__ProteinData = value.proteinPositionFilter_UserInput__Component__ProteinData_Root

                this._promise__proteinPositionFilter_UserInput__Component__ProteinData = undefined

                resolve( this._proteinPositionFilter_UserInput__Component__ProteinData )

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        return this._promise__proteinPositionFilter_UserInput__Component__ProteinData
    }

    /**
     *
     */
    private _update_PageState_FromChildComponent_SaveCall( params: ProteinPositionFilter_UserInput__Component__Save_CallbackFunction_Params ) {

        const vizOptionsData = this.props.vizOptionsData

        // data checks out if we got here, add it to the page

        //  Reset filter in vizOptionsData
        vizOptionsData.data.proteinPositionFilter = new ProteinPositionFilterDataManager();


        const proteinPositionFilter: ProteinPositionFilterDataManager = vizOptionsData.data.proteinPositionFilter;


        for ( const protein_FromChild of params.userSelections.proteins ) {

            const proteinSequenceVersionId = protein_FromChild.proteinSequenceVersionId;

            if ( protein_FromChild.ranges && protein_FromChild.ranges.length > 0 ) {

                for ( const protein_FromChild_range of protein_FromChild.ranges ) {

                    proteinPositionFilter.addProteinRange({ proteinId: proteinSequenceVersionId, start: protein_FromChild_range.start, end: protein_FromChild_range.end });
                }
            } else {

                let protein_Found_For_proteinSequenceVersionId = false

                for ( const protein of this._proteinPositionFilter_UserInput__Component__ProteinData.proteins ) {

                    if ( protein.proteinSequenceVersionId === proteinSequenceVersionId ) {

                        protein_Found_For_proteinSequenceVersionId = true

                        proteinPositionFilter.addProteinRange({ proteinId: proteinSequenceVersionId, start: 1, end: protein.proteinLength });

                        break
                    }
                }

                if ( ! protein_Found_For_proteinSequenceVersionId ) {

                    const msg = "proteinSequenceVersionId NOT FOUND in this._proteinPositionFilter_UserInput__Component__ProteinData.proteins.  proteinSequenceVersionId: " + proteinSequenceVersionId
                    console.warn(msg)
                    throw Error(msg)
                }
            }
        }
    }

    ////////////////////////////////////////

    render() {

        if ( this._show_LoadingData_Message ) {

            return (
                <div>
                    Loading Data...
                </div>
            )
        }


        return (

            <React.Fragment>
                {/*   Consider using this component when add in other filter components from Peptide page */}
                {/*<ProteinPositionFilter_UserSelections*/ }
                {/*    proteinPositionFilter_UserSelections_Component_Force_ReRender_Object={ undefined }*/ }
                {/*    proteinPositionFilter_UserSelections_StateObject={ this._proteinPositionFilter_UserSelections_StateObject }*/ }
                {/*    proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data={ undefined }*/ }
                {/*    proteinPositionFilter_UserSelections_Component_GetData_Callback={ this._getProteinData_Callback_BindThis }*/ }
                {/*    updateMadeTo_proteinPositionFilter_UserSelections_StateObject_Callback={ this._updateMadeTo_proteinPositionFilter_UserSelections_StateObject_Callback_BindThis }*/ }
                {/*/>*/ }

                <div>
                    <ProteinPositionFilter_UserInput__Component
                        proteinData_InitiallyProvided={ undefined } //  Never set in this component.  Always use the callback
                        get_ProteinData_Root_UserSelectionData_Root_ReturnPromise_CallbackFunction={ this._get_ProteinData_ReturnPromise_CallbackFunction_BindThis }
                        userSelections={ this._proteinPositionFilter_UserInput__Component__Existing_userSelections }
                        callbackOn_Save_Clicked={ this._update_PageState_FromChildComponent_SaveCall_BindThis }
                    />
                </div>

            </React.Fragment>
        )
    }


}


