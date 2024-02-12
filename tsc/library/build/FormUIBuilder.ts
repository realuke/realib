import { Player, system, world } from "@minecraft/server"
import { ActionFormData, ActionFormResponse, MessageFormData, MessageFormResponse, ModalFormData, ModalFormResponse } from "@minecraft/server-ui"
import { worldDB } from "./databaseBuilder"


interface FormType {
    "ActionFormData":ActionFormData,
    "ModalFormData": ModalFormData,
    "MessageFormData": MessageFormData
};

interface FormResponseType {
    "ActionFormData": ActionFormResponse,
    "ModalFormData": ModalFormResponse,
    "MessageFormData": MessageFormResponse
};

interface FormPromise {
    type: keyof FormType,
    form: ActionFormData | ModalFormData | MessageFormData,
    then?: (r:ActionFormResponse | ModalFormResponse | MessageFormResponse) => any
};

// Form Variable
const formDB = new worldDB<number>("form");

class FormData {

    /** Form List */
    private forms: FormPromise[] = [];

    constructor() {
        system.runInterval(() => {
            world.getAllPlayers().forEach(pl=>{

                //get each variable
                const FormNum = formDB.get(pl) as number;
                const FormPromise = this.forms[FormNum];

                //form show
                if(FormNum!==-1) FormPromise.form.show(pl)
                .then((r) => FormPromise.then(r));
                
                //form reset
                formDB.set(pl, -1);
            })
        })
    }

    /**
     * FormData에 Form을 추가합니다.
     * @param FormType 추가할 Form의 타입
     * @param Form 추가할 Form
     * @param then Form을 열었을 때 플레이어의 반응에 이어지는 동작(action)
     */
    addForm<T extends keyof FormType>(FormType: T, Form:FormType[T], then?:(r:FormResponseType[T]) => void) {
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
    show(form: ActionFormData | ModalFormData | MessageFormData , player: Player) {
        const formNum = this.forms.findIndex(v=>v.form==form);
        formDB.set(player, formNum)
    }
}
/**
 * Form UI 핸들링
 */
export const FormUI = new FormData();