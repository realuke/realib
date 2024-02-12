/**
 * 아이템 세팅 클래스
 * @param {ItemStack} item 아이템
 */
export class ItemUtil {
    constructor(item) {
        this.item = item;
        this.item = item;
    }
    /**
     * 아이템의 부가 설명을 바꿉니다.
     * @param lore
     * @returns 바뀐 아이템
     */
    setLore(lore) {
        let loreItem = this.item;
        loreItem.setLore(lore);
        return loreItem;
    }
    /**
     * 아이템의 이름을 바꿉니다.
     * @param nameTag
     * @returns 바뀐 아이템
     */
    setNameTag(nameTag) {
        let nameItem = this.item;
        nameItem.nameTag = nameTag;
        return nameItem;
    }
    /**
     * 아이템의 내구도를 바꿉니다.
     * @param durability
     * @returns 바뀐 아이템
     */
    setDurability(durability) {
        let item = this.item;
        const dura = item.getComponent('minecraft:durability');
        dura.damage = durability;
        return item;
    }
    /**
     * 아이템의 잠금 모드를 바꿉니다.
     * @param lockmode 바꿀 아이템 모드
     * @returns 바뀐 아이템
     */
    setLockMode(lockMode) {
        let item = this.item;
        item.lockMode = lockMode;
        return item;
    }
}
