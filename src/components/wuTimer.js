/**
 * 计时器
 */
class wuTimer {
    /**
     * 构造函数
     */
    constructor(options) {
        this.options = options || {}
        this._init()
    }

    /**
     * 初始化
     */
    _init () {
        if (this.inited) {
            return;
        }

        this.data = {
            //状态定义（0:waiting，1:active,-1:stop,2:pause）
            status: {
                waiting: 0,
                active: 1,
                stop: -1,
                pause: 2
            },
            //记录每一次的状态
            timeStatus: []
        }
        //标记是否初始化
        this.inited = false
        //当前次数
        this.count = 0
        //标记状态
        this.status = 0

        //秒表核心函数
        this.walk = () => {
            this.data.timeStatus.push(this.status);
            let data = null;
            switch (this.status) {
                case -1: //stop
                    console.log("timer stoped")
                    data = this.getCount();
                    return;
                    break;
                case 0: //waiting
                    data = {
                        count: this.count
                    };
                    break;
                case 1: //walk
                    this.count++;
                    console.log("timer is walking.." + this.count)
                    data = this.getCount();
                    break;
                case 2: //pause
                    console.log("timer pause")
                    data = {
                        count: this.count
                    };
                    break;
            }
            this.options.walkCallback && this.options.walkCallback(this.status, data);
            if (this.status == -1 || this.status==2) {
                return;
            }
            setTimeout(() => {
                this.walk()
            }, this.getInterval());
        }
        //标记已初始化
        this.inited = true
    }

    /**
     * 等待
     */
    waiting () {
        this.status = 0
        this.walk();
    }
    /**
     * 开始
     */
    start () {
        console.log("timer starting...");
        console.log(this.status);
        //改变状态 （0:waiting，1:active,-1:stop,2:pause）
        if(this.status==2){
          this.status = 1
          this.walk();
        }else if(　this.status==0 ||　this.status==-1){
          this.count = 0
          this.status = 1
          this.walk();
        }
    }

    /**
     * 暂停
     */
    pause () {
        //改变状态
        this.status = 2
    }

    /**
     * 停止
     */
    stop () {
        //改变状态
        this.status = -1
    }

    /**
     * 获取统计数据
     */
    getCount () {
        return {
            timeStatus: this.timeStatus,
            count: this.count
        }
    }

    /**
     * 获取状态
     */
    getStatus () {
        return this.status
    }

    /**
     * 获取定时器频率
     */
    getInterval () {
        return this.options.interval || 1000
    }
}

export default wuTimer
