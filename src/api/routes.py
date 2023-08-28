"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token 

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

 
@api.route('/register', methods=["POST"])
def register_user():
    user_email = request.json.get("email", None)
    user_password = request.json.get("password", None)
    user_recovery_question =request.json.get("recovery_question", None)
    user_recovery_answer =request.json.get("recovery_answer", None)

    user_exists = User.query.filter_by(email = user_email).first()

    if user_exists:
        return jsonify({"msg": "Sorry, this user is already exists!"}), 300
    
    new_user = User(email = user_email, password = user_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"msg": "User created successfully"}), 200



# LOGIN ENDPOINT
@api.route("/login", methods=["POST"])
def user_login():
    user_email = request.json.get("email", None)
    user_password = request.json.get("password", None)

    user = User.query.filter_by(email = user_email, password = user_password).first()

    if user is None:
        return jsonify({"Error": "Wrong email or password"}), 401
    
    token = create_access_token(identity= user.id)
    return jsonify({"response": "Successfully logged in", "token": token, "email": user.email}), 200



# GETTING ALL THE USERS
@api.route("/users", methods=["GET"])
def get_all_users():
    all_users = User.query.all()
    mapped_users = list(map(lambda index: index.serialize(), all_users))

    response_body = jsonify(mapped_users)
    return response_body, 200



# DELETING AN USER
@api.route("/users/<user_id>", methods=["DELETE"])
def delete_user(user_id):
   find_user = User.query.get(user_id)
   
   if find_user is None:
        return jsonify({"Error": "User not found"})
   db.session.delete(find_user)
   db.session.commit()

   return jsonify({"Msg": "User successfully deleted"}), 200


# ACCESSING USER'S PRIVATE PAGE
@api.route("/private", methods=["GET"])
@jwt_required()
def show_email():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify({"email": user.email, "id": user.id, "response": "That is your data up there!"}), 200
