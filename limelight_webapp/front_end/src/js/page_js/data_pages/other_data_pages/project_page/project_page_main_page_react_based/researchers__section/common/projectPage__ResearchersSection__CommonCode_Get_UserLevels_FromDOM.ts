/**
 * projectPage__ResearchersSection__CommonCode_Get_UserLevels_FromDOM.ts
 */




export const projectPage__ResearchersSection__CommonCode_Get_UserLevels_FromDOM = function () {

    return {
        access_level_id_project_researcher, access_level_id_project_owner, access_level_id_project_viewer
    } as const
}


// Retrieved from DOM
let access_level_id_project_researcher: number
let access_level_id_project_viewer: number
let access_level_id_project_owner: number
{
    {
        const elementId_String = "access_level_id_project_researcher"
        const elementDOM = document.getElementById( elementId_String )
        if ( ! elementDOM ) {
            const msg = "NO DOM element with id '" + elementId_String + "'"
            console.warn(msg)
            throw Error(msg)
        }
        const elementText = elementDOM.textContent
        const elementNumber = Number.parseInt( elementText )
        if ( Number.isNaN( elementNumber ) ) {
            const msg = "DOM element with id '" + elementId_String + "' does NOT contain a number"
            console.warn(msg)
            throw Error(msg)
        }
        access_level_id_project_researcher = elementNumber
    }
    {
        const elementId_String = "access_level_id_project_viewer"
        const elementDOM = document.getElementById( elementId_String )
        if ( ! elementDOM ) {
            const msg = "NO DOM element with id '" + elementId_String + "'"
            console.warn(msg)
            throw Error(msg)
        }
        const elementText = elementDOM.textContent
        const elementNumber = Number.parseInt( elementText )
        if ( Number.isNaN( elementNumber ) ) {
            const msg = "DOM element with id '" + elementId_String + "' does NOT contain a number"
            console.warn(msg)
            throw Error(msg)
        }
        access_level_id_project_viewer = elementNumber
    }
    {
        const elementId_String = "access_level_id_project_owner"
        const elementDOM = document.getElementById( elementId_String )
        if ( ! elementDOM ) {
            const msg = "NO DOM element with id '" + elementId_String + "'"
            console.warn(msg)
            throw Error(msg)
        }
        const elementText = elementDOM.textContent
        const elementNumber = Number.parseInt( elementText )
        if ( Number.isNaN( elementNumber ) ) {
            const msg = "DOM element with id '" + elementId_String + "' does NOT contain a number"
            console.warn(msg)
            throw Error(msg)
        }
        access_level_id_project_owner = elementNumber
    }
}

