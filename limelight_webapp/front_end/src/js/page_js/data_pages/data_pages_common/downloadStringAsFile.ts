
//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

import { saveAs } from 'file-saver/FileSaver';

/**
 * 
 */
export class StringDownloadUtils {
    
    static downloadStringAsFile( { stringToDownload, filename } ) {

        var blob = new Blob([ stringToDownload ], {type: "text/plain;charset=ISO-8859-1"});
		saveAs(blob, filename);

    }
    
}