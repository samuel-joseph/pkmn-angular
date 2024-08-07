const image = '../assets/images/fx/'

export const pokeball = 'https://www.freeiconspng.com/thumbs/pokeball-png/pokemon-ball-png-1.png'

export const regions = [
  'kanto',
  'johto',
  'hoenn',
  'sinnoh',
  'unova',
  'kalos',
  'alola'
]


// 'kalos',

export const powerup = {
  attack: 'https://cdn-icons-png.flaticon.com/128/8193/8193165.png',
  defense: 'https://png.pngtree.com/png-vector/20221019/ourmid/pngtree-blue-cartoon-shield-png-image_6341282.png',
  specialdefense: 'https://png.pngtree.com/png-vector/20221019/ourmid/pngtree-blue-cartoon-shield-png-image_6341282.png',
  specialattack: 'https://www.pinclipart.com/picdir/big/1-19763_staff-transparent-wizard-clip-art-png-download.png',
  speed: 'https://www.pngkey.com/png/full/317-3175766_cartoon-angel-wings-png-waze-up.png'
}

//important moves 
// stat boost 775 39 45

export const moves = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 20, 21, 22, 23, 24, 25, 26, 27, 29, 30, 31, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 44, 45, 51, 52, 53, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 70, 71, 72, 75, 76, 80, 83, 84, 85, 86, 87, 88, 89, 92, 93, 94, 98, 99, 111, 106, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 136, 138, 140, 141, 143, 145, 146, 152, 154, 155, 157, 158, 161, 163, 165, 167, 168, 172, 173, 177, 181, 183, 185, 188, 189, 190, 192, 196, 198, 200, 202, 205, 206, 209, 210, 211, 221, 223, 224, 225, 228, 229, 231, 232, 233, 237, 238, 239, 242, 245, 246, 247, 248, 249, 250, 252, 253, 257, 263, 264, 265, 276, 279, 280, 282, 284, 290, 292, 295, 296, 299, 301, 302, 304, 305, 306, 307, 308, 309, 310, 311, 314, 315, 317, 318, 323, 324, 325, 326, 327, 328, 330, 331, 332, 333, 337, 338, 340, 341, 342, 343, 344, 345, 348, 350, 351, 352, 353, 354, 358, 359, 362, 364, 365, 369, 370, 371, 372, 387, 389, 394, 395, 396, 398, 399, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 416, 418, 419, 420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 448, 449, 450, 451, 452, 453, 454, 457, 458, 459, 460, 463, 465, 466, 467, 473, 474, 479, 480, 481, 482, 485, 488, 490, 491, 492, 496, 497, 498, 499, 500, 503, 506, 507, 509, 510, 512, 514, 517, 518, 519, 520, 521, 522, 523, 524, 525, 527, 528, 529, 530, 531, 532, 533, 534, 536, 537, 539, 540, 541, 542, 543, 544, 545, 546, 547, 548, 549, 550, 551, 552, 553, 554, 555, 556, 557, 558, 559, 560, 562, 565, 566, 570, 572, 573, 574, 577, 583, 584, 585, 586, 591, 592, 593, 594, 595, 605, 609, 610, 611, 612, 613, 614, 615, 616, 617, 618, 619, 620, 621, 658, 660, 662, 663, 664, 665, 667, 669, 670, 675, 676, 677, 679, 680, 681, 682, 684, 686, 687, 688, 690, 691, 692, 693, 695, 696, 697, 699, 700, 701, 703, 704, 705, 706, 707, 708, 709, 710, 711, 712, 713, 714, 716, 718, 719, 720, 721, 722, 723, 724, 725, 726, 727, 728, 729, 730, 731, 733, 734, 735, 736, 737, 738, 739, 740, 742, 744, 745, 746, 751, 754, 755, 775, 776, 778, 779, 780, 781, 782, 783, 784, 785, 786, 787, 788, 789, 790, 793, 794, 795, 796, 797, 798, 799, 800, 801, 802, 803, 804, 805, 806, 807, 808, 809, 812, 813, 814, 815, 817, 818, 819, 820, 821, 822, 823, 824, 825, 826, 827, 828, 830, 831, 832, 833, 834, 835, 836, 838, 839, 840, 841, 843, 844, 845, 846, 847, 848, 851, 853, 854, 855, 856, 857, 859, 860, 861, 862, 864, 865, 866, 869, 870, 871, 872, 873, 874, 875, 876, 878, 879, 884, 885, 886, 887, 888, 889, 890, 891, 892, 893, 895, 896, 897, 898, 899, 900]

export const bannedPokemon = [132,144,145,146,150,151,243,244,245,249,250,251, 289, 377,378,379,380,381,382,383,384,385,386,386,386,480,481,482,483,484,485,486,487,488,489,490,491,492,493,494,638,639,640,641,642,643,644,645,646,647,648,649,718,785, 786,787,788,789,790,791,792,800,801,802,]

export const playerProfile = {
  name: 'player1',
  image: "https://static-cdn.jtvnw.net/jtv_user_pictures/5793095b-97ef-4602-b69d-d7c5052e83ae-profile_image-300x300.png"
}

export const rechargeMove = ['hyper-beam', 'giga-impact', 'frenzy-plant', 'blast-burn', 'hydro-cannon', 'rock-wrecker', 'roar-of-time']

export const chargeMove = ['meteor-beam','solar-beam','sky-attack']

export const moveFxRecords = {
  normalPhysical: image+'tackle.gif',
  normalSpecial: image+'taclke.gif',
  waterSpecialMid: 'https://webstockreview.net/images/clipart-mountain-ocean-1.gif',
  waterSpecialHard: image+'water-strong.gif',
  thunderPhysical: image+'yellow-physical.gif',
  thunderSpecialMid: 'https://media3.giphy.com/media/ebQMQkzmJNT7G/source.gif',
  thunderSpecialHard: image+'thunder.gif',
  windSpecial: image+'wind.gif',
  fireSpecialMid: 'https://i.gifer.com/3q62.gif',
  fireSpecialHard: 'https://i.gifer.com/3q62.gif',
  firePhysical: image+'fire-physical.gif',
  dragonPhysical: image+'dragon.gif',
  rockSpecial: image+'rock.gif',
  grassPhysical: image+'green-physical.gif',
  grassStrong: image+'grass-strong.gif',
  grassSpecial: image+'green-special.gif',
  psychicSpecial: image+'psychic.gif',
  psychicPhysical: image+'purple-physical.gif',
  purpleSpecial: image+'purple-special.gif',
  bluePhysical: image+'water-physical.gif',
  brown: image+'blast.gif',
  pinkBlast: image+'blast.gif',
  pinkBlast2: image+'blast.gif',
  blackBlast: image+'blast.gif',
  metal1: image+'bullet.gif',
  metal2: image+'chain.gif',
  fighting: image+'normal.gif',
  ice: image+'ice-cubes.gif',
  ice1: image+'iceburg.gif',
  redSpecial: image+'fire.gif',
  groundSpecial: image+'strong-brown-special.gif',
  dark: image+'dark.gif',
  violetDiamond: 'https://i.gifer.com/OupZ.gif',
  boulder: image+'rock.gif',
  strongBlast:'https://media2.giphy.com/media/dphDDCpGfzJPq/source.gif',
  aura:'https://pa1.narvii.com/6881/3e2030d2b7d2ffe47e7fd0fa6fea2b7ce27f43fdr1-350-500_hq.gif',
  psychicSpecialHard: 'https://pa1.narvii.com/6916/24eaf472b2d3a587aed0c268fcd42f35aedb7061r1-1024-1024_hq.gif',
  slash: image + 'slash.gif',
  shuriken: image + 'shuriken.gif',
  punch: image + 'punch.gif',
  grassUlt: image + 'grassUltimate.gif'
}