/**
 * searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__SearchFile_Name__Change_Overlay.tsx
 *
 * React Component
 *
 * Search Details Block for Logged In Users
 */


import React from 'react'
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
import { webserviceCallStandardPost } from "page_js/webservice_call_common/webserviceCallStandardPost";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";


///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

//   Change "Search File Name"


export interface SearchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__SearchFile_Name__Change__Component_Change_Callback_Params {
    newSearchFileName: string
}

export type SearchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__SearchFile_Name__Change__Component_Change_Callback =
    (params: SearchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__SearchFile_Name__Change__Component_Change_Callback_Params) => void

export class SearchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__SearchFile_Name__Change__OpenOverlay__FunctionParams {
    projectSearchId: number
    projectSearchFileId : number
    existingSearchFileName: string
    position_top: number
    position_left: number
    change_Callback: SearchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__SearchFile_Name__Change__Component_Change_Callback
    cancel_Callback: () => void
}

export type SearchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__SearchFile_Name__Change__OpenOverlay__FunctionType =
    ( params : SearchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__SearchFile_Name__Change__OpenOverlay__FunctionParams ) => void

/**
 *
 * @param params
 */
export const searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__SearchFile_Name__Change__OpenOverlay = function(
    params: SearchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__SearchFile_Name__Change__OpenOverlay__FunctionParams
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

    let searchFileName_InputField_Width = 550;

    if ( window_innerWidth < ( params.position_left + width_OtherThan_searchName_InputField + searchFileName_InputField_Width + 30 ) ) {  //  + 20 to allow margins and vertical scroll bar

        params.position_left = 10;
        searchFileName_InputField_Width = window_innerWidth - ( ( params.position_left * 2 ) + width_OtherThan_searchName_InputField )
    }


    let addedOverlay : Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF;

    const change_Callback_Local = ( params_To_change_Callback_Local : SearchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__SearchFile_Name__Change__Component_Change_Callback_Params ) => {

        addedOverlay.removeContents_AndContainer_FromDOM();

        params.change_Callback(params_To_change_Callback_Local);
    }

    const cancel_Callback_Local = () => {

        addedOverlay.removeContents_AndContainer_FromDOM();

        if ( params.cancel_Callback ) {
            params.cancel_Callback()
        }
    }

    const componentToAdd = (
        <SearchName_and_SearchShortName_Change_Component
            { ...params }
            change_Callback={ change_Callback_Local }
            cancel_Callback={ cancel_Callback_Local }
            searchFileName_InputField_Width={ searchFileName_InputField_Width }
        />
    );

    addedOverlay = limelight_add_ReactComponent_JSX_Element_To_DocumentBody({ componentToAdd });
}


///////

/**
 *
 */
class SearchName_and_SearchShortName_Change_Component_Props extends SearchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__SearchFile_Name__Change__OpenOverlay__FunctionParams {

    searchFileName_InputField_Width: number

}

/**
 *
 */
interface SearchName_and_SearchShortName_Change_Component_State {

    force_Rerender_Object?: object

}


/**
 *
 */
class SearchName_and_SearchShortName_Change_Component extends React.Component< SearchName_and_SearchShortName_Change_Component_Props, SearchName_and_SearchShortName_Change_Component_State > {

    private _searchFileName_Input_Changed_BindThis = this._searchFileName_Input_Changed.bind(this);
    private _formSubmit_BindThis = this._formSubmit.bind(this);

    private _searchFileName_Input_Ref : React.RefObject<HTMLInputElement>; //  React.createRef()

    private _show_SavingMessage: boolean = false

    private _cancelButton_Clicked = false

    private _searchFileName_FromServer: string

    private _searchFileName_InvalidValue: boolean = false

    /**
     *
     */
    constructor(props: SearchName_and_SearchShortName_Change_Component_Props) {
        super(props)

        this._searchFileName_Input_Ref = React.createRef<HTMLInputElement>();

        this._searchFileName_FromServer = props.existingSearchFileName;

        this.state = {
            force_Rerender_Object: {}
        }
    }

    /**
     *
     */
    private _get_InputFields_AndValidate() : {
        searchFileNameValue: string
        isValid: boolean
    } {
        this._searchFileName_InvalidValue = false; //  reset

        const searchFileName_Value = this._searchFileName_Input_Ref.current.value.trim();

        if ( searchFileName_Value.length === 0 ) {

            this._searchFileName_InvalidValue = true;
        }

        if ( this._searchFileName_InvalidValue ) {
            return { isValid: false, searchFileNameValue: null };  // EARLY EXIT
        }

        return { isValid: true, searchFileNameValue: searchFileName_Value }
    }

    /**
     *
     */
    private _searchFileName_Input_Changed() {

        this._get_InputFields_AndValidate();

        this.setState({ force_Rerender_Object: {} });
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
                searchFileNameValue,
                isValid
            } = this._get_InputFields_AndValidate();

            if ( ! isValid ) {

                this.setState({ force_Rerender_Object: {} });

                return;  // EARLY EXIT
            }

            this._show_SavingMessage = true

            this.setState({ force_Rerender_Object: {} });

            var requestData = {
                filename : searchFileNameValue,
                searchFileProjectSearchId: this.props.projectSearchFileId,
                projectSearchId: this.props.projectSearchId
            };

            const url = "d/rws/for-page/update-search-filename"

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url, dataRetrieval_CanRetry: false }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( () => { }  );

            promise_webserviceCallStandardPost.then( ({ responseData }) => {
                try {
                    if ( responseData.status ) {

                        this.props.change_Callback({ newSearchFileName: searchFileNameValue });

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
        if ( this._searchFileName_InvalidValue ) {
            saveButton_Disabled = true;
        }

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
                                        File Name:&nbsp;&nbsp;
                                    </span>
                                </div>
                                <div style={ { marginBottom: 5 } }>
                                    <span>
                                        <input type="text"
                                               style={ { width: this.props.searchFileName_InputField_Width } }
                                               autoFocus={ true }
                                               // maxLength={  }
                                               ref={ this._searchFileName_Input_Ref }
                                               defaultValue={ this._searchFileName_FromServer }
                                               onChange={ this._searchFileName_Input_Changed_BindThis }
                                        />
                                    </span>
                                    { (this._searchFileName_InvalidValue ) ? (
                                        <span style={ { marginLeft: 20, color: "red", whiteSpace: "nowrap" } }>
                                            File Name is invalid.
                                        </span>
                                    ) : null }
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
                                                    Enter a file name to enable 'Save'
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

                            { this._show_SavingMessage ? (

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

////////////////////////////

