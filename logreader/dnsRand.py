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
            splitIP = splitLine[3].split("#")
            print(splitIP)
            splitNums = splitIP[0].split(".")
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
                assembledLine += newIP + "#" + splitIP[1] + " "
            print(assembledLine)
            assembledLine += "\n"
            f.write(assembledLine)

if __name__ == "__main__":
    main()
