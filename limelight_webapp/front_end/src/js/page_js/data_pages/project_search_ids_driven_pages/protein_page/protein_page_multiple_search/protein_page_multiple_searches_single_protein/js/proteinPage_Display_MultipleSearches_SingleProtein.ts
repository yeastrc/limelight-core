/**
 * proteinPage_Display_MultipleSearches__SingleProtein.ts
 * 
 * Display Javascript for protein.jsp page  - Displaying Data for Single Protein
 * 
 */


import React from 'react';
import ReactDOM from 'react-dom';

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { DataPageStateManager } from 'page_js/data_pages/data_pages_common/dataPageStateManager';

import { SearchDetailsBlockDataMgmtProcessing } from 'page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsBlockDataMgmtProcessing';

import { SingleProtein_CentralStateManagerObjectClass }	from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/singleProtein_CentralStateManagerObjectClass';

import { ProteinView_LoadedDataCommonHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder';
import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';

//  From Experiment Version. These are compatible with the old Protein Page State Objects
import { ProteinSequenceWidget_StateObject } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/protein_sequence_display_widget/js/proteinSequenceWidget_StateObject';
import { PeptideSequence_UserSelections_StateObject } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_sequence_selected/js/peptideSequence_UserSelections_StateObject';
import { ModificationMass_UserSelections_StateObject } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject';
import { ReporterIonMass_UserSelections_StateObject } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reporter_ions_user_selections/js/reporterIonMass_UserSelections_StateObject';

import { DataPages_LoggedInUser_CommonObjectsFactory } from 'page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory';

import { ProteinPage_Display_MultipleSearches_SingleProtein_MainContent_Component_Props_Prop } from '../jsx/proteinPage_Display_MultipleSearches_SingleProtein_MainContent_Component'

import { ProteinPage_Display_MultipleSearches_SingleProtein_Root_Component } from '../jsx/proteinPage_Display_MultipleSearches_SingleProtein_Root_Component';


import { 
	_loadDataForInitialOverlayShow_MultipleSearch_SingleProtein, 
	_resize_OverlayHeight_BasedOnViewportHeight_MultipleSearch_SingleProtein, 
	_update_Overlay_OnWindowResize_MultipleSearch_SingleProtein 
} from './proteinPage_Display_MultipleSearches_SingleProtein_nonClass_Functions';
import {SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue} from "page_js/data_pages/search_details_block__project_search_id_based/jsx/searchDetailsAndFilterBlock_MainPage_Root";
import {ModificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/modification_mass_user_selections/js/modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject";


/**
 * 
 */
export interface ProteinPage_Display_MultipleSearches_SingleProtein_singleProteinCloseCallback {
    () : void
}

/**
 * 
 */
export class ProteinPage_Display_MultipleSearches_SingleProtein {


	private _proteinSequenceVersionId : number;
	private _proteinListItem : {name: string, description: string};

	private _singleProteinCloseCallback : ProteinPage_Display_MultipleSearches_SingleProtein_singleProteinCloseCallback;
	
	private _loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder;
	private _loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>;

	private _dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager;
	
	private _dataPageStateManager_DataFrom_Server : DataPageStateManager;

	private _searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing;

	private _projectSearchIds : Array<number>;

	private _searchDataLookupParamsRoot;
	
	private _singleProtein_CentralStateManagerObject : SingleProtein_CentralStateManagerObjectClass

	private _dataPages_LoggedInUser_CommonObjectsFactory : DataPages_LoggedInUser_CommonObjectsFactory

	private _searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue : SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue;


	private _modificationMass_UserSelections_StateObject = new ModificationMass_UserSelections_StateObject();

	private _reporterIonMass_UserSelections_StateObject = new ReporterIonMass_UserSelections_StateObject();

	private _peptideSequence_UserSelections_StateObject = new PeptideSequence_UserSelections_StateObject();

	//     In ProteinViewPage_RootClass_Common, the data in private _proteinSequenceWidget_StateObject is transferred to object of class SingleProtein_CentralStateManagerObjectClass which interfaces with centralPageStateManager
	
	private _proteinSequenceWidget_StateObject = new ProteinSequenceWidget_StateObject();



	///////////////////

	private _closeOverlayClickHandler_BindThis = this._closeOverlayClickHandler.bind(this);

	private _resizeWindow_Handler_BindThis = this._resizeWindow_Handler.bind(this);

	//////////////////////

	//  after constructor


	private _singleProteinContainer_addedDivElementDOM : HTMLElement;

	private _renderedReactComponent_ProteinPage_Display_MultipleSearches_SingleProtein_Root_Component : ProteinPage_Display_MultipleSearches_SingleProtein_Root_Component;
	
	/**
	 * 
	 */
	constructor({ 

		singleProteinCloseCallback,
		
		loadedDataCommonHolder,
		loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,

		dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay, 
		dataPageStateManager_DataFrom_Server,
		searchDetailsBlockDataMgmtProcessing, 
        projectSearchIds,
        searchDataLookupParamsRoot,
		singleProtein_CentralStateManagerObject,
		dataPages_LoggedInUser_CommonObjectsFactory
     } : { 
        proteinSequenceVersionId : number,
        proteinListItem, 

		singleProteinCloseCallback,
		
		loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder,
		loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>,

		dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager, 
		dataPageStateManager_DataFrom_Server : DataPageStateManager,
		searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing, 

        projectSearchIds : Array<number>,
        searchDataLookupParamsRoot,
		singleProtein_CentralStateManagerObject : SingleProtein_CentralStateManagerObjectClass,
		dataPages_LoggedInUser_CommonObjectsFactory : DataPages_LoggedInUser_CommonObjectsFactory
     }) {

		this._singleProteinCloseCallback = singleProteinCloseCallback;
		
		this._loadedDataCommonHolder = loadedDataCommonHolder;
		this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds;

		this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay = dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay;
		
		this._dataPageStateManager_DataFrom_Server = dataPageStateManager_DataFrom_Server;

		this._searchDetailsBlockDataMgmtProcessing = searchDetailsBlockDataMgmtProcessing;

        this._projectSearchIds = projectSearchIds;

		this._searchDataLookupParamsRoot = searchDataLookupParamsRoot;

		this._dataPages_LoggedInUser_CommonObjectsFactory = dataPages_LoggedInUser_CommonObjectsFactory;

		this._singleProtein_CentralStateManagerObject = singleProtein_CentralStateManagerObject;


		this._searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue = new SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue({
			displayOnly : true,  //  Display only.  No attach click handlers to allow changes
			dataPages_LoggedInUser_CommonObjectsFactory,
			dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
			dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server,
			searchDetailsBlockDataMgmtProcessing : this._searchDetailsBlockDataMgmtProcessing,
			filterValuesChanged_Callback : undefined
		} );
    }
	

	/**
	 * Call when going straight to Single Protein view on Page load and don't have any data loaded yet
	 */
	openOverlay_OnlyLoadingMessage() {

		this._renderOverlayOutline();
	}

	/**
	 * 
	 */
	openOverlay( { proteinSequenceVersionId, proteinNameDescription } ) {


        this._proteinSequenceVersionId = proteinSequenceVersionId;
        this._proteinListItem = proteinNameDescription; // proteinListItem;

		// this._proteinSequenceVersionId = proteinSequenceVersionId; Duplicate of right above

		this._renderOverlayOutline(); //  Will just return if already done

        {
            const encodedStateData = this._singleProtein_CentralStateManagerObject.getModsSelectedEncodedStateData();
            if ( encodedStateData ) {
                this._modificationMass_UserSelections_StateObject.set_encodedStateData({ encodedStateData })
            }
        }
        {
            const encodedStateData = this._singleProtein_CentralStateManagerObject.getReporterIonMassesSelectedEncodedStateData();
            if ( encodedStateData ) {
                this._reporterIonMass_UserSelections_StateObject.set_encodedStateData({ encodedStateData })
            }
        }
        {
            const encodedStateData = this._singleProtein_CentralStateManagerObject.getProteinSequenceFormattedDisplayWidgetEncodedStateData();
            if ( encodedStateData ) {
                this._proteinSequenceWidget_StateObject.set_encodedStateData({ encodedStateData });
            }
        }
        {
            const encodedStateData = this._singleProtein_CentralStateManagerObject.getPeptideSequenceFilterSelectedEncodedStateData();
            if ( encodedStateData ) {
                this._peptideSequence_UserSelections_StateObject.set_encodedStateData({ encodedStateData });
            }
        }

		const promise_loadDataForInitialOverlayShow = _loadDataForInitialOverlayShow_MultipleSearch_SingleProtein({ 
			proteinSequenceVersionId, 
			projectSearchIds : this._projectSearchIds,
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

	/**
	 * 
	 */
	private _renderOverlayOutline() {

		console.log("ProteinPage_Display_MultipleSearches_SingleProtein: _renderOverlayOutline() enter")

		if ( this._renderedReactComponent_ProteinPage_Display_MultipleSearches_SingleProtein_Root_Component ) {

			//  Component Already Added to DOM

			return; // EARLY RETURN
		}

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

            _resize_OverlayHeight_BasedOnViewportHeight_MultipleSearch_SingleProtein({ singleProteinContainer_addedDivElementDOM : this._singleProteinContainer_addedDivElementDOM });
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
				ProteinPage_Display_MultipleSearches_SingleProtein_Root_Component,
				{
					closeOverlayClickHandler : this._closeOverlayClickHandler_BindThis,
					proteinNames,
					proteinDescriptions
				},
				null
			)
		);

		this._renderedReactComponent_ProteinPage_Display_MultipleSearches_SingleProtein_Root_Component = ReactDOM.render( 
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


        const proteinNames = this._proteinListItem.name; // proteinNames;
		const proteinDescriptions = this._proteinListItem.description; // proteinDescriptions;
		

		const proteinSequenceData = this._loadedDataCommonHolder.get_proteinSequenceData_For_proteinSequenceVersionId({ proteinSequenceVersionId : this._proteinSequenceVersionId });
		if (proteinSequenceData === undefined) {
			throw Error("No Protein sequence Data in this._loadedDataCommonHolder for proteinSequenceVersionId: " + this._proteinSequenceVersionId + ", projectSearchIds: " + this._projectSearchIds.join(",") );
		}
		const proteinSequenceString = proteinSequenceData.getProteinSequence();
		if (proteinSequenceString === undefined) {
			throw Error("proteinSequenceData.getProteinSequence() is undefined: " + this._proteinSequenceVersionId + ", projectSearchIds: " + this._projectSearchIds.join(",") );
		}
		
		const proteinPage_Display_MultipleSearches_SingleProtein_MainContent_Component_Props_Prop : ProteinPage_Display_MultipleSearches_SingleProtein_MainContent_Component_Props_Prop = {

			projectSearchIds : this._projectSearchIds ,
			proteinSequenceVersionId : this._proteinSequenceVersionId ,
			proteinNames : proteinNames ,
			proteinDescriptions : proteinDescriptions ,
			proteinSequenceString : proteinSequenceString ,
			loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds ,
			loadedDataCommonHolder : this._loadedDataCommonHolder ,
			dataPageStateManager : this._dataPageStateManager_DataFrom_Server,
			searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue : this._searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue,
			searchNamesMap_KeyProjectSearchId : searchNamesMap_KeyProjectSearchId ,
			searchDataLookupParamsRoot : this._searchDataLookupParamsRoot ,
			singleProtein_ExpPage_CentralStateManagerObjectClass : this._singleProtein_CentralStateManagerObject,
			modificationMass_UserSelections_StateObject : this._modificationMass_UserSelections_StateObject ,
			reporterIonMass_UserSelections_StateObject : this._reporterIonMass_UserSelections_StateObject ,
			peptideSequence_UserSelections_StateObject : this._peptideSequence_UserSelections_StateObject ,
			proteinSequenceWidget_StateObject : this._proteinSequenceWidget_StateObject ,
			dataPages_LoggedInUser_CommonObjectsFactory : this._dataPages_LoggedInUser_CommonObjectsFactory
		};

		this._renderedReactComponent_ProteinPage_Display_MultipleSearches_SingleProtein_Root_Component.add_ProteinPage_Display_MultipleSearches_SingleProtein_MainContent_Component_Props_Prop({

			proteinPage_Display_MultipleSearches_SingleProtein_MainContent_Component_Props_Prop
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

			this._singleProtein_CentralStateManagerObject.clearAll();

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
			_resize_OverlayHeight_BasedOnViewportHeight_MultipleSearch_SingleProtein({ singleProteinContainer_addedDivElementDOM : this._singleProteinContainer_addedDivElementDOM });

			_update_Overlay_OnWindowResize_MultipleSearch_SingleProtein({ singleProteinContainer_addedDivElementDOM : this._singleProteinContainer_addedDivElementDOM });

		} catch( e ) {
			console.log("Exception caught in _resizeWindow_Handler()");
			console.log( e );
			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
			throw e;
		}
	}
}


