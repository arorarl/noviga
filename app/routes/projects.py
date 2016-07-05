from app import app, db
from app.models import project
from flask import abort, jsonify, request
import datetime
import json

@app.route('/noviga/projects', methods = ['GET'])
def get_all_projects():
    entities = project.Project.query.all()
    return json.dumps([entity.to_dict() for entity in entities])

@app.route('/noviga/projects/<int:id>', methods = ['GET'])
def get_project(id):
    entity = project.Project.query.get(id)
    if not entity:
        abort(404)
    return jsonify(entity.to_dict())

@app.route('/noviga/projects', methods = ['POST'])
def create_project():
    entity = project.Project(
        name = request.json['name']
        , created_on = request.json['created_on']
        , description = request.json['description']
    )
    db.session.add(entity)
    db.session.commit()
    return jsonify(entity.to_dict()), 201

@app.route('/noviga/projects/<int:id>', methods = ['PUT'])
def update_project(id):
    entity = project.Project.query.get(id)
    if not entity:
        abort(404)
    entity = project.Project(
        name = request.json['name'],
        created_on = request.json['created_on'],
        description = request.json['description'],
        id = id
    )
    db.session.merge(entity)
    db.session.commit()
    return jsonify(entity.to_dict()), 200

@app.route('/noviga/projects/<int:id>', methods = ['DELETE'])
def delete_project(id):
    entity = project.Project.query.get(id)
    if not entity:
        abort(404)
    db.session.delete(entity)
    db.session.commit()
    return '', 204
