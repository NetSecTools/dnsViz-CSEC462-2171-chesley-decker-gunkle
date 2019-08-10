# Generate random IP addresses for testing

import random

fileToOpen = "./thing"

"""This file was just used to quickly make random IP addresses and is not part of the general tool"""

def main():
    with open (fileToOpen, "r+") as f:
        lines = f.readlines()
        f.truncate(0)
        for line in lines:
            splitLine = line.split()
            print(splitLine)
            splitIP = splitLine[3].split("#")[0]
            portNum = splitLine[3][0].split("#")[0]
            if portNum == "" or int(portNum) < 10:
                portNum = random.randint(10000, 65534)
            print(splitIP)
            splitNums = splitIP.split(".")
            splitNums[0] = random.randint(11, 255)
            while (splitNums[0] == 127 or splitNums[0] == 10):
                splitNums[0] = random.randint(11,255)
            splitNums[1] = random.randint(0, 255)
            splitNums[2] = random.randint(0, 255)
            splitNums[3] = random.randint(1,255)
            assembledLine = ""
            for i in range(0, len(splitLine)):
                if i != 3:
                    assembledLine += splitLine[i] + " "
                    continue
                newIP = ""
                for i in range(0, len(splitNums)):
                    newIP += str(splitNums[i])
                    if i < 3:
                        newIP += "."
                assembledLine += (newIP + "#" + str(portNum) + " ")
            print(assembledLine)
            assembledLine += "\n"
            f.write(assembledLine)

if __name__ == "__main__":
    main()
