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
package org.yeastrc.limelight.limelight_submit_import_client_connector.exceptions;

/**
 * Error calling Limelight Submit Import Webservice
 *
 */
public class LimelightSubmitImportWebserviceCallErrorException extends Exception {

	private static final long serialVersionUID = 1L;
	
	private boolean callInterfaceInternalError;
	private String callInterfaceInternalErrorMessage;
	
	
	private boolean badHTTPStatusCode;
	private boolean serverURLError;
	private boolean connectToServerError;
	private boolean serverSendReceiveDataError;
	private boolean failToEncodeDataToSendToServer;
	private boolean failToDecodeDataReceivedFromServer;
	
	private Integer httpStatusCode;
	private boolean httpStatusCode_Is_404_NotFound;
	private String webserviceURL;
	
	private byte[] serverResponseByteArray;  // Received from server
	private byte[] errorStreamContents;


	public LimelightSubmitImportWebserviceCallErrorException() {
		super();
		// TODO Auto-generated constructor stub
	}

	public LimelightSubmitImportWebserviceCallErrorException(String message, Throwable cause, boolean enableSuppression,
			boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
		// TODO Auto-generated constructor stub
	}

	public LimelightSubmitImportWebserviceCallErrorException(String message, Throwable cause) {
		super(message, cause);
		// TODO Auto-generated constructor stub
	}

	public LimelightSubmitImportWebserviceCallErrorException(String message) {
		super(message);
		// TODO Auto-generated constructor stub
	}

	public LimelightSubmitImportWebserviceCallErrorException(Throwable cause) {
		super(cause);
		// TODO Auto-generated constructor stub
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
	public byte[] getServerResponseByteArray() {
		return serverResponseByteArray;
	}

	public void setServerResponseByteArray(byte[] serverResponseByteArray) {
		this.serverResponseByteArray = serverResponseByteArray;
	}

	public boolean isHttpStatusCode_Is_404_NotFound() {
		return httpStatusCode_Is_404_NotFound;
	}

	public void setHttpStatusCode_Is_404_NotFound(boolean httpStatusCode_Is_404_NotFound) {
		this.httpStatusCode_Is_404_NotFound = httpStatusCode_Is_404_NotFound;
	}


}
