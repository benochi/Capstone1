import sys, json, unittest
import app
from unittest import TestCase
from sqlalchemy import exc

#mimic response from Edamam API GET
fake_resp = { "recipeId": "fake recipe ID",
        "recipeName": "fake chicken",
        "image": 'Fake image URL',
        "url": 'www.fakeurl.com',
        "uri": "fake edamam URI",
        "ingredients": ['cheese', 'milk']
}
fake_json = json.dumps(fake_resp)

class ApiTest(TestCase):

    #check response code is 200
    def testResponseIndex(self):
        tester = app.test_client(self)
        response = tester.get("/")
        statuscode = response.status_code
        self.assertEqual(statuscode, 200)

    #check if content return is application/json
    def test_content(self):
        response = fake_json
        self.assertEqual(response.content_type, "application/json")

    #check response data from mock Edama API JSON
    def testResponseData(self):
        response = fake_json
        self.assertTrue(b'recipeId' in response.data)
        self.assertTrue(b'recipeName' in response.data)
        self.assertTrue(b'image' in response.data)
        self.assertTrue(b'url' in response.data)
        self.assertTrue(b'uri' in response.data)
        self.assertTrue(b'ingredients' in response.data)


    
