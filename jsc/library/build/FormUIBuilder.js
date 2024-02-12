import { system, world } from "@minecraft/server";
import { worldDB } from "./databaseBuilder";
;
;
;
// Form Variable
const formDB = new worldDB("form");
class FormData {
    constructor() {
        /** Form List */
        this.forms = [];
        system.runInterval(() => {
            world.getAllPlayers().forEach(pl => {
                //get each variable
                const FormNum = formDB.get(pl);
                const FormPromise = this.forms[FormNum];
                //form show
                if (FormNum !== -1)
                    FormPromise.form.show(pl)
                        .then((r) => FormPromise.then(r));
                //form reset
                formDB.set(pl, -1);
            });
        });
    }
    /**
     * FormData에 Form을 추가합니다.
     * @param FormType 추가할 Form의 타입
     * @param Form 추가할 Form
     * @param then Form을 열었을 때 플레이어의 반응에 이어지는 동작(action)
     */
    addForm(FormType, Form, then) {
        this.forms.push({
            type: FormType,
            form: Form,
            then: then
        });
    }
    /**
     * 지정된 플레이어에게 Form UI를 보여줍니다.
     * @param form formUI
     * @param player 플레이어
     */
    show(form, player) {
        const formNum = this.forms.findIndex(v => v.form == form);
        formDB.set(player, formNum);
    }
}
/**
 * Form UI 핸들링
 */
export const FormUI = new FormData();
