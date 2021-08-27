/**
 * qcViewPage_DisplayData_ProteinList__Main_Component.tsx
 *
 * Protein Page Main Content:
 *
 * Main Content of Protein Page
 *
 */

import React from "react";

import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryTooltip, VictoryScatter, VictoryBoxPlot } from 'victory';

import {Spinner_Limelight_Component} from "page_js/common_all_pages/spinner_ReactComponent_Limelight";


import {DataPageStateManager} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {SearchDetailsBlockDataMgmtProcessing} from "page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsBlockDataMgmtProcessing";
import {CentralPageStateManager} from "page_js/data_pages/central_page_state_manager/centralPageStateManager";
import {DataPages_LoggedInUser_CommonObjectsFactory} from "page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory";
import {
    SearchDataLookupParameters_Root,
} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {
    SearchDetailsAndFilterBlock_MainPage_Root,
    SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue
} from "page_js/data_pages/search_details_block__project_search_id_based/jsx/searchDetailsAndFilterBlock_MainPage_Root";
import {SearchDetailsAndOtherFiltersOuterBlock_Layout} from "page_js/data_pages/search_details_and_other_filters_outer_block__project_search_id_based/jsx/searchDetailsAndOtherFiltersOuterBlock_Layout";
import {SharePage_Component} from "page_js/data_pages/sharePage_React/sharePage_Component_React";
import {
    SaveView_Create_Component_React_Result,
    SaveView_Create_Component_React_Type
} from "page_js/data_pages/saveView_React/saveView_Create_Component_React_FunctionTemplate";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";

/**
 *
 */
export class QcViewPage_DisplayData_ProteinList__Main_Component_Props_Prop {

    projectSearchIds : Array<number>
    dataPageStateManager : DataPageStateManager
    dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager;
    searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing;

    centralPageStateManager: CentralPageStateManager

    dataPages_LoggedInUser_CommonObjectsFactory : DataPages_LoggedInUser_CommonObjectsFactory
}

/**
 *
 */
export interface QcViewPage_DisplayData_ProteinList_Integrated_SingleMultipleSearchSubGroups__Main_Component_Props {

    propsValue : QcViewPage_DisplayData_ProteinList__Main_Component_Props_Prop
}

/**
 *
 */
interface QcViewPage_DisplayData_ProteinList_Integrated_SingleMultipleSearchSubGroups__Main_Component_State {

    searchDataLookupParamsRoot? : SearchDataLookupParameters_Root;

    show_InitialLoadingData_Message? : boolean;

    mainDisplayData_Loaded? : boolean;

    searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue? : SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue

    //

    saveView_Component_React?: any //  React Component for Save View
    saveView_Component_Props_Prop?: any //  Object passed to saveView_Component_React as property propsValue


    numberChartsToMake?: number
}

/**
 *
 */
export class QcViewPage_DisplayData_ProteinList__Main_Component extends React.Component< QcViewPage_DisplayData_ProteinList_Integrated_SingleMultipleSearchSubGroups__Main_Component_Props, QcViewPage_DisplayData_ProteinList_Integrated_SingleMultipleSearchSubGroups__Main_Component_State > {

    //  bind to 'this' for passing as parameters

    private inputNumber_ref :  React.RefObject<HTMLInputElement>

    /**
     *
     */
    constructor(props: QcViewPage_DisplayData_ProteinList_Integrated_SingleMultipleSearchSubGroups__Main_Component_Props) {
        super(props);

        this.inputNumber_ref = React.createRef();

        // const searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue : SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue =
        //     QcViewPage_DisplayData_ProteinList__Main_Component_nonClass_Functions.compute_searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue({
        //         propsValue : props.propsValue
        //     });

        const searchDataLookupParamsRoot: SearchDataLookupParameters_Root =
            props.propsValue.searchDetailsBlockDataMgmtProcessing.getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_AllProjectSearchIds();

        let saveView_Component_React = undefined;
        let saveView_Component_Props_Prop = undefined;

        if ( props.propsValue.dataPages_LoggedInUser_CommonObjectsFactory ) {

            if ( props.propsValue.dataPages_LoggedInUser_CommonObjectsFactory.getFunctionToGet_SaveView_dataPages_ComponentAndProps ) {
                const saveView_Create_Component_React_Type : SaveView_Create_Component_React_Type = (
                    props.propsValue.dataPages_LoggedInUser_CommonObjectsFactory.getFunctionToGet_SaveView_dataPages_ComponentAndProps()
                );

                const result : SaveView_Create_Component_React_Result = saveView_Create_Component_React_Type({ projectSearchIds : props.propsValue.projectSearchIds, experimentId : undefined });
                saveView_Component_React = result.saveView_Component_React
                saveView_Component_Props_Prop = result.saveView_Component_Props_Prop
            }
        }

        this.state = {
            show_InitialLoadingData_Message: false, //  TODO  Set to true when start loading data
            // searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue,
            searchDataLookupParamsRoot,
            saveView_Component_React,
            saveView_Component_Props_Prop
        }
    }

    /**
     *
     */
    componentDidMount() {
        try {
            window.setTimeout( () => {
                try {
                    this._runOnPageLoad();

                } catch( e ) {
                    console.warn("Exception caught in componentDidMount inside setTimeout");
                    console.warn( e );
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }, 10 );

        } catch( e ) {
            console.warn("Exception caught in componentDidMount");
            console.warn( e );
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *  Run on Page Load.  call from componentDidMount
     */
    private _runOnPageLoad() {

        // this._recompute_FullPage_Except_SearchDetails({ initialPageLoad: true });
    }

    /**
     *
     */
    render() {

        let saveView_Component : JSX.Element = undefined;

        if ( this.state.saveView_Component_React ) {

            //  Create "Save View" Component

            //  variable must start with Constant "S" since is React Component
            const SaveView_Component_React = this.state.saveView_Component_React;
            const saveView_Component_Props_Prop = this.state.saveView_Component_Props_Prop;

            saveView_Component = (

                <React.Fragment>

                    <SaveView_Component_React
                        propsValue={ saveView_Component_Props_Prop }
                    />

                    <span >&nbsp;</span>

                </React.Fragment>
            );
        }

        const plotContainerElements : Array<JSX.Element> = [];

        if ( this.state.numberChartsToMake ) {

            for (let counter = 1; counter <= this.state.numberChartsToMake; counter++) {

                console.warn("Adding SimplePlot for counter: " + counter);

                const plotContainerElement = (
                    <SinglePlot key={counter} counter={counter}/>
                )

                plotContainerElements.push(plotContainerElement)
            }
        }

        return (
            <React.Fragment>

                <div >

                    <div > {/* start display of data above QC Charts */}

                        <div >
                            {/* Main Content above QC charts  */}

                            {/* 
                            <SearchDetailsAndOtherFiltersOuterBlock_Layout>
                                <SearchDetailsAndFilterBlock_MainPage_Root
                                    propValue={ this.state.searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue }
                                    searchSubGroup_CentralStateManagerObjectClass={ this.props.propsValue.searchSubGroup_CentralStateManagerObjectClass }
                                    searchSubGroup_SelectionsChanged_Callback={ this._searchSubGroup_SelectionsChanged_Callback_BindThis }
                                    searchSubGroup_ManageGroupNames_Clicked_Callback={ () => { window.alert("searchSubGroup_ManageGroupNames_Clicked_Callback called"); throw Error("searchSubGroup_ManageGroupNames_Clicked_Callback not handled")} }
                                />
                            </SearchDetailsAndOtherFiltersOuterBlock_Layout>
                            */}

                            <div style={ { paddingBottom: 15 } }>

                                { saveView_Component }

                                <SharePage_Component
                                    projectSearchIds={ this.props.propsValue.projectSearchIds }
                                />
                            </div>

                        </div>  {/* END: Main Content above QC charts  */}

                    </div>  {/* Close display of data above QC charts */}

                    {/* ***   Display of QC charts   *** */}

                    <h3> QC charts:</h3>

                    { ( this.state.show_InitialLoadingData_Message ) ? (

                        <div >
                            <div >
                                Loading Data
                            </div>
                            <div style={ { paddingTop: 40, paddingBottom: 80 } }>
                                <Spinner_Limelight_Component/>
                            </div>
                        </div>

                    ) : null }


                    {/*  Outer Container for "Updating Charts" overlay  */}
                    <div style={ { position: "relative", display: "inline-block" } }> {/*    display: inline-block; so overlay doesn't extend right past the table right edge */}

                        {/*  QC charts is displayed here */}

                        <div>
                            <div >
                                Number of plots to make <input type="text" ref={ this.inputNumber_ref } defaultValue={ 1 }/>
                            </div>
                            <div >
                                <button
                                    onClick={ event => {
                                        this.setState({ numberChartsToMake: Number.parseInt( this.inputNumber_ref.current.value ) })
                                    }}
                                >Make Charts</button>
                            </div>
                            <div >
                                { plotContainerElements }
                            </div>
                        </div>

                        {/*    Cover over protein list when updating */}
                        {/*
                        { ( this.state.show_UpdatingProteinList_Message && ( ! this.state.show_InitialLoadingData_Message ) ) ? (
                            <div className=" block-updating-overlay-container ">
                                <div style={ {  marginTop: 4, textAlign: "center" } }>
                                    Updating QC charts
                                </div>
                            </div>
                        ) : null }
                        */}


                    </div>   {/*   Close:   everything main after <h3> QC charts:</h3>  */}

                </div>

            </React.Fragment>
        )
    }

}

/////////////////////////////////

//  Single Plot Sample


/**
 *
 */
interface SinglePlot_Props {

    counter: number
    _placeholder?: any
}

/**
 *
 */
interface SinglePlot_State {

    _placeholder?: any
}

/**
 *
 */
class SinglePlot extends React.Component< SinglePlot_Props, SinglePlot_State > {

    //  bind to 'this' for passing as parameters

    private plot_Ref :  React.RefObject<HTMLDivElement>

    /**
     *
     */
    constructor(props: SinglePlot_Props) {
        super(props);

        this.plot_Ref = React.createRef();
    }

    render() {

        // const data = [
        //     {quarter: 1, earnings: 13000},
        //     {quarter: 2, earnings: 16500},
        //     {quarter: 3, earnings: 14250},
        //     {quarter: 4, earnings: 19000}
        // ];

        const data = [
            {quarter: 1, earnings: 53000, label: "q1"},
            {quarter: 2, earnings: 26500, label: "q2"},
            {quarter: 3, earnings: 84250, label: "q3"},
            {quarter: 4, earnings: 19000, label: "q4"}
        ];

        return (
            <div >
                <div >
                    Plot for counter { this.props.counter }.
                </div>
                <div >
                    {/*
                    <button
                        onClick={ event => {

                            Plotly.downloadImage(this.plot_Ref.current, {format: 'png', width: 800, height: 600, filename: 'newplot_png'});
                        }}
                    >
                        Download as PNG
                    </button>
                    <span> </span>

                    <button
                        onClick={ event => {

                            Plotly.downloadImage(this.plot_Ref.current, {format: 'svg', width: 800, height: 600, filename: 'newplot_svg'});
                        }}
                    >
                        Download as SVG
                    </button>
                    <span> </span>
                    */}
                </div>
                <div>
                    <div ref={this.plot_Ref}>
                        <VictoryChart
                            // adding the material theme provided with Victory
                            theme={VictoryTheme.material}
                            domainPadding={20}
                        >
                            <VictoryAxis
                                tickValues={[1, 2, 3, 4]}
                                tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
                            />
                            <VictoryAxis
                                dependentAxis
                                tickFormat={(x) => (`$${x / 1000}k`)}
                            />
                            <VictoryBar
                                //  Default tooltip using 'label' property in each entry
                                // labelComponent={<VictoryTooltip/>}
                                //  customizable tooltip
                                labelComponent={
                                    <VictoryTooltip
                                        // cornerRadius={({ datum }) => {
                                        //
                                        //     console.warn( "VictoryTooltip.cornerRadius: datum: ", datum )
                                        //
                                        //     return datum.x > 6 ? 0 : 20
                                        // }}
                                        // pointerLength={({ datum }) => {
                                        //
                                        //     console.warn( "VictoryTooltip.pointerLength: datum: ", datum )
                                        //
                                        //     return datum.y > 0 ? 5 : 20
                                        // }}
                                        // flyoutStyle={{
                                        //     stroke: ({ datum }) => {
                                        //
                                        //         console.warn( "VictoryTooltip.flyoutStyle.stroke: datum: ", datum )
                                        //
                                        //         return datum.x === 10
                                        //             ? "tomato"
                                        //             : "black"
                                        //     }
                                        //
                                        // }}
                                    />
                                }
                                data={data}
                                // data accessor for x values
                                x="quarter"
                                // data accessor for y values
                                y="earnings"
                            />
                        </VictoryChart>
                    </div>
                    <div>
                        <div>
                            Scatter Plot example https://formidable.com/open-source/victory/docs/victory-scatter#victoryscatter
                        </div>
                        <div>
                            <VictoryChart
                                theme={VictoryTheme.material}
                                domain={{ x: [0, 5], y: [0, 7] }}
                            >
                                <VictoryScatter
                                    labelComponent={
                                        <VictoryTooltip/>
                                    }
                                    style={{ data: { fill: "#c43a31" } }}
                                    size={7}
                                    data={[
                                        { x: 1, y: 2, label: "1_2" },
                                        { x: 2, y: 3, label: "2_3" },
                                        { x: 3, y: 5, label: "3_5" },
                                        { x: 4, y: 4, label: "4_4" },
                                        { x: 5, y: 7, label: "5_7" }
                                    ]}
                                />
                            </VictoryChart>
                        </div>
                    </div>

                    <div>
                        <div>
                            BoxPlot example https://formidable.com/open-source/victory/docs/victory-box-plot#data
                        </div>
                        <div>
                            Specifying the min: 2, median: 5, max: 10, q1: 3, q3: 7
                        </div>
                        <div>
                            <VictoryChart
                                theme={VictoryTheme.material}
                                domainPadding={20}
                                // domain={{ x: [0, 5], y: [0, 7] }}
                            >
                                <VictoryBoxPlot
                                    maxLabelComponent={ <VictoryTooltip/> }
                                    medianLabelComponent={ <VictoryTooltip/> }
                                    minLabelComponent={ <VictoryTooltip/> }
                                    q1LabelComponent={ <VictoryTooltip/> }
                                    q3LabelComponent={ <VictoryTooltip/> }
                                    boxWidth={10}
                                    whiskerWidth={5}
                                    categories={{ x: ["dogs", "cats", "mice"] }}
                                    data={[
                                        { x: "dogs", min: 2, median: 5, max: 10, q1: 3, q3: 7 },
                                        { x: "cats", min: 1, median: 4, max: 9, q1: 3, q3: 6 },
                                        { x: "mice", min: 1, median: 6, max: 12, q1: 4, q3: 10 }
                                    ]}/>
                                </VictoryChart>
                                </div>
                                </div>
                </div>

                {/*
                <div>
                    <div>
                        { "plot as new inner assigned <svg>" }
                    </div>
                    <div>
                        <div ref={this.newPlot_Ref}></div>
                    </div>
                </div>
                <div>
                    <div>
                        { "plot as static image using Plotly plot to image function Plotly.toImage which results in string to put in 'src' in <img src=''/> "}
                    </div>
                    <div>
                        <img ref={ this.image_Ref }/>
                    </div>
                </div>
                */}

            </div>
        );
    }


}


////////////////////////
////////////////////////
////////////////////////

//  NON Class Functions
