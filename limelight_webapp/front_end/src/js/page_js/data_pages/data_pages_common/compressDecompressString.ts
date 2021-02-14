/**
 * compressDecompressString.ts
 * 
 * Javascript for Compress/Decompress a string
 * 
 * Uses static/js/libs/lz-string/lz-string.min.js
 * 
 */



//JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////


// @ts-ignore
import { LZString } from 'libs/lz-string/lz-string.js';

/**
 * 
 */
class StringCompressDecompress {

	/**
	 * 
	 */
	constructor() {}
	
	/**
	 * Uses LZString.decompressFromEncodedURIComponent
	 * 
	 * return null if unable to decompress
	 * LZString.decompressFromEncodedURIComponent may throw exceptions
	 */
	decompress( dataStringCompressed: any ) {
		try {
			//  LZString.decompressFromEncodedURIComponent(...) returns null if unable to decompress
			let dataStringDecompressedDecodeURIComponent = LZString.decompressFromEncodedURIComponent( dataStringCompressed );
			return dataStringDecompressedDecodeURIComponent;
		} catch( e ) {
			throw e;
		}
	}
	
	/**
	 * Uses LZString.compressToEncodedURIComponent
	 * 
	 * LZString.compressToEncodedURIComponent may throw exceptions
	 */
	compress( dataString: any ) {
		try {
			let dataStringCompressedDecodeURIComponent = LZString.compressToEncodedURIComponent( dataString );
			return dataStringCompressedDecodeURIComponent;
		} catch( e ) {
			throw e;
		}
	}
}

export { StringCompressDecompress }
