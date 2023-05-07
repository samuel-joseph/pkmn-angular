import { PlayerService } from './player.service';
export declare class PlayerController {
    private playerService;
    constructor(playerService: PlayerService);
    getPlayer(): {
        name: string;
        money: number;
        pokemons: any[];
    };
}
