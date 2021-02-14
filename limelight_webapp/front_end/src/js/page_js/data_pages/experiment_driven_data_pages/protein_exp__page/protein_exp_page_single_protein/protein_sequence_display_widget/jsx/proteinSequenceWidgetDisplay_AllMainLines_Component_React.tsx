/**
 * proteinSequenceWidgetDisplay_AllMainLines_Component_React.tsx
 * 
 * Protein Sequence Widget Display - All Main Lines of Protein Sequence
 * 
 * All Main Lines
 * 
 * .tsx file since contains JSX
 * 
 */

import React from 'react'


import { _POSITION_WRAP_POINT_CONSTANT, _POSITION_GROUP_SIZE_CONSTANT, ProteinSequenceWidgetDisplay_SequenceGroupSeparator, ProteinSequenceWidgetDisplay_SeparatorBetweenStartLabelAndSequence, ProteinSequenceWidgetDisplay_SeparatorBetweenEndLabelAndSequence } from './proteinSequenceWidgetDisplay_Constants_and_Separators_Components_React';

import { 
    ProteinSequenceWidgetDisplay_Component_Data, 
    ProteinSequenceWidgetDisplay_Component_DataPerSequencePositionEntry 
} from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/protein_sequence_display_widget/js/proteinSequenceWidgetDisplay_Component_Data';


import { ProteinSequenceWidgetDisplay_SequencePosition_TooltipDisplayManager } from './proteinSequenceWidgetDisplay_SequencePosition_TooltipManager';
import {ProteinSequenceWidget_SinglePositionFlags} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/protein_sequence_display_widget/js/proteinSequenceWidget_SinglePositionFlags";


// const _HTML_ELEMENT_DATA_KEY__SEQUENCE_POSITION = "position";


// const _CSS_CLASS_NAME__SEQUENCE_POSITION_SELECTOR_AT_POSITION_PREFIX = "selector_seq_at_pos_";

//  CSS Class Names for each position of protein sequence

const _CSS_CLASS_NAME__SEQUENCE_POSITION_MAIN = "pos";

const _CSS_CLASS_NAME__SEQUENCE_POSITION_SELECTED = "pos-sel";

//  CSS Class Names for styling each position based on sequence coverage (overall and filtered) and presence of mods and mods selections

//		One and only one of these CSS Class names will be applied to each sequence position

const _CSS_CLASS_NAME__SEQUENCE_POSITION_UNCOVERED = "pos-uncovered";   // uncovered residue:  'fade out' the text

//         This 'filter' is the Modification and Sequence Position selections

const _CSS_CLASS_NAME__SEQUENCE_POSITION_COVERED_OUTSIDE_FILTER_MOD = "pos-covered-outside-filter-mod";  // covered residue. not in filtered peptide list
const _CSS_CLASS_NAME__SEQUENCE_POSITION_COVERED_OUTSIDE_FILTER_NO_MOD = "pos-covered-outside-filter-nomod";  // covered residue, covered by filtered peptide list

const _CSS_CLASS_NAME__SEQUENCE_POSITION_COVERED_WITHIN_FILTER_NO_MOD = "pos-covered-within-filter-nomod";  // not modded residue in filtered peptide list
const _CSS_CLASS_NAME__SEQUENCE_POSITION_COVERED_WITHIN_FILTER_MOD_NO_FILTER = "pos-covered-within-filter-mod-no-filter";  // covered residue,  covered by filtered peptide list, mod, no mod filter
const _CSS_CLASS_NAME__SEQUENCE_POSITION_COVERED_WITHIN_FILTER_MOD_WITHIN_FILTER = "pos-covered-within-filter-mod-within-filter";  // modded residue in filtered peptide list, has a mod == a mod filter
const _CSS_CLASS_NAME__SEQUENCE_POSITION_COVERED_WITHIN_FILTER_MOD_OUTSIDE_FILTER = "pos-covered-within-filter-mod-outside-filter";  // modded residue in filtered peptide list, does not have a mod in mod filter 

const _CSS_CLASS_NAME__SEQUENCE_POSITION_NO_FILTERS_MOD = "pos-covered-nofilters-mod";  // modded residue, no filters (mod or position)
const _CSS_CLASS_NAME__SEQUENCE_POSITION_NO_FILTERS_NO_MOD = "pos-covered-nofilters-nomod";  // not modded residue, no filters (mod or position)


const _CSS_CLASS_NAME__SEQUENCE_POSITION_MATCH_USER_PEPTIDE_FILTER_SEARCH_STRING = "pos-match-user-peptide-filter-search-string";  

const _CSS_CLASS_NAME__SEQUENCE_POSITION_HOVER = "pos-hover";


export class ProteinSequenceWidgetDisplay__PositionClicked_Callback_Params {
    position : number
    ctrlKey_or_metaKey_Down: boolean
}

export type ProteinSequenceWidgetDisplay__PositionClicked_Callback =
    ( params : ProteinSequenceWidgetDisplay__PositionClicked_Callback_Params ) => void

/**
 * 
 */
export interface ProteinSequenceWidgetDisplay_AllMainLines_Component_React_Props {

    proteinSequenceWidgetDisplay_Component_Data : ProteinSequenceWidgetDisplay_Component_Data
    positionClicked_Callback : ProteinSequenceWidgetDisplay__PositionClicked_Callback
}


/**
 * 
 */
export class ProteinSequenceWidgetDisplay_AllMainLines_Component_React extends React.Component< ProteinSequenceWidgetDisplay_AllMainLines_Component_React_Props, {} > {

    /**
     * 
     */    
    constructor(props : ProteinSequenceWidgetDisplay_AllMainLines_Component_React_Props) {
        super(props);

        //  bind to 'this' for passing as parameters
        // this._callbackMethodForSelectedProteinSequenceChange_BindThis = this._callbackMethodForSelectedProteinSequenceChange.bind(this);

        this.state = {  };
    }


    /**
     * After render()
     */
    // componentDidMount() {

    //     console.log("ProteinSequenceWidgetDisplay_AllMainLines_Component_React: componentDidMount");
    // }

    /**
     * Clean Up
     */
    // componentWillUnmount() {

    // }


    /**
     * Must be Static
     * Called before 
     *   Initial render: 'render()'
     *   Rerender : 'shouldComponentUpdate()'
     * 
     * Return new state (like return from setState(callback)) or null
     */
    // static getDerivedStateFromProps( props, state ) {

      // console.log("called: static getDerivedStateFromProps(): " );

      //  Return new state (like return from setState(callback)) or null

    //   return null;

    // }
  
    //  Have shouldComponentUpdate in Root so probably don't need here

    // /**
    //  * @returns true if should update, false otherwise
    //  */
    // shouldComponentUpdate(nextProps, nextState) {

    //     // console.log("ProteinSequenceWidgetDisplay_AllMainLines_Component_React: shouldComponentUpdate")

    //     //  Only update if changed: props: dataPerSequencePosition

    //     if ( this.props.proteinSequenceWidgetDisplay_Component_Data !== nextProps.proteinSequenceWidgetDisplay_Component_Data ) {
    //         return true;
    //     }
    //     return false;

    //     //  If Comment out prev code, comment out this method
    // }

    // getSnapshotBeforeUpdate( <see docs> ) {


    // }


    /**
     * After render()
     */
    // componentDidUpdate(prevProps, prevState, snapshot) {

    //     // console.log("ProteinSequenceWidgetDisplay_AllMainLines_Component_React: componentDidUpdate")

    //     // if ( this.dataObject_columnEntry_NewValue_Callback ) {
    //     //     this.dataObject_columnEntry_NewValue_Callback({ dataObject_columnEntry : this.props.dataObject_columnEntry });
    //     // }
    // }

    /**
     * 
     */
    // _callbackMethodForSelectedProteinSequenceChange( params ) {

    //     console.log("ProteinSequenceWidgetDisplay_AllMainLines_Component_React: _callbackMethodForSelectedProteinSequenceChange. params: ");
    //     console.log( params );

    // }

    /**
     * 
     */    
    render() {

        if ( ! this.props.proteinSequenceWidgetDisplay_Component_Data ) {
            const msg = "No value for this.props.proteinSequenceWidgetDisplay_Component_Data";
            console.warn( msg );
            throw Error( msg );
        }
        if ( ! this.props.proteinSequenceWidgetDisplay_Component_Data.dataPerSequencePosition ) {
            const msg = "No value for this.props.proteinSequenceWidgetDisplay_Component_Data.dataPerSequencePosition";
            console.warn( msg );
            throw Error( msg );
        }
        if ( ! this.props.proteinSequenceWidgetDisplay_Component_Data.dataPerSequencePosition.length ) {
            const msg = "No value for this.props.proteinSequenceWidgetDisplay_Component_Data.dataPerSequencePosition.length";
            console.warn( msg );
            throw Error( msg );
        }
        if ( ! this.props.proteinSequenceWidgetDisplay_Component_Data.selectedProteinSequencePositions ) {
            const msg = "No value for this.props.proteinSequenceWidgetDisplay_Component_Data.selectedProteinSequencePositions";
            console.warn( msg );
            throw Error( msg );
        }

        const dataPerSequencePosition = this.props.proteinSequenceWidgetDisplay_Component_Data.dataPerSequencePosition;
        const selectedProteinSequencePositions = this.props.proteinSequenceWidgetDisplay_Component_Data.selectedProteinSequencePositions;
        const positionClicked_Callback = this.props.positionClicked_Callback;

        const createAllLines_Components = _createAllLines({ dataPerSequencePosition, selectedProteinSequencePositions, positionClicked_Callback });

        return createAllLines_Components;
    }    
}


/**
 * 
 */
const _createAllLines = function({ 
    
    dataPerSequencePosition,
    selectedProteinSequencePositions,
    positionClicked_Callback
} : { 
    
    dataPerSequencePosition: ProteinSequenceWidgetDisplay_Component_DataPerSequencePositionEntry[]
    selectedProteinSequencePositions : Set<number>,
    positionClicked_Callback : ProteinSequenceWidgetDisplay__PositionClicked_Callback
}) {

    const dataPerSequencePosition_length : number = dataPerSequencePosition.length;

    const proteinSequenceLength = dataPerSequencePosition_length;

    const proteinLength_StringLength = dataPerSequencePosition_length.toString().length;

    //   Process dataPerSequencePosition in blocks of output lines

    const resultLines = [];
    
    for ( let proteinSequenceIndex : number = 0; proteinSequenceIndex < proteinSequenceLength; proteinSequenceIndex += _POSITION_WRAP_POINT_CONSTANT ) {

        const proteinSequenceForLineStartIndex = proteinSequenceIndex;
        const proteinSequenceForLineEndIndex = proteinSequenceIndex + _POSITION_WRAP_POINT_CONSTANT - 1; // Last Index to display
        
        let show_lineEndPosition = false;
        if ( ( proteinSequenceIndex + _POSITION_WRAP_POINT_CONSTANT )  < proteinSequenceLength ) {
            show_lineEndPosition = true; // Only display if not after end of sequence length
        }
        
        const proteinSequenceLine_Component = (

            <ProteinSequence_SingleLine
                key={ resultLines.length }
                show_lineEndPosition={ show_lineEndPosition }
                proteinSequenceForLineStartIndex={ proteinSequenceForLineStartIndex }
                proteinSequenceForLineEndIndex={ proteinSequenceForLineEndIndex }
                dataPerSequencePosition={ dataPerSequencePosition }
                selectedProteinSequencePositions={ selectedProteinSequencePositions }
                proteinLength_StringLength={ proteinLength_StringLength }
                positionClicked_Callback={ positionClicked_Callback }
            />
        );

        resultLines.push( proteinSequenceLine_Component );
    }

    const mainLines = (
        <React.Fragment>
            { resultLines }
        </React.Fragment>
    );

    return mainLines;
}

//////////////////////

//   Single Line


/**
 * 
 */
interface ProteinSequence_SingleLine_Props {

    dataPerSequencePosition: ProteinSequenceWidgetDisplay_Component_DataPerSequencePositionEntry[]
    selectedProteinSequencePositions : Set<number>;
    show_lineEndPosition: boolean
    proteinSequenceForLineStartIndex: number
    proteinSequenceForLineEndIndex: number
    proteinLength_StringLength: number
    positionClicked_Callback : ProteinSequenceWidgetDisplay__PositionClicked_Callback
}

/**
 * 
 */
class ProteinSequence_SingleLine extends React.Component< ProteinSequence_SingleLine_Props, {} > {

    /**
     * 
     */    
    constructor(props : ProteinSequence_SingleLine_Props) {
        super(props);

        this.state = {  };
    }

    /**
     * 
     */ 
    render() {

        const show_lineEndPosition = this.props.show_lineEndPosition;
        const proteinSequenceForLineStartIndex = this.props.proteinSequenceForLineStartIndex;
        const proteinSequenceForLineEndIndex = this.props.proteinSequenceForLineEndIndex;
        const dataPerSequencePosition = this.props.dataPerSequencePosition;
        const selectedProteinSequencePositions = this.props.selectedProteinSequencePositions;
        const proteinLength_StringLength = this.props.proteinLength_StringLength;
        const positionClicked_Callback = this.props.positionClicked_Callback;

        const proteinSequenceLine_Components = _createProteinSequence_Components_ForLine({ 
            show_lineEndPosition,
            proteinSequenceForLineStartIndex, 
            proteinSequenceForLineEndIndex, 
            dataPerSequencePosition,
            selectedProteinSequencePositions,
            proteinLength_StringLength,
            positionClicked_Callback
        });


        return (

            <div
                className=" selector_sequence_line " style={ { whiteSpace: "nowrap" } }>
                { proteinSequenceLine_Components }
            </div>
        );
    }
}





/**
 * Add a single Line
 */
const _createProteinSequence_Components_ForLine = function({ 

    show_lineEndPosition,
    proteinSequenceForLineStartIndex, 
    proteinSequenceForLineEndIndex, 
    dataPerSequencePosition, 
    selectedProteinSequencePositions,
    proteinLength_StringLength,
    positionClicked_Callback
} : { 
    show_lineEndPosition: boolean
    proteinSequenceForLineStartIndex: number
    proteinSequenceForLineEndIndex: number
    dataPerSequencePosition: ProteinSequenceWidgetDisplay_Component_DataPerSequencePositionEntry[]
    selectedProteinSequencePositions : Set<number>,
    proteinLength_StringLength: number
    positionClicked_Callback : ProteinSequenceWidgetDisplay__PositionClicked_Callback
}) {
    
    const proteinSequenceLine_Components: Array<JSX.Element> = [];

    {
        // Display Start Position
        const lineStartPosition = proteinSequenceForLineStartIndex + 1; // '1' based

        _addProteinSequenceLineStartOrEndLabelToContainer({ linePosition : lineStartPosition, proteinLength_StringLength, proteinSequenceLine_Components });

        const lineStartPosition_Component = <span key={ proteinSequenceLine_Components.length }>{ lineStartPosition }</span>;
        proteinSequenceLine_Components.push( lineStartPosition_Component );
    }
    
    {
        // Separator after start label
        const separatorBetweenStartLabelAndSequence = <ProteinSequenceWidgetDisplay_SeparatorBetweenStartLabelAndSequence key={ proteinSequenceLine_Components.length } />;
        proteinSequenceLine_Components.push( separatorBetweenStartLabelAndSequence );
    }

    //  Split line into groups
    
    for ( let proteinSequenceIndex = proteinSequenceForLineStartIndex; proteinSequenceIndex <= proteinSequenceForLineEndIndex; proteinSequenceIndex += _POSITION_GROUP_SIZE_CONSTANT ) {

        if ( proteinSequenceIndex !== proteinSequenceForLineStartIndex ) {
            // Add Group Separator, before all groups except first group
            const sequenceGroupSeparator = <ProteinSequenceWidgetDisplay_SequenceGroupSeparator key={ proteinSequenceLine_Components.length } />
            proteinSequenceLine_Components.push( sequenceGroupSeparator );
        }
        
        const proteinSequenceForGroupStartIndex = proteinSequenceIndex;
        let proteinSequenceForGroupEndIndex = proteinSequenceIndex + _POSITION_GROUP_SIZE_CONSTANT - 1; // Index of Last Position
        if ( proteinSequenceForGroupEndIndex >= dataPerSequencePosition.length ) {
            proteinSequenceForGroupEndIndex = dataPerSequencePosition.length - 1;
        }
        
        _addProteinSequenceGroupToContainer({ 
            proteinSequenceForGroupStartIndex, 
            proteinSequenceForGroupEndIndex, 
            dataPerSequencePosition, 
            selectedProteinSequencePositions,
            proteinSequenceLine_Components,
            positionClicked_Callback
        });
    }

    // Display End Position if requested
    if ( show_lineEndPosition ) { 
        {
            // Separator before end label
            const separatorBetweenEndLabelAndSequence = <ProteinSequenceWidgetDisplay_SeparatorBetweenEndLabelAndSequence key={ proteinSequenceLine_Components.length } />;
            proteinSequenceLine_Components.push( separatorBetweenEndLabelAndSequence );
        }
    
        const lineEndPosition = proteinSequenceForLineEndIndex + 1; // Only display if not after end of sequence length

        _addProteinSequenceLineStartOrEndLabelToContainer( { linePosition : lineEndPosition, proteinLength_StringLength, proteinSequenceLine_Components } );
        
        const lineEndPosition_Component = <span key={ proteinSequenceLine_Components.length } >{ lineEndPosition }</span>;
        proteinSequenceLine_Components.push( lineEndPosition_Component );
    }

    return proteinSequenceLine_Components;
}

/**
 * Add Start Or End Label (start or End Position) for a single Line
 * 
 * @returns Array of <span>&nbsp;</span> components to insert before the <span> with the number
 */
const _addProteinSequenceLineStartOrEndLabelToContainer = function(
    {
        linePosition, proteinLength_StringLength, proteinSequenceLine_Components
    }: {
        linePosition: number
        proteinLength_StringLength: number
        proteinSequenceLine_Components: Array<JSX.Element>
    }) {
    
    const number = linePosition;
    const resultTotalStringLength = proteinLength_StringLength;

    const numberString = number.toString();
    const numberStringLength = numberString.length;
    
    const numberPadEntries = resultTotalStringLength - numberStringLength;
    
    //  Create padding for 
    
    for ( let counter = 0; counter < numberPadEntries; counter++ ) {
        const padding = <span  key={ proteinSequenceLine_Components.length }>&nbsp;</span>;
        proteinSequenceLine_Components.push( padding );
    }
}

/**
 * Add A Sequence Group for a single Line
 */
const _addProteinSequenceGroupToContainer = function({ 
    
    proteinSequenceForGroupStartIndex, 
    proteinSequenceForGroupEndIndex, 
    dataPerSequencePosition, 
    selectedProteinSequencePositions,
    proteinSequenceLine_Components,
    positionClicked_Callback
} : { 
    
    proteinSequenceForGroupStartIndex: number
    proteinSequenceForGroupEndIndex: number
    dataPerSequencePosition: ProteinSequenceWidgetDisplay_Component_DataPerSequencePositionEntry[]
    selectedProteinSequencePositions : Set<number>,
    proteinSequenceLine_Components: Array<JSX.Element>
    positionClicked_Callback : ProteinSequenceWidgetDisplay__PositionClicked_Callback
}) {
    
    for ( let proteinSequenceIndex : number = proteinSequenceForGroupStartIndex; proteinSequenceIndex <= proteinSequenceForGroupEndIndex; proteinSequenceIndex++ ) {

        const proteinSequencePosition = proteinSequenceIndex + 1; // '1' based
        const data_At_SequencePosition = dataPerSequencePosition[  proteinSequenceIndex ]; 

        const position_Component = (
            <ProteinSequence_SinglePosition
                key={ proteinSequenceLine_Components.length }
                position={ proteinSequencePosition }
                data_At_SequencePosition={ data_At_SequencePosition }
                selectedProteinSequencePositions={ selectedProteinSequencePositions }
                positionClicked_Callback={ positionClicked_Callback }
            />
        );

        proteinSequenceLine_Components.push( position_Component );
    }
}

/**
 * 
 */
interface ProteinSequence_SinglePosition_Props {

    position : number;
    data_At_SequencePosition : ProteinSequenceWidgetDisplay_Component_DataPerSequencePositionEntry;
    selectedProteinSequencePositions : Set<number>
    positionClicked_Callback : ProteinSequenceWidgetDisplay__PositionClicked_Callback
}

/**
 * 
 */
class ProteinSequence_SinglePosition extends React.Component< ProteinSequence_SinglePosition_Props, {} > {

    private _sequencePosition_TooltipDisplayManager : ProteinSequenceWidgetDisplay_SequencePosition_TooltipDisplayManager = new ProteinSequenceWidgetDisplay_SequencePosition_TooltipDisplayManager();

        //  bind to 'this' for passing as parameters
    private _onClick_BindThis = this._onClick.bind(this);
    private _onMouseEnter_BindThis = this._onMouseEnter.bind(this);
    private _onMouseLeave_BindThis = this._onMouseLeave.bind(this);


    /**
     * 
     */    
    constructor(props : ProteinSequence_SinglePosition_Props) {
        super(props);

        this.state = {  };
    }

    _onClick( event: React.MouseEvent<HTMLElement, MouseEvent> ) {

        // const target_htmlElement = event.target as HTMLElement;

        const position = this.props.position;

		const ctrlKey_or_metaKey_Down = event.ctrlKey || event.metaKey;

        console.log("ProteinSequence_SinglePosition: onClick: this.props.position: " + this.props.position )

        this.props.positionClicked_Callback({ position, ctrlKey_or_metaKey_Down });
    }

    _onMouseEnter( event: React.MouseEvent<HTMLElement, MouseEvent> ) {

        //  event cannot be passed through a setTimeout

        let variableModificationsDisplay : JSX.Element = undefined;
        let staticModificationsDisplay : JSX.Element = undefined;

        if ( this.props.data_At_SequencePosition.variableModifications && this.props.data_At_SequencePosition.variableModifications.length > 0 ) {

            const variableModificationsDisplayEntries = [];
            {
                let firstEntry = true;
                let reactListKey = 0;
                for ( const variableModificationEntry of this.props.data_At_SequencePosition.variableModifications ) {
                    if ( firstEntry ) {
                        firstEntry = false;
                    } else {
                        reactListKey++;
                        const commaSeparator = (
                            <span key={ reactListKey } >, </span>
                        )
                        variableModificationsDisplayEntries.push( commaSeparator );
                    }
                    let entryStyle: React.CSSProperties = undefined;
                    if ( variableModificationEntry.isSelected ) {
                        entryStyle = { fontWeight: "bold" }
                    }
                    reactListKey++;
                    const variableModificationsDisplayEntry = (
                        <span key={ reactListKey } style={ entryStyle }>{ variableModificationEntry.variableModificationMass }</span>
                    );
                    variableModificationsDisplayEntries.push( variableModificationsDisplayEntry );
                }
            }

            variableModificationsDisplay = (
                <React.Fragment >
                    <div style={ { marginTop: 5, marginBottom: 3, fontWeight: "bold" } }>
                        Variable Modifications:
                    </div>
                    <div >
                        { variableModificationsDisplayEntries }
                    </div>
                </React.Fragment>
            );
        }

        if ( this.props.data_At_SequencePosition.staticModifications && this.props.data_At_SequencePosition.staticModifications.length > 0 ) {

            const staticModificationsDisplayEntries = [];
            {
                let firstEntry = true;
                let reactListKey = 0;
                for ( const staticModificationEntry of this.props.data_At_SequencePosition.staticModifications ) {
                    if ( firstEntry ) {
                        firstEntry = false;
                    } else {
                        reactListKey++;
                        const commaSeparator = (
                            <span key={ reactListKey } >, </span>
                        )
                        staticModificationsDisplayEntries.push( commaSeparator );
                    }
                    let entryStyle: React.CSSProperties = undefined;
                    if ( staticModificationEntry.isSelected ) {
                        entryStyle = { fontWeight: "bold" }
                    }
                    reactListKey++;
                    const staticModificationsDisplayEntry = (
                        <span key={ reactListKey } style={ entryStyle }>{ staticModificationEntry.staticModificationMass }</span>
                    );
                    staticModificationsDisplayEntries.push( staticModificationsDisplayEntry );
                }
            }

            staticModificationsDisplay = (
                <React.Fragment >
                    <div style={ { marginTop: 5, marginBottom: 3, fontWeight: "bold" } }>
                        Static Modifications:
                    </div>
                    <div >
                        { staticModificationsDisplayEntries }
                    </div>
                </React.Fragment>
            );
        }

        const tooltipContents = (
            <React.Fragment >
                <div style={ { fontWeight: "bold" } }>Position: { this.props.position }</div>
                { variableModificationsDisplay }
                { staticModificationsDisplay }
            </React.Fragment>
        );

        this._sequencePosition_TooltipDisplayManager.mouseEnter_SequencePosition({ event, tooltipContents });

    }

    _onMouseLeave( event: React.MouseEvent<HTMLElement, MouseEvent> ) {

        this._sequencePosition_TooltipDisplayManager.mouseLeave_SequencePosition({ event });
    }

    /**
     * 
     */ 
    render() {

        const data_At_SequencePosition = this.props.data_At_SequencePosition;

        const residue = data_At_SequencePosition.residue;

        const sequencePosition_Flags = data_At_SequencePosition.sequencePosition_Flags; // class ProteinSequenceWidget_SinglePositionFlags

        const className_ForPosition_Primary = _proteinSequence_SinglePosition_GetPrimaryClassName({ sequencePosition_Flags });

        let className_ForPosition_Secondary = "";
        let className_ForPosition_PositionSelected = "";

        if ( sequencePosition_Flags.get_Sequence_Position_Match_User_Peptide_Filter_Search_String() ) {

            className_ForPosition_Secondary = " " + _CSS_CLASS_NAME__SEQUENCE_POSITION_MATCH_USER_PEPTIDE_FILTER_SEARCH_STRING + " ";
        }

        // if ( sequencePosition_Flags.get_UserSelected_ProteinSequencePosition() ) {
        if ( this.props.selectedProteinSequencePositions.has( this.props.position ) ) {

            className_ForPosition_PositionSelected = _CSS_CLASS_NAME__SEQUENCE_POSITION_SELECTED;
        }

        const className = ( 
            _CSS_CLASS_NAME__SEQUENCE_POSITION_MAIN 
            + " " 
            + className_ForPosition_Primary 
            + " " 
            + className_ForPosition_Secondary 
            + " " 
            + className_ForPosition_PositionSelected
            + " " 
            + _CSS_CLASS_NAME__SEQUENCE_POSITION_HOVER
        );

        return (
            <div 
                onClick={ this._onClick_BindThis }
                onMouseEnter={ this._onMouseEnter_BindThis }
                onMouseLeave={ this._onMouseLeave_BindThis }
                className={ className }
                data-pos={ this.props.position }  
                // data-pos= is info only, not used by code. Code uses .data( ) attached to this DOM element 
            >{ residue }
            </div>
        );
    }
}


const _proteinSequence_SinglePosition_GetPrimaryClassName = function({ sequencePosition_Flags }: { sequencePosition_Flags: ProteinSequenceWidget_SinglePositionFlags }) {


    let className_ForPosition_Primary = "";

    if ( sequencePosition_Flags.get_Sequence_Position_Uncovered() ) {

        className_ForPosition_Primary = _CSS_CLASS_NAME__SEQUENCE_POSITION_UNCOVERED;

    } if ( sequencePosition_Flags.get_Sequence_Position_No_Filters_Mod() ) {

        className_ForPosition_Primary = _CSS_CLASS_NAME__SEQUENCE_POSITION_NO_FILTERS_MOD;

    } if ( sequencePosition_Flags.get_Sequence_Position_No_Filters_No_Mod() ) {

        className_ForPosition_Primary = _CSS_CLASS_NAME__SEQUENCE_POSITION_NO_FILTERS_NO_MOD;

    } if ( sequencePosition_Flags.get_Sequence_Position_Covered_Within_Filter_Mod_No_Filter() ) {

        className_ForPosition_Primary = _CSS_CLASS_NAME__SEQUENCE_POSITION_COVERED_WITHIN_FILTER_MOD_NO_FILTER;

    } if ( sequencePosition_Flags.get_Sequence_Position_Covered_Within_Filter_Mod_Within_Filter() ) {

        className_ForPosition_Primary = _CSS_CLASS_NAME__SEQUENCE_POSITION_COVERED_WITHIN_FILTER_MOD_WITHIN_FILTER;

    } if ( sequencePosition_Flags.get_Sequence_Position_Covered_Within_Filter_Mod_Outside_Filter() ) {

        className_ForPosition_Primary = _CSS_CLASS_NAME__SEQUENCE_POSITION_COVERED_WITHIN_FILTER_MOD_OUTSIDE_FILTER;

    } if ( sequencePosition_Flags.get_Sequence_Position_Covered_Within_Filter_No_Mod() ) {

        className_ForPosition_Primary = _CSS_CLASS_NAME__SEQUENCE_POSITION_COVERED_WITHIN_FILTER_NO_MOD;

    } if ( sequencePosition_Flags.get_Sequence_Position_Covered_Outside_Filter_Mod() ) {

        className_ForPosition_Primary = _CSS_CLASS_NAME__SEQUENCE_POSITION_COVERED_OUTSIDE_FILTER_MOD;

    } if ( sequencePosition_Flags.get_Sequence_Position_Covered_Outside_Filter_No_Mod() ) {

        className_ForPosition_Primary = _CSS_CLASS_NAME__SEQUENCE_POSITION_COVERED_OUTSIDE_FILTER_NO_MOD;
    }

    return className_ForPosition_Primary;
}

