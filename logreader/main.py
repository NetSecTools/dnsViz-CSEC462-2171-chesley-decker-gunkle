import csv
import re
import requests
import os
from time import sleep
from dnsconf import QUERY_LOG_FILE as LOGGING_FILE
from dnsconf import LOCATION_FILE
from dnsconf import LOCATION_URL
from dnsconf import SLEEP_TIMER
from dnsconf import LOG_REGEX
from dnsconf import BIND_MONTHS_DICT
from dnsconf import MONTH_NUM
from dnsconf import IP_NUM
from dnsconf import REGEX_LEN
from dnsconf import TARGET_DIR
from dnsconf import DELIMETER
from dnsconf import REQ_NAME
from dnsconf import FLAGS

"""Known constraints: This WILL NOT work for very large files
   I'm also making some guesses about the log file and what's important
   
   Due to rate limiting, I cannot parse more than 100 locations/min without
   paying for a higher tier"""


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
    counter = 0
    for line in lines:
        matchObj = regexExp.match(line)
        parsedLine = []
        if matchObj == None:
            continue
        for i in range(1, REGEX_LEN+1):
            parsedLine.append(matchObj.group(i))
        parsedLine[MONTH_NUM] = BIND_MONTHS_DICT[parsedLine[MONTH_NUM].lower()] #Change the Month to a Number
        try:
            location = findLocation(parsedLine[IP_NUM])
            if "D" in parsedLine[FLAGS]: #Only check DNSSEC validation if query requests it
                validation = dnssecCheck(parsedLine[REQ_NAME])
            else:
                validation = "pass" #Default to pass
        except:
            continue
        parsedLine.extend(location)
        parsedLine.append(validation)
        parsedOutput.append(parsedLine)
        counter += 1
        if counter == 100: #This is only necessary because of the rate limiting, will truncate anything over 100 lines
            break           #These can be removed if the rate limiting is gone
    for line in parsedOutput:
        print(line)
    return parsedOutput

def writeFile(contents, fileName, fileLocation):
    totalPath = fileLocation+DELIMETER+fileName+".csv"
    with open(totalPath, "w") as toWrite:
        csvWriter = csv.writer(toWrite)
        for line in contents:
            csvWriter.writerow(line)

def findLocation(IP):
   formatted = IP.split("#")[0]
   url = LOCATION_URL + "/" + formatted + "?" + "fields=207"
   response = requests.get(url, "")
   data = response.json()
   return [data['region'], data['regionName'], data['country'], data['countryCode'], data['lat'], data['lon']]

def dnssecCheck (NAME):
    output = os.popen("dig +noall +comments +dnssec example.com| grep status").read()
    if "SERVFAIL" in output:
        return "fail"
    else:
        return "pass"

		
def main():
    counter = 0
    while(True):
        contents = parseFile(LOGGING_FILE)
        if contents == None:
            sleep(SLEEP_TIMER)
            continue
        if contents != []:
            writeFile(contents, "dnsVis"+str(counter), TARGET_DIR)
            counter += 1
        sleep(SLEEP_TIMER)


if __name__ == "__main__":
    main()
