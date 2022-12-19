import { _decorator, Component, Node, director } from 'cc';
import { AudioController } from './AudioController';
const { ccclass, property } = _decorator;

@ccclass('MenuController')
export class MenuController extends Component {
    start() {
        console.log('start menu');
    }

    update(deltaTime: number) {
        
    }

    onClickStartButton(event,args){
        //chuyen sang scene game
        AudioController.instance.playSound(AudioController.CLICK_SOUND);
        console.log('Change to scene game',args);
        director.loadScene('game');
    }
}


