/*
* Original author: Daniel Jaschob <djaschob .at. uw.edu>
*                  
* Copyright 2018 University of Washington - Seattle, WA
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers;

/**
 * The paths of the rest webservice controllers for data
 *
 */
public class AA_RestWSControllerPaths_Constants {
	
	//  For user account see: AA_UserAccount_RestWSControllerPaths_Constants

	//  All start with "/d/rws/" for data/rest web service

	//  All for Project Search Ids include "/psb/" for data/page ('psb' for project search based)
	
	//  Adding /for-page to differentiate between possible future public web services

	/**
	 * Place before path on all controllers.   This way the path listed for controllers can be used directly on the page or in Javascript AJAX.
	 */
	public static final String PATH_START_ALL = "/";

	/**
	 * Path Parameter Label  
	 */
	public static final String PATH_PARAMETER_LABEL_WEBSERVICE_SYNC_TRACKING = "webserviceSyncTracking";
	
	/**
	 * !!!  Place at end of all Webservice Paths
	 * 
	 * Spring MVC format for path parameter
	 */
	public static final String PATH_PARAMETER_LABEL_WEBSERVICE_SYNC_TRACKING_PATH_ADDITION =
			"/{" + PATH_PARAMETER_LABEL_WEBSERVICE_SYNC_TRACKING + "}";
	

	////////////
	
	//   General

	public static final String LOG_BROWSER_JAVASCRIPT_ERROR_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/log-browser-javascript-error";
	
	

	////////////
	
	//   Project List 
	
	public static final String PROJECT_LIST_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/project-list";
	
	////////////
	
	//   Project oriented

	public static final String PROJECT_CREATE_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/project-create";

	public static final String PROJECT_LOCK_PROJECT_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/project-lock-project";
	public static final String PROJECT_UNLOCK_PROJECT_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/project-unlock-project";

	public static final String PROJECT_ENABLE_PUBLIC_ACCESS_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/project-enable-public-access";
	public static final String PROJECT_DISABLE_PUBLIC_ACCESS_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/project-disable-public-access";
	
	
	public static final String PROJECT_UPDATE_PROJECT_TITLE_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/project-update-title";

	public static final String PROJECT_UPDATE_PROJECT_ABSTRACT_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/project-update-abstract";
	
	//  Users and change user access

	public static final String PROJECT_VIEW_PAGE_USER_INVITE_LIST_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/project-view-page-user-invite-list";

	public static final String PROJECT_VIEW_PAGE_USER_LIST_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/project-view-page-user-list";

	public static final String PROJECT_USERS_NOT_IN_PROJECT_LIST_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/project-users-not-in-project-list";

	//       Change Existing Users in Project
	
	public static final String PROJECT_CHANGE_USER_ACCESS_TO_PROJECT_OWNER_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/project-change-user-access-to-project-owner";
	
	public static final String PROJECT_CHANGE_USER_ACCESS_TO_ASSIST_PROJECT_OWNER_REST_WEBSERVICE_CONTROLLER = // Researcher
			"d/rws/for-page/project-change-user-access-to-assist-project-owner";

	public static final String PROJECT_REMOVE_USER_ACCESS_TO_PROJECT_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/project-remove-user-access-to-project";
	
	//        Invite User/Person to Project, Change Invites
	
	public static final String PROJECT_INVITE_USER_TO_PROJECT_NEW_OR_EXISTING_USER_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/project-invite-user-to-project-new-or-existing-user";

	public static final String PROJECT_INVITE_RESEND_INVITE_EMAIL_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/project-invite-resend-invite-email";
	
	public static final String PROJECT_INVITE_CHANGE_ACCESS_TO_PROJECT_OWNER_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/project-invite-change-user-access-to-project-owner";

	public static final String PROJECT_INVITE_CHANGE_ACCESS_TO_ASSIST_PROJECT_OWNER_REST_WEBSERVICE_CONTROLLER = // Researcher
			"d/rws/for-page/project-invite-change-user-access-to-assist-project-owner";

	public static final String PROJECT_INVITE_REVOKE_REST_WEBSERVICE_CONTROLLER =
			"d/rws/for-page/project-invite-revoke";
	
	//////
	
	//   Upload Data Webservices

	public static final String PROJECT__UPLOAD_DATA_PENDING_COUNT_REST_WEBSERVICE_CONTROLLER =
			"d/rws/for-page/project-upload-data-pending-count";
	
	public static final String PROJECT__UPLOAD_DATA_LIST_SUBMITTED_ITEMS_REST_WEBSERVICE_CONTROLLER =
			"d/rws/for-page/project-upload-data-list-submitted-items";

	public static final String PROJECT__UPLOAD_DATA_REMOVE_QUEUED_IMPORT_REST_WEBSERVICE_CONTROLLER =
			"d/rws/for-page/project-upload-data-remove-queued-import";
	public static final String PROJECT__UPLOAD_DATA_REMOVE_FAILED_IMPORT_REST_WEBSERVICE_CONTROLLER =
			"d/rws/for-page/project-upload-data-remove-failed-import";
	public static final String PROJECT__UPLOAD_DATA_REMOVE_SUCCESS_IMPORT_REST_WEBSERVICE_CONTROLLER =
			"d/rws/for-page/project-upload-data-remove-success-import";
	
	//  Upload Data, New Upload Webservices
	
	public static final String PROJECT__UPLOAD_DATA_UPLOAD_INITIALIZE_REST_WEBSERVICE_CONTROLLER =
			"d/rws/for-page/project-upload-data-upload-initialize";

	public static final String PROJECT__UPLOAD_DATA_UPLOAD_INITIALIZE_FROM_SUBMIT_PGM_REST_WEBSERVICE_CONTROLLER =
			"d/rws/for-page/project-upload-data-upload-initialize-from-submit-pgm";

	public static final String PROJECT__UPLOAD_DATA_UPLOAD_FILE_REST_WEBSERVICE_CONTROLLER =
			"d/rws/for-page/project-upload-data-upload-file";

	public static final String PROJECT__UPLOAD_DATA_UPLOAD_FILE_FROM_SUBMIT_PGM_REST_WEBSERVICE_CONTROLLER =
			"d/rws/for-page/project-upload-data-upload-file-from-submit-pgm";

	public static final String PROJECT__UPLOAD_DATA_UPLOAD_SUBMIT_REST_WEBSERVICE_CONTROLLER =
			"d/rws/for-page/project-upload-data-upload-submit";

	public static final String PROJECT__UPLOAD_DATA_UPLOAD_SUBMIT_FROM_SUBMIT_PGM_REST_WEBSERVICE_CONTROLLER =
			"d/rws/for-page/project-upload-data-upload-submit-from-submit-pgm";

	public static final String PROJECT__UPLOAD_DATA_UPLOAD_REMOVE_ABANDONED_REST_WEBSERVICE_CONTROLLER =
			"d/rws/for-page/project-upload-data-upload-remove-abandoned";

	///////////////////////
	
	//   Label for Project - for Short URL

	public static final String PROJECT_LABEL_GET_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/project-label-get";
	public static final String PROJECT_LABEL_ADD_CHANGE_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/project-label-add-change";
	
	///////////////////////
	
	//   Notes for Project

	public static final String PROJECT_NOTES_LIST_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/project-notes-list";
	public static final String PROJECT_NOTE_ADD_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/project-note-add";
	public static final String PROJECT_NOTE_UPDATE_TEXT_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/project-note-update-text";
	public static final String PROJECT_NOTE_DELETE_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/project-note-delete";

	///////////////////////
	
	//   Saved Views for Project

	public static final String PROJECT_VIEW_PAGE_SAVED_VIEWS_LIST_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/project-view-page-saved-views-list";

	//   Saved View Maint on Project Page (Edit Label, Delete)

	public static final String SAVED_VIEW_CHANGE_LABEL_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/saved-view-change-label";

	public static final String DELETE_SAVED_VIEW_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/delete-saved-view";

	
	///////////////////////
	
	//   Searches for Project

	public static final String PROJECT_VIEW_PAGE_SEARCH_LIST_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/project-view-page-search-list";

	//   Project Search Id, Copy/Move to New Project

	public static final String LIST_OTHER_PROJECTS_EXCLUDING_PROJ_SEARCH_IDS_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/list-other-projects-excluding-project-search-ids";

	public static final String LIST_PROJECT_SEARCH_IDS_WHERE_ASSOC_SEARCH_IDS_ALREADY_IN_PROJECT_REST_WEBSERVICE_CONTROLLER =
			"d/rws/for-page/list-project-search-ids-where-assoc-search-ids-already-in-project";

	public static final String COPY_OR_MOVE_PROJECT_SEARCH_IDS_TO_NEW_PROJECT_REST_WEBSERVICE_CONTROLLER =
			"d/rws/for-page/copy-or-move-project-search-ids-to-new-project";

	////////////
	
	//   Project Search Id driven Update DB
	
	public static final String UPDATE_SEARCH_NAME_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/update-search-name";

	//   Project Search Id driven Delete DB
	public static final String DELETE_PROJECT_SEARCH_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/delete-project-search";

	//  Project Search Sub contents (search file, ...) Update DB
	
	public static final String UPDATE_SEARCH_FILENAME_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/update-search-filename";

	public static final String INSERT_WEB_LINK_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/insert-web-link";

	public static final String DELETE_WEB_LINK_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/delete-web-link";

	public static final String INSERT_COMMENT_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/insert-comment";

	public static final String UPDATE_COMMENT_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/update-comment";

	public static final String DELETE_COMMENT_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/delete-comment";
	
	
	//    Save View (Save Current View of a Project Search Id based page [peptide,protein,...])
	
	//   Insert Saved View

	public static final String INSERT_SAVED_VIEW_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/psb/insert-saved-view";
	
	
	////////////
	
	//   Project Search Ids driven pages
	
	public static final String GET_SEARCH_DATA_LOOKUP_PARAMETERS_CODE_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/psb/get-search-data-lookup-params-code";

	// Results from Multiple Project Search Ids
	
	// Search Details 'Core' for both Project Page and Data Pages

	public static final String GET_SEARCH_DETAILS_CORE_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/psb/get-search-details-core";

	// Search Details 'Project Page' for Project Page

	public static final String GET_SEARCH_DETAILS_PROJECT_PAGE_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/psb/get-search-details-project-page";

	
	
	
	// Results from Multiple Project Search Ids and Other Criteria


	// Results from Single Project Search Id and Other Criteria

	//  Static Mods for Project Search Id
	public static final String STATIC_MODS_SINGLE_PROJECT_SEARCH_ID =
			"d/rws/for-page/psb/static-mods-single-project-search-id";

	//  Used across various pages beyond just Reported Peptides Page
	//    Pass in Project Search Id and Cutoff Criteria
	//    Returns Reported Peptide Ids and in some cases the Number of PSMs
	//     Not currently used for Reported Peptides Page, PEPTIDE_VIEW_PAGE_PEPTIDE_LIST_SINGLE_PROJECT_SEARCH_ID_REST_WEBSERVICE_CONTROLLER used instead there
	public static final String REPORTED_PEPTIDE_LIST_REPORTED_PEPTIDE_IDS_SINGLE_PROJECT_SEARCH_ID_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/psb/reported-peptide-id-list-for-search-criteria-single-project-search-id";
	
	//  Reported Peptide Filterable Annotation data for Reported Peptide Ids, Annotation Type Ids, Project Search Id
	public static final String REPORTED_PEPTIDE_FILTRBL_ANN_DATA_LIST_REP_PEPT_IDS_ANN_TYPE_IDS_SINGLE_PROJECT_SEARCH_ID =
			"d/rws/for-page/psb/reported-peptide-filtrbl-ann-data-list-rep-pept-ids-ann-type-ids-single-project-search-id";

	//  Reported Peptide Descriptive Annotation data for Reported Peptide Ids, Annotation Type Ids, Project Search Id
	public static final String REPORTED_PEPTIDE_DESCRIPTIVE_ANN_DATA_LIST_REP_PEPT_IDS_ANN_TYPE_IDS_SINGLE_PROJECT_SEARCH_ID =
			"d/rws/for-page/psb/reported-peptide-descriptive-ann-data-list-rep-pept-ids-ann-type-ids-single-project-search-id";

	public static final String PSM_COUNT_PER_REPORTED_PEPTIDE_ID_FOR_REP_PEPT_IDS_SEARCHCRITERIA_SINGLE_PROJECT_SEARCH_ID_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/psb/psm-count-per-reported-peptide-id-for-rep-pept-ids-searchcriteria-single-project-search-id";


	//  PSM Best (at Reported Peptide level) Filterable Annotation data for Reported Peptide Ids, Annotation Type Ids, Project Search Id
	public static final String PSM_BEST_FILTRBL_ANN_DATA_LIST_REP_PEPT_IDS_ANN_TYPE_IDS_SINGLE_PROJECT_SEARCH_ID =
			"d/rws/for-page/psb/psm-best-filtrbl-ann-data-list-rep-pept-ids-ann-type-ids-single-project-search-id";

	
	//  Currently only used on Peptide Page
	public static final String PEPTIDE_VIEW_PAGE_PEPTIDE_LIST_SINGLE_PROJECT_SEARCH_ID_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/psb/peptide-view-page-peptide-list-single-project-search-id";

	 /*               
	 *  Used by JS files:
	 *  
	 *     page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewDataLoader.js
	 *     
	 *     data_pages/project_search_ids_driven_pages/protein_page/proteinViewPage_DisplayData_SingleSearch.js
	 *            - For displaying the reported peptides for a protein (May change to different Webservice in future)
	 */
	public static final String PEPTIDE_LIST_REPORTED_PEPTIDE_IDS_SINGLE_PROJECT_SEARCH_ID_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/psb/peptide-list-reported-peptide-ids-single-project-search-id";

	public static final String PSM_LIST_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/psb/psm-list";
	
	public static final String SPECTRUM_FOR_PSM_ID_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/psb/spectrum-for-psm-id";

	public static final String PSM_PEPTIDE_LIST_DISPLAY_WITH_SPECTRUM_VIEWER_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/psb/psm-peptide-list-display-with-spectrum-viewer";
	
	public static final String PSM_COUNT_SEARCHCRITERIA_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/psb/psm-count-searchcriteria";

	public static final String PSM_COUNT_FOR_RESIDUES_SEARCHCRITERIA_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/psb/psm-count-for-residues-searchcriteria";

	public static final String PEPTIDE_IDS_FOR_REPORTED_PEPTIDES_ID_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/psb/peptide-ids-for-reported-peptide-ids";

	public static final String PEPTIDE_SEQUENCE_STRINGS_FOR_REPORTED_PEPTIDES_ID_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/psb/peptide-sequences-for-reported-peptide-ids";

	public static final String REPORTED_PEPTIDE_STRINGS_FOR_REPORTED_PEPTIDES_ID_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/psb/reported-peptide-strings-for-reported-peptide-ids";

	public static final String PROTEIN_SEQUENCE_VERSION_IDS_FOR_REPORTED_PEPTIDE_IDS_PROJECT_SEARCH_ID_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/psb/protein-sequence-version-ids-for-reported-peptide-ids";

	public static final String PROTEIN_INFO_PROTEIN_SEQUENCE_VERSION_IDS_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/psb/protein-info-prot-seq-v-ids-list";

	public static final String PROTEIN_INFO_SEARCHCRITERIA_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/psb/protein-info-searchcriteria-list";

	public static final String PROTEIN_MOD_INFO_SEARCHCRITERIA_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/psb/protein-mod-info-searchcriteria-list";

	public static final String PROTEIN_SEQUENCES_FOR_PROT_SEQ_VER_ID_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/psb/protein-sequences-for-prot-seq-ver-ids";

	public static final String PROTEIN_RESIDUES_FOR_PROT_SEQ_VER_ID_POSITIONS_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/psb/protein-residues-for-prot-seq-ver-ids-positions";

	//  Protein Sequence Version Ids for each Reported Peptide Id in request
	public static final String PROTEIN_SEQ_V_ID_LIST_PER_REPORTED_PEPTIDE_ID_SINGLE_PROJECT_SEARCH_ID_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/psb/protein-seq-version-id-list-for-reported-peptide-ids-single-project-search-id";

	//  Protein Sequence Coverage for each Reported Peptide Id in request
	public static final String PROTEIN_COVERAGE_PER_REPORTED_PEPTIDE_ID_FOR_REP_PEPT_IDS_SINGLE_PROJECT_SEARCH_ID_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/psb/protein-coverage-per-reported-peptide-id-for-rep-pept-ids-single-project-search-id";

	//  Reported Peptide Modifications for each Reported Peptide Id in request
	public static final String DYNAMIC_MODIFICATIONS_PER_REPORTED_PEPTIDE_ID_FOR_REP_PEPT_IDS_SINGLE_PROJECT_SEARCH_ID_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/psb/dynamic-modifications-per-reported-peptide-id-for-rep-pept-ids-single-project-search-id";

	
	//    used on many pages 
	
	public static final String SEARCH_NAME_LIST_FROM_PROJECT_SEARCH_IDS_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/psb/search-name-list-from-psi";

	public static final String SEARCH_PROGRAMS_PER_SEARCH_LIST_FROM_PROJECT_SEARCH_IDS_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/psb/search-programs-per-search-list-from-psi";

	public static final String SEARCH_ANNOTATION_TYPE_LIST_FROM_PROJECT_SEARCH_IDS_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/psb/search-annotation-type-list-from-psi";

}
