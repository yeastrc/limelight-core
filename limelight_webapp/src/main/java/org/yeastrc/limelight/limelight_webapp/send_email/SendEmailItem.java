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
package org.yeastrc.limelight.limelight_webapp.send_email;

/**
 * What to send
 *
 */
public class SendEmailItem {

	private String toEmailAddress;
	private String fromEmailAddress;
	private String emailSubject;
	private String emailBody;
	
	//  Normally NOT Set
	
	//  Override main settings in config table
	private String smtpServerHost_Override_NORMALLY_NOT_SET;
	private String smtpServerPort_Override_NORMALLY_NOT_SET;
	private String smtpAuthUsername_Override_NORMALLY_NOT_SET;
	private String smtpAuthPassword_Override_NORMALLY_NOT_SET;
	
	@Override
	public String toString() {
		return "SendEmailItem [toEmailAddress=" + toEmailAddress + ", fromEmailAddress=" + fromEmailAddress
				+ ", emailSubject=" + emailSubject + ", emailBody=" + emailBody
				+ ", smtpServerHost_Override_NORMALLY_NOT_SET=" + smtpServerHost_Override_NORMALLY_NOT_SET
				+ ", smtpServerPort_Override_NORMALLY_NOT_SET=" + smtpServerPort_Override_NORMALLY_NOT_SET
				+ ", smtpAuthUsername_Override_NORMALLY_NOT_SET=" + smtpAuthUsername_Override_NORMALLY_NOT_SET
				+ ", smtpAuthPassword_Override_NORMALLY_NOT_SET=" + smtpAuthPassword_Override_NORMALLY_NOT_SET + "]";
	}
	
	public String getSmtpAuthUsername_Override_NORMALLY_NOT_SET() {
		return smtpAuthUsername_Override_NORMALLY_NOT_SET;
	}
	public void setSmtpAuthUsername_Override_NORMALLY_NOT_SET(String smtpAuthUsername_Override_NORMALLY_NOT_SET) {
		this.smtpAuthUsername_Override_NORMALLY_NOT_SET = smtpAuthUsername_Override_NORMALLY_NOT_SET;
	}
	public String getSmtpAuthPassword_Override_NORMALLY_NOT_SET() {
		return smtpAuthPassword_Override_NORMALLY_NOT_SET;
	}
	public void setSmtpAuthPassword_Override_NORMALLY_NOT_SET(String smtpAuthPassword_Override_NORMALLY_NOT_SET) {
		this.smtpAuthPassword_Override_NORMALLY_NOT_SET = smtpAuthPassword_Override_NORMALLY_NOT_SET;
	}
	public String getSmtpServerHost_Override_NORMALLY_NOT_SET() {
		return smtpServerHost_Override_NORMALLY_NOT_SET;
	}
	public void setSmtpServerHost_Override_NORMALLY_NOT_SET(String smtpServerHost_Override_NORMALLY_NOT_SET) {
		this.smtpServerHost_Override_NORMALLY_NOT_SET = smtpServerHost_Override_NORMALLY_NOT_SET;
	}
	public String getSmtpServerPort_Override_NORMALLY_NOT_SET() {
		return smtpServerPort_Override_NORMALLY_NOT_SET;
	}
	public void setSmtpServerPort_Override_NORMALLY_NOT_SET(String smtpServerPort_Override_NORMALLY_NOT_SET) {
		this.smtpServerPort_Override_NORMALLY_NOT_SET = smtpServerPort_Override_NORMALLY_NOT_SET;
	}
	public String getToEmailAddress() {
		return toEmailAddress;
	}
	public void setToEmailAddress(String toEmailAddress) {
		this.toEmailAddress = toEmailAddress;
	}
	public String getFromEmailAddress() {
		return fromEmailAddress;
	}
	public void setFromEmailAddress(String fromEmailAddress) {
		this.fromEmailAddress = fromEmailAddress;
	}
	public String getEmailSubject() {
		return emailSubject;
	}
	public void setEmailSubject(String emailSubject) {
		this.emailSubject = emailSubject;
	}
	public String getEmailBody() {
		return emailBody;
	}
	public void setEmailBody(String emailBody) {
		this.emailBody = emailBody;
	}

}
