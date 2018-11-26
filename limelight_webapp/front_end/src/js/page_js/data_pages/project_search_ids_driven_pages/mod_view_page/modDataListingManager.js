/**
 * Code related to generating the mod data table
 */

"use strict";

import { ModViewDataUtilities } from 'page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewDataUtilities.js';


export class ModDataListingManager {

    constructor( params ) {
	
    }

    /**
     * Return an array of modDataObjects
     * 
     * @param {*} param0 
     */
    getModDataArrayForPage( { reportedPeptideModData, proteinPositionResidues, aminoAcidModStats, proteinPositionFilterStateManager } ) {

        let modArray = [ ];
        let totalPSMsForResiduesCacheObject ={ };
        let totalInstancesOfResiduesInAllPSMsCacheObject ={ };


        if( !reportedPeptideModData ) { return modArray; }

		let uniqueModMasses = ModViewDataUtilities.getUniqueModMasses( { reportedPeptideModData, proteinPositionFilterStateManager } );
		
        for (let modMass of uniqueModMasses) {

            let modObject = { };

            modObject.modMass = modMass;
            modObject.uniqueId = modMass + "";      // must be unique for each row
			
            let residues = ModViewDataUtilities.getResiduesForModMass( { modMass, reportedPeptideModData, proteinPositionResidues, proteinPositionFilterStateManager } );
            modObject.residues = residues.join( ', ' );

            modObject.psmCount = ModViewDataUtilities.getPSMCountForModMass( { modMass, reportedPeptideModData, aminoAcidModStats, proteinPositionFilterStateManager } );

			modObject.peptideCount = ModViewDataUtilities.getPeptideCountForModMass( { modMass, reportedPeptideModData, proteinPositionFilterStateManager } );

			modObject.proteinCount = ModViewDataUtilities.getProteinCountForModMass( { modMass, reportedPeptideModData, proteinPositionFilterStateManager } );

            let totalModifiablePSMCountForModMass = ModViewDataUtilities.getTotalPSMCountContainingResidues( { residues, aminoAcidModStats, cacheObject : totalPSMsForResiduesCacheObject } );
            modObject.percentPSMsModified = ModViewDataUtilities.getFormattedDecimal( modObject.psmCount / totalModifiablePSMCountForModMass * 100 );

            let totalInstancesOfResiduesInAllPSMs = ModViewDataUtilities.getTotalInstancesOfResiduesInAllPSMs( { residues, aminoAcidModStats, cacheObject : totalInstancesOfResiduesInAllPSMsCacheObject } );

			let totalInstancesOfModdedResidueMasses = ModViewDataUtilities.getTotalInstancesOfModdedResiduesInAllPSMs( { residues, modMass, reportedPeptideModData, proteinPositionResidues, aminoAcidModStats, proteinPositionFilterStateManager } );

			modObject.percentResiduesModified = ModViewDataUtilities.getFormattedDecimal( totalInstancesOfModdedResidueMasses / totalInstancesOfResiduesInAllPSMs * 100 );

            modArray.push( modObject ); 

        }

        // sort by mod mass
        modArray.sort((a, b) => a.modMass - b.modMass);


        return modArray;
    }

    	/**
	 * Get the list of columns and their properties defined for single
	 * search mod page table.
	 */
    getColumnsSingleSearch() {

		let columns = [ ];

		{
			let column = {
				id :           'mm',
				width :        '120px',
				displayName :  'Mod Mass',
				dataProperty : 'modMass',
				sort : 'number',
			};

			columns.push( column );
		}

		{
			let column = {
				id :           'res',
				width :        '100px',
				displayName :  'Residues',
				dataProperty : 'residues',
				sort : 'string',
			};
			
			columns.push( column );
		}

		{
			let column = {
				id :           'psms',
				width :        '80px',
				displayName :  'PSMs',
				dataProperty : 'psmCount',
				sort : 'number',
			};
			
			columns.push( column );
		}

		{
			let column = {
				id :           'peps',
				width :        '100px',
				displayName :  'Peptides',
				dataProperty : 'peptideCount',
				sort : 'number',
			};
			
			columns.push( column );
		}

		{
			let column = {
				id :           'prots',
				width :        '100px',
				displayName :  'Proteins',
				dataProperty : 'proteinCount',
				sort : 'number',
			};
			
			columns.push( column );
		}

		{
			let column = {
				id :           'psms_modded',
				width :        '150px',
				displayName :  '% PSMs Modified',
				dataProperty : 'percentPSMsModified',
				sort : 'number',

				showHorizontalGraph: true,
				graphMaxValue: 100,
				graphWidth:50,
			};
			
			columns.push( column );
		}

		{
			let column = {
				id :           'res_modded',
				width :        '175px',
				displayName :  '% Residues Modified',
				dataProperty : 'percentResiduesModified',
                sort : 'number',
                lastItem : true,

				showHorizontalGraph: true,
				graphMaxValue: 100,
				graphWidth:50,
			};
			
			columns.push( column );
		}

		return columns;

	};

}