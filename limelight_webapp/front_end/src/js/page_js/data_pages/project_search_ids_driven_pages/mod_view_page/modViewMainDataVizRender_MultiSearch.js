"use strict";

import * as d3 from "d3";

export class ModViewDataVizRenderer_MultiSearch {

    static renderDataViz( { reportedPeptideModData,
                              proteinPositionResidues,
                              totalPSMCount,
                              aminoAcidModStats,
                              proteinData,
                              proteinPositionFilterStateManager,
                              projectSearchIds,
                              searchDetailsBlockDataMgmtProcessing,
                              dataPageStateManager_DataFrom_Server } ) {

        const modMap = ModViewDataVizRenderer_MultiSearch.buildModMap({ reportedPeptideModData, aminoAcidModStats, projectSearchIds });
        const modMatrix = ModViewDataVizRenderer_MultiSearch.getModMatrix({modMap, projectSearchIds});
        const sortedModMasses = Object.keys(modMap).sort( (a,b) => ( parseInt(a) - parseInt(b)));
        const maxPsmCount = ModViewDataVizRenderer_MultiSearch.getMaxPSMCount(modMatrix);

        // if an existing viz is here, blow it away
        let $mainContentDiv = $('#mod_list_container');
        $mainContentDiv.empty();

        // some defaults for the viz
        const margin = {top: 200, right: 10, bottom: 10, left: 300};
        const widthDefs = {default:1000, min: 3, max: 40};
        const heightDefs = {default:500, min:40, max:40};

        // label defs
        const labelFontSize = 14;               // font size (in pixels) of labels
        const maxSearchLabelLength = 39;        // max # of characters in a search label before truncation

        const width = ModViewDataVizRenderer_MultiSearch.getWidth({sortedModMasses, widthDefs});
        const height = ModViewDataVizRenderer_MultiSearch.getHeight({projectSearchIds, heightDefs});

        // set up our scales
        let xScale = d3.scaleBand()
            .domain(sortedModMasses)
            .range([0,width]);

        let yScale = d3.scaleBand()
            .domain(projectSearchIds)
            .range([0, height]);

        // let colorScale = d3.scaleSqrt()
        //     .domain([0, maxPsmCount])
        //     .range([d3.rgb(255,255,255), d3.rgb(255,0,0)]);

        // const colorScale = d3.scaleSequential(d3.interpolateYlGn)
        //     .domain([0, maxPsmCount])

        const logScale = d3.scaleLog()
            .domain([1, maxPsmCount])

        const colorScale = d3.scaleSequential(
            (d) => d3.interpolatePlasma(logScale(d))
        )

        // start drawing the actual viz
        let svg = d3.select("#mod_list_container").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        ModViewDataVizRenderer_MultiSearch.addColoredRectangles({ svg, modMatrix, xScale, yScale, colorScale, sortedModMasses, projectSearchIds, width, height });
        ModViewDataVizRenderer_MultiSearch.addSeparatorLines({ svg, projectSearchIds, yScale, width, height });
        ModViewDataVizRenderer_MultiSearch.addSearchLabels({ svg, projectSearchIds, yScale, searchDetailsBlockDataMgmtProcessing, maxSearchLabelLength, labelFontSize });
        ModViewDataVizRenderer_MultiSearch.addModLabels({ svg, sortedModMasses, xScale, labelFontSize });

    }

    static getInterval({xScale, labelFontSize}) {

        const spaceNeeded = labelFontSize + 6;      // 6 assumes a margin of 3 px on either side of the label (move this to viz defs?)
        const bandwidth = xScale.bandwidth();

        return Math.ceil( spaceNeeded / bandwidth );
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

    static addSearchLabels({ svg, projectSearchIds, yScale, searchDetailsBlockDataMgmtProcessing, maxSearchLabelLength, labelFontSize }) {

        svg.selectAll('.project-label')
            .data(projectSearchIds)
            .enter()
            .append('text')
            .attr('class', 'project-label')
            .attr('x', -10)
            .attr('y', (d, i) => (yScale(projectSearchIds[i]) + (yScale.bandwidth() / 2) + (labelFontSize / 2)))
            .attr("text-anchor", "end")
            .attr('font-size', labelFontSize + 'px')
            .attr('font-family', 'sans-serif')
            .text((d,i) => (ModViewDataVizRenderer_MultiSearch.getTruncatedSearchNameForProjectSearchId({ projectSearchId:projectSearchIds[i], searchDetailsBlockDataMgmtProcessing, maxSearchLabelLength})));
    }

    static getTruncatedSearchNameForProjectSearchId({ projectSearchId, searchDetailsBlockDataMgmtProcessing, maxSearchLabelLength}) {

        let searchName = ModViewDataVizRenderer_MultiSearch.getSearchNameForProjectSearchId({ projectSearchId, searchDetailsBlockDataMgmtProcessing });

        if(searchName.length > maxSearchLabelLength) {
            searchName = searchName.substring(0, maxSearchLabelLength - 4) + '...';
        }

        return searchName;

    }

    static getSearchNameForProjectSearchId({ projectSearchId, searchDetailsBlockDataMgmtProcessing}) {
        const maxLength = 30;
        const searchName = searchDetailsBlockDataMgmtProcessing._dataPageStateManager_DataFrom_Server._pageState.searchNames[projectSearchId].name;

        return searchName;
    }

    static getWidth({sortedModMasses, widthDefs}) {

        let width = widthDefs.default;

        // adjust width as necessary
        if(width < sortedModMasses.length * widthDefs.min) {
            width = sortedModMasses.length * widthDefs.min;
        } else if(width > sortedModMasses.length * widthDefs.max) {
            width = sortedModMasses.length * widthDefs.max;
        }

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

    static addColoredRectangles({ svg, modMatrix, xScale, yScale, colorScale, sortedModMasses, projectSearchIds, width, height }) {

        // Create a group for each column in the data matrix and translate the group horizontally
        const svgColGroups = svg.selectAll('.search-col-group')
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
            .attr('width', xScale.bandwidth())
            .attr('height', yScale.bandwidth())
            .attr('stroke', 'none')
            .attr('fill', (d) => (colorScale(d.psmCount)))
            .on("mouseover", function (d, i) {
                d3.select(this)
                    .attr('fill', 'white')
            })
            .on("mouseout", function (d, i) {
                d3.select(this)
                    .attr('fill', (d) => (colorScale(d.psmCount)))
            });
    }

    static addSeparatorLines({ svg, projectSearchIds, yScale, width, height }) {

        svg.selectAll('.separator-line')
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
                           projectSearchIds
                       }) {

        console.log( 'calling buildModMap()' );

        const modMap = { };

        for(const projectSearchId of projectSearchIds) {

            let searchMap = reportedPeptideModData[projectSearchId];

            for(const reportedPeptideId of Object.keys(searchMap)) {
                let reportedPeptideMap = searchMap[reportedPeptideId];

                for(const modMass of Object.keys(reportedPeptideMap)) {

                    const roundedMass = Math.round(parseFloat(modMass));
                    const psmCount = ModViewDataVizRenderer_MultiSearch.getPsmCountForReportedPeptide({reportedPeptideId, projectSearchId, aminoAcidModStats});

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

    static getMaxPSMCount(modMatrix) {

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
