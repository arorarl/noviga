from app import app, db
from app.models import quantity
from flask import abort, jsonify, request
import datetime
import json

@app.route('/noviga/quantities', methods = ['GET'])
def get_all_quantities():
    entities = quantity.Quantity.query.all()
    return json.dumps([entity.to_dict() for entity in entities])

@app.route('/noviga/quantities/<int:id>', methods = ['GET'])
def get_quantity(id):
    entity = quantity.Quantity.query.get(id)
    if not entity:
        abort(404)
    return jsonify(entity.to_dict())

@app.route('/noviga/quantities', methods = ['POST'])
def create_quantity():
    entity = quantity.Quantity(
        name = request.json['name']
    )
    db.session.add(entity)
    db.session.commit()
    return jsonify(entity.to_dict()), 201

@app.route('/noviga/quantities/<int:id>', methods = ['PUT'])
def update_quantity(id):
    entity = quantity.Quantity.query.get(id)
    if not entity:
        abort(404)
    entity = quantity.Quantity(
        name = request.json['name'],
        id = id
    )
    db.session.merge(entity)
    db.session.commit()
    return jsonify(entity.to_dict()), 200

@app.route('/noviga/quantities/<int:id>', methods = ['DELETE'])
def delete_quantity(id):
    entity = quantity.Quantity.query.get(id)
    if not entity:
        abort(404)
    db.session.delete(entity)
    db.session.commit()
    return '', 204
