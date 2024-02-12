import { world, EntityDamageCause, system, ItemLockMode, EntityHealthComponent } from "@minecraft/server";
import { PInvUtil } from "../library/util/InvUtil.js";
import { ItemUtil } from "../library/util/itemUtil.js";
import { worldDB } from "../library/build/databaseBuilder.js";
import { MinecraftEntityTypes } from "@minecraft/vanilla-data";
// 데이터베이스 생성
const AttackCoolDB = new worldDB("attackCool");
const SelectedSlotDB = new worldDB("selectedSlot");
system.runInterval(() => {
    world.getAllPlayers().forEach(pl => {
        const pInv = new PInvUtil(pl);
        const mainhand = pInv.getMainhand();
        const attackCoolData = AttackCoolDB.get(pl.id);
        const selectedSlotData = SelectedSlotDB.get(pl.id);
        //데이터 기본값 지정
        if (selectedSlotData === undefined || attackCoolData === undefined) {
            AttackCoolDB.set(pl.id, 0);
            SelectedSlotDB.set(pl.id, 0);
            return;
        }
        // 쿨타임 && 슬롯 데이터 변경
        SelectedSlotDB.set(pl.id, pl.selectedSlot);
        if (attackCoolData > 0)
            AttackCoolDB.set(pl.id, attackCoolData - 1);
        else if (is_weapon(mainhand))
            pInv.setMainhand(new ItemUtil(mainhand).setLockMode(ItemLockMode.none));
        // 슬롯이 변경되었을 경우
        if (selectedSlotData !== pl.selectedSlot) {
            // 이전 슬롯의 아이템이 무기일 경우 쿨타임 리셋
            const previousItem = pInv.getItem(selectedSlotData);
            if (is_weapon(previousItem)) {
                const noneLockItem = new ItemUtil(previousItem).setLockMode(ItemLockMode.none);
                pInv.setItem(selectedSlotData, noneLockItem);
            }
            // 현재 슬롯의 아이템이 무기일 경우 쿨타임 추가
            if (is_weapon(mainhand)) {
                const tool = returnCorrectTool(mainhand);
                AttackCoolDB.set(pl.id, tool.cool);
                pInv.setMainhand(new ItemUtil(mainhand).setLockMode(ItemLockMode.slot));
            }
        }
        // 데이터 변수 액션바로 출력
        pl.onScreenDisplay.setActionBar(`${attackCoolData}, ${selectedSlotData}`);
    });
});
world.afterEvents.entityHurt.subscribe((e) => {
    const damagingEntity = e.damageSource.damagingEntity;
    // 공격자가 플레이어가 아니거나 공격자가 없을 경우 return
    if (damagingEntity?.typeId !== MinecraftEntityTypes.Player || e.damageSource.cause !== EntityDamageCause.entityAttack)
        return;
    const pInv = new PInvUtil(damagingEntity);
    const itemStack = pInv.getMainhand();
    const attackCoolData = AttackCoolDB.get(damagingEntity.id);
    // 공격한 아이템이 무기일 경우에만 실행
    if (is_weapon(itemStack)) {
        // 쿨타임 추가
        const tool = returnCorrectTool(itemStack);
        AttackCoolDB.set(damagingEntity.id, tool.cool);
        // 쿨타임이 없을 경우 공격 실행
        if (attackCoolData === 0) {
            pInv.setMainhand(new ItemUtil(itemStack).setLockMode(ItemLockMode.slot));
            tool.AfterHit(e);
        }
        // 쿨타임 상태일 경우 데미지 무효화
        else {
            const health = e.hurtEntity.getComponent(EntityHealthComponent.componentId);
            health.setCurrentValue(health.currentValue + e.damage);
        }
    }
});
/**
 * 아이템의 종류에 해당되는 도구 클래스를 출력
 * @param itemStack 아이템
 * @returns 아이템 도구 클래스
 */
function returnCorrectTool(itemStack) {
    if (itemStack.hasTag("is_sword"))
        return new sword(itemStack);
    if (itemStack.hasTag("is_shovel"))
        return new shovel(itemStack);
    if (itemStack.hasTag("is_axe"))
        return new axe(itemStack);
    if (itemStack.hasTag("is_hoe"))
        return new hoe(itemStack);
}
;
/**
 * 아이템이 무기인지 확인
 * @param itemStack 확인할 아이템
 * @returns 확인 결과
 */
function is_weapon(itemStack) {
    if (!itemStack)
        return false;
    if (itemStack.hasTag("is_tool") && !itemStack.hasTag("is_pickaxe"))
        return true;
    else
        return false;
}
class sword {
    constructor(itemStack) {
        this.itemStack = itemStack;
        this.cool = 10;
        this.damageRatio = 1;
    }
    AfterHit(ev) {
    }
}
class shovel {
    constructor(itemStack) {
        this.itemStack = itemStack;
        this.cool = 5;
        this.damageRatio = 1;
    }
    AfterHit(ev) {
        const random = Math.floor(Math.random() * 100);
        if (random < 40) {
            const x = ev.hurtEntity.location.x - ev.damageSource.damagingEntity.location.x;
            const z = ev.hurtEntity.location.z - ev.damageSource.damagingEntity.location.z;
            const y = ev.hurtEntity.location.y - ev.damageSource.damagingEntity.location.y;
            ev.damageSource.damagingEntity.applyKnockback(x, z, 2, y / 4);
        }
    }
}
class axe {
    constructor(itemStack) {
        this.itemStack = itemStack;
        this.cool = 30;
        this.damageRatio = 2;
    }
    AfterHit(ev) {
        const knockback = ev.damageSource.damagingEntity.getViewDirection();
        ev.hurtEntity.applyKnockback(knockback.x, knockback.z, 1, 0.7);
        ev.hurtEntity.applyDamage(Math.round((ev.damage - 1) * this.damageRatio), { "cause": EntityDamageCause.entityAttack, "damagingEntity": ev.damageSource.damagingEntity });
    }
}
class hoe {
    constructor(itemStack) {
        this.itemStack = itemStack;
        this.cool = 20;
        this.damageRatio = 1.2;
    }
    AfterHit(ev) {
        ev.hurtEntity.dimension.getEntities({ "closest": 5, "location": ev.hurtEntity.location, "maxDistance": 4, "families": ["mob"] }).forEach((en) => {
            if (en == ev.damageSource.damagingEntity)
                return;
            en.applyDamage(Math.round(ev.damage), { "cause": EntityDamageCause.entityAttack, "damagingEntity": ev.damageSource.damagingEntity });
        });
    }
}
