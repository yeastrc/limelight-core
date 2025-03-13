/**
 * modViewPage_DisplayDataOnPage_createSearchDetailsSection.tsx
 *
 * Create JSX Element for Display of Search Details Section
 *
 *
 */

import React from 'react'
import {SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer} from "page_js/data_pages/search_details_and_other_filters_outer_block__project_search_id_based/jsx/searchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer";
import {SearchDetailsAndOtherFiltersOuterBlock_Layout} from "page_js/data_pages/search_details_and_other_filters_outer_block__project_search_id_based/jsx/searchDetailsAndOtherFiltersOuterBlock_Layout";
import {
    SearchDetailsAndFilterBlock_MainPage_Root,
    SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue
} from "page_js/data_pages/search_details_block__project_search_id_based/jsx/searchDetailsAndFilterBlock_MainPage_Root";
import {
    SaveView_Create_Component_React_Result,
    SaveView_Create_Component_React_Type
} from "page_js/data_pages/saveView_React/saveView_Create_Component_React_FunctionTemplate";
import {
    DataPages_LoggedInUser_CommonObjectsFactory
} from "page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory";
import {
    Get_SetDefaultView_Component_React_Type,
    SetDefaultView_Component_React_Params
} from "page_js/data_pages/setDefaultView_React/setDefaultView_Create_Component_React_FunctionTemplate";
import { SharePage_Component } from "page_js/data_pages/sharePage_React/sharePage_Component_React";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";


/**
 *
 */
export const modViewPage_DisplayDataOnPage_createSearchDetailsSection = function(
    {
        component_Props
    } : {
        component_Props: ModPage_SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer_Component_Props

    }) : JSX.Element {

    return (
        <ModPage_SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer_Component
            { ...component_Props }
        />
    );
}


/**
 *
 */
interface ModPage_SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer_Component_Props {

    searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue : SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue
    dataPages_LoggedInUser_CommonObjectsFactory : DataPages_LoggedInUser_CommonObjectsFactory
    projectSearchIds: Array<number>
}

/**
 *
 */
interface ModPage_SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer_Component_State {

    _placeHolder
}

/**
 *
 */
class ModPage_SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer_Component extends React.Component< ModPage_SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer_Component_Props, ModPage_SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer_Component_State > {

    /**
     *
     */
    constructor(props: ModPage_SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer_Component_Props) {
        super(props);

    }

    render(): React.ReactNode { try {

        let setDefaultView_Component : JSX.Element = undefined;

        if ( this.props.dataPages_LoggedInUser_CommonObjectsFactory &&  this.props.projectSearchIds.length === 1 ) {

            const get_SetDefaultView_Component_React : Get_SetDefaultView_Component_React_Type =
                this.props.dataPages_LoggedInUser_CommonObjectsFactory.getFunctionToGet_SetDefaultView_Component_React();

            const param = new SetDefaultView_Component_React_Params({ projectSearchId : this.props.projectSearchIds[ 0 ] });
            setDefaultView_Component = get_SetDefaultView_Component_React( param )
        }

        let saveView_Component : JSX.Element = undefined;

        if ( this.props.dataPages_LoggedInUser_CommonObjectsFactory ) {

            if ( this.props.dataPages_LoggedInUser_CommonObjectsFactory.getFunctionToGet_SaveView_dataPages_ComponentAndProps ) {
                const saveView_Create_Component_React_Type : SaveView_Create_Component_React_Type = (
                    this.props.dataPages_LoggedInUser_CommonObjectsFactory.getFunctionToGet_SaveView_dataPages_ComponentAndProps()
                );

                const result : SaveView_Create_Component_React_Result = saveView_Create_Component_React_Type({ projectSearchIds : this.props.projectSearchIds, experimentId : undefined });

                //  variable must start with Constant "S" since is React Component
                const SaveView_Component_React = result.saveView_Component_React as any  //  Not compiling using the type assigned to 'result.saveView_Component_React' of 'React.ReactNode'
                const saveView_Component_Props_Prop = result.saveView_Component_Props_Prop

                saveView_Component = (

                    <React.Fragment>

                        <SaveView_Component_React
                            propsValue={ saveView_Component_Props_Prop }
                        />

                        <span >&nbsp;</span>

                    </React.Fragment>
                );
            }
        }

        return (
            <div>
                <div>
                    <SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer>
                        <SearchDetailsAndOtherFiltersOuterBlock_Layout >
                            <SearchDetailsAndFilterBlock_MainPage_Root
                                propValue={ this.props.searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue }
                                searchSubGroup_CentralStateManagerObjectClass={ undefined }
                                searchSubGroup_SelectionsChanged_Callback={ undefined }
                                searchSubGroup_ManageGroupNames_Clicked_Callback={ undefined }
                            />
                        </SearchDetailsAndOtherFiltersOuterBlock_Layout>
                    </SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer>
                </div>
                <div>

                    <div style={ { paddingBottom: 15 } }>

                        { setDefaultView_Component }
                        { saveView_Component }

                        <SharePage_Component
                            projectSearchIds={ this.props.projectSearchIds }
                        />
                    </div>

                </div>
            </div>
        )
    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}
}
