/**
 * searchDetailsAndFilterBlock_UserInput_OverlayContents.tsx
 *
 * User can change the Filters/Cutoffs on Searches
 *
 *          Repeating Format for provided Project Search Ids
 *
 *             (search id) search name
 *                   Peptide Filters
 *                         Peptide Filter label  <input >
 *                   PSM Filters
 *                         PSM Filter label  <input >
 *                   Protein Filters
 *                         Protein Filter label  <input >
 */


import React from 'react'
import {ModalOverlay_Limelight_Component} from "page_js/common_all_pages/modal_overlay_react/modal_overlay_with_titlebar_react_v001/modalOverlay_WithTitlebar_React_v001";
import {
    SearchDataLookupParameters_Root, SearchDataLookupParams_Filter_Per_AnnotationType,
    SearchDataLookupParams_For_ProjectSearchIds,
    SearchDataLookupParams_For_Single_ProjectSearchId
} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {AnnotationTypeData_Root, AnnotationTypeItem, SearchNames_AsMap, SearchProgramsPerSearchData_Root} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {copyObject_DeepCopy_Limelight} from "page_js/data_pages/data_pages_common/copyObject_DeepCopy";
import {UpdatePageState_URL_With_NewFilterCutoffs_FromUser} from "page_js/data_pages/data_pages_common/updatePageState_URL_With_NewFilterCutoffs_FromUser";
import {SearchDetailsAndFilterBlock_UserInputInOverlay_FilterValuesChanged_Callback_Param} from "page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsAndFilterBlock_UserInputInOverlay";

const _Overlay_Title = "Change Search Filters"

const _Overlay_Width = 800;
const _Overlay_Height = 600;

const _ScrollableDivMaxHeight = _Overlay_Height - 120;


/**
 *
 */
export class SearchDetailsAndFilterBlock_UserInputInOverlay_UserClickedOn_ToOpenOverlay {
    projectSearchId_UserClickedIn : number
    userClickedInTypeIdentifier : string
    userClickedOnAnnotationTypeId : number
}

/**
 *
 */
export const get_SearchDetailsAndFilterBlock_UserInputInOverlay_Container = function(
    {
        projectSearchIds,
        searchDetails_Filters_AnnTypeDisplayRootObject,
        searchNamesMap_KeyProjectSearchId,
        searchProgramsPerSearchData_Root,
        annotationTypeData_Root,
        updatePageState_URL_With_NewFilterCutoffs_FromUser,
        userClickedOn_ToOpenOverlay,
        callbackOn_Cancel_Close_Clicked,
        callback_SearchesFilters_Changed
    } : {
        projectSearchIds : Array<number>
        searchDetails_Filters_AnnTypeDisplayRootObject : SearchDataLookupParameters_Root
        searchNamesMap_KeyProjectSearchId :  SearchNames_AsMap
        searchProgramsPerSearchData_Root : SearchProgramsPerSearchData_Root
        annotationTypeData_Root : AnnotationTypeData_Root
        updatePageState_URL_With_NewFilterCutoffs_FromUser : UpdatePageState_URL_With_NewFilterCutoffs_FromUser;
        userClickedOn_ToOpenOverlay : SearchDetailsAndFilterBlock_UserInputInOverlay_UserClickedOn_ToOpenOverlay
        callbackOn_Cancel_Close_Clicked : () => void;
        callback_SearchesFilters_Changed : ( param : SearchDetailsAndFilterBlock_UserInputInOverlay_FilterValuesChanged_Callback_Param ) => void

}) : JSX.Element {

    return (
        <SearchDetailsAndFilterBlock_UserInputInOverlay_OuterContainer_Component
            projectSearchIds={ projectSearchIds }
            searchDetails_Filters_AnnTypeDisplayRootObject={ searchDetails_Filters_AnnTypeDisplayRootObject }
            searchNamesMap_KeyProjectSearchId={ searchNamesMap_KeyProjectSearchId }
            searchProgramsPerSearchData_Root={ searchProgramsPerSearchData_Root }
            annotationTypeData_Root={ annotationTypeData_Root }
            updatePageState_URL_With_NewFilterCutoffs_FromUser={ updatePageState_URL_With_NewFilterCutoffs_FromUser }
            userClickedOn_ToOpenOverlay={ userClickedOn_ToOpenOverlay }
            callbackOn_Cancel_Close_Clicked={ callbackOn_Cancel_Close_Clicked }
            callback_SearchesFilters_Changed={ callback_SearchesFilters_Changed }
        />
    )
}

//  Internal Types and Classes

class Internal_SingleFilterValue_Entry {
    annotationTypeId : number
    initialValue : number
    initialValueString  : string
    currentValue : number
    currentValueString  : string
    currentValueInvalidValue : boolean
    currentValueSameAsInitialValue : boolean
}

class Internal_Single_For_ProjectSearchId_Entry {
    projectSearchId : number
    reportedPeptideFilterDataMap_KeyAnnTypeId : Map<number, Internal_SingleFilterValue_Entry>
    psmFilterDataMap_KeyAnnTypeId : Map<number, Internal_SingleFilterValue_Entry>
    matchedProteinFilterDataMap_KeyAnnTypeId : Map<number, Internal_SingleFilterValue_Entry>
}

class DataMapPerProjectSearchId_KeyProjectSearchId_Holder {
    dataMapPerProjectSearchId_KeyProjectSearchId : Map<number, Internal_Single_For_ProjectSearchId_Entry>

    constructor({ dataMapPerProjectSearchId_KeyProjectSearchId } : {
        dataMapPerProjectSearchId_KeyProjectSearchId : Map<number, Internal_Single_For_ProjectSearchId_Entry>
    }) {
        this.dataMapPerProjectSearchId_KeyProjectSearchId = dataMapPerProjectSearchId_KeyProjectSearchId;
    }

    shallowClone() : DataMapPerProjectSearchId_KeyProjectSearchId_Holder {
        const clone = new DataMapPerProjectSearchId_KeyProjectSearchId_Holder({ dataMapPerProjectSearchId_KeyProjectSearchId : this.dataMapPerProjectSearchId_KeyProjectSearchId });
        return clone;
    }
}

class UserUpdatedInputValue_Callback_Params {
    newValue : string
    annotationTypeId : number
    projectSearchId : number
}

type UserUpdatedInputValue_Callback = ( UserUpdatedInputValue_Callback_Params ) => void;

//  Internal React Components and more functions

/**
 *
 */
interface SearchDetailsAndFilterBlock_UserInputInOverlay_OuterContainer_Component_Props {

    projectSearchIds : Array<number>
    searchDetails_Filters_AnnTypeDisplayRootObject : SearchDataLookupParameters_Root
    searchNamesMap_KeyProjectSearchId :  SearchNames_AsMap
    searchProgramsPerSearchData_Root : SearchProgramsPerSearchData_Root
    annotationTypeData_Root : AnnotationTypeData_Root
    updatePageState_URL_With_NewFilterCutoffs_FromUser : UpdatePageState_URL_With_NewFilterCutoffs_FromUser;
    userClickedOn_ToOpenOverlay : SearchDetailsAndFilterBlock_UserInputInOverlay_UserClickedOn_ToOpenOverlay
    callbackOn_Cancel_Close_Clicked : () => void;
    callback_SearchesFilters_Changed : ( params : SearchDetailsAndFilterBlock_UserInputInOverlay_FilterValuesChanged_Callback_Param ) => void
}

/**
 *
 */
interface SearchDetailsAndFilterBlock_UserInputInOverlay_OuterContainer_Component_State {

    saveButtonEnabled? : boolean
    dataMapPerProjectSearchId_KeyProjectSearchId_Holder? : DataMapPerProjectSearchId_KeyProjectSearchId_Holder // Derived from props data
}

type Pass_top_of_SubElement_To_ScrollTo = ( top_of_SubElement_To_ScrollTo : number ) => void


/**
 *
 */
class SearchDetailsAndFilterBlock_UserInputInOverlay_OuterContainer_Component extends React.Component< SearchDetailsAndFilterBlock_UserInputInOverlay_OuterContainer_Component_Props, SearchDetailsAndFilterBlock_UserInputInOverlay_OuterContainer_Component_State > {


    private _save_BindThis = this._save.bind(this);
    private _cancel_BindThis = this._cancel.bind(this);

    private _userUpdatedInputValue_Callback_BindThis : UserUpdatedInputValue_Callback = this._userUpdatedInputValue_Callback.bind(this);

    private _pass_top_of_SubElement_To_ScrollTo_BindThis : Pass_top_of_SubElement_To_ScrollTo = this._pass_top_of_SubElement_To_ScrollTo.bind(this);

    private readonly _containerScrollableDiv_Ref :  React.RefObject<HTMLDivElement>;

    private _top_of_SubElement_To_ScrollTo : number;

    constructor(props : SearchDetailsAndFilterBlock_UserInputInOverlay_OuterContainer_Component_Props) {
        super(props);

        this._containerScrollableDiv_Ref = React.createRef();

        //  Clone Search Filters so can update locally until _save is called.

        const dataMapPerProjectSearchId_KeyProjectSearchId_Holder = _create_SearchFilters_LocalCopy({ props });

        const state : SearchDetailsAndFilterBlock_UserInputInOverlay_OuterContainer_Component_State = {
            dataMapPerProjectSearchId_KeyProjectSearchId_Holder,
            saveButtonEnabled : true
        };

        this.state = state;

    }

    componentDidMount() {

        if ( this._top_of_SubElement_To_ScrollTo ) {

            //  Scroll down to show Element for section or annotation data user clicked on

            window.setTimeout( () => {
                try {
                    const boundingRect = this._containerScrollableDiv_Ref.current.getBoundingClientRect();

                    const top = boundingRect.top

                    const offsetScrollableDivTop = _ScrollableDivMaxHeight - 100;

                    const scrollTop = this._top_of_SubElement_To_ScrollTo - top - offsetScrollableDivTop;

                    this._containerScrollableDiv_Ref.current.scrollTop = scrollTop;

                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }, 10 );
        }
    }

    ////////////////////

    // type Pass_top_of_SubElement_To_ScrollTo = ( top_of_SubElement_To_ScrollTo : number ) => void
    private _pass_top_of_SubElement_To_ScrollTo( top_of_SubElement_To_ScrollTo : number ) : void {

        this._top_of_SubElement_To_ScrollTo = top_of_SubElement_To_ScrollTo;
    }


    /**
     * User Clicked Save (type="submit") or hit enter in a field
     */
    _save( event ) {
        try {
            // console.warn("_save(...) called in searchDetailsAndFilterBlock_UserInput_OverlayContents.tsx")

            // Stop form submit from submit page to server
            event.preventDefault();

            //  Update URL and get new ... key from server for new cutoffs

            //  Update searchDetails_Filters_AnnTypeDisplayRootObject in page state with user entered data

            //  Process project search ids to get data

            let searchDetails_Filters_AnnTypeDisplayRootObject : SearchDataLookupParameters_Root = this.props.searchDetails_Filters_AnnTypeDisplayRootObject;

            let paramsForProjectSearchIds = searchDetails_Filters_AnnTypeDisplayRootObject.paramsForProjectSearchIds;

            //  The user entered Filter values per Annotation Types and Annotation Types to display, or the defaults for the Search Id
            //  An array in the same order as projectSearchIds
            let filtersAnnTypeDisplayPerProjectSearchIds = paramsForProjectSearchIds.paramsForProjectSearchIdsList;


            //  Build new searchDetails_Filters_AnnTypeDisplayRootObject, by first cloning the existing value
            //      **  Arbitrary casting of searchDetails_Filters_AnnTypeDisplayRootObject_NEW to SearchDataLookupParameters_Root.
            //              This will stay correct as long as searchDetails_Filters_AnnTypeDisplayRootObject is type SearchDataLookupParameters_Root
            let searchDetails_Filters_AnnTypeDisplayRootObject_NEW : SearchDataLookupParameters_Root = copyObject_DeepCopy_Limelight( searchDetails_Filters_AnnTypeDisplayRootObject );
            let paramsForProjectSearchIds_NEW = searchDetails_Filters_AnnTypeDisplayRootObject_NEW.paramsForProjectSearchIds;
            let filtersAnnTypeDisplayPerProjectSearchIds_NEW = paramsForProjectSearchIds_NEW.paramsForProjectSearchIdsList;

            let anyCutoffsChanged = false; // Track if any cutoffs changed from stored values

            let projectSearchIdsForCutoffsChanged : Set<number> = new Set();

            for ( let filtersAnnTypeDisplayPerProjectSearchIds_Index = 0; filtersAnnTypeDisplayPerProjectSearchIds_Index < filtersAnnTypeDisplayPerProjectSearchIds.length; filtersAnnTypeDisplayPerProjectSearchIds_Index++ ) {

                let filtersAnnTypeDisplay_For_Single_ProjectSearchId = filtersAnnTypeDisplayPerProjectSearchIds[ filtersAnnTypeDisplayPerProjectSearchIds_Index ];
                let filtersAnnTypeDisplay_For_Single_ProjectSearchId_NEW = filtersAnnTypeDisplayPerProjectSearchIds_NEW[ filtersAnnTypeDisplayPerProjectSearchIds_Index ];

                let projectSearchId = filtersAnnTypeDisplay_For_Single_ProjectSearchId.projectSearchId;

                let userDataResultPerProjectSearchId = this.state.dataMapPerProjectSearchId_KeyProjectSearchId_Holder.dataMapPerProjectSearchId_KeyProjectSearchId.get( projectSearchId );
                if ( ! userDataResultPerProjectSearchId ) {
                    throw Error( "No value in this.state.dataMapPerProjectSearchId_KeyProjectSearchId_Holder.dataMapPerProjectSearchId_KeyProjectSearchId for projectSearchId: " + projectSearchId );
                }

                //  Replace the cutoffs for each type with the User entered cutoffs
                {
                    //  PSM cutoffs
                    let replaceResults =
                        this._replaceCutoffsWithUserEnteredForType( {
                            filtersExisting_ForType : filtersAnnTypeDisplay_For_Single_ProjectSearchId.psmFilters,
                            userEnteredCutoffs_ForType : userDataResultPerProjectSearchId.psmFilterDataMap_KeyAnnTypeId
                        } );
                    if ( replaceResults.anyCutoffsChanged ) {
                        anyCutoffsChanged = true;
                        projectSearchIdsForCutoffsChanged.add( projectSearchId );
                    }
                    let newFilters = replaceResults.newFilters;
                    filtersAnnTypeDisplay_For_Single_ProjectSearchId_NEW.psmFilters = newFilters;
                }
                {
                    //  Peptide cutoffs
                    let replaceResults =
                        this._replaceCutoffsWithUserEnteredForType( {
                            filtersExisting_ForType : filtersAnnTypeDisplay_For_Single_ProjectSearchId.reportedPeptideFilters,
                            userEnteredCutoffs_ForType : userDataResultPerProjectSearchId.reportedPeptideFilterDataMap_KeyAnnTypeId
                        } );
                    if ( replaceResults.anyCutoffsChanged ) {
                        anyCutoffsChanged = true;
                        projectSearchIdsForCutoffsChanged.add( projectSearchId );
                    }
                    let newFilters = replaceResults.newFilters;
                    filtersAnnTypeDisplay_For_Single_ProjectSearchId_NEW.reportedPeptideFilters = newFilters;
                }
                {
                    //  Protein cutoffs
                    let replaceResults =
                        this._replaceCutoffsWithUserEnteredForType( {
                            filtersExisting_ForType : filtersAnnTypeDisplay_For_Single_ProjectSearchId.matchedProteinFilters,
                            userEnteredCutoffs_ForType : userDataResultPerProjectSearchId.matchedProteinFilterDataMap_KeyAnnTypeId
                        } );
                    if ( replaceResults.anyCutoffsChanged ) {
                        anyCutoffsChanged = true;
                        projectSearchIdsForCutoffsChanged.add( projectSearchId );
                    }
                    let newFilters = replaceResults.newFilters;
                    filtersAnnTypeDisplay_For_Single_ProjectSearchId_NEW.matchedProteinFilters = newFilters;
                }
            }

            if ( anyCutoffsChanged ) {
                //  Cutoffs changed so apply new cutoffs to the page

                //  First disable update button so that it cannot be clicked again

                this.setState( (state : SearchDetailsAndFilterBlock_UserInputInOverlay_OuterContainer_Component_State, props : SearchDetailsAndFilterBlock_UserInputInOverlay_OuterContainer_Component_Props) : SearchDetailsAndFilterBlock_UserInputInOverlay_OuterContainer_Component_State => {

                    return { saveButtonEnabled : false }
                });

                window.setTimeout( () => {

                    //  Run in Next Paint

                    //  apply new cutoffs to the page
                    this._applyNewCutoffsToPage({
                        searchDetails_Filters_AnnTypeDisplay_Root : searchDetails_Filters_AnnTypeDisplayRootObject_NEW,
                        projectSearchIdsForCutoffsChanged
                    } );

                }, 10 );

            } else {
                this.props.callbackOn_Cancel_Close_Clicked();
            }
        } catch (e) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     * Cutoffs changed so apply new cutoffs to the page
     */
    _applyNewCutoffsToPage( { searchDetails_Filters_AnnTypeDisplay_Root, projectSearchIdsForCutoffsChanged } : {

        searchDetails_Filters_AnnTypeDisplay_Root :  SearchDataLookupParameters_Root
        projectSearchIdsForCutoffsChanged : Set<number>
    } ) {

        let updatePageState_URL_With_NewFilterCutoffs_FromUser_Promise =
            this.props.updatePageState_URL_With_NewFilterCutoffs_FromUser.
            updatePageState_URL_With_NewFilterCutoffs_FromUser( { searchDetails_Filters_AnnTypeDisplay_Root } );

        updatePageState_URL_With_NewFilterCutoffs_FromUser_Promise.then( ( value ) => { // onFullfilled: resolve called
            try {
                if ( this.props.callback_SearchesFilters_Changed ) {
                    const param : SearchDetailsAndFilterBlock_UserInputInOverlay_FilterValuesChanged_Callback_Param =  {
                        projectSearchIdsForCutoffsChanged
                    }
                    this.props.callback_SearchesFilters_Changed( param );
                }

                this.props.callbackOn_Cancel_Close_Clicked();

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        }, function( reason ) { // // onRejected: reject called
            try {
                throw Error("updatePageState_URL_With_NewFilterCutoffs_FromUser_Promise Fail: Reason: " + reason );
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });

        updatePageState_URL_With_NewFilterCutoffs_FromUser_Promise.catch( function( reason ) { // onRejected
            throw Error("updatePageState_URL_With_NewFilterCutoffs_FromUser_Promise Fail: Reason: " + reason );
        });
    }

    /**
     *
     */
    _replaceCutoffsWithUserEnteredForType( { filtersExisting_ForType, userEnteredCutoffs_ForType } : {

        filtersExisting_ForType : Array<SearchDataLookupParams_Filter_Per_AnnotationType>
        userEnteredCutoffs_ForType : Map<number, Internal_SingleFilterValue_Entry>

    } )  {

        let anyCutoffsChanged = false; // true if set of user entered cutoffs are different from existing filters
        let newFilters : Array<SearchDataLookupParams_Filter_Per_AnnotationType> = [];

        if ( userEnteredCutoffs_ForType ) {

            for ( const userEnteredCutoffs_ForType_Entry of userEnteredCutoffs_ForType ) {

                const userEnteredCutoffs_ForType_EntryValue = userEnteredCutoffs_ForType_Entry[ 1 ];

                const userResultData_PerAnnTypeIdKeyNumber = userEnteredCutoffs_ForType_EntryValue.annotationTypeId;

                if ( userEnteredCutoffs_ForType_EntryValue.currentValue !== undefined ) {
                    //  User entered a value for Ann Type Id
                    let newFilter = { annTypeId: userResultData_PerAnnTypeIdKeyNumber, value: userEnteredCutoffs_ForType_EntryValue.currentValue };
                    newFilters.push( newFilter );

                    let filtersExisting_PerAnnTypeId = undefined;
                    if ( filtersExisting_ForType ) {
                        for ( let filtersExisting_ForType_Entry of filtersExisting_ForType ) {
                            if ( filtersExisting_ForType_Entry.annTypeId === userResultData_PerAnnTypeIdKeyNumber ) {
                                filtersExisting_PerAnnTypeId = filtersExisting_ForType_Entry;
                                break;
                            }
                        }
                    }
                    if ( filtersExisting_PerAnnTypeId === undefined ||
                        userEnteredCutoffs_ForType_EntryValue.currentValue !== filtersExisting_PerAnnTypeId.value ) {
                        //  No existing cutoff for Ann Type Id or value is changed
                        anyCutoffsChanged = true;
                    }
                }
            }
        }

        //  Check for entries in filtersExisting_ForType that are not in userEnteredCutoffs_ForType for setting anyCutoffsChanged

        if ( ! anyCutoffsChanged ) {
            if ( filtersExisting_ForType && filtersExisting_ForType.length !== 0 ) {
                if ( ! userEnteredCutoffs_ForType ) {

                    anyCutoffsChanged = true;
                } else {
                    for ( let filtersExisting_ForType_Entry of filtersExisting_ForType ) {
                        let userEnteredCutoffs_ForAnnTypeId = userEnteredCutoffs_ForType.get( filtersExisting_ForType_Entry.annTypeId );
                        if ( ! userEnteredCutoffs_ForAnnTypeId ) {
                            // no entry
                            anyCutoffsChanged = true;
                        } else if ( userEnteredCutoffs_ForAnnTypeId.currentValue === undefined ) {
                            // entry had no value
                            anyCutoffsChanged = true;
                        }
                    }
                }
            }
        }

        return { anyCutoffsChanged, newFilters };
    }

    /**
     * User Clicked Cancel or "X"
     */
    _cancel( event ) {

        // console.log("_cancel called");

        this.props.callbackOn_Cancel_Close_Clicked();
    }

    /**
     * User has changed value in <input> field for filters
     */
    _userUpdatedInputValue_Callback( params : UserUpdatedInputValue_Callback_Params ) {

        // console.log("_userUpdatedInputValue_Callback({ newValue, annotationTypeId }) annotationTypeId: " + annotationTypeId + ", newValue: " + newValue + ", projectSearchId: " + projectSearchId );

        this.setState( (state : SearchDetailsAndFilterBlock_UserInputInOverlay_OuterContainer_Component_State, props : SearchDetailsAndFilterBlock_UserInputInOverlay_OuterContainer_Component_Props) : SearchDetailsAndFilterBlock_UserInputInOverlay_OuterContainer_Component_State => {

            return this._userUpdatedInputValue_Callback_SetStateCallback({
                params, state, props
            });
        });
    }

    /**
     *
     */
    _userUpdatedInputValue_Callback_SetStateCallback(
        {
            params, state, props
        } : {
            params : UserUpdatedInputValue_Callback_Params
            state : SearchDetailsAndFilterBlock_UserInputInOverlay_OuterContainer_Component_State
            props : SearchDetailsAndFilterBlock_UserInputInOverlay_OuterContainer_Component_Props

        }) : SearchDetailsAndFilterBlock_UserInputInOverlay_OuterContainer_Component_State {

        const newValue = params.newValue;
        const projectSearchId = params.projectSearchId;
        const annotationTypeId = params.annotationTypeId;

        // console.log( "_update_data_ForProjectSearchId_AnnTypeData_CurrentEntry_SetStateCallback: new value: " + newValue );

        const dataMapPerProjectSearchId_KeyProjectSearchId_Holder = state.dataMapPerProjectSearchId_KeyProjectSearchId_Holder.shallowClone();

        const data_ForProjectSearchId_ReportedPeptidePSM_Local = dataMapPerProjectSearchId_KeyProjectSearchId_Holder.dataMapPerProjectSearchId_KeyProjectSearchId.get( projectSearchId );
        if ( ! data_ForProjectSearchId_ReportedPeptidePSM_Local ) {
            throw Error("No value in dataMapPerProjectSearchId_KeyProjectSearchId for projectSearchId: " + projectSearchId );
        }

        //  Map key ann type id
        const reportedPeptideFilterDataMap_KeyAnnTypeId = data_ForProjectSearchId_ReportedPeptidePSM_Local.reportedPeptideFilterDataMap_KeyAnnTypeId;
        const psmFilterDataMap_KeyAnnTypeId = data_ForProjectSearchId_ReportedPeptidePSM_Local.psmFilterDataMap_KeyAnnTypeId;
        const matchedProteinFilterDataMap_KeyAnnTypeId = data_ForProjectSearchId_ReportedPeptidePSM_Local.matchedProteinFilterDataMap_KeyAnnTypeId;

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
        if ( matchedProteinFilterDataMap_KeyAnnTypeId ) {
            const filterDataValue = matchedProteinFilterDataMap_KeyAnnTypeId.get( annotationTypeId );
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
        if ( this._isAnyInputFilterValue_IsInvalid({ dataMapPerProjectSearchId_KeyProjectSearchId_Holder: dataMapPerProjectSearchId_KeyProjectSearchId_Holder }) ) {
            saveButtonEnabled = false;
        }

        return { dataMapPerProjectSearchId_KeyProjectSearchId_Holder, saveButtonEnabled };
    }

    /**
     *
     */
    _isAnyInputFilterValue_IsInvalid(
        {
            dataMapPerProjectSearchId_KeyProjectSearchId_Holder
        } : {
            dataMapPerProjectSearchId_KeyProjectSearchId_Holder :  DataMapPerProjectSearchId_KeyProjectSearchId_Holder
        }) {

        for ( const data_ForProjectSearchId_ReportedPeptidePSM_Local of dataMapPerProjectSearchId_KeyProjectSearchId_Holder.dataMapPerProjectSearchId_KeyProjectSearchId.values() ) {

            //  Map key ann type id
            const reportedPeptideFilterDataMap_KeyAnnTypeId = data_ForProjectSearchId_ReportedPeptidePSM_Local.reportedPeptideFilterDataMap_KeyAnnTypeId;
            const psmFilterDataMap_KeyAnnTypeId = data_ForProjectSearchId_ReportedPeptidePSM_Local.psmFilterDataMap_KeyAnnTypeId;
            const matchedProteinFilterDataMap_KeyAnnTypeId = data_ForProjectSearchId_ReportedPeptidePSM_Local.matchedProteinFilterDataMap_KeyAnnTypeId;

            for ( const filterDataValue of reportedPeptideFilterDataMap_KeyAnnTypeId.values() ) {
                if ( filterDataValue.currentValueInvalidValue ) {
                    return true; // EARLY RETURN
                }
            }

            for ( const filterDataValue of psmFilterDataMap_KeyAnnTypeId.values() ) {
                if ( filterDataValue.currentValueInvalidValue ) {
                    return true; // EARLY RETURN
                }
            }

            for ( const filterDataValue of matchedProteinFilterDataMap_KeyAnnTypeId.values() ) {
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
    _update_data_ForProjectSearchId_AnnTypeData_CurrentEntry_ProcessForAnnTypeId(
        {
            newValue, filterDataValue
        } : {
            newValue : string
            filterDataValue :  Internal_SingleFilterValue_Entry
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
    render () : JSX.Element {

        const filtersPerSearches : Array<JSX.Element> = [];

        for ( const projectSearchId of this.props.projectSearchIds ) {

            if ( filtersPerSearches.length > 0 ) {

                //  Add separator between searches

                const key = "separator-" + projectSearchId;

                const dividerElement = (
                    <div key={ key } style={ { gridColumn: "1 / -1" } }  >
                        <div style={ { paddingTop: 25 } }></div>
                        <div style={ { borderTopWidth: 20, width: "100%" } } className=" search-cutoffs-user-input-search-separator "></div>
                        <div style={ { paddingTop: 25 } }></div>
                    </div>
                );

                filtersPerSearches.push( dividerElement );
            }

            const filtersPerSearch = (
                <Single_Search_Entry
                    key={ projectSearchId }
                    projectSearchId={ projectSearchId }
                    dataMapPerProjectSearchId_KeyProjectSearchId_Holder={ this.state.dataMapPerProjectSearchId_KeyProjectSearchId_Holder }
                    searchDetails_Filters_AnnTypeDisplayRootObject={ this.props.searchDetails_Filters_AnnTypeDisplayRootObject }
                    searchNamesMap_KeyProjectSearchId={ this.props.searchNamesMap_KeyProjectSearchId }
                    searchProgramsPerSearchData_Root={ this.props.searchProgramsPerSearchData_Root }
                    annotationTypeData_Root={ this.props.annotationTypeData_Root }

                    userClickedOn_ToOpenOverlay={ this.props.userClickedOn_ToOpenOverlay }
                    pass_top_of_SubElement_To_ScrollTo={ this._pass_top_of_SubElement_To_ScrollTo_BindThis }
                    userUpdatedInputValue_Callback={ this._userUpdatedInputValue_Callback_BindThis }
                />
            );

            filtersPerSearches.push( filtersPerSearch );
        }



        return (

            <ModalOverlay_Limelight_Component
                width={ _Overlay_Width }
                height={ _Overlay_Height }
                title={ _Overlay_Title }
                callbackOnClicked_Close={ this.props.callbackOn_Cancel_Close_Clicked }
                close_OnBackgroundClick={ false }>

                <form onSubmit={ this._save_BindThis }>

                    <div  className=" top-level single-entry-variable-height modal-overlay-body-standard-padding-top modal-overlay-body-standard-padding-left modal-overlay-body-standard-padding-right "
                          >

                        <div ref={ this._containerScrollableDiv_Ref }
                             style={ { overflowY: "auto", maxHeight : _ScrollableDivMaxHeight }} className={ " search-cutoffs-user-input-search-bounding-box "} >
                            <div style={ { display: "grid", gridTemplateColumns: "min-content min-content 1fr"  } }>
                                { filtersPerSearches }
                            </div>
                        </div>
                        {/* </div> */}
                    </div>

                    <div className=" top-level fixed-height modal-overlay-body-standard-padding-left modal-overlay-body-standard-padding-right "
                         style={ { marginTop : 15, marginBottom: 10 } } >
                        <div style={ { position: "relative", display: "inline-block" } }>
                            <input type="submit" value="Save" disabled={ ! this.state.saveButtonEnabled } />
                            { ( ! this.state.saveButtonEnabled ?
                                <div style={ { position: "absolute", left: 0, right: 0, top: 0, bottom: 0 } }
                                     title="All entered values must be valid for Save to be enabled."></div>
                                : undefined ) }
                        </div>
                        <input type="button" value="Cancel" onClick={ this._cancel_BindThis } style={ { marginLeft: 10 } } />
                    </div>

                    {/* Padding at bottom has to be in separate div */}
                    <div className=" top-level fixed-height modal-overlay-body-standard-padding-bottom modal-overlay-body-standard-padding-left modal-overlay-body-standard-padding-right " >
                    </div>
                </form>

            </ModalOverlay_Limelight_Component>
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
const _create_SearchFilters_LocalCopy = function(
    {
        props
    } : {
        props : SearchDetailsAndFilterBlock_UserInputInOverlay_OuterContainer_Component_Props

    }) : DataMapPerProjectSearchId_KeyProjectSearchId_Holder {

    const searchDetails_Filters_AnnTypeDisplayRootObject : SearchDataLookupParameters_Root = props.searchDetails_Filters_AnnTypeDisplayRootObject;
    const annotationTypeData_Root = props.annotationTypeData_Root;

    const searchDataLookupParams_For_ProjectSearchIds :  SearchDataLookupParams_For_ProjectSearchIds
        = searchDetails_Filters_AnnTypeDisplayRootObject.paramsForProjectSearchIds

    const searchDataLookupParams_For_ProjectSearchIds_List = searchDataLookupParams_For_ProjectSearchIds.paramsForProjectSearchIdsList

    const resultMap_KeyProjectSearchId : Map<number, Internal_Single_For_ProjectSearchId_Entry> = new Map();

    // const projectSearchIds = props.projectSearchIds; //  Array of projectSearchIds to be processed

    for ( const searchDataLookupParams_For_ProjectSearchId of searchDataLookupParams_For_ProjectSearchIds_List ) {

        const projectSearchId = searchDataLookupParams_For_ProjectSearchId.projectSearchId;
        const reportedPeptideFilters = searchDataLookupParams_For_ProjectSearchId.reportedPeptideFilters;
        const psmFilters = searchDataLookupParams_For_ProjectSearchId.psmFilters;
        const matchedProteinFilters = searchDataLookupParams_For_ProjectSearchId.matchedProteinFilters;

        //  Output Maps
        const result_reportedPeptideFilterDataMap_KeyAnnTypeId = new Map();
        const result_psmFilterDataMap_KeyAnnTypeId = new Map();
        const result_matchedProteinFilterDataMap_KeyAnnTypeId = new Map();

        if ( reportedPeptideFilters && reportedPeptideFilters.length !== 0 ) {

            for ( const entry of reportedPeptideFilters ) {
                const annotationTypeId = entry.annTypeId
                const filterValue = entry.value;
                const mapValue_filterValue_String = filterValue.toString();
                //  Local "Value" for editing
                const localValue : Internal_SingleFilterValue_Entry = {
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
        if ( psmFilters && psmFilters.length !== 0 ) {

            for ( const entry of psmFilters ) {
                const annotationTypeId = entry.annTypeId
                const filterValue = entry.value;
                const mapValue_filterValue_String = filterValue.toString();
                const localValue : Internal_SingleFilterValue_Entry = {
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
        if ( matchedProteinFilters && matchedProteinFilters.length !== 0 ) {

            for ( const entry of matchedProteinFilters ) {
                const annotationTypeId = entry.annTypeId
                const filterValue = entry.value;
                const mapValue_filterValue_String = filterValue.toString();
                const localValue : Internal_SingleFilterValue_Entry = {
                    annotationTypeId : annotationTypeId,
                    initialValue : filterValue,
                    initialValueString  : mapValue_filterValue_String,
                    currentValue : filterValue,
                    currentValueString  : mapValue_filterValue_String,
                    currentValueInvalidValue : false,
                    currentValueSameAsInitialValue : true,
                };
                result_matchedProteinFilterDataMap_KeyAnnTypeId.set( annotationTypeId, localValue );
            }
        }

        //  Output Object per Project Search Id
        const result_ForProjectSearchId : Internal_Single_For_ProjectSearchId_Entry = {
            projectSearchId : projectSearchId,
            reportedPeptideFilterDataMap_KeyAnnTypeId : result_reportedPeptideFilterDataMap_KeyAnnTypeId,
            psmFilterDataMap_KeyAnnTypeId : result_psmFilterDataMap_KeyAnnTypeId,
            matchedProteinFilterDataMap_KeyAnnTypeId: result_matchedProteinFilterDataMap_KeyAnnTypeId
        }

        resultMap_KeyProjectSearchId.set( projectSearchId, result_ForProjectSearchId );
    }

    //  Create empty string entries for Annotation Types that do not have filter values

    for ( const root_MapEntry of annotationTypeData_Root.annotationTypeItems_PerProjectSearchId_Map.entries() ) {

        const root_MapValue = root_MapEntry[ 1 ];
        const projectSearchId = root_MapValue.projectSearchId
        const psmFilterableAnnotationTypes = root_MapValue.psmFilterableAnnotationTypes
        const reportedPeptideFilterableAnnotationTypes = root_MapValue.reportedPeptideFilterableAnnotationTypes
        const matchedProteinFilterableAnnotationTypes = root_MapValue.matchedProteinFilterableAnnotationTypes

        let resultMap_For_ProjectSearchId = resultMap_KeyProjectSearchId.get( projectSearchId );
        if ( ! resultMap_For_ProjectSearchId ) {
            resultMap_For_ProjectSearchId = {
                projectSearchId,
                reportedPeptideFilterDataMap_KeyAnnTypeId : new Map<number, Internal_SingleFilterValue_Entry>(),
                psmFilterDataMap_KeyAnnTypeId : new Map<number, Internal_SingleFilterValue_Entry>(),
                matchedProteinFilterDataMap_KeyAnnTypeId : new Map<number, Internal_SingleFilterValue_Entry>()
            }
        }
        if ( psmFilterableAnnotationTypes && psmFilterableAnnotationTypes.size > 0 ) {
            for ( const annTypesEntry of psmFilterableAnnotationTypes ) {
                const annTypesEntryValue = annTypesEntry[ 1 ];
                const annotationTypeId = annTypesEntryValue.annotationTypeId;

                if ( resultMap_For_ProjectSearchId.psmFilterDataMap_KeyAnnTypeId.has( annotationTypeId ) ) {
                    // annotationTypeId already in map
                    continue;  // EARLY CONTINUE
                }

                const resultMap_For_ProjectSearchId_Entry : Internal_SingleFilterValue_Entry = {
                    annotationTypeId,
                    initialValue : undefined,
                    initialValueString  : "",
                    currentValue : undefined,
                    currentValueString  : "",
                    currentValueInvalidValue : false,
                    currentValueSameAsInitialValue : true,
                }
                resultMap_For_ProjectSearchId.psmFilterDataMap_KeyAnnTypeId.set( annotationTypeId, resultMap_For_ProjectSearchId_Entry )
            }
        }
        if ( reportedPeptideFilterableAnnotationTypes && reportedPeptideFilterableAnnotationTypes.size > 0 ) {
            for ( const annTypesEntry of reportedPeptideFilterableAnnotationTypes ) {
                const annTypesEntryValue = annTypesEntry[ 1 ];
                const annotationTypeId = annTypesEntryValue.annotationTypeId;

                if ( resultMap_For_ProjectSearchId.reportedPeptideFilterDataMap_KeyAnnTypeId.has( annotationTypeId ) ) {
                    // annotationTypeId already in map
                    continue;  // EARLY CONTINUE
                }

                const resultMap_For_ProjectSearchId_Entry : Internal_SingleFilterValue_Entry = {
                    annotationTypeId,
                    initialValue : undefined,
                    initialValueString  : "",
                    currentValue : undefined,
                    currentValueString  : "",
                    currentValueInvalidValue : false,
                    currentValueSameAsInitialValue : true,
                }
                resultMap_For_ProjectSearchId.reportedPeptideFilterDataMap_KeyAnnTypeId.set( annotationTypeId, resultMap_For_ProjectSearchId_Entry )
            }
        }
        if ( matchedProteinFilterableAnnotationTypes && matchedProteinFilterableAnnotationTypes.size > 0 ) {
            for ( const annTypesEntry of matchedProteinFilterableAnnotationTypes ) {
                const annTypesEntryValue = annTypesEntry[ 1 ];
                const annotationTypeId = annTypesEntryValue.annotationTypeId;

                if ( resultMap_For_ProjectSearchId.matchedProteinFilterDataMap_KeyAnnTypeId.has( annotationTypeId ) ) {
                    // annotationTypeId already in map
                    continue;  // EARLY CONTINUE
                }

                const resultMap_For_ProjectSearchId_Entry : Internal_SingleFilterValue_Entry = {
                    annotationTypeId,
                    initialValue : undefined,
                    initialValueString  : "",
                    currentValue : undefined,
                    currentValueString  : "",
                    currentValueInvalidValue : false,
                    currentValueSameAsInitialValue : true,
                }
                resultMap_For_ProjectSearchId.matchedProteinFilterDataMap_KeyAnnTypeId.set( annotationTypeId, resultMap_For_ProjectSearchId_Entry )
            }
        }
    }



    const dataMapPerProjectSearchId_KeyProjectSearchId_Holder = new DataMapPerProjectSearchId_KeyProjectSearchId_Holder({
        dataMapPerProjectSearchId_KeyProjectSearchId : resultMap_KeyProjectSearchId
    })

    return dataMapPerProjectSearchId_KeyProjectSearchId_Holder;
}

/////

//   Single Search Entry

interface Single_Search_Entry_Props {

    projectSearchId : number
    dataMapPerProjectSearchId_KeyProjectSearchId_Holder : DataMapPerProjectSearchId_KeyProjectSearchId_Holder
    searchDetails_Filters_AnnTypeDisplayRootObject : SearchDataLookupParameters_Root
    searchNamesMap_KeyProjectSearchId :  SearchNames_AsMap
    searchProgramsPerSearchData_Root : SearchProgramsPerSearchData_Root
    annotationTypeData_Root : AnnotationTypeData_Root
    userClickedOn_ToOpenOverlay : SearchDetailsAndFilterBlock_UserInputInOverlay_UserClickedOn_ToOpenOverlay
    pass_top_of_SubElement_To_ScrollTo : Pass_top_of_SubElement_To_ScrollTo
    userUpdatedInputValue_Callback : UserUpdatedInputValue_Callback
}


interface Single_Search_Entry_State {

    _placeHolder
}



/**
 *
 */
class Single_Search_Entry extends React.Component< Single_Search_Entry_Props, Single_Search_Entry_State > {

    private readonly _projectDiv_Ref :  React.RefObject<HTMLDivElement>

    constructor(props : Single_Search_Entry_Props) {
        super(props);

        if ( ! props.userUpdatedInputValue_Callback ) {
            throw Error("No value for props.userUpdatedInputValue_Callback: Single_Search_Entry::constructor(...)");
        }

        this._projectDiv_Ref = React.createRef();
    }

    componentDidMount() {

        if ( this.props.userClickedOn_ToOpenOverlay.projectSearchId_UserClickedIn === this.props.projectSearchId
        && ( ! this.props.userClickedOn_ToOpenOverlay.userClickedOnAnnotationTypeId )) {

            //  User Clicked on this search data on main page so highlight this value and scroll so this is in view

            const boundingRect = this._projectDiv_Ref.current.getBoundingClientRect();

            const top = boundingRect.top

            this.props.pass_top_of_SubElement_To_ScrollTo(top)
        }
    }

    /**
     *
     */
    render() {

        const projectSearchId = this.props.projectSearchId
        const dataMapPerProjectSearchId_KeyProjectSearchId_Holder = this.props.dataMapPerProjectSearchId_KeyProjectSearchId_Holder
        const searchDetails_Filters_AnnTypeDisplayRootObject = this.props.searchDetails_Filters_AnnTypeDisplayRootObject
        const searchNamesMap_KeyProjectSearchId = this.props.searchNamesMap_KeyProjectSearchId
        const searchProgramsPerSearchData_Root = this.props.searchProgramsPerSearchData_Root
        const annotationTypeData_Root = this.props.annotationTypeData_Root
        const userClickedOn_ToOpenOverlay = this.props.userClickedOn_ToOpenOverlay
        const pass_top_of_SubElement_To_ScrollTo = this.props.pass_top_of_SubElement_To_ScrollTo
        const userUpdatedInputValue_Callback = this.props.userUpdatedInputValue_Callback

        const annotationTypeData_For_projectSearchId  = this.props.annotationTypeData_Root.annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId );
        if ( ! annotationTypeData_For_projectSearchId ) {
            throw Error("annotationTypeData_Root.annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId ) returned nothing. projectSearchId: " + projectSearchId );
        }
        const searchProgramsPerSearchData_For_projectSearchId = searchProgramsPerSearchData_Root.searchProgramsPerSearchItems_PerProjectSearchId_Map.get( projectSearchId )
        if ( ! searchProgramsPerSearchData_For_projectSearchId ) {
            throw Error("searchProgramsPerSearchData_Root.searchProgramsPerSearchItems_PerProjectSearchId_Map.get( projectSearchId ) returned nothing. projectSearchId: " + projectSearchId );
        }
        const searchNamesMap_For_ProjectSearchId = searchNamesMap_KeyProjectSearchId.get( projectSearchId );
        if ( ! searchNamesMap_For_ProjectSearchId ) {
            throw Error("searchNamesMap_KeyProjectSearchId.get( projectSearchId ) returned nothing. projectSearchId: " + projectSearchId );
        }

        let searchDataLookupParams_For_Single_ProjectSearchId : SearchDataLookupParams_For_Single_ProjectSearchId = undefined;
        for ( const searchDetails_Filters_AnnTypeDisplay_Per_projectSearchId_Entry of searchDetails_Filters_AnnTypeDisplayRootObject.paramsForProjectSearchIds.paramsForProjectSearchIdsList ) {
            if ( searchDetails_Filters_AnnTypeDisplay_Per_projectSearchId_Entry.projectSearchId === projectSearchId ) {
                searchDataLookupParams_For_Single_ProjectSearchId = searchDetails_Filters_AnnTypeDisplay_Per_projectSearchId_Entry;
                break;
            }
        }
        if ( ! searchDataLookupParams_For_Single_ProjectSearchId ) {
            throw Error("No entry in searchDetails_Filters_AnnTypeDisplayRootObject.paramsForProjectSearchIds.paramsForProjectSearchIdsList for projectSearchId. projectSearchId: " + projectSearchId );
        }

        const internal_Single_For_ProjectSearchId_Entry = dataMapPerProjectSearchId_KeyProjectSearchId_Holder.dataMapPerProjectSearchId_KeyProjectSearchId.get( projectSearchId )
        if ( ! internal_Single_For_ProjectSearchId_Entry ) {
            throw Error("No entry in dataMapPerProjectSearchId_KeyProjectSearchId_Holder.dataMapPerProjectSearchId_KeyProjectSearchId for projectSearchId. projectSearchId: " + projectSearchId );
        }

        const searchProgramsPerSearch_Key_searchProgramsPerSearchId = searchProgramsPerSearchData_For_projectSearchId.searchProgramsPerSearchItem_Map;

        //  Map key ann type id
        const reportedPeptideFilterableAnnotationTypes : Map<number, AnnotationTypeItem> = annotationTypeData_For_projectSearchId.reportedPeptideFilterableAnnotationTypes;
        const psmFilterableAnnotationTypes : Map<number, AnnotationTypeItem> = annotationTypeData_For_projectSearchId.psmFilterableAnnotationTypes;
        const matchedProteinFilterableAnnotationTypes : Map<number, AnnotationTypeItem> = annotationTypeData_For_projectSearchId.matchedProteinFilterableAnnotationTypes;

        const _TYPE_LABEL_INDENT = 30;
        const _TYPE_LABEL_PADDING_TOP = 5;

        const psmFilters = _getFilters_SingleFilterableType_Components({
            projectSearchId,
            filterableAnnotationTypesMap_KeyAnnotationTypeId : psmFilterableAnnotationTypes,
            filterDataMap_KeyAnnTypeId : internal_Single_For_ProjectSearchId_Entry.psmFilterDataMap_KeyAnnTypeId,
            searchProgramsPerSearch_Key_searchProgramsPerSearchId,
            userClickedOn_ToOpenOverlay,
            pass_top_of_SubElement_To_ScrollTo,
            userUpdatedInputValue_Callback
        });

        let psmFiltersDisplay = undefined;
        if ( psmFilters ) {
            psmFiltersDisplay = (
                <React.Fragment>
                    <div  style={ { fontWeight : "bold", gridColumn: "1 / -1", marginLeft: _TYPE_LABEL_INDENT, paddingTop: _TYPE_LABEL_PADDING_TOP } }>
                        PSM Filters
                    </div>
                    { psmFilters }
                </React.Fragment>
            );
        }

        const reportedPeptideFilters = _getFilters_SingleFilterableType_Components({
            projectSearchId,
            filterableAnnotationTypesMap_KeyAnnotationTypeId : reportedPeptideFilterableAnnotationTypes,
            filterDataMap_KeyAnnTypeId : internal_Single_For_ProjectSearchId_Entry.reportedPeptideFilterDataMap_KeyAnnTypeId,
            searchProgramsPerSearch_Key_searchProgramsPerSearchId,
            userClickedOn_ToOpenOverlay,
            pass_top_of_SubElement_To_ScrollTo,
            userUpdatedInputValue_Callback
        });

        let reportedPeptideFiltersDisplay = undefined;
        if ( reportedPeptideFilters ) {
            reportedPeptideFiltersDisplay = (
                <React.Fragment>
                    <div  style={ { fontWeight : "bold", gridColumn: "1 / -1", marginLeft: _TYPE_LABEL_INDENT, paddingTop: _TYPE_LABEL_PADDING_TOP } }>
                        Peptide Filters
                    </div>
                    { reportedPeptideFilters }
                </React.Fragment>
            );
        }

        const matchedProteinFilters = _getFilters_SingleFilterableType_Components({
            projectSearchId,
            filterableAnnotationTypesMap_KeyAnnotationTypeId : matchedProteinFilterableAnnotationTypes,
            filterDataMap_KeyAnnTypeId : internal_Single_For_ProjectSearchId_Entry.matchedProteinFilterDataMap_KeyAnnTypeId,
            searchProgramsPerSearch_Key_searchProgramsPerSearchId,
            userClickedOn_ToOpenOverlay,
            pass_top_of_SubElement_To_ScrollTo,
            userUpdatedInputValue_Callback
        });

        let matchedProteinFiltersDisplay = undefined;
        if ( matchedProteinFilters ) {
            matchedProteinFiltersDisplay = (
                <React.Fragment>
                    <div  style={ { fontWeight : "bold", gridColumn: "1 / -1", marginLeft: _TYPE_LABEL_INDENT, paddingTop: _TYPE_LABEL_PADDING_TOP } }>
                        Protein Filters
                    </div>
                    { matchedProteinFilters }
                </React.Fragment>
            );
        }

        const searchNameDisplay = searchNamesMap_For_ProjectSearchId.name + " (" + searchNamesMap_For_ProjectSearchId.searchId + ") ";

        const result = (
            <React.Fragment>
                <div ref={ this._projectDiv_Ref } style={ { fontWeight : "bold" } }>
                    Search:
                </div>
                <div  style={ { gridColumn: "2 / -1", wordBreak: "break-word" } }
                      title={ "Search:\n\n" + searchNameDisplay }
                >
                    { searchNameDisplay }
                </div>
                { psmFiltersDisplay }
                { reportedPeptideFiltersDisplay }
                { matchedProteinFiltersDisplay }
            </React.Fragment>
        );

        return result;
    }
}

/**
 *
 */
const _getFilters_SingleFilterableType_Components = function(
    {
        projectSearchId,
        filterableAnnotationTypesMap_KeyAnnotationTypeId,
        filterDataMap_KeyAnnTypeId,
        searchProgramsPerSearch_Key_searchProgramsPerSearchId,
        userClickedOn_ToOpenOverlay,
        pass_top_of_SubElement_To_ScrollTo,
        userUpdatedInputValue_Callback
    } : {
        projectSearchId : number
        filterableAnnotationTypesMap_KeyAnnotationTypeId : Map<number, AnnotationTypeItem>
        filterDataMap_KeyAnnTypeId : Map<number, Internal_SingleFilterValue_Entry>
        searchProgramsPerSearch_Key_searchProgramsPerSearchId,
        userClickedOn_ToOpenOverlay : SearchDetailsAndFilterBlock_UserInputInOverlay_UserClickedOn_ToOpenOverlay
        pass_top_of_SubElement_To_ScrollTo : Pass_top_of_SubElement_To_ScrollTo
        userUpdatedInputValue_Callback : UserUpdatedInputValue_Callback

    }) : Array<JSX.Element> {

    let result : Array<JSX.Element> = undefined;

    for ( const entry of filterableAnnotationTypesMap_KeyAnnotationTypeId ) {

        const filterableAnnotationType = entry[ 1 ];
        const annotationTypeId = filterableAnnotationType.annotationTypeId;
        const defaultFilter = filterableAnnotationType.defaultFilter;

        const filterData = filterDataMap_KeyAnnTypeId.get( annotationTypeId );
        if ( filterData === undefined ) {
            throw Error("No Value from filterDataMap_KeyAnnTypeId.get( annotationTypeId ) for annotationTypeId: " + annotationTypeId );
        }

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
                userClickedOn_ToOpenOverlay={ userClickedOn_ToOpenOverlay }
                pass_top_of_SubElement_To_ScrollTo={ pass_top_of_SubElement_To_ScrollTo }
                userUpdatedInputValue_Callback={ userUpdatedInputValue_Callback }
            />
        )

        if ( result === undefined ) {
            result = [];
        }
        result.push( resultItem );

    }

    return result;
}

/////////////////////////////////
/////////////////////////////////
/////////////////////////////////

//   React Sub Components:

interface Single_Filterable_PerAnnotationType_Entry_Props {

    inputValue : string
    inputLabel : string
    filterData :  Internal_SingleFilterValue_Entry
    annotationTypeId : number
    projectSearchId : number
    userClickedOn_ToOpenOverlay : SearchDetailsAndFilterBlock_UserInputInOverlay_UserClickedOn_ToOpenOverlay
    pass_top_of_SubElement_To_ScrollTo : Pass_top_of_SubElement_To_ScrollTo
    userUpdatedInputValue_Callback : UserUpdatedInputValue_Callback
}


interface Single_Filterable_PerAnnotationType_Entry_State {

    _placeHolder
}



/**
 *
 */
class Single_Filterable_PerAnnotationType_Entry extends React.Component< Single_Filterable_PerAnnotationType_Entry_Props, Single_Filterable_PerAnnotationType_Entry_State > {

    private _handleFilterAnnTypeValueChange_BindThis = this._handleFilterAnnTypeValueChange.bind(this);

    private readonly _inputField_Ref :  React.RefObject<HTMLInputElement>

    constructor(props : Single_Filterable_PerAnnotationType_Entry_Props) {
        super(props);

        if ( ! props.userUpdatedInputValue_Callback ) {
            throw Error("No value for props.userUpdatedInputValue_Callback: Single_Filterable_PerAnnotationType_Entry::constructor(...)");
        }

        this._inputField_Ref = React.createRef();
    }

    /**
     *
     */
    _handleFilterAnnTypeValueChange( event ) {

        // const target = event.target;
        // const value = target.value;

        const value = this._inputField_Ref.current.value

        const callbackParams : UserUpdatedInputValue_Callback_Params = { newValue : value, annotationTypeId : this.props.annotationTypeId, projectSearchId : this.props.projectSearchId };

        this.props.userUpdatedInputValue_Callback( callbackParams );
    }

    componentDidMount() {

        if ( this.props.userClickedOn_ToOpenOverlay.projectSearchId_UserClickedIn === this.props.projectSearchId
            && this.props.userClickedOn_ToOpenOverlay.userClickedOnAnnotationTypeId === this.props.annotationTypeId ) {

            //  User Clicked on this annotation id data on main page so highlight this value and scroll so this is in view

            const $element = $( this._inputField_Ref.current );
            $element.select();

            const boundingRect = this._inputField_Ref.current.getBoundingClientRect();

            const top = boundingRect.top

            this.props.pass_top_of_SubElement_To_ScrollTo(top);
        }
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
                <div style={ { paddingRight: 10, paddingTop: 2, paddingBottom: 1 } }>
                    <input type="text" value={ this.props.inputValue }  onChange={ this._handleFilterAnnTypeValueChange_BindThis } ref={ this._inputField_Ref }
                        // onInput - Using 'input' event type in other places on <input type="text"
                           style={ { width: 100 } }
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
