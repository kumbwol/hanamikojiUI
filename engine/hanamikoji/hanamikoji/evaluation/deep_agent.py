import torch
import numpy as np

from hanamikoji.env.env import get_obs


def _load_model(round_id, ckpt_dir_path):
    from hanamikoji.dmc.models import model_dict
    ckpt_path = ckpt_dir_path + '/' + round_id + '.ckpt'
    model = model_dict[round_id]()
    model_state_dict = model.state_dict()
    if torch.cuda.is_available():
        pretrained = torch.load(ckpt_path, map_location='cuda:0')
    else:
        pretrained = torch.load(ckpt_path, map_location='cpu')
    pretrained = {k: v for k, v in pretrained.items() if k in model_state_dict}
    model_state_dict.update(pretrained)
    model.load_state_dict(model_state_dict)
    if torch.cuda.is_available():
        model.cuda()
    model.eval()
    return model


class DeepAgent:

    def __init__(self, ckpt_dir_path):
        self.model_first = _load_model('first', ckpt_dir_path)
        self.model_second = _load_model('second', ckpt_dir_path)

    def __str__(self):
        return "DeepAgent"

    def act(self, infoset):
        if len(infoset[1].moves) == 1:
            return infoset[1].moves[0]

        obs = get_obs(infoset)

        z_batch = torch.from_numpy(obs['z_batch']).float()
        x_batch = torch.from_numpy(obs['x_batch']).float()
        if torch.cuda.is_available():
            z_batch, x_batch = z_batch.cuda(), x_batch.cuda()
        if infoset[0].id_to_round_id[infoset[0].acting_player_id] == 'first':
            y_pred = self.model_first.forward(z_batch, x_batch, return_value=True)['values']
        else:
            y_pred = self.model_second.forward(z_batch, x_batch, return_value=True)['values']
        y_pred = y_pred.detach().cpu().numpy()

        best_move_index = np.argmax(y_pred, axis=0)[0]
        best_move = infoset[1].moves[best_move_index]

        return best_move
