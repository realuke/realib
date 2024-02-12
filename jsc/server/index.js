import { GameMode, world } from "@minecraft/server";
world.sendMessage('hello');
world.sendMessage('started');
//나침반 이동
world.afterEvents.itemUse.subscribe((e) => {
    const source = e.source;
    const item = e.itemStack;
    if (item.typeId == 'minecraft:compass')
        source.teleport(e.source.getBlockFromViewDirection().block.location, { "dimension": e.source.dimension, "rotation": { "x": source.getRotation().x, "y": e.source.getRotation().y } });
});
world.sendMessage("test");
world.sendMessage(new Date().toUTCString());
world.afterEvents.buttonPush.subscribe((e) => {
    world.sendMessage(`${new Date()}`);
});
function getGamemode(player) {
    return Object.values(GameMode).find((g) => [...world.getPlayers({ name: player.name, gameMode: g })].length);
}
world.beforeEvents.playerInteractWithBlock.subscribe((e) => {
    if (!(e.block.typeId === "minecraft:glow_frame"))
        return;
    if (!(getGamemode(e.player) === GameMode.adventure))
        return;
    e.cancel = true;
});
