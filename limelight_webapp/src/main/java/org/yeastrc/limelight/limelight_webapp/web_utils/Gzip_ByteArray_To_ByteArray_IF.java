package org.yeastrc.limelight.limelight_webapp.web_utils;

import java.io.IOException;

public interface Gzip_ByteArray_To_ByteArray_IF {

	/**
	 * GZIP the input byte array and return byte array
	 * 
	 * @param bytesToGZIP
	 * @return
	 * @throws IOException 
	 */
	byte[] gzip_ByteArray_To_ByteArray(byte[] bytesToGZIP) throws IOException;

}