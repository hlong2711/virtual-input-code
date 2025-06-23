import { _decorator, Component, EditBox, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('VCodeField')
export class VCodeField extends Component {
    @property(EditBox)
    editBox: EditBox = null; // fake edit box
    
    @property([EditBox])
    v_codes: EditBox[] = []; // array of edit boxes

    start() {

    }

    onTextBoxChanged(text: string, editbox: EditBox, customEventData: any) {
        console.log("Text box content changed: customEventData", customEventData);
    }

    onClickEditBox() {
        console.log("EditBox clicked");
        this.editBox.focus();
    }
}
