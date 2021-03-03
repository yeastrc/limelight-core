/**
 * dataTable_TableRoot_React_Table_PageNavigation.tsx
 *
 * Table: Navigate between Pages:
 *
 *      Click on icon for first, previous, next, last page
 *      Click on a page number
 *      Enter a page number and click "Go to page" button
 *
 */
import React from 'react'
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {DataTable_INTERNAL_RootTableDataObject} from "page_js/data_pages/data_table_react/dataTable_React_INTERNAL_DataObjects";


const pageNavigation_GoToPage_Button_Text = "Go to page";
const pageNavigation_GoToPage_Button_Disabled_Message__Empty_Field = "Enter a page number to go to before clicking '" + pageNavigation_GoToPage_Button_Text + "'";
const pageNavigation_GoToPage_Button_Disabled_Message__NotANumber = "Enter an Integer for the page number to go to before clicking '" + pageNavigation_GoToPage_Button_Text + "'";


export type DataTable_TableRoot_React_Table_PageNavigation_Component__InputField_NewValueEntered_Callback = (newValue : number ) => void;

/**
 *
 */
export interface DataTable_TableRoot_React_Table_PageNavigation_Component_Props {

    pageNavigation_SelectValue_Prop : number
    pageNavigation_TotalPagesCount: number // Number of pages
    tableDataObject_INTERNAL : DataTable_INTERNAL_RootTableDataObject
    pageNavigation_NewValueEntered_Callback : DataTable_TableRoot_React_Table_PageNavigation_Component__InputField_NewValueEntered_Callback
}

/**
 *
 */
interface DataTable_TableRoot_React_Table_PageNavigation_Component_State {

    pageNavigation_InputField_Value? : string
    pageNavigation_InputField_Value_NotEmpty_NotANumber? : boolean
    pageNavigation_GoToPage_Button_Disabled_Message? : string
    show_pageSelectionOverlay? : boolean
}

/**
 *
 */
export class DataTable_TableRoot_React_Table_PageNavigation_Component extends React.Component< DataTable_TableRoot_React_Table_PageNavigation_Component_Props, DataTable_TableRoot_React_Table_PageNavigation_Component_State > {

    private _inputFieldChanged_PageNumber_BindThis = this._inputFieldChanged_PageNumber.bind(this);
    private _inputField_PageNumber_OnFocus_BindThis = this._inputField_PageNumber_OnFocus.bind(this);
    private _inputField_PageNumber_OnBlur_BindThis = this._inputField_PageNumber_OnBlur.bind(this);
    private _goToPage_InputField_Form_Submitted_BindThis = this._goToPage_InputField_Form_Submitted.bind(this);

    private readonly _inputField_PageNumber_Ref: React.RefObject<HTMLInputElement>

    /**
     *
     */
    constructor(props : DataTable_TableRoot_React_Table_PageNavigation_Component_Props) {
        super(props);

        this._inputField_PageNumber_Ref = React.createRef();

        this.state = {
            pageNavigation_InputField_Value : "", // initial value
            pageNavigation_GoToPage_Button_Disabled_Message: pageNavigation_GoToPage_Button_Disabled_Message__Empty_Field
        };
    }

    /**
     * Must be Static, called by React
     * Called before
     *   Initial render: 'render()'
     *   Rerender : 'shouldComponentUpdate()'
     *
     * Return new state (like return from setState(callback)) or null
     */
    // static getDerivedStateFromProps(props : DataTable_TableRoot_React_Table_PageNavigation_Component_Props, state : DataTable_TableRoot_React_Table_PageNavigation_Component_State ) : DataTable_TableRoot_React_Table_PageNavigation_Component_State {
    //
    //     // if (
    //     //     props.pageNavigation_SelectValue_Prop !== state.pageNavigation_SelectValue_Prop_FromProps
    //     // ) {
    //     //
    //     //     return {
    //     //         pageNavigation_SelectValue_CurrentLocal: props.pageNavigation_SelectValue_Prop,
    //     //         pageNavigation_SelectValue_Prop_FromProps: props.pageNavigation_SelectValue_Prop
    //     //     };
    //     // }
    //
    //     return null;
    // }

    /**
     *
     * @param newValue
     */
    private _change_PageNumber( newValue : number ) : void {
        try {
            let newValue_Local = newValue;
            if ( newValue_Local < 1 ) {
                newValue_Local = 1;
            }
            if ( newValue_Local > this.props.pageNavigation_TotalPagesCount ) {
                newValue_Local = this.props.pageNavigation_TotalPagesCount;
            }
            if ( newValue_Local === this.props.pageNavigation_SelectValue_Prop ) {
                // Value not changed
                return;  // EARLY RETURN
            }

            this.props.pageNavigation_NewValueEntered_Callback( newValue_Local );

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     * @param event
     */
    private _inputFieldChanged_PageNumber( event: React.ChangeEvent<HTMLInputElement> ) {
        try {
            const pageNumber_InputValue_String = this._inputField_PageNumber_Ref.current.value;
            if ( pageNumber_InputValue_String === undefined || pageNumber_InputValue_String === null ) {
                const msg = "_inputFieldChanged_PageNumber: ( pageNumber_InputValue_String === undefined || pageNumber_InputValue_String === null )";
                console.warn( msg );
                throw Error( msg );
            }

            this.setState({ pageNavigation_InputField_Value: pageNumber_InputValue_String });

            const pageNumber_InputValue_String_Trimmed = pageNumber_InputValue_String.trim();

            if ( pageNumber_InputValue_String_Trimmed === "" ) {
                //  NO input so clear error message

                this.setState({
                    pageNavigation_InputField_Value_NotEmpty_NotANumber: false,
                    pageNavigation_GoToPage_Button_Disabled_Message: pageNavigation_GoToPage_Button_Disabled_Message__Empty_Field
                });

                return; // EARLY RETURN
            }

            const pageNumber_InputValue = Number.parseInt( pageNumber_InputValue_String_Trimmed );

            if ( Number.isNaN( pageNumber_InputValue ) ) {
                this.setState({
                    pageNavigation_InputField_Value_NotEmpty_NotANumber: true,
                    pageNavigation_GoToPage_Button_Disabled_Message: pageNavigation_GoToPage_Button_Disabled_Message__NotANumber
                });

                return; // EARLY RETURN
            }

            this.setState({
                pageNavigation_InputField_Value_NotEmpty_NotANumber: false,
                pageNavigation_GoToPage_Button_Disabled_Message: null
            });

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     * @param event
     */
    private _inputField_PageNumber_OnFocus( event: React.FocusEvent<HTMLInputElement> ) {
        try {

            this.setState({ show_pageSelectionOverlay : true });

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     * @param event
     */
    private _inputField_PageNumber_OnBlur( event: React.FocusEvent<HTMLInputElement> ) {
        try {
            window.setTimeout( () => {
                try {
                    this.setState({ show_pageSelectionOverlay : false });

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }, 150 );

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     * @param event
     */
    private _goToPage_InputField_Form_Submitted( event: React.FormEvent<HTMLFormElement> ) {
        try {
            event.preventDefault();  // REQUIRED

            //  !!!  WARNING.  Form will submit if button is disabled

            const pageNumber_InputValue_String = this._inputField_PageNumber_Ref.current.value;
            if ( pageNumber_InputValue_String === undefined || pageNumber_InputValue_String === null ) {
                const msg = "_goToPage_InputField_Form_Submitted: ( pageNumber_InputValue_String === undefined || pageNumber_InputValue_String === null )";
                console.warn( msg );
                throw Error( msg );
            }

            const pageNumber_InputValue_String_Trimmed = pageNumber_InputValue_String.trim();

            if ( pageNumber_InputValue_String_Trimmed === "" ) {
                //  NO input so return
                return; // EARLY RETURN
            }

            const pageNumber_InputValue = Number.parseInt( pageNumber_InputValue_String_Trimmed );

            if ( Number.isNaN( pageNumber_InputValue ) ) {
                //  Not a number so return
                return; // EARLY RETURN
            }

            // reset to empty string
            this.setState({
                pageNavigation_InputField_Value: "",
                pageNavigation_InputField_Value_NotEmpty_NotANumber: false,
                pageNavigation_GoToPage_Button_Disabled_Message: null
            });

            this._change_PageNumber( pageNumber_InputValue );

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    render() {

        const svgImage_Width = 14;

        const pageNumber_InputField_Style : React.CSSProperties =  { width: 30 };

        if ( this.state.pageNavigation_InputField_Value_NotEmpty_NotANumber ) {
            //  Invalid Input value so set background color
            pageNumber_InputField_Style.backgroundColor = "pink";
        }

        const pageNumber_List_Length_Input = 7;  // MUST be Odd

        const pageNumber_List_Length_Default = 7;

        let pageNumber_List_Length = pageNumber_List_Length_Input;
        if ( ! pageNumber_List_Length ) {
            pageNumber_List_Length = pageNumber_List_Length_Default;
        }

        const pageNumber_List_Length_Min_3 = Math.max( 3, pageNumber_List_Length ); // At Least 3;

        const pageNumber_List_Length_Odd = Math.floor( pageNumber_List_Length_Min_3 / 2 ) * 2 + 1; //  Make Odd if not odd

        const currentPageNumber = this.props.pageNavigation_SelectValue_Prop;

        let pageNumber_List_Start : number = -1;
        let pageNumber_List_End : number = -1;

        if ( pageNumber_List_Length_Odd > this.props.pageNavigation_TotalPagesCount ) {
            //  Special case where total page count is smaller than pageNumber_List_Length_Odd

            pageNumber_List_Start = 1;
            pageNumber_List_End = this.props.pageNavigation_TotalPagesCount;

        } else {

            pageNumber_List_Start = currentPageNumber - Math.floor( pageNumber_List_Length_Odd / 2 );
            pageNumber_List_End = pageNumber_List_Start + pageNumber_List_Length - 1;

            if ( pageNumber_List_Start < 1 ) {
                pageNumber_List_Start = 1;
                pageNumber_List_End = pageNumber_List_Start + pageNumber_List_Length - 1;
            }
            if ( pageNumber_List_End > this.props.pageNavigation_TotalPagesCount ) {
                pageNumber_List_End = this.props.pageNavigation_TotalPagesCount;
                pageNumber_List_Start = pageNumber_List_End - pageNumber_List_Length + 1;
            }
        }

        const numberedPages_JSX_Array : Array<JSX.Element> = [];

        for ( let pageNumber = pageNumber_List_Start; pageNumber <= pageNumber_List_End; pageNumber++ ) {

            let className_Addition = "";
            if ( pageNumber === currentPageNumber ) {
                className_Addition = " standard-background-color-very-dark ";
            }

            const className = " clickable standard-border-color-very-dark " + className_Addition;

            const numberedPage_JSX = (
                <div
                    key={ pageNumber }
                    className={ className }
                    style={ { display: "inline-block", padding: 1, marginLeft: 2, marginRight: 2, borderStyle: "solid", borderWidth: 1 } }
                    onClick={ () => { this._change_PageNumber( pageNumber ) } }
                >
                    {pageNumber}
                </div>
            );
            numberedPages_JSX_Array.push( numberedPage_JSX );
        }

        let pageSelectionOverlay : JSX.Element = null;

        if ( this.state.show_pageSelectionOverlay ) {

            pageSelectionOverlay = this._create_pageSelectionOverlay();
        }

        return (
            <React.Fragment>

                <div style={ { display: "inline-block", whiteSpace: "nowrap" } }>

                    <div style={ { display: "inline-block", whiteSpace: "nowrap" } }>

                        {/*  START Current Page Display and Select Page by Clicking on Page Number */}

                        {/*  Icons for First and Previous. Add -grey for greyed out */}
                        <div style={ { display: "inline-block" } }>
                            { (this.props.pageNavigation_SelectValue_Prop === 1 || this.props.tableDataObject_INTERNAL.getPageCount() === 0 ) ? (
                                //  Grayed out
                                <img
                                    src="static/images/icon-page-to-start-gray.svg"
                                    title={"At first page"}
                                    style={ { width: svgImage_Width } }
                                />
                            ) : (
                                <img
                                    src="static/images/icon-page-to-start.svg"
                                    title={"Go to first page"}
                                    className=" fake-link-image " style={ { width: svgImage_Width } }
                                    onClick={ () => { this._change_PageNumber( 1 ) } }
                                />
                            )}
                        </div>
                        <div style={ { display: "inline-block", marginLeft: 2, marginRight: 2 } }>
                            { (this.props.pageNavigation_SelectValue_Prop === 1 || this.props.tableDataObject_INTERNAL.getPageCount() === 0 ) ? (
                                //  Grayed out
                                <img
                                    src="static/images/icon-page-to-previous-gray.svg"
                                    title={"At first page"}
                                    style={ { width: svgImage_Width } }
                                />
                            ) : (
                                <img
                                    src="static/images/icon-page-to-previous.svg"
                                    title={"Go to previous page"}
                                    className=" fake-link-image " style={ { width: svgImage_Width } }
                                    onClick={ () => { this._change_PageNumber( this.props.pageNavigation_SelectValue_Prop - 1 ) } }
                                />
                            )}
                        </div>

                        {/*  Numbered Pages */}
                        {numberedPages_JSX_Array}

                        {/*  Icons for Next and Last */}
                        <div style={ { display: "inline-block", marginLeft: 2, marginRight: 2 } }>
                            { (this.props.pageNavigation_SelectValue_Prop === this.props.pageNavigation_TotalPagesCount || this.props.tableDataObject_INTERNAL.getPageCount() === 0 ) ? (
                                //  Grayed out
                                <img
                                    src="static/images/icon-page-to-next-gray.svg"
                                    title={"At last page"}
                                    style={ { width: svgImage_Width } }
                                />
                            ) : (
                                <img
                                    src="static/images/icon-page-to-next.svg"
                                    title={"Go to next page"}
                                    className=" fake-link-image " style={ { width: svgImage_Width } }
                                    onClick={ () => { this._change_PageNumber( this.props.pageNavigation_SelectValue_Prop + 1 ) } }
                                />
                            )}
                        </div>
                        <div style={ { display: "inline-block" } }>
                            { (this.props.pageNavigation_SelectValue_Prop === this.props.pageNavigation_TotalPagesCount || this.props.tableDataObject_INTERNAL.getPageCount() === 0 ) ? (
                                //  Grayed out
                                <img
                                    src="static/images/icon-page-to-end-gray.svg"
                                    title={"At last page"}
                                    style={ { width: svgImage_Width } }
                                />
                            ) : (
                                <img
                                    src="static/images/icon-page-to-end.svg"
                                    title={"Go to last page"}
                                    className=" fake-link-image " style={ { width: svgImage_Width } }
                                    onClick={ () => { this._change_PageNumber( this.props.pageNavigation_TotalPagesCount ) } }
                                />
                            )}
                        </div>

                        {/*  END Current Page Display and Select Page by Clicking on Page Number */}

                        {/*  START Select Page by Entering Page Number */}

                        <div style={ { display: "inline-block" } } >

                            <form onSubmit={ this._goToPage_InputField_Form_Submitted_BindThis } >

                                <div style={ { position: "relative", display: "inline-block", marginLeft: 10 } } >
                                    <input
                                        type="text"
                                        placeholder="pg #"
                                        style={ pageNumber_InputField_Style }
                                        title={ ( this.state.pageNavigation_InputField_Value_NotEmpty_NotANumber? "Value must be an Integer": "Enter a Page number to go to" )}
                                        ref={ this._inputField_PageNumber_Ref }
                                        value={ this.state.pageNavigation_InputField_Value }
                                        onChange={ this._inputFieldChanged_PageNumber_BindThis }
                                        onFocus={ this._inputField_PageNumber_OnFocus_BindThis }
                                        onBlur={ this._inputField_PageNumber_OnBlur_BindThis }
                                    />

                                    { pageSelectionOverlay }

                                </div>
                                <div style={ { position: "relative", display: "inline-block", marginLeft: 10 } } >
                                    <input
                                        type="submit"
                                        value={ pageNavigation_GoToPage_Button_Text }
                                        disabled={ ( this.state.pageNavigation_GoToPage_Button_Disabled_Message ? true : false )}
                                    />
                                    { ( this.state.pageNavigation_GoToPage_Button_Disabled_Message ) ? (
                                        <div
                                            style={ { position: "absolute", left: 0, right: 0, top: 0, bottom: 0 } }
                                            title={ this.state.pageNavigation_GoToPage_Button_Disabled_Message }
                                        >
                                        </div>
                                    ) : null
                                    }
                                </div>
                            </form>
                        </div>

                        {/*  END Select Page by Entering Page Number */}

                    </div>

                </div>

            </React.Fragment>
        );
    }

    /**
     *
     *
     */
    private _create_pageSelectionOverlay() : JSX.Element{

        const entries : Array<JSX.Element> = [];

        if ( this.props.tableDataObject_INTERNAL.dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing_Paged ) {

            let pageNumber = 1;
            for ( const pagedEntry of this.props.tableDataObject_INTERNAL.dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing_Paged ) {

                const entry = this._create_pageSelectionOverlay_SingleEntry({ pageNumber, rangeStart: pagedEntry.itemCount_pageStart, rangeEnd: pagedEntry.itemCount_pageEnd });
                entries.push( entry );
                pageNumber++;
            }
        } else if ( this.props.tableDataObject_INTERNAL.dataTable_DataRowEntries__INTERNAL_CurrentlyShowing_Paged ) {

            let pageNumber = 1;
            for ( const pagedEntry of this.props.tableDataObject_INTERNAL.dataTable_DataRowEntries__INTERNAL_CurrentlyShowing_Paged ) {

                const entry = this._create_pageSelectionOverlay_SingleEntry({ pageNumber, rangeStart: pagedEntry.itemCount_pageStart, rangeEnd: pagedEntry.itemCount_pageEnd });
                entries.push( entry );
                pageNumber++;
            }

        } else {
            throw Error("_create_pageSelectionOverlay: Neither dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing_Paged NOR dataTable_DataGroupRowEntries__INTERNAL_CurrentlyShowing_Paged populated ")
        }

        const pageSelectionOverlay = (
            <div style={{position: "relative"}}>
                <div
                    className=" standard-border-color-very-dark "
                    style={{
                        position: "absolute",
                        zIndex: 2,
                        // width: 150,
                        maxHeight: 200,
                        // overflowX: "hidden",
                        overflowY: "auto",
                        borderStyle: "solid",
                        borderWidth: 2
                    }}
                >
                    <div style={{ padding: 5}} className={"default-generic-overlay-background-color"}>

                        {  entries }
                    </div>
                </div>
            </div>
        );

        return pageSelectionOverlay;
    }

    /**
     *
     *
     */
    private _create_pageSelectionOverlay_SingleEntry(
        {
            pageNumber,
            rangeStart,
            rangeEnd
        } : {
            pageNumber : number
            rangeStart : number
            rangeEnd : number

        }) : JSX.Element{

        const entry = (
            <div
                key={ pageNumber }
                className={" fake-link hovered-div-highlight "}
                style={ { paddingTop: 2, paddingBottom: 2, width: "100%", whiteSpace: "nowrap" } }
                onClick={ () => { this._change_PageNumber(pageNumber) } }
            >
                Page:&nbsp;{pageNumber.toLocaleString()}:&nbsp;Items&nbsp;{rangeStart.toLocaleString()}-{rangeEnd.toLocaleString()}
            </div>
        );
        return entry;
    }


}