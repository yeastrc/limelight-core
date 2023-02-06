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
package org.yeastrc.limelight.limelight_feature_detection_run_import.exceptions;

/**
 * 
 *
 */
public class LimelightImporter_RunFeatureDetection_Communication_Exception extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private boolean callInterfaceInternalError;
	private String callInterfaceInternalErrorMessage;
	
	
	private boolean badHTTPStatusCode;
	private boolean serverURLError;
	private boolean serverSendReceiveDataError;
	private boolean connectToServerError;
	private boolean failToEncodeDataToSendToServer;
	private boolean failToDecodeDataReceivedFromServer;
	
	private Integer httpStatusCode;
	private String webserviceURL;
	
	private byte[] errorStreamContents;


	@Override
	public String toString() {
		return "LimelightImporter_RunFeatureDetection_Communication_Exception [callInterfaceInternalError="
				+ callInterfaceInternalError + ", callInterfaceInternalErrorMessage="
				+ callInterfaceInternalErrorMessage + ", badHTTPStatusCode=" + badHTTPStatusCode + ", serverURLError="
				+ serverURLError + ", serverSendReceiveDataError=" + serverSendReceiveDataError
				+ ", connectToServerError=" + connectToServerError + ", failToEncodeDataToSendToServer="
				+ failToEncodeDataToSendToServer + ", failToDecodeDataReceivedFromServer="
				+ failToDecodeDataReceivedFromServer + ", httpStatusCode=" + httpStatusCode + ", webserviceURL="
				+ webserviceURL + "]";
	}

	/**
	 * 
	 */
	public LimelightImporter_RunFeatureDetection_Communication_Exception() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @param message
	 * @param cause
	 * @param enableSuppression
	 * @param writableStackTrace
	 */
	public LimelightImporter_RunFeatureDetection_Communication_Exception(String message, Throwable cause, boolean enableSuppression,
			boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
		// TODO Auto-generated constructor stub
	}

	/**
	 * @param message
	 * @param cause
	 */
	public LimelightImporter_RunFeatureDetection_Communication_Exception(String message, Throwable cause) {
		super(message, cause);
		// TODO Auto-generated constructor stub
	}

	/**
	 * @param message
	 */
	public LimelightImporter_RunFeatureDetection_Communication_Exception(String message) {
		super(message);
		// TODO Auto-generated constructor stub
	}

	/**
	 * @param cause
	 */
	public LimelightImporter_RunFeatureDetection_Communication_Exception(Throwable cause) {
		super(cause);
		// TODO Auto-generated constructor stub
	}

	public boolean isCallInterfaceInternalError() {
		return callInterfaceInternalError;
	}

	public void setCallInterfaceInternalError(boolean callInterfaceInternalError) {
		this.callInterfaceInternalError = callInterfaceInternalError;
	}

	public String getCallInterfaceInternalErrorMessage() {
		return callInterfaceInternalErrorMessage;
	}

	public void setCallInterfaceInternalErrorMessage(String callInterfaceInternalErrorMessage) {
		this.callInterfaceInternalErrorMessage = callInterfaceInternalErrorMessage;
	}

	public boolean isBadHTTPStatusCode() {
		return badHTTPStatusCode;
	}

	public void setBadHTTPStatusCode(boolean badHTTPStatusCode) {
		this.badHTTPStatusCode = badHTTPStatusCode;
	}

	public boolean isServerURLError() {
		return serverURLError;
	}

	public void setServerURLError(boolean serverURLError) {
		this.serverURLError = serverURLError;
	}

	public boolean isServerSendReceiveDataError() {
		return serverSendReceiveDataError;
	}

	public void setServerSendReceiveDataError(boolean serverSendReceiveDataError) {
		this.serverSendReceiveDataError = serverSendReceiveDataError;
	}

	public boolean isConnectToServerError() {
		return connectToServerError;
	}

	public void setConnectToServerError(boolean connectToServerError) {
		this.connectToServerError = connectToServerError;
	}

	public boolean isFailToEncodeDataToSendToServer() {
		return failToEncodeDataToSendToServer;
	}

	public void setFailToEncodeDataToSendToServer(boolean failToEncodeDataToSendToServer) {
		this.failToEncodeDataToSendToServer = failToEncodeDataToSendToServer;
	}

	public boolean isFailToDecodeDataReceivedFromServer() {
		return failToDecodeDataReceivedFromServer;
	}

	public void setFailToDecodeDataReceivedFromServer(boolean failToDecodeDataReceivedFromServer) {
		this.failToDecodeDataReceivedFromServer = failToDecodeDataReceivedFromServer;
	}

	public Integer getHttpStatusCode() {
		return httpStatusCode;
	}

	public void setHttpStatusCode(Integer httpStatusCode) {
		this.httpStatusCode = httpStatusCode;
	}

	public String getWebserviceURL() {
		return webserviceURL;
	}

	public void setWebserviceURL(String webserviceURL) {
		this.webserviceURL = webserviceURL;
	}

	public byte[] getErrorStreamContents() {
		return errorStreamContents;
	}

	public void setErrorStreamContents(byte[] errorStreamContents) {
		this.errorStreamContents = errorStreamContents;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	
}
