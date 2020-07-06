"use strict";

import { Handlebars } from './mod_ViewPage_Import_Handlebars_AndTemplates_Generic'

import * as d3 from "d3";
import * as Drag from 'd3-drag';
import {ModViewDataTableRenderer_MultiSearch} from 'page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewDataTableRenderer_MultiSearch';
import {ModStatsUtils} from "./modStatsUtils";

export class ModViewDataVizRenderer_MultiSearch {

    static renderDataViz({
                             reportedPeptideModData,
                             proteinPositionResidues,
                             totalPSMCount,
                             aminoAcidModStats,
                             proteinData,
                             proteinPositionFilterStateManager,
                             searchDetailsBlockDataMgmtProcessing,
                             dataPageStateManager_DataFrom_Server,
                             vizOptionsData
    }) {

        const modMap = ModViewDataVizRenderer_MultiSearch.buildModMap({
            reportedPeptideModData, aminoAcidModStats, projectSearchIds:vizOptionsData.data.projectSearchIds, totalPSMCount, vizOptionsData, proteinPositionFilterStateManager, countsOverride : undefined
        });
        const modMatrix = ModViewDataVizRenderer_MultiSearch.getModMatrix({modMap, projectSearchIds: vizOptionsData.data.projectSearchIds});
        const sortedModMasses = Object.keys(modMap).map(Number).sort( (a,b) => ( a - b));
        const maxPsmCount = ModViewDataVizRenderer_MultiSearch.getMaxPSMCount(modMatrix, vizOptionsData);

        // add a div for this viz to the page
        ModViewDataVizRenderer_MultiSearch.addDataVizContainerToPage();

        // some defaults for the viz
        const margin = {top: 60, right: 30, bottom: 78, left: 300};
        const widthDefs = {default:1000, min: 3, max: 40};
        const heightDefs = {default:500, min:40, max:40};

        // legend defs
        const legendHeight = 40;
        const minLegendWidth = 400;

        // label defs
        const labelFontSize = 14;               // font size (in pixels) of labels
        const maxSearchLabelLength = 44;        // max # of characters in a search label before truncation

        const width = ModViewDataVizRenderer_MultiSearch.getWidth({sortedModMasses, widthDefs, minLegendWidth});
        const height = ModViewDataVizRenderer_MultiSearch.getHeight({projectSearchIds:vizOptionsData.data.projectSearchIds, heightDefs});

        // set up our scales
        let xScale = d3.scaleBand()
            .domain(sortedModMasses)
            .range([0,width]);

        let yScale = d3.scaleBand()
            .domain(vizOptionsData.data.projectSearchIds)
            .range([0, height]);

        // let colorScale = d3.scaleSqrt()
        //     .domain([0, maxPsmCount])
        //     .range([d3.rgb(255,255,255), d3.rgb(255,0,0)]);

        // const colorScale = d3.scaleSequential(d3.interpolateYlGn)
        //     .domain([0, maxPsmCount])

        const logScale = d3.scaleSqrt()
            .domain([0, maxPsmCount])

        const colorScale = d3.scaleSequential(
            (d) => d3.interpolatePlasma(logScale(d))
        )

        // start drawing the actual viz
        let svg = d3.select("div#data-viz-container").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

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
            .style("max-width", "250px");

        // keep track of what the user has selected to see
        let selectedStateObject = vizOptionsData.data.selectedStateObject;

        ModViewDataVizRenderer_MultiSearch.addColoredRectangles({
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
            searchDetailsBlockDataMgmtProcessing,
            vizOptionsData
        });

        ModViewDataVizRenderer_MultiSearch.addSeparatorLines({ svg, projectSearchIds:vizOptionsData.data.projectSearchIds, yScale, width, height });

        ModViewDataVizRenderer_MultiSearch.addSearchLabels({
            svg,
            yScale,
            searchDetailsBlockDataMgmtProcessing,
            maxSearchLabelLength,
            labelFontSize,
            tooltip,
            sortedModMasses,
            selectedStateObject,
            reportedPeptideModData,
            proteinPositionResidues,
            totalPSMCount,
            aminoAcidModStats,
            proteinData,
            proteinPositionFilterStateManager,
            dataPageStateManager_DataFrom_Server,
            modMap,
            vizOptionsData
        });

        ModViewDataVizRenderer_MultiSearch.addModLabels({ svg, sortedModMasses, xScale, labelFontSize });
        ModViewDataVizRenderer_MultiSearch.addModLabelsHeader({ svg, width, labelFontSize });
        ModViewDataVizRenderer_MultiSearch.addColorScaleLegend({ svg, rectAreaHeight: height, colorScale, minPSMCount: 0, maxPsmCount, minLegendWidth, legendHeight, yScale, labelFontSize, vizOptionsData });

        ModViewDataVizRenderer_MultiSearch.addDragHandlerToRects({
            svg,
            xScale,
            yScale,
            sortedModMasses,
            projectSearchIds:vizOptionsData.data.projectSearchIds,
            selectedStateObject,
            reportedPeptideModData,
            proteinPositionResidues,
            totalPSMCount,
            aminoAcidModStats,
            proteinData,
            proteinPositionFilterStateManager,
            searchDetailsBlockDataMgmtProcessing,
            dataPageStateManager_DataFrom_Server,
            modMap,
            vizOptionsData
        });

        ModViewDataVizRenderer_MultiSearch.addDataDownloadLinks({
            reportedPeptideModData,
            totalPSMCount,
            aminoAcidModStats,
            searchDetailsBlockDataMgmtProcessing,
            sortedModMasses,
            vizOptionsData
        })

        // show the data table under the vizualization by default
        ModViewDataTableRenderer_MultiSearch.renderDataTable({
            projectSearchIds:vizOptionsData.data.projectSearchIds,
            vizSelectedStateObject: selectedStateObject,
            reportedPeptideModData,
            proteinPositionResidues,
            totalPSMCount,
            aminoAcidModStats,
            proteinData,
            proteinPositionFilterStateManager,
            searchDetailsBlockDataMgmtProcessing,
            dataPageStateManager_DataFrom_Server,
            modMap,
            sortedModMasses
        });
    }

    static addDataDownloadLinks({
                                    reportedPeptideModData,
                                    totalPSMCount,
                                    aminoAcidModStats,
                                    searchDetailsBlockDataMgmtProcessing,
                                    sortedModMasses,
                                    vizOptionsData
                                }) {


        let html = "<div class=\"clickable\">[Download Stats Report]</div>"
        let $html = $(html)

        $html.click(function() {

            // calculate and show stats
            ModStatsUtils.downloadSignificantMods({
                reportedPeptideModData,
                aminoAcidModStats,
                vizOptionsData,
                sortedModMasses,
                totalPSMCount,
                searchDetailsBlockDataMgmtProcessing,
                projectSearchIds: vizOptionsData.data.projectSearchIds
            });

        });

        $("div#data-viz-container").append($html);

    }

    /**
     * Remove existing and add new data viz container to page. Assumes jquery is loaded.
     */
    static addDataVizContainerToPage() {
        const $mainContentDiv = $('#mod_list_container');

        // blow away loading message if it exists
        $mainContentDiv.find("h2#loading-message").remove();

        // if an existing viz is here, blow it away
        $mainContentDiv.find("div#data-viz-container").remove();

        const template = Handlebars.templates.dataVizContainer;
        const html = template( {  } );
        const $dataVizContainer = $( html );
        $mainContentDiv.append( $dataVizContainer );
    }

    static addColorScaleLegend({ svg, rectAreaHeight, colorScale, minPSMCount, maxPsmCount, minLegendWidth, legendHeight, yScale, labelFontSize, vizOptionsData }) {

        // create group element to hold legend
        let legendGroup = svg.append('g')
            .attr("transform", () => 'translate(0, ' + (rectAreaHeight + 10) + ')');

        // add legend text label
        legendGroup.append('text')
            .attr('class', 'project-label')
            .attr('x', -10)
            .attr('y', () => ( (yScale.bandwidth() / 2) + (labelFontSize / 2) ))
            .attr("text-anchor", "end")
            .attr('font-size', labelFontSize + 'px')
            .attr('font-family', 'sans-serif')
            .text((d,i) => ( vizOptionsData.data.psmQuant === 'counts' ? 'PSM Count Color:' : 'PSM Ratio Color:'));

        // width of color scale bar
        const width = minLegendWidth;

        // add color scale group
        let colorScaleGroup = legendGroup.append('g');

        // add colored rects for scale bar
        for( let i = 0; i <= width; i++ ) {

            let psmCountForI = ( i / width ) * ( maxPsmCount - minPSMCount );
            if( vizOptionsData.data.psmQuant === 'counts' ) {
                psmCountForI = Math.floor(psmCountForI);
            }
            colorScaleGroup.append('rect')
                .attr('y', () => (0))
                .attr('x', () => (i))
                .attr('width', 1)
                .attr('height', legendHeight)
                .attr('stroke', 'none')
                .attr('fill', () => (colorScale(psmCountForI)));
        }

        // add labels to scale bar
        let scaleBarLegendGroup = legendGroup.append('g')
            .attr("transform", () => 'translate(0, ' + legendHeight + ')');


        const numTicks = 5;
        for( let i = 0; i < numTicks; i++ ) {

            const dx = Math.floor( (i / (numTicks - 1)) * width );

            let psmCountForX = ( dx / width ) * ( maxPsmCount - minPSMCount );
            if( vizOptionsData.data.psmQuant === 'counts' ) {
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
                .attr('y', () => (7 + labelFontSize))
                .attr("text-anchor", "middle")
                .attr('font-size', labelFontSize + 'px')
                .attr('font-family', 'sans-serif')
                .text((d,i) => (
                    vizOptionsData.data.psmQuant === 'ratios' ? psmCountForX.toExponential(2) : psmCountForX
                ));

        }

    }

    static addDragHandlerToRects({ svg,
                              xScale,
                              yScale,
                              sortedModMasses,
                              projectSearchIds,
                              selectedStateObject,
                              reportedPeptideModData,
                              proteinPositionResidues,
                              totalPSMCount,
                              aminoAcidModStats,
                              proteinData,
                              proteinPositionFilterStateManager,
                              searchDetailsBlockDataMgmtProcessing,
                              dataPageStateManager_DataFrom_Server,
                              modMap,
                              vizOptionsData
    }) {

        svg.select('#rect-group')
            .on( "mousedown", function() {

                // reset selected state object unless control is being held down
                if(!d3.event.ctrlKey && !d3.event.metaKey) {
                    svg.select('#rect-group').selectAll('rect').style('opacity', '1.0');
                    selectedStateObject.data = {};
                }

                const p = d3.mouse(this);

                svg.select('#rect-group')
                    .append( "rect")
                    .attr('class', 'selection')
                    .attr("x", p[0])
                    .attr('y', p[1])
                    .attr('width', '0')
                    .attr('height', '0')

            })
            .on( "mousemove", function() {

                let s = svg.select('#rect-group').select( "rect.selection");

                if( !s.empty()) {
                    const p = d3.mouse(this)
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
            .on( "mouseup", function() {

                let s = svg.select('#rect-group').select( "rect.selection");

                if( !s.empty()) {

                    let rectParams = {
                        x       : s.attr( "x"),
                        y       : s.attr( "y"),
                        width   : s.attr( "width"),
                        height  : s.attr( "height")
                    };

                    // update final opacity for viz
                    ModViewDataVizRenderer_MultiSearch.updateSelectedRectIndicators({ svg, sortedModMasses, projectSearchIds, xScale, yScale, rectParams, selectedStateObject });

                    // remove selection frame
                    s.remove();

                    // update hash in URL to reflect user customization state
                    vizOptionsData.stateManagementObject.updateState();

                    // redraw the data table
                    ModViewDataTableRenderer_MultiSearch.renderDataTable( { projectSearchIds, vizSelectedStateObject:selectedStateObject, reportedPeptideModData, proteinPositionResidues, totalPSMCount, aminoAcidModStats, proteinData, proteinPositionFilterStateManager, searchDetailsBlockDataMgmtProcessing, dataPageStateManager_DataFrom_Server, modMap, sortedModMasses } );
                }

            });

        d3.select("body")
            .on("keydown", function() {

                // capture escape key press, reset viz
                if(d3.event.keyCode === 27) {
                    selectedStateObject.data = {};

                    // update hash in URL to reflect user customization state
                    vizOptionsData.stateManagementObject.updateState();

                    ModViewDataVizRenderer_MultiSearch.updateShownRectOpacities({ svg, selectedStateObject });

                    // redraw the data table
                    ModViewDataTableRenderer_MultiSearch.renderDataTable( { projectSearchIds, vizSelectedStateObject:selectedStateObject, reportedPeptideModData, proteinPositionResidues, totalPSMCount, aminoAcidModStats, proteinData, proteinPositionFilterStateManager, searchDetailsBlockDataMgmtProcessing, dataPageStateManager_DataFrom_Server, modMap, sortedModMasses } );

                }
            });
    }

    static updateShownRectOpacities({ svg, selectedStateObject }) {

        if( !selectedStateObject.data || Object.keys(selectedStateObject.data).length < 1) {
            svg.select('#rect-group').selectAll('rect').style('opacity', '1.0');
        } else {

            svg.select('#rect-group').selectAll('rect').style('opacity', '0.35');

            for (const projectSearchId of Object.keys(selectedStateObject.data)) {
                for (const modMass of selectedStateObject.data[projectSearchId]) {
                    const selector = 'rect.mod-mass-' + modMass + '.project-search-id-' + projectSearchId;
                    svg.select('#rect-group').select(selector).style('opacity', '1.0');
                }
            }
        }
    }

    static updateSelectedRectIndicators({ svg, sortedModMasses, projectSearchIds, xScale, yScale, rectParams, selectedStateObject }) {

        // reset selected state object unless control is being held down
        if(!d3.event || (!d3.event.ctrlKey && !d3.event.metaKey)) {
            svg.select('#rect-group').selectAll('rect').style('opacity', '0.35');
        }

        // add opacity adjustment for selected items
        for( const modMass of sortedModMasses ) {

            if(ModViewDataVizRenderer_MultiSearch.rectangleContainsModMass({ modMass, xScale, rectParams })) {

                for (const projectSearchId of projectSearchIds) {

                    if (ModViewDataVizRenderer_MultiSearch.rectangleContainsProjectSearchId({ projectSearchId, yScale, rectParams })) {
                        const selector = 'rect.mod-mass-' + modMass + '.project-search-id-' + projectSearchId;
                        svg.select('#rect-group').select(selector).style('opacity', '1.0');

                        if(!(projectSearchId in selectedStateObject.data)) {
                            selectedStateObject.data[projectSearchId] = [ ];
                        }

                        if(!(selectedStateObject.data[projectSearchId].includes(modMass))) {
                            selectedStateObject.data[projectSearchId].push(modMass);
                        }
                    }
                }
            }
        }
    }

    static rectangleContainsModMass({ modMass, xScale, rectParams }) {

        const modMassMinPosition = xScale(modMass);
        const modMassMaxPosition = modMassMinPosition + xScale.bandwidth();

        const rectLeft = parseInt(rectParams.x);
        const rectRight = rectLeft + parseInt(rectParams.width);

        if( modMassMinPosition <= rectRight && rectLeft <= modMassMaxPosition ) {
            return true;
        }

        return false;
    }

    static rectangleContainsProjectSearchId({ projectSearchId, yScale, rectParams }) {

        const psidMinPosition = yScale(projectSearchId);
        const psidMaxPosition = psidMinPosition + yScale.bandwidth();

        const rectTop = parseInt(rectParams.y);
        const rectBottom = rectTop + parseInt(rectParams.height);

        if( psidMinPosition <= rectBottom && rectTop <= psidMaxPosition ) {
            return true;
        }

        return false;
    }



    static getInterval({xScale, labelFontSize}) {

        const spaceNeeded = labelFontSize + 6;      // 6 assumes a margin of 3 px on either side of the label (move this to viz defs?)
        const bandwidth = xScale.bandwidth();

        return Math.ceil( spaceNeeded / bandwidth );
    }

    static addModLabelsHeader({ svg, width, labelFontSize }) {

        const dx = Math.round( width / 2 );
        const dy = -1 * labelFontSize - 30;

        svg.append('text')
            .attr("text-anchor", "middle")
            .attr('font-size', labelFontSize + 'px')
            .attr('font-family', 'sans-serif')
            .attr("transform", (d,i) => 'translate(' + dx + ', ' + dy + ')')
            .text('Modification Mass');

    }

    static addModLabels({ svg, sortedModMasses, xScale, labelFontSize }) {

        const interval = ModViewDataVizRenderer_MultiSearch.getInterval({labelFontSize, xScale});

        svg.selectAll('.mod-label')
            .data(sortedModMasses)
            .enter()
            .append('text')
            .attr('class', 'mod-label')
            .attr("text-anchor", "start")
            .attr('font-size', labelFontSize + 'px')
            .attr('font-family', 'sans-serif')
            .attr("transform", (d,i) => 'translate(' + (xScale(sortedModMasses[i]) + (xScale.bandwidth() / 2) + (labelFontSize / 2)) + ', -10) rotate(-90)')
            .text((d,i) => ( i % interval == 0 ? sortedModMasses[i] : '' ));
    }

    static addSearchLabels({
                               svg,
                               yScale,
                               searchDetailsBlockDataMgmtProcessing,
                               maxSearchLabelLength,
                               labelFontSize,
                               tooltip,
                               sortedModMasses,
                               selectedStateObject,
                               reportedPeptideModData,
                               proteinPositionResidues,
                               totalPSMCount,
                               aminoAcidModStats,
                               proteinData,
                               proteinPositionFilterStateManager,
                               dataPageStateManager_DataFrom_Server,
                               modMap,
                               vizOptionsData
    }) {

        const projectSearchIds = vizOptionsData.data.projectSearchIds;

        svg.selectAll('.project-label')
            .data(projectSearchIds)
            .enter()
            .append('text')
            .attr('class', 'search-label')
            .attr('x', -10)
            .attr('y', (d, i) => (yScale(projectSearchIds[i]) + (yScale.bandwidth() / 2) + (labelFontSize / 2)))
            .attr("text-anchor", "end")
            .attr('font-size', labelFontSize + 'px')
            .attr('font-family', 'sans-serif')
            .text((d,i) => (ModViewDataVizRenderer_MultiSearch.getTruncatedSearchNameForProjectSearchId({ projectSearchId:projectSearchIds[i], searchDetailsBlockDataMgmtProcessing, maxSearchLabelLength})))
            .on("mousemove", function (d, i) {
                ModViewDataVizRenderer_MultiSearch.showToolTip({ projectSearchId:d, tooltip, searchDetailsBlockDataMgmtProcessing, vizOptionsData, modMass : undefined, psmCount : undefined })
            })
            .on("mouseout", function (d, i) {
                //d3.select(this).attr('fill', (d) => (colorScale(d.psmCount)))
                ModViewDataVizRenderer_MultiSearch.hideToolTip({tooltip});
            })
            .on("click", function(d,i) {

                // reset selected state object unless control is being held down
                if(!d3.event.ctrlKey && !d3.event.metaKey) {
                    svg.select('#rect-group').selectAll('rect').style('opacity', '1.0');
                    selectedStateObject.data = {};
                }

                selectedStateObject.data[d] = [...sortedModMasses];

                // update hash in URL to reflect user customization state
                vizOptionsData.stateManagementObject.updateState();

                // update final opacity for viz
                ModViewDataVizRenderer_MultiSearch.updateShownRectOpacities({ svg, selectedStateObject })

                // redraw the data table
                ModViewDataTableRenderer_MultiSearch.renderDataTable({
                    projectSearchIds,
                    vizSelectedStateObject: selectedStateObject,
                    reportedPeptideModData,
                    proteinPositionResidues,
                    totalPSMCount,
                    aminoAcidModStats,
                    proteinData,
                    proteinPositionFilterStateManager,
                    searchDetailsBlockDataMgmtProcessing,
                    dataPageStateManager_DataFrom_Server,
                    modMap,
                    sortedModMasses
                });
            })
            .call(Drag.drag()
                .on("drag", function(d, i) {
                    ModViewDataVizRenderer_MultiSearch.handleSearchLabelDrag({ draggedObject: this });
                })
                .on("end", function(d, i ) {
                    ModViewDataVizRenderer_MultiSearch.handleSearchLabelDragEnd({
                        yScale,
                        reportedPeptideModData,
                        proteinPositionResidues,
                        totalPSMCount,
                        aminoAcidModStats,
                        proteinData,
                        proteinPositionFilterStateManager,
                        searchDetailsBlockDataMgmtProcessing,
                        dataPageStateManager_DataFrom_Server,
                        labelFontSize,
                        vizOptionsData,
                        draggedProjectSearchId:d,
                        draggedObject: this
                    });
                }));
    }


    static handleSearchLabelDrag({ draggedObject }) {

        d3.select(draggedObject)
            .attr("y", d3.event.y)
    }

    static handleSearchLabelDragEnd({
                                        yScale,
                                        reportedPeptideModData,
                                        proteinPositionResidues,
                                        totalPSMCount,
                                        aminoAcidModStats,
                                        proteinData,
                                        proteinPositionFilterStateManager,
                                        searchDetailsBlockDataMgmtProcessing,
                                        dataPageStateManager_DataFrom_Server,
                                        labelFontSize,
                                        vizOptionsData,
                                        draggedProjectSearchId,
                                        draggedObject
                                    }) {

        const projectSearchIds = vizOptionsData.data.projectSearchIds;

        const newTextYStart = d3.event.y;

        const insertionData = ModViewDataVizRenderer_MultiSearch.getInsertionPointForProjectSearchId({
            yScale,
            projectSearchIds,
            newTextYStart,
            labelFontSize,
            draggedProjectSearchId
        });

        if( insertionData.insertIndex === projectSearchIds.indexOf(draggedProjectSearchId) ) {

            // do nothing, put label back in place
            d3.select(draggedObject)
                .attr("y", yScale(draggedProjectSearchId) + yScale.bandwidth() / 2 + labelFontSize / 2);


        } else {

            let newProjectSearchIds =  [...projectSearchIds];
            newProjectSearchIds.splice(newProjectSearchIds.indexOf(draggedProjectSearchId), 1);
            newProjectSearchIds.splice(insertionData.insertIndex, 0, draggedProjectSearchId);

            vizOptionsData.data.projectSearchIds = newProjectSearchIds;

            // update hash in URL to reflect user customization state
            vizOptionsData.stateManagementObject.updateState();

            ModViewDataVizRenderer_MultiSearch.renderDataViz({
                reportedPeptideModData,
                proteinPositionResidues,
                totalPSMCount,
                aminoAcidModStats,
                proteinData,
                proteinPositionFilterStateManager,
                searchDetailsBlockDataMgmtProcessing,
                dataPageStateManager_DataFrom_Server,
                vizOptionsData
            });
        }
    }

    static getInsertionPointForProjectSearchId({ yScale, projectSearchIds, newTextYStart, labelFontSize, draggedProjectSearchId }) {

        let i = 0;
        let returnedObject : any = { };

        const startOfDraggedElement =  yScale(draggedProjectSearchId) + (yScale.bandwidth() / 2) + (labelFontSize / 2);

        /*
         * Project search IDs are already in order from top to bottom. So, we can just find the first one that the
         * dragged project search id is above and that is the point at which the dragged project search id should
         * be inserted
         */
        for( const projectSearchId of projectSearchIds ) {

            const start = yScale(projectSearchId) + (yScale.bandwidth() / 2) + (labelFontSize / 2);

            if( newTextYStart < start ) {

                if( newTextYStart < startOfDraggedElement ) {   // we dragged up

                    returnedObject.insertIndex = i;
                    returnedObject.insertBefore = projectSearchId;

                } else {    // we dragged down

                    returnedObject.insertIndex = i - 1;
                    returnedObject.insertBefore = projectSearchId;

                }

                return returnedObject;
            }

            i++;
        }

        // if we got here, then it should be inserted at the end
        returnedObject.insertIndex = projectSearchIds.length - 1;
        returnedObject.insertBefore = null;

        return returnedObject;
    }



    static getTruncatedSearchNameForProjectSearchId({ projectSearchId, searchDetailsBlockDataMgmtProcessing, maxSearchLabelLength}) {

        let searchName = ModViewDataVizRenderer_MultiSearch.getSearchNameForProjectSearchId({ projectSearchId, searchDetailsBlockDataMgmtProcessing });

        if(searchName.length > maxSearchLabelLength) {
            searchName = searchName.substring(0, maxSearchLabelLength - 4) + '...';
        }

        return searchName;

    }

    static getSearchNameForProjectSearchId({ projectSearchId, searchDetailsBlockDataMgmtProcessing}) {

        // const maxLength = 30;

		const projectSearchIdInt = Number.parseInt( projectSearchId ); // projectSearchId is number but do this to ensure always a number

		if ( Number.isNaN( projectSearchIdInt ) ) {
			const msg = "getSearchNameForProjectSearchId({ projectSearchId, searchDetailsBlockDataMgmtProcessing}): projectSearchId does not parse to int. projectSearchId: " + projectSearchId;
			console.warn( msg );
			throw Error( msg );
		}

		const searchNameObject = searchDetailsBlockDataMgmtProcessing._dataPageStateManager_DataFrom_Server.get_searchNames_AsMap().get( projectSearchIdInt );
		if ( ! searchNameObject ) {
			const msg = "getSearchNameForProjectSearchId({ projectSearchId, searchDetailsBlockDataMgmtProcessing}): No entry in searchDetailsBlockDataMgmtProcessing._dataPageStateManager_DataFrom_Server.get_searchNames_AsMap() for projectSearchIdInt: " + projectSearchIdInt;
			console.warn( msg );
			throw Error( msg );
		}

		const searchName = searchNameObject.name;

        const searchId = ModViewDataVizRenderer_MultiSearch.getSearchIdForProjectSearchId({ projectSearchId, searchDetailsBlockDataMgmtProcessing })

        const retName = "(" + searchId + ") " + searchName;

        return retName;
    }

    static getSearchIdForProjectSearchId({ projectSearchId, searchDetailsBlockDataMgmtProcessing}) {

        // const maxLength = 30;

		const projectSearchIdInt = Number.parseInt( projectSearchId ); // projectSearchId is number but do this to ensure always a number

		if ( Number.isNaN( projectSearchIdInt ) ) {
			const msg = "getSearchIdForProjectSearchId({ projectSearchId, searchDetailsBlockDataMgmtProcessing}): projectSearchId does not parse to int. projectSearchId: " + projectSearchId;
			console.warn( msg );
			throw Error( msg );
		}

		const searchNameObject = searchDetailsBlockDataMgmtProcessing._dataPageStateManager_DataFrom_Server.get_searchNames_AsMap().get( projectSearchIdInt );
		if ( ! searchNameObject ) {
			const msg = "getSearchIdForProjectSearchId({ projectSearchId, searchDetailsBlockDataMgmtProcessing}): No entry in searchDetailsBlockDataMgmtProcessing._dataPageStateManager_DataFrom_Server.get_searchNames_AsMap() for projectSearchIdInt: " + projectSearchIdInt;
			console.warn( msg );
			throw Error( msg );
		}

        let searchId = searchNameObject.searchId;

        return searchId;
    }

    static getWidth({sortedModMasses, widthDefs, minLegendWidth}) {

        let width = widthDefs.default;

        // adjust width as necessary
        if(width < sortedModMasses.length * widthDefs.min) {
            width = sortedModMasses.length * widthDefs.min;
        } else if(width > sortedModMasses.length * widthDefs.max) {
            width = sortedModMasses.length * widthDefs.max;
        }

        if( width < minLegendWidth ) {
            width = minLegendWidth;
        }

        // adjust to be an integer multiple of the number of mod masses
        // done in an effort to avoid white space between rects
        width = Math.round( width / sortedModMasses.length) * sortedModMasses.length;

        return width;
    }

    static getHeight({projectSearchIds, heightDefs}) {

        let height = heightDefs.default;

        // adjust width as necessary
        if(height < projectSearchIds.length * heightDefs.min) {
            height = projectSearchIds.length * heightDefs.min;
        } else if(height > projectSearchIds.length * heightDefs.max) {
            height = projectSearchIds.length * heightDefs.max;
        }

        return height;
    }

    static addColoredRectangles({ svg, modMatrix, xScale, yScale, colorScale, sortedModMasses, projectSearchIds, width, height, tooltip, searchDetailsBlockDataMgmtProcessing, vizOptionsData }) {

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
            .on("mousemove", function (d, i) {

                    ModViewDataVizRenderer_MultiSearch.showToolTip({
                        projectSearchId: d.projectSearchId,
                        modMass: d.modMass,
                        psmCount: d.psmCount,
                        tooltip,
                        searchDetailsBlockDataMgmtProcessing,
                        vizOptionsData
                    })
            })
            .on("mouseleave", function (d, i) {
                //d3.select(this).attr('fill', (d) => (colorScale(d.psmCount)))
                ModViewDataVizRenderer_MultiSearch.hideToolTip({tooltip});
            });

        // update opacity as necessary
        // if no selections are defined, everything is selected
        {
            const selectedStateObject = vizOptionsData.data.selectedStateObject;

            if (selectedStateObject.data !== undefined || Object.keys(selectedStateObject.data).length > 0) {
                ModViewDataVizRenderer_MultiSearch.updateShownRectOpacities({
                    svg,
                    selectedStateObject
                })
            }
        }
    }

    static showToolTip({ projectSearchId, modMass, psmCount, tooltip, searchDetailsBlockDataMgmtProcessing, vizOptionsData }) {

        // @ts-ignore
        const pageY = event.pageY
        // @ts-ignore
        const pageX = event.pageX

        tooltip
            .style("top", (pageY + 20)+"px")
            .style("left",(pageX + 20)+"px")
            .style("visibility", "visible")
            .html( function() {

                let txt = "";

                if(modMass) {
                    txt += "<p>Mod mass: " + modMass + "</p>";
                }

                if(projectSearchId) {
                    txt += "<p>Search: " + ModViewDataVizRenderer_MultiSearch.getSearchNameForProjectSearchId({ projectSearchId, searchDetailsBlockDataMgmtProcessing }) + "</p>";
                }

                if(psmCount !== undefined) {

                    if( vizOptionsData.data.psmQuant === 'ratios' ) {
                        txt += "<p>PSM Ratio: " + psmCount.toExponential(2) + "</p>";
                    } else {
                        txt += "<p>PSM Count: " + psmCount + "</p>";
                    }
                }

                return txt;
            });
    }

    static hideToolTip({ tooltip }) {
        tooltip
            .style("visibility", "hidden")
    }

    static addSeparatorLines({ svg, projectSearchIds, yScale, width, height }) {

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

    static buildModMap({
                           reportedPeptideModData,
                           aminoAcidModStats,
                           projectSearchIds,
                           totalPSMCount,
                           vizOptionsData,
                           countsOverride,
                           proteinPositionFilterStateManager
                       }) {

        const modMap = { };

        for(const projectSearchId of projectSearchIds) {

            let searchMap = reportedPeptideModData[projectSearchId];

            for(const reportedPeptideId of Object.keys(searchMap)) {
                let reportedPeptideMap = searchMap[reportedPeptideId];

                for(const modMass of Object.keys(reportedPeptideMap)) {

                    // enforce requested mod mass cutoffs
                    if(vizOptionsData.data.modMassCutoffMin !== undefined && modMass < vizOptionsData.data.modMassCutoffMin) {
                        continue;
                    }

                    if(vizOptionsData.data.modMassCutoffMax !== undefined && modMass > vizOptionsData.data.modMassCutoffMax) {
                        continue;
                    }

                    if(!ModViewDataVizRenderer_MultiSearch.shouldReportedPeptideBeIncludedForModMass({ projectSearchId, reportedPeptideId, modMass, proteinPositionFilterStateManager, reportedPeptideModData })) {
                        continue;
                    }

                    const roundedMass = Math.round(parseFloat(modMass));
                    let psmCount = ModViewDataVizRenderer_MultiSearch.getPsmCountForReportedPeptide({reportedPeptideId, projectSearchId, aminoAcidModStats});

                    if( vizOptionsData.data.psmQuant === 'ratios' && !countsOverride ) {
                        psmCount = psmCount / totalPSMCount[projectSearchId].psmCount;
                    }

                    if(!(roundedMass in modMap)) {
                        modMap[roundedMass] = { }
                    }

                    if(!(projectSearchId in modMap[roundedMass])) {
                        modMap[roundedMass][projectSearchId] = 0;
                    }

                    modMap[roundedMass][projectSearchId] = modMap[roundedMass][projectSearchId] + psmCount;
                }
            }
        }

        return modMap;
    }

    static getMaxPSMCount(modMatrix, vizOptionsData) {

        if( vizOptionsData.data.psmQuant === 'ratios' && vizOptionsData.data.colorCutoffRatio !== undefined) {
            return vizOptionsData.data.colorCutoffRatio;
        }

        if( vizOptionsData.data.psmQuant === 'counts' && vizOptionsData.data.colorCutoffCount !== undefined) {
            return vizOptionsData.data.colorCutoffCount;
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

    static getModMatrix({modMap, projectSearchIds}) {
        let modMatrix = Array( Object.keys(modMap).length );

        const sortedModMasses = Object.keys(modMap).sort( (a,b) => ( parseInt(a) - parseInt(b)));

        let i = 0;
        for(const modMass of sortedModMasses) {
            modMatrix[i] = Array(projectSearchIds.length);

            let k = 0;
            for(const projectSearchId of projectSearchIds) {

                if(modMass in modMap && projectSearchId in modMap[modMass]) {
                    modMatrix[i][k] = {
                        psmCount: modMap[modMass][projectSearchId],
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


    static shouldReportedPeptideBeIncludedForModMass({ projectSearchId, proteinPositionFilterStateManager, reportedPeptideModData, modMass, reportedPeptideId }) {


        // console.log('called shouldReportedPeptideBeIncludedForModMass()');
        // console.log('projectSearchId', projectSearchId);
        // console.log('proteinPositionFilterStateManager', proteinPositionFilterStateManager);
        // console.log('reportedPeptideModData', reportedPeptideModData);
        // console.log('modMass', modMass);
        // console.log('reportedPeptideId', reportedPeptideId);

        if( modMass in reportedPeptideModData[projectSearchId][reportedPeptideId]) {

            if( ( ! proteinPositionFilterStateManager ) || proteinPositionFilterStateManager.getNoProteinsSelected()) {

                return true;

            } else {

                for(const proteinId of Object.keys(reportedPeptideModData[projectSearchId][reportedPeptideId][modMass]['proteins'])) {

                    if(proteinPositionFilterStateManager.getIsAllSelected({proteinId})) {

                        return true;

                    } else if(proteinPositionFilterStateManager.getIsProteinSelected({proteinId})) {

                        for(const position of reportedPeptideModData[projectSearchId][reportedPeptideId][modMass]['proteins'][proteinId]) {

                            if(proteinPositionFilterStateManager.getIsProteinPositionSelected({ proteinId, position })) {

                                return true;

                            }
                        }
                    }
                }
            }
        }

        return false;

    }

    static getPsmCountForReportedPeptide({ reportedPeptideId, projectSearchId, aminoAcidModStats }) {

        if(!(projectSearchId in aminoAcidModStats)) {
            return 0;
        }

        if(!(reportedPeptideId in aminoAcidModStats[projectSearchId])) {
            return 0;
        }

        return aminoAcidModStats[projectSearchId][reportedPeptideId]['psmCount'];
    }

}
