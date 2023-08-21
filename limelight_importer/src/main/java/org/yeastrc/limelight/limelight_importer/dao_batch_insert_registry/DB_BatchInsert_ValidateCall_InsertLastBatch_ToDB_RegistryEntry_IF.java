package org.yeastrc.limelight.limelight_importer.dao_batch_insert_registry;

/**
 * Interface for class that will register with DB_BatchInsert_ValidateCall_InsertLastBatch_Registry
 * 
 * Validate that 'insert_LAST_Batch_ToDB()' method has been called
 *
 */
public interface DB_BatchInsert_ValidateCall_InsertLastBatch_ToDB_RegistryEntry_IF {

	/**
	 * @return true if 'insert_LAST_Batch_ToDB()' method has been called
	 */
	boolean has_InsertLastBatch_ToDB_HasBeenCalled();
}
