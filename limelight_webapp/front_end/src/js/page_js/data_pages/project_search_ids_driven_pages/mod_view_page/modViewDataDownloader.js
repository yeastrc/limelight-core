/**
 * Code related to generating the protein listing subtable when expanding
 * rows on the mod view page.
 */

"use strict";

import { ModDataListingManager } from 'page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modDataListingManager.js';
import { StringDownloadUtils } from 'page_js/data_pages/data_pages_common/downloadStringAsFile.js';


export class ModViewDataDownloader {

    static downloadTopLevelTextReport( { reportedPeptideModData, proteinPositionResidues, aminoAcidModStats, proteinPositionFilterStateManager, projectSearchId } ) {

        const modViewDataListingManager = new ModDataListingManager();
        const dataObjects = modViewDataListingManager.getModDataArrayForPage( { reportedPeptideModData, proteinPositionResidues, aminoAcidModStats, proteinPositionFilterStateManager } );

        const downloadText = ModViewDataDownloader.getDownloadText( { dataObjects, projectSearchId } );

        StringDownloadUtils.downloadStringAsFile( { stringToDownload : downloadText, filename: 'limelight_mod_report.txt' } );

    }


    static getDownloadText({ dataObjects, projectSearchId } ) {

        let reportText = 'Mod Mass\tResidues\tPSM Count\tPeptide Count\tProtein Count\t% PSMs Modified\t% Residues Modified\n';

        for (let dataObject of dataObjects) {
            reportText += dataObject.modMass + '\t' + dataObject.residues + '\t' + dataObject.psmCount + '\t' + dataObject.peptideCount + '\t' + dataObject.proteinCount +
                          '\t' + dataObject.percentPSMsModified + '\t' + dataObject.percentResiduesModified + '\n';
        }

        return reportText;
    }

}