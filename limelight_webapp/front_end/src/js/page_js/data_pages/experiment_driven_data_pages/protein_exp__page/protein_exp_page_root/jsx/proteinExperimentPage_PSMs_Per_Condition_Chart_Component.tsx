/**
 * proteinExperimentPage_PSMs_Per_Condition_Chart_Component.tsx
 * 
 * React Component to show a graphic of PSM counts for conditions
 * 
 * 
 * !!!!!!!!   Initially for just first 3 conditions to simplify coding
 * 
 * 
 */


//  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// When user adds or removes in the experiment builder, the data in 'conditionGroupsDataContainer' is removed.  

//  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


import React from 'react'
import {ProteinExperimentPage_PSMs_Per_Condition_Chart_TooltipManager} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_root/jsx/proteinExperimentPage_PSMs_Per_Condition_Chart_TooltipManager";
import {Experiment_Condition} from "page_js/data_pages/experiment_data_pages_common/experiment_ConditionGroupsContainer_AndChildren_Classes";

const _SVG_WIDTH_ProteinExperimentPage_PSMs_Per_Condition_Component = 400;
const _SVG_HEIGHT_ProteinExperimentPage_PSMs_Per_Condition_Component = 100;

export { _SVG_WIDTH_ProteinExperimentPage_PSMs_Per_Condition_Component, _SVG_HEIGHT_ProteinExperimentPage_PSMs_Per_Condition_Component }




/**
 *
 */
export class ProteinExperimentPage_PSMs_Per_Condition_Chart_Component_Props_PsmCounts_Entry {

    condition : Experiment_Condition
    projectSearchIds : Set<number>
    numPsms : number

    constructor({ condition, projectSearchIds, numPsms } : {
        condition : Experiment_Condition
        projectSearchIds : Set<number>
        numPsms : number
    }) {
        this.condition = condition
        this.projectSearchIds = projectSearchIds
        this.numPsms = numPsms
    }
}

/**
 *
 */
export class ProteinExperimentPage_PSMs_Per_Condition_Chart_Component_Props_PropsValue {

    psmCountsPerCondition : Array<ProteinExperimentPage_PSMs_Per_Condition_Chart_Component_Props_PsmCounts_Entry>

    constructor({ psmCountsPerCondition } : {
        psmCountsPerCondition : Array<ProteinExperimentPage_PSMs_Per_Condition_Chart_Component_Props_PsmCounts_Entry>
    }) {
        this.psmCountsPerCondition = psmCountsPerCondition;
    }
}

/**
 * 
 */
export interface ProteinExperimentPage_PSMs_Per_Condition_Chart_Component_Props {

    //  Standard property name for DataTable Cell Component
    cellMgmt_ExternalReactComponent_Data : ProteinExperimentPage_PSMs_Per_Condition_Chart_Component_Props_PropsValue
}


/**
 * 
 */
interface ProteinExperimentPage_PSMs_Per_Condition_Chart_Component_State {

    displayChart
}

/**
 * 
 */
export class ProteinExperimentPage_PSMs_Per_Condition_Chart_Component extends React.Component< ProteinExperimentPage_PSMs_Per_Condition_Chart_Component_Props, ProteinExperimentPage_PSMs_Per_Condition_Chart_Component_State > {

    private _displayTimeout;

    /**
     * 
     */    
    constructor(props : ProteinExperimentPage_PSMs_Per_Condition_Chart_Component_Props ) {
        super(props);

        //  bind to 'this' for passing as parameters

        if ( ! ( this.props.cellMgmt_ExternalReactComponent_Data instanceof ProteinExperimentPage_PSMs_Per_Condition_Chart_Component_Props_PropsValue ) ) {
            const  msg = "if ( ! ( this.props.cellMgmt_ExternalReactComponent_Data instanceof ProteinExperimentPage_PSMs_Per_Condition_Chart_Component_Props_PropsValue ) )"
            console.warn( msg )
            throw Error( msg )
        }

        this.state = { displayChart : undefined };
    }


    /**
     * After render()
     */
    componentWillUnmount() {

        if ( this._displayTimeout ) {
            window.clearTimeout( this._displayTimeout );
        }
    }

    /**
     * @returns true if should update, false otherwise
     */
    shouldComponentUpdate(nextProps : ProteinExperimentPage_PSMs_Per_Condition_Chart_Component_Props, nextState : ProteinExperimentPage_PSMs_Per_Condition_Chart_Component_State) : boolean {

        // console.log("DataTable_Table_DataRowEntry_External_Cell_Mgmt_React: shouldComponentUpdate")

        //  Only update if changed: 
        //      props: cellMgmt_ExternalReactComponent_Data 
        //      state: displayChart

        if ( this.props.cellMgmt_ExternalReactComponent_Data !== nextProps.cellMgmt_ExternalReactComponent_Data ) {
            return true;
        }
        if ( this.state.displayChart !== nextState.displayChart ) {
            return true;
        }
        return false;

        //  If Comment out prev code, uncomment this:

        // return true;
    }

    /**
     * After render()
     */
    componentDidMount() {

        // console.log("ProteinExperimentPage_PSMs_Per_Condition_Component: componentDidMount");

        // this._displayTimeout = window.setTimeout( () => {
        //     this._displayTimeout = null;
        //
        //
        //     this.setState( (state: ProteinExperimentPage_PSMs_Per_Condition_Component_State, props: ProteinExperimentPage_PSMs_Per_Condition_Component_Props ) : ProteinExperimentPage_PSMs_Per_Condition_Component_State => {
        //
        //         return { displayChart : true };
        //     });
        // }, 0 );
    }

    /**
     * 
     */    
    render() {

        // this.props:
        // cellMgmt_ExternalReactComponent_Data={ this.props.cellMgmt_ExternalReactComponent_Data }
        // columnWidth={ column.width }
        // columnHeightInitial={ column.heightInitial }

        // console.log("ProteinExperimentPage_PSMs_Per_Condition_Component")

        // if ( ! this.state.displayChart ) {
        //     //  Delay displaying chart
        //     //  EARLY RETURN
        //     return (
        //         <div>Loading</div>
        //     );
        // }

        const psmCountsPerCondition = this.props.cellMgmt_ExternalReactComponent_Data.psmCountsPerCondition;


        let maxPsmCount = 0;

        for ( const psmCountsPerConditionEntry of psmCountsPerCondition ) {
            if ( psmCountsPerConditionEntry.numPsms > maxPsmCount ) {
                maxPsmCount = psmCountsPerConditionEntry.numPsms;
            }
        }

        const maxPsmCountString = maxPsmCount.toLocaleString();

        // const psmCountsPerConditionEntry = {
        //     condition,
        //     projectSearchIds,
        //     numPsms
        // }

        const conditions_singleBarRects : Array<JSX.Element> = [];

        const conditions_labels = [];

        {
            let index = 0;
            for ( const psmCountsPerConditionEntry of psmCountsPerCondition ) {
                
                if ( index > 2 ) {
                    break;  // EARLY BREAK LOOP
                }
                
                let x = 66;
                if ( index === 1 ) {
                    x = 168;
                }
                if ( index === 2 ) {
                    x = 271;
                }

                const heightFraction = psmCountsPerConditionEntry.numPsms / maxPsmCount;

                const singleBarRect = (

                    <SingleBarRect 
                        x={ x }
                        heightFraction={ heightFraction }
                        psmCountsPerConditionEntry={ psmCountsPerConditionEntry }
                        numPsms={ psmCountsPerConditionEntry.numPsms }
                    />
                );

                conditions_singleBarRects.push( singleBarRect );

                conditions_labels.push( psmCountsPerConditionEntry.condition.label );

                index++;
            }
        }

        return (
<svg width={ _SVG_WIDTH_ProteinExperimentPage_PSMs_Per_Condition_Component } height={ _SVG_HEIGHT_ProteinExperimentPage_PSMs_Per_Condition_Component } aria-label="A chart." style={ { overflow: "hidden" } }>
    {/*rect under whole SVG*/}
	{/*<rect x="0" y="0" width="400" height="100" stroke="none" strokeWidth="0" fill="#ffffff"></rect>*/}
	{/*rect under chart area*/}
	{/*<rect x="46" y="19" width="308" height="62" stroke="none" strokeWidth="0" fillOpacity="0" fill="#ffffff"></rect>*/}
	{/* Base Line as rect*/}
	{/*<rect x="46" y="80" width="308" height="1" stroke="none" strokeWidth="0" fill="#cccccc"></rect>*/}
	{/* Top Line as rect*/}
    {/*<rect x="46" y="19" width="308" height="1" stroke="none" strokeWidth="0" fill="#cccccc"></rect>*/}

        { conditions_singleBarRects[ 0 ] }
        { conditions_singleBarRects[ 1 ] }
        { conditions_singleBarRects[ 2 ] }

    {/* Base Line as rect*/}
	{/*<rect x="46" y="80" width="308" height="1" stroke="none" strokeWidth="0" fill="#333333"></rect>*/}
    {/*Base Line as line*/}
    <line x1={ 46 } y1={ 80 } x2={ 46 + 308 } y2={ 80 } width={ 1 } stroke={ "#000000" } />

	{/*<text textAnchor="middle" x="97.66666666666666" y="94.7" fontFamily="Arial" fontSize="12" stroke="none" strokeWidth="0" fill="#222222">{ conditions_labels[ 0 ]}</text>*/}
	{/*<text textAnchor="middle" x="200" y="94.7" fontFamily="Arial" fontSize="12" stroke="none" strokeWidth="0" fill="#222222">{ conditions_labels[ 1 ] }</text>*/}
	{/*<text textAnchor="middle" x="302.3333333333333" y="94.7" fontFamily="Arial" fontSize="12" stroke="none" strokeWidth="0" fill="#222222">{ conditions_labels[ 2 ] }</text>*/}
	{/*<text textAnchor="end" x="38" y="84.7" fontFamily="Arial" fontSize="12" stroke="none" strokeWidth="0" fill="#444444">0</text>*/}
	{/*<text textAnchor="end" x="38" y="23.7" fontFamily="Arial" fontSize="12" stroke="none" strokeWidth="0" fill="#444444">{ maxPsmCountString }</text>*/}

</svg>

        );
    }

}



const _VALUE_RECT_COLOR_DEFAULT = "#3366cc";
// const _VALUE_RECT_COLOR_HOVER = "#ff0000";

interface SingleBarRect_Props {
    
    x : number
    heightFraction : number
    psmCountsPerConditionEntry : ProteinExperimentPage_PSMs_Per_Condition_Chart_Component_Props_PsmCounts_Entry
    numPsms : number
}

interface SingleBarRect_State {
    
    color
}

/**
 * 
 */
class SingleBarRect extends React.Component< SingleBarRect_Props, SingleBarRect_State > {

    //  bind to 'this' for passing as parameters
    private _onMouseEnter_BindThis = this._onMouseEnter.bind(this);
    private _onMouseLeave_BindThis = this._onMouseLeave.bind(this);

    private _proteinExperimentPage_PSMs_Per_Condition_Chart_TooltipManager = new ProteinExperimentPage_PSMs_Per_Condition_Chart_TooltipManager()

    /**
     * 
     */    
    constructor(props : SingleBarRect_Props) {
        super(props);

        this.state = {
            color: _VALUE_RECT_COLOR_DEFAULT
        }
    }


    /**
     * After render()
     */
    // componentDidMount() {

    //     console.log("SingleBarRect: componentDidMount");


    // }

    /**
     * 
     */   
    _onMouseEnter( event ) {

        // console.log("_onMouseEnter");

        // this.setState( (state, props) => {
        //     return {
        //         color: _VALUE_RECT_COLOR_HOVER
        //     };
        // });

        const conditionLabel = this.props.psmCountsPerConditionEntry.condition.label
        const numPsms = this.props.numPsms

        const tooltipContents = (
            <React.Fragment >
                <div style={ { fontWeight: "bold" } }>Condition: { conditionLabel }<br/> Number of PSMs: { numPsms }</div>
            </React.Fragment>
        );

        this._proteinExperimentPage_PSMs_Per_Condition_Chart_TooltipManager.mouseEnter_ChartBar({ event, tooltipContents })
    }   
    /**
     * 
     */   
    _onMouseLeave( event ) {

        // console.log("_onMouseLeave");

        // this.setState( (state, props) => {
        //     return {
        //         color: _VALUE_RECT_COLOR_DEFAULT
        //     };
        // });

        this._proteinExperimentPage_PSMs_Per_Condition_Chart_TooltipManager.mouseLeave_ChartBar({ event });
    } 

    /**
     * 
     */    
    render() {

        const _FULL_HEIGHT_Y = 20; //  Y position of full height rect

        const _MAX_HEIGHT = 60;   //  Max height of rect

        const height = Math.floor( _MAX_HEIGHT * this.props.heightFraction );

        const y = _FULL_HEIGHT_Y + ( _MAX_HEIGHT - height );

        return (
            <rect x={ this.props.x } y={ y } width="63" height={ height } stroke="none" strokeWidth="0" fill={ this.state.color }
                onMouseEnter={ this._onMouseEnter_BindThis } onMouseLeave={ this._onMouseLeave_BindThis }
            >
            </rect>
        );
    }

}

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

//   Not in a class:

