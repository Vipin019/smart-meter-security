import eventlet
import socketio
from ip import findIp

sio = socketio.Server()
app = socketio.WSGIApp(sio)


@sio.event
def connect(sid, environ):
    if findIp("100.110.186.42"):
        updated_data = {"message": "True"}
    print(f"Client {sid} connected")
    sio.emit("updated_data", updated_data, room=sid)


@sio.event
def disconnect(sid):
    print(f"Client {sid} disconnected")


if __name__ == "__main__":
    eventlet.wsgi.server(eventlet.listen(("localhost", 8080)), app)


# import eventlet
# import socketio
# from ip import findIp

# sio = socketio.Server()
# app = socketio.WSGIApp(sio)


# @sio.event
# def connect(sid, environ):
#     if findIp("100.110.186.42"):
#         updated_data = {"message": "True"}
#     print(f"Client {sid} connected")
#     sio.emit("updated_data", updated_data, room=sid)


# @sio.event
# def disconnect(sid):
#     print(f"Client {sid} disconnected")


# if __name__ == "__main__":
#     eventlet.wsgi.server(eventlet.listen(("localhost", 8080)), app)


# import socketio
# import eventlet
# import threading
# from ip import findIp

# sio = socketio.Server(cors_allowed_origins="*")
# app = socketio.WSGIApp(sio)


# updated_data = {"message": "False"}


# @sio.event
# def connect(sid, environ):
#     if findIp("100.110.186.42"):
#         updated_data = {"message": "True"}
#     print(f"Client {sid} connected")
#     sio.emit("updated_data", updated_data, room=sid)


# @sio.event
# def disconnect(sid):
#     print(f"Client {sid} disconnected")


# if __name__ == "__main__":
#     eventlet.wsgi.server(eventlet.listen(("localhost", 8080)), app)

#     # Simulate data updates in a separate thread
#     update_thread = threading.Thread(target=lambda: eventlet.spawn_after(1, connect))
#     update_thread.start()


# import asyncio
# import socketio
# from ip import findIp

# sio = socketio.AsyncServer(cors_allowed_origins="*")


# @sio.event
# async def connect(sid, environ):
#     if findIp("100.110.170.205"):
#         updated_data = {"message": "True"}
#     print(f"Client {sid} connected")
#     await sio.emit("updated_data", updated_data, room=sid)


# @sio.event
# async def disconnect(sid):
#     print(f"Client {sid} disconnected")


# async def main():
#     server = await asyncio.start_server(sio, "localhost", 8080)
#     async with server:
#         await server.serve_forever()


# if __name__ == "__main__":
#     asyncio.run(main())
