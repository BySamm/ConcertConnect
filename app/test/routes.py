#!/usr/bin/python3
"""All the routes"""
from flask import current_app, Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, unset_jwt_cookies, jwt_required
from datetime import datetime, timedelta, timezone
from flask_bcrypt import Bcrypt
from flask_cors import CORS

from .models.all import db, User

main_bp = Blueprint('main', __name__)

bcrypt = Bcrypt()
CORS(supports_credentials=True)

@main_bp.route('/')
def index():
    """print web"""
    return 'App Started'

@main_bp.route('/logintoken', methods=["POST"])
def create_token():
    """Token Creation"""
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({"Error": "Wrong email or password"}), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"Error": "Unauthorized"}), 401

    access_token = create_access_token(identity=user.id)
    #response = {"token": access_token}

    return jsonify({
        "user_id": user.id,
        "email": email,
        "token": access_token
        })

    #return response

@main_bp.route('/register', methods=["POST"])
def signup():
    """Access the current application context using current_app"""
    app = current_app
    
    current_time = datetime.now()
    """Registration page"""
    data = request.json
    print(data)
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")
    
    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "Email already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(username=username, email=email, password=hashed_password, created_at=current_time)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({
        "id": new_user.id,
        "email": new_user.email
        })

@main_bp.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token 
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response


@main_bp.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response


@main_bp.route('/profile/<getemail>')
@jwt_required()
def my_profile(getemail):
    print(getemail)
    if not getemail:
        return jsonify({"error": "Unauthorized Access"}), 401
       
    user = User.query.filter_by(email=getemail).first()
  
    response_body = {
        "id": user.id,
        "username": user.username,
        "email": user.email
    }
  
    return response_body
