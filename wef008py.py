"""cmt: wtf this is bit too complicate -> only for unified same length"""
'''def splitpatterns(str):
    updatedlist = []
    str1 = str.split('\n')
    maxlen = 0
    for s in str1:
        if len(s) < maxlen:
            innerlist = []
            for num in maxlen:
                if num < len(s):
                    innerlist.append(s[num])
                else:
                    innerlist.append('.')
        else:
            for s in str1:
                innerlist = []
                for inners in s:
                    innerlist.append(inners)
        updatedlist.append(innerlist)
    return updatedlist
'''

from colorsys import TWO_THIRD


def splitpatterns(str):
    maxlength = 0
    str1 = str.split('\n')
    lst = []
    for s in str1:
        if len(s) > maxlength:
            maxlength = len(s)
    for s in str1:
        innerlist = []
        for inners in s:
            innerlist.append(inners)
        lst.append(innerlist)
    # for l in lst:
        # print(l)
    print('max len', maxlength, 'total length', len(str1))

# thir
thir = splitpatterns('''.....O.......O
...OO.OO...OO.OO
......OO...OO
........O.O
.O....O.O.O.O....O
OOO.....O.O.....OOO
O.....O.O.O.O.....O
..O..O..O.O..O..O
..OO...OO.OO...OO
O.......O.O.......O
O......OO.OO......O''')
print('third')
thir

# fir
fir = splitpatterns('''OOOOO
O....O.......OO
O...........OO.OOO
.O.........OO.OOOO
...OO...OO.OO..OO
.....O....O..O
......O.O.O.O
.......O
.......O
......O.O.O.O
.....O....O..O
...OO...OO.OO..OO
.O.........OO.OOOO
O...........OO.OOO
O....O.......OO
OOOOO''')
print('fir')
fir

# 2nd
sec = splitpatterns('''O...........
OOOO........
..OO........
.....O......
OOOOOO......
......O.O...
O.O.OOOOOO..
O.OO.....OO.
....OO....OO
OOOOO....OO.
............
OOOOO....OO.
....OO....OO
O.OO.....OO.
O.O.OOOOOO..
......O.O...
OOOOOO......
.....O......
..OO........
OOOO........
O...........''')
print('sec')
sec