import { _decorator, Component, EditBox, Node, sys } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('VCodeField')
export class VCodeField extends Component {
    @property(EditBox)
    editBox: EditBox = null; // fake edit box
    
    @property([EditBox])
    v_codes: EditBox[] = []; // array of edit boxes
    private _isEditing: boolean;
    private enteredCode: string[] = [];

    public onValueChanged: Function = null;


    protected onLoad(): void {
        this.editBox.node.on('editing-did-began', this.onStartEditing, this);
        this.editBox.node.on('editing-did-ended', this.onEndEditing, this);

        if (!sys.isMobile && !sys.isBrowser) {
            window.addEventListener('resize', this.resizeEvent.bind(this));
        }

        ////////////////////////////////////////
        this.reset();

        this.editBox.string = '';
        this.editBox.node.on('text-changed', this.onFakeEditTextBoxChanged, this);

        // test schedule
        this.scheduleOnce(this.runScheduleOnce, 1.0);
    }

    runScheduleOnce() {
        console.log("Schedule once executed");
    }

    start() {

    }

    reset() {
        this.resetAllEditBoxes();
    }
    resetAllEditBoxes() {
        for (let index = 0; index < this.v_codes.length; index++) {
            const box = this.v_codes[index];
            box.string = '';
            this.enteredCode[index] = ''
        }

        this.onValueChanged?.();
    }

    onTextBoxChanged(text: string, editbox: EditBox, customEventData: any) {
        console.log("Text box content changed: customEventData", customEventData);
    }

    onFakeEditTextBoxChanged(editbox: EditBox) {
        console.log("Fake edit box changed: ", editbox.string);
        let text: string = editbox.string;
        const pinNumbers = this.v_codes.length;
        // get latest characters only in case of copy paste
        text = text.substring(text.length >= pinNumbers ? text.length - pinNumbers : 0);
        for (let i = 0; i < pinNumbers; i++) {
            const char = text.length > i ? text.charAt(i) : '';
            this.enteredCode[i] = char;
            this.v_codes[i].string = char;
        }
        if (text.length >= pinNumbers) {
            this.editBox.string = text;
            this.editBox.blur();
        }
        this.onValueChanged?.();
        if (this.isCodeComplete()) {
            this.hideInvalidEffects();
        }
    }

    onClickEditBox() {
        console.log("EditBox clicked");
        this.editBox.focus();
    }

    onStartEditing() {
        this._isEditing = true;
    }

    onEndEditing() {
        this._isEditing = false;
    }

    resizeEvent() {
        console.log("Resize event triggered");
        // Handle resize logic here if needed
    }

    isCodeComplete(): boolean {
        return this.enteredCode.every(code => code.length > 0);
    }

    hideInvalidEffects() {

    }
}
