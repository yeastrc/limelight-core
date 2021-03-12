package org.yeastrc.limelight.limelight_webapp.web_utils;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.zip.GZIPInputStream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/**
 * GUNZIP the input byte array and return byte array
 *
 */
@Component
public class GUNzip_ByteArray_To_ByteArray implements GUNzip_ByteArray_To_ByteArray_IF  {
	
	private static final Logger log = LoggerFactory.getLogger( GUNzip_ByteArray_To_ByteArray.class );
	
	
	/**
	 * @param bytesToGUNZIP
	 * @return
	 * @throws IOException
	 */
	@Override
	public byte[] gUNzip_ByteArray_To_ByteArray( byte[] bytesToGUNZIP ) throws IOException {
		
		 ByteArrayOutputStream outBAOS = new ByteArrayOutputStream( bytesToGUNZIP.length * 5 );

		 ByteArrayInputStream bais = new ByteArrayInputStream(bytesToGUNZIP);
		
		 try ( GZIPInputStream is = new GZIPInputStream( bais ) ) {

			 byte[] buffer = new byte[1024];
			 int len;
			 while ((len = is.read(buffer)) > 0) {
				 outBAOS.write(buffer, 0, len);
			 }
		 }

		 outBAOS.close();
		 
		 byte[] result = outBAOS.toByteArray();
		 
		 return result;
	}

}
