# HanamikojiUI: Play Hanamikoji against a strong AI

## Linux

### 1. Prerequisites
Obtain the `first.ckpt` and `second.ckpt` model files. These files should be requested from the authors.

Prepare you system:
```bash
# 1. Check git. In case it is not available: sudo apt install git -y
git --version 

# 2. Check npm. In case it is not available: sudo apt install nodejs npm -y
npm --version

# 3. Check pip and python. In case they are not available: sudo apt install python3 python3-pip -y
python3 --version
pip3 --version
```

After installation, the full repository may use up to 6GB of storage due to a large Python virtual environment used by
the backend.

### 2. Setup (run once)

```bash
# 1. Clone the repository
git clone https://github.com/kumbwol/hanamikojiUI.git

# 2. Navigate to the project root directory. All the upcoming commands should be called from here.
cd ./hanamikojiUI

# 3. Set up the frontend
npm ci
npm run filesystemIO
npm run dev
# After "webpack compiled successfully", press Ctrl + C to stop the dev server

# 4. Set up the Python backend
python3 -m venv ./engine/hanamikoji/venv
source ./engine/hanamikoji/venv/bin/activate
pip install -r ./engine/hanamikoji/requirements.txt
```

You can now close the terminal. As a final installation step, copy the `first.ckpt` and `second.ckpt` files into following folder:
./engine/hanamikoji/baselines

### 3. Running the App

From the root of the repository run:

```bash
python3 run_all.py
```

Press Ctrl + C to stop all processes. The system should shut down gracefully.

### 4. Verifying Shutdown (optional)

```bash
lsof -i :3000
```

No elements should be listed.
If anything is still running, you may see output like:

```bash
COMMAND   PID USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
webpack 33614   jw   27u  IPv6 400242      0t0  TCP *:3000 (LISTEN)
```

To kill the process:

```bash
kill 33614
```

