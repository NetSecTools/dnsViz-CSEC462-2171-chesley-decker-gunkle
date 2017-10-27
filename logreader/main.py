import csv
import subprocess
import re
from time import sleep
from dnsconf import LOGGING_FILE
from dnsconf import SLEEP_TIMER
from dnsconf import LOG_REGEX




BIND_MONTHS_DICT = {
    "Jan" : 1,
    "Feb" : 2,
    "Mar" : 3,
    "Apr" : 4,
    "May" : 5,
    "Jun" : 6,
    "Jul" : 7,
    "Aug" : 8,
    "Sep" : 9,
    "Oct" : 10,
    "Nov" : 11,
    "Dec" : 12
}

def main():
    regexExp = re.compile(LOG_REGEX)
    while(True):
        tailedLog = subprocess.getoutput("tail " + LOGGING_FILE)
        print(tailedLog)
        sleep(SLEEP_TIMER)


if __name__ == "__main__":
    main()