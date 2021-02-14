/**
 * experiment_User_Set_Searches_Filters.tsx
 * 
 * 
 * User can change the Filters/Cutoffs on Searches in the experiment
 * 
 * This is used in Experiment Create and Maint and on Data Pages for Experiments
 * 
 *          Repeating Format for provided Project Search Ids
 * 
 *             (search id) search name
 *                   Peptide Filters
 *                         Peptide Filter label  <input >
 *                   PSM Filters
 *                         PSM Filter label  <input >
 */


import React from 'react'

import {Experiment_ConditionGroupsDataContainer_PerProjectSearchId_PerType_Data} from "page_js/data_pages/experiment_data_pages_common/experiment_conditionGroupsDataContainer_PerProjectSearchIdData_AndChildren_Classes";
import { Experiment_ConditionGroupsDataContainer } from 'page_js/data_pages/experiment_data_pages_common/experiment_conditionGroupsDataContainer_Class';
import {GetSearchesAndFolders_SingleProject_PromiseResponse_Item} from "page_js/data_pages/data_pages_common/single_project_its_searches_and_folders/single_project_its_searches_and_folders_WebserviceRetrieval_TS_Classes";
import {
    AnnotationTypeData_Root, AnnotationTypeItem,
    SearchProgramsPerSearchData_Root
} from "page_js/data_pages/data_pages_common/dataPageStateManager";


// const _FILTER_LABEL_PSM = "PSM";
// const _FILTER_LABEL_PEPTIDE = "Peptide";


/**
 * 
 */
export interface Experiment_User_Set_Searches_Filters_Props {

    projectSearchIds : Array<number>
    searchesData : {
        searches_TopLevelAndNestedInFolders: GetSearchesAndFolders_SingleProject_PromiseResponse_Item[],
        searchList_OnlySearches: GetSearchesAndFolders_SingleProject_PromiseResponse_Item[],
        searchesSubData: {
            searchProgramsPerSearchData_Root :  SearchProgramsPerSearchData_Root,
            annotationTypeData_Root : AnnotationTypeData_Root
        }
    }
    conditionGroupsDataContainer : Experiment_ConditionGroupsDataContainer
    save: any // function
    cancel: any // function
}

/**
 * 
 */
interface Experiment_User_Set_Searches_Filters_State {

    saveButtonEnabled?: boolean
    dataMapPerProjectSearchId_KeyProjectSearchId?:  // Derived from props data
        Map<number,
            {
                projectSearchId: number,
                reportedPeptideFilterDataMap_KeyAnnTypeId:
                    Map<number, {
                        annotationTypeId: number, initialValue: number, initialValueString: string, currentValue: number, currentValueString: string,
                        currentValueInvalidValue: boolean, currentValueSameAsInitialValue: boolean
                    }>,
                psmFilterDataMap_KeyAnnTypeId: Map<number, {
                    annotationTypeId: number, initialValue: number, initialValueString: string, currentValue: number, currentValueString: string,
                    currentValueInvalidValue: boolean, currentValueSameAsInitialValue: boolean
                }>
            }>
}

/**
 * 
 */
export class Experiment_User_Set_Searches_Filters extends React.Component< Experiment_User_Set_Searches_Filters_Props, Experiment_User_Set_Searches_Filters_State > {


    private _save_BindThis = this._save.bind(this);
    private _cancel_BindThis = this._cancel.bind(this);

    private _update_data_ForProjectSearchId_Pop_ForAll_AnnTypeData_BindThis = this._update_data_ForProjectSearchId_Pop_ForAll_AnnTypeData.bind(this);
    private _userUpdatedInputValue_Callback_BindThis = this._userUpdatedInputValue_Callback.bind(this);

    private _searchDataMap_KeyProjectSearchId : Map<number,  GetSearchesAndFolders_SingleProject_PromiseResponse_Item>;

    constructor(props : Experiment_User_Set_Searches_Filters_Props) {
        super(props);

        //  Clone Search Filters so can update locally until _save is called.

        const searchFiltersCopyForState = _create_SearchFilters_LocalCopy({ props });


        {
            //   Create Map of Search Data key projectSearchId

           this._searchDataMap_KeyProjectSearchId = new Map();

           const searchesData = this.props.searchesData;
           if ( searchesData ) {
               const searchList = searchesData.searchList_OnlySearches;
               if ( searchList ) {
                   for ( const search of searchList ) {
                       const projectSearchId = search.projectSearchId;
                       this._searchDataMap_KeyProjectSearchId.set( projectSearchId, search );
                   }
               }
           }
        }

        const state = { 
            dataMapPerProjectSearchId_KeyProjectSearchId : searchFiltersCopyForState.dataMapPerProjectSearchId_KeyProjectSearchId,
            saveButtonEnabled : true
        };

        for ( const projectSearchId of props.projectSearchIds ) {
       
            const retVal = this._update_data_ForProjectSearchId_Pop_ForAll_AnnTypeData_SetStateCallback({ 
                projectSearchId, state, props 
            });

            state.dataMapPerProjectSearchId_KeyProjectSearchId = retVal.dataMapPerProjectSearchId_KeyProjectSearchId;
        }

        this.state = state; 
        
    }

    ////////////////////

    /**
     * User Clicked Save or hit enter in a field
     */
    _save( event: any ) {

        // console.log("Experiment_User_Set_Searches_Filters._save()");

        event.preventDefault();

        //  Not really needed since function not called if button disabled for either button click or enter pressed in input field
        if ( ! this.state.saveButtonEnabled ) {
            //  Save Currently Disabled so exit
            return; // EARLY RETURN
        }

        //  Pass ann types with values to save

        const conditionGroupsDataContainer = this.props.conditionGroupsDataContainer;

        const dataMapPerProjectSearchId_KeyProjectSearchId = this.state.dataMapPerProjectSearchId_KeyProjectSearchId;
        if ( dataMapPerProjectSearchId_KeyProjectSearchId && dataMapPerProjectSearchId_KeyProjectSearchId.size !== 0 ) {
            for ( const dataMapPerProjectSearchId_Entry of dataMapPerProjectSearchId_KeyProjectSearchId.entries() ) {
                const dataMapPerProjectSearchId_Value = dataMapPerProjectSearchId_Entry[ 1 ];

                const projectSearchId = dataMapPerProjectSearchId_Value.projectSearchId;
                const reportedPeptideFilterDataMap_KeyAnnTypeId = dataMapPerProjectSearchId_Value.reportedPeptideFilterDataMap_KeyAnnTypeId;
                const psmFilterDataMap_KeyAnnTypeId = dataMapPerProjectSearchId_Value.psmFilterDataMap_KeyAnnTypeId;

                const data_conditionGroupsDataContainer = conditionGroupsDataContainer.get_data_ForProjectSearchId({ projectSearchId });
                if ( ! data_conditionGroupsDataContainer ) {
                    //  No Data for this projectSearchId
                    console.warn("_save(...): No Data from conditionGroupsDataContainer.get_data_ForProjectSearchId(...) for projectSearchId: " + projectSearchId );
                    continue; // EARLY CONTINUE
                }
                
                const result_reportedPeptideFilterData = this._save_PerType_ReportedPeptidePSM({ dataMap_KeyAnnTypeId : reportedPeptideFilterDataMap_KeyAnnTypeId });
                const result_psmFilterData = this._save_PerType_ReportedPeptidePSM({ dataMap_KeyAnnTypeId : psmFilterDataMap_KeyAnnTypeId });

                data_conditionGroupsDataContainer.set_reportedPeptideFilters_PerProjectSearchId( result_reportedPeptideFilterData );
                data_conditionGroupsDataContainer.set_psmFilters_PerProjectSearchId( result_psmFilterData );
            }
        }

        this.props.save({ conditionGroupsDataContainer });
    }

    /**
     * User Clicked Save - Subpart
     */
    _save_PerType_ReportedPeptidePSM(
        {
            dataMap_KeyAnnTypeId
        }: {
            dataMap_KeyAnnTypeId: Map<number, {annotationTypeId: number, initialValue: number, initialValueString: string, currentValue: number, currentValueString: string, currentValueInvalidValue: boolean, currentValueSameAsInitialValue: boolean}>
        }): Array<Experiment_ConditionGroupsDataContainer_PerProjectSearchId_PerType_Data> {

        if ( dataMap_KeyAnnTypeId === undefined || dataMap_KeyAnnTypeId === null ) {
            return undefined;
        }
        let resultArray: Array<Experiment_ConditionGroupsDataContainer_PerProjectSearchId_PerType_Data> = undefined;
        for ( const entry of dataMap_KeyAnnTypeId.entries() ) {
            const entryValue = entry[ 1 ];
            
            const annotationTypeId = entryValue.annotationTypeId;
            const currentValue = entryValue.currentValue;

            if ( currentValue === undefined ) {
                //  No value for this entry so skip to next
                continue; // EARLY CONTINUE
            }

            const resultEntry = new Experiment_ConditionGroupsDataContainer_PerProjectSearchId_PerType_Data();
            resultEntry.set_annTypeId( annotationTypeId );
            resultEntry.set_value( currentValue );

            if ( resultArray === undefined ) {
                resultArray = [];
            }

            resultArray.push( resultEntry );
        }

        return resultArray;
    }

    /**
     * User Clicked Cancel or "X"
     */
    _cancel( event: any ) {

        // console.log("_cancel called");

        this.props.cancel();
    }

    /**
     * User Clicked Show all filters for Search
     */
    _update_data_ForProjectSearchId_Pop_ForAll_AnnTypeData({ projectSearchId }: { projectSearchId: any }) {

        // console.log( "_update_data_ForProjectSearchId_Pop_ForAll_AnnTypeData: projectSearchId: " + projectSearchId );

        this.setState( (state: Experiment_User_Set_Searches_Filters_State, props: Experiment_User_Set_Searches_Filters_Props): Experiment_User_Set_Searches_Filters_State => {

            return this._update_data_ForProjectSearchId_Pop_ForAll_AnnTypeData_SetStateCallback({ 
                projectSearchId, state, props 
            });
        });
    }
 
    /**
     * 
     */
    _update_data_ForProjectSearchId_Pop_ForAll_AnnTypeData_SetStateCallback({ 
        projectSearchId, state, props 
    }: {
        projectSearchId: any
        state: Experiment_User_Set_Searches_Filters_State
        props: Experiment_User_Set_Searches_Filters_Props
    }) {

        // console.log( "_update_data_ForProjectSearchId_Pop_ForAll_AnnTypeData_SetStateCallback: projectSearchId: " + projectSearchId );
        const dataMapPerProjectSearchId_KeyProjectSearchId = state.dataMapPerProjectSearchId_KeyProjectSearchId;

        const data_ForProjectSearchId_ReportedPeptidePSM_Local = dataMapPerProjectSearchId_KeyProjectSearchId.get( projectSearchId );
        if ( ! data_ForProjectSearchId_ReportedPeptidePSM_Local ) {
            throw Error("No value in dataMapPerProjectSearchId_KeyProjectSearchId for projectSearchId: " + projectSearchId );
        }

        const projectSearchIds = [ projectSearchId ];

        _searchFilterValues_PopulateNotSetWithEmptyString({ 
            projectSearchIds, searchDataMap_KeyProjectSearchId : this._searchDataMap_KeyProjectSearchId, searchesData : props.searchesData, dataMapPerProjectSearchId_KeyProjectSearchId 
        });

        return { 
            dataMapPerProjectSearchId_KeyProjectSearchId
        };
    }

    /**
     * User has changed value in <input> field for filters
     */
    _userUpdatedInputValue_Callback({ projectSearchId, newValue, annotationTypeId }: { projectSearchId: any, newValue: any, annotationTypeId: any }) {

        // console.log("_userUpdatedInputValue_Callback({ newValue, annotationTypeId }) annotationTypeId: " + annotationTypeId + ", newValue: " + newValue + ", projectSearchId: " + projectSearchId );

        this.setState( (state:Experiment_User_Set_Searches_Filters_State, props:Experiment_User_Set_Searches_Filters_Props):Experiment_User_Set_Searches_Filters_State => {

            return this._userUpdatedInputValue_Callback_SetStateCallback({ 
                newValue, projectSearchId, annotationTypeId, state, props 
            });
        });
    }
 
    /**
     * 
     */
    _userUpdatedInputValue_Callback_SetStateCallback({ 
        newValue, projectSearchId, annotationTypeId, state, props 
    }: {
        newValue: any
        projectSearchId: any
        annotationTypeId: any
        state: Experiment_User_Set_Searches_Filters_State
        props: Experiment_User_Set_Searches_Filters_Props
    }) {

        // console.log( "_update_data_ForProjectSearchId_AnnTypeData_CurrentEntry_SetStateCallback: new value: " + newValue );

        const dataMapPerProjectSearchId_KeyProjectSearchId = state.dataMapPerProjectSearchId_KeyProjectSearchId;

        const data_ForProjectSearchId_ReportedPeptidePSM_Local = dataMapPerProjectSearchId_KeyProjectSearchId.get( projectSearchId );
        if ( ! data_ForProjectSearchId_ReportedPeptidePSM_Local ) {
            throw Error("No value in dataMapPerProjectSearchId_KeyProjectSearchId for projectSearchId: " + projectSearchId );
        }

        //  Map key ann type id
        const reportedPeptideFilterDataMap_KeyAnnTypeId = data_ForProjectSearchId_ReportedPeptidePSM_Local.reportedPeptideFilterDataMap_KeyAnnTypeId;
        const psmFilterDataMap_KeyAnnTypeId = data_ForProjectSearchId_ReportedPeptidePSM_Local.psmFilterDataMap_KeyAnnTypeId;

        let valueUpdateResult = undefined;

        let foundAndProcessed_AnnTypeId = false;
        if ( reportedPeptideFilterDataMap_KeyAnnTypeId ) {
            const filterDataValue = reportedPeptideFilterDataMap_KeyAnnTypeId.get( annotationTypeId );
            if ( filterDataValue ) {
                foundAndProcessed_AnnTypeId = true;
                valueUpdateResult = this._update_data_ForProjectSearchId_AnnTypeData_CurrentEntry_ProcessForAnnTypeId({
                    newValue, filterDataValue
                });
            }
        } 
        if ( psmFilterDataMap_KeyAnnTypeId ) {
            const filterDataValue = psmFilterDataMap_KeyAnnTypeId.get( annotationTypeId );
            if ( filterDataValue ) {
                foundAndProcessed_AnnTypeId = true;
                valueUpdateResult = this._update_data_ForProjectSearchId_AnnTypeData_CurrentEntry_ProcessForAnnTypeId({
                    newValue, filterDataValue
                });
            }
        }
        if ( ! foundAndProcessed_AnnTypeId ) {
            throw Error("annotationTypeId not found. annotationTypeId: " + annotationTypeId + ", projectSearchId: " + projectSearchId );
        }

        let saveButtonEnabled = true;
        if ( this._isAnyInputFilterValueInvalid({ dataMapPerProjectSearchId_KeyProjectSearchId }) ) {
            saveButtonEnabled = false;
        }

        return { data_ForProjectSearchId_ReportedPeptidePSM_Local, saveButtonEnabled };
    }

    /**
     * 
     */
    _isAnyInputFilterValueInvalid(
        {
            dataMapPerProjectSearchId_KeyProjectSearchId
        }: {
            dataMapPerProjectSearchId_KeyProjectSearchId: any // Map<number, {projectSearchId: number, reportedPeptideFilterDataMap_KeyAnnTypeId: Map<number, {annotationTypeId: number, initialValue: number, initialValueString: string, currentValue: number, currentValueString: string, currentValueInvalidValue: boolean, currentValueSameAsInitialValue: boolean}>, psmFilterDataMap_KeyAnnTypeId: Map<...>}>
        }) {

        for ( const entry of dataMapPerProjectSearchId_KeyProjectSearchId.entries() ) {

            const data_ForProjectSearchId_ReportedPeptidePSM_Local = entry[ 1 ];

            //  Map key ann type id
            const reportedPeptideFilterDataMap_KeyAnnTypeId = data_ForProjectSearchId_ReportedPeptidePSM_Local.reportedPeptideFilterDataMap_KeyAnnTypeId;
            const psmFilterDataMap_KeyAnnTypeId = data_ForProjectSearchId_ReportedPeptidePSM_Local.psmFilterDataMap_KeyAnnTypeId;

            for ( const filterDataEntry of reportedPeptideFilterDataMap_KeyAnnTypeId.entries() ) {
                const filterDataValue = filterDataEntry[ 1 ];
                if ( filterDataValue.currentValueInvalidValue ) {
                    return true; // EARLY RETURN
                }
            }

            for ( const filterDataEntry of psmFilterDataMap_KeyAnnTypeId.entries() ) {
                const filterDataValue = filterDataEntry[ 1 ];
                if ( filterDataValue.currentValueInvalidValue ) {
                    return true; // EARLY RETURN
                }
            }
        }

        return false;
    }

    /**
     * 
     */
    _update_data_ForProjectSearchId_AnnTypeData_CurrentEntry_ProcessForAnnTypeId({
        newValue, filterDataValue
    }: {
        newValue: any, filterDataValue: any
    }) {
  
        filterDataValue.currentValueString = newValue;

        if ( filterDataValue.currentValueString !== "" ) {
            if ( !  /^[+-]?((\d+(\.\d*)?)|(\.\d+))$/.test( filterDataValue.currentValueString ) ) {
                //  cutoff value is not a valid decimal number, based on regex
                filterDataValue.currentValueInvalidValue = true;
            } else {
                const newValueParsed = Number.parseFloat( filterDataValue.currentValueString );
                if ( Number.isNaN( newValueParsed ) ) {
                    //  cutoff value is not a valid decimal number, based on failed to parse
                    filterDataValue.currentValue = undefined;
                    filterDataValue.currentValueInvalidValue = true;
                } else {
                    filterDataValue.currentValue = newValueParsed;
                    filterDataValue.currentValueInvalidValue = false;
                    if ( filterDataValue.currentValue === filterDataValue.initialValue ) {
                        filterDataValue.currentValueSameAsInitialValue = true;
                    } else {
                        filterDataValue.currentValueSameAsInitialValue = false;
                    }
                }
            }
        } else {
            filterDataValue.currentValue = undefined;
            filterDataValue.currentValueInvalidValue = false;
        }
    }
        
    /**
     * 
     */
    render () {


        //  Put in Overlay

        // saveButtonEnabled 

        const filtersPerSearches = [];

        for ( const projectSearchId of this.props.projectSearchIds ) {

            const dataMapPerProjectSearchId_KeyProjectSearchId = this.state.dataMapPerProjectSearchId_KeyProjectSearchId;

            const data_ForProjectSearchId_ReportedPeptidePSM_Local = dataMapPerProjectSearchId_KeyProjectSearchId.get( projectSearchId );
            if ( ! data_ForProjectSearchId_ReportedPeptidePSM_Local ) {
                throw Error("No value in dataMapPerProjectSearchId_KeyProjectSearchId for projectSearchId: " + projectSearchId );
            }
    
            const filtersPerSearch = _get_filtersPerSearch_SingleSearch_Components({ 
                projectSearchId, 
                data_ForProjectSearchId_ReportedPeptidePSM_Local,
                searchDataMap_KeyProjectSearchId : this._searchDataMap_KeyProjectSearchId,
                searchesData : this.props.searchesData,
                userUpdatedInputValue_Callback : this._userUpdatedInputValue_Callback_BindThis
            });
            filtersPerSearches.push( filtersPerSearch );
        }



        return (
            <React.Fragment>
                <div className="modal-overlay-page-background  " style={ { zIndex : 20 } }> </div> {/* modal-overlay-page-background-clickable */}
                <div className=" modal-overlay-container modal-overlay-flexbox-overflow-control-no-header-container modal-overlay-content-body "
                    style={ { position: "fixed", right: 20, top: "10vh", width: "calc(100vw - 40px)", maxWidth: 800, height: "calc(80vh - 10px)", zIndex: 21 } }
                    >
                    <form onSubmit={ this._save_BindThis }>
                        <div className="top-level fixed-height modal-overlay-header" style={ { width: "100%" } }>
                            <h1 className="modal-overlay-X-icon" onClick={ this._cancel_BindThis } >X</h1>
                            <h1 className="modal-overlay-header-text">Set Search Filters</h1>
                        </div>
                        <div className=" top-level fixed-height modal-overlay-body-standard-padding-top modal-overlay-body-standard-padding-left modal-overlay-body-standard-padding-right " 
                            style={ { marginBottom: 10 } } >
                            <div style={ { position: "relative", display: "inline-block" } }>
                                <input type="submit" value="Save" disabled={ ! this.state.saveButtonEnabled } />
                                { ( ! this.state.saveButtonEnabled ? 
                                    <div style={ { position: "absolute", left: 0, right: 0, top: 0, bottom: 0 } }
                                        title="All entered values must be valid for Save to be enabled."></div> 
                                    : undefined ) }
                            </div>
                            <input type="button" value="Cancel" onClick={ this._cancel_BindThis } style={ { marginLeft: 10 } } />
                        </div>
                        <div  className=" top-level single-entry-variable-height modal-overlay-body-standard-padding-left modal-overlay-body-standard-padding-right "
                            style={ { overflowY: "auto" }} >
                            {/* <div style={ { display: "grid", gridTemplateColumns: "min-content min-content 1fr" } }>  */}
                                    {/* Grid: <label> <input field> <error message> */}
                                        {/* previously  gridTemplateColumns: "min-content min-content auto", but that didn't work properly with: overflowWrap = "break-word" on descendent element.  
                                                The 'min-content' wasn't working to restrict to the width of the content, or maybe the rows that spanned all columns were forcing the grid to be wider than it was supposed to be. */}
                                { filtersPerSearches }
                            {/* </div> */}
                        </div>
                        {/* Padding at bottom has to be in separate div */}
                        <div className=" top-level fixed-height modal-overlay-body-standard-padding-bottom modal-overlay-body-standard-padding-left modal-overlay-body-standard-padding-right " >
                        </div>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

///////////////////////////
///////////////////////////
///////////////////////////

//  Functions not in Any Class


/**
 * Create Copy of Search Filters for Local Use with additional object properties
 */
const _create_SearchFilters_LocalCopy = function({ props } : {

    props : Experiment_User_Set_Searches_Filters_Props
})  {

    if ( ! props.conditionGroupsDataContainer ) {

        return undefined;
    }

    if ( ! ( props.projectSearchIds instanceof Array ) ) {
        //  Not Array
        throw Error("props.projectSearchIds NOT instanceof Array");
    }

    const resultMap_KeyProjectSearchId : Map<number, {
        projectSearchId: number,
        reportedPeptideFilterDataMap_KeyAnnTypeId: Map<number,  {annotationTypeId: number, initialValue: number, initialValueString: string, currentValue: number, currentValueString: string, currentValueInvalidValue: boolean, currentValueSameAsInitialValue: boolean}
            >,
        psmFilterDataMap_KeyAnnTypeId: Map<number,  {annotationTypeId: number, initialValue: number, initialValueString: string, currentValue: number, currentValueString: string, currentValueInvalidValue: boolean, currentValueSameAsInitialValue: boolean}
            >}
        > = new Map();

    const projectSearchIds = props.projectSearchIds; //  Array of projectSearchIds to be processed

    for ( const projectSearchId of projectSearchIds ) {

        // class ConditionGroupsDataContainer_PerProjectSearchIdData
        const data_conditionGroupsDataContainer = props.conditionGroupsDataContainer.get_data_ForProjectSearchId({ projectSearchId });
        if ( ! data_conditionGroupsDataContainer ) {
            //  No Data for this projectSearchId
            // continue; // EARLY CONTINUE
            throw Error("_create_SearchFilters_LocalCopy: No Data from props.conditionGroupsDataContainer.get_data_ForProjectSearchId for projectSearchId: " + projectSearchId );
        }

        //  Array of ConditionGroupsDataContainer_PerProjectSearchId_PerType_Data
        const reportedPeptideFilterData = data_conditionGroupsDataContainer.get_reportedPeptideFilters_PerProjectSearchId();
        const psmFilterDataMap = data_conditionGroupsDataContainer.get_psmFilters_PerProjectSearchId();

        //  Output Maps
        const result_reportedPeptideFilterDataMap_KeyAnnTypeId : Map<number,  {annotationTypeId: number, initialValue: number, initialValueString: string, currentValue: number, currentValueString: string, currentValueInvalidValue: boolean, currentValueSameAsInitialValue: boolean}
            > = new Map();
        const result_psmFilterDataMap_KeyAnnTypeId : Map<number,  {annotationTypeId: number, initialValue: number, initialValueString: string, currentValue: number, currentValueString: string, currentValueInvalidValue: boolean, currentValueSameAsInitialValue: boolean}
            > = new Map();

        if ( reportedPeptideFilterData && reportedPeptideFilterData.length !== 0 ) {
            //  entry : class ConditionGroupsDataContainer_PerProjectSearchId_PerType_Data
            for ( const entry of reportedPeptideFilterData ) {
                const annotationTypeId = entry.get_annTypeId();
                const filterValue = entry.get_value();
                const mapValue_filterValue_String = filterValue.toString();
                //  Local "Value" for editing
                const localValue = { 
                    annotationTypeId : annotationTypeId,
                    initialValue : filterValue,
                    initialValueString  : mapValue_filterValue_String,
                    currentValue : filterValue,
                    currentValueString  : mapValue_filterValue_String,
                    currentValueInvalidValue : false,
                    currentValueSameAsInitialValue : true,
                };
                result_reportedPeptideFilterDataMap_KeyAnnTypeId.set( annotationTypeId, localValue );
            }
        }
        if ( psmFilterDataMap && psmFilterDataMap.length !== 0 ) {
            //  entry : class ConditionGroupsDataContainer_PerProjectSearchId_PerType_Data
            for ( const entry of psmFilterDataMap ) {
                const annotationTypeId = entry.get_annTypeId();
                const filterValue = entry.get_value();
                const mapValue_filterValue_String = filterValue.toString();
                const localValue = { 
                    annotationTypeId : annotationTypeId,
                    initialValue : filterValue,
                    initialValueString  : mapValue_filterValue_String,
                    currentValue : filterValue,
                    currentValueString  : mapValue_filterValue_String,
                    currentValueInvalidValue : false,
                    currentValueSameAsInitialValue : true,
                };
                result_psmFilterDataMap_KeyAnnTypeId.set( annotationTypeId, localValue );
            }
        }


        //  Output Object per Project Search Id
        const result_ForProjectSearchId = {
            projectSearchId : projectSearchId,
            reportedPeptideFilterDataMap_KeyAnnTypeId : result_reportedPeptideFilterDataMap_KeyAnnTypeId,
            psmFilterDataMap_KeyAnnTypeId : result_psmFilterDataMap_KeyAnnTypeId
        }

        resultMap_KeyProjectSearchId.set( projectSearchId, result_ForProjectSearchId );
    }

    return { dataMapPerProjectSearchId_KeyProjectSearchId : resultMap_KeyProjectSearchId };
}


/**
 * 
 */
const _get_filtersPerSearch_SingleSearch_Components = function({ 
    projectSearchId, 
    data_ForProjectSearchId_ReportedPeptidePSM_Local,
    searchDataMap_KeyProjectSearchId,
    searchesData,
    userUpdatedInputValue_Callback
} : {
    projectSearchId : number
    data_ForProjectSearchId_ReportedPeptidePSM_Local : any
    searchDataMap_KeyProjectSearchId : any
    searchesData : {
        searches_TopLevelAndNestedInFolders: GetSearchesAndFolders_SingleProject_PromiseResponse_Item[],
        searchList_OnlySearches: GetSearchesAndFolders_SingleProject_PromiseResponse_Item[],
        searchesSubData: {
            searchProgramsPerSearchData_Root :  SearchProgramsPerSearchData_Root,
            annotationTypeData_Root : AnnotationTypeData_Root
        }
    }
    userUpdatedInputValue_Callback : any
}) {

    const searchData = searchDataMap_KeyProjectSearchId.get( projectSearchId );

    if ( ! searchData ) {
        console.log("_get_filtersPerSearch_SingleSearch_Components: No data in this._searchDataMap_KeyProjectSearchId for projectSearchId: " + projectSearchId );
        // return; //  EARLY RETURN
        throw Error("No data in this._searchDataMap_KeyProjectSearchId for projectSearchId: " + projectSearchId );
    }

    const searchesSubData = searchesData.searchesSubData;

    const searchAnnotationTypesData = searchesSubData.annotationTypeData_Root.annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId );
    if ( ! searchAnnotationTypesData ) {
        throw Error("_createSearchLists(...): No value for searchesSubData.annotationTypeData_Root.annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId ). projectSearchId: " + projectSearchId );
    }
    const searchProgramsPerSearch = searchesSubData.searchProgramsPerSearchData_Root.searchProgramsPerSearchItems_PerProjectSearchId_Map.get( projectSearchId );
    if ( ! searchProgramsPerSearch ) {
        throw Error("_createSearchLists(...): No value for searchesSubData.searchProgramsPerSearchData_Root.searchProgramsPerSearchItems_PerProjectSearchId_Map.get( projectSearchId ). projectSearchId: " + projectSearchId );
    }
    const searchProgramsPerSearch_Key_searchProgramsPerSearchId = searchProgramsPerSearch.searchProgramsPerSearchItem_Map;

    //  Map key ann type id
    const reportedPeptideFilterableAnnotationTypes = searchAnnotationTypesData.reportedPeptideFilterableAnnotationTypes;
    const psmFilterableAnnotationTypes = searchAnnotationTypesData.psmFilterableAnnotationTypes;

    //  Map key ann type id
    const reportedPeptideFilterDataMap_KeyAnnTypeId = data_ForProjectSearchId_ReportedPeptidePSM_Local.reportedPeptideFilterDataMap_KeyAnnTypeId;
    const psmFilterDataMap_KeyAnnTypeId = data_ForProjectSearchId_ReportedPeptidePSM_Local.psmFilterDataMap_KeyAnnTypeId;

    const _TYPE_LABEL_INDENT = 30;
    const _TYPE_LABEL_PADDING_TOP = 5;

    const psmFilters = _getFilters_SingleFilterableType_Components({ 
        projectSearchId,
        filterableAnnotationTypes : psmFilterableAnnotationTypes,
        filterDataMap_KeyAnnTypeId : psmFilterDataMap_KeyAnnTypeId,
        searchProgramsPerSearch_Key_searchProgramsPerSearchId,
        userUpdatedInputValue_Callback
    });

    let psmFiltersDisplay = undefined;
    if ( psmFilters ) {
        psmFiltersDisplay = (
            <React.Fragment>
                <div  style={ { gridColumn: "1 / -1", marginLeft: _TYPE_LABEL_INDENT, paddingTop: _TYPE_LABEL_PADDING_TOP } }>
                    PSM Filters
                </div>
                { psmFilters }
            </React.Fragment>
        );
    }

    const reportedPeptideFilters = _getFilters_SingleFilterableType_Components({ 
        projectSearchId,
        filterableAnnotationTypes : reportedPeptideFilterableAnnotationTypes,
        filterDataMap_KeyAnnTypeId : reportedPeptideFilterDataMap_KeyAnnTypeId,
        searchProgramsPerSearch_Key_searchProgramsPerSearchId,
        userUpdatedInputValue_Callback
    });

    let reportedPeptideFiltersDisplay = undefined;
    if ( reportedPeptideFilters ) {
        reportedPeptideFiltersDisplay = (
            <React.Fragment>
                <div  style={ { gridColumn: "1 / -1", marginLeft: _TYPE_LABEL_INDENT, paddingTop: _TYPE_LABEL_PADDING_TOP } }>
                    Peptide Filters
                </div>
                { reportedPeptideFilters }
            </React.Fragment>
        );
    }

    const searchNameDisplay = "(" + searchData.searchId + ") " + searchData.name;

    const result = (
        <div key={ projectSearchId }>
            <div style={ { display: "grid", gridTemplateColumns: "min-content min-content 1fr"  } }>
                <div  style={ { gridColumn: "1 / -1", whiteSpace: "nowrap", overflowX: "hidden", textOverflow: "ellipsis" } }
                    title={ searchNameDisplay }
                >
                    { searchNameDisplay }
                </div>
                { psmFiltersDisplay }
                { reportedPeptideFiltersDisplay }
            </div>
        </div>
    );

    return result;
}

/**
 * 
 */
const _getFilters_SingleFilterableType_Components = function({ 
    projectSearchId, 
    filterableAnnotationTypes,
    filterDataMap_KeyAnnTypeId,
    searchProgramsPerSearch_Key_searchProgramsPerSearchId,
    userUpdatedInputValue_Callback
}: {
    projectSearchId: any
    filterableAnnotationTypes: any
    filterDataMap_KeyAnnTypeId: any
    searchProgramsPerSearch_Key_searchProgramsPerSearchId: any
    userUpdatedInputValue_Callback: any
}): Array<JSX.Element> {

    let result: Array<JSX.Element> = undefined;

    for ( const entry of filterableAnnotationTypes ) {

        const filterableAnnotationType = entry[ 1 ];
        const annotationTypeId = filterableAnnotationType.annotationTypeId;
        const defaultFilter = filterableAnnotationType.defaultFilter;

        const filterData = filterDataMap_KeyAnnTypeId.get( annotationTypeId );

        if ( filterData ) {

            const searchProgramsPerSearchId = filterableAnnotationType.searchProgramsPerSearchId;
            const searchProgramsPerSearch = searchProgramsPerSearch_Key_searchProgramsPerSearchId.get( searchProgramsPerSearchId );
            if ( searchProgramsPerSearch === undefined ) {
                throw Error("No Value for searchProgramsPerSearchId: " + searchProgramsPerSearchId );
            }
            const name_searchProgramsPerSearch = searchProgramsPerSearch.name;
        
            const name_filterableAnnotationType = filterableAnnotationType.name;
            const inputLabel = name_filterableAnnotationType + " (" + name_searchProgramsPerSearch + "):";

            if ( ! userUpdatedInputValue_Callback ) {
                throw Error("No value for userUpdatedInputValue_Callback: _getFilters_SingleFilterableType_Components(...)");
            }

            const resultItem = (
                <Single_Filterable_PerAnnotationType_Entry 
                    key={ annotationTypeId } 
                    projectSearchId={ projectSearchId }
                    annotationTypeId={ annotationTypeId }
                    inputLabel={ inputLabel }
                    inputValue={ filterData.currentValueString }
                    filterData={ filterData }
                    userUpdatedInputValue_Callback={ userUpdatedInputValue_Callback }
                />
            );

            if ( result === undefined ) {
                result = [];
            }
            result.push( resultItem );
        }

    }
    
    return result;
}

/////////////////////////////////
/////////////////////////////////
/////////////////////////////////

//   React Sub Components:

interface Single_Filterable_PerAnnotationType_Entry_Props {

    inputValue: any
    inputLabel: any
    filterData: any
    annotationTypeId: any
    projectSearchId: any
    userUpdatedInputValue_Callback: any
}


interface Single_Filterable_PerAnnotationType_Entry_State {


}



/**
 * 
 */
class Single_Filterable_PerAnnotationType_Entry extends React.Component< Single_Filterable_PerAnnotationType_Entry_Props, Single_Filterable_PerAnnotationType_Entry_State > {

    private _handleFilterAnnTypeValueChange_BindThis = this._handleFilterAnnTypeValueChange.bind(this);

    constructor(props : Single_Filterable_PerAnnotationType_Entry_Props) {
        super(props);

        if ( ! props.userUpdatedInputValue_Callback ) {
            throw Error("No value for props.userUpdatedInputValue_Callback: Single_Filterable_PerAnnotationType_Entry::constructor(...)");
        }
    }

    /**
     * 
     */
    _handleFilterAnnTypeValueChange( event: any ) {

        const target = event.target;
        const value = target.value;
        
        this.props.userUpdatedInputValue_Callback({ newValue : value, annotationTypeId : this.props.annotationTypeId, projectSearchId : this.props.projectSearchId });
    }

    /**
     * 
     */
    render () {

        const _ANN_LABEL_INDENT = 60;
        const _ANN_TEXT_BOTTOM_PADDING = 3;

        return (
            <React.Fragment>
                <div style={ { display: "flex", alignItems: "flex-end", paddingBottom: _ANN_TEXT_BOTTOM_PADDING, marginLeft: _ANN_LABEL_INDENT, marginRight: 5,  whiteSpace: "nowrap" } } >
                    { this.props.inputLabel }
                </div>
                <div style={ { paddingRight: 10, paddingTop: 1, paddingBottom: 1 } }>
                    <input type="text" value={ this.props.inputValue }  onChange={ this._handleFilterAnnTypeValueChange_BindThis } 
                        // onInput - Using 'input' event type in other places on <input type="text" 
                        style={ { width: 80 } }    
                    />
                </div>
                <div style={ { display: "flex", alignItems: "flex-end", paddingBottom: _ANN_TEXT_BOTTOM_PADDING } }>
                    {   ( this.props.filterData.currentValueInvalidValue ? 
                        <span className="error-text">value has to be a decimal number </span>
                        :  null
                        )
                    }
                </div>
            </React.Fragment>
        );
    }
}

////////////////////////////////

/**
 * Contents for 1 Search
 * 
 */
const _createDataStructureToRender_SingleSearchContents = ({ 
    searchDataEntry,
    data_ForProjectSearchId_ReportedPeptidePSM_Local,
    searchesData,
    conditionGroups_Length,
    displayObjects //  output
}: {
    searchDataEntry: any
    data_ForProjectSearchId_ReportedPeptidePSM_Local: any
    searchesData: any
    conditionGroups_Length: any
    displayObjects: any //  output
}) => {
    const offsetIndexTypeLabels = conditionGroups_Length + 1;  //  When output Condition Group Label:   = ( conditionGroups_Index * 2 ) + 2;
    const offsetIndex_AnnTypeEntries = conditionGroups_Length + 2;  //  When output Condition Group Label:   = ( conditionGroups_Index * 2 ) + 3;

    const projectSearchId = searchDataEntry.projectSearchId;

    const searchesSubData = searchesData.searchesSubData;
    const dataMap_KeyProjectSearchId = searchesSubData.dataMap_KeyProjectSearchId;

    const dataForProjectSearchId_searchesSubData = dataMap_KeyProjectSearchId.get( projectSearchId );

    if ( ! dataForProjectSearchId_searchesSubData ) {
        console.log("_createDataStructureToRender_SingleSearchContents: No data in dataMap_KeyProjectSearchId for projectSearchId: " + projectSearchId );
        return; //  EARLY RETURN
        // throw Error("No data in dataMap_KeyProjectSearchId for projectSearchId: " + projectSearchId );
    }

    const searchAnnotationTypesData = dataForProjectSearchId_searchesSubData.searchAnnotationTypesData;
    const searchProgramsPerSearch = dataForProjectSearchId_searchesSubData.searchProgramsPerSearch;

    const searchProgramsPerSearch_Key_searchProgramsPerSearchId = searchProgramsPerSearch.searchProgramsPerSearch_Key_searchProgramsPerSearchId;

    //  Map key ann type id
    const reportedPeptideFilterableAnnotationTypes = searchAnnotationTypesData.reportedPeptideFilterableAnnotationTypes;
    const psmFilterableAnnotationTypes = searchAnnotationTypesData.psmFilterableAnnotationTypes;

    //  Map key ann type id
    const reportedPeptideFilterDataMap_KeyAnnTypeId = data_ForProjectSearchId_ReportedPeptidePSM_Local.reportedPeptideFilterDataMap_KeyAnnTypeId;
    const psmFilterDataMap_KeyAnnTypeId = data_ForProjectSearchId_ReportedPeptidePSM_Local.psmFilterDataMap_KeyAnnTypeId;

    {
        const showAllFiltersForSearchLink = { label: "Show All Filters For Search", projectSearchId };
        const displayObject = { showAllFiltersForSearchLink, offsetIndex : offsetIndexTypeLabels };
        displayObjects.push( displayObject );
    }
 
    _createDataStructureToRender_SingleFilterableType({ 
        projectSearchId,
        filterableAnnotationTypes : psmFilterableAnnotationTypes,
        filterDataMap_KeyAnnTypeId : psmFilterDataMap_KeyAnnTypeId,
        searchProgramsPerSearch_Key_searchProgramsPerSearchId,
        offsetIndex : offsetIndex_AnnTypeEntries,
        //  for label row
        labelRowLabel : "PSM Filters:",
        offsetIndexTypeLabels,

        displayObjects //  output
    });

    _createDataStructureToRender_SingleFilterableType({ 
        projectSearchId,
        filterableAnnotationTypes : reportedPeptideFilterableAnnotationTypes,
        filterDataMap_KeyAnnTypeId : reportedPeptideFilterDataMap_KeyAnnTypeId,
        searchProgramsPerSearch_Key_searchProgramsPerSearchId,
        offsetIndex : offsetIndex_AnnTypeEntries,
        //  for label row
        labelRowLabel : "Peptide Filters:",
        offsetIndexTypeLabels,
        
        displayObjects //  output
    });


}

/**
 * Contents for 1 Search, 1 type (PSM/Peptide)
 * 
 */
const _createDataStructureToRender_SingleFilterableType = ({ 
    projectSearchId,
    filterableAnnotationTypes,
    filterDataMap_KeyAnnTypeId,
    searchProgramsPerSearch_Key_searchProgramsPerSearchId,
    offsetIndex,
    labelRowLabel,
    offsetIndexTypeLabels,
    displayObjects //  output
}: {
    projectSearchId: any
    filterableAnnotationTypes: any
    filterDataMap_KeyAnnTypeId: any
    searchProgramsPerSearch_Key_searchProgramsPerSearchId: any
    offsetIndex: any
    labelRowLabel: any
    offsetIndexTypeLabels: any
    displayObjects: any //  output
}) => {

    let firstEntry = true;

    for ( const entry of filterableAnnotationTypes ) {

        const filterableAnnotationType = entry[ 1 ];
        const annotationTypeId = filterableAnnotationType.annotationTypeId;
        const defaultFilter = filterableAnnotationType.defaultFilter;

        const filterData = filterDataMap_KeyAnnTypeId.get( annotationTypeId );

        if ( filterData ) {

            if ( firstEntry ) {
                firstEntry = false;
                const displayObject = { label : labelRowLabel, offsetIndex : offsetIndexTypeLabels };
                displayObjects.push( displayObject );
            }

            const searchProgramsPerSearchId = filterableAnnotationType.searchProgramsPerSearchId;
            const searchProgramsPerSearch = searchProgramsPerSearch_Key_searchProgramsPerSearchId.get( searchProgramsPerSearchId );
            if ( searchProgramsPerSearch === undefined ) {
                throw Error("No Value for searchProgramsPerSearchId: " + searchProgramsPerSearchId );
            }
            const name_searchProgramsPerSearch = searchProgramsPerSearch.name;
        
            const name_filterableAnnotationType = filterableAnnotationType.name;
            const inputLabel = name_filterableAnnotationType + " (" + name_searchProgramsPerSearch + "):";
            const inputValue = filterData.currentValueString;
            const displayObject = { inputLabel, inputValue, offsetIndex, projectSearchId, annotationTypeId, filterData };
            displayObjects.push( displayObject );
        }
    }

}

////////////////////////////////////////////////


 /**
 * 
 * 
 * @param projectSearchIds
 * @param searchDataMap_KeyProjectSearchId
 * @param searchesData
 * @param dataMapPerProjectSearchId_KeyProjectSearchId
 */
const _searchFilterValues_PopulateNotSetWithEmptyString = ({ 
    projectSearchIds, 
    searchDataMap_KeyProjectSearchId,
    searchesData, 
    dataMapPerProjectSearchId_KeyProjectSearchId
} : {
     projectSearchIds : Array<number>
     searchDataMap_KeyProjectSearchId : Map<number,  GetSearchesAndFolders_SingleProject_PromiseResponse_Item>;
     searchesData : {
         searches_TopLevelAndNestedInFolders: GetSearchesAndFolders_SingleProject_PromiseResponse_Item[],
         searchList_OnlySearches: GetSearchesAndFolders_SingleProject_PromiseResponse_Item[],
         searchesSubData: {
             searchProgramsPerSearchData_Root :  SearchProgramsPerSearchData_Root,
             annotationTypeData_Root : AnnotationTypeData_Root
         }
     }
     dataMapPerProjectSearchId_KeyProjectSearchId:  // Derived from props data
         Map<number,
             {
                 projectSearchId: number,
                 reportedPeptideFilterDataMap_KeyAnnTypeId:
                     Map<number, {
                         annotationTypeId: number, initialValue: number, initialValueString: string, currentValue: number, currentValueString: string,
                         currentValueInvalidValue: boolean, currentValueSameAsInitialValue: boolean
                     }>,
                 psmFilterDataMap_KeyAnnTypeId: Map<number, {
                     annotationTypeId: number, initialValue: number, initialValueString: string, currentValue: number, currentValueString: string,
                     currentValueInvalidValue: boolean, currentValueSameAsInitialValue: boolean
                 }>
             }>
 }) : void => {

    for ( const projectSearchId of projectSearchIds ) {
        const searchDataEntry = searchDataMap_KeyProjectSearchId.get( projectSearchId );
        if ( ! searchDataEntry ) {
            console.warn("WARN: No entry in searchDataMap_KeyProjectSearchId for projectSearchId: " + projectSearchId );
            continue; // EARLY CONTINUE
        }

        //  data_conditionGroupsDataContainer is internal object to this file
        const data_conditionGroupsDataContainer = dataMapPerProjectSearchId_KeyProjectSearchId.get( projectSearchId );
        if ( ! data_conditionGroupsDataContainer ) {
            console.warn("_searchFilterValues_PopulateNotSetWithEmptyString: No data in data_conditionGroupsDataContainer for projectSearchId: " + projectSearchId );
            throw Error("_searchFilterValues_PopulateNotSetWithEmptyString: No data in data_conditionGroupsDataContainer for projectSearchId: " + projectSearchId );
        }
    
        //  Entries for Search
        _create_SearchFilterValues_SingleSearchContents({ projectSearchId, searchesData, data_conditionGroupsDataContainer });
        
    }
}


/**
 * Contents for 1 Search
 * 
 */
const _create_SearchFilterValues_SingleSearchContents = (
    {
        projectSearchId,
        searchesData,
        data_conditionGroupsDataContainer //  output
    } : {
        projectSearchId : number
        searchesData : {
            searches_TopLevelAndNestedInFolders: GetSearchesAndFolders_SingleProject_PromiseResponse_Item[],
            searchList_OnlySearches: GetSearchesAndFolders_SingleProject_PromiseResponse_Item[],
            searchesSubData: {
                searchProgramsPerSearchData_Root :  SearchProgramsPerSearchData_Root,
                annotationTypeData_Root : AnnotationTypeData_Root
            }
        }
        data_conditionGroupsDataContainer : //  output
            {
                projectSearchId: number,
                reportedPeptideFilterDataMap_KeyAnnTypeId:
                    Map<number, {
                        annotationTypeId: number, initialValue: number, initialValueString: string, currentValue: number, currentValueString: string,
                        currentValueInvalidValue: boolean, currentValueSameAsInitialValue: boolean
                    }>,
                psmFilterDataMap_KeyAnnTypeId: Map<number, {
                    annotationTypeId: number, initialValue: number, initialValueString: string, currentValue: number, currentValueString: string,
                    currentValueInvalidValue: boolean, currentValueSameAsInitialValue: boolean
                }>
            }
    }) : void => {

    const searchesSubData = searchesData.searchesSubData;

    const searchAnnotationTypesData = searchesSubData.annotationTypeData_Root.annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId );
    if ( ! searchAnnotationTypesData ) {
        throw Error("_create_SearchFilterValues_SingleSearchContents(...): No value for searchesSubData.annotationTypeData_Root.annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId ). projectSearchId: " + projectSearchId );
    }
    const searchProgramsPerSearch = searchesSubData.searchProgramsPerSearchData_Root.searchProgramsPerSearchItems_PerProjectSearchId_Map.get( projectSearchId );
    if ( ! searchProgramsPerSearch ) {
        throw Error("_create_SearchFilterValues_SingleSearchContents(...): No value for searchesSubData.searchProgramsPerSearchData_Root.searchProgramsPerSearchItems_PerProjectSearchId_Map.get( projectSearchId ). projectSearchId: " + projectSearchId );
    }

    //  Map key ann type id
    const reportedPeptideFilterableAnnotationTypes = searchAnnotationTypesData.reportedPeptideFilterableAnnotationTypes;
    const psmFilterableAnnotationTypes = searchAnnotationTypesData.psmFilterableAnnotationTypes;

    // Process PSM filters
    if ( psmFilterableAnnotationTypes ) {
        if ( ! data_conditionGroupsDataContainer.psmFilterDataMap_KeyAnnTypeId ) {   
            data_conditionGroupsDataContainer.psmFilterDataMap_KeyAnnTypeId = new Map();
        }
        _create_SearchFilterValues_SingleFilterableType({ 
            filterableAnnotationTypes : psmFilterableAnnotationTypes,
            filterDataMap_KeyAnnTypeId : data_conditionGroupsDataContainer.psmFilterDataMap_KeyAnnTypeId // Updated in function
        });
    }

    // Process Reported Peptide filters
    if ( reportedPeptideFilterableAnnotationTypes ) {
        if ( ! data_conditionGroupsDataContainer.reportedPeptideFilterDataMap_KeyAnnTypeId ) {   
            data_conditionGroupsDataContainer.reportedPeptideFilterDataMap_KeyAnnTypeId = new Map();
        }
        _create_SearchFilterValues_SingleFilterableType({ 
            filterableAnnotationTypes : reportedPeptideFilterableAnnotationTypes,
            filterDataMap_KeyAnnTypeId : data_conditionGroupsDataContainer.reportedPeptideFilterDataMap_KeyAnnTypeId // Updated in function
        });
    }
}

/**
 * Contents for 1 Search for single type (PSM, Reported Petide, Protein)
 * 
 */
const _create_SearchFilterValues_SingleFilterableType = ({ 
    filterableAnnotationTypes,
    filterDataMap_KeyAnnTypeId
} : {
    filterableAnnotationTypes : Map<number, AnnotationTypeItem>
    filterDataMap_KeyAnnTypeId: Map<number, {
        annotationTypeId: number, initialValue: number, initialValueString: string, currentValue: number, currentValueString: string,
        currentValueInvalidValue: boolean, currentValueSameAsInitialValue: boolean
    }>
}) => {

    for ( const entry of filterableAnnotationTypes ) {

        const filterableAnnotationType = entry[ 1 ];
        const annotationTypeId = filterableAnnotationType.annotationTypeId;

        if ( ! filterDataMap_KeyAnnTypeId.has( annotationTypeId ) ) {

            // const annotationTypeName = filterableAnnotationType.name;
            // const defaultFilterValue = filterableAnnotationType.defaultFilterValue;
            // const defaultFilterValueString = filterableAnnotationType.defaultFilterValueString;


            const result: {
                annotationTypeId: number, initialValue: number, initialValueString: string, currentValue: number, currentValueString: string,
                    currentValueInvalidValue: boolean, currentValueSameAsInitialValue: boolean
            } = {
                annotationTypeId,
                // defaultFilterValue,
                // defaultFilterValueString,
                initialValue : undefined,
                initialValueString : "",
                currentValue : undefined,
                currentValueString : "",
                currentValueInvalidValue : false,
                currentValueSameAsInitialValue : true,
            };

            filterDataMap_KeyAnnTypeId.set( annotationTypeId, result );
        }
    }

}
