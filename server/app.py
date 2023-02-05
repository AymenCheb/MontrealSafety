import datetime
import json
from http import HTTPStatus
from flask_cors import CORS
from flask import Flask, make_response, request

DEV_PORT = 5000
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
            return make_response("server is active!!", HTTPStatus.OK)

        # return {
        #   reports: [{
        #           lat: number,
        #           long: number,
        #           quart: string,
        #           category: string,
        #           date: string,
        #       }]
        #   }

        @self.app.route("/api/reports", methods=["GET"])
        def report():
            try:
                args = request.args
                quarts = json.loads(args.get("quarts", default="[]", type=str).replace("'", '"'))
                categories = json.loads(args.get("categories", default="[]", type=str).replace("'", '"'))
                beginning_date = args.get("beginning_date", default="", type=str)
                end_date = args.get("end_date", default="", type=str)

                reports = [1]  # method call

                return make_response(reports) if len(reports) > 0 else make_response("Aucun crime trouvé",
                                                                                   HTTPStatus.NOT_FOUND)
            except BaseException as error:
                return make_response(repr(error), HTTPStatus.INTERNAL_SERVER_ERROR)

        # end create app
        return self.app