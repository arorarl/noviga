from app import app, db
from app.models import hwchassismap
from flask import abort, jsonify, request
import datetime
import json

@app.route('/noviga/hwchassismaps', methods = ['GET'])
def get_all_hwchassismaps():
    entities = hwchassismap.Hwchassismap.query.all()
    return json.dumps([entity.to_dict() for entity in entities])

@app.route('/noviga/hwchassismaps/<int:id>', methods = ['GET'])
def get_hwchassismap(id):
    entity = hwchassismap.Hwchassismap.query.get(id)
    if not entity:
        abort(404)
    return jsonify(entity.to_dict())

@app.route('/noviga/hwchassismaps', methods = ['POST'])
def create_hwchassismap():
    entity = hwchassismap.Hwchassismap(
        slotnumber = request.json['slotnumber']
    )
    db.session.add(entity)
    db.session.commit()
    return jsonify(entity.to_dict()), 201

@app.route('/noviga/hwchassismaps/<int:id>', methods = ['PUT'])
def update_hwchassismap(id):
    entity = hwchassismap.Hwchassismap.query.get(id)
    if not entity:
        abort(404)
    entity = hwchassismap.Hwchassismap(
        slotnumber = request.json['slotnumber'],
        id = id
    )
    db.session.merge(entity)
    db.session.commit()
    return jsonify(entity.to_dict()), 200

@app.route('/noviga/hwchassismaps/<int:id>', methods = ['DELETE'])
def delete_hwchassismap(id):
    entity = hwchassismap.Hwchassismap.query.get(id)
    if not entity:
        abort(404)
    db.session.delete(entity)
    db.session.commit()
    return '', 204
