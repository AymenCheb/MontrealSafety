# from server.app import Server
import os
import datetime
import json
from http import HTTPStatus
from flask_cors import CORS
from flask import Flask, make_response, request

import report_utils

DEV_PORT = 5000
DEV_URL = "http://127.0.0.1:" + str(DEV_PORT)
DATA_FORMAT = "csv"

CATEGORIES = {
    "volVehicule": "Vol de véhicule à moteur",
    "VolDansVehicule": "Vol dans / sur véhicule à moteur",
    "volViolent": "Vols qualifiés",
    "mefait": "Méfait",
    "introduction": "Introduction",
    "meurtre": "Infractions entrainant la mort"
}


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

        @self.app.route("/api/reports", methods=["GET"])
        def report():
            try:
                args = request.args
                quarts = json.loads(args.get("quarts", default="[]", type=str).replace("'", '"'))

                categories = json.loads(args.get("categories", default="[]", type=str).replace("'", '"'))
                i = 0
                for category in categories:
                    categories[i] = CATEGORIES[category]
                    i += 1

                beginning_date = args.get("beginning_date", default="2015-01-01", type=str)

                end_date = args.get("end_date", default="2023-02-01", type=str)

                reports = report_utils.get_reports(quarts, categories, beginning_date, end_date)  # method call
                print("REPORTS")
                print(reports)
                return make_response({"reports": reports}) if (len(reports) > 0) else make_response("Aucun crime trouvé",
                                                                                   HTTPStatus.NOT_FOUND)
            except BaseException as error:
                return make_response(repr(error), HTTPStatus.INTERNAL_SERVER_ERROR)

        # end create app
        return self.app


server = Server()
app = server.create_app()

if __name__ == "__main__":
    print(os.listdir())
    from waitress import serve
    serve(app, host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
