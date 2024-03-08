from flask import Flask
from dotenv import load_dotenv
from os import getenv
from flask_jwt_extended import JWTManager
from sqlalchemy import create_engine
from sqlalchemy.engine.url import make_url
from flask_bcrypt import Bcrypt
from flask_cors import CORS

from .models.user import db, User

# Loading the env
load_dotenv()

def create_app():
    # Create Flask application instance
    app = Flask(__name__)
    #app.url_map.strict_slashes = False
    CORS(app, supports_credentials=True)

    #Configuration settings
    app.config['SECRET_KEY'] = getenv('SECRET_KEY')
    app.config['SQLALCHEMY_DATABASE_URI'] = getenv('SQLALCHEMY_DATABASE_URI')

    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = int(getenv('JWT_ACCESS_TOKEN_EXPIRES'))
    jwt = JWTManager(app)

    SQLALCHEMY_TRACK_MODIFICATION = False
    SQLALCHEMY_ECHO = True

    bcrypt = Bcrypt(app)
    db.init_app(app)

    sa_url = make_url(app.config['SQLALCHEMY_DATABASE_URI'])
    engine = create_engine(sa_url)

    with app.app_context():
        db.create_all()

    # Import and register blueprints (if you're using blueprints)
    from .routes import main_bp
    app.register_blueprint(main_bp)

    return app
