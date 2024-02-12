// import { world, Player, ItemDurabilityComponent } from "@minecraft/server";
// import { Event } from "../library/build/eventEmitter.js";
// import { PInvUtil } from "../library/util/inv/InvUtil.js";
// import { ActionFormData } from "@minecraft/server-ui"
// import { EventUtil } from "../library/util/eventUtil.js";
// Event.add("BeforeItemUseOn", async (e) => {
//         //source type을 플레이어로 지정
//         const source = e.source as Player  
//         const block = EventUtil.getBlock(e);
//         const Pinv = new PInvUtil(source) 
//         const mainhand = Pinv.getMainhand();
//         //아이템을 인첸트 테이블에 사용했는지 확인
//         if(block.typeId !== "minecraft:enchanting_table" || e.source.isSneaking) e.cancel = false;
//         //아이템이 도구인지 확인(비효율, 나중에 수정 필요)
//         //durability,enchantments 컴포넌트로 감지 실패(버그인 듯)
//         else if(!mainhand?.getComponent(ItemDurabilityComponent.componentId)) source.sendMessage("§c이 아이템은 효과부여할 수 없습니다!"), e.cancel = true;
//         //위 조건에 걸리지 않을 때, 실행
//         else {
//             //마크 인첸트 UI 닫기
//             e.cancel = true;
//             //아이템 정보
//             const name = mainhand.typeId.slice(10).replaceAll("_"," ").toUpperCase()
//             //UI form 실행 
//             const form = new ActionFormData()
//             form.title("효과부여대")
//             form.body(`\uE301 §7${name}\n\n\uE300 효과:`)
//             form.button("강화하기")
//             const res = (await form.show(source))
//         }
// });
// const weapon = ["sword","helmet","chestplate","leggings","boots","bow","axe"]
