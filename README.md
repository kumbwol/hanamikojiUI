# HanamikojiUI: Play Hanamikoji against a strong AI

## Linux

### 1. Prerequisites
```bash
# 1. Check git. In case it is not available: sudo apt install git -y
git --version 

# 2. Check npm. In case it is not available: sudo apt install nodejs npm -y
npm --version

#3 Check pip and python. In case they are not available: sudo apt install python3 python3-pip -y
python3 --version
pip3 --version
```
The whole repo after install will take roughly 6GB storage (mostly because the backend uses a huge python venv)

### 2. Prepare the repo (has to do only once)
```bash
# 1. Clone the repo
git clone https://github.com/kumbwol/hanamikojiUI.git

# 2. Move to the root of the repo. All the upcoming commands should be called from here.
cd ./hanamikojiUI

# 3a. Call npm ci
npm ci

# 3b. Call npm run dev. After receiving the message on "webpack compiled successfully" you can hit Ctrl + c to get back terminal
npm run dev

# 4. Prepare the python backend
python3 -m venv ./engine/hanamikoji/venv
source ./engine/hanamikoji/venv/bin/activate
pip install -r ./engine/hanamikoji/requirements.txt
```

After succesfull preparation you can turn off the terminal.


## 3. Run
From the root of the repo call:
```bash
python3 run_all.py
```

You can stop the processes by hitting ctlr + c. It is expected that everything will close down nicely.
To assure that everything closed nicely hit
```bash
lsof -i :3000
```
No elements should be listed. (In case some elements are listed kill them by the pid e.g: kill 33614)

