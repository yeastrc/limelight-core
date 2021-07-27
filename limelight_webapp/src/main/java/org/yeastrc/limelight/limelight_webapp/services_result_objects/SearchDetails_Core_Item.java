package org.yeastrc.limelight.limelight_webapp.services_result_objects;

import java.util.List;

import org.yeastrc.limelight.limelight_shared.dto.SearchProgramsPerSearchDTO;

public class SearchDetails_Core_Item {

	private int projectSearchId;
	private String path;
	private String fastaFilename;
	private String formattedLoadTime;

	//  Converter Program Info
	
	private String converterProgram_Name;
	private String converterProgram_Version;
	
	private String converterProgram_Pgm_URI;
	private String converterProgram_Pgm_Arguments;
	private String formatted_converterProgram_ConversionDate;
	
	private List<SearchProgramsPerSearchDTO> searchProgramsPerSearchList;
	
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
	public List<SearchProgramsPerSearchDTO> getSearchProgramsPerSearchList() {
		return searchProgramsPerSearchList;
	}
	public void setSearchProgramsPerSearchList(List<SearchProgramsPerSearchDTO> searchProgramsPerSearchList) {
		this.searchProgramsPerSearchList = searchProgramsPerSearchList;
	}
	public String getFormattedLoadTime() {
		return formattedLoadTime;
	}
	public void setFormattedLoadTime(String formattedLoadTime) {
		this.formattedLoadTime = formattedLoadTime;
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
	public String getFormatted_converterProgram_ConversionDate() {
		return formatted_converterProgram_ConversionDate;
	}
	public void setFormatted_converterProgram_ConversionDate(String formatted_converterProgram_ConversionDate) {
		this.formatted_converterProgram_ConversionDate = formatted_converterProgram_ConversionDate;
	}
}
