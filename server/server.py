import datetime
from http import HTTPStatus
from flask_cors import CORS
from flask import Flask, make_response, request

DEV_PORT = 8080
DEV_URL = "http://127.0.0.1:" + str(DEV_PORT)
DATA_FORMAT = "csv"


def now():
    return datetime.datetime.now(tz=datetime.timezone.utc)


class Server:

    def __init__(self):
        self.timestamp = None
        self.app = None

    # Flask factory pattern official documentation: https://flask.palletsprojects.com/en/2.0.x/patterns/appfactories/
    # Example with route: https://medium.com/analytics-vidhya/how-to-test-flask-applications-aef12ae5181c
    def create_app(self):
        self.app = Flask(__name__)

        # Using the CORS extension:
        # https://flask-cors.readthedocs.io/en/latest/api.html?highlight=Access-Control-Allow-Origin#using-the-cors-extension
        CORS(self.app, ressources=r"/api/*")

        @self.app.before_request
        def update_timestamp():
            self.timestamp = now()

        @self.app.route("/", methods=["GET"])
        def home():
            return make_response("server is active", HTTPStatus.OK)

        # end create app
        return self.app
