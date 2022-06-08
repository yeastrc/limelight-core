package org.yeastrc.limelight.limelight_webapp.spectral_storage_service_interface;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemsKeysSharedConstants;
import org.yeastrc.limelight.limelight_webapp.dao.ConfigSystemDAO_IF;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.constants.LimelightXMLFileUploadWebConstants;
import org.yeastrc.spectral_storage.accept_import_web_app.shared_server_client.webservice_request_response.main.Get_Supported_ScanFilename_Suffixes_Response;
import org.yeastrc.spectral_storage.accept_import_web_app.shared_server_client.webservice_request_response.main.Get_UploadedScanFileInfo_Request;
import org.yeastrc.spectral_storage.accept_import_web_app.webservice_connect.main.CallSpectralStorageAcceptImportWebservice;
import org.yeastrc.spectral_storage.accept_import_web_app.webservice_connect.main.CallSpectralStorageAcceptImportWebserviceInitParameters;

/**
 * On Limelight Startup, Get Spectral Storage Service supported Scan Filename Suffixes
 * 
 * Do so have cached when need later if Spectral Storage Service is not responding when need the Scan Filename Suffixes.
 *
 */
public class SpectralStorageService_Get_Supported_ScanFileSuffixes_At_LimelightStartup__Runnable_InThread 

implements Runnable //  Thread Runnable

{
	private static final Logger log = LoggerFactory.getLogger( SpectralStorageService_Get_Supported_ScanFileSuffixes_At_LimelightStartup__Runnable_InThread.class );
	
	private static final int RETRY_MAX__GET__SPECTRAL_STORAGE_URL_PATH_FROM_CONFIG = 20;
	
	private static final int RETRY_MAX__GET__SPECTRAL_STORAGE_SUFFIXES = 36;
	
	private static final int ONE_HOUR__IN_SECONDS = 60 * 60;

	private static volatile boolean shutdownRequested = false;

	/**
	 * 
	 */
	public static void webappShutdownRequested() {
		
		shutdownRequested = true;
		
		if ( instance != null ) {
			instance.shutdown();
		}
	}
	
	private static volatile SpectralStorageService_Get_Supported_ScanFileSuffixes_At_LimelightStartup__Runnable_InThread instance;
	
	/**
	 * Private Constructor
	 */
	private SpectralStorageService_Get_Supported_ScanFileSuffixes_At_LimelightStartup__Runnable_InThread() {
		
	}
	
	/**
	 * @return new instance after assign to static property 'instance'
	 */
	public static SpectralStorageService_Get_Supported_ScanFileSuffixes_At_LimelightStartup__Runnable_InThread getNewInstance() {
		
		//  Assumes only 1 instance is created.
		
		instance = new SpectralStorageService_Get_Supported_ScanFileSuffixes_At_LimelightStartup__Runnable_InThread(); // Save last created instance.
		
		return instance;
	}
	
	private ConfigSystemDAO_IF configSystemDAO;

	public void setConfigSystemDAO(ConfigSystemDAO_IF configSystemDAO) {
		this.configSystemDAO = configSystemDAO;
	}

	/**
	 * 
	 */
	public void startThread() {

		if ( shutdownRequested ) {

			log.warn( "INFO:  shutdownRequested is true so exit processing to get Spectral Storage Scan Filename Suffixes Allowed" );

			return; // EARLY RETURN
		}

		Thread thread = new Thread( this );
		thread.setDaemon(true);
		thread.setName( "SpectralStorageService_Get_Supported_ScanFileSuffixes_At_LimelightStartup__Runnable_InThread" );
		thread.start();
	}
	
	private void shutdown() {
		
		awaken();
	}
	
	private void awaken() {
		
		synchronized(this) {
			notify();
		}
	}
 
	@Override
	public void run() {

		try {
			if ( shutdownRequested ) {

				log.warn( "INFO:  shutdownRequested is true so exit processing to get Spectral Storage Scan Filename Suffixes Allowed" );

				return; // EARLY RETURN
			}
	

			log.info( "INFO: Sleeping for 5 seconds to allow Limelight DB and Spectral Storage Service to start up: " );
			
			synchronized (this) {
				try {
					wait( 5000 );
				} catch( Throwable t ) {
					
				}
			}
	
			if ( shutdownRequested ) {

				log.warn( "INFO:  shutdownRequested is true so exit processing to get Spectral Storage Scan Filename Suffixes Allowed" );

				return; // EARLY RETURN
			}
	
			mainProcessing();
			
		} catch ( Throwable t ) {
			log.error( "In Main run(). Throwable caught.", t );
		}
	}
	
	/**
	 * 
	 */
	private void mainProcessing() {
		
		log.warn("Entered mainProcessing()");
		
		String spectralStorage_AcceptImport_WebserviceBaseURL = null;
		
		{

			int retry_Counter = 0;

			boolean config_Retrieve = true;

			while ( config_Retrieve ) {
				try {

					spectralStorage_AcceptImport_WebserviceBaseURL = 
							configSystemDAO
							.getConfigValueForConfigKey( ConfigSystemsKeysSharedConstants.SPECTRAL_STORAGE_SERVICE_ACCEPT_IMPORT_BASE_URL );

					config_Retrieve = false;

				} catch ( Throwable t ) {
					
					retry_Counter++;
					
					if ( retry_Counter > RETRY_MAX__GET__SPECTRAL_STORAGE_URL_PATH_FROM_CONFIG ) {
						
						log.warn("Failed to get Spectral Storage Service URL from Limelight Config Table.  Max Retries attempted: " + RETRY_MAX__GET__SPECTRAL_STORAGE_URL_PATH_FROM_CONFIG );
					}

					log.info( "INFO: Sleeping for additional 5 seconds to allow Config Table to be available: " );

					synchronized (this) {
						try {
							wait( 5000 );
						} catch( Throwable t2 ) {

						}
					}

					if ( shutdownRequested ) {

						log.warn( "INFO:  shutdownRequested is true so exit processing to get Spectral Storage Scan Filename Suffixes Allowed" );

						return;  // EARLY RETURN
					}
				}
			}
		}
		
		if ( StringUtils.isEmpty( spectralStorage_AcceptImport_WebserviceBaseURL ) ) {
			
			//  No Spectral Storage configured so exit

			log.warn( "INFO:  No configuration for Spectra Storage Accept Import Base URL so exit processing to get Spectral Storage Scan Filename Suffixes Allowed" );
			
			return; // EARY RETURN
		}
		
		Get_Supported_ScanFilename_Suffixes_Response get_Supported_ScanFilename_Suffixes_Response = null;
		
		{
			int retry_Counter = 0;
			
			int retry_WaitTime_Seconds = 5;  

			boolean scanFileNameSuffixes_Retrieve = true;

			while ( scanFileNameSuffixes_Retrieve ) {

				try {

					CallSpectralStorageAcceptImportWebserviceInitParameters initParameters = new CallSpectralStorageAcceptImportWebserviceInitParameters();

					initParameters.setSpectralStorageServerBaseURL( spectralStorage_AcceptImport_WebserviceBaseURL );

					CallSpectralStorageAcceptImportWebservice callSpectralStorageAcceptImportWebservice = CallSpectralStorageAcceptImportWebservice.getInstance();

					callSpectralStorageAcceptImportWebservice.init(initParameters);;

					//  call_HealthCheck_Webservice()  was added in Spectr 2.0.  Will throw Exception with Spectr 1.X since no webservice at that URL.

					//			try {
					//				callSpectralStorageAcceptImportWebservice.call_HealthCheck_Webservice();
					//
					//			} catch( Throwable t) {
					//
					//				log.warn("callSpectralStorageAcceptImportWebservice.call_HealthCheck_Webservice(); failed with exception: ", t );
					//			}
					
					//  Use as Health Check:  callSpectralStorageAcceptImportWebservice.call_Get_UploadedScanFileInfo_Webservice(...)
					
					boolean fake_healthCheck_Successful = false;

					try {
//						log.warn( "Calling callSpectralStorageAcceptImportWebservice.call_Get_UploadedScanFileInfo_Webservice(...) with fake setScanProcessStatusKey to confirm Spectral Storage Service Accept Import webapp is up" );

						Get_UploadedScanFileInfo_Request webserviceRequest = new Get_UploadedScanFileInfo_Request();
						webserviceRequest.setScanProcessStatusKey( "a" ); //  FAKE Value to validate service is up

						//						Get_UploadedScanFileInfo_Response webserviceResponse = 
						callSpectralStorageAcceptImportWebservice.call_Get_UploadedScanFileInfo_Webservice( webserviceRequest );

						//  No HTTP Error connecting to webservice so webservice is up.  Must be Spectr 1.X.

						fake_healthCheck_Successful = true;

						if ( shutdownRequested ) {

							log.warn( "INFO:  shutdownRequested is true so exit processing to get Spectral Storage Scan Filename Suffixes Allowed" );
							
							return;  // EARLY RETURN
						}

					} catch( Throwable throwable_GetFakeInfo ) {
						log.warn( "Spectral Storage Service Accept Import 'Health Check':  Calling callSpectralStorageAcceptImportWebservice.call_Get_UploadedScanFileInfo_Webservice(...) with fake setScanProcessStatusKey throws exception: ", throwable_GetFakeInfo );
					}
					
					try {
						get_Supported_ScanFilename_Suffixes_Response =
								callSpectralStorageAcceptImportWebservice.call_Get_Supported_ScanFilename_Suffixes_Webservice();

						scanFileNameSuffixes_Retrieve = false;

						if ( shutdownRequested ) {

							log.warn( "INFO:  shutdownRequested is true so exit processing to get Spectral Storage Scan Filename Suffixes Allowed" );
							
							return;  // EARLY RETURN
						}

					} catch( Throwable throwable_Main ) {

						if ( shutdownRequested ) {

							log.warn( "INFO:  shutdownRequested is true so exit processing to get Spectral Storage Scan Filename Suffixes Allowed" );
							
							return;  // EARLY RETURN
						}

						if ( fake_healthCheck_Successful ) {

							log.warn( "INFO:  Spectral Storage Service Accept Import 'Health Check'  (call call_Get_UploadedScanFileInfo_Webservice(...) with fake value ) was successful but call call_Get_Supported_ScanFilename_Suffixes_Webservice(...) failed so use Defaults" );

							scanFileNameSuffixes_Retrieve = false;
						}
					}

				} catch( Throwable t) {

				}

				if ( shutdownRequested ) {

					log.warn( "INFO:  shutdownRequested is true so exit processing to get Spectral Storage Scan Filename Suffixes Allowed" );
					
					return;  // EARLY RETURN
				}

				if ( retry_Counter > RETRY_MAX__GET__SPECTRAL_STORAGE_SUFFIXES ) {
					
					log.warn( "Get Spectral Storage Allowed Scan Filename Suffixes:  Max Retry Exceeded.  Will Try when needed on demand.");
					
					return; // EARLY RETURN
				}

				retry_WaitTime_Seconds = retry_WaitTime_Seconds * 2;
				
				if ( retry_WaitTime_Seconds > ONE_HOUR__IN_SECONDS ) {
					
					retry_WaitTime_Seconds = ONE_HOUR__IN_SECONDS;  //  Max 1 hour wait
				}

				retry_Counter++;
			}
			
			if ( shutdownRequested ) {

				log.warn( "INFO:  shutdownRequested is true so exit processing to get Spectral Storage Scan Filename Suffixes Allowed" );
				
				return;  // EARLY RETURN
			}
			
			if ( scanFileNameSuffixes_Retrieve ) {

				log.info( "INFO: Sleeping for additional " + retry_WaitTime_Seconds + " seconds (incrementally more wait time up to 24 tries) to allow Spectral Storage Service Accept Import to be available: " );

				long waitTime_Milliseconds = retry_WaitTime_Seconds * 1000;

				synchronized (this) {
					try {
						wait( waitTime_Milliseconds );
					} catch( Throwable t2 ) {

					}
				}
			}
		}

		if ( shutdownRequested ) {

			log.warn( "INFO:  shutdownRequested is true so exit processing to get Spectral Storage Scan Filename Suffixes Allowed" );
			
			return;  // EARLY RETURN
		}
		
		if ( get_Supported_ScanFilename_Suffixes_Response != null ) {
			
			//  Have a response to process
			
			List<String> scanFileSuffixes_Accepted_List = get_Supported_ScanFilename_Suffixes_Response.getScanFilenameSuffixes();

			log.warn( "INFO::  Initial Get Scanfilename Suffixes allowed from Spectral Storage Accept Import: Scanfilename Suffixes allowed: " + StringUtils.join( scanFileSuffixes_Accepted_List, ", " ) );
			
			SpectralStorageService_Cached_ScanFileSuffixes_Accepted.set_ScanFileSuffixes_Accepted_List( scanFileSuffixes_Accepted_List );
			
		} else {
			
			//  No get_Supported_ScanFilename_Suffixes_Response.  Only get here if 'Health Check' was Successful, which means Spectral Storage Service version is less than 2.0
			
			//  Use defaults mzML and mzXML
			
			List<String> scanFileSuffixes_Accepted_List = new ArrayList<String>(2);
			
			scanFileSuffixes_Accepted_List.add( LimelightXMLFileUploadWebConstants.UPLOAD_SCAN_FILE_ALLOWED_SUFFIX__DEFAULT_AND_SPECTR_1_X__MZML );
			scanFileSuffixes_Accepted_List.add( LimelightXMLFileUploadWebConstants.UPLOAD_SCAN_FILE_ALLOWED_SUFFIX__DEFAULT_AND_SPECTR_1_X__MZXML );
			
			log.warn( "INFO::  Initial Get Scanfilename Suffixes allowed from Spectral Storage Accept Import: Must be Spectral Storage 1.X so using Hard Coded Scanfilename Suffixes allowed: " + StringUtils.join( scanFileSuffixes_Accepted_List, ", " ) );
			
			SpectralStorageService_Cached_ScanFileSuffixes_Accepted.set_ScanFileSuffixes_Accepted_List( scanFileSuffixes_Accepted_List );
			
		}
	}

	
}
