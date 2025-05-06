import json
import os
import random
import time


def parse_move(response):
    move_type = response.get('type')
    move = response.get('move')
    if move_type == 3:
        if move[1] > move[0]:
            move[0], move[1] = move[1], move[0]
    return [move_type, move], response.get("tick")


class Human:
    def __init__(self, human_in, poll_interval):
        self.human_in = human_in
        self.poll_interval = poll_interval
        self.last_tick = -1
        self.interrupt = None

    def __str__(self):
        return "Human"

    def parse_new_message(self):
        response = None
        if os.path.exists(self.human_in):
            with open(self.human_in, 'r') as f:
                try:
                    response = json.load(f)  # Parse JSON to dict
                except json.JSONDecodeError as e:
                    print(f"Invalid JSON in {self.human_in}: {e}")
        if response is not None:
            tick = response.get('tick')
            print(f'curr_tick={tick} last_tick={self.last_tick}')
            if tick != self.last_tick and tick is not None:
                self.last_tick = tick
                return response
        time.sleep(self.poll_interval)
        return None

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

    def act(self, infoset):
        while True:
            response = self.parse_new_message()
            self._handle_response_for_interrupt(response)
            if self.interrupt == "reset" or self.interrupt == "swap":
                return random.choice(infoset[1].moves)
            else:
                if response is not None:
                    move, tick = parse_move(response)
                    if move is not None and tick is not None:
                        assert move in infoset[1].moves
                        return move

    def set_interrupt(self):
        response = self.parse_new_message()
        self._handle_response_for_interrupt(response)
