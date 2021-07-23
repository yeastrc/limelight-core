/**
 * ProteinPositionFilter_UserInput__Component.tsx
 *
 *  Protein Position Filter:  Component for user to add/change filters
 *
 *
 *  (See proteinPositionFilter_UserSelections_Component.tsx for ideas)
 */

import React from 'react'
import {
    ProteinPositionFilter_UserInput__Component__UserSelectionData_Root,
    ProteinPositionFilter_UserInput__Component__UserSelectionData_SingleProtein,
    ProteinPositionFilter_UserInput__Component__UserSelectionData_SingleRange
} from "./proteinPositionFilter_UserInput__Component__UserSelectionData";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {
    ProteinPositionFilter_UserInput__Component__ProteinData_Root,
    ProteinPositionFilter_UserInput__Component__ProteinData_SingleProtein
} from "page_js/data_pages/common_components__react/protein_position_filter_component__not_single_protein/protein_position_filter__user_input_component/proteinPositionFilter_UserInput__Component__ProteinData";
import {
    get_proteinSelection_Generic__UserInputOverlay_Component,
    ProteinSelection_Generic__UserInputOverlay_Save_CallbackFunction_Params
} from "page_js/data_pages/common_components__react/protein_selection_generic_component/proteinSelection_Generic__UserInputOverlay";
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
import {
    ProteinSelection_Generic__ProteinData_Root,
    ProteinSelection_Generic__ProteinData_SingleProtein
} from "page_js/data_pages/common_components__react/protein_selection_generic_component/proteinSelection_Generic__ProteinData";
import {ProteinSelection_Generic__UserSelectionData_Root} from "page_js/data_pages/common_components__react/protein_selection_generic_component/proteinSelection_Generic__UserSelectionData";
import {
    tooltip_Limelight_Create_Tooltip,
    Tooltip_Limelight_Created_Tooltip
} from "page_js/common_all_pages/tooltip_LimelightLocal_ReactBased";


////  React Components

export class ProteinPositionFilter_UserInputOverlay__MainOverlay_Save_CallbackFunction_Params {
    userSelections: ProteinPositionFilter_UserInput__Component__UserSelectionData_Root
}

export type ProteinPositionFilter_UserInputOverlay__MainOverlay_Save_CallbackFunction =
    ( params: ProteinPositionFilter_UserInputOverlay__MainOverlay_Save_CallbackFunction_Params ) => void;

/**
 *
 */
export interface ProteinPositionFilter_UserInput__Component_Props {

    proteinData: ProteinPositionFilter_UserInput__Component__ProteinData_Root
    userSelections: ProteinPositionFilter_UserInput__Component__UserSelectionData_Root
    callbackOn_Save_Clicked: ProteinPositionFilter_UserInputOverlay__MainOverlay_Save_CallbackFunction
}

/**
 *
 */
interface ProteinPositionFilter_UserInput__Component_State {

    userSelections_Map_Key_proteinSequenceVersionId?: Map<number, ProteinPositionFilter_UserInput__Component__UserSelectionData_SingleProtein>

    objectForceRerender?: object
    disable_SaveButton?: boolean
    prev_proteinData?: ProteinPositionFilter_UserInput__Component__ProteinData_Root
    prev_userSelections?: ProteinPositionFilter_UserInput__Component__UserSelectionData_Root
}

/**
 *
 */
export class ProteinPositionFilter_UserInput__Component extends React.Component< ProteinPositionFilter_UserInput__Component_Props, ProteinPositionFilter_UserInput__Component_State > {

    private _addRange_SaveCallback_BindThis = this._addRange_SaveCallback.bind(this);

    private _DO_NOT_CALL_BoundMethods_TypeTest() { // Function only to test that methods that are .bind(this) are correct function signature

        const _addRange_SaveCallback_BindThis : ProteinPositionFilter_UserInputOverlay__AddRange_SaveCallback = this._addRange_SaveCallback
    }

    private _userSelections_Changed: boolean = false;

    private _addRange_ProteinSequenceVersionIds_Set: Set<number> = new Set<number>();

    /**
     *
     */
    constructor(props: ProteinPositionFilter_UserInput__Component_Props) {
        super(props);

        this.state = {
            disable_SaveButton: true,
            objectForceRerender: {}
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
    static getDerivedStateFromProps(props: ProteinPositionFilter_UserInput__Component_Props, state: ProteinPositionFilter_UserInput__Component_State): ProteinPositionFilter_UserInput__Component_State {

        if ( props.userSelections !== state.prev_userSelections
            || props.proteinData !== state.prev_proteinData ) {

            const userSelections_Map_Key_proteinSequenceVersionId = _copy_UserSelectionsToLocal({ userSelections: props.userSelections, proteinData: props.proteinData });

            return {
                userSelections_Map_Key_proteinSequenceVersionId,
                prev_userSelections: props.userSelections,
                prev_proteinData: props.proteinData
            }
        }

        return null;
    }

    /**
     *
     */
    private _call__Save_CallbackFunction() {

        const result_proteins: Array<ProteinPositionFilter_UserInput__Component__UserSelectionData_SingleProtein> = [];

        for ( const userSelections_MapEntry of this.state.userSelections_Map_Key_proteinSequenceVersionId.entries() ) {

            const userSelection_SingleProtein_FromMap = userSelections_MapEntry[ 1 ];

            const result_SingleProtein = userSelection_SingleProtein_FromMap.clone();

            result_proteins.push( result_SingleProtein );
        }

        const userSelections = new ProteinPositionFilter_UserInput__Component__UserSelectionData_Root();
        userSelections.proteins = result_proteins;

        const saveParams: ProteinPositionFilter_UserInputOverlay__MainOverlay_Save_CallbackFunction_Params = {
            userSelections
        };

        this.props.callbackOn_Save_Clicked( saveParams );
    }

    /**
     *
     */
    private _removeProteinFromSelection_Button_Clicked({ proteinSequenceVersionId } : { proteinSequenceVersionId: number }) {

        this.state.userSelections_Map_Key_proteinSequenceVersionId.delete( proteinSequenceVersionId );
        this._userSelections_Changed = true;

        this.setState({ objectForceRerender: {} });

        this._call__Save_CallbackFunction();
    }

    /**
     *
     */
    private _removeProteinRangeFromSelection_Button_Clicked(
        {
            proteinSequenceVersionId, start, end
        } : {
            proteinSequenceVersionId: number
            start: number
            end: number
        }) {

        const userSelection_SingleProtein = this.state.userSelections_Map_Key_proteinSequenceVersionId.get( proteinSequenceVersionId );
        if ( ! userSelection_SingleProtein ) {
            // already deleted
            return; // EARLY RETURN
        }

        if ( ! userSelection_SingleProtein.ranges ) {
            // No Ranges
            return; // EARLY RETURN
        }

        //  delete the range
        userSelection_SingleProtein.ranges = userSelection_SingleProtein.ranges.filter((range, index) => {
            if ( range.start === start && range.end === end ) {
                return false; // Remove from copy
            }
            return true;
        })

        if ( userSelection_SingleProtein.ranges.length === 0 ) {
            //  NO entries so remove
            userSelection_SingleProtein.ranges = undefined;
        }

        this._userSelections_Changed = true;

        this.setState({ objectForceRerender: {} });

        this._call__Save_CallbackFunction();
    }

    /**
     *
     */
    private _addRange_SaveCallback( params: ProteinPositionFilter_UserInputOverlay__AddRange_SaveCallback_Params ) : void {

        this._userSelections_Changed = true;

        this.setState({ objectForceRerender: {} });

        const proteinSequenceVersionId = params.proteinData_SingleProtein.proteinSequenceVersionId;
        const new_rangeStart = params.start;
        const new_rangeEnd = params.end;

        const userSelection_For_proteinSequenceVersionId = this.state.userSelections_Map_Key_proteinSequenceVersionId.get( proteinSequenceVersionId );
        if ( ! userSelection_For_proteinSequenceVersionId ) {
            const msg = "this.state.userSelections_Map_Key_proteinSequenceVersionId.get( proteinSequenceVersionId ); returned nothing in _addRange_SaveCallback. proteinSequenceVersionId: " + proteinSequenceVersionId;
            console.warn(msg);
            throw Error(msg);
        }

        let proteinLength : number = null;
        {
            for ( const protein of this.props.proteinData.proteins ) {
                if ( protein.proteinSequenceVersionId === proteinSequenceVersionId ) {
                    proteinLength = protein.proteinLength;
                    break;
                }
            }
            if ( ! proteinLength ) {
                const msg = "this.props.proteinData.proteins not found for proteinSequenceVersionId: " + proteinSequenceVersionId;
                console.warn(msg);
                throw Error(msg);
            }
        }

        if ( params.start === 1 && params.end === proteinLength ) {
            //  New selection is full protein so set and exit

            userSelection_For_proteinSequenceVersionId.ranges = null;

            this._call__Save_CallbackFunction();

            return; // EARLY RETURN
        }

        const ranges_Existing = userSelection_For_proteinSequenceVersionId.ranges;
        if ( ! ranges_Existing ) {
            //  No existing ranges to add and exit

            const rangeEntry = new ProteinPositionFilter_UserInput__Component__UserSelectionData_SingleRange();
            rangeEntry.start = new_rangeStart;
            rangeEntry.end = new_rangeEnd;

            userSelection_For_proteinSequenceVersionId.ranges = [];
            userSelection_For_proteinSequenceVersionId.ranges.push( rangeEntry );

            this._call__Save_CallbackFunction();

            return; // EARLY RETURN
        }

        //  Merge new selection range into existing ranges

        //  Create Array of boolean using position as index
        const selectedPositions_IndexIsPosition = new Array<boolean>();

        //  Copy in existing ranges
        for ( const rangeEntry_Existing of ranges_Existing ) {
            for ( let position = rangeEntry_Existing.start; position <= rangeEntry_Existing.end; position++ ) {
                selectedPositions_IndexIsPosition[ position ] = true;
            }
        }
        //  Add in new selection
        for ( let position = new_rangeStart; position <= new_rangeEnd; position++ ) {
            selectedPositions_IndexIsPosition[ position ] = true;
        }

        //  From Array of boolean, create new ranges

        const ranges_New : Array<ProteinPositionFilter_UserInput__Component__UserSelectionData_SingleRange> = [];
        const proteinLength_Plus_3 = proteinLength + 3;  //  Loop longer to output final range which may run to end of protein length
        let rangeStart = null;
        let rangeEnd = null;
        for ( let position = 1; position <= proteinLength_Plus_3; position++ ) {

            if ( selectedPositions_IndexIsPosition[ position ] ) {
                if ( rangeStart === null ) {
                    rangeStart = position;
                }
                rangeEnd = position
            } else {
                if ( rangeStart !== null ) {
                    //  save range.  position loop to > proteinLength so this will trigger for range that extends to proteinLength

                    const newRange = new ProteinPositionFilter_UserInput__Component__UserSelectionData_SingleRange()
                    newRange.start = rangeStart;
                    newRange.end = rangeEnd;
                    ranges_New.push( newRange );

                    rangeStart = null;
                    rangeEnd = null;
                }
            }
        }

        if ( ranges_New.length === 1 ) {
            //  Results in only 1 range
            const newRange = ranges_New[ 0 ];
            if ( newRange.start === 1 && newRange.end === proteinLength ) {
                //  Full Protein is selected.  Set and Exit

                userSelection_For_proteinSequenceVersionId.ranges = null;

                return; // EARLY RETURN

                this._call__Save_CallbackFunction();
            }
        }

        userSelection_For_proteinSequenceVersionId.ranges = ranges_New;

        this._call__Save_CallbackFunction();
    }

    /**
     *
     */
    private _open__ProteinSelection_Overlay() {

        const proteinData = new ProteinSelection_Generic__ProteinData_Root();
        const existing_userSelections = new ProteinSelection_Generic__UserSelectionData_Root();

        {
            const proteins: Array<ProteinSelection_Generic__ProteinData_SingleProtein> = [];
            proteinData.proteins = proteins;

            for ( const proteinParam of this.props.proteinData.proteins ) {
                const protein = new ProteinSelection_Generic__ProteinData_SingleProtein();
                protein.proteinSequenceVersionId = proteinParam.proteinSequenceVersionId;
                protein.proteinName = proteinParam.proteinName;
                protein.proteinDescription = proteinParam.proteinDescription;

                proteins.push( protein );
            }

            const selected_proteinSequenceVersionId = new Set<number>()
            existing_userSelections.selected_proteinSequenceVersionId = selected_proteinSequenceVersionId;

            for ( const mapEntry of this.state.userSelections_Map_Key_proteinSequenceVersionId.entries() ) {
                const mapValue = mapEntry[1];
                selected_proteinSequenceVersionId.add( mapValue.proteinSequenceVersionId );
            }
        }

        let overlay_AddedTo_DocumentBody_Holder : Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF = undefined;

        const callbackOn_Cancel_Close_Clicked = () : void => {

            overlay_AddedTo_DocumentBody_Holder.removeContents_AndContainer_FromDOM()
        }

        const callbackOn_Save_Clicked = ( params: ProteinSelection_Generic__UserInputOverlay_Save_CallbackFunction_Params ) => {

            overlay_AddedTo_DocumentBody_Holder.removeContents_AndContainer_FromDOM()

            this._update_userSelections_Map_From_SelectProteinsCallback( params );
        }

        const overlayComponent = get_proteinSelection_Generic__UserInputOverlay_Component({
            proteinData, existing_userSelections,
            callback_GetProteinTooltipContents : undefined,
            callbackOn_Cancel_Close_Clicked,
            callbackOn_Save_Clicked
        });

        overlay_AddedTo_DocumentBody_Holder = limelight_add_ReactComponent_JSX_Element_To_DocumentBody({ componentToAdd : overlayComponent });

    }

    /**
     * Called from Protein Selection Overlay with new/updated Protein Selection
     */
    private _update_userSelections_Map_From_SelectProteinsCallback( params: ProteinSelection_Generic__UserInputOverlay_Save_CallbackFunction_Params ) {

        const new_selected_proteinSequenceVersionId_Entries = params.new_userSelections.selected_proteinSequenceVersionId;

        //  Remove any existing selections that NOT in the passed in selections
        {
            const existingSelected_proteinSequenceVersionId_Entries = new Set( this.state.userSelections_Map_Key_proteinSequenceVersionId.keys() );
            for ( const existingSelected_proteinSequenceVersionId_Entry of existingSelected_proteinSequenceVersionId_Entries ) {
                if ( ! new_selected_proteinSequenceVersionId_Entries.has( existingSelected_proteinSequenceVersionId_Entry ) ) {
                    //  NOT in new entries list so remove
                    this.state.userSelections_Map_Key_proteinSequenceVersionId.delete( existingSelected_proteinSequenceVersionId_Entry );
                }
            }
        }
        //  Add any new selected that is not in existing selections, whole protein selected
        {
            for ( const new_selected_proteinSequenceVersionId_Entry of new_selected_proteinSequenceVersionId_Entries ) {
                if ( ! this.state.userSelections_Map_Key_proteinSequenceVersionId.has( new_selected_proteinSequenceVersionId_Entry ) ) {
                    //  new selected not in existing so add
                    const new_userSelection = new ProteinPositionFilter_UserInput__Component__UserSelectionData_SingleProtein();
                    new_userSelection.proteinSequenceVersionId = new_selected_proteinSequenceVersionId_Entry;
                    this.state.userSelections_Map_Key_proteinSequenceVersionId.set( new_userSelection.proteinSequenceVersionId, new_userSelection );
                }
            }
        }

        // Force re-render
        this.setState({ objectForceRerender: {}})

        this._call__Save_CallbackFunction();
    }

    /**
     *
     */
    render() {

        let noFiltersMsg : JSX.Element = null;
        let current_SelectedProteinsAndTheirRanges : JSX.Element = null;

        if ( this.state.userSelections_Map_Key_proteinSequenceVersionId.size === 0 ) {

            noFiltersMsg = (

                <div style={ { marginBottom: 6 } }>
                    <span className=" filter-single-value-display-block ">
                        Currently not filtering on protein positions
                    </span>
                </div>
            )
        } else {

            current_SelectedProteinsAndTheirRanges = this._render_SelectedProteinsAndTheirRanges();
        }

        return (

            <React.Fragment>
                {/* ONLY One of these will be populated */}
                { noFiltersMsg }
                <div style={ { marginBottom: 10 } }>
                    <button
                        onClick={ event => {
                            this._open__ProteinSelection_Overlay()
                        }  }
                    >
                        Add Protein
                    </button>
                </div>
                { current_SelectedProteinsAndTheirRanges }

            </React.Fragment>
        );
    }

    /**
     *
     */
    private _render_SelectedProteinsAndTheirRanges() : JSX.Element {

        if ( this.state.userSelections_Map_Key_proteinSequenceVersionId.size === 0 ) {
            //  NO Selected Proteins
            return null; // EARLY RETURN
        }

        const bottomMargin = 5; // Separate entries and also make room for buttons

        const proteinDisplayEntries : Array<JSX.Element> = [];

        for ( const protein of this.props.proteinData.proteins ) {

            if ( ! this.state.userSelections_Map_Key_proteinSequenceVersionId.has( protein.proteinSequenceVersionId ) ) {
                //  Skip protein if NOT selected
                continue; // EARLY CONTINUE
            }

            const userSelection_SingleProtein = this.state.userSelections_Map_Key_proteinSequenceVersionId.get( protein.proteinSequenceVersionId );
            if ( ! userSelection_SingleProtein ) {
                //  SHOULD NOT ERROR since already ".filter"
                const msg = "this.state.userSelections_Map_Key_proteinSequenceVersionId.get( protein.proteinSequenceVersionId ); returned nothing";
                console.warn(msg);
                throw Error(msg);
            }


            let fullProteinMsg : JSX.Element = null;
            let rangeDisplay : JSX.Element = null;

            if ( ! userSelection_SingleProtein.ranges ) {

                fullProteinMsg = (
                    <React.Fragment>
                        <div >
                            <span style={ { marginRight: 10 } }>
                                Full protein
                            </span>
                            {( ! this._addRange_ProteinSequenceVersionIds_Set.has( protein.proteinSequenceVersionId ) ) ? (
                                <span
                                    className=" fake-link "
                                    style={ { whiteSpace: "nowrap" } }
                                    onClick={event => {
                                        event.stopPropagation();
                                        this._addRange_ProteinSequenceVersionIds_Set.add(protein.proteinSequenceVersionId);
                                        this.setState({objectForceRerender: {}});
                                    }}
                                >
                                    Enter Range
                                </span>
                            ) : null}
                        </div>
                    </React.Fragment>
                );

            } else {

                rangeDisplay = (
                    <div style={ { position: "relative", top: -3, lineHeight: "1.7em" } }>
                        { this._render_rangeDisplayArray({ userSelection_SingleProtein, protein }) }
                    </div>
                );
            }

            const proteinDisplayEntry = (
                <React.Fragment key={ protein.proteinSequenceVersionId }>

                    <div style={ { marginBottom: bottomMargin } }>
                        <img
                            style={ { marginRight: 10 } }
                            className="icon-small clickable "
                            src="static/images/icon-circle-delete.png"
                            onClick={ event => {
                                event.stopPropagation();
                                this._removeProteinFromSelection_Button_Clicked({ proteinSequenceVersionId: protein.proteinSequenceVersionId });
                            }}
                        />
                    </div>

                    {/*  Protein Name  */}
                    <div style={ { marginBottom: bottomMargin, maxWidth: 350, marginRight: 20, wordBreak: "break-word" } }>
                        <span style={ { overflowWrap: "break-word" } }>
                            <ProteinName_Component
                                protein={ protein }
                            />
                        </span>
                    </div>

                    {/*   Protein Positions Label   */}
                    <div style={ { marginBottom: bottomMargin } }>
                        <span style={ { marginRight: 5 } }>
                            Positions:
                        </span>
                    </div>

                    {/*   Protein Positions   : Not needed marginBottom: bottomMargin,    */}
                    <div style={ { maxWidth: 250 } }>

                        {/* ONLY One of these will be populated */}
                        { fullProteinMsg }
                        { rangeDisplay }

                        { ( this._addRange_ProteinSequenceVersionIds_Set.has(protein.proteinSequenceVersionId) ) ? (
                            <div
                                style={
                                    ( rangeDisplay ) ? (
                                        //  Have ranges display so change formatting
                                        {
                                            position: "relative", top: -3, marginBottom: 5
                                        }
                                    ) : null }
                            >
                                <ProteinPositionFilter_UserInputOverlay__AddRange_Component
                                    proteinData_SingleProtein={ protein }
                                    addRange_SaveCallback={ this._addRange_SaveCallback_BindThis }
                                    close_Add_ProteinRange_Clicked={ () => {
                                        this._addRange_ProteinSequenceVersionIds_Set.delete( protein.proteinSequenceVersionId );
                                        this.setState({ objectForceRerender: {} });
                                    } }
                                />
                            </div>

                        ) : null }
                    </div>
                </React.Fragment>
            );

            proteinDisplayEntries.push( proteinDisplayEntry );
        }

        return (

            <div>
                <div style={ { marginBottom: 10 } }>
                    Current protein filters:
                </div>

                <div
                    style={
                        {
                            marginLeft: 10,
                            display: "grid", gridTemplateColumns: "min-content max-content min-content max-content"
                        }
                    }
                >

                    {/*  4 Column CSS Grid   <delete icon>  <Protein Name> <"Positions:" label>   <Protein Positions>     */}

                    { proteinDisplayEntries }
                </div>
            </div>
        )

    }

    /**
     *
     */
    private _render_rangeDisplayArray(
        {
            userSelection_SingleProtein,
            protein
        } : {
            userSelection_SingleProtein: ProteinPositionFilter_UserInput__Component__UserSelectionData_SingleProtein
            protein: ProteinPositionFilter_UserInput__Component__ProteinData_SingleProtein

        }) : Array<JSX.Element> {

        const rangeDisplayArray : Array<JSX.Element> = [];

        for ( const range of userSelection_SingleProtein.ranges ) {

            const rangeDisplay = (
                <React.Fragment key={range.start + "-" + range.end}>
                    <span
                        className="  filter-single-value-display-block  clickable  "
                        style={{ whiteSpace: "nowrap", marginRight: 6 }}
                    >
                        <span style={{
                            marginRight: 2
                        }}>
                            {range.start}-{range.end}
                        </span>
                        <img
                            className="icon-small clickable "
                            src="static/images/icon-circle-delete.png"
                            onClick={event => {
                                event.stopPropagation();
                                this._removeProteinRangeFromSelection_Button_Clicked({
                                    proteinSequenceVersionId: protein.proteinSequenceVersionId,
                                    start: range.start,
                                    end: range.end
                                });
                            }}
                        />
                    </span>
                </React.Fragment>
            );

            rangeDisplayArray.push( rangeDisplay );
        }

        {

            if ( ! this._addRange_ProteinSequenceVersionIds_Set.has( protein.proteinSequenceVersionId ) ) {

                const addRangeFakeLink = (
                    <span
                        key="Add_Range_Button"
                        className=" fake-link "
                        style={{whiteSpace: "nowrap"}}
                        onClick={event => {
                            event.stopPropagation();
                            this._addRange_ProteinSequenceVersionIds_Set.add(protein.proteinSequenceVersionId);
                            this.setState({objectForceRerender: {}});
                        }}
                    >
                        Add Range
                    </span>
                )
                rangeDisplayArray.push(addRangeFakeLink);
            }
        }


        return rangeDisplayArray
    }
}

////////////

interface ProteinPositionFilter_UserInputOverlay__AddRange_SaveCallback_Params {
    proteinData_SingleProtein: ProteinPositionFilter_UserInput__Component__ProteinData_SingleProtein
    start: number
    end: number
}

type ProteinPositionFilter_UserInputOverlay__AddRange_SaveCallback =
    ( params: ProteinPositionFilter_UserInputOverlay__AddRange_SaveCallback_Params ) => void;

/**
 *
 */
interface ProteinPositionFilter_UserInputOverlay__AddRange_Component_Props {

    proteinData_SingleProtein: ProteinPositionFilter_UserInput__Component__ProteinData_SingleProtein

    close_Add_ProteinRange_Clicked : () => void
    addRange_SaveCallback: ProteinPositionFilter_UserInputOverlay__AddRange_SaveCallback
}

/**
 *
 */
interface ProteinPositionFilter_UserInputOverlay__AddRange_Component_State {

    proteinRange_From_inputField_Value? : number                    // !! Not Current if ...inputField_Changed_NewValue_Callback is NOT null
    proteinRange_From_inputField_Value_ErrorMessage? : string
    proteinRange_To_inputField_Value? : number                      // !! Not Current if ...inputField_Changed_NewValue_Callback is NOT null
    proteinRange_To_inputField_Value_ErrorMessage? : string

    proteinRange_Overall_ErrorMessage? : string //  From comparing the 2 values
}


/**
 *
 */
class ProteinPositionFilter_UserInputOverlay__AddRange_Component extends React.Component< ProteinPositionFilter_UserInputOverlay__AddRange_Component_Props, ProteinPositionFilter_UserInputOverlay__AddRange_Component_State > {

    private _add_Button_Clicked_BindThis = this._add_Button_Clicked.bind(this);
    private _close_Button_Clicked_BindThis = this._close_Button_Clicked.bind(this);

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

    private _proteinRange_From_inputField_Value : number  // !! Not Current if ...inputField_Changed_NewValue_Callback is NOT null
    private _proteinRange_To_inputField_Value : number    // !! Not Current if ...inputField_Changed_NewValue_Callback is NOT null
    private _proteinRange_From_inputField_Value_ErrorMessage : string
    private _proteinRange_To_inputField_Value_ErrorMessage : string
    private _proteinRange_Overall_ErrorMessage : string //  From comparing the 2 values

    /**
     *
     */
    constructor(props: ProteinPositionFilter_UserInputOverlay__AddRange_Component_Props) {
        super(props);

        const proteinRange_From_inputField_Value = 1;
        const proteinRange_To_inputField_Value = props.proteinData_SingleProtein.proteinLength;

        this.state = {
            proteinRange_From_inputField_Value,
            proteinRange_To_inputField_Value,
        };
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

            this.props.addRange_SaveCallback({
                proteinData_SingleProtein: this.props.proteinData_SingleProtein,
                start : this.state.proteinRange_From_inputField_Value,
                end : this.state.proteinRange_To_inputField_Value
            });

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
    private _proteinRange_From_inputField_Changed_NewValue( params : SingleRange_Entry_From_or_To_InputField_Changed_NewValue_Callback_Params ) : void {
        try {
            this.setState({ proteinRange_From_inputField_Value : params.newValue });
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

            this.setState({ proteinRange_From_inputField_Value_ErrorMessage: params.errorMessage });
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
            this.setState({ proteinRange_To_inputField_Value : params.newValue });
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

            this.setState({ proteinRange_To_inputField_Value_ErrorMessage: params.errorMessage });
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

                this.setState({proteinRange_Overall_ErrorMessage });
                this._proteinRange_Overall_ErrorMessage = proteinRange_Overall_ErrorMessage
            } else {
                this.setState((state: ProteinPositionFilter_UserInputOverlay__AddRange_Component_State, props: ProteinPositionFilter_UserInputOverlay__AddRange_Component_Props): ProteinPositionFilter_UserInputOverlay__AddRange_Component_State => {

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

    render() {

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
                        To: {this.state.proteinRange_To_inputField_Value_ErrorMessage}
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
                    <span style={ { color: "red" } }>
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

            <div>
                <div style={ { whiteSpace: "nowrap" } }>
                    <span>New Range:</span>
                    <span style={ { fontSize: 10, paddingLeft: 3 } }>
                        (protein length: { this.props.proteinData_SingleProtein.proteinLength })
                    </span>
                </div>
                <div style={ { whiteSpace: "nowrap" } }>
                    <SingleRange_Entry_From_or_To_InputField
                        rangeValue_FromParentComponent={ this.state.proteinRange_From_inputField_Value }
                        proteinLength={ this.props.proteinData_SingleProtein.proteinLength }
                        inputField_Changed_NewValue_Callback={ this._proteinRange_From_inputField_Changed_NewValue_BindThis }
                        inputField_Changed_ErrorMessage_Callback={ this._proteinRange_From_inputField_Changed_ErrorMessage_BindThis }
                    />
                    <span style={ { paddingLeft: 8, paddingRight: 8 }}>
                        to
                    </span>
                    <SingleRange_Entry_From_or_To_InputField
                        rangeValue_FromParentComponent={ this.state.proteinRange_To_inputField_Value }
                        proteinLength={ this.props.proteinData_SingleProtein.proteinLength }
                        inputField_Changed_NewValue_Callback={ this._proteinRange_To_inputField_Changed_NewValue_BindThis }
                        inputField_Changed_ErrorMessage_Callback={ this._proteinRange_To_inputField_Changed_ErrorMessage_BindThis }
                    />
                </div>
                { ( inputPositionsErrorMessage_JSX ) ? (
                    <div >
                        { inputPositionsErrorMessage_JSX }
                    </div>
                ) : null}
                <div style={ { fontSize: 10, paddingTop: 2 } }>
                    <div style={ { whiteSpace: "nowrap"} }>
                        Enter same number twice to select single position.
                    </div>
                </div>
                <div >
                    <button
                        disabled={ add_ButtonDisabled }
                        onClick={ this._add_Button_Clicked_BindThis }
                    >
                        Add Range
                    </button>
                    <span> </span>
                    <button
                        onClick={ this._close_Button_Clicked_BindThis }
                    >
                        Close Add Range
                    </button>
                </div>
            </div>
        );
    }
}

///////////

//      Protein Name Component

/////////////

interface ProteinName_Component_Props {

    protein : ProteinPositionFilter_UserInput__Component__ProteinData_SingleProtein
}

interface ProteinName_Component_State {

    _placeHolder: any
}

/**
 *
 */
class ProteinName_Component extends React.Component< ProteinName_Component_Props, ProteinName_Component_State > {

    private _onMouseEnter_BindThis = this._onMouseEnter.bind(this);
    private _onMouseLeave_BindThis = this._onMouseLeave.bind(this);

    private _proteinNameSpan_Ref: React.RefObject<HTMLSpanElement>

    private _tooltip_Limelight_Created_Tooltip : Tooltip_Limelight_Created_Tooltip;

    private _unmounted = false;

    /**
     *
     */
    constructor(props: ProteinName_Component_Props) {
        super(props);

        this._proteinNameSpan_Ref = React.createRef<HTMLSpanElement>();
    }

    componentWillUnmount() {

        this._unmounted = true;

        if ( this._tooltip_Limelight_Created_Tooltip ) {
            this._tooltip_Limelight_Created_Tooltip.removeTooltip();
        }
        this._tooltip_Limelight_Created_Tooltip = null;
    }

    /**
     *
     */
    private _onMouseEnter( event: React.MouseEvent<HTMLSpanElement, MouseEvent> ) {

        // event.stopPropagation();

        if ( ! this._proteinNameSpan_Ref.current ) {
            return;
        }

        const tooltipContents = (
            <div style={ { marginBottom: 10 } } className="isTooltip">

                <div style={ { marginBottom: 10 } } className="isTooltip">
                    <span className='is-tooltip-label'>Name(s) and description(s) uploaded to Limelight:</span>
                </div>

                { this.props.protein.proteinNameDescriptionForTooltip_Entries.map( (value, index) => {

                        return (
                            <div key={ index }
                                 style={ { marginBottom : 15 ,marginLeft : 10 } } className="isTooltip"
                            >
                                <span>{ value.name }</span>
                                <span> </span>
                                <span>{ value.description }</span>
                            </div>
                        )
                    }
                )
                }


            </div>
        );
        this._tooltip_Limelight_Created_Tooltip = tooltip_Limelight_Create_Tooltip({ tooltip_target_DOM_Element: this._proteinNameSpan_Ref.current, tooltipContents });

    }

    /**
     *
     */
    private _onMouseLeave( event: React.MouseEvent<HTMLSpanElement, MouseEvent> ) {

        // event.stopPropagation();

        if ( this._tooltip_Limelight_Created_Tooltip ) {
            this._tooltip_Limelight_Created_Tooltip.removeTooltip();
        }
        this._tooltip_Limelight_Created_Tooltip = null;
    }

    render() {
        return (
            <span
                ref={ this._proteinNameSpan_Ref }
                onMouseEnter={ this._onMouseEnter_BindThis}
                onMouseLeave={ this._onMouseLeave_BindThis }
            >
                { this.props.protein.proteinName }
            </span>
        )
    }

}

///////////

//      Single Range Component

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
    proteinLength : number
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
                if ( current_inputField_Value_Number > this.props.proteinLength ) {

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

/**
 *
 * @param inputFieldValue
 *
 * @returns true if input field is a valid integer number, false otherwise
 */
const _isFieldValueValidIntegerNumber = function ({ inputFieldValue } : {inputFieldValue: string}) {

    const inputFieldValue_Local = inputFieldValue.trim();

    if ( inputFieldValue_Local === "" ) {
        return true;
    }
    // only test for valid cutoff value if not empty string

    if(!(/^\d+$/.test(inputFieldValue))) {

        //  cutoff value is not a valid integer number
        return false;
    }

    const inputFieldValue_Local_Parsed = Number.parseInt( inputFieldValue_Local );
    if ( Number.isNaN( inputFieldValue_Local_Parsed )) {
        return false;
    }

    return true;
};



/**
 *
 */
const _copy_UserSelectionsToLocal = function(
    {
        userSelections,
        proteinData  //  Filter out selections that are not in current protein list
    } : {
        userSelections: ProteinPositionFilter_UserInput__Component__UserSelectionData_Root
        proteinData: ProteinPositionFilter_UserInput__Component__ProteinData_Root

    }) : Map<number, ProteinPositionFilter_UserInput__Component__UserSelectionData_SingleProtein> {

    const proteins_proteinSequenceVersionId_All = new Set<number>();
    for ( const protein of proteinData.proteins ) {
        proteins_proteinSequenceVersionId_All.add( protein.proteinSequenceVersionId );
    }

    const userSelections_Map_Key_proteinSequenceVersionId: Map<number, ProteinPositionFilter_UserInput__Component__UserSelectionData_SingleProtein> = new Map();

    if ( userSelections.proteins ) {
        for ( const protein_userSelection of userSelections.proteins ) {
            if ( ! proteins_proteinSequenceVersionId_All.has( protein_userSelection.proteinSequenceVersionId ) ) {
                // protein_userSelections.proteinSequenceVersionId not in All Proteins
                continue; // EARLY CONTINUE
            }
            userSelections_Map_Key_proteinSequenceVersionId.set( protein_userSelection.proteinSequenceVersionId, protein_userSelection );
        }
    }

    return userSelections_Map_Key_proteinSequenceVersionId;
}

