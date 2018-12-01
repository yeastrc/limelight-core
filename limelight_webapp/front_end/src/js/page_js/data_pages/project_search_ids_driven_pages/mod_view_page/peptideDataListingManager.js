/**
 * Code related to generating the peptide  listing subtable when expanding
 * protein rows on the mod view page.
 */

"use strict";

let Handlebars = require('handlebars/runtime');

import { ModViewDataUtilities } from 'page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewDataUtilities.js';
import { ModViewPage_DataLoader } from 'page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewDataLoader.js';
import { PeptideListingUtilsSingleSearch } from 'page_js/data_pages/data_tables/peptideListingUtilsSingleSearch.js';

export class PeptideDataListingManager {

    static createJQueryElementForPeptideListing( { searchDetailsBlockDataMgmtProcessing, modMass, proteinId, reportedPeptideModData, $clickedRow, projectSearchId, dataPageStateManager_DataFrom_Server, proteinPositionFilterStateManager } ) {

        let $containerDiv = PeptideListingUtilsSingleSearch.getContainerDiv();

        let position = PeptideListingUtilsSingleSearch.getPositionFromClickedRow( { $clickedRow } );

        PeptideDataListingManager.populatePeptideListingDiv( { $containerDiv, proteinId, position, searchDetailsBlockDataMgmtProcessing, modMass, reportedPeptideModData, projectSearchId, dataPageStateManager_DataFrom_Server, proteinPositionFilterStateManager } );

        return $containerDiv;        
    }

    static populatePeptideListingDiv( { $containerDiv, proteinId, position, searchDetailsBlockDataMgmtProcessing, modMass, reportedPeptideModData, projectSearchId, dataPageStateManager_DataFrom_Server, proteinPositionFilterStateManager } ) {

        let peptideDataObjectArray = [ ];

        PeptideDataListingManager.getPeptideDataObjectArrayForProteinAndModMass({ peptideDataObjectArray, searchDetailsBlockDataMgmtProcessing, proteinId, position, projectSearchId, reportedPeptideModData, modMass, dataPageStateManager_DataFrom_Server, proteinPositionFilterStateManager }).then( function( result ) {

            PeptideListingUtilsSingleSearch.createAndAddTable( { $containerDiv, peptideDataObjectArray, dataPageStateManager_DataFrom_Server, searchDetailsBlockDataMgmtProcessing, projectSearchId, proteinPositionFilterStateManager } );

        });
    };
    

    static getPeptideDataObjectArrayForProteinAndModMass({ peptideDataObjectArray, searchDetailsBlockDataMgmtProcessing, proteinId, position, projectSearchId, reportedPeptideModData, modMass, dataPageStateManager_DataFrom_Server, proteinPositionFilterStateManager }) {

        let dataLoader = new ModViewPage_DataLoader();
        let reportedPeptideIds = ModViewDataUtilities.getReportedPeptidesForProteinAndModMass({ modMass, proteinId, reportedPeptideModData, proteinPosition : position, proteinPositionFilterStateManager });
        let loadedData = { };

        return new Promise(function (resolve, reject) {

            // make ajax call to load the peptides, then load peptide object
            dataLoader.getReportedPeptideInfoForReportedPeptideIdList( { dataPageStateManager_DataFrom_Server, searchDetailsBlockDataMgmtProcessing, projectSearchId, reportedPeptideIds : Array.from( reportedPeptideIds ), loadedData } ).then( function( result ) {

                PeptideListingUtilsSingleSearch.populateDataObjectArrayFromWebServiceResponse( { peptideDataObjectArray, loadedData } );

                resolve();
            });

        });
    }

}