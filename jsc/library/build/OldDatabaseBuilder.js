// import { Entity, world, Player } from "@minecraft/server";
// import { Event } from "./eventEmitter.js";
// /**
//  * 월드의 저장소
//  */
// class DatabaseBuilder {
//     public dataEntity: Entity = [...world.getDimension('overworld').getEntities({name:"storage"})][0];
//     constructor() {
//         if(!this.dataEntity) {
//             const sumEn = world.getDimension('overworld').spawnEntity("armor_stand", { x:0, y:100000, z:0 } );
//             sumEn.nameTag = "stoage";
//             sumEn.addTag("{}")
//             world.getDimension('overworld').runCommandAsync('tickingarea add 0 0 0 0 0 0 storage true');
//         }
//         Event.add('tick',()=>{
//             [...world.getDimension('overworld').getEntities({name:"storage"})][0].teleport({x:1,y:1,z:1}, world.getDimension('overworld'), 0, 0);
//             [...world.getPlayers()].forEach((p)=>{
//                 if(!p.getTags().find(v=>v.startsWith("{"))) p.addTag("{}")
//             })
//         })
//     }
//     private getStorage() {
//         let result: { [key:string]: any } = JSON.parse(this.dataEntity.getTags()[0])
//         return result
//     }
//     private setStorage(value: object) {
//         this.dataEntity.removeTag(this.dataEntity.getTags()[0])
//         this.dataEntity.addTag(JSON.stringify(value))        
//     }
//     private getPerStorage(p:Player) {
//         let result: { [key:string]: any } = JSON.parse(p.getTags().find(v=>v.startsWith("{")))
//         return result;
//     }
//     private setPerStorage(p:Player, value: object) {
//         p.removeTag(p.getTags().find(v=>v.startsWith("{")))
//         p.addTag(JSON.stringify(value))        
//     }
//     /**
//      * 사용할 전역변수를 등록합니다.
//      * @param key 전역변수 이름
//      */
//     addGlobal(key:string, value:any = null) {
//         let get = this.getStorage()
//         get[key] = value;
//         this.setStorage(get)
//     }
//     /**
//      * 전역변수의 값을 지정합니다.
//      * @param key 전역변수 이름
//      * @param value 변수에 지정할 값
//      */
//     setGlobal(key:string, value:any) {
//         let get = this.getStorage();
//         get[key] = value;
//         this.setStorage(get);
//     }
//     /**
//      * 전역변수의 값을 가져옵니다.
//      * @param key 가져올 전역변수 이름
//      * @returns 가져온 값
//      */
//     getGlobal(key:string) {
//         let result = this.getStorage()[key];
//         return result;
//     }
//     /**
//      * 전역변수의 값을 지웁니다.(최적화에 도움)
//      * @param key 지울 변수 이름
//      */
//     removeGlobal(key:string) {
//         let get = this.getStorage();
//         delete get[key];
//         this.setStorage(get)
//     }
//     /**
//      * 사용할 개인변수를 등록합니다.
//      * @param player 개인
//      * @param key 개인변수 이름
//      */
//     addPersonal(player:Player, key:string) {
//         let get = this.getPerStorage(player)
//         get[key] = null;
//         this.setPerStorage(player, get)
//     }
//     /**
//      * 개인변수의 값을 지정합니다.
//      * @param key 개인변수 이름
//      * @param value 변수에 지정할 값
//      * @param player 개인
//      */
//     setPersonal(player:Player, key:string, value:any) {
//         let get = this.getPerStorage(player);
//         get[key] = value;
//         this.setPerStorage(player, get)
//     }
//     /**
//      * 개인변수의 값을 가져옵니다.
//      * @param player 개인
//      * @param key 가져올 개인변수 이름
//      * @returns 가져온 값
//      */
//     getPersonal(player:Player, key:string) {
//         let result = this.getPerStorage(player)[key];
//         return result;
//     }
//     /**
//      * 개인변수의 값을 지웁니다.(최적화에 도움)
//      * @param player 개인
//      * @param key 지울 개인변수 이름
//      * @returns void
//      */
//     removePersonal(player:Player, key:string) {
//         let get = this.getPerStorage(player);
//         delete get[key];
//         this.setPerStorage(player, get)
//     }
// }
// export const Database = new DatabaseBuilder();
