from app import app, db
from app.models import Module
from flask import abort, jsonify, request
import datetime
import json

@app.route('/noviga/Modules', methods = ['GET'])
def get_all_Modules():
    entities = Module.Module.query.all()
    return json.dumps([entity.to_dict() for entity in entities])

@app.route('/noviga/Modules/<int:id>', methods = ['GET'])
def get_Module(id):
    entity = Module.Module.query.get(id)
    if not entity:
        abort(404)
    return jsonify(entity.to_dict())

@app.route('/noviga/Modules', methods = ['POST'])
def create_Module():
    entity = Module.Module(
        modelNo = request.json['modelNo']
        , maxChannels = request.json['maxChannels']
        , maxSamplingRate = request.json['maxSamplingRate']
        , peakVoltRange = request.json['peakVoltRange']
        , type = request.json['type']
    )
    db.session.add(entity)
    db.session.commit()
    return jsonify(entity.to_dict()), 201

@app.route('/noviga/Modules/<int:id>', methods = ['PUT'])
def update_Module(id):
    entity = Module.Module.query.get(id)
    if not entity:
        abort(404)
    entity = Module.Module(
        modelNo = request.json['modelNo'],
        maxChannels = request.json['maxChannels'],
        maxSamplingRate = request.json['maxSamplingRate'],
        peakVoltRange = request.json['peakVoltRange'],
        type = request.json['type'],
        id = id
    )
    db.session.merge(entity)
    db.session.commit()
    return jsonify(entity.to_dict()), 200

@app.route('/noviga/Modules/<int:id>', methods = ['DELETE'])
def delete_Module(id):
    entity = Module.Module.query.get(id)
    if not entity:
        abort(404)
    db.session.delete(entity)
    db.session.commit()
    return '', 204
