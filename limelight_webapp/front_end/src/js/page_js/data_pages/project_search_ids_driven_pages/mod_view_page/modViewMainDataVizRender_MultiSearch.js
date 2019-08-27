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
        const sortedModMasses = Object.keys(modMap).sort();
        const maxPsmCount = ModViewDataVizRenderer_MultiSearch.getMaxPSMCount(modMatrix);

        // if an existing viz is here, blow it away
        let $mainContentDiv = $('#mod_list_container');
        $mainContentDiv.empty();

        const margin = {top: 50, right: 400, bottom: 200, left: 100};
        const width = 1000;
        const height = 500;

        let xScale = d3.scaleBand()
            .domain(Object.keys(modMap).sort())
            .range([0,width]);

        let yScale = d3.scaleBand()
            .domain(projectSearchIds.sort())
            .range([height, 0]);

        let colorScale = d3.scaleSqrt()
            .domain([0, maxPsmCount])
            .range([d3.rgb(255,255,255), d3.rgb(255,0,0)])

        let svg = d3.select("#mod_list_container").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

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
            .attr('fill', (d, i) => (colorScale(d)));


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
                if(modMatrix[i][k] > max) {
                    max = modMatrix[i][k];
                }
            }
        }

        return max;
    }

    static getModMatrix({modMap, projectSearchIds}) {
        let modMatrix = Array( Object.keys(modMap).length );

        const sortedModMasses = Object.keys(modMap).sort();

        let i = 0;
        for(const modMass of sortedModMasses) {
            modMatrix[i] = Array(projectSearchIds.length);

            let k = 0;
            for(const projectSearchId of projectSearchIds) {

                if(modMass in modMap && projectSearchId in modMap[modMass]) {
                    modMatrix[i][k] = modMap[modMass][projectSearchId];
                } else {
                    modMatrix[i][k] = 0;
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
