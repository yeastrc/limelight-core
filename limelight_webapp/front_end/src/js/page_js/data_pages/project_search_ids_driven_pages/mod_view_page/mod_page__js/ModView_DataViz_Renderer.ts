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
    ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result___ProjectSearchId_Or_SubSearchId_Enum,
    ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable";
import {
    modPage_GetSearchIdForProjectSearchId
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page_util_js/modPage_GetSearchIdForProjectSearchId";
import {
    modPage_GetSearchNameOnlyForProjectSearchId
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page_util_js/modPage_GetSearchNameOnlyForProjectSearchId";
import {
    modPage_GetSearchShortNameForProjectSearchId
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page_util_js/modPage_GetSearchShortNameForProjectSearchId";
import {
    modPage_Get_DataTransformationType_DisplayLabel
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page_util_js/modPage_Get_DataTransformationType_DisplayLabel";



const _SELECTION_TOOLTIP_DOM_ID = "mod-viz-tooltip-selection"

const _SELECTION_TOOLTIP_FROM_MOD_MASS_DOM_ID = "mod-viz-tooltip-selection-from-mod-mass"

const _SELECTION_TOOLTIP_TO_MOD_MASS_DOM_ID = "mod-viz-tooltip-selection-to-mod-mass"


const _LABELS_TO_LEFT_OFFSET = -10

/**
 * Call for each update
 *
 */
export const modView_DataViz_Renderer = function (
    {
        render_ForGet_SVG_Only_IncludeLabelsToLeft_Search_SubSearch_ColorLabel,

        data_viz_container_DOMElement,

        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root,
        projectSearchIds_Or_SubSearchIds_For_DisplayOrder,
        projectSearchId_WhenHaveSingleSearchSubGroups,
        modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result,
        modViewPage_DataVizOptions_VizSelections_PageStateManager,

        dataPageStateManager_DataFrom_Server,

        updated_modViewPage_DataVizOptions_VizSelections_PageStateManager
    } : {
        render_ForGet_SVG_Only_IncludeLabelsToLeft_Search_SubSearch_ColorLabel: boolean

        data_viz_container_DOMElement: HTMLDivElement

        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
        projectSearchIds_Or_SubSearchIds_For_DisplayOrder: Array<number>
        projectSearchId_WhenHaveSingleSearchSubGroups: number
        modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result: ModView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
        modViewPage_DataVizOptions_VizSelections_PageStateManager: ModViewPage_DataVizOptions_VizSelections_PageStateManager

        dataPageStateManager_DataFrom_Server :  DataPageStateManager

        updated_modViewPage_DataVizOptions_VizSelections_PageStateManager: () => void

    }) { try {

    // console.log('called ModView_DataViz_Renderer()');

    $(data_viz_container_DOMElement).show();

    $(data_viz_container_DOMElement).empty();

    // start drawing the actual viz
    let svg_RootElement_D3 = d3.select(data_viz_container_DOMElement).append("svg")
        .attr("width",
            modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.width +
            ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.margin.left +
            ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.margin.right )

        .attr("height",
            modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.height +
            ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.margin.top
            + ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.margin.bottom )


    let svg = svg_RootElement_D3.append("g")

        .attr("transform", "translate(" + ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.margin.left +
            "," + ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.margin.top + ")");


    let  tooltip: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>

    if ( ! render_ForGet_SVG_Only_IncludeLabelsToLeft_Search_SubSearch_ColorLabel ) {

        // set up div to use for tooltips
        d3.select( '#mod-viz-tooltip' ).remove();
        tooltip = d3.select( "body" )
            .append( "div" )
            .attr( "id", "mod-viz-tooltip" )
            .style( "display", "none" )
            .style( "width", "auto" )
            .style( "height", "auto" )
            .style( "background-color", "white" )
            .style( "position", "absolute" )
            .style( "z-index", "10" )
            .style( "border-style", "solid" )
            .style( "border-color", "gray" )
            .style( "border-width", "1px" )
            .style( "padding", "10px" )
            .style( "min-width", "450px" )   //  set min-width so when display when scrolled to right past what would be right edge of view port when no scroll right.
            .style( "max-width", "450px" );  //  max-width


        {   //  Tooltip shown while selecting mod masses by click and drag in the visualization

            const container_ID = "mod-viz-tooltip-selection-outer-container"

            const domElement = document.getElementById( container_ID )

            if ( domElement ) {

                // Hide old <div> if in DOM

                const domMainElement = document.getElementById( _SELECTION_TOOLTIP_DOM_ID )
                if ( ! domMainElement ) {
                    throw Error( "NO DOM element with id: " + _SELECTION_TOOLTIP_DOM_ID )
                }

                domMainElement.style.display = "none"

            } else {

                // Add new <div>

                const addedDivElementDOM = document.createElement( "div" );

                const documentBody = document.querySelector( 'body' );

                documentBody.appendChild( addedDivElementDOM );

                addedDivElementDOM.id = container_ID

                //  set min-width so when display when scrolled to right past what would be right edge of view port when no scroll right.

                addedDivElementDOM.innerHTML =
                    '<div id="' + _SELECTION_TOOLTIP_DOM_ID + '" style=" display: none; width: auto; height: auto; background-color: white; position: absolute; z-index: 10; ' +
                    ' border-style: solid; border-color: gray; border-width: 1px; padding: 10px; ' +
                    ' min-width: 350px; max-width: 350px; " >' +
                    'Selecting from modification mass ' +
                    '<span id="' + _SELECTION_TOOLTIP_FROM_MOD_MASS_DOM_ID + '"></span>' +
                    ' to <span id="' + _SELECTION_TOOLTIP_TO_MOD_MASS_DOM_ID + '"></span>' +
                    '.' +
                    '</div>'
            }
        }

    }

    // keep track of what the user has selected to see

    _addColoredRectangles({
        svg,
        sortedModMasses: modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.sortedModMasses,
        modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result, projectSearchIds_Or_SubSearchIds_For_DisplayOrder, projectSearchId_WhenHaveSingleSearchSubGroups,
        tooltip, modViewPage_DataVizOptions_VizSelections_PageStateManager,
        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root,
        dataPageStateManager_DataFrom_Server
    });

    _addSeparatorLines({ svg, projectSearchIds_Or_SubSearchIds_For_DisplayOrder, modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result });

    let searchesGroup_Width: number = undefined

    if ( render_ForGet_SVG_Only_IncludeLabelsToLeft_Search_SubSearch_ColorLabel ) {

        const addSearchLabels_Result =
            _addSearchLabels( {
                svg,
                // tooltip,
                modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root,
                projectSearchIds_Or_SubSearchIds_For_DisplayOrder,
                projectSearchId_WhenHaveSingleSearchSubGroups,
                modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result,
                modViewPage_DataVizOptions_VizSelections_PageStateManager,
                dataPageStateManager_DataFrom_Server,
                updated_modViewPage_DataVizOptions_VizSelections_PageStateManager
            } );

        searchesGroup_Width = addSearchLabels_Result.searchesGroup_Width
    }

    _addModLabels({ svg, modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result });
    _addModLabelsHeader({ svg, width: modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.width });


    const addColorScaleLegend_Result =
        _addColorScaleLegend({
            render_ForGet_SVG_Only_IncludeLabelsToLeft_Search_SubSearch_ColorLabel,
            svg,
            modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result,
            modViewPage_DataVizOptions_VizSelections_PageStateManager
        });

    if ( ! render_ForGet_SVG_Only_IncludeLabelsToLeft_Search_SubSearch_ColorLabel ) {

        _addDragHandlerToRects( {
            svg,
            projectSearchIds_Or_SubSearchIds_For_DisplayOrder,
            modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result,
            dataPageStateManager_DataFrom_Server,
            modViewPage_DataVizOptions_VizSelections_PageStateManager,

            updated_modViewPage_DataVizOptions_VizSelections_PageStateManager
        } );
    }


    if ( render_ForGet_SVG_Only_IncludeLabelsToLeft_Search_SubSearch_ColorLabel ) {

        const labelsToLeft_MaxWidth_PlusAddition = Math.ceil( Math.max( searchesGroup_Width, addColorScaleLegend_Result.labelElementWidth ) ) + 20

        const topLevelGroup_TranslateX = ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.margin.left + labelsToLeft_MaxWidth_PlusAddition

        svg.attr("transform", "translate(" + topLevelGroup_TranslateX +
            "," + ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.margin.top + ")");

        svg_RootElement_D3
            .attr("width",
                labelsToLeft_MaxWidth_PlusAddition +
                modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.width +
                ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.margin.left +
                ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.margin.right )

    }

} catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}



const _addColoredRectangles = function (
    {
        svg, sortedModMasses, modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result, projectSearchIds_Or_SubSearchIds_For_DisplayOrder, projectSearchId_WhenHaveSingleSearchSubGroups,
        tooltip, modViewPage_DataVizOptions_VizSelections_PageStateManager,
        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root,
        dataPageStateManager_DataFrom_Server
    } : {
        svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>
        sortedModMasses: ReadonlyArray<number>
        modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result: ModView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
        projectSearchIds_Or_SubSearchIds_For_DisplayOrder : ReadonlyArray<number>,
        projectSearchId_WhenHaveSingleSearchSubGroups: number
        tooltip: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>
        modViewPage_DataVizOptions_VizSelections_PageStateManager: ModViewPage_DataVizOptions_VizSelections_PageStateManager

        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root

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
        .attr('y', (d, i) => (modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.yScale(projectSearchIds_Or_SubSearchIds_For_DisplayOrder[i])))
        .attr('class', (d, i) => ('project-search-id-' + d.projectSearchId_OR_SubSearchId + ' mod-mass-' + d.modMass))
        .attr('width', modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.xScale.bandwidth())
        .attr('height', modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.yScale.bandwidth())
        .attr('stroke', 'none')
        .attr('fill', (d) => {

            const color = modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.colorScale( d.topLevelTable_DisplayValue__ClampedTo_MinMax_For_ColorScale )

            return color
        })
        .on("mousemove", function ( event_Param, dataElement_Param ) {

            const projectSearchId_Or_SubSearchId = limelight__Input_NumberOrString_ReturnNumber( dataElement_Param.projectSearchId_OR_SubSearchId );

            _showToolTip({
                onSearchLabel_OnLeft: false,
                projectSearchId_Or_SubSearchId,
                projectSearchId_WhenHaveSingleSearchSubGroups,
                modMass: dataElement_Param.modMass,
                topLevelTable_DisplayValue: dataElement_Param.topLevelTable_DisplayValue,
                tooltip,
                modViewPage_DataVizOptions_VizSelections_PageStateManager,
                modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root,
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
        // if ( modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMasses_ProjectSearchIds_Visualization_Selections_Root().is_AnySelections() ) {
        //     _updateShownRectOpacities({
        //         svg,
        //         modViewPage_DataVizOptions_VizSelections_PageStateManager
        //     })
        // }
    }
}


const _addSeparatorLines = function (
    {
        svg, projectSearchIds_Or_SubSearchIds_For_DisplayOrder, modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
    }: {
        svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>
        projectSearchIds_Or_SubSearchIds_For_DisplayOrder: Array<number>
        modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result: ModView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
    }) {

    svg.select('#rect-group').selectAll('.separator-line')
        .data(projectSearchIds_Or_SubSearchIds_For_DisplayOrder)
        .enter()
        .append('line')
        .attr('class', 'separator-line')
        .attr('x1', '0')
        .attr('y1', (d, i) => (modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.yScale(projectSearchIds_Or_SubSearchIds_For_DisplayOrder[i])))
        .attr('x2', modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.width)
        .attr('y2', (d, i) => (modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.yScale(projectSearchIds_Or_SubSearchIds_For_DisplayOrder[i])))
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


/**
 * !!!  ONLY for render for create SVG for download
 *
 * @param svg
 * @param tooltip
 * @param modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
 * @param projectSearchIds_Or_SubSearchIds_For_DisplayOrder
 * @param modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
 * @param modViewPage_DataVizOptions_VizSelections_PageStateManager
 * @param dataPageStateManager_DataFrom_Server
 * @param updated_modViewPage_DataVizOptions_VizSelections_PageStateManager
 */
const _addSearchLabels = function (
    {
        svg,
        // tooltip,
        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root,
        projectSearchIds_Or_SubSearchIds_For_DisplayOrder,
        projectSearchId_WhenHaveSingleSearchSubGroups,

        modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result,
        modViewPage_DataVizOptions_VizSelections_PageStateManager,
        dataPageStateManager_DataFrom_Server,

        updated_modViewPage_DataVizOptions_VizSelections_PageStateManager
    } : {
        svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>
        // tooltip: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>

        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
        projectSearchIds_Or_SubSearchIds_For_DisplayOrder: Array<number>
        projectSearchId_WhenHaveSingleSearchSubGroups: number

        modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result: ModView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
        modViewPage_DataVizOptions_VizSelections_PageStateManager: ModViewPage_DataVizOptions_VizSelections_PageStateManager
        dataPageStateManager_DataFrom_Server : DataPageStateManager

        updated_modViewPage_DataVizOptions_VizSelections_PageStateManager: () => void
    }) {

    // for ( let i = 0; i < projectSearchIds_Or_SubSearchIds_For_DisplayOrder.length; i++ ) {
    //     var z = ( modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.yScale(projectSearchIds_Or_SubSearchIds_For_DisplayOrder[i]) )
    //     var y = ( modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.yScale(projectSearchIds_Or_SubSearchIds_For_DisplayOrder[i]) +
    //         (modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.yScale.bandwidth() / 2) + (ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.labelFontSize / 2))
    //     var zzzz = 0
    // }


    const searchesGroup = svg.append("g")

    searchesGroup.attr("data-search-group", "search-group")

    const displayLabels_Map_Key_ProjectSearchId_OR_SubSearchId: Map<number, string> = new Map()

    if ( modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root.projectSearchId_Or_SubSearchId_Enum
        === ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) {

        const searchSubGroups_Root = dataPageStateManager_DataFrom_Server.get_SearchSubGroups_Root()
        if ( ! searchSubGroups_Root ) {
            const msg = "if ( modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root.projectSearchId_Or_SubSearchId_Enum === ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) { AND dataPageStateManager_DataFrom_Server.get_SearchSubGroups_Root() returned NOTHING"
            console.warn( msg )
            throw Error( msg )
        }
        const searchSubGroups_ForProjectSearchId = searchSubGroups_Root.get_searchSubGroups_ForProjectSearchId( projectSearchId_WhenHaveSingleSearchSubGroups )
        if ( ! searchSubGroups_ForProjectSearchId ) {
            const msg = "if ( this._modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root.projectSearchId_Or_SubSearchId_Enum === ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) { AND searchSubGroups_Root.get_searchSubGroups_ForProjectSearchId( projectSearchId_WhenHaveSingleSearchSubGroups ) returned NOTHING. projectSearchId_WhenHaveSingleSearchSubGroups: " + projectSearchId_WhenHaveSingleSearchSubGroups
            console.warn( msg )
            throw Error( msg )
        }

        for ( const subSearchId of projectSearchIds_Or_SubSearchIds_For_DisplayOrder ) {

            const searchSubGroup = searchSubGroups_ForProjectSearchId.get_searchSubGroup_For_SearchSubGroup_Id( subSearchId )
            if ( ! searchSubGroup ) {
                const msg = "In _addSearchLabels = function: searchSubGroups_ForProjectSearchId.get_searchSubGroup_For_SearchSubGroup_Id( subSearchId ) returned NOTHING for subSearchId: " + subSearchId
                console.warn(msg)
                throw Error(msg)
            }

            const searchSubGroupDisplay = "(" + searchSubGroup.subgroupName_Display + ") " + searchSubGroup.searchSubgroupName_fromImportFile

            displayLabels_Map_Key_ProjectSearchId_OR_SubSearchId.set( subSearchId, searchSubGroupDisplay )
        }

    } else {

        //  Display the Search Names

        for ( const projectSearchId of projectSearchIds_Or_SubSearchIds_For_DisplayOrder ) {

            const searchData_For_ProjectSearchId = dataPageStateManager_DataFrom_Server.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId )
            if ( ! searchData_For_ProjectSearchId ) {
                const msg = "In _addSearchLabels = function: dataPageStateManager_DataFrom_Server.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId
                console.warn(msg)
                throw Error(msg)
            }

            let shortNameDisplay = ""

            if ( searchData_For_ProjectSearchId.searchShortName ) {
                shortNameDisplay = "(" + searchData_For_ProjectSearchId.searchShortName + ") "
            }

            //  Keep same data format as in 'ModView_DataViz_Renderer.ts'
            const searchDisplay = "(" + searchData_For_ProjectSearchId.searchId + ") " + shortNameDisplay + searchData_For_ProjectSearchId.name

            displayLabels_Map_Key_ProjectSearchId_OR_SubSearchId.set( projectSearchId, searchDisplay )
        }

    }

    searchesGroup.selectAll('.non-existent-class') //  use .selectAll so can use .data
        .data(projectSearchIds_Or_SubSearchIds_For_DisplayOrder)
        .enter()
        .append('text')
        .attr('class', 'search-label')
        .attr('x', _LABELS_TO_LEFT_OFFSET )
        .attr('y',
            (d, i) =>
                ( modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.yScale(projectSearchIds_Or_SubSearchIds_For_DisplayOrder[i]) +
                    (modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.yScale.bandwidth() / 2) + (ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.labelFontSize / 2)))
        .attr("text-anchor", "end")
        .attr('font-size', ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.labelFontSize + 'px')
        .attr('font-family', ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.label_FontFamily )
        .text((d,i) => {
            const projectSearchId_Or_SubSearchId =  projectSearchIds_Or_SubSearchIds_For_DisplayOrder[ i ]
            const displayLabel = displayLabels_Map_Key_ProjectSearchId_OR_SubSearchId.get( projectSearchId_Or_SubSearchId )
            return displayLabel
        })

        // .text((d,i) => ( _getTruncatedSearchNameForProjectSearchId({ projectSearchId:projectSearchIds_Or_SubSearchIds_For_DisplayOrder[i], dataPageStateManager_DataFrom_Server }) ) )

        // .on("mousemove", function ( event_Param, dataElement_Param ) {
        //     const projectSearchId = limelight__Input_NumberOrString_ReturnNumber( dataElement_Param );
        //     _showToolTip({
        //         onSearchLabel_OnLeft: true, projectSearchId, tooltip, modViewPage_DataVizOptions_VizSelections_PageStateManager, modMass : undefined, topLevelTable_DisplayValue : undefined, dataPageStateManager_DataFrom_Server
        //     })
        // })
        // .on("mouseout", function ( event_Param, dataElement_Param ) {
        //     //d3.select(this).attr('fill', (d) => (colorScale(d.psmCount)))
        //     _hideToolTip({tooltip});
        // })

    const searchesGroup_BoundingClientRect  = searchesGroup.node().getBoundingClientRect()

    const searchesGroup_Width = Math.ceil( searchesGroup_BoundingClientRect.width )

    return { searchesGroup_Width }

}

// const _getTruncatedSearchNameForProjectSearchId = function (
//     {
//         projectSearchId,
//         dataPageStateManager_DataFrom_Server
//     } : {
//         projectSearchId : number
//         dataPageStateManager_DataFrom_Server:DataPageStateManager
//     }) {
//
//     let searchName: string
//     const searchShortName = modPage_GetSearchShortNameForProjectSearchId({
//         projectSearchId:projectSearchId,
//         dataPageStateManager_DataFrom_Server
//     });
//
//     if(searchShortName && searchShortName.length > 1) {
//         searchName = searchShortName;
//     } else {
//         searchName = modPage_GetSearchNameForProjectSearchId({ projectSearchId, dataPageStateManager_DataFrom_Server });
//     }
//
//     if(searchName.length > ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.maxSearchLabelLength) {
//         searchName = searchName.substring(0, ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.maxSearchLabelLength - 4) + '...';
//     }
//
//     return searchName;
//
// }


const _addDragHandlerToRects = function (
    {
        svg,
        projectSearchIds_Or_SubSearchIds_For_DisplayOrder,
        modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result,
        dataPageStateManager_DataFrom_Server,
        modViewPage_DataVizOptions_VizSelections_PageStateManager,

        updated_modViewPage_DataVizOptions_VizSelections_PageStateManager
    } : {
        svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>
        projectSearchIds_Or_SubSearchIds_For_DisplayOrder : Array<number>
        modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result: ModView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
        dataPageStateManager_DataFrom_Server : DataPageStateManager
        modViewPage_DataVizOptions_VizSelections_PageStateManager: ModViewPage_DataVizOptions_VizSelections_PageStateManager

        updated_modViewPage_DataVizOptions_VizSelections_PageStateManager: () => void

    }) {

    svg.select('#rect-group')
        .on( "mousedown", function( event_Param ) {

            // reset selected state object
            // svg.select('#rect-group').selectAll('rect').style('opacity', '1.0');
            //
            // modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMasses_ProjectSearchIds_Visualization_Selections_Root().clear_All()

            const p = d3.pointer( event_Param );

            const pointer_X = p[ 0 ]
            const pointer_Y = p[ 1 ]

            const projectSearchId_Or_SubSearchId_Total_MinMaxPosition_NOT_SET = undefined

            let projectSearchId_Or_SubSearchId_Total_MinPosition: number = projectSearchId_Or_SubSearchId_Total_MinMaxPosition_NOT_SET
            let projectSearchId_Or_SubSearchId_Total_MaxPosition: number = projectSearchId_Or_SubSearchId_Total_MinMaxPosition_NOT_SET

            for ( const projectSearchId_Or_SubSearchId of projectSearchIds_Or_SubSearchIds_For_DisplayOrder ) {

                const psidMinPosition = modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.yScale( projectSearchId_Or_SubSearchId );
                const psidMaxPosition = psidMinPosition + modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.yScale.bandwidth();

                if ( projectSearchId_Or_SubSearchId_Total_MinPosition === projectSearchId_Or_SubSearchId_Total_MinMaxPosition_NOT_SET ) {
                    projectSearchId_Or_SubSearchId_Total_MinPosition = psidMinPosition
                } else if ( projectSearchId_Or_SubSearchId_Total_MinPosition > psidMinPosition ) {
                    projectSearchId_Or_SubSearchId_Total_MinPosition = psidMinPosition
                }
                if ( projectSearchId_Or_SubSearchId_Total_MaxPosition === projectSearchId_Or_SubSearchId_Total_MinMaxPosition_NOT_SET ) {
                    projectSearchId_Or_SubSearchId_Total_MaxPosition = psidMaxPosition
                } else if ( projectSearchId_Or_SubSearchId_Total_MaxPosition < psidMaxPosition ) {
                    projectSearchId_Or_SubSearchId_Total_MaxPosition = psidMaxPosition
                }
            }

            const selectionRect_Y = projectSearchId_Or_SubSearchId_Total_MinPosition + 10
            const selectionRect_Height = projectSearchId_Or_SubSearchId_Total_MaxPosition - 10 - 10

            svg.select('#rect-group')
                .append( "rect")
                .attr('class', 'selection')
                .attr("x", pointer_X )
                // .attr('y', pointer_Y )
                .attr('y', selectionRect_Y )
                .attr('width', '0')
                // .attr('height', '0')
                .attr('height', selectionRect_Height )

            _show_Tooltip_During_Selection({
                pointer_X, pointer_Y,
                rectParams: { x: pointer_X, y: pointer_Y, width: 1, height: 1 },
                modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
            })
        })
        .on( "mousemove", function( event_Param ) {

            let s = svg.select('#rect-group').select( "rect.selection");

            if( !s.empty()) {

                const p = d3.pointer( event_Param );

                const pointer_X = p[ 0 ]
                const pointer_Y = p[ 1 ]

                let rectParams: INTERNAL__RrectParams_Class = {
                    x       : s.attr( "x"),
                    y       : s.attr( "y"),
                    width   : s.attr( "width"),
                    height  : s.attr( "height")
                };
                const move = {
                    x : pointer_X - rectParams.x,
                    y : pointer_Y - rectParams.y
                };

                if( move.x < 1 || (move.x*2 < rectParams.width)) {
                    rectParams.x = pointer_X;
                    rectParams.width -= move.x;
                } else {
                    rectParams.width = move.x;
                }

                if( move.y < 1 || (move.y*2 < rectParams.height)) {
                    rectParams.y = pointer_Y;
                    rectParams.height -= move.y;
                } else {
                    rectParams.height = move.y;
                }

                s.attr("x", rectParams.x)
                    // .attr("y", rectParams.y)
                    .attr("width", rectParams.width)
                // .attr("height", rectParams.height);


                _show_Tooltip_During_Selection({
                    pointer_X, pointer_Y, rectParams, modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
                })
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
                    svg, projectSearchIds_Or_SubSearchIds_For_DisplayOrder, modViewPage_DataVizOptions_VizSelections_PageStateManager, rectParams, modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
                });

                // remove selection frame
                s.remove();

                ////////

                {
                    const tooltipDOMElement = document.getElementById( _SELECTION_TOOLTIP_DOM_ID )
                    if ( ! tooltipDOMElement ) {
                        throw Error("NO DOM element with id: " + _SELECTION_TOOLTIP_DOM_ID )
                    }

                    tooltipDOMElement.style.display = "none"
                }

                ////////

                updated_modViewPage_DataVizOptions_VizSelections_PageStateManager()
            }

        });

    // d3.select("body")
    //     .on("keydown", function( event_Param ) {
    //
    //         // capture escape key press, reset viz
    //         if( event_Param.keyCode === 27 ) {
    //
    //             modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMasses_ProjectSearchIds_Visualization_Selections_Root().clear_All()
    //
    //             updated_modViewPage_DataVizOptions_VizSelections_PageStateManager()
    //         }
    //     });
}

/**
 *
 */
const _show_Tooltip_During_Selection = function (
    {
        pointer_X, pointer_Y, rectParams, modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
    } : {
        pointer_X: number
        pointer_Y: number
        rectParams: INTERNAL__RrectParams_Class
        modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result: ModView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
    }) : void
{
    const modMass_FromTo_NOT_SET = undefined

    let modMassFrom: number = modMass_FromTo_NOT_SET
    let modMassTo: number = modMass_FromTo_NOT_SET

    for ( const modMass of modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.sortedModMasses ) {

        if ( _rectangleContainsModMass({ modMass, rectParams, modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result }) ) {

            if ( modMassFrom === modMass_FromTo_NOT_SET ) {
                modMassFrom = modMass
            }
            if ( modMassFrom !== modMass_FromTo_NOT_SET ) {
                modMassTo = modMass
            }
        }
    }

    if ( modMassFrom === modMass_FromTo_NOT_SET || modMassTo === modMass_FromTo_NOT_SET ) {

        //  NOT find modMassFrom/modMassTo so hide the tooltip and exit

        const domMainElement = document.getElementById( _SELECTION_TOOLTIP_DOM_ID )
        if ( ! domMainElement ) {
            throw Error("NO DOM element with id: " + _SELECTION_TOOLTIP_DOM_ID )
        }

        domMainElement.style.display = "none"

        return // EARLY RETURN
    }

    const tooltip_FromModMass_DOMElement = document.getElementById( _SELECTION_TOOLTIP_FROM_MOD_MASS_DOM_ID )
    if ( ! tooltip_FromModMass_DOMElement ) {
        throw Error("NO DOM element with id: " + _SELECTION_TOOLTIP_FROM_MOD_MASS_DOM_ID )
    }

    tooltip_FromModMass_DOMElement.innerText = modMassFrom.toString()

    const tooltip_ToModMass_DOMElement = document.getElementById( _SELECTION_TOOLTIP_TO_MOD_MASS_DOM_ID )
    if ( ! tooltip_ToModMass_DOMElement ) {
        throw Error("NO DOM element with id: " + _SELECTION_TOOLTIP_TO_MOD_MASS_DOM_ID )
    }

    tooltip_ToModMass_DOMElement.innerText = modMassTo.toString()

    ///

    const tooltipDOMElement = document.getElementById( _SELECTION_TOOLTIP_DOM_ID )
    if ( ! tooltipDOMElement ) {
        throw Error("NO DOM element with id: " + _SELECTION_TOOLTIP_DOM_ID )
    }

    //  TODO  Consider setting 'left' and 'top' based on pointer_X and pointer_Y instead of window.event.pageY and window.event.pageX

    // @ts-ignore
    const mousePointer_pageY = window.event.pageY
    // @ts-ignore
    const mousePointer_pageX = window.event.pageX

    const tooltip_horizontal_Offset = 20;

    const tooltip_Left = mousePointer_pageX + tooltip_horizontal_Offset;
    const tooltip_Top = mousePointer_pageY + 20;


    tooltipDOMElement.style.left = tooltip_Left + "px"
    tooltipDOMElement.style.top = tooltip_Top + "px"

    tooltipDOMElement.style.display = ""

    const widthAllowance_For_VerticalScrollbar = 10;
    const widthAllowance_For_PaddingFrom_VerticalScrollbar = 10;
    const widthAllowance_For_PaddingFrom_LeftViewportEdge = 10;

    const window_innerWidth = window.innerWidth
    const window_scrollX = window.scrollX

    const mod_viz_tooltip_BoundingRect = tooltipDOMElement.getBoundingClientRect();

    const tooltipWidth = mod_viz_tooltip_BoundingRect.width;

    if ( ( ( tooltip_Left - window_scrollX ) + tooltipWidth + widthAllowance_For_VerticalScrollbar + widthAllowance_For_PaddingFrom_VerticalScrollbar ) > window_innerWidth ) {

        let tooltip_Left_WithinViewport_PositionToLeft = mousePointer_pageX - tooltip_horizontal_Offset - tooltipWidth

        if ( tooltip_Left_WithinViewport_PositionToLeft < ( window_scrollX + widthAllowance_For_PaddingFrom_LeftViewportEdge ) ) {
            tooltip_Left_WithinViewport_PositionToLeft = ( window_scrollX + widthAllowance_For_PaddingFrom_LeftViewportEdge );
        }

        const tooltip_Left_PositionToLeft = tooltip_Left_WithinViewport_PositionToLeft; // + window_scrollX;

        tooltipDOMElement
            .style.left = tooltip_Left_PositionToLeft + "px"
    }
}


const _updateSelectedRectIndicators = function (
    {
        svg, projectSearchIds_Or_SubSearchIds_For_DisplayOrder, modViewPage_DataVizOptions_VizSelections_PageStateManager, rectParams, modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
    } : {
        svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>
        modViewPage_DataVizOptions_VizSelections_PageStateManager: ModViewPage_DataVizOptions_VizSelections_PageStateManager
        projectSearchIds_Or_SubSearchIds_For_DisplayOrder : Array<number>
        rectParams: INTERNAL__RrectParams_Class
        modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result: ModView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
    }) {

    // reset selected state object
    // svg.select('#rect-group').selectAll('rect').style('opacity', '0.35');

    // const selectedModMasses_Set__Map_Key_ProjectSearchId: Map<number, Set<number>> = new Map()

    const _MIN_MAX_NOT_SET = undefined

    let min_ModMassSelected: number = _MIN_MAX_NOT_SET
    let max_ModMassSelected: number = _MIN_MAX_NOT_SET

    // add opacity adjustment for selected items
    for ( const modMass of modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.sortedModMasses ) {

        if ( _rectangleContainsModMass({ modMass, rectParams, modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result })) {

            for (const projectSearchId_Or_SubSearchId of projectSearchIds_Or_SubSearchIds_For_DisplayOrder) {

                if ( _rectangleContains_ProjectSearchId_Or_SubSearchId({ projectSearchId_Or_SubSearchId, rectParams, modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result }) ) {

                    // const selector = 'rect.mod-mass-' + modMass + '.project-search-id-' + projectSearchId;
                    // svg.select('#rect-group').select(selector).style('opacity', '1.0');

                    // let selectedModMasses_Set = selectedModMasses_Set__Map_Key_ProjectSearchId.get( projectSearchId )
                    // if ( ! selectedModMasses_Set ) {
                    //     selectedModMasses_Set = new Set()
                    //     selectedModMasses_Set__Map_Key_ProjectSearchId.set( projectSearchId, selectedModMasses_Set )
                    // }
                    // selectedModMasses_Set.add( modMass )

                    if ( min_ModMassSelected === _MIN_MAX_NOT_SET ) {
                        min_ModMassSelected = modMass
                        max_ModMassSelected = modMass
                    } else {
                        if ( min_ModMassSelected > modMass ) {
                            min_ModMassSelected = modMass
                        }
                        if ( max_ModMassSelected < modMass ) {
                            max_ModMassSelected = modMass
                        }
                    }
                }
            }
        }
    }

    modViewPage_DataVizOptions_VizSelections_PageStateManager.set_modMassCutoffMin( min_ModMassSelected )
    modViewPage_DataVizOptions_VizSelections_PageStateManager.set_modMassCutoffMax( max_ModMassSelected )

    // const modMasses_ProjectSearchIds_Visualization_Selections_Root = modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMasses_ProjectSearchIds_Visualization_Selections_Root()
    //
    // for ( const mapEntry of selectedModMasses_Set__Map_Key_ProjectSearchId.entries() ) {
    //
    //     const projectSearchId = mapEntry[0]
    //     const selectedModMasses_Set = mapEntry[1]
    //     modMasses_ProjectSearchIds_Visualization_Selections_Root.set_SelectedModMasses_Set_For_ProjectSearchId({ projectSearchId, selectedModMasses_Set })
    // }
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

const _rectangleContains_ProjectSearchId_Or_SubSearchId = function (
    {
        projectSearchId_Or_SubSearchId, rectParams, modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
    }: {
        projectSearchId_Or_SubSearchId: number
        rectParams: INTERNAL__RrectParams_Class
        modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result: ModView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
    }) {

    const psidMinPosition = modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.yScale(projectSearchId_Or_SubSearchId);
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
        onSearchLabel_OnLeft, projectSearchId_Or_SubSearchId, projectSearchId_WhenHaveSingleSearchSubGroups,
        modMass, topLevelTable_DisplayValue, tooltip, modViewPage_DataVizOptions_VizSelections_PageStateManager,
        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root,
        dataPageStateManager_DataFrom_Server
    } : {
        onSearchLabel_OnLeft: boolean
        projectSearchId_Or_SubSearchId : number
        projectSearchId_WhenHaveSingleSearchSubGroups: number
        modMass: number
        topLevelTable_DisplayValue: number
        tooltip: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>
        modViewPage_DataVizOptions_VizSelections_PageStateManager: ModViewPage_DataVizOptions_VizSelections_PageStateManager
        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
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

            if ( projectSearchId_Or_SubSearchId ) {

                if ( modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root.projectSearchId_Or_SubSearchId_Enum
                    === ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) {

                    const searchSubGroups_ForProjectSearchId = dataPageStateManager_DataFrom_Server.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId( projectSearchId_WhenHaveSingleSearchSubGroups )

                    const searchSubGroup = searchSubGroups_ForProjectSearchId.get_searchSubGroup_For_SearchSubGroup_Id( projectSearchId_Or_SubSearchId )

                    searchSubGroup.subgroupName_Display

                    searchDisplayString = "(" + searchSubGroup.subgroupName_Display + ") " + searchSubGroup.searchSubgroupName_fromImportFile

                    txt += "<p>Sub Search: <span id='mod_viz_tooltip__search_display_string'></span></p>";

                } else {

                    const searchId = modPage_GetSearchIdForProjectSearchId({
                        projectSearchId:projectSearchId_Or_SubSearchId,
                        dataPageStateManager_DataFrom_Server
                    });

                    const searchName = modPage_GetSearchNameOnlyForProjectSearchId({
                        projectSearchId:projectSearchId_Or_SubSearchId,
                        dataPageStateManager_DataFrom_Server
                    });

                    const searchShortName = modPage_GetSearchShortNameForProjectSearchId({
                        projectSearchId:projectSearchId_Or_SubSearchId,
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



const _addColorScaleLegend = function (
    {
        render_ForGet_SVG_Only_IncludeLabelsToLeft_Search_SubSearch_ColorLabel,

        svg, modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result, modViewPage_DataVizOptions_VizSelections_PageStateManager
    } : {
        render_ForGet_SVG_Only_IncludeLabelsToLeft_Search_SubSearch_ColorLabel: boolean

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

    // create group element to hold legend

    const legend_SVG_Group__Translate_Y = rectAreaHeight + ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.colorScaleLegend_TopMargin

    const legend_SVG_Group = svg.append('g')
        .attr("transform", () => 'translate(0, ' + legend_SVG_Group__Translate_Y + ')');


    let labelElementWidth: number = undefined

    if ( render_ForGet_SVG_Only_IncludeLabelsToLeft_Search_SubSearch_ColorLabel ) {

        let labelText = quantType;
        labelText += (
            modViewPage_DataVizOptions_VizSelections_PageStateManager.get_psmQuant() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__PSM_QUANT_METHOD_Values_Enum.counts
                ? ' Count' : ' Ratio'
        )

        if ( modViewPage_DataVizOptions_VizSelections_PageStateManager.get_dataTransformation() !== undefined
            && modViewPage_DataVizOptions_VizSelections_PageStateManager.get_dataTransformation() !== ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.none ) {
            labelText += " (" + modPage_Get_DataTransformationType_DisplayLabel( { modViewPage_DataVizOptions_VizSelections_PageStateManager } ) + ")";
        }
        labelText += ' Color:';

        // add legend text label
        const labelElement_D3 = legend_SVG_Group.append('text')

        labelElement_D3.attr('class', 'project-label')
            .attr('x', _LABELS_TO_LEFT_OFFSET )
            .attr('y', () => ( (yScale.bandwidth() / 2) + (ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.labelFontSize / 2) ))
            .attr("text-anchor", "end")
            .attr('font-size', ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.labelFontSize + 'px')
            .attr('font-family', ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.label_FontFamily )
            .text(() => (labelText));

        labelElementWidth = labelElement_D3.node().getBoundingClientRect().width
    }



    // width of color scale bar
    const width = ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.minLegendWidth;

    // add color scale group
    let colorScaleGroup = legend_SVG_Group.append('g');

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
    let scaleBarLegendGroup = legend_SVG_Group.append('g')
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

        let textAnchor = "middle"

        if ( i === 0 ) {
            textAnchor = "start" //  first tick mark label left align
        }
        if ( i === ( numTicks - 1 ) ) {
            textAnchor = "end"  //  last tick mark label right align
        }


        tickGroup.append('text')
            .attr('x', 0)
            .attr('y', () => (7 + ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.labelFontSize))
            .attr("text-anchor", textAnchor )
            .attr('font-size', ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.labelFontSize + 'px')
            .attr('font-family', ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.label_FontFamily )
            .text((d,i) => (
                showInts ? psmCountForX : psmCountForX.toExponential(2)
            ));
    }

    return { labelElementWidth }
}


// const _updateShownRectOpacities = function ({ svg, modViewPage_DataVizOptions_VizSelections_PageStateManager } : {
//
//     svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>
//     modViewPage_DataVizOptions_VizSelections_PageStateManager: ModViewPage_DataVizOptions_VizSelections_PageStateManager
// }) {
//
//     const modMasses_ProjectSearchIds_Visualization_Selections_Root = modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMasses_ProjectSearchIds_Visualization_Selections_Root()
//
//     if ( ! modMasses_ProjectSearchIds_Visualization_Selections_Root.is_AnySelections() ) {
//         svg.select('#rect-group').selectAll('rect').style('opacity', '1.0');
//     } else {
//
//         svg.select('#rect-group').selectAll('rect').style('opacity', '0.35');
//
//         for (const projectSearchId of modMasses_ProjectSearchIds_Visualization_Selections_Root.get_Selection_ProjectSearchIds() ) {
//             for (const modMass of modMasses_ProjectSearchIds_Visualization_Selections_Root.get_SelectedModMasses_Set_For_ProjectSearchId(projectSearchId)) {
//                 const selector = 'rect.mod-mass-' + modMass + '.project-search-id-' + projectSearchId;
//                 svg.select('#rect-group').select(selector).style('opacity', '1.0');
//             }
//         }
//     }
// }


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
        .attr('font-family', ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.label_FontFamily )
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
        .attr('font-family', ModView_DataViz_Compute_ColorScale_WidthHeight_Etc__VISUALIZATION_MAIN_CONSTANTS.label_FontFamily )
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
