from app import app, db
from app.models import hardwareSetup
from flask import abort, jsonify, request
import datetime
import json

@app.route('/noviga/hardwaresetups', methods = ['GET'])
def get_all_hardwaresetups():
    entities = hardwareSetup.HardwareSetup.query.all()
    return json.dumps([entity.to_dict() for entity in entities])

@app.route('/noviga/hardwaresetups/<int:id>', methods = ['GET'])
def get_hardwareSetup(id):
    entity = hardwareSetup.HardwareSetup.query.get(id)
    if not entity:
        abort(404)
    return jsonify(entity.to_dict())

@app.route('/noviga/hardwaresetups', methods = ['POST'])
def create_hardwareSetup():
    entity = hardwareSetup.HardwareSetup(
        name = request.json['name']
    )
    db.session.add(entity)
    db.session.commit()
    return jsonify(entity.to_dict()), 201

@app.route('/noviga/hardwaresetups/<int:id>', methods = ['PUT'])
def update_hardwareSetup(id):
    entity = hardwareSetup.HardwareSetup.query.get(id)
    if not entity:
        abort(404)
    entity = hardwareSetup.HardwareSetup(
        name = request.json['name'],
        id = id
    )
    db.session.merge(entity)
    db.session.commit()
    return jsonify(entity.to_dict()), 200

@app.route('/noviga/hardwaresetups/<int:id>', methods = ['DELETE'])
def delete_hardwareSetup(id):
    entity = hardwareSetup.HardwareSetup.query.get(id)
    if not entity:
        abort(404)
    db.session.delete(entity)
    db.session.commit()
    return '', 204
