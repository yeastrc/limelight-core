/**
 * searchName_and_SearchShortName_Change_Component_and_WebserviceCall.tsx
 *
 * Javascript React Component
 *
 * Search Name and Search Short Name Change Component
 *
 */

import React from "react";
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {SearchName_SearchShortName_Max_FieldLengths_Constants} from "page_js/constants_across_webapp/search_name_search_short_name/searchName_SearchShortName_Max_FieldLengths_Constants";
import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";

///////

export interface SearchName_and_SearchShortName_Change_Component_Change_Callback_Params {
    newSearchName: string
    newSearchShortName: string
}

export type SearchName_and_SearchShortName_Change_Component_Change_Callback =
    (params: SearchName_and_SearchShortName_Change_Component_Change_Callback_Params) => void

export interface SearchName_and_SearchShortName_Change_Component__openOverlay__FunctionParams {
    projectSearchId: number
    existingSearchName: string
    existingSearchShortName: string
    position_top: number
    position_left: number
    change_Callback: SearchName_and_SearchShortName_Change_Component_Change_Callback
    cancel_Callback: () => void
}

export type SearchName_and_SearchShortName_Change_Component__openOverlay__FunctionType =
    ( params : SearchName_and_SearchShortName_Change_Component__openOverlay__FunctionParams ) => void

/**
 *
 */
export const searchName_and_SearchShortName_Change_Component__openOverlay: SearchName_and_SearchShortName_Change_Component__openOverlay__FunctionType = function (
    params: SearchName_and_SearchShortName_Change_Component__openOverlay__FunctionParams
) : void {

    if ( params.position_top > window.innerHeight - 160 ) {
        params.position_top = window.innerHeight - 160;
    }
    if ( params.position_top < 10 ) {
        params.position_top = 10;
    }

    if ( params.position_left < 10 ) {
        params.position_left = 10;
    }
    if ( params.position_left > 100 ) {
        params.position_left = 100;
    }

    const window_innerWidth = window.innerWidth - 10; // Subtract 10 for vertical scroll bar

    const width_OtherThan_searchName_InputField = 150;

    let searchName_InputField_Width = 550;

    if ( window_innerWidth < ( params.position_left + width_OtherThan_searchName_InputField + searchName_InputField_Width + 30 ) ) {  //  + 20 to allow margins and vertical scroll bar

        params.position_left = 10;
        searchName_InputField_Width = window_innerWidth - ( ( params.position_left * 2 ) + width_OtherThan_searchName_InputField )
    }


    let addedOverlay : Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF;

    const change_Callback_Local = ( params_To_change_Callback_Local : SearchName_and_SearchShortName_Change_Component_Change_Callback_Params ) => {

        const newSearchName: string = params_To_change_Callback_Local.newSearchName;
        const newSearchShortName: string = params_To_change_Callback_Local.newSearchShortName;

        addedOverlay.removeContents_AndContainer_FromDOM();

        params.change_Callback({ newSearchName, newSearchShortName });
    }

    const cancel_Callback_Local = () => {

        addedOverlay.removeContents_AndContainer_FromDOM();

        if ( params.cancel_Callback ) {
            params.cancel_Callback()
        }
    }

    const componentToAdd = (
        <SearchName_and_SearchShortName_Change_Component
            projectSearchId={ params.projectSearchId }
            existingSearchName={ params.existingSearchName }
            existingSearchShortName={ params.existingSearchShortName }
            position_top={ params.position_top }
            position_left={ params.position_left }
            searchName_InputField_Width={ searchName_InputField_Width }
            change_Callback={ change_Callback_Local }
            cancel_Callback={ cancel_Callback_Local }
        />
    );

    addedOverlay = limelight_add_ReactComponent_JSX_Element_To_DocumentBody({ componentToAdd });
}

///////

/**
 *
 */
interface SearchName_and_SearchShortName_Change_Component_Props {

    projectSearchId: number
    existingSearchName: string
    existingSearchShortName: string

    position_top: number
    position_left: number
    searchName_InputField_Width: number

    change_Callback: SearchName_and_SearchShortName_Change_Component_Change_Callback
    cancel_Callback: () => void
}

/**
 *
 */
interface SearchName_and_SearchShortName_Change_Component_State {

    searchName_InProgress? : string
    searchName_InvalidValue?: boolean

    searchShortName_InProgress? : string
    searchShortName_InvalidValue?: boolean

    show_SavingMessage?: boolean
}

/**
 *
 */
class SearchName_and_SearchShortName_Change_Component extends React.Component< SearchName_and_SearchShortName_Change_Component_Props, SearchName_and_SearchShortName_Change_Component_State > {

    private _searchName_Description_Input_Changed_BindThis = this._searchName_Description_Input_Changed.bind(this);
    private _formSubmit_BindThis = this._formSubmit.bind(this);

    private _searchName_Input_Ref : React.RefObject<HTMLInputElement>; //  React.createRef()
    private _searchShortName_Input_Ref : React.RefObject<HTMLInputElement>; //  React.createRef()

    private _searchName_FromServer : string;
    private _searchShortName_FromServer : string;

    private _searchName_InvalidValue : boolean = false;
    private _searchShortName_InvalidValue : boolean = false;

    private _cancelButton_Clicked = false

    /**
     *
     */
    constructor(props: SearchName_and_SearchShortName_Change_Component_Props) {
        super(props)

        this._searchName_Input_Ref = React.createRef<HTMLInputElement>();
        this._searchShortName_Input_Ref = React.createRef<HTMLInputElement>();

        this._searchName_FromServer = props.existingSearchName;
        this._searchShortName_FromServer = props.existingSearchShortName;

        this.state = {
            searchName_InProgress: props.existingSearchName,
            searchShortName_InProgress: props.existingSearchShortName
        }
    }

    /**
     *
     */
    // componentDidMount() {
    //
    // }

    /**
     *
     */
    private _get_Label_Description_InputFields_AndValidate() : {
        searchNameValue: string
        searchShortNameValue: string
        isValid: boolean
    } {
        this._searchName_InvalidValue = false; //  reset

        const searchName_Value = this._searchName_Input_Ref.current.value.trim();

        // if ( searchName_Value.length === 0 ) {
        //
        //     this.setState({ searchName_InvalidValue: true });
        //     this._searchName_InvalidValue = true;
        //
        // } else {
        //
        //     this.setState({searchName_InvalidValue: false});
        // }

        const searchShortName_Value = this._searchShortName_Input_Ref.current.value.trim();

        // if ( searchShortName_Value.length === 0 ) {
        //
        //     this.setState({ searchShortName_InvalidValue: true });
        //     this._searchShortName_InvalidValue = true;
        //
        // } else {
        //
        //     this.setState({searchShortName_InvalidValue: false});
        // }


        if ( this._searchName_InvalidValue || this._searchShortName_InvalidValue ) {
            return {isValid: false, searchNameValue: null, searchShortNameValue: null};  // EARLY EXIT
        }

        return { isValid: true, searchNameValue: searchName_Value, searchShortNameValue: searchShortName_Value }
    }

    /**
     *
     */
    private _searchName_Description_Input_Changed(event: React.ChangeEvent<HTMLInputElement>) : void {

        const  {
            searchNameValue,
            searchShortNameValue,
            isValid
        } = this._get_Label_Description_InputFields_AndValidate();
    }

    /**
     *
     */
    private _formSubmit(event: React.FormEvent<HTMLFormElement>) : void {
        try {
            event.preventDefault();

            if ( this._cancelButton_Clicked ) {
                //  User clicked "Cancel" button
                return; // EARLY RETURN
            }

            const  {
                searchNameValue,
                searchShortNameValue,
                isValid
            } = this._get_Label_Description_InputFields_AndValidate();

            if ( ! isValid ) {
                return;  // EARLY EXIT
            }

            this.setState({ show_SavingMessage: true });

            var requestData = {
                searchName : searchNameValue,
                searchShortName: searchShortNameValue,
                projectSearchId: this.props.projectSearchId
            };

            const url = "d/rws/for-page/search-name-search-short-name-update";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url, dataRetrieval_CanRetry: false }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( () => { }  );

            promise_webserviceCallStandardPost.then( ({ responseData }) => {
                try {
                    if ( responseData.status ) {

                        this.props.change_Callback({newSearchName: searchNameValue, newSearchShortName: searchShortNameValue });

                        return;  // EARLY RETURN
                    }

                    throw Error("status property Not true NOT handled")

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    render() {

        let saveButton_Disabled = false;

        // let saveButton_Disabled = false;
        // if (this.state.searchName_InvalidValue || this.state.searchName_InProgress === "") {
        //     saveButton_Disabled = true;
        // }

        return (

            <div >
                <div style={ { zIndex: 700 } } className=" modal-dialog-small-positioned-near-related-content-background ">

                </div>
                <div style={ { zIndex: 710, position: "fixed", top: this.props.position_top, left: this.props.position_left }}
                     className=" modal-dialog-small-positioned-near-related-content-container "
                >
                    <div style={ { padding: 20, position: "relative" } }>

                        <form
                            onSubmit={ this._formSubmit_BindThis }
                        >
                            <div style={ { display: "grid", gridTemplateColumns: "min-content min-content" } }>
                                {/*  2 Column Grid */}
                                <div style={ { whiteSpace: "nowrap" } }>
                                    <span>
                                        Search Name:&nbsp;&nbsp;
                                    </span>
                                </div>
                                <div style={ { marginBottom: 5 } }>
                                    <span>
                                        <input type="text"
                                               style={ { width: this.props.searchName_InputField_Width } }
                                               maxLength={ SearchName_SearchShortName_Max_FieldLengths_Constants.SEARCH_NAME_MAX_LENGTH }
                                               ref={ this._searchName_Input_Ref }
                                               defaultValue={ ( this.state.searchName_InProgress ) ?  this.state.searchName_InProgress : "" }
                                               onChange={ this._searchName_Description_Input_Changed_BindThis }
                                        />
                                    </span>
                                    { (this.state.searchName_InvalidValue ) ? (
                                        <span style={ { marginLeft: 20, color: "red", whiteSpace: "nowrap" } }>
                                            Search Name is invalid.
                                        </span>
                                    ) : null }
                                </div>

                                <div>
                                    <span>
                                        Short Name:&nbsp;&nbsp;
                                    </span>
                                </div>
                                <div>
                                    <div>
                                        <span>
                                            <input type="text"
                                                   style={ { width: 120 } }
                                                   maxLength={ SearchName_SearchShortName_Max_FieldLengths_Constants.SEARCH_SHORT_NAME_MAX_LENGTH }
                                                   ref={ this._searchShortName_Input_Ref }
                                                   defaultValue={ ( this.state.searchShortName_InProgress ) ?  this.state.searchShortName_InProgress : "" }
                                                   onChange={ this._searchName_Description_Input_Changed_BindThis }
                                            />
                                        </span>
                                        { (this.state.searchShortName_InvalidValue ) ? (
                                            <span style={ { marginLeft: 20, color: "red", whiteSpace: "nowrap" } }>
                                            Search Short Name is invalid.
                                        </span>
                                        ) : null }
                                    </div>
                                    <div>
                                        Short label to display when space is limited.
                                    </div>
                                </div>
                            </div>

                            <div style={ { marginTop: 5 }}>
                                <div style={ { position: "relative", display: "inline-block" } }>
                                    <button type="submit"
                                            disabled={ saveButton_Disabled }
                                    >
                                        Save
                                    </button>
                                    { ( saveButton_Disabled ) ? (
                                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                            title={
                                                <span>
                                                    Enter a label to enable 'Save'
                                                </span>
                                            }
                                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                        >
                                            <div
                                                style={ { position: "absolute", left: 0, top: 0, right: 0, bottom: 0 } }
                                            >
                                            </div>
                                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                    ) : null }
                                </div>
                                <span > </span>
                                <button
                                    onClick={ ( event) => {
                                        this._cancelButton_Clicked = true;
                                        event.preventDefault();  // Stop form.onsubmit code from running
                                        event.stopPropagation()
                                        this.props.cancel_Callback()
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>

                            {/* Cover Div while updating server */}

                            { this.state.show_SavingMessage ? (

                                <div style={
                                    {
                                        position: "absolute", top: 0, left: 0, right: 0, bottom: 0 ,
                                        backgroundColor: "white", textAlign: "center", paddingTop: 50, fontSize: 24
                                    }
                                } >
                                    Saving Data
                                </div>
                            ) : null }

                        </form>

                    </div>

                </div>
            </div>

        )
    }
}
