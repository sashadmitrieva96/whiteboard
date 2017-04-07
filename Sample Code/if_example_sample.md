bool tragicBackstory = false

if (roll > 19 or (perception == 20 and intellegence >= 18)):
    rerollOPCharacter()
.
else if (roll < 5 and tragicBackstory):
    rerollTerribleCharacter()
.
else:
    print('Your character is average...')
.