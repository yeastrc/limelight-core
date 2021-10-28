/**
 * qcViewPage_MultipleSearches__AddRemove_ClickListener_OnFirstSVG_InPlotlyInsertedDOM.ts
 *
 * QC Page Multiple Searches : Find the first <svg> in the DOM contents inserted by Plotly for the chart and add or remove the click event
 *
 */

export type qcViewPage_MultipleSearches__Add_ClickListener_OnFirstSVG_InPlotlyInsertedDOM_CallbackFcn = ( event: MouseEvent ) => void;

/**
 *
 * @param plotContaining_DOM_Element
 * @param callbackFcn_WhenClicked
 */
export const qcViewPage_MultipleSearches__Add_ClickListener_OnFirstSVG_InPlotlyInsertedDOM = function(
    {
        plotContaining_DOM_Element, callbackFcn_WhenClicked
    } : {
        plotContaining_DOM_Element:  HTMLElement
        callbackFcn_WhenClicked: qcViewPage_MultipleSearches__Add_ClickListener_OnFirstSVG_InPlotlyInsertedDOM_CallbackFcn
    }
) : void {

    if ( ! plotContaining_DOM_Element ) {
        return null;
    }

    const svgElement_First = plotContaining_DOM_Element.querySelector("svg")


    svgElement_First.addEventListener( "click", callbackFcn_WhenClicked );
}


/**
 *
 * @param plotContaining_DOM_Element
 * @param callbackFcn_WhenClicked
 */
export const qcViewPage_MultipleSearches__Remove_ClickListener_OnFirstSVG_InPlotlyInsertedDOM = function(
    {
        plotContaining_DOM_Element, callbackFcn_WhenClicked
    } : {
        plotContaining_DOM_Element:  HTMLElement
        callbackFcn_WhenClicked: qcViewPage_MultipleSearches__Add_ClickListener_OnFirstSVG_InPlotlyInsertedDOM_CallbackFcn
    }
) : void {

    if ( ! plotContaining_DOM_Element ) {
        return null;
    }

    const svgElement_First = plotContaining_DOM_Element.querySelector("svg")

    svgElement_First.removeEventListener("click", callbackFcn_WhenClicked);
}
