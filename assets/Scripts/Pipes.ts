import {
  _decorator,
  Component,
  find,
  Node,
  screen,
  UITransform,
  Vec3,
} from "cc";
const { ccclass, property } = _decorator;
const random = (min, max) => {
  return Math.random() * (max - min) + min;
};
@ccclass("Pipes")
export class Pipes extends Component {
  @property({
    type: Node,
    tooltip: "this is up pipe",
  })
  public topPipe: Node;
  @property({
    type: Node,
    tooltip: "this is down pipe",
  })
  public bottomPipe: Node;

  public startLocationUp: Vec3 = new Vec3(0, 0, 0);
  public startLocationDown: Vec3 = new Vec3(0, 0, 0);
  public sence = screen.windowSize;

  public game; //game speed for Game Ctr
  public pipeSpeed: number; // final speed for pipe
  public tempSpeed: number; // temporary speed for pipe
  isPass: boolean;
  onLoad() {
    this.game = find("GameCtrl").getComponent("GameCtrl");
    this.pipeSpeed = this.game.pipeSpeed;
    this.initPos();
    this.isPass = false;
  }

  initPos() {
    this.startLocationUp.x =
      this.topPipe.getComponent(UITransform).width + this.sence.width;
    this.startLocationDown.x =
      this.topPipe.getComponent(UITransform).width + this.sence.width;

    let gap = random(90, 100);
    let topHeight = random(0, 450);

    this.startLocationUp.y = topHeight;
    this.startLocationDown.y = topHeight - gap * 10;

    this.topPipe.setPosition(this.startLocationUp);
    this.bottomPipe.setPosition(this.startLocationDown);
  }

  update(deltatime) {
    this.tempSpeed = this.pipeSpeed * deltatime;

    this.startLocationUp = this.topPipe.position;
    this.startLocationDown = this.bottomPipe.position;

    this.startLocationUp.x -= this.tempSpeed;
    this.startLocationDown.x -= this.tempSpeed;

    this.topPipe.setPosition(this.startLocationUp);
    this.bottomPipe.setPosition(this.startLocationDown);

    if (this.isPass === false && this.topPipe.position.x <= 0) {
      this.isPass = true;
      this.game.passPipe();
    }

    if (this.topPipe.position.x < 0 - this.sence.width) {
      this.game.createPipe();
      this.destroy();
    }
  }
}
