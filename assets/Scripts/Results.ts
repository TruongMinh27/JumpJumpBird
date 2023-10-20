import { _decorator, Component, Label, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Results")
export class Results extends Component {
  @property({
    type: Label,
  })
  public scoreLabel: Label;
  @property({
    type: Label,
  })
  public hightScore: Label;
  @property({
    type: Label,
  })
  public resultsEnd: Label;

  maxScore: number = 0;
  currentScore: number;

  updateScore(score: number) {
    this.currentScore = score;
    this.scoreLabel.string = " " + this.currentScore;
  }
  addScore() {
    this.updateScore(this.currentScore + 1);
  }

  resetScore() {
    this.updateScore(0);
    this.hideResults();
  }
  showResults() {
    this.maxScore = Math.max(this.maxScore, this.currentScore);
    this.hightScore.string = "Hight score :" + this.maxScore;
    this.resultsEnd.node.active = true;
    this.hightScore.node.active = true;
  }
  hideResults() {
    this.resultsEnd.node.active = false;
    this.hightScore.node.active = false;
  }
}
