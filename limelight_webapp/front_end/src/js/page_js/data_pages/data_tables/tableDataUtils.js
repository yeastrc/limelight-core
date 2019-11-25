
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
        let annotationTypeData = dataPageStateManager_DataFrom_Server.get_annotationTypeData()[ projectSearchId ];

        for (let annoId of Object.keys( annotationTypeData.reportedPeptideFilterableAnnotationTypes ) ) {

            let anno = annotationTypeData.reportedPeptideFilterableAnnotationTypes[ annoId ];
            //  anno.sorttype = 'number';  Set in AnnotationTypeDataRetrieval on retrieval

            annotationList.push( anno );
        }

        for (let annoId of Object.keys( annotationTypeData.reportedPeptideDescriptiveAnnotationTypes ) ) {

            let anno = annotationTypeData.reportedPeptideDescriptiveAnnotationTypes[ annoId ];
            // anno.sorttype = 'string';  Set in AnnotationTypeDataRetrieval on retrieval

            annotationList.push( anno );
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
        let annotationTypeData = dataPageStateManager_DataFrom_Server.get_annotationTypeData()[ projectSearchId ];

        for (let annoId of Object.keys( annotationTypeData.psmFilterableAnnotationTypes ) ) {

            let anno = annotationTypeData.psmFilterableAnnotationTypes[ annoId ];
            // anno.sorttype = 'number';  Set in AnnotationTypeDataRetrieval on retrieval

            annotationList.push( anno );
        }

        for (let annoId of Object.keys( annotationTypeData.psmDescriptiveAnnotationTypes ) ) {

            let anno = annotationTypeData.psmDescriptiveAnnotationTypes[ annoId ];
            // anno.sorttype = 'string';  Set in AnnotationTypeDataRetrieval on retrieval

            annotationList.push( anno );
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