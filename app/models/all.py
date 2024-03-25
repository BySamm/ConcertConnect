#!/usr/bin/python3
"""Holds class User"""
from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4
from datetime import datetime

db = SQLAlchemy()

def get_uuid():
    return uuid4().hex

class User(db.Model):
    """Representation of a user """
    __tablename__ = 'users'

    id = db.Column('UserID', db.String(36), primary_key=True, unique=True, default=get_uuid)
    username = db.Column('Username', db.String(255), unique=True, nullable=False)
    email = db.Column('Email', db.String(255), unique=True, nullable=False)
    password_hash = db.Column('PasswordHash', db.String(255), nullable=False)
    user_type = db.Column('UserType', db.Enum('fan', 'artist'), nullable=False)
    profile_pic = db.Column('ProfilePic', db.String(255))
    bio = db.Column('Bio', db.Text)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    # Artist-specific fields, nullable since they're not applicable to all users
    genre = db.Column('Genre', db.String(255))
    social_media_links = db.Column('SocialMediaLinks', db.Text)
    upcoming_events_count = db.Column('UpcomingEventsCount', db.Integer, default=0)

    # Relationships
    reviews = db.relationship('Review', backref='user', lazy=True)
    comments = db.relationship('Comment', backref='user', lazy=True)
    concerts = db.relationship('Concert', backref='artist', lazy=True)
    followed = db.relationship('Follower', foreign_keys='Follower.follower_id', backref='follower', lazy='dynamic')
    followers = db.relationship('Follower', foreign_keys='Follower.followed_id', backref='followed', lazy='dynamic')
    
    

class Concert(db.Model):
    __tablename__ = 'concerts'

    id = db.Column('ConcertID', db.Integer, primary_key=True)
    artist_id = db.Column('ArtistID', db.String(36), db.ForeignKey('users.UserID'), nullable=False)
    title = db.Column('Title', db.String(255), nullable=False)
    description = db.Column('Description', db.Text)
    date = db.Column('Date', db.DateTime, nullable=False)
    location = db.Column('Location', db.String(255), nullable=False)
    ticket_link = db.Column('TicketLink', db.String(255))
    concert_poster = db.Column('ConcertPoster', db.String(255))

    reviews = db.relationship('Review', backref='concert', lazy=True)
    comments = db.relationship('Comment', backref='concert', lazy=True)


    
class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column('ReviewID', db.Integer, primary_key=True)
    concert_id = db.Column('ConcertID', db.Integer, db.ForeignKey('concerts.ConcertID'), nullable=False)
    user_id = db.Column('UserID', db.String(36), db.ForeignKey('users.UserID'), nullable=False)
    rating = db.Column('Rating', db.Integer, nullable=False)
    comment = db.Column('Comment', db.Text)
    review_date = db.Column('ReviewDate', db.DateTime, nullable=False, default=datetime.utcnow)
    
    
    
class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column('CommentID', db.Integer, primary_key=True)
    concert_id = db.Column('ConcertID', db.Integer, db.ForeignKey('concerts.ConcertID'), nullable=False)
    user_id = db.Column('UserID', db.String(36), db.ForeignKey('users.UserID'), nullable=False)
    comment = db.Column('Comment', db.Text, nullable=False)
    comment_date = db.Column('CommentDate', db.DateTime, nullable=False, default=datetime.utcnow)



class Follower(db.Model):
    __tablename__ = 'followers'

    id = db.Column('FollowerID', db.Integer, primary_key=True)
    follower_id = db.Column('UserID', db.String(36), db.ForeignKey('users.UserID'), nullable=False)
    followed_id = db.Column('ArtistID', db.String(36), db.ForeignKey('users.UserID'), nullable=False)

