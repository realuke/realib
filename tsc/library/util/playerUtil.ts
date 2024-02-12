import { GameMode, Player, world } from "@minecraft/server";

 /**
 * 플레이어와 관련된 다양한 기능을 제공합니다.
 */
class PlayerBuilder {

    /**
     * 플레이어의 게임모드를 가져옵니다.
     * @param player 플레이어
     * @returns player's gamemode
     */
    getGamemode(player: Player): GameMode {
        return Object.values(GameMode).find(
            (g) => [...world.getPlayers({ name: player.name, gameMode: g })].length
        );
    }
}

export const playerUtil = new PlayerBuilder();