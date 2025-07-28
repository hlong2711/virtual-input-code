import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SelectFile')
export class SelectFile extends Component {
    @property(Label)
    selectFileLabel: Label = null;

    start() {
        this.selectFileLabel.node.active = false;
    }


    onSelectFileClick() {
        const element = document.createElement('input');
        element.type = 'file';
        element.accept = 'image/png, image/jpg, image/jpeg';
        element.style.display = 'none';

        element.addEventListener('change', (e) => {
            const file = element.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                // const fileResult = e.target.result;

                this.selectFileLabel.node.active = true;
                this.selectFileLabel.string = `File: ${file.name}, ${file.size} bytes`;

                element.remove();
            }

            reader.readAsDataURL(file);

        });

        document.body.append(element);
        element.click();
    }


}

