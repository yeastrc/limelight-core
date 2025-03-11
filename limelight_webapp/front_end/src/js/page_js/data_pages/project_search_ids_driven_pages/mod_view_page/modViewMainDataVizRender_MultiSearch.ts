"use strict";

import * as d3 from "d3";
// import * as Drag from 'd3-drag';
import {ModViewDataTableRenderer_MultiSearch} from 'page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewDataTableRenderer_MultiSearch';
import {ModStatsUtils} from "./modStatsUtils";
import jStat from 'jstat'
import {
    is_ModPage_ModViewDataManager_PSMModData_Entry_Single_ProjectSearchId_Single_ReportedPeptideId,
    is_ModPage_ModViewDataManager_ScanModData_Entry_Single_ProjectSearchId_Single_ReportedPeptideId,
    ModPage_ModViewDataManager_PSMModData_Entry_Single_ProjectSearchId_Single_ReportedPeptideId,
    ModPage_ModViewDataManager_ScanModData_Entry_Single_ProjectSearchId_Single_ReportedPeptideId,
    ModViewDataManager
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewDataManager";
import {QValueCalculator} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/QValueCalculator";
import {ModViewDataUtilities} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewDataUtilities";
import {DataPageStateManager} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {
    ModView_VizOptionsData,
    ModView_VizOptionsData_SubPart_selectedStateObject
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modView_VizOptionsData";
import {limelight__Input_NumberOrString_ReturnNumber} from "page_js/common_all_pages/limelight__Input_NumberOrString_ReturnNumber";
import {PSMLocalizationReportDownloadGenerator} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/psmLocalizationReportDownloadGenerator";
import {StringDownloadUtils} from "page_js/data_pages/data_pages_common/downloadStringAsFile";
import {ModDataUtils} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modDataUtils";
import {
    removeFrom_DOM__ModPage_DataViz_Selections__Text_ClearLink__Root_Component,
    render_ModPage_DataViz_Selections__Text_ClearLink__Root_Component
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__jsx/ModPage_DataViz_Selections__Text_ClearLink__Root_Component";


// some defaults for the viz

const _VISUALIZATION_MAIN_CONSTANTS = {

    margin: { top: 60, right: 30, bottom: 78, left: 300 },
    widthDefs: { default: 1000, min: 3, max: 40 },
    heightDefs: { default: 500, min: 40, max: 40 },

    // legend defs
    legendHeight: 40,
    minLegendWidth: 400,

    // label defs
    labelFontSize: 14,               // font size (in pixels) of labels
    maxSearchLabelLength: 44        // max # of characters in a search label before truncation
} as const



export class ModViewDataVizRenderer_MultiSearch {

    /**
     * Call for each update
     *
     * @param dataPageStateManager_DataFrom_Server
     * @param vizOptionsData
     * @param modViewDataManager
     */
    static async renderDataViz(
        {
            dataPageStateManager_DataFrom_Server,
            vizOptionsData,
            modViewDataManager
        } : {
            dataPageStateManager_DataFrom_Server :  DataPageStateManager
            vizOptionsData: ModView_VizOptionsData
            modViewDataManager : ModViewDataManager
        }) {

        console.log('called renderDataViz()');

        // add a div for this viz to the page
        ModViewDataVizRenderer_MultiSearch._addDataVizContainerToPage();
        $('div#data-viz-container').show();

        $('div#data-viz-container').empty();
        $('div#data-viz-container').html('<h2>Loading data, please standby...</h2>');

        removeFrom_DOM__ModPage_DataViz_Selections__Text_ClearLink__Root_Component()

        $('div#data-table-container-container').hide();

        const modMap: Map<number, Map<number, number>> = await ModViewDataVizRenderer_MultiSearch.buildModMap({
            projectSearchIds:vizOptionsData.data.projectSearchIds,
            vizOptionsData,
            countsOverride : undefined,
            modViewDataManager,
        });

        $('div#data-viz-container').empty();

        console.log('got modmap:', modMap);

        if(modMap.size < 1) {
            ModViewDataVizRenderer_MultiSearch._addEmptyDataVizContainerToPage();
            return;
        }

        const modMatrix: INTERNAL__ModMatrix = ModViewDataVizRenderer_MultiSearch._getModMatrix({modMap, projectSearchIds: vizOptionsData.data.projectSearchIds});
        const sortedModMasses = Array.from( modMap.keys() ).sort( (a:number,b:number) => (a - b));

        let minCount = 0;
        if(vizOptionsData.data.dataTransformation !== undefined && vizOptionsData.data.dataTransformation !== 'none') {
            minCount = ModViewDataVizRenderer_MultiSearch._getMinPSMCount(modMatrix, vizOptionsData);
        }

        let maxCount = ModViewDataVizRenderer_MultiSearch._getMaxPSMCount(modMatrix, vizOptionsData);

        // make min and max count symmetrical if zscore is enabled
        if(vizOptionsData.data.dataTransformation !== undefined && vizOptionsData.data.dataTransformation !== 'none') {
            if (Math.abs(minCount) > maxCount) {
                maxCount = Math.abs(minCount);
            } else if (maxCount > Math.abs(minCount)) {
                minCount = -1 * maxCount;
            }
        }

        // The div for the data table to the page
        const dataTableContainer_DOM_Element = document.getElementById( "data-table-container" );
        if ( ! dataTableContainer_DOM_Element ) {
            const msg = "NO DOM element for id 'data-table-container'"
            console.warn(msg)
            throw Error(msg)
        }

        $('div#data-table-container-container').show();

        const width = ModViewDataVizRenderer_MultiSearch._getWidth({sortedModMasses});
        const height = ModViewDataVizRenderer_MultiSearch._getHeight({projectSearchIds:vizOptionsData.data.projectSearchIds});

        // set up our scales
        let xScale = d3.scaleBand()
            // @ts-ignore  -- Typescript types for '.domain(...)' is Array<string>
            .domain(sortedModMasses)
            .range([0,width]);

        let yScale = d3.scaleBand()
            // @ts-ignore  -- Typescript types for '.domain(...)' is Array<string>
            .domain(vizOptionsData.data.projectSearchIds)
            .range([0, height]);

        let colorScale;

        if(vizOptionsData.data.dataTransformation !== undefined && vizOptionsData.data.dataTransformation !== 'none') {

            if( vizOptionsData.data.dataTransformation === 'global-pvalue-bonf' || vizOptionsData.data.dataTransformation === 'global-qvalue-bh') {
                minCount = 0;
                maxCount = 1;

                colorScale = d3.scalePow()
                    .exponent(0.25)
                    .domain([1, 0.05, 0])
                    //  Typescript types for '.range(...)' is Array<number>
                    // @ts-ignore
                    .range(["white", "#57c4ad", "#006164"]);
            } else {

                colorScale = d3.scalePow()
                    .exponent(1.4)
                    .domain([minCount, minCount / 2, 0, maxCount / 2, maxCount])
                    //  Typescript types for '.range(...)' is Array<number>
                    // @ts-ignore
                    .range(["#db4325", "#eda247", "white", "#57c4ad", "#006164"]);
            }
        } else {
            //const logScale = d3.scaleSqrt().domain([minCount, maxCount]);
            //colorScale = d3.scaleSequential((d) => d3.interpolatePlasma(logScale(d)));

            colorScale = d3.scaleLinear()
                .domain([0, maxCount/2, maxCount])
                //  Typescript types for '.range(...)' is Array<number>
                // @ts-ignore
                .range(["white", "#57c4ad", "#006164"]);
        }

        // start drawing the actual viz
        let svg = d3.select("div#data-viz-container").append("svg")
            .attr("width", width + _VISUALIZATION_MAIN_CONSTANTS.margin.left + _VISUALIZATION_MAIN_CONSTANTS.margin.right)
            .attr("height", height + _VISUALIZATION_MAIN_CONSTANTS.margin.top + _VISUALIZATION_MAIN_CONSTANTS.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + _VISUALIZATION_MAIN_CONSTANTS.margin.left + "," + _VISUALIZATION_MAIN_CONSTANTS.margin.top + ")");

        // set up div to use for tooltips
        d3.select('#mod-viz-tooltip').remove();
        const tooltip = d3.select("body")
            .append("div")
            .attr("id", "mod-viz-tooltip")
            .style("width", "auto")
            .style("height", "auto")
            .style("background-color", "white")
            .style("position", "absolute")
            .style("z-index", "10")
            .style("border-style", "solid")
            .style("border-color", "gray")
            .style("border-width", "1px")
            .style("visibility", "hidden")
            .style("padding", "10px")
            .style("min-width", "450px")   //  set min-width so when display when scrolled to right past what would be right edge of view port when no scroll right.
            .style("max-width", "450px");  //  max-width

        // keep track of what the user has selected to see
        let selectedStateObject : ModView_VizOptionsData_SubPart_selectedStateObject = vizOptionsData.data.selectedStateObject;

        ModViewDataVizRenderer_MultiSearch._addColoredRectangles({
            svg,
            modMatrix,
            xScale,
            yScale,
            colorScale,
            sortedModMasses,
            projectSearchIds: vizOptionsData.data.projectSearchIds,
            width,
            height,
            tooltip,
            vizOptionsData,
            dataPageStateManager_DataFrom_Server
        });

        ModViewDataVizRenderer_MultiSearch._addSeparatorLines({ svg, projectSearchIds:vizOptionsData.data.projectSearchIds, yScale, width, height });

        ModViewDataVizRenderer_MultiSearch._addSearchLabels({
            svg,
            yScale,
            tooltip,
            sortedModMasses,
            selectedStateObject,
            dataPageStateManager_DataFrom_Server,
            modMap,
            vizOptionsData,
            modViewDataManager,
            dataTableContainer_DOM_Element:dataTableContainer_DOM_Element,
            colorScale,
        });

        ModViewDataVizRenderer_MultiSearch._addModLabels({ svg, sortedModMasses, xScale });
        ModViewDataVizRenderer_MultiSearch._addModLabelsHeader({ svg, width });
        ModViewDataVizRenderer_MultiSearch._addColorScaleLegend({
            svg,
            rectAreaHeight: height,
            colorScale,
            maxPsmCount: maxCount,
            minPsmCount: minCount,
            yScale,
            vizOptionsData
        });

        ModViewDataVizRenderer_MultiSearch._addDragHandlerToRects({
            svg,
            xScale,
            yScale,
            sortedModMasses,
            projectSearchIds:vizOptionsData.data.projectSearchIds,
            selectedStateObject,
            dataPageStateManager_DataFrom_Server,
            modMap,
            vizOptionsData,
            modViewDataManager,
            dataTableContainer_DOM_Element:dataTableContainer_DOM_Element,
            colorScale
        });

        ModViewDataVizRenderer_MultiSearch._addDataDownloadLinks({
            sortedModMasses,
            vizOptionsData,
            modViewDataManager,
            dataPageStateManager_DataFrom_Server
        })

        // show the data table under the vizualization by default
        ModViewDataTableRenderer_MultiSearch.renderDataTable({
            projectSearchIds:vizOptionsData.data.projectSearchIds,
            vizSelectedStateObject: selectedStateObject,
            dataPageStateManager_DataFrom_Server,
            modMap,
            sortedModMasses,
            modViewDataManager,
            dataTableContainer_DOM_Element:dataTableContainer_DOM_Element,
            vizOptionsData,
            colorScale
        });


        const clear_Clicked_Callback = () => {

            ModViewDataVizRenderer_MultiSearch._clear_Selection_Update_Graphic_AND_DataTable({
                svg,
                sortedModMasses,
                projectSearchIds:vizOptionsData.data.projectSearchIds,
                selectedStateObject,
                dataPageStateManager_DataFrom_Server,
                modMap,
                vizOptionsData,
                modViewDataManager,
                dataTableContainer_DOM_Element,
                colorScale
            })
        }

        render_ModPage_DataViz_Selections__Text_ClearLink__Root_Component({
            propsValue: {
                selectedStateObject,
                modMap,
                projectSearchIds:vizOptionsData.data.projectSearchIds,
                dataPageStateManager_DataFrom_Server,
                clear_Clicked_Callback
            }
        })
    }

    private static _addDataDownloadLinks(
        {
            sortedModMasses,
            vizOptionsData,
            modViewDataManager,
            dataPageStateManager_DataFrom_Server
        } : {
            sortedModMasses,
            vizOptionsData: ModView_VizOptionsData,
            modViewDataManager : ModViewDataManager,
            dataPageStateManager_DataFrom_Server:DataPageStateManager
        }) {
    	
    	//  Container
    	const $data_viz_container = $("div#data-viz-container");
    	
    	{
    		const html = "<span class=\"clickable\">[Download ZScore Report]</span>"
			const $html = $(html)
	
	        $html.click(function() {
	
	            // calculate and show stats
	            ModStatsUtils.downloadSignificantMods({
	                vizOptionsData,
	                sortedModMasses,
	                projectSearchIds: vizOptionsData.data.projectSearchIds,
	                modViewDataManager,
	                dataPageStateManager_DataFrom_Server
	            });
	
	        });
	        
	        const divContainerHTML = "<div></div>";
	        const $divContainer = $(divContainerHTML);
	        
	        $divContainer.append($html)
	
	        $data_viz_container.append($divContainer);
    	}
    	{
    		const html = "<span class=\"clickable\">[View ZScore Report]</span>"
			const $html = $(html)

			$html.click(function() {

				// calculate and show stats
				ModStatsUtils.viewSignificantMods({
					vizOptionsData,
					sortedModMasses,
					projectSearchIds: vizOptionsData.data.projectSearchIds,
					modViewDataManager,
					dataPageStateManager_DataFrom_Server
				});

			});

	        const divContainerHTML = "<div></div>";
	        const $divContainer = $(divContainerHTML);
	        
	        $divContainer.append($html)
	
	        $data_viz_container.append($divContainer);
    	}
    	{
    		const html = "<span class=\"clickable\">[View Replicate ZScore Report]</span>"
			const $html = $(html)

            if(vizOptionsData.data.projectSearchIds.length % 2 === 0) {
                $html.click(function() {

                    // calculate and show stats
                    ModStatsUtils.viewSignificantMods_CombineReps({
                        vizOptionsData,
                        sortedModMasses,
                        projectSearchIds: vizOptionsData.data.projectSearchIds,
                        modViewDataManager,
                        dataPageStateManager_DataFrom_Server
                    });

                });
			} else {
			                $html.click(function() {
                                alert("This feature is only available for an even number of searches.");
                            });
			}

    		const divContainerHTML = "<div></div>";
    		const $divContainer = $(divContainerHTML);

    		$divContainer.append($html)

    		$data_viz_container.append($divContainer);
    	}
    	{
    		const html = "<span class=\"clickable\">[Download Data Table]</span>"
			const $html = $(html)

			$html.click(function() {

				// calculate and show stats
				ModStatsUtils.downloadSummaryStatistics({
					vizOptionsData,
					sortedModMasses,
					projectSearchIds: vizOptionsData.data.projectSearchIds,
					modViewDataManager,
					dataPageStateManager_DataFrom_Server
				});

			});

	        const divContainerHTML = "<div></div>";
	        const $divContainer = $(divContainerHTML);
	        
	        $divContainer.append($html)
	
	        $data_viz_container.append($divContainer);
    	}
    	{
    		const html = "<span class=\"clickable\">[Download PSM Localization Report]</span>"
			const $html = $(html)

			$html.click(async function() {

				// calculate and show stats
				const textToDownload = await PSMLocalizationReportDownloadGenerator.getPsmLocalizationReportText({
					vizOptionsData,
					sortedModMasses,
					projectSearchIds: vizOptionsData.data.projectSearchIds,
					modViewDataManager,
					dataPageStateManager_DataFrom_Server
				});

				StringDownloadUtils.downloadStringAsFile( { stringToDownload : textToDownload, filename: 'psm_modification_localization_report.txt' } );
			});

    		const divContainerHTML = "<div></div>";
    		const $divContainer = $(divContainerHTML);

    		$divContainer.append($html)

    		$data_viz_container.append($divContainer);
    	}

    }

    /**
     * Remove existing and add new data viz container to page. Assumes jquery is loaded.
     */
    private static _addDataVizContainerToPage() {

        // blow existing viz away
        const $vizDiv = $("div#data-viz-container");
        if ( $vizDiv.length === 0 ) {
            const msg = "NO DOM element for selector 'div#data-viz-container'"
            console.warn(msg)
            throw Error(msg)
        }
        $vizDiv.empty();
    }

    private static _addEmptyDataVizContainerToPage() {

        // blow existing viz away
        const $vizDiv = $("div#data-viz-container");
        if ( $vizDiv.length === 0 ) {
            const msg = "NO DOM element for selector 'div#data-viz-container'"
            console.warn(msg)
            throw Error(msg)
        }
        $vizDiv.empty();

        $vizDiv.html('<span style=\"font-size:12pt;\">No modification data found for filters.</span>')
    }

    private static _addColorScaleLegend(
        {
            svg, rectAreaHeight, colorScale, minPsmCount, maxPsmCount, yScale, vizOptionsData
        } : {
            svg, rectAreaHeight, colorScale, minPsmCount, maxPsmCount, yScale,
            vizOptionsData: ModView_VizOptionsData
        }) {

        const psmQuantType = vizOptionsData.data.quantType === undefined || vizOptionsData.data.quantType === 'psms';
        const quantType = psmQuantType ? 'PSM' : 'Scan';
        let showInts;

        if((vizOptionsData.data.dataTransformation === undefined || vizOptionsData.data.dataTransformation === 'none') && vizOptionsData.data.psmQuant === 'counts') {
            showInts = true;
        } else {
            showInts = false;
        }

        let labelText = quantType;
        labelText += vizOptionsData.data.psmQuant === 'counts' ? ' Count' : ' Ratio'
        if(vizOptionsData.data.dataTransformation !== undefined && vizOptionsData.data.dataTransformation !== 'none') {
            labelText += " (" + ModViewDataVizRenderer_MultiSearch.getDataTransformationTypeString(vizOptionsData) + ")";
        }
        labelText += ' Color:';

        // create group element to hold legend
        let legendGroup = svg.append('g')
            .attr("transform", () => 'translate(0, ' + (rectAreaHeight + 10) + ')');

        // add legend text label
        legendGroup.append('text')
            .attr('class', 'project-label')
            .attr('x', -10)
            .attr('y', () => ( (yScale.bandwidth() / 2) + (_VISUALIZATION_MAIN_CONSTANTS.labelFontSize / 2) ))
            .attr("text-anchor", "end")
            .attr('font-size', _VISUALIZATION_MAIN_CONSTANTS.labelFontSize + 'px')
            .attr('font-family', 'sans-serif')
            .text(() => (labelText));

        // width of color scale bar
        const width = _VISUALIZATION_MAIN_CONSTANTS.minLegendWidth;

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
                .attr('height', _VISUALIZATION_MAIN_CONSTANTS.legendHeight)
                .attr('stroke', 'none')
                .attr('fill', () => (colorScale(psmCountForI)));
        }

        // add labels to scale bar
        let scaleBarLegendGroup = legendGroup.append('g')
            .attr("transform", () => 'translate(0, ' + _VISUALIZATION_MAIN_CONSTANTS.legendHeight + ')');


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
                .attr('y', () => (7 + _VISUALIZATION_MAIN_CONSTANTS.labelFontSize))
                .attr("text-anchor", "middle")
                .attr('font-size', _VISUALIZATION_MAIN_CONSTANTS.labelFontSize + 'px')
                .attr('font-family', 'sans-serif')
                .text((d,i) => (
                    showInts ? psmCountForX : psmCountForX.toExponential(2)
                ));

        }

    }

    private static _addDragHandlerToRects(
        {
            svg,
            xScale,
            yScale,
            sortedModMasses,
            projectSearchIds,
            selectedStateObject,
            dataPageStateManager_DataFrom_Server,
            modMap,
            vizOptionsData,
            modViewDataManager,
            dataTableContainer_DOM_Element,
            colorScale
        } : {
            svg,
            xScale,
            yScale,
            sortedModMasses,
            projectSearchIds : Array<number>
            selectedStateObject: ModView_VizOptionsData_SubPart_selectedStateObject,
            dataPageStateManager_DataFrom_Server : DataPageStateManager
            modMap,
            vizOptionsData: ModView_VizOptionsData,
            modViewDataManager : ModViewDataManager
            dataTableContainer_DOM_Element,
            colorScale
        }) {

        svg.select('#rect-group')
            .on( "mousedown", function( event_Param ) {

                // reset selected state object
                svg.select('#rect-group').selectAll('rect').style('opacity', '1.0');
                selectedStateObject.data__ModMass_Array_Map_Key_ProjectSearchId = new Map();

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

                    let rectParams = {
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

                if( !s.empty()) {

                    let rectParams = {
                        x       : s.attr( "x"),
                        y       : s.attr( "y"),
                        width   : s.attr( "width"),
                        height  : s.attr( "height")
                    };

                    // const event_Param__CtrlKey = event_Param.ctrlKey
                    // const event_Param__MetaKey = event_Param.metaKey

                    // update final opacity for viz
                    ModViewDataVizRenderer_MultiSearch._updateSelectedRectIndicators({
                        // event_Param__CtrlKey,
                        // event_Param__MetaKey,
                        svg,
                        sortedModMasses,
                        projectSearchIds,
                        xScale,
                        yScale,
                        rectParams,
                        selectedStateObject,
                    });

                    // remove selection frame
                    s.remove();

                    // update hash in URL to reflect user customization state
                    vizOptionsData.stateManagementObject.updateState();

                    // redraw the data table
                    ModViewDataTableRenderer_MultiSearch.renderDataTable( { projectSearchIds,
                        vizSelectedStateObject:selectedStateObject,
                        dataPageStateManager_DataFrom_Server,
                        modMap,
                        sortedModMasses,
                        modViewDataManager,
                        dataTableContainer_DOM_Element,
                        vizOptionsData,
                        colorScale
                    });

                    const clear_Clicked_Callback = () => {

                        ModViewDataVizRenderer_MultiSearch._clear_Selection_Update_Graphic_AND_DataTable({
                            svg,
                            sortedModMasses,
                            projectSearchIds,
                            selectedStateObject,
                            dataPageStateManager_DataFrom_Server,
                            modMap,
                            vizOptionsData,
                            modViewDataManager,
                            dataTableContainer_DOM_Element,
                            colorScale
                        })
                    }

                    render_ModPage_DataViz_Selections__Text_ClearLink__Root_Component({
                        propsValue: {
                            selectedStateObject,
                            modMap,
                            projectSearchIds,
                            dataPageStateManager_DataFrom_Server,
                            clear_Clicked_Callback
                        }
                    })
                }

            });

        d3.select("body")
            .on("keydown", function( event_Param ) {

                // capture escape key press, reset viz
                if( event_Param.keyCode === 27 ) {

                    ModViewDataVizRenderer_MultiSearch._clear_Selection_Update_Graphic_AND_DataTable({
                        svg,
                        sortedModMasses,
                        projectSearchIds,
                        selectedStateObject,
                        dataPageStateManager_DataFrom_Server,
                        modMap,
                        vizOptionsData,
                        modViewDataManager,
                        dataTableContainer_DOM_Element,
                        colorScale
                    })
                }
            });
    }


    private static _clear_Selection_Update_Graphic_AND_DataTable(

        {
            svg,
            sortedModMasses,
            projectSearchIds,
            selectedStateObject,
            dataPageStateManager_DataFrom_Server,
            modMap,
            vizOptionsData,
            modViewDataManager,
            dataTableContainer_DOM_Element,
            colorScale
        } : {
            svg,
            sortedModMasses,
            projectSearchIds : Array<number>
            selectedStateObject: ModView_VizOptionsData_SubPart_selectedStateObject,
            dataPageStateManager_DataFrom_Server : DataPageStateManager
            modMap: Map<number, Map<number, number>>
            vizOptionsData: ModView_VizOptionsData,
            modViewDataManager : ModViewDataManager
            dataTableContainer_DOM_Element,
            colorScale
        }
    ) {

        selectedStateObject.data__ModMass_Array_Map_Key_ProjectSearchId = new Map();

        // update hash in URL to reflect user customization state
        vizOptionsData.stateManagementObject.updateState();

        ModViewDataVizRenderer_MultiSearch._updateShownRectOpacities({ svg, selectedStateObject });

        // redraw the data table
        ModViewDataTableRenderer_MultiSearch.renderDataTable( {
            projectSearchIds,
            vizSelectedStateObject:selectedStateObject,
            dataPageStateManager_DataFrom_Server,
            modMap,
            sortedModMasses,
            modViewDataManager,
            dataTableContainer_DOM_Element,
            vizOptionsData,
            colorScale
        } );


        const clear_Clicked_Callback = () => {

            ModViewDataVizRenderer_MultiSearch._clear_Selection_Update_Graphic_AND_DataTable({
                svg,
                sortedModMasses,
                projectSearchIds,
                selectedStateObject,
                dataPageStateManager_DataFrom_Server,
                modMap,
                vizOptionsData,
                modViewDataManager,
                dataTableContainer_DOM_Element,
                colorScale
            })
        }

        render_ModPage_DataViz_Selections__Text_ClearLink__Root_Component({
            propsValue: {
                selectedStateObject,
                modMap,
                projectSearchIds,
                dataPageStateManager_DataFrom_Server,
                clear_Clicked_Callback
            }
        })
    }


    private static _updateShownRectOpacities({ svg, selectedStateObject } : {

        svg,
        selectedStateObject : ModView_VizOptionsData_SubPart_selectedStateObject
    }) {

        if( ( ! selectedStateObject.data__ModMass_Array_Map_Key_ProjectSearchId ) || selectedStateObject.data__ModMass_Array_Map_Key_ProjectSearchId.size < 1) {
            svg.select('#rect-group').selectAll('rect').style('opacity', '1.0');
        } else {

            svg.select('#rect-group').selectAll('rect').style('opacity', '0.35');

            for (const projectSearchId of selectedStateObject.data__ModMass_Array_Map_Key_ProjectSearchId.keys()) {
                for (const modMass of selectedStateObject.data__ModMass_Array_Map_Key_ProjectSearchId.get(projectSearchId)) {
                    const selector = 'rect.mod-mass-' + modMass + '.project-search-id-' + projectSearchId;
                    svg.select('#rect-group').select(selector).style('opacity', '1.0');
                }
            }
        }
    }

    private static _updateSelectedRectIndicators(
        {
            // event_Param__CtrlKey, event_Param__MetaKey,
            svg, sortedModMasses, projectSearchIds, xScale, yScale, rectParams, selectedStateObject
        } : {
            // event_Param__CtrlKey: any
            // event_Param__MetaKey: any
            svg, sortedModMasses,
            projectSearchIds : Array<number>,
            xScale, yScale, rectParams,
            selectedStateObject: ModView_VizOptionsData_SubPart_selectedStateObject
        }) {

        // reset selected state object
        svg.select('#rect-group').selectAll('rect').style('opacity', '0.35');

        // add opacity adjustment for selected items
        for( const modMass of sortedModMasses ) {

            if(ModViewDataVizRenderer_MultiSearch._rectangleContainsModMass({ modMass, xScale, rectParams })) {

                for (const projectSearchId of projectSearchIds) {

                    if (ModViewDataVizRenderer_MultiSearch._rectangleContainsProjectSearchId({ projectSearchId, yScale, rectParams })) {
                        const selector = 'rect.mod-mass-' + modMass + '.project-search-id-' + projectSearchId;
                        svg.select('#rect-group').select(selector).style('opacity', '1.0');

                        if(!(selectedStateObject.data__ModMass_Array_Map_Key_ProjectSearchId.has(projectSearchId))) {
                            selectedStateObject.data__ModMass_Array_Map_Key_ProjectSearchId.set(projectSearchId, []);
                        }

                        if(!(selectedStateObject.data__ModMass_Array_Map_Key_ProjectSearchId.get(projectSearchId).includes(modMass))) {
                            selectedStateObject.data__ModMass_Array_Map_Key_ProjectSearchId.get(projectSearchId).push(modMass);
                        }
                    }
                }
            }
        }
    }

    private static _rectangleContainsModMass({ modMass, xScale, rectParams }) {

        const modMassMinPosition = xScale(modMass);
        const modMassMaxPosition = modMassMinPosition + xScale.bandwidth();

        const rectLeft = parseInt(rectParams.x);
        const rectRight = rectLeft + parseInt(rectParams.width);

        if( modMassMinPosition <= rectRight && rectLeft <= modMassMaxPosition ) {
            return true;
        }

        return false;
    }

    private static _rectangleContainsProjectSearchId({ projectSearchId, yScale, rectParams }) {

        const psidMinPosition = yScale(projectSearchId);
        const psidMaxPosition = psidMinPosition + yScale.bandwidth();

        const rectTop = parseInt(rectParams.y);
        const rectBottom = rectTop + parseInt(rectParams.height);

        if( psidMinPosition <= rectBottom && rectTop <= psidMaxPosition ) {
            return true;
        }

        return false;
    }



    private static _getInterval({xScale}) {

        const spaceNeeded = _VISUALIZATION_MAIN_CONSTANTS.labelFontSize + 6;      // 6 assumes a margin of 3 px on either side of the label (move this to viz defs?)
        const bandwidth = xScale.bandwidth();

        return Math.ceil( spaceNeeded / bandwidth );
    }

    private static _addModLabelsHeader({ svg, width }) {

        const dx = Math.round( width / 2 );
        const dy = -1 * _VISUALIZATION_MAIN_CONSTANTS.labelFontSize - 30;

        svg.append('text')
            .attr("text-anchor", "middle")
            .attr('font-size', _VISUALIZATION_MAIN_CONSTANTS.labelFontSize + 'px')
            .attr('font-family', 'sans-serif')
            .attr("transform", (d,i) => 'translate(' + dx + ', ' + dy + ')')
            .text('Modification Mass');

    }

    private static _addModLabels({ svg, sortedModMasses, xScale }) {

        const interval = ModViewDataVizRenderer_MultiSearch._getInterval({xScale});

        svg.selectAll('.mod-label')
            .data(sortedModMasses)
            .enter()
            .append('text')
            .attr('class', 'mod-label')
            .attr("text-anchor", "start")
            .attr('font-size', _VISUALIZATION_MAIN_CONSTANTS.labelFontSize + 'px')
            .attr('font-family', 'sans-serif')
            .attr("transform", (d,i) => 'translate(' + (xScale(sortedModMasses[i]) + (xScale.bandwidth() / 2) + (_VISUALIZATION_MAIN_CONSTANTS.labelFontSize / 2)) + ', -10) rotate(-90)')
            .text((d,i) => ( i % interval == 0 ? sortedModMasses[i] : '' ));
    }

    private static _addSearchLabels(
        {
            svg,
            yScale,
            tooltip,
            sortedModMasses,
            selectedStateObject,
            dataPageStateManager_DataFrom_Server,
            modMap,
            vizOptionsData,
            modViewDataManager,
            dataTableContainer_DOM_Element,
            colorScale
        } : {
            svg,
            yScale,
            tooltip,
            sortedModMasses,
            selectedStateObject: ModView_VizOptionsData_SubPart_selectedStateObject,
            dataPageStateManager_DataFrom_Server : DataPageStateManager
            modMap: Map<number, Map<number, number>>
            vizOptionsData: ModView_VizOptionsData,
            modViewDataManager : ModViewDataManager
            dataTableContainer_DOM_Element,
            colorScale
        }) {

        const projectSearchIds = vizOptionsData.data.projectSearchIds;

        svg.selectAll('.project-label')
            .data(projectSearchIds)
            .enter()
            .append('text')
            .attr('class', 'search-label')
            .attr('x', -10)
            .attr('y', (d, i) => (yScale(projectSearchIds[i]) + (yScale.bandwidth() / 2) + (_VISUALIZATION_MAIN_CONSTANTS.labelFontSize / 2)))
            .attr("text-anchor", "end")
            .attr('font-size', _VISUALIZATION_MAIN_CONSTANTS.labelFontSize + 'px')
            .attr('font-family', 'sans-serif')
            .text((d,i) => (ModViewDataVizRenderer_MultiSearch._getTruncatedSearchNameForProjectSearchId({ projectSearchId:projectSearchIds[i], dataPageStateManager_DataFrom_Server})))
            .on("mousemove", function ( event_Param, dataElement_Param ) {
                const projectSearchId = limelight__Input_NumberOrString_ReturnNumber( dataElement_Param );
                ModViewDataVizRenderer_MultiSearch._showToolTip({
                    onSearchLabel_OnLeft: true, projectSearchId, tooltip, vizOptionsData, modMass : undefined, psmCount : undefined, dataPageStateManager_DataFrom_Server
                })
            })
            .on("mouseout", function ( event_Param, dataElement_Param ) {
                //d3.select(this).attr('fill', (d) => (colorScale(d.psmCount)))
                ModViewDataVizRenderer_MultiSearch._hideToolTip({tooltip});
            })
            .on("click", function( event_Param, dataElement_Param ) {

                const projectSearchId = Number.parseInt( dataElement_Param )

                //  Reset reset selected state object and then select
                svg.select('#rect-group').selectAll('rect').style('opacity', '1.0');
                selectedStateObject.data__ModMass_Array_Map_Key_ProjectSearchId = new Map();

                selectedStateObject.data__ModMass_Array_Map_Key_ProjectSearchId.set( projectSearchId, [...sortedModMasses] );

                // update hash in URL to reflect user customization state
                vizOptionsData.stateManagementObject.updateState();

                // update final opacity for viz
                ModViewDataVizRenderer_MultiSearch._updateShownRectOpacities({ svg, selectedStateObject })

                // redraw the data table
                ModViewDataTableRenderer_MultiSearch.renderDataTable({
                    projectSearchIds,
                    vizSelectedStateObject: selectedStateObject,
                    dataPageStateManager_DataFrom_Server,
                    modMap,
                    sortedModMasses,
                    modViewDataManager,
                    dataTableContainer_DOM_Element,
                    vizOptionsData,
                    colorScale
                });


                const clear_Clicked_Callback = () => {

                    ModViewDataVizRenderer_MultiSearch._clear_Selection_Update_Graphic_AND_DataTable({
                        svg,
                        sortedModMasses,
                        projectSearchIds:vizOptionsData.data.projectSearchIds,
                        selectedStateObject,
                        dataPageStateManager_DataFrom_Server,
                        modMap,
                        vizOptionsData,
                        modViewDataManager,
                        dataTableContainer_DOM_Element,
                        colorScale
                    })
                }

                render_ModPage_DataViz_Selections__Text_ClearLink__Root_Component({
                    propsValue: {
                        selectedStateObject,
                        modMap,
                        projectSearchIds:vizOptionsData.data.projectSearchIds,
                        dataPageStateManager_DataFrom_Server,
                        clear_Clicked_Callback
                    }
                })
            })
    }


    // static handleSearchLabelDrag(
    //     {
    //         event_Y_Value,  draggedObject
    //     } : {
    //         event_Y_Value: any
    //         draggedObject: Element
    //     }) {
    //
    //     d3.select(draggedObject).attr("y", event_Y_Value )
    // }
    //
    // static handleSearchLabelDragEnd(
    //     {
    //         event_Y_Value,
    //         yScale,
    //         dataPageStateManager_DataFrom_Server,
    //         labelFontSize,
    //         vizOptionsData,
    //         draggedProjectSearchId,
    //         draggedObject,
    //         modViewDataManager
    //     } : {
    //         event_Y_Value: any
    //         yScale,
    //         dataPageStateManager_DataFrom_Server : DataPageStateManager
    //         labelFontSize,
    //         vizOptionsData: ModView_VizOptionsData,
    //         draggedProjectSearchId,
    //         draggedObject,
    //         modViewDataManager : ModViewDataManager
    //     }) {
    //
    //     const projectSearchIds = vizOptionsData.data.projectSearchIds;
    //
    //     const newTextYStart = event_Y_Value;
    //
    //     const insertionData = ModViewDataVizRenderer_MultiSearch.getInsertionPointForProjectSearchId({
    //         yScale,
    //         projectSearchIds,
    //         newTextYStart,
    //         labelFontSize,
    //         draggedProjectSearchId
    //     });
    //
    //     if( insertionData.insertIndex === projectSearchIds.indexOf(draggedProjectSearchId) ) {
    //
    //         // do nothing, put label back in place
    //         d3.select(draggedObject)
    //             .attr("y", yScale(draggedProjectSearchId) + yScale.bandwidth() / 2 + labelFontSize / 2);
    //
    //
    //     } else {
    //
    //         let newProjectSearchIds =  [...projectSearchIds];
    //         newProjectSearchIds.splice(newProjectSearchIds.indexOf(draggedProjectSearchId), 1);
    //         newProjectSearchIds.splice(insertionData.insertIndex, 0, draggedProjectSearchId);
    //
    //         vizOptionsData.data.projectSearchIds = newProjectSearchIds;
    //
    //         // update hash in URL to reflect user customization state
    //         vizOptionsData.stateManagementObject.updateState();
    //
    //         ModViewDataVizRenderer_MultiSearch.renderDataViz({
    //             dataPageStateManager_DataFrom_Server,
    //             vizOptionsData,
    //             modViewDataManager
    //         });
    //     }
    // }
    //
    // static getInsertionPointForProjectSearchId({ yScale, projectSearchIds, newTextYStart, labelFontSize, draggedProjectSearchId }) {
    //
    //     let i = 0;
    //     let returnedObject : any = { };
    //
    //     const startOfDraggedElement =  yScale(draggedProjectSearchId) + (yScale.bandwidth() / 2) + (labelFontSize / 2);
    //
    //     /*
    //      * Project search IDs are already in order from top to bottom. So, we can just find the first one that the
    //      * dragged project search id is above and that is the point at which the dragged project search id should
    //      * be inserted
    //      */
    //     for( const projectSearchId of projectSearchIds ) {
    //
    //         const start = yScale(projectSearchId) + (yScale.bandwidth() / 2) + (labelFontSize / 2);
    //
    //         if( newTextYStart < start ) {
    //
    //             if( newTextYStart < startOfDraggedElement ) {   // we dragged up
    //
    //                 returnedObject.insertIndex = i;
    //                 returnedObject.insertBefore = projectSearchId;
    //
    //             } else {    // we dragged down
    //
    //                 returnedObject.insertIndex = i - 1;
    //                 returnedObject.insertBefore = projectSearchId;
    //
    //             }
    //
    //             return returnedObject;
    //         }
    //
    //         i++;
    //     }
    //
    //     // if we got here, then it should be inserted at the end
    //     returnedObject.insertIndex = projectSearchIds.length - 1;
    //     returnedObject.insertBefore = null;
    //
    //     return returnedObject;
    // }



    private static _getTruncatedSearchNameForProjectSearchId(
        {
            projectSearchId,
            dataPageStateManager_DataFrom_Server
        } : {
            projectSearchId : number
            dataPageStateManager_DataFrom_Server:DataPageStateManager
        }) {

        let searchName: string
        const searchShortName = ModDataUtils.getSearchShortNameForProjectSearchId({
            projectSearchId:projectSearchId,
            dataPageStateManager_DataFrom_Server
        });

        if(searchShortName && searchShortName.length > 1) {
            searchName = searchShortName;
        } else {
            searchName = ModViewDataVizRenderer_MultiSearch.getSearchNameForProjectSearchId({ projectSearchId, dataPageStateManager_DataFrom_Server });
        }

        if(searchName.length > _VISUALIZATION_MAIN_CONSTANTS.maxSearchLabelLength) {
            searchName = searchName.substring(0, _VISUALIZATION_MAIN_CONSTANTS.maxSearchLabelLength - 4) + '...';
        }

        return searchName;

    }

    static getSearchNameForProjectSearchId(
        {
            projectSearchId,
            dataPageStateManager_DataFrom_Server
        } : {
            projectSearchId : number
            dataPageStateManager_DataFrom_Server : DataPageStateManager
        }) {

        // const maxLength = 30;

		const searchNameObject = dataPageStateManager_DataFrom_Server.get_searchNames_AsMap().get( projectSearchId );
		if ( ! searchNameObject ) {
			const msg = "getSearchNameForProjectSearchId({ projectSearchId, searchDetailsBlockDataMgmtProcessing}): No entry in searchDetailsBlockDataMgmtProcessing._dataPageStateManager_DataFrom_Server.get_searchNames_AsMap() for projectSearchId: " + projectSearchId;
			console.warn( msg );
			throw Error( msg );
		}

		const searchName = searchNameObject.name;

        const searchId = ModViewDataVizRenderer_MultiSearch.getSearchIdForProjectSearchId({ projectSearchId, dataPageStateManager_DataFrom_Server })

        const retName = "(" + searchId + ") " + searchName;

        return retName;
    }

    static getSearchIdForProjectSearchId(
        {
            projectSearchId,
            dataPageStateManager_DataFrom_Server
        } : {
            projectSearchId : number
            dataPageStateManager_DataFrom_Server : DataPageStateManager
        }) {

        // const maxLength = 30;

		const searchNameObject = dataPageStateManager_DataFrom_Server.get_searchNames_AsMap().get( projectSearchId );
		if ( ! searchNameObject ) {
			const msg = "getSearchIdForProjectSearchId({ projectSearchId, searchDetailsBlockDataMgmtProcessing}): No entry in searchDetailsBlockDataMgmtProcessing._dataPageStateManager_DataFrom_Server.get_searchNames_AsMap() for projectSearchId: " + projectSearchId;
			console.warn( msg );
			throw Error( msg );
		}

        let searchId = searchNameObject.searchId;

        return searchId;
    }

    private static _getWidth({sortedModMasses}) {

        let width = _VISUALIZATION_MAIN_CONSTANTS.widthDefs.default + 0;

        // adjust width as necessary
        if(width < sortedModMasses.length * _VISUALIZATION_MAIN_CONSTANTS.widthDefs.min) {
            width = sortedModMasses.length * _VISUALIZATION_MAIN_CONSTANTS.widthDefs.min;
        } else if(width > sortedModMasses.length * _VISUALIZATION_MAIN_CONSTANTS.widthDefs.max) {
            width = sortedModMasses.length * _VISUALIZATION_MAIN_CONSTANTS.widthDefs.max;
        }

        if( width < _VISUALIZATION_MAIN_CONSTANTS.minLegendWidth ) {
            width = _VISUALIZATION_MAIN_CONSTANTS.minLegendWidth;
        }

        // adjust to be an integer multiple of the number of mod masses
        // done in an effort to avoid white space between rects
        width = Math.round( width / sortedModMasses.length) * sortedModMasses.length;

        return width;
    }

    private static _getHeight({projectSearchIds}) {

        let height = _VISUALIZATION_MAIN_CONSTANTS.heightDefs.default;

        // adjust width as necessary
        if(height < projectSearchIds.length * _VISUALIZATION_MAIN_CONSTANTS.heightDefs.min) {
            height = projectSearchIds.length * _VISUALIZATION_MAIN_CONSTANTS.heightDefs.min;
        } else if(height > projectSearchIds.length * _VISUALIZATION_MAIN_CONSTANTS.heightDefs.max) {
            height = projectSearchIds.length * _VISUALIZATION_MAIN_CONSTANTS.heightDefs.max;
        }

        return height;
    }

    private static _addColoredRectangles(
        {
            svg, modMatrix, xScale, yScale, colorScale, sortedModMasses, projectSearchIds, width, height, tooltip, vizOptionsData, dataPageStateManager_DataFrom_Server
        } : {
            svg,
            modMatrix: INTERNAL__ModMatrix
            xScale, yScale, colorScale,
            sortedModMasses: number[]
            projectSearchIds : Array<number>,
            width, height, tooltip,
            vizOptionsData: ModView_VizOptionsData,
            dataPageStateManager_DataFrom_Server:DataPageStateManager
        }) {

        // add a group to hold the data rects
        const svgRectGroup = svg.append('g')
            .attr('id', 'rect-group');

        // Create a group for each column in the data matrix and translate the group horizontally
        const svgColGroups = svgRectGroup.selectAll('.search-col-group')
            .data(modMatrix)
            .enter()
            .append('g')
            .attr('class', 'search-col-group')
            .attr('transform', (d, i) => ( 'translate(' + xScale(sortedModMasses[i]) + ',0)' )
            );

        svgColGroups.selectAll('rect')
            .data(function(d) { return d; })
            .enter()
            .append('rect')
            .attr('y', (d, i) => (yScale(projectSearchIds[i])))
            .attr('class', (d, i) => ('project-search-id-' + d.projectSearchId + ' mod-mass-' + d.modMass))
            .attr('width', xScale.bandwidth())
            .attr('height', yScale.bandwidth())
            .attr('stroke', 'none')
            .attr('fill', (d) => (colorScale(d.psmCount)))
            .on("mousemove", function ( event_Param, dataElement_Param ) {

                const projectSearchId = limelight__Input_NumberOrString_ReturnNumber( dataElement_Param.projectSearchId );

                ModViewDataVizRenderer_MultiSearch._showToolTip({
                    onSearchLabel_OnLeft: false,
                    projectSearchId,
                    modMass: dataElement_Param.modMass,
                    psmCount: dataElement_Param.psmCount,
                    tooltip,
                    vizOptionsData,
                    dataPageStateManager_DataFrom_Server
                })
            })
            .on("mouseleave", function ( event_Param, dataElement_Param ) {
                //d3.select(this).attr('fill', (d) => (colorScale(d.psmCount)))
                ModViewDataVizRenderer_MultiSearch._hideToolTip({tooltip});
            });

        // update opacity as necessary
        // if no selections are defined, everything is selected
        {
            const selectedStateObject = vizOptionsData.data.selectedStateObject;

            if (selectedStateObject.data__ModMass_Array_Map_Key_ProjectSearchId !== undefined || selectedStateObject.data__ModMass_Array_Map_Key_ProjectSearchId.size > 0) {
                ModViewDataVizRenderer_MultiSearch._updateShownRectOpacities({
                    svg,
                    selectedStateObject
                })
            }
        }
    }

    private static _showToolTip(
        {
            onSearchLabel_OnLeft, projectSearchId, modMass, psmCount, tooltip, vizOptionsData, dataPageStateManager_DataFrom_Server
        } : {
            onSearchLabel_OnLeft: boolean
            projectSearchId : number,
            modMass,
            psmCount,
            tooltip,
            vizOptionsData: ModView_VizOptionsData,
            dataPageStateManager_DataFrom_Server:DataPageStateManager
        }) {

        const psmQuantType = vizOptionsData.data.quantType === undefined || vizOptionsData.data.quantType === 'psms';
        const quantTypeString = psmQuantType ? 'PSM' : 'Scan';
        const showRatiosBoolean = (vizOptionsData.data.psmQuant === 'ratios');

        let labelText;

        if( vizOptionsData.data.dataTransformation === undefined || vizOptionsData.data.dataTransformation === 'none') {
            labelText = showRatiosBoolean ? "<p>" + quantTypeString + " Ratio:" : "<p>" + quantTypeString + " Count:";
        } else {
            switch(vizOptionsData.data.dataTransformation) {
                case 'per-mod-zscore':
                case 'global-zscore':
                    labelText = "Z-Score:";
                    break;
                case 'global-pvalue-bonf':
                    labelText = "P-Value:";
                    break;
                case 'global-qvalue-bh':
                    labelText = "Q-Value:";
                    break;
                case 'scaled-mean-diff':
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

        const searchDisplayString_NOT_SET = undefined

        let searchDisplayString = searchDisplayString_NOT_SET

        tooltip
            .style("left", tooltip_Left + "px")
            .style("top", tooltip_Top + "px")
            .style("visibility", "visible")
            .style("word-break", "break-word")
            .html( function() {

                let txt = "";

                if(modMass !== undefined && modMass !== null) {
                    txt += "<p>Mod mass: " + modMass + "</p>";
                }

                if(projectSearchId) {
                    const searchId = ModViewDataVizRenderer_MultiSearch.getSearchIdForProjectSearchId({
                        projectSearchId:projectSearchId,
                        dataPageStateManager_DataFrom_Server
                    });

                    const searchName = ModDataUtils.getSearchNameForProjectSearchId({
                        projectSearchId:projectSearchId,
                        dataPageStateManager_DataFrom_Server
                    });

                    const searchShortName = ModDataUtils.getSearchShortNameForProjectSearchId({
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

                if(psmCount !== undefined) {
                    if( (vizOptionsData.data.dataTransformation === undefined || vizOptionsData.data.dataTransformation === 'none') && !showRatiosBoolean ) {

                        txt += labelText + " " + ModViewDataVizRenderer_MultiSearch._numberWithCommas(psmCount) + "</p>";
                    } else {
                        txt += labelText + " " + psmCount.toExponential(2) + "</p>";
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

    private static _hideToolTip({ tooltip }) {
        tooltip
            .style("visibility", "hidden")
    }

    private static _addSeparatorLines({ svg, projectSearchIds, yScale, width, height }) {

        svg.select('#rect-group').selectAll('.separator-line')
            .data(projectSearchIds)
            .enter()
            .append('line')
            .attr('class', 'separator-line')
            .attr('x1', '0')
            .attr('y1', (d, i) => (yScale(projectSearchIds[i])))
            .attr('x2', width)
            .attr('y2', (d, i) => (yScale(projectSearchIds[i])))
            .attr('stroke', 'gray')
            .attr('stroke-width', '1')
            .attr('opacity','0.75');

        svg.append('line')
            .attr('class', 'separator-line')
            .attr('x1', '0')
            .attr('y1', height)
            .attr('x2', width)
            .attr('y2', height)
            .attr('stroke', 'gray')
            .attr('stroke-width', '1')
            .attr('opacity','0.75');

    }

    /**
     * Get the number of PSMs or scans that fall within the current min/max mod masses and protein position filters
     * for each projectSearchId
     *
     * @param projectSearchIds
     * @param vizOptionsData
     * @param countsOverride
     * @param modViewDataManager
     */
    static async getFilteredTotalCountForEachSearch(
        {
            projectSearchIds,
            vizOptionsData,
            modViewDataManager,
        } : {
            projectSearchIds : Array<number>,
            vizOptionsData: ModView_VizOptionsData,
            modViewDataManager:ModViewDataManager,
        }) : Promise<Map<number,number>> {

        console.log('called getFilteredDenominators');

        // a map of project search id => set of scan/psm id strings, used to calculate total unique PSMs or scans within our filters
        const denominatorMap:Map<number, Set<string>> = new Map();

        const psmQuantType = vizOptionsData.data.quantType === undefined || vizOptionsData.data.quantType === 'psms';

        for(const projectSearchId of projectSearchIds) {

            denominatorMap.set(projectSearchId, new Set());

            const countData = psmQuantType ? await modViewDataManager.getPSMModData(projectSearchId) : await modViewDataManager.getScanModData(projectSearchId);

            for (const reportedPeptideId of countData.data_Array_For_Single_ReportedPeptideId_Map_Key_ReportedPeptideId.keys() ) {

                const data_Array_For_Single_ReportedPeptideId = countData.data_Array_For_Single_ReportedPeptideId_Map_Key_ReportedPeptideId.get( reportedPeptideId )

                // will be a psm or a scan
                for (const item of data_Array_For_Single_ReportedPeptideId) {

                    let itemPsm: ModPage_ModViewDataManager_PSMModData_Entry_Single_ProjectSearchId_Single_ReportedPeptideId = undefined
                    let itemScan: ModPage_ModViewDataManager_ScanModData_Entry_Single_ProjectSearchId_Single_ReportedPeptideId = undefined

                    if ( is_ModPage_ModViewDataManager_PSMModData_Entry_Single_ProjectSearchId_Single_ReportedPeptideId(item) ) {
                        itemPsm = item
                    }
                    if ( is_ModPage_ModViewDataManager_ScanModData_Entry_Single_ProjectSearchId_Single_ReportedPeptideId(item) ) {
                        itemScan = item
                    }

                    // add in the variable mods
                    for (const modMass of item.variable) {

                        // enforce requested mod mass cutoffs
                        if (vizOptionsData.data.modMassCutoffMin !== undefined && modMass < vizOptionsData.data.modMassCutoffMin) {
                            continue;
                        }

                        if (vizOptionsData.data.modMassCutoffMax !== undefined && modMass > vizOptionsData.data.modMassCutoffMax) {
                            continue;
                        }

                        // decide if this psm should be included based on projectSearchId, mod mass and reported peptide id (and where that mod mass maps to a protein)
                        if(vizOptionsData.data.proteinPositionFilter !== undefined && !(await ModViewDataUtilities.variableModPositionInProteinPositionFilter({
                            projectSearchId,
                            modMass,
                            reportedPeptideId,
                            vizOptionsData,
                            modViewDataManager
                        }))) {
                            continue;
                        }

                        // get a unique id for this item
                        const uniqueId = psmQuantType ? itemPsm.psmId.toString() : (itemScan.scnm + '-' + itemScan.sfid);

                        denominatorMap.get(projectSearchId).add(uniqueId);
                    }

                    // add in the open mods
                    for (const modMass of item.open) {

                        // enforce requested mod mass cutoffs
                        if (vizOptionsData.data.modMassCutoffMin !== undefined && modMass < vizOptionsData.data.modMassCutoffMin) {
                            continue;
                        }

                        if (vizOptionsData.data.modMassCutoffMax !== undefined && modMass > vizOptionsData.data.modMassCutoffMax) {
                            continue;
                        }

                        // should this item be included for this mod mass given the protein position filters?

                        if(psmQuantType) {

                            // if it's a psm
                            if(!(await ModViewDataUtilities.openModPSMInProteinPositionFilter(
                                {
                                    projectSearchId,
                                    modMass,
                                    reportedPeptideId,
                                    vizOptionsData,
                                    modViewDataManager,
                                    psmId:itemPsm.psmId
                                }
                            ))) {
                                continue;
                            }

                        } else {

                            // if it's a scan
                            if(!(await ModViewDataUtilities.anyOpenModPSMInProteinPositionFilter(
                                {
                                    projectSearchId,
                                    modMass,
                                    reportedPeptideId,
                                    vizOptionsData,
                                    modViewDataManager,
                                    psmIds:itemScan.psmIds
                                }
                            ))) {
                                continue;
                            }

                        }

                        // get a unique id for this item
                        const uniqueId = psmQuantType ? itemPsm.psmId.toString() : (itemScan.scnm + '-' + itemScan.sfid);

                        denominatorMap.get(projectSearchId).add(uniqueId);
                    }

                }
            }
        }

        const denominatorCountMap:Map<number, number> = new Map();
        for(const [projectSearchId, idSet] of denominatorMap.entries()) {
            denominatorCountMap.set(projectSearchId, idSet.size);
        }

        console.log('Done with getFilteredDenominators()', denominatorCountMap)
        return denominatorCountMap;
    }


    /**
     * Get a map of:
     *
     * mod mass => project search id => count/ratio/zscore/pvalue/qvalue
     *
     * @param reportedPeptideModData
     * @param aminoAcidModStats
     * @param projectSearchIds
     * @param totalPSMCount
     * @param vizOptionsData
     * @param countsOverride
     * @param proteinPositionFilterStateManager
     * @param psmModData
     * @param scanModData
     */
    static async buildModMap(
        {
            projectSearchIds,
            vizOptionsData,
            countsOverride,
            modViewDataManager,
        } : {
            projectSearchIds : Array<number>,
            vizOptionsData: ModView_VizOptionsData,
            countsOverride,
            modViewDataManager:ModViewDataManager,
        }) : Promise<Map<number,Map<number,number>>> {

        const modMap_Intermediate__UniqueId_Set_Map_Key_ProjectSearchId_Map_Key_ModMass: Map<number,Map<number,Set<string>>> = new Map();

        console.log('called buildModMap');

        const psmQuantType = vizOptionsData.data.quantType === undefined || vizOptionsData.data.quantType === 'psms';

        //const countdata = psmQuantType ? modViewDataManager.getPSMModData() : scanModData;


        for(const projectSearchId of projectSearchIds) {

            const countData = psmQuantType ? await modViewDataManager.getPSMModData(projectSearchId) : await modViewDataManager.getScanModData(projectSearchId);

            for (const reportedPeptideId of countData.data_Array_For_Single_ReportedPeptideId_Map_Key_ReportedPeptideId.keys() ) {

                const data_Array_For_Single_ReportedPeptideId = countData.data_Array_For_Single_ReportedPeptideId_Map_Key_ReportedPeptideId.get( reportedPeptideId )

                // will be a psm or a scan
                for (const item of data_Array_For_Single_ReportedPeptideId) {

                    let itemPsm: ModPage_ModViewDataManager_PSMModData_Entry_Single_ProjectSearchId_Single_ReportedPeptideId = undefined
                    let itemScan: ModPage_ModViewDataManager_ScanModData_Entry_Single_ProjectSearchId_Single_ReportedPeptideId = undefined

                    if ( is_ModPage_ModViewDataManager_PSMModData_Entry_Single_ProjectSearchId_Single_ReportedPeptideId(item) ) {
                        itemPsm = item
                    }
                    if ( is_ModPage_ModViewDataManager_ScanModData_Entry_Single_ProjectSearchId_Single_ReportedPeptideId(item) ) {
                        itemScan = item
                    }

                    // add in the variable mods
                    for (const modMass of item.variable) {

                        // enforce requested mod mass cutoffs
                        if (vizOptionsData.data.modMassCutoffMin !== undefined && modMass < vizOptionsData.data.modMassCutoffMin) {
                            continue;
                        }

                        if (vizOptionsData.data.modMassCutoffMax !== undefined && modMass > vizOptionsData.data.modMassCutoffMax) {
                            continue;
                        }

                        // decide if this psm should be included based on projectSearchId, mod mass and reported peptide id (and where that mod mass maps to a protein)
                        if(vizOptionsData.data.proteinPositionFilter !== undefined && !(await ModViewDataUtilities.variableModPositionInProteinPositionFilter({
                            projectSearchId,
                            modMass,
                            reportedPeptideId,
                            vizOptionsData,
                            modViewDataManager
                        }))) {
                            continue;
                        }


                        if(!modMap_Intermediate__UniqueId_Set_Map_Key_ProjectSearchId_Map_Key_ModMass.has(modMass)) {
                            modMap_Intermediate__UniqueId_Set_Map_Key_ProjectSearchId_Map_Key_ModMass.set(modMass, new Map());
                        }

                        if(!modMap_Intermediate__UniqueId_Set_Map_Key_ProjectSearchId_Map_Key_ModMass.get(modMass).has(projectSearchId)) {
                            modMap_Intermediate__UniqueId_Set_Map_Key_ProjectSearchId_Map_Key_ModMass.get(modMass).set(projectSearchId, new Set());
                        }

                        // get a unique id for this item
                        const uniqueId = psmQuantType ? itemPsm.psmId.toString() : (itemScan.scnm + '-' + itemScan.sfid);

                        modMap_Intermediate__UniqueId_Set_Map_Key_ProjectSearchId_Map_Key_ModMass.get(modMass).get(projectSearchId).add(uniqueId);
                    }

                    // add in the open mods
                    for (const modMass of item.open) {

                        // enforce requested mod mass cutoffs
                        if (vizOptionsData.data.modMassCutoffMin !== undefined && modMass < vizOptionsData.data.modMassCutoffMin) {
                            continue;
                        }

                        if (vizOptionsData.data.modMassCutoffMax !== undefined && modMass > vizOptionsData.data.modMassCutoffMax) {
                            continue;
                        }

                        // should this item be included based on the option to exclude unlocalized open mods?
                        if (vizOptionsData.data.excludeUnlocalizedOpenMods !== undefined && vizOptionsData.data.excludeUnlocalizedOpenMods) {

                            if (psmQuantType) {
                                // if it's a psm
                                if (await ModViewDataUtilities.openModPSMIsUnlocalized(
                                    {
                                        projectSearchId,
                                        modMass,
                                        reportedPeptideId,
                                        modViewDataManager,
                                        psmId: itemPsm.psmId
                                    }
                                )) {
                                    continue;
                                }

                            } else {

                                // if it's a scan
                                if (await ModViewDataUtilities.allOpenModPSMsAreUnlocalized(
                                    {
                                        projectSearchId,
                                        modMass,
                                        reportedPeptideId,
                                        modViewDataManager,
                                        psmIds: itemScan.psmIds
                                    }
                                )) {
                                    continue;
                                }

                            }
                        }

                        // should this item be included for this mod mass given the protein position filters?

                        if(psmQuantType) {

                            // if it's a psm
                            if(!(await ModViewDataUtilities.openModPSMInProteinPositionFilter(
                                {
                                    projectSearchId,
                                    modMass,
                                    reportedPeptideId,
                                    vizOptionsData,
                                    modViewDataManager,
                                    psmId:itemPsm.psmId
                                }
                            ))) {
                               continue;
                            }

                        } else {

                            // if it's a scan
                            if(!(await ModViewDataUtilities.anyOpenModPSMInProteinPositionFilter(
                                {
                                    projectSearchId,
                                    modMass,
                                    reportedPeptideId,
                                    vizOptionsData,
                                    modViewDataManager,
                                    psmIds:itemScan.psmIds
                                }
                            ))) {
                                continue;
                            }

                        }

                        if(!modMap_Intermediate__UniqueId_Set_Map_Key_ProjectSearchId_Map_Key_ModMass.has(modMass)) {
                            modMap_Intermediate__UniqueId_Set_Map_Key_ProjectSearchId_Map_Key_ModMass.set(modMass, new Map());
                        }

                        if(!modMap_Intermediate__UniqueId_Set_Map_Key_ProjectSearchId_Map_Key_ModMass.get(modMass).has(projectSearchId)) {
                            modMap_Intermediate__UniqueId_Set_Map_Key_ProjectSearchId_Map_Key_ModMass.get(modMass).set(projectSearchId, new Set());
                        }

                        // get a unique id for this item
                        const uniqueId = psmQuantType ? itemPsm.psmId.toString() : (itemScan.scnm + '-' + itemScan.sfid);

                        // use sets to ensure we're not double counting psms or scans for a mod mass
                        modMap_Intermediate__UniqueId_Set_Map_Key_ProjectSearchId_Map_Key_ModMass.get(modMass).get(projectSearchId).add(uniqueId);
                    }

                }
            }
        }

        const modMap_Final__Value_Map_Key_ProjectSearchId_Map_Key_ModMass: Map<number,Map<number,number>> = new Map();

        // convert to a map of counts/ratios
        const denominatorMap:Map<number, number> = new Map();

        for(const [modMass, searchCountMap] of modMap_Intermediate__UniqueId_Set_Map_Key_ProjectSearchId_Map_Key_ModMass.entries()) {

            modMap_Final__Value_Map_Key_ProjectSearchId_Map_Key_ModMass.set(modMass, new Map())

            const modMap_Final__Value_Map_Key_ProjectSearchId = modMap_Final__Value_Map_Key_ProjectSearchId_Map_Key_ModMass.get(modMass)

            for(const [projectSearchId, idSet] of searchCountMap.entries()) {

                let count = idSet.size;

                if( vizOptionsData.data.psmQuant === 'ratios' && !countsOverride ) {

                    if(!denominatorMap.has(projectSearchId)) {
                        denominatorMap.set(projectSearchId, (psmQuantType ? await modViewDataManager.getTotalPSMCount(projectSearchId) : await modViewDataManager.getTotalScanCount(projectSearchId)));
                    }

                    const ratioDenominator = denominatorMap.get(projectSearchId);
                    count = count / ratioDenominator;
                }

                modMap_Final__Value_Map_Key_ProjectSearchId.set(projectSearchId, count);    // replace the set w/ the count
            }
        }

        // add in zero for missing values
        // assumes if a mod mass isn't present in a search then the count is 0 for that mod mass in that search
        // this is needed for subsequent z-score and p-value calculations
        for(const [modMass, searchCountMap] of modMap_Final__Value_Map_Key_ProjectSearchId_Map_Key_ModMass.entries()) {
            for(const projectSearchId of projectSearchIds) {
                if (!(modMap_Final__Value_Map_Key_ProjectSearchId_Map_Key_ModMass.get(modMass).has(projectSearchId))) {
                    modMap_Final__Value_Map_Key_ProjectSearchId_Map_Key_ModMass.get(modMass).set(projectSearchId, 0);
                }
            }
        }


        if(vizOptionsData.data.dataTransformation !== undefined && vizOptionsData.data.dataTransformation !== 'none') {
            // convert the data into zscores
            ModViewDataVizRenderer_MultiSearch._convertModMapToDataTransformation(modMap_Final__Value_Map_Key_ProjectSearchId_Map_Key_ModMass, vizOptionsData);
        }

        console.log('Done with buildModMap()', modMap_Final__Value_Map_Key_ProjectSearchId_Map_Key_ModMass)
        return modMap_Final__Value_Map_Key_ProjectSearchId_Map_Key_ModMass;
    }

    private static _convertModMapToDataTransformation(modMap: Map<number,Map<number,number>>, vizOptionsData: ModView_VizOptionsData) {

        if(vizOptionsData.data.dataTransformation === undefined) {
            return;
        }

        switch(vizOptionsData.data.dataTransformation) {
            case 'per-mod-zscore':
                ModViewDataVizRenderer_MultiSearch.convertModMapToPerModZScore(modMap);
                break;

            case 'global-zscore':
                ModViewDataVizRenderer_MultiSearch.convertModMapToGlobalZScore(modMap);
                break;

            case 'global-pvalue-bonf':
                ModViewDataVizRenderer_MultiSearch.convertModMapToGlobalPValue(modMap);
                break;

            case 'scaled-mean-diff':
                ModViewDataVizRenderer_MultiSearch._convertModMapToPerModScaledMeanDelta(modMap);
                break;

            case 'global-qvalue-bh':
                ModViewDataVizRenderer_MultiSearch.convertModMapToGlobalQValue(modMap);
                break;
        }

    }

    static getDataTransformationTypeString(vizOptionsData: ModView_VizOptionsData) {
        if(vizOptionsData.data.dataTransformation === undefined) {
            return 'None';
        }

        switch(vizOptionsData.data.dataTransformation) {
            case 'per-mod-zscore':
                return "Per-Mod Z-Score"
                break;

            case 'global-zscore':
                return "Global Z-Score"
                break;

            case 'global-pvalue-bonf':
                return "Global P-Value"
                break;

            case 'global-qvalue-bh':
                return "Q-Value"
                break;

            case 'scaled-mean-diff':
                return "Scaled Mean Diff."
                break;
        }
    }

    private static _convertModMapToPerModScaledMeanDelta(modMap) {
        for(const [modMass, searchCountMap] of modMap) {
            const mean = ModViewDataVizRenderer_MultiSearch.getMeanForModMass({modMap, modMass});

            for (const [projectSearchId, count] of searchCountMap) {
                modMap.get(modMass).set(projectSearchId, ModViewDataVizRenderer_MultiSearch.getScaledMeanDelta({ modMap, modMass, mean, projectSearchId }));
            }
        }
    }

    static convertModMapToPerModZScore(modMap) {
        for(const [modMass, searchCountMap] of modMap) {
            const mean = ModViewDataVizRenderer_MultiSearch.getMeanForModMass({modMap, modMass});
            const standardDeviation = ModViewDataVizRenderer_MultiSearch.getStandardDeviationForModMass({ modMap, modMass, mean });

            for (const [projectSearchId, count] of searchCountMap) {
                modMap.get(modMass).set(projectSearchId, ModViewDataVizRenderer_MultiSearch.getZScoreForModMassProjectSearchId({ modMap, modMass, mean, standardDeviation, projectSearchId }));
            }
        }
    }

    static convertModMapToGlobalZScore(modMap) {

        const globalMean = ModViewDataVizRenderer_MultiSearch.getGlobalMean(modMap);
        const globalStandardDeviation = ModViewDataVizRenderer_MultiSearch.getGlobalStandardDeviation(modMap, globalMean);

        for(const [modMass, searchCountMap] of modMap) {
            for (const [projectSearchId, count] of searchCountMap) {
                modMap.get(modMass).set(projectSearchId, ModViewDataVizRenderer_MultiSearch.getZScoreForModMassProjectSearchId({ modMap, modMass, mean:globalMean, standardDeviation:globalStandardDeviation, projectSearchId }));
            }
        }
    }

    /**
     * Get Bonferroni corrected p-values from global zscores
     * @param modMap
     */
    static convertModMapToGlobalPValue(modMap) {
        ModViewDataVizRenderer_MultiSearch.convertModMapToGlobalZScore(modMap);
        let numTests = 0;

        for(const [modMass, searchCountMap] of modMap) {
            for (const [projectSearchId, count] of searchCountMap) {
                numTests++;
                modMap.get(modMass).set(projectSearchId, jStat.ztest( count, 2));
            }
        }

        for(const [modMass, searchCountMap] of modMap) {
            for (const [projectSearchId, count] of searchCountMap) {
                const correctedPvalue = (count * numTests) > 1 ? 1 : (count * numTests);
                modMap.get(modMass).set(projectSearchId, correctedPvalue);
            }
        }
    }

    /**
     * Get Benjamini-Hochberg q-values from global zscores
     * @param modMap
     */
    static convertModMapToGlobalQValue(modMap) {
        ModViewDataVizRenderer_MultiSearch.convertModMapToGlobalZScore(modMap);
        const pValueArray = new Array<number>();

        for(const [modMass, searchCountMap] of modMap) {
            for (const [projectSearchId, count] of searchCountMap) {
                const pvalue = jStat.ztest( count, 2);
                modMap.get(modMass).set(projectSearchId, pvalue);
                pValueArray.push(pvalue)
            }
        }

        const qvalueCalculator = new QValueCalculator({pValueArray});

        for(const [modMass, searchCountMap] of modMap) {
            for (const [projectSearchId, count] of searchCountMap) {
                const pvalue = modMap.get(modMass).get(projectSearchId);
                modMap.get(modMass).set(projectSearchId, qvalueCalculator.getQvalueForPValue(pvalue));
            }
        }

    }

    static getGlobalMean(modMap) {
        let n = 0;
        let sum = 0;

        for(const [modMass, searchCountMap] of modMap) {
            for (const [projectSearchId, count] of searchCountMap) {
                n++;
                sum += count;
            }
        }

        return (n > 0 ? sum / n : 0);
    }

    static getGlobalStandardDeviation(modMap, mean) {

        let n = 0;
        let sum = 0;

        for(const [modMass, searchCountMap] of modMap) {
            for (const [projectSearchId, count] of searchCountMap) {
                n++;
                sum += (count - mean) ** 2;
            }
        }

        if(n === 0) {
            return 0;
        }

        sum = sum / n;
        return Math.sqrt(sum);

    }

    static getZScoreForModMassProjectSearchId({modMap, modMass, mean, standardDeviation, projectSearchId}) {
        if(!(modMap.has(modMass))) {
            return 0;
        }

        const count = modMap.get(modMass).get(projectSearchId);
        return (count - mean) / standardDeviation;
    }

    static getScaledMeanDelta({modMap, modMass, mean, projectSearchId}) {
        if(!(modMap.has(modMass))) {
            return 0;
        }

        const count = modMap.get(modMass).get(projectSearchId);
        return (count - mean) / mean;
    }

    static getStandardDeviationForModMass({modMap, modMass, mean}) {
        let sum = 0;

        if(!(modMap.has(modMass))) {
            return 0;
        }

        const searchCountMap = modMap.get(modMass);
        for(const [projectSearchId, count] of searchCountMap) {
            sum += (count - mean) ** 2;
        }

        sum = sum / searchCountMap.size;
        return Math.sqrt(sum);
    }

    static getMeanForModMass({modMap, modMass}) {
        let sum = 0;

        if(!(modMap.has(modMass))) {
            return 0;
        }

        const searchCountMap = modMap.get(modMass);
        for(const [projectSearchId, count] of searchCountMap) {
            sum += count;
        }

        return sum / searchCountMap.size;
    }

    // static getMinForModMass({modMap, modMass}) {
    //     let min = 100000000;
    //
    //     if(!(modMap.has(modMass))) {
    //         return 0;
    //     }
    //
    //     const searchCountMap = modMap.get(modMass);
    //     for(const [projectSearchId, count] of searchCountMap) {
    //         if(count < min) {
    //             min = count;
    //         }
    //     }
    //
    //     return min;
    // }
    // static getMaxForModMass({modMap, modMass}) {
    //     let max = 0;
    //
    //     if(!(modMap.has(modMass))) {
    //         return 0;
    //     }
    //
    //     const searchCountMap = modMap.get(modMass);
    //     for(const [projectSearchId, count] of searchCountMap) {
    //         if(count > max) {
    //             max = count;
    //         }
    //     }
    //
    //     return max;
    // }

    private static _getMinPSMCount(modMatrix: INTERNAL__ModMatrix, vizOptionsData: ModView_VizOptionsData) {

        let min = 0;

        for(let i = 0; i < modMatrix.length; i++ ) {
            for(let k = 0; k < modMatrix[i].length; k++) {
                if(modMatrix[i][k]['psmCount'] < min) {
                    min = modMatrix[i][k]['psmCount'];
                }
            }
        }

        return min;
    }

    private static _getMaxPSMCount(modMatrix: INTERNAL__ModMatrix, vizOptionsData: ModView_VizOptionsData) {

        if(!vizOptionsData.data.showZScore) {
            if (vizOptionsData.data.psmQuant === 'ratios' && vizOptionsData.data.colorCutoffRatio !== undefined) {
                return vizOptionsData.data.colorCutoffRatio;
            }

            if (vizOptionsData.data.psmQuant === 'counts' && vizOptionsData.data.colorCutoffCount !== undefined) {
                return vizOptionsData.data.colorCutoffCount;
            }
        }

        let max = 0;

        for(let i = 0; i < modMatrix.length; i++ ) {
            for(let k = 0; k < modMatrix[i].length; k++) {
                if(modMatrix[i][k]['psmCount'] > max) {
                    max = modMatrix[i][k]['psmCount'];
                }
            }
        }

        return max;
    }

    private static _getModMatrix({modMap, projectSearchIds}: { modMap: Map<number, Map<number, number>>, projectSearchIds: Array<number>}) : INTERNAL__ModMatrix {

        const modMatrix: INTERNAL__ModMatrix /* Array<Array<INTERNAL__ModMatrix_Entry>> */ = Array( modMap.size );

        const sortedModMasses = Array.from( modMap.keys() ).sort( (a:number,b:number) => (a - b));

        let i = 0;
        for(const modMass of sortedModMasses) {

            modMatrix[i] = Array(projectSearchIds.length);

            let k = 0;
            for(const projectSearchId of projectSearchIds) {

                if(modMap.has(modMass) && modMap.get(modMass).has(projectSearchId)) {
                    modMatrix[i][k] = {
                        psmCount: modMap.get(modMass).get(projectSearchId),
                        projectSearchId: projectSearchId,
                        modMass: modMass,
                        searchIndex: k,
                        modMassIndex: i
                    };
                } else {
                    modMatrix[i][k] = {
                        psmCount: 0,
                        projectSearchId: projectSearchId,
                        modMass: modMass,
                        searchIndex: k,
                        modMassIndex: i
                    };
                }

                k++;
            }

            i++;
        }

        return modMatrix;
    }

    // static shouldReportedPeptideBeIncludedForModMass({ projectSearchId, proteinPositionFilterStateManager, reportedPeptideModData, modMass, reportedPeptideId }) {
    //
    //     if( modMass in reportedPeptideModData[projectSearchId][reportedPeptideId]) {
    //
    //         if( ( ! proteinPositionFilterStateManager ) || proteinPositionFilterStateManager.getNoProteinsSelected()) {
    //
    //             return true;
    //
    //         } else {
    //
    //             for(const proteinId of Object.keys(reportedPeptideModData[projectSearchId][reportedPeptideId][modMass]['proteins'])) {
    //
    //                 if(proteinPositionFilterStateManager.getIsAllSelected({proteinId})) {
    //
    //                     return true;
    //
    //                 } else if(proteinPositionFilterStateManager.getIsProteinSelected({proteinId})) {
    //
    //                     for(const position of reportedPeptideModData[projectSearchId][reportedPeptideId][modMass]['proteins'][proteinId]) {
    //
    //                         if(proteinPositionFilterStateManager.getIsProteinPositionSelected({ proteinId, position })) {
    //
    //                             return true;
    //
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     }
    //
    //     return false;
    // }


    // static getPsmCountForReportedPeptide({ reportedPeptideId, projectSearchId, aminoAcidModStats }) {
    //
    //     if(!(projectSearchId in aminoAcidModStats)) {
    //         return 0;
    //     }
    //
    //     if(!(reportedPeptideId in aminoAcidModStats[projectSearchId])) {
    //         return 0;
    //     }
    //
    //     return aminoAcidModStats[projectSearchId][reportedPeptideId]['psmCount'];
    // }

    private static _numberWithCommas(x) { return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); }


}



class INTERNAL__ModMatrix_Entry {
    psmCount: number
    projectSearchId: number
    modMass: number
    searchIndex: number
    modMassIndex: number
}

type INTERNAL__ModMatrix = Array<Array<INTERNAL__ModMatrix_Entry>>




