/**
 * proteinExperiment__createProteinList_DataTable_ColumnObject.ts
 *
 *
 *
 */


import {
    DataTable_Column, DataTable_Column_DownloadTable
} from "page_js/data_pages/data_table_react/dataTable_React_DataObjects";
import {ProteinExperiment_Create_conditions_with_their_project_search_ids_for_condition_groupResultEntry} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_root/js/proteinExperimentPage_Display";

/**
 * Create Table Columns
 */
export class ProteinExperiment__CreateProteinDataTableColumns_Class {

    /**
     * Create Table Columns
     */
    proteinExperiment__getProteinDataTableColumns(
        {
            conditions_for_condition_group_with_their_project_search_ids, googleChart_Width, googleChart_heightInitial
            /*, projectSearchIds, searchNamesKeyProjectSearchId */
        }: {
            conditions_for_condition_group_with_their_project_search_ids: Array<ProteinExperiment_Create_conditions_with_their_project_search_ids_for_condition_groupResultEntry>
            googleChart_Width : number
            googleChart_heightInitial: number

        }): {
        dataTable_Columns : Array<DataTable_Column>
        dataTable_Column_DownloadTable_Entries : Array<DataTable_Column_DownloadTable>
    }  {

        let columns: Array<DataTable_Column> = [];
        const dataTable_Column_DownloadTable_Entries : Array<DataTable_Column_DownloadTable> = [];

        //  Elements for each row must be in the same order as in this array

        {
            const displayName = 'Protein(s)';

            const column = new DataTable_Column({
                id: 'protName', //  Short string that is unique for each column
                displayName,
                sortable: true, // Will sort using Javascript < > on the 'value' property
                width: 350, // pixels, must be a number.  style 'width' and 'maxWidth' properties.
            });
            columns.push(column);

            const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
            dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
        }

        {
            const displayName = 'Protein Description(s)';

            const column = new DataTable_Column({
                id: 'protDesc', //  Short string that is unique for each column
                displayName,
                sortable: true, // Will sort using Javascript < > on the 'value' property
                width: 200, // pixels, must be a number.  style 'width' and 'maxWidth' properties.
            });
            columns.push(column);

            const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
            dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
        }

        for (const condition_with_its_project_search_ids of conditions_for_condition_group_with_their_project_search_ids) {

            const condition = condition_with_its_project_search_ids.condition;

            const displayName = "PSMs (" + condition.label + ")";

            const column = new DataTable_Column({
                id: 'condition_' + condition.id, //  Short string that is unique for each column
                displayName,
                sortable: true, // Will sort using Javascript < > on the 'value' property
                width: 80 // pixels, must be a number.  style 'width' and 'maxWidth' properties.
            });
            columns.push(column);

            const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
            dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
        }

        if (conditions_for_condition_group_with_their_project_search_ids.length > 0) {

            const displayName = 'PSMs per Condition';

            const column = new DataTable_Column({
                id: 'extFun', //  Short string that is unique for each column
                displayName,
                // sortable: true, // Will sort using Javascript < > on the 'value' property

                width: googleChart_Width, // pixels, must be a number.  style 'width' and 'maxWidth' properties.
                heightInitial: googleChart_heightInitial // pixels, must be a number.  style 'height' property, not 'maxHeight' property
            });
            columns.push(column);

            //  Skip adding to download since graphic
        }

        // if ( conditions_for_condition_group_with_their_project_search_ids.length > 0 ) {
        //     const column = new DataTable_Column({
        //         id : 'extFun', //  Short string that is unique for each column
        //         displayName :  'PSMs per Condition - React Component - Only Up to 3 Conditions For Initial Testing',
        //         // sortable: true, // Will sort using Javascript < > on the 'value' property

        //         width :             _SVG_WIDTH_ProteinExperimentPage_PSMs_Per_Condition_Component, // pixels, must be a number.  style 'width' and 'maxWidth' properties.
        //         heightInitial :     _SVG_HEIGHT_ProteinExperimentPage_PSMs_Per_Condition_Component, // pixels, must be a number.  style 'height' property, not 'maxHeight' property
        //         // css_class : ' clickable ' // + _CSS_CLASS_SELECTOR_PROTEIN_NAME + ' '

        //     });

        //     columns.push( column );
        // }

        // import { ProteinExperimentPage_PSMs_Per_Condition_Component, _SVG_WIDTH as _SVG_WIDTH_ProteinExperimentPage_PSMs_Per_Condition_Component, _SVG_HEIGHT as _SVG_HEIGHT_ProteinExperimentPage_PSMs_Per_Condition_Component } from '../jsx/proteinExperimentPage_PSMs_Per_Condition_Component';


        return { dataTable_Columns: columns, dataTable_Column_DownloadTable_Entries };
    };
}
