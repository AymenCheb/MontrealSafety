from server.app import Server
import os

server = Server()
app = server.create_app()


if __name__ == "__main__":
    from waitress import serve
    serve(app, host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
