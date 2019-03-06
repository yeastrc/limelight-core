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
package org.yeastrc.limelight.limelight_webapp.database_update_with_transaction_services;

import org.slf4j.LoggerFactory;

import java.util.List;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.yeastrc.limelight.limelight_webapp.dao.UrlShortenerAssocProjectSearchIdDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.UrlShortenerDAO.LogDuplicateSQLException;
import org.yeastrc.limelight.limelight_webapp.dao.UrlShortenerDAO_IF;
import org.yeastrc.limelight.limelight_webapp.db_dto.UrlShortenerAssocProjectSearchIdDTO;
import org.yeastrc.limelight.limelight_webapp.db_dto.UrlShortenerDTO;

/**
 * Add all records to the DB for adding a Share Page.
 * 
 * !!!!  Important.  This cannot throw checked exceptions.  Otherwise Spring will not roll back the transaction
 *
 */
@Service
public class UrlShortener_Insert_UsingDBTransactionService implements UrlShortener_Insert_UsingDBTransactionServiceIF {

	private static final Logger log = LoggerFactory.getLogger( UrlShortener_Insert_UsingDBTransactionService.class );
	
	@Autowired
	private UrlShortenerDAO_IF urlShortenerDAO;
	
	@Autowired
	private UrlShortenerAssocProjectSearchIdDAO_IF urlShortenerAssocProjectSearchIdDAO;
	
	/**
	 * Transactional is private to support retry if timing issue
	 * 
	 * 
	 * @param item
	 * @param children
	 */
	
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED)  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring DB Transactions
	
	public void addUrlShortener( 
			UrlShortenerDTO item, 
			List<UrlShortenerAssocProjectSearchIdDTO> children,
			LogDuplicateSQLException logDuplicateSQLException ) { //  No 'Throws' allowed due to 
		
		try {
			urlShortenerDAO.save( item, null );
			
			for ( UrlShortenerAssocProjectSearchIdDTO child : children ) {
				
				child.setUrlShortenerId( item.getId() );
				urlShortenerAssocProjectSearchIdDAO.save( child );
			}

		} catch ( org.springframework.dao.DuplicateKeyException e ) {

			if ( logDuplicateSQLException == LogDuplicateSQLException.TRUE ) {
				String msg = "fail addUrlShortener(...)";
				log.error( msg, e );
				throw e;
			}
		} catch ( RuntimeException e ) {
			String msg = "fail addUrlShortener(...)";
			log.error( msg, e );
			throw e;

		} catch (Exception e ) {
			String msg = "fail addUrlShortener(...)";
			log.error( msg, e );
			throw new RuntimeException( e );
		}
		
	}

}
