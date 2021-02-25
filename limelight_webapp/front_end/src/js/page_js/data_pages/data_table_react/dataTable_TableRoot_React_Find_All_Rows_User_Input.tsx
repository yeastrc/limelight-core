/**
 * dataTable_TableRoot_React_Find_All_Rows_User_Input.tsx
 *
 * Table "Find All Rows" User Input
 *
 *
 */
import React from 'react'
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";


//  Delay after input change before call callback, to wait for additional keyboard input
const CALL_CALLBACK_DELAY = 200;  // in milliseconds


export type DataTable_TableRoot__FindAllRows_SearchInput_Component__InputField_NewValueEntered_Callback = (newValue : string ) => void;

/**
 *
 */
export interface DataTable_TableRoot__FindAllRows_SearchInput_Component_Props {

    searchInputValue_Prop : string
    searchInputField_NewValueEntered_Callback : DataTable_TableRoot__FindAllRows_SearchInput_Component__InputField_NewValueEntered_Callback
}

/**
 *
 */
interface DataTable_TableRoot__FindAllRows_SearchInput_Component_State {

    searchInputValue_CurrentLocal? : string
    searchInputValue_Prop_FromProps? : string
}

/**
 *
 */
export class DataTable_TableRoot__FindAllRows_SearchInput_Component extends React.Component< DataTable_TableRoot__FindAllRows_SearchInput_Component_Props, DataTable_TableRoot__FindAllRows_SearchInput_Component_State > {

    private _inputFieldChanged_BindThis = this._inputFieldChanged.bind(this);

    private _inputFieldChanged_TimeoutId : number;

    private readonly _input_Ref: React.RefObject<HTMLInputElement>

    /**
     *
     */
    constructor(props : DataTable_TableRoot__FindAllRows_SearchInput_Component_Props) {
        super(props);

        this._input_Ref = React.createRef();

        this.state = {
            searchInputValue_CurrentLocal : props.searchInputValue_Prop,
            searchInputValue_Prop_FromProps : props.searchInputValue_Prop
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
    static getDerivedStateFromProps(props : DataTable_TableRoot__FindAllRows_SearchInput_Component_Props, state : DataTable_TableRoot__FindAllRows_SearchInput_Component_State ) : DataTable_TableRoot__FindAllRows_SearchInput_Component_State {

        if (
            props.searchInputValue_Prop !== state.searchInputValue_Prop_FromProps        ) {

            return {
                searchInputValue_CurrentLocal: props.searchInputValue_Prop,
                searchInputValue_Prop_FromProps: props.searchInputValue_Prop
            };
        }

        return null;
    }

    /**
     *
     * @param event
     * @private
     */
    private _inputFieldChanged( event: React.ChangeEvent<HTMLInputElement> ) {
        try {
            const searchInputValue = this._input_Ref.current.value;

            this.setState({ searchInputValue_CurrentLocal: searchInputValue });

            if ( this._inputFieldChanged_TimeoutId ) {
                window.clearTimeout( this._inputFieldChanged_TimeoutId );
            }

            this._inputFieldChanged_TimeoutId = window.setTimeout( () => {
                try {
                    this.props.searchInputField_NewValueEntered_Callback( searchInputValue );

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

    render() {
        return (
            <React.Fragment>

                <span>Find all rows containing:&nbsp;</span>

                <input
                    type="text" style={ { width: 150 } }
                    ref={ this._input_Ref }
                    value={ this.state.searchInputValue_CurrentLocal } onChange={ this._inputFieldChanged_BindThis }
                />

            </React.Fragment>
        );
    }

}