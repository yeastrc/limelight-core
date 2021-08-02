/**
 * annotationTypes_SortOn_DisplayOrderAnnTypeName.ts
 *
 *
 */


import {AnnotationTypeItem} from "page_js/data_pages/data_pages_common/dataPageStateManager";

/**
 *
 */
export const annotationTypes_SortOn_DisplayOrderAnnTypeName = function( annTypesArray : Array<AnnotationTypeItem> ) {

    annTypesArray.sort( function( a, b ) {
        if ( a.displayOrder && b.displayOrder ) {
            //  both a and b have display order so order them
            if ( a.displayOrder < b.displayOrder ) {
                return -1;
            }
            if ( a.displayOrder > b.displayOrder ) {
                return 1;
            }
            return 0;
        }
        if ( a.displayOrder ) {
            //  Only a has display order so order it first
            return -1;
        }
        if ( b.displayOrder ) {
            //  Only b has display order so order it first
            return 1;
        }
        //  Order on ann type name
        const nameCompare = a.name.localeCompare( b.name );
        if ( nameCompare !== 0 ) {
            return nameCompare;
        }
        //  sort on id
        if ( a.annotationTypeId < b.annotationTypeId ) {
            return -1;
        }
        if ( a.annotationTypeId > b.annotationTypeId ) {
            return -1;
        }
        return 0;
    });
}