from flask import Flask
from flask import render_template, request, redirect
from uuid import uuid4
import json

app = Flask(__name__)

# configure Flask using environment variables
app.config.from_pyfile("config.py")


@app.route('/')
def index():
    return render_template('index.html', page_title="My little project")


@app.route('/form', methods=['POST'])
def form():
    # This function writes the forms input into a json.
    # Therefore the picture is given a random name.
    # The picture is referenced with its files location.
    with open('project/static/projects.json', 'r', encoding='utf-8') as projects_file:
        projects_file = json.load(projects_file)

        file_name = str(uuid4()) + ".jpeg"
        image_file = request.files["project-picture"]
        image_file.save("./project/static/img/" + file_name)

        project = {
            "projectTitle": request.form['project-title'],
            "projectPicture": "/static/img/" + file_name,
            "shortDescription": request.form['short-description'],
            "longDescription": request.form['long-description']
        }

        projects_file.append(project)

    # Dumps the old json and overwrites it with the newly created json.
    with open('project/static/projects.json', 'w+', encoding='utf-8') as out_file:
        json.dump(projects_file, out_file, indent='  ')

    return redirect('/', code="302")


if __name__ == "__main__":
    app.run(host="localhost", port=8080, debug=True)
