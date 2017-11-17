import random

fileToOpen = "./thing2"


def main():
    with open (fileToOpen, "r+") as f:
        lines = f.readlines()
        f.truncate(0)
        for line in lines:
            splitLine = line.split()
            splitIP = splitLine[3].split("#")[0]
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
                assembledLine += newIP + " "
            print(assembledLine)
            assembledLine += "\n"
            f.write(assembledLine)

main()