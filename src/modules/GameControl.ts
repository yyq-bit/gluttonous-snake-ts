import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";

class GameControl {
  snake: Snake;
  food: Food;
  scorePanel: ScorePanel;
  direction: string = ""; // 蛇的移动方向(也就是用户按下的按键)
  isLive = true; // 蛇是否活着(游戏是否在进行当中)
  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel();
    this.init();
  }
  // 游戏初始化开始
  init() {
    // 蛇跟随键盘按键按下移动
    document.addEventListener("keydown", this.keydownHandler.bind(this));
    this.run();
  }
  // 键盘按下的回调函数
  keydownHandler(event: KeyboardEvent) {
    // console.log(event.key)
    // Chrome: ArrowUp,ArrowDown,ArrowLeft,ArrowRight
    // IE: Up,Down,Left,Right
    // 检查event.key的值是否合法
    this.direction = event.key;
  }
  // 检查蛇是否吃到了食物
  checkEat(X: number, Y: number) {
    // 如果蛇的新坐标和食物的坐标相同,表示吃到食物
    if (X === this.food.X && Y === this.food.Y) {
      // 吃到食物后,食物改变位置
      this.food.change();
      // 分数增加
      this.scorePanel.addScore();
      // 蛇增加身体
      this.snake.addSnakeBody();
    }
  }
  // 控制蛇的移动
  run() {
    // 根据方向来使蛇的位置改变
    // 向上 top减少
    // 向下 top增加
    // 向左 left减少
    // 向右 left增加

    // 获取蛇此时的坐标
    let X = this.snake.X;
    let Y = this.snake.Y;
    switch (this.direction) {
      case "ArrowUp":
      case "Up":
        Y -= 10;
        break;
      case "ArrowDown":
      case "Down":
        Y += 10;
        break;
      case "ArrowLeft":
      case "Left":
        X -= 10;
        break;
      case "ArrowRight":
      case "Right":
        X += 10;
        break;
    }
    // 检查蛇是否吃到了食物
    this.checkEat(X, Y);
    // 检查蛇是否撞墙
    try {
      this.snake.X = X;
      this.snake.Y = Y;
    } catch (error) {
      // 游戏结束
      this.isLive = false;
      // 弹出提示信息
      alert(error);
    }

    // 开启定时调用
    // 移动的速度根据level的等级变化
    this.isLive &&
      setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
  }
}
export default GameControl;
