import csv
import re
from time import sleep
from dnsconf import QUERY_LOG_FILE as LOGGING_FILE
from dnsconf import SLEEP_TIMER
from dnsconf import LOG_REGEX
from dnsconf import BIND_MONTHS_DICT
from dnsconf import MONTH_NUM
from dnsconf import REGEX_LEN
from dnsconf import TARGET_DIR
from dnsconf import DELIMETER

"""Known constraints: This WILL NOT work for very large files
   I'm also making some guesses about the log file and what's important"""
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
        for i in range(1, REGEX_LEN+1):
            parsedLine.append(matchObj.group(i))
        parsedLine[MONTH_NUM] = BIND_MONTHS_DICT[parsedLine[MONTH_NUM].lower()] #Change the Month to a Number
        parsedOutput.append(parsedLine)
    for line in parsedOutput:
        print(line)
    return parsedOutput

def writeFile(contents, fileName, fileLocation):
    totalPath = fileLocation+DELIMETER+fileName+".csv"
    with open(totalPath, "w") as toWrite:
        csvWriter = csv.writer(toWrite)
        for line in contents:
            csvWriter.writerow(line)

def main():
    counter = 0
    while(True):
        contents = parseFile(LOGGING_FILE)
        writeFile(contents, "dnsVis"+str(counter), TARGET_DIR)
        counter += 1
        sleep(SLEEP_TIMER)


if __name__ == "__main__":
    main()
