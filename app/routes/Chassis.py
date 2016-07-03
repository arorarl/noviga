from app import app, db
from app.models import Chassis
from flask import abort, jsonify, request
import datetime
import json

@app.route('/noviga/Chassis', methods = ['GET'])
def get_all_Chassis():
    entities = Chassis.Chassis.query.all()
    return json.dumps([entity.to_dict() for entity in entities])

@app.route('/noviga/Chassis/<int:id>', methods = ['GET'])
def get_Chassis(id):
    entity = Chassis.Chassis.query.get(id)
    if not entity:
        abort(404)
    return jsonify(entity.to_dict())

@app.route('/noviga/Chassis', methods = ['POST'])
def create_Chassis():
    entity = Chassis.Chassis(
        modelNo = request.json['modelNo']
        , maxSlots = request.json['maxSlots']
        , connectionType = request.json['connectionType']
    )
    db.session.add(entity)
    db.session.commit()
    return jsonify(entity.to_dict()), 201

@app.route('/noviga/Chassis/<int:id>', methods = ['PUT'])
def update_Chassis(id):
    entity = Chassis.Chassis.query.get(id)
    if not entity:
        abort(404)
    entity = Chassis.Chassis(
        modelNo = request.json['modelNo'],
        maxSlots = request.json['maxSlots'],
        connectionType = request.json['connectionType'],
        id = id
    )
    db.session.merge(entity)
    db.session.commit()
    return jsonify(entity.to_dict()), 200

@app.route('/noviga/Chassis/<int:id>', methods = ['DELETE'])
def delete_Chassis(id):
    entity = Chassis.Chassis.query.get(id)
    if not entity:
        abort(404)
    db.session.delete(entity)
    db.session.commit()
    return '', 204
