/**
 * proteinExperimentPage_RootClass_Common.ts
 * 
 * Common Root Javascript for protein_Experiment.jsp page  
 * 
 * 
 * TODO !!!!!  When Single Project Search Id: Handle "Default URL" as set by User that overrides specified values.
 * 
 * Either:
 * 		detect that coming from another page and use a web service to get Default URL
 * 		place default URL on page and redirect to it if coming from another page
 */


/**
 * Import on every page the 'root' file and call catchAndReportGlobalOnError.init()
 */
import { catchAndReportGlobalOnError } from 'page_js/catchAndReportGlobalOnError';

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

//   From data_pages_common
import { DataPageStateManager }  from 'page_js/data_pages/data_pages_common/dataPageStateManager';

//  From data_pages_common

import { _REFERRER_PATH_STRING } from 'page_js/data_pages/data_pages_common/a_dataPagesCommonConstants';

import { Page_UserDefault_processing }  from 'page_js/data_pages/data_pages_common/page_UserDefault_processing';

import { GetExerimentMainDataFromPage } from 'page_js/data_pages/experiment_data_pages_common/getExerimentMainDataFromPage';

import { GetSearchDataLookupParametersFromPage }  from 'page_js/data_pages/data_pages_common/getSearchDataLookupParametersFromPage';

import { LoadCoreData_ProjectSearchIds_Based } from 'page_js/data_pages/data_pages_common/loadCoreData_ProjectSearchIds_Based';

// import { navigation_dataPages_Maint_Instance } from 'page_js/data_pages/data_pages_common/navigation_dataPages_Maint';

import { CentralPageStateManager } from 'page_js/data_pages/central_page_state_manager/centralPageStateManager';

//  From experiment_data_pages_common

import { Experiment_ConditionGroupsContainer } from 'page_js/data_pages/experiment_data_pages_common/experiment_ConditionGroupsContainer_AndChildren_Classes';
import { Experiment_ConditionGroupsDataContainer } from 'page_js/data_pages/experiment_data_pages_common/experiment_conditionGroupsDataContainer_Class';
import { create_experimentConditions_GraphicRepresentation_PropsData, ExperimentConditions_GraphicRepresentation_PropsData } from 'page_js/data_pages/experiment_data_pages_common/create_experimentConditions_GraphicRepresentation_PropsData';


//  From main_pages
import { MainPagesPopulateHeader } from 'page_js/main_pages/mainPagesPopulateHeader';

//  From local dir
// import { ProteinExperimentPage_DisplayDataOnPage }  
// 	from './proteinExperimentPage_DisplayDataOnPage';

import { Experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass } from '../../../../experiment_data_pages_common/experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass';

import { SingleProtein_ExpPage_CentralStateManagerObjectClass }	from './singleProtein_ExpPage_CentralStateManagerObjectClass';

// import { ProteinList_CentralStateManagerObjectClass } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_protein_list_common/proteinList_CentralStateManagerObjectClass';

// import { SearchColorManager } from 'page_js/data_pages/color_manager/searchColorManager';

import { ProteinExperimentPage_Display } from './proteinExperimentPage_Display';


//  From Testing
	
// import { TestPageComponent } from 'page_js/z_test_code/testPageComponent';
	
//  Import for typing only
import { Experiment_DataPages_LoggedInUser_CommonObjectsFactory } from 'page_js/data_pages/experiment_data_pages_common/experiment_DataPages_LoggedInUser_CommonObjectsFactory';
import { SearchDataLookupParameters_Root } from 'page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters';
import {ProteinGrouping_CentralStateManagerObjectClass} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_protein_list_common/proteinGrouping_CentralStateManagerObjectClass";
import {ProteinList_ExpPage_CentralStateManagerObjectClass} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_root/js/proteinList_ExpPage_CentralStateManagerObjectClass";
import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass";

/**
 * 
 */
export class ProteinExperimentPage_RootClass_Common {

	private _experiment_DataPages_LoggedInUser_CommonObjectsFactory : Experiment_DataPages_LoggedInUser_CommonObjectsFactory;

	private _page_UserDefault_processing : Page_UserDefault_processing;
	private _centralPageStateManager : CentralPageStateManager;
	private _proteinList_ExpPage_CentralStateManagerObjectClass : ProteinList_ExpPage_CentralStateManagerObjectClass;
	private _experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass : Experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass;
	private _proteinGrouping_CentralStateManagerObjectClass : ProteinGrouping_CentralStateManagerObjectClass
	private _singleProtein_ExpPage_CentralStateManagerObjectClass : SingleProtein_ExpPage_CentralStateManagerObjectClass;
	private _modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass

	private _dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay = new DataPageStateManager();

	private _dataPageStateManager_DataFrom_Server : DataPageStateManager;
	private _getExerimentMainDataFromPage : GetExerimentMainDataFromPage;
	private _getSearchDataLookupParametersFromPage : GetSearchDataLookupParametersFromPage;
	private _loadCoreData_ProjectSearchIds_Based : LoadCoreData_ProjectSearchIds_Based;
	private _proteinExperimentPage_Display : ProteinExperimentPage_Display;

	/**
	 * @param experiment_DataPages_LoggedInUser_CommonObjectsFactory - Optional
	 */
	constructor(
		{ experiment_DataPages_LoggedInUser_CommonObjectsFactory } : 
		{ experiment_DataPages_LoggedInUser_CommonObjectsFactory? : Experiment_DataPages_LoggedInUser_CommonObjectsFactory }
	) {

		this._experiment_DataPages_LoggedInUser_CommonObjectsFactory = experiment_DataPages_LoggedInUser_CommonObjectsFactory;

		this._page_UserDefault_processing = new Page_UserDefault_processing();

		this._centralPageStateManager = new CentralPageStateManager();

		this._proteinList_ExpPage_CentralStateManagerObjectClass = new ProteinList_ExpPage_CentralStateManagerObjectClass({ centralPageStateManager : this._centralPageStateManager });

		this._experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass = new Experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass({
			centralPageStateManager : this._centralPageStateManager
		})
		this._proteinGrouping_CentralStateManagerObjectClass = new ProteinGrouping_CentralStateManagerObjectClass({
			centralPageStateManager : this._centralPageStateManager,
			proteinList_CentralStateManagerObjectClass : undefined  //  Skip since only passed to get Old state data
		})
		this._singleProtein_ExpPage_CentralStateManagerObjectClass = new SingleProtein_ExpPage_CentralStateManagerObjectClass({ 
			centralPageStateManager : this._centralPageStateManager, initialProteinSequenceVersionId : undefined
		});
		this._modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass =
			ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.getNewInstance_MainPage({ centralPageStateManager: this._centralPageStateManager });

		// this._proteinList_CentralStateManagerObjectClass = new ProteinList_CentralStateManagerObjectClass( { centralPageStateManager : this._centralPageStateManager } );
		// this._searchColors_CentralStateManagerObject = new SearchColorManager( { centralPageStateManager : this._centralPageStateManager } );

		//  Instances of class DataPageStateManager
		
		/**
		 * Project Search Ids, their filters and Annotation Type Ids to display that user entered.  The values used for filters for displaying data and how to display the data
		 */
		this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay = new DataPageStateManager();

		/**
		 * Store data from server
		 */
		this._dataPageStateManager_DataFrom_Server = new DataPageStateManager();
		
		this._getExerimentMainDataFromPage = new GetExerimentMainDataFromPage();

		this._getSearchDataLookupParametersFromPage = new GetSearchDataLookupParametersFromPage();

		// this._sharePage_dataPages = new SharePage_dataPages();
	}
	

	/**
	 * 
	 */
	initialize() {

		catchAndReportGlobalOnError.init();

		window.onpopstate = function(event) {
			//  User clicked the back button so reload so page reflects that URL
			window.location.reload(true);
		};

		/////////////////////////

		this._page_UserDefault_processing.page_UserDefault_processing();
		
		let initialStateFromURL = this._centralPageStateManager.getInitialStateFromURL();

		this._proteinList_ExpPage_CentralStateManagerObjectClass.initialize();

		this._experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass.initialize();
		this._proteinGrouping_CentralStateManagerObjectClass.initialize();
		this._singleProtein_ExpPage_CentralStateManagerObjectClass.initialize();
		this._modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.initialize_MainPageInstance();

		{
			const generatedPeptideContents_UserSelections__EncodedStateData = this._proteinList_ExpPage_CentralStateManagerObjectClass.getGeneratedPeptideContentsSelectedEncodedStateData();
			if ( generatedPeptideContents_UserSelections__EncodedStateData ) {
				this._singleProtein_ExpPage_CentralStateManagerObjectClass.setGeneratedPeptideContents_UserSelections__EncodedStateData({ generatedPeptideContents_UserSelections__EncodedStateData });
				//  clear value after transfer
				this._proteinList_ExpPage_CentralStateManagerObjectClass.setGeneratedPeptideContentsSelectedEncodedStateData({ generatedPeptideContentsSelectedEncodedStateData: undefined });
			}
		}

		let referrerFromURL_Set = false;

		{
			let referrerFromURL = initialStateFromURL.referrer;

			if (referrerFromURL === _REFERRER_PATH_STRING) {

				//  TODO  do any needed processing of the URL since it is a referrer from another page

				referrerFromURL_Set = true;

				//  Could do default URL processing here.
				//		IE: Replace the current URL with the default URL and then call again:
				//			let initialStateFromURL = this._centralPageStateManager.getInitialStateFromURL();
			}
		}

		// //  Clear the referrer flag from URL, if it exists
		this._centralPageStateManager.clearReferrerFlagFromURL();


		if ( referrerFromURL_Set ) {

			//  If referrer from another page (peptide, ...) clear TreatOpenModMassZeroAsUnmodified_Selection.

			//    TreatOpenModMassZeroAsUnmodified_Selection is only here to pick up for old Protein page URLs.  All new values are set only on Single Protein, never set on Protein main page.

			this._modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.setTreatOpenModMassZeroAsUnmodified_Selection( false );

		} else {

			//  NOT referrer from another page (peptide, ...).  Copy TreatOpenModMassZeroAsUnmodified_Selection to Single Protein and then clear

			//    TreatOpenModMassZeroAsUnmodified_Selection is only here to pick up for old Protein page URLs.  All new values are set only on Single Protein, never set on Protein main page.

			let transfer_OpenModMassZeroNotOpenMod_UserSelection_To_SingleProteinStateObject = false;
			{
				const modificationMass_OpenModMassZeroNotOpenMod_UserSelection__EncodedStateData_SingleProtein = this._singleProtein_ExpPage_CentralStateManagerObjectClass.getModificationMass_OpenModMassZeroNotOpenMod_UserSelection__EncodedStateData();
				if ( ! modificationMass_OpenModMassZeroNotOpenMod_UserSelection__EncodedStateData_SingleProtein ) {

					//  NOT Already populated

					transfer_OpenModMassZeroNotOpenMod_UserSelection_To_SingleProteinStateObject = true;
				}
			}
			if ( transfer_OpenModMassZeroNotOpenMod_UserSelection_To_SingleProteinStateObject ) {

				//  Create new modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_SingleProtein with copy of Selection for main page
				const modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_SingleProtein : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass = ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.getNewInstance_SingleProtein();

				modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_SingleProtein.initialize_SingleProteinInstance({
					encodedStateData: undefined
				});

				if ( this._modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.getTreatOpenModMassZeroAsUnmodified_Selection() ) {
					modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_SingleProtein.setTreatOpenModMassZeroAsUnmodified_Selection( true );
				} else {
					modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_SingleProtein.setTreatOpenModMassZeroAsUnmodified_Selection( false );
				}

				//  Clear the Page level selection since NOT used at page level.  ONLY on Protein Page.
				this._modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.setTreatOpenModMassZeroAsUnmodified_Selection( false );

				const modificationMass_OpenModMassZeroNotOpenMod_UserSelection__EncodedStateData = modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_SingleProtein.getDataForEncoding();

				this._singleProtein_ExpPage_CentralStateManagerObjectClass.setModificationMass_OpenModMassZeroNotOpenMod_UserSelection__EncodedStateData({ modificationMass_OpenModMassZeroNotOpenMod_UserSelection__EncodedStateData });
				this._modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.setTreatOpenModMassZeroAsUnmodified_Selection( false );
			}

		}


		{
			const mainPagesPopulateHeader = new MainPagesPopulateHeader();
			mainPagesPopulateHeader.initialize();
		}

		const searchDataLookupParametersFromPage = this._getSearchDataLookupParametersFromPage.getSearchDataLookupParametersFromPage();
		const searchDataLookupParamsRoot : SearchDataLookupParameters_Root = searchDataLookupParametersFromPage.search_data_lookup_parameters_at_page_load;

		const exerimentMainDataFromPage = this._getExerimentMainDataFromPage.getExerimentMainDataFromPage({ searchDataLookupParamsRoot });

		const experimentId : number = exerimentMainDataFromPage.experimentId;
		// const experiment_id_string : string = exerimentMainDataFromPage.experiment_id_string;
		const experimentName : string = exerimentMainDataFromPage.experiment_name;
		const projectSearchIds : Array<number> = exerimentMainDataFromPage.experiment_project_search_ids_at_page_load;
		
		const conditionGroupsContainer : Experiment_ConditionGroupsContainer = exerimentMainDataFromPage.experiment_ConditionGroupsContainer;
		const conditionGroupsDataContainer : Experiment_ConditionGroupsDataContainer = exerimentMainDataFromPage.conditionGroupsDataContainer;

		// experiment_ConditionGroupsContainer,
		// 	conditionGroupsDataContainer,


        const experimentConditions_GraphicRepresentation_PropsData : ExperimentConditions_GraphicRepresentation_PropsData = ( 
            create_experimentConditions_GraphicRepresentation_PropsData({ conditionGroupsContainer, conditionGroupsDataContainer }) //  Call External Function
		);
		
		////  !!!   Not using existing Search Details Block
		
		// this._searchDetailsBlockDataMgmtProcessing.storeSearchDetails_Filters_AnnTypeDisplay_Root( {
		// 	searchDetails_Filters_AnnTypeDisplay_Root : searchDataLookupParametersFromPage.search_data_lookup_parameters_at_page_load } ); 


		//  !!!!!!!!  Getting the projectSearchIds from the experiment
		
		// let projectSearchIds = searchDataLookupParametersFromPage.projectSearchIds;
		
		this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.set_projectSearchIds( projectSearchIds );


		// this._proteinExperimentPage_DisplayDataOnPage.initialize({ projectSearchIds });
		
		// navigation_dataPages_Maint_Instance.initializePageOnLoad({ projectSearchIds }); // Initialize

		//  loadCoreData_ProjectSearchIds_Based - Loads Annotation Type data, Per Program data, search names, etc.   Annotation Type data is needed for displaying data.
		
		this._loadCoreData_ProjectSearchIds_Based =
			new LoadCoreData_ProjectSearchIds_Based( {
				dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
				dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server
			});
		
		const _loadCoreData_ProjectSearchIds_Based_Promise = this._loadCoreData_ProjectSearchIds_Based.loadCoreDataFor_ProjectSearchIds();

		_loadCoreData_ProjectSearchIds_Based_Promise.catch( (reason) => {});

		_loadCoreData_ProjectSearchIds_Based_Promise.then( ( value ) => {
			try {
				//  Continue processing
						
				this._proteinExperimentPage_Display = new ProteinExperimentPage_Display({ 
					dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server,
					experiment_DataPages_LoggedInUser_CommonObjectsFactory : this._experiment_DataPages_LoggedInUser_CommonObjectsFactory,
					experimentId, 
					experimentName, 
					projectSearchIds,
					searchDataLookupParamsRoot,
					conditionGroupsContainer,
					conditionGroupsDataContainer,
					experimentConditions_GraphicRepresentation_PropsData,
					// centralPageStateManager : this._centralPageStateManager,
					experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass : this._experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass,

					proteinList_ExpPage_CentralStateManagerObjectClass : this._proteinList_ExpPage_CentralStateManagerObjectClass,

					proteinGrouping_CentralStateManagerObjectClass : this._proteinGrouping_CentralStateManagerObjectClass,
					singleProtein_ExpPage_CentralStateManagerObjectClass : this._singleProtein_ExpPage_CentralStateManagerObjectClass,
				});
				
				this._proteinExperimentPage_Display.initialize();

			} catch( e ) {
				console.warn("_loadCoreData_ProjectSearchIds_Based_Promise.then: exception: " + e );
				console.warn( e );
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});

	}


}
