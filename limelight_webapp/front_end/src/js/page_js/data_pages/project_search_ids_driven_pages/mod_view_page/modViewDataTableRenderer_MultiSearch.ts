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
	DataTable_RootTableDataObject_Both_ColumnArrays,
	DataTable_Column_DownloadTable,
	DataTable_DataRowEntry_DownloadTable_SingleColumn,
	DataTable_DataRow_ColumnEntry_SearchTableData,
	DataTable_DataRowEntry_DownloadTable,
	DataTable_DataRowEntry__GetChildTableData_CallbackParams,
	DataTable_DataRow_ColumnEntry__valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough_Params,
	DataTable_DataRow_ColumnEntry__valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough,

} from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';
import {ModViewDataVizRenderer_MultiSearch} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewMainDataVizRender_MultiSearch";
import {create_dataTable_Root_React} from "page_js/data_pages/data_table_react/dataTable_TableRoot_React_Create_Remove_Table_DOM";
import {
	get_WholeModTable_ShowCount_ExternalReactComponent
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/whole_mod_table_show_count_External_Component";
import {ModProteinList_SubTableGenerator} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modProteinList_SubTableGenerator";
import {ModProteinList_SubTableProperties} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modProteinList_SubTableProperties";
import {DataPageStateManager} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {ModViewDataManager} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewDataManager";
import {
	ModView_VizOptionsData,
	ModView_VizOptionsData_SubPart_selectedStateObject
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modView_VizOptionsData";
import {modViewDataTableRenderer_MultiSearch_Subcomponents__Cell_ExternalModLinks_Contents} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewDataTableRenderer_MultiSearch_Subcomponents";
import {ModDataUtils} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modDataUtils";

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
			dataTableContainer_DOM_Element,
			colorScale
		} : {
			vizSelectedStateObject: ModView_VizOptionsData_SubPart_selectedStateObject,
			dataPageStateManager_DataFrom_Server : DataPageStateManager
			sortedModMasses,
			modMap,
			projectSearchIds: Array<number>,
			modViewDataManager : ModViewDataManager
			vizOptionsData: ModView_VizOptionsData,
			dataTableContainer_DOM_Element,
			colorScale
		}) {

		const dataTableId_ThisTable = "Mod View Show Mods Table";

		// create the columns for the table
		const dataTable_RootTableDataObject_Both_ColumnArrays : DataTable_RootTableDataObject_Both_ColumnArrays = ModViewDataTableRenderer_MultiSearch.getDataTableColumns({
			vizSelectedStateObject,
			dataPageStateManager_DataFrom_Server,
			projectSearchIds,
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
			columns : dataTable_RootTableDataObject_Both_ColumnArrays.columns,
			columns_tableDownload : dataTable_RootTableDataObject_Both_ColumnArrays.columns_tableDownload,
			dataTable_DataRowEntries: dataTableRows
		});

		const tableOptions = new DataTable_TableOptions({enable_Pagination_Download_Search: true});

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
			containerDOMElement : dataTableContainer_DOM_Element,
			renderCompleteCallbackFcn
		});

	}//end renderDataTable

	private static getDataTableRows(
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
			const dataColumns_tableDownload : Array<DataTable_DataRowEntry_DownloadTable_SingleColumn> = [];

			{
				const valueDisplay = modMass.toString();
				const searchEntriesForColumn : Array<string> = [ valueDisplay ]
				const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
				const columnEntry = new DataTable_DataRow_ColumnEntry({
					searchTableData,
					valueDisplay,
					valueSort : modMass
				});
				columnEntries.push( columnEntry );

				const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
				dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
			}

			{
				const searchTableData_SearchContent = '';		// not searchable

				const valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough : DataTable_DataRow_ColumnEntry__valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough =
					( params : DataTable_DataRow_ColumnEntry__valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough_Params ) : JSX.Element => {

						return modViewDataTableRenderer_MultiSearch_Subcomponents__Cell_ExternalModLinks_Contents({ modMass });
					};

				const searchEntriesForColumn : Array<string> = [ searchTableData_SearchContent ]
				const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
				const columnEntry = new DataTable_DataRow_ColumnEntry({
					searchTableData,
					valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough,
					valueSort : modMass
				});
				columnEntries.push( columnEntry );

			}

			// add a value for each project search id
			for(const projectSearchId of projectSearchIdsToDisplay) {

				const showInt = ((vizOptionsData.data.dataTransformation === undefined || vizOptionsData.data.dataTransformation === 'none') && vizOptionsData.data.psmQuant === 'counts') ? true : false;

				const count = showInt ? modMap.get(modMass).get(projectSearchId) : modMap.get(modMass).get(projectSearchId).toExponential(2);

				const valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough =
					( params : DataTable_DataRow_ColumnEntry__valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough_Params ) : JSX.Element => {

						return get_WholeModTable_ShowCount_ExternalReactComponent({
							modMass: modMass,
							projectSearchId: projectSearchId,
							d3ColorScaler: colorScale,
							numericValue : modMap.get(modMass).get(projectSearchId),
							displayedValue : count
						});
					};

				let valueDisplay__Search_Download : string = "";
				if ( count !== undefined && count !== null ) {
					valueDisplay__Search_Download = count.toString();
				}
				const searchEntriesForColumn : Array<string> = [ valueDisplay__Search_Download ]
				const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
				const columnEntry = new DataTable_DataRow_ColumnEntry({
					searchTableData,
					valueSort : modMap.get(modMass).get(projectSearchId),
					valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough
				});
				columnEntries.push( columnEntry );

				const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay__Search_Download })
				dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
			}

			// data to pass in for the sub table
			const subTableData = new ModProteinList_SubTableProperties({
				dataPageStateManager_DataFrom_Server,
				modViewDataManager,
				vizOptionsData,
				modMass
			});

			const dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject =
				( params : DataTable_DataRowEntry__GetChildTableData_CallbackParams ) : Promise<DataTable_RootTableObject> => {

					return ModProteinList_SubTableGenerator.getProteinListSubTable(subTableData)
				};

			const dataTable_DataRowEntry_DownloadTable = new DataTable_DataRowEntry_DownloadTable({ dataColumns_tableDownload });

			// add this row to the rows
			const dataTable_DataRowEntry = new DataTable_DataRowEntry({
				uniqueId : modMass,
				sortOrder_OnEquals : modMass,
				columnEntries,
				dataTable_DataRowEntry_DownloadTable,
				dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject
			})

			dataTableRows.push( dataTable_DataRowEntry );
		}

		return dataTableRows;
	}

	private static getDataTableColumns(
		{
			vizSelectedStateObject,
			dataPageStateManager_DataFrom_Server,
			projectSearchIds,
			vizOptionsData,
		} : {
			vizSelectedStateObject : ModView_VizOptionsData_SubPart_selectedStateObject,
			dataPageStateManager_DataFrom_Server: DataPageStateManager
			projectSearchIds: Array<number>,
			vizOptionsData: ModView_VizOptionsData,
		}) : DataTable_RootTableDataObject_Both_ColumnArrays {

		const projectSearchIdsToDisplay = ModViewDataTableRenderer_MultiSearch.getProjectSearchIdsToDisplay({projectSearchIds, vizSelectedStateObject});

		const dataTableColumns : Array<DataTable_Column> = [];
		const dataTable_Column_DownloadTable_Entries : Array<DataTable_Column_DownloadTable> = [];

		{
			const displayName = "Mod Mass";

			const dataTableColumn = new DataTable_Column({
				id : "modMass", // Used for tracking sort order. Keep short
				displayName,
				width : 75,
				sortable : true
			});
			dataTableColumns.push( dataTableColumn );

			const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
			dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
		}

		{
			const displayName = "Info";

			const dataTableColumn = new DataTable_Column({
				id : "info", // Used for tracking sort order. Keep short
				displayName,
				width : 85,
				sortable : false,
				columnHeader_Tooltip_HTML_TitleAttribute : "Links to annotations for this modification mass in external sites."
			});
			dataTableColumns.push( dataTableColumn );

		}

		// add a column for each project search id
		for( const projectSearchId of projectSearchIdsToDisplay ) {

			const displayName = ModViewDataTableRenderer_MultiSearch.getDisplayNameForModMassColumn({projectSearchId, dataPageStateManager_DataFrom_Server, vizOptionsData });

			const dataTableColumn = new DataTable_Column({
				id : projectSearchId + "_val", // Used for tracking sort order. Keep short
				displayName,
				width : 100,
				sortable : true
			});
			dataTableColumns.push( dataTableColumn );

			const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
			dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
		}

		const dataTable_RootTableDataObject_Both_ColumnArrays = new DataTable_RootTableDataObject_Both_ColumnArrays({ columns: dataTableColumns, columns_tableDownload: dataTable_Column_DownloadTable_Entries });

		return dataTable_RootTableDataObject_Both_ColumnArrays;
	}

	private static getDisplayNameForModMassColumn(
		{ projectSearchId, vizOptionsData, dataPageStateManager_DataFrom_Server } :
		{
			projectSearchId:number,
			vizOptionsData: ModView_VizOptionsData,
			dataPageStateManager_DataFrom_Server : DataPageStateManager
		}) : string  {

		const searchIdXorShortName = ModDataUtils.getSearchShortNameXorSearchIdForProjectSearchId({projectSearchId, dataPageStateManager_DataFrom_Server});

		let displayString = '';

		if(vizOptionsData.data.dataTransformation !== undefined && vizOptionsData.data.dataTransformation !== 'none') {
			displayString = ModViewDataVizRenderer_MultiSearch.getDataTransformationTypeString(vizOptionsData);
		} else {
			const psmQuantType = vizOptionsData.data.quantType === undefined || vizOptionsData.data.quantType === 'psms';
			const quantTypeString = psmQuantType ? 'PSM' : 'Scan';
			displayString = quantTypeString + ' ' + (vizOptionsData.data.psmQuant === 'counts' ? "count" : "ratio");
		}

		displayString += " (" + searchIdXorShortName + ")";

		return displayString;
	}

	private static getSortedModsToDisplay({ sortedModMasses, vizSelectedStateObject } : {

		sortedModMasses,
		vizSelectedStateObject : ModView_VizOptionsData_SubPart_selectedStateObject
	}) : Array<number> {

		console.log('called getSortedModsToDisplay()');
		console.log('sortedModMasses', sortedModMasses);
		console.log('vizSelectedStateObject', vizSelectedStateObject);

		if( ( ! vizSelectedStateObject.data__ModMass_Array_Map_Key_ProjectSearchId ) || vizSelectedStateObject.data__ModMass_Array_Map_Key_ProjectSearchId.size === 0 ) {
			return sortedModMasses;
		}

		let sortedModsToDisplay : Array<number> = [ ];
		for( const modMass of sortedModMasses ) {

			for( const projectSearchId of vizSelectedStateObject.data__ModMass_Array_Map_Key_ProjectSearchId.keys() ) {
				if(vizSelectedStateObject.data__ModMass_Array_Map_Key_ProjectSearchId.get(projectSearchId).includes(modMass)) {
					sortedModsToDisplay.push(modMass);
					break;
				}
			}
		}

		return sortedModsToDisplay;
	}

	private static getProjectSearchIdsToDisplay({ projectSearchIds, vizSelectedStateObject } : {
		projectSearchIds: Array<number>,
		vizSelectedStateObject: ModView_VizOptionsData_SubPart_selectedStateObject
	}) : Array<number> {

		if( ( ! vizSelectedStateObject.data__ModMass_Array_Map_Key_ProjectSearchId ) || vizSelectedStateObject.data__ModMass_Array_Map_Key_ProjectSearchId.size === 0 ) {
			return projectSearchIds;
		}

		let projectSearchIdsToDisplay : Array<number> = [ ];

		for( const projectSearchId of projectSearchIds ) {

			if(vizSelectedStateObject.data__ModMass_Array_Map_Key_ProjectSearchId.get(projectSearchId) !== undefined && vizSelectedStateObject.data__ModMass_Array_Map_Key_ProjectSearchId.get(projectSearchId).length > 0) {
				projectSearchIdsToDisplay.push( projectSearchId );
			}
		}

		return projectSearchIdsToDisplay;
	}

}