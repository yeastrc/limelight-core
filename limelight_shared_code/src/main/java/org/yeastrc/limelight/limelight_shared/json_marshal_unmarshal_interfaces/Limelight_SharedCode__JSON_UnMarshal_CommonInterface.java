package org.yeastrc.limelight.limelight_shared.json_marshal_unmarshal_interfaces;

public interface Limelight_SharedCode__JSON_UnMarshal_CommonInterface {

	public <T> T getObjectFromJSONByteArray( byte[] bytesJSON, Class<T> valueType ) throws Exception;
	
	public <T> T getObjectFromJSONString( String stringJSON, Class<T> valueType ) throws Exception;
}
