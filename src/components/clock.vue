<template>
<div>
    <section class="section-clock">
        <div class="clock-text">{{current.time}}</div>
        <div class="task-status">{{current.statusText}}</div>
        <div class="task-name"><span>{{set.name}}</span></div>
        <div class="task-btn">
            <i class="icon-start" title="开始" @click="startWalk">▶</i>
            <!-- <i class="icon-sleep" title="暂停" @click="startPause">||</i> -->
            <i class="icon-stop" title="停止" @click="stopWalk">■</i>
            <i class="icon-info" title="设置" @click="openSetDialog">❁</i>
            <i class="icon-log" title="查看记录" @click="openLogDialog">▤</i>
        </div>

        <!-- <div class="use-tip">
        <h3>番茄工作方法</h3>
        <ul>
            <li>输入一个任务，将番茄时间设为25分钟点【开始工作】</li>
            <li>专注工作，中途不允许做任何与该任务无关的事，直到番茄时钟响起</li>
            <li>然后短暂休息一下，5分钟左右</li>
        </ul>
    </div> -->
    </section>

    <!--设置面板-->
    <section class="section-task" v-bind:style="'display:'+set.openDisplay">
        <h3>工作名称</h3>
        <input id="taskName" type="text" v-model="set.name" />
        <h3>工作时长</h3>
        <input id="workTime" type="text" v-model="set.workMinute" />
        <label for="isLoopCheckbox">循环</label>
        <input id="isLoopCheckbox" type="checkbox" v-model="set.loop" />
        <h3 style="text-align:right;"><input type="button" value="确定" @click="closeSetDialog"/></h3>
    </section>

    <section class="section-log" v-bind:style="'display:'+set.openLog">
        <h3>日志</h3>
        <ul class="log-list">
            <li v-for="item of log">
                <span class="log-time">[{{ item.startTimeText }} - {{ item.stopTimeText }}]</span>
                <span class="log-action"> {{item.statusText}} </span> {{item.job}}
            </li>
        </ul>
    </section>
</div>
</template>

<script>
import Vue from 'vue'
import wuStopwatch from './wuStopwatch.js'
import dateFormat from './dateFormat.js'

let workMinute = 25;
const statusEnum = {
    '0': '打瞌睡Zzz',
    '1': '工作中...',
    '-1': '已停止',
    '2': '已暂停',
    '3': '已结束'
}

export default {
    name: 'clock',
    data() {
        var data = {
            current: {
                time: "0:" + workMinute + ":00",
                statusText: statusEnum[0]
            },
            log: [],
            walkCallback: (status, data) => {
                this.current.time = data.watchText
            },
            logCallback: (data) => {
                console.log("logCallback...");
                //status（0:waiting，1:active,-1:stop,2:pause,3.end）
                data.startTimeText = data != -1 ? dateFormat(new Date(data.startTime), "HH:mm:ss") : "";
                data.stopTimeText = ([-1, 2, 3].indexOf(data.status) > -1) ? (data.stopTime && dateFormat(new Date(data.stopTime), "HH:mm:ss") || "--") : "--";
                data.statusText = statusEnum[data.status];
                data.job = this.set.name;
                this.log.unshift(data);

                this.current.statusText = data.statusText
                if (data.status == 3) {
                    alert("恭喜你完成一个番茄周期")
                }
            },
            set: {
                openDisplay: "none",
                openLog: "none",
                name: "空空如也,开始搬砖吧?",
                workMinute: workMinute,
                loop: "1"
            }
        }
        data.watch = new wuStopwatch(workMinute, {
            walkCallback: data.walkCallback,
            logCallback: data.logCallback
        })
        return data
    },
    methods: {
        //开始计时
        startWalk: function(e) {
            this.watch.start();
        },
        //停止计时
        stopWalk: function(e) {
            this.current.time = "☺";
            this.watch.stop();
        },
        //暂停
        startPause: function(e) {
            this.watch.pause();
        },
        //切换设置面板
        openSetDialog: function(e) {
            this.set.openDisplay = ((this.set.openDisplay == "block") ? "none" : "block")
        },
        //关闭设置面板
        closeSetDialog: function(e) {
            this.set.openDisplay = "none";
        },
        openLogDialog: function(e) {
            this.set.openLog = ((this.set.openLog == "block") ? "none" : "block")
        }
    }
}
</script>

<style>
@media only screen and (max-width: 376px) {
    html {
        transform: scale(1.8);
        transform-origin: top;
    }
}

input[type='button']{
  cursor:pointer;
}

.section-clock {
    box-sizing: border-box;
    position: relative;
    margin: 20px auto;
    width: 450px;
    height: 380px;
    padding: 73px 35px;
    border-radius: 50%;
    background: radial-gradient(circle at 100px 100px, #f5e0e0, #ef9e9e);
    /*background-image:url(../tomato.jpg);*/
}

.section-clock .clock-text {
    text-align: center;
    font-size: 107px;
    color: #cc6767;
}

.section-clock .task-name {
    margin: 10px;
    padding: 10px;
    text-align: center;
    font-size: 30px;
    color: #3eb931;
}

.section-clock .task-status {
    font-size: 16px;
    text-align: center;
    width: 140px;
    height: 50px;
    line-height: 50px;
    margin: 5px auto;
    border-radius: 50%;
    background: #fdf948;
}

.task-btn {
    position: absolute;
    top: 386px;
    left:16%;
    user-select:none;
}

.task-btn i {
    display: inline-block;
    margin: 10px 24px 10px 5px;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #fff;
    background: #8eb572;
    border-radius: 50%;
    font-style: normal;
    font-size: 20px;
    cursor: pointer;
}

.task-btn i:hover {
    background: #79d637;
}

.task-btn i:active {
    background: #09d637;
}

.task-btn .icon-sleep,
.task-btn .icon-log,
.task-btn .icon-info {
    font-size: 26px;
}

.task-btn .icon-start {
    margin-left: 0;
}

.task-btn .icon-stop {
    margin-left: 0;
}

.task-btn .icon-sleep {
    margin-left: 0;
    font-size: 20px;
}

.task-btn .icon-info {
    margin-left: 0;
}

.task-btn .icon-log {
    margin-left: 0;
}

.use-tip {
    display: none;
}

.section-task {
    display: none;
    position: fixed;
    top: 10%;
    height: 80%;
    left: 50%;
    transform: translateX(-50%);
    width: 500px;
    background: rgba(0, 0, 0, 0.7);
    border: 1px solid #ddd;
    border-radius: 5px;
    z-index: 1;
    color: #fff;
    padding: 20px 50px;
}

.section-task input {
    border-radius: 5px;
    padding: 3px 5px;
    font-size: 23px;
    line-height: 41px;
    width: 100%;
}

.section-task input[type='checkbox'] {
    width: 30px;
    height: 22px;
    margin-top: 10px;
}

.section-log {
    display: none;
    position: fixed;
    top: 58%;
    height: 23%;
    left: 50%;
    transform: translateX(-50%);
    width: 500px;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid #ddd;
    border-radius: 5px;
    z-index: 1;
    color: #fff;
    padding: 20px 50px;
}

.log-list {
    height: 78%;
    overflow-y: auto;
}

.log-time {
    display: inline-block;
    min-width: 168px;
    padding: 3px 5px;
}

.log-action {
    padding: 3px 0px;
    color: red;
}
</style>
