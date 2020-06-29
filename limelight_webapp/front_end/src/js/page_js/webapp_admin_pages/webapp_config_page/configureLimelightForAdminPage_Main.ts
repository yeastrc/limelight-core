/**
 * configureLimelightForAdminPage_Main.ts
 * 
 * Javascript for webappAdminConfiguration.jsp page  
 * 
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';
import { showErrorMsg } from 'page_js/showHideErrorMessage';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';


/////////////////
const getListConfiguration = function() {
	
	const requestData = {};
	const url = "admin/rws/for-page/config-get-current";

	const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url }) ;

	const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

	promise_webserviceCallStandardPost.catch( () => { throw Error("Webservice call fail. url: " + url ) }  );

	promise_webserviceCallStandardPost.then( ({ responseData }) => {
		try {
			getListConfigurationResponse(requestData, responseData);
		} catch( e ) {
			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
			throw e;
		}
	} );
};

///////
const getListConfigurationResponse = function(requestData, responseData) {
	
	var configList = responseData.configList;
	//  Process text inputs
	var $config_text_inputs_jq = $(".config_text_inputs_jq");
	$config_text_inputs_jq.each( function( index, element ) {
		var $configTextInput = $( this );
		var configKeyForInput = $configTextInput.attr("data-config-key");
//		var foundConfigValueForField = false;
		for ( var configListIndex = 0; configListIndex < configList.length; configListIndex++ ) {
			var configListItem = configList[ configListIndex ];
			if ( configListItem.configKey === configKeyForInput ) {
				$configTextInput.val( configListItem.configValue );
//				foundConfigValueForField = true;
			}
		}
	} );
	//  Process checkbox inputs
	var $config_checkbox_inputs_jq = $(".config_checkbox_inputs_jq");
	$config_checkbox_inputs_jq.each( function( index, element ) {
		var $configCheckboxInput = $( this );
		var configKeyForInput = $configCheckboxInput.attr("data-config-key");
//		var foundConfigValueForField = false;
		for ( var configListIndex = 0; configListIndex < configList.length; configListIndex++ ) {
			var configListItem = configList[ configListIndex ];
			if ( configListItem.configKey === configKeyForInput ) {
				var dataValueChecked = $configCheckboxInput.attr("data-value-checked");
//				var dataValueNOTChecked = $configCheckboxInput.attr("data-value-not-checked");
				if ( configListItem.configValue === dataValueChecked ) {
					$configCheckboxInput.prop( "checked", true );
				} else {
					$configCheckboxInput.prop( "checked", false );
				}
//				foundConfigValueForField = true;
			}
		}
	} );
};

const saveListConfiguration = function() {
	
	var configList = [];
	var input_footer_center_of_page_html_Val = null;
	
	var $allow_scan_file_upload_checkbox = $("#allow_scan_file_upload_checkbox");
	var allow_scan_file_upload_checkboxChecked = $allow_scan_file_upload_checkbox.prop( "checked" );
	
	var $spectral_storage_service_accept_import_base_url_input_field = $("#spectral_storage_service_accept_import_base_url_input_field");
	var spectral_storage_service_accept_import_base_url_input_fieldValue = $spectral_storage_service_accept_import_base_url_input_field.val();

	var $spectral_storage_service_get_data_base_url_input_field = $("#spectral_storage_service_get_data_base_url_input_field");
	var spectral_storage_service_get_data_base_url_input_fieldValue = $spectral_storage_service_get_data_base_url_input_field.val();

	//  Validate that if one Spectral Storage URL is populated, they both are populated
	
	if ( ( spectral_storage_service_accept_import_base_url_input_fieldValue === "" &&
			spectral_storage_service_get_data_base_url_input_fieldValue !== "" ) ||
			 ( spectral_storage_service_accept_import_base_url_input_fieldValue !== "" && 
					 spectral_storage_service_get_data_base_url_input_fieldValue === "") ) {
		//  Display error message
		var $error_message_allow_scan_file_selected_spectral_storage_empty = $("#error_message_spectral_storage_only_one_has_value");
		showErrorMsg( $error_message_allow_scan_file_selected_spectral_storage_empty );
		
		 return;  //  EARLY EXIT
	}	
	
	//  Validate that if allow scan files uploaded is checked, that the Spectral Storage URLs are populated
	
	if ( allow_scan_file_upload_checkboxChecked && spectral_storage_service_accept_import_base_url_input_fieldValue === "" ) {
		//  Display error message since checkbox checked but input field empty
		var $error_message_allow_scan_file_selected_spectral_storage_empty = $("#error_message_allow_scan_file_selected_spectral_storage_empty");
		showErrorMsg( $error_message_allow_scan_file_selected_spectral_storage_empty );
		
		 return;  //  EARLY EXIT
	}	

	if ( allow_scan_file_upload_checkboxChecked && spectral_storage_service_get_data_base_url_input_fieldValue === "" ) {
		//  Display error message since checkbox checked but input field empty
		var $error_message_allow_scan_file_selected_spectral_storage_empty = $("#error_message_allow_scan_file_selected_spectral_storage_empty");
		showErrorMsg( $error_message_allow_scan_file_selected_spectral_storage_empty );
		
		 return;  //  EARLY EXIT
	}	
	
	//  Validate that if allow scan files uploaded is NOT checked, that the Spectral Storage URLs are NOT populated
	
	if ( ( ! allow_scan_file_upload_checkboxChecked ) && spectral_storage_service_accept_import_base_url_input_fieldValue !== "" ) {
		//  Display error message since checkbox not checked but input field not empty
		var $error_message_allow_scan_file_not_selected_spectral_storage_not_empty = $("#error_message_allow_scan_file_not_selected_spectral_storage_not_empty");
		showErrorMsg( $error_message_allow_scan_file_not_selected_spectral_storage_not_empty );
		
		 return;  //  EARLY EXIT
	}	

	if ( ( ! allow_scan_file_upload_checkboxChecked ) && spectral_storage_service_get_data_base_url_input_fieldValue !== "" ) {
		//  Display error message since checkbox not checked but input field not empty
		var $error_message_allow_scan_file_not_selected_spectral_storage_not_empty = $("#error_message_allow_scan_file_not_selected_spectral_storage_not_empty");
		showErrorMsg( $error_message_allow_scan_file_not_selected_spectral_storage_not_empty );
		
		 return;  //  EARLY EXIT
	}	
	
	//  Process text inputs
	var $config_text_inputs_jq = $(".config_text_inputs_jq");
	$config_text_inputs_jq.each( function( index, element ) {
		var $configTextInput = $( this );
		var configKeyForInput = $configTextInput.attr("data-config-key");
		var valueInInput = $configTextInput.val( );
		var configListItem = { 
				configKey: configKeyForInput,
				configValue : valueInInput };
		configList.push( configListItem );
		//  save special data for data-FOOTER_CENTER_OF_PAGE_HTML
		var data_FOOTER_CENTER_OF_PAGE_HTML_val = $configTextInput.attr("data-FOOTER_CENTER_OF_PAGE_HTML");
		if ( data_FOOTER_CENTER_OF_PAGE_HTML_val === "true" ) {
			input_footer_center_of_page_html_Val = valueInInput;
		}
	} );
	//  Process checkbox inputs
	var $config_checkbox_inputs_jq = $(".config_checkbox_inputs_jq");
	$config_checkbox_inputs_jq.each( function( index, element ) {
		var $configCheckboxInput = $( this );
		var configKeyForInput = $configCheckboxInput.attr("data-config-key");
		var dataValueChecked = $configCheckboxInput.attr("data-value-checked");
		var dataValueNOTChecked = $configCheckboxInput.attr("data-value-not-checked");
		var valueToSaveToConfig = dataValueNOTChecked;
		if ( $configCheckboxInput.prop( "checked" ) ) {
			valueToSaveToConfig = dataValueChecked;
		}
		var configListItem = { 
				configKey: configKeyForInput,
				configValue : valueToSaveToConfig };
		configList.push( configListItem );
	} );

	var requestData = { configList : configList };

	const url = "admin/rws/for-page/config-save";

	const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url }) ;

	const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

	promise_webserviceCallStandardPost.catch( () => { throw Error("Webservice call fail. url: " + url ) }  );

	promise_webserviceCallStandardPost.then( ({ responseData }) => {
		try {
			saveListConfigurationResponse( { 
				requestData : requestData, 
				responseData : responseData, 
				input_footer_center_of_page_html_Val : input_footer_center_of_page_html_Val
			} );
		} catch( e ) {
			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
			throw e;
		}
	} );
}

const saveListConfigurationResponse = function( params ) {
	
//	var requestData = params.requestData;
//	var responseData = params.responseData;
	var input_footer_center_of_page_html_Val = params.input_footer_center_of_page_html_Val;
	var $element = $("#success_message_values_updated");
	showErrorMsg( $element );  //  Used for success messages as well
	if ( input_footer_center_of_page_html_Val !== null ) {
		//  Update footer text on current page
		var $footer_center_container = $("#footer_center_container");
		$footer_center_container.html( input_footer_center_of_page_html_Val );
	}
}

/////////////////////////////////////
const initPage = function() {
	
	$("#save_button").click(function(eventObject) {
		try {
//			var clickThis = this;
			saveListConfiguration();
			eventObject.preventDefault();  // stop following value in 'url='.
			eventObject.stopPropagation();  // stop click bubble up.
		} catch( e ) {
			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
			throw e;
		}
	});
	$("#reset_button").click(function(eventObject) {
		try {
//			var clickThis = this;
			getListConfiguration();
			eventObject.preventDefault();  // stop following value in 'url='.
			eventObject.stopPropagation();  // stop click bubble up.
		} catch( e ) {
			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
			throw e;
		}
	});
	
	getListConfiguration();

};

export { initPage }

