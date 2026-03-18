/**
 * scanFileToSearchesPage_Display_MainTableRow_ChildBlock_Component.tsx
 *
 * Scan File to Searches Page - Content when expand a row in the main table
 *
 * Main Content of ScanFileToSearchesView Page
 *
 */

import React from 'react'
import { DataPageStateManager } from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {
    SearchDetailsBlockDataMgmtProcessing
} from "page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsBlockDataMgmtProcessing";
import {
    DataTable_Column,
    DataTable_Column_DownloadTable,
    DataTable_DataRow_ColumnEntry,
    DataTable_DataRow_ColumnEntry_SearchTableData,
    DataTable_DataRowEntry,
    DataTable_DataRowEntry__Get_RowChildContent_CallParams,
    DataTable_DataRowEntry__Get_RowChildContent_Return_ChildContent,
    DataTable_DataRowEntry_DownloadTable,
    DataTable_DataRowEntry_DownloadTable_SingleColumn,
    DataTable_RootTableDataObject,
    DataTable_RootTableObject,
    DataTable_TableOptions
} from "page_js/data_pages/data_table_react/dataTable_React_DataObjects";
import {
    CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters";
import {
    psmList_Etc_Block_DataTable_ExpandChild_ReactComponent__ReturnsComponent
} from "page_js/data_pages/data_table_react_common_child_table_components/psm_list_etc_block__under_standard_project_search_id_peptide_or_reported_peptide_id_psm_ids_search_sub_groups/psm_list_etc_block__root_component_and_code/psmList_Etc_Block_DataTable_ExpandChild_ReactComponent__ReturnsComponent";
import {
    PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_Params
} from "page_js/data_pages/data_table_react_common_child_table_components/psm_list_etc_block__under_standard_project_search_id_peptide_or_reported_peptide_id_psm_ids_search_sub_groups/psm_list_etc_block__sub_components/chromatogram/psmList_Etc_Block__Chromatogram_BasedOnPSMs_Component";
import {
    PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter
} from "page_js/data_pages/data_table_react_common_child_table_components/psm_list_etc_block__under_standard_project_search_id_peptide_or_reported_peptide_id_psm_ids_search_sub_groups/psm_list_etc_block__sub_components/psm_list/js/psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects";
import {
    SearchDataLookupParameters_Root, SearchDataLookupParams_For_Single_ProjectSearchId
} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {
    CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import { DataTable_TableRoot } from "page_js/data_pages/data_table_react/dataTable_TableRoot_React";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import {
    createReportedPeptideDisplayData
} from "page_js/data_pages/data_table_react_common_child_table_components/peptide_list__reported_peptides_for_single_search/js/reportedPeptidesForSingleSearch_create_createReportedPeptideDisplayData";
import {
    CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__SingleProjectSearch";
import {
    Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
    Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId,
    Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__SingleReportedPeptideId_ForSinglePsmId
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId";
import {
    limelight__AnnotationDisplay_CommonFormatting_FilterableAnnotation_NumberFormatting_ForDisplayOnPage
} from "page_js/common_all_pages/annotation_data_display_common_formatting/limelight__AnnotationDisplay_CommonFormatting_FilterableAnnotation_NumberFormatting_ForDisplayOnPage";


export const scanFileToSearchesPage_Display_MainTableRow_ChildBlock__Get_Component = function (
    {
        params_dataTable, componentPropsProp
    } : {
        params_dataTable : DataTable_DataRowEntry__Get_RowChildContent_CallParams
        componentPropsProp: ScanFileToSearchesPage_Display_MainTableRow_ChildBlock_Component_Props_Prop
    }
) : React.JSX.Element  {

    return (
        <ScanFileToSearchesPage_Display_MainTableRow_ChildBlock_Component
            propsValue={ componentPropsProp }
        />
    )
}

export class ScanFileToSearchesPage_Display_MainTableRow_ChildBlock_Component_Data_SinglePSM {

    psmTblData: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId

    generatedPeptideString_Array: Array<string> // May be more than one like when Open Mod multiple Positions

}

export class ScanFileToSearchesPage_Display_MainTableRow_ChildBlock_Component_Data_SingleSearch {

    projectSearchId: number
    psmTblData_Array: Array<ScanFileToSearchesPage_Display_MainTableRow_ChildBlock_Component_Data_SinglePSM> // Array since may be more than one
}


/**
 *
 */
export class ScanFileToSearchesPage_Display_MainTableRow_ChildBlock_Component_Props_Prop {

    projectSearchIds: Array<number>;
    dataPageStateManager: DataPageStateManager
    dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay: DataPageStateManager;
    searchDetailsBlockDataMgmtProcessing: SearchDetailsBlockDataMgmtProcessing;

    componentData_PerSearch_Map_Key_ProjectSearchId: Map<number, ScanFileToSearchesPage_Display_MainTableRow_ChildBlock_Component_Data_SingleSearch>

    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    searchDataLookupParamsRoot : SearchDataLookupParameters_Root
}

/**
 *
 */
interface ScanFileToSearchesPage_Display_MainTableRow_ChildBlock_Component_Props {

    propsValue : ScanFileToSearchesPage_Display_MainTableRow_ChildBlock_Component_Props_Prop
}

/**
 *
 */
interface ScanFileToSearchesPage_Display_MainTableRow_ChildBlock_Component_State {

    force_Rerender?: object

}


/**
 *
 */
class ScanFileToSearchesPage_Display_MainTableRow_ChildBlock_Component extends React.Component< ScanFileToSearchesPage_Display_MainTableRow_ChildBlock_Component_Props, ScanFileToSearchesPage_Display_MainTableRow_ChildBlock_Component_State > {


    //  bind to 'this' for passing as parameters

    private _NOT_CALLED_Function() {

        //  Test function cast


    }

    /**
     *
     */
    constructor(props : ScanFileToSearchesPage_Display_MainTableRow_ChildBlock_Component_Props) {
        super( props );

    }


    render() {

        const elements_For_Searches: Array<React.JSX.Element> = []

        for ( const projectSearchId of this.props.propsValue.projectSearchIds ) {

            const componentData_ForSearch = this.props.propsValue.componentData_PerSearch_Map_Key_ProjectSearchId.get(projectSearchId)
            if ( ! componentData_ForSearch ) {
                continue // EARLY CONTINUE
            }

            const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =  // state object populated in constructor
                this.props.propsValue.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId);
            if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
                throw new Error("No value from this.props.propsValue.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId); for projectSearchId: " + projectSearchId );
            }

            const elements_For_PSMs: Array<React.JSX.Element> = []

            let psmTblData_Array_ElementCounter = 0

            for ( const psmTblData of componentData_ForSearch.psmTblData_Array ) {

                psmTblData_Array_ElementCounter++

                const psmEntries_Include_Map_Key_PsmId_SingleEntry : Map<number, Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__SingleReportedPeptideId_ForSinglePsmId> = new Map()
                {
                    const psmEntry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__SingleReportedPeptideId_ForSinglePsmId({
                        psmId: psmTblData.psmTblData.psmId
                    })
                    psmEntries_Include_Map_Key_PsmId_SingleEntry.set( psmEntry.psmId, psmEntry )
                }

                const params_DataTableCallback: DataTable_DataRowEntry__Get_RowChildContent_CallParams = {}

                const psmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_Params: PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_Params = {
                    commonData_LoadedFromServer_PerSearch_For_ProjectSearchId
                }

                const psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter = new PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter({

                    projectSearchId,
                    reportedPeptideId : psmTblData.psmTblData.reportedPeptideId,                                      // NOT required if have psmIds_Include
                    searchSubGroupId : undefined,                                       // Optional, only allowed if reportedPeptideId is populated
                    openModPositionOverride : undefined,
                    searchDataLookupParamsRoot : this.props.propsValue.searchDataLookupParamsRoot,
                    dataPageStateManager : this.props.propsValue.dataPageStateManager,
                    psmEntries_Include_Map_Key_PsmId: psmEntries_Include_Map_Key_PsmId_SingleEntry,
                    dataTable__enable_Pagination_Download_Search: false,  // Override from true to false
                    commonData_LoadedFromServer_PerSearch_For_ProjectSearchId,
                    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__WhenAvailable: undefined
                })


                const element_PSM_Entry = (
                    <div key={ psmTblData.psmTblData.psmId }>
                        <div style={ { marginBottom: 10 } }>
                            <div style={ { marginBottom: 3 } }>
                                <div style={ { display: "grid", gridTemplateColumns: "max-content 1fr", alignItems: "baseline" } }>
                                    <div>
                                        <span style={ { fontSize: 18, fontWeight: "bold", paddingRight: 6 } }>
                                            {/* Peptide: or Peptides: */ }
                                            <span>Peptide</span>
                                            { psmTblData.generatedPeptideString_Array.length > 1 ? (
                                                <span>s</span>
                                            ) : null }
                                            <span>: </span>
                                        </span>
                                    </div>
                                    <div>
                                        {/*  Peptide Strings Comma Delim  */}
                                        <span>{ psmTblData.generatedPeptideString_Array.join( ", " ) }</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*  Data for the PSM/Peptide(s)  */}
                        <div style={ { marginLeft: 30 } }>
                            <div>
                                <INTERNAL_ScanFileToSearchesPage_Display_MainTableRow_ChildBlock_ReportedPeptide_Data_ForPSM_Component
                                    psmData_ThisComponentParam={ psmTblData }

                                    projectSearchId={ projectSearchId }
                                    dataPageStateManager={ this.props.propsValue.dataPageStateManager }

                                    commonData_LoadedFromServer_PerSearch_For_ProjectSearchId={ commonData_LoadedFromServer_PerSearch_For_ProjectSearchId }
                                    searchDataLookupParamsRoot={ this.props.propsValue.searchDataLookupParamsRoot }
                                />
                            </div>

                            <div>
                                <INTERNAL__ScanFileToSearchesPage_Display_MainTableRow_ChildBlock_PSM_Table_Component
                                    params_DataTableCallback={ params_DataTableCallback }
                                    psmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_Params={ psmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_Params }
                                    psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter={ psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter }
                                />
                            </div>
                        </div>
                    </div>
                )
                elements_For_PSMs.push( element_PSM_Entry )
            }

            let searchLabel_Element: React.JSX.Element = undefined
            const style_ForDiv_DataForSearch: React.CSSProperties = {}

            if ( this.props.propsValue.projectSearchIds.length > 1 ) {

                //  > 1 search so display search name and Indent data

                const searchData = this.props.propsValue.dataPageStateManager.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId )
                if ( ! searchData ) {
                    throw Error( "this.props.propsValue.dataPageStateManager.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId )
                }

                searchLabel_Element = (
                    <div style={ { marginBottom: 7 } }>
                        <div style={ { display: "grid", gridTemplateColumns: "max-content 1fr", alignItems: "baseline" } }>
                            <div>
                                <span style={ { fontSize: 18, fontWeight: "bold", paddingRight: 6 } }>Search: </span>
                            </div>
                            <div>{ searchData.name } ({ searchData.searchId })</div>
                        </div>
                    </div>
                )

                style_ForDiv_DataForSearch.marginLeft = 20  //  Indent right
            }

            const elements_For_Search = (
                <div key={ projectSearchId } style={ { marginBottom: 7 } }>
                    { searchLabel_Element }
                    <div style={ style_ForDiv_DataForSearch }>

                        { elements_For_PSMs }
                    </div>
                </div>
            )

            elements_For_Searches.push( elements_For_Search )
        }


        return (
            <div>
                { elements_For_Searches }
            </div>
        );
    }

}




/**
 *
 */
interface INTERNAL__ScanFileToSearchesPage_Display_MainTableRow_ChildBlock_PSM_Table_Component_Props {

    params_DataTableCallback: DataTable_DataRowEntry__Get_RowChildContent_CallParams
    psmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_Params: PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_Params
    psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter : PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter
}

/**
 *
 */
interface INTERNAL__ScanFileToSearchesPage_Display_MainTableRow_ChildBlock_PSM_Table_Component_State {

    force_Rerender?: object

}


/**
 *
 */
class INTERNAL__ScanFileToSearchesPage_Display_MainTableRow_ChildBlock_PSM_Table_Component extends React.Component< INTERNAL__ScanFileToSearchesPage_Display_MainTableRow_ChildBlock_PSM_Table_Component_Props, INTERNAL__ScanFileToSearchesPage_Display_MainTableRow_ChildBlock_PSM_Table_Component_State > {


    //  bind to 'this' for passing as parameters

    private _NOT_CALLED_Function() {

        //  Test function cast


    }

    private _get_RowChildContent_Return_ChildContent_Function: DataTable_DataRowEntry__Get_RowChildContent_Return_ChildContent

    /**
     *
     */
    constructor( props: INTERNAL__ScanFileToSearchesPage_Display_MainTableRow_ChildBlock_PSM_Table_Component_Props ) {
        super( props );

    }

    componentDidMount() {


        const psmList_Promise = psmList_Etc_Block_DataTable_ExpandChild_ReactComponent__ReturnsComponent({
            params_DataTableCallback: this.props.params_DataTableCallback,
            psmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_Params: this.props.psmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_Params,
            psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter: this.props.psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter
        })

        psmList_Promise.catch(reason => {})
        psmList_Promise.then(value => {
            this._get_RowChildContent_Return_ChildContent_Function = value

            this.setState({ force_Rerender: {} })
        })
    }

    render() {
        if ( ! this._get_RowChildContent_Return_ChildContent_Function ) {
            return (
                <div>
                    Loading PSM data
                </div>
            )
        }

        return (
            <div>
                { this._get_RowChildContent_Return_ChildContent_Function( this.props.params_DataTableCallback ) }
            </div>
        )
    }
}



/**
 *
 */
interface INTERNAL_ScanFileToSearchesPage_Display_MainTableRow_ChildBlock_ReportedPeptide_Data_ForPSM_Component_Props {

    psmData_ThisComponentParam: ScanFileToSearchesPage_Display_MainTableRow_ChildBlock_Component_Data_SinglePSM

    projectSearchId: number
    dataPageStateManager: DataPageStateManager

    commonData_LoadedFromServer_PerSearch_For_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
    searchDataLookupParamsRoot : SearchDataLookupParameters_Root
}

/**
 *
 */
interface INTERNAL_ScanFileToSearchesPage_Display_MainTableRow_ChildBlock_ReportedPeptide_Data_ForPSM_Component_State {

    force_Rerender?: object

}


/**
 *
 */
class INTERNAL_ScanFileToSearchesPage_Display_MainTableRow_ChildBlock_ReportedPeptide_Data_ForPSM_Component extends React.Component< INTERNAL_ScanFileToSearchesPage_Display_MainTableRow_ChildBlock_ReportedPeptide_Data_ForPSM_Component_Props, INTERNAL_ScanFileToSearchesPage_Display_MainTableRow_ChildBlock_ReportedPeptide_Data_ForPSM_Component_State > {


    //  bind to 'this' for passing as parameters

    private _NOT_CALLED_Function() {

        //  Test function cast


    }

    private _noData_ToRender = false

    private _reportedPeptideAnnotations_Table : DataTable_RootTableObject

    /**
     *
     */
    constructor( props: INTERNAL_ScanFileToSearchesPage_Display_MainTableRow_ChildBlock_ReportedPeptide_Data_ForPSM_Component_Props ) {
        super( props );
        try {
            const projectSearchId = props.projectSearchId

            //   Get annotation types in display order

            let searchDataLookupParams_Single_ProjectSearchId: SearchDataLookupParams_For_Single_ProjectSearchId = undefined;
            for ( const searchDataLookupParamsListEntry of this.props.searchDataLookupParamsRoot.paramsForProjectSearchIds.paramsForProjectSearchIdsList ) {
                if ( searchDataLookupParamsListEntry.projectSearchId === projectSearchId ) {
                    searchDataLookupParams_Single_ProjectSearchId = searchDataLookupParamsListEntry;
                    break;
                }
            }
            if ( ! searchDataLookupParams_Single_ProjectSearchId ) {
                throw Error("searchDataLookupParamsRoot.paramsForProjectSearchIds.paramsForProjectSearchIdsList not contain projectSearchId: " + projectSearchId )
            }
            if ( ( ! searchDataLookupParams_Single_ProjectSearchId.reportedPeptideAnnTypeDisplay ) || searchDataLookupParams_Single_ProjectSearchId.reportedPeptideAnnTypeDisplay.length === 0 ) {
                //  NOTHING to display so return empty array

                this._noData_ToRender = true

            } else {

                this._noData_ToRender = false
            }

        } catch( e ) {
            console.warn("Exception caught in componentDidMount");
            console.warn( e );
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    componentDidMount() {
        try {
            if ( ! this._noData_ToRender ) {
                this._create_Annotations_DataTable()
            }

        } catch( e ) {
            console.warn("Exception caught in componentDidMount");
            console.warn( e );
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private async _create_Annotations_DataTable() {
        try {
            const reportedPeptideId = this.props.psmData_ThisComponentParam.psmTblData.reportedPeptideId

            const reportedPeptideIds_ForDisplay: Set<number> = new Set()
            reportedPeptideIds_ForDisplay.add( reportedPeptideId )

            const entriesMap_KeyReportedPeptideId: Map<number, Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId> = new Map()

            const entryFor_entriesMap_KeyReportedPeptideId = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId({
                reportedPeptideId: reportedPeptideId,
                psmCount_after_Include_Map_Key_SearchSubGroupId: undefined,
                psmEntries_Map_Key_PsmId: undefined,
                psmCount_after_Include: 1
            })

            entriesMap_KeyReportedPeptideId.set( reportedPeptideId, entryFor_entriesMap_KeyReportedPeptideId )


            const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId({
                projectSearchId: this.props.projectSearchId,
                entriesMap_KeyReportedPeptideId
            })

            const createReportedPeptideDisplayData_result = await createReportedPeptideDisplayData({
                show_Protein_Pre_Post_Residues: false,
                reportedPeptideIds_ForDisplay,
                dataPerReportedPeptideId_Map_Key_reportedPeptideId: undefined,
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
                proteinSequenceVersionId : undefined/* Only for error reporting */,
                projectSearchId: this.props.projectSearchId,
                searchDataLookupParamsRoot: this.props.searchDataLookupParamsRoot,
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId: this.props.commonData_LoadedFromServer_PerSearch_For_ProjectSearchId,
                dataPageStateManager: this.props.dataPageStateManager
            });

            let reportedPeptideAnnotations_Table: DataTable_RootTableObject

            {  //  Peptide Annotation Table

                //  Build Display Table Data

                //  Score Columns
                const annotationTypeRecords_DisplayOrder = createReportedPeptideDisplayData_result.annotationTypeRecords_DisplayOrder;
                const reportedPeptideAnnotationTypesForPeptideListEntries = annotationTypeRecords_DisplayOrder.reportedPeptideAnnotationTypesForAnnotationTypeIds;

                const annotationNames_MoreThanOneInstance_InAnnotationList: Set<string> = new Set()

                {
                    const annotationNames_All: Set<string> = new Set()

                    const annotationTypesForPeptideListEntries = annotationTypeRecords_DisplayOrder.reportedPeptideAnnotationTypesForAnnotationTypeIds;
                    for ( const annotation of annotationTypesForPeptideListEntries ) {

                        const displayName = annotation.name;

                        if ( annotationNames_All.has( displayName ) ) {
                            annotationNames_MoreThanOneInstance_InAnnotationList.add( displayName )
                        } else {
                            annotationNames_All.add( displayName )
                        }
                    }
                }

                //  Create Table Columns (Header info and Data Info)

                const dataTable_Columns: Array<DataTable_Column> = [];
                const dataTable_Column_DownloadTable_Entries: Array<DataTable_Column_DownloadTable> = [];
                {
                    const searchProgramsPerSearchItems_For_ProjectSearchId =
                        this.props.dataPageStateManager.get_searchProgramsPerSearchData_Root().searchProgramsPerSearchItems_PerProjectSearchId_Map.get( this.props.projectSearchId )
                    if ( ! searchProgramsPerSearchItems_For_ProjectSearchId ) {
                        const msg = "this.props.dataPageStateManager.get_searchProgramsPerSearchData_Root().searchProgramsPerSearchItems_PerProjectSearchId_Map.get( this.props.projectSearchId ) returned NOTHING for projectSearchId: " + this.props.projectSearchId
                        console.warn(msg)
                        throw Error(msg)
                    }

                    for ( const reportedPeptideAnnotationType of reportedPeptideAnnotationTypesForPeptideListEntries ) {

                        let displayName = reportedPeptideAnnotationType.name;

                        if ( annotationNames_MoreThanOneInstance_InAnnotationList.has( displayName ) ) {
                            //  Same displayName more than once in list so add the search program name to the display

                            const searchProgramsPerSearchItem = searchProgramsPerSearchItems_For_ProjectSearchId.searchProgramsPerSearchItem_Map.get( reportedPeptideAnnotationType.searchProgramsPerSearchId )
                            if ( ! searchProgramsPerSearchItem ) {
                                const msg = "searchProgramsPerSearchItems_For_ProjectSearchId.searchProgramsPerSearchItem_Map.get( reportedPeptideAnnotationType.searchProgramsPerSearchId ) returned NOTHING for reportedPeptideAnnotationType.searchProgramsPerSearchId: " + reportedPeptideAnnotationType.searchProgramsPerSearchId
                                console.warn(msg)
                                throw Error(msg)
                            }

                            displayName += " (" + searchProgramsPerSearchItem.name + ")"
                        }

                        const dataTable_Column = new DataTable_Column({
                            id : "rp_" + reportedPeptideAnnotationType.name, // Used for tracking sort order. Keep short
                            displayName,
                            width : 105,
                            sortable : true
                        });
                        dataTable_Columns.push( dataTable_Column );

                        const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
                        dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
                    }
                }

                //  Create Table Body

                const dataTable_DataRowEntries : Array<DataTable_DataRowEntry> = [];

                let tableRowCounter = 0;

                {
                    tableRowCounter++

                    const dataTable_DataRow_ColumnEntries: Array<DataTable_DataRow_ColumnEntry> = [];
                    const dataColumns_tableDownload : Array<DataTable_DataRowEntry_DownloadTable_SingleColumn> = [];

                    const annotationTypeRecords_DisplayOrder = createReportedPeptideDisplayData_result.annotationTypeRecords_DisplayOrder;

                    const peptideEntry = createReportedPeptideDisplayData_result.peptideList[ 0 ]

                    {  //  Reported Peptide Scores
                        const annotationTypesForPeptideListEntries = annotationTypeRecords_DisplayOrder.reportedPeptideAnnotationTypesForAnnotationTypeIds;
                        for ( const annotationType of annotationTypesForPeptideListEntries ) {
                            if ( peptideEntry.peptideAnnotationMap_KeyAnnType === undefined || peptideEntry.peptideAnnotationMap_KeyAnnType === null ) {
                                const msg = "( peptideEntry.peptideAnnotationMap === undefined || peptideEntry.peptideAnnotationMap === null )"
                                console.warn( msg );
                                throw Error( msg );
                            }
                            const annotationEntry = peptideEntry.peptideAnnotationMap_KeyAnnType.get( annotationType.annotationTypeId );
                            let valueSort : any = annotationEntry.valueDouble;
                            if ( valueSort === undefined || valueSort === null ) {
                                valueSort = annotationEntry.valueString; //  Needed for Descriptive Annotation Types
                            }

                            let valueDisplay = annotationEntry.valueString;

                            let valueDisplay_Download = annotationEntry.valueString;

                            if ( annotationEntry.valueDouble !== undefined && annotationEntry.valueDouble !== null ) {

                                valueDisplay = limelight__AnnotationDisplay_CommonFormatting_FilterableAnnotation_NumberFormatting_ForDisplayOnPage( annotationEntry.valueDouble )

                                valueDisplay_Download = annotationEntry.valueDouble.toString()
                            }

                            const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                            const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                            const columnEntry = new DataTable_DataRow_ColumnEntry({
                                searchTableData,
                                valueDisplay,
                                valueSort
                            })
                            dataTable_DataRow_ColumnEntries.push( columnEntry );

                            const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay_Download })
                            dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
                        }
                    }

                    const dataTable_DataRowEntry_DownloadTable = new DataTable_DataRowEntry_DownloadTable({ dataColumns_tableDownload });

                    const dataTable_DataRowEntry = new DataTable_DataRowEntry({
                        uniqueId: 1,
                        sortOrder_OnEquals: 1,  //  Preserve original sort order on sort with identical values  //  Must be sortable using Javascript < > comparators
                        columnEntries: dataTable_DataRow_ColumnEntries,
                        dataTable_DataRowEntry_DownloadTable
                    });

                    dataTable_DataRowEntries.push( dataTable_DataRowEntry );
                }


                const dataTable_RootTableDataObject = new DataTable_RootTableDataObject({
                    columns : dataTable_Columns,
                    columns_tableDownload: dataTable_Column_DownloadTable_Entries,
                    dataTable_DataRowEntries
                });

                const tableOptions = new DataTable_TableOptions({ enable_Pagination_Download_Search: false });


                const dataTableId_ThisTable = "Reported Peptide Annotation Data List Root Table";

                reportedPeptideAnnotations_Table = new DataTable_RootTableObject({
                    dataTableId : dataTableId_ThisTable,
                    tableOptions,
                    tableDataObject : dataTable_RootTableDataObject
                });
            }

            this._reportedPeptideAnnotations_Table = reportedPeptideAnnotations_Table

            this.setState({ force_Rerender: {} })

        } catch( e ) {
            console.warn("Exception caught in _create_Annotations_DataTable");
            console.warn( e );
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    render() {
        try {
            if ( this._noData_ToRender ) {
                return null // EARLY RETURN
            }

            return (
                <div style={ { marginTop: 10 } }>
                    <div style={ { fontSize: 16, fontWeight: "bold" } }>
                        Reported Peptide annotations:
                    </div>
                    { ! this._reportedPeptideAnnotations_Table ? (
                        <div>
                            Loading...
                        </div>
                    ) : (
                        <div>
                            <DataTable_TableRoot tableObject={ this._reportedPeptideAnnotations_Table }/>
                        </div>
                    ) }
                </div>
            )
        } catch( e ) {
            console.warn("Exception caught in componentDidMount");
            console.warn( e );
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }
}
