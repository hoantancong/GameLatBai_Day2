import { _decorator, Component, Node, SpriteFrame, Sprite, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Card')
export class Card extends Component {
    @property(SpriteFrame)
    cardSpriteFrames: SpriteFrame[] = [];
    @property(Sprite)
    cardSprite:Sprite;
    callback;
    cardType;
    CARD_FLIP_DOWN = 0;
    start() {
        this.node.on(Node.EventType.TOUCH_START,this.onTouchCard,this);
    }
    setUp(type,callback){
        this.callback = callback;
        this.cardType = type;
        //up card xuong
        this.cardSprite.spriteFrame = this.cardSpriteFrames[this.CARD_FLIP_DOWN];
    }
    onTouchCard(){
        this.callback(this);
    }
    upCard(finishCallback){
        //
        //tween
        tween(this.cardSprite.node).sequence(
            tween(this.cardSprite.node).to(0.2,{scale:new Vec3(0,1,0)}),
            tween(this.cardSprite.node).call(()=>{
                this.cardSprite.spriteFrame = this.cardSpriteFrames[this.cardType];
            }),
            tween(this.cardSprite.node).to(0.2,{scale:new Vec3(1,1,1)}),
            tween(this.cardSprite.node).delay(0.5),
            tween(this.cardSprite.node).call(()=>{
                finishCallback();
            })
        ).start();
    }
    closeCard(finishCallback=null){


        tween(this.cardSprite.node).sequence(
            tween(this.cardSprite.node).to(0.2,{scale:new Vec3(0,1,0)}),
            tween(this.cardSprite.node).call(()=>{
                this.cardSprite.spriteFrame = this.cardSpriteFrames[0];
            }),
            tween(this.cardSprite.node).to(0.2,{scale:new Vec3(1,1,1)}),
            tween(this.cardSprite.node).call(()=>{
                if(finishCallback)
                finishCallback();
            })
        ).start();
    }
    update(deltaTime: number) {
        
    }
}


