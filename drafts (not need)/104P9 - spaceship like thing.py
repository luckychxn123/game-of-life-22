Python 3.10.4 (tags/v3.10.4:9d38120, Mar 23 2022, 23:13:41) [MSC v.1929 64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license()" for more information.
str = '''......O....O......
..OO..........OO..
..O..O......O..O..
...OOO.OOOO.OOO...
......O....O......
...OOO......OOO...
..O............O..
...OOOOO..OOOOO...
........OO........
.....OO....OO.....
....O.O....O.O....
....OO......OO....
..................
..................
......OO..OO......
.....O..OO..O.....
...O.O.OOOO.O.O...
.OOO.O.O..O.O.OOO.
O...OO.OOOO.OO...O
.OO...O....O...OO.
...OO..O..O..OO...
...O.OO....OO.O...'''

str = str.split('\n')

str
['......O....O......', '..OO..........OO..', '..O..O......O..O..', '...OOO.OOOO.OOO...', '......O....O......', '...OOO......OOO...', '..O............O..', '...OOOOO..OOOOO...', '........OO........', '.....OO....OO.....', '....O.O....O.O....', '....OO......OO....', '..................', '..................', '......OO..OO......', '.....O..OO..O.....', '...O.O.OOOO.O.O...', '.OOO.O.O..O.O.OOO.', 'O...OO.OOOO.OO...O', '.OO...O....O...OO.', '...OO..O..O..OO...', '...O.OO....OO.O...']
len(str)
22
for s in str:
    print(len(s))

    
18
18
18
18
18
18
18
18
18
18
18
18
18
18
18
18
18
18
18
18
18
18
