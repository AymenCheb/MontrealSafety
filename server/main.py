from server.app import Server, DEV_PORT
import os

server = Server()
app = server.create_app()


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", DEV_PORT)))
