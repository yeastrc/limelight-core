/**
 * proteinSequenceWidgetDisplay_HeaderLine_Component_React.tsx
 * 
 * Protein Sequence Widget Display - Header Line above Protein Sequence
 * 
 * The position numbers and '|' above the protein sequence
 * 
 */

import React from 'react'


import { _POSITION_WRAP_POINT_CONSTANT, _POSITION_GROUP_SIZE_CONSTANT, ProteinSequenceWidgetDisplay_SequenceGroupSeparator, ProteinSequenceWidgetDisplay_SeparatorBetweenStartLabelAndSequence, ProteinSequenceWidgetDisplay_SeparatorBetweenEndLabelAndSequence } from './proteinSequenceWidgetDisplay_Constants_and_Separators_Components_React';

export interface ProteinSequenceWidgetDisplay_HeaderLine_Component_React_Props {

    dataPerSequencePosition_length: number
}
interface ProteinSequenceWidgetDisplay_HeaderLine_Component_React_State {

    _placeholder: any
}

/**
 * 
 */
export class ProteinSequenceWidgetDisplay_HeaderLine_Component_React extends React.Component< ProteinSequenceWidgetDisplay_HeaderLine_Component_React_Props, ProteinSequenceWidgetDisplay_HeaderLine_Component_React_State > {

    /**
     * 
     */    
    constructor(props : ProteinSequenceWidgetDisplay_HeaderLine_Component_React_Props) {
        super(props);

        //  bind to 'this' for passing as parameters
        // this._callbackMethodForSelectedProteinSequenceChange_BindThis = this._callbackMethodForSelectedProteinSequenceChange.bind(this);

        this.state = { _placeholder: null };
    }


    /**
     * After render()
     */
    // componentDidMount() {

    //     console.log("ProteinSequenceWidgetDisplay_HeaderLine_Component_React: componentDidMount");
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
  

    /**
     * @returns true if should update, false otherwise
     */
    shouldComponentUpdate(nextProps: ProteinSequenceWidgetDisplay_HeaderLine_Component_React_Props, nextState: ProteinSequenceWidgetDisplay_HeaderLine_Component_React_State ) {

        // console.log("ProteinSequenceWidgetDisplay_HeaderLine_Component_React: shouldComponentUpdate")

        //  Only update if changed: props: dataPerSequencePosition_length

        if ( this.props.dataPerSequencePosition_length !== nextProps.dataPerSequencePosition_length ) {
            return true;
        }
        return false;

        //  If Comment out prev code, uncomment this:

        // return true;
    }

    // getSnapshotBeforeUpdate( <see docs> ) {


    // }


    /**
     * After render()
     */
    // componentDidUpdate(prevProps, prevState, snapshot) {

    //     // console.log("ProteinSequenceWidgetDisplay_HeaderLine_Component_React: componentDidUpdate")

    //     // if ( this.dataObject_columnEntry_NewValue_Callback ) {
    //     //     this.dataObject_columnEntry_NewValue_Callback({ dataObject_columnEntry : this.props.dataObject_columnEntry });
    //     // }
    // }

    /**
     * 
     */
    // _callbackMethodForSelectedProteinSequenceChange( params ) {

    //     console.log("ProteinSequenceWidgetDisplay_HeaderLine_Component_React: _callbackMethodForSelectedProteinSequenceChange. params: ");
    //     console.log( params );

    // }

    /**
     * 
     */    
    render() {

        const dataPerSequencePosition_length = this.props.dataPerSequencePosition_length;

        const createHeader_Components = _createHeader({ dataPerSequencePosition_length });

        return createHeader_Components;
    }    
}


/**
 * 
 */
const _createHeader = function({ dataPerSequencePosition_length }: { dataPerSequencePosition_length: number }) {

    const proteinLength_StringLength = dataPerSequencePosition_length.toString().length;

    const seqLenForNumberOfTicks = Math.min( _POSITION_WRAP_POINT_CONSTANT, dataPerSequencePosition_length );

    const numberOfTicks = Math.ceil( seqLenForNumberOfTicks / _POSITION_GROUP_SIZE_CONSTANT );

    const header_TickNumbers = _createHeader_TickNumbers({ numberOfTicks, proteinLength_StringLength });
    const header_TickMarks = _createHeader_TickMarks({ numberOfTicks, proteinLength_StringLength });

    const header = (
        <React.Fragment>
            { header_TickNumbers }
            { header_TickMarks }
        </React.Fragment>
    )

    return header;
}

/**
 * 
 */
const _createHeader_TickNumbers = function({ numberOfTicks, proteinLength_StringLength }: { numberOfTicks: number, proteinLength_StringLength: number }) {

    //  Add Header with numbers for tick marks

    const headerLineParts_Components = [];

    //  Add padding for width of padded start label on left

    for ( let counter = 0; counter < proteinLength_StringLength; counter++ ) {

        const paddingCompent = <span key={ headerLineParts_Components.length }>&nbsp;</span>
        headerLineParts_Components.push( paddingCompent );
    }

    {
        const separatorBetweenStartLabelAndSequence_Compent = <ProteinSequenceWidgetDisplay_SeparatorBetweenStartLabelAndSequence key={ headerLineParts_Components.length }/>;
        headerLineParts_Components.push( separatorBetweenStartLabelAndSequence_Compent );
    }
    
    // $headerLine.append( $( separatorBetweenStartLabelAndSequence ) );

    for ( let counter = 0; counter < numberOfTicks; counter++ ) {

        const tickInt = ( counter * _POSITION_GROUP_SIZE_CONSTANT ) + 1;
        const tickNumberAsString = tickInt.toString();
        const tickNumberAsStringLength = tickNumberAsString.length;
        let elementClass = undefined;
        if ( tickNumberAsStringLength === 1 ) {
            elementClass = "tick-number-length-1";
        } else if ( tickNumberAsStringLength === 2 ) {
            elementClass = "tick-number-length-2";
        } else {
            throw Error("tickNumberAsStringLength only 1 or 2 supported since only have CSS classes for 1 and 2. tickNumberAsStringLength: " + tickNumberAsStringLength );
        }
        const tickStringInSpan_Component = <div key={ headerLineParts_Components.length } className={ elementClass }>{ tickNumberAsString }</div>;
        headerLineParts_Components.push( tickStringInSpan_Component );
        
        //  Add padding for width of positionGroupSize - tickNumberAsStringLength
        {
            const paddingLength = _POSITION_GROUP_SIZE_CONSTANT - tickNumberAsStringLength;
            for ( let counter = 0; counter < paddingLength; counter++ ) {
                const padding_Component = <div key={ headerLineParts_Components.length } className="tick-number-length-1">&nbsp;</div>;
                headerLineParts_Components.push( padding_Component );
            }
        }

        // Sequence Group separator
        const sequenceGroupSeparator_Component = <ProteinSequenceWidgetDisplay_SequenceGroupSeparator key={ headerLineParts_Components.length } />;
        headerLineParts_Components.push( sequenceGroupSeparator_Component );
    }

    const headerLineComponent = ( 
        <div style={ { whiteSpace: "nowrap" } }>
            { headerLineParts_Components }
        </div >
    );

    return headerLineComponent;
}

/**
 * 
 */
const _createHeader_TickMarks = function({ numberOfTicks, proteinLength_StringLength }: { numberOfTicks: number, proteinLength_StringLength: number }) {

    //  Add Header with lines for tick marks

    const headerLineParts_Components = [];

    //  Add padding for width of padded start label on left

    for ( let counter = 0; counter < proteinLength_StringLength; counter++ ) {

        const paddingCompent = <span key={ headerLineParts_Components.length }>&nbsp;</span>
        headerLineParts_Components.push( paddingCompent );
    }
    
    {
        const separatorBetweenStartLabelAndSequence_Compent = <ProteinSequenceWidgetDisplay_SeparatorBetweenStartLabelAndSequence key={ headerLineParts_Components.length }/>;
        headerLineParts_Components.push( separatorBetweenStartLabelAndSequence_Compent );
    }

    for ( let counter = 0; counter < numberOfTicks; counter++ ) {

        //  Add vertical line ('|') character
        const tickStringInSpan_Component = <div key={ headerLineParts_Components.length } className="tick-number-length-1">|</div>;
        headerLineParts_Components.push( tickStringInSpan_Component );

        //  Add padding for width of positionGroupSize - 1 ( - 1 for width of line '|' character )
        {
            const paddingLength = _POSITION_GROUP_SIZE_CONSTANT - 1;
            for ( let counter = 0; counter < paddingLength; counter++ ) {
                const padding_Component = <div key={ headerLineParts_Components.length } className="tick-number-length-1">&nbsp;</div>;
                headerLineParts_Components.push( padding_Component );
            }
        }

        // Sequence Group separator
        const sequenceGroupSeparator_Component = <ProteinSequenceWidgetDisplay_SequenceGroupSeparator key={ headerLineParts_Components.length } />;
        headerLineParts_Components.push( sequenceGroupSeparator_Component );
    }

    const headerLineComponent = ( 
        <div style={ { whiteSpace: "nowrap" } }>
            { headerLineParts_Components }
        </div >
    );

    return headerLineComponent;

}


