
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/Ui/UiLottery.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'eb4feKUwIFMw5th5wKoIN5i', 'UiLottery');
// script/Ui/UiLottery.ts

Object.defineProperty(exports, "__esModule", { value: true });
var UIPage_1 = require("./UIPage");
var CocosZ_1 = require("../Framework/CocosZ");
var Constant_1 = require("../Framework/Constant");
var Msg_1 = require("../Framework/Msg");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var rewardList = [-1, 100, 200, -2, 500, 999];
// let rewardList = [5, 2000, 300, 3, 500, 1000, 2000, 5];
var UiLottery = /** @class */ (function (_super) {
    __extends(UiLottery, _super);
    function UiLottery() {
        var _this = _super.call(this) || this;
        _this.btnFree = null;
        _this.btnVideo = null;
        _this.lottery = null;
        _this.btnBack = null;
        _this.scaleNode = null;
        _this.action = null;
        _this.isAction = null;
        _this.num = -1;
        /**
         *  max: 15,
            min: 2,
         */
        _this.maxSpeed = 12;
        /**
         * 减速前旋转时间
         *  max: 5,
            min: 1,
         */
        _this.duration = 1.5;
        /**
         * 加速度
         *  max: 0.2,
            min: 0.01,
         */
        _this.acc = 0.1;
        /**
         * 指定结束时的齿轮
         *  max: 17,
            min: 0,
         */
        _this.targetID = 0;
        /**
         * 旋转结束是否回弹
         *
         */
        _this.springback = false;
        _this.skinID = -1;
        _this.skinID2 = -1;
        _this.wheelState = 0;
        _this.curSpeed = 0;
        _this.spinTime = 0; //减速前旋转时间
        _this.gearNum = 6;
        _this.defaultAngle = 0; //修正默认角度
        _this.gearAngle = 360 / _this.gearNum; //每个齿轮的角度
        _this.finalAngle = 0; //最终结果指定的角度
        _this.effectFlag = 0; //用于音效播放
        _this.audioID = 0;
        _this.decAngle = 0;
        _this._init();
        return _this;
    }
    UiLottery.prototype._init = function () {
        var Game = CocosZ_1.cocosz.resMgr.getRes(Constant_1.PanelName.UiLottery, cc.Prefab);
        if (Game) {
            var node = cc.instantiate(Game);
            if (node) {
                this._page = node;
                cc.find("Canvas").addChild(node);
                node.active = false;
                node.position = cc.Vec2.ZERO;
                this._onLoad();
            }
        }
    };
    UiLottery.prototype._onLoad = function () {
        this.scaleNode = cc.find("Canvas/UiLottery/ScaleNode");
        this.btnFree = this.scaleNode.getChildByName("BtnFree");
        this.lottery = this.scaleNode.getChildByName("Lottery");
        this.btnVideo = this.scaleNode.getChildByName("BtnVideo");
        this.btnBack = this.scaleNode.getChildByName("BtnBack");
        this._Start();
    };
    UiLottery.prototype._Start = function () {
        var _this = this;
        this.btnFree.on(cc.Node.EventType.TOUCH_START, function () {
            _this.onReward();
        });
        this.btnVideo.on(cc.Node.EventType.TOUCH_START, function () {
            _this.onVideo();
        });
        this.btnBack.on(cc.Node.EventType.TOUCH_START, function () {
            _this.onBack();
        });
        CocosZ_1.cocosz.schedule(function () {
            if (_this.wheelState === 0) {
                return;
            }
            // 播放音效有可能卡
            _this.effectFlag += _this.curSpeed;
            if (_this.effectFlag >= _this.gearAngle) {
                CocosZ_1.cocosz.audioMgr.playLotteryEffect();
                _this.effectFlag = 0;
            }
            if (_this.wheelState == 1) {
                // cc.log('....加速,speed:' + this.curSpeed);
                _this.spinTime += 0.005;
                _this.lottery.angle = _this.lottery.angle + _this.curSpeed;
                if (_this.curSpeed <= _this.maxSpeed) {
                    _this.curSpeed += _this.acc;
                }
                else {
                    if (_this.spinTime < _this.duration) {
                        return;
                    }
                    // cc.log('....开始减速');
                    //设置目标角度
                    if (Math.abs(Math.abs(Math.floor(_this.lottery.angle) % 360) - Math.abs(Math.floor(360 - _this.targetID * _this.gearAngle + _this.defaultAngle) % 360)) < 5) {
                        _this.finalAngle = 360 - _this.targetID * _this.gearAngle + _this.defaultAngle;
                        _this.maxSpeed = _this.curSpeed;
                        // if (this.springback) {
                        //     this.finalAngle += this.gearAngle;
                        // }
                        _this.lottery.angle = _this.finalAngle;
                        _this.wheelState = 2;
                    }
                }
            }
            else if (_this.wheelState == 2) {
                // cc.log('......减速');
                var curRo = _this.lottery.angle; //应该等于finalAngle
                var hadRo = curRo - _this.finalAngle;
                _this.curSpeed = _this.maxSpeed * ((_this.decAngle - hadRo) / _this.decAngle) + 0.2;
                _this.lottery.angle = curRo + _this.curSpeed;
                if ((_this.decAngle - hadRo) <= 0) {
                    // cc.log('....停止');
                    _this.wheelState = 0;
                    _this.lottery.angle = _this.finalAngle;
                    // if (this.springback) {
                    //     //倒转一个齿轮
                    //     // var act = new cc.rotateBy(0.6, -this.gearAngle);
                    //     var act = cc.rotateBy(0.6, -this.gearAngle);
                    //     var seq = cc.sequence(cc.delayTime(0.2), act, cc.callFunc(this.showRes, this));
                    //     this.lottery.runAction(seq);
                    // }
                    // else {
                    _this.showRes();
                    // }
                }
            }
        }, 0.005);
    };
    UiLottery.prototype.onOpen = function () {
        this.scaleNode.scale = 0;
        CocosZ_1.cocosz.gameMgr.isDelay = false;
        cc.tween(this.scaleNode)
            .to(0.2, { scale: 1 })
            .call(function () {
            // this.action = cc.tween(this.lottery)
            //     .repeatForever(cc.tween().by(45, { angle: 360 }))
            // this.action.start();
        })
            .start();
        cc.log("-------cocosz.dataMgr.Lottery-------", CocosZ_1.cocosz.dataMgr.Lottery);
        if (CocosZ_1.cocosz.dataMgr.Lottery <= 0) {
            this.btnFree.active = false;
            this.btnVideo.active = true;
        }
        else {
            this.btnFree.active = true;
            this.btnVideo.active = false;
        }
        if ((cc.sys.platform === cc.sys.VIVO_GAME)) {
            lieyou_SdkManager.showBannerByBottom();
        }
        else if (cc.sys.platform === cc.sys.OPPO_GAME) {
            this.scaleNode.y = 200;
            var sp = CocosZ_1.cocosz.resMgr.getRes("ss", cc.SpriteFrame);
            lieyou_SdkManager.showNativeAd_big({
                node: this.scaleNode.getChildByName("nativePos"), "titleColor": cc.color(255, 255, 255, 255),
                "descColor": cc.color(255, 255, 255, 255), bgPath: 'texture/ss', texture: sp, scale: 0.9, insetTop: 10, insetBottom: 10, insetLeft: 10, insetRight: 10
            });
        }
        this.skinID2 = CocosZ_1.cocosz.dataMgr.getRandomLockBalloonSkin();
        this.skinID = CocosZ_1.cocosz.dataMgr.getRandomLockSkin();
        this.lottery.getChildByName("Lottery").children[0].getChildByName("gold_1").getComponent(cc.Sprite).spriteFrame = CocosZ_1.cocosz.resMgr.getRes("role" + this.skinID, cc.SpriteFrame);
        this.lottery.getChildByName("Lottery").children[3].getChildByName("gold_1").getComponent(cc.Sprite).spriteFrame = CocosZ_1.cocosz.resMgr.getRes("balloon" + (this.skinID2 + 1), cc.SpriteFrame);
    };
    UiLottery.prototype.showRes = function () {
        // cocosz.audioMgr.playGetCoin();
        if (CocosZ_1.cocosz.dataMgr.Lottery <= 0) {
            this.btnFree.active = false;
            this.btnVideo.active = true;
        }
        if (rewardList[this.targetID] > 0) {
            Msg_1.default.Show("\u606D\u559C\u83B7\u5F97" + rewardList[this.targetID] + "\u91D1\u5E01");
            CocosZ_1.cocosz.dataMgr.CoinCount += rewardList[this.targetID];
        }
        else if (rewardList[this.targetID] >= -1) {
            var info = CocosZ_1.cocosz.dataMgr.getSkinInfo(this.skinID);
            if (info.State == 1 || info.State == 2) {
                Msg_1.default.Show("\u8BE5\u76AE\u80A4\u5DF2\u89E3\u9501\uFF0C\u8F6C\u5316\u6210" + info.Price + "\u91D1\u5E01");
                CocosZ_1.cocosz.dataMgr.CoinCount += info.Price;
                return;
            }
            Msg_1.default.Show("\u76AE\u80A4\u89E3\u9501\u6210\u529F");
            CocosZ_1.cocosz.dataMgr.CurSkinId = this.skinID;
        }
        else if (rewardList[this.targetID] >= -2) {
            var info = CocosZ_1.cocosz.dataMgr.getBallbonSkinInfo(this.skinID);
            cc.log(info);
            if (info.State == 1 || info.State == 2) {
                Msg_1.default.Show("\u8BE5\u76AE\u80A4\u5DF2\u89E3\u9501\uFF0C\u8F6C\u5316\u6210" + info.Price + "\u91D1\u5E01");
                CocosZ_1.cocosz.dataMgr.CoinCount += info.Price;
                return;
            }
            Msg_1.default.Show("\u76AE\u80A4\u89E3\u9501\u6210\u529F");
            CocosZ_1.cocosz.dataMgr.CurBallbonSkinId = this.skinID2;
        }
        // cocosz.dataMgr.Lottery--;
    };
    UiLottery.prototype.onReward = function () {
        // if (this.isAction) return;
        // this.isAction = true;
        // let num = this._getRanDom();
        // this.action.stop();
        // cc.tween(this.lottery)
        //     .call(() => {
        //         this.lottery.angle = this.lottery.angle % 360;
        //     })
        //     .to(5, { angle: (360 * 10 + 22.5) }, { easing: "circIn" })
        //     .by(num * 45 / 360 + 1, { angle: (num * 45 + 360) }, { easing: "circOut" })
        //     .call(() => {
        //         this.isAction = false;
        //         this._page.angle = this._page.angle % 360
        //         // cocosz.scheduleOnce(() => {
        //         // this.action.start();
        //         // 
        //         // }, 1)
        //     })
        //     .start()
        CocosZ_1.cocosz.audioMgr.playbtnEffect();
        if (this.wheelState !== 0) {
            Msg_1.default.Show("正在抽奖中");
            return;
        }
        // if (cocosz.dataMgr.Lottery <= 0) {
        // utils.adManager.ShowVideo((ret, msg) => {
        //     if (ret) {
        //         this.turntableCount = 1;
        //         this.startTurnTable();
        //     } else {
        //         utils.showMsg("观看完整视频可以获取一次抽奖机会！");
        //         this.onClose();
        //     }
        // })
        //     return;
        // }
        CocosZ_1.cocosz.dataMgr.Lottery--;
        this.targetID = this._getRanDom();
        this.decAngle = 2 * 360; // 减速旋转两圈
        this.wheelState = 1;
        this.curSpeed = 0;
        this.spinTime = 0;
    };
    UiLottery.prototype.onTips = function (tips) {
        Msg_1.default.Show(tips);
    };
    UiLottery.prototype.onBack = function () {
        var _this = this;
        cc.log("-----sceneName--", CocosZ_1.cocosz.sceneMgr.sceneName);
        CocosZ_1.cocosz.audioMgr.playbtnEffect();
        CocosZ_1.cocosz.unscheduleAllCallbacks();
        cc.tween(this.scaleNode)
            .to(0.2, { scale: 0 })
            .call(function () {
            if (_this.wheelState == 1 || _this.wheelState == 2) {
                CocosZ_1.cocosz.dataMgr.Lottery++;
            }
            if (CocosZ_1.cocosz.sceneMgr.sceneName == "Game") {
                CocosZ_1.cocosz.uiMgr.openPanel(Constant_1.PanelName.UiBeforeSucceed);
                _this._page.destroy();
            }
            else {
                lieyou_SdkManager.showMoreGameByBanner();
                _this._page.destroy();
            }
        })
            .start();
    };
    UiLottery.prototype.onVideo = function () {
        var _this = this;
        CocosZ_1.cocosz.audioMgr.playbtnEffect();
        // Msg.Show("视频播放失败!");
        if (cc.sys.platform === cc.sys.WECHAT_GAME || !cc.sys.isMobile) {
            CocosZ_1.cocosz.dataMgr.Lottery++;
            this.onTips("抽奖次数+1");
            if (CocosZ_1.cocosz.dataMgr.Lottery <= 0) {
                this.btnFree.active = false;
                this.btnVideo.active = true;
            }
            else {
                this.btnFree.active = true;
                this.btnVideo.active = false;
            }
            this.onReward();
            return;
        }
        if (CocosZ_1.cocosz.gameMgr.isDelay) {
            return;
        }
        ;
        CocosZ_1.cocosz.gameMgr.isDelay = true;
        CocosZ_1.cocosz.audioMgr.stopAll();
        CocosZ_1.cocosz.scheduleOnce(function () {
            CocosZ_1.cocosz.gameMgr.isDelay = false;
        }, 1.5);
        lieyou_SdkManager.showRewardedVideoAd(function (res) {
            CocosZ_1.cocosz.audioMgr.resumAllMusic();
            if (res) {
                CocosZ_1.cocosz.dataMgr.Lottery++;
                _this.onTips("抽奖次数+1");
                if (CocosZ_1.cocosz.dataMgr.Lottery <= 0) {
                    _this.btnFree.active = false;
                    _this.btnVideo.active = true;
                }
                else {
                    _this.btnFree.active = true;
                    _this.btnVideo.active = false;
                }
                _this.onReward();
            }
            else {
                _this.onTips("视频播放完成才能获取奖励");
            }
        });
    };
    UiLottery.prototype.onClose = function () {
        cc.game.targetOff(this);
    };
    UiLottery.prototype.onDestroy = function () {
        CocosZ_1.cocosz.unscheduleAllCallbacks();
        cc.game.targetOff(this);
    };
    UiLottery.prototype._getRanDom = function () {
        var num = Math.random();
        // return 3
        if (num > 0.7) {
            return 1;
        }
        else if (num > 0.5) {
            return 2;
        }
        else if (num > 0.3) {
            return 4;
        }
        else if (num > 0.1) {
            return 5;
        }
        else if (num > 0.05) {
            return 3;
        }
        else if (num > 0) {
            return 0;
        }
    };
    UiLottery = __decorate([
        ccclass
    ], UiLottery);
    return UiLottery;
}(UIPage_1.default));
exports.default = UiLottery;

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxVaVxcVWlMb3R0ZXJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBOEI7QUFDOUIsOENBQTZDO0FBQzdDLGtEQUE0RDtBQUM1RCx3Q0FBbUM7QUFFN0IsSUFBQSxrQkFBcUMsRUFBbkMsb0JBQU8sRUFBRSxzQkFBMEIsQ0FBQztBQUM1QyxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQzlDLDBEQUEwRDtBQUUxRDtJQUF1Qyw2QkFBTTtJQW1FekM7UUFBQSxZQUNJLGlCQUFPLFNBRVY7UUFwRUQsYUFBTyxHQUFZLElBQUksQ0FBQztRQUN4QixjQUFRLEdBQVksSUFBSSxDQUFDO1FBQ3pCLGFBQU8sR0FBWSxJQUFJLENBQUM7UUFDeEIsYUFBTyxHQUFZLElBQUksQ0FBQztRQUV4QixlQUFTLEdBQVksSUFBSSxDQUFDO1FBQzFCLFlBQU0sR0FBUSxJQUFJLENBQUM7UUFDbkIsY0FBUSxHQUFRLElBQUksQ0FBQztRQUVyQixTQUFHLEdBQVcsQ0FBQyxDQUFDLENBQUM7UUFHakI7OztXQUdHO1FBQ0gsY0FBUSxHQUFXLEVBQUUsQ0FBQztRQUV0Qjs7OztXQUlHO1FBQ0gsY0FBUSxHQUFXLEdBQUcsQ0FBQztRQUd2Qjs7OztXQUlHO1FBQ0gsU0FBRyxHQUFXLEdBQUcsQ0FBQztRQUVsQjs7OztXQUlHO1FBQ0gsY0FBUSxHQUFXLENBQUMsQ0FBQztRQUVyQjs7O1dBR0c7UUFDSCxnQkFBVSxHQUFZLEtBQUssQ0FBQztRQUc1QixZQUFNLEdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDcEIsYUFBTyxHQUFXLENBQUMsQ0FBQyxDQUFDO1FBS3JCLGdCQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsY0FBUSxHQUFHLENBQUMsQ0FBQztRQUNiLGNBQVEsR0FBRyxDQUFDLENB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LEdBQW5CO1FBQ0ksZUFBTSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFDaEMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUdPLDhCQUFVLEdBQWxCO1FBQ0ksSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRXhCLFdBQVc7UUFDWCxJQUFJLEdBQUcsR0FBRyxHQUFHLEVBQUU7WUFDWCxPQUFPLENBQUMsQ0FBQztTQUNaO2FBQ0ksSUFBSSxHQUFHLEdBQUcsR0FBRyxFQUFFO1lBQ2hCLE9BQU8sQ0FBQyxDQUFDO1NBQ1o7YUFDSSxJQUFJLEdBQUcsR0FBRyxHQUFHLEVBQUU7WUFDaEIsT0FBTyxDQUFDLENBQUM7U0FDWjthQUNJLElBQUksR0FBRyxHQUFHLEdBQUcsRUFBRTtZQUNoQixPQUFPLENBQUMsQ0FBQztTQUNaO2FBQ0ksSUFBSSxHQUFHLEdBQUcsSUFBSSxFQUFFO1lBQ2pCLE9BQU8sQ0FBQyxDQUFDO1NBQ1o7YUFDSSxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUU7WUFDZCxPQUFPLENBQUMsQ0FBQztTQUNaO0lBRUwsQ0FBQztJQXZhZ0IsU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQXdhN0I7SUFBRCxnQkFBQztDQXhhRCxBQXdhQyxDQXhhc0MsZ0JBQU0sR0F3YTVDO2tCQXhhb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBVSVBhZ2UgZnJvbSBcIi4vVUlQYWdlXCI7XHJcbmltcG9ydCB7IGNvY29zeiB9IGZyb20gXCIuLi9GcmFtZXdvcmsvQ29jb3NaXCI7XHJcbmltcG9ydCBDb25zdGFudCwgeyBQYW5lbE5hbWUgfSBmcm9tIFwiLi4vRnJhbWV3b3JrL0NvbnN0YW50XCI7XHJcbmltcG9ydCBNc2cgZnJvbSBcIi4uL0ZyYW1ld29yay9Nc2dcIjtcclxuaW1wb3J0IHsgdGltZVN0YW1wIH0gZnJvbSBcImNvbnNvbGVcIjtcclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxubGV0IHJld2FyZExpc3QgPSBbLTEsIDEwMCwgMjAwLCAtMiwgNTAwLCA5OTldO1xyXG4vLyBsZXQgcmV3YXJkTGlzdCA9IFs1LCAyMDAwLCAzMDAsIDMsIDUwMCwgMTAwMCwgMjAwMCwgNV07XHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVpTG90dGVyeSBleHRlbmRzIFVJUGFnZSB7XHJcblxyXG4gICAgYnRuRnJlZTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBidG5WaWRlbzogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBsb3R0ZXJ5OiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIGJ0bkJhY2s6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIHNjYWxlTm9kZTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBhY3Rpb246IGFueSA9IG51bGw7XHJcbiAgICBpc0FjdGlvbjogYW55ID0gbnVsbDtcclxuXHJcbiAgICBudW06IG51bWJlciA9IC0xO1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqICBtYXg6IDE1LFxyXG4gICAgICAgIG1pbjogMixcclxuICAgICAqL1xyXG4gICAgbWF4U3BlZWQ6IG51bWJlciA9IDEyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YeP6YCf5YmN5peL6L2s5pe26Ze0XHJcbiAgICAgKiAgbWF4OiA1LFxyXG4gICAgICAgIG1pbjogMSxcclxuICAgICAqL1xyXG4gICAgZHVyYXRpb246IG51bWJlciA9IDEuNTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliqDpgJ/luqZcclxuICAgICAqICBtYXg6IDAuMixcclxuICAgICAgICBtaW46IDAuMDEsXHJcbiAgICAgKi9cclxuICAgIGFjYzogbnVtYmVyID0gMC4xO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5oyH5a6a57uT5p2f5pe255qE6b2/6L2uXHJcbiAgICAgKiAgbWF4OiAxNyxcclxuICAgICAgICBtaW46IDAsXHJcbiAgICAgKi9cclxuICAgIHRhcmdldElEOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5peL6L2s57uT5p2f5piv5ZCm5Zue5by5XHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgc3ByaW5nYmFjazogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuXHJcbiAgICBza2luSUQ6IG51bWJlciA9IC0xO1xyXG4gICAgc2tpbklEMjogbnVtYmVyID0gLTE7XHJcblxyXG5cclxuXHJcblxyXG4gICAgd2hlZWxTdGF0ZSA9IDA7XHJcbiAgICBjdXJTcGVlZCA9IDA7XHJcbiAgICBzcGluVGltZSA9IDA7ICAgICAgICAgICAgICAgICAgIC8v5YeP6YCf5YmN5peL6L2s5pe26Ze0XHJcbiAgICBnZWFyTnVtID0gNjtcclxuICAgIGRlZmF1bHRBbmdsZSA9IDA7ICAgICAgICAvL+S/ruato+m7mOiupOinkuW6plxyXG4gICAgZ2VhckFuZ2xlID0gMzYwIC8gdGhpcy5nZWFyTnVtOyAgIC8v5q+P5Liq6b2/6L2u55qE6KeS5bqmXHJcblxyXG4gICAgZmluYWxBbmdsZSA9IDA7ICAgICAgICAgICAgICAgICAvL+acgOe7iOe7k+aenOaMh+WumueahOinkuW6plxyXG4gICAgZWZmZWN0RmxhZyA9IDA7ICAgICAgICAgICAgICAgICAvL+eUqOS6jumfs+aViOaSreaUvlxyXG4gICAgYXVkaW9JRCA9IDA7XHJcbiAgICBkZWNBbmdsZSA9IDA7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLl9pbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfaW5pdCgpIHtcclxuICAgICAgICBsZXQgR2FtZTogY2MuUHJlZmFiID0gY29jb3N6LnJlc01nci5nZXRSZXMoUGFuZWxOYW1lLlVpTG90dGVyeSwgY2MuUHJlZmFiKTtcclxuICAgICAgICBpZiAoR2FtZSkge1xyXG4gICAgICAgICAgICBsZXQgbm9kZTogY2MuTm9kZSA9IGNjLmluc3RhbnRpYXRlKEdhbWUpO1xyXG4gICAgICAgICAgICBpZiAobm9kZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcGFnZSA9IG5vZGU7XHJcbiAgICAgICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzXCIpLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIG5vZGUucG9zaXRpb24gPSBjYy5WZWMyLlpFUk87XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9vbkxvYWQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgX29uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLnNjYWxlTm9kZSA9IGNjLmZpbmQoXCJDYW52YXMvVWlMb3R0ZXJ5L1NjYWxlTm9kZVwiKTtcclxuICAgICAgICB0aGlzLmJ0bkZyZWUgPSB0aGlzLnNjYWxlTm9kZS5nZXRDaGlsZEJ5TmFtZShcIkJ0bkZyZWVcIik7XHJcbiAgICAgICAgdGhpcy5sb3R0ZXJ5ID0gdGhpcy5zY2FsZU5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJMb3R0ZXJ5XCIpO1xyXG4gICAgICAgIHRoaXMuYnRuVmlkZW8gPSB0aGlzLnNjYWxlTm9kZS5nZXRDaGlsZEJ5TmFtZShcIkJ0blZpZGVvXCIpO1xyXG4gICAgICAgIHRoaXMuYnRuQmFjayA9IHRoaXMuc2NhbGVOb2RlLmdldENoaWxkQnlOYW1lKFwiQnRuQmFja1wiKTtcclxuXHJcbiAgICAgICAgdGhpcy5fU3RhcnQoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBfU3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy5idG5GcmVlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMub25SZXdhcmQoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmJ0blZpZGVvLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMub25WaWRlbygpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5idG5CYWNrLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMub25CYWNrKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvY29zei5zY2hlZHVsZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLndoZWVsU3RhdGUgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyDmkq3mlL7pn7PmlYjmnInlj6/og73ljaFcclxuICAgICAgICAgICAgdGhpcy5lZmZlY3RGbGFnICs9IHRoaXMuY3VyU3BlZWQ7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmVmZmVjdEZsYWcgPj0gdGhpcy5nZWFyQW5nbGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjb2Nvc3ouYXVkaW9NZ3IucGxheUxvdHRlcnlFZmZlY3QoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWZmZWN0RmxhZyA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy53aGVlbFN0YXRlID09IDEpIHtcclxuICAgICAgICAgICAgICAgIC8vIGNjLmxvZygnLi4uLuWKoOmAnyxzcGVlZDonICsgdGhpcy5jdXJTcGVlZCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNwaW5UaW1lICs9IDAuMDA1O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb3R0ZXJ5LmFuZ2xlID0gdGhpcy5sb3R0ZXJ5LmFuZ2xlICsgdGhpcy5jdXJTcGVlZDtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1clNwZWVkIDw9IHRoaXMubWF4U3BlZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1clNwZWVkICs9IHRoaXMuYWNjO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3BpblRpbWUgPCB0aGlzLmR1cmF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY2MubG9nKCcuLi4u5byA5aeL5YeP6YCfJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/orr7nva7nm67moIfop5LluqZcclxuICAgICAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMoTWF0aC5hYnMoTWF0aC5mbG9vcih0aGlzLmxvdHRlcnkuYW5nbGUpICUgMzYwKSAtIE1hdGguYWJzKE1hdGguZmxvb3IoMzYwIC0gdGhpcy50YXJnZXRJRCAqIHRoaXMuZ2VhckFuZ2xlICsgdGhpcy5kZWZhdWx0QW5nbGUpICUgMzYwKSkgPCA1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmluYWxBbmdsZSA9IDM2MCAtIHRoaXMudGFyZ2V0SUQgKiB0aGlzLmdlYXJBbmdsZSArIHRoaXMuZGVmYXVsdEFuZ2xlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1heFNwZWVkID0gdGhpcy5jdXJTcGVlZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKHRoaXMuc3ByaW5nYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5maW5hbEFuZ2xlICs9IHRoaXMuZ2VhckFuZ2xlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG90dGVyeS5hbmdsZSA9IHRoaXMuZmluYWxBbmdsZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53aGVlbFN0YXRlID0gMjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMud2hlZWxTdGF0ZSA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjYy5sb2coJy4uLi4uLuWHj+mAnycpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGN1clJvID0gdGhpcy5sb3R0ZXJ5LmFuZ2xlOyAvL+W6lOivpeetieS6jmZpbmFsQW5nbGVcclxuICAgICAgICAgICAgICAgIHZhciBoYWRSbyA9IGN1clJvIC0gdGhpcy5maW5hbEFuZ2xlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJTcGVlZCA9IHRoaXMubWF4U3BlZWQgKiAoKHRoaXMuZGVjQW5nbGUgLSBoYWRSbykgLyB0aGlzLmRlY0FuZ2xlKSArIDAuMjtcclxuICAgICAgICAgICAgICAgIHRoaXMubG90dGVyeS5hbmdsZSA9IGN1clJvICsgdGhpcy5jdXJTcGVlZDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoKHRoaXMuZGVjQW5nbGUgLSBoYWRSbykgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNjLmxvZygnLi4uLuWBnOatoicpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2hlZWxTdGF0ZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb3R0ZXJ5LmFuZ2xlID0gdGhpcy5maW5hbEFuZ2xlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmICh0aGlzLnNwcmluZ2JhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgLy/lgJLovazkuIDkuKrpvb/ova5cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgLy8gdmFyIGFjdCA9IG5ldyBjYy5yb3RhdGVCeSgwLjYsIC10aGlzLmdlYXJBbmdsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHZhciBhY3QgPSBjYy5yb3RhdGVCeSgwLjYsIC10aGlzLmdlYXJBbmdsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHZhciBzZXEgPSBjYy5zZXF1ZW5jZShjYy5kZWxheVRpbWUoMC4yKSwgYWN0LCBjYy5jYWxsRnVuYyh0aGlzLnNob3dSZXMsIHRoaXMpKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5sb3R0ZXJ5LnJ1bkFjdGlvbihzZXEpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dSZXMoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSwgMC4wMDUpXHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uT3BlbigpIHtcclxuICAgICAgICB0aGlzLnNjYWxlTm9kZS5zY2FsZSA9IDA7XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIGNvY29zei5nYW1lTWdyLmlzRGVsYXkgPSBmYWxzZTtcclxuICAgICAgICBcclxuICAgICAgICBjYy50d2Vlbih0aGlzLnNjYWxlTm9kZSlcclxuICAgICAgICAgICAgLnRvKDAuMiwgeyBzY2FsZTogMSB9KVxyXG4gICAgICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmFjdGlvbiA9IGNjLnR3ZWVuKHRoaXMubG90dGVyeSlcclxuICAgICAgICAgICAgICAgIC8vICAgICAucmVwZWF0Rm9yZXZlcihjYy50d2VlbigpLmJ5KDQ1LCB7IGFuZ2xlOiAzNjAgfSkpXHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmFjdGlvbi5zdGFydCgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuc3RhcnQoKTtcclxuICAgICAgICBjYy5sb2coXCItLS0tLS0tY29jb3N6LmRhdGFNZ3IuTG90dGVyeS0tLS0tLS1cIiwgY29jb3N6LmRhdGFNZ3IuTG90dGVyeSlcclxuICAgICAgICBpZiAoY29jb3N6LmRhdGFNZ3IuTG90dGVyeSA8PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuRnJlZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5idG5WaWRlby5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5idG5GcmVlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuVmlkZW8uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoKGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLlZJVk9fR0FNRSkpIHtcclxuICAgICAgICAgICAgbGlleW91X1Nka01hbmFnZXIuc2hvd0Jhbm5lckJ5Qm90dG9tKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLk9QUE9fR0FNRSkge1xyXG4gICAgICAgICAgICB0aGlzLnNjYWxlTm9kZS55ID0gMjAwO1xyXG4gICAgICAgICAgICBsZXQgc3AgPSBjb2Nvc3oucmVzTWdyLmdldFJlcyhcInNzXCIsIGNjLlNwcml0ZUZyYW1lKVxyXG4gICAgICAgICAgICBsaWV5b3VfU2RrTWFuYWdlci5zaG93TmF0aXZlQWRfYmlnKHtcclxuICAgICAgICAgICAgICAgIG5vZGU6IHRoaXMuc2NhbGVOb2RlLmdldENoaWxkQnlOYW1lKFwibmF0aXZlUG9zXCIpLCBcInRpdGxlQ29sb3JcIjogY2MuY29sb3IoMjU1LCAyNTUsIDI1NSwgMjU1LCksXHJcbiAgICAgICAgICAgICAgICBcImRlc2NDb2xvclwiOiBjYy5jb2xvcigyNTUsIDI1NSwgMjU1LCAyNTUsKSwgYmdQYXRoOiAndGV4dHVyZS9zcycsIHRleHR1cmU6IHNwLCBzY2FsZTogMC45LCBpbnNldFRvcDogMTAsIGluc2V0Qm90dG9tOiAxMCwgaW5zZXRMZWZ0OiAxMCwgaW5zZXRSaWdodDogMTBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgdGhpcy5za2luSUQyID0gY29jb3N6LmRhdGFNZ3IuZ2V0UmFuZG9tTG9ja0JhbGxvb25Ta2luKCk7XHJcbiAgICAgICAgdGhpcy5za2luSUQgPSBjb2Nvc3ouZGF0YU1nci5nZXRSYW5kb21Mb2NrU2tpbigpO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5sb3R0ZXJ5LmdldENoaWxkQnlOYW1lKFwiTG90dGVyeVwiKS5jaGlsZHJlblswXS5nZXRDaGlsZEJ5TmFtZShcImdvbGRfMVwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IGNvY29zei5yZXNNZ3IuZ2V0UmVzKFwicm9sZVwiICsgdGhpcy5za2luSUQsIGNjLlNwcml0ZUZyYW1lKTtcclxuICAgICAgICB0aGlzLmxvdHRlcnkuZ2V0Q2hpbGRCeU5hbWUoXCJMb3R0ZXJ5XCIpLmNoaWxkcmVuWzNdLmdldENoaWxkQnlOYW1lKFwiZ29sZF8xXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gY29jb3N6LnJlc01nci5nZXRSZXMoXCJiYWxsb29uXCIgKyAodGhpcy5za2luSUQyICsgMSksIGNjLlNwcml0ZUZyYW1lKTtcclxuICAgIH1cclxuICAgIHNob3dSZXMoKSB7XHJcblxyXG4gICAgICAgIC8vIGNvY29zei5hdWRpb01nci5wbGF5R2V0Q29pbigpO1xyXG5cclxuICAgICAgICBpZiAoY29jb3N6LmRhdGFNZ3IuTG90dGVyeSA8PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuRnJlZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5idG5WaWRlby5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocmV3YXJkTGlzdFt0aGlzLnRhcmdldElEXSA+IDApIHtcclxuICAgICAgICAgICAgTXNnLlNob3coYOaBreWWnOiOt+W+lyR7cmV3YXJkTGlzdFt0aGlzLnRhcmdldElEXX3ph5HluIFgKTtcclxuICAgICAgICAgICAgY29jb3N6LmRhdGFNZ3IuQ29pbkNvdW50ICs9IHJld2FyZExpc3RbdGhpcy50YXJnZXRJRF1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAocmV3YXJkTGlzdFt0aGlzLnRhcmdldElEXSA+PSAtMSkge1xyXG4gICAgICAgICAgICBsZXQgaW5mbyA9IGNvY29zei5kYXRhTWdyLmdldFNraW5JbmZvKHRoaXMuc2tpbklEKTtcclxuICAgICAgICAgICAgaWYgKGluZm8uU3RhdGUgPT0gMSB8fCBpbmZvLlN0YXRlID09IDIpIHtcclxuICAgICAgICAgICAgICAgIE1zZy5TaG93KGDor6Xnmq7ogqTlt7Lop6PplIHvvIzovazljJbmiJAke2luZm8uUHJpY2V96YeR5biBYCk7XHJcbiAgICAgICAgICAgICAgICBjb2Nvc3ouZGF0YU1nci5Db2luQ291bnQgKz0gaW5mby5QcmljZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBNc2cuU2hvdyhg55qu6IKk6Kej6ZSB5oiQ5YqfYCk7XHJcbiAgICAgICAgICAgIGNvY29zei5kYXRhTWdyLkN1clNraW5JZCA9IHRoaXMuc2tpbklEO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChyZXdhcmRMaXN0W3RoaXMudGFyZ2V0SURdID49IC0yKSB7XHJcbiAgICAgICAgICAgIGxldCBpbmZvID0gY29jb3N6LmRhdGFNZ3IuZ2V0QmFsbGJvblNraW5JbmZvKHRoaXMuc2tpbklEKTtcclxuICAgICAgICAgICAgY2MubG9nKGluZm8pXHJcbiAgICAgICAgICAgIGlmIChpbmZvLlN0YXRlID09IDEgfHwgaW5mby5TdGF0ZSA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICBNc2cuU2hvdyhg6K+l55qu6IKk5bey6Kej6ZSB77yM6L2s5YyW5oiQJHtpbmZvLlByaWNlfemHkeW4gWApO1xyXG4gICAgICAgICAgICAgICAgY29jb3N6LmRhdGFNZ3IuQ29pbkNvdW50ICs9IGluZm8uUHJpY2VcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgTXNnLlNob3coYOearuiCpOino+mUgeaIkOWKn2ApO1xyXG4gICAgICAgICAgICBjb2Nvc3ouZGF0YU1nci5DdXJCYWxsYm9uU2tpbklkID0gdGhpcy5za2luSUQyO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjb2Nvc3ouZGF0YU1nci5Mb3R0ZXJ5LS07XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uUmV3YXJkKCkge1xyXG4gICAgICAgIC8vIGlmICh0aGlzLmlzQWN0aW9uKSByZXR1cm47XHJcbiAgICAgICAgLy8gdGhpcy5pc0FjdGlvbiA9IHRydWU7XHJcbiAgICAgICAgLy8gbGV0IG51bSA9IHRoaXMuX2dldFJhbkRvbSgpO1xyXG4gICAgICAgIC8vIHRoaXMuYWN0aW9uLnN0b3AoKTtcclxuICAgICAgICAvLyBjYy50d2Vlbih0aGlzLmxvdHRlcnkpXHJcbiAgICAgICAgLy8gICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMubG90dGVyeS5hbmdsZSA9IHRoaXMubG90dGVyeS5hbmdsZSAlIDM2MDtcclxuICAgICAgICAvLyAgICAgfSlcclxuICAgICAgICAvLyAgICAgLnRvKDUsIHsgYW5nbGU6ICgzNjAgKiAxMCArIDIyLjUpIH0sIHsgZWFzaW5nOiBcImNpcmNJblwiIH0pXHJcbiAgICAgICAgLy8gICAgIC5ieShudW0gKiA0NSAvIDM2MCArIDEsIHsgYW5nbGU6IChudW0gKiA0NSArIDM2MCkgfSwgeyBlYXNpbmc6IFwiY2lyY091dFwiIH0pXHJcbiAgICAgICAgLy8gICAgIC5jYWxsKCgpID0+IHtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuaXNBY3Rpb24gPSBmYWxzZTtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuX3BhZ2UuYW5nbGUgPSB0aGlzLl9wYWdlLmFuZ2xlICUgMzYwXHJcblxyXG4gICAgICAgIC8vICAgICAgICAgLy8gY29jb3N6LnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgLy8gICAgICAgICAvLyB0aGlzLmFjdGlvbi5zdGFydCgpO1xyXG4gICAgICAgIC8vICAgICAgICAgLy8gXHJcbiAgICAgICAgLy8gICAgICAgICAvLyB9LCAxKVxyXG4gICAgICAgIC8vICAgICB9KVxyXG4gICAgICAgIC8vICAgICAuc3RhcnQoKVxyXG4gICAgICAgIGNvY29zei5hdWRpb01nci5wbGF5YnRuRWZmZWN0KCk7XHJcbiAgICAgICAgaWYgKHRoaXMud2hlZWxTdGF0ZSAhPT0gMCkge1xyXG4gICAgICAgICAgICBNc2cuU2hvdyhcIuato+WcqOaKveWlluS4rVwiKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGlmIChjb2Nvc3ouZGF0YU1nci5Mb3R0ZXJ5IDw9IDApIHtcclxuICAgICAgICAvLyB1dGlscy5hZE1hbmFnZXIuU2hvd1ZpZGVvKChyZXQsIG1zZykgPT4ge1xyXG4gICAgICAgIC8vICAgICBpZiAocmV0KSB7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLnR1cm50YWJsZUNvdW50ID0gMTtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuc3RhcnRUdXJuVGFibGUoKTtcclxuICAgICAgICAvLyAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyAgICAgICAgIHV0aWxzLnNob3dNc2coXCLop4LnnIvlrozmlbTop4bpopHlj6/ku6Xojrflj5bkuIDmrKHmir3lpZbmnLrkvJrvvIFcIik7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLm9uQ2xvc2UoKTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH0pXHJcblxyXG4gICAgICAgIC8vICAgICByZXR1cm47XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIGNvY29zei5kYXRhTWdyLkxvdHRlcnktLTtcclxuICAgICAgICB0aGlzLnRhcmdldElEID0gdGhpcy5fZ2V0UmFuRG9tKCk7XHJcbiAgICAgICAgdGhpcy5kZWNBbmdsZSA9IDIgKiAzNjA7ICAvLyDlh4/pgJ/ml4vovazkuKTlnIhcclxuICAgICAgICB0aGlzLndoZWVsU3RhdGUgPSAxO1xyXG4gICAgICAgIHRoaXMuY3VyU3BlZWQgPSAwO1xyXG4gICAgICAgIHRoaXMuc3BpblRpbWUgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIG9uVGlwcyh0aXBzKSB7XHJcbiAgICAgICAgTXNnLlNob3codGlwcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uQmFjaygpIHtcclxuICAgICAgICBjYy5sb2coXCItLS0tLXNjZW5lTmFtZS0tXCIsIGNvY29zei5zY2VuZU1nci5zY2VuZU5hbWUpXHJcblxyXG4gICAgICAgIGNvY29zei5hdWRpb01nci5wbGF5YnRuRWZmZWN0KCk7XHJcblxyXG5cclxuICAgICAgICBjb2Nvc3oudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xyXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMuc2NhbGVOb2RlKVxyXG4gICAgICAgICAgICAudG8oMC4yLCB7IHNjYWxlOiAwIH0pXHJcbiAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMud2hlZWxTdGF0ZSA9PSAxIHx8IHRoaXMud2hlZWxTdGF0ZSA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29jb3N6LmRhdGFNZ3IuTG90dGVyeSsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjb2Nvc3ouc2NlbmVNZ3Iuc2NlbmVOYW1lID09IFwiR2FtZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29jb3N6LnVpTWdyLm9wZW5QYW5lbChQYW5lbE5hbWUuVWlCZWZvcmVTdWNjZWVkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcGFnZS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsaWV5b3VfU2RrTWFuYWdlci5zaG93TW9yZUdhbWVCeUJhbm5lcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3BhZ2UuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuc3RhcnQoKTtcclxuXHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25WaWRlbygpIHtcclxuXHJcbiAgICAgICAgY29jb3N6LmF1ZGlvTWdyLnBsYXlidG5FZmZlY3QoKTtcclxuICAgICAgICAvLyBNc2cuU2hvdyhcIuinhumikeaSreaUvuWksei0pSFcIik7XHJcblxyXG4gICAgICAgIGlmIChjYy5zeXMucGxhdGZvcm0gPT09IGNjLnN5cy5XRUNIQVRfR0FNRSB8fCAhY2Muc3lzLmlzTW9iaWxlKSB7XHJcblxyXG4gICAgICAgICAgICBjb2Nvc3ouZGF0YU1nci5Mb3R0ZXJ5Kys7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm9uVGlwcyhcIuaKveWlluasoeaVsCsxXCIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNvY29zei5kYXRhTWdyLkxvdHRlcnkgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idG5GcmVlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idG5WaWRlby5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idG5GcmVlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ0blZpZGVvLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLm9uUmV3YXJkKClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGNvY29zei5nYW1lTWdyLmlzRGVsYXkpIHsgcmV0dXJuIH07XHJcbiAgICAgICAgY29jb3N6LmdhbWVNZ3IuaXNEZWxheSA9IHRydWU7XHJcbiAgICAgICAgY29jb3N6LmF1ZGlvTWdyLnN0b3BBbGwoKTtcclxuICAgICAgICBjb2Nvc3ouc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgY29jb3N6LmdhbWVNZ3IuaXNEZWxheSA9IGZhbHNlO1xyXG4gICAgICAgIH0sIDEuNSlcclxuXHJcblxyXG4gICAgICAgIGxpZXlvdV9TZGtNYW5hZ2VyLnNob3dSZXdhcmRlZFZpZGVvQWQoKHJlcykgPT4ge1xyXG4gICAgICAgICAgICBjb2Nvc3ouYXVkaW9NZ3IucmVzdW1BbGxNdXNpYygpO1xyXG4gICAgICAgICAgICBpZiAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICBjb2Nvc3ouZGF0YU1nci5Mb3R0ZXJ5Kys7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5vblRpcHMoXCLmir3lpZbmrKHmlbArMVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY29jb3N6LmRhdGFNZ3IuTG90dGVyeSA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idG5GcmVlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnRuVmlkZW8uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnRuRnJlZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnRuVmlkZW8uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uUmV3YXJkKClcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25UaXBzKFwi6KeG6aKR5pKt5pS+5a6M5oiQ5omN6IO96I635Y+W5aWW5YqxXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25DbG9zZSgpIHtcclxuICAgICAgICBjYy5nYW1lLnRhcmdldE9mZih0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EZXN0cm95KCkge1xyXG4gICAgICAgIGNvY29zei51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcbiAgICAgICAgY2MuZ2FtZS50YXJnZXRPZmYodGhpcyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgX2dldFJhbkRvbSgpIHtcclxuICAgICAgICBsZXQgbnVtID0gTWF0aC5yYW5kb20oKTtcclxuXHJcbiAgICAgICAgLy8gcmV0dXJuIDNcclxuICAgICAgICBpZiAobnVtID4gMC43KSB7XHJcbiAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChudW0gPiAwLjUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKG51bSA+IDAuMykge1xyXG4gICAgICAgICAgICByZXR1cm4gNDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAobnVtID4gMC4xKSB7XHJcbiAgICAgICAgICAgIHJldHVybiA1O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChudW0gPiAwLjA1KSB7XHJcbiAgICAgICAgICAgIHJldHVybiAzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChudW0gPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuIl19