import socketio
from ip import findIp

sio = socketio.Server(cors_allowed_origins="*")
app = socketio.WSGIApp(sio)

updated_data = {"message": "False"}


@sio.event
def connect(sid, environ):
    if findIp("100.110.19.177"):
        updated_data = {"message": "True"}
    print(f"Client {sid} connected")
    sio.emit("updated_data", updated_data, room=sid)


@sio.event
def disconnect(sid):
    print(f"Client {sid} disconnected")


if __name__ == "__main__":
    import eventlet
    import threading

    eventlet.wsgi.server(eventlet.listen(("localhost", 8080)), app)

    # Simulate data updates in a separate thread
    update_thread = threading.Thread(target=lambda: eventlet.spawn_after(1, connect))
    update_thread.start()
