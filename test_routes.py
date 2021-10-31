#File to test route response codes
import os
from unittest import TestCase
from sqlalchemy import exc
from models import db, User

os.environ['DATABASE_URL'] = "postgresql:///capstone-test"
#correct address for Heroku = os.environ.get('DATABASE_URL').replace("://", "ql://", 1)
from app import app

db.create_all()


class RouteTest(testCase):
    """make sure all routes return 200"""    

    def testResponseIndex(self):
        tester = app.test_client(self)
        response = tester.get("/")
        statuscode = response.status_code
        self.assertEqual(statuscode, 200)

    def testResponseRegister(self):
        tester = app.test_client(self)
        response = tester.get("/register")
        statuscode = response.status_code
        self.assertEqual(statuscode, 200)

    def testResponseLogin(self):
        tester = app.test_client(self)
        response = tester.get("/login")
        statuscode = response.status_code
        self.assertEqual(statuscode, 200)

    def testResponseLogout(self):
        tester = app.test_client(self)
        response = tester.get("/logout")
        statuscode = response.status_code
        self.assertEqual(statuscode, 200)

    def testResponseUsersPage(self):
        tester = app.test_client(self)
        response = tester.get("/users/bob")
        statuscode = response.status_code
        self.assertEqual(statuscode, 200)

    def testResponseAdd(self):
        tester = app.test_client(self)
        response = tester.get("/add")
        statuscode = response.status_code
        self.assertEqual(statuscode, 200)

    def testResponseUserFavorite(self):
        tester = app.test_client(self)
        response = tester.get("/users/bob/favorites")
        statuscode = response.status_code
        self.assertEqual(statuscode, 200)