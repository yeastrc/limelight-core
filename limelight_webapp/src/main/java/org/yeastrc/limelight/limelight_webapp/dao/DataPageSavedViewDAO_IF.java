package org.yeastrc.limelight.limelight_webapp.dao;

import java.sql.SQLException;

import org.yeastrc.limelight.limelight_webapp.db_dto.DataPageSavedViewDTO;

public interface DataPageSavedViewDAO_IF {

	/**
	 * @param url
	 * @return
	 * @throws SQLException
	 */
	Integer getFirstIdByURL( String url ) throws SQLException;


	/**
	 * Return the numeric fields for id
	 * 
	 * @param id
	 * @return null if not found, only the numeric fields
	 * @throws SQLException
	 */
	DataPageSavedViewDTO getNumericFieldsById( int id ) throws SQLException;
	
	/**
	 * Return the label for id
	 * 
	 * @param id
	 * @return
	 * @throws SQLException
	 */
	String getLabelById( int id ) throws SQLException;
	
	/**
	 * Return the single_project_search_id__default_view for id
	 * 
	 * @param id
	 * @return null if not found or field is null
	 * @throws SQLException
	 */
	Integer get_SingleProjectSearchIdDefaultView_ById( int id ) throws SQLException;
	

	/**
	 * Return the URL for project search id and controller path
	 * 
	 * @param projectSearchId
	 * @return null if not found
	 * @throws SQLException
	 */
	String getURL_ByProjectSearchIdControllerPath( int projectSearchId, String controllerPath ) throws SQLException;
		
	/**
	 * @param item
	 */
	void save(DataPageSavedViewDTO item);
	
	/**
	 * @param label
	 * @param id
	 */
	void updateLabel( String label, int userId, int id );

	/**
	 * @param projectSearchId
	 * @param id
	 */
	void updateSingleProjectSearchIdDefaultView(int projectSearchId, int userId, int id);

	/**
	 * @param projectSearchId
	 */
	void clearAllSingleProjectSearchIdDefaultView_ForProjectSearchId(int projectSearchId, String pageControllerPath);
	
	/**
	 * @param id
	 */
	void delete( int id );
	
	/**
	 * Delete all records that have join record in data_page_saved_view_assoc_project_search_id_tbl with project_search_id = ?
	 * @param projectSearchId
	 */
	void deleteForProjectSearchId( int projectSearchId );

}