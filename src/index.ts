// 引入样式
// import './style/index.less';
require("!style-loader!css-loader!less-loader!./style/index.less");
import GameControl from "./modules/GameControl";
new GameControl();
