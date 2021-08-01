//assigns the project-list to a global variable
var projectList = document.getElementById('project-list');

/**
 * Expands or collapses a project with a specific index given through the button.
 * @param {Number} i Index of project
 */
function expandCollapseToggle(i) {
    // Assignes the whole project element to a variable
    let projectElement = projectList.getElementsByClassName("project")[i];
    // Assignes the elements to variables
    let shortDescription = projectElement.getElementsByClassName("short-description")[0];
    let longDescription = projectElement.getElementsByClassName("long-description")[0];
    let button = projectElement.getElementsByClassName("button")[0];

    // Checks the elements shortDescription is shown and adjusts the style
    if (shortDescription.style.display == "block") {
        shortDescription.style.display = "none";
        longDescription.style.display = "block";
        button.innerHTML = "Collapse";
    } else {
        shortDescription.style.display = "block";
        longDescription.style.display = "none";
        button.innerHTML = "Expand";
    }
}

/**
 * Expands and collapses the form.
 */
function expandCollapseForm() {
    // Assignes form and button to a variable
    let addProject = document.getElementById("add-project");
    let button = document.getElementById("add-project-button");

    // Checks if the form is shown and adjusts the style
    if (addProject.style.display == "none") {
        addProject.style.display = "block";
        button.innerHTML = "Collapse Form";
    } else {
        addProject.style.display = "none";
        button.innerHTML = "Add another Project";
    }
}

/**
 * Loads all projects from the json to generate the websites main content.
 */
async function loadProjects() {
    let projectsFile;

    // Loads the json from the server and displays and error message if unsuccessful
    try {
        // Send request for the project file to the server
        let request = await fetch("/static/projects.json", {
            method: "GET"
        });
        // assigns the requests json content to a variabale
        projectsFile = await request.json();
    } catch (error) {
        projectList.innerHTML = "An Error occured. Try to relaod the page.";
        throw new Error(error);
    }

    // Loops through all projects in the json
    projectsFile.forEach(function (project, i) {
        // Clones the project-template element
        let clone = document.getElementById("project-template").cloneNode(true);
        // Removes the id from the clone
        clone.removeAttribute("id");

        // Assigns the child elements to a variable
        let projectTitle = clone.getElementsByClassName("project-title")[0];
        let projectPicture = clone.getElementsByClassName("project-picture")[0];
        let shortDescription = clone.getElementsByClassName("short-description")[0];
        let longDescription = clone.getElementsByClassName("long-description")[0];
        let button = clone.getElementsByClassName("button")[0];

        // Generates the html content from the json
        projectTitle.innerText = project.projectTitle;
        projectPicture.src = project.projectPicture;
        shortDescription.innerText = project.shortDescription;
        longDescription.innerText = project.longDescription;

        // Defines the onclick actions of the button
        button.onclick = function () {
            expandCollapseToggle(i);
        }

        // Attaches the processed project to the project-list in the document
        projectList.appendChild(clone);
    });

}

// Loads all projects
loadProjects();
