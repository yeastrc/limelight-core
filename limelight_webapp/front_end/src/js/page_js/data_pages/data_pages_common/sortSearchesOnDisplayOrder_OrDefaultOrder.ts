/**
 * sortSearchesOnDisplayOrder_OrDefaultOrder.ts
 * 
 * Javascript for Data Pages: Sort Searches on display order ascending then search id descending
 * 
 * For projects with public access allowed, this button is provided to public (not logged in users) as well.
 * 
 */

/**
 * 
 */
const sortSearchesOnDisplayOrder_OrDefaultOrder = function(
    {
        folderList, searchesNotInFolders
    }: {
        folderList: any, searchesNotInFolders: any
    }) {

    if ( folderList && folderList.length !== 0 ) {
        for ( const folderItem of folderList ) {

            const searchesInFolder = folderItem.searchesInFolder;

            if ( searchesInFolder && searchesInFolder.length !== 0 ) {

                sortSearchesOnDisplayOrder_OrDefaultOrder_SingleSearchList({ searchList : searchesInFolder });
            }
        }
    }

    if ( searchesNotInFolders && searchesNotInFolders.length !== 0 ) {

        sortSearchesOnDisplayOrder_OrDefaultOrder_SingleSearchList({ searchList : searchesNotInFolders });
    }
}

/**
 * 
 */
const sortSearchesOnDisplayOrder_OrDefaultOrder_SingleSearchList = function({ searchList }:{ searchList: any }) {

    if ( ( ! searchList ) || searchList.length === 0 ) {
        //  no searches
        return; // EARLY RETURN
    }

    //  Sort on display order ascending then search id descending

    searchList.sort( (a: any, b: any) => {
        // display order ascending
        if ( a.displayOrder < b.displayOrder ) {
            return -1;
        }
        if ( a.displayOrder > b.displayOrder ) {
            return 1;
        }
        // search id descending
        if ( a.searchId < b.searchId ) {
            return 1;
        }
        if ( a.searchId > b.searchId ) {
            return -1;
        }
        // console.warn("sorting search list.  displayOrder and searchId match");
        return 0; // should never get here
    })
}

export { sortSearchesOnDisplayOrder_OrDefaultOrder, sortSearchesOnDisplayOrder_OrDefaultOrder_SingleSearchList }
