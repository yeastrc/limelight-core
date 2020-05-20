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
import {ProteinExperimentPage_PSMs_Per_Condition_Chart_SingleBar_TooltipManager} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_root/jsx/proteinExperimentPage_PSMs_Per_Condition_Chart_SingleBar_TooltipManager";
import {Experiment_Condition} from "page_js/data_pages/experiment_data_pages_common/experiment_ConditionGroupsContainer_AndChildren_Classes";
import {ProteinExperimentPage_PSMs_Per_Condition_Chart_OverallChart_TooltipManager} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_root/jsx/proteinExperimentPage_PSMs_Per_Condition_Chart_OverallChart_TooltipManager";

const _SVG_WIDTH_ProteinExperimentPage_PSMs_Per_Condition_Component = 300;
const _SVG_HEIGHT_ProteinExperimentPage_PSMs_Per_Condition_Component = 80;

export { _SVG_WIDTH_ProteinExperimentPage_PSMs_Per_Condition_Component, _SVG_HEIGHT_ProteinExperimentPage_PSMs_Per_Condition_Component }

const _Padding_Above_Below_Chart = 10;
const _Padding_Left_Right_Chart = 20;

const _Chart_Bar_Standard_Padding_Each_Side_Fraction = 0.1;

// const _Chart_Bar_Max_Width = 65;
// const _Chart_Bar_Max_Width_Plus_Standard_Padding = Math.ceil( _Chart_Bar_Max_Width / ( 1 - ( _Chart_Bar_Standard_Padding_Each_Side_Fraction * 2 ) ) );
const _Chart_Bar_Min_Width_At_80_Percent = 5;

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

    // displayChart,
    _placeholder?
}

/**
 * 
 */
export class ProteinExperimentPage_PSMs_Per_Condition_Chart_Component extends React.Component< ProteinExperimentPage_PSMs_Per_Condition_Chart_Component_Props, ProteinExperimentPage_PSMs_Per_Condition_Chart_Component_State > {

    private _displayTimeout;

    private readonly _svg_container_Ref :  React.RefObject<HTMLDivElement>

    private _onMouseEnter_ChartContainerDiv_BindThis = this._onMouseEnter_ChartContainerDiv.bind(this);
    private _onMouseLeave_ChartContainerDiv_BindThis = this._onMouseLeave_ChartContainerDiv.bind(this);

    private _proteinExperimentPage_PSMs_Per_Condition_Chart_OverallChart_TooltipManager = new ProteinExperimentPage_PSMs_Per_Condition_Chart_OverallChart_TooltipManager();

    /**
     * 
     */    
    constructor(props : ProteinExperimentPage_PSMs_Per_Condition_Chart_Component_Props ) {
        super(props);

        this._svg_container_Ref = React.createRef();

        if ( ! ( this.props.cellMgmt_ExternalReactComponent_Data instanceof ProteinExperimentPage_PSMs_Per_Condition_Chart_Component_Props_PropsValue ) ) {
            const  msg = "if ( ! ( this.props.cellMgmt_ExternalReactComponent_Data instanceof ProteinExperimentPage_PSMs_Per_Condition_Chart_Component_Props_PropsValue ) )"
            console.warn( msg )
            throw Error( msg )
        }

        this.state = {
            // displayChart : undefined
        };
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
        // if ( this.state.displayChart !== nextState.displayChart ) {
        //     return true;
        // }
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
     * Mouse Enter Main <div> surrounding chart <svg>
     */
    _onMouseEnter_ChartContainerDiv(event :  React.MouseEvent<HTMLDivElement, MouseEvent>) {

        // console.warn("onMouseEnter: <div> around SVG Container. this._svg_container_Ref.current: " , this._svg_container_Ref.current )

        const mouseEnter_target_DOM_Element : HTMLElement = this._svg_container_Ref.current;

        //  Tooltip Contents

        let tooltipContents : JSX.Element = undefined;

        {
            const entriesJSX : Array<JSX.Element> = [];
            for ( const psmCountsPerConditionEntry of this.props.cellMgmt_ExternalReactComponent_Data.psmCountsPerCondition ) {
                const entryJSX = (
                    <div key={ psmCountsPerConditionEntry.condition.id }>
                        { psmCountsPerConditionEntry.condition.label } : { psmCountsPerConditionEntry.numPsms }
                    </div>
                )
                entriesJSX.push( entryJSX )
            }

            tooltipContents =
            (
                <div style={ { color : "black" } }>
                    { entriesJSX }
                </div>
            )
        }

        this._proteinExperimentPage_PSMs_Per_Condition_Chart_OverallChart_TooltipManager.mouseEnter_ChartOverallArea({ mouseEnter_target_DOM_Element, tooltipContents })
    }
    /**
     * Mouse Leave Main <div> surrounding chart <svg>
     */
    _onMouseLeave_ChartContainerDiv(event :  React.MouseEvent<HTMLDivElement, MouseEvent>) {

        // console.warn("onMouseLeave: <div> around SVG Container")

        this._proteinExperimentPage_PSMs_Per_Condition_Chart_OverallChart_TooltipManager.mouseLeave_ChartOverallArea({ event })
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
        const numberOfBars = psmCountsPerCondition.length;

        let widthOfEachBar_PlusPadding = ( _SVG_WIDTH_ProteinExperimentPage_PSMs_Per_Condition_Component - ( _Padding_Left_Right_Chart * 2 ) ) / numberOfBars;
        let paddingOnEachSideOfBar = widthOfEachBar_PlusPadding * _Chart_Bar_Standard_Padding_Each_Side_Fraction;
        let widthOfEachBar = widthOfEachBar_PlusPadding - ( paddingOnEachSideOfBar * 2 );

        if ( widthOfEachBar < _Chart_Bar_Min_Width_At_80_Percent ) {
            widthOfEachBar = widthOfEachBar_PlusPadding;
            paddingOnEachSideOfBar = 0;
        }

        let maxPsmCount = 0;

        for ( const psmCountsPerConditionEntry of psmCountsPerCondition ) {
            if ( psmCountsPerConditionEntry.numPsms > maxPsmCount ) {
                maxPsmCount = psmCountsPerConditionEntry.numPsms;
            }
        }

        // const maxPsmCountString = maxPsmCount.toLocaleString();

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

                const leftXOfEachBar = ( widthOfEachBar_PlusPadding * index ) + paddingOnEachSideOfBar;

                const heightFraction = psmCountsPerConditionEntry.numPsms / maxPsmCount;

                const singleBarRect = (

                    <SingleBarRect key={ index }
                        leftXOfEachBar={ leftXOfEachBar }
                        widthOfBar={ widthOfEachBar }
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

<div style={ {
    position: "relative",
    width : _SVG_WIDTH_ProteinExperimentPage_PSMs_Per_Condition_Component, height : _SVG_HEIGHT_ProteinExperimentPage_PSMs_Per_Condition_Component,
    paddingTop: _Padding_Above_Below_Chart, paddingBottom : _Padding_Above_Below_Chart,
    paddingLeft : _Padding_Left_Right_Chart, paddingRight : _Padding_Left_Right_Chart
} }

>
 <div
     onMouseEnter={ this._onMouseEnter_ChartContainerDiv_BindThis }
     onMouseLeave={ this._onMouseLeave_ChartContainerDiv_BindThis }
     ref={ this._svg_container_Ref }
 >
  <svg
      width={ _SVG_WIDTH_ProteinExperimentPage_PSMs_Per_Condition_Component - ( _Padding_Left_Right_Chart * 2 ) }
      height={ _SVG_HEIGHT_ProteinExperimentPage_PSMs_Per_Condition_Component - ( _Padding_Above_Below_Chart * 2 ) }
      aria-label="A chart." style={ { overflow: "hidden" } }
  >
    {/*rect under whole SVG*/}
	{/*<rect x="0" y="0" width="400" height="100" stroke="none" strokeWidth="0" fill="#ffffff"></rect>*/}
	{/*rect under chart area*/}
	{/*<rect x="46" y="19" width="308" height="62" stroke="none" strokeWidth="0" fillOpacity="0" fill="#ffffff"></rect>*/}
	{/* Base Line as rect*/}
	{/*<rect x="46" y="80" width="308" height="1" stroke="none" strokeWidth="0" fill="#cccccc"></rect>*/}
	{/* Top Line as rect*/}
    {/*<rect x="46" y="19" width="308" height="1" stroke="none" strokeWidth="0" fill="#cccccc"></rect>*/}

        { conditions_singleBarRects }

    {/* Base Line as rect*/}
	{/*<rect x="46" y="80" width="308" height="1" stroke="none" strokeWidth="0" fill="#333333"></rect>*/}
    {/*Base Line as line*/}
    <line
        x1={ 0 }
        y1={ _SVG_HEIGHT_ProteinExperimentPage_PSMs_Per_Condition_Component - ( _Padding_Above_Below_Chart * 2 ) }
        x2={ _SVG_WIDTH_ProteinExperimentPage_PSMs_Per_Condition_Component - ( _Padding_Left_Right_Chart * 2 ) }
        y2={ _SVG_HEIGHT_ProteinExperimentPage_PSMs_Per_Condition_Component - ( _Padding_Above_Below_Chart * 2 ) }
        width={ 1 } stroke={ "#000000" }
    />

	{/*<text textAnchor="middle" x="97.66666666666666" y="94.7" fontFamily="Arial" fontSize="12" stroke="none" strokeWidth="0" fill="#222222">{ conditions_labels[ 0 ]}</text>*/}
	{/*<text textAnchor="middle" x="200" y="94.7" fontFamily="Arial" fontSize="12" stroke="none" strokeWidth="0" fill="#222222">{ conditions_labels[ 1 ] }</text>*/}
	{/*<text textAnchor="middle" x="302.3333333333333" y="94.7" fontFamily="Arial" fontSize="12" stroke="none" strokeWidth="0" fill="#222222">{ conditions_labels[ 2 ] }</text>*/}
	{/*<text textAnchor="end" x="38" y="84.7" fontFamily="Arial" fontSize="12" stroke="none" strokeWidth="0" fill="#444444">0</text>*/}
	{/*<text textAnchor="end" x="38" y="23.7" fontFamily="Arial" fontSize="12" stroke="none" strokeWidth="0" fill="#444444">{ maxPsmCountString }</text>*/}

  </svg>

 </div>
</div>
        );
    }

}



const _VALUE_RECT_COLOR_DEFAULT = "#3366cc";
// const _VALUE_RECT_COLOR_HOVER = "#ff0000";

interface SingleBarRect_Props {
    
    leftXOfEachBar : number
    widthOfBar : number
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

    private _proteinExperimentPage_PSMs_Per_Condition_Chart_TooltipManager = new ProteinExperimentPage_PSMs_Per_Condition_Chart_SingleBar_TooltipManager()

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

        const _FULL_HEIGHT_Y = 0; //  Y position of full height rect

        const _MAX_HEIGHT = _SVG_HEIGHT_ProteinExperimentPage_PSMs_Per_Condition_Component - ( _Padding_Above_Below_Chart * 2 );   //  Max height of rect

        const height = Math.floor( _MAX_HEIGHT * this.props.heightFraction );

        const y = _FULL_HEIGHT_Y + ( _MAX_HEIGHT - height );

        return (
            <rect x={ this.props.leftXOfEachBar } y={ y } width={ this.props.widthOfBar } height={ height } stroke="none" strokeWidth="0" fill={ this.state.color }
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

