import subprocess
import os
import platform


def run_command(command, cwd=None):
    return subprocess.Popen(command, cwd=cwd, shell=True)


# Ensure an empty agent_out.json exists before start
json_file_path = os.path.join("engine", "hanamikoji", "agent_out.json")
os.makedirs(os.path.dirname(json_file_path), exist_ok=True)
with open(json_file_path, 'w') as f:
    pass

processes = []

# Start frontend
processes.append(run_command("npm run start"))

# Run Python backend in the correct directory
python_dir = os.path.join("engine", "hanamikoji")
if platform.system() == "Windows":
    activate_cmd = "..\\..\\venv\\Scripts\\activate && python engine.py"
else:
    activate_cmd = "venv/bin/python engine.py"
processes.append(run_command(activate_cmd, cwd=python_dir))

# Wait for all
for p in processes:
    p.wait()
