import asyncio
import random
import websockets
import json

try:

    async def server(websocket, path):
        print(f"Client connected")
        while True:
            updated_data = {
                "vrms": random.randint(1, 220),
                "irms": random.randint(1, 30),
                "apparentPower": random.randint(1, 300),
                "realPower": random.randint(1, 200),
                "kwh": random.randint(1, 300),
            }
            try:
                await websocket.send(json.dumps(updated_data))
            except Exception as e:
                print(f"Error sending data: {e}")
                break

    asyncio.get_event_loop().run_until_complete(
        websockets.serve(server, "localhost", 81)
    )
    asyncio.get_event_loop().run_forever()
except KeyboardInterrupt:
    print("KeyboardInterrupt received. Cleaning up...")
    print("Cleanup complete.")
