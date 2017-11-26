QUERY_LOG_FILE = "./thing"  # File to parse
LOCATION_FILE = "dbip.csv"
LOCATION_URL = "http://ip-api.com/json"
SLEEP_TIMER = 60
LOG_REGEX2 = "(\S{1,3}) (\d{1,2}) (\d{1,2}:\d{1,2}:\d{1,2}) .*: client (\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}#\d{1,5}):" \
            " query: (.*) IN (.*) (\+|\-)(\S{0,3})"#Logs are long --- This is an older format ---
LOG_REGEX = "(\d{1,2})-(\S{1,3})-(\d{1,4}) (\d{1,2}:\d{1,2}:\d{1,2}\.\d{1,3}) client" \
            " (\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}#\d{1,5}) .* query: (.*) IN (.*) (\+|-)(\S{0,3}).*" #---New format ---
MONTH_NUM = 1 #Index the month is in the capture group
IP_NUM = 4
REQ_NAME = 5
FLAGS = 8
REGEX_LEN = 9
TARGET_DIR = "."
DELIMETER = "/"
"""
REGEX FORMAT:

DAY
MONTH
YEAR
TIME (24 hour, hh:mm:ss)
CLIENTIP/PORT (xxx.xxx.xxx.xxx#xxxxx)
REQUESTED NAME
RECORD TYPE
RECURSION (+/- for yes/no)
FLAGS
"""
BIND_MONTHS_DICT = {
    "jan" : 1,
    "feb" : 2,
    "mar" : 3,
    "apr" : 4,
    "may" : 5,
    "jun" : 6,
    "jul" : 7,
    "aug" : 8,
    "sep" : 9,
    "oct" : 10,
    "nov" : 11,
    "dec" : 12
}
