TYPE_0_STASH = 0
TYPE_1_TRASH = 1
TYPE_2_CHOOSE_1_2 = 2
TYPE_3_CHOOSE_2_2 = 3
TYPE_4_RESOLVE_1_2 = 4
TYPE_5_RESOLVE_2_2 = 5

class MovesGener(object):
    """
    This is for generating the possible combinations
    """
    def __init__(self, cards_list, action_cards, choose_1_2, choose_2_2):
        self.stash_1 = None
        self.trash_2 = None
        self.choose_1_2 = None
        self.choose_2_2 = None
        self.resolve_1_2 = None
        self.resolve_2_2 = None

        if choose_1_2:
            self.resolve_1_2 = []
            for i, val in enumerate(choose_1_2):
                if val != 0:
                    a = [0] * 7
                    b = choose_1_2[:]
                    a[i] = 1
                    b[i] -= 1
                    self.resolve_1_2.append([TYPE_4_RESOLVE_1_2, [a, b]])
            return

        if choose_2_2:
            self.resolve_2_2 = [[TYPE_5_RESOLVE_2_2, [[], []]], [TYPE_5_RESOLVE_2_2, [[], []]]]
            self.resolve_2_2[0][1][0] = choose_2_2[0]
            self.resolve_2_2[0][1][1] = choose_2_2[1]
            self.resolve_2_2[1][1][0] = choose_2_2[1]
            self.resolve_2_2[1][1][1] = choose_2_2[0]
            return

        if action_cards[0] == 1:
            self.stash_1 = []
            for i in range(7):
                if cards_list[i] == 0:
                    continue
                vector = [0] * 7
                vector[i] += 1
                self.stash_1.append([TYPE_0_STASH, vector])

        if action_cards[1] == 1:
            self.trash_2 = []
            for i in range(7):
                if cards_list[i] == 0:
                    continue
                for j in range(i, 7):
                    if (i == j and cards_list[i] < 2) or (i != j and cards_list[j] == 0):
                        continue
                    vector = [0] * 7
                    vector[i] += 1
                    vector[j] += 1
                    self.trash_2.append([TYPE_1_TRASH, vector])

        if action_cards[2] == 1:
            self.choose_1_2 = []
            for i in range(7):
                if cards_list[i] == 0:
                    continue
                hand_i = cards_list[i] - 1
                for j in range(i, 7):
                    if (i == j and hand_i == 0) or (i != j and cards_list[j] == 0):
                        continue
                    hand_j = hand_i - 1 if i == j else cards_list[j] - 1
                    for k in range(j, 7):
                        if (j == k and hand_j == 0) or (j != k and cards_list[k] == 0):
                            continue
                        vector = [0] * 7
                        vector[i] += 1
                        vector[j] += 1
                        vector[k] += 1
                        self.choose_1_2.append([TYPE_2_CHOOSE_1_2, vector])

        if action_cards[3] == 1:
            self.choose_2_2 = []
            for p in range(7):
                if cards_list[p] == 0:
                    continue
                for q in range(p, 7):
                    if (p == q and cards_list[p] < 2) or (p != q and cards_list[q] == 0):
                        continue
                    temp_hand = cards_list[:]
                    temp_hand[p] -= 1
                    temp_hand[q] -= 1
                    if temp_hand[p] < 0 or temp_hand[q] < 0:
                        continue
                    for r in range(p, 7):
                        if temp_hand[r] == 0:
                            continue
                        for s in range(r, 7):
                            if (r == s and temp_hand[r] < 2) or (r != s and temp_hand[s] == 0):
                                continue
                            if p == r and q > s:
                                continue
                            pair1 = [0] * 7
                            pair2 = [0] * 7
                            pair1[p] += 1
                            pair1[q] += 1
                            pair2[r] += 1
                            pair2[s] += 1
                            self.choose_2_2.append([TYPE_3_CHOOSE_2_2, [pair1, pair2]])

    # generate all possible moves from given cards
    def gen_moves(self):
        moves = []
        if self.stash_1:
            moves.extend(self.stash_1)
        if self.trash_2:
            moves.extend(self.trash_2)
        if self.choose_1_2:
            moves.extend(self.choose_1_2)
        if self.choose_2_2:
            moves.extend(self.choose_2_2)
        if self.resolve_1_2:
            moves.extend(self.resolve_1_2)
        if self.resolve_2_2:
            moves.extend(self.resolve_2_2)
        return moves
