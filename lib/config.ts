// types
import type {
    uiTypes,
    gameTypes,
} from '@lib/types'

export const menu: uiTypes.MenuItem[] = [
    {
        label: "Home",
        id: "home",
    }, {
        label: "Game",
        id: "game",
    },
]

export const gameMenu: uiTypes.GameMenuItem[] = [
    {
        label: "Pause",
        id: "pause"
    }, {
        label: "Restart",
        id: "restart"
    }, {
        label: "Save",
        id: "save"
    }, {
        label: "Load",
        id: "load"
    }, {
        label: "Init",
        id: "init"
    }, {
        label: "Over",
        id: "over"
    }, {
        label: "Play",
        id: "play"
    }
]

export const themeMenu: uiTypes.Theme[] = [
    {
        label: "Light",
        id: "light"
    }, {
        label: "Dark",
        id: "dark"
    }, {
        label: "System",
        id: "system"
    }
]

export const breakpoints: Record<string, gameTypes.Breakpoint> = {
    sm: { id: "sm", value: 430, width: 320, height: 320 },
    md: { id: "md", value: 768, width: 640, height: 480 },
    lg: { id: "lg", value: 1024, width: 800, height: 600 },
    xl: { id: "xl", value: 1280, width: 1024, height: 768 },
}

export const tileSize = 50
export const maggotsCount = 50
export const defaultChunkSize = 1000
export const objectsPerChunk = { min: 80, max: 120 }
export const numberOfObjectsPerChunk = Math.floor(Math.random() * (objectsPerChunk.max - objectsPerChunk.min + 1)) + objectsPerChunk.min

export const heroTexturesConfig: Record<gameTypes.HeroState, { count: number, uid: number }> = {
    "idle": { count: 4, uid: 31 },
    "run": { count: 10, uid: 41 },
    "run-shot": { count: 10, uid: 51 },
    "shoot-up": { count: 1, uid: 61 },
    "stand": { count: 3, uid: 62 },
    "hurt": { count: 2, uid: 29 },
    "die": { count: 0, uid: 0 },
    "damage": { count: 0, uid: 0 },
    "lvlup": { count: 0, uid: 0 },
    "special": { count: 0, uid: 0 },
    "transform": { count: 0, uid: 0 },
}

export const enemyTexturesConfig: Record<gameTypes.EnemyState, { count: number, uid: number }> = {
    "angry": { count: 8, uid: 13 },
    "attack": { count: 8, uid: 13 },
    "idle": { count: 4, uid: 9 },
    "stand": { count: 4, uid: 9 },
    "hurt": { count: 8, uid: 13 },
    "die": { count: 4, uid: 9 },
    "damage": { count: 8, uid: 13 },
    "lvlup": { count: 8, uid: 13 },
    "special": { count: 8, uid: 13 },
    "transform": { count: 8, uid: 13 },
}

export const generatedObjects: gameTypes.GameObjectEntity[] = [
    {
        "id": 100,
        "position": {
            "x": 1506.8239343971513,
            "y": 585.0871687281699
        },
        "hp": 100,
        "state": "idle",
        "age": 9.405045647811063,
        "name": "game-object-container-id=100",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 100,
        "texture": 2,
    },
    {
        "id": 101,
        "position": {
            "x": 791.3950592589134,
            "y": 636.6544304000317
        },
        "hp": 100,
        "state": "idle",
        "age": 1.8816722054945834,
        "name": "game-object-container-id=101",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 101,
        "texture": 2,
    },
    {
        "id": 102,
        "position": {
            "x": 1523.227822320936,
            "y": 1531.8947848342023
        },
        "hp": 100,
        "state": "idle",
        "age": 7.89924360827352,
        "name": "game-object-container-id=102",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 102,
        "texture": 0,
    },
    {
        "id": 103,
        "position": {
            "x": 648.102193053069,
            "y": 1803.2123101448801
        },
        "hp": 100,
        "state": "idle",
        "age": 2.122150187550964,
        "name": "game-object-container-id=103",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 103,
        "texture": 2,
    },
    {
        "id": 104,
        "position": {
            "x": 1390.2607398160344,
            "y": 1596.0374779091585
        },
        "hp": 100,
        "state": "idle",
        "age": 8.521189140306872,
        "name": "game-object-container-id=104",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 104,
        "texture": 1,
    },
    {
        "id": 105,
        "position": {
            "x": 1801.0311565680588,
            "y": 481.35160662563936
        },
        "hp": 100,
        "state": "idle",
        "age": 7.505220652943667,
        "name": "game-object-container-id=105",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 105,
        "texture": 2,
    },
    {
        "id": 106,
        "position": {
            "x": 354.025328154018,
            "y": 1085.280712886508
        },
        "hp": 100,
        "state": "idle",
        "age": 1.6284330075421627,
        "name": "game-object-container-id=106",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 106,
        "texture": 2,
    },
    {
        "id": 107,
        "position": {
            "x": 1015.4238809096445,
            "y": 546.6720440272607
        },
        "hp": 100,
        "state": "idle",
        "age": 7.893875867028649,
        "name": "game-object-container-id=107",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 107,
        "texture": 1,
    },
    {
        "id": 108,
        "position": {
            "x": 627.6723750716119,
            "y": 1097.4329884417473
        },
        "hp": 100,
        "state": "idle",
        "age": 0.6374177592766439,
        "name": "game-object-container-id=108",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 108,
        "texture": 2,
    },
    {
        "id": 109,
        "position": {
            "x": 184.18793027952972,
            "y": 1531.5979855449086
        },
        "hp": 100,
        "state": "idle",
        "age": 9.864746573619271,
        "name": "game-object-container-id=109",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 109,
        "texture": 2,
    },
    {
        "id": 110,
        "position": {
            "x": 342.44539882035133,
            "y": 710.1819970756119
        },
        "hp": 100,
        "state": "idle",
        "age": 1.374764948077578,
        "name": "game-object-container-id=110",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 110,
        "texture": 0,
    },
    {
        "id": 111,
        "position": {
            "x": 1095.3012536498281,
            "y": 379.7534255814043
        },
        "hp": 100,
        "state": "idle",
        "age": 5.900742006937312,
        "name": "game-object-container-id=111",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 111,
        "texture": 2,
    },
    {
        "id": 112,
        "position": {
            "x": 378.3695523479564,
            "y": 1321.593791121766
        },
        "hp": 100,
        "state": "idle",
        "age": 3.332091420882688,
        "name": "game-object-container-id=112",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 112,
        "texture": 1,
    },
    {
        "id": 113,
        "position": {
            "x": 1043.5752349133797,
            "y": 1152.704304562165
        },
        "hp": 100,
        "state": "idle",
        "age": 5.793393487310787,
        "name": "game-object-container-id=113",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 113,
        "texture": 0,
    },
    {
        "id": 114,
        "position": {
            "x": 1039.7793033851806,
            "y": 282.70021895075246
        },
        "hp": 100,
        "state": "idle",
        "age": 3.4551191142873963,
        "name": "game-object-container-id=114",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 114,
        "texture": 0,
    },
    {
        "id": 115,
        "position": {
            "x": 302.23204337657086,
            "y": 1456.0139319598393
        },
        "hp": 100,
        "state": "idle",
        "age": 4.8292067443445905,
        "name": "game-object-container-id=115",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 115,
        "texture": 0,
    },
    {
        "id": 116,
        "position": {
            "x": 5.493630234295642,
            "y": 1570.3482328550883
        },
        "hp": 100,
        "state": "idle",
        "age": 3.4796410995843194,
        "name": "game-object-container-id=116",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 116,
        "texture": 1,
    },
    {
        "id": 117,
        "position": {
            "x": 547.8150281025244,
            "y": 1520.4551576188628
        },
        "hp": 100,
        "state": "idle",
        "age": 8.358143896913223,
        "name": "game-object-container-id=117",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 117,
        "texture": 0,
    },
    {
        "id": 118,
        "position": {
            "x": 1531.7340122199573,
            "y": 1303.5466229392018
        },
        "hp": 100,
        "state": "idle",
        "age": 8.28568652733195,
        "name": "game-object-container-id=118",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 118,
        "texture": 0,
    },
    {
        "id": 119,
        "position": {
            "x": 1322.2616287480134,
            "y": 510.11934162749236
        },
        "hp": 100,
        "state": "idle",
        "age": 9.650665636202888,
        "name": "game-object-container-id=119",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 119,
        "texture": 0,
    },
    {
        "id": 120,
        "position": {
            "x": 1130.709454681235,
            "y": 629.4694328634141
        },
        "hp": 100,
        "state": "idle",
        "age": 4.904962430135404,
        "name": "game-object-container-id=120",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 120,
        "texture": 1,
    },
    {
        "id": 121,
        "position": {
            "x": 609.7902946955608,
            "y": 1660.3598061676687
        },
        "hp": 100,
        "state": "idle",
        "age": 4.648058195720017,
        "name": "game-object-container-id=121",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 121,
        "texture": 0,
    },
    {
        "id": 122,
        "position": {
            "x": 1222.7209610767386,
            "y": 1220.272580028887
        },
        "hp": 100,
        "state": "idle",
        "age": 8.463486354548843,
        "name": "game-object-container-id=122",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 122,
        "texture": 0,
    },
    {
        "id": 123,
        "position": {
            "x": 557.6413009081366,
            "y": 686.6311966952422
        },
        "hp": 100,
        "state": "idle",
        "age": 8.916744904849956,
        "name": "game-object-container-id=123",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 123,
        "texture": 2,
    },
    {
        "id": 124,
        "position": {
            "x": 314.1476753350135,
            "y": 1366.353632751405
        },
        "hp": 100,
        "state": "idle",
        "age": 9.067645077310548,
        "name": "game-object-container-id=124",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 124,
        "texture": 1,
    },
    {
        "id": 125,
        "position": {
            "x": 522.4248275885883,
            "y": 1329.0166485537325
        },
        "hp": 100,
        "state": "idle",
        "age": 4.504761147930986,
        "name": "game-object-container-id=125",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 125,
        "texture": 0,
    },
    {
        "id": 126,
        "position": {
            "x": 422.17733254392493,
            "y": 1630.4589029725096
        },
        "hp": 100,
        "state": "idle",
        "age": 3.832497232375659,
        "name": "game-object-container-id=126",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 126,
        "texture": 2,
    },
    {
        "id": 127,
        "position": {
            "x": 363.075579195213,
            "y": 479.9375146934146
        },
        "hp": 100,
        "state": "idle",
        "age": 4.248489147428285,
        "name": "game-object-container-id=127",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 127,
        "texture": 1,
    },
    {
        "id": 128,
        "position": {
            "x": 65.00115763821269,
            "y": 1214.1282914602516
        },
        "hp": 100,
        "state": "idle",
        "age": 5.5885972641685875,
        "name": "game-object-container-id=128",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 128,
        "texture": 1,
    },
    {
        "id": 129,
        "position": {
            "x": 1255.988414277691,
            "y": 1689.8516760488553
        },
        "hp": 100,
        "state": "idle",
        "age": 2.462721236628953,
        "name": "game-object-container-id=129",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 129,
        "texture": 1,
    },
    {
        "id": 130,
        "position": {
            "x": 313.9351366686302,
            "y": 865.4653059349373
        },
        "hp": 100,
        "state": "idle",
        "age": 2.4663131077929803,
        "name": "game-object-container-id=130",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 130,
        "texture": 1,
    },
    {
        "id": 131,
        "position": {
            "x": 1716.0819169460979,
            "y": 1373.9957036147491
        },
        "hp": 100,
        "state": "idle",
        "age": 3.2876295336914465,
        "name": "game-object-container-id=131",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 131,
        "texture": 1,
    },
    {
        "id": 132,
        "position": {
            "x": 1423.1317889046452,
            "y": 608.9310183508705
        },
        "hp": 100,
        "state": "idle",
        "age": 9.850291146520254,
        "name": "game-object-container-id=132",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 132,
        "texture": 1,
    },
    {
        "id": 133,
        "position": {
            "x": 1493.4376699317475,
            "y": 869.9839951449142
        },
        "hp": 100,
        "state": "idle",
        "age": 9.591130248659498,
        "name": "game-object-container-id=133",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 133,
        "texture": 0,
    },
    {
        "id": 134,
        "position": {
            "x": 1572.0830974914927,
            "y": 1207.5698100060292
        },
        "hp": 100,
        "state": "idle",
        "age": 0.5279987297982824,
        "name": "game-object-container-id=134",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 134,
        "texture": 1,
    },
    {
        "id": 135,
        "position": {
            "x": 1347.7618216151293,
            "y": 1741.312097420019
        },
        "hp": 100,
        "state": "idle",
        "age": 9.539340334875389,
        "name": "game-object-container-id=135",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 135,
        "texture": 1,
    },
    {
        "id": 136,
        "position": {
            "x": 783.1667635344853,
            "y": 214.43500905249786
        },
        "hp": 100,
        "state": "idle",
        "age": 6.419179261005369,
        "name": "game-object-container-id=136",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 136,
        "texture": 0,
    },
    {
        "id": 137,
        "position": {
            "x": 359.7947598209605,
            "y": 1769.6534091707415
        },
        "hp": 100,
        "state": "idle",
        "age": 0.9758160104264246,
        "name": "game-object-container-id=137",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 137,
        "texture": 1,
    },
    {
        "id": 138,
        "position": {
            "x": 1205.6979013287598,
            "y": 1703.3890335201036
        },
        "hp": 100,
        "state": "idle",
        "age": 2.743236049250105,
        "name": "game-object-container-id=138",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 138,
        "texture": 2,
    },
    {
        "id": 139,
        "position": {
            "x": 1585.857536121194,
            "y": 161.8727173456539
        },
        "hp": 100,
        "state": "idle",
        "age": 7.085330981076785,
        "name": "game-object-container-id=139",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 139,
        "texture": 0,
    },
    {
        "id": 140,
        "position": {
            "x": 578.7469903867819,
            "y": 656.8074771078313
        },
        "hp": 100,
        "state": "idle",
        "age": 2.034404431828066,
        "name": "game-object-container-id=140",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 140,
        "texture": 2,
    },
    {
        "id": 141,
        "position": {
            "x": 612.2722680722092,
            "y": 381.34241976380514
        },
        "hp": 100,
        "state": "idle",
        "age": 2.964452746271923,
        "name": "game-object-container-id=141",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 141,
        "texture": 1,
    },
    {
        "id": 142,
        "position": {
            "x": 1570.2983505291702,
            "y": 1716.7965619912807
        },
        "hp": 100,
        "state": "idle",
        "age": 9.85677813126671,
        "name": "game-object-container-id=142",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 142,
        "texture": 1,
    },
    {
        "id": 143,
        "position": {
            "x": 1104.5493707588632,
            "y": 971.739075060266
        },
        "hp": 100,
        "state": "idle",
        "age": 3.352591173545866,
        "name": "game-object-container-id=143",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 143,
        "texture": 2,
    },
    {
        "id": 144,
        "position": {
            "x": 1384.2402382149835,
            "y": 1400.7689918224564
        },
        "hp": 100,
        "state": "idle",
        "age": 3.5842122795759037,
        "name": "game-object-container-id=144",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 144,
        "texture": 2,
    },
    {
        "id": 145,
        "position": {
            "x": 127.03121212462274,
            "y": 1337.245236410027
        },
        "hp": 100,
        "state": "idle",
        "age": 8.691523606440887,
        "name": "game-object-container-id=145",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 145,
        "texture": 1,
    },
    {
        "id": 146,
        "position": {
            "x": 65.09365439809731,
            "y": 231.3938203057686
        },
        "hp": 100,
        "state": "idle",
        "age": 5.161363691080599,
        "name": "game-object-container-id=146",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 146,
        "texture": 1,
    },
    {
        "id": 147,
        "position": {
            "x": 1110.8476618218808,
            "y": 860.3257486599168
        },
        "hp": 100,
        "state": "idle",
        "age": 4.333775382913187,
        "name": "game-object-container-id=147",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 147,
        "texture": 0,
    },
    {
        "id": 148,
        "position": {
            "x": 503.26037518805026,
            "y": 738.318531283865
        },
        "hp": 100,
        "state": "idle",
        "age": 5.715428267023658,
        "name": "game-object-container-id=148",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 148,
        "texture": 0,
    },
    {
        "id": 149,
        "position": {
            "x": 869.2439539252981,
            "y": 147.74902917305835
        },
        "hp": 100,
        "state": "idle",
        "age": 8.523327858969727,
        "name": "game-object-container-id=149",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 149,
        "texture": 1,
    },
    {
        "id": 150,
        "position": {
            "x": 1345.7644608053208,
            "y": 204.75202332802414
        },
        "hp": 100,
        "state": "idle",
        "age": 1.0391994430752804,
        "name": "game-object-container-id=150",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 150,
        "texture": 2,
    },
    {
        "id": 151,
        "position": {
            "x": 1178.6523727522829,
            "y": 705.9975702661708
        },
        "hp": 100,
        "state": "idle",
        "age": 7.931121879787943,
        "name": "game-object-container-id=151",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 151,
        "texture": 2,
    },
    {
        "id": 152,
        "position": {
            "x": 1022.8336476907838,
            "y": 1111.6745204404456
        },
        "hp": 100,
        "state": "idle",
        "age": 4.2892091880423235,
        "name": "game-object-container-id=152",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 152,
        "texture": 2,
    },
    {
        "id": 153,
        "position": {
            "x": 833.2523288823547,
            "y": 786.6755004406209
        },
        "hp": 100,
        "state": "idle",
        "age": 4.389700243565527,
        "name": "game-object-container-id=153",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 153,
        "texture": 0,
    },
    {
        "id": 154,
        "position": {
            "x": 1067.7527664906518,
            "y": 449.17097469482223
        },
        "hp": 100,
        "state": "idle",
        "age": 8.706965923632882,
        "name": "game-object-container-id=154",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 154,
        "texture": 0,
    },
    {
        "id": 155,
        "position": {
            "x": 524.4418198589962,
            "y": 903.2112527966395
        },
        "hp": 100,
        "state": "idle",
        "age": 2.9146593396202594,
        "name": "game-object-container-id=155",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 155,
        "texture": 0,
    },
    {
        "id": 156,
        "position": {
            "x": 779.8038535854984,
            "y": 921.3065588829977
        },
        "hp": 100,
        "state": "idle",
        "age": 0.30346381741927275,
        "name": "game-object-container-id=156",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 156,
        "texture": 0,
    },
    {
        "id": 157,
        "position": {
            "x": 1165.2182155034145,
            "y": 946.7522448216301
        },
        "hp": 100,
        "state": "idle",
        "age": 3.6850909128650686,
        "name": "game-object-container-id=157",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 157,
        "texture": 2,
    },
    {
        "id": 158,
        "position": {
            "x": 279.874532112157,
            "y": 1559.3485122754685
        },
        "hp": 100,
        "state": "idle",
        "age": 9.450887508494288,
        "name": "game-object-container-id=158",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 158,
        "texture": 0,
    },
    {
        "id": 159,
        "position": {
            "x": 1220.8610380160778,
            "y": 906.9547854203005
        },
        "hp": 100,
        "state": "idle",
        "age": 6.981114550570021,
        "name": "game-object-container-id=159",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 159,
        "texture": 2,
    },
    {
        "id": 160,
        "position": {
            "x": 1157.937686084743,
            "y": 461.1069194228934
        },
        "hp": 100,
        "state": "idle",
        "age": 9.144321942877035,
        "name": "game-object-container-id=160",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 160,
        "texture": 2,
    },
    {
        "id": 161,
        "position": {
            "x": 1910.1139694724957,
            "y": 1295.9287600733712
        },
        "hp": 100,
        "state": "idle",
        "age": 7.470030759571933,
        "name": "game-object-container-id=161",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 161,
        "texture": 2,
    },
    {
        "id": 162,
        "position": {
            "x": 1605.8849870593317,
            "y": 1445.6929931405411
        },
        "hp": 100,
        "state": "idle",
        "age": 3.624824715255256,
        "name": "game-object-container-id=162",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 162,
        "texture": 2,
    },
    {
        "id": 163,
        "position": {
            "x": 248.41678269956037,
            "y": 1693.2680422928743
        },
        "hp": 100,
        "state": "idle",
        "age": 5.374450788294704,
        "name": "game-object-container-id=163",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 163,
        "texture": 1,
    },
    {
        "id": 164,
        "position": {
            "x": 906.0578942400299,
            "y": 362.7918465018984
        },
        "hp": 100,
        "state": "idle",
        "age": 5.143801886466891,
        "name": "game-object-container-id=164",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 164,
        "texture": 2,
    },
    {
        "id": 165,
        "position": {
            "x": 849.2267135579364,
            "y": 463.0128176288029
        },
        "hp": 100,
        "state": "idle",
        "age": 7.803679605577755,
        "name": "game-object-container-id=165",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 165,
        "texture": 0,
    },
    {
        "id": 166,
        "position": {
            "x": 871.1476246168767,
            "y": 1123.6119247180598
        },
        "hp": 100,
        "state": "idle",
        "age": 9.691121617611365,
        "name": "game-object-container-id=166",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 166,
        "texture": 1,
    },
    {
        "id": 167,
        "position": {
            "x": 1274.2783461226213,
            "y": 156.80551294618746
        },
        "hp": 100,
        "state": "idle",
        "age": 2.994424070980565,
        "name": "game-object-container-id=167",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 167,
        "texture": 1,
    },
    {
        "id": 168,
        "position": {
            "x": 1446.2326440579793,
            "y": 271.0031361686103
        },
        "hp": 100,
        "state": "idle",
        "age": 3.367078044658476,
        "name": "game-object-container-id=168",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 168,
        "texture": 1,
    },
    {
        "id": 169,
        "position": {
            "x": 433.73654104999247,
            "y": 458.58093060949585
        },
        "hp": 100,
        "state": "idle",
        "age": 0.752985946830278,
        "name": "game-object-container-id=169",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 169,
        "texture": 1,
    },
    {
        "id": 170,
        "position": {
            "x": 1222.8986065851764,
            "y": 1763.646763180171
        },
        "hp": 100,
        "state": "idle",
        "age": 9.64727471517245,
        "name": "game-object-container-id=170",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 170,
        "texture": 0,
    },
    {
        "id": 171,
        "position": {
            "x": 1972.0797689379258,
            "y": 1720.3687246183697
        },
        "hp": 100,
        "state": "idle",
        "age": 6.601547753038198,
        "name": "game-object-container-id=171",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 171,
        "texture": 0,
    },
    {
        "id": 172,
        "position": {
            "x": 1685.0410663478842,
            "y": 154.16624252787076
        },
        "hp": 100,
        "state": "idle",
        "age": 3.3900470546434724,
        "name": "game-object-container-id=172",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 172,
        "texture": 2,
    },
    {
        "id": 173,
        "position": {
            "x": 751.9895319462091,
            "y": 1743.8517327150264
        },
        "hp": 100,
        "state": "idle",
        "age": 7.16672434778315,
        "name": "game-object-container-id=173",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 173,
        "texture": 1,
    },
    {
        "id": 174,
        "position": {
            "x": 288.94145432760297,
            "y": 1198.2640732548086
        },
        "hp": 100,
        "state": "idle",
        "age": 3.5213265938221605,
        "name": "game-object-container-id=174",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 174,
        "texture": 2,
    },
    {
        "id": 175,
        "position": {
            "x": 832.3319679410625,
            "y": 806.349065726203
        },
        "hp": 100,
        "state": "idle",
        "age": 2.3425270628361208,
        "name": "game-object-container-id=175",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 175,
        "texture": 1,
    },
    {
        "id": 176,
        "position": {
            "x": 824.3688144361797,
            "y": 316.48356545667053
        },
        "hp": 100,
        "state": "idle",
        "age": 4.910820992095672,
        "name": "game-object-container-id=176",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 176,
        "texture": 2,
    },
    {
        "id": 177,
        "position": {
            "x": 1239.9103107212286,
            "y": 1612.090956378313
        },
        "hp": 100,
        "state": "idle",
        "age": 5.409525577300645,
        "name": "game-object-container-id=177",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 177,
        "texture": 1,
    },
    {
        "id": 178,
        "position": {
            "x": 1470.3604186479408,
            "y": 1626.9769499373535
        },
        "hp": 100,
        "state": "idle",
        "age": 1.7259507763321424,
        "name": "game-object-container-id=178",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 178,
        "texture": 2,
    },
    {
        "id": 179,
        "position": {
            "x": 749.7045761735914,
            "y": 442.79528682755637
        },
        "hp": 100,
        "state": "idle",
        "age": 6.1286981252061565,
        "name": "game-object-container-id=179",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 179,
        "texture": 2,
    },
    {
        "id": 180,
        "position": {
            "x": 725.8135888822625,
            "y": 72.32826545664574
        },
        "hp": 100,
        "state": "idle",
        "age": 9.906311835477009,
        "name": "game-object-container-id=180",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 180,
        "texture": 0,
    },
    {
        "id": 181,
        "position": {
            "x": 1554.2629292611332,
            "y": 1155.2769302040958
        },
        "hp": 100,
        "state": "idle",
        "age": 6.560415928532308,
        "name": "game-object-container-id=181",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 181,
        "texture": 1,
    },
    {
        "id": 182,
        "position": {
            "x": 1031.680963278762,
            "y": 1464.3799179672503
        },
        "hp": 100,
        "state": "idle",
        "age": 1.0184590140065564,
        "name": "game-object-container-id=182",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 182,
        "texture": 2,
    },
    {
        "id": 183,
        "position": {
            "x": 1499.681122803863,
            "y": 166.5881667857844
        },
        "hp": 100,
        "state": "idle",
        "age": 7.19827421369036,
        "name": "game-object-container-id=183",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 183,
        "texture": 1,
    },
    {
        "id": 184,
        "position": {
            "x": 362.86641360402973,
            "y": 104.26645805600748
        },
        "hp": 100,
        "state": "idle",
        "age": 5.726748342193295,
        "name": "game-object-container-id=184",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 184,
        "texture": 0,
    },
    {
        "id": 185,
        "position": {
            "x": 1278.0359871202832,
            "y": 576.1404123977253
        },
        "hp": 100,
        "state": "idle",
        "age": 9.460433729245091,
        "name": "game-object-container-id=185",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 185,
        "texture": 0,
    },
    {
        "id": 186,
        "position": {
            "x": 1235.8872282981727,
            "y": 1369.4059564906331
        },
        "hp": 100,
        "state": "idle",
        "age": 5.391925378380188,
        "name": "game-object-container-id=186",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 186,
        "texture": 0,
    },
    {
        "id": 187,
        "position": {
            "x": 1154.6124648796217,
            "y": 151.68782669694454
        },
        "hp": 100,
        "state": "idle",
        "age": 2.155886522207837,
        "name": "game-object-container-id=187",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 187,
        "texture": 2,
    },
    {
        "id": 188,
        "position": {
            "x": 1563.1850786259276,
            "y": 1218.4708737311214
        },
        "hp": 100,
        "state": "idle",
        "age": 1.1096971507482678,
        "name": "game-object-container-id=188",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 188,
        "texture": 2,
    },
    {
        "id": 189,
        "position": {
            "x": 745.663793023697,
            "y": 1354.4429818402243
        },
        "hp": 100,
        "state": "idle",
        "age": 7.5723351539462955,
        "name": "game-object-container-id=189",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 189,
        "texture": 0,
    },
    {
        "id": 190,
        "position": {
            "x": 181.56328085280703,
            "y": 1510.3677422902085
        },
        "hp": 100,
        "state": "idle",
        "age": 3.4304935760847965,
        "name": "game-object-container-id=190",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 190,
        "texture": 1,
    },
    {
        "id": 191,
        "position": {
            "x": 1403.7918049443915,
            "y": 1716.673619485953
        },
        "hp": 100,
        "state": "idle",
        "age": 4.637400164481233,
        "name": "game-object-container-id=191",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 191,
        "texture": 0,
    },
    {
        "id": 192,
        "position": {
            "x": 1276.8610155662554,
            "y": 809.2785377565198
        },
        "hp": 100,
        "state": "idle",
        "age": 5.500952435084009,
        "name": "game-object-container-id=192",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 192,
        "texture": 0,
    },
    {
        "id": 193,
        "position": {
            "x": 1724.9649741309963,
            "y": 853.1668623062649
        },
        "hp": 100,
        "state": "idle",
        "age": 8.558600511398348,
        "name": "game-object-container-id=193",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 193,
        "texture": 1,
    },
    {
        "id": 194,
        "position": {
            "x": 1717.5447610602382,
            "y": 862.8128326131182
        },
        "hp": 100,
        "state": "idle",
        "age": 4.097319598795174,
        "name": "game-object-container-id=194",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 194,
        "texture": 0,
    },
    {
        "id": 195,
        "position": {
            "x": 888.0705216648923,
            "y": 966.3003150035437
        },
        "hp": 100,
        "state": "idle",
        "age": 5.261297563963017,
        "name": "game-object-container-id=195",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 195,
        "texture": 2,
    },
    {
        "id": 196,
        "position": {
            "x": 1288.3074528138707,
            "y": 432.69381261225146
        },
        "hp": 100,
        "state": "idle",
        "age": 6.700078484146105,
        "name": "game-object-container-id=196",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 196,
        "texture": 0,
    },
    {
        "id": 197,
        "position": {
            "x": 418.8765269245459,
            "y": 504.87657841911624
        },
        "hp": 100,
        "state": "idle",
        "age": 3.2947279804142604,
        "name": "game-object-container-id=197",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 197,
        "texture": 1,
    },
    {
        "id": 198,
        "position": {
            "x": 926.4085860964341,
            "y": 174.00271195870042
        },
        "hp": 100,
        "state": "idle",
        "age": 5.113825721675765,
        "name": "game-object-container-id=198",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 198,
        "texture": 2,
    },
    {
        "id": 199,
        "position": {
            "x": 1696.2201727461998,
            "y": 1269.320134591698
        },
        "hp": 100,
        "state": "idle",
        "age": 9.05515021133473,
        "name": "game-object-container-id=199",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 199,
        "texture": 0,
    },
    {
        "id": 200,
        "position": {
            "x": 1460.6494983265372,
            "y": 343.74596879113585
        },
        "hp": 100,
        "state": "idle",
        "age": 2.815426302145836,
        "name": "game-object-container-id=200",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 200,
        "texture": 0,
    },
    {
        "id": 201,
        "position": {
            "x": 1975.6047359343208,
            "y": 336.0325363539016
        },
        "hp": 100,
        "state": "idle",
        "age": 5.3415290839070915,
        "name": "game-object-container-id=201",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 201,
        "texture": 1,
    },
    {
        "id": 202,
        "position": {
            "x": 1590.0144359195376,
            "y": 195.20697314698683
        },
        "hp": 100,
        "state": "idle",
        "age": 8.745642969971763,
        "name": "game-object-container-id=202",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 202,
        "texture": 1,
    },
    {
        "id": 203,
        "position": {
            "x": 1618.8083932276666,
            "y": 177.41902605807138
        },
        "hp": 100,
        "state": "idle",
        "age": 7.022721045296039,
        "name": "game-object-container-id=203",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 203,
        "texture": 1,
    },
    {
        "id": 204,
        "position": {
            "x": 474.20630843541466,
            "y": 560.4630834694601
        },
        "hp": 100,
        "state": "idle",
        "age": 1.8156854669788147,
        "name": "game-object-container-id=204",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 204,
        "texture": 1,
    },
    {
        "id": 205,
        "position": {
            "x": 507.0406139106089,
            "y": 762.3188357441421
        },
        "hp": 100,
        "state": "idle",
        "age": 3.2736903094078595,
        "name": "game-object-container-id=205",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 205,
        "texture": 0,
    },
    {
        "id": 206,
        "position": {
            "x": 761.6555269391865,
            "y": 1216.5527979980322
        },
        "hp": 100,
        "state": "idle",
        "age": 9.578060207934197,
        "name": "game-object-container-id=206",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 206,
        "texture": 2,
    },
    {
        "id": 207,
        "position": {
            "x": 1749.8277590422001,
            "y": 1584.6852706248517
        },
        "hp": 100,
        "state": "idle",
        "age": 8.150573753989184,
        "name": "game-object-container-id=207",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 207,
        "texture": 0,
    },
    {
        "id": 208,
        "position": {
            "x": 1937.638834207056,
            "y": 138.54923414180044
        },
        "hp": 100,
        "state": "idle",
        "age": 0.5314194079085821,
        "name": "game-object-container-id=208",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 208,
        "texture": 1,
    },
    {
        "id": 209,
        "position": {
            "x": 703.3711233315124,
            "y": 510.9644076804924
        },
        "hp": 100,
        "state": "idle",
        "age": 8.693299065436957,
        "name": "game-object-container-id=209",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 209,
        "texture": 0,
    },
    {
        "id": 210,
        "position": {
            "x": 1010.864067397376,
            "y": 80.35591538407472
        },
        "hp": 100,
        "state": "idle",
        "age": 6.595121786188692,
        "name": "game-object-container-id=210",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 210,
        "texture": 1,
    },
    {
        "id": 211,
        "position": {
            "x": 487.95896287335154,
            "y": 297.8977884860735
        },
        "hp": 100,
        "state": "idle",
        "age": 7.653447130050309,
        "name": "game-object-container-id=211",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 211,
        "texture": 0,
    },
    {
        "id": 212,
        "position": {
            "x": 1079.0651070281424,
            "y": 41.657519537584534
        },
        "hp": 100,
        "state": "idle",
        "age": 3.960959808479607,
        "name": "game-object-container-id=212",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 212,
        "texture": 2,
    },
    {
        "id": 213,
        "position": {
            "x": 1472.6206424443026,
            "y": 752.1307532496345
        },
        "hp": 100,
        "state": "idle",
        "age": 6.007751563559669,
        "name": "game-object-container-id=213",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 213,
        "texture": 1,
    },
    {
        "id": 214,
        "position": {
            "x": 1173.5987992782366,
            "y": 511.6812695447852
        },
        "hp": 100,
        "state": "idle",
        "age": 0.6274971988191103,
        "name": "game-object-container-id=214",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 214,
        "texture": 1,
    },
    {
        "id": 215,
        "position": {
            "x": 449.95775928858086,
            "y": 530.7468642268723
        },
        "hp": 100,
        "state": "idle",
        "age": 4.253258850840872,
        "name": "game-object-container-id=215",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 215,
        "texture": 1,
    },
    {
        "id": 216,
        "position": {
            "x": 1623.8297901028623,
            "y": 1351.6265396332838
        },
        "hp": 100,
        "state": "idle",
        "age": 7.747295751379455,
        "name": "game-object-container-id=216",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 216,
        "texture": 1,
    },
    {
        "id": 217,
        "position": {
            "x": 72.00245001920439,
            "y": 641.7526924234668
        },
        "hp": 100,
        "state": "idle",
        "age": 9.670425225826856,
        "name": "game-object-container-id=217",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 217,
        "texture": 2,
    },
    {
        "id": 218,
        "position": {
            "x": 1173.688981284374,
            "y": 237.97230466041242
        },
        "hp": 100,
        "state": "idle",
        "age": 2.5518333433594065,
        "name": "game-object-container-id=218",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 218,
        "texture": 0,
    },
    {
        "id": 219,
        "position": {
            "x": 292.66729683718444,
            "y": 1468.083068707093
        },
        "hp": 100,
        "state": "idle",
        "age": 4.537820360923003,
        "name": "game-object-container-id=219",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 219,
        "texture": 0,
    },
    {
        "id": 220,
        "position": {
            "x": 495.2281502851328,
            "y": 1395.729192178659
        },
        "hp": 100,
        "state": "idle",
        "age": 5.110321609415275,
        "name": "game-object-container-id=220",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 220,
        "texture": 2,
    },
    {
        "id": 221,
        "position": {
            "x": 1640.5162669541062,
            "y": 299.29551392532056
        },
        "hp": 100,
        "state": "idle",
        "age": 2.8514453126139006,
        "name": "game-object-container-id=221",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 221,
        "texture": 0,
    },
    {
        "id": 222,
        "position": {
            "x": 1836.228267081545,
            "y": 137.4243253977992
        },
        "hp": 100,
        "state": "idle",
        "age": 3.6654444385080343,
        "name": "game-object-container-id=222",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 222,
        "texture": 1,
    },
    {
        "id": 223,
        "position": {
            "x": 631.9466775274944,
            "y": 25.95809579050317
        },
        "hp": 100,
        "state": "idle",
        "age": 8.50380127507366,
        "name": "game-object-container-id=223",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 223,
        "texture": 1,
    },
    {
        "id": 224,
        "position": {
            "x": 1447.1499723661186,
            "y": 717.2438510069417
        },
        "hp": 100,
        "state": "idle",
        "age": 1.7784034504134782,
        "name": "game-object-container-id=224",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 224,
        "texture": 2,
    },
    {
        "id": 225,
        "position": {
            "x": 1410.7143838590123,
            "y": 68.61614778798047
        },
        "hp": 100,
        "state": "idle",
        "age": 1.9267088701603796,
        "name": "game-object-container-id=225",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 225,
        "texture": 1,
    },
    {
        "id": 226,
        "position": {
            "x": 1204.7893330222919,
            "y": 1176.4865733505596
        },
        "hp": 100,
        "state": "idle",
        "age": 3.134705346499116,
        "name": "game-object-container-id=226",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 226,
        "texture": 0,
    },
    {
        "id": 227,
        "position": {
            "x": 553.2948938983791,
            "y": 1617.3564870895837
        },
        "hp": 100,
        "state": "idle",
        "age": 0.7979663891849698,
        "name": "game-object-container-id=227",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 227,
        "texture": 2,
    },
    {
        "id": 228,
        "position": {
            "x": 414.8439039826747,
            "y": 773.369630605056
        },
        "hp": 100,
        "state": "idle",
        "age": 1.468779427962723,
        "name": "game-object-container-id=228",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 228,
        "texture": 2,
    },
    {
        "id": 229,
        "position": {
            "x": 1619.9709390161238,
            "y": 1380.266958279096
        },
        "hp": 100,
        "state": "idle",
        "age": 5.574768195801077,
        "name": "game-object-container-id=229",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 229,
        "texture": 1,
    },
    {
        "id": 230,
        "position": {
            "x": 1209.5571636821048,
            "y": 400.7206703857071
        },
        "hp": 100,
        "state": "idle",
        "age": 5.558192938530658,
        "name": "game-object-container-id=230",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 230,
        "texture": 1,
    },
    {
        "id": 231,
        "position": {
            "x": 955.6247260123209,
            "y": 268.62570198907326
        },
        "hp": 100,
        "state": "idle",
        "age": 8.56028023864315,
        "name": "game-object-container-id=231",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 231,
        "texture": 1,
    },
    {
        "id": 232,
        "position": {
            "x": 589.1228510273193,
            "y": 1386.430643086187
        },
        "hp": 100,
        "state": "idle",
        "age": 8.763151657602783,
        "name": "game-object-container-id=232",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 232,
        "texture": 2,
    },
    {
        "id": 233,
        "position": {
            "x": 1355.9172465905638,
            "y": 1729.670656784915
        },
        "hp": 100,
        "state": "idle",
        "age": 2.8696275589520592,
        "name": "game-object-container-id=233",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 233,
        "texture": 0,
    },
    {
        "id": 234,
        "position": {
            "x": 439.06433729934867,
            "y": 157.70278563631865
        },
        "hp": 100,
        "state": "idle",
        "age": 9.181071271374888,
        "name": "game-object-container-id=234",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 234,
        "texture": 2,
    },
    {
        "id": 235,
        "position": {
            "x": 727.0262360000418,
            "y": 938.9916795717583
        },
        "hp": 100,
        "state": "idle",
        "age": 1.6080188061690892,
        "name": "game-object-container-id=235",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 235,
        "texture": 2,
    },
    {
        "id": 236,
        "position": {
            "x": 23.27184897316682,
            "y": 1791.401088341379
        },
        "hp": 100,
        "state": "idle",
        "age": 1.7769537273174174,
        "name": "game-object-container-id=236",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 236,
        "texture": 2,
    },
    {
        "id": 237,
        "position": {
            "x": 1645.0514381749222,
            "y": 1017.0531682446261
        },
        "hp": 100,
        "state": "idle",
        "age": 2.4170081498428875,
        "name": "game-object-container-id=237",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 237,
        "texture": 0,
    },
    {
        "id": 238,
        "position": {
            "x": 1109.232732866497,
            "y": 742.559870569989
        },
        "hp": 100,
        "state": "idle",
        "age": 2.7892394499647244,
        "name": "game-object-container-id=238",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 238,
        "texture": 1,
    },
    {
        "id": 239,
        "position": {
            "x": 441.69929008588144,
            "y": 91.0704230297237
        },
        "hp": 100,
        "state": "idle",
        "age": 7.432747533838281,
        "name": "game-object-container-id=239",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 239,
        "texture": 1,
    },
    {
        "id": 240,
        "position": {
            "x": 673.6887395686615,
            "y": 1407.1548064067315
        },
        "hp": 100,
        "state": "idle",
        "age": 4.210861886751091,
        "name": "game-object-container-id=240",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 240,
        "texture": 1,
    },
    {
        "id": 241,
        "position": {
            "x": 1306.3222267730087,
            "y": 529.9152455546249
        },
        "hp": 100,
        "state": "idle",
        "age": 0.0568877806021717,
        "name": "game-object-container-id=241",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 241,
        "texture": 2,
    },
    {
        "id": 242,
        "position": {
            "x": 293.18734967853385,
            "y": 858.037140513971
        },
        "hp": 100,
        "state": "idle",
        "age": 7.428952317823205,
        "name": "game-object-container-id=242",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 242,
        "texture": 2,
    },
    {
        "id": 243,
        "position": {
            "x": 264.16913277455467,
            "y": 1339.7071824414095
        },
        "hp": 100,
        "state": "idle",
        "age": 0.06752366738086546,
        "name": "game-object-container-id=243",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 243,
        "texture": 2,
    },
    {
        "id": 244,
        "position": {
            "x": 117.81057355164977,
            "y": 44.90275718731226
        },
        "hp": 100,
        "state": "idle",
        "age": 5.084970646927451,
        "name": "game-object-container-id=244",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 244,
        "texture": 0,
    },
    {
        "id": 245,
        "position": {
            "x": 1056.3642151487754,
            "y": 261.478815659303
        },
        "hp": 100,
        "state": "idle",
        "age": 2.662657379509862,
        "name": "game-object-container-id=245",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 245,
        "texture": 0,
    },
    {
        "id": 246,
        "position": {
            "x": 1528.913248604298,
            "y": 1742.3321693183989
        },
        "hp": 100,
        "state": "idle",
        "age": 5.265797011471816,
        "name": "game-object-container-id=246",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 246,
        "texture": 0,
    },
    {
        "id": 247,
        "position": {
            "x": 1038.7053459838166,
            "y": 1790.6699829521006
        },
        "hp": 100,
        "state": "idle",
        "age": 8.280133805370147,
        "name": "game-object-container-id=247",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 247,
        "texture": 1,
    },
    {
        "id": 248,
        "position": {
            "x": 1603.148893602447,
            "y": 1088.0135779528762
        },
        "hp": 100,
        "state": "idle",
        "age": 8.647350710715461,
        "name": "game-object-container-id=248",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 248,
        "texture": 2,
    },
    {
        "id": 249,
        "position": {
            "x": 1864.7937243196732,
            "y": 1413.648817839276
        },
        "hp": 100,
        "state": "idle",
        "age": 1.7751705992939315,
        "name": "game-object-container-id=249",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 249,
        "texture": 2,
    },
    {
        "id": 250,
        "position": {
            "x": 1972.221065487487,
            "y": 409.5591170400872
        },
        "hp": 100,
        "state": "idle",
        "age": 9.013513495486695,
        "name": "game-object-container-id=250",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 250,
        "texture": 1,
    },
    {
        "id": 251,
        "position": {
            "x": 769.8240494561227,
            "y": 296.0527922601454
        },
        "hp": 100,
        "state": "idle",
        "age": 7.256802255539268,
        "name": "game-object-container-id=251",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 251,
        "texture": 0,
    },
    {
        "id": 252,
        "position": {
            "x": 1146.7975777334175,
            "y": 1166.5449828521143
        },
        "hp": 100,
        "state": "idle",
        "age": 1.3576735017366148,
        "name": "game-object-container-id=252",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 252,
        "texture": 0,
    },
    {
        "id": 253,
        "position": {
            "x": 824.6647086554264,
            "y": 1294.0837383940489
        },
        "hp": 100,
        "state": "idle",
        "age": 7.382033333745005,
        "name": "game-object-container-id=253",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 253,
        "texture": 0,
    },
    {
        "id": 254,
        "position": {
            "x": 1911.4951219264285,
            "y": 115.78866736486837
        },
        "hp": 100,
        "state": "idle",
        "age": 0.6049202958710309,
        "name": "game-object-container-id=254",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 254,
        "texture": 1,
    },
    {
        "id": 255,
        "position": {
            "x": 1775.5051856060595,
            "y": 1335.06821925582
        },
        "hp": 100,
        "state": "idle",
        "age": 0.6809321751251884,
        "name": "game-object-container-id=255",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 255,
        "texture": 2,
    },
    {
        "id": 256,
        "position": {
            "x": 528.5995138067916,
            "y": 289.3259926258082
        },
        "hp": 100,
        "state": "idle",
        "age": 4.332820202360188,
        "name": "game-object-container-id=256",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 256,
        "texture": 0,
    },
    {
        "id": 257,
        "position": {
            "x": 44.10568709269629,
            "y": 1118.8281304489271
        },
        "hp": 100,
        "state": "idle",
        "age": 9.599776778989277,
        "name": "game-object-container-id=257",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 257,
        "texture": 2,
    },
    {
        "id": 258,
        "position": {
            "x": 1900.2486707980881,
            "y": 1530.583677582061
        },
        "hp": 100,
        "state": "idle",
        "age": 1.921769507314035,
        "name": "game-object-container-id=258",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 258,
        "texture": 0,
    },
    {
        "id": 259,
        "position": {
            "x": 576.487785969553,
            "y": 1000.2353417973716
        },
        "hp": 100,
        "state": "idle",
        "age": 6.772180990842344,
        "name": "game-object-container-id=259",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 259,
        "texture": 1,
    },
    {
        "id": 260,
        "position": {
            "x": 1638.5821671263207,
            "y": 1534.2130118774965
        },
        "hp": 100,
        "state": "idle",
        "age": 7.546264869692672,
        "name": "game-object-container-id=260",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 260,
        "texture": 2,
    },
    {
        "id": 261,
        "position": {
            "x": 1147.3394076944185,
            "y": 370.4743094416344
        },
        "hp": 100,
        "state": "idle",
        "age": 5.256239329020542,
        "name": "game-object-container-id=261",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 261,
        "texture": 2,
    },
    {
        "id": 262,
        "position": {
            "x": 678.1675089109367,
            "y": 1677.2164808872587
        },
        "hp": 100,
        "state": "idle",
        "age": 8.572875715808646,
        "name": "game-object-container-id=262",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 262,
        "texture": 1,
    },
    {
        "id": 263,
        "position": {
            "x": 1302.5870916511728,
            "y": 394.92662195981904
        },
        "hp": 100,
        "state": "idle",
        "age": 5.898141882559496,
        "name": "game-object-container-id=263",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 263,
        "texture": 2,
    },
    {
        "id": 264,
        "position": {
            "x": 191.3428734093512,
            "y": 338.10739869499645
        },
        "hp": 100,
        "state": "idle",
        "age": 0.670961322112813,
        "name": "game-object-container-id=264",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 264,
        "texture": 2,
    },
    {
        "id": 265,
        "position": {
            "x": 1070.145943917766,
            "y": 1057.7072163023424
        },
        "hp": 100,
        "state": "idle",
        "age": 7.534540732940234,
        "name": "game-object-container-id=265",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 265,
        "texture": 2,
    },
    {
        "id": 266,
        "position": {
            "x": 688.3967383149314,
            "y": 797.2708972741297
        },
        "hp": 100,
        "state": "idle",
        "age": 7.372227439558249,
        "name": "game-object-container-id=266",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 266,
        "texture": 2,
    },
    {
        "id": 267,
        "position": {
            "x": 1816.5025437003126,
            "y": 388.832844533096
        },
        "hp": 100,
        "state": "idle",
        "age": 2.7675826445462057,
        "name": "game-object-container-id=267",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 267,
        "texture": 0,
    },
    {
        "id": 268,
        "position": {
            "x": 776.9706979664459,
            "y": 24.52925108460171
        },
        "hp": 100,
        "state": "idle",
        "age": 7.539565118501558,
        "name": "game-object-container-id=268",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 268,
        "texture": 0,
    },
    {
        "id": 269,
        "position": {
            "x": 1115.6671589830253,
            "y": 1786.5954795291009
        },
        "hp": 100,
        "state": "idle",
        "age": 1.8474881232061957,
        "name": "game-object-container-id=269",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 269,
        "texture": 1,
    },
    {
        "id": 270,
        "position": {
            "x": 534.2615790333552,
            "y": 1295.9929295575935
        },
        "hp": 100,
        "state": "idle",
        "age": 8.787478292852903,
        "name": "game-object-container-id=270",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 270,
        "texture": 1,
    },
    {
        "id": 271,
        "position": {
            "x": 1534.9356007340964,
            "y": 780.9820238041153
        },
        "hp": 100,
        "state": "idle",
        "age": 1.8654817460717255,
        "name": "game-object-container-id=271",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 271,
        "texture": 0,
    },
    {
        "id": 272,
        "position": {
            "x": 294.7463519918322,
            "y": 1563.5158958241616
        },
        "hp": 100,
        "state": "idle",
        "age": 5.7864885640188115,
        "name": "game-object-container-id=272",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 272,
        "texture": 1,
    },
    {
        "id": 273,
        "position": {
            "x": 411.6470597915565,
            "y": 1716.5514048226933
        },
        "hp": 100,
        "state": "idle",
        "age": 8.123436019077259,
        "name": "game-object-container-id=273",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 273,
        "texture": 1,
    },
    {
        "id": 274,
        "position": {
            "x": 1976.8192713779222,
            "y": 2.743208544064597
        },
        "hp": 100,
        "state": "idle",
        "age": 3.3777924527738232,
        "name": "game-object-container-id=274",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 274,
        "texture": 2,
    },
    {
        "id": 275,
        "position": {
            "x": 577.5181819661143,
            "y": 1189.3051282865076
        },
        "hp": 100,
        "state": "idle",
        "age": 7.131259556870081,
        "name": "game-object-container-id=275",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 275,
        "texture": 1,
    },
    {
        "id": 276,
        "position": {
            "x": 759.9181418034725,
            "y": 1470.5076502452166
        },
        "hp": 100,
        "state": "idle",
        "age": 8.86907493818043,
        "name": "game-object-container-id=276",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 276,
        "texture": 2,
    },
    {
        "id": 277,
        "position": {
            "x": 1777.1091593799101,
            "y": 116.48768876102525
        },
        "hp": 100,
        "state": "idle",
        "age": 8.676383701296732,
        "name": "game-object-container-id=277",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 277,
        "texture": 2,
    },
    {
        "id": 278,
        "position": {
            "x": 1401.5931812070635,
            "y": 183.66117762473004
        },
        "hp": 100,
        "state": "idle",
        "age": 8.834095342587508,
        "name": "game-object-container-id=278",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 278,
        "texture": 0,
    },
    {
        "id": 279,
        "position": {
            "x": 2000.4309854202522,
            "y": 296.73306122597376
        },
        "hp": 100,
        "state": "idle",
        "age": 3.7795337658043158,
        "name": "game-object-container-id=279",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 279,
        "texture": 2,
    },
    {
        "id": 280,
        "position": {
            "x": 1726.4428204785997,
            "y": 230.325249585086
        },
        "hp": 100,
        "state": "idle",
        "age": 8.159393274737669,
        "name": "game-object-container-id=280",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 280,
        "texture": 1,
    },
    {
        "id": 281,
        "position": {
            "x": 924.1548830295296,
            "y": 459.3973594196029
        },
        "hp": 100,
        "state": "idle",
        "age": 9.178869573438122,
        "name": "game-object-container-id=281",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 281,
        "texture": 2,
    },
    {
        "id": 282,
        "position": {
            "x": 1447.973211780473,
            "y": 1206.6241267256169
        },
        "hp": 100,
        "state": "idle",
        "age": 5.781834750090745,
        "name": "game-object-container-id=282",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 282,
        "texture": 2,
    },
    {
        "id": 283,
        "position": {
            "x": 992.8529932012672,
            "y": 674.0372548771992
        },
        "hp": 100,
        "state": "idle",
        "age": 0.20378010513180445,
        "name": "game-object-container-id=283",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 283,
        "texture": 0,
    },
    {
        "id": 284,
        "position": {
            "x": 1316.2877219814718,
            "y": 562.9163884239442
        },
        "hp": 100,
        "state": "idle",
        "age": 8.91551500611406,
        "name": "game-object-container-id=284",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 284,
        "texture": 1,
    },
    {
        "id": 285,
        "position": {
            "x": 669.0420641605385,
            "y": 226.21505217939054
        },
        "hp": 100,
        "state": "idle",
        "age": 0.955838349814131,
        "name": "game-object-container-id=285",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 285,
        "texture": 1,
    },
    {
        "id": 286,
        "position": {
            "x": 655.479380013173,
            "y": 570.6611489165124
        },
        "hp": 100,
        "state": "idle",
        "age": 6.306256812595466,
        "name": "game-object-container-id=286",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 286,
        "texture": 1,
    },
    {
        "id": 287,
        "position": {
            "x": 821.6032704077339,
            "y": 838.7092998808324
        },
        "hp": 100,
        "state": "idle",
        "age": 0.6706167004163044,
        "name": "game-object-container-id=287",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 287,
        "texture": 0,
    },
    {
        "id": 288,
        "position": {
            "x": 898.5604494786915,
            "y": 1391.8289330419523
        },
        "hp": 100,
        "state": "idle",
        "age": 9.72012198908047,
        "name": "game-object-container-id=288",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 288,
        "texture": 1,
    },
    {
        "id": 289,
        "position": {
            "x": 1383.7914391967406,
            "y": 1485.5498951150853
        },
        "hp": 100,
        "state": "idle",
        "age": 5.989066328810917,
        "name": "game-object-container-id=289",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 289,
        "texture": 1,
    },
    {
        "id": 290,
        "position": {
            "x": 1211.2457523807707,
            "y": 1224.2078604301246
        },
        "hp": 100,
        "state": "idle",
        "age": 9.94228933016505,
        "name": "game-object-container-id=290",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 290,
        "texture": 0,
    },
    {
        "id": 291,
        "position": {
            "x": 75.56187108842616,
            "y": 132.3911859148879
        },
        "hp": 100,
        "state": "idle",
        "age": 2.655279283192674,
        "name": "game-object-container-id=291",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 291,
        "texture": 2,
    },
    {
        "id": 292,
        "position": {
            "x": 673.3701970568972,
            "y": 861.3048635837658
        },
        "hp": 100,
        "state": "idle",
        "age": 2.992858145516845,
        "name": "game-object-container-id=292",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 292,
        "texture": 2,
    },
    {
        "id": 293,
        "position": {
            "x": 528.3803032106131,
            "y": 1803.4944597408532
        },
        "hp": 100,
        "state": "idle",
        "age": 3.5096870553192936,
        "name": "game-object-container-id=293",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 293,
        "texture": 1,
    },
    {
        "id": 294,
        "position": {
            "x": 1364.0682187960945,
            "y": 488.13468332436116
        },
        "hp": 100,
        "state": "idle",
        "age": 2.8890199990770613,
        "name": "game-object-container-id=294",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 294,
        "texture": 2,
    },
    {
        "id": 295,
        "position": {
            "x": 1674.7442539955073,
            "y": 1304.3519537361421
        },
        "hp": 100,
        "state": "idle",
        "age": 3.9692366531289336,
        "name": "game-object-container-id=295",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 295,
        "texture": 2,
    },
    {
        "id": 296,
        "position": {
            "x": 861.4551810121724,
            "y": 1263.3484138555775
        },
        "hp": 100,
        "state": "idle",
        "age": 7.401469212628394,
        "name": "game-object-container-id=296",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 296,
        "texture": 1,
    },
    {
        "id": 297,
        "position": {
            "x": 1838.190750692245,
            "y": 984.3559921553011
        },
        "hp": 100,
        "state": "idle",
        "age": 6.710422985447737,
        "name": "game-object-container-id=297",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 297,
        "texture": 2,
    },
    {
        "id": 298,
        "position": {
            "x": 776.0137000584995,
            "y": 707.3669724930838
        },
        "hp": 100,
        "state": "idle",
        "age": 3.350843586055392,
        "name": "game-object-container-id=298",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 298,
        "texture": 1,
    },
    {
        "id": 299,
        "position": {
            "x": 974.8469845916485,
            "y": 1602.368162975122
        },
        "hp": 100,
        "state": "idle",
        "age": 8.578644122894506,
        "name": "game-object-container-id=299",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 299,
        "texture": 2,
    },
    {
        "id": 300,
        "position": {
            "x": 1547.3164956394264,
            "y": 1636.7176232965928
        },
        "hp": 100,
        "state": "idle",
        "age": 8.815785359005176,
        "name": "game-object-container-id=300",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 300,
        "texture": 0,
    },
    {
        "id": 301,
        "position": {
            "x": 1402.0288969449498,
            "y": 1549.8968554845935
        },
        "hp": 100,
        "state": "idle",
        "age": 9.014687011605195,
        "name": "game-object-container-id=301",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 301,
        "texture": 2,
    },
    {
        "id": 302,
        "position": {
            "x": 878.8313979680865,
            "y": 1649.5770257809722
        },
        "hp": 100,
        "state": "idle",
        "age": 7.326963230521514,
        "name": "game-object-container-id=302",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 302,
        "texture": 0,
    },
    {
        "id": 303,
        "position": {
            "x": 1854.999216341646,
            "y": 1629.2266019849155
        },
        "hp": 100,
        "state": "idle",
        "age": 5.819189089053609,
        "name": "game-object-container-id=303",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 303,
        "texture": 2,
    },
    {
        "id": 304,
        "position": {
            "x": 2009.9320769147134,
            "y": 1692.9430868922768
        },
        "hp": 100,
        "state": "idle",
        "age": 4.005208572475471,
        "name": "game-object-container-id=304",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 304,
        "texture": 1,
    },
    {
        "id": 305,
        "position": {
            "x": 117.13155035950524,
            "y": 1625.5396680514687
        },
        "hp": 100,
        "state": "idle",
        "age": 2.9539962116447582,
        "name": "game-object-container-id=305",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 305,
        "texture": 2,
    },
    {
        "id": 306,
        "position": {
            "x": 996.1518368448751,
            "y": 1375.9758985498295
        },
        "hp": 100,
        "state": "idle",
        "age": 0.06618468675669398,
        "name": "game-object-container-id=306",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 306,
        "texture": 2,
    },
    {
        "id": 307,
        "position": {
            "x": 75.24777723518942,
            "y": 242.11005376912422
        },
        "hp": 100,
        "state": "idle",
        "age": 1.8895130650765646,
        "name": "game-object-container-id=307",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 307,
        "texture": 1,
    },
    {
        "id": 308,
        "position": {
            "x": 1340.3181188298552,
            "y": 1784.3315704258173
        },
        "hp": 100,
        "state": "idle",
        "age": 0.7883754619200234,
        "name": "game-object-container-id=308",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 308,
        "texture": 2,
    },
    {
        "id": 309,
        "position": {
            "x": 817.9236679362544,
            "y": 492.76522157527785
        },
        "hp": 100,
        "state": "idle",
        "age": 5.832510855563489,
        "name": "game-object-container-id=309",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 309,
        "texture": 2,
    },
    {
        "id": 310,
        "position": {
            "x": 1526.2537875692287,
            "y": 1578.6771480024258
        },
        "hp": 100,
        "state": "idle",
        "age": 1.1969125366369537,
        "name": "game-object-container-id=310",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 310,
        "texture": 1,
    },
    {
        "id": 311,
        "position": {
            "x": 1737.6826452002224,
            "y": 1588.2664148076205
        },
        "hp": 100,
        "state": "idle",
        "age": 3.6132006395706453,
        "name": "game-object-container-id=311",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 311,
        "texture": 1,
    },
    {
        "id": 312,
        "position": {
            "x": 1778.260333863199,
            "y": 659.4750945743024
        },
        "hp": 100,
        "state": "idle",
        "age": 8.878457975312351,
        "name": "game-object-container-id=312",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 312,
        "texture": 2,
    },
    {
        "id": 313,
        "position": {
            "x": 1197.3615020678587,
            "y": 1217.2560386897628
        },
        "hp": 100,
        "state": "idle",
        "age": 5.707367219379202,
        "name": "game-object-container-id=313",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 313,
        "texture": 2,
    },
    {
        "id": 314,
        "position": {
            "x": 663.9944940613542,
            "y": 102.08039275847493
        },
        "hp": 100,
        "state": "idle",
        "age": 8.623988061161988,
        "name": "game-object-container-id=314",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 314,
        "texture": 2,
    },
    {
        "id": 315,
        "position": {
            "x": 1093.0455959384767,
            "y": 1696.6658740927496
        },
        "hp": 100,
        "state": "idle",
        "age": 1.4628282245524094,
        "name": "game-object-container-id=315",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 315,
        "texture": 2,
    },
    {
        "id": 316,
        "position": {
            "x": 1771.4834109762157,
            "y": 1223.3541155661605
        },
        "hp": 100,
        "state": "idle",
        "age": 6.1270795104850615,
        "name": "game-object-container-id=316",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 316,
        "texture": 1,
    },
    {
        "id": 317,
        "position": {
            "x": 1138.3281028448996,
            "y": 327.3939388017939
        },
        "hp": 100,
        "state": "idle",
        "age": 2.5200080792346533,
        "name": "game-object-container-id=317",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 317,
        "texture": 1,
    },
    {
        "id": 318,
        "position": {
            "x": 527.3937423026323,
            "y": 1735.7732992070605
        },
        "hp": 100,
        "state": "idle",
        "age": 2.2526890712674428,
        "name": "game-object-container-id=318",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 318,
        "texture": 2,
    },
    {
        "id": 319,
        "position": {
            "x": 1879.8395060659652,
            "y": 1801.1793634337132
        },
        "hp": 100,
        "state": "idle",
        "age": 7.726989782302006,
        "name": "game-object-container-id=319",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 319,
        "texture": 2,
    },
    {
        "id": 320,
        "position": {
            "x": 962.3749420365718,
            "y": 430.90232482885665
        },
        "hp": 100,
        "state": "idle",
        "age": 8.090642137746595,
        "name": "game-object-container-id=320",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 320,
        "texture": 1,
    },
    {
        "id": 321,
        "position": {
            "x": 1860.7121346366644,
            "y": 544.5541281463849
        },
        "hp": 100,
        "state": "idle",
        "age": 0.718440647504961,
        "name": "game-object-container-id=321",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 321,
        "texture": 1,
    },
    {
        "id": 322,
        "position": {
            "x": 1935.3587045130266,
            "y": 1691.5184024607504
        },
        "hp": 100,
        "state": "idle",
        "age": 9.448054922220624,
        "name": "game-object-container-id=322",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 322,
        "texture": 0,
    },
    {
        "id": 323,
        "position": {
            "x": 1801.503732283037,
            "y": 394.85256334749425
        },
        "hp": 100,
        "state": "idle",
        "age": 7.864282294725003,
        "name": "game-object-container-id=323",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 323,
        "texture": 2,
    },
    {
        "id": 324,
        "position": {
            "x": 778.9147017757974,
            "y": 598.6472908560296
        },
        "hp": 100,
        "state": "idle",
        "age": 7.772439651722422,
        "name": "game-object-container-id=324",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 324,
        "texture": 0,
    },
    {
        "id": 325,
        "position": {
            "x": 1591.1507350707436,
            "y": 1087.8447935237039
        },
        "hp": 100,
        "state": "idle",
        "age": 9.250759780171226,
        "name": "game-object-container-id=325",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 325,
        "texture": 2,
    },
    {
        "id": 326,
        "position": {
            "x": 1214.8779859336914,
            "y": 1580.4546296631715
        },
        "hp": 100,
        "state": "idle",
        "age": 4.598866924833295,
        "name": "game-object-container-id=326",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 326,
        "texture": 0,
    },
    {
        "id": 327,
        "position": {
            "x": 1340.1065094729504,
            "y": 1591.9940622227948
        },
        "hp": 100,
        "state": "idle",
        "age": 6.931974866602238,
        "name": "game-object-container-id=327",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 327,
        "texture": 2,
    },
    {
        "id": 328,
        "position": {
            "x": 521.9405827815242,
            "y": 62.00296891573214
        },
        "hp": 100,
        "state": "idle",
        "age": 8.906160189191715,
        "name": "game-object-container-id=328",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 328,
        "texture": 1,
    },
    {
        "id": 329,
        "position": {
            "x": 1540.905255710724,
            "y": 160.20543887999997
        },
        "hp": 100,
        "state": "idle",
        "age": 9.859715917591874,
        "name": "game-object-container-id=329",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 329,
        "texture": 0,
    },
    {
        "id": 330,
        "position": {
            "x": 1444.5788145721745,
            "y": 497.42161608136496
        },
        "hp": 100,
        "state": "idle",
        "age": 7.89286760497745,
        "name": "game-object-container-id=330",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 330,
        "texture": 0,
    },
    {
        "id": 331,
        "position": {
            "x": 1438.678387876809,
            "y": 169.48307341180575
        },
        "hp": 100,
        "state": "idle",
        "age": 0.3439481933545008,
        "name": "game-object-container-id=331",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 331,
        "texture": 1,
    },
    {
        "id": 332,
        "position": {
            "x": 1093.7472761135311,
            "y": 336.8356882616439
        },
        "hp": 100,
        "state": "idle",
        "age": 7.221715581342644,
        "name": "game-object-container-id=332",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 332,
        "texture": 2,
    },
    {
        "id": 333,
        "position": {
            "x": 884.0448830428955,
            "y": 1571.8364585558634
        },
        "hp": 100,
        "state": "idle",
        "age": 8.54972775829642,
        "name": "game-object-container-id=333",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 333,
        "texture": 2,
    },
    {
        "id": 334,
        "position": {
            "x": 971.3688293497956,
            "y": 1212.7486711067588
        },
        "hp": 100,
        "state": "idle",
        "age": 3.756954300852291,
        "name": "game-object-container-id=334",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 334,
        "texture": 1,
    },
    {
        "id": 335,
        "position": {
            "x": 808.6125817588761,
            "y": 178.10748501475575
        },
        "hp": 100,
        "state": "idle",
        "age": 1.556390933868077,
        "name": "game-object-container-id=335",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 335,
        "texture": 1,
    },
    {
        "id": 336,
        "position": {
            "x": 1426.727259531928,
            "y": 981.3953694670158
        },
        "hp": 100,
        "state": "idle",
        "age": 3.536544317627227,
        "name": "game-object-container-id=336",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 336,
        "texture": 2,
    },
    {
        "id": 337,
        "position": {
            "x": 328.7275362827576,
            "y": 1574.9058594085786
        },
        "hp": 100,
        "state": "idle",
        "age": 7.48767886403729,
        "name": "game-object-container-id=337",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 337,
        "texture": 1,
    },
    {
        "id": 338,
        "position": {
            "x": 1977.6367826248293,
            "y": 1761.6266945510322
        },
        "hp": 100,
        "state": "idle",
        "age": 8.38853339555546,
        "name": "game-object-container-id=338",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 338,
        "texture": 2,
    },
    {
        "id": 339,
        "position": {
            "x": 773.7317037081064,
            "y": 1609.793120137663
        },
        "hp": 100,
        "state": "idle",
        "age": 8.16157509759208,
        "name": "game-object-container-id=339",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 339,
        "texture": 2,
    },
    {
        "id": 340,
        "position": {
            "x": 1607.4108523345396,
            "y": 1010.9250645325388
        },
        "hp": 100,
        "state": "idle",
        "age": 6.799925472603,
        "name": "game-object-container-id=340",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 340,
        "texture": 1,
    },
    {
        "id": 341,
        "position": {
            "x": 1840.2344481642683,
            "y": 1772.4960583738737
        },
        "hp": 100,
        "state": "idle",
        "age": 6.086372786884313,
        "name": "game-object-container-id=341",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 341,
        "texture": 1,
    },
    {
        "id": 342,
        "position": {
            "x": 833.6291737118368,
            "y": 1404.1052757397654
        },
        "hp": 100,
        "state": "idle",
        "age": 8.064492207341393,
        "name": "game-object-container-id=342",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 342,
        "texture": 2,
    },
    {
        "id": 343,
        "position": {
            "x": 1692.3104356001509,
            "y": 189.38912548003458
        },
        "hp": 100,
        "state": "idle",
        "age": 2.8746277310125548,
        "name": "game-object-container-id=343",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 343,
        "texture": 1,
    },
    {
        "id": 344,
        "position": {
            "x": 1914.3028999135188,
            "y": 1109.5879864633878
        },
        "hp": 100,
        "state": "idle",
        "age": 5.734504450034439,
        "name": "game-object-container-id=344",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 344,
        "texture": 0,
    },
    {
        "id": 345,
        "position": {
            "x": 405.7226705766344,
            "y": 1210.1856663080118
        },
        "hp": 100,
        "state": "idle",
        "age": 7.74291917365789,
        "name": "game-object-container-id=345",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 345,
        "texture": 2,
    },
    {
        "id": 346,
        "position": {
            "x": 1279.8158636246326,
            "y": 1134.2847237217632
        },
        "hp": 100,
        "state": "idle",
        "age": 7.836400026274999,
        "name": "game-object-container-id=346",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 346,
        "texture": 2,
    },
    {
        "id": 347,
        "position": {
            "x": 856.6359718341151,
            "y": 470.34198229690367
        },
        "hp": 100,
        "state": "idle",
        "age": 1.3358474396298892,
        "name": "game-object-container-id=347",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 347,
        "texture": 2,
    },
    {
        "id": 348,
        "position": {
            "x": 1386.2654548559915,
            "y": 1314.323513917379
        },
        "hp": 100,
        "state": "idle",
        "age": 0.6123686132497086,
        "name": "game-object-container-id=348",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 348,
        "texture": 0,
    },
    {
        "id": 349,
        "position": {
            "x": 1711.0467739421335,
            "y": 1168.5327235118216
        },
        "hp": 100,
        "state": "idle",
        "age": 5.250686385822407,
        "name": "game-object-container-id=349",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 349,
        "texture": 2,
    },
    {
        "id": 350,
        "position": {
            "x": 1539.3890628493175,
            "y": 42.891349544597745
        },
        "hp": 100,
        "state": "idle",
        "age": 9.406992433721683,
        "name": "game-object-container-id=350",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 350,
        "texture": 2,
    },
    {
        "id": 351,
        "position": {
            "x": 784.3653922971237,
            "y": 1400.4244232321555
        },
        "hp": 100,
        "state": "idle",
        "age": 7.427265757711671,
        "name": "game-object-container-id=351",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 351,
        "texture": 1,
    },
    {
        "id": 352,
        "position": {
            "x": 1194.4071262643722,
            "y": 1775.3506108809759
        },
        "hp": 100,
        "state": "idle",
        "age": 5.087033364368398,
        "name": "game-object-container-id=352",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 352,
        "texture": 1,
    },
    {
        "id": 353,
        "position": {
            "x": 990.0283046654005,
            "y": 48.269725511454894
        },
        "hp": 100,
        "state": "idle",
        "age": 6.13824832245148,
        "name": "game-object-container-id=353",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 353,
        "texture": 0,
    },
    {
        "id": 354,
        "position": {
            "x": 458.9313433362673,
            "y": 1377.0881309888
        },
        "hp": 100,
        "state": "idle",
        "age": 1.1637591101777878,
        "name": "game-object-container-id=354",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 354,
        "texture": 1,
    },
    {
        "id": 355,
        "position": {
            "x": 1742.686422466626,
            "y": 1177.4950882812645
        },
        "hp": 100,
        "state": "idle",
        "age": 5.466545482208525,
        "name": "game-object-container-id=355",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 355,
        "texture": 2,
    },
    {
        "id": 356,
        "position": {
            "x": 1459.48847875986,
            "y": 1212.6815715873497
        },
        "hp": 100,
        "state": "idle",
        "age": 1.112555334002755,
        "name": "game-object-container-id=356",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 356,
        "texture": 0,
    },
    {
        "id": 357,
        "position": {
            "x": 1831.8171057591192,
            "y": 52.51740021624747
        },
        "hp": 100,
        "state": "idle",
        "age": 2.4473629170177356,
        "name": "game-object-container-id=357",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 357,
        "texture": 2,
    },
    {
        "id": 358,
        "position": {
            "x": 1038.5870171851734,
            "y": 1521.2396391866218
        },
        "hp": 100,
        "state": "idle",
        "age": 1.1555711156184179,
        "name": "game-object-container-id=358",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 358,
        "texture": 1,
    },
    {
        "id": 359,
        "position": {
            "x": 395.875562444807,
            "y": 1477.6911753135341
        },
        "hp": 100,
        "state": "idle",
        "age": 3.069886772225595,
        "name": "game-object-container-id=359",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 359,
        "texture": 2,
    },
    {
        "id": 360,
        "position": {
            "x": 1646.2895189019193,
            "y": 722.1933062213033
        },
        "hp": 100,
        "state": "idle",
        "age": 2.4182612154688945,
        "name": "game-object-container-id=360",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 360,
        "texture": 2,
    },
    {
        "id": 361,
        "position": {
            "x": 1612.756504881464,
            "y": 228.31156618458076
        },
        "hp": 100,
        "state": "idle",
        "age": 3.9708465755513735,
        "name": "game-object-container-id=361",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 361,
        "texture": 0,
    },
    {
        "id": 362,
        "position": {
            "x": 886.7340065424956,
            "y": 599.3675110900521
        },
        "hp": 100,
        "state": "idle",
        "age": 8.178797909541915,
        "name": "game-object-container-id=362",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 362,
        "texture": 0,
    },
    {
        "id": 363,
        "position": {
            "x": 1958.240279870245,
            "y": 1653.8156385938141
        },
        "hp": 100,
        "state": "idle",
        "age": 4.478170139057804,
        "name": "game-object-container-id=363",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 363,
        "texture": 2,
    },
    {
        "id": 364,
        "position": {
            "x": 2005.6683764621098,
            "y": 101.83467476969709
        },
        "hp": 100,
        "state": "idle",
        "age": 1.4719972969635198,
        "name": "game-object-container-id=364",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 364,
        "texture": 1,
    },
    {
        "id": 365,
        "position": {
            "x": 1145.192316563873,
            "y": 1007.9530776445117
        },
        "hp": 100,
        "state": "idle",
        "age": 6.284755165798257,
        "name": "game-object-container-id=365",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 365,
        "texture": 1,
    },
    {
        "id": 366,
        "position": {
            "x": 704.6052316837333,
            "y": 1803.3233480156728
        },
        "hp": 100,
        "state": "idle",
        "age": 8.533683408567157,
        "name": "game-object-container-id=366",
        "dead": false,
        "timestamp": 1755961137263,
        "zIndex": 366,
        "texture": 1,
    }
]
