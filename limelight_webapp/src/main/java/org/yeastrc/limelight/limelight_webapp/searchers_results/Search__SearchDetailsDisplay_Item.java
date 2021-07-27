package org.yeastrc.limelight.limelight_webapp.searchers_results;

import java.util.Date;

/**
 * Result item from Search__SearchDetailsDisplay_ForProjectSearchIdsSearcher
 *
 */
public class Search__SearchDetailsDisplay_Item {

	private int projectSearchId;
	private int searchId;
	private String path;
	private String fastaFilename;
	private Date importEndTimestamp;
	
	//  Converter Program Info
	
	private String converterProgram_Name;
	private String converterProgram_Version;
	
	private String converterProgram_Pgm_URI;
	private String converterProgram_Pgm_Arguments;
	private Date converterProgram_ConversionDate;
	
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	public String getFastaFilename() {
		return fastaFilename;
	}
	public void setFastaFilename(String fastaFilename) {
		this.fastaFilename = fastaFilename;
	}
	public int getProjectSearchId() {
		return projectSearchId;
	}
	public void setProjectSearchId(int projectSearchId) {
		this.projectSearchId = projectSearchId;
	}
	public int getSearchId() {
		return searchId;
	}
	public void setSearchId(int searchId) {
		this.searchId = searchId;
	}
	public Date getImportEndTimestamp() {
		return importEndTimestamp;
	}
	public void setImportEndTimestamp(Date importEndTimestamp) {
		this.importEndTimestamp = importEndTimestamp;
	}
	public String getConverterProgram_Name() {
		return converterProgram_Name;
	}
	public void setConverterProgram_Name(String converterProgram_Name) {
		this.converterProgram_Name = converterProgram_Name;
	}
	public String getConverterProgram_Version() {
		return converterProgram_Version;
	}
	public void setConverterProgram_Version(String converterProgram_Version) {
		this.converterProgram_Version = converterProgram_Version;
	}
	public String getConverterProgram_Pgm_URI() {
		return converterProgram_Pgm_URI;
	}
	public void setConverterProgram_Pgm_URI(String converterProgram_Pgm_URI) {
		this.converterProgram_Pgm_URI = converterProgram_Pgm_URI;
	}
	public String getConverterProgram_Pgm_Arguments() {
		return converterProgram_Pgm_Arguments;
	}
	public void setConverterProgram_Pgm_Arguments(String converterProgram_Pgm_Arguments) {
		this.converterProgram_Pgm_Arguments = converterProgram_Pgm_Arguments;
	}
	public Date getConverterProgram_ConversionDate() {
		return converterProgram_ConversionDate;
	}
	public void setConverterProgram_ConversionDate(Date converterProgram_ConversionDate) {
		this.converterProgram_ConversionDate = converterProgram_ConversionDate;
	}
}
