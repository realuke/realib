// import {
//     BeforeChatEvent,
//     BeforeExplosionEvent,
//     BeforePistonActivateEvent,
//     BlockExplodeEvent,
//     BeforeItemUseEvent,
//     BeforeItemUseOnEvent,
//     ChatEvent,
//     TickEvent,
//     PlayerJoinEvent,
//     PlayerLeaveEvent,
//     EffectAddEvent,
//     ExplosionEvent,
//     PistonActivateEvent,
//     WeatherChangeEvent,BlockBreakEvent, 
//     BlockPlaceEvent, 
//     EntitySpawnEvent, 
//     EntityHitEvent, 
//     EntityHurtEvent, 
//     ItemCompleteChargeEvent, 
//     ItemDefinitionTriggeredEvent, 
//     ItemReleaseChargeEvent, 
//     ItemUseEvent, 
//     ItemUseOnEvent, 
//     world, 
//     WorldInitializeEvent,
//     ItemStopChargeEvent,
//     ItemStopUseOnEvent,
//     system,
//     EntityDieEvent,
//     SystemEvents
//   } from "@minecraft/server";
//   interface EventList {
//     "beforeMessage": BeforeChatEvent,
//     "beforeExplosion": BeforeExplosionEvent,
//     "beforePistonActivate": BeforePistonActivateEvent,
//     "blockExplode": BlockExplodeEvent,
//     "messageCreate": ChatEvent,
//     "BeforeItemUse": BeforeItemUseEvent,
//     "BeforeItemUseOn": BeforeItemUseOnEvent,
//     "tick": TickEvent,
//     "entityEffected": EffectAddEvent,
//     "entitySpawn": EntitySpawnEvent,
//     "explosion": ExplosionEvent,
//     "pistonActivate": PistonActivateEvent,
//     "weatherChange": WeatherChangeEvent,
//     "playerJoin": PlayerJoinEvent,
//     "playerLeave": PlayerLeaveEvent,
//     "chat": ChatEvent,
//     "beforeChat": BeforeChatEvent,
//     "itemUse": ItemUseEvent,
//     "itemUseOn": ItemUseOnEvent,
//     "entityHit": EntityHitEvent,
//     "entityHurt": EntityHurtEvent,
//     "blockBreak": BlockBreakEvent,
//     "blockPlace": BlockPlaceEvent,
//     "itemReleaseCharge": ItemReleaseChargeEvent,
//     "itemCompleteCharge": ItemCompleteChargeEvent,
//     "beforeItemDefinition": ItemDefinitionTriggeredEvent,
//     "worldInitialize": WorldInitializeEvent,
//     "itemStopUseOn": ItemStopUseOnEvent,
//     "entityDie": EntityDieEvent,
//     "itemStopCharge": ItemStopChargeEvent,
//     "run": SystemEvents,
//     "runInterval": SystemEvents,
//     "runTimeout": SystemEvents
// }
// interface events {
//   eventName: string,
//   func: Function
// }
// export class EventBuilder {
//     /**
//      * 이벤트를 감지하여 함수를 실행합니다.
//      */
//     private events: events[] = []
//     constructor() {
//         world.events.chat.subscribe(data => this.emit('chat', data))
//         world.events.beforeChat.subscribe(data => this.emit('beforeChat', data))
//         world.events.worldInitialize.subscribe(data => this.emit('worldInitialize', data))
//         world.events.itemUse.subscribe(data => this.emit('itemUse', data))
//         world.events.itemUseOn.subscribe(data => this.emit('itemUseOn', data))
//         world.events.beforeItemUseOn.subscribe(data => this.emit('BeforeItemUseOn', data))
//         world.events.itemStopUseOn.subscribe(data => this.emit('itemStopUseOn', data))
//         world.events.itemReleaseCharge.subscribe(data => this.emit('itemReleaseCharge', data))
//         world.events.itemCompleteCharge.subscribe(data => this.emit('itemCompleteCharge', data))
//         world.events.itemStopCharge.subscribe(data => this.emit('itemStopCharge', data))
//         world.events.beforeItemDefinitionEvent.subscribe(data => this.emit('beforeItemDefinition', data))
//         world.events.entityHit.subscribe(data => this.emit('entityHit', data))
//         world.events.entityHurt.subscribe(data => this.emit('entityHurt', data))
//         world.events.entityDie.subscribe(data => this.emit('entityDie', data))
//         world.events.entitySpawn.subscribe(data => this.emit('entitySpawn', data))
//         world.events.blockBreak.subscribe(data => this.emit('blockBreak', data))
//         world.events.blockPlace.subscribe(data => this.emit('blockPlace', data))
//         world.events.playerJoin.subscribe(data => this.emit('playerJoin', data))
//         world.events.playerLeave.subscribe(data => this.emit('playerLeave', data))
//         system.run(() => this.emit('run'))
//         system.runInterval(() => this.emit('runInterval'))
//         system.runTimeout(() => this.emit('runTimeout'))
//     }
//     /**
//      * 감지할 이벤트와 실행할 함수를 추가합니다.
//      * @param {String} eventName 감지할 이벤트
//      * @param {Function} func 실행할 함수
//      */
//     add<K extends keyof EventList>(eventName: K, func: (args: EventList[K]) => void) {
//         const tmp = {
//             eventName,
//             func,
//         }
//         this.events.push(tmp)
//         return func;
//     }
//     /**
//      * 이벤트를 삭제합니다.
//      * @param {String} eventName 이벤트 속성
//      * @param {Function} func 함수
//      */
//     remove<K extends keyof EventList>(eventName: K, func: (args: EventList[K]) => void): void {
//         if(typeof func === "number") this.events.splice(func, 1);
//         const index = this.events.findIndex(v => v.eventName === eventName && v.func === func);
//         if(index !== -1) this.events.splice(index, 1);
//       }
//     /**
//      * 이벤트 실행
//      * @param {String} eventName 이벤트 속성
//      * @param  {any[]} args 파라미터
//      */
//     private emit<K extends keyof EventList>(eventName: K, args?: EventList[K]) {
//         this.events.forEach(obj => {
//             if(obj.eventName == eventName) {
//                 obj.func(args)
//             }
//         })
//     }
// }
// /**
//  * 이벤트 실행 클래스
//  */
// export const Event = new EventBuilder()
