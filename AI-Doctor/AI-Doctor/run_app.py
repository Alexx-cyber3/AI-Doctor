import os
import subprocess
import sys
import shutil

def run_command(command):
    try:
        # Use shell=True for Windows compatibility
        subprocess.check_call(command, shell=True)
        return True
    except subprocess.CalledProcessError:
        return False

def main():
    print("Starting AI Doctor Assistance Platform...")

    # 1. Install Python Requirements
    if os.path.exists("requirements.txt"):
        print("Checking/Installing Python requirements...")
        # Wrap sys.executable in quotes to handle spaces in paths (e.g., C:\Program Files)
        python_exe = f'"{sys.executable}"'
        if not run_command(f"{python_exe} -m pip install -r requirements.txt"):
            print("Warning: Failed to install some Python requirements.")

    # 2. Check for Node.js dependencies
    next_bin = os.path.join("node_modules", ".bin", "next")
    if os.name == 'nt':
        next_bin += ".cmd"

    # If node_modules exists but next binary is missing, it's a broken install
    if os.path.exists("node_modules") and not os.path.exists(next_bin):
        print("Detected corrupted or incomplete node_modules. Cleaning up...")
        try:
            shutil.rmtree("node_modules")
        except Exception:
            print("Warning: Could not remove node_modules automatically. Please delete it manually if errors persist.")

    # 3. Install Node.js dependencies if missing
    if not os.path.exists("node_modules"):
        print("Installing Node.js dependencies (this may take a minute)...")
        
        success = False
        if os.path.exists("pnpm-lock.yaml"):
            print("pnpm-lock.yaml detected. Attempting pnpm install...")
            success = run_command("pnpm install")
        
        if not success:
            print("Running npm install...")
            if not run_command("npm install"):
                print("Error: Node.js installation failed.")
                sys.exit(1)
    
    # 4. Start the server
    print("\n" + "="*50)
    print("All requirements checked. Starting server...")
    print("Access the app at: http://localhost:3000")
    print("="*50 + "\n")
    
    try:
        if not run_command("npm run dev"):
            print("\nFailed to start the server.")
            sys.exit(1)
    except KeyboardInterrupt:
        print("\nShutting down...")

if __name__ == "__main__":
    main()
