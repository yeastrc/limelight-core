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

        // if an existing viz is here, blow it away
        let $mainContentDiv = $('#mod_list_container');
        $mainContentDiv.empty();


        /* modMap == {
            mod_mass => {
                projectSearchId => psm_count,
                projectSearchId2 => psm_count,
            },
            mod_mass2 => {
                projectSearchId => psm_count,
                projectSearchId2 => psm_count,
            },
         */
        const modMap = {}

        const margin = {top: 50, right: 400, bottom: 200, left: 100};
        const width = 600;
        const height = 500;

        let svg = d3.select("#mod_list_container").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    }


    static buildModMap({
                           reportedPeptideModData,
                           projectSearchIds
                       }) {



    }

}