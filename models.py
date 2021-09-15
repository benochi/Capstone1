"""models for reverse recipe app"""
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt 

db = SQLAlchemy()
bcrypt = Bcrypt()

def connect_db(app):
    db.app = app
    db.init_app(app)

### User class and class methods ###

class User(db.Model):
    """user class model"""
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    first_name = db.Column(db.String(30), nullable=False)
    last_name = db.Column(db.String(30), nullable=False)
    username = db.Column(db.String(20), nullable=False, unique=True)
    pw = db.Column(db.Text, nullable=False)
    email  = db.Column(db.String(50), nullable=False, unique=True)
    #favorites = db.relationship("Favorites", backref="user", cascade="all,delete")

    def __repr__(self):
        return f'<User #{self.id}: name={self.name} email={self.email} birth_year={self.birth_year} color={self.color} lucky_num={self.lucky_num}>'

    @classmethod 
    def register(cls, username, pw, first_name, last_name, email):
        """register a new user, hash PW for storage into DB"""
        hashed = bcrypt.generate_password_hash(pw)
        hashed_utf8 = hashed.decode("utf8")
        user = cls(
            username=username,
            pw=hashed_utf8,
            first_name=first_name,
            last_name=last_name,
            email=email
        )
    
        db.session.add(user)
        return user
    
    @classmethod
    def authenticate(cls, username, pw):
        """Check user exists and password is correct"""
        user = User.query.filer_by(username=username).first() #username is unique
        if user and bcrypt.check_password_hash(user.pw, pw):
            return user
        else:
            return False

### favorite recipes ###
#class Recipe(db.Model):
#    """user recipe join table model"""
#    __tablename__ = "users_recipes"

#    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
#    user_id = db.Column(Integer, ForeignKey('user.id'))
#    recipe_id = db.Column(Integer, ForeignKey('recipe.id')) #API get request

###serialize function ###

def serialize(self):
    """Serialize user to a dict for JSON output."""
    return { #id, first_name, last_name, username, pw, email
        "id":self.id,
        "first_name": self.first_name,
        "last_name": self.last_name,
        "username": self.username,
        "pw": self.pw,
        "email": self.email
    }