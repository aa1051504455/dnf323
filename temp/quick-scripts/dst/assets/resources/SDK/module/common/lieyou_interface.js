
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/resources/SDK/module/common/lieyou_interface.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '716b65bMWZNV4vPLayhe5az', 'lieyou_interface');
// resources/SDK/module/common/lieyou_interface.js

"use strict";

window.lieyou_interface = {
  showToast: function showToast(title) {
    var node = new cc.Node();
    var fNode = cc.director.getScene();
    fNode.addChild(node);
    node.x = cc.winSize.width / 2;
    node.y = cc.winSize.height / 2;
    node.runAction(cc.sequence(cc.moveBy(0.7, 0, 200).easing(cc.easeBackOut(2)), cc.fadeOut(0.7), cc.removeSelf()));
    var toastbg = new cc.Node();
    node.addChild(toastbg);
    toastbg.addComponent(cc.Sprite);
    lieyou_load('common/toastBg', function (err, texture) {
      toastbg.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
      toastbg.getComponent(cc.Sprite).spriteFrame.insetTop = 13;
      toastbg.getComponent(cc.Sprite).spriteFrame.insetBottom = 13;
      toastbg.getComponent(cc.Sprite).spriteFrame.insetLeft = 13;
      toastbg.getComponent(cc.Sprite).spriteFrame.insetRight = 13;
      toastbg.getComponent(cc.Sprite).sizeMode = cc.Sprite.SizeMode.CUSTOM;
      toastbg.getComponent(cc.Sprite).type = cc.Sprite.Type.SLICED;
      toastbg.width = 40;
      toastbg.height = 93;
    });
    var layout = toastbg.addComponent(cc.Layout);
    layout.resizeMode = cc.Layout.ResizeMode.CONTAINER;
    layout.paddingLeft = 20;
    layout.paddingRight = 20;
    layout.paddingTop = 15;
    layout.paddingBottom = 15;
    var toastLabel = new cc.Node();
    toastbg.addChild(toastLabel);
    var label = toastLabel.addComponent(cc.Label);
    label.fontSize = 35;
    label.string = title;
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xccmVzb3VyY2VzXFxTREtcXG1vZHVsZVxcY29tbW9uXFxsaWV5b3VfaW50ZXJmYWNlLmpzIl0sIm5hbWVzIjpbIndpbmRvdyIsImxpZXlvdV9pbnRlcmZhY2UiLCJzaG93VG9hc3QiLCJ0aXRsZSIsIm5vZGUiLCJjYyIsIk5vZGUiLCJmTm9kZSIsImRpcmVjdG9yIiwiZ2V0U2NlbmUiLCJhZGRDaGlsZCIsIngiLCJ3aW5TaXplIiwid2lkdGgiLCJ5IiwiaGVpZ2h0IiwicnVuQWN0aW9uIiwic2VxdWVuY2UiLCJtb3ZlQnkiLCJlYXNpbmciLCJlYXNlQmFja091dCIsImZhZGVPdXQiLCJyZW1vdmVTZWxmIiwidG9hc3RiZyIsImFkZENvbXBvbmVudCIsIlNwcml0ZSIsImxpZXlvdV9sb2FkIiwiZXJyIiwidGV4dHVyZSIsImdldENvbXBvbmVudCIsInNwcml0ZUZyYW1lIiwiU3ByaXRlRnJhbWUiLCJpbnNldFRvcCIsImluc2V0Qm90dG9tIiwiaW5zZXRMZWZ0IiwiaW5zZXRSaWdodCIsInNpemVNb2RlIiwiU2l6ZU1vZGUiLCJDVVNUT00iLCJ0eXBlIiwiVHlwZSIsIlNMSUNFRCIsImxheW91dCIsIkxheW91dCIsInJlc2l6ZU1vZGUiLCJSZXNpemVNb2RlIiwiQ09OVEFJTkVSIiwicGFkZGluZ0xlZnQiLCJwYWRkaW5nUmlnaHQiLCJwYWRkaW5nVG9wIiwicGFkZGluZ0JvdHRvbSIsInRvYXN0TGFiZWwiLCJsYWJlbCIsIkxhYmVsIiwiZm9udFNpemUiLCJzdHJpbmciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLE1BQU0sQ0FBQ0MsZ0JBQVAsR0FBMEI7QUFDdEJDLEVBQUFBLFNBRHNCLHFCQUNaQyxLQURZLEVBQ047QUFDWixRQUFJQyxJQUFJLEdBQUcsSUFBSUMsRUFBRSxDQUFDQyxJQUFQLEVBQVg7QUFDQSxRQUFJQyxLQUFLLEdBQUdGLEVBQUUsQ0FBQ0csUUFBSCxDQUFZQyxRQUFaLEVBQVo7QUFDQUYsSUFBQUEs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TyxDQUFDYixRQUFSLENBQWlCeUMsVUFBakI7QUFDQSxRQUFJQyxLQUFLLEdBQUdELFVBQVUsQ0FBQzNCLFlBQVgsQ0FBd0JuQixFQUFFLENBQUNnRCxLQUEzQixDQUFaO0FBQ0FELElBQUFBLEtBQUssQ0FBQ0UsUUFBTixHQUFpQixFQUFqQjtBQUNBRixJQUFBQSxLQUFLLENBQUNHLE1BQU4sR0FBZXBELEtBQWY7QUFDSDtBQWpDcUIsQ0FBMUIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIndpbmRvdy5saWV5b3VfaW50ZXJmYWNlID0ge1xyXG4gICAgc2hvd1RvYXN0KHRpdGxlKXtcclxuICAgICAgICBsZXQgbm9kZSA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgbGV0IGZOb2RlID0gY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKTtcclxuICAgICAgICBmTm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICBub2RlLnggPSBjYy53aW5TaXplLndpZHRoLzI7XHJcbiAgICAgICAgbm9kZS55ID0gY2Mud2luU2l6ZS5oZWlnaHQvMjtcclxuICAgICAgICBub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5tb3ZlQnkoMC43LDAsMjAwKS5lYXNpbmcoY2MuZWFzZUJhY2tPdXQoMikpLGNjLmZhZGVPdXQoMC43KSxjYy5yZW1vdmVTZWxmKCkpKTtcclxuICAgICAgICBsZXQgdG9hc3RiZyA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgbm9kZS5hZGRDaGlsZCh0b2FzdGJnKTtcclxuICAgICAgICB0b2FzdGJnLmFkZENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgIGxpZXlvdV9sb2FkKCdjb21tb24vdG9hc3RCZycsIChlcnIsIHRleHR1cmUpID0+IHtcclxuICAgICAgICAgICAgdG9hc3RiZy5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZSh0ZXh0dXJlKTtcclxuICAgICAgICAgICAgdG9hc3RiZy5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZS5pbnNldFRvcCA9IDEzO1xyXG4gICAgICAgICAgICB0b2FzdGJnLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lLmluc2V0Qm90dG9tID0gMTM7XHJcbiAgICAgICAgICAgIHRvYXN0YmcuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUuaW5zZXRMZWZ0ID0gMTM7XHJcbiAgICAgICAgICAgIHRvYXN0YmcuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUuaW5zZXRSaWdodCA9IDEzO1xyXG4gICAgICAgICAgICB0b2FzdGJnLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNpemVNb2RlID0gY2MuU3ByaXRlLlNpemVNb2RlLkNVU1RPTTtcclxuICAgICAgICAgICAgdG9hc3RiZy5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS50eXBlID0gY2MuU3ByaXRlLlR5cGUuU0xJQ0VEO1xyXG4gICAgICAgICAgICB0b2FzdGJnLndpZHRoID0gNDA7XHJcbiAgICAgICAgICAgIHRvYXN0YmcuaGVpZ2h0ID0gOTM7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IGxheW91dCA9IHRvYXN0YmcuYWRkQ29tcG9uZW50KGNjLkxheW91dCk7XHJcbiAgICAgICAgbGF5b3V0LnJlc2l6ZU1vZGUgPSBjYy5MYXlvdXQuUmVzaXplTW9kZS5DT05UQUlORVI7XHJcbiAgICAgICAgbGF5b3V0LnBhZGRpbmdMZWZ0ID0gMjA7XHJcbiAgICAgICAgbGF5b3V0LnBhZGRpbmdSaWdodCA9IDIwO1xyXG4gICAgICAgIGxheW91dC5wYWRkaW5nVG9wID0gMTU7XHJcbiAgICAgICAgbGF5b3V0LnBhZGRpbmdCb3R0b20gPSAxNTtcclxuICAgICAgICBsZXQgdG9hc3RMYWJlbCA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgdG9hc3RiZy5hZGRDaGlsZCh0b2FzdExhYmVsKTtcclxuICAgICAgICBsZXQgbGFiZWwgPSB0b2FzdExhYmVsLmFkZENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgbGFiZWwuZm9udFNpemUgPSAzNTtcclxuICAgICAgICBsYWJlbC5zdHJpbmcgPSB0aXRsZTtcclxuICAgIH0sXHJcbn0iXX0=