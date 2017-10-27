import csv
import subprocess
import dnsconf
import re
from time import sleep

def LOGGING_FILE(): return "./thing"
def SLEEP_TIMER(): return 10
def LOG_REGEX(): "\d{1,2}-\S{3}-\d{1,4} \d\d:\d\d:\d\d\.\d\d\d.*\b(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\b#\d{0,5}" \
                 " \((.*)\): .*: (.*) IN (.*) ([+-])(\S{1}) \((\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\)"#Logs are long

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
    regexExp = re.compile(LOGGING_FILE())
    while():
        subprocess.getoutput("tail -f " + dnsconf.LOGGING_FILE())
        sleep(SLEEP_TIMER())


if __name__ == "__main__":
    main()