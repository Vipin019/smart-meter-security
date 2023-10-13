from flask_restful import Resource,request
import json
class SecurityApi(Resource):
    def get(self):
        return {"message":"Successfully Registered"},200