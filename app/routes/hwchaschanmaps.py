from app import app, db
from app.models import hwchaschanmap
from flask import abort, jsonify, request
import datetime
import json

@app.route('/noviga/hwchaschanmaps', methods = ['GET'])
def get_all_hwchaschanmaps():
    entities = hwchaschanmap.Hwchaschanmap.query.all()
    return json.dumps([entity.to_dict() for entity in entities])

@app.route('/noviga/hwchaschanmaps/<int:id>', methods = ['GET'])
def get_hwchaschanmap(id):
    entity = hwchaschanmap.Hwchaschanmap.query.get(id)
    if not entity:
        abort(404)
    return jsonify(entity.to_dict())

@app.route('/noviga/hwchaschanmaps', methods = ['POST'])
def create_hwchaschanmap():
    entity = hwchaschanmap.Hwchaschanmap(
        channelnumber = request.json['channelnumber']
        , trigger = request.json['trigger']
    )
    db.session.add(entity)
    db.session.commit()
    return jsonify(entity.to_dict()), 201

@app.route('/noviga/hwchaschanmaps/<int:id>', methods = ['PUT'])
def update_hwchaschanmap(id):
    entity = hwchaschanmap.Hwchaschanmap.query.get(id)
    if not entity:
        abort(404)
    entity = hwchaschanmap.Hwchaschanmap(
        channelnumber = request.json['channelnumber'],
        trigger = request.json['trigger'],
        id = id
    )
    db.session.merge(entity)
    db.session.commit()
    return jsonify(entity.to_dict()), 200

@app.route('/noviga/hwchaschanmaps/<int:id>', methods = ['DELETE'])
def delete_hwchaschanmap(id):
    entity = hwchaschanmap.Hwchaschanmap.query.get(id)
    if not entity:
        abort(404)
    db.session.delete(entity)
    db.session.commit()
    return '', 204
