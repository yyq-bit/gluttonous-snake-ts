// 定义蛇的类
class Snake {
  snakeEle: HTMLElement;
  snakeHead: HTMLElement; // 蛇头
  snakeBodies: HTMLCollection; // 蛇的身体(包括蛇头)
  constructor() {
    this.snakeHead = document.querySelector("#snake > div") as HTMLElement;
    this.snakeEle = document.getElementById("snake")!;
    this.snakeBodies = document
      .getElementById("snake")!
      .getElementsByTagName("div");
  }
  // 获取蛇头的坐标位置
  get X() {
    return this.snakeHead.offsetLeft;
  }
  get Y() {
    return this.snakeHead.offsetTop;
  }
  // 设置蛇头的坐标
  set X(value: number) {
    if (this.X === value) {
      return;
    }
    if (value < 0 || value > 290) {
      // 蛇撞墙
      throw new Error("蛇撞墙了, 游戏结束！");
    }
    // 蛇在向左移动时,不能向右移动,反之亦然
    // 蛇头的坐标和第二节身体坐标相同,则表示掉头
    if (
      this.snakeBodies[1] &&
      (this.snakeBodies[1] as HTMLElement).offsetLeft === value
    ) {
      // console.log('水平方向掉头了')
      // 如果掉头了,继续向反方向移动
      if (value > this.X) {
        // 新位置大于旧位置,表示蛇在向右走,此时发生掉头,应该使蛇向左走
        value = this.X - 10;
      } else {
        value = this.X + 10;
      }
    }
    // 移动蛇的身体
    this.moveBody();
    this.snakeHead.style.left = value + "px";
    this.checkBite();
  }
  set Y(value: number) {
    if (this.Y === value) {
      return;
    }
    if (value < 0 || value > 290) {
      // 蛇撞墙
      throw new Error("蛇撞墙了, 游戏结束！");
    }
    // 蛇在向上移动时,不能向下移动,反之亦然
    if (
      this.snakeBodies[1] &&
      (this.snakeBodies[1] as HTMLElement).offsetTop === value
    ) {
      // console.log('竖直方向掉头了')
      // 如果掉头了,继续向反方向移动
      if (value > this.Y) {
        // 新位置大于旧位置,表示蛇在向下走,此时发生掉头,应该使蛇向上走
        value = this.Y - 10;
      } else {
        value = this.Y + 10;
      }
    }
    // 移动蛇的身体
    this.moveBody();
    this.snakeHead.style.top = value + "px";
    this.checkBite();
  }
  // 蛇增加身体
  addSnakeBody() {
    this.snakeEle.insertAdjacentHTML("beforeend", "<div></div>");
  }
  // 蛇身体移动
  moveBody() {
    // 后边的身体要走到前边身体的上一次位置
    // 从后往前改,先改蛇尾部的位置
    for (let i = this.snakeBodies.length - 1; i > 0; i--) {
      // 获取前边身体的位置
      let X = (this.snakeBodies[i - 1] as HTMLElement).offsetLeft;
      let Y = (this.snakeBodies[i - 1] as HTMLElement).offsetTop;
      // 将这个值设置到当前身体
      (this.snakeBodies[i] as HTMLElement).style.left = X + "px";
      (this.snakeBodies[i] as HTMLElement).style.top = Y + "px";
    }
  }
  // 检查蛇有没有吃到自己
  checkBite() {
    // 检查蛇头的位置是否和蛇身体的每一个部分的坐标相同
    for (let i = 1; i < this.snakeBodies.length; i++) {
      if (this.X === (this.snakeBodies[i] as HTMLElement).offsetLeft && this.Y === (this.snakeBodies[i] as HTMLElement).offsetTop) {
        // 蛇咬到自己
        throw new Error("撞到自己了,游戏结束了！");
      }
    }
  }
}
export default Snake;
