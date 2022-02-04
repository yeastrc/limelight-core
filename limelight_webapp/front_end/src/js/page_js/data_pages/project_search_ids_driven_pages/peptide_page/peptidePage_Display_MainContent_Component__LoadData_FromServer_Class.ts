import {ProteinViewPage_LoadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder";
import {SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {PeptidePage_Display_MainContent_Component_nonClass_Functions} from "page_js/data_pages/project_search_ids_driven_pages/peptide_page/peptidePage_Display_MainContent_Component_nonClass_Functions";

/**
 * peptidePage_Display_MainContent_Component__LoadData_FromServer_Class.ts
 *
 * peptidePage_Display_MainContent_Component.tsx
 *
 */


export class PeptidePage_Display_MainContent_Component__LoadData_FromServer_Class {

    private _load_InProgress__loadData_For_scanFilenameId_On_PSM_Filter_UserSelection: boolean
    private _load_InProgress__loadData_For_scan_RetentionTime_MZ_UserSelection: boolean

    private _promise__load_PsmIds_Per_ReportedPeptide: Promise<unknown>
    private _promise__load_PsmTableData: Promise<any>
    private _promise__load_SpectralStorage_NO_Peaks_Data_IfNeeded: Promise<any>

    /**
     *
     * @param projectSearchIds
     * @param loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
     * @param searchDataLookupParamsRoot
     */
    loadData_For_scanFilenameId_On_PSM_Filter_UserSelection(
        {
            projectSearchIds,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            searchDataLookupParamsRoot
        } : {
            projectSearchIds : Array<number>,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>,
            searchDataLookupParamsRoot: SearchDataLookupParameters_Root

        }) : {
        load_Already_InProgress: boolean
        promise: Promise<any>
    } {

        if ( this._load_InProgress__loadData_For_scanFilenameId_On_PSM_Filter_UserSelection ) {
            return { load_Already_InProgress: true, promise: null };
        }

        const promises: Array<Promise<unknown>> = [];

        if ( ! this._promise__load_PsmIds_Per_ReportedPeptide ) {

            this._promise__load_PsmIds_Per_ReportedPeptide = PeptidePage_Display_MainContent_Component_nonClass_Functions.load_PsmIds_Per_ReportedPeptideId_IfNeeded({
                projectSearchIds,
                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                searchDataLookupParamsRoot
            });
        }
        if ( this._promise__load_PsmIds_Per_ReportedPeptide ) {
            promises.push( this._promise__load_PsmIds_Per_ReportedPeptide );
        }

        if ( ! this._promise__load_PsmTableData ) {

            this._promise__load_PsmTableData = PeptidePage_Display_MainContent_Component_nonClass_Functions.load_PsmTableData_IfNeeded({
                projectSearchIds,
                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                searchDataLookupParamsRoot
            });
        }
        if ( this._promise__load_PsmTableData ) {
            promises.push( this._promise__load_PsmTableData );
        }

        if ( promises.length === 0 ) {

            return { load_Already_InProgress: false, promise: null };
        }

        this._load_InProgress__loadData_For_scanFilenameId_On_PSM_Filter_UserSelection = true;

        const promiseAll = Promise.all( promises );

        promiseAll.catch( result => {
            this._load_InProgress__loadData_For_scanFilenameId_On_PSM_Filter_UserSelection = false;
        });

        promiseAll.then( result => {
            this._load_InProgress__loadData_For_scanFilenameId_On_PSM_Filter_UserSelection = false;
        });

        return { load_Already_InProgress: false, promise: promiseAll };
    }

    /**
     *
     * @param projectSearchIds
     * @param loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
     * @param searchDataLookupParamsRoot
     */
    loadData_For_scan_RetentionTime_MZ_UserSelection(
        {
            projectSearchIds,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            searchDataLookupParamsRoot
        } : {
            projectSearchIds : Array<number>,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>,
            searchDataLookupParamsRoot: SearchDataLookupParameters_Root

        }) : {
        load_Already_InProgress: boolean
        promise: Promise<any>
    } {

        if ( this._load_InProgress__loadData_For_scan_RetentionTime_MZ_UserSelection ) {
            return { load_Already_InProgress: true, promise: null };
        }

        const promises: Array<Promise<unknown>> = [];

        if ( ! this._promise__load_PsmIds_Per_ReportedPeptide ) {

            this._promise__load_PsmIds_Per_ReportedPeptide = PeptidePage_Display_MainContent_Component_nonClass_Functions.load_PsmIds_Per_ReportedPeptideId_IfNeeded({
                projectSearchIds,
                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                searchDataLookupParamsRoot
            });
        }
        if ( this._promise__load_PsmIds_Per_ReportedPeptide ) {
            promises.push( this._promise__load_PsmIds_Per_ReportedPeptide );
        }

        if ( ! this._promise__load_PsmTableData ) {

            this._promise__load_PsmTableData = PeptidePage_Display_MainContent_Component_nonClass_Functions.load_PsmTableData_IfNeeded({
                projectSearchIds,
                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                searchDataLookupParamsRoot
            });
        }
        if ( this._promise__load_PsmTableData ) {
            promises.push( this._promise__load_PsmTableData );
        }

        if ( ! this._promise__load_SpectralStorage_NO_Peaks_Data_IfNeeded ) {

            this._promise__load_SpectralStorage_NO_Peaks_Data_IfNeeded = PeptidePage_Display_MainContent_Component_nonClass_Functions.load_SpectralStorage_NO_Peaks_Data_IfNeeded({
                projectSearchIds,
                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
            });
        }
        if ( this._promise__load_SpectralStorage_NO_Peaks_Data_IfNeeded ) {
            promises.push( this._promise__load_SpectralStorage_NO_Peaks_Data_IfNeeded );
        }

        if ( promises.length === 0 ) {

            return { load_Already_InProgress: false, promise: null };
        }

        this._load_InProgress__loadData_For_scan_RetentionTime_MZ_UserSelection = true;

        const promiseAll = Promise.all( promises );

        promiseAll.catch( result => {
            this._load_InProgress__loadData_For_scan_RetentionTime_MZ_UserSelection = false;
        });
        promiseAll.then( result => {
            this._load_InProgress__loadData_For_scan_RetentionTime_MZ_UserSelection = false;
        });


        return { load_Already_InProgress: false, promise: promiseAll };
    }
}