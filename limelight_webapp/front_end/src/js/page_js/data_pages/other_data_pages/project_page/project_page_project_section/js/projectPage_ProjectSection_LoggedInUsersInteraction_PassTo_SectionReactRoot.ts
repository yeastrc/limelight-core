/**
 * projectPage_ProjectSection_LoggedInUsersInteraction_PassTo_SectionReactRoot.ts
 */
import {
    projectPage_ProjectSection_LoggedInUsersInteraction_DeleteNote
} from "page_js/data_pages/other_data_pages/project_page/project_page_project_section/js/projectPage_ProjectSection_LoggedInUsersInteraction_DeleteNote";
import {
    projectPage_ProjectSection_LoggedInUser_Interaction_Add_Change_NoteText_Component__openOverlay
} from "page_js/data_pages/other_data_pages/project_page/project_page_project_section/jsx/projectPage_ProjectSection_LoggedInUser_Interaction_Add_Change_NoteText_Component";
import {
    projectPage_ProjectSection_ProjectOwnerInteraction_Change_ProjectAbstract_Component__openOverlay
} from "page_js/data_pages/other_data_pages/project_page/project_page_project_section/jsx/projectPage_ProjectSection_ProjectOwnerInteraction_Change_ProjectAbstract_Component";

/**
 *
 */
export class ProjectPage_ProjectSection_LoggedInUsersInteraction_PassTo_SectionReactRoot {

    get_Edit_Abstract_Function() {
        return projectPage_ProjectSection_ProjectOwnerInteraction_Change_ProjectAbstract_Component__openOverlay
    }

    get_Delete_Note_Function() {
        return projectPage_ProjectSection_LoggedInUsersInteraction_DeleteNote
    }

    get_Add_Change_Note_Function() {
        return projectPage_ProjectSection_LoggedInUser_Interaction_Add_Change_NoteText_Component__openOverlay
    }

}