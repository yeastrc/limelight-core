package org.yeastrc.limelight.limelight_webapp.web_utils;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.zip.GZIPOutputStream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/**
 * GZIP the input byte array and return byte array
 *
 */
@Component
public class Gzip_ByteArray_To_ByteArray implements Gzip_ByteArray_To_ByteArray_IF {
	
	private static final Logger log = LoggerFactory.getLogger( Gzip_ByteArray_To_ByteArray.class );
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.web_utils.Gzip_ByteArray_To_ByteArray_IF#gzip_ByteArray_To_ByteArray(byte[])
	 */
	@Override
	public byte[] gzip_ByteArray_To_ByteArray( byte[] bytesToGZIP ) throws IOException {
		

		 ByteArrayOutputStream baos = new ByteArrayOutputStream();
		
		 try ( GZIPOutputStream os = new GZIPOutputStream( baos ) ) {
			 os.write(bytesToGZIP);
		 }
		 baos.close();
		 
		 byte[] result = baos.toByteArray();
		 
		 return result;
	}

}
