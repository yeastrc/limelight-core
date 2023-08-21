package org.yeastrc.limelight.limelight_importer.dao_batch_insert_registry;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterInternalException;

/**
 * Registry to ensure all Batch Insert objects have their 'insert_LAST_Batch_ToDB()' method called
 *
 */
public class DB_BatchInsert_ValidateCall_InsertLastBatch_ToDB_Registry {

	private static final Logger log = LoggerFactory.getLogger( DB_BatchInsert_ValidateCall_InsertLastBatch_ToDB_Registry.class );
	

	private static final int INSERT_BATCH_SIZE = 4000;

	
	private DB_BatchInsert_ValidateCall_InsertLastBatch_ToDB_Registry() { }
	public static DB_BatchInsert_ValidateCall_InsertLastBatch_ToDB_Registry getSingletonInstance() { 
		return singletonInstance;
	}

	private static DB_BatchInsert_ValidateCall_InsertLastBatch_ToDB_Registry singletonInstance = new DB_BatchInsert_ValidateCall_InsertLastBatch_ToDB_Registry();
	
	private List<DB_BatchInsert_ValidateCall_InsertLastBatch_ToDB_RegistryEntry_IF> registryEntry_List = new ArrayList<>();
	
	
	/**
	 * @param registryEntry
	 */
	public void register( DB_BatchInsert_ValidateCall_InsertLastBatch_ToDB_RegistryEntry_IF registryEntry ) {
		
		registryEntry_List.add(registryEntry);
	}
	
	/**
	 * Throws Exception if error
	 * 
	 * @throws LimelightImporterInternalException 
	 */
	public void validateAllCalled_InsertLastBatch_ToDB() throws LimelightImporterInternalException {
		
		for ( DB_BatchInsert_ValidateCall_InsertLastBatch_ToDB_RegistryEntry_IF registryEntry : registryEntry_List ) {
			
			if ( ! registryEntry.has_InsertLastBatch_ToDB_HasBeenCalled() ) {
				
				String msg = "INTERNAL ERROR: 'insert_LAST_Batch_ToDB()' has NOT been called on class " + registryEntry.getClass().getCanonicalName();
				log.error(msg);
				throw new LimelightImporterInternalException(msg);
			}
		}
	}
}
