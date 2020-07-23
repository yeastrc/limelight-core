package org.yeastrc.limelight.limelight_webapp.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;
import org.yeastrc.limelight.limelight_webapp.dao.DataPageDefaultViewProjectSearchPagesDAO_IF;
import org.yeastrc.limelight.limelight_webapp.db_dto.DataPageDefaultViewProjectSearchPagesDTO;

/**
 * Add all records to the DB for adding a Set Default View.
 * 
 * Wrapper class for DAO
 * to execute Update if Insert fails outside the DB transaction
 * 
 * 
 *
 */
@Service
public class SetDefaultView_ProjectSearchPages_Insert_Service implements SetDefaultView_ProjectSearchPages_Insert_Service_IF {

	private static final Logger log = LoggerFactory.getLogger( SetDefaultView_ProjectSearchPages_Insert_Service.class );
	
	@Autowired
	private DataPageDefaultViewProjectSearchPagesDAO_IF dataPageDefaultViewProjectSearchPagesDAO;
	
	/**
	 * @param item
	 * @throws SQLException 
	 */
	
	@Override
	public void setDefaultView( DataPageDefaultViewProjectSearchPagesDTO item )  {  
		
		try {
			dataPageDefaultViewProjectSearchPagesDAO.save( item );

			return; // Exit method

		} catch ( DuplicateKeyException e ) {
			
			//  Already exists so update

			dataPageDefaultViewProjectSearchPagesDAO.update_UrlStartPath_And_SrchDataLkpParams( item );
		}

	}
	
}
