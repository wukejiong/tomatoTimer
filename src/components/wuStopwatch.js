import wuTimer from './wuTimer.js'

/**
 * 倒计时秒表
 */
class wuStopwatch {
    /**
     * @param minute 倒计时分钟数
     */
    constructor(maxMinute = 25, options) {
        this.maxMinute = maxMinute;
        this.options = options;
        this._init();
    }
    /**
     * 初始化
     */
    _init () {
        let walkCallback = (status, data)=>{
          //判断是否已结束
          if (this.total < data.count * this.timer.getInterval()) {
              this.log(3);
              this.timer.stop();
              return;
          }
          data.watchText=this.getText();
          this.options.walkCallback(status, data);
        }
        this.timer = new wuTimer({walkCallback});
        this.total = this.maxMinute * 60 * 1000;
    }

    /**
     * 日志输出
     */
    log (status) {
        //（0:waiting，1:active,-1:stop,2:pause,3.end）
        status = status || this.timer.getStatus();
        this.options.logCallback({
            status: status,
            startTime: this.startTime,
            stopTime: this.stopTime,
            currentTime: +new Date()
        })
    }

    /**
     * 开始
     */
    start () {
        console.log("watch started.");
        //暂停状态下不还原值
        if(this.timer.getStatus()!=2){
          this.startTime = +new Date();
          this.planStopTime = this.startTime+this.total;
        }
        this.timer.start();
        this.log();
    }

    /**
     * 停止
     */
    stop () {
        this.stopTime = +new Date();
        this.timer.stop();
        this.log();
    }

    /**
     * 暂停
     */
    pause () {
        this.timer.pause();
        this.log();
    }

    /**
     * 获取当前时间信息
     */
    getText() {
        let now = +new Date();
        let remainTime = Math.round((this.planStopTime - now) / 1000);
        let nH = Math.floor(remainTime / (60 * 60)) % 24;
        let nM = Math.floor(remainTime / (60)) % 60;
        let nS = Math.floor(remainTime) % 60;
        let clockText = nH + ":" + nM + ":" + nS
        return clockText
    }
}

export default wuStopwatch
