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
package org.yeastrc.limelight.limelight_webapp.searchers_results;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;

/**
 * Entry in list returned from 
 *
 */
public class ReportedPeptide_MinimalData_List_FromSearcher_Entry {
	
	private static final Logger log = LoggerFactory.getLogger( ReportedPeptide_MinimalData_List_FromSearcher_Entry.class );
	
	public static final int SIZE_OF_OBJECT_ON_HEAP = 
			( Integer.BYTES * 2 ) 
			+ 4 //  4 boolean
			+ 4;  // object overhead
	
	private static final int INTEGER_VALUE_NOT_SET = Integer.MIN_VALUE;
	

	private int reportedPeptideId;

	private boolean reportedPeptideHas_DynamicModifications;
	private boolean anyPsmHas_DynamicModifications;
	private boolean anyPsmHas_OpenModifications;
	private boolean anyPsmHas_ReporterIons;
	
	private int numPsms_IfComputedOrInDB = INTEGER_VALUE_NOT_SET;
	

	/**
	 * @return null if not set (was not computed)
	 */
	public Integer getNumPsms_IfComputedOrInDB() {
		if ( numPsms_IfComputedOrInDB == INTEGER_VALUE_NOT_SET ) {
			return null;
		}
		return numPsms_IfComputedOrInDB;
	}
	/**
	 * Throws LimelightInternalErrorException if passed Integer.MIN_VALUE
	 * @param numPsms_IfComputedOrInDB
	 * @throws LimelightInternalErrorException if passed Integer.MIN_VALUE
	 */
	public void setNumPsms_IfComputedOrInDB(int numPsms_IfComputedOrInDB) {
		if ( numPsms_IfComputedOrInDB == INTEGER_VALUE_NOT_SET ) {
			String msg = "setNumPsms_IfComputedOrInDB(...) called with value for numPsms_IfComputedOrInDB that is used for 'NOT SET' of: " + INTEGER_VALUE_NOT_SET;
			log.error( msg );
			throw new LimelightInternalErrorException(msg);
		}
		this.numPsms_IfComputedOrInDB = numPsms_IfComputedOrInDB;
	}
	
	public int getReportedPeptideId() {
		return reportedPeptideId;
	}
	public void setReportedPeptideId(int reportedPeptideId) {
		this.reportedPeptideId = reportedPeptideId;
	}
	public boolean isAnyPsmHas_ReporterIons() {
		return anyPsmHas_ReporterIons;
	}
	public void setAnyPsmHas_ReporterIons(boolean anyPsmHas_ReporterIons) {
		this.anyPsmHas_ReporterIons = anyPsmHas_ReporterIons;
	}
	public boolean isAnyPsmHas_DynamicModifications() {
		return anyPsmHas_DynamicModifications;
	}
	public void setAnyPsmHas_DynamicModifications(boolean anyPsmHas_DynamicModifications) {
		this.anyPsmHas_DynamicModifications = anyPsmHas_DynamicModifications;
	}
	public boolean isReportedPeptideHas_DynamicModifications() {
		return reportedPeptideHas_DynamicModifications;
	}
	public void setReportedPeptideHas_DynamicModifications(boolean reportedPeptideHas_DynamicModifications) {
		this.reportedPeptideHas_DynamicModifications = reportedPeptideHas_DynamicModifications;
	}
	public boolean isAnyPsmHas_OpenModifications() {
		return anyPsmHas_OpenModifications;
	}
	public void setAnyPsmHas_OpenModifications(boolean anyPsmHas_OpenModifications) {
		this.anyPsmHas_OpenModifications = anyPsmHas_OpenModifications;
	}
}
