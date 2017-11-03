import csv
import subprocess
import os
import re
from time import sleep
from dnsconf import QUERY_LOG_FILE as LOGGING_FILE
from dnsconf import SLEEP_TIMER
from dnsconf import LOG_REGEX
from dnsconf import BIND_MONTHS_DICT

"""Known constraints: This WILL NOT work for very large files
   I'm also making some guesses about the log file and what's imortant"""
"""
Takes: A filename of a file to read
Returns: An array of arrays of parsed data
Destroys the file to save space because query logs can blow up quickly
"""
def parseFile(fileName):
    lines = [] #Lines of the log file
    with open(LOGGING_FILE, "r+") as logFile:
        lines = logFile.readlines()
        logFile.truncate(0)
    regexExp = re.compile(LOG_REGEX)
    parsedOutput = []
    for line in lines:
        matchObj = regexExp.match(line)
        parsedLine = []
        for i in range(1, 9):
            parsedLine.append(matchObj.group(i))
        parsedOutput.append(parsedLine)
    for line in parsedOutput:
        print(line)

def main():
    while(True):
        parseFile(LOGGING_FILE)
        sleep(SLEEP_TIMER)


if __name__ == "__main__":
    main()
