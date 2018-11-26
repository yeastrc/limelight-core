package org.yeastrc.limelight.limelight_webapp.dto_lorikeet;

/**
 * Response from LorikeetSpectrumService
 *
 */
public class LorikeetGetSpectrumServiceResult {

	private String status;
	
	private LorikeetRootData data;


	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public LorikeetRootData getData() {
		return data;
	}
	public void setData(LorikeetRootData data) {
		this.data = data;
	}
}
