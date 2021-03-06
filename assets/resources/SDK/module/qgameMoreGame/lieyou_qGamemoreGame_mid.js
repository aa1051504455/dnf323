

cc.Class({
    extends: cc.Component,

    properties: {
        fNode: cc.Node,
        type: 2,
    },

    onLoad () {
    },
    
    onDisable(){
        lieyou_SdkManager.showMoreGameIcon();
    },
    start () {
        lieyou_SdkManager.hideMoreGameIcon();
        var winSize = cc.winSize;
        var winsizeWidth = winSize.height>winSize.width?winSize.width:winSize.height;
        // this.node.scale = winsizeWidth/720 * 1.1;
    },
    setData(obj,isRun,refreshTime,runType = 1){
        //runType 1:page 2:move 3:change 4:pageOne
        var objLength = obj.length;
        var maxL = lieyou_showMoreGameNum;
        if(this.type == 3){
            maxL = 9; 
            runType = 2;//333   
        }else if(this.type == 2){
            maxL = 8;
        }
        if(this.type == 3 || this.type == 2){
            if(runType == 1 || runType == 4){
                maxL = maxL*2;
            }else if(runType == 2 && this.type == 2){
                maxL = maxL+4;
            }else if(runType == 2 && this.type == 3){
                maxL = maxL+3;
            }
        }
        for(var i = obj.length;i < maxL;i++){
            obj.push(obj[i%objLength]);
        }
        this.touchType = 3+this.type;
        if(this.type == 3){
            this.touchType = 7;
        }
        this._obj = obj;
        this._childNode = [];
        this._childNodeTag = [];
        this._showData = [];
        this._moreGameNode = [];
        for(let i = 0;i < obj.length && i < maxL;i++){
            var node = this.iconPrefab();
            this._childNode[i] = node;
            this._childNodeTag[i] = i;
            this._showData[i] = true;
            this.fNode.addChild(node);
            node.getComponent('lieyou_qGamemoreGame_icon').setData(obj[i],this.touchType);
            var hangNum = 4;
            var hangNum2 = 4;
            if(this.type == 3){
                hangNum = 3;
                hangNum2 = 3;
            }
            if(runType == 1 || runType == 4){
                hangNum = hangNum*2;
            }
            if(this.type == 3){
                node.x = -140 + i%hangNum*140 + 10*parseInt(i%hangNum/hangNum2)*(runType==1?1:0);
                node.y = 280 - parseInt(i/hangNum)*140;//333
            }else if(this.type == 2){
                node.x = -210 + i%hangNum*140 + 10*parseInt(i%hangNum/hangNum2)*(runType==1?1:0);
                node.y = 70 - parseInt(i/hangNum)*140;
            }else{
                node.x = -210 + i*140;
                if(obj.length >= 5 && isRun){
                    this.myMove(node,cc.v2(-210 + (obj.length-1)*140,0),cc.v2(-350,0));
                }
            }
            if(this.type == 2 || this.type == 3){
                var posy = 280;
                if(this.type == 2){
                    posy = 210;
                }
                if(runType == 2){
                    this.myMove(node,cc.v2(node.x,posy),cc.v2(node.x,-posy));
                }
            }
        }
        if(this._moreGameNode.length > 0){
            this.schedule(this.refreshMoreGameNodePos,1/60);
        }
        if(this.type == 2 || this.type == 3){
            if(runType == 1){
                this.fNode.runAction(cc.repeatForever(cc.sequence(cc.delayTime(3),cc.moveTo(0.2,-570,0),cc.delayTime(3),cc.callFunc(()=>{
                    this.fNode.x = 0;
                }))));
            }else if(runType == 4){
                this.fNode.runAction(cc.repeatForever(cc.sequence(cc.delayTime(3),cc.moveBy(0.2,-140,0),cc.callFunc(()=>{
                    let fPosX = this.fNode.x;
                    for(var i = 0;i < this._childNode.length;i++){
                        if(this._childNode[i].x+fPosX <= -250){
                            this._childNode[i].x = 770-fPosX;
                        }
                    }
                }))));
            }
        }
        for(let i = 8;i < obj.length;i++){
            this._showData[i] = false;
        }
        if(this.type == 2 || this.type == 3){
            if(runType == 3){
                this.schedule(this.refreshData,refreshTime);//refreshTime
            }
        }
    },
    refreshData(){
        var node1tag = parseInt(Math.random() * this._childNode.length);
        var addTag = parseInt(Math.random() * (this._childNode.length-2)) + 1;
        var node2tag = (node1tag + addTag)%this._childNode.length;
        var node1 = this._childNode[node1tag];
        var node2 = this._childNode[node2tag];
        var data1 = -1;
        var data2 = -1;
        for(var i = 0;i < this._showData.length;i++){
            if(this._showData[i] == false){
                if(data1 == -1){
                    data1 = i;
                }else if(data2 == -1){
                    data2 = i;
                    break;
                }
            }
        }
        if(data1 != -1){
            node1.getComponent('lieyou_qGamemoreGame_icon').setData(this._obj[data1],this.touchType);
            this._showData[this._childNodeTag[node1tag]] = false;
            this._showData[data1] = true;
            this._childNodeTag[node1tag] = data1;
            if(data2 != -1){
                node2.getComponent('lieyou_qGamemoreGame_icon').setData(this._obj[data2],this.touchType);
                this._showData[this._childNodeTag[node2tag]] = false;
                this._showData[data2] = true;
                this._childNodeTag[node2tag] = data2;
            }
        }else{
            node1.getComponent('lieyou_qGamemoreGame_icon').setData(this._obj[this._childNodeTag[node2tag]],this.touchType);
            node2.getComponent('lieyou_qGamemoreGame_icon').setData(this._obj[this._childNodeTag[node1tag]],this.touchType);
            var tagnode2 = this._childNodeTag[node2tag];
            this._childNodeTag[node2tag] = this._childNodeTag[node1tag];
            this._childNodeTag[node1tag] = tagnode2;
        }
    },
    refreshMoreGameNodePos(){
        let type = this.type;
        let deltaX = 1;
        let deltaY = 1;
        for(let i = 0;i<this._moreGameNode.length;i++){
            let node = this._moreGameNode[i];
            let endPos = node.endPos;
            let begPos = node.begPos;
            if(type == 1){
                node.x += deltaX;
                if(node.x >= endPos.x){
                    node.x = begPos.x;
                }
            }else{
                node.y += deltaY;
                if(node.y >= endPos.y){
                    node.y = begPos.y;
                }
            }
        }
    },
    myMove(node,endPos,begPos){
        this._moreGameNode.push(node);
        node.endPos = endPos;
        node.begPos = begPos;
        // var speed = 50;
        // var time = node.getPosition().sub(endPos).mag()/speed;
        // node.runAction(cc.sequence(cc.moveTo(time,endPos),cc.callFunc(()=>{
        //     node.position = begPos;
        //     this.myMove(node,endPos,begPos);
        // })));
    },
    // update (dt) {},
});
//全民绳索营救
//做杯奶加茶