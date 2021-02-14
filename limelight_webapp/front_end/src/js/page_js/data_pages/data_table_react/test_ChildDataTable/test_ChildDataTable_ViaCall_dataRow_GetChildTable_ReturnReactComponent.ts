/**
 * test_ChildDataTable_ViaCall_dataRow_GetChildTable_ReturnReactComponent.ts
 * 
 * Test creating a React Cmponent that is shown for show/hide row child data using call to tableOptions.dataRow_GetChildTable_ReturnReactComponent(...) which returns React.Component
 */

import {

    DataTable_ColumnId,

    DataTable_RootTableObject,
    
    DataTable_TableOptions,
    DataTable_TableOptions_dataRowClickHandler_RequestParm,
    DataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm,
    
    DataTable_Column,
    DataTable_SortColumnsInfoEntry,

    DataTable_RootTableDataObject,
    DataTable_DataGroupRowEntry,
    DataTable_DataRowEntry,
    DataTable_DataRow_ColumnEntry,

    DataTable_cellMgmt_External,
    DataTable_cellMgmt_External_PopulateRequest,
    DataTable_cellMgmt_External_PopulateResponse,
    DataTable_cellMgmt_ExternalReactComponent
    
} from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';

//  React Component that will be returned
import { FAKE_dataRow_ChildTable_ReactComponent, FAKE_dataRow_ChildTable_ReactComponent_Props } from './test_ChildDataTable_ViaCall_dataRow_GetChildTable_ReturnReactComponent__ChildTableContainingReactComponent';


//////////////////


// dataRow_GetChildTable_ReturnReactComponent_Parameter


class FAKE_dataRow_GetChildTable_ReturnReactComponent_Parameter_FakeChildTableTesting {
    fakedata: any

    shallowClone() {

        const clone = new FAKE_dataRow_GetChildTable_ReturnReactComponent_Parameter_FakeChildTableTesting();
        // Object.assign( clone, this );
        clone.fakedata = this.fakedata;
        return clone;
    }
}


const fake_dataRow_GetChildTable_ReturnReactComponent = ( 
    dataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm: DataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm 
) : any /* React.Component */ => {

    if ( ! dataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm ) {
        throw Error("No value in dataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm")
    }
    const dataRow_GetChildTable_ReturnReactComponent_Parameter = dataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm.dataRow_GetChildTable_ReturnReactComponent_Parameter;
    if ( ! dataRow_GetChildTable_ReturnReactComponent_Parameter ) {
        throw Error("No value in dataRow_GetChildTable_ReturnReactComponent_Parameter")
    }
    if ( ! ( dataRow_GetChildTable_ReturnReactComponent_Parameter instanceof FAKE_dataRow_GetChildTable_ReturnReactComponent_Parameter_FakeChildTableTesting ) ) {
        throw Error("Not: dataRow_GetChildTable_ReturnReactComponent_Parameter instanceof FAKE_dataRow_GetChildTable_ReturnReactComponent_Parameter_FakeChildTableTesting")
    }
    const dataRow_GetChildTable_ReturnReactComponentParameter = dataRow_GetChildTable_ReturnReactComponent_Parameter as FAKE_dataRow_GetChildTable_ReturnReactComponent_Parameter_FakeChildTableTesting
    // dataRow_GetChildTable_ReturnReactComponentParameter is the value in dataTable_DataRowEntry.dataRow_GetChildTable_ReturnReactComponentParameter
    console.warn( "FAKE function fake_dataRow_GetChildTable_ReturnReactComponent:  dataRow_GetChildTable_ReturnReactComponent value: " , dataRow_GetChildTable_ReturnReactComponentParameter ) 
    console.warn( "FAKE function fake_dataRow_GetChildTable_ReturnReactComponent:  dataRow_GetChildTable_ReturnReactComponent.fakedata value: " , dataRow_GetChildTable_ReturnReactComponentParameter.fakedata ) 

    //  For this implementation, dataRow_GetChildTable_ReturnReactComponent_Parameter is not used here.

    return FAKE_dataRow_ChildTable_ReactComponent;
}


export { fake_dataRow_GetChildTable_ReturnReactComponent, FAKE_dataRow_GetChildTable_ReturnReactComponent_Parameter_FakeChildTableTesting }
