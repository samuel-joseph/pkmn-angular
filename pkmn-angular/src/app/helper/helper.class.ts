import { Injectable } from "@angular/core";
import { MoveModel } from "../model/move-model.model";
import { PokemonService } from "../_services/pokemon/pokemon.service";
import { StateService } from "../_services/state/state.service";

export function getMoveFx(moveType: string, power: number) {
  let moveDamage = ''
  if (power > 70) {
    moveDamage = 'strong'
  } else {
    moveDamage = 'medium'
  }
  
  switch (moveDamage) {
    case 'medium':
      switch (moveType) {
        case 'water':
          return 'https://thumbs.gfycat.com/InformalWellwornCockroach-small.gif'
        case 'fire':
          return 'https://i.pinimg.com/originals/29/ca/76/29ca767e0d917e541cd18eb97f4825dc.gif'
        case 'grass':
          return 'https://i.imgur.com/uDJiGRk.gif'
        case 'electric':
          return 'https://media3.giphy.com/media/ebQMQkzmJNT7G/source.gif'
        case 'fighting':
          return 'https://cdna.artstation.com/p/assets/images/images/015/934/194/original/joshua-gates-quick-explosion.gif?1550235110'
        case 'normal':
          return 'https://cdna.artstation.com/p/assets/images/images/015/934/194/original/joshua-gates-quick-explosion.gif?1550235110'
        case 'dragon':
          return 'https://orangemushroom.files.wordpress.com/2016/07/demon-awakening-effect-slash-1.gif?w=400'
        case 'ghost':
          return 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/96269ce8-4a07-4702-936a-6860e1b5594f/dc62zhb-097d58db-0e51-4e7e-b3b4-8cee199d08a4.png/v1/fit/w_150,h_150,strp/shadow_ball__redesign__by_venjix5_dc62zhb-150.png'
        case 'psychic':
          return 'https://i.gifer.com/OupZ.gif'
        case 'steel':
          return 'https://miro.medium.com/v2/resize:fit:1400/1*itTs80OkVKKxysXRr9svew.gif'
        case 'fairy':
          return 'https://thumbs.gfycat.com/PlumpKnobbyArmednylonshrimp-size_restricted.gif'
        case 'dark':
          return 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/96269ce8-4a07-4702-936a-6860e1b5594f/dc62zhb-097d58db-0e51-4e7e-b3b4-8cee199d08a4.png/v1/fit/w_150,h_150,strp/shadow_ball__redesign__by_venjix5_dc62zhb-150.png'
        case 'bug':
          return 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/96269ce8-4a07-4702-936a-6860e1b5594f/dc62zhb-097d58db-0e51-4e7e-b3b4-8cee199d08a4.png/v1/fit/w_150,h_150,strp/shadow_ball__redesign__by_venjix5_dc62zhb-150.png'
        case 'flying':
          return 'https://thumbs.gfycat.com/RaggedMixedBlackfly-max-1mb.gif'
        case 'ice':
          return 'https://clipart-library.com/img/973912.gif'
        case 'rock':
          return 'https://media3.giphy.com/media/SFinpavCE7qC4ed3AG/giphy.gif?cid=6c09b9525a92lkkl5w214mkl5hxm1sd4eqoyvvj9yg69p68i&ep=v1_stickers_related&rid=giphy.gif&ct=s'
        case 'ground':
          return 'https://i.gifer.com/o8G.gif'
        case 'poison':
          return 'https://i.gifer.com/OupZ.gif'
        default:
          return 'https://www.freeiconspng.com/thumbs/x-png/x-png-18.png'
      }
    case 'strong':
      switch (moveType) {
        case 'water':
          return 'https://webstockreview.net/images/clipart-mountain-ocean-1.gif'
        case 'fire':
          return 'https://i.gifer.com/3q62.gif'
        case 'grass':
          return 'https://thumbs.gfycat.com/PlumpKnobbyArmednylonshrimp-size_restricted.gif'
        case 'electric':
          return 'https://i.gifer.com/4bXG.gif'
        case 'fighting':
          return 'https://cdna.artstation.com/p/assets/images/images/015/934/194/original/joshua-gates-quick-explosion.gif?1550235110'
        case 'normal':
          return 'https://media2.giphy.com/media/dphDDCpGfzJPq/source.gif'
        case 'dragon':
          return 'https://pa1.narvii.com/6881/3e2030d2b7d2ffe47e7fd0fa6fea2b7ce27f43fdr1-350-500_hq.gif'
        case 'ghost':
          return 'https://thumbs.gfycat.com/SickEnchantingAdamsstaghornedbeetle-small.gif'
        case 'psychic':
          return 'https://pa1.narvii.com/6916/24eaf472b2d3a587aed0c268fcd42f35aedb7061r1-1024-1024_hq.gif'
        case 'steel':
          return 'https://miro.medium.com/v2/resize:fit:1400/1*itTs80OkVKKxysXRr9svew.gif'
        case 'fairy':
          return 'https://thumbs.gfycat.com/PlumpKnobbyArmednylonshrimp-size_restricted.gif'
        case 'dark':
          return 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/96269ce8-4a07-4702-936a-6860e1b5594f/dc62zhb-097d58db-0e51-4e7e-b3b4-8cee199d08a4.png/v1/fit/w_150,h_150,strp/shadow_ball__redesign__by_venjix5_dc62zhb-150.png'
        case 'bug':
          return 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/96269ce8-4a07-4702-936a-6860e1b5594f/dc62zhb-097d58db-0e51-4e7e-b3b4-8cee199d08a4.png/v1/fit/w_150,h_150,strp/shadow_ball__redesign__by_venjix5_dc62zhb-150.png'
        case 'flying':
          return 'https://thumbs.gfycat.com/RaggedMixedBlackfly-max-1mb.gif'
        case 'ice':
          return 'https://clipart-library.com/img/973912.gif'
        case 'rock':
          return 'https://media3.giphy.com/media/SFinpavCE7qC4ed3AG/giphy.gif?cid=6c09b9525a92lkkl5w214mkl5hxm1sd4eqoyvvj9yg69p68i&ep=v1_stickers_related&rid=giphy.gif&ct=s'
        case 'ground':
          return 'https://i.gifer.com/o8G.gif'
        case 'poison':
          return 'https://i.gifer.com/OupZ.gif'
        default:
          return 'https://www.freeiconspng.com/thumbs/x-png/x-png-18.png'
      }
  }
  return 'https://www.freeiconspng.com/thumbs/x-png/x-png-18.png'
}

const moves = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 20, 21, 22, 23, 24, 25, 26, 27, 29, 30, 31, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 44, 45, 51, 52, 53, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 70, 71, 72, 75, 76, 80, 83, 84, 85, 86, 87, 88, 89, 92, 93, 94, 98, 99, 111, 106, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 136, 138, 140, 141, 143, 145, 146, 152, 154, 155, 157, 158, 161, 163, 165, 167, 168, 172, 173, 177, 181, 183, 185, 188, 189, 190, 192, 196, 198, 200, 202, 205, 206, 209, 210, 211, 221, 223, 224, 225, 228, 229, 231, 232, 233, 237, 238, 239, 242, 245, 246, 247, 248, 249, 250, 252, 253, 257, 263, 264, 265, 276, 279, 280, 282, 284, 290, 292, 295, 296, 299, 301, 302, 304, 305, 306, 307, 308, 309, 310, 311, 314, 315, 317, 318, 323, 324, 325, 326, 327, 328, 330, 331, 332, 333, 337, 338, 340, 341, 342, 343, 344, 345, 348, 350, 351, 352, 353, 354, 358, 359, 362, 364, 365, 369, 370, 371, 372, 387, 389, 394, 395, 396, 398, 399, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 416, 418, 419, 420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 448, 449, 450, 451, 452, 453, 454, 457, 458, 459, 460, 463, 465, 466, 467, 473, 474, 479, 480, 481, 482, 485, 488, 490, 491, 492, 496, 497, 498, 499, 500, 503, 506, 507, 509, 510, 512, 514, 517, 518, 519, 520, 521, 522, 523, 524, 525, 527, 528, 529, 530, 531, 532, 533, 534, 536, 537, 539, 540, 541, 542, 543, 544, 545, 546, 547, 548, 549, 550, 551, 552, 553, 554, 555, 556, 557, 558, 559, 560, 562, 565, 566, 570, 572, 573, 574, 577, 583, 584, 585, 586, 591, 592, 593, 594, 595, 605, 609, 610, 611, 612, 613, 614, 615, 616, 617, 618, 619, 620, 621, 658, 660, 662, 663, 664, 665, 667, 669, 670, 675, 676, 677, 679, 680, 681, 682, 684, 686, 687, 688, 690, 691, 692, 693, 695, 696, 697, 699, 700, 701, 703, 704, 705, 706, 707, 708, 709, 710, 711, 712, 713, 714, 716, 718, 719, 720, 721, 722, 723, 724, 725, 726, 727, 728, 729, 730, 731, 733, 734, 735, 736, 737, 738, 739, 740, 742, 744, 745, 746, 751, 754, 755, 775, 776, 778, 779, 780, 781, 782, 783, 784, 785, 786, 787, 788, 789, 790, 793, 794, 795, 796, 797, 798, 799, 800, 801, 802, 803, 804, 805, 806, 807, 808, 809, 812, 813, 814, 815, 817, 818, 819, 820, 821, 822, 823, 824, 825, 826, 827, 828, 830, 831, 832, 833, 834, 835, 836, 838, 839, 840, 841, 843, 844, 845, 846, 847, 848, 851, 853, 854, 855, 856, 857, 859, 860, 861, 862, 864, 865, 866, 869, 870, 871, 872, 873, 874, 875, 876, 878, 879, 884, 885, 886, 887, 888, 889, 890, 891, 892, 893, 895, 896, 897, 898, 899, 900]



@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(
    private pokemonService: PokemonService,
    private stateService: StateService
  ) { }


  createMove(move: any): MoveModel {
    let description 
    for (let desc of move.flavor_text_entries) {
      if (desc.language.name == "en") {
        description = desc.flavor_text
      }
    }
  
    return {
      id: move.id,
      name: move.name,
      power: move.power,
      pp: move.pp,
      ppMax: move.pp,
      type: move.type.name,
      accuracy: move.accuracy,
      damageClass: move.damage_class.name,
      effect_chance: move.effect_chance,
      stat_changes: move.stat_changes,
      priority: move.priority,
      hits: move.meta?{
        max_hits: move.meta.max_hits,
        min_hits: move.meta.min_hits
      } : {
        max_hits: 0,
        min_hits: 0
        },
      crit_rate: move.meta ? move.meta.crit_rate : 0,
      moveFx: '',
      target: move.target.name,
      description,
      drain: move.meta.drain
    }
  }
}
