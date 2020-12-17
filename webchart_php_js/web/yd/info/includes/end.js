// 20200410--IE8 echarts console 未定义问题。
window.console = window.console || (function(){   var c = {}; c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile   = c.clear = c.exception = c.trace = c.assert = function(){};   return c;  })();


var JPlaceHolder = {
	_check: function () {
		return 'placeholder' in document.createElement('input');
	},
	init: function () {
		if (!this._check()) {
			this.fix();
		}
	},
	fix: function () {
		jQuery(':input[placeholder]').each(function (index, element) {
			var self = $(this),
			txt = self.attr('placeholder');
			self.wrap($('<div></div>').css({
				// display: 'inline-block', // form-control does not work
				position: 'relative',
				zoom: '1',
				border: 'none',
				background: 'none',
				padding: 'none',
				margin: 'none'
			}));
			var pos = self.position(),
			h = self.outerHeight(true),
			paddingleft = self.css('padding-left');
			var holder = $('<span></span>').text(txt).css({
				position: 'absolute',
				left: pos.left,
				top: pos.top,
				height: h,
				lineHeight: h + "px",
				paddingLeft: paddingleft,
				color: '#aaa'
			}).appendTo(self.parent());
			self.focusin(function (e) {
			holder.hide();
			}).focusout(function (e) {
			if (!self.val()) {
			holder.show();
			}
			});
			holder.click(function (e) {
			holder.hide();
			self.focus();
			});
		});
	}
};
jQuery(function () {
	JPlaceHolder.init();
});	