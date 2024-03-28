/**
 * annotationTypesToDisplay__SelectionOverlay__Component.tsx
 *
 *  Annotation Types to Display (PSM, Peptide, ) :  Component for Selection Overlay
 *
 */

import React from 'react'
import {
    SearchDataLookupParameters_Root
} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {
    AnnotationTypeItem,
    AnnotationTypeItems_PerProjectSearchId,
    DataPageStateManager, SearchProgramsPerSearchItem
} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {ModalOverlay_Limelight_Component_v001_B_FlexBox} from "page_js/common_all_pages/modal_overlay_react/modal_overlay_with_titlebar_react_v001_B_FlexBox/modalOverlay_WithTitlebar_React_v001_B_FlexBox";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {Spinner_Limelight_Component} from "page_js/common_all_pages/spinner_ReactComponent_Limelight";
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
import {updatePageState_URL_With_New_SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages_common/updatePageState_URL_With_New_SearchDataLookupParameters_Root";
import { limelight__ReloadPage_Function } from "page_js/common_all_pages/limelight__ReloadPage_Function";


const _Overlay_Title = "Change Displayed Data"

const _Overlay_Width_Min = 300;
const _Overlay_Width_Max = 1000;

const _Overlay_Height_Min = 300;
const _Overlay_Height_Max = 1400;


/**
 *
 */
export const open_AnnotationTypesToDisplay__SelectionOverlay = function (
    {
        params
    } : {
        params: AnnotationTypesToDisplay__SelectionOverlayComponent__Component_Params

}) : void {

    let limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder :  Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF = undefined;

    const callbackOn_Cancel_Close_Clicked = () : void => {
        limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder.removeContents_AndContainer_FromDOM();
    };

    const callbackOn_Save_Clicked = () : void => {
        limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder.removeContents_AndContainer_FromDOM();

        //  Open "LOADING Data" Overlay
        const overlayComponent = (
            <AnnotationTypesToDisplay__LoadingDataOverlayComponent
            />
        )

        limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder =
            limelight_add_ReactComponent_JSX_Element_To_DocumentBody({ componentToAdd : overlayComponent })
    };

    const overlayComponent = (
        <AnnotationTypesToDisplay__SelectionOverlayComponent__Component
            params={ params }
            callbackOn_Cancel_Close_Clicked={ callbackOn_Cancel_Close_Clicked }
            callbackOn_Save_Clicked={ callbackOn_Save_Clicked }
        />
    )

    limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder =
        limelight_add_ReactComponent_JSX_Element_To_DocumentBody({ componentToAdd : overlayComponent });
}

/**
 *
 */
export interface AnnotationTypesToDisplay__SelectionOverlayComponent__Component_Params {

    projectSearchIds: Array<number>
    searchDataLookupParameters_Root: SearchDataLookupParameters_Root  //  Existing values
    dataPageStateManager_DataFrom_Server : DataPageStateManager
}

////

//  Local classes

class Local_AnnTypeDisplay_ForAll_ProjectSearchId {

    annTypeDisplay_Per_ProjectSearchId_Map_Key_ProjectSearchId: Map<number, Local_AnnTypeDisplay_Per_ProjectSearchId>
}

class Local_AnnTypeDisplay_Per_ProjectSearchId {

    //  Annotation Type Ids to Display
    psmAnnTypeDisplay : Array<number>;
    reportedPeptideAnnTypeDisplay : Array<number>;
    matchedProteinAnnTypeDisplay : Array<number>;
}

class Local_SearchesList {
    searches: Array<Local_SearchesList_Entry>
}

class Local_SearchesList_Entry {
    projectSearchId: number
    searchName_Display: string
}


/////////

//  React Components

///   !!!!!   Saving Component

/**
 *
 */
interface AnnotationTypesToDisplay__LoadingDataOverlayComponent__Component_Props {

}

/**
 *
 */
interface AnnotationTypesToDisplay__LoadingDataOverlayComponent__Component_State {

    _placeholder?: any
}

/**
 *
 */
class AnnotationTypesToDisplay__LoadingDataOverlayComponent extends React.Component< AnnotationTypesToDisplay__LoadingDataOverlayComponent__Component_Props, AnnotationTypesToDisplay__LoadingDataOverlayComponent__Component_State > {

    /**
     *
     */
    constructor(props: AnnotationTypesToDisplay__LoadingDataOverlayComponent__Component_Props) {
        super(props);

        this.state = {};
    }

    /**
     *
     */
    render() {

        return (

            <ModalOverlay_Limelight_Component_v001_B_FlexBox
                widthMinimum={ _Overlay_Width_Min }
                widthMaximum={ _Overlay_Width_Max }
                heightMinimum={ _Overlay_Height_Min }
                heightMaximum={ _Overlay_Height_Max }
                title={ _Overlay_Title }
                set_CSS_Position_Fixed={ true }
                callbackOnClicked_Close={ null } // No Close option
                titleBar_LeaveSpaceFor_CloseX={ true }
                close_OnBackgroundClick={ false } >

                <div
                    style={ { textAlign: "center", fontSize: 18, fontWeight: "bold", marginTop: 20 } }
                >
                    LOADING DATA
                </div>

                <div style={ { marginTop: 80, marginBottom: 80, textAlign: "center" } }>
                    <Spinner_Limelight_Component/>
                </div>

            </ModalOverlay_Limelight_Component_v001_B_FlexBox>
        )
    }
}


//////////

///   !!!!!   Main Top Level Component

/**
 *
 */
interface AnnotationTypesToDisplay__SelectionOverlayComponent__Component_Props {

    params: AnnotationTypesToDisplay__SelectionOverlayComponent__Component_Params
    callbackOn_Cancel_Close_Clicked: () => void
    callbackOn_Save_Clicked: () => void
}

/**
 *
 */
interface AnnotationTypesToDisplay__SelectionOverlayComponent__Component_State {

    forceRerenderObject: object      //  Force Rerender object
}

/**
 *
 */
class AnnotationTypesToDisplay__SelectionOverlayComponent__Component extends React.Component< AnnotationTypesToDisplay__SelectionOverlayComponent__Component_Props, AnnotationTypesToDisplay__SelectionOverlayComponent__Component_State > {

    // private _DO_NOT_CALL_BoundMethods_TypeTest() { // Function only to test that methods that are .bind(this) are correct function signature
    //
    // }

    private _local_AnnTypeDisplay_ForAll_ProjectSearchId : Local_AnnTypeDisplay_ForAll_ProjectSearchId
    private _current_ProjectSearchId: number
    private _searchesList: Local_SearchesList

    /**
     *
     */
    constructor(props: AnnotationTypesToDisplay__SelectionOverlayComponent__Component_Props) {
        super(props);

        this._local_AnnTypeDisplay_ForAll_ProjectSearchId = _create_local_AnnTypeDisplay_ForAll_ProjectSearchId(props);
        this._current_ProjectSearchId = props.params.projectSearchIds[0];

        {
            const searchNames_AsMap = props.params.dataPageStateManager_DataFrom_Server.get_searchNames_AsMap();
            const searches: Array<Local_SearchesList_Entry> = [];
            for ( const projectSearchId of props.params.projectSearchIds ) {
                const searchNames_Entry = searchNames_AsMap.get( projectSearchId );
                if ( ! searchNames_Entry ) {
                    const msg = "searchNames_AsMap.get( projectSearchId ); returned nothing for projectSearchId: " + projectSearchId;
                    console.warn(msg);
                    throw Error(msg);
                }

                const searchName_Display = "(" + searchNames_Entry.searchId + ") " + searchNames_Entry.name;
                const search = new Local_SearchesList_Entry();
                search.searchName_Display = searchName_Display;
                search.projectSearchId = projectSearchId;

                searches.push( search );
            }
            this._searchesList = new Local_SearchesList();
            this._searchesList.searches = searches;
        }

        this.state = {
            forceRerenderObject: {}
        };
    }

    /**
     *
     */
    private _saveButton_ClickHandler () : void {
        try {
            this.props.callbackOn_Save_Clicked();

            //  WARNING, altering existing "props" value

            const searchDataLookupParameters_Root = this.props.params.searchDataLookupParameters_Root;

            for ( const searchDataLookupParameters_Single_ProjectSearchId of searchDataLookupParameters_Root.paramsForProjectSearchIds.paramsForProjectSearchIdsList ) {

                const projectSearchId = searchDataLookupParameters_Single_ProjectSearchId.projectSearchId;

                const local_annTypeDisplay_For_ProjectSearchId = this._local_AnnTypeDisplay_ForAll_ProjectSearchId.annTypeDisplay_Per_ProjectSearchId_Map_Key_ProjectSearchId.get( projectSearchId );
                if ( local_annTypeDisplay_For_ProjectSearchId ) {
                    searchDataLookupParameters_Single_ProjectSearchId.psmAnnTypeDisplay = local_annTypeDisplay_For_ProjectSearchId.psmAnnTypeDisplay;
                    searchDataLookupParameters_Single_ProjectSearchId.reportedPeptideAnnTypeDisplay = local_annTypeDisplay_For_ProjectSearchId.reportedPeptideAnnTypeDisplay;
                    searchDataLookupParameters_Single_ProjectSearchId.matchedProteinAnnTypeDisplay = local_annTypeDisplay_For_ProjectSearchId.matchedProteinAnnTypeDisplay;
                }
            }

            const promise = updatePageState_URL_With_New_SearchDataLookupParameters_Root({ searchDetails_Filters_AnnTypeDisplay_Root: searchDataLookupParameters_Root });
            promise.catch( reason => {
                throw Error("updatePageState_URL_With_New_SearchDataLookupParameters_Root reject promise")
            });
            promise.then( value => {
                limelight__ReloadPage_Function()
            })

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    render() {

        const projectSearchId = this._current_ProjectSearchId;

        const local_AnnTypeDisplay_For_ProjectSearchId = this._local_AnnTypeDisplay_ForAll_ProjectSearchId.annTypeDisplay_Per_ProjectSearchId_Map_Key_ProjectSearchId.get( projectSearchId );
        if ( ! local_AnnTypeDisplay_For_ProjectSearchId ) {
            const msg = "Returned nothing: this._local_AnnTypeDisplay_ForAll_ProjectSearchId.annTypeDisplay_Per_ProjectSearchId_Map_Key_ProjectSearchId.get( projectSearchId ); projectSearchId: " + projectSearchId;
            console.warn(msg);
            throw Error(msg);
        }

        const psmAnnTypeDisplay = local_AnnTypeDisplay_For_ProjectSearchId.psmAnnTypeDisplay;
        const reportedPeptideAnnTypeDisplay = local_AnnTypeDisplay_For_ProjectSearchId.reportedPeptideAnnTypeDisplay;
        const matchedProteinAnnTypeDisplay = local_AnnTypeDisplay_For_ProjectSearchId.matchedProteinAnnTypeDisplay;

        const annotationTypeItems_PerProjectSearchId_Map :  Map<number, AnnotationTypeItems_PerProjectSearchId> =
            this.props.params.dataPageStateManager_DataFrom_Server.get_annotationTypeData_Root().annotationTypeItems_PerProjectSearchId_Map;

        if ( annotationTypeItems_PerProjectSearchId_Map.size === 0 ) {
            throw Error( "( annotationTypeItems_PerProjectSearchId_Map.size === 0 )" )
        }

        const annotationTypeItems_For_FirstKey_ProjectSearchId : AnnotationTypeItems_PerProjectSearchId = annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId );


        const searchProgramsPerSearchItems_PerProjectSearchId_Map = this.props.params.dataPageStateManager_DataFrom_Server.get_searchProgramsPerSearchData_Root().searchProgramsPerSearchItems_PerProjectSearchId_Map;
        const searchProgramsPerSearchItem_ForProjectSearchId = searchProgramsPerSearchItems_PerProjectSearchId_Map.get( projectSearchId )
        if ( ! searchProgramsPerSearchItem_ForProjectSearchId ) {
            throw Error( "( ! searchProgramsPerSearchItem_ForProjectSearchId )" )
        }
        const searchProgramsPerSearchItem_Map = searchProgramsPerSearchItem_ForProjectSearchId.searchProgramsPerSearchItem_Map;

        let current_SearchName_Display : string = undefined;
        for ( const search of this._searchesList.searches ) {
            if ( search.projectSearchId === this._current_ProjectSearchId ) {
                current_SearchName_Display = search.searchName_Display
            }
        }

        return (

            <ModalOverlay_Limelight_Component_v001_B_FlexBox
                widthMinimum={ _Overlay_Width_Min }
                widthMaximum={ _Overlay_Width_Max }
                heightMinimum={ _Overlay_Height_Min }
                heightMaximum={ _Overlay_Height_Max }
                title={ _Overlay_Title }
                set_CSS_Position_Fixed={ true }
                callbackOnClicked_Close={ this.props.callbackOn_Cancel_Close_Clicked }
                close_OnBackgroundClick={ false } >

                <React.Fragment>

                    <div className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                         style={ { marginBottom: 12 } }
                        // style={ { padding : 6 } }
                    >
                        <div style={ { textAlign: "center" } }>
                            Changing these values and saving will cause a page reload
                        </div>

                        { ( this._searchesList.searches.length > 1 ) ? (
                            //  More than 1 search so show selector
                            <div >
                                <div style={ { fontSize: 18, fontWeight: "bold" } }>
                                    Select Search:
                                </div>
                                <div>
                                    <select
                                        value={ this._current_ProjectSearchId }
                                        title={ current_SearchName_Display }
                                        onChange={
                                            event => {
                                                const selected_ProjectSearchId = Number.parseInt( event.target.value );
                                                if ( Number.isNaN( selected_ProjectSearchId ) ) {
                                                    throw Error("( Number.isNaN( selected_ProjectSearchId ) )")
                                                }
                                                this._current_ProjectSearchId = selected_ProjectSearchId;
                                                this.setState({ forceRerenderObject: {} })
                                            }
                                        }
                                    >
                                        { this._searchesList.searches.map( (search, index) => {
                                            return (
                                                <option
                                                    key={ search.projectSearchId } value={ search.projectSearchId }
                                                    title={ search.searchName_Display }
                                                >
                                                    { search.searchName_Display }
                                                </option>
                                            )
                                        }) }
                                    </select>
                                </div>
                            </div>
                        ) : null }

                    </div>

                    <div className=" top-level single-entry-variable-height modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right standard-border-color-medium"
                         style={ { overflowY: "auto", overflowX: "hidden", borderStyle: "solid", borderWidth: 1 } }
                    >
                        {/*  Main Body:  Scrollable Div  */}

                        <Internal__PerType_PSM_Peptide_Protein__Section__Component
                            type_HeaderLabelText="PSM Data"
                            annTypeDisplay={ psmAnnTypeDisplay }
                            filterableAnnotationTypes={ annotationTypeItems_For_FirstKey_ProjectSearchId.psmFilterableAnnotationTypes }
                            descriptiveAnnotationTypes={ annotationTypeItems_For_FirstKey_ProjectSearchId.psmDescriptiveAnnotationTypes }
                            searchProgramsPerSearchItem_Map={ searchProgramsPerSearchItem_Map }
                            callbackOn_DataChanged={ () => {
                                //  Force Rerender
                                this.setState({ forceRerenderObject: {} });
                            } }
                        />

                        <Internal__PerType_PSM_Peptide_Protein__Section__Component
                            type_HeaderLabelText="Peptide Data"
                            annTypeDisplay={ reportedPeptideAnnTypeDisplay }
                            filterableAnnotationTypes={ annotationTypeItems_For_FirstKey_ProjectSearchId.reportedPeptideFilterableAnnotationTypes }
                            descriptiveAnnotationTypes={ annotationTypeItems_For_FirstKey_ProjectSearchId.reportedPeptideDescriptiveAnnotationTypes }
                            searchProgramsPerSearchItem_Map={ searchProgramsPerSearchItem_Map }
                            callbackOn_DataChanged={ () => {
                                //  Force Rerender
                                this.setState({ forceRerenderObject: {} });
                            } }
                        />

                        { ( ( annotationTypeItems_For_FirstKey_ProjectSearchId.matchedProteinFilterableAnnotationTypes && annotationTypeItems_For_FirstKey_ProjectSearchId.matchedProteinFilterableAnnotationTypes.size > 0 )
                            || ( annotationTypeItems_For_FirstKey_ProjectSearchId.matchedProteinFilterableAnnotationTypes && annotationTypeItems_For_FirstKey_ProjectSearchId.matchedProteinFilterableAnnotationTypes.size > 0 ) ) ? (

                            <Internal__PerType_PSM_Peptide_Protein__Section__Component
                                type_HeaderLabelText="Protein Data"
                                annTypeDisplay={ matchedProteinAnnTypeDisplay }
                                filterableAnnotationTypes={ annotationTypeItems_For_FirstKey_ProjectSearchId.matchedProteinFilterableAnnotationTypes }
                                descriptiveAnnotationTypes={ annotationTypeItems_For_FirstKey_ProjectSearchId.matchedProteinDescriptiveAnnotationTypes }
                                searchProgramsPerSearchItem_Map={ searchProgramsPerSearchItem_Map }
                                callbackOn_DataChanged={ () => {
                                    //  Force Rerender
                                    this.setState({ forceRerenderObject: {} });
                                } }
                            />
                        ) : null }
                    </div>

                    <div className=" top-level fixed-height modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                         style={ { marginTop: 12 } }
                        // style={ { padding : 6 } }
                    >
                        <div>
                            <button
                                onClick={ event => {
                                    event.stopPropagation();
                                    this._saveButton_ClickHandler();
                                }}
                            >
                                Save
                            </button>
                            <span> </span>
                            <button
                                onClick={ event => {
                                    event.stopPropagation();
                                    this.props.callbackOn_Cancel_Close_Clicked();
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>

                </React.Fragment>
            </ModalOverlay_Limelight_Component_v001_B_FlexBox>
        );
    }
}



/**
 *
 */
const _create_local_AnnTypeDisplay_ForAll_ProjectSearchId = function(props: AnnotationTypesToDisplay__SelectionOverlayComponent__Component_Props) : Local_AnnTypeDisplay_ForAll_ProjectSearchId {

    const annTypeDisplay_Per_ProjectSearchId_Map_Key_ProjectSearchId: Map<number, Local_AnnTypeDisplay_Per_ProjectSearchId> = new Map();

    for ( const searchDataLookupParameters_For_ProjectSearchId of props.params.searchDataLookupParameters_Root.paramsForProjectSearchIds.paramsForProjectSearchIdsList ) {

        const projectSearchId = searchDataLookupParameters_For_ProjectSearchId.projectSearchId;

        const local_AnnTypeDisplay_Per_ProjectSearchId = new Local_AnnTypeDisplay_Per_ProjectSearchId();

        if ( searchDataLookupParameters_For_ProjectSearchId.psmAnnTypeDisplay ) {
            local_AnnTypeDisplay_Per_ProjectSearchId.psmAnnTypeDisplay = Array.from( searchDataLookupParameters_For_ProjectSearchId.psmAnnTypeDisplay );
        }
        if ( searchDataLookupParameters_For_ProjectSearchId.reportedPeptideAnnTypeDisplay ) {
            local_AnnTypeDisplay_Per_ProjectSearchId.reportedPeptideAnnTypeDisplay = Array.from( searchDataLookupParameters_For_ProjectSearchId.reportedPeptideAnnTypeDisplay );
        }
        if ( searchDataLookupParameters_For_ProjectSearchId.matchedProteinAnnTypeDisplay ) {
            local_AnnTypeDisplay_Per_ProjectSearchId.matchedProteinAnnTypeDisplay = Array.from( searchDataLookupParameters_For_ProjectSearchId.matchedProteinAnnTypeDisplay );
        }

        annTypeDisplay_Per_ProjectSearchId_Map_Key_ProjectSearchId.set( projectSearchId, local_AnnTypeDisplay_Per_ProjectSearchId );
    }

    const local_AnnTypeDisplay_ForAll_ProjectSearchId = new Local_AnnTypeDisplay_ForAll_ProjectSearchId();
    local_AnnTypeDisplay_ForAll_ProjectSearchId.annTypeDisplay_Per_ProjectSearchId_Map_Key_ProjectSearchId = annTypeDisplay_Per_ProjectSearchId_Map_Key_ProjectSearchId;

    return local_AnnTypeDisplay_ForAll_ProjectSearchId;
}

///////////
///////////

///  Child Components

//   Per Type (PSM, Peptide) sections

/**
 *
 */
interface Internal__PerType_PSM_Peptide_Section__Component_Props {

    type_HeaderLabelText: string

    annTypeDisplay: Array<number>
    filterableAnnotationTypes: Map<number, AnnotationTypeItem>
    descriptiveAnnotationTypes: Map<number, AnnotationTypeItem>
    searchProgramsPerSearchItem_Map: Map<number, SearchProgramsPerSearchItem>

    callbackOn_DataChanged: () => void
}

/**
 *
 */
interface Internal__PerType_PSM_Peptide_Section__Component_State {

    _placeholder: any
}

/**
 *
 */
class Internal__PerType_PSM_Peptide_Protein__Section__Component extends React.Component< Internal__PerType_PSM_Peptide_Section__Component_Props, Internal__PerType_PSM_Peptide_Section__Component_State > {

    private _onDragEnd_CurrentDisplayItem_BindThis = this._onDragEnd_CurrentDisplayItem.bind(this);

    private _deleteAnnTypeId_BindThis = this._deleteAnnTypeId.bind(this);

    private _DO_NOT_CALL_BoundMethods_TypeTest() { // Function only to test that methods that are .bind(this) are correct function signature

        const _deleteAnnTypeId : AnnotationCurrentlyDisplayEntry_DeleteEntry_Callback = this._deleteAnnTypeId;
    }

    /**
     *
     */
    constructor(props: Internal__PerType_PSM_Peptide_Section__Component_Props) {
        super(props);

        this.state = {
            _placeholder: {}
        };
    }

    /**
     *
     */
    private _onDragEnd_CurrentDisplayItem( result: any ) {

        // dropped outside the list
        if ( ! result.destination ) {
            return;
        }

        const sourceIndex = result.source.index;
        const destinationIndex = result.destination.index;

        const annTypeIds = this.props.annTypeDisplay;

        const annTypeIdToMove = annTypeIds[ sourceIndex ];
        if ( annTypeIdToMove === undefined ) {
            return null; //  Index not in array so no changes
        }

        //  Remove Source Index

        const annTypeIds_BeforeSource = annTypeIds.slice( 0, sourceIndex );
        const annTypeIds_AfterSource = annTypeIds.slice( sourceIndex + 1 );
        const annTypeIds_SourceRemoved = annTypeIds_BeforeSource.concat( annTypeIds_AfterSource );

        let destinationIndex_InSourceRemovedArray = destinationIndex;

        if ( destinationIndex > sourceIndex ) {
            // destination index has shifted since removed element at sourceIndex from array
            destinationIndex_InSourceRemovedArray = destinationIndex_InSourceRemovedArray--;
        }

        //  Split annTypeIds_SourceRemoved at destinationIndex_InSourceRemovedArray

        let annTypeIds_BeforeDestination = annTypeIds_SourceRemoved.slice( 0, destinationIndex_InSourceRemovedArray );
        let annTypeIds_AtDestinationAndRest = annTypeIds_SourceRemoved.slice( destinationIndex_InSourceRemovedArray );

        //  Combine arrays for final

        const annTypeIdsNew = annTypeIds_BeforeDestination.concat( annTypeIdToMove, annTypeIds_AtDestinationAndRest );

        this.props.annTypeDisplay.length = 0;
        for ( const annTypeId of annTypeIdsNew ) {
            this.props.annTypeDisplay.push( annTypeId );
        }

        this.props.callbackOn_DataChanged();
    }

    /**
     *
     */
    private _deleteAnnTypeId(params: AnnotationCurrentlyDisplayEntry_DeleteEntry_Callback_Params ) {

        const annTypeIds = this.props.annTypeDisplay;

        const index = annTypeIds.indexOf( params.annotationTypeId );
        if ( index < 0 ) {
            //  Not Found
            return; // EARLY RETURN
        }

        //  Combine arrays for final

        //  Remove Source Index

        const annTypeIds_Before_Id = annTypeIds.slice( 0, index );
        const annTypeIds_After_Id = annTypeIds.slice( index + 1 );
        const annTypeIdsNew = annTypeIds_Before_Id.concat( annTypeIds_After_Id );

        this.props.annTypeDisplay.length = 0;
        for ( const annTypeId of annTypeIdsNew ) {
            this.props.annTypeDisplay.push( annTypeId );
        }
        this.props.callbackOn_DataChanged();
    }

    /**
     *
     */
    render() {

        const annTypeDisplay = this.props.annTypeDisplay;
        const searchProgramsPerSearchItem_Map = this.props.searchProgramsPerSearchItem_Map;
        const filterableAnnotationTypes_Map = this.props.filterableAnnotationTypes;
        const descriptiveAnnotationTypes_Map = this.props.descriptiveAnnotationTypes;

        if ( ( ( ! filterableAnnotationTypes_Map ) || ( filterableAnnotationTypes_Map.size === 0 ) )
            && ( ( ! descriptiveAnnotationTypes_Map ) || ( descriptiveAnnotationTypes_Map.size === 0 ) ) ) {

            //  No types to select from so do NOT display the block

            return null; //  EARLY RETURN
        }

        //  Separate into currently displayed and NOT currently displayed

        const annTypeIds_All = new Set<number>( filterableAnnotationTypes_Map.keys() );
        for ( const annotationTypeId of descriptiveAnnotationTypes_Map.keys() ) {
            annTypeIds_All.add( annotationTypeId );
        }

        //  Start with All and remove all currently displayed
        const annTypeIds_NOT_Displayed = new Set<number>( annTypeIds_All );
        for ( const annotationTypeId of annTypeDisplay ) {
            annTypeIds_NOT_Displayed.delete(annotationTypeId);
        }

        const annotationTypeItems_CurrentlyDisplayed : Array<AnnotationTypeItem> = [];

        for ( const annotationTypeId of annTypeDisplay ) {

            let annotationTypeItem = filterableAnnotationTypes_Map.get( annotationTypeId );
            if ( ! annotationTypeItem ) {
                annotationTypeItem = descriptiveAnnotationTypes_Map.get( annotationTypeId );
                if ( ! annotationTypeItem ) {
                    throw Error("Not found in Filterable or Descriptive. from annTypeDisplay: annotationTypeId: " + annotationTypeId );
                }
            }

            annotationTypeItems_CurrentlyDisplayed.push(annotationTypeItem);
        }

        const annotationTypeItems_NOT_Displayed : Array<AnnotationTypeItem> = [];

        for ( const annotationTypeId of annTypeIds_NOT_Displayed ) {

            let annotationTypeItem = filterableAnnotationTypes_Map.get( annotationTypeId );
            if ( ! annotationTypeItem ) {
                annotationTypeItem = descriptiveAnnotationTypes_Map.get( annotationTypeId );
                if ( ! annotationTypeItem ) {
                    throw Error("Not found in Filterable or Descriptive. from annTypeIds_NOT_Displayed: annotationTypeId: " + annotationTypeId );
                }
            }
            annotationTypeItems_NOT_Displayed.push( annotationTypeItem );
        }

        //  Sort NOT currently displayed on name then id
        annotationTypeItems_NOT_Displayed.sort( (a,b ) => {
            //  Order on ann type name
            const nameCompare = a.name.localeCompare( b.name );
            if ( nameCompare !== 0 ) {
                return nameCompare;
            }
            if ( a.annotationTypeId < b.annotationTypeId ) {
                return -1;
            }
            if ( a.annotationTypeId > b.annotationTypeId ) {
                return -1;
            }
            return 0;
        });

        const annotationTypeItems_Displayed_JSX: Array<JSX.Element> = [];
        const annotationTypeItems_NOT_Displayed_JSX: Array<JSX.Element> = [];

        //  JSX for Currently Displayed
        {
            let index = 0;
            for ( const annotationType of annotationTypeItems_CurrentlyDisplayed ) {

                const searchProgramsPerSearchItem = searchProgramsPerSearchItem_Map.get( annotationType.searchProgramsPerSearchId );
                if ( ! searchProgramsPerSearchItem ) {
                    throw Error( "( ! searchProgramsPerSearchItem )" );
                }

                const draggableId = annotationType.annotationTypeId.toString();
                const annotationTypeItem = (
                    <DraggableAnnotationCurrentlyDisplayEntry
                        key={ annotationType.annotationTypeId }
                        annotationTypeId={ annotationType.annotationTypeId }
                        name={ annotationType.name }
                        description={ annotationType.description }
                        programName={ searchProgramsPerSearchItem.name }
                        deleteEntryHandler={ this._deleteAnnTypeId_BindThis }
                        draggableId={ draggableId }
                        index={ index }
                    />
                );
                annotationTypeItems_Displayed_JSX.push( annotationTypeItem );
                index++;
            }
        }

        //  JSX for NOT Currently Displayed
        for ( const annotationType of annotationTypeItems_NOT_Displayed ) {

            const searchProgramsPerSearchItem = searchProgramsPerSearchItem_Map.get( annotationType.searchProgramsPerSearchId );
            if ( ! searchProgramsPerSearchItem ) {
                throw Error( "( ! searchProgramsPerSearchItem )" );
            }
            const display = (
                <div
                    key={ annotationType.annotationTypeId }
                    title={ annotationType.description }
                    className=" clickable on-hover-standard-background-color-medium on-over-standard-border-color-dark-1px-wide "
                    style={ { whiteSpace: "nowrap", overflowX: "hidden", textOverflow: "ellipsis", padding: 2 } }
                    onClick={ event => {
                        event.stopPropagation();
                        this.props.annTypeDisplay.push( annotationType.annotationTypeId );
                        this.props.callbackOn_DataChanged();
                    }}
                >
                    { annotationType.name } ({ searchProgramsPerSearchItem.name })
                </div>
            )
            annotationTypeItems_NOT_Displayed_JSX.push(display)
        }

        const both_columnLabels_ContainingStyle : React.CSSProperties = { marginBottom: 10 };

        const both_AnnotationTypeNames_Blocks_ContainingStyle : React.CSSProperties =
            { borderStyle: "solid", borderWidth: 1, padding: 6, minHeight: 30 };

        return (
            <div>

                {/*  Label at start for type (Peptide,e PSM)  */}
                <div style={ { fontSize: 18, fontWeight: "bold", textAlign: "center", marginTop: 10, marginBottom: 10 } }>
                    { this.props.type_HeaderLabelText }
                </div>


                <div style={ { display: "grid", gridTemplateColumns: "1fr 20px 1fr"} }>

                    {/*  3 Column Grid  */}

                    {/*  Labels above the Annotation Lists  */}

                    {/*  NOT Selected Annotation Types  */}
                    <div style={ both_columnLabels_ContainingStyle }>
                        <div >
                            Click on items to display
                        </div>
                    </div>

                    {/* Spacer */}
                    <div ></div>

                    {/*  Selected Annotation Types in order  */}
                    <div style={ both_columnLabels_ContainingStyle }>
                        { ( annotationTypeItems_Displayed_JSX && annotationTypeItems_Displayed_JSX.length > 0 ) ? (
                            <div >
                                <div>
                                    Drag the items to the order to display them in.
                                </div>
                                <div>
                                <span>
                                    Click the
                                </span>
                                    <span> </span>
                                    <img className=" icon-small " src="static/images/icon-circle-delete.png" />
                                    <span> </span>
                                    <span>
                                    to remove.
                                </span>
                                </div>
                            </div>
                        ) : (
                            <div >
                                <div>
                                    No items to display.
                                </div>
                                <div>
                                    Click an item on the left to display it.
                                </div>
                            </div>
                        )}
                    </div>

                    {/*  Annotation Lists  */}

                    {/*  NOT Selected Annotation Types  */}
                    <div >
                        <div className=" standard-border-color-gray " style={ both_AnnotationTypeNames_Blocks_ContainingStyle }>
                            <div style={ { display: "grid", gridTemplateColumns: " auto ", padding: 3 } }>
                                { annotationTypeItems_NOT_Displayed_JSX }
                            </div>
                        </div>
                    </div>

                    {/* Spacer */}
                    <div ></div>

                    {/*  Selected Annotation Types in order  */}
                    <div >
                        <div className=" standard-border-color-gray " style={ both_AnnotationTypeNames_Blocks_ContainingStyle }>

                            <DragDropContext onDragEnd={ this._onDragEnd_CurrentDisplayItem_BindThis }> { /* Having nested <DragDropContext />'s is not supported */ }

                                <Droppable droppableId="ConditionsInConditionGroupListMaint" type="CONDITIONS_IN_GROUP">
                                    {(provided, snapshot) => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            className="  experiment-maint-default-border-style "
                                            // experiment-maint-default-border-style: border: solid and color site grey
                                            // style={getListStyle(snapshot.isDraggingOver)}
                                            style={ { borderWidth: 2  } }
                                        >
                                            {  annotationTypeItems_Displayed_JSX }
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>


                        </div>
                    </div>

                </div>
            </div>
        );
    }
}


//////

interface AnnotationCurrentlyDisplayEntry_DeleteEntry_Callback_Params {
    annotationTypeId: number
}
type AnnotationCurrentlyDisplayEntry_DeleteEntry_Callback =
    ( params: AnnotationCurrentlyDisplayEntry_DeleteEntry_Callback_Params ) => void


interface DraggableAnnotationCurrentlyDisplayEntry_Props {

    annotationTypeId: number
    name: string
    description: string
    programName: string
    deleteEntryHandler: AnnotationCurrentlyDisplayEntry_DeleteEntry_Callback

    draggableId : string
    index : number
}



const get_AnnotationCurrentlyDisplayEntry_DraggableContents_OuterStyle = ( isDragging: any, draggableStyle: any ) => {

    //  Must use a function since need to add values in parameter 'draggableStyle' to result

    return {
        // userSelect: "none",
        // padding: conditionItemOuterPartsWidths.paddingWidth,

        // borderWidth: conditionItemOuterPartsWidths.borderWidth,

        //  In CSS class experiment-maint-default-border-style
        // borderStyle: "solid",
        // borderColor: "grey",

        // change background colour if dragging
        // background: isDragging ? "lightgreen" : "grey",

        // styles we need to apply on draggables (function parameter)
        ...draggableStyle
    }
};


const DraggableAnnotationCurrentlyDisplayEntry = (props : DraggableAnnotationCurrentlyDisplayEntry_Props) => {

    const draggableId = props.draggableId;
    const index = props.index;

    return (
        <Draggable key={ props.annotationTypeId } draggableId={ draggableId } index={index}>
            {(provided, snapshot) => (
                <div // onClick={ (event) => { console.log( "Whole Draggable clicked: index: " + conditionContainer.index )}}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className=" standard-border-color-gray "
                    style={ get_AnnotationCurrentlyDisplayEntry_DraggableContents_OuterStyle( snapshot.isDragging, provided.draggableProps.style ) }
                >
                    <AnnotationCurrentlyDisplayEntry_DraggableContents
                        annotationTypeId={ props.annotationTypeId }
                        name={ props.name }
                        description={ props.description }
                        programName={ props.programName }
                        arrayIndex={ props.index }
                        deleteEntryHandler={ props.deleteEntryHandler }
                    />
                </div>
            )}
        </Draggable>
    );
}

interface AnnotationCurrentlyDisplayEntry_DraggableContents_Props {

    annotationTypeId: number
    name: string
    description: string
    programName: string
    deleteEntryHandler: AnnotationCurrentlyDisplayEntry_DeleteEntry_Callback

    arrayIndex : number
}

interface AnnotationCurrentlyDisplayEntry_DraggableContents_State {

    _placeholder: any
}

/**
 *
 */
class AnnotationCurrentlyDisplayEntry_DraggableContents extends React.Component< AnnotationCurrentlyDisplayEntry_DraggableContents_Props, AnnotationCurrentlyDisplayEntry_DraggableContents_State > {

    private _deleteEntry_BindThis = this._deleteEntry.bind(this);

    private readonly _inputField_Ref :  React.RefObject<HTMLInputElement>

    /**
     *
     */
    constructor(props : AnnotationCurrentlyDisplayEntry_DraggableContents_Props) {
        super(props);

        this._inputField_Ref = React.createRef();

        this.state = {
            _placeholder: {}
        };
    }

    /**
     *
     */
    _deleteEntry( event: React.MouseEvent<HTMLElement, MouseEvent> ) {
        try {
            event.preventDefault();
            event.stopPropagation(); //  So no click triggered for whole item

            this.props.deleteEntryHandler({ annotationTypeId : this.props.annotationTypeId });

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    render() {

        return (
            <div
                style={ {
                    display: "grid", gridTemplateColumns: "min-content auto min-content",
                    borderStyle: "solid", borderWidth: 1,
                    paddingTop: 1, paddingBottom: 1, paddingLeft: 3, paddingRight: 3
                } }
                className=" standard-border-color-gray standard-background-color-medium"
            >

                <div style={ { marginLeft: 2, marginRight: 4, cursor: "move" } }>
                    <img className=" icon-small " src="static/images/icon-draggable.png"
                         title={ "Drag to change order of displayed data" } ></img> {/*  Replace with draggable icon */}
                </div>
                <div
                    style={ { whiteSpace: "nowrap", overflowX: "hidden", textOverflow: "ellipsis", cursor: "move" } }
                    title={ this.props.description }
                >
                    <span>{ this.props.name }</span>
                    <span> </span>
                    <span>(</span>
                    <span>{ this.props.programName }</span>
                    <span>)</span>
                </div>
                <div style={ { marginLeft: 5, cursor: "move" } }>
                    <img
                        onClick={ this._deleteEntry_BindThis }
                        className=" icon-small clickable " src="static/images/icon-circle-delete.png"
                        title={ "Remove item from display" }
                    />
                </div>
            </div>
        );
    }

}