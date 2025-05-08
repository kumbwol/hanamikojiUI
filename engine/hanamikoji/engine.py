import argparse
import asyncio
import os
import json
import websockets

from hanamikoji.evaluation.deep_agent import DeepAgent
from hanamikoji.evaluation.human import Human
from hanamikoji.env.game import GameEnv, get_card_play_data


def parse_args():
    parser = argparse.ArgumentParser('Hanamikoji Play')
    parser.add_argument('--ckpt_folder', type=str, default='baselines/')
    parser.add_argument('--gpu_device', type=str, default='')
    return parser.parse_args()


def setup_environment(args):
    os.environ['KMP_DUPLICATE_LIB_OK'] = 'True'
    os.environ["CUDA_VISIBLE_DEVICES"] = args.gpu_device


async def write_state(env, websocket):
    d = {env.tick: env.to_dict()}
    message = json.dumps(d)
    print(f'Sending: {message}')
    await websocket.send(message)
    env.tick += 1


def get_human_id(players):
    if isinstance(players['first'], Human):
        return 'first'
    if isinstance(players['second'], Human):
        return 'second'
    return None


def get_opp(curr):
    return 'first' if curr == 'second' else 'second'


def get_human(players):
    human_id = get_human_id(players)
    if human_id is None:
        return None
    return players[human_id]


def tidy_up(env):
    env.reset()
    env.card_play_init(get_card_play_data())


def swap_players(env, websocket):
    players = env.players
    human_id = get_human_id(players)
    opp = get_opp(human_id)
    players[human_id] = players[opp]
    players[opp] = Human(websocket)
    tidy_up(env)


def reset_players(env, websocket):
    players = env.players
    human_id = get_human_id(players)
    players[human_id] = Human(websocket)
    tidy_up(env)


def handle_interrupt(env, websocket):
    human = get_human(env.players)
    if human is None:
        return
    if human.interrupt == "swap":
        swap_players(env, websocket)
        return
    if human.interrupt == "reset":
        reset_players(env, websocket)
        return
    return


async def play_game(websocket):
    args = parse_args()
    setup_environment(args)

    players = {'first': Human(websocket), 'second': DeepAgent(args.ckpt_folder)}
    # players = {'first': DeepAgent(args.ckpt_folder), 'second': DeepAgent(args.ckpt_folder)}
    env = GameEnv(players)
    env.card_play_init(get_card_play_data())
    print("Agent backend started.")

    while True:
        await write_state(env, websocket)
        await env.step()
        handle_interrupt(env, websocket)
        if env.winner:
            await write_state(env, websocket)
            while env.winner is not None:
                human = get_human(env.players)
                if human is not None:
                    human.set_interrupt()
                    handle_interrupt(env, websocket)
                else:
                    tidy_up(env)
                    break


async def main():
    server = await websockets.serve(play_game, "localhost", 8764)
    print("Engine WebSocket server running at ws://localhost:8764")
    await server.wait_closed()


if __name__ == '__main__':
    asyncio.run(main())
