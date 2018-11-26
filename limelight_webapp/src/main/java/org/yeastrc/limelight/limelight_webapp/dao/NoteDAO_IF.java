package org.yeastrc.limelight.limelight_webapp.dao;

import java.sql.SQLException;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.yeastrc.limelight.limelight_webapp.db_dto.NoteDTO;

public interface NoteDAO_IF {

	/**
	 * Get the project id for id
	 * 
	 * @param id
	 * @return null if not found
	 * @throws Exception
	 */
	Integer getProjectIdForId(int id) throws SQLException;


	/////////////

	/**
	 * Get the create user id for id
	 * 
	 * @param id
	 * @return null if not found
	 * @throws Exception
	 */
	Integer getCreatedUserIdForId( int id ) throws SQLException;
	
	/**
	 * @param item
	 */
	void save(NoteDTO item);

	/**
	 * @param noteText
	 * @param id
	 * @param userId
	 */
	//  Spring DB Transactions

	void updateNoteText(String noteText, int id, int userId);
	
	/**
	 * @param id
	 */
	void delete( int id );

}