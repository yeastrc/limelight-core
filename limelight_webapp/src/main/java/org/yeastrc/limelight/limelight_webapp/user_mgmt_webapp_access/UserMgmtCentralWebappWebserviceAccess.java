package org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access;

import java.nio.charset.StandardCharsets;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.stereotype.Component;
import org.yeastrc.user_mgmt_central.user_mgmt_central__embed_code.UserMgmtCentral_Embedded_Facade_Builder;
import org.yeastrc.user_mgmt_central.user_mgmt_central__embed_code.UserMgmtCentral_Embedded_Facade_IF;
import org.yeastrc.user_mgmt_central.user_mgmt_central__embed_code.UserMgmtEmbed_SQL_Connection_Provider_IF;
import org.yeastrc.user_mgmt_central.shared_server_client.webservice_request_response.CreateAccountFacadeRequest;
import org.yeastrc.user_mgmt_central.shared_server_client.webservice_request_response.CreateAccountFacadeResponse;
import org.yeastrc.user_mgmt_central.shared_server_client.webservice_request_response.GetAccountEnabledForIdAccountFacadeRequest;
import org.yeastrc.user_mgmt_central.shared_server_client.webservice_request_response.GetAccountEnabledForIdAccountFacadeResponse;
import org.yeastrc.user_mgmt_central.shared_server_client.webservice_request_response.GetUserDataForIdAccountFacadeRequest;
import org.yeastrc.user_mgmt_central.shared_server_client.webservice_request_response.GetUserDataForIdAccountFacadeResponse;
import org.yeastrc.user_mgmt_central.shared_server_client.webservice_request_response.LoginAccountFacadeRequest;
import org.yeastrc.user_mgmt_central.shared_server_client.webservice_request_response.LoginAccountFacadeResponse;
import org.yeastrc.user_mgmt_central.shared_server_client.webservice_request_response.ManageAccountFacadeRequest;
import org.yeastrc.user_mgmt_central.shared_server_client.webservice_request_response.ManageAccountFacadeResponse;
import org.yeastrc.user_mgmt_central.shared_server_client.webservice_request_response.PasswordChangeAccountFacadeRequest;
import org.yeastrc.user_mgmt_central.shared_server_client.webservice_request_response.PasswordChangeAccountFacadeResponse;
import org.yeastrc.user_mgmt_central.shared_server_client.webservice_request_response.PasswordResetAccountFacadeRequest;
import org.yeastrc.user_mgmt_central.shared_server_client.webservice_request_response.PasswordResetAccountFacadeResponse;
import org.yeastrc.user_mgmt_central.shared_server_client.webservice_request_response.SearchUserDataAccountFacadeRequest;
import org.yeastrc.user_mgmt_central.shared_server_client.webservice_request_response.SearchUserDataAccountFacadeResponse;

/**
 * Central access point to the User Mgmt Central Webapp
 *
 */
@Component
public class UserMgmtCentralWebappWebserviceAccess implements UserMgmtCentralWebappWebserviceAccessIF {
	
	private static final Logger log = LoggerFactory.getLogger( UserMgmtCentralWebappWebserviceAccess.class );
	
	private UserMgmtCentral_Embedded_Facade_IF userMgmtCentral_Embedded_Facade;
	
	private boolean instanceInitialized;
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtCentralWebappWebserviceAccessIF#init()
	 */
	@Override
	public void init( UserMgmtEmbed_SQL_Connection_Provider_IF userMgmtEmbed_SQL_Connection_Provider ) {
		try {

			userMgmtCentral_Embedded_Facade = 
					UserMgmtCentral_Embedded_Facade_Builder
					.getBuilder()
					.setUserMgmtEmbed_SQL_Connection_Provider_IF( userMgmtEmbed_SQL_Connection_Provider )
					.build();

		} catch (Exception e) {
			String msg = "Failed to initialize the code to access the User Mgmt Data";
			log.error(msg, e);
			throw new RuntimeException( msg, e );
		} 
		
		instanceInitialized = true;
	}

	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtCentralWebappWebserviceAccessIF#getMaxPasswordLength_UTF8_Bytes()
	 */
	@Override
	public int getMaxPasswordLength_UTF8_Bytes() {
		if ( ! instanceInitialized ) {
			throw new IllegalStateException( "Not initialized" );
		}
		return userMgmtCentral_Embedded_Facade.getMaxPasswordLength_UTF8_Bytes();
	}

	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtCentralWebappWebserviceAccessIF#isPasswordTooLong_UTF8_Bytes(java.lang.String)
	 */
	@Override
	public boolean isPasswordTooLong_UTF8_Bytes( String password ) {
		return password.getBytes( StandardCharsets.UTF_8 ).length > getMaxPasswordLength_UTF8_Bytes();
	}

	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtCentralWebappWebserviceAccessIF#createUser(org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtCreateAccountRequest)
	 */
	@Override
	public UserMgmtCreateAccountResponse createUser( UserMgmtCreateAccountRequest userMgmtCreateAccountRequest ) throws Exception {
		
		CreateAccountFacadeRequest facadeRequest = new CreateAccountFacadeRequest();
		
		facadeRequest.setEmail( userMgmtCreateAccountRequest.getEmail() );
		facadeRequest.setUsername( userMgmtCreateAccountRequest.getUsername() );
		facadeRequest.setFirstName( userMgmtCreateAccountRequest.getFirstName() );
		facadeRequest.setLastName( userMgmtCreateAccountRequest.getLastName() );
		facadeRequest.setOrganization( userMgmtCreateAccountRequest.getOrganization() );
		facadeRequest.setPassword( userMgmtCreateAccountRequest.getPassword() );
		facadeRequest.setUserRemoteIP( userMgmtCreateAccountRequest.getUserRemoteIP() );
		
		CreateAccountFacadeResponse facadeResponse = 
				userMgmtCentral_Embedded_Facade.createAccount( facadeRequest );

		UserMgmt_UserEnabled_RecheckCache.receivedIntervalFromUserMgmt( facadeResponse.getUserEnabledRecheckIntervalSeconds() );
		
		UserMgmtCreateAccountResponse userMgmtCreateAccountResponse = new UserMgmtCreateAccountResponse();
		userMgmtCreateAccountResponse.setSuccess( facadeResponse.isSuccess() );
		userMgmtCreateAccountResponse.setCreatedUserId( facadeResponse.getCreatedUserId() );
		userMgmtCreateAccountResponse.setDuplicateEmail( facadeResponse.isDuplicateEmail() );
		userMgmtCreateAccountResponse.setDuplicateUsername( facadeResponse.isDuplicateUsername() );
		userMgmtCreateAccountResponse.setErrorMessage( facadeResponse.getErrorMessage() );
		userMgmtCreateAccountResponse.setPasswordTooLong( facadeResponse.isPasswordTooLong() );
		
		return userMgmtCreateAccountResponse;
	}
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtCentralWebappWebserviceAccessIF#userLogin(org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtLoginRequest)
	 */
	@Override
	public UserMgmtLoginResponse userLogin( UserMgmtLoginRequest userMgmtLoginRequest ) throws Exception {
		if ( ! instanceInitialized ) {
			throw new IllegalStateException( "Not initialized" );
		}
		
		LoginAccountFacadeRequest facadeRequest = new LoginAccountFacadeRequest();
		facadeRequest.setUsername( userMgmtLoginRequest.getUsername() );
		facadeRequest.setPasswordUserMgmtQQW( userMgmtLoginRequest.getPassword() );
		facadeRequest.setRemoteIP( userMgmtLoginRequest.getRemoteIP() );
		
		LoginAccountFacadeResponse facadeResponse = 
				userMgmtCentral_Embedded_Facade.loginAccount( facadeRequest );

		UserMgmt_UserEnabled_RecheckCache.receivedIntervalFromUserMgmt( facadeResponse.getUserEnabledRecheckIntervalSeconds() );
		
		UserMgmtLoginResponse userMgmtLoginResponse = new UserMgmtLoginResponse();
		userMgmtLoginResponse.setSuccess( facadeResponse.isSuccess() );
		userMgmtLoginResponse.setUsernameNotFound( facadeResponse.isUsernameNotFound() );
		userMgmtLoginResponse.setPasswordInvalid( facadeResponse.isPasswordInvalid() );
		userMgmtLoginResponse.setUserDisabled( facadeResponse.isUserDisabled() );
		userMgmtLoginResponse.setErrorMessage( facadeResponse.getErrorMessage() );
		userMgmtLoginResponse.setUserId( facadeResponse.getUserId() );
		
		return userMgmtLoginResponse;
	}
	
	

	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtCentralWebappWebserviceAccessIF#changePassword(org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtChangePasswordRequest)
	 */
	@Override
	public UserMgmtChangePasswordResponse changePassword( UserMgmtChangePasswordRequest userMgmtChangePasswordRequest ) throws Exception {
		if ( ! instanceInitialized ) {
			throw new IllegalStateException( "Not initialized" );
		}
		
		PasswordChangeAccountFacadeRequest facadeRequest = new PasswordChangeAccountFacadeRequest();
		facadeRequest.setUserId( userMgmtChangePasswordRequest.getUserMgmtUserId() );
		facadeRequest.setOldPasswordFDSJKLIEOW( userMgmtChangePasswordRequest.getOldPassword() );
		facadeRequest.setNewPasswordVCMVLSJ( userMgmtChangePasswordRequest.getNewPassword() );
		facadeRequest.setUserRemoteIP( userMgmtChangePasswordRequest.getUserRemoteIP() );
		
		PasswordChangeAccountFacadeResponse facadeResponse = 
				userMgmtCentral_Embedded_Facade.passwordChangeAccount( facadeRequest );

		UserMgmt_UserEnabled_RecheckCache.receivedIntervalFromUserMgmt( facadeResponse.getUserEnabledRecheckIntervalSeconds() );
		
		UserMgmtChangePasswordResponse userMgmtChangePasswordResponse = new UserMgmtChangePasswordResponse();
		userMgmtChangePasswordResponse.setSuccess( facadeResponse.isSuccess() );
		userMgmtChangePasswordResponse.setOldPasswordNotValid( facadeResponse.isOldPasswordNotValid() );
		userMgmtChangePasswordResponse.setUserIdNotFound( facadeResponse.isUserIdNotFound() );
		userMgmtChangePasswordResponse.setUserDisabled( facadeResponse.isUserDisabled() );
		userMgmtChangePasswordResponse.setErrorMessage( facadeResponse.getErrorMessage() );
		userMgmtChangePasswordResponse.setPasswordTooLong( facadeResponse.isPasswordTooLong() );

		return userMgmtChangePasswordResponse;
	}
	

	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtCentralWebappWebserviceAccessIF#resetPassword(org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtResetPasswordRequest)
	 */
	@Override
	public UserMgmtResetPasswordResponse resetPassword( UserMgmtResetPasswordRequest userMgmtResetPasswordRequest ) throws Exception {
		if ( ! instanceInitialized ) {
			throw new IllegalStateException( "Not initialized" );
		}
		
		PasswordResetAccountFacadeRequest facadeRequest = new PasswordResetAccountFacadeRequest();
		facadeRequest.setUserMgmtUserIdWUERxcvmEWURIO( userMgmtResetPasswordRequest.getUserMgmtUserId() );
		facadeRequest.setNewPasswordVCMVLSJ( userMgmtResetPasswordRequest.getNewPassword() );
		facadeRequest.setUserRemoteIP( userMgmtResetPasswordRequest.getUserRemoteIP() );

		PasswordResetAccountFacadeResponse facadeResponse = 
			userMgmtCentral_Embedded_Facade.passwordResetAccount( facadeRequest );

		UserMgmt_UserEnabled_RecheckCache.receivedIntervalFromUserMgmt( facadeResponse.getUserEnabledRecheckIntervalSeconds() );
		
		UserMgmtResetPasswordResponse userMgmtResetPasswordResponse = new UserMgmtResetPasswordResponse();
		userMgmtResetPasswordResponse.setSuccess( facadeResponse.isSuccess() );
		userMgmtResetPasswordResponse.setUserIdNotValid( facadeResponse.isUserIdNotValid() );
		userMgmtResetPasswordResponse.setUserDisabled( facadeResponse.isUserDisabled() );
		userMgmtResetPasswordResponse.setErrorMessage( facadeResponse.getErrorMessage() );
		userMgmtResetPasswordResponse.setPasswordTooLong( facadeResponse.isPasswordTooLong() );

		return userMgmtResetPasswordResponse;
	}
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtCentralWebappWebserviceAccessIF#getUserData(org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtGetUserDataRequest)
	 */
	@Override
	public UserMgmtGetUserDataResponse getUserData( UserMgmtGetUserDataRequest userMgmtGetUserDataRequest ) throws Exception {
		if ( ! instanceInitialized ) {
			throw new IllegalStateException( "Not initialized" );
		}
		GetUserDataForIdAccountFacadeRequest facadeRequest = new GetUserDataForIdAccountFacadeRequest();
		facadeRequest.setUserId( userMgmtGetUserDataRequest.getUserId() );
		
		GetUserDataForIdAccountFacadeResponse facadeResponse = 
			userMgmtCentral_Embedded_Facade.getUserDataForIdAccount( facadeRequest );

		UserMgmt_UserEnabled_RecheckCache.receivedIntervalFromUserMgmt( facadeResponse.getUserEnabledRecheckIntervalSeconds() );
				
		UserMgmtGetUserDataResponse userMgmtGetUserDataResponse = new UserMgmtGetUserDataResponse();
		userMgmtGetUserDataResponse.setSuccess( facadeResponse.isSuccess() );
		userMgmtGetUserDataResponse.setUserIdNotFound( facadeResponse.isUserIdNotFound() );
		userMgmtGetUserDataResponse.setUsername( facadeResponse.getUsername() );
		userMgmtGetUserDataResponse.setEmail( facadeResponse.getEmail() );
		userMgmtGetUserDataResponse.setFirstName( facadeResponse.getFirstName() );
		userMgmtGetUserDataResponse.setLastName( facadeResponse.getLastName() );
		userMgmtGetUserDataResponse.setOrganization( facadeResponse.getOrganization() );
		userMgmtGetUserDataResponse.setEnabled( facadeResponse.isEnabled() );
		userMgmtGetUserDataResponse.setGlobalAdminUser( facadeResponse.isGlobalAdminUser() );
		userMgmtGetUserDataResponse.setErrorMessage( facadeResponse.getErrorMessage() );
		
		return userMgmtGetUserDataResponse;
	}

	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtCentralWebappWebserviceAccessIF#getAccountEnabled(org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtGetAccountEnabledRequest)
	 */
	@Override
	public UserMgmtGetAccountEnabledResponse getAccountEnabled( UserMgmtGetAccountEnabledRequest userMgmtGetAccountEnabledRequest ) throws Exception {
		if ( ! instanceInitialized ) {
			throw new IllegalStateException( "Not initialized" );
		}
		GetAccountEnabledForIdAccountFacadeRequest facadeRequest = new GetAccountEnabledForIdAccountFacadeRequest();
		facadeRequest.setUserId( userMgmtGetAccountEnabledRequest.getUserId() );
		
		GetAccountEnabledForIdAccountFacadeResponse facadeResponse = 
			userMgmtCentral_Embedded_Facade.getAccountEnabledForIdAccount( facadeRequest );

		UserMgmt_UserEnabled_RecheckCache.receivedIntervalFromUserMgmt( facadeResponse.getUserEnabledRecheckIntervalSeconds() );
				
		UserMgmtGetAccountEnabledResponse userMgmtGetAccountEnabledResponse = new UserMgmtGetAccountEnabledResponse();
		userMgmtGetAccountEnabledResponse.setSuccess( facadeResponse.isSuccess() );
		userMgmtGetAccountEnabledResponse.setUserIdNotFound( facadeResponse.isUserIdNotFound() );
		userMgmtGetAccountEnabledResponse.setEnabled( facadeResponse.isEnabled() );
		userMgmtGetAccountEnabledResponse.setErrorMessage( facadeResponse.getErrorMessage() );
		
		return userMgmtGetAccountEnabledResponse;
	}

	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtCentralWebappWebserviceAccessIF#getAccountEnabled_ForRecheck(org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtGetAccountEnabledRequest, int)
	 */
	@Override
	public UserMgmtGetAccountEnabledResponse getAccountEnabled_ForRecheck( UserMgmtGetAccountEnabledRequest userMgmtGetAccountEnabledRequest, int totalTimeoutMillis ) throws Exception {
		if ( ! instanceInitialized ) {
			throw new IllegalStateException( "Not initialized" );
		}
		GetAccountEnabledForIdAccountFacadeRequest facadeRequest = new GetAccountEnabledForIdAccountFacadeRequest();
		facadeRequest.setUserId( userMgmtGetAccountEnabledRequest.getUserId() );
		
		GetAccountEnabledForIdAccountFacadeResponse facadeResponse = 
			userMgmtCentral_Embedded_Facade.getAccountEnabledForIdAccount_ShortTimeout( facadeRequest, totalTimeoutMillis );

		UserMgmt_UserEnabled_RecheckCache.receivedIntervalFromUserMgmt( facadeResponse.getUserEnabledRecheckIntervalSeconds() );
				
		UserMgmtGetAccountEnabledResponse userMgmtGetAccountEnabledResponse = new UserMgmtGetAccountEnabledResponse();
		userMgmtGetAccountEnabledResponse.setSuccess( facadeResponse.isSuccess() );
		userMgmtGetAccountEnabledResponse.setUserIdNotFound( facadeResponse.isUserIdNotFound() );
		userMgmtGetAccountEnabledResponse.setEnabled( facadeResponse.isEnabled() );
		userMgmtGetAccountEnabledResponse.setErrorMessage( facadeResponse.getErrorMessage() );
		
		return userMgmtGetAccountEnabledResponse;
	}
			


	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtCentralWebappWebserviceAccessIF#manageUserData(org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtManageAccountRequest)
	 */
	@Override
	public UserMgmtManageAccountResponse manageUserData( UserMgmtManageAccountRequest userMgmtManageAccountRequest ) throws Exception {
		if ( ! instanceInitialized ) {
			throw new IllegalStateException( "Not initialized" );
		}
		ManageAccountFacadeRequest facadeRequest = new ManageAccountFacadeRequest();
		facadeRequest.setUserId( userMgmtManageAccountRequest.getUserMgmtUserId() );
		facadeRequest.setCurrentPasswordQWZNVKSD( userMgmtManageAccountRequest.getCurrentPassword() );
		facadeRequest.setEmail( userMgmtManageAccountRequest.getEmail() );
		facadeRequest.setUsername( userMgmtManageAccountRequest.getUsername() );
		facadeRequest.setFirstName( userMgmtManageAccountRequest.getFirstName() );
		facadeRequest.setLastName( userMgmtManageAccountRequest.getLastName() );
		facadeRequest.setOrganization( userMgmtManageAccountRequest.getOrganization() );
		facadeRequest.setAssignOrganizationNull( userMgmtManageAccountRequest.isAssignOrganizationNull() );
		
		ManageAccountFacadeResponse facadeResponse = 
			userMgmtCentral_Embedded_Facade.manageAccount( facadeRequest );

		UserMgmt_UserEnabled_RecheckCache.receivedIntervalFromUserMgmt( facadeResponse.getUserEnabledRecheckIntervalSeconds() );
				
		UserMgmtManageAccountResponse userMgmtManageAccountResponse = new UserMgmtManageAccountResponse();
		userMgmtManageAccountResponse.setSuccess( facadeResponse.isSuccess() );
		userMgmtManageAccountResponse.setDuplicateEmail( facadeResponse.isDuplicateEmail() );
		userMgmtManageAccountResponse.setDuplicateUsername( facadeResponse.isDuplicateUsername() );
		userMgmtManageAccountResponse.setUserIdNotFound( facadeResponse.isUserIdNotFound() );
		userMgmtManageAccountResponse.setUserDisabled( facadeResponse.isUserDisabled() );
		userMgmtManageAccountResponse.setCurrentPasswordRequired( facadeResponse.isCurrentPasswordRequired() );
		userMgmtManageAccountResponse.setCurrentPasswordInvalid( facadeResponse.isCurrentPasswordInvalid() );
		userMgmtManageAccountResponse.setErrorMessage( facadeResponse.getErrorMessage() );
		
		return userMgmtManageAccountResponse;
	}
	

	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtCentralWebappWebserviceAccessIF#searchUserDataByLastName(org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtSearchUserDataRequest)
	 */
	@Override
	public UserMgmtSearchUserDataResponse searchUserDataByLastName( UserMgmtSearchUserDataRequest userMgmtSearchUserDataRequest ) throws Exception {
		if ( ! instanceInitialized ) {
			throw new IllegalStateException( "Not initialized" );
		}
		SearchUserDataAccountFacadeRequest facadeRequest = new SearchUserDataAccountFacadeRequest();
		facadeRequest.setSearchString( userMgmtSearchUserDataRequest.getSearchString() );
		facadeRequest.setSearchStringExactMatch( userMgmtSearchUserDataRequest.isSearchStringExactMatch() );

		SearchUserDataAccountFacadeResponse facadeResponse = 
			userMgmtCentral_Embedded_Facade.searchUserDataByLastNameAccount( facadeRequest );

		UserMgmt_UserEnabled_RecheckCache.receivedIntervalFromUserMgmt( facadeResponse.getUserEnabledRecheckIntervalSeconds() );
		
		UserMgmtSearchUserDataResponse userMgmtSearchUserDataResponse = new UserMgmtSearchUserDataResponse();
		userMgmtSearchUserDataResponse.setSuccess( facadeResponse.isSuccess() );
		userMgmtSearchUserDataResponse.setErrorMessage( facadeResponse.getErrorMessage() );
		userMgmtSearchUserDataResponse.setUserIdList( facadeResponse.getUserIdList() );
		return userMgmtSearchUserDataResponse;
	}
	

	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtCentralWebappWebserviceAccessIF#searchUserDataByEmail(org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtSearchUserDataRequest)
	 */
	@Override
	public UserMgmtSearchUserDataResponse searchUserDataByEmail( UserMgmtSearchUserDataRequest userMgmtSearchUserDataRequest ) throws Exception {
		if ( ! instanceInitialized ) {
			throw new IllegalStateException( "Not initialized" );
		}
		SearchUserDataAccountFacadeRequest facadeRequest = new SearchUserDataAccountFacadeRequest();
		facadeRequest.setSearchString( userMgmtSearchUserDataRequest.getSearchString() );
		facadeRequest.setSearchStringExactMatch( userMgmtSearchUserDataRequest.isSearchStringExactMatch() );

		SearchUserDataAccountFacadeResponse facadeResponse = 
			userMgmtCentral_Embedded_Facade.searchUserDataByEmailAccount( facadeRequest );

		UserMgmt_UserEnabled_RecheckCache.receivedIntervalFromUserMgmt( facadeResponse.getUserEnabledRecheckIntervalSeconds() );
		
		UserMgmtSearchUserDataResponse userMgmtSearchUserDataResponse = new UserMgmtSearchUserDataResponse();
		userMgmtSearchUserDataResponse.setSuccess( facadeResponse.isSuccess() );
		userMgmtSearchUserDataResponse.setErrorMessage( facadeResponse.getErrorMessage() );
		userMgmtSearchUserDataResponse.setUserIdList( facadeResponse.getUserIdList() );
		return userMgmtSearchUserDataResponse;
	}


	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtCentralWebappWebserviceAccessIF#searchUserDataByEmailExactMatchNoUserSession(org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtSearchUserDataRequest)
	 */
	@Override
	public UserMgmtSearchUserDataResponse searchUserDataByEmailExactMatchNoUserSession( UserMgmtSearchUserDataRequest userMgmtSearchUserDataRequest ) throws Exception {
		if ( ! instanceInitialized ) {
			throw new IllegalStateException( "Not initialized" );
		}
		SearchUserDataAccountFacadeRequest facadeRequest = new SearchUserDataAccountFacadeRequest();
		facadeRequest.setSearchStringExactMatch(true);
		facadeRequest.setSearchString( userMgmtSearchUserDataRequest.getSearchString() );
		
		SearchUserDataAccountFacadeResponse facadeResponse = 
			userMgmtCentral_Embedded_Facade.searchUserDataByEmailAccount( facadeRequest );

		UserMgmt_UserEnabled_RecheckCache.receivedIntervalFromUserMgmt( facadeResponse.getUserEnabledRecheckIntervalSeconds() );
		
		UserMgmtSearchUserDataResponse userMgmtSearchUserDataResponse = new UserMgmtSearchUserDataResponse();
		userMgmtSearchUserDataResponse.setSuccess( facadeResponse.isSuccess() );
		userMgmtSearchUserDataResponse.setErrorMessage( facadeResponse.getErrorMessage() );
		userMgmtSearchUserDataResponse.setUserIdList( facadeResponse.getUserIdList() );
		return userMgmtSearchUserDataResponse;
	}


	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtCentralWebappWebserviceAccessIF#searchUserDataByUsernameExactMatchNoUserSession(org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtSearchUserDataRequest)
	 */
	@Override
	public UserMgmtSearchUserDataResponse searchUserDataByUsernameExactMatchNoUserSession( UserMgmtSearchUserDataRequest userMgmtSearchUserDataRequest ) throws Exception {
		if ( ! instanceInitialized ) {
			throw new IllegalStateException( "Not initialized" );
		}
		SearchUserDataAccountFacadeRequest facadeRequest = new SearchUserDataAccountFacadeRequest();
		facadeRequest.setSearchStringExactMatch(true);
		facadeRequest.setSearchString( userMgmtSearchUserDataRequest.getSearchString() );
		
		SearchUserDataAccountFacadeResponse facadeResponse = 
				userMgmtCentral_Embedded_Facade.searchUserDataByUserName( facadeRequest );

		UserMgmt_UserEnabled_RecheckCache.receivedIntervalFromUserMgmt( facadeResponse.getUserEnabledRecheckIntervalSeconds() );
		
		UserMgmtSearchUserDataResponse userMgmtSearchUserDataResponse = new UserMgmtSearchUserDataResponse();
		userMgmtSearchUserDataResponse.setSuccess( facadeResponse.isSuccess() );
		userMgmtSearchUserDataResponse.setErrorMessage( facadeResponse.getErrorMessage() );
		userMgmtSearchUserDataResponse.setUserIdList( facadeResponse.getUserIdList() );
		return userMgmtSearchUserDataResponse;
	}


}
