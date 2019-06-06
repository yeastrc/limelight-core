/*
* Original author: Daniel Jaschob <djaschob .at. uw.edu>
*                  
* Copyright 2019 University of Washington - Seattle, WA
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
package org.yeastrc.limelight.limelight_shared.XMLInputFactory_XXE_Safe_Creator;

import javax.xml.stream.XMLInputFactory;

/**
 * Create XMLInputFactory object that is XXE safe
 *
 */
public class XMLInputFactory_XXE_Safe_Creator {

	/**
	 * @return Create XMLInputFactory object that is XXE safe
	 */
	public static XMLInputFactory xmlInputFactory_XXE_Safe_Creator() {
		
		XMLInputFactory xmlInputFactory = XMLInputFactory.newFactory();
		xmlInputFactory.setProperty(XMLInputFactory.IS_SUPPORTING_EXTERNAL_ENTITIES, false);
		xmlInputFactory.setProperty(XMLInputFactory.SUPPORT_DTD, false);
		
		return xmlInputFactory;
	}
}
