QUERY_LOG_FILE = "./thing"
SLEEP_TIMER = 10
LOG_REGEX = "(\S{1,3}) (\d{1,2}) (\d{1,2}:\d{1,2}:\d{1,2}) .*: client (\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}#\d{1,5}):" \
            " query: (.*) IN (.*) (\+|\-)(\S{0,3})"#Logs are long
"""
REGEX FORMAT
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
