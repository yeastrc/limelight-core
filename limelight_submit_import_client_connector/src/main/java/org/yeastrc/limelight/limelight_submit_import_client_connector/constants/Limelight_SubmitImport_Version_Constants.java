package org.yeastrc.limelight.limelight_submit_import_client_connector.constants;

public class Limelight_SubmitImport_Version_Constants {

	public static final int SUBMIT_PROGRAM__CURRENT__VERSION_NUMBER = 16;

	/**
	 * Used in Web app to error if passed in version number is < this value
	 */
	public static final int SUBMIT_PROGRAM__MINUMUM__VERSION_NUMBER = 1;

	/**
	 * The Submit Import Program version at which the upload-file params moved into a new
	 * Base64-encoded-XML HTTP header ('limelight_upload_file_params_xml_base_64').
	 *
	 * The new header is used ONLY when the SERVER's expected Submit Import Program version
	 * (submitProgramVersionNumber_Current_Per_Webapp, returned by the auth-test webservice) is >= this
	 * value; otherwise the original raw-XML header ('limelight_upload_file_params_xml') is used.  This is
	 * the value returned by an auth-test on a server that understands the new header, so servers older
	 * than this (which return a lower value, or 404 the auth-test, or return null) get the old header.
	 */
	public static final int SUBMIT_PROGRAM_VERSION__UPLOAD_FILE_PARAMS_NEW_BASE64_XML_HEADER__MINIMUM = 16;

	/**
	 * Format version of the payload carried inside the new Base64-encoded-XML upload-file params header,
	 * so the payload can evolve on the same header before a new URL/version is warranted.
	 */
	public static final int SUBMIT_PROGRAM_UPLOAD_FILE_PARAMS_NEW_BASE64_XML_HEADER__FORMAT_VERSION = 1;
}
