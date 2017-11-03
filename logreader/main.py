import csv
import subprocess
import os
import re
from time import sleep
from dnsconf import QUERY_LOG_FILE as LOGGING_FILE
from dnsconf import SLEEP_TIMER
from dnsconf import LOG_REGEX

"""Known constraints: This WILL NOT work for very large files
   I'm also making some guesses about the log file and what's imortant"""
"""
Takes: A filename of a file to read
Returns: An array of arrays of parsed data
Destroys the file to save space because query logs can blow up quickly
"""
def parseFile(fileName):
    lines = ""
    with open(LOGGING_FILE, "r+") as logFile:
        lines = logFile.readlines()
        logFile.truncate()
    regexExp = re.compile(LOG_REGEX)
    lines = lines.split["\n"]
    parsedOutput = []
    for line in lines:
       matchObj = re.match(line)
       parsedLine = []
       for i in range(0, 7):
          parsedLine.append(matchObj.group(i))

def main():
    while(True):
        parseFile(LOGGING_FILE)
        sleep(SLEEP_TIMER)


if __name__ == "__main__":
    main()