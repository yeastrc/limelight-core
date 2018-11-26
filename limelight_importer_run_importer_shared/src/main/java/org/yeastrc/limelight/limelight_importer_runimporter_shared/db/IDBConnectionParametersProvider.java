package org.yeastrc.limelight.limelight_importer_runimporter_shared.db;

/**
 * Interface that the class that provides DB connection parameters must implement
 * 
 * 
 *
 */
public interface IDBConnectionParametersProvider {

	/**
	 * Called before any values are retrieved
	 */
	public void init() throws Exception;
	
	
	/**
	 * Username to use to log into DB
	 * 
	 * @return
	 */
	public String getUsername();
	
	/**
	 * Password to use to log into DB
	 * @return
	 */
	public String getPassword();
	
	/**
	 * URL of machine that DB running on.  DO NOT include the ":" and the port
	 * This will likely be an IP address, a DNS name, or "localhost"
	 * @return
	 */
	public String getDBURL();
	
	/**
	 * Port that DB is listening on.  Return null to use MySQL default of '3306'
	 * @return
	 */
	public String getDBPort();
	

	/**
	 * Database name for 'limelight'.  Return null to use Importer default of 'limelight'
	 * @return
	 */
	public String getLimelightDbName();

}
