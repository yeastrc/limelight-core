/**
 * ModView_DataViz_Renderer.ts
 *
 * Render the graphic on the Mod page
 */


import * as d3 from "d3";

import { DataPageStateManager } from "page_js/data_pages/data_pages_common/dataPageStateManager";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import {
    ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS,
    ModView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/ModView_DataViz_Compute_ColorScale_WidthHeight_Etc";
import {
    ModViewPage_DataVizOptions_VizSelections_PageStateManager,
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum,
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__PSM_QUANT_METHOD_Values_Enum,
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewPage_DataVizOptions_VizSelections_PageStateManager";
import {
    limelight__Input_NumberOrString_ReturnNumber
} from "page_js/common_all_pages/limelight__Input_NumberOrString_ReturnNumber";
import {
    modPage_Get_DataTransformationType_DisplayLabel
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page_util_js/modPage_Get_DataTransformationType_DisplayLabel";
import {
    ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable";
import {
    modPage_GetSearchNameForProjectSearchId
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page_util_js/modPage_GetSearchNameForProjectSearchId";
import {
    modPage_GetSearchIdForProjectSearchId
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page_util_js/modPage_GetSearchIdForProjectSearchId";
import {
    modPage_GetSearchNameOnlyForProjectSearchId
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page_util_js/modPage_GetSearchNameOnlyForProjectSearchId";
import {
    modPage_GetSearchShortNameForProjectSearchId
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page_util_js/modPage_GetSearchShortNameForProjectSearchId";


/**
 * Call for each update
 *
 */
export const modView_DataViz_Renderer = function (
    {
        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root,
        projectSearchIds,
        modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result,
        modViewPage_DataVizOptions_VizSelections_PageStateManager,

        dataPageStateManager_DataFrom_Server,

        updated_modViewPage_DataVizOptions_VizSelections_PageStateManager
    } : {
        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
        projectSearchIds: Array<number>
        modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result: ModView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
        modViewPage_DataVizOptions_VizSelections_PageStateManager: ModViewPage_DataVizOptions_VizSelections_PageStateManager

        dataPageStateManager_DataFrom_Server :  DataPageStateManager

        updated_modViewPage_DataVizOptions_VizSelections_PageStateManager: () => void

    }) { try {

    // console.log('called ModView_DataViz_Renderer()');

    {
        const $vizDiv = $("div#data-viz-container");
        if ( $vizDiv.length === 0 ) {
            const msg = "NO DOM element for selector 'div#data-viz-container'"
            console.warn(msg)
            throw Error(msg)
        }
    }

    $('div#data-viz-container').show();

    $('div#data-viz-container').empty();
    $('div#data-viz-container').html('<h2>Loading data, please standby...</h2>');

    $('div#data-viz-container').empty();

    // start drawing the actual viz
    let svg = d3.select("div#data-viz-container").append("svg")
        .attr("width",
            modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.width +
            ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.margin.left +
            ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.margin.right )

        .attr("height",
            modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.height +
            ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.margin.top
            + ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.margin.bottom )

        .append("g")

        .attr("transform", "translate(" + ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.margin.left +
            "," + ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.margin.top + ")");

    // set up div to use for tooltips
    d3.select('#mod-viz-tooltip').remove();
    const tooltip = d3.select("body")
        .append("div")
        .attr("id", "mod-viz-tooltip")
        .style("display", "none")
        .style("width", "auto")
        .style("height", "auto")
        .style("background-color", "white")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("border-style", "solid")
        .style("border-color", "gray")
        .style("border-width", "1px")
        .style("padding", "10px")
        .style("min-width", "450px")   //  set min-width so when display when scrolled to right past what would be right edge of view port when no scroll right.
        .style("max-width", "450px");  //  max-width

    // keep track of what the user has selected to see

    _addColoredRectangles({
        svg,
        sortedModMasses: modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.sortedModMasses,
        modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result, projectSearchIds, tooltip, modViewPage_DataVizOptions_VizSelections_PageStateManager, dataPageStateManager_DataFrom_Server
    });

    _addSeparatorLines({ svg, projectSearchIds, modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result });

    _addSearchLabels({
        svg,
        tooltip,
        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root,
        projectSearchIds,
        modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result,
        modViewPage_DataVizOptions_VizSelections_PageStateManager,
        dataPageStateManager_DataFrom_Server,
        updated_modViewPage_DataVizOptions_VizSelections_PageStateManager
    });

    _addModLabels({ svg, modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result });
    _addModLabelsHeader({ svg, width: modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.width });
    _addColorScaleLegend({
        svg,
        modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result,
        modViewPage_DataVizOptions_VizSelections_PageStateManager
    });

    _addDragHandlerToRects({
        svg,
        projectSearchIds,
        modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result,
        dataPageStateManager_DataFrom_Server,
        modViewPage_DataVizOptions_VizSelections_PageStateManager,

        updated_modViewPage_DataVizOptions_VizSelections_PageStateManager
    });

} catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}



const _addColoredRectangles = function (
    {
        svg, sortedModMasses, modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result, projectSearchIds, tooltip, modViewPage_DataVizOptions_VizSelections_PageStateManager, dataPageStateManager_DataFrom_Server
    } : {
        svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>
        sortedModMasses: ReadonlyArray<number>
        modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result: ModView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
        projectSearchIds : ReadonlyArray<number>,
        tooltip: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>
        modViewPage_DataVizOptions_VizSelections_PageStateManager: ModViewPage_DataVizOptions_VizSelections_PageStateManager

        dataPageStateManager_DataFrom_Server:DataPageStateManager
    }) {

    // add a group to hold the data rects
    const svgRectGroup = svg.append('g')
        .attr('id', 'rect-group');

    // Create a group for each column in the data matrix and translate the group horizontally
    const svgColGroups = svgRectGroup.selectAll('.search-col-group')
        .data(modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.modMatrix)
        .enter()
        .append('g')
        .attr('class', 'search-col-group')
        .attr('transform', (d, i) => ( 'translate(' + modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.xScale(sortedModMasses[i]) + ',0)' )
        );

    svgColGroups.selectAll('rect')
        .data(function(d) { return d; })
        .enter()
        .append('rect')
        .attr('y', (d, i) => (modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.yScale(projectSearchIds[i])))
        .attr('class', (d, i) => ('project-search-id-' + d.projectSearchId_OR_SubSearchId + ' mod-mass-' + d.modMass))
        .attr('width', modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.xScale.bandwidth())
        .attr('height', modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.yScale.bandwidth())
        .attr('stroke', 'none')
        .attr('fill', (d) => {

            const color = modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.colorScale( d.topLevelTable_DisplayValue__ClampedTo_MinMax_For_ColorScale )

            return color
        })
        .on("mousemove", function ( event_Param, dataElement_Param ) {

            const projectSearchId = limelight__Input_NumberOrString_ReturnNumber( dataElement_Param.projectSearchId_OR_SubSearchId );

            _showToolTip({
                onSearchLabel_OnLeft: false,
                projectSearchId,
                modMass: dataElement_Param.modMass,
                topLevelTable_DisplayValue: dataElement_Param.topLevelTable_DisplayValue,
                tooltip,
                modViewPage_DataVizOptions_VizSelections_PageStateManager,
                dataPageStateManager_DataFrom_Server
            })
        })
        .on("mouseleave", function ( event_Param, dataElement_Param ) {
            //d3.select(this).attr('fill', (d) => (colorScale(d.psmCount)))
            _hideToolTip({tooltip});
        });

    // update opacity as necessary
    // if no selections are defined, everything is selected
    {
        if ( modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMasses_ProjectSearchIds_Visualization_Selections_Root().is_AnySelections() ) {
            _updateShownRectOpacities({
                svg,
                modViewPage_DataVizOptions_VizSelections_PageStateManager
            })
        }
    }
}


const _addSeparatorLines = function (
    {
        svg, projectSearchIds, modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
    }: {
        svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>
        projectSearchIds: Array<number>
        modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result: ModView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
    }) {

    svg.select('#rect-group').selectAll('.separator-line')
        .data(projectSearchIds)
        .enter()
        .append('line')
        .attr('class', 'separator-line')
        .attr('x1', '0')
        .attr('y1', (d, i) => (modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.yScale(projectSearchIds[i])))
        .attr('x2', modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.width)
        .attr('y2', (d, i) => (modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.yScale(projectSearchIds[i])))
        .attr('stroke', 'gray')
        .attr('stroke-width', '1')
        .attr('opacity','0.75');

    svg.append('line')
        .attr('class', 'separator-line')
        .attr('x1', '0')
        .attr('y1', modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.height)
        .attr('x2', modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.width)
        .attr('y2', modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.height)
        .attr('stroke', 'gray')
        .attr('stroke-width', '1')
        .attr('opacity','0.75');

}



const _addSearchLabels = function (
    {
        svg,
        tooltip,
        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root,
        projectSearchIds,
        modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result,
        modViewPage_DataVizOptions_VizSelections_PageStateManager,
        dataPageStateManager_DataFrom_Server,

        updated_modViewPage_DataVizOptions_VizSelections_PageStateManager
    } : {
        svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>
        tooltip: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>

        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
        projectSearchIds: Array<number>

        modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result: ModView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
        modViewPage_DataVizOptions_VizSelections_PageStateManager: ModViewPage_DataVizOptions_VizSelections_PageStateManager
        dataPageStateManager_DataFrom_Server : DataPageStateManager

        updated_modViewPage_DataVizOptions_VizSelections_PageStateManager: () => void
    }) {

    for ( let i = 0; i < projectSearchIds.length; i++ ) {
        var z = ( modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.yScale(projectSearchIds[i]) )
        var y = ( modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.yScale(projectSearchIds[i]) +
            (modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.yScale.bandwidth() / 2) + (ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.labelFontSize / 2))
        var zzzz = 0
    }

    svg.selectAll('.project-label')
        .data(projectSearchIds)
        .enter()
        .append('text')
        .attr('class', 'search-label')
        .attr('x', -10)
        .attr('y',
            (d, i) =>
                ( modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.yScale(projectSearchIds[i]) +
                    (modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.yScale.bandwidth() / 2) + (ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.labelFontSize / 2)))
        .attr("text-anchor", "end")
        .attr('font-size', ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.labelFontSize + 'px')
        .attr('font-family', 'sans-serif')
        .text((d,i) => ( _getTruncatedSearchNameForProjectSearchId({ projectSearchId:projectSearchIds[i], dataPageStateManager_DataFrom_Server }) ) )
        .on("mousemove", function ( event_Param, dataElement_Param ) {
            const projectSearchId = limelight__Input_NumberOrString_ReturnNumber( dataElement_Param );
            _showToolTip({
                onSearchLabel_OnLeft: true, projectSearchId, tooltip, modViewPage_DataVizOptions_VizSelections_PageStateManager, modMass : undefined, topLevelTable_DisplayValue : undefined, dataPageStateManager_DataFrom_Server
            })
        })
        .on("mouseout", function ( event_Param, dataElement_Param ) {
            //d3.select(this).attr('fill', (d) => (colorScale(d.psmCount)))
            _hideToolTip({tooltip});
        })
        .on("click", function( event_Param, dataElement_Param ) {

            // @ts-ignore  -- Make absolutely sure dataElement_Param is a number
            const projectSearchId = Number.parseInt( dataElement_Param )

            //  Reset reset selected state object and then select
            svg.select('#rect-group').selectAll('rect').style('opacity', '1.0');



            modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMasses_ProjectSearchIds_Visualization_Selections_Root().clear_All()

            const selectedModMasses_Set: Set<number> = new Set( modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.sortedModMasses )

            modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMasses_ProjectSearchIds_Visualization_Selections_Root().set_SelectedModMasses_Set_For_ProjectSearchId({ projectSearchId, selectedModMasses_Set })

            // update final opacity for viz
            _updateShownRectOpacities({ svg, modViewPage_DataVizOptions_VizSelections_PageStateManager })

            updated_modViewPage_DataVizOptions_VizSelections_PageStateManager()
        })
}


const _addDragHandlerToRects = function (
    {
        svg,
        projectSearchIds,
        modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result,
        dataPageStateManager_DataFrom_Server,
        modViewPage_DataVizOptions_VizSelections_PageStateManager,

        updated_modViewPage_DataVizOptions_VizSelections_PageStateManager
    } : {
        svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>
        projectSearchIds : Array<number>
        modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result: ModView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
        dataPageStateManager_DataFrom_Server : DataPageStateManager
        modViewPage_DataVizOptions_VizSelections_PageStateManager: ModViewPage_DataVizOptions_VizSelections_PageStateManager

        updated_modViewPage_DataVizOptions_VizSelections_PageStateManager: () => void

    }) {

    svg.select('#rect-group')
        .on( "mousedown", function( event_Param ) {

            // reset selected state object
            svg.select('#rect-group').selectAll('rect').style('opacity', '1.0');

            modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMasses_ProjectSearchIds_Visualization_Selections_Root().clear_All()

            const p = d3.pointer( event_Param );

            svg.select('#rect-group')
                .append( "rect")
                .attr('class', 'selection')
                .attr("x", p[0])
                .attr('y', p[1])
                .attr('width', '0')
                .attr('height', '0')
        })
        .on( "mousemove", function( event_Param ) {

            let s = svg.select('#rect-group').select( "rect.selection");

            if( !s.empty()) {

                const p = d3.pointer( event_Param );

                let rectParams: INTERNAL__RrectParams_Class = {
                    x       : s.attr( "x"),
                    y       : s.attr( "y"),
                    width   : s.attr( "width"),
                    height  : s.attr( "height")
                };
                const move = {
                    x : p[0] - rectParams.x,
                    y : p[1] - rectParams.y
                };

                if( move.x < 1 || (move.x*2<rectParams.width)) {
                    rectParams.x = p[0];
                    rectParams.width -= move.x;
                } else {
                    rectParams.width = move.x;
                }

                if( move.y < 1 || (move.y*2<rectParams.height)) {
                    rectParams.y = p[1];
                    rectParams.height -= move.y;
                } else {
                    rectParams.height = move.y;
                }

                s.attr("x", rectParams.x)
                    .attr("y", rectParams.y)
                    .attr("width", rectParams.width)
                    .attr("height", rectParams.height);

            }
        })
        .on( "mouseup", function( event_Param ) {

            let s = svg.select('#rect-group').select( "rect.selection");

            if ( !s.empty() ) {

                let rectParams: INTERNAL__RrectParams_Class = {
                    x       : s.attr( "x"),
                    y       : s.attr( "y"),
                    width   : s.attr( "width"),
                    height  : s.attr( "height")
                };

                // const event_Param__CtrlKey = event_Param.ctrlKey
                // const event_Param__MetaKey = event_Param.metaKey

                // update final opacity for viz
                _updateSelectedRectIndicators({
                    // event_Param__CtrlKey,
                    // event_Param__MetaKey,
                    svg, projectSearchIds, modViewPage_DataVizOptions_VizSelections_PageStateManager, rectParams, modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
                });

                // remove selection frame
                s.remove();

                updated_modViewPage_DataVizOptions_VizSelections_PageStateManager()
            }

        });

    d3.select("body")
        .on("keydown", function( event_Param ) {

            // capture escape key press, reset viz
            if( event_Param.keyCode === 27 ) {

                modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMasses_ProjectSearchIds_Visualization_Selections_Root().clear_All()

                updated_modViewPage_DataVizOptions_VizSelections_PageStateManager()
            }
        });
}


const _updateSelectedRectIndicators = function (
    {
        svg, projectSearchIds, modViewPage_DataVizOptions_VizSelections_PageStateManager, rectParams, modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
    } : {
        svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>
        modViewPage_DataVizOptions_VizSelections_PageStateManager: ModViewPage_DataVizOptions_VizSelections_PageStateManager
        projectSearchIds : Array<number>
        rectParams: INTERNAL__RrectParams_Class
        modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result: ModView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
    }) {

    // reset selected state object
    svg.select('#rect-group').selectAll('rect').style('opacity', '0.35');

    const selectedModMasses_Set__Map_Key_ProjectSearchId: Map<number, Set<number>> = new Map()

    // add opacity adjustment for selected items
    for ( const modMass of modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.sortedModMasses ) {

        if ( _rectangleContainsModMass({ modMass, rectParams, modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result })) {

            for (const projectSearchId of projectSearchIds) {

                if ( _rectangleContainsProjectSearchId({ projectSearchId, rectParams, modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result }) ) {

                    const selector = 'rect.mod-mass-' + modMass + '.project-search-id-' + projectSearchId;
                    svg.select('#rect-group').select(selector).style('opacity', '1.0');

                    let selectedModMasses_Set = selectedModMasses_Set__Map_Key_ProjectSearchId.get( projectSearchId )
                    if ( ! selectedModMasses_Set ) {
                        selectedModMasses_Set = new Set()
                        selectedModMasses_Set__Map_Key_ProjectSearchId.set( projectSearchId, selectedModMasses_Set )
                    }
                    selectedModMasses_Set.add( modMass )
                }
            }
        }
    }

    const modMasses_ProjectSearchIds_Visualization_Selections_Root = modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMasses_ProjectSearchIds_Visualization_Selections_Root()

    for ( const mapEntry of selectedModMasses_Set__Map_Key_ProjectSearchId.entries() ) {

        const projectSearchId = mapEntry[0]
        const selectedModMasses_Set = mapEntry[1]
        modMasses_ProjectSearchIds_Visualization_Selections_Root.set_SelectedModMasses_Set_For_ProjectSearchId({ projectSearchId, selectedModMasses_Set })
    }
}

const _rectangleContainsModMass = function (
    {
        modMass, rectParams, modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
    }: {
        modMass: number
        rectParams: INTERNAL__RrectParams_Class
        modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result: ModView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
    }) {

    const modMassMinPosition = modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.xScale(modMass);
    const modMassMaxPosition = modMassMinPosition + modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.xScale.bandwidth();

    const rectLeft = parseInt(rectParams.x);
    const rectRight = rectLeft + parseInt(rectParams.width);

    if ( modMassMinPosition <= rectRight && rectLeft <= modMassMaxPosition ) {
        return true;
    }

    return false;
}

const _rectangleContainsProjectSearchId = function (
    {
        projectSearchId, rectParams, modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
    }: {
        projectSearchId: number
        rectParams: INTERNAL__RrectParams_Class
        modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result: ModView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
    }) {

    const psidMinPosition = modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.yScale(projectSearchId);
    const psidMaxPosition = psidMinPosition + modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.yScale.bandwidth();

    const rectTop = parseInt(rectParams.y);
    const rectBottom = rectTop + parseInt(rectParams.height);

    if( psidMinPosition <= rectBottom && rectTop <= psidMaxPosition ) {
        return true;
    }

    return false;
}



const _showToolTip = function (
    {
        onSearchLabel_OnLeft, projectSearchId, modMass, topLevelTable_DisplayValue, tooltip, modViewPage_DataVizOptions_VizSelections_PageStateManager, dataPageStateManager_DataFrom_Server
    } : {
        onSearchLabel_OnLeft: boolean
        projectSearchId : number,
        modMass: number
        topLevelTable_DisplayValue: number
        tooltip: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>
        modViewPage_DataVizOptions_VizSelections_PageStateManager: ModViewPage_DataVizOptions_VizSelections_PageStateManager
        dataPageStateManager_DataFrom_Server:DataPageStateManager
    }) {

    const psmQuantType =
        modViewPage_DataVizOptions_VizSelections_PageStateManager.get_quantType() === undefined
        || modViewPage_DataVizOptions_VizSelections_PageStateManager.get_quantType() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum.psms

    const quantTypeString = psmQuantType ? 'PSM' : 'Scan';

    const showRatiosBoolean = modViewPage_DataVizOptions_VizSelections_PageStateManager.get_psmQuant() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__PSM_QUANT_METHOD_Values_Enum.ratios

    let labelText: string

    if ( modViewPage_DataVizOptions_VizSelections_PageStateManager.get_dataTransformation() === undefined
        || modViewPage_DataVizOptions_VizSelections_PageStateManager.get_dataTransformation() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.none ) {
        labelText = showRatiosBoolean ? "<p>" + quantTypeString + " Ratio:" : "<p>" + quantTypeString + " Count:";
    } else {
        switch( modViewPage_DataVizOptions_VizSelections_PageStateManager.get_dataTransformation() ) {
            case ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.per_mod_zscore:
            case ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.global_zscore:
                labelText = "Z-Score:";
                break;
            case ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.global_pvalue_bonf:
                labelText = "P-Value:";
                break;
            case ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.global_qvalue_bh:
                labelText = "Q-Value:";
                break;
            case ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.scaled_mean_diff:
                labelText = "Scaled mean diff.:";
                break;
        }
    }

    // @ts-ignore
    const mousePointer_pageY = window.event.pageY
    // @ts-ignore
    const mousePointer_pageX = window.event.pageX

    const tooltip_horizontal_Offset = 20;

    const tooltip_Left = mousePointer_pageX + tooltip_horizontal_Offset;
    const tooltip_Top = mousePointer_pageY + 20;

    const searchDisplayString_NOT_SET: string = undefined

    let searchDisplayString = searchDisplayString_NOT_SET

    tooltip
        .style("left", tooltip_Left + "px")
        .style("top", tooltip_Top + "px")
        .style("display", "block")
        .style("word-break", "break-word")
        .html( function() {

            let txt = "";

            if(modMass !== undefined && modMass !== null) {
                txt += "<p>Mod mass: " + modMass + "</p>";
            }

            if ( projectSearchId ) {


                const searchId = modPage_GetSearchIdForProjectSearchId({
                    projectSearchId:projectSearchId,
                    dataPageStateManager_DataFrom_Server
                });

                const searchName = modPage_GetSearchNameOnlyForProjectSearchId({
                    projectSearchId:projectSearchId,
                    dataPageStateManager_DataFrom_Server
                });

                const searchShortName = modPage_GetSearchShortNameForProjectSearchId({
                    projectSearchId:projectSearchId,
                    dataPageStateManager_DataFrom_Server
                });

                let displayString = searchName;
                if(searchShortName && searchShortName.length > 0) {
                    displayString += " (" + searchShortName + ")";
                }
                displayString += " (" + searchId + ")";

                searchDisplayString = displayString

                txt += "<p>Search: <span id='mod_viz_tooltip__search_display_string'></span></p>";
            }

            if ( topLevelTable_DisplayValue !== undefined ) {

                if (
                    ( modViewPage_DataVizOptions_VizSelections_PageStateManager.get_dataTransformation() === undefined
                        || modViewPage_DataVizOptions_VizSelections_PageStateManager.get_dataTransformation() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.none )
                    && ! showRatiosBoolean ) {

                    txt += labelText + " " + _numberWithCommas(topLevelTable_DisplayValue) + "</p>";
                } else {
                    txt += labelText + " " + topLevelTable_DisplayValue.toExponential(2) + "</p>";
                }
            }

            return txt;
        });

    if ( searchDisplayString !== searchDisplayString_NOT_SET ) {

        const mod_viz_tooltip__search_display_string_DOM = document.getElementById( "mod_viz_tooltip__search_display_string" )
        if ( ! mod_viz_tooltip__search_display_string_DOM ) {
            const msg = "NO DOM element with id 'mod_viz_tooltip__search_display_string'"
            console.warn(msg)
            throw Error(msg)
        }

        mod_viz_tooltip__search_display_string_DOM.textContent = searchDisplayString  //  Assign this way so not interpret HTML tags in the search name
    }

    //  If tooltip extends past right edge of viewport, position to left of mouse position

    const widthAllowance_For_VerticalScrollbar = 10;
    const widthAllowance_For_PaddingFrom_VerticalScrollbar = 10;
    const widthAllowance_For_PaddingFrom_LeftViewportEdge = 10;

    const window_innerWidth = window.innerWidth
    const window_scrollX = window.scrollX

    const mod_viz_tooltip_DOM = document.getElementById("mod-viz-tooltip");
    const mod_viz_tooltip_BoundingRect = mod_viz_tooltip_DOM.getBoundingClientRect();

    const tooltipWidth = mod_viz_tooltip_BoundingRect.width;

    if ( ( ( tooltip_Left - window_scrollX ) + tooltipWidth + widthAllowance_For_VerticalScrollbar + widthAllowance_For_PaddingFrom_VerticalScrollbar ) > window_innerWidth ) {

        let tooltip_Left_WithinViewport_PositionToLeft = mousePointer_pageX - tooltip_horizontal_Offset - tooltipWidth

        // console.warn(
        //     "mousePointer_pageX: " + mousePointer_pageX
        //     + "tooltip_horizontal_Offset: " + tooltip_horizontal_Offset
        //     + "tooltipWidth: " + tooltipWidth
        // )

        if ( tooltip_Left_WithinViewport_PositionToLeft < ( window_scrollX + widthAllowance_For_PaddingFrom_LeftViewportEdge ) ) {
            tooltip_Left_WithinViewport_PositionToLeft = ( window_scrollX + widthAllowance_For_PaddingFrom_LeftViewportEdge );
        }

        const tooltip_Left_PositionToLeft = tooltip_Left_WithinViewport_PositionToLeft; // + window_scrollX;

        tooltip
            .style("left", tooltip_Left_PositionToLeft + "px")
    }
}

const _hideToolTip = function ({ tooltip } : { tooltip: d3.Selection<HTMLDivElement, unknown, HTMLElement, any> }) {
    tooltip
        .style("display", "none")
}


const _getTruncatedSearchNameForProjectSearchId = function (
    {
        projectSearchId,
        dataPageStateManager_DataFrom_Server
    } : {
        projectSearchId : number
        dataPageStateManager_DataFrom_Server:DataPageStateManager
    }) {

    let searchName: string
    const searchShortName = modPage_GetSearchShortNameForProjectSearchId({
        projectSearchId:projectSearchId,
        dataPageStateManager_DataFrom_Server
    });

    if(searchShortName && searchShortName.length > 1) {
        searchName = searchShortName;
    } else {
        searchName = modPage_GetSearchNameForProjectSearchId({ projectSearchId, dataPageStateManager_DataFrom_Server });
    }

    if(searchName.length > ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.maxSearchLabelLength) {
        searchName = searchName.substring(0, ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.maxSearchLabelLength - 4) + '...';
    }

    return searchName;

}

const _addColorScaleLegend = function (
    {
        svg, modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result, modViewPage_DataVizOptions_VizSelections_PageStateManager
    } : {
        svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>
        modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result: ModView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
        modViewPage_DataVizOptions_VizSelections_PageStateManager: ModViewPage_DataVizOptions_VizSelections_PageStateManager

    }) {

    const yScale = modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.yScale
    const rectAreaHeight = modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.height
    const minPsmCount = modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.minValue_ForViz
    const maxPsmCount = modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.maxValue_ForViz


    const psmQuantType =
        modViewPage_DataVizOptions_VizSelections_PageStateManager.get_quantType() === undefined ||
        modViewPage_DataVizOptions_VizSelections_PageStateManager.get_quantType() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum.psms

    const quantType = psmQuantType ? 'PSM' : 'Scan';

    let showInts = false

    if (
        ( modViewPage_DataVizOptions_VizSelections_PageStateManager.get_dataTransformation() === undefined
            || modViewPage_DataVizOptions_VizSelections_PageStateManager.get_dataTransformation() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.none )
        && modViewPage_DataVizOptions_VizSelections_PageStateManager.get_psmQuant() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__PSM_QUANT_METHOD_Values_Enum.counts ) {

        showInts = true;
    } else {
        showInts = false;
    }

    let labelText = quantType;
    labelText += (
        modViewPage_DataVizOptions_VizSelections_PageStateManager.get_psmQuant() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__PSM_QUANT_METHOD_Values_Enum.counts
            ? ' Count' : ' Ratio'
    )

    if ( modViewPage_DataVizOptions_VizSelections_PageStateManager.get_dataTransformation() !== undefined
        && modViewPage_DataVizOptions_VizSelections_PageStateManager.get_dataTransformation() !== ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.none ) {
        labelText += " (" + modPage_Get_DataTransformationType_DisplayLabel({ modViewPage_DataVizOptions_VizSelections_PageStateManager }) + ")";
    }
    labelText += ' Color:';

    // create group element to hold legend
    let legendGroup = svg.append('g')
        .attr("transform", () => 'translate(0, ' + (rectAreaHeight + 10) + ')');

    // add legend text label
    legendGroup.append('text')
        .attr('class', 'project-label')
        .attr('x', -10)
        .attr('y', () => ( (yScale.bandwidth() / 2) + (ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.labelFontSize / 2) ))
        .attr("text-anchor", "end")
        .attr('font-size', ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.labelFontSize + 'px')
        .attr('font-family', 'sans-serif')
        .text(() => (labelText));

    // width of color scale bar
    const width = ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.minLegendWidth;

    // add color scale group
    let colorScaleGroup = legendGroup.append('g');

    // add colored rects for scale bar
    for( let i = 0; i <= width; i++ ) {

        let psmCountForI = minPsmCount + ( i / width ) * ( maxPsmCount - minPsmCount );

        if(showInts) {
            psmCountForI = Math.floor(psmCountForI);
        }
        colorScaleGroup.append('rect')
            .attr('y', () => (0))
            .attr('x', () => (i))
            .attr('width', 1)
            .attr('height', ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.legendHeight)
            .attr('stroke', 'none')
            .attr('fill', () => ( modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.colorScale(psmCountForI) ) );
    }

    // add labels to scale bar
    let scaleBarLegendGroup = legendGroup.append('g')
        .attr("transform", () => 'translate(0, ' + ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.legendHeight + ')');


    const numTicks = 5;
    for( let i = 0; i < numTicks; i++ ) {

        const dx = Math.floor( (i / (numTicks - 1)) * width );

        let psmCountForX = minPsmCount + ( dx / width ) * ( maxPsmCount - minPsmCount );

        if(showInts) {
            psmCountForX = Math.ceil(psmCountForX);
        }

        let tickGroup = scaleBarLegendGroup.append('g')
            .attr("transform", () => 'translate(' + dx + ',0)');

        tickGroup.append('line')
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', 0)
            .attr('y2', 5)
            .attr('stroke', 'gray')
            .attr('stroke-width', '1')
            .attr('opacity','0.95');

        tickGroup.append('text')
            .attr('x', 0)
            .attr('y', () => (7 + ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.labelFontSize))
            .attr("text-anchor", "middle")
            .attr('font-size', ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.labelFontSize + 'px')
            .attr('font-family', 'sans-serif')
            .text((d,i) => (
                showInts ? psmCountForX : psmCountForX.toExponential(2)
            ));
    }
}


const _updateShownRectOpacities = function ({ svg, modViewPage_DataVizOptions_VizSelections_PageStateManager } : {

    svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>
    modViewPage_DataVizOptions_VizSelections_PageStateManager: ModViewPage_DataVizOptions_VizSelections_PageStateManager
}) {

    const modMasses_ProjectSearchIds_Visualization_Selections_Root = modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMasses_ProjectSearchIds_Visualization_Selections_Root()

    if ( ! modMasses_ProjectSearchIds_Visualization_Selections_Root.is_AnySelections() ) {
        svg.select('#rect-group').selectAll('rect').style('opacity', '1.0');
    } else {

        svg.select('#rect-group').selectAll('rect').style('opacity', '0.35');

        for (const projectSearchId of modMasses_ProjectSearchIds_Visualization_Selections_Root.get_Selection_ProjectSearchIds() ) {
            for (const modMass of modMasses_ProjectSearchIds_Visualization_Selections_Root.get_SelectedModMasses_Set_For_ProjectSearchId(projectSearchId)) {
                const selector = 'rect.mod-mass-' + modMass + '.project-search-id-' + projectSearchId;
                svg.select('#rect-group').select(selector).style('opacity', '1.0');
            }
        }
    }
}


const _addModLabelsHeader = function (
    {
        svg, width
    }: {
        svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>
        width: number
    }) {

    const dx = Math.round( width / 2 );
    const dy = -1 * ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.labelFontSize - 30;

    svg.append('text')
        .attr("text-anchor", "middle")
        .attr('font-size', ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.labelFontSize + 'px')
        .attr('font-family', 'sans-serif')
        .attr("transform", (d,i) => 'translate(' + dx + ', ' + dy + ')')
        .text('Modification Mass');
}

const _addModLabels = function (
    {
        svg, modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
    }: {
        svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>
        modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result: ModView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
    }) {

    const xScale = modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.xScale
    const sortedModMasses = modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.sortedModMasses

    const interval = _getInterval({ modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result });

    svg.selectAll('.mod-label')
        .data( sortedModMasses)
        .enter()
        .append('text')
        .attr('class', 'mod-label')
        .attr("text-anchor", "start")
        .attr('font-size', ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.labelFontSize + 'px')
        .attr('font-family', 'sans-serif')
        .attr("transform", (d,i) => 'translate(' + (xScale(sortedModMasses[i]) + (xScale.bandwidth() / 2) + (ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.labelFontSize / 2)) + ', -10) rotate(-90)')
        .text((d,i) => ( i % interval == 0 ? sortedModMasses[i] : '' ));
}

const _getInterval = function (
    {
        modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
    } : {
        modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result: ModView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
    }) {
    const xScale = modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.xScale

    const spaceNeeded = ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.labelFontSize + 6;      // 6 assumes a margin of 3 px on either side of the label (move this to viz defs?)
    const bandwidth = xScale.bandwidth();

    return Math.ceil( spaceNeeded / bandwidth );
}


const _numberWithCommas = function (x: number) { return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); }




class INTERNAL__RrectParams_Class {
    x : any // number | string
    y : any // number | string
    width : any // number | string
    height : any // number | string
};
