LOGGING_FILE = "./thing"
SLEEP_TIMER = 10
LOG_REGEX = "(\d{1,2}-\S{3}-\d{1,4} \d\d:\d\d:\d\d\.\d\d\d).*\b(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\b#\d{0,5}" \
                 " \((.*)\): .*: (.*) IN (.*) ([+-])(\S{1}) \((\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\)"#Logs are long
