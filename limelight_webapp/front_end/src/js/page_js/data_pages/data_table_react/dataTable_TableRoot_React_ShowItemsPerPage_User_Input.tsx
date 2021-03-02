/**
 * dataTable_TableRoot_React_ShowItemsPerPage_User_Input.tsx
 *
 * Table "Find All Rows" User Input
 *
 *
 */
import React from 'react'
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {DataTable_TableRoot_showItemsPerPage_SelectValue_SHOW_ALL} from "page_js/data_pages/data_table_react/dataTable_TableRoot_React";


//  Delay after input change before call callback, to wait for additional keyboard input
const CALL_CALLBACK_DELAY = 200;  // in milliseconds


export type DataTable_TableRoot__ShowItemsPerPage_Select_Component__InputField_NewValueEntered_Callback = (newValue : number ) => void;

/**
 *
 */
export interface DataTable_TableRoot__ShowItemsPerPage_Select_Component_Props {

    showItemsPerPage_SelectValue_Prop : number
    showItemsPerPage_SelectValue_Options: Array<number> // Possible choices
    showItemsPerPage_NewValueEntered_Callback : DataTable_TableRoot__ShowItemsPerPage_Select_Component__InputField_NewValueEntered_Callback
}

/**
 *
 */
interface DataTable_TableRoot__ShowItemsPerPage_Select_Component_State {

    showItemsPerPage_SelectValue_CurrentLocal? : number
    showItemsPerPage_SelectValue_Prop_FromProps? : number
}

/**
 *
 */
export class DataTable_TableRoot__ShowItemsPerPage_Select_Component extends React.Component< DataTable_TableRoot__ShowItemsPerPage_Select_Component_Props, DataTable_TableRoot__ShowItemsPerPage_Select_Component_State > {

    private _selectChanged_BindThis = this._selectChanged.bind(this);

    private _inputFieldChanged_TimeoutId : number;

    private _select_Ref : React.RefObject<HTMLSelectElement>

    /**
     *
     */
    constructor(props : DataTable_TableRoot__ShowItemsPerPage_Select_Component_Props) {
        super(props);

        this._select_Ref = React.createRef();

        this.state = {
            showItemsPerPage_SelectValue_CurrentLocal : props.showItemsPerPage_SelectValue_Prop,
            showItemsPerPage_SelectValue_Prop_FromProps : props.showItemsPerPage_SelectValue_Prop
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
    static getDerivedStateFromProps(props : DataTable_TableRoot__ShowItemsPerPage_Select_Component_Props, state : DataTable_TableRoot__ShowItemsPerPage_Select_Component_State ) : DataTable_TableRoot__ShowItemsPerPage_Select_Component_State {

        if (
            props.showItemsPerPage_SelectValue_Prop !== state.showItemsPerPage_SelectValue_Prop_FromProps        ) {

            return {
                showItemsPerPage_SelectValue_CurrentLocal: props.showItemsPerPage_SelectValue_Prop,
                showItemsPerPage_SelectValue_Prop_FromProps: props.showItemsPerPage_SelectValue_Prop
            };
        }

        return null;
    }

    /**
     *
     * @param event
     * @private
     */
    private _selectChanged( event: React.ChangeEvent<HTMLInputElement> ) {
        try {
            const showItemsPerPage_SelectValue_String = this._select_Ref.current.value;
            if ( showItemsPerPage_SelectValue_String === undefined || showItemsPerPage_SelectValue_String === null ) {
                const msg = "_inputFieldChanged: ( showItemsPerPage_SelectValue_String === undefined || showItemsPerPage_SelectValue_String === null )";
                console.warn( msg );
                throw Error( msg );
            }
            if ( showItemsPerPage_SelectValue_String === "" ) {
                const msg = '_inputFieldChanged: ( showItemsPerPage_SelectValue_String === "" )';
                console.warn( msg );
                throw Error( msg );
            }

            const showItemsPerPage_SelectValue = Number.parseInt( showItemsPerPage_SelectValue_String );

            if ( Number.isNaN( showItemsPerPage_SelectValue ) ) {
                const msg = "_inputFieldChanged: ( Number.isNaN( Number.parseInt( showItemsPerPage_SelectValue_String ) ) ): showItemsPerPage_SelectValue_String: ";
                console.warn( msg, showItemsPerPage_SelectValue_String );
                throw Error( msg + showItemsPerPage_SelectValue_String );
            }

            this.setState({ showItemsPerPage_SelectValue_CurrentLocal: showItemsPerPage_SelectValue });

            if ( this._inputFieldChanged_TimeoutId ) {
                window.clearTimeout( this._inputFieldChanged_TimeoutId );
            }

            this._inputFieldChanged_TimeoutId = window.setTimeout( () => {
                try {
                    this.props.showItemsPerPage_NewValueEntered_Callback( showItemsPerPage_SelectValue );

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }, CALL_CALLBACK_DELAY );
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    render() {


        const selectEntries : Array<JSX.Element> = [];

        for ( const selectValue of this.props.showItemsPerPage_SelectValue_Options ) {

            let selectValue_Display = selectValue.toLocaleString();
            if ( selectValue === DataTable_TableRoot_showItemsPerPage_SelectValue_SHOW_ALL ) {
                selectValue_Display = "All";
            }

            const selectEntry = (
                <option key={ selectValue }
                        value={ selectValue }
                >
                    { selectValue_Display }
                </option>
            );

            selectEntries.push( selectEntry );
        }

        return (
            <React.Fragment>

                <div style={ { display: "inline-block", whiteSpace: "nowrap" } }>

                    <div style={ { display: "inline-block", marginLeft: 10 } } >
                        Show
                    </div>
                    <div style={ { display: "inline-block", marginLeft: 10 } } >
                        <select
                            ref={ this._select_Ref }
                            value={ this.state.showItemsPerPage_SelectValue_CurrentLocal }
                            onChange={ this._selectChanged_BindThis }
                        >
                            {selectEntries}
                        </select>
                    </div>
                    <div style={ { display: "inline-block", marginLeft: 10 } } >
                        items per page
                    </div>

                </div>

            </React.Fragment>
        );
    }

}