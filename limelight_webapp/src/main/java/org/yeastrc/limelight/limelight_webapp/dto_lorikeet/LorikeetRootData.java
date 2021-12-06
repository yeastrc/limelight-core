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
package org.yeastrc.limelight.limelight_webapp.dto_lorikeet;

import java.util.ArrayList;
import java.util.List;

/**
 * 
 *
 */
public class LorikeetRootData {

	/**
	 * Filename for display
	 */
	private String fileName;

	/**
	 * Scan Number
	 */
	private int scanNum;

	/**
	 * Each sublist is one peak with [<mz>,intensity]
	 */
	private List<List<Object>> peaks;
	
	/**
	 * Each sublist is one peak with [<mz>,intensity]
	 */
	private List<List<Object>> ms1peaks;


	/**
	 * Static Mods 
	 */
	private List<LorikeetStaticMod> staticMods; 

	
//	jpeak.add( peak.getMz() );
//	jpeak.add( peak.getIntensity() );
//
//	    private float mz;
//    private float intensity;

    /**
     * Add to "peaks" list
     * @param mz
     * @param intensity
     */
    public void addPeak( double mz, float intensity ) {
    	
    	if ( peaks == null ) {
    		
    		peaks = new ArrayList<List<Object>>();
    	}
    	
    	List<Object> peakItem = new ArrayList<>();
    	
    	peakItem.add( mz );
    	peakItem.add( intensity );
    	
    	peaks.add( peakItem );
    }
    

    /**
     * Add to "ms1peaks" list
     * @param mz
     * @param intensity
     */
    public void addMs1Peak( double mz, float intensity ) {
    	
    	if ( ms1peaks == null ) {
    		
    		ms1peaks = new ArrayList<List<Object>>();
    	}
    	
    	List<Object> peakItem = new ArrayList<>();
    	
    	peakItem.add( mz );
    	peakItem.add( intensity );
    	
    	ms1peaks.add( peakItem );
    }

    
	/**
	 * Each sublist is one peak with [<mz>,intensity]
	 * @return
	 */
	public List<List<Object>> getMs1peaks() {
		return ms1peaks;
	}

	/**
	 * Each sublist is one peak with [<mz>,intensity]
	 * @param ms1peaks
	 */
	public void setMs1peaks(List<List<Object>> ms1peaks) {
		this.ms1peaks = ms1peaks;
	}

	
	
	/**
	 * Filename for display
	 * @return
	 */
	public String getFileName() {
		return fileName;
	}

	/**Filename for display
	 * 
	 * @param fileName
	 */
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

    /**
     * Scan Number
     * @return
     */
    public int getScanNum() {
		return scanNum;
	}

	/**
	 * Scan Number
	 * @param scanNum
	 */
	public void setScanNum(int scanNum) {
		this.scanNum = scanNum;
	}
	
	public List<LorikeetStaticMod> getStaticMods() {
		return staticMods;
	}


	public void setStaticMods(List<LorikeetStaticMod> staticMods) {
		this.staticMods = staticMods;
	}
	
	
	public List<List<Object>> getPeaks() {
		return peaks;
	}


	public void setPeaks(List<List<Object>> peaks) {
		this.peaks = peaks;
	}
}



//lorikeetOptions: Object
//charge: 0
//height: 500
//peaks: Array[15026]
//precursorMz: "927.475524902"
//sequence: "KPAVAVSSQQMESCR"
//variableMods: Array[0]
//width: 500