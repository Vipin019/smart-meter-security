from flask_restful import Resource, request
from ip import findIp


class SecurityApi(Resource):
    def get(self):
        return {"find": findIp("100.110.132.88")}, 200
