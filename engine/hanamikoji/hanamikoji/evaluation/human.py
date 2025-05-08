import json
import random


def parse_move(response):
    move_type = response.get('type')
    move = response.get('move')
    if move_type == 3:
        if move[1] > move[0]:
            move[0], move[1] = move[1], move[0]
    return [move_type, move]


class Human:
    def __init__(self, websocket):
        self.interrupt = None
        self.websocket = websocket

    def __str__(self):
        return "Human"

    async def parse_new_message(self):
        raw_message = await self.websocket.recv()
        print(f"Received: {raw_message}")
        response = json.loads(raw_message)
        return response

    def _handle_response_for_interrupt(self, response):
        if response is not None:
            command = response.get("command")
            if command == "swap":
                self.interrupt = "swap"
                return
            if command == "reset":
                self.interrupt = "reset"
                return
        return

    async def act(self, infoset):
        response = await self.parse_new_message()
        self._handle_response_for_interrupt(response)
        if self.interrupt == "reset" or self.interrupt == "swap":
            return random.choice(infoset[1].moves)
        else:
            move = parse_move(response)
            assert move in infoset[1].moves
            return move

    async def set_interrupt(self):
        response = await self.parse_new_message()
        self._handle_response_for_interrupt(response)
