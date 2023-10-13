import os
from flask import Flask,jsonify
from flask_restful import Resource, Api
from flask_cors import CORS
# from application.config import LocalDevelopmentConfig
app = None
api = None

def create_app():
    app = Flask(__name__)
    if os.getenv('ENV', "development") == "production":
      raise Exception("Currently no production config is setup.")
    else:
      print("Staring Local Development")
      # app.config.from_object(LocalDevelopmentConfig)
    # db.init_app(app)
    app.app_context().push()
    api = Api(app)
    # jwt = JWTManager(app)
    # app.app_context().push()
    CORS(app)
    return app, api
  
app,api=create_app()
from a import SecurityApi
api.add_resource(SecurityApi,"/s1")

if __name__ == '__main__':
  app.run(host='0.0.0.0',port=8080)