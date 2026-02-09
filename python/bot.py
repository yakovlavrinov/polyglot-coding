import subprocess
import time
from datetime import datetime
import random

COMMITS_PER_DAY = 3
INTERVAL_SECONDS = 60 

FILE_NAME = "activity.txt"

def run(command: list[str]):
    subprocess.run(
        command,
        check=True
    ) 

def make_change():
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    with open(FILE_NAME, "a", encoding="utf-8") as f:
     f.write(f"Update at {now}\n") 

def commit_and_push(commit_number:int):
   message = f"update: new read {commit_number}"

   run(["git", "add", FILE_NAME])
   run(["git", "commit", "-m", message])
   run(["git", "push"])

def main():
    for i in range(1, COMMITS_PER_DAY + 1):
        make_change()
        commit_and_push(i)

        if i != COMMITS_PER_DAY:
            sleep_time = INTERVAL_SECONDS + random.randint(-30, 30)
            time.sleep(sleep_time)

if __name__ == "__main__":
    main()