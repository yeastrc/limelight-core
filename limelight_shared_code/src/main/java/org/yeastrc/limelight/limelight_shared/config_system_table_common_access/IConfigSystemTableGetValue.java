package org.yeastrc.limelight.limelight_shared.config_system_table_common_access;

public interface IConfigSystemTableGetValue {

	/**
	 * @param configKey
	 * @return null if not found
	 * @throws Exception
	 */
	public String getConfigValueForConfigKey( String configKey ) throws Exception;

}
