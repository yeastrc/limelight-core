package org.yeastrc.limelight.limelight_feature_detection_run_import.utils;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.security.DigestInputStream;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.apache.commons.io.input.CountingInputStream;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;

/**
 * 
 * This is NOT a Spring Component.
 * 
 * This is NOT Thread Safe.
 * 
 * An Instance is created and fully used for a single webservice request or other single request Single Threaded.
 * 
 * Does NOT close input stream at end 
 * 
 * 
 */
public class Read_InputStream_Into_ASCII_CharacterString_OneLineAtATime_Util_NOT_Spring_Component {
	
//	private static final Logger log = LoggerFactory.getLogger( Read_InputStream_Into_ASCII_CharacterString_OneLineAtATime_Util_NOT_Spring_Component.class );
	
	private static final int BUFFER_SIZE = 1 * 1024; // * 1024 * 1024; //  1MB

	private static final String SHA_384_ALGORITHM = "SHA-384";
	private static final String SHA_1_ALGORITHM = "SHA1";
	
	/**
	 * Private Constructor
	 */
	private Read_InputStream_Into_ASCII_CharacterString_OneLineAtATime_Util_NOT_Spring_Component() {}
	
	/**
	 * @param inputStream
	 * @return
	 * @throws NoSuchAlgorithmException 
	 */
	public static Read_InputStream_Into_ASCII_CharacterString_OneLineAtATime_Util_NOT_Spring_Component getNewInstance(InputStream inputStream) throws NoSuchAlgorithmException {
		
		Read_InputStream_Into_ASCII_CharacterString_OneLineAtATime_Util_NOT_Spring_Component instance = new Read_InputStream_Into_ASCII_CharacterString_OneLineAtATime_Util_NOT_Spring_Component();
		
		instance.messageDigest_SHA_1_Of_StreamContents = MessageDigest.getInstance(SHA_1_ALGORITHM);
		instance.messageDigest_SHA_384_Of_StreamContents = MessageDigest.getInstance(SHA_384_ALGORITHM);
		
//		instance.inputStream = inputStream;

		BufferedInputStream bis = new BufferedInputStream(inputStream, BUFFER_SIZE);

		instance.countingInputStream = new CountingInputStream(bis);
		
		DigestInputStream digestInputStream_SHA_1 = new DigestInputStream( instance.countingInputStream, instance.messageDigest_SHA_1_Of_StreamContents );
		DigestInputStream digestInputStream_SHA_384 = new DigestInputStream( digestInputStream_SHA_1, instance.messageDigest_SHA_384_Of_StreamContents );
		
		instance.inputStreamReader_ASCII = new InputStreamReader(digestInputStream_SHA_384, StandardCharsets.US_ASCII );
		
		instance.bufferedReader = new BufferedReader(instance.inputStreamReader_ASCII, BUFFER_SIZE );
		
		return instance;
	}
	
//	private InputStream inputStream;
	
	private CountingInputStream countingInputStream;

	private MessageDigest messageDigest_SHA_1_Of_StreamContents;
	private MessageDigest messageDigest_SHA_384_Of_StreamContents;

	private InputStreamReader inputStreamReader_ASCII;
	
	private BufferedReader bufferedReader;
	
	/**
	 * @return null when end of stream
	 * @throws IOException 
	 */
	public String readNextLine() throws IOException {
		
		String line = bufferedReader.readLine();
		
		return line;
	}
	
	/**
	 * 
	 * @return Number of Bytes read so far, including buffered beyond last returned string
	 */
	public long getBytesRead() {
		
		return countingInputStream.getByteCount();
	}

	/**
	 * !!!  ONLY call messageDigest_SHA_1_Of_StreamContents.digest()  after the while input stream is fully processed
	 * @return
	 */
	public MessageDigest get_messageDigest_SHA_1_Of_StreamContents( ) {
		return messageDigest_SHA_1_Of_StreamContents;
	}
	/**
	 * !!!  ONLY call messageDigest_SHA_1_Of_StreamContents.digest()  after the while input stream is fully processed
	 * @return
	 */
	public MessageDigest get_messageDigest_SHA_384_Of_StreamContents() {
		return messageDigest_SHA_384_Of_StreamContents;
	}
}
