/**
 * proteinSequenceWidgetDisplay_Root_Component_React.tsx
 * 
 * Protein Sequence Widget Display
 * 
 * Goes with JS code:  proteinExperimentPage_SingleProtein_ProteinSequenceWidget_BuildDisplayObject.js
 */




import React from 'react'

// import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { ProteinSequenceWidget_StateObject } from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__protein_page__components/protein_sequence_display_widget/js/proteinSequenceWidget_StateObject';
import { ProteinSequenceWidgetDisplay_Component_Data } from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__protein_page__components/protein_sequence_display_widget/js/proteinSequenceWidgetDisplay_Component_Data';


import { ProteinSequenceWidgetDisplay_Legend_Component_React } from './proteinSequenceWidgetDisplay_Legend_Component_React';

import { ProteinSequenceWidgetDisplay_HeaderLine_Component_React } from './proteinSequenceWidgetDisplay_HeaderLine_Component_React';
import {
    ProteinSequenceWidgetDisplay__PositionClicked_Callback,
    ProteinSequenceWidgetDisplay__PositionClicked_Callback_Params,
    ProteinSequenceWidgetDisplay_AllMainLines_Component_React
} from './proteinSequenceWidgetDisplay_AllMainLines_Component_React';
import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";
import {
    Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
} from "page_js/common_all_pages/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component";


const _MAX_PROTEIN_LENGTH_TO_DISPLAY = 100000


/**
 * 
 */
export interface ProteinSequenceWidgetDisplay_Root_Component_React_Props {
    proteinSequenceWidgetDisplay_Component_Data : ProteinSequenceWidgetDisplay_Component_Data
    proteinSequenceWidget_StateObject : ProteinSequenceWidget_StateObject
    updateMadeTo_proteinSequenceWidgetDisplay_UserSelections_StateObject_Callback : () => void;
}

/**
 * 
 */
export class ProteinSequenceWidgetDisplay_Root_Component_React extends React.Component< ProteinSequenceWidgetDisplay_Root_Component_React_Props, {} > {

    //  bind to 'this' for passing as parameters
    private _positionClicked_Callback_BindThis = this._positionClicked_Callback.bind(this);

    private _DO_NOT_CALL() { //  Test method cast
        const positionClicked_Callback : ProteinSequenceWidgetDisplay__PositionClicked_Callback = this._positionClicked_Callback
    }

    /**
     * 
     */    
    constructor(props : ProteinSequenceWidgetDisplay_Root_Component_React_Props) {
        super(props);

        this.state = {  };
    }


    /**
     * After render()
     */
    // componentDidMount() {

    //     console.log("ProteinSequenceWidgetDisplay_Root_Component_React: componentDidMount");
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
    // shouldComponentUpdate(nextProps, nextState) {

    //     // console.log("ProteinSequenceWidgetDisplay_Root_Component_React: shouldComponentUpdate")

    //     //  Only update if changed: props: dataObject_columnEntry or dataObject

    //     // if ( this.props.dataObject_columnEntry !== nextProps.dataObject_columnEntry ) {
    //     //     return true;
    //     // }
    //     // if ( this.props.dataObject !== nextProps.dataObject ) {
    //     //     return true;
    //     // }
    //     // return false;

    //     //  If Comment out prev code, comment out this method
    // }

    // getSnapshotBeforeUpdate( <see docs> ) {


    // }


    /**
     * After render()
     */
    // componentDidUpdate(prevProps, prevState, snapshot) {

    //     // console.log("ProteinSequenceWidgetDisplay_Root_Component_React: componentDidUpdate")

    //     // if ( this.dataObject_columnEntry_NewValue_Callback ) {
    //     //     this.dataObject_columnEntry_NewValue_Callback({ dataObject_columnEntry : this.props.dataObject_columnEntry });
    //     // }
    // }

    /**
     * 
     */
    _positionClicked_Callback( params : ProteinSequenceWidgetDisplay__PositionClicked_Callback_Params ) : void {

        const ctrlKey_or_metaKey_Down = params.ctrlKey_or_metaKey_Down;
        const position = params.position;

        //     console.log("ProteinSequenceWidgetDisplay_Root_Component_React: _callbackMethodForSelectedProteinSequenceChange. params: ");
        //     console.log( params );

        let newSelection = false;

        if ( ctrlKey_or_metaKey_Down ) {
            //  ctrl-key or meta-key(Mac) Click
            
            if ( this.props.proteinSequenceWidget_StateObject.has_selectedProteinSequencePosition({ position }) ) {
                this.props.proteinSequenceWidget_StateObject.delete_selectedProteinSequencePosition({ position });
                
            } else {
                this.props.proteinSequenceWidget_StateObject.add_selectedProteinSequencePosition({ position });
                
            }
        } else {
            //  Click Without ctrl-key or meta-key(Mac) 

            newSelection = true; // Start New Selection

            if ( this.props.proteinSequenceWidget_StateObject.get_selectedProteinSequencePositions().size === 1 ) {
                //  Only 1 currently selected
                if ( this.props.proteinSequenceWidget_StateObject.has_selectedProteinSequencePosition({ position }) ) {
                    // Click selected so remove it
                    this.props.proteinSequenceWidget_StateObject.delete_selectedProteinSequencePosition({ position });
                    
                } else {
                    // Not Click selected so clear all and add it
                    this.props.proteinSequenceWidget_StateObject.clear_selectedProteinSequencePositions();
                    
                    this.props.proteinSequenceWidget_StateObject.add_selectedProteinSequencePosition({ position });
                }
            } else {
                this.props.proteinSequenceWidget_StateObject.clear_selectedProteinSequencePositions();
                
                this.props.proteinSequenceWidget_StateObject.add_selectedProteinSequencePosition({ position });
            }
        }
        
        this.props.updateMadeTo_proteinSequenceWidgetDisplay_UserSelections_StateObject_Callback();
    }

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

        {
            if ( this.props.proteinSequenceWidgetDisplay_Component_Data.dataPerSequencePosition.length > _MAX_PROTEIN_LENGTH_TO_DISPLAY ) {

                //  Protein sequence is too long to display so display this message instead

                return (
                    <div style={ { marginTop: 10 } }>

                        <div>
                            <span style={ { fontSize: 18, fontWeight: "bold" } }>Sequence Coverage: </span>
                        </div>

                        <div>
                            Unable to display sequence coverage for proteins with length greater
                            than { _MAX_PROTEIN_LENGTH_TO_DISPLAY.toLocaleString() }.
                        </div>
                        <div style={ { marginTop: 5 } }>
                            Length of current protein sequence
                            is { this.props.proteinSequenceWidgetDisplay_Component_Data.dataPerSequencePosition.length.toLocaleString() }.
                        </div>
                    </div>
                )
            }
        }

        let sequenceCoveragePercentage_TooltipContents_FilteredAddition: React.JSX.Element = undefined

        let display_SequenceCoveragePercentage = this.props.proteinSequenceWidgetDisplay_Component_Data.sequenceCoverage_Percentage_AllPeptides

        let display_SequenceCoveragePercentage_CSS_Class = " covered-and-not-filtered-not-a-position "

        if ( this.props.proteinSequenceWidgetDisplay_Component_Data.sequenceCoverage_Percentage_FilteredPeptides !== undefined ) {

            display_SequenceCoveragePercentage = this.props.proteinSequenceWidgetDisplay_Component_Data.sequenceCoverage_Percentage_FilteredPeptides

            display_SequenceCoveragePercentage_CSS_Class = " covered-and-filtered-not-a-position "

            sequenceCoveragePercentage_TooltipContents_FilteredAddition = (
                <div>
                    For the filtered residues.
                </div>
            )
        }

        if ( display_SequenceCoveragePercentage !== undefined ) {
            display_SequenceCoveragePercentage = Math.round( display_SequenceCoveragePercentage )
        }


        const sequenceCoveragePercentage_TooltipContents = (

            <div>
                <div>
                    Sequence Coverage Percentage
                </div>
                { sequenceCoveragePercentage_TooltipContents_FilteredAddition }
            </div>
        )


        return (

            <div>

                <div>
                    <span style={ { fontSize: 18 } }>
                        <span style={ { fontWeight: "bold" } }>Sequence Coverage: </span>

                        { display_SequenceCoveragePercentage !== undefined ? (
                            <>
                                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                    title={ sequenceCoveragePercentage_TooltipContents }
                                    { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                >
                                    <span className="  protein-sequence-formatted-sequence-data-block  ">
                                        {/*  A <div> so that the class name will work  */ }
                                        <span
                                            className={ display_SequenceCoveragePercentage_CSS_Class }>{ display_SequenceCoveragePercentage }%</span>
                                    </span>
                                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>

                                <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                                    title={ sequenceCoveragePercentage_TooltipContents }
                                />
                            </>
                        ) : null }
                    </span>
                </div>

                <div
                    className=" protein-sequence-formatted-sequence-data-block protein-sequence-formatted-sequence-data-block-actual-sequence-font protein-sequence-formatted-sequence-data-block-actual-sequence-text-formatting ">

                    <ProteinSequenceWidgetDisplay_HeaderLine_Component_React
                        dataPerSequencePosition_length={ this.props.proteinSequenceWidgetDisplay_Component_Data.dataPerSequencePosition.length }
                    />

                    <ProteinSequenceWidgetDisplay_AllMainLines_Component_React
                        proteinSequenceWidgetDisplay_Component_Data={ this.props.proteinSequenceWidgetDisplay_Component_Data }
                        positionClicked_Callback={ this._positionClicked_Callback_BindThis }
                    />

                </div>

                <ProteinSequenceWidgetDisplay_Legend_Component_React/>
            </div>

        );
    }

}
