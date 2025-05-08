import subprocess
import os
import platform


def run_command(command, cwd=None):
    return subprocess.Popen(command, cwd=cwd, shell=True)


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
