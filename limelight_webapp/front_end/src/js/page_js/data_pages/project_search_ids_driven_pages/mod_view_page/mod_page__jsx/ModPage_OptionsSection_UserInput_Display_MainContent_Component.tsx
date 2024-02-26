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
 * DO NOT call jQuery.empty() on any DOM element EXCEPT for <div id="current-protein-position-filters" which is a leaf DOM element.
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

/**
 *
 */
export class ModPage_OptionsSection_UserInput_Display_MainContent_Component_Props_Prop {

    placeHolder_UNUSED?: unknown  // Added so objects created cannot allow any other properties
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

    component_SubTree_Has_Error? : boolean
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

        //  Empty <div id="add-protein-filter-form-container"

        const $div = $("#add-protein-filter-form-container")

        $div.empty()
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
        // DO NOT call jQuery.empty() on any DOM element EXCEPT for <div id="current-protein-position-filters" which is a leaf DOM element.


        return (
            <div className="data-viz-options-container">
                <div className="data-viz-title" style={ { marginBottom: 0 } }>Data Visualization Options:</div>
                <div style={ { marginTop: 0, fontSize: "10pt" } }>Mouse over items for help.
                </div>
                <div id="data-viz-form" className="data-viz-form">

                    <div style={ { whiteSpace: "nowrap" } }>

                        <div className="viz-form-section" style={ { whiteSpace: "nowrap" } }>

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
                                    <input type="radio" name="psm-quant" id="psm-quant-option-ratios" value="ratios" defaultChecked={ false }/>
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
                                    <input type="radio" name="quant-type" id="quant-type-option-psms" value="psms"
                                           defaultChecked={ true }/>
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
                                    <input type="button" id="update-viz-button"
                                           className="button selector_tool_tip_attached" value="Update Visualization"
                                    />
                                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                            </div>
                        </div>

                        <div className="viz-form-section" style={ { whiteSpace: "nowrap" } }>
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
                                    <td><input type="text" id="color-cutoff-ratio" name="color-cutoff-ratio" size={ 4 }/>
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
                                    <td><input type="text" id="color-cutoff-count" name="color-cutoff-count" size={ 4 }/>
                                    </td>
                                </tr>
                            </table>
                        </div>

                        <div className="viz-form-section" style={ { whiteSpace: "nowrap" } }>
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
                                    <td><input type="text" id="modmass-cutoff-min" name="modmass-cutoff-min" size={ 4 }/>
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
                                    <td><input type="text" id="modmass-cutoff-max" name="modmass-cutoff-max" size={ 4 } />
                                    </td>
                                </tr>
                            </table>
                        </div>

                        <div className="viz-form-section" style={ { whiteSpace: "nowrap" } }>
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
                                <div id="current-protein-position-filters" style={ { marginBottom: 5 } } >
                                    Showing all proteins and positions.
                                </div>
                                <div id="add-protein-filter-button-container"><input type="button"
                                                                                     value="Add Protein Position Filter"
                                                                                     id="add-protein-filter-button"/>
                                </div>
                                <div id="add-protein-filter-form-container" style={ { display: "none" } }></div>
                            </div>
                        </div>

                    </div>
                    {/* <!-- end form sections --> */}

                </div>

            </div>
        );
    }

}

