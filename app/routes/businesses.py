from app import app, db
from app.models import business
from flask import abort, jsonify, request
import datetime
import json

@app.route('/noviga/businesses', methods = ['GET'])
def get_all_businesses():
    entities = business.Business.query.all()
    return json.dumps([entity.to_dict() for entity in entities])

@app.route('/noviga/businesses/<int:id>', methods = ['GET'])
def get_business(id):
    entity = business.Business.query.get(id)
    if not entity:
        abort(404)
    return jsonify(entity.to_dict())

@app.route('/noviga/businesses', methods = ['POST'])
def create_business():
    entity = business.Business(
        name = request.json['name']
    )
    db.session.add(entity)
    db.session.commit()
    return jsonify(entity.to_dict()), 201

@app.route('/noviga/businesses/<int:id>', methods = ['PUT'])
def update_business(id):
    entity = business.Business.query.get(id)
    if not entity:
        abort(404)
    entity = business.Business(
        name = request.json['name'],
        id = id
    )
    db.session.merge(entity)
    db.session.commit()
    return jsonify(entity.to_dict()), 200

@app.route('/noviga/businesses/<int:id>', methods = ['DELETE'])
def delete_business(id):
    entity = business.Business.query.get(id)
    if not entity:
        abort(404)
    db.session.delete(entity)
    db.session.commit()
    return '', 204
