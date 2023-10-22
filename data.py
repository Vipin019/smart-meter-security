import asyncio
import random
import websockets
import json


async def server(websocket, path):
    print(f"Client connected")
    while True:
        updated_data = {
            "current": random.randint(1, 30),
            "voltage": random.randint(1, 220),
        }
        await websocket.send(json.dumps(updated_data))


asyncio.get_event_loop().run_until_complete(websockets.serve(server, "localhost", 8080))
asyncio.get_event_loop().run_forever()
