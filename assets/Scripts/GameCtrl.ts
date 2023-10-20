import {
  _decorator,
  CCInteger,
  Collider2D,
  Component,
  Contact2DType,
  director,
  EventKeyboard,
  Input,
  input,
  IPhysics2DContact,
  KeyCode,
  Node,
} from "cc";
const { ccclass, property } = _decorator;
import { Ground } from "./Ground";
import { Results } from "./Results";
import { Bird } from "./Bird";
import { PipePool } from "./PipePool";
import { BirdAudio } from "./BirdAudio";

@ccclass("GameCtrl")
export class GameCtrl extends Component {
  @property({
    type: Ground,
    tooltip: "this is a ground",
  })
  public ground: Ground;

  @property({
    type: Results,
    tooltip: "this is a results",
  })
  public results: Results;

  @property({
    type: PipePool,
  })
  public pipeQueue: PipePool;

  @property({
    type: Bird,
  })
  public bird: Bird;

  @property({
    type: BirdAudio,
  })
  public clip: BirdAudio;

  @property({
    type: CCInteger,
  })
  public speed: number = 200;

  @property({
    type: CCInteger,
    tooltip: "this is a speed of pipes",
  })
  public pipeSpeed: number = 200;

  public isOver: boolean;
  onLoad() {
    this.initListener();
    this.results.resetScore();
    this.isOver = true;
    director.pause();
  }

  initListener() {
    // input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    this.node.on(Input.EventType.TOUCH_START, () => {
      if (this.isOver === true) {
        this.resetGame();
        this.bird.resetBird();
        this.startGame();
      }
      if (this.isOver === false) {
        this.clip.onAudioQueue(0);
        this.bird.fly();
      }
    });
  }

  // onKeyDown(event: EventKeyboard) {
  //   switch (event.keyCode) {
  //     case KeyCode.KEY_A:
  //       this.gameOver();
  //       this.bird.resetBird();
  //       break;
  //     case KeyCode.KEY_P:
  //       this.results.addScore();
  //       break;
  //     case KeyCode.KEY_Q:
  //       this.resetGame();
  //       this.bird.resetBird();
  //   }
  // }
  startGame() {
    this.results.hideResults();
    director.resume();
  }
  gameOver() {
    this.results.showResults();
    this.isOver = true;
    director.pause();
  }
  resetGame() {
    this.results.resetScore();
    this.pipeQueue.resetPool();
    this.isOver = false;
    this.startGame();
  }

  passPipe() {
    this.clip.onAudioQueue(1);
    this.results.addScore();
  }

  createPipe() {
    this.pipeQueue.addPool();
  }

  contactGroundPipe() {
    let collider = this.bird.getComponent(Collider2D);
    if (collider) {
      collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }
  }

  onBeginContact(
    selfConfider: Collider2D,
    otherContact: Collider2D,
    contact: IPhysics2DContact | null
  ) {
    this.clip.onAudioQueue(2);

    this.bird.hitSomething = true;
  }

  birdStuck() {
    this.contactGroundPipe();
    if (this.bird.hitSomething == true) {
      this.clip.onAudioQueue(3);
      this.gameOver();
    }
  }

  update() {
    if (this.isOver == false) {
      this.birdStuck();
    }
  }
}
