
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/resources/SDK/module/praise/lieyou_praiseDialog.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd54279FqNtESLtML3IrX3k2', 'lieyou_praiseDialog');
// resources/SDK/module/praise/lieyou_praiseDialog.js

"use strict";

window.lieyou_native_praiseDialogPrefab = function () {
  var cantouch = true;
  var addGoldNum = lieyou.Props_Base_Gold * 5;
  var node = new cc.Node();
  var pingbi = new cc.Node();
  node.addChild(pingbi);
  pingbi.addComponent(cc.BlockInputEvents);
  pingbi.addComponent(cc.Sprite);
  pingbi.opacity = 50;
  lieyou_load('q_ad/oppo_native_insters_layerBg.png', function (err, texture) {
    pingbi.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
    pingbi.getComponent(cc.Sprite).sizeMode = cc.Sprite.SizeMode.CUSTOM;
    pingbi.width = lieyou_SdkManager.sdkWinSize.width;
    pingbi.height = lieyou_SdkManager.sdkWinSize.height;
  });
  var bg = new cc.Node();
  node.scale = lieyou_SdkManager._SceneScale;
  pingbi.scale = 1 / lieyou_SdkManager._SceneScale;
  node.addChild(bg);
  bg.addComponent(cc.Sprite);
  lieyou_load('native/bg2.png', function (err, texture) {
    bg.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
  });
  var touchButton = new cc.Node();
  node.addChild(touchButton);
  touchButton.x = 140;
  touchButton.y = -120;
  touchButton.addComponent(cc.Sprite);
  lieyou_load('native/praise.png', function (err, texture) {
    touchButton.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
  });
  var closeButton = new cc.Node();
  node.addChild(closeButton);
  closeButton.x = -140;
  closeButton.y = -120;
  closeButton.addComponent(cc.Sprite);
  lieyou_load('native/close.png', function (err, texture) {
    closeButton.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
  });
  closeButton.on(cc.Node.EventType.TOUCH_START, function (event) {
    if (!cantouch) {
      return;
    }

    node.destroy();
  });
  touchButton.on(cc.Node.EventType.TOUCH_START, function (event) {
    if (!cantouch) {
      return;
    }

    cantouch = false;
    Userdefault.setBoolForKey("alreadyPraise", true);
    lieyou_SdkManager.callAndroid(ACTION_RATE);
    node.runAction(cc.sequence(cc.delayTime(0.1), cc.callFunc(function () {
      var gold = Userdefault.getIntForKey(lieyou.Key_Gold) + addGoldNum;
      Userdefault.setDataForKey(lieyou.Key_Gold, gold);
      node.destroy();
    })));
  });
  var title = new cc.Node();
  title.color = cc.color(0, 0, 0);
  title.width = 500;
  node.addChild(title);
  title.y = 50;
  var label = title.addComponent(cc.Label);
  label.fontSize = 40;
  label.overflow = cc.Label.Overflow.RESIZE_HEIGHT;
  label.verticalAlign = cc.Label.VerticalAlign.BOTTOM;
  label.string = "喜欢这款游戏吗？去给我们留言吧！五星好评送" + addGoldNum + "金币哦！";

  if (addGoldNum == 0) {
    label.string = "喜欢这款游戏吗？去给我们留言五星好评吧！";
  }

  return node;
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xccmVzb3VyY2VzXFxTREtcXG1vZHVsZVxccHJhaXNlXFxsaWV5b3VfcHJhaXNlRGlhbG9nLmpzIl0sIm5hbWVzIjpbIndpbmRvdyIsImxpZXlvdV9uYXRpdmVfcHJhaXNlRGlhbG9nUHJlZmFiIiwiY2FudG91Y2giLCJhZGRHb2xkTnVtIiwibGlleW91IiwiUHJvcHNfQmFzZV9Hb2xkIiwibm9kZSIsImNjIiwiTm9kZSIsInBpbmdiaSIsImFkZENoaWxkIiwiYWRkQ29tcG9uZW50IiwiQmxvY2tJbnB1dEV2ZW50cyIsIlNwcml0ZSIsIm9wYWNpdHkiLCJsaWV5b3VfbG9hZCIsImVyciIsInRleHR1cmUiLCJnZXRDb21wb25lbnQiLCJzcHJpdGVGcmFtZSIsIlNwcml0ZUZyYW1lIiwic2l6ZU1vZGUiLCJTaXplTW9kZSIsIkNVU1RPTSIsIndpZHRoIiwibGlleW91X1Nka01hbmFnZXIiLCJzZGtXaW5TaXplIiwiaGVpZ2h0IiwiYmciLCJzY2FsZSIsIl9TY2VuZVNjYWxlIiwidG91Y2hCdXR0b24iLCJ4IiwieSIsImNsb3NlQnV0dG9uIiwib24iLCJFdmVudFR5cGUiLCJUT1VDSF9TVEFSVCIsImV2ZW50IiwiZGVzdHJveSIsIlVzZXJkZWZhdWx0Iiwic2V0Qm9vbEZvcktleSIsImNhbGxBbmRyb2lkIiwiQUNUSU9OX1JBVEUiLCJydW5BY3Rpb24iLCJzZXF1ZW5jZSIsImRlbGF5VGltZSIsImNhbGxGdW5jIiwiZ29sZCIsImdldEludEZvcktleSIsIktleV9Hb2xkIiwic2V0RGF0YUZvcktleSIsInRpdGxlIiwiY29sb3IiLCJsYWJlbCIsIkxhYmVsIiwiZm9udFNpemUiLCJvdmVyZmxvdyIsIk92ZXJmbG93IiwiUkVTSVpFX0hFSUdIVCIsInZlcnRpY2FsQWxpZ24iLCJWZXJ0aWNhbEFsaWduIiwiQk9UVE9NIiwic3RyaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNBQSxNQUFNLENBQUNDLGdDQUFQLEdBQTBDLFlBQVU7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eW91X25hdGl2ZV9wcmFpc2VEaWFsb2dQcmVmYWIgPSBmdW5jdGlvbigpe1xyXG4gICAgdmFyIGNhbnRvdWNoID0gdHJ1ZTtcclxuICAgIHZhciBhZGRHb2xkTnVtID0gbGlleW91LlByb3BzX0Jhc2VfR29sZCAqIDU7XHJcblxyXG4gICAgdmFyIG5vZGUgPSBuZXcgY2MuTm9kZSgpO1xyXG4gICAgdmFyIHBpbmdiaSA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICBub2RlLmFkZENoaWxkKHBpbmdiaSk7XHJcbiAgICBwaW5nYmkuYWRkQ29tcG9uZW50KGNjLkJsb2NrSW5wdXRFdmVudHMpO1xyXG4gICAgcGluZ2JpLmFkZENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgcGluZ2JpLm9wYWNpdHkgPSA1MDtcclxuICAgIGxpZXlvdV9sb2FkKCdxX2FkL29wcG9fbmF0aXZlX2luc3RlcnNfbGF5ZXJCZy5wbmcnLCAoZXJyLCB0ZXh0dXJlKSA9PiB7XHJcbiAgICAgICAgcGluZ2JpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKHRleHR1cmUpO1xyXG4gICAgICAgIHBpbmdiaS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zaXplTW9kZSA9IGNjLlNwcml0ZS5TaXplTW9kZS5DVVNUT007XHJcbiAgICAgICAgcGluZ2JpLndpZHRoID0gbGlleW91X1Nka01hbmFnZXIuc2RrV2luU2l6ZS53aWR0aDtcclxuICAgICAgICBwaW5nYmkuaGVpZ2h0ID0gbGlleW91X1Nka01hbmFnZXIuc2RrV2luU2l6ZS5oZWlnaHQ7XHJcbiAgICB9KTtcclxuICAgIHZhciBiZyA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICBub2RlLnNjYWxlID0gbGlleW91X1Nka01hbmFnZXIuX1NjZW5lU2NhbGU7XHJcbiAgICBwaW5nYmkuc2NhbGUgPSAxL2xpZXlvdV9TZGtNYW5hZ2VyLl9TY2VuZVNjYWxlO1xyXG4gICAgbm9kZS5hZGRDaGlsZChiZyk7XHJcbiAgICBiZy5hZGRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgIGxpZXlvdV9sb2FkKCduYXRpdmUvYmcyLnBuZycsIChlcnIsIHRleHR1cmUpID0+IHtcclxuICAgICAgICBiZy5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZSh0ZXh0dXJlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHZhciB0b3VjaEJ1dHRvbiA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICBub2RlLmFkZENoaWxkKHRvdWNoQnV0dG9uKTtcclxuICAgIHRvdWNoQnV0dG9uLnggPSAxNDA7XHJcbiAgICB0b3VjaEJ1dHRvbi55ID0gLTEyMDtcclxuICAgIHRvdWNoQnV0dG9uLmFkZENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgbGlleW91X2xvYWQoJ25hdGl2ZS9wcmFpc2UucG5nJywgKGVyciwgdGV4dHVyZSkgPT4ge1xyXG4gICAgICAgIHRvdWNoQnV0dG9uLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKHRleHR1cmUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdmFyIGNsb3NlQnV0dG9uID0gbmV3IGNjLk5vZGUoKTtcclxuICAgIG5vZGUuYWRkQ2hpbGQoY2xvc2VCdXR0b24pO1xyXG4gICAgY2xvc2VCdXR0b24ueCA9IC0xNDA7XHJcbiAgICBjbG9zZUJ1dHRvbi55ID0gLTEyMDtcclxuICAgIGNsb3NlQnV0dG9uLmFkZENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgbGlleW91X2xvYWQoJ25hdGl2ZS9jbG9zZS5wbmcnLCAoZXJyLCB0ZXh0dXJlKSA9PiB7XHJcbiAgICAgICAgY2xvc2VCdXR0b24uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBuZXcgY2MuU3ByaXRlRnJhbWUodGV4dHVyZSk7XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgY2xvc2VCdXR0b24ub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICBpZighY2FudG91Y2gpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBub2RlLmRlc3Ryb3koKTtcclxuICAgIH0sICk7XHJcblxyXG4gICAgdG91Y2hCdXR0b24ub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICBpZighY2FudG91Y2gpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYW50b3VjaCA9IGZhbHNlO1xyXG4gICAgICAgIFVzZXJkZWZhdWx0LnNldEJvb2xGb3JLZXkoXCJhbHJlYWR5UHJhaXNlXCIsdHJ1ZSk7XHJcbiAgICAgICAgbGlleW91X1Nka01hbmFnZXIuY2FsbEFuZHJvaWQoQUNUSU9OX1JBVEUpO1xyXG4gICAgICAgIG5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmRlbGF5VGltZSgwLjEpLGNjLmNhbGxGdW5jKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHZhciBnb2xkID0gVXNlcmRlZmF1bHQuZ2V0SW50Rm9yS2V5KGxpZXlvdS5LZXlfR29sZCkgKyBhZGRHb2xkTnVtO1xyXG4gICAgICAgICAgICBVc2VyZGVmYXVsdC5zZXREYXRhRm9yS2V5KGxpZXlvdS5LZXlfR29sZCxnb2xkKTtcclxuICAgICAgICAgICAgbm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgfSkpKTtcclxuICAgIH0sICk7XHJcblxyXG4gICAgdmFyIHRpdGxlID0gbmV3IGNjLk5vZGUoKTtcclxuICAgIHRpdGxlLmNvbG9yID0gY2MuY29sb3IoMCwwLDApO1xyXG4gICAgdGl0bGUud2lkdGggPSA1MDA7XHJcbiAgICBub2RlLmFkZENoaWxkKHRpdGxlKTtcclxuICAgIHRpdGxlLnkgPSA1MDtcclxuICAgIHZhciBsYWJlbCA9IHRpdGxlLmFkZENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICBsYWJlbC5mb250U2l6ZSA9IDQwO1xyXG4gICAgbGFiZWwub3ZlcmZsb3cgPSBjYy5MYWJlbC5PdmVyZmxvdy5SRVNJWkVfSEVJR0hUO1xyXG4gICAgbGFiZWwudmVydGljYWxBbGlnbiA9IGNjLkxhYmVsLlZlcnRpY2FsQWxpZ24uQk9UVE9NO1xyXG4gICAgbGFiZWwuc3RyaW5nID0gXCLllpzmrKLov5nmrL7muLjmiI/lkJfvvJ/ljrvnu5nmiJHku6znlZnoqIDlkKfvvIHkupTmmJ/lpb3or4TpgIFcIiArIGFkZEdvbGROdW0gKyBcIumHkeW4geWTpu+8gVwiO1xyXG4gICAgaWYoYWRkR29sZE51bSA9PSAwKXtcclxuICAgICAgICBsYWJlbC5zdHJpbmcgPSBcIuWWnOasoui/measvua4uOaIj+WQl++8n+WOu+e7meaIkeS7rOeVmeiogOS6lOaYn+WlveivhOWQp++8gVwiO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICByZXR1cm4gbm9kZTtcclxufVxyXG4iXX0=