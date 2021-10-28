import os

class Config:
    #for heroku
    SQLALCHEMY_DATABSE_URI = os.environ.get('DATABASE_URL')