import { _decorator, Component, ImageAsset, Label, Node, Size, Sprite, SpriteFrame, Texture2D } from 'cc';
import { electron } from './lib/electron';
const { ccclass, property } = _decorator;

@ccclass('SelectFile')
export class SelectFile extends Component {
    @property(Label)
    selectFileLabel: Label = null;

    @property(Node)
    avatarNode: Node = null;

    start() {
        this.selectFileLabel.node.active = false;

        this.node.on('image-selected', this.onImageSelected.bind(this), this);
    }


    onSelectFileClick() {
        electron.log('Select file button clicked @@@@');

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

                this.node.emit('image-selected', {
                    fileName: file.name,
                    fileSize: file.size,
                    fileType: file.type,
                    fileData: e.target.result
                });
            }

            reader.readAsDataURL(file);

        });

        document.body.append(element);
        element.click();
    }

    onImageSelected(args: {
        fileName: string,
        fileSize: string,
        fileType: string,
        fileData: string,
    }) {
        console.log('Image selected:', args);
        const data = args.fileData;

        const image = new Image();
        image.src = data;

        image.onload = () => {
            // Resize the image if necessary
            console.log('Image size loaded:', image.width, image.height);

            if (this.avatarNode) {

                const asset = new ImageAsset(image);
                const texture = new Texture2D();
                texture.image = asset;

                const spriteFrame = new SpriteFrame();
                spriteFrame.texture = texture;

                this.avatarNode.getComponent(Sprite).spriteFrame = spriteFrame;
            }
        };

        image.onerror = (err) => {
            console.error('Error loading image:', err);
        };
    }

}
