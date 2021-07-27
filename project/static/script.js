var projectList = document.getElementById('project-list');


function expandCollapseToggle(i) {
    let projectElement = projectList.getElementsByClassName("project")[i];
    let shortDescription = projectElement.getElementsByClassName("short-description")[0];
    let longDescription = projectElement.getElementsByClassName("long-description")[0];
    let button = projectElement.getElementsByClassName("button")[0];

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

function expandForm() {
    let addProject = document.getElementById("add-project");
    let button = document.getElementById("add-project-button");

    if (addProject.style.display == "none") {
        addProject.style.display = "block";
        button.innerHTML = "Collapse Form";
    } else {
        addProject.style.display = "none";
        button.innerHTML = "Add another Project";
    }
}

async function loadProjects() {
    let projectsFile;

    try {
        let request = await fetch("/static/projects.json", {
            method: "GET"
        });
        projectsFile = await request.json();
    } catch (error) {
        projectList.innerHTML = "An Error occured. Try to relaod the page.";
        throw new Error(error);
    }

    projectsFile.forEach(function (project, i) {
        let clone = document.getElementById("project-template").cloneNode(true);
        clone.removeAttribute("id");

        let projectTitle = clone.getElementsByClassName("project-title")[0];
        let projectPicture = clone.getElementsByClassName("project-picture")[0];
        let shortDescription = clone.getElementsByClassName("short-description")[0];
        let longDescription = clone.getElementsByClassName("long-description")[0];
        let button = clone.getElementsByClassName("button")[0];

        projectTitle.innerHTML = project.projectTitle;
        projectPicture.src = project.projectPicture;
        shortDescription.innerHTML = project.shortDescription;
        longDescription.innerHTML = project.longDescription;

        button.onclick = function() {
            expandCollapseToggle(i);
        }

        projectList.appendChild(clone);
    });

}

loadProjects();

// function warnUser(){
//     alert("You pushed a button!")
// }
