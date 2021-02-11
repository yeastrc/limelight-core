/**
 * Code related to generating the peptide  listing subtable when expanding
 * protein rows on the mod view page.
 */

"use strict";

import {

	DataTable_RootTableObject,
	DataTable_TableOptions,
	DataTable_Column,
	DataTable_RootTableDataObject,
	DataTable_DataRowEntry,
	DataTable_DataRow_ColumnEntry,

} from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';
import {ModViewDataVizRenderer_MultiSearch} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewMainDataVizRender_MultiSearch";
import {create_dataTable_Root_React} from "page_js/data_pages/data_table_react/dataTable_TableRoot_React_Create_Remove_Table_DOM";
import {wholeModTable_ShowCount_ExternalReactComponent} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/whole_mod_table_show_count_External_Component";
import {ModProteinList_SubTableGenerator} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modProteinList_SubTableGenerator";
import {ModProteinList_SubTableProperties} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modProteinList_SubTableProperties";
import {DataPageStateManager} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {ModViewDataManager} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewDataManager";
import {
	ModView_VizOptionsData,
	ModView_VizOptionsData_SubPart_selectedStateObject
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modView_VizOptionsData";

export class ModViewDataTableRenderer_MultiSearch {



	static renderDataTable(
		{
			vizSelectedStateObject,
			dataPageStateManager_DataFrom_Server,
			sortedModMasses,
			modMap,
			projectSearchIds,
			modViewDataManager,
			vizOptionsData,
			$tableContainer,
			colorScale
		} : {
			vizSelectedStateObject: ModView_VizOptionsData_SubPart_selectedStateObject,
			dataPageStateManager_DataFrom_Server : DataPageStateManager
			sortedModMasses,
			modMap,
			projectSearchIds: Array<number>,
			modViewDataManager : ModViewDataManager
			vizOptionsData: ModView_VizOptionsData,
			$tableContainer,
			colorScale
		}) {

		const dataTableId_ThisTable = "Mod View Show Mods Table";

		// create the columns for the table
		const dataTableColumns : Array<DataTable_Column> = ModViewDataTableRenderer_MultiSearch.getDataTableColumns({
			vizSelectedStateObject,
			dataPageStateManager_DataFrom_Server,
			sortedModMasses,
			modMap,
			projectSearchIds,
			modViewDataManager,
			vizOptionsData,
		});

		// create the rows for the table
		const dataTableRows : Array<DataTable_DataRowEntry> = ModViewDataTableRenderer_MultiSearch.getDataTableRows({
			vizSelectedStateObject,
			dataPageStateManager_DataFrom_Server,
			sortedModMasses,
			modMap,
			projectSearchIds,
			modViewDataManager,
			vizOptionsData,
			colorScale
		});

		// assemble the table
		const dataTable_RootTableDataObject = new DataTable_RootTableDataObject({
			columns : dataTableColumns,
			dataTable_DataRowEntries: dataTableRows
		});

		const tableOptions = new DataTable_TableOptions({
			//  Comment out since no further drill down to child table
			// dataRow_GetChildTableData : fake_dataRow_GetChildTableData          //  TODO  Need to provide this for child table processing
			//dataRow_GetChildTable_ReturnReactComponent : psmList_Wrapper_For_SingleReportedPeptide__dataRow_GetChildTable_ReturnReactComponent
			dataRow_GetChildTableData_ViaPromise:ModProteinList_SubTableGenerator.getProteinListSubTable
		});

		const dataTable_RootTableObject = new DataTable_RootTableObject({
			dataTableId : dataTableId_ThisTable,
			tableOptions,
			tableDataObject : dataTable_RootTableDataObject
		});

		// draw the table

		const renderCompleteCallbackFcn = () => {
			console.log("Rendering Mod List END, Now: " + new Date() );
		};

		create_dataTable_Root_React({
			tableObject : dataTable_RootTableObject,
			containerDOMElement : $tableContainer,
			renderCompleteCallbackFcn
		});

	}//end renderDataTable

	static getDataTableRows(
		{
			vizSelectedStateObject,
			dataPageStateManager_DataFrom_Server,
			sortedModMasses,
			modMap,
			projectSearchIds,
			modViewDataManager,
			vizOptionsData,
			colorScale
		} : {
			vizSelectedStateObject : ModView_VizOptionsData_SubPart_selectedStateObject,
			dataPageStateManager_DataFrom_Server : DataPageStateManager
			sortedModMasses,
			modMap,
			projectSearchIds: Array<number>,
			modViewDataManager : ModViewDataManager
			vizOptionsData: ModView_VizOptionsData,
			colorScale
		}) : Array<DataTable_DataRowEntry> {

		const sortedModsToDisplay = ModViewDataTableRenderer_MultiSearch.getSortedModsToDisplay({sortedModMasses, vizSelectedStateObject});
		const projectSearchIdsToDisplay = ModViewDataTableRenderer_MultiSearch.getProjectSearchIdsToDisplay({projectSearchIds, vizSelectedStateObject});

		const dataTableRows : Array<DataTable_DataRowEntry> = [];

		// create a row for each mod mass
		for(const modMass of sortedModsToDisplay) {
			const columnEntries : DataTable_DataRow_ColumnEntry[] = [];

			{
				const columnEntry = new DataTable_DataRow_ColumnEntry({
					valueDisplay : modMass.toString(),
					valueSort : modMass
				});
				columnEntries.push( columnEntry );
			}

			// add a value for each project search id
			for(const projectSearchId of projectSearchIdsToDisplay) {

				const showInt = ((vizOptionsData.data.dataTransformation === undefined || vizOptionsData.data.dataTransformation === 'none') && vizOptionsData.data.psmQuant === 'counts') ? true : false;

				const count:number = showInt ? modMap.get(modMass).get(projectSearchId) : modMap.get(modMass).get(projectSearchId).toExponential(2);

				const cellMgmt_ExternalReactComponent_Data = {
					modMass: modMass,
					projectSearchId: projectSearchId,
					d3ColorScaler: colorScale,
					numericValue : modMap.get(modMass).get(projectSearchId),
					displayedValue : count
				};


				const columnEntry = new DataTable_DataRow_ColumnEntry({
					valueSort : modMap.get(modMass).get(projectSearchId),
					cellMgmt_ExternalReactComponent_Data
				});
				columnEntries.push( columnEntry );


			}

			// data to pass in for the sub table
			const subTableData = new ModProteinList_SubTableProperties({
				dataPageStateManager_DataFrom_Server,
				modViewDataManager,
				vizOptionsData,
				modMass
			});

			// add this row to the rows
			const dataTable_DataRowEntry = new DataTable_DataRowEntry({
				uniqueId : modMass,
				sortOrder_OnEquals : modMass,
				columnEntries,
				dataRow_GetChildTableData_ViaPromise_Parameter:subTableData
			})

			dataTableRows.push( dataTable_DataRowEntry );
		}

		return dataTableRows;
	}

	static getDataTableColumns(
		{
			vizSelectedStateObject,
			dataPageStateManager_DataFrom_Server,
			sortedModMasses,
			modMap,
			projectSearchIds,
			modViewDataManager,
			vizOptionsData,
		} : {
			vizSelectedStateObject : ModView_VizOptionsData_SubPart_selectedStateObject,
			dataPageStateManager_DataFrom_Server: DataPageStateManager
			sortedModMasses,
			modMap,
			projectSearchIds: Array<number>,
			modViewDataManager : ModViewDataManager
			vizOptionsData: ModView_VizOptionsData,
		}) : Array<DataTable_Column> {

		const projectSearchIdsToDisplay = ModViewDataTableRenderer_MultiSearch.getProjectSearchIdsToDisplay({projectSearchIds, vizSelectedStateObject});

		const dataTableColumns : Array<DataTable_Column> = [];

		{
			const dataTableColumn = new DataTable_Column({
				id : "modMass", // Used for tracking sort order. Keep short
				displayName : "Mod Mass",
				width : 100,
				sortable : true,
				style_override_DataRowCell_React : { display: "inline-block", whiteSpace: "nowrap", overflowX: "auto", fontSize: 12 },
				// style_override_header_React : {},  // Optional
				// style_override_React : {},  // Optional
				// cssClassNameAdditions_HeaderRowCell : ""  // Optional, css classes to add to Header Row Cell entry HTML
				// cssClassNameAdditions_DataRowCell : ""   // Optional, css classes to add to Data Row Cell entry HTML
			});
			dataTableColumns.push( dataTableColumn );
		}

		// add a column for each project search id
		for( const projectSearchId of projectSearchIdsToDisplay ) {

			const dataTableColumn = new DataTable_Column({
				id : projectSearchId + "_val", // Used for tracking sort order. Keep short
				displayName : ModViewDataTableRenderer_MultiSearch.getDisplayNameForModMassColumn({projectSearchId, dataPageStateManager_DataFrom_Server, vizOptionsData }),
				width : 100,
				sortable : true,
				style_override_DataRowCell_React : { display: "inline-block", whiteSpace: "nowrap", overflowX: "auto", fontSize: 12 },
				// style_override_header_React : {},  // Optional
				// style_override_React : {},  // Optional
				// cssClassNameAdditions_HeaderRowCell : ""  // Optional, css classes to add to Header Row Cell entry HTML
				// cssClassNameAdditions_DataRowCell : ""   // Optional, css classes to add to Data Row Cell entry HTML
				cellMgmt_ExternalReactComponent : { reactComponent : wholeModTable_ShowCount_ExternalReactComponent }
			});
			dataTableColumns.push( dataTableColumn );
		}

		return dataTableColumns;
	}

	static getDisplayNameForModMassColumn(
		{ projectSearchId, vizOptionsData, dataPageStateManager_DataFrom_Server } :
		{
			projectSearchId:number,
			vizOptionsData: ModView_VizOptionsData,
			dataPageStateManager_DataFrom_Server : DataPageStateManager
		}) : string  {

		const searchId = ModViewDataVizRenderer_MultiSearch.getSearchIdForProjectSearchId({ projectSearchId, dataPageStateManager_DataFrom_Server });

		let displayString = '';

		if(vizOptionsData.data.dataTransformation !== undefined && vizOptionsData.data.dataTransformation !== 'none') {
			displayString = ModViewDataVizRenderer_MultiSearch.getDataTransformationTypeString(vizOptionsData);
		} else {
			const psmQuantType = vizOptionsData.data.quantType === undefined || vizOptionsData.data.quantType === 'psms';
			const quantTypeString = psmQuantType ? 'PSM' : 'Scan';
			displayString = quantTypeString + ' ' + (vizOptionsData.data.psmQuant === 'counts' ? "count" : "ratio");
		}

		displayString += " (" + searchId + ")";

		return displayString;
	}

	static getSortedModsToDisplay({ sortedModMasses, vizSelectedStateObject } : {

		sortedModMasses,
		vizSelectedStateObject : ModView_VizOptionsData_SubPart_selectedStateObject
	}) : Array<number> {

		console.log('called getSortedModsToDisplay()');
		console.log('sortedModMasses', sortedModMasses);
		console.log('vizSelectedStateObject', vizSelectedStateObject);

		if(ModViewDataTableRenderer_MultiSearch.isObjectEmpty( vizSelectedStateObject.data )) {
			return sortedModMasses;
		}

		let sortedModsToDisplay : Array<number> = [ ];
		for( const modMass of sortedModMasses ) {
			//  projectSearchId is a string in this 'for' loop
			for( const projectSearchId of Object.keys(vizSelectedStateObject.data) ) {
				if(vizSelectedStateObject.data[projectSearchId].includes(modMass)) {
					sortedModsToDisplay.push(modMass);
					break;
				}
			}
		}

		return sortedModsToDisplay;
	}

	static getProjectSearchIdsToDisplay({ projectSearchIds, vizSelectedStateObject } : {
		projectSearchIds: Array<number>,
		vizSelectedStateObject: ModView_VizOptionsData_SubPart_selectedStateObject
	}) : Array<number> {

		if(ModViewDataTableRenderer_MultiSearch.isObjectEmpty( vizSelectedStateObject.data )) {
			return projectSearchIds;
		}

		let projectSearchIdsToDisplay : Array<number> = [ ];

		for( const projectSearchId of projectSearchIds ) {
			if(vizSelectedStateObject.data[projectSearchId] !== undefined && vizSelectedStateObject.data[projectSearchId].length > 0) {
				projectSearchIdsToDisplay.push( projectSearchId );
			}
		}

		return projectSearchIdsToDisplay;
	}

	static isObjectEmpty(obj) {
		if( Object.keys(obj).length === 0 && obj.constructor === Object ) {
			return true;
		}

		return false;
	}


}