import { _decorator, Component, Node, game, director, AudioClip, AudioSource } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AudioController')
export class AudioController extends Component {
    static CLICK_SOUND = 0;
    static CORRECT_SOUND =1;
    static  WRONG_SOUND = 2;
    public static instance:AudioController;
    @property(AudioClip)
    audioList:AudioClip[]=[];

    @property(AudioSource)
    audioSource:AudioSource;
    audioVolume = 1;
    start(){
        if(AudioController.instance==null){
            AudioController.instance = this;
            //gan node hien tai vao root node
            director.addPersistRootNode(this.node);
        }else{
            AudioController.instance = null;
        }
        
    }
    playSound(soundIndex:number){
        this.audioSource.playOneShot(this.audioList[soundIndex],this.audioVolume);
    }
    setSound(audioVolume){
        this.audioVolume = audioVolume;
        //save 
    }


}


