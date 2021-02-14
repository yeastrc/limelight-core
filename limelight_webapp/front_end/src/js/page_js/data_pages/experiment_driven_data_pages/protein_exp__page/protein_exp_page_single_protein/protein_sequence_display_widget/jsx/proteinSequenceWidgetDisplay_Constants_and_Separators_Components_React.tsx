/**
 * proteinSequenceWidgetDisplay_Constants_and_Separators_Components_React.tsx
 * 
 * Protein Sequence Widget Display - Constants and Separators
 * 
 */

import React from 'react'




const _POSITION_WRAP_POINT_CONSTANT = 60;

const _POSITION_GROUP_SIZE_CONSTANT = 10;


/**
 * 
 */
const ProteinSequenceWidgetDisplay_SequenceGroupSeparator = function() {

    return <span >&nbsp;</span>;
}


/**
 * 
 */
const ProteinSequenceWidgetDisplay_SeparatorBetweenStartLabelAndSequence = function() {

    return <span >&nbsp;</span>;
}


/**
 * 
 */
const ProteinSequenceWidgetDisplay_SeparatorBetweenEndLabelAndSequence = ProteinSequenceWidgetDisplay_SeparatorBetweenStartLabelAndSequence;


export { _POSITION_WRAP_POINT_CONSTANT, _POSITION_GROUP_SIZE_CONSTANT, ProteinSequenceWidgetDisplay_SequenceGroupSeparator, ProteinSequenceWidgetDisplay_SeparatorBetweenStartLabelAndSequence, ProteinSequenceWidgetDisplay_SeparatorBetweenEndLabelAndSequence }
