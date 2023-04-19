package org.yeastrc.limelight.limelight_importer.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.security.MessageDigest;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;


/**
 * 
 *
 */
public class SHA1SumCalculator {

	private static final Logger log = LoggerFactory.getLogger( SHA1SumCalculator.class );
	
	private static String fakeSHA1Sum = null;
	
	public static String getFakeSHA1Sum() {
		return fakeSHA1Sum;
	}
	/**
	 * Used to override the computation
	 * @param fakeSHA1Sum
	 */
	public static void setFakeSHA1Sum(String fakeSHA1Sum) {
		SHA1SumCalculator.fakeSHA1Sum = fakeSHA1Sum;
	}
	
	
	private SHA1SumCalculator() { }
	public static SHA1SumCalculator getInstance() { 
		return new SHA1SumCalculator(); 
	}

	public String getSHA1Sum( File f ) throws Exception {

		if ( log.isInfoEnabled() ) {

			log.info( "Computing SHA1 Sum for file: " + f.getAbsolutePath() );
		}
		
		if ( fakeSHA1Sum != null ) {
			
			return fakeSHA1Sum;
		}
		
		try ( FileInputStream fis = new FileInputStream( f ) ) {
			
			String result = this.getSHA1Sum_ForInputStream(fis);

			if ( log.isInfoEnabled() ) {

				log.info( "SHA1 Sum for file: " + f.getAbsolutePath() + " is: " + result );
			}
			
			return result;
		}
	}
	
	public String getSHA1Sum_ForInputStream( InputStream inputStream ) throws Exception {

		MessageDigest md = MessageDigest.getInstance("SHA1");
		byte[] dataBytes = new byte[1024];

		int nread = 0; 

		while ((nread = inputStream.read(dataBytes)) != -1) {
			md.update(dataBytes, 0, nread);
		};

		byte[] mdbytes = md.digest();

		//convert the byte to hex format
		StringBuffer sb = new StringBuffer("");
		for (int i = 0; i < mdbytes.length; i++) {
			sb.append(Integer.toString((mdbytes[i] & 0xff) + 0x100, 16).substring(1));
		}

		String result = sb.toString();

		return result;
	}
	
}
