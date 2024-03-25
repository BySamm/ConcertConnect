#!/usr/bin/python3
"""All the routes"""
from flask import current_app, Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, unset_jwt_cookies, jwt_required
from datetime import datetime, timedelta, timezone
from flask_bcrypt import Bcrypt
from flask_cors import CORS

from .models.all import db, User, Concert, Review, Comment, Follower

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
    data = request.json
    print(data)
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({"Error": "Wrong email or password"}), 401

    if not bcrypt.check_password_hash(user.password_hash, password):
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
def register_user():
    data = request.json
    # Basic validation omitted for brevity

    # Extract data from request
    user_type = data.get('user_type', 'fan')  # Default to 'fan'
    # Other fields extracted here...
    username = data.get('username')
    email = data.get('email')
    password = data.get('passwordHash')
    user_type = data.get('user_type', 'fan')  # Default to 'fan' if not specified
    profile_pic = data.get('profile_pic')
    bio = data.get('bio')
    genre = data.get('genre')
    social_media_links = data.get('social_media_links')

     # Validate required fields
    if not all([username, email, password]):
        return jsonify({'error': 'Missing required user information.'}), 400

    # Check for existing user by email
    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'Email already in use.'}), 409

    hashed_password = bcrypt.generate_password_hash(password)

    # Prepare user data
    user_data = {
        'username': username,
        'email': email,
        'password_hash': hashed_password,
        'user_type': user_type,
        'profile_pic': profile_pic,
        'bio': bio,
        'created_at': datetime.utcnow()  # Explicitly setting created_at
    }

    if user_type == 'artist':
        user_data.update({
            'genre': genre,
            'social_media_links': social_media_links,
            'upcoming_events_count': data.get('upcoming_events_count', 0)
        })

    new_user = User(**user_data)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully', 'user_id': new_user.id}), 201


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
        # Case where there is not a valid JWT. Just return the original response
        return response



@main_bp.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response



@main_bp.route('/profile', methods=["GET"])
@jwt_required()
def my_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if user:
        response_body = {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            # Consider including additional fields as needed
        }
        return jsonify(response_body)
    else:
        return jsonify({"error": "User not found"}), 404



@main_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    user_id = get_jwt_identity()  # Assuming the JWT identity is the user's ID
    data = request.json
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    # Update fields if provided in the request
    user.username = data.get('username', user.username)
    user.bio = data.get('bio', user.bio)
    user.profile_pic = data.get('profile_pic', user.profile_pic)

    # For password updates, ensure to hash the new password
    if 'password' in data:
        user.password_hash = bcrypt.generate_password_hash(data['password']).decode('utf-8')

    # Handle artist-specific fields if the user is an artist
    if user.user_type == 'artist':
        user.genre = data.get('genre', user.genre)
        user.social_media_links = data.get('social_media_links', user.social_media_links)

    db.session.commit()
    return jsonify({"message": "Profile updated successfully"}), 200
    
    
@main_bp.route('/reviews', methods=['POST'])
@jwt_required()
def post_review():
    user_id = get_jwt_identity()
    data = request.json

    new_review = Review(
        concert_id=data['concert_id'],
        user_id=user_id,
        rating=data['rating'],
        comment=data.get('comment', '')
    )
    db.session.add(new_review)
    db.session.commit()
    return jsonify({"message": "Review posted successfully"}), 201
    
    

@main_bp.route('/comments', methods=['POST'])
@jwt_required()
def post_comment():
    user_id = get_jwt_identity()
    data = request.json

    new_comment = Comment(
        concert_id=data['concert_id'],
        user_id=user_id,
        comment=data['comment']
    )
    db.session.add(new_comment)
    db.session.commit()
    return jsonify({"message": "Comment added successfully"}), 201
    
    
    
@main_bp.route('/follow/<int:artist_id>', methods=['POST'])
@jwt_required()
def follow_artist(artist_id):
    follower_id = get_jwt_identity()  # Get the current user's ID from JWT

    # Prevent users from following themselves
    if follower_id == artist_id:
        return jsonify({"error": "You cannot follow yourself"}), 400

    # Check if the follow relationship already exists
    existing_follow = Follower.query.filter_by(user_id=follower_id, artist_id=artist_id).first()
    if existing_follow:
        return jsonify({"message": "You are already following this artist"}), 409

    # Create a new follow relationship
    new_follow = Follower(user_id=follower_id, artist_id=artist_id)
    db.session.add(new_follow)
    db.session.commit()

    return jsonify({"message": "Successfully followed the artist"}), 201
    
    
    
@main_bp.route('/unfollow/<int:artist_id>', methods=['POST'])
@jwt_required()
def unfollow_artist(artist_id):
    follower_id = get_jwt_identity()  # Get the current user's ID from JWT

    # Find the existing follow relationship
    follow = Follower.query.filter_by(user_id=follower_id, artist_id=artist_id).first()
    if not follow:
        return jsonify({"error": "You are not following this artist"}), 404

    # Remove the follow relationship
    db.session.delete(follow)
    db.session.commit()

    return jsonify({"message": "Successfully unfollowed the artist"}), 200
