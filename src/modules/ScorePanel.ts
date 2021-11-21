// 定义计分牌类
class ScorePanel {
  score = 0;
  level = 1;
  maxLevel: number;
  upScore: number; // 多少分时升级
  scoreEle: HTMLElement;
  levelEle: HTMLElement;
  constructor(maxLevel: number = 10, upScore: number = 10) {
    this.maxLevel = maxLevel;
    this.upScore = upScore;
    this.scoreEle = document.getElementById("score")!;
    this.levelEle = document.getElementById("level")!;
  }
  // 加分
  addScore() {
    this.score++;
    this.scoreEle.innerHTML = this.score + "";
    // 每10分升一级
    if (this.score % this.upScore === 0) {
      this.levelUp();
    }
  }
  // 升级
  levelUp() {
    if (this.level < this.maxLevel) {
      this.level++;
      this.levelEle.innerHTML = this.level + "";
    }
  }
}
export default ScorePanel;
