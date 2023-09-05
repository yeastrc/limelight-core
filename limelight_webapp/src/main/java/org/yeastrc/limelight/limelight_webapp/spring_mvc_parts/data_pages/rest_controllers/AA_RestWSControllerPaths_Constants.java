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

	///////////////
	
	/**
	 * All paths for data page webservices will start with this string
	 */
	public static final String DATA_PAGE_REST_WEBSERVICE_CONTROLLER_START = "d/rws/";
	
	
	////////////
	
	//   General

	public static final String LOG_BROWSER_JAVASCRIPT_ERROR_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/log-browser-javascript-error";

	public static final String USER_SESSION_KEEP_ALIVE_IF_EXISTS_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/user-session-keep-alive-if-exists";
	
	

	////////////
	
	//   Project List 
	
	public static final String PROJECT_LIST_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/project-list";
	
	////////////
	
	//   Project oriented

	public static final String PROJECT_GET_TITLE_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/project-get-title";

	public static final String PROJECT_CREATE_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/project-create";

	public static final String PROJECT_MARK_FOR_DELETION_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/project-mark-for-deletion";

	public static final String PROJECT_LOCK_PROJECT_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/project-lock-project";
	public static final String PROJECT_UNLOCK_PROJECT_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/project-unlock-project";

	public static final String PROJECT_ENABLE_PUBLIC_ACCESS_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/project-enable-public-access";
	public static final String PROJECT_DISABLE_PUBLIC_ACCESS_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/project-disable-public-access";

	public static final String PROJECT_ENABLE_PUBLIC_ACCESS_CODE_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/project-enable-public-access-code";
	public static final String PROJECT_DISABLE_PUBLIC_ACCESS_CODE_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/project-disable-public-access-code";
	public static final String PROJECT_GENERATE_NEW_PUBLIC_ACCESS_CODE_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/project-generate-new-public-access-code";
	
	
	public static final String PROJECT_UPDATE_PROJECT_TITLE_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/project-update-title";

	public static final String PROJECT_UPDATE_PROJECT_ABSTRACT_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/project-update-abstract";
	
	//  Users and change user access

	public static final String PROJECT_VIEW_PAGE_USER_INVITE_LIST_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/project-view-page-user-invite-list";

	public static final String PROJECT_VIEW_PAGE_USER_LIST_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/project-view-page-user-list";

	public static final String PROJECT_USERS_NOT_IN_PROJECT_LIST_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/project-users-not-in-project-list";

	//       Change Existing Users in Project
	
	public static final String PROJECT_CHANGE_USER_ACCESS_TO_PROJECT_OWNER_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/project-change-user-access-to-project-owner";

	public static final String PROJECT_CHANGE_USER_ACCESS_TO_VIEWER_READ_ONLY_REST_WEBSERVICE_CONTROLLER = // Viewer (Read Only)
			"d/rws/for-page/project-change-user-access-to-viewer-read-only";

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

	public static final String PROJECT_INVITE_CHANGE_ACCESS_TO_VIEWER_READ_ONLY_REST_WEBSERVICE_CONTROLLER = // Viewer (Read Only)
			"d/rws/for-page/project-invite-change-user-access-to-viewer-read-only";

	public static final String PROJECT_INVITE_CHANGE_ACCESS_TO_ASSIST_PROJECT_OWNER_REST_WEBSERVICE_CONTROLLER = // Researcher
			"d/rws/for-page/project-invite-change-user-access-to-assist-project-owner";

	public static final String PROJECT_INVITE_REVOKE_REST_WEBSERVICE_CONTROLLER =
			"d/rws/for-page/project-invite-revoke";
	
	//////
	
	//   Upload Data - Upload List - Main Page - Webservices

	public static final String PROJECT__UPLOAD_DATA_PENDING_COUNT_REST_WEBSERVICE_CONTROLLER =
			"d/rws/for-page/project-upload-data-pending-count";
	
	public static final String PROJECT__UPLOAD_DATA_LIST_SUBMITTED_ITEMS_REST_WEBSERVICE_CONTROLLER =
			"d/rws/for-page/project-upload-data-list-submitted-items";
	
	//  Mark as deleted: entry in table file_import_tracking_tbl - Not change if in STARTED status 

	public static final String PROJECT__UPLOAD_DATA_REMOVE_FILE_IMPORT_ITEM__REMOVE_IMPORT_LIMELIGHTXML_ANDOR_SCAN_FILES__REST_WEBSERVICE_CONTROLLER =
			"d/rws/for-page/project-upload-data-remove-file-import-item-remove-import-limelightxml-andor-scan-files";

	//  Mark as deleted: entry in table import_and_pipeline_run_tracking_tbl - Not change if in STARTED status

	public static final String PROJECT__UPLOAD_DATA_REMOVE_IMPORT_AND_PIPELINE_RUN_ITEM__REMOVE_IMPORT_ANDOR_PIPELINE_RUN__REST_WEBSERVICE_CONTROLLER =
			"d/rws/for-page/project-upload-data-remove-import-and-pipeline-run-item-remove-import-import-andor-pipeline-run";
	
	//  Upload Data, New Upload Webservices

	public static final String PROJECT__UPLOAD_DATA_UPLOAD_SUBMIT_PGM_AUTH_TEST_REST_WEBSERVICE_CONTROLLER =
			"d/rws/for-page/project-upload-data-upload-submit-pgm-auth-test";

	/**
	 * ONLY for Webapp - Validates User Session
	 */
	public static final String PROJECT__UPLOAD_DATA_UPLOAD_GET_SUPPORTED_SCAN_FILENAME_SUFFIXES_REST_WEBSERVICE_CONTROLLER =
			"d/rws/for-page/project-upload-data-upload-get-supported-scan-filename-suffixes";

	/**
	 * Only for Submit Program - Validates user-submit-import-key
	 */
	public static final String PROJECT__UPLOAD_DATA_UPLOAD_GET_FASTA_FILE_UPLOAD_ACCEPTED_SUBMIT_PROGRAM_REST_WEBSERVICE_CONTROLLER =
			"d/rws/for-page/project-upload-data-upload-get-fasta-file-upload-accepted-submit-program";

	//   Initialize Submit An Import
	
	public static final String PROJECT__UPLOAD_DATA_UPLOAD_INITIALIZE_REST_WEBSERVICE_CONTROLLER =
			"d/rws/for-page/project-upload-data-upload-initialize";

	public static final String PROJECT__UPLOAD_DATA_UPLOAD_INITIALIZE_FROM_SUBMIT_PGM_REST_WEBSERVICE_CONTROLLER =
			"d/rws/for-page/project-upload-data-upload-initialize-from-submit-pgm";

	//   Upload a Single File
	
	//         Initialize Single File
	public static final String PROJECT__UPLOAD_DATA_V2_UPLOAD_FILE_INITIALIZE_REST_WEBSERVICE_CONTROLLER =
			"d/rws/for-page/project-upload-data-v2-upload-file-initialize";

	public static final String PROJECT__UPLOAD_DATA_V2_UPLOAD_FILE_INITIALIZE_FROM_SUBMIT_PGM_REST_WEBSERVICE_CONTROLLER =
			"d/rws/for-page/project-upload-data-v2-upload-file-initialize-from-submit-pgm";

	//         Send Data
	public static final String PROJECT__UPLOAD_DATA_V2_UPLOAD_FILE_CHUNKING_UPLOAD_FILE_REST_WEBSERVICE_CONTROLLER =
			"d/rws/for-page/project-upload-data-v2-upload-file-chunking-upload-file";

	//         'Submit' (complete) Single File
	public static final String PROJECT__UPLOAD_DATA_V2_UPLOAD_FILE_SUBMIT_REST_WEBSERVICE_CONTROLLER =
			"d/rws/for-page/project-upload-data-v2-upload-file-submit";

	public static final String PROJECT__UPLOAD_DATA_V2_UPLOAD_FILE_SUBMIT_FROM_SUBMIT_PGM_REST_WEBSERVICE_CONTROLLER =
			"d/rws/for-page/project-upload-data-v2-upload-file-submit-from-submit-pgm";

	//         'Cancel' 'Delete' Single File
	
	public static final String PROJECT__UPLOAD_DATA_V2_UPLOAD_FILE_CANCEL_DELETE_REST_WEBSERVICE_CONTROLLER =
			"d/rws/for-page/project-upload-data-v2-upload-file-cancel-delete";

	public static final String PROJECT__UPLOAD_DATA_V2_UPLOAD_FILE_CANCEL_DELETE_FROM_SUBMIT_PGM_REST_WEBSERVICE_CONTROLLER =
			"d/rws/for-page/project-upload-data-v2-upload-file-cancel-delete-from-submit-pgm";

	
	/**
	 * Upload a Single File - OLD V1
	 * 
	 * ***  KEPT to support OLD Submit Import Program (and current Submit Import Program since not yet updated)
	 */
	public static final String PROJECT__UPLOAD_DATA_UPLOAD_FILE_FROM_SUBMIT_PGM_REST_WEBSERVICE_CONTROLLER =
			"d/rws/for-page/project-upload-data-upload-file-from-submit-pgm";
	
	
	//  Final Submit of overall Upload request

	public static final String PROJECT__UPLOAD_DATA_UPLOAD_SUBMIT_REST_WEBSERVICE_CONTROLLER =
			"d/rws/for-page/project-upload-data-upload-submit";

	public static final String PROJECT__UPLOAD_DATA_UPLOAD_SUBMIT_FROM_SUBMIT_PGM_REST_WEBSERVICE_CONTROLLER =
			"d/rws/for-page/project-upload-data-upload-submit-from-submit-pgm";

	///////////////////////

	//  Gold Standard - Import

	public static final String PROJECT__GOLD_STANDARD_IMPORT_UPLOAD_FILE_REST_WEBSERVICE_CONTROLLER =
			"d/rws/for-page/project-gold-standard-import-upload-file";

	///////////////////////

	//  Feature Detection - Import

	public static final String PROJECT__FEATURE_DETECTION_IMPORT_INITIALIZE_REST_WEBSERVICE_CONTROLLER =
			"d/rws/for-page/project-feature-detection-import-initialize";

	public static final String PROJECT__FEATURE_DETECTION_IMPORT_UPLOAD_FILE_REST_WEBSERVICE_CONTROLLER =
			"d/rws/for-page/project-feature-detection-import-upload-file";

	public static final String PROJECT__FEATURE_DETECTION_IMPORT_SUBMIT_REST_WEBSERVICE_CONTROLLER =
			"d/rws/for-page/project-feature-detection-import-submit";

	//  Feature Detection - Run and Import

	public static final String PROJECT__FEATURE_DETECTION_RUN_AND_IMPORT_INITIALIZE_REST_WEBSERVICE_CONTROLLER =
			"d/rws/for-page/project-feature-detection-run-and-import-initialize";

	public static final String PROJECT__FEATURE_DETECTION_RUN_AND_IMPORT_UPLOAD_FILE_REST_WEBSERVICE_CONTROLLER =
			"d/rws/for-page/project-feature-detection-run-and-import-upload-file";

	public static final String PROJECT__FEATURE_DETECTION_RUN_AND_IMPORT_SUBMIT_REST_WEBSERVICE_CONTROLLER =
			"d/rws/for-page/project-feature-detection-run-and-import-submit";

	///////////////////////
	
	//   Feature Detection (Scan File) - Display Label - Description - Change

	public static final String FEATURE_DETECTION_DISPLAY_LABEL_DESCRIPTION_CHANGE_REST_WEBSERVICE_CONTROLLER =
			"d/rws/for-page/feature-detection-display-label-description-change";

	//   Gold Standard (Scan File) - Display Label - Description - Change

	public static final String GOLD_STANDARD_DISPLAY_LABEL_DESCRIPTION_CHANGE_REST_WEBSERVICE_CONTROLLER =
			"d/rws/for-page/gold-standard-display-label-description-change";

	///////////////////////
	
	//   Label for Project - for Short URL

	public static final String PROJECT_LABEL_GET_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/project-label-get";
	public static final String PROJECT_LABEL_ADD_CHANGE_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/project-label-add-change";
	
	///////////////////////
	
	//  Scan Files in a Project
	
	public static final String PROJECT_SCAN_FILE_IN_PROJECT__DELETE_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/scan-file-in-project-delete";

	public static final String PROJECT_SCAN_FILES__PROJECT_CONTAIN_ANY_SCAN_FILES_REST_WEBSERVICE_CONTROLLER =
			"d/rws/for-page/project-scan-files--project-contain-any-scan-files";
	
	public static final String PROJECT_SCAN_FILES_IN_PROJECT_LIST_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/scan-files-in-project-list";

	//  Scan File Details for Single Scan File - Data associated with this Project
	
	public static final String PROJECT_SCAN_FILE_DETAILS_FOR_PROJECT_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/scan-file-details-for-project";


	//  Scan File Feature Detection Root Mapping Entry - Delete
	
	public static final String PROJECT_SCAN_FILE_FEATURE_DETECTION_ROOT_MAPPING_ENTRY_DELETE_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/scan-file-feature-detection-root-mapping-entry-delete";

	//  Scan File Gold Standard Root Mapping Entry - Delete
	
	public static final String PROJECT_SCAN_FILE_GOLD_STANDARD_ROOT_MAPPING_ENTRY_DELETE_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/scan-file-gold-standard-root-mapping-entry-delete";
	
	//  Get Spectra Storage Data (Spectr) but NO Peaks for a project scan file id
	public static final String SPECTRAL_STORAGE_DATA__NO_PEAKS__PROJECT_SCAN_FILE_ID =
			"d/rws/for-page/ptsb/spectral-storage-data--no-peaks--project-scan-file-id";

//  Get Spectra Storage Data (Spectr) Scan Data With Peaks  for a project scan file id AND scan number
	public static final String SPECTRAL_STORAGE_SCAN_SPECTRUM_FOR_PROJECT_SCAN_FILE_ID_SCAN_NUMBER_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/psb/spectral-storage-scan-spectrum-for-project-scan-file-id-scan-number";

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

	public static final String PROJECT_VIEW_PAGE_SEARCH_LIST_V2_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/project-view-page-search-list-v2";  //  added "-v2" as part of 4.0 release
	
	//        Project_HasAtLeastOneActive_ProjectSearchId_RestWebserviceController
	public static final String PROJECT_HAS_AT_LEAST_ONE_ACTIVE_SEARCH_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/project-has-at-least-one-active-search";
	
	//   Organize Searches for Project

	public static final String PROJECT_ORGANIZE_SEARCHES_GET_DATA_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/project-organize-searches-get-data";

	public static final String PROJECT_ORGANIZE_SEARCHES_ADD_FOLDER_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/project-organize-searches-add-folder";

	public static final String PROJECT_ORGANIZE_SEARCHES_SET_SEARCHES_ORDER_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/project-organize-searches-set-searches-order";

	public static final String PROJECT_ORGANIZE_SEARCHES_SET_SEARCHES_ORDER_IN_FOLDER_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/project-organize-searches-set-searches-order-in-folder";

	public static final String PROJECT_ORGANIZE_SEARCHES_SET_FOLDERS_ORDER_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/project-organize-searches-set-folders-order";

	public static final String PROJECT_ORGANIZE_SEARCHES_FOLDER_UPDATE_TO_NEW_SEARCHES_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/project-organize-searches-folder-update-to-new-searches";

	public static final String PROJECT_ORGANIZE_SEARCHES_FOLDER_RENAME_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/project-organize-searches-folder-rename";

	public static final String PROJECT_ORGANIZE_SEARCHES_FOLDER_DELETE_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/project-organize-searches-folder-delete";


	//   Project Search Ids, Which Experiments contain them

	public static final String LIST_EXPERIMENTS_CONTAINING_PROJECT_SEARCH_IDS_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/list-experiments-containing-project-search-ids";

	
	//   Project Search Id, Copy/Move to New Project

	public static final String LIST_OTHER_PROJECTS_EXCLUDING_PROJ_SEARCH_IDS_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/list-other-projects-excluding-project-search-ids";

	public static final String LIST_PROJECT_SEARCH_IDS_WHERE_ASSOC_SEARCH_IDS_ALREADY_IN_PROJECT_REST_WEBSERVICE_CONTROLLER =
			"d/rws/for-page/list-project-search-ids-where-assoc-search-ids-already-in-project";

	public static final String COPY_OR_MOVE_PROJECT_SEARCH_IDS_TO_NEW_PROJECT_REST_WEBSERVICE_CONTROLLER =
			"d/rws/for-page/copy-or-move-project-search-ids-to-new-project";
	
	////
	
	//   Project Level Filter Default Cutoffs Override ( Override Cutoffs Default at Search level )
	

	public static final String PROJECT_LEVEL_FILTER_DEFAULT_CUTOFFS_OVERRIDE_MAINT__GET__REST_WEBSERVICE_CONTROLLER =
			"d/rws/for-page/project-level-filter-default-cutoffs-override-maint--get";
	
	public static final String PROJECT_LEVEL_FILTER_DEFAULT_CUTOFFS_OVERRIDE_MAINT__SAVE__REST_WEBSERVICE_CONTROLLER =
			"d/rws/for-page/project-level-filter-default-cutoffs-override_MAINT--save";
	
	////////////
	
	//   Project Search Id driven Update DB
	
	public static final String SEARCH_NAME_SEARCH_SHORT_NAME_UPDATE_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/search-name-search-short-name-update";

	//   Project Search Id driven Delete DB
	public static final String DELETE_PROJECT_SEARCH_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/delete-project-search";
	

	//  SubGroup Update User Updatable Data for Project Search Id
	public static final String SUB_GROUPS_UPDATE_USER_UPDATABLE_DATA_SINGLE_PROJECT_SEARCH_ID =
			"d/rws/for-page/psb/sub-groups-update-user-updatable-data-single-project-search-id";


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

	//    Shared Page (Shortened URL for Current View of a Project Search Id based page [peptide,protein,...])
	
	//   Insert Shared Page

	public static final String INSERT_SHARED_PAGE_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/psb/insert-shared-page";

	//    Save Default View for Project Search Id based pages (Save Current View of a Project Search Id based page [peptide,protein,...])
	
	//   Save Default View for Project Search Id based pages

	public static final String SAVE_DEFAULT_VIEW_PROJECT_SEARCH_BASED_PAGE_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/psb/save-default-view-project-search-based-page";
	
	
	//    Save View (Save Current View of a Project Search Id based page [peptide,protein,...])
	
	//   Insert Saved View

	public static final String INSERT_SAVED_VIEW_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/psb/insert-saved-view";
	

	////////////
	
	//   Experiment driven pages

	public static final String LIST_EXPERIMENT_REST_WEBSERVICE_CONTROLLER = // Non Draft 
			"d/rws/for-page/experiment/experiment-list";
	
	public static final String LIST_DRAFTS_EXPERIMENT_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/experiment/experiment-list-drafts";

	public static final String ADD_SAVE_EXPERIMENT_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/experiment/add-save-experiment";

	public static final String EXPERIMENT_GET_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/experiment/experiment-get";
	
	public static final String DELETE_EXPERIMENT_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/experiment/experiment-delete";

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

	//  !!  NOT currently used
	
	//  Search SubGroups at Search Level for Project Search Id
//	public static final String SEARCH_SUB_GROUPS_SEARCH_LEVEL_SINGLE_PROJECT_SEARCH_ID =
//			"d/rws/for-page/psb/search-sub-groups-search-level-single-project-search-id";

	//  Search Scan File Data for Project Search Id
	public static final String GET_SEARCH_SCAN_FILE_DATA_FOR_PROJECT_SEARCH_ID_LIST_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/psb/get-search-scan-file-data-for-project-search-id-list";
	

	public static final String SEARCH_TAGS_GET_FOR_PROJECT_SEARCH_ID_LIST_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/search-tags-get-for-project-search-id-list";


	//  Used by "Tag Search"
	
	public static final String SEARCH_TAGS_GET_FOR_PROJECT_SEARCH_ID_AND_ALL_DISTINCT_FOR_ASSOC_PROJECT_ID_LIST_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/search-tags-get-for-project-search-id-list-and-all-distinct-for-assoc-project-id";

	/**
	 *   @deprecated
	 *   
	 *   !!!   NO LONGER USED  !!!
	 */
//	public static final String SEARCH_TAGS_UPDATE_FOR_PROJECT_SEARCH_ID_LIST_REST_WEBSERVICE_CONTROLLER = 
//			"d/rws/for-page/search-tags-update-for-project-search-id-list";

	
	
	public static final String SEARCH_TAGS_ADD_TAG_TO_PROJECT_SEARCH_ID_LIST_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/search-tags-add-tag-to-project-search-id-list";

	public static final String SEARCH_TAGS_REMOVE_TAG_FROM_PROJECT_SEARCH_ID_LIST_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/search-tags-remove-tag-from-project-search-id-list";



	//  Used by "Manage Project Tags"

	//  Search Tag Categories
	
	

	public static final String SEARCH_TAG_CATEGORIES_GET_FOR_PROJECT_ID_OR_PROJECT_ID_FROM_PROJECT_SEARCH_IDS_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/search-tag-categories-get-for-project-id-or-project-id-from-project-search-ids";

	public static final String SEARCH_TAGS_ADD_SINGLE_SEARCH_TAG_CATEGORY_FOR_PROJECT_ID_OR_PROJECT_SEARCH_ID_LIST_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/search-tags-add-single-search-tag-category-for-project-id-or-project-search-id-list";

	public static final String SEARCH_TAG_CATEGORIES_UPDATE_SINGLE_SEARCH_TAG_CATEGORY_FOR_TAG_CATEGORY_ID_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/search-tag-categories-update-single-search-tag-category-for-tag-category-id";
	
	public static final String SEARCH_TAG_CATEGORIES_DELETE_SINGLE_SEARCH_TAG_CATEGORY_FOR_TAG_CATEGORY_ID_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/search-tag-categories-delete-single-search-tag-category-for-tag-category-id";
	
	//  Search Tags
	
	public static final String SEARCH_TAGS_GET_FOR_PROJECT_ID_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/search-tags-get-for-project-id";

	public static final String SEARCH_TAGS_ADD_SINGLE_SEARCH_TAG_FOR_PROJECT_ID_OR_PROJECT_SEARCH_ID_LIST_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/search-tags-add-single-search-tag-for-project-id-or-project-search-id-list";

	public static final String SEARCH_TAGS_UPDATE_SINGLE_SEARCH_TAG_FOR_TAG_ID_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/search-tags-update-single-search-tag-for-tag-id";
	
	public static final String SEARCH_TAGS_DELETE_SINGLE_SEARCH_TAG_FOR_TAG_ID_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/search-tags-delete-single-search-tag-for-tag-id";
	
	

	//  Scan File Gold Standard Root Entries AND Assoc Search Scan File Data for Project Search Id
	
	public static final String SCAN_FILE_GOLD_STANDARD_ROOT_ANY_ENTRIES_EXIST_SINGLE_PROJECT_SEARCH_ID = "d/rws/for-page/scan-file-gold-standard-root-any-entries-exist-single-project-search-id";

	//  Scan File Gold Standard Root Entries AND Assoc Search Scan File Data for Project Search Id
	
	public static final String SCAN_FILE_GOLD_STANDARD_ROOT_ENTRIES_ROOT_SINGLE_PROJECT_SEARCH_ID = "d/rws/for-page/scan-file-gold-standard-root-entries-single-project-search-id";

	//  Scan File Gold Standard Root File Contents for Mapping Id
	
	public static final String SCAN_FILE_GOLD_STANDARD_ROOT_FILE_CONTENTS_FOR_MAPPING_ID = "d/rws/for-page/scan-file-gold-standard-root-file-contents-for-id";
	

	//  Scan File Feature Detection Root Entries AND Assoc Search Scan File Data for Project Search Id
	
	public static final String SCAN_FILE_FEATURE_DETECTION_ROOT_ENTRIES_ROOT_SINGLE_PROJECT_SEARCH_ID = "d/rws/for-page/scan-file-feature-detection-root-entries-single-project-search-id";
	
	//  Scan File Feature Detection Singular Feature Entries for Project Search Id and feature_detection_root__project_scnfl_mapping_tbl__id  
	
	public static final String SCAN_FILE_FEATURE_DETECTION_SINGULAR_FEATURE_ENTRIES_SINGLE_PROJECT_SEARCH_ID__REST_WEBSERVICE_CONTROLLER_VERSION_0003 =
			"d/rws/for-page/scan-file-feature-detection-singular-feature-entries-single-project-search-id-feature-detection-root-prj-scnfl-mapping-tbl-id-version-0003";

	public static final String SCAN_FILE_FEATURE_DETECTION_SINGULAR_FEATURE_ENTRIES_MIN_MAX_ID_SINGLE_PROJECT_SEARCH_ID__REST_WEBSERVICE_CONTROLLER_VERSION_0001 =
			"d/rws/for-page/scan-file-feature-detection-singular-feature-entries-min-max-id--single-project-search-id-feature-detection-root-prj-scnfl-mapping-tbl-id-version-0001";

	//  Scan File Feature Detection Persistent Feature Entries for Project Search Id and FeatureDetection Root Id
	
	public static final String SCAN_FILE_FEATURE_DETECTION_PERSISTENT_FEATURE_ENTRIES_SINGLE_PROJECT_SEARCH_ID__REST_WEBSERVICE_CONTROLLER_VERSION_0001 =
			"d/rws/for-page/scan-file-feature-detection-persistent-feature-entries-single-project-search-id-feature-detection-root-prj-scnfl-mapping-tbl-id-version-0001";

	//  Scan File Feature Detection Map Persistent To Singular Feature Entries for Project Search Id and FeatureDetection Root Id
	
	public static final String SCAN_FILE_FEATURE_DETECTION_MAP_PERSISTENT_TO_SINGULAR_FEATURE_ENTRIES_COUNT_SINGLE_PROJECT_SEARCH_ID__REST_WEBSERVICE_CONTROLLER_VERSION_0002 =
			"d/rws/for-page/scan-file-feature-detection-map-persistent-to-singular-feature-entries-count--single-project-search-id-feature-detection-root-prj-scnfl-mapping-tbl-id-version-0001";

	public static final String SCAN_FILE_FEATURE_DETECTION_MAP_PERSISTENT_TO_SINGULAR_FEATURE_ENTRIES_SINGLE_PROJECT_SEARCH_ID__REST_WEBSERVICE_CONTROLLER_VERSION_0003 =
			"d/rws/for-page/scan-file-feature-detection-map-persistent-to-singular-feature-entries-single-project-search-id-feature-detection-root-prj-scnfl-mapping-tbl-id-version-0003";
	
	//  Static Mods for Project Search Id
	public static final String STATIC_MODS_SINGLE_PROJECT_SEARCH_ID =
			"d/rws/for-page/psb/static-mods-single-project-search-id";

	//  Reporter Ions - Unique Masses for this Search - for Project Search Id
	public static final String REPORTER_ION_MASSES_UNIQUE_SEARCH_LEVEL_SINGLE_PROJECT_SEARCH_ID =
			"d/rws/for-page/psb/reporter-ion-masses-unique-search-level-single-project-search-id";

	//  Get Summary Data for Single Scan File from Spectra Storage Data (Spectr) but NO Peaks for a search scan file id and project search id
	public static final String SCAN_FILE_SUMMARY_DATA_FROM_SPECTRAL_STORAGE_DATA__SEARCH_SCAN_FILE_ID_SINGLE_PROJECT_SEARCH_ID =
			"d/rws/for-page/psb/scan-file-summary-data-from-spectral-storage-data--search-scan-file-id-single-project-search-id";

	//  Get Peak Intensity Binned On RT MZ JSON for Single Scan File from Spectra Storage Data (Spectr) but NO Peaks for a search scan file id and project search id
	public static final String SCAN_FILE_PEAK_INTENSITY_BINNED_ON_RT_MZ_JSON_FROM_SPECTRAL_STORAGE_DATA__SEARCH_SCAN_FILE_ID_SINGLE_PROJECT_SEARCH_ID =
			"d/rws/for-page/psb/scan-file-peak-intensity-binned-on-rt-mz-json-from-spectral-storage-data--search-scan-file-id-single-project-search-id";
	
	
	//  Get Spectra Storage Data (Spectr) but NO Peaks for a project search id
	public static final String SPECTRAL_STORAGE_DATA__NO_PEAKS__SINGLE_PROJECT_SEARCH_ID =
			"d/rws/for-page/psb/spectral-storage-data--no-peaks--single-project-search-id";
	
	//  Used across various pages beyond just Reported Peptides Page
	//    Pass in Project Search Id and Cutoff Criteria
	//    Returns Reported Peptide Ids and in some cases the Number of PSMs
	//     Not currently used for Reported Peptides Page, PEPTIDE_VIEW_PAGE_PEPTIDE_LIST_SINGLE_PROJECT_SEARCH_ID_REST_WEBSERVICE_CONTROLLER used instead there
	public static final String REPORTED_PEPTIDE_LIST_REPORTED_PEPTIDE_IDS_SINGLE_PROJECT_SEARCH_ID_REST_WEBSERVICE_CONTROLLER_VERSION_0001 = 
			"d/rws/for-page/psb/reported-peptide-id-list-for-search-criteria-single-project-search-id-version-0001";

	//  Search SubGroups at Reported Peptide Level for Project Search Id, Reported Peptide Ids
	public static final String SEARCH_SUB_GROUPS_REPORTED_PEPTIDE_LEVEL_SINGLE_PROJECT_SEARCH_ID =
			"d/rws/for-page/psb/search-sub-groups-reported-peptide-level-single-project-search-id";

	//  Reported Peptide Filterable Annotation data for Reported Peptide Ids, Annotation Type Ids, Project Search Id
	public static final String REPORTED_PEPTIDE_FILTRBL_ANN_DATA_LIST_REP_PEPT_IDS_ANN_TYPE_IDS_SINGLE_PROJECT_SEARCH_ID =
			"d/rws/for-page/psb/reported-peptide-filtrbl-ann-data-list-rep-pept-ids-ann-type-ids-single-project-search-id";

	//  Reported Peptide Descriptive Annotation data for Reported Peptide Ids, Annotation Type Ids, Project Search Id
	public static final String REPORTED_PEPTIDE_DESCRIPTIVE_ANN_DATA_LIST_REP_PEPT_IDS_ANN_TYPE_IDS_SINGLE_PROJECT_SEARCH_ID =
			"d/rws/for-page/psb/reported-peptide-descriptive-ann-data-list-rep-pept-ids-ann-type-ids-single-project-search-id";

	//  PSM Info
	
	public static final String PSM_COUNT_PER_REPORTED_PEPTIDE_ID_FOR_REP_PEPT_IDS_SEARCHCRITERIA_SINGLE_PROJECT_SEARCH_ID_REST_WEBSERVICE_CONTROLLER_VERSION_0001 = 
			"d/rws/for-page/psb/psm-count-per-reported-peptide-id-for-rep-pept-ids-searchcriteria-single-project-search-id-version-0001";

	public static final String PSM_COUNT_PER_REPORTED_PEPTIDE_ID__SUB_SEARCH_GROUP__FOR_REP_PEPT_IDS_SUB_SEARCH_GROUPS_SEARCHCRITERIA_SINGLE_PROJECT_SEARCH_ID_REST_WEBSERVICE_CONTROLLER_VERSION_0001 = 
			"d/rws/for-page/psb/psm-count-per-reported-peptide-id-sub-search-group-id-for-rep-pept-ids-searchcriteria-single-project-search-id-version-0001";

	/**
	 * Retrieve Sub Search Group Id, PSM Id for Project Search ID - NOT Filtered on Main Filter Criteria or Reported Peptide Ids
	 * 
	 */
	public static final String SUB_SEARCH_GROUP_ID_PSM_ID__NOT_FILTERED__FOR_SINGLE_PROJECT_SEARCH_ID_REST_WEBSERVICE_CONTROLLER_VERSION_0002 = 
			"d/rws/for-page/psb/search-sub-search-group-id_psm-id__not-filtered_for-single-project-search-id-version-0002";

	/**
	 * Retrieve Sub Search Group Id, PSM Id, Reported Peptide Id for Reported Peptide Ids, Project Search ID, and Search Criteria
	 * 
	 */
	public static final String SUB_SEARCH_GROUP_ID_PSM_ID_REPORTED_PEPTIDE_ID____FOR_REP_PEPT_IDS_SUB_SEARCH_GROUPS_SEARCHCRITERIA_SINGLE_PROJECT_SEARCH_ID_REST_WEBSERVICE_CONTROLLER_VERSION_0001 = 
			"d/rws/for-page/psb/search-sub-search-group-id_psm-id_reported-peptide-id-for-rep-pept-ids-searchcriteria-single-project-search-id-version-0001";

	public static final String PSM_IDS_PER_REPORTED_PEPTIDE_ID_FOR_REP_PEPT_IDS_SEARCHCRITERIA_SINGLE_PROJECT_SEARCH_ID_REST_WEBSERVICE_CONTROLLER_VERSION_0001 = 
			"d/rws/for-page/psb/psm-ids-per-reported-peptide-id-for-rep-pept-ids-searchcriteria-single-project-search-id-version-0001";

	public static final String PSM_INFO_PER_REPORTED_PEPTIDE_ID_FOR_SEARCHCRITERIA_SINGLE_PROJECT_SEARCH_ID_REST_WEBSERVICE_CONTROLLER_VERSION_0001 = 
			"d/rws/for-page/psb/psm-info-per-reported-peptide-id-for-searchcriteria-single-project-search-id-version-0001";

	public static final String PSM_TABLE_DATA_PER_REPORTED_PEPTIDE_ID_FOR_SEARCHCRITERIA_SINGLE_PROJECT_SEARCH_ID_REST_WEBSERVICE_CONTROLLER_VERSION_0001 = 
			"d/rws/for-page/psb/psm-table-data-per-reported-peptide-id-for-searchcriteria-single-project-search-id-version-0001";

	public static final String PSM_TABLE_DATA_UNFILTERED_FOR_SINGLE_PROJECT_SEARCH_ID_REST_WEBSERVICE_CONTROLLER_VERSION_0002 = 
			"d/rws/for-page/psb/psm-table-data-unfiltered-for-single-project-search-id-version-0002";

	public static final String PSM_FILTERABLE_ANNOTATION_DATA_PER_REPORTED_PEPTIDE_ID_FOR_SEARCHCRITERIA_SINGLE_PROJECT_SEARCH_ID_REST_WEBSERVICE_CONTROLLER_VERSION_0001 = 
			"d/rws/for-page/psb/psm-filterable-annotation-data-per-reported-peptide-id-for-searchcriteria-single-project-search-id-version-0001";

	public static final String PSM_FILTERABLE_ANNOTATION_DATA_NO_FILTERING_SINGLE_PROJECT_SEARCH_ID_REST_WEBSERVICE_CONTROLLER_VERSION_0002 = 
			"d/rws/for-page/psb/psm-filterable-annotation-data--no-filtering--single-project-search-id-version-0002";

	public static final String PSM_PPM_ERROR_DATA_PER_REPORTED_PEPTIDE_ID_FOR_SEARCHCRITERIA_SINGLE_PROJECT_SEARCH_ID_REST_WEBSERVICE_CONTROLLER_VERSION_0001 = 
			"d/rws/for-page/psb/psm-ppm-error-data-per-reported-peptide-id-for-searchcriteria-single-project-search-id-version-0001";

	public static final String PSM_REPORTER_ION_MASSES_PER_REPORTED_PEPTIDE_ID_FOR_REP_PEPT_IDS_SEARCHCRITERIA_SINGLE_PROJECT_SEARCH_ID_REST_WEBSERVICE_CONTROLLER_VERSION_0001 = 
			"d/rws/for-page/psb/psm-reporter-ion-masses-per-reported-peptide-id-for-rep-pept-ids-searchcriteria-single-project-search-id-version-0001";

	public static final String PSM_OPEN_MODIFICATION_MASSES_PER_REPORTED_PEPTIDE_ID_FOR_REP_PEPT_IDS_SEARCHCRITERIA_SINGLE_PROJECT_SEARCH_ID_REST_WEBSERVICE_CONTROLLER_VERSION_0002 = 
			"d/rws/for-page/psb/psm-open-modification-masses-per-reported-peptide-id-for-rep-pept-ids-searchcriteria-single-project-search-id-version-0002";

	public static final String PSM_VARIABLE_DYNAMIC_MODIFICATION_MASSES_PER_REPORTED_PEPTIDE_ID_FOR_REP_PEPT_IDS_SEARCHCRITERIA_SINGLE_PROJECT_SEARCH_ID_REST_WEBSERVICE_CONTROLLER_VERSION_0001 = 
			"d/rws/for-page/psb/psm-variable-dynamic-modification-masses-per-reported-peptide-id-for-rep-pept-ids-searchcriteria-single-project-search-id-version-0001";

	public static final String PSM_LIST_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/psb/psm-list";

	public static final String SCAN_NUMBERS_FOR_MS_1_SCANS_PROJECT_SEARCH_ID_SEARCH_SCAN_FILE_ID_RETENTION_TIME_RANGE_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/psb/scan-numbers-for-ms-1-scans-project-search-id-search-scan-file-id-retention-time-range";

	public static final String SCAN_DATA_WITH_PEAKS_FOR_SCAN_NUMBERS_PROJECT_SEARCH_ID_SEARCH_SCAN_FILE_ID_M_OVER_Z_RANGES_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/psb/scan-data-with-peaks-for-scan-numbers-project-search-id-search-scan-file-id-m-over-z-ranges";

	public static final String SCAN_DATA_NO_PEAKS_FOR_SCAN_NUMBERS_PROJECT_SEARCH_ID_SEARCH_SCAN_FILE_ID_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/psb/scan-data-no-peaks-for-scan-numbers-project-search-id-search-scan-file-id";
	
	public static final String SPECTRUM_FOR_PSM_ID_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/psb/spectrum-for-psm-id";

	public static final String PSM_PEPTIDE_LIST_DISPLAY_WITH_SPECTRUM_VIEWER_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/psb/psm-peptide-list-display-with-spectrum-viewer";
	
	public static final String PSM_COUNT_SEARCHCRITERIA_REST_WEBSERVICE_CONTROLLER_VERSION_0001 = "d/rws/for-page/psb/psm-count-searchcriteria-version-0001";

	public static final String SCAN_COUNT_SEARCHCRITERIA_REST_WEBSERVICE_CONTROLLER_VERSION_0001 = "d/rws/for-page/psb/scan-count-searchcriteria-version-0001";

	public static final String PEPTIDE_IDS_FOR_REPORTED_PEPTIDES_ID_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/psb/peptide-ids-for-reported-peptide-ids";

	public static final String PEPTIDE_SEQUENCE_STRINGS_FOR_REPORTED_PEPTIDES_ID_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/psb/peptide-sequences-for-reported-peptide-ids";

	public static final String REPORTED_PEPTIDE_STRINGS_FOR_REPORTED_PEPTIDES_ID_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/psb/reported-peptide-strings-for-reported-peptide-ids";

	public static final String PROTEIN_SEQUENCE_VERSION_IDS_FOR_REPORTED_PEPTIDE_IDS_PROJECT_SEARCH_ID_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/psb/protein-sequence-version-ids-for-reported-peptide-ids";

	public static final String PROTEIN_INFO_PROTEIN_SEQUENCE_VERSION_IDS_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/psb/protein-info-prot-seq-v-ids-list";

	public static final String PROTEIN_INFO_SEARCHCRITERIA_REST_WEBSERVICE_CONTROLLER_VERSION_0001 = "d/rws/for-page/psb/protein-info-searchcriteria-list-version-0001";

	public static final String PROTEIN_SEQUENCES_FOR_PROT_SEQ_VER_ID_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/psb/protein-sequences-for-prot-seq-ver-ids";


	//  Protein Sequence Version Ids for each Reported Peptide Id in request
	public static final String PROTEIN_SEQ_V_ID_LIST_PER_REPORTED_PEPTIDE_ID_SINGLE_PROJECT_SEARCH_ID_REST_WEBSERVICE_CONTROLLER_VERSION_0001 = 
			"d/rws/for-page/psb/protein-seq-version-id-list-for-reported-peptide-ids-single-project-search-id-version-0001";

	//  Protein Sequence Coverage for each Reported Peptide Id in request
	public static final String PROTEIN_COVERAGE_PER_REPORTED_PEPTIDE_ID_FOR_REP_PEPT_IDS_SINGLE_PROJECT_SEARCH_ID_REST_WEBSERVICE_CONTROLLER_VERSION_0002 = 
			"d/rws/for-page/psb/protein-coverage-per-reported-peptide-id-for-rep-pept-ids-single-project-search-id-version-0002";

	//  !! SPECIAL !!  for MOD PAGE Mod Data Per Rounded Mod Masses in request
	public static final String MOD_PAGE_SPECIAL__GET_MOD_INFO_FOR_Rounded_MOD_MASSES_CUTOFFS_SINGLE_PROJECT_SEARCH_ID__REST_WEBSERVICE_CONTROLLER_VERSION_0001 = 
			"d/rws/for-page/psb/mod-page-special-get-mod-info-per-rounded-mod-masses-cutoffs-single-project-search-id-version-0001";

	//  !! SPECIAL !!  for MOD PAGE Open Mod Data All PSMs for cutoffs in request
	public static final String MOD_PAGE_SPECIAL__GET_OPEN_MOD_INFO_FOR_CUTOFFS_SINGLE_PROJECT_SEARCH_ID__REST_WEBSERVICE_CONTROLLER_VERSION_0001 = 
			"d/rws/for-page/psb/mod-page-special-get-open-mod-info-for-cutoffs-single-project-search-id-version-0001";

	//  !! SPECIAL !!  for MOD PAGE Mod Data Per Scans in request
	public static final String MOD_PAGE_SPECIAL__GET_MODS_FOR_SCANS_SINGLE_PROJECT_SEARCH_ID__REST_WEBSERVICE_CONTROLLER_VERSION_0001 = 
			"d/rws/for-page/psb/mod-page-special-get-mods-per-scans-single-project-search-id-version-0001";

	//  !! SPECIAL !!  for MOD PAGE Mod Data Per PSMs in request
	public static final String MOD_PAGE_SPECIAL__GET_MODS_FOR_PSMS_SINGLE_PROJECT_SEARCH_ID__REST_WEBSERVICE_CONTROLLER_VERSION_0001 = 
			"d/rws/for-page/psb/mod-page-special-get-mods-per-psms-single-project-search-id-version-0001";

	//  !! SPECIAL !!  for MOD PAGE  Protein Positions and Varible Mod Positions in request
	public static final String MOD_PAGE_SPECIAL__PROTEIN_POSITIONS_VAR_MODS_FOR_REPORTED_PEPTIDES_SINGLE_PROJECT_SEARCH_ID__REST_WEBSERVICE_CONTROLLER_VERSION_0001 = 
			"d/rws/for-page/psb/mod-page-special-protein-positions-var-mods-per-reported-peptide-single-project-search-id-version-0001";

	
	//  Reported Peptide Modifications for each Reported Peptide Id in request
	public static final String DYNAMIC_MODIFICATIONS_PER_REPORTED_PEPTIDE_ID_FOR_REP_PEPT_IDS_SINGLE_PROJECT_SEARCH_ID_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/psb/dynamic-modifications-per-reported-peptide-id-for-rep-pept-ids-single-project-search-id";

	//  Reported Peptide Open Modifications for each Reported Peptide Id in request
	public static final String OPEN_MODIFICATIONS_PER_REPORTED_PEPTIDE_ID_FOR_REP_PEPT_IDS_SINGLE_PROJECT_SEARCH_ID_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/psb/open-modifications-per-reported-peptide-id-for-rep-pept-ids-single-project-search-id";

	
	///////////////////////
	
	//  Blib Spectral Library for download
	

	public static final String BLIB_SPECTRAL_LIBRARY_DOWNLOAD__REQUEST_CREATION__REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/psb/blib-spectral-library-download--request-creation";

	public static final String BLIB_SPECTRAL_LIBRARY_DOWNLOAD__GET_CREATION_STATUS__REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/psb/blib-spectral-library-download--get-creation-status";

	public static final String BLIB_SPECTRAL_LIBRARY_DOWNLOAD__CANCEL_CREATION__REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/psb/blib-spectral-library-download--cancel-creation";

	
	
	//////////////////////
	
	

	//    used on many pages 
	
	//  Also returns Search Sub Groups at Search level if applicable
	public static final String SEARCH_NAME_LIST_FROM_PROJECT_SEARCH_IDS_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/psb/search-name-list-from-psi";

	public static final String SEARCH_PROGRAMS_PER_SEARCH_LIST_FROM_PROJECT_SEARCH_IDS_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/psb/search-programs-per-search-list-from-psi";

	public static final String SEARCH_ANNOTATION_TYPE_LIST_FROM_PROJECT_SEARCH_IDS_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/psb/search-annotation-type-list-from-psi";

	public static final String SEARCH_FLAGS_FROM_PROJECT_SEARCH_IDS_REST_WEBSERVICE_CONTROLLER = "d/rws/for-page/psb/search-flags-list-from-psi";

	//  General Search Info
	public static final String SEARCH_INFO_LIST_FROM_PROJECT_SEARCH_IDS_REST_WEBSERVICE_CONTROLLER = 
			"d/rws/for-page/psb/search-info-list-from-psi";

	//  FASTA File Statistics for Project Search Ids list
	public static final String FASTA_FILE_STATISTICS_PROJECT_SEARCH_ID_LIST =
			"d/rws/for-page/psb/fasta-file-statistics-project-search-id-list";

	

	//  Scan with Peaks Max Return Count: Access Control: Project Search Id
	public static final String SCAN_WITH_PEAKS_MAX_RETURN_COUNT_ACCESS_CONTROL_PROJECT_SEARCH_ID_REST_WEBSERVICE_CONTROLLER =
			"d/rws/for-page/psb/scan-with-peaks-max-return-count-ac-project-search-id";

}
