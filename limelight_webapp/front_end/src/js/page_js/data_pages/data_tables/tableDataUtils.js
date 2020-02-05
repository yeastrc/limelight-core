
"use strict";

export class TableDataUtils {

    static getOrderedPeptideAnnotationsToShowForSearch( { peptideDataObjectArray, dataPageStateManager_DataFrom_Server, projectSearchId } ) {

        // first, get sorted list of all possible annotations of this type
        let annotationList = TableDataUtils.getAllPossibleOrderedPeptideAnnotations( { dataPageStateManager_DataFrom_Server, projectSearchId } );
        let annotationsToShow = [ ];

        if( peptideDataObjectArray && peptideDataObjectArray.length > 0 && peptideDataObjectArray[0][ 'loadedData'][ 'peptideAnnotationMap' ] ) {

            let peptideAnnoIdsToShow = Object.keys( peptideDataObjectArray[0][ 'loadedData'][ 'peptideAnnotationMap' ] ).map( function( x ) { return parseInt( x ); });
            if( peptideAnnoIdsToShow ) {

                for( let annotation of annotationList ) {

                    if( peptideAnnoIdsToShow.includes( parseInt( annotation.annotationTypeId ) ) ) {
                        annotationsToShow.push( annotation );
                    }
                }
            }
        }

        return annotationsToShow;
    }

    static getAllPossibleOrderedPeptideAnnotations( { dataPageStateManager_DataFrom_Server, projectSearchId } ) {

        let annotationList = [ ];

		let annotationTypeDataLoaded_Root = dataPageStateManager_DataFrom_Server.get_annotationTypeData_Root();

		let annotationTypeDataForProjectSearchId = annotationTypeDataLoaded_Root.annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId );
		if ( ( ! annotationTypeDataForProjectSearchId ) ) {
			throw Error("No annotation type data for projectSearchId: " + projectSearchId );
        }
        
        {
            let reportedPeptideFilterableAnnotationTypes_Map = annotationTypeDataForProjectSearchId.reportedPeptideFilterableAnnotationTypes;
            
            for ( const annotationTypes_Map_Entry of reportedPeptideFilterableAnnotationTypes_Map.entries() ) {
                const annotationTypeEntry = annotationTypes_Map_Entry[ 1 ]; // value of map entry
      
                annotationList.push( annotationTypeEntry );
            }
        }
        {
            let reportedPeptideDescriptiveAnnotationTypes_Map = annotationTypeDataForProjectSearchId.reportedPeptideDescriptiveAnnotationTypes;
            
            for ( const annotationTypes_Map_Entry of reportedPeptideDescriptiveAnnotationTypes_Map.entries() ) {
                const annotationTypeEntry = annotationTypes_Map_Entry[ 1 ]; // value of map entry
      
                annotationList.push( annotationTypeEntry );
            }
        }

        annotationList.sort( function(a,b) {

            // always place something with a display order before something without one
            if( a.displayOrder && ! b.displayOrder ) { return -1; }
            if( !a.displayOrder && b.displayOrder ) { return 1; }

            if( a.displayOrder && b.displayOrder ) {
                if( a.displayOrder < b.displayOrder ) { return -1; }
                if( a.displayOrder > b.displayOrder ) { return 1; }
            }

            // only get here if display order is the same for both
            if( a.name.toLowerCase() < b.name.toLowerCase() ) { return -1; }
            if( a.name.toLowerCase() > b.name.toLowerCase() ) { return 1; }

            return 0;
        });

        return annotationList;
    }

    static getOrderedPSMAnnotationsToShowForSearch( { dataObjectArray, dataPageStateManager_DataFrom_Server, projectSearchId } ) {

        // first, get sorted list of all possible annotations of this type
        let annotationList = TableDataUtils.getAllPossibleOrderedPSMAnnotations( { dataPageStateManager_DataFrom_Server, projectSearchId } );
        let annotationsToShow = [ ];

        if( dataObjectArray && dataObjectArray.length > 0 && dataObjectArray[0][ 'loadedData' ][ 'psmAnnotationMap' ] ) {

            let psmAnnoIdsToShow = Object.keys( dataObjectArray[0][ 'loadedData'][ 'psmAnnotationMap' ] ).map( function( x ) { return parseInt( x ); });
            if( psmAnnoIdsToShow ) {

                for( let annotation of annotationList ) {

                    if( psmAnnoIdsToShow.includes( parseInt( annotation.annotationTypeId ) ) ) {

                        annotationsToShow.push( annotation );
                    }
                }
            }
        }

        return annotationsToShow;
    }

    static getAllPossibleOrderedPSMAnnotations( { dataPageStateManager_DataFrom_Server, projectSearchId } ) {

        let annotationList = [ ];

		let annotationTypeDataLoaded_Root = dataPageStateManager_DataFrom_Server.get_annotationTypeData_Root();

		let annotationTypeDataForProjectSearchId = annotationTypeDataLoaded_Root.annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId );
		if ( ( ! annotationTypeDataForProjectSearchId ) ) {
			throw Error("No annotation type data for projectSearchId: " + projectSearchId );
        }
        
        {
            let psmFilterableAnnotationTypes_Map = annotationTypeDataForProjectSearchId.psmFilterableAnnotationTypes;
            
            for ( const annotationTypes_Map_Entry of psmFilterableAnnotationTypes_Map.entries() ) {
                const annotationTypeEntry = annotationTypes_Map_Entry[ 1 ]; // value of map entry
      
                annotationList.push( annotationTypeEntry );
            }
        }
        {
            let psmDescriptiveAnnotationTypes_Map = annotationTypeDataForProjectSearchId.psmDescriptiveAnnotationTypes;
            
            for ( const annotationTypes_Map_Entry of psmDescriptiveAnnotationTypes_Map.entries() ) {
                const annotationTypeEntry = annotationTypes_Map_Entry[ 1 ]; // value of map entry
      
                annotationList.push( annotationTypeEntry );
            }
        }
        
        annotationList.sort( function(a,b) {

            // always place something with a display order before something without one
            if( a.displayOrder && !b.displayOrder ) { return -1; }
            if( !a.displayOrder && b.displayOrder ) { return 1; }

            if( a.displayOrder && b.displayOrder ) {
                if( a.displayOrder < b.displayOrder ) { return -1; }
                if( a.displayOrder > b.displayOrder ) { return 1; }
            }

            // only get here if display order is the same for both
            if( a.name.toLowerCase() < b.name.toLowerCase() ) { return -1; }
            if( a.name.toLowerCase() > b.name.toLowerCase() ) { return 1; }

            return 0;
        });

        return annotationList;
    }
}