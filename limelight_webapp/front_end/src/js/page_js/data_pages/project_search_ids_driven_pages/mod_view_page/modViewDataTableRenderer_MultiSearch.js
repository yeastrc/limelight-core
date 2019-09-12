/**
 * Code related to generating the peptide  listing subtable when expanding
 * protein rows on the mod view page.
 */

"use strict";

let Handlebars = require('handlebars/runtime');



export class ModViewDataTableRenderer_MultiSearch {

	static isObjectEmpty(obj) {
		if( Object.keys(obj).length === 0 && obj.constructor === Object ) {
			return true;
		}

		return false;
	}

	static getSortedModsToDisplay({ sortedModMasses, vizSelectedStateObject }) {

		if(ModViewDataTableRenderer_MultiSearch.isObjectEmpty( vizSelectedStateObject.data )) {
			return sortedModMasses;
		}

		let sortedModsToDisplay = [ ];
		for( const modMass of sortedModMasses ) {
			for( const projectSearchId of Object.keys(vizSelectedStateObject.data) ) {
				if(vizSelectedStateObject.data[projectSearchId].includes(modMass)) {
					sortedModsToDisplay.push(modMass);
					break;
				}
			}
		}

		return sortedModsToDisplay;
	}

	static getProjectSearchIdsToShowForModMass({ modMass, vizSelectedStateObject, modMap }) {

		let projectSearchIdsToShow = [ ];



	}

	static renderDataTable({
								vizSelectedStateObject,
								reportedPeptideModData,
								proteinPositionResidues,
								totalPSMCount,
								aminoAcidModStats,
								proteinData,
								proteinPositionFilterStateManager,
								searchDetailsBlockDataMgmtProcessing,
								dataPageStateManager_DataFrom_Server,
								sortedModMasses,
								modMap
	}) {

		console.log('calling renderDataTable()');
		console.log(vizSelectedStateObject);

		// based on user filter, these are the mods to show in the table
		const sortedModsToDisplay = ModViewDataTableRenderer_MultiSearch.getSortedModsToDisplay({ sortedModMasses, vizSelectedStateObject });
		console.log( sortedModsToDisplay );



	}

}