import { _decorator, Component, Node, director, Label, Prefab, instantiate, Vec3, tween, Quat } from 'cc';
import { AudioController } from './AudioController';
import { Card } from './gameObject/Card';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
    @property(Label)
    levelLabel:Label;

    @property(Label)
    scoreLabel:Label;

    //card prefab
    @property(Prefab)
    cardPrefab:Prefab;

    @property(Node)
    cardGroup:Node;

    NUM_OF_COL = 5;
    NUM_OF_ROW = 2;
    CARD_WITH =110;
    CARD_HEIGHT = 130;
    CARD_TYPE_LIST = [1,2,3,4,5,1,2,3,4,5];
    //test
    //
    oldCard:Card | null = null;
    //
    @property(Node)
    myCar:Node | null = null;

    //
    cardList:Node[] = [];
    //
    start() {
        //set level = 1, score = 0;
        // let card = instantiate(this.cardPrefab);
        // this.cardGroup.addChild(card);\
        let count = 0;
        for(let i = 0; i < this.NUM_OF_COL; i++){
            for(let j = 0; j < this.NUM_OF_ROW;j++){
                let card = instantiate(this.cardPrefab);
                //
                let cardType = this.CARD_TYPE_LIST[count];
                count++;
                card.getComponent(Card).setUp(cardType,(card:Card)=>{
                    this.onTouchCard(card);
                })
                //
                let x = -250+i*(this.CARD_WITH+3)
                let y = 0+j*(this.CARD_HEIGHT+3);
                card.setPosition(new Vec3(x,y,0));
                this.cardGroup.addChild(card);
                this.cardList.push(card);
            }
        }


    }
    private testTween() {
        //tween(this.myCar).to(1,{position:new Vec3(100,100,0)}).start();
         //tween(this.myCar).by(1,{position:new Vec3(100,0,0)}).start();
         //tween(this.myCar).to(1,{position:new Vec3(100,100,0)}).repeat(10).start();
                //   tween(this.myCar).by(1,{position:new Vec3(100,0,0)}).repeat(2).start();
                //     tween(this.myCar).by(1,{position:new Vec3(100,0,0)}).repeatForever().start();
                    //   tween(this.myCar).sequence(
                    //         tween(this.myCar).to(1,{rotation: new Quat(0,0,1)}),
                    //                   tween(this.myCar).delay(1.0),
                    //            tween(this.myCar).to(1,{rotation: new Quat(0,0,-1)}),
                    //            tween(this.myCar).call(()=>{
                    //             console.log('ket thuc 1 chu ky');
                    //            })
                     
                    //   ).repeat(5).start();
                    // tween(this.myCar).parallel(
                    //        tween(this.myCar).to(1,{rotation: new Quat(0,0,1)}),
                    //        tween(this.myCar).to(1,{position:new Vec3(200,300,0)})
                    // ).start();
    }
    isPaused = false;
    onTouchCard(card:Card){
        if(this.isPaused) return;
        //First time
        //
        if(this.oldCard==card){
            //close card
            card.closeCard();
            this.oldCard=null;
        }else{
             //open card
             card.upCard(()=>{
                //
                console.log("old card",this.oldCard);
                if(this.oldCard==null){
                   this.oldCard = card;
            
               }else{
                   //giong nhau
                   if(this.oldCard.cardType==card.cardType){
                       //remove
                        AudioController.instance.playSound(AudioController.CORRECT_SOUND);
                       this.oldCard.node.destroy();
                       card.node.destroy();
                       this.oldCard = null;
                   }else{
                    //khach nhau
                    AudioController.instance.playSound(AudioController.WRONG_SOUND);
                       this.oldCard.closeCard(()=>{
                        this.oldCard=null;
                       });
                       card.closeCard();

                   }
               }
                //
             });
             //
           
        }
       
    }
    private removeCardFromList(card:Node){
        for(let i=0;i<this.cardList.length;i++){
            
        }
    }
    //
    onExitGame(){
        director.loadScene('menu');
    }

    //
    update(deltaTime: number) {
        
    }
}


