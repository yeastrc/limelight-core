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

import { ExperimentConditions_GraphicRepresentation_PropsData } from 'page_js/data_pages/experiment_data_pages_common/create_experimentConditions_GraphicRepresentation_PropsData';

import { ProteinSequenceWidget_StateObject } from 'page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__protein_page__components/protein_sequence_display_widget/js/proteinSequenceWidget_StateObject';
import { PeptideSequence_UserSelections_StateObject } from 'page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_sequence_selected/js/peptideSequence_UserSelections_StateObject';
import { ModificationMass_UserSelections_StateObject } from 'page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject';
import { ReporterIonMass_UserSelections_StateObject } from 'page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/reporter_ions_user_selections/js/reporterIonMass_UserSelections_StateObject';

import { Experiment_DataPages_LoggedInUser_CommonObjectsFactory } from 'page_js/data_pages/experiment_data_pages_common/experiment_DataPages_LoggedInUser_CommonObjectsFactory';

import { ProteinExperimentPage_SingleProtein_MainContent_Component_Props_Prop } from '../jsx/proteinExperimentPage_SingleProtein_MainContent_Component'

import {
	ProteinExperimentPage_SingleProtein_Root_Component,
	ProteinExperimentPage_SingleProtein_Root_Component_Props
} from '../jsx/proteinExperimentPage_SingleProtein_Root_Component';



import { SingleProtein_ExpPage_CentralStateManagerObjectClass }	from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_root/js/singleProtein_ExpPage_CentralStateManagerObjectClass';

import {SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {PeptideUnique_UserSelection_StateObject} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_StateObject";
import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass";
import {Protein_singleProtein_EmbedInModPage_NewWindowContents_CentralStateManagerObjectClass} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__mod_page_embed_single_protein/js/protein_singleProtein_EmbedInModPage_NewWindowContents_CentralStateManagerObjectClass";
import {loadDataForInitialOverlayShow_MultipleSearch_SingleProtein} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__single_protein/js/proteinPage_Display__SingleProtein_nonClass_Functions";
import {GeneratedPeptideContents_UserSelections_StateObject} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/generated_peptide_contents__user_controls/js/generatedPeptideContents_UserSelections_StateObject";
import {PeptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on_counts_psm/js/peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject";


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

	private _forPeptidePage : boolean

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

	// private _generatedPeptideContents_UserSelections_StateObject : GeneratedPeptideContents_UserSelections_StateObject

	/**
	 * For Single Protein.  Data from this._singleProtein_CentralStateManagerObject
	 */
	private _modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass = ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.getNewInstance_SingleProtein();

	private _singleProtein_ExpPage_CentralStateManagerObjectClass : SingleProtein_ExpPage_CentralStateManagerObjectClass;

	private _experiment_DataPages_LoggedInUser_CommonObjectsFactory : Experiment_DataPages_LoggedInUser_CommonObjectsFactory

	private _modificationMass_UserSelections_StateObject = new ModificationMass_UserSelections_StateObject();

	private _reporterIonMass_UserSelections_StateObject = new ReporterIonMass_UserSelections_StateObject();

	private _peptideUnique_UserSelection_StateObject = new PeptideUnique_UserSelection_StateObject();

	private _peptideSequence_UserSelections_StateObject = new PeptideSequence_UserSelections_StateObject();

	//     In ProteinViewPage_RootClass_Common, the data in private _proteinSequenceWidget_StateObject is transferred to object of class SingleProtein_CentralStateManagerObjectClass which interfaces with centralPageStateManager
	
	private _proteinSequenceWidget_StateObject = new ProteinSequenceWidget_StateObject();

	private _peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject : PeptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject



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
			forPeptidePage,

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

			singleProtein_ExpPage_CentralStateManagerObjectClass,
			experiment_DataPages_LoggedInUser_CommonObjectsFactory
		} : {
			forPeptidePage? : boolean

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
			singleProtein_ExpPage_CentralStateManagerObjectClass : SingleProtein_ExpPage_CentralStateManagerObjectClass,
			experiment_DataPages_LoggedInUser_CommonObjectsFactory : Experiment_DataPages_LoggedInUser_CommonObjectsFactory
		}) {

		this._forPeptidePage = forPeptidePage;

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

		this._singleProtein_ExpPage_CentralStateManagerObjectClass = singleProtein_ExpPage_CentralStateManagerObjectClass;

		this._experiment_DataPages_LoggedInUser_CommonObjectsFactory = experiment_DataPages_LoggedInUser_CommonObjectsFactory;
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
	openOverlay(
		{
			proteinSequenceVersionId,
			modMass_Rounded_From_ModPage_ForInitialSelection, // Optional.  ONLY populated when called from Mod Page. Used for Initial Population of selected Variable and Open Modifications.
			proteinNameDescription,

			//  Optional.  Will replace values in instance properties

			loadedDataCommonHolder,
			loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,

			//  Optional.  Values Cleared once modMass_Rounded_From_ModPage_ForInitialSelection is used to set Single Protein Page State to URL

			protein_singleProtein_EmbedInModPage_NewWindowContents_CentralStateManagerObjectClass

		} : {

			proteinSequenceVersionId: number

			modMass_Rounded_From_ModPage_ForInitialSelection?: number

			proteinNameDescription : {name: string, description: string}

			loadedDataCommonHolder? : ProteinView_LoadedDataCommonHolder;
			loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds? : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>;

			protein_singleProtein_EmbedInModPage_NewWindowContents_CentralStateManagerObjectClass?: Protein_singleProtein_EmbedInModPage_NewWindowContents_CentralStateManagerObjectClass

		} ) : void {

		this._proteinSequenceVersionId = proteinSequenceVersionId;

		if ( loadedDataCommonHolder ) {
			this._loadedDataCommonHolder = loadedDataCommonHolder;
		}
		if ( loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds ) {
			this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds;
		}

		if ( ! this._loadedDataCommonHolder ) {
			const msg = "( ! this._loadedDataCommonHolder ) in openOverlay() after possibly updated from method param";
			console.warn(msg);
			throw Error(msg);
		}
		if ( ! this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds ) {
			const msg = "( ! this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds ) in openOverlay() after possibly updated from method param";
			console.warn(msg);
			throw Error(msg);
		}


		if ( proteinNameDescription ) {
			this._proteinListItem = proteinNameDescription; // proteinListItem;
		} else {
			//  No value passed in so compute it
			this._proteinListItem = this._get_ProteinNameDescription_Strings_For_SingleProtein({
				proteinSequenceVersionId: this._proteinSequenceVersionId,
				projectSearchIds: this._projectSearchIds,
				loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds: this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
			});
		}

		////

		let load_OpenModificationsFromServer_For_SetSelectionsFrom_ModMassFromModPage = false;

		if ( modMass_Rounded_From_ModPage_ForInitialSelection !== undefined && modMass_Rounded_From_ModPage_ForInitialSelection !== null ) {

			load_OpenModificationsFromServer_For_SetSelectionsFrom_ModMassFromModPage = true;
		}

		this._renderOverlayOutline(); //  Will just return if already done

		{
			const encodedStateData = this._singleProtein_ExpPage_CentralStateManagerObjectClass.getModificationMass_OpenModMassZeroNotOpenMod_UserSelection__EncodedStateData();
			if ( encodedStateData ) {
				this._modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.initialize_SingleProteinInstance({ encodedStateData });
			} else {
				this._modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.initialize_SingleProteinInstance({ encodedStateData: undefined });
			}
		}
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

		{ // this._peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject

			const valueChangedCallback = () => {

				const peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_Selection_EncodedStateData = this._peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject.getEncodedStateData();
				this._singleProtein_ExpPage_CentralStateManagerObjectClass.set_peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_Selection_EncodedStateData( { peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_Selection_EncodedStateData } );
			}
			this._peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject = new PeptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject({
				valueChangedCallback
			});

			const encodedStateData = this._singleProtein_ExpPage_CentralStateManagerObjectClass.get_peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_Selection_EncodedStateData();
			if ( encodedStateData ) {
				this._peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject.set_encodedStateData({ encodedStateData })
			}
		}


		//  Create for Initial Load
		const generatedPeptideContents_UserSelections_StateObject = new GeneratedPeptideContents_UserSelections_StateObject({ valueChangedCallback : undefined });

		{
			const encodedStateData = this._singleProtein_ExpPage_CentralStateManagerObjectClass.getGeneratedPeptideContents_UserSelections__EncodedStateData();
			generatedPeptideContents_UserSelections_StateObject.set_encodedStateData({encodedStateData});
		}

		const promise_loadDataForInitialOverlayShow = loadDataForInitialOverlayShow_MultipleSearch_SingleProtein({
			forPeptidePage: this._forPeptidePage,
			load_OpenModificationsFromServer_For_SetSelectionsFrom_ModMassFromModPage,
			searchSubGroups_Root: undefined,
			proteinSequenceVersionId,
			projectSearchIds : this._projectSearchIds,
			dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server,
			loadedDataCommonHolder : this._loadedDataCommonHolder,
			loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
			searchDataLookupParamsRoot : this._searchDataLookupParamsRoot,
			reporterIonMass_UserSelections_StateObject : this._reporterIonMass_UserSelections_StateObject,
			open_Modifications_Subpart_UserSelections_StateObject : this._modificationMass_UserSelections_StateObject.get_OpenModificationSelections(),
			generatedPeptideContents_UserSelections_StateObject : generatedPeptideContents_UserSelections_StateObject
		});

		// const projectSearchIds = this._projectSearchIds;
		//
		// const promise_loadDataForInitialOverlayShow = _loadDataForInitialOverlayShow({
		// 	proteinSequenceVersionId,
		// 	projectSearchIds,
		// 	dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server,
		// 	loadedDataCommonHolder : this._loadedDataCommonHolder,
		// 	loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
		// 	searchDataLookupParamsRoot : this._searchDataLookupParamsRoot,
		// 	reporterIonMass_UserSelections_StateObject : this._reporterIonMass_UserSelections_StateObject,
		// 	open_Modifications_Subpart_UserSelections_StateObject : this._modificationMass_UserSelections_StateObject.get_OpenModificationSelections()
		// });

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
	 *
	 */
	private _get_ProteinNameDescription_Strings_For_SingleProtein(
		{
			proteinSequenceVersionId,
			projectSearchIds,
			loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
		}: {
			proteinSequenceVersionId: number
			projectSearchIds: Array<number>
			loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>;

		}) : {name: string, description: string}  {

		//  So add only once to result
		const proteinNamesUniqueSet: Set<string> = new Set();
		const proteinDescriptionsUniqueSet: Set<string> = new Set();

		//  To combine with "," separator
		const proteinNamesArray: Array<string> = [];
		const proteinDescriptionsArray: Array<string> = [];


		for (const projectSearchId of projectSearchIds) {

			const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get(projectSearchId);
			if (!loadedDataPerProjectSearchIdHolder) {
				throw Error("loadedDataPerProjectSearchIdHolder not populated for projectSearchId: " + projectSearchId); // Must have loadedDataPerProjectSearchIdHolder populated
			}

			const proteinInfoMapKeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_proteinInfoMapKeyProteinSequenceVersionId()

			let proteinInfo = proteinInfoMapKeyProteinSequenceVersionId.get(proteinSequenceVersionId);
			if (proteinInfo === undefined) {
				//  proteinSequenceVersionId NOT in this search.  Skip to next

				continue;  // EARLY CONTINUE
			}

			const annotations = proteinInfo.annotations;
			if (annotations) {
				for (const annotation of annotations) {
					const name = annotation.name;
					const description = annotation.description;
					const taxonomy = annotation.taxonomy;
					if (!proteinNamesUniqueSet.has(name)) {
						proteinNamesUniqueSet.add(name);
						proteinNamesArray.push(name);
					}
					if (description) {
						if (!proteinDescriptionsUniqueSet.has(description)) {
							proteinDescriptionsUniqueSet.add(description);
							proteinDescriptionsArray.push(description);
						}
					}
				}
			}
		}

		if ( proteinNamesArray.length === 0 ) {
			const msg = "No Protein names found in any search for proteinSequenceVersionId: " + proteinSequenceVersionId;
			console.warn(msg);
			throw Error(msg);
		}

		const proteinNamesString = proteinNamesArray.join(",");
		const proteinDescriptionsString = proteinDescriptionsArray.join(",");

		const proteinNameDescriptionEntry = {name: proteinNamesString, description: proteinDescriptionsString};

		return proteinNameDescriptionEntry;
	}

	////

	private _renderOverlayOutline() {

		console.log("ProteinExperimentPage_Display_SingleProtein: _renderOverlayOutline() enter")

		if ( this._renderedReactComponent_ProteinExperimentPage_Root_Component ) {

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

            _resize_OverlayHeight_BasedOnViewportHeight({ singleProteinContainer_addedDivElementDOM : this._singleProteinContainer_addedDivElementDOM });
		};

		let proteinNames : string = undefined
		let proteinDescriptions : string = undefined

		if ( this._proteinListItem ) {
			proteinNames = this._proteinListItem.name
			proteinDescriptions = this._proteinListItem.description
		}


		const standard_Page_Header_Height = this._get_Standard_Page_Header_Height();

		const props : ProteinExperimentPage_SingleProtein_Root_Component_Props = {
			closeOverlayClickHandler : this._closeOverlayClickHandler_BindThis,
			standard_Page_Header_Height,
			proteinNames,
			proteinDescriptions
		}

		//  Create React component instance using React.createElement(...) so don't have to make this file .tsx
		
		const proteinExperimentPage_SingleProtein_Root_Component = (
			React.createElement(
				ProteinExperimentPage_SingleProtein_Root_Component,
				props,
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

			modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : this._modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
			singleProtein_ExpPage_CentralStateManagerObjectClass : this._singleProtein_ExpPage_CentralStateManagerObjectClass,
			modificationMass_UserSelections_StateObject : this._modificationMass_UserSelections_StateObject ,
			reporterIonMass_UserSelections_StateObject : this._reporterIonMass_UserSelections_StateObject ,
			peptideUnique_UserSelection_StateObject : this._peptideUnique_UserSelection_StateObject,
			peptideSequence_UserSelections_StateObject : this._peptideSequence_UserSelections_StateObject ,
			proteinSequenceWidget_StateObject : this._proteinSequenceWidget_StateObject ,
			peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject : this._peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject,

			experiment_DataPages_LoggedInUser_CommonObjectsFactory : this._experiment_DataPages_LoggedInUser_CommonObjectsFactory
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

	/**
	 * Return the height of the Page header at the top of the page
	 */
	private _get_Standard_Page_Header_Height() : number {

		// const $header_outer_container_div = $("#header_outer_container_div");
		// if ( $header_outer_container_div.length === 0 ) {
		// 	throw Error("No DOM element found with id 'header_outer_container_div'");
		// }
		// const headerOuterHeight = $header_outer_container_div.outerHeight( true /* [includeMargin ] */ );

		const header_outer_container_div_DOM = document.getElementById("header_outer_container_div");
		if ( ! header_outer_container_div_DOM ) {
			throw Error("No DOM element found with id 'header_outer_container_div'");
		}
		const header_outer_container_div_BoundingClientRect = header_outer_container_div_DOM.getBoundingClientRect();
		const height = header_outer_container_div_BoundingClientRect.height;

		return height;
	}
}




const _SECTION_ABOVE_REPORTED_PEPTIDE_LIST_CONTAINER_MIN_WIDTH = 1270; // Min width for upper section of protein sequence and boxes to right



/**
 *
 */
const _resize_OverlayHeight_BasedOnViewportHeight = function({ singleProteinContainer_addedDivElementDOM }: { singleProteinContainer_addedDivElementDOM: HTMLDivElement }) {

	if ( ! singleProteinContainer_addedDivElementDOM ) {
		// Exit if no overlay
		return;
	}

	const $window = $(window);

	const windowHeight = $window.height();

	//  Subtract header and footer heights

	const $header_outer_container_div = $("#header_outer_container_div");
	if ( $header_outer_container_div.length === 0 ) {
		throw Error("No DOM element found with id 'header_outer_container_div'");
	}
	const headerOuterHeight = $header_outer_container_div.outerHeight( true /* [includeMargin ] */ );

	// const $footer_outer_container_div = $("#footer_outer_container_div");
	// if ( $footer_outer_container_div.length === 0 ) {
	// 	throw Error("No DOM element found with id 'footer_outer_container_div'");
	// }
	// const footerOuterHeight = $footer_outer_container_div.outerHeight( true /* [includeMargin ] */ );

	const footerOuterHeight = 31;  // Hard code footer height since measuring doesn't work right

	const overlayHeight = windowHeight - headerOuterHeight - footerOuterHeight;

	const $singleProteinContainer_addedDivElementDOM = $( singleProteinContainer_addedDivElementDOM );


	const $view_single_protein_inner_overlay_div = $singleProteinContainer_addedDivElementDOM.find("#view_single_protein_inner_overlay_div");

	// console.warn("!!!!!!!!!!!!!!!   Skipping resizing DOM id 'view_single_protein_inner_overlay_div' since cannot find DOM element with that id.  $view_single_protein_inner_overlay_div.length: " + $view_single_protein_inner_overlay_div.length );

	if ( $view_single_protein_inner_overlay_div.length === 0 ) {
		throw Error("No DOM element found with id 'view_single_protein_inner_overlay_div'");
	}

	$view_single_protein_inner_overlay_div.css('min-height', overlayHeight + 'px');
}

/**
 *
 */
const _update_Overlay_OnWindowResize = function( params: any ) {

	let singleProteinContainer_addedDivElementDOM = undefined;
	let $view_single_protein_overlay_div = undefined;
	let overlayWidth = undefined;

	if ( params ) {
		singleProteinContainer_addedDivElementDOM = params.singleProteinContainer_addedDivElementDOM;
		$view_single_protein_overlay_div = params.$view_single_protein_overlay_div;
		overlayWidth = params.overlayWidth;
	}

	if ( ! singleProteinContainer_addedDivElementDOM ) {
		// Exit if no overlay
		return;
	}

	if ( $view_single_protein_overlay_div === undefined ) {
		$view_single_protein_overlay_div = $("#view_single_protein_overlay_div");
		if ( $view_single_protein_overlay_div.length === 0 ) {
			throw Error("No DOM element found with id 'view_single_protein_overlay_div'");
		}
	}
	if ( overlayWidth === undefined ) {
		overlayWidth = $view_single_protein_overlay_div.outerWidth();
	}

	//  Adjust width of block above reported peptide list to keep the boxes to the right within the viewport, if necessary.

	const $window = $(window);
	const windowWidth = $window.width();

	const $selector_section_above_reported_peptides_list_block = $view_single_protein_overlay_div.find(".selector_section_above_reported_peptides_list_block");

	if ( overlayWidth <= windowWidth ) {

		$selector_section_above_reported_peptides_list_block.css('width', ''); // clear setting

	} else {

		let sectionAboveReportedPeptidesList_Width = windowWidth - 50; // - 50 to adjust in from right edge
		if (sectionAboveReportedPeptidesList_Width < _SECTION_ABOVE_REPORTED_PEPTIDE_LIST_CONTAINER_MIN_WIDTH) {
			sectionAboveReportedPeptidesList_Width = _SECTION_ABOVE_REPORTED_PEPTIDE_LIST_CONTAINER_MIN_WIDTH; // Min width
		}
		$selector_section_above_reported_peptides_list_block.css('width', sectionAboveReportedPeptidesList_Width + 'px');
	}

}
