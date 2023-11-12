import asyncio
import websockets
from ip import findIp
import json


try:

    async def connect(websocket, path):
        if findIp("100.110.0.217"):
            updated_data = {"message": "True"}
        print(f"Client connected")
        try:
            await websocket.send(json.dumps(updated_data))
        except Exception as e:
            print(f"Error sending data: {e}")

    async def main():
        server = await websockets.serve(connect, "localhost", 8080)
        await server.wait_closed()

    if __name__ == "__main__":
        asyncio.get_event_loop().run_until_complete(main())
except KeyboardInterrupt:
    print("KeyboardInterrupt received. Cleaning up...")
    print("Cleanup complete.")
