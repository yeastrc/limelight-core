/**
 * searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__WebLink__Add_Overlay.tsx
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


//   Add "WebLink Text"


export interface SearchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__WebLink__Add__Component_Change_Callback_Params {
    new_WebLinkText: string
}

export type SearchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__WebLink__Add__Component_Change_Callback =
    (params: SearchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__WebLink__Add__Component_Change_Callback_Params) => void

export class SearchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__WebLink__Add__OpenOverlay__FunctionParams {
    projectSearchId: number
    position_top: number
    position_left: number
    change_Callback: SearchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__WebLink__Add__Component_Change_Callback
    cancel_Callback: () => void
}

export type SearchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__WebLink__Add__OpenOverlay__FunctionType =
    ( params : SearchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__WebLink__Add__OpenOverlay__FunctionParams ) => void

/**
 *
 * @param params
 */
export const searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__WebLink__Add__OpenOverlay = function(
    params: SearchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__WebLink__Add__OpenOverlay__FunctionParams
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

    let webLinkText_InputField_Width = 550;

    if ( window_innerWidth < ( params.position_left + width_OtherThan_searchName_InputField + webLinkText_InputField_Width + 30 ) ) {  //  + 20 to allow margins and vertical scroll bar

        params.position_left = 10;
        webLinkText_InputField_Width = window_innerWidth - ( ( params.position_left * 2 ) + width_OtherThan_searchName_InputField )
    }


    let addedOverlay : Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF;

    const change_Callback_Local = ( params_To_change_Callback_Local : SearchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__WebLink__Add__Component_Change_Callback_Params ) => {

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
            webLinkText_InputField_Width={ webLinkText_InputField_Width }
        />
    );

    addedOverlay = limelight_add_ReactComponent_JSX_Element_To_DocumentBody({ componentToAdd });
}


///////

/**
 *
 */
class SearchName_and_SearchShortName_Change_Component_Props extends SearchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__WebLink__Add__OpenOverlay__FunctionParams {

    webLinkText_InputField_Width: number

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

    private _webLink_URL_Or_Label_Input_Changed_BindThis = this._webLink_URL_Or_Label_Input_Changed.bind(this);
    private _formSubmit_BindThis = this._formSubmit.bind(this);

    private _webLink_URL_Input_Ref : React.RefObject<HTMLInputElement>; //  React.createRef()
    private _webLink_Label_Input_Ref : React.RefObject<HTMLInputElement>; //  React.createRef()

    private _show_SavingMessage: boolean = false

    private _cancelButton_Clicked = false

    private _addButton_Disabled = true

    private _webLink_URL_InvalidValue: boolean = false
    private _webLink_Label_InvalidValue: boolean = false

    /**
     *
     */
    constructor(props: SearchName_and_SearchShortName_Change_Component_Props) {
        super(props)

        this._webLink_URL_Input_Ref = React.createRef<HTMLInputElement>();
        this._webLink_Label_Input_Ref = React.createRef<HTMLInputElement>();

        this.state = {
            force_Rerender_Object: {}
        }
    }

    /**
     *
     */
    private _get_InputFields_AndValidate() : {
        webLink_URL_Value: string
        webLink_Label_Value: string
        isValid: boolean
    } {
        this._webLink_URL_InvalidValue = false; //  reset
        this._webLink_Label_InvalidValue = false; //  reset

        const webLink_URL_Value = this._webLink_URL_Input_Ref.current.value.trim();
        if ( webLink_URL_Value.length > 0 && ( ! this._weblinks_validateURL( webLink_URL_Value ) ) ) {
            this._webLink_URL_InvalidValue = true;
        }

        const webLink_Label_Value = this._webLink_Label_Input_Ref.current.value.trim();

        if ( this._webLink_URL_InvalidValue
            || this._webLink_Label_InvalidValue
            || webLink_URL_Value.length === 0
            || webLink_Label_Value.length === 0 ) {

            this._addButton_Disabled = true

            this.setState({ force_Rerender_Object: {} })

            return { isValid: false, webLink_URL_Value: null, webLink_Label_Value: null };  // EARLY EXIT
        }

        this.setState({ force_Rerender_Object: {} })

        this._addButton_Disabled = false

        return { isValid: true, webLink_URL_Value, webLink_Label_Value }
    }

    /**
     *
     * @param textval
     * @private
     */
    private _weblinks_validateURL(textval : string) {
        const urlregex = new RegExp(
            "^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$");
        return urlregex.test(textval);
    }

    /**
     *
     */
    private _webLink_URL_Or_Label_Input_Changed() {

        this._get_InputFields_AndValidate();
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
                webLink_URL_Value,
                webLink_Label_Value,
                isValid
            } = this._get_InputFields_AndValidate();

            if ( ! isValid ) {
                return;  // EARLY EXIT
            }

            this._show_SavingMessage = true

            this.setState({ force_Rerender_Object: {} });

            var requestData = {
                weblinkURL : webLink_URL_Value,
                weblinkLabel: webLink_Label_Value,
                projectSearchId: this.props.projectSearchId
            };

            const url = "d/rws/for-page/insert-web-link"

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url, dataRetrieval_CanRetry: false }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( () => { }  );

            promise_webserviceCallStandardPost.then( ({ responseData }) => {
                try {
                    if ( responseData.status ) {

                        const insertedId : number = responseData.insertedId;

                        this.props.change_Callback({ new_WebLinkText: webLink_URL_Value });

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

                                {/*  Row 1 --  URL  */}
                                <div style={ { whiteSpace: "nowrap" } }>
                                    <span>
                                        URL:&nbsp;&nbsp;
                                    </span>
                                </div>
                                <div style={ { marginBottom: 5, whiteSpace: "nowrap" } }>
                                    <span>
                                        <input
                                            type="text"
                                            style={ { width: this.props.webLinkText_InputField_Width } }
                                            // maxLength={  }
                                            ref={ this._webLink_URL_Input_Ref }
                                            defaultValue={ "" }
                                            autoFocus={ true }
                                            onChange={ this._webLink_URL_Or_Label_Input_Changed_BindThis }
                                        />
                                    </span>
                                    { (this._webLink_URL_InvalidValue ) ? (
                                        <span style={ { marginLeft: 20, color: "red", whiteSpace: "nowrap" } }>
                                            URL is invalid.
                                        </span>
                                    ) : null }
                                </div>

                                {/*  Row 2 --  Label  */}
                                <div style={ { whiteSpace: "nowrap" } }>
                                    <span>
                                        Label:&nbsp;&nbsp;
                                    </span>
                                </div>
                                <div style={ { marginBottom: 5, whiteSpace: "nowrap" } }>
                                    <span>
                                        <input
                                            type="text"
                                            style={ { width: this.props.webLinkText_InputField_Width } }
                                            // maxLength={  }
                                            ref={ this._webLink_Label_Input_Ref }
                                            defaultValue={ "" }
                                            onChange={ this._webLink_URL_Or_Label_Input_Changed_BindThis }
                                        />
                                    </span>
                                    { (this._webLink_Label_InvalidValue ) ? (
                                        <span style={ { marginLeft: 20, color: "red", whiteSpace: "nowrap" } }>
                                            Label is invalid.
                                        </span>
                                    ) : null }
                                </div>
                            </div>

                            <div style={ { marginTop: 5 }}>
                                <div style={ { position: "relative", display: "inline-block" } }>
                                    <button type="submit"
                                            disabled={ this._addButton_Disabled }
                                    >
                                        Add URL for a RAW file
                                    </button>
                                    { ( this._addButton_Disabled ) ? (
                                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                            title={
                                                <span>
                                                    Enter a valid URL and a Label to enable 'Add URL for a RAW file'
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

