/**
 * proteinSequenceWidgetDisplay_Root_Component_React.tsx
 * 
 * Protein Sequence Widget Display
 * 
 * Goes with JS code:  proteinExperimentPage_SingleProtein_ProteinSequenceWidget_BuildDisplayObject.js
 */




import React from 'react'

// import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { ProteinSequenceWidget_StateObject } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/protein_sequence_display_widget/js/proteinSequenceWidget_StateObject';
import { ProteinSequenceWidgetDisplay_Component_Data } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/protein_sequence_display_widget/js/proteinSequenceWidgetDisplay_Component_Data';


import { ProteinSequenceWidgetDisplay_Legend_Component_React } from './proteinSequenceWidgetDisplay_Legend_Component_React';

import { ProteinSequenceWidgetDisplay_HeaderLine_Component_React } from './proteinSequenceWidgetDisplay_HeaderLine_Component_React';
import {
    ProteinSequenceWidgetDisplay__PositionClicked_Callback,
    ProteinSequenceWidgetDisplay__PositionClicked_Callback_Params,
    ProteinSequenceWidgetDisplay_AllMainLines_Component_React
} from './proteinSequenceWidgetDisplay_AllMainLines_Component_React';



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

        return (                                            

            <div >
            
                <div className=" protein-sequence-formatted-sequence-data-block protein-sequence-formatted-sequence-data-block-actual-sequence-font protein-sequence-formatted-sequence-data-block-actual-sequence-text-formatting " >
                                        
                    <ProteinSequenceWidgetDisplay_HeaderLine_Component_React 
                        dataPerSequencePosition_length={ this.props.proteinSequenceWidgetDisplay_Component_Data.dataPerSequencePosition.length }
                    />

                    <ProteinSequenceWidgetDisplay_AllMainLines_Component_React
                        proteinSequenceWidgetDisplay_Component_Data={ this.props.proteinSequenceWidgetDisplay_Component_Data }
                        positionClicked_Callback={ this._positionClicked_Callback_BindThis }
                    />

                </div>

                <ProteinSequenceWidgetDisplay_Legend_Component_React />
            </div>
            
        );
    }

}
