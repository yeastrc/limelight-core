/**
 * projectPage_CommonOverall.ts
 * 
 * Javascript for projectView.jsp page  
 * 
 * Common Overall JS across User Types 
 * 
 * 
 */


/**
 * 
 */
export class ProjectPage_CommonOverall {

	private _initializeCalled: boolean

	/**
	 * 
	 */
	constructor() {

		this._initializeCalled = false;
	}

	/**
	 * 
	 */
	initialize() {

        this._initializeCalled = true;
    }

}
