;
(function($, window, document, undefined) {
  'use strict';

  var output = function(msg) {
    window.console && console.log(msg);
  };

  var WanSpinner = function(element, options) {
    this.defaults = {
      maxValue: 999,
      minValue: -999,
      step: 1,
      start: 1,
      inputWidth: 25,
      plusClick: function(element, val) {
        return true;
      },
      minusClick: function(element, val) {
        return true;
      },
      exceptionFun: function(exp) {
        return true;
      },
      valueChanged: function(element, val) {
        return true;
      }
    };
    this.options = $.extend({}, this.defaults, options);
    this.options.stepFloat = 1 / this.options.step;
    this.element = $(element);
    this.options.element = this.element;
    this.inputElement = $(this.element.children('input'));

    var initValue = this.inputElement.val() || this.options.start;
    this.inputElement.val(initValue).css('width', this.options.inputWidth);

    this.EXCEPTION = {
      TOO_LARGE: 1,
      NORMAL: 0,
      TOO_SMALL: -1
    };
  };

  WanSpinner.prototype.bind = function() {
    var self = this;
    $(self.element).delegate('.minus', 'click', function() {
      var val;
      if (self.options.stepFloat > 1) {
        val = (+self.inputElement.val() || 0) * self.options.stepFloat - (self.options.step || 1) * self.options.stepFloat;
        val = Math.round(val) / self.options.stepFloat;
      } else {
        val = (+self.inputElement.val() || 0) - (self.options.step || 1);
      }
      if (val < self.options.minValue) {
        typeof(self.options.exceptionFun) === 'function' && self.options.exceptionFun(self.EXCEPTION.TOO_SMALL);
      } else {
        self.inputElement.val(val);
        typeof(self.options.minusClick) === 'function' && self.options.minusClick(self.options.element, val);
        typeof(self.options.valueChanged) === 'function' && self.options.valueChanged(self.options.element, val);
      }
      return false;
    }).delegate('.plus', 'click', function() {
      var val;
      if (self.options.stepFloat > 1) {
        val = (+self.inputElement.val() || 0) * self.options.stepFloat + (self.options.step || 1) * self.options.stepFloat;
        val = Math.round(val) / self.options.stepFloat;
      } else {
        val = (+self.inputElement.val() || 0) + (self.options.step || 1);
      }
      if (val > self.options.maxValue) {
        typeof(self.options.exceptionFun) === 'function' && self.options.exceptionFun(self.EXCEPTION.TOO_LARGE);
      } else {
        self.inputElement.val(val);
        typeof(self.options.plusClick) === 'function' && self.options.plusClick(self.options.element, val);
        typeof(self.options.valueChanged) === 'function' && self.options.valueChanged(self.options.element, val);
      }
      return false;
    }).delegate('input', 'change', function() {
      var val = +self.inputElement.val() || 0;
      if (val > self.options.maxValue) {
        val = self.options.maxValue;
        typeof(self.options.exceptionFun) === 'function' && self.options.exceptionFun(self.EXCEPTION.TOO_LARGE);
      } else if (val < self.options.minValue) {
        val = self.options.minValue;
        typeof(self.options.exceptionFun) === 'function' && self.options.exceptionFun(self.EXCEPTION.TOO_SMALL);
      }
      self.inputElement.val(val);
      typeof(self.options.valueChanged) === 'function' && self.options.valueChanged(self.options.element, val);
    });
  }


  $.fn.WanSpinner = function(options) {
    var wanSpinner = new WanSpinner(this, options);
    wanSpinner.bind();
    return this;
  };

})(jQuery, window, document);
