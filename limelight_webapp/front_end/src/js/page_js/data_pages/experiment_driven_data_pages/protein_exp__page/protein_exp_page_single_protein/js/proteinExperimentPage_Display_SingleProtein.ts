/**
 * proteinExperimentPage_Display_SingleProtein.ts
 * 
 * Display Javascript for protein_Experiment.jsp page  - Displaying Data for Single Protein
 * 
 */


import React from 'react';
import ReactDOM from 'react-dom';

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { DataPageStateManager } from 'page_js/data_pages/data_pages_common/dataPageStateManager';

import { Experiment_ConditionGroupsContainer } from 'page_js/data_pages/experiment_data_pages_common/experiment_ConditionGroupsContainer_AndChildren_Classes';
import { Experiment_ConditionGroupsDataContainer } from 'page_js/data_pages/experiment_data_pages_common/experiment_conditionGroupsDataContainer_Class';

import { ProteinView_LoadedDataCommonHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder';
import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';

import { create_experimentConditions_GraphicRepresentation_PropsData, ExperimentConditions_GraphicRepresentation_PropsData } from 'page_js/data_pages/experiment_data_pages_common/create_experimentConditions_GraphicRepresentation_PropsData';

import { ProteinSequenceWidget_StateObject } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/protein_sequence_display_widget/js/proteinSequenceWidget_StateObject';
import { PeptideSequence_UserSelections_StateObject } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_sequence_selected/js/peptideSequence_UserSelections_StateObject';
import { ModificationMass_UserSelections_StateObject } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject';
import { ReporterIonMass_UserSelections_StateObject } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reporter_ions_user_selections/js/reporterIonMass_UserSelections_StateObject';

import { Experiment_DataPages_LoggedInUser_CommonObjectsFactory } from 'page_js/data_pages/experiment_data_pages_common/experiment_DataPages_LoggedInUser_CommonObjectsFactory';

import { ProteinExperimentPage_SingleProtein_MainContent_Component_Props_Prop } from '../jsx/proteinExperimentPage_SingleProtein_MainContent_Component'

import { ProteinExperimentPage_SingleProtein_Root_Component } from '../jsx/proteinExperimentPage_SingleProtein_Root_Component';

// import { ProteinExperimentPage_PSMs_Per_Condition_Component, _SVG_WIDTH as _SVG_WIDTH_ProteinExperimentPage_PSMs_Per_Condition_Component, _SVG_HEIGHT as _SVG_HEIGHT_ProteinExperimentPage_PSMs_Per_Condition_Component } from '../../protein_exp_page_root/jsx/proteinExperimentPage_PSMs_Per_Condition_Component';


import { SingleProtein_ExpPage_CentralStateManagerObjectClass }	from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_root/js/singleProtein_ExpPage_CentralStateManagerObjectClass';


import { 
	_loadDataForInitialOverlayShow, 
	_resize_OverlayHeight_BasedOnViewportHeight, 
	_update_Overlay_OnWindowResize 
} from './proteinExperimentPage_Display_SingleProtein_nonClass_Functions';
import { Experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass } from '../../../../experiment_data_pages_common/experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass';
import {ModificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/modification_mass_user_selections/js/modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject";
import {SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {PeptideUnique_UserSelection_StateObject} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_StateObject";
import {GeneratedPeptideContents_UserSelections_StateObject} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/generated_peptide_contents__user_controls/js/generatedPeptideContents_UserSelections_StateObject";
import {ProteinList_ExpPage_CentralStateManagerObjectClass} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_root/js/proteinList_ExpPage_CentralStateManagerObjectClass";


/**
 * 
 */
export interface ProteinExperimentPage_Display_SingleProtein_singleProteinCloseCallback {
    () : void
}

/**
 * 
 */
export class ProteinExperimentPage_Display_SingleProtein {


	private _proteinSequenceVersionId : number;
	private _proteinListItem : {name: string, description: string};

	private _singleProteinCloseCallback : ProteinExperimentPage_Display_SingleProtein_singleProteinCloseCallback;
	
	private _loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder;
	private _loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>;

	private _dataPageStateManager_DataFrom_Server : DataPageStateManager;

	private _experimentId : number;
	private _experimentName : string;

	private _projectSearchIds : Array<number>;

	private _searchDataLookupParamsRoot : SearchDataLookupParameters_Root;

	private _conditionGroupsContainer : Experiment_ConditionGroupsContainer;
	private _conditionGroupsDataContainer : Experiment_ConditionGroupsDataContainer;
	
	private _experimentConditions_GraphicRepresentation_PropsData : ExperimentConditions_GraphicRepresentation_PropsData;

	private _proteinList_ExpPage_CentralStateManagerObjectClass : ProteinList_ExpPage_CentralStateManagerObjectClass;
	private _generatedPeptideContents_UserSelections_StateObject : GeneratedPeptideContents_UserSelections_StateObject

	private _singleProtein_ExpPage_CentralStateManagerObjectClass : SingleProtein_ExpPage_CentralStateManagerObjectClass;

	private _experiment_DataPages_LoggedInUser_CommonObjectsFactory : Experiment_DataPages_LoggedInUser_CommonObjectsFactory

	private _experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass : Experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass



	private _modificationMass_UserSelections_StateObject = new ModificationMass_UserSelections_StateObject();

	private _reporterIonMass_UserSelections_StateObject = new ReporterIonMass_UserSelections_StateObject();

	private _peptideUnique_UserSelection_StateObject = new PeptideUnique_UserSelection_StateObject();

	private _peptideSequence_UserSelections_StateObject = new PeptideSequence_UserSelections_StateObject();

	//     In ProteinViewPage_RootClass_Common, the data in private _proteinSequenceWidget_StateObject is transferred to object of class SingleProtein_CentralStateManagerObjectClass which interfaces with centralPageStateManager
	
	private _proteinSequenceWidget_StateObject = new ProteinSequenceWidget_StateObject();



	///////////////////

	private _closeOverlayClickHandler_BindThis = this._closeOverlayClickHandler.bind(this);

	private _resizeWindow_Handler_BindThis = this._resizeWindow_Handler.bind(this);

	//////////////////////

	//  after constructor


	private _singleProteinContainer_addedDivElementDOM:  HTMLDivElement;

	private _renderedReactComponent_ProteinExperimentPage_Root_Component: ProteinExperimentPage_SingleProtein_Root_Component;
	
	/**
	 * 
	 */
	constructor(
		{
			proteinSequenceVersionId,
			proteinListItem,

			singleProteinCloseCallback,

			loadedDataCommonHolder,
			loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,

			dataPageStateManager_DataFrom_Server,
			experimentId,
			experimentName,
			projectSearchIds,
			searchDataLookupParamsRoot,
			conditionGroupsContainer,
			conditionGroupsDataContainer,
			experimentConditions_GraphicRepresentation_PropsData,

			proteinList_ExpPage_CentralStateManagerObjectClass,
			generatedPeptideContents_UserSelections_StateObject,

			singleProtein_ExpPage_CentralStateManagerObjectClass,
			experiment_DataPages_LoggedInUser_CommonObjectsFactory,
			experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass
		} : {
			proteinSequenceVersionId : number,
			proteinListItem : {name: string, description: string};

			singleProteinCloseCallback: any,

			loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder,
			loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>,

			dataPageStateManager_DataFrom_Server : DataPageStateManager,
			experimentId : number,
			experimentName : string,
			projectSearchIds : Array<number>,
			searchDataLookupParamsRoot : SearchDataLookupParameters_Root;
			conditionGroupsContainer : Experiment_ConditionGroupsContainer,
			conditionGroupsDataContainer : Experiment_ConditionGroupsDataContainer,
			experimentConditions_GraphicRepresentation_PropsData : ExperimentConditions_GraphicRepresentation_PropsData,
			proteinList_ExpPage_CentralStateManagerObjectClass : ProteinList_ExpPage_CentralStateManagerObjectClass;
			singleProtein_ExpPage_CentralStateManagerObjectClass : SingleProtein_ExpPage_CentralStateManagerObjectClass,
			generatedPeptideContents_UserSelections_StateObject : GeneratedPeptideContents_UserSelections_StateObject
			experiment_DataPages_LoggedInUser_CommonObjectsFactory : Experiment_DataPages_LoggedInUser_CommonObjectsFactory
			experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass : Experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass
		}) {

        this._proteinSequenceVersionId = proteinSequenceVersionId;
        this._proteinListItem = proteinListItem;

		this._singleProteinCloseCallback = singleProteinCloseCallback;
		
		this._loadedDataCommonHolder = loadedDataCommonHolder;
		this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds;

        this._dataPageStateManager_DataFrom_Server = dataPageStateManager_DataFrom_Server;

        this._experimentId = experimentId;
        this._experimentName = experimentName;

        this._projectSearchIds = projectSearchIds;

		this._searchDataLookupParamsRoot = searchDataLookupParamsRoot;

		this._conditionGroupsContainer = conditionGroupsContainer;
		this._conditionGroupsDataContainer = conditionGroupsDataContainer;
        
		this._experimentConditions_GraphicRepresentation_PropsData = experimentConditions_GraphicRepresentation_PropsData;

		this._proteinList_ExpPage_CentralStateManagerObjectClass = proteinList_ExpPage_CentralStateManagerObjectClass;
		this._generatedPeptideContents_UserSelections_StateObject = generatedPeptideContents_UserSelections_StateObject

		this._singleProtein_ExpPage_CentralStateManagerObjectClass = singleProtein_ExpPage_CentralStateManagerObjectClass;

		this._experiment_DataPages_LoggedInUser_CommonObjectsFactory = experiment_DataPages_LoggedInUser_CommonObjectsFactory;

		this._experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass = experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass;
    }
	

	/**
	 * 
	 */
	initialize() {

		this._renderOverlayOutline();

        {
            const encodedStateData = this._singleProtein_ExpPage_CentralStateManagerObjectClass.getModsSelectedEncodedStateData();
            if ( encodedStateData ) {
                this._modificationMass_UserSelections_StateObject.set_encodedStateData({ encodedStateData })
            }
        }
        {
            const encodedStateData = this._singleProtein_ExpPage_CentralStateManagerObjectClass.getReporterIonMassesSelectedEncodedStateData();
            if ( encodedStateData ) {
                this._reporterIonMass_UserSelections_StateObject.set_encodedStateData({ encodedStateData })
            }
        }
		{
			const encodedStateData = this._singleProtein_ExpPage_CentralStateManagerObjectClass.getPeptideUniqueFilterSelectedEncodedStateData();
			if ( encodedStateData ) {
				this._peptideUnique_UserSelection_StateObject.set_encodedStateData({ encodedStateData })
			}
		}
        {
            const encodedStateData = this._singleProtein_ExpPage_CentralStateManagerObjectClass.getProteinSequenceFormattedDisplayWidgetEncodedStateData();
            if ( encodedStateData ) {
                this._proteinSequenceWidget_StateObject.set_encodedStateData({ encodedStateData });
            }
        }
        {
            const encodedStateData = this._singleProtein_ExpPage_CentralStateManagerObjectClass.getPeptideSequenceFilterSelectedEncodedStateData();
            if ( encodedStateData ) {
                this._peptideSequence_UserSelections_StateObject.set_encodedStateData({ encodedStateData });
            }
        }

		const proteinSequenceVersionId = this._proteinSequenceVersionId;
		const projectSearchIds = this._projectSearchIds;

		const promise_loadDataForInitialOverlayShow = _loadDataForInitialOverlayShow({ 
			proteinSequenceVersionId, 
			projectSearchIds,
			dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server,
			loadedDataCommonHolder : this._loadedDataCommonHolder,
			loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
			searchDataLookupParamsRoot : this._searchDataLookupParamsRoot,
			reporterIonMass_UserSelections_StateObject : this._reporterIonMass_UserSelections_StateObject,
			open_Modifications_Subpart_UserSelections_StateObject : this._modificationMass_UserSelections_StateObject.get_OpenModificationSelections()
		});

		if ( promise_loadDataForInitialOverlayShow ) {
			promise_loadDataForInitialOverlayShow.then( () => {
				try {
					this._showAfterIntialLoad();
				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			});
		} else {
			window.setTimeout( () => {

				//  Run in next paint cycle

				this._showAfterIntialLoad();		
			}, 5 )
		}
	}

	private _renderOverlayOutline() {

		console.log("ProteinExperimentPage_Display_SingleProtein: _renderOverlayOutline() enter")

        //   Add DOM element to insert ReactDOM render into

        let addedDivElementDOM = undefined;

        {
            // Parent Node to insert under
            const data_page_outermost_divDOMElement = document.getElementById("data_page_outermost_div");

            if ( ! data_page_outermost_divDOMElement ) {
                throw Error("No DOM element with id 'data_page_outermost_div'");
            }

            //  Sibling Node to insert before
            const footer_outer_container_divDOMElement = document.getElementById("footer_outer_container_div");

            if ( ! footer_outer_container_divDOMElement ) {
                throw Error("No DOM element with id 'footer_outer_container_div'");
            }

            addedDivElementDOM = document.createElement("div");

            // data_page_outermost_divDOMElement.appendChild( addedDivElementDOM );

            data_page_outermost_divDOMElement.insertBefore(addedDivElementDOM, footer_outer_container_divDOMElement);
		}


        //  Or insertBefore <div id="footer_outer_container_div">

        this._singleProteinContainer_addedDivElementDOM = addedDivElementDOM;

        //  Called on render complete
        const renderCompleteCallbackFcn = () => {

            this._resizeWindow_Handler_Attach();

            _resize_OverlayHeight_BasedOnViewportHeight({ singleProteinContainer_addedDivElementDOM : this._singleProteinContainer_addedDivElementDOM });
		};

		let proteinNames : string = undefined
		let proteinDescriptions : string = undefined

		if ( this._proteinListItem ) {
			proteinNames = this._proteinListItem.name
			proteinDescriptions = this._proteinListItem.description
		}

		//  Create React component instance using React.createElement(...) so don't have to make this file .tsx
		
		const proteinExperimentPage_SingleProtein_Root_Component = (
			React.createElement(
				ProteinExperimentPage_SingleProtein_Root_Component,
				{
					closeOverlayClickHandler : this._closeOverlayClickHandler_BindThis,
					proteinNames,
					proteinDescriptions
				},
				null
			)
		);

		this._renderedReactComponent_ProteinExperimentPage_Root_Component = ReactDOM.render( 
			proteinExperimentPage_SingleProtein_Root_Component,
			this._singleProteinContainer_addedDivElementDOM,
            renderCompleteCallbackFcn
		);

	}

	/**
	 * 
	 */
	private _showAfterIntialLoad() {

        //  For getting search info for projectSearchIds
        const searchNamesMap_KeyProjectSearchId = this._dataPageStateManager_DataFrom_Server.get_searchNames_AsMap();

        //  Render to page:


        const proteinNames = this._proteinListItem.name;
		const proteinDescriptions = this._proteinListItem.description;
		

		const proteinSequenceData = this._loadedDataCommonHolder.get_proteinSequenceData_For_proteinSequenceVersionId({ proteinSequenceVersionId : this._proteinSequenceVersionId });
		if (proteinSequenceData === undefined) {
			throw Error("No Protein sequence Data in this._loadedDataCommonHolder for proteinSequenceVersionId: " + this._proteinSequenceVersionId + ", projectSearchIds: " + this._projectSearchIds.join(",") );
		}
		const proteinSequenceString = proteinSequenceData.getProteinSequence();
		if (proteinSequenceString === undefined) {
			throw Error("proteinSequenceData.getProteinSequence() is undefined: " + this._proteinSequenceVersionId + ", projectSearchIds: " + this._projectSearchIds.join(",") );
		}
		
		const proteinExperimentPage_SingleProtein_MainContent_Component_Props_Prop : ProteinExperimentPage_SingleProtein_MainContent_Component_Props_Prop = {

			experimentId : this._experimentId,
			experimentName : this._experimentName ,
			projectSearchIds : this._projectSearchIds ,
			experimentConditions_GraphicRepresentation_PropsData : this._experimentConditions_GraphicRepresentation_PropsData ,
			proteinSequenceVersionId : this._proteinSequenceVersionId ,
			proteinNames : proteinNames ,
			proteinDescriptions : proteinDescriptions ,
			proteinSequenceString : proteinSequenceString ,
			conditionGroupsContainer : this._conditionGroupsContainer ,
			conditionGroupsDataContainer : this._conditionGroupsDataContainer ,
			loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds ,
			loadedDataCommonHolder : this._loadedDataCommonHolder ,
			dataPageStateManager : this._dataPageStateManager_DataFrom_Server,
			searchNamesMap_KeyProjectSearchId : searchNamesMap_KeyProjectSearchId ,
			searchDataLookupParamsRoot : this._searchDataLookupParamsRoot ,

			proteinList_ExpPage_CentralStateManagerObjectClass : this._proteinList_ExpPage_CentralStateManagerObjectClass,
			generatedPeptideContents_UserSelections_StateObject : this._generatedPeptideContents_UserSelections_StateObject,

			singleProtein_ExpPage_CentralStateManagerObjectClass : this._singleProtein_ExpPage_CentralStateManagerObjectClass,
			modificationMass_UserSelections_StateObject : this._modificationMass_UserSelections_StateObject ,
			reporterIonMass_UserSelections_StateObject : this._reporterIonMass_UserSelections_StateObject ,
			peptideUnique_UserSelection_StateObject : this._peptideUnique_UserSelection_StateObject,
			peptideSequence_UserSelections_StateObject : this._peptideSequence_UserSelections_StateObject ,
			proteinSequenceWidget_StateObject : this._proteinSequenceWidget_StateObject ,

			experiment_DataPages_LoggedInUser_CommonObjectsFactory : this._experiment_DataPages_LoggedInUser_CommonObjectsFactory,
			experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass : this._experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass
		};

		this._renderedReactComponent_ProteinExperimentPage_Root_Component.add_ProteinExperimentPage_SingleProtein_MainContent_Component_Props_Prop({

			proteinExperimentPage_SingleProtein_MainContent_Component_Props_Prop
		});
	}

	
	//////////////

	/**
	 * 
	 */
	private _closeOverlayClickHandler() : void {
		try {
			//  remove From page:

			if ( this._singleProteinContainer_addedDivElementDOM ) {
				ReactDOM.unmountComponentAtNode( this._singleProteinContainer_addedDivElementDOM );
			
				this._singleProteinContainer_addedDivElementDOM.remove();
			}

			this._singleProtein_ExpPage_CentralStateManagerObjectClass.clearAll();

			this._resizeWindow_Handler_Remove();

			if ( this._singleProteinCloseCallback ) {
				this._singleProteinCloseCallback();
			}
		} catch( e ) {
			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
			throw e;
		}
	}


	//////////////

	/**
	 * 
	 */
	private _resizeWindow_Handler_Attach() : void {

		//  Attach resize handler
		window.addEventListener( "resize", this._resizeWindow_Handler_BindThis );
	}

	/**
	 * 
	 */
	private _resizeWindow_Handler_Remove() : void {

		//  Remove resize handler
		window.removeEventListener( "resize", this._resizeWindow_Handler_BindThis );
	}
	
	/**
	 * copied to this._resizeWindow_Handler_BindThis = this._resizeWindow_Handler.bind(this) in constructor
	 */
	private _resizeWindow_Handler() : void {
		try {
			_resize_OverlayHeight_BasedOnViewportHeight({ singleProteinContainer_addedDivElementDOM : this._singleProteinContainer_addedDivElementDOM });

			_update_Overlay_OnWindowResize({ singleProteinContainer_addedDivElementDOM : this._singleProteinContainer_addedDivElementDOM });

		} catch( e ) {
			console.log("Exception caught in _resizeWindow_Handler()");
			console.log( e );
			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
			throw e;
		}
	}
}


