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
package org.yeastrc.limelight.limelight_shared.dto;

import java.util.Arrays;

/**
 * fasta_file_statistics_tbl table
 */
public class FastaFileStatisticsDTO {

	private int id;
	private int numTargets;
	private int numDecoys;
	private int numIndependentDecoys;

	private byte[] sha_384_Sum;

	@Override
	public String toString() {
		return "FastaFileStatisticsDTO [id=" + id + ", numTargets=" + numTargets + ", numDecoys=" + numDecoys
				+ ", numIndependentDecoys=" + numIndependentDecoys + ", sha_384_Sum=" + Arrays.toString(sha_384_Sum)
				+ "]";
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getNumTargets() {
		return numTargets;
	}

	public void setNumTargets(int numTargets) {
		this.numTargets = numTargets;
	}

	public int getNumDecoys() {
		return numDecoys;
	}

	public void setNumDecoys(int numDecoys) {
		this.numDecoys = numDecoys;
	}

	public int getNumIndependentDecoys() {
		return numIndependentDecoys;
	}

	public void setNumIndependentDecoys(int numIndependentDecoys) {
		this.numIndependentDecoys = numIndependentDecoys;
	}

	public byte[] getSha_384_Sum() {
		return sha_384_Sum;
	}

	public void setSha_384_Sum(byte[] sha_384_Sum) {
		this.sha_384_Sum = sha_384_Sum;
	}
	
}

