/**
 * projPg_ExpermntsSection_ExpList_SingleExperimentDetails.tsx
 * 
 * Single Experiment Details in Main Page Experiment List
 * 
 * Sub-component of projPg_ExpermntsSectionRoot.tsx
 * 
 */


import React from 'react'

import { variable_is_type_number_Check } from 'page_js/variable_is_type_number_Check'

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { create_experimentConditions_GraphicRepresentation_PropsData, ExperimentConditions_GraphicRepresentation_PropsData } from 'page_js/data_pages/experiment_data_pages_common/create_experimentConditions_GraphicRepresentation_PropsData';

import { Experiment_SingleExperiment_ConditionsGraphicRepresentation } from 'page_js/data_pages/experiment_data_pages_common/experiment_SingleExperiment_ConditionsGraphicRepresentation';
import { Experiment_ConditionGroupsContainer, Experiment_Condition, create_Experiment_ConditionGroupsContainer_AndChildren_From_ServerSideParsedJSON } from 'page_js/data_pages/experiment_data_pages_common/experiment_ConditionGroupsContainer_AndChildren_Classes';
import { Experiment_ConditionGroupsDataContainer } from 'page_js/data_pages/experiment_data_pages_common/experiment_conditionGroupsDataContainer_Class';

import { getExperimentDataFromServer } from './projPg_Expermnts_Load_ExperimentData';

import {
    getSearchesDataForProject_ExperimentProcessing,
    GetSearchesDataForProject_ExperimentProcessing_Result
} from './projPg_Expermnts_Load_SearchesData_ForProject';
import {
    GetSearchesAndFolders_SingleProject_PromiseResponse,
    GetSearchesAndFolders_SingleProject_PromiseResponse_Item
} from "page_js/data_pages/data_pages_common/single_project_its_searches_and_folders/single_project_its_searches_and_folders_WebserviceRetrieval_TS_Classes";
import {
    AnnotationTypeData_Root,
    SearchProgramsPerSearchData_Root
} from "page_js/data_pages/data_pages_common/dataPageStateManager";

/**
 * 
 */
export interface ProjectPage_ExperimentsList_SingleExperimentDetails_Props {

    experimentItemFromExperimentList : any; //  { id, name } and boolean flags

    projectIdentifierFromURL : string
}

interface ProjectPage_ExperimentsList_SingleExperimentDetails_State {

    prev_experimentItemFromExperimentList? : any;

    showLoadingMsg? : boolean;

    experimentData? : any // Loaded from server

        //  Properties

        // draft:false
        // experimentJSONMainData:"{"version":1,"conditionGroupsContainer":{"version":1,"conditionGroupId_MaxAssignedValue":null,"conditionId_MaxAssignedValue":2,"conditionGroups":[{"id":-2,"label":"Biological Replicate","typeContinuous":null,"typeDiscrete":null,"typeBiologicalReplicate":true,"typeTechnicalReplicate":null,"typeTimePoint":null,"specialConditionGroup":true,"conditions":[{"label":"Bio Rep 1","id":0,"labelSuffixInitiallyAssigned":1},{"label":"Bio Rep 2","id":1,"labelSuffixInitiallyAssigned":2},{"label":"Bio Rep 3","id":2,"labelSuffixInitiallyAssigned":3}]}]},"experimentConditionData":{"mainResultDataArray":[{"conditions":null,"data":{"data":{"projectSearchIds":[267]}},"conditionId":1},{"conditions":null,"data":{"data":{"projectSearchIds":[239]}},"conditionId":2}]}}"
        // id:14
        // name:"draft to published - 222, 215 - update after publish"
        // projectSearchIdsOnlyJSON:"[239,267]"
        // searchDataLookupParams

    searchesData? : any

    conditionGroupsContainer? : Experiment_ConditionGroupsContainer;
    conditionGroupsDataContainer? : Experiment_ConditionGroupsDataContainer;

    experimentConditions_GraphicRepresentation_PropsData? : ExperimentConditions_GraphicRepresentation_PropsData;
}

/**
 * 
 */
export class ProjectPage_ExperimentsList_SingleExperimentDetails extends React.Component< ProjectPage_ExperimentsList_SingleExperimentDetails_Props, ProjectPage_ExperimentsList_SingleExperimentDetails_State > {

    private _mainCell_getHoverContents_BindThis = this._mainCell_getHoverContents.bind(this);

    private _searchDataMap_KeyProjectSearchId : Map<any, any>;


    constructor(props : ProjectPage_ExperimentsList_SingleExperimentDetails_Props) {
        super(props);

        // {
        //     //   Create Map of Search Data key projectSearchId

        //    this._searchDataMap_KeyProjectSearchId = new Map();

        //    const searchesData = this.props.searchesData;
        //    if ( searchesData ) {
        //        const searchList = searchesData.searchList;
        //        if ( searchList ) {
        //            for ( const search of searchList ) {
        //                const projectSearchId = search.projectSearchId;
        //                this._searchDataMap_KeyProjectSearchId.set( projectSearchId, search );
        //            }
        //        }
        //    }
        // }

        this.state = {
            showLoadingMsg : true,
            prev_experimentItemFromExperimentList : props.experimentItemFromExperimentList
        };
    }


	/**
	 * 
	 */
    componentDidMount() {

        if ( ! variable_is_type_number_Check( this.props.experimentItemFromExperimentList.id ) ) {
            throw Error("ProjectPage_ExperimentsList_SingleExperimentDetails:  Not a number 'this.props.experimentItemFromExperimentList.id'. value: " + this.props.experimentItemFromExperimentList.id );
        }

        const experimentId : number = this.props.experimentItemFromExperimentList.id;

        this._loadExperimentData({ experimentId })
    }

	/**
	 * @param experimentId - optional, not populated for create
	 */
	_loadExperimentData({ experimentId } : { experimentId : number }) {

		const promises = [];

		{
			const promise = getSearchesDataForProject_ExperimentProcessing({ projectIdentifier : this.props.projectIdentifierFromURL });
			promises.push( promise );
		}
		if ( experimentId !== undefined ) {

			const promise = getExperimentDataFromServer({ experimentId });
			promises.push( promise );
		}

		const promisesAll = Promise.all( promises );

		promisesAll.catch( (reason) => {  } );
		
		promisesAll.then ( ( promiseResults ) => {
			try {
				const results : {
                    searches_TopLevelAndNestedInFolders?: Array<GetSearchesAndFolders_SingleProject_PromiseResponse_Item>
                    noSearchesFound? : boolean
                    searchList_OnlySearches? : Array<GetSearchesAndFolders_SingleProject_PromiseResponse_Item>;

                    searchesSubData? : {
                        searchProgramsPerSearchData_Root :  SearchProgramsPerSearchData_Root,
                        annotationTypeData_Root : AnnotationTypeData_Root
                    }
                    experimentData?: any
				} = {};

				for ( const promiseResult_Uknown of promiseResults ) {

                    const promiseResult = promiseResult_Uknown as any;

					if ( promiseResult instanceof GetSearchesDataForProject_ExperimentProcessing_Result ) {
					    results.noSearchesFound = promiseResult.noSearchesFound;
						results.searches_TopLevelAndNestedInFolders = promiseResult.getSearchesAndFolders_SingleProject_PromiseResponse.items
                        results.searchList_OnlySearches = promiseResult.searchList_OnlySearches;
                        results.searchesSubData = promiseResult.searchesSubData;
					} else if ( promiseResult.experimentData ) {
						results.experimentData = promiseResult.experimentData;
					} else {
					    const msg = "_loadExperimentData(...): promisesAll.then: promiseResult is unknown type";
                        console.warn(msg);
                        throw Error(msg);
                    }
                }
                
				this._process_LoadedExperimentData({ results });

			} catch (e) {
				reportWebErrorToServer.reportErrorObjectToServer({
					errorException : e
				});
				throw e;
			}
		});
    }

    /**
     *
     * @param results
     */
    _process_LoadedExperimentData(
        {
            results
        } : {
            results : {
                searches_TopLevelAndNestedInFolders?: Array<GetSearchesAndFolders_SingleProject_PromiseResponse_Item>
                noSearchesFound? : boolean
                searchList_OnlySearches? : Array<GetSearchesAndFolders_SingleProject_PromiseResponse_Item>;

                searchesSubData? : {
                    searchProgramsPerSearchData_Root :  SearchProgramsPerSearchData_Root,
                    annotationTypeData_Root : AnnotationTypeData_Root
                }
                experimentData?: any
            }
        }) : void {

        const experimentData = results.experimentData;
        const searchList_OnlySearches = results.searchList_OnlySearches;
        const searchesSubData = results.searchesSubData;

        {
            //   Create Map of Search Data key projectSearchId

            this._searchDataMap_KeyProjectSearchId = new Map();

            if ( searchList_OnlySearches ) {
                for ( const search of searchList_OnlySearches ) {
                    const projectSearchId = search.projectSearchId;
                    this._searchDataMap_KeyProjectSearchId.set( projectSearchId, search );
                }
            }
        }

        const experimentMainData = JSON.parse( experimentData.experimentJSONMainData );
        const searchDataLookupParamsRoot = JSON.parse( experimentData.searchDataLookupParamsRootJSON );

        const conditionGroupsContainer : Experiment_ConditionGroupsContainer = create_Experiment_ConditionGroupsContainer_AndChildren_From_ServerSideParsedJSON( experimentMainData.conditionGroupsContainer );
        const conditionGroupsDataContainer : Experiment_ConditionGroupsDataContainer = new Experiment_ConditionGroupsDataContainer({
            
            experimentConditionData_Serialized : experimentMainData.experimentConditionData, 
            searchDataLookupParamsRoot
        });

        const experimentConditions_GraphicRepresentation_PropsData : ExperimentConditions_GraphicRepresentation_PropsData = ( 
            create_experimentConditions_GraphicRepresentation_PropsData({ conditionGroupsContainer, conditionGroupsDataContainer }) // Call External Function
        );

        this.setState( (state: ProjectPage_ExperimentsList_SingleExperimentDetails_State, props: Readonly<ProjectPage_ExperimentsList_SingleExperimentDetails_Props>) : ProjectPage_ExperimentsList_SingleExperimentDetails_State  => {

            return {
                showLoadingMsg : false,
                experimentData,
                conditionGroupsContainer,
                conditionGroupsDataContainer,
                experimentConditions_GraphicRepresentation_PropsData
            };
        });
    }


    // _get_experimentConditions_GraphicRepresentation_PropsData() {

    //     const conditionGroupsContainer = this.state.conditionGroupsContainer;
    //     const conditionGroupsDataContainer = this.state.conditionGroupsDataContainer;

    //     const experimentConditions_GraphicRepresentation_PropsData : ExperimentConditions_GraphicRepresentation_PropsData = ( 
    //         create_experimentConditions_GraphicRepresentation_PropsData({ conditionGroupsContainer, conditionGroupsDataContainer }) // Call External Function
    //     );
    //     this.setState( (state: ProjectPage_ExperimentsList_SingleExperimentDetails_State, props: Readonly<ProjectPage_ExperimentsList_SingleExperimentDetails_Props>) : ProjectPage_ExperimentsList_SingleExperimentDetails_State  => {

    //         return {
    //             experimentConditions_GraphicRepresentation_PropsData
    //         };
    //     });
    // }


    /**
     * 
     */
    _mainCell_getHoverContents({ conditionIdPath } : { conditionIdPath : Array<number> }) {

        const conditionGroupsDisplay = [];

        if ( conditionIdPath ) {

            const conditionGroupsContainer = this.state.conditionGroupsContainer;
            if ( conditionGroupsContainer ) {
                const conditionGroups = conditionGroupsContainer.conditionGroups;
                if ( conditionGroups ) {
                    const conditionGroupsLength = conditionGroups.length;

                    for ( let index_conditionGroups = 0; index_conditionGroups < conditionGroupsLength; index_conditionGroups++ ) {
                        
                        const conditionGroup = conditionGroups[ index_conditionGroups ];
                        const conditions = conditionGroup.conditions;

                        let condition_For_cell_conditionIdPath : Experiment_Condition = undefined;

                        for ( const condition_Entry of conditions ) {
                            for ( const cell_conditionIdPath of conditionIdPath ) {
                                if ( condition_Entry.id === cell_conditionIdPath ) {
                                    condition_For_cell_conditionIdPath = condition_Entry;
                                    break;
                                }
                            }
                            if ( condition_For_cell_conditionIdPath ) {
                                break;
                            }
                        }

                        if ( ! condition_For_cell_conditionIdPath ) {
                            //  No entry found so skip
                            continue;  // EARLY CONTINUE
                        } 

                        const conditionGroupDisplay = (
                            <li key={ index_conditionGroups } style={ { whiteSpace : "nowrap", marginBottom: 3 } }>
                                <span style={ { overflowWrap : "break-word"  /* Force single words to break to wrap if exceed max width */  } }
                                >{ conditionGroup.label }</span>
                                <span >:&nbsp;</span> 
                                <span style={ { overflowWrap : "break-word"  /* Force single words to break to wrap if exceed max width */  } }
                                >{ condition_For_cell_conditionIdPath.label }</span>
                            </li>
                        );
                        
                        conditionGroupsDisplay.push( conditionGroupDisplay );
                    }
                }
            }
        }

        let searchesDisplay = undefined;
        {
            const conditionGroupsDataContainer = this.state.conditionGroupsDataContainer;

            let conditionGroupsDataContainer_Entry = conditionGroupsDataContainer.get_data ({ 
                conditionIds_Array : conditionIdPath
            });

            // let projectSearchIdsString = "none";

            if ( conditionGroupsDataContainer_Entry ) {

                const conditionGroupsDataContainer_Entry_Data = conditionGroupsDataContainer_Entry.data;

                const projectSearchIds = conditionGroupsDataContainer_Entry_Data.projectSearchIds;

                if ( projectSearchIds ) {
                    //  projectSearchIds is Set
                    const projectSearchIdsArray = Array.from( projectSearchIds );
                    if ( projectSearchIdsArray.length !== 0 ) {

                        const searchDataEntries = [];

                        for ( const projectSearchId of projectSearchIdsArray ) {
                            const searchDataEntry = this._searchDataMap_KeyProjectSearchId.get( projectSearchId );
                            if ( ! searchDataEntry ) {
                                console.log("WARN: No entry in this._searchDataMap_KeyProjectSearchId for projectSearchId: " + projectSearchId );
                                continue; // EARLY CONTINUE
                            }
                            searchDataEntries.push( searchDataEntry );
                        }

                        searchDataEntries.sort( (a,b) => { // sort on searchId ascending
                            if (a.searchId < b.searchId) {
                                return -1;
                            } else if (a.searchId > b.searchId) {
                                return 1;
                            }
                            return 0
                        })

                        const searchComponents = [];
                        {
                            let index = 0;
                            for ( const searchDataEntry of searchDataEntries ) {
                                const searchComponent = (
                                    <li key={ index } style={ { marginBottom: 4 } }>
                                        <span >(</span> 
                                        <span >{ searchDataEntry.searchId }</span>
                                        <span >) </span> 
                                        <span style={ { overflowWrap : "break-word"  /* Force single words to break to wrap if exceed max width */  } }
                                        >{ searchDataEntry.name }</span>
                                    </li>
                                );
                                searchComponents.push( searchComponent );
                                index++;
                            }
                        }
                        searchesDisplay = (
                            <div >
                                <div style={ { fontWeight: "bold", marginTop: 5, marginBottom: 5 } }>
                                    Searches:
                                </div>
                                <div >
                                    <ul style={ { marginBlockStart: 0, marginBlockEnd: 0 } }>
                                        { searchComponents }
                                    </ul>
                                </div>
                            </div>
                        )
                    }
                }
            }
        }
        if ( searchesDisplay === undefined ) {
            searchesDisplay = (
                <div style={ { marginTop: 5, marginBottom: 5 } }>
                    <span style={ { fontWeight: "bold" } }>Searches:</span>
                    <span >&nbsp;empty</span>
                </div>
            );
        }

        const hoverContent = (
            <div style={ { textAlign : "left" } }>
                <div style={ { fontWeight: "bold", marginBottom: 5 } }>
                    Conditions:
                </div>
                <div >
                    <ul style={ { marginBlockStart: 0, marginBlockEnd: 0 } }>
                        { conditionGroupsDisplay }
                    </ul>
                </div>
                <div >
                    { searchesDisplay }
                </div>
            </div>
        );


        return { hoverContent };
    }

    render() {

        if ( this.state.showLoadingMsg ) {

            return (  //  EARLY RETURN
                <div>
                    Loading Data
                </div>
            )
        }

        let experiment_Layout_Container_ConditionsGraphicRepresentation : JSX.Element = undefined;

        if (  this.state.experimentConditions_GraphicRepresentation_PropsData ) {

            let mainCellClickHandler = undefined;
    
            let experiment_SingleExperiment_ConditionsGraphicRepresentation = (
                <Experiment_SingleExperiment_ConditionsGraphicRepresentation 
                    data={ this.state.experimentConditions_GraphicRepresentation_PropsData }
                    //    Remove to simplify user experience since clicking a condition doesn't do anything if a replicate condition is clicked.
                    // conditionCellClickHandler={ this._condition_InConditionMatrixGraphic_ClickHandler_BindThis }
                    mainCellClickHandler={ mainCellClickHandler }
                    // mainCell_onMouseEnterHandler={ this._mainCell_onMouseEnterHandler_BindThis }
                    // mainCell_onMouseLeaveHandler={ this._mainCell_onMouseLeaveHandler_BindThis }
                    mainCell_getHoverContents={ this._mainCell_getHoverContents_BindThis }
                    conditionGroupsContainer={ this.state.conditionGroupsContainer }
                />
            );

            experiment_Layout_Container_ConditionsGraphicRepresentation = (

                <React.Fragment>

                    
                    <div style={ { overflowX: "auto" } }>

                        <div style={ { borderColor: "black", borderStyle: "solid", borderWidth: 1, display: "inline-block" } }>
                            <div style={ { paddingTop: 1, paddingLeft: 3, paddingRight: 3, paddingBottom: 3 } }>
                                { experiment_SingleExperiment_ConditionsGraphicRepresentation }
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            );
        }

        return (
            <div >
                {/* <div style={ { fontWeight: "bold", marginBottom: 5 } }>  { / * whiteSpace: "nowrap",  * / }
                    Experiment ({ this.props.experimentItemFromExperimentList.id }) { this.props.experimentItemFromExperimentList.name }
                </div> */}
                { experiment_Layout_Container_ConditionsGraphicRepresentation }
            </div>
        )

    }

}

