/**
 * navigation_dataPages_Maint.ts
 * 
 * Javascript:   Set/Update Navigation Links between Data Pages
 * 
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

//  module import 

import { createRoot as createRoot_ReactDOM_Client } from "react-dom/client";

import {navigation_dataPages_Maint_Component_Create_JSX} from "page_js/data_pages/data_pages_common/navigation_data_pages_maint/navigation_dataPages_Maint_Component_Create_JSX";
import {
	Navigation_dataPages_Maint__NavigationType_Enum, Navigation_dataPages_Maint_Root_Component_Props_PropsValue
} from "page_js/data_pages/data_pages_common/navigation_data_pages_maint/navigation_dataPages_Maint_Component";

/**
 * 
 */
class Navigation_dataPages_Maint {

	constructor() {

	}

	/**
	 * @param isManageNavigationOnPage : boolean // DOM for navagation managed by this class or external
	 * @param navigationChange_Callback : Called whenever method updateNavLinks() is called. MUST be populated if isManageNavigationOnPage is not true
	 */
	initializePageOnLoad({

		navigationType
	} : {

		navigationType: Navigation_dataPages_Maint__NavigationType_Enum
	} ) : void {

		const navigation_dataPages_Maint_Root_Component_Props_PropsValue = new Navigation_dataPages_Maint_Root_Component_Props_PropsValue({ navigationType });

		const navigation_dataPages_Maint_Root_Component = navigation_dataPages_Maint_Component_Create_JSX({ navigation_dataPages_Maint_Root_Component_Props_PropsValue });

		const containerDOMElement = document.getElementById("data_pages_nav_links_page_container")
		if ( ! containerDOMElement ) {
			throw Error("No DOM element with id 'data_pages_nav_links_page_container'");
		}

		const reactRoot_InDOMElement = createRoot_ReactDOM_Client( containerDOMElement! )

		reactRoot_InDOMElement.render( navigation_dataPages_Maint_Root_Component )
	}

	updateNavLinks() {
		//  Does nothing now
	}
	
}


const navigation_dataPages_Maint_Instance = new Navigation_dataPages_Maint();

export { navigation_dataPages_Maint_Instance };

