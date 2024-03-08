#!/usr/bin/python3
"""Holds class User"""
#from os import getenv
#import sqlalchemy
#from sqlalchemy import Column, String
#from sqlalchemy.orm import relationship
from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4
from datetime import datetime

db = SQLAlchemy()

def get_uuid():
    return uuid4().hex

class User(db.Model):
    """Representation of a user """
    if db:
        __tablename__ = 'users'
        
        id = db.Column(db.String(150), primary_key=True, unique=True, default=get_uuid)
        username = db.Column(db.String(150), unique=True, nullable=False)
        email = db.Column(db.String(150), unique=True, nullable=False)
        password = db.Column(db.String(150), nullable=False)
        created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    else:
        id = ""
        username = ""
        email = ""
        password = ""
        created_at = ""

    #def __init__(self, *args, **kwargs):
    #    """initializes user"""
    #    super().__init__(*args, **kwargs)
