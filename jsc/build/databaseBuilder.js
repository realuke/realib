import { Entity, world } from "@minecraft/server";
//같은 이름의 DB를 생성하지 않도록 확인하기 위한 배열
let DBlist = [];
/** DB를 Map의 형태로 입출력하며 worldDynamicProperty에 저장해줍니다. */
export class worldDB {
    /**
     * DB를 생성합니다.
     * @param name DB 이름
     */
    constructor(name) {
        /** DB 변수 */
        this.data = new Map();
        // 같은 이름의 DB가 있는지 확인
        if (DBlist.includes(name))
            throw new Error("There is DB with same name. import original DB variable or make new DB with another name.");
        DBlist.push(name);
        this.name = name;
        this.load();
    }
    /**
     * 데이터베이스에 값을 지정합니다.
     * @param key 데이터 키
     * @param value 데이터 값
     */
    set(key, value) {
        const stringKey = this.getStringKey(key);
        this.data.set(stringKey, value);
        this.save();
    }
    /**
     * 데이터베이스에서 값을 가져옵니다.
     * @param key 데이터 키
     * @returns 데이터 키의 값
     */
    get(key) {
        const stringKey = this.getStringKey(key);
        if (this.has(key))
            return this.data.get(stringKey);
        else
            return false;
    }
    /**
     * 데이터베이스에서 키와 값을 삭제합니다.
     * @param key 데이터 키
     */
    delete(key) {
        const stringKey = this.getStringKey(key);
        if (!this.has(stringKey))
            return;
        this.data.delete(stringKey);
        this.save();
    }
    /**
     * 데이터베이스에서 해당 키의 값 존재 여부를 알려줍니다.
     * @param key
     * @returns 데이터 키의 값 존재 여부
     */
    has(key) {
        const stringKey = this.getStringKey(key);
        return this.data.has(stringKey);
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
        world.setDynamicProperty(this.name, "None");
    }
    /**
     * Map data를 string 형태로 변환시킵니다.
     * @returns string으로 변환된 Map
     */
    toString() {
        // Map 형태의 자료는 JSON 변환이 불가하므로 자료를 먼저 [[key1, value1], [key2, value2]...] 형태의 배열로 변환
        const MapToArray = Array.from(this.data);
        return JSON.stringify(MapToArray);
    }
    /**
     * data Map을 worldDynamicProperty에 저장합니다.
     */
    save() {
        world.setDynamicProperty(this.name, this.toString());
    }
    /**
     * worldDynamicProperty에서 data를 로드합니다.
     */
    load() {
        //DB가 본래 있었었는지 확인(없다면 새로 만들어진 것이므로 load X)
        if (world.getDynamicProperty(this.name)) {
            // [[key1, value1], [key2, value2]...] 의 형태로 이루어진 배열을 Map으로 변환
            const getData = JSON.parse(world.getDynamicProperty(this.name));
            let ArrayToMap = new Map();
            for (const i of getData) {
                ArrayToMap.set(i[0], i[1]);
            }
            this.data = ArrayToMap;
        }
    }
    /**
     * Entity type의 key를 string으로 변환시켜줍니다.(Entity.id)
     * @param key 변환시킬 key
     * @returns string으로 변환된 key
     */
    getStringKey(key) {
        if (key instanceof Entity)
            return key.id;
        else
            return key;
    }
}
export function clearALLDB() {
    world.clearDynamicProperties();
}
