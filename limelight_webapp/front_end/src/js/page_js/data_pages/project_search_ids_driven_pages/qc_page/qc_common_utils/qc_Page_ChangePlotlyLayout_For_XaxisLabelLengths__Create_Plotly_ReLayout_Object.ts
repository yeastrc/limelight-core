/**
 * qc_Page_ChangePlotlyLayout_For_XaxisLabelLengths__Create_Plotly_ReLayout_Object.ts
 *
 */


import {
    qcPage_StandardChartLayout_Standard_Plot_Margin_Bottom,
    qcPage_StandardChartLayout_StandardHeight
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartLayout";
import {limelight__IsVariableAString} from "page_js/common_all_pages/limelight__IsVariableAString";

/**
 * When X Axis labels overlap X Axis Title, create a Plotly.Relayout(...) object to shift the X Axis Title down
 *
 * @param plotRoot_DOM_Element
 * @param xAxisLabels - labels for each entry on X axis
 * @param xAxisTitle -  title of X axis
 * @param adjustPlotHeight - true if on main page and can make plot taller to accommodate a larger bottom margin.  False if in an overlay.
 */
export const qc_Page_ChangePlotlyLayout_For_XaxisLabelLengths__Create_Plotly_ReLayout_Object = function (
    {
        plotRoot_DOM_Element,
        xAxisLabels,
        xAxisTitle,
        adjustPlotHeight
    } : {
        plotRoot_DOM_Element: HTMLDivElement
        xAxisLabels: Set<string>
        xAxisTitle: string
        adjustPlotHeight: boolean
    }
) : {
    updateLayoutNeeded: boolean
    updateLayout: object
} {

    if ( ! plotRoot_DOM_Element ) {

        //  NO DOM Element

        //  EARLY RETURN

        return {
            updateLayoutNeeded: false,
            updateLayout: undefined
        }
    }

    for ( const xAxisLabel of xAxisLabels ) {
        if ( ! limelight__IsVariableAString(xAxisLabel) ) {
            const msg = "qc_Page_ChangePlotlyLayout_For_XaxisLabelLengths__Create_Plotly_ReLayout_Object: entry in xAxisLabels is not a string. xAxisLabel: " + xAxisLabel;
            console.warn(msg);
            throw Error(msg);
        }
    }
    if ( ! limelight__IsVariableAString(xAxisTitle) ) {
        const msg = "qc_Page_ChangePlotlyLayout_For_XaxisLabelLengths__Create_Plotly_ReLayout_Object: xAxisTitle is not a string. xAxisTitle: " + xAxisTitle;
        console.warn(msg);
        throw Error(msg);
    }

    const xAxisLabels_Local = new Set( xAxisLabels );

    xAxisLabels_Local.delete( xAxisTitle );  // Ensure xAxisLabels_Local does NOT contain xAxisTitle

    let labels_LargestBottom = undefined;
    let title_Top = undefined;

    const textElements_All = plotRoot_DOM_Element.querySelectorAll("text");

    for ( const textElement of textElements_All.values() ) {

        const textContent = textElement.textContent;

        if ( xAxisTitle === textContent || xAxisLabels_Local.has( textContent ) ) {

            const boundingRect = textElement.getBoundingClientRect();
            const top = boundingRect.top;
            const bottom = boundingRect.bottom;

            if ( xAxisTitle === textContent ) {
                if ( title_Top === undefined ) {
                    title_Top = top;
                } else {
                    if ( title_Top < top ) {
                        title_Top = top;  // Just in case > 1 <text> with same text, use largest value
                    }
                }
            } else {
                //  xAxisLabels_Local.has( textContent )

                if ( labels_LargestBottom === undefined ) {
                    labels_LargestBottom = bottom;
                } else {
                    if ( labels_LargestBottom < bottom ) {
                        labels_LargestBottom = bottom;
                    }
                }
            }
        }
    }

    if ( labels_LargestBottom === undefined || title_Top === undefined ) {

        //  No <text> elements found

        //  EARLY RETURN
        return {
            updateLayoutNeeded: false,
            updateLayout: undefined
        }
    }

    labels_LargestBottom = Math.ceil( labels_LargestBottom );  // Make next larger Integer

    title_Top = Math.floor( title_Top );  // Make next smaller Integer

    const required_offset = 2;  // Min 2 PX from labels to title

    if ( labels_LargestBottom + required_offset <= title_Top ) {

        //  NO Update Needed

        //  EARLY RETURN
        return {
            updateLayoutNeeded: false,
            updateLayout: undefined
        }
    }

    const adjustmentNeeded = ( labels_LargestBottom + required_offset ) - title_Top; // + 100; //  FAKE add 100

    const updateLayout : any = {

        'margin.b': qcPage_StandardChartLayout_Standard_Plot_Margin_Bottom() + adjustmentNeeded
    };

    if ( adjustPlotHeight ) {
        updateLayout.height = qcPage_StandardChartLayout_StandardHeight() + adjustmentNeeded
    }

    return {
        updateLayoutNeeded: true,
        updateLayout
    }
}
