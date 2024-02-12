import { MinecraftDimensionTypes, system, world } from "@minecraft/server";
let DB_names = [];
/** 데이터베이스 */
export class Database {
    /**
     * 데이터베이스를 생성합니다.
     * @param name 데이터베이스 이름
     */
    constructor(name) {
        /** 데이터베이스 변수 */
        this.data = new Map();
        if (DB_names.includes(name))
            throw new Error('A database with the same name already exists.');
        this.name = name;
        this.scoreboardObjective = world.scoreboard.getObjective(`DB_${name}`);
        if (!this.scoreboardObjective)
            this.scoreboardObjective = world.scoreboard.addObjective(`DB_${name}`, `DB_${name}`);
        system.runTimeout(() => {
            this.scoreboardObjective.getParticipants().forEach((v) => {
                const scoreboardPlayer = JSON.parse(v.displayName);
                this.data.set(scoreboardPlayer.key, scoreboardPlayer.value);
            });
        }, 1);
    }
    /**
     * 데이터베이스에 값을 지정합니다.
     * @param key 데이터 키
     * @param value 데이터 값
     */
    set(key, value) {
        this.delete(key);
        this.data.set(key, value);
        const scoreData = {
            key: key,
            value: value
        };
        this.scoreboardObjective.setScore(JSON.stringify(scoreData), 0);
    }
    /**
     * 데이터베이스에서 값을 가져옵니다.
     * @param key 데이터 키
     * @returns 데이터 키의 값
     */
    get(key) {
        return this.data.get(key);
    }
    /**
     * 데이터베이스에서 키와 값을 삭제합니다.
     * @param key 데이터 키
     */
    delete(key) {
        if (!this.has(key))
            return;
        this.scoreboardObjective.removeParticipant(JSON.stringify({ key: key, value: this.data.get(key) }));
        this.data.delete(key);
    }
    /**
     * 데이터베이스에서 해당 키의 값 존재 여부를 알려줍니다.
     * @param key
     * @returns 데이터 키의 값 존재 여부
     */
    has(key) {
        return this.data.has(key);
    }
    /**
     * 데이터의 모든 키들을 출력합니다.
     * @returns 모든 데이터 키
     */
    keys() {
        return [...this.data.keys()];
    }
    /**
     * 데이터베이스의 모든 값들을 출력합니다.
     * @returns 모든 데이터 값
     */
    values() {
        return [...this.data.values()];
    }
    /**
     * 데이터베이스의 모든 키를 삭제합니다.
     */
    clear() {
        world.getDimension(MinecraftDimensionTypes.overworld).runCommand(`scoreboard players reset * "DB_${this.name}"`);
    }
}
