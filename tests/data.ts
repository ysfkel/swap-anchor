
const assets1 = [
    ['Cannon', 'CAN', 'A cannon for defending yer ship!', './assets/cannon.png', 'cannon.png'],
    ['Cannon Ball', 'CANB', 'Cannon balls for yer cannons!', './assets/cannon-ball.png', 'cannon-ball.png'],
    ['Compass', 'COMP', 'A compass to navigate the seven seas!', './assets/compass.png', 'compass.png'],
    ['Gold', 'GOLD', 'Ahh the finest gold in all of these waters!', './assets/coin1-tp.png', 'coin1-tp.png'],
    ['Fishing Net', 'FISH', 'A fishing net for catching meals for the crew!', './assets/fishing-net.png', 'fishing-net.png'],
    ['Grappling Hook', 'GRAP', 'A grappling hook for boarding other ships!', './assets/grappling-hook.png', 'grappling-hook.png'],
    ['Gunpowder', 'GUNP', 'Gunpowder for ye muskets!', './assets/gunpowder.png', 'gunpowder.png'],
    ['Musket', 'MUSK', 'A musket for firing on enemies!', './assets/musket.png', 'musket.png'],
    ['Rum', 'RUM', 'Rum, more rum!', './assets/rum.png', 'rum.png'],
    ['Telescope', 'TELE', 'A telescope for spotting booty amongst the seas!', './assets/telescope.png', 'telescope.png'],
    ['Treasure Map', 'TMAP', 'A map to help ye find long lost treasures!', './assets/treasure-map-1.png', 'treasure-map-1.png'],
]

interface Asset {
    name: string
    symbol: string
    description: string
    imagePath: string
    imageName: string,
    secret?: Uint8Array
}

export const assets: Asset[] = [   
  {name: 'Cannon', symbol: 'CAN', description: 'A cannon for defending yer ship!', imagePath:'./assets/cannon.png', imageName:'cannon.png'},
  {name: 'Cannon Ball', symbol: 'CANB', description: 'Cannon balls for yer cannons!', imagePath:'./assets/cannon-ball.png', imageName:'cannon-ball.png'},
  {name: 'Compass', symbol: 'COMP', description: 'A compass to navigate the seven seas!', imagePath:'./assets/compass.png', imageName:'compass.png'},
  {name: 'Gold', symbol: 'GOLD', description: 'Ahh the finest gold in all of these waters!', imagePath:'./assets/coin1-tp.png', imageName:'coin1-tp.png'}
]

export const assetsWithKeys: Asset[] = [
   {
    ...assets[0],
    secret: Uint8Array.from([33,168,47,192,218,191,16,144,128,198,248,78,41,9,99,180,3,97,154,190,111,243,42,198,112,62,159,103,150,164,253,152,153,103,69,187,155,70,197,209,85,135,220,63,93,71,16,12,142,126,61,25,72,12,45,181,163,166,165,110,19,201,146,229])
   },
   {
    ...assets[1],
    secret: Uint8Array.from([91,148,93,133,16,111,148,14,68,151,203,179,199,128,31,249,214,24,241,253,136,58,39,216,78,30,115,243,252,51,203,57,168,123,131,50,38,239,84,99,186,141,105,109,200,147,116,29,39,227,210,227,81,174,38,140,212,201,25,69,250,20,241,217])
   },
   {
    ...assets[2],
    secret: Uint8Array.from([55,124,15,161,238,76,90,219,108,232,30,91,167,35,233,26,100,208,127,202,66,222,36,91,198,190,247,92,20,8,188,197,168,184,252,26,123,98,135,161,244,87,165,176,85,233,132,115,34,191,37,94,24,201,167,84,46,84,30,146,158,109,141,3])
   },
   {
    ...assets[3],
    secret: Uint8Array.from([18,224,110,128,50,159,145,20,61,228,130,206,120,112,59,177,63,251,193,251,195,245,226,85,123,201,105,120,55,228,155,159,146,144,39,5,6,133,61,151,207,96,204,54,36,158,119,8,141,218,138,240,220,15,27,179,142,86,36,251,129,58,81,198])
   }
]

/*
mint secretKey ->>: 33,168,47,192,218,191,16,144,128,198,248,78,41,9,99,180,3,97,154,190,111,243,42,198,112,62,159,103,150,164,253,152,153,103,69,187,155,70,197,209,85,135,220,63,93,71,16,12,142,126,61,25,72,12,45,181,163,166,165,110,19,201,146,229
mint name: Cannon mint public key: BKpiKU69szkUfviFhFHw6dYJNVAka84ibgw6vhH6fs5v

mint secretKey ->>: 91,148,93,133,16,111,148,14,68,151,203,179,199,128,31,249,214,24,241,253,136,58,39,216,78,30,115,243,252,51,203,57,168,123,131,50,38,239,84,99,186,141,105,109,200,147,116,29,39,227,210,227,81,174,38,140,212,201,25,69,250,20,241,217
mint name: Cannon Ball mint public key: CLgjEyHq9giQ3hmjmZ9yRxjbd79UkXbnLP7ecq9913Ra

mint secretKey ->>: 55,124,15,161,238,76,90,219,108,232,30,91,167,35,233,26,100,208,127,202,66,222,36,91,198,190,247,92,20,8,188,197,168,184,252,26,123,98,135,161,244,87,165,176,85,233,132,115,34,191,37,94,24,201,167,84,46,84,30,146,158,109,141,3
mint name: Compass mint public key: CMd6VaADGvmb9WY3yDsn4Z4YMqPupDfoGYT9m6VKUnRg

mint secretKey ->>: 18,224,110,128,50,159,145,20,61,228,130,206,120,112,59,177,63,251,193,251,195,245,226,85,123,201,105,120,55,228,155,159,146,144,39,5,6,133,61,151,207,96,204,54,36,158,119,8,141,218,138,240,220,15,27,179,142,86,36,251,129,58,81,198
mint name: Gold mint public key: As81kkLnMcfDh5TuREM5cr7WwTxfkZSviroaeUmJMAMB
*/