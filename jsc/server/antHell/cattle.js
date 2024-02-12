import { MinecraftDimensionTypes, system, world } from "@minecraft/server";
import { worldDB } from "../../library/build/databaseBuilder";
const cattles = ["minecraft:pig", "minecraft:sheep", "minecraft:chicken", "minecraft:cow"];
const spawnTickDB = new worldDB("spawnTick");
const growTick = 3000;
const deathTick = 6000;
system.runInterval(() => {
    getEntitiesWithTypes(cattles).forEach((en) => {
        const spawnTick = spawnTickDB.get(en);
        if (!spawnTick)
            spawnTickDB.set(en, system.currentTick);
        else {
            const livedTick = system.currentTick - spawnTick;
            en.nameTag = `${livedTick}`;
            if (livedTick > deathTick) {
                spawnTickDB.delete(en);
                en.kill();
            }
            else if (livedTick == growTick) {
                en.triggerEvent("minecraft:ageable_grow_up");
                en.removeEffect("health_boost");
            }
            else if (livedTick == 1) {
                en.addEffect("health_boost", 99999, { "amplifier": 255, "showParticles": false });
                en.addEffect("instant_health", 1, { "amplifier": 255, "showParticles": false });
                en.triggerEvent("minecraft:entity_born");
            }
        }
    });
});
function getEntitiesWithTypes(types) {
    let allEntities = [];
    for (let i = 0; i < types.length; i++) {
        const entities = world.getDimension(MinecraftDimensionTypes.overworld).getEntities({ "type": types[i] });
        allEntities = allEntities.concat(entities);
    }
    return allEntities;
}
//먹이 주기 금지
world.beforeEvents.playerInteractWithEntity.subscribe((ev) => {
    const feed = ["minecraft:carrot", "minecraft:seed", "minecraft:wheat"];
    if (!cattles.includes(ev.target.typeId))
        return;
    if (!feed.includes(ev.itemStack.typeId))
        return;
    if ((system.currentTick - spawnTickDB.get(ev.target)) < growTick)
        ev.cancel = true;
});
