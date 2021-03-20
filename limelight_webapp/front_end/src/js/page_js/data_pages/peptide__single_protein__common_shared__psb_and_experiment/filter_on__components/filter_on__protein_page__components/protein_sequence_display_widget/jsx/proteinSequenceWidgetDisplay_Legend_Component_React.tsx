/**
 * proteinSequenceWidgetDisplay_Legend_Component_React.tsx
 * 
 * Protein Sequence Widget Display - Legend
 * 
 */

import React from 'react'

export interface ProteinSequenceWidgetDisplay_Legend_Component_React_Props {


}

export interface ProteinSequenceWidgetDisplay_Legend_Component_React_State {

    _placeholder: any
}

/**
 * 
 */
export class ProteinSequenceWidgetDisplay_Legend_Component_React extends React.Component< ProteinSequenceWidgetDisplay_Legend_Component_React_Props, ProteinSequenceWidgetDisplay_Legend_Component_React_State > {

    /**
     * 
     */    
    constructor(props : ProteinSequenceWidgetDisplay_Legend_Component_React_Props) {
        super(props);

        //  bind to 'this' for passing as parameters
        // this._callbackMethodForSelectedProteinSequenceChange_BindThis = this._callbackMethodForSelectedProteinSequenceChange.bind(this);

        this.state = { _placeholder: null };
    }


    /**
     * After render()
     */
    // componentDidMount() {

    //     console.log("ProteinSequenceWidgetDisplay_Legend_Component_React: componentDidMount");
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
    shouldComponentUpdate(nextProps: ProteinSequenceWidgetDisplay_Legend_Component_React_Props, nextState: ProteinSequenceWidgetDisplay_Legend_Component_React_State) {

        // console.log("ProteinSequenceWidgetDisplay_Legend_Component_React: shouldComponentUpdate")

        //  Only update if changed: props: dataObject_columnEntry or dataObject

        // if ( this.props.dataObject_columnEntry !== nextProps.dataObject_columnEntry ) {
        //     return true;
        // }
        // if ( this.props.dataObject !== nextProps.dataObject ) {
        //     return true;
        // }
        // return false;


        return false;  //  Never changes so Never re-render

        //  If Comment out prev code, uncomment this:

        // return true;
    }

    // getSnapshotBeforeUpdate( <see docs> ) {


    // }


    /**
     * After render()
     */
    // componentDidUpdate(prevProps, prevState, snapshot) {

    //     // console.log("ProteinSequenceWidgetDisplay_Legend_Component_React: componentDidUpdate")

    //     // if ( this.dataObject_columnEntry_NewValue_Callback ) {
    //     //     this.dataObject_columnEntry_NewValue_Callback({ dataObject_columnEntry : this.props.dataObject_columnEntry });
    //     // }
    // }

    /**
     * 
     */
    // _callbackMethodForSelectedProteinSequenceChange( params ) {

    //     console.log("ProteinSequenceWidgetDisplay_Legend_Component_React: _callbackMethodForSelectedProteinSequenceChange. params: ");
    //     console.log( params );

    // }

    /**
     * 
     */    
    render() {

        return (

            // Grid Legend
        
            // added class 'protein-sequence-formatted-sequence-data-block' so formatting of 'pos' ... is same 
            //         as in the protein sequence

            <div  className=" protein-sequence-formatted-sequence-data-block "
                style={ { display: "grid", gridTemplateColumns: "80px 520px 180px", marginTop: 10 } }>
                {/*  Grid: "Legend:", <Samples and Text Blocks>, <Instructions>  */}
            
                <div className=" pos-legend-top-labels pos-legend-boxes-other-than-seq-examples " >
                    Legend:
                </div>
                
                <div >
                    <div style={ { display: "grid", gridTemplateColumns: "35px 140px 35px 280px" } }>
                        {/*  
                                Grid is 2 entries per row:
        
                                Grid: <Sample>, <Text Block for Sample>, <Sample>, <Text Block for Sample>  */}
        
                        {/*  When changing the order of Legend Items, Move each "pair" of <div> together, sample and it's text block
                            <div >
                                <div >
                                    SAMPLE 
                                </div>
                            </div>	
                            <div>
                                Text Block for SAMPLE
                            </div>
                        */}
        
                        {/*   Row 1  */}
        
                        <div className=" pos-legend-items ">
                            <div className=" pos pos-uncovered protein-sequence-formatted-sequence-data-block-actual-sequence-font ">
                                KGS
                            </div>
                        </div>
                        <div className=" pos-legend-labels pos-legend-items pos-legend-boxes-other-than-seq-examples ">
                            Uncovered residue  
                        </div>
        
                        <div className=" pos-legend-items ">
                            <div  className=" pos pos-covered-within-filter-nomod protein-sequence-formatted-sequence-data-block-actual-sequence-font ">
                                    LNE
                            </div>
                        </div>
                        <div className=" pos-legend-labels pos-legend-items pos-legend-boxes-other-than-seq-examples ">
                            Covered residue (in filter)
                        </div>
        
                        {/*   Row 2  */}
        
                        <div className=" pos-legend-items ">
                            {/*  pos-covered-outside-filter-nomod and pos-covered-nofilters-nomod  */}
                            <div  className=" pos pos-covered-nofilters-nomod protein-sequence-formatted-sequence-data-block-actual-sequence-font "> 
                                    LNE
                            </div>
                        </div>
                        <div className=" pos-legend-labels pos-legend-items pos-legend-boxes-other-than-seq-examples ">
                            Covered residue
                        </div>
        
                        <div className=" pos-legend-items ">
                            {/*  pos-covered-within-filter-mod-no-filter and pos-covered-within-filter-mod-within-filter  */}
                            <div  className=" pos pos-covered-within-filter-mod-no-filter protein-sequence-formatted-sequence-data-block-actual-sequence-font ">
                                    LNE
                            </div>
                        </div>
                        <div className=" pos-legend-labels pos-legend-items pos-legend-boxes-other-than-seq-examples ">
                            Modified residue (in filter)
                        </div>
        
                        {/*   Row 3  */}
        
                        <div className=" pos-legend-items ">
                            {/*  pos-covered-outside-filter-mod and pos-covered-nofilters-mod  */}
                            <div className=" pos pos-covered-outside-filter-mod protein-sequence-formatted-sequence-data-block-actual-sequence-font "> 
                                    LNE
                            </div>
                        </div>
                        <div className=" pos-legend-labels pos-legend-items pos-legend-boxes-other-than-seq-examples ">
                            Modified residue
                        </div>
                        
                        <div className=" pos-legend-items ">
                            <div  className=" pos pos-covered-within-filter-mod-outside-filter protein-sequence-formatted-sequence-data-block-actual-sequence-font ">
                                    LNE
                            </div>
                        </div>
                        <div className=" pos-legend-labels pos-legend-items pos-legend-boxes-other-than-seq-examples ">
                            Modified residue (in filter, not selected mod)
                        </div>
        
                    </div>
                </div>
                
                <div className=" pos-instructions-text " style={ { marginRight: 0 } } >
                    <div >
                        Click residue to select it and update displayed peptides. 
                    </div>
                    <div >
                        Control-click to select multiple residues.
                    </div>
                </div>
            </div>
        );
    }    
}

                        
