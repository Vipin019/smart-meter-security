import socketio
import random

sio = socketio.Server(cors_allowed_origins="*")
app = socketio.WSGIApp(sio)

updated_data = {"current": 0, "voltage": 0}


@sio.event
def connect(sid, environ):
    updated_data = {
        "current": random.randint(1, 30),
        "voltage": random.randint(1, 220),
    }
    print(f"Client {sid} connected")
    sio.emit("updated_data", updated_data, room=sid)


@sio.event
def disconnect(sid):
    print(f"Client {sid} disconnected")


if __name__ == "__main__":
    import eventlet
    import threading

    eventlet.wsgi.server(eventlet.listen(("localhost", 8081)), app)

    # Simulate data updates in a separate thread
    update_thread = threading.Thread(target=lambda: eventlet.spawn_after(5, connect))
    update_thread.start()
