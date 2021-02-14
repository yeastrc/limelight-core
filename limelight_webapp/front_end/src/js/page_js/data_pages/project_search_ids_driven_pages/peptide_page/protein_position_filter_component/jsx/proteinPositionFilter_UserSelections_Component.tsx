/**
 * proteinPositionFilter_UserSelections_Component.tsx
 *
 * Protein Position Filter User Selections
 *
 *
 */

import React from 'react'

import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {
    ProteinPositionFilter_UserSelections_ComponentData,
    ProteinPositionFilter_UserSelections_ComponentData_SelectionDisplay_Entry
} from "page_js/data_pages/project_search_ids_driven_pages/peptide_page/protein_position_filter_component/js/proteinPositionFilter_UserSelections_ComponentData";
import {ProteinPositionFilter_UserSelections_StateObject_Wrapper} from "page_js/data_pages/project_search_ids_driven_pages/peptide_page/protein_position_filter_component/js/proteinPositionFilter_UserSelections_StateObject_Wrapper";
import {
    ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data,
    ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data_Entry
} from "page_js/data_pages/project_search_ids_driven_pages/peptide_page/protein_position_filter_component/js/proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;



//  Validation to add to the "Add" protein range button: from: modViewMainDataVizOptionsManager.ts

// do some form validation.
// all of these returns should be producing some kind of error message to the user

// if(startString.length < 1 && endString.length < 1) { return; }
// if(startString.length < 1) { startString = endString; }
// if(endString.length < 1) { endString = startString; }
//
// // should produce error messages for these cases
// if(!(/^\d+$/.test(startString))) { return; }
// if(!(/^\d+$/.test(endString))) { return; }



//  Delay after input change before call callback, to wait for additional keyboard input
const CALL_CALLBACK_DELAY = 200;  // in milliseconds

export type ProteinPositionFilter_UserSelections_Component__UpdateMadeTo_proteinPositionFilter_UserSelections_StateObject_Wrapper = () => void;


/**
 *
 */
export interface ProteinPositionFilter_UserSelections_Props {

    proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data : ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data
    proteinPositionFilter_UserSelections_ComponentData : ProteinPositionFilter_UserSelections_ComponentData
    proteinPositionFilter_UserSelections_StateObject_Wrapper : ProteinPositionFilter_UserSelections_StateObject_Wrapper;

    updateMadeTo_proteinPositionFilter_UserSelections_StateObject_Wrapper_Callback : ProteinPositionFilter_UserSelections_Component__UpdateMadeTo_proteinPositionFilter_UserSelections_StateObject_Wrapper
}

interface ProteinPositionFilter_UserSelections_State {

    show_Add_ProteinRange? : boolean

    prev_proteinPositionFilter_UserSelections_ComponentData? : ProteinPositionFilter_UserSelections_ComponentData
}

/**
 *
 */
export class ProteinPositionFilter_UserSelections extends React.Component< ProteinPositionFilter_UserSelections_Props, ProteinPositionFilter_UserSelections_State > {

    private _close_Add_ProteinRange_Clicked_BindThis = this._close_Add_ProteinRange_Clicked.bind(this);

    /**
     *
     */
    constructor(props : Internal__AddProteinRangeContainer_Props) {
        super(props);

        this.state = {
            show_Add_ProteinRange : false,
            prev_proteinPositionFilter_UserSelections_ComponentData : props.proteinPositionFilter_UserSelections_ComponentData
        }
    }

    /**
     *
     * @private
     */
    private _close_Add_ProteinRange_Clicked() : void {
        this.setState({ show_Add_ProteinRange: false });
    }

    /**
     *
     */
    render() {

        let show_AddProteinFilter_Block = this.state.show_Add_ProteinRange;
        let show_AddProteinFilter_Button = ! show_AddProteinFilter_Block;

        if ( this.props.proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data.proteins_Names_Lengths_Array.length < 1 ) {

            show_AddProteinFilter_Block = false;
            show_AddProteinFilter_Button = false;
        }

        const paddingTopSize = 4;

        return (
            <React.Fragment>

                {/* Parent is CSS Grid with 2 Columns */}

                <div className=" filter-common-filter-label " style={ { paddingTop: paddingTopSize } }>Filter On Protein Position:</div>

                <div className=" filter-common-selection-block "  style={ { paddingTop: paddingTopSize } }>
                    <div className=" filter-common-selection-inner-block ">
                        <div className=" left-margin-same-as-checkbox ">
                            {/* left-margin-same-as-checkbox; to align with checkbox in Unique Peptide */}
                            <div >
                                <Internal__ExistingProteinRangesContainer
                                    proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data={ this.props.proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data }
                                    proteinPositionFilter_UserSelections_ComponentData={ this.props.proteinPositionFilter_UserSelections_ComponentData }
                                    proteinPositionFilter_UserSelections_StateObject_Wrapper={ this.props.proteinPositionFilter_UserSelections_StateObject_Wrapper }
                                    updateMadeTo_proteinPositionFilter_UserSelections_StateObject_Wrapper_Callback={ this.props.updateMadeTo_proteinPositionFilter_UserSelections_StateObject_Wrapper_Callback }
                                />
                                { ( show_AddProteinFilter_Button ) ? (
                                    <div>
                                        <input type="button" value="Add Protein Position Filter" onClick={ () => { this.setState({ show_Add_ProteinRange : true }) } }/>
                                    </div>
                                ) : null }
                                { ( show_AddProteinFilter_Block ) ? (
                                    <Internal__AddProteinRangeContainer
                                        proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data={ this.props.proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data }
                                        proteinPositionFilter_UserSelections_ComponentData={ this.props.proteinPositionFilter_UserSelections_ComponentData }
                                        proteinPositionFilter_UserSelections_StateObject_Wrapper={ this.props.proteinPositionFilter_UserSelections_StateObject_Wrapper }
                                        close_Add_ProteinRange_Clicked={ this._close_Add_ProteinRange_Clicked_BindThis }
                                        updateMadeTo_proteinPositionFilter_UserSelections_StateObject_Wrapper_Callback={ this.props.updateMadeTo_proteinPositionFilter_UserSelections_StateObject_Wrapper_Callback }
                                    />
                                ) : null }
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }

}


///////

/**
 *
 */
interface Internal__ExistingProteinRangesContainer_Props {

    proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data : ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data
    proteinPositionFilter_UserSelections_ComponentData : ProteinPositionFilter_UserSelections_ComponentData
    proteinPositionFilter_UserSelections_StateObject_Wrapper : ProteinPositionFilter_UserSelections_StateObject_Wrapper;

    updateMadeTo_proteinPositionFilter_UserSelections_StateObject_Wrapper_Callback : ProteinPositionFilter_UserSelections_Component__UpdateMadeTo_proteinPositionFilter_UserSelections_StateObject_Wrapper
}

interface Internal__ExistingProteinRangesContainer_State {

    _placeholder: any
}

/**
 *
 */
class Internal__ExistingProteinRangesContainer extends React.Component< Internal__ExistingProteinRangesContainer_Props, Internal__ExistingProteinRangesContainer_State > {

    private _deleteEntryCallback_BindThis = this._deleteEntryCallback.bind(this);

    private _DO_NOT_CALL_BoundMethods_TypeTest() { // Function only to test that methods that are .bind(this) are correct function signature
        const deleteEntryCallback_Assign : Internal__ExistingProteinRangeEntry__deleteEntry_Callback_Type = this._deleteEntryCallback;
    }

    /**
     *
     */
    constructor(props : Internal__ExistingProteinRangesContainer_Props) {
        super(props);

    }

    private _deleteEntryCallback( entry : ProteinPositionFilter_UserSelections_ComponentData_SelectionDisplay_Entry ) {
        try {
            this.props.proteinPositionFilter_UserSelections_StateObject_Wrapper.removeSelectedPositions({
                proteinSequenceVersionId: entry.proteinSequenceVersionId,
                proteinPosition_Start: entry.proteinPosition_Start,
                proteinPosition_End: entry.proteinPosition_End
            });

            if ( this.props.updateMadeTo_proteinPositionFilter_UserSelections_StateObject_Wrapper_Callback ) {
                this.props.updateMadeTo_proteinPositionFilter_UserSelections_StateObject_Wrapper_Callback();
            } else {
                console.warn( "No value in this.props.updateMadeTo_proteinPositionFilter_UserSelections_StateObject_Wrapper_Callback")
            }

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    render() {

        if ((!this.props.proteinPositionFilter_UserSelections_ComponentData.proteinPosition_SelectionDisplay_Entries)
            || this.props.proteinPositionFilter_UserSelections_ComponentData.proteinPosition_SelectionDisplay_Entries.length === 0) {

            return ( // No Selections so return this
                <div style={{ marginBottom: 4, display: "inline-block", whiteSpace: "nowrap"}} className="filter-single-value-display-block">
                    Currently not filtering on protein positions
                </div>
            )  //  EARLY RETURN
        }

        const selectionRender_Entries : Array<JSX.Element> = [];
        {
            let index = 0;
            for (const proteinPosition_SelectionDisplay_Entry of this.props.proteinPositionFilter_UserSelections_ComponentData.proteinPosition_SelectionDisplay_Entries) {

                const renderEntry = (
                    <Internal__ExistingProteinRangeEntry key={ index }
                        entry={proteinPosition_SelectionDisplay_Entry}
                        deleteEntry_Callback={ this._deleteEntryCallback_BindThis }
                    />
                );
                selectionRender_Entries.push( renderEntry );
                index++;
            }
        }
        return (
            <div style={ { lineHeight: "1.7em" } }>
                { selectionRender_Entries }
            </div>
        )
    }
}


///////

type Internal__ExistingProteinRangeEntry__deleteEntry_Callback_Type = ( entry : ProteinPositionFilter_UserSelections_ComponentData_SelectionDisplay_Entry ) => void

/**
 *
 */
interface Internal__ExistingProteinRangeEntry_Props {

    entry : ProteinPositionFilter_UserSelections_ComponentData_SelectionDisplay_Entry

    deleteEntry_Callback : Internal__ExistingProteinRangeEntry__deleteEntry_Callback_Type
}

interface Internal__ExistingProteinRangeEntry_State {

    _placeholder: any
}

/**
 *
 */
class Internal__ExistingProteinRangeEntry extends React.Component< Internal__ExistingProteinRangeEntry_Props, Internal__ExistingProteinRangeEntry_State > {

    private _delete_Clicked_BindThis = this._delete_Clicked.bind(this);

    /**
     *
     */
    constructor(props : Internal__ExistingProteinRangeEntry_Props) {
        super(props);

    }

    /**
     *
     * @param event
     * @private
     */
    private _delete_Clicked( event: any ) {
        try {
            this.props.deleteEntry_Callback( this.props.entry );

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    render() {

        let proteinNameDisplay = this.props.entry.proteinName_Truncated;
        let protein_TitleAttr__SelectedPositions : string = "";

        if ( ! this.props.entry.proteinFullLengthSelected ) {
            proteinNameDisplay += " (" + this.props.entry.proteinPosition_Start + "-" + this.props.entry.proteinPosition_End + ")";
            protein_TitleAttr__SelectedPositions = "Selected positions in protein from " + this.props.entry.proteinPosition_Start + " to " + this.props.entry.proteinPosition_End + ".\n\n";
        }

        let protein_TitleAttr__ProteinDescription : string = "";
        if ( this.props.entry.proteinDescription ) {
            protein_TitleAttr__ProteinDescription = "\n\n" + this.props.entry.proteinDescription;
        }

        const protein_TitleAttr = protein_TitleAttr__SelectedPositions + "Selected Protein:\n\n" + this.props.entry.proteinName + protein_TitleAttr__ProteinDescription;

        return (
            <span className="filter-single-value-display-block" >
                <span title={ protein_TitleAttr }>
                    { proteinNameDisplay }
                </span>
                <span style={ { paddingLeft: 2 } }>
                    <img className="icon-small clickable"
                         src="static/images/icon-circle-delete.png"
                         title="Delete Filter"
                         onClick={ this._delete_Clicked_BindThis }
                    />
                </span>
            </span>
        )
    }
}

///////

/**
 *
 */
interface Internal__AddProteinRangeContainer_Props {

    proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data : ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data
    proteinPositionFilter_UserSelections_ComponentData : ProteinPositionFilter_UserSelections_ComponentData
    proteinPositionFilter_UserSelections_StateObject_Wrapper : ProteinPositionFilter_UserSelections_StateObject_Wrapper;

    close_Add_ProteinRange_Clicked : () => void
    updateMadeTo_proteinPositionFilter_UserSelections_StateObject_Wrapper_Callback : ProteinPositionFilter_UserSelections_Component__UpdateMadeTo_proteinPositionFilter_UserSelections_StateObject_Wrapper
}

interface Internal__AddProteinRangeContainer_State {

    selected_ProteinSequenceVersionId? : number
    selected_Proteins_Names_Lengths_Entry? : ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data_Entry

    proteinRange_From_inputField_Value? : number                    // !! Not Current if ...inputField_Changed_NewValue_Callback is NOT null
    proteinRange_From_inputField_Value_ErrorMessage? : string
    proteinRange_To_inputField_Value? : number                      // !! Not Current if ...inputField_Changed_NewValue_Callback is NOT null
    proteinRange_To_inputField_Value_ErrorMessage? : string

    proteinRange_Overall_ErrorMessage? : string //  From comparing the 2 values

    prev_proteinPositionFilter_UserSelections_ComponentData? : ProteinPositionFilter_UserSelections_ComponentData
}

/**
 *
 */
class Internal__AddProteinRangeContainer extends React.Component< Internal__AddProteinRangeContainer_Props, Internal__AddProteinRangeContainer_State > {

    private _add_Button_Clicked_BindThis = this._add_Button_Clicked.bind(this);
    private _close_Button_Clicked_BindThis = this._close_Button_Clicked.bind(this);
    private _proteinSelectChanged_BindThis = this._proteinSelectChanged.bind(this);

    private _proteinRange_From_inputField_Changed_NewValue_BindThis : SingleRange_Entry_From_or_To_InputField_Changed_NewValue_Callback_Type = this._proteinRange_From_inputField_Changed_NewValue.bind(this);
    private _proteinRange_From_inputField_Changed_ErrorMessage_BindThis : SingleRange_Entry_From_or_To_InputField_Changed_ErrorMessage_Callback_Type = this._proteinRange_From_inputField_Changed_ErrorMessage.bind(this);
    private _proteinRange_To_inputField_Changed_NewValue_BindThis : SingleRange_Entry_From_or_To_InputField_Changed_NewValue_Callback_Type = this._proteinRange_To_inputField_Changed_NewValue.bind(this);
    private _proteinRange_To_inputField_Changed_ErrorMessage_BindThis : SingleRange_Entry_From_or_To_InputField_Changed_ErrorMessage_Callback_Type = this._proteinRange_To_inputField_Changed_ErrorMessage.bind(this);

    private _DO_NOT_CALL_BoundMethods_TypeTest() { // Function only to test that methods that are .bind(this) are correct function signature
        const _proteinRange_From_inputField_Changed_NewValue : SingleRange_Entry_From_or_To_InputField_Changed_NewValue_Callback_Type = this._proteinRange_From_inputField_Changed_NewValue
        const _proteinRange_From_inputField_Changed_ErrorMessage_BindThis : SingleRange_Entry_From_or_To_InputField_Changed_ErrorMessage_Callback_Type = this._proteinRange_From_inputField_Changed_ErrorMessage
        const _proteinRange_To_inputField_Changed_NewValue_BindThis : SingleRange_Entry_From_or_To_InputField_Changed_NewValue_Callback_Type = this._proteinRange_To_inputField_Changed_NewValue
        const _proteinRange_To_inputField_Changed_ErrorMessage_BindThis : SingleRange_Entry_From_or_To_InputField_Changed_ErrorMessage_Callback_Type = this._proteinRange_To_inputField_Changed_ErrorMessage
    }

    private _proteinSelect_Ref : React.RefObject<HTMLSelectElement>

    private _proteinRange_From_inputField_Value : number  // !! Not Current if ...inputField_Changed_NewValue_Callback is NOT null
    private _proteinRange_To_inputField_Value : number    // !! Not Current if ...inputField_Changed_NewValue_Callback is NOT null
    private _proteinRange_From_inputField_Value_ErrorMessage : string
    private _proteinRange_To_inputField_Value_ErrorMessage : string
    private _proteinRange_Overall_ErrorMessage : string //  From comparing the 2 values

    /**
     *
     */
    constructor(props : Internal__AddProteinRangeContainer_Props) {
        super(props);

        this._proteinSelect_Ref = React.createRef<HTMLSelectElement>();

        if ( props.proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data.proteins_Names_Lengths_Array.length < 1 ) {
            const msg = "( props.proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data.proteins_Names_Lengths_Array.length < 1 ) is NOT Allowed: Internal__AddProteinRangeContainer: constructor"
            console.warn( msg )
            throw Error( msg )
        }

        //  Initialize to first entry in Array
        const selected_Proteins_Names_Lengths_Entry =
            this.props.proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data.proteins_Names_Lengths_Array[ 0 ];

        const selected_ProteinSequenceVersionId = selected_Proteins_Names_Lengths_Entry.proteinSequenceVersionId;

        const proteinRange_From_inputField_Value = 1;
        const proteinRange_To_inputField_Value = selected_Proteins_Names_Lengths_Entry.proteinLength;

        this.state = {
            selected_ProteinSequenceVersionId,
            selected_Proteins_Names_Lengths_Entry,
            proteinRange_From_inputField_Value,
            proteinRange_To_inputField_Value,
            prev_proteinPositionFilter_UserSelections_ComponentData : props.proteinPositionFilter_UserSelections_ComponentData ,
        };
    }

    /**
     * Must be Static
     * Called before
     *   Initial render: 'render()'
     *   Rerender : 'shouldComponentUpdate()'
     *
     * Return new state (like return from setState(callback)) or null
     */
    static getDerivedStateFromProps( props : Internal__AddProteinRangeContainer_Props, state : Internal__AddProteinRangeContainer_State ) : Internal__AddProteinRangeContainer_State {

        // console.log("called: static getDerivedStateFromProps(): " );

        //    Return new state (like return from setState(callback)) or null

        // if ( props.proteinPositionFilter_UserSelections_ComponentData !== state.prev_proteinPositionFilter_UserSelections_ComponentData ) {
        //
        //     //   proteinPositionFilter_UserSelections_ComponentData changed so update peptideSequence_UserSelection
        //
        //     let peptideSequence_UserSelection = props.proteinPositionFilter_UserSelections_ComponentData.peptideSequence_UserSelection;
        //
        //     if ( ! peptideSequence_UserSelection ) {
        //         peptideSequence_UserSelection = "";
        //     }
        //
        //     let proteinSequenceString = props.proteinSequenceString;
        //     let userSearchString_LocationsOn_ProteinSequence_Root : UserSearchString_LocationsOn_ProteinSequence_Root = null;
        //
        //     if ( proteinSequenceString ) {
        //         userSearchString_LocationsOn_ProteinSequence_Root = _compute_userSearchString_LocationsOn_ProteinSequence_Compute({
        //
        //             searchString : peptideSequence_UserSelection,
        //             proteinSequenceString
        //         });
        //     }
        //
        //     return {
        //         peptideSequence_UserSelection,
        //         proteinSequenceString,
        //         prev_proteinPositionFilter_UserSelections_ComponentData : props.proteinPositionFilter_UserSelections_ComponentData,
        //         userSearchString_LocationsOn_ProteinSequence_Root
        //     };
        // }

        return null;
    }

    /**
     * @returns true if should update, false otherwise
     */
    // shouldComponentUpdate( nextProps : Internal__AddProteinRangeContainer_Props, nextState : Internal__AddProteinRangeContainer_State ) : boolean {
    //
    //     // console.log(" shouldComponentUpdate")
    //
    //     //  Only update if changed: props or state:
    //
    //     if ( this.state.peptideSequence_UserSelection !== nextState.peptideSequence_UserSelection ) {
    //         return true;
    //     }
    //     if ( this.state.proteinSequenceString !== nextState.proteinSequenceString ) {
    //         return true;
    //     }
    //     if ( this.state.userSearchString_LocationsOn_ProteinSequence_Root !== nextState.userSearchString_LocationsOn_ProteinSequence_Root ) {
    //         return true;
    //     }
    //     return false;
    //
    //     //  If Comment out prev code, comment out this method
    // }

    // getSnapshotBeforeUpdate( <see docs> ) {


    // }


    /**
     * After render()
     */
    // componentDidUpdate(prevProps, prevState, snapshot) {

    //     // console.log("Internal__AddProteinRangeContainer: componentDidUpdate")

    //     // if ( this.dataObject_columnEntry_NewValue_Callback ) {
    //     //     this.dataObject_columnEntry_NewValue_Callback({ dataObject_columnEntry : this.props.dataObject_columnEntry });
    //     // }
    // }

    /**
     * Must be Static
     * Called before
     *   Initial render: 'render()'
     *   Rerender : 'shouldComponentUpdate()'
     *
     * Return new state (like return from setState(callback)) or null
     */
    private static _get_selected_Proteins_Names_Lengths_Entry_For_selected_ProteinSequenceVersionId(
        {
            selected_ProteinSequenceVersionId,
            props
        } : {
            selected_ProteinSequenceVersionId : number
            props : Internal__AddProteinRangeContainer_Props
        }) : ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data_Entry {

        let selected_Proteins_Names_Lengths_Entry : ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data_Entry = null;

        if ( props.proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data.proteins_Names_Lengths_Array.length > 0 ) {

            selected_Proteins_Names_Lengths_Entry =
                props.proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data.
                proteins_Names_Lengths_Map_Key_proteinSequenceVersionId.get( selected_ProteinSequenceVersionId );

            if ( ! selected_Proteins_Names_Lengths_Entry ) {
                selected_Proteins_Names_Lengths_Entry = null;
            }
        }

        return selected_Proteins_Names_Lengths_Entry;
    }

    /**
     *
     */
    _add_Button_Clicked( event: React.MouseEvent<HTMLSelectElement, MouseEvent> ) {
        try {
            if ( this._proteinRange_From_inputField_Value_ErrorMessage
            || this._proteinRange_To_inputField_Value_ErrorMessage
            || this._proteinRange_Overall_ErrorMessage
            ) {
                //  Have an error so exit
                return;  // EARLY REN
            }

            this.props.proteinPositionFilter_UserSelections_StateObject_Wrapper.addSelection({
                proteinSequenceVersionId: this.state.selected_Proteins_Names_Lengths_Entry.proteinSequenceVersionId,
                proteinPosition_Start : this.state.proteinRange_From_inputField_Value,
                proteinPosition_End : this.state.proteinRange_To_inputField_Value
            });

            if ( this.props.updateMadeTo_proteinPositionFilter_UserSelections_StateObject_Wrapper_Callback ) {
                this.props.updateMadeTo_proteinPositionFilter_UserSelections_StateObject_Wrapper_Callback();
            } else {
                console.warn( "No value in this.props.updateMadeTo_proteinPositionFilter_UserSelections_StateObject_Wrapper_Callback")
            }

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    _close_Button_Clicked( event: React.MouseEvent<HTMLSelectElement, MouseEvent> ) {
        try {
            this.props.close_Add_ProteinRange_Clicked();

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    _proteinSelectChanged( event: React.MouseEvent<HTMLSelectElement, MouseEvent> ) {
        try {
            const selected_ProteinSequenceVersionId_String = this._proteinSelect_Ref.current.value
            if ( selected_ProteinSequenceVersionId_String === undefined || selected_ProteinSequenceVersionId_String === null ) {
                const msg = "_proteinSelectChanged: ( selected_ProteinSequenceVersionId_String === undefined || selected_ProteinSequenceVersionId_String === null )";
                console.warn( msg );
                throw Error( msg );
            }
            if ( selected_ProteinSequenceVersionId_String === "" ) {
                const msg = '_proteinSelectChanged: ( selected_ProteinSequenceVersionId_String === "" )';
                console.warn( msg );
                throw Error( msg );
            }

            const selected_ProteinSequenceVersionId = Number.parseInt( selected_ProteinSequenceVersionId_String );

            if ( Number.isNaN( selected_ProteinSequenceVersionId ) ) {
                const msg = "_proteinSelectChanged: ( Number.isNaN( Number.parseInt( selected_ProteinSequenceVersionId_String ) ) ): selected_ProteinSequenceVersionId_String: ";
                console.warn( msg, selected_ProteinSequenceVersionId_String );
                throw Error( msg + selected_ProteinSequenceVersionId_String );
            }

            const selected_Proteins_Names_Lengths_Entry = Internal__AddProteinRangeContainer._get_selected_Proteins_Names_Lengths_Entry_For_selected_ProteinSequenceVersionId(
                { selected_ProteinSequenceVersionId, props : this.props })

            if ( selected_ProteinSequenceVersionId_String === "" ) {
                const msg = '_proteinSelectChanged: ( selected_Proteins_Names_Lengths_Entry not set )';
                console.warn( msg );
                throw Error( msg );
            }

            const proteinRange_From_inputField_Value = 1;
            const proteinRange_To_inputField_Value = selected_Proteins_Names_Lengths_Entry.proteinLength;

            this.setState( (state : Internal__AddProteinRangeContainer_State, props : Internal__AddProteinRangeContainer_Props ) : Internal__AddProteinRangeContainer_State => {

                return {
                    selected_ProteinSequenceVersionId, selected_Proteins_Names_Lengths_Entry,
                    proteinRange_From_inputField_Value, proteinRange_From_inputField_Value_ErrorMessage: null,
                    proteinRange_To_inputField_Value, proteinRange_To_inputField_Value_ErrorMessage: null
                };
            });

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }
    /**
     *
     */
    private _proteinRange_From_inputField_Changed_NewValue( params : SingleRange_Entry_From_or_To_InputField_Changed_NewValue_Callback_Params ) : void {
        try {
            this.setState( (state : Internal__AddProteinRangeContainer_State, props : Internal__AddProteinRangeContainer_Props ) : Internal__AddProteinRangeContainer_State => {

                return { proteinRange_From_inputField_Value : params.newValue };
            });
            this._proteinRange_From_inputField_Value = params.newValue;
            this._proteinRange_OverallValidate_For_From_Or_To_inputField_Changed();

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _proteinRange_From_inputField_Changed_ErrorMessage( params : SingleRange_Entry_From_or_To_InputField_Changed_ErrorMessage_Callback_Params ) : void {
        try {

            this.setState( (state : Internal__AddProteinRangeContainer_State, props : Internal__AddProteinRangeContainer_Props ) : Internal__AddProteinRangeContainer_State => {

                return { proteinRange_From_inputField_Value_ErrorMessage: params.errorMessage };
            });
            this._proteinRange_From_inputField_Value_ErrorMessage = params.errorMessage;
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _proteinRange_To_inputField_Changed_NewValue( params : SingleRange_Entry_From_or_To_InputField_Changed_NewValue_Callback_Params ) : void {
        try {
            this.setState( (state : Internal__AddProteinRangeContainer_State, props : Internal__AddProteinRangeContainer_Props ) : Internal__AddProteinRangeContainer_State => {

                return { proteinRange_To_inputField_Value : params.newValue };
            });
            this._proteinRange_To_inputField_Value = params.newValue;
            this._proteinRange_OverallValidate_For_From_Or_To_inputField_Changed();

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _proteinRange_To_inputField_Changed_ErrorMessage( params : SingleRange_Entry_From_or_To_InputField_Changed_ErrorMessage_Callback_Params ) : void {
        try {

            this.setState( (state : Internal__AddProteinRangeContainer_State, props : Internal__AddProteinRangeContainer_Props ) : Internal__AddProteinRangeContainer_State => {

                return { proteinRange_To_inputField_Value_ErrorMessage: params.errorMessage };
            });
            this._proteinRange_To_inputField_Value_ErrorMessage = params.errorMessage;
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _proteinRange_OverallValidate_For_From_Or_To_inputField_Changed() : void {
        try {
            if (this.state.proteinRange_From_inputField_Value > this.state.proteinRange_To_inputField_Value) {

                const proteinRange_Overall_ErrorMessage = "From cannot be greater than To";

                this.setState((state: Internal__AddProteinRangeContainer_State, props: Internal__AddProteinRangeContainer_Props): Internal__AddProteinRangeContainer_State => {

                    return {proteinRange_Overall_ErrorMessage };
                });
                this._proteinRange_Overall_ErrorMessage = proteinRange_Overall_ErrorMessage
            } else {
                this.setState((state: Internal__AddProteinRangeContainer_State, props: Internal__AddProteinRangeContainer_Props): Internal__AddProteinRangeContainer_State => {

                    if ( state.proteinRange_Overall_ErrorMessage ) {
                        return {proteinRange_Overall_ErrorMessage: null};
                    } else {
                        return null;  // No change needed
                    }
                });
                this._proteinRange_Overall_ErrorMessage = null;
            }
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    render() : JSX.Element {

        const proteinSelectEntries : Array<JSX.Element> = [];

        for ( const proteinInfo of this.props.proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data.proteins_Names_Lengths_Array ) {

            let optionTitle = proteinInfo.proteinName;
            if ( proteinInfo.proteinDescription ) {
                optionTitle += "\n\n" + proteinInfo.proteinDescription
            }

            const proteinSelectEntry = (
                <option key={ proteinInfo.proteinSequenceVersionId }
                        value={ proteinInfo.proteinSequenceVersionId }
                        title={ optionTitle }
                >
                    { proteinInfo.proteinName_Truncated }
                </option>
            );

            proteinSelectEntries.push( proteinSelectEntry );
        }

        let have_proteins_Names_Lengths_Entries = false;

        let selectProtein_TitleAttr : string = null;

        if ( this.props.proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data.proteins_Names_Lengths_Array.length > 0 ) {

            have_proteins_Names_Lengths_Entries = true;
        }

        if ( this.state.selected_Proteins_Names_Lengths_Entry ) {
            selectProtein_TitleAttr = "Selected Protein\n\n" + this.state.selected_Proteins_Names_Lengths_Entry.proteinName;
            if ( this.state.selected_Proteins_Names_Lengths_Entry.proteinDescription ) {
                selectProtein_TitleAttr += "\n\n" +
                this.state.selected_Proteins_Names_Lengths_Entry.proteinDescription;
            }
        }

        let inputPositionsErrorMessage_JSX : JSX.Element = null;
        let inputPositionsErrorMessage_String : string = null;

        {
            let inputPositionsErrorMessage_InnerPart: JSX.Element = null;

            if (this.state.proteinRange_From_inputField_Value_ErrorMessage) {

                inputPositionsErrorMessage_InnerPart = (

                    <span>
                        From: {this.state.proteinRange_From_inputField_Value_ErrorMessage}
                    </span>
                );
                inputPositionsErrorMessage_String = "From: " + this.state.proteinRange_From_inputField_Value_ErrorMessage;

            } else if (this.state.proteinRange_To_inputField_Value_ErrorMessage) {

                inputPositionsErrorMessage_InnerPart = (

                    <span>
                        To: {this.state.proteinRange_From_inputField_Value_ErrorMessage}
                    </span>
                );
                inputPositionsErrorMessage_String = "To: " + this.state.proteinRange_From_inputField_Value_ErrorMessage;

            } else if (this.state.proteinRange_Overall_ErrorMessage) {

                const msg = this.state.proteinRange_Overall_ErrorMessage;

                inputPositionsErrorMessage_InnerPart = (

                    <span>
                        { msg }
                    </span>
                );
                inputPositionsErrorMessage_String = msg;
            }
            if ( inputPositionsErrorMessage_InnerPart ) {

                inputPositionsErrorMessage_JSX = (
                    <span style={ {paddingLeft: 8, color: "red" } }>
                        { inputPositionsErrorMessage_InnerPart }
                    </span>
                )
            }
        }

        let add_ButtonDisabled = false;
        if ( inputPositionsErrorMessage_JSX ) {
            add_ButtonDisabled = true;
        }

        return (

            <React.Fragment>
                { ( ! have_proteins_Names_Lengths_Entries ) ? (
                    <div >No Data</div>
                ) : (
                    <React.Fragment>
                        <div style={ { display: "grid", gridTemplateColumns: "min-content min-content" } }>
                            <div >
                                <div style={ { whiteSpace: "nowrap" } }>
                                    Select a protein:
                                </div>
                                <div >
                                    <select ref={ this._proteinSelect_Ref }
                                            value={ this.state.selected_ProteinSequenceVersionId }
                                            title={ selectProtein_TitleAttr }
                                            onChange={ this._proteinSelectChanged_BindThis }
                                    >
                                        { proteinSelectEntries }
                                    </select>
                                </div>
                                <div style={ { marginTop: 4 } }>
                                    <div style={ { display: "inline-block", position: "relative" } }>
                                        <input type="button" value="Add"
                                               disabled={ add_ButtonDisabled }
                                               onClick={ this._add_Button_Clicked_BindThis }
                                        />
                                        { ( inputPositionsErrorMessage_String ) ? (
                                            <div style={ { position: "absolute", left: 0, right: 0, top: 0, bottom: 0 } }
                                                title={ inputPositionsErrorMessage_String }
                                            >
                                            </div>
                                        ) : null }
                                    </div>
                                    <input type="button" value="Close"
                                           style={ { marginLeft: 5 }}
                                           onClick={ this._close_Button_Clicked_BindThis }
                                    />
                                </div>
                            </div>
                            <div style={ { paddingLeft: 10 } }>
                                <div style={ { whiteSpace: "nowrap" } }>
                                    <span>Positions:</span>
                                    <span style={ { fontSize: 10, paddingLeft: 3 } }>
                                        (protein length: { this.state.selected_Proteins_Names_Lengths_Entry.proteinLength })
                                    </span>
                                </div>
                                <div style={ { whiteSpace: "nowrap" } }>
                                    <SingleRange_Entry_From_or_To_InputField
                                        rangeValue_FromParentComponent={ this.state.proteinRange_From_inputField_Value }
                                        selected_Proteins_Names_Lengths_Entry={ this.state.selected_Proteins_Names_Lengths_Entry }
                                        inputField_Changed_NewValue_Callback={ this._proteinRange_From_inputField_Changed_NewValue_BindThis }
                                        inputField_Changed_ErrorMessage_Callback={ this._proteinRange_From_inputField_Changed_ErrorMessage_BindThis }
                                    />
                                    <span style={ { paddingLeft: 8, paddingRight: 8 }}>
                                        to
                                    </span>
                                    <SingleRange_Entry_From_or_To_InputField
                                        rangeValue_FromParentComponent={ this.state.proteinRange_To_inputField_Value }
                                        selected_Proteins_Names_Lengths_Entry={ this.state.selected_Proteins_Names_Lengths_Entry }
                                        inputField_Changed_NewValue_Callback={ this._proteinRange_To_inputField_Changed_NewValue_BindThis }
                                        inputField_Changed_ErrorMessage_Callback={ this._proteinRange_To_inputField_Changed_ErrorMessage_BindThis }
                                    />
                                    { inputPositionsErrorMessage_JSX }
                                </div>
                                <div style={ { fontSize: 10, paddingTop: 2 } }>
                                    <div style={ { whiteSpace: "nowrap"} }>
                                        Enter same number twice
                                    </div>
                                    <div style={ { whiteSpace: "nowrap"} }>
                                        to select single position.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                ) }
            </React.Fragment>
        )
    }
}

/////////////

class SingleRange_Entry_From_or_To_InputField_Changed_NewValue_Callback_Params {
    newValue : number
}
type SingleRange_Entry_From_or_To_InputField_Changed_NewValue_Callback_Type = ( params : SingleRange_Entry_From_or_To_InputField_Changed_NewValue_Callback_Params ) => void;

class SingleRange_Entry_From_or_To_InputField_Changed_ErrorMessage_Callback_Params {
    errorMessage : string
}
type SingleRange_Entry_From_or_To_InputField_Changed_ErrorMessage_Callback_Type = ( params : SingleRange_Entry_From_or_To_InputField_Changed_ErrorMessage_Callback_Params ) => void;

/**
 *
 */
interface SingleRange_Entry_From_or_To_InputField_Props {

    rangeValue_FromParentComponent : number
    selected_Proteins_Names_Lengths_Entry : ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data_Entry
    inputField_Changed_NewValue_Callback : SingleRange_Entry_From_or_To_InputField_Changed_NewValue_Callback_Type
    inputField_Changed_ErrorMessage_Callback : SingleRange_Entry_From_or_To_InputField_Changed_ErrorMessage_Callback_Type
}

interface SingleRange_Entry_From_or_To_InputField_State {

    current_inputField_Value_String? : string
    current_inputField_Value_Is_Error? : boolean
    current_inputField_Value_Is_Error_Message? : string

    prev_initialRangeValue? : number
}


/**
 *
 */
class SingleRange_Entry_From_or_To_InputField extends React.Component< SingleRange_Entry_From_or_To_InputField_Props, SingleRange_Entry_From_or_To_InputField_State > {

    private _inputField_Changed_BindThis = this._inputField_Changed.bind(this);

    private _inputField_Ref: React.RefObject<HTMLInputElement>

    /**
     *
     */
    constructor(props: SingleRange_Entry_From_or_To_InputField_Props) {
        super(props);

        this._inputField_Ref = React.createRef<HTMLInputElement>();

        this.state = {
            current_inputField_Value_String : props.rangeValue_FromParentComponent.toString(),
            current_inputField_Value_Is_Error : false,
            current_inputField_Value_Is_Error_Message : null,

            prev_initialRangeValue : props.rangeValue_FromParentComponent
        };
    }

    /**
     * Must be Static
     * Called before
     *   Initial render: 'render()'
     *   Rerender : 'shouldComponentUpdate()'
     *
     * Return new state (like return from setState(callback)) or null
     */
    static getDerivedStateFromProps(props: SingleRange_Entry_From_or_To_InputField_Props, state: SingleRange_Entry_From_or_To_InputField_State): SingleRange_Entry_From_or_To_InputField_State {

        // console.log("called: static getDerivedStateFromProps(): " );

        //    Return new state (like return from setState(callback)) or null

        if ( props.rangeValue_FromParentComponent !== state.prev_initialRangeValue ) {

            props.inputField_Changed_NewValue_Callback({ newValue : props.rangeValue_FromParentComponent });
            props.inputField_Changed_ErrorMessage_Callback({ errorMessage: null });

            return {
                current_inputField_Value_String : props.rangeValue_FromParentComponent.toString(),
                current_inputField_Value_Is_Error : false,
                current_inputField_Value_Is_Error_Message: null,
                prev_initialRangeValue : props.rangeValue_FromParentComponent
            };
        }

        return null;
    }

    /**
     *
     * @param event
     */
    _inputField_Changed(event: React.MouseEvent<HTMLInputElement, MouseEvent>) {
        try {
            const current_inputField_Value_String = this._inputField_Ref.current.value;  //  New Value

            let current_inputField_Value_Number = null; // Only set when current_inputField_Value_String is a valid value
            let new_errorMessage: string = null;

            if ( current_inputField_Value_String.length < 1 ) {

                new_errorMessage = "A Value is Required";

            } else if(!(/^\d+$/.test(current_inputField_Value_String))) {

                new_errorMessage = "Not a valid number";

            } else {

                current_inputField_Value_Number = Number.parseInt( current_inputField_Value_String );

                if ( Number.isNaN( current_inputField_Value_Number ) ) {

                    new_errorMessage = "Not a valid value";
                    current_inputField_Value_Number = null;
                }
            }
            if ( current_inputField_Value_Number !== null ) {
                if ( current_inputField_Value_Number > this.props.selected_Proteins_Names_Lengths_Entry.proteinLength ) {

                    new_errorMessage = "Cannot be greater than protein length";
                    current_inputField_Value_Number = null;
                }
            }

            let current_inputField_Value_Is_Error = false;
            if ( new_errorMessage ) {
                current_inputField_Value_Is_Error = true;
            }

            this.setState((state: SingleRange_Entry_From_or_To_InputField_State, props: SingleRange_Entry_From_or_To_InputField_Props): SingleRange_Entry_From_or_To_InputField_State => {

                return { current_inputField_Value_String, current_inputField_Value_Is_Error, current_inputField_Value_Is_Error_Message: new_errorMessage };
            });

            //  Always call since need to call with value of null to clear prev error message
            this.props.inputField_Changed_ErrorMessage_Callback({errorMessage: new_errorMessage});

            if ( current_inputField_Value_Number !== undefined && current_inputField_Value_Number !== null ) {
                //  Only update when have a new value
                this.props.inputField_Changed_NewValue_Callback({ newValue : current_inputField_Value_Number });
            }

        } catch (e) {
            reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
            throw e;
        }
    }

    /**
     *
     */
    render() {

        const inputFieldStyle : React.CSSProperties = { width: 50 };

        if ( this.state.current_inputField_Value_Is_Error_Message ) {
            inputFieldStyle.backgroundColor = "#FFCCCC";
        }

        return (
            <input ref={ this._inputField_Ref }
                   type="text"
                   style={ inputFieldStyle }
                   value={ this.state.current_inputField_Value_String }
                   title={ this.state.current_inputField_Value_Is_Error_Message }
                   onChange={ this._inputField_Changed_BindThis }
            />
        );
    }
}