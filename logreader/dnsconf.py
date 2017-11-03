QUERY_LOG_FILE = "./thing"
SLEEP_TIMER = 1
LOG_REGEX = "(\S{1,3}) (\d{1,2}) (\d{1,2}:\d{1,2}:\d{1,2}) .*: client (\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}#\d{1,5}):" \
            " query: (.*) IN (.*) (\+|\-)(\S{0,3})"#Logs are long
"""
REGEX FORMAT:

MONTH
DATE
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
