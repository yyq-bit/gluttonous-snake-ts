// 定义食物类Food
class Food {
  // 定义一个属性表示食物所对应的元素
  element: HTMLElement;
  constructor() {
    // ! 表示这个值不会为空
    this.element = document.getElementById("food")!;
  }
  // 获取食物X轴坐标
  get X() {
    return this.element.offsetLeft;
  }
  // 获取食物Y轴坐标
  get Y() {
    return this.element.offsetTop;
  }
  // 随机改变食物位置
  change() {
    // 食物坐标范围,left:[0,290],top:[0,290],且能被10整除(保证能被蛇吃到)
    let top = Math.round(Math.random() * 29) * 10;
    let left = Math.round(Math.random() * 29) * 10;
    this.element.style.left = left + "px";
    this.element.style.top = top + "px";
  }
}
export default Food;
