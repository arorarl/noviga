from app import app, db
from app.models import channelsetup
from flask import abort, jsonify, request
import datetime
import json

@app.route('/noviga/channelsetups', methods = ['GET'])
def get_all_channelsetups():
    entities = channelsetup.Channelsetup.query.all()
    return json.dumps([entity.to_dict() for entity in entities])

@app.route('/noviga/channelsetups/<int:id>', methods = ['GET'])
def get_channelsetup(id):
    entity = channelsetup.Channelsetup.query.get(id)
    if not entity:
        abort(404)
    return jsonify(entity.to_dict())

@app.route('/noviga/channelsetups', methods = ['POST'])
def create_channelsetup():
    entity = channelsetup.Channelsetup(
        name = request.json['name']
        , samplingrate = request.json['samplingrate']
        , sensitivity = request.json['sensitivity']
        , autorangetime = request.json['autorangetime']
        , peakvalue = request.json['peakvalue']
    )
    db.session.add(entity)
    db.session.commit()
    return jsonify(entity.to_dict()), 201

@app.route('/noviga/channelsetups/<int:id>', methods = ['PUT'])
def update_channelsetup(id):
    entity = channelsetup.Channelsetup.query.get(id)
    if not entity:
        abort(404)
    entity = channelsetup.Channelsetup(
        name = request.json['name'],
        samplingrate = request.json['samplingrate'],
        sensitivity = request.json['sensitivity'],
        autorangetime = request.json['autorangetime'],
        peakvalue = request.json['peakvalue'],
        id = id
    )
    db.session.merge(entity)
    db.session.commit()
    return jsonify(entity.to_dict()), 200

@app.route('/noviga/channelsetups/<int:id>', methods = ['DELETE'])
def delete_channelsetup(id):
    entity = channelsetup.Channelsetup.query.get(id)
    if not entity:
        abort(404)
    db.session.delete(entity)
    db.session.commit()
    return '', 204
