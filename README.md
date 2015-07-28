#wan-spinner,  a jQuery Spinner
----------

> ![example](https://github.com/feichao/wan-spinner/blob/master/test/img/example.png)

**prepare to use**
> - include jQuery
> - include bulid/wan-spinner.css 
> - include build/wan-sinner.js
> - in your html:
> `<div class="wan-spinner">
<a href="javascript:void(0)" class="minus">-</a>
<input type="text" value="1">
<a href="javascript:void(0)" class="plus">+</a>
</div>`

**how to use**
 

> `$(".wan-spinner").WanSpinner(options);`

**options**

> maxValue: Number, default 999. Set the Max Value of the input.
> 
> minValue: Number, default -999. Set the Min Value of the input.
> 
> step: Number, default 1. Set the Step Value of the input when click plus and minus button.
> 
> start: Number, default 1. Set the Init Value of the input.
> 
> inputWidth: Number default 24. Set the Input Width.
> 
> plusClick: function. A trigger when Plus Button is clicked.
> 
> minusClick: function. A trigger when Minus Button is clicked.
> 
> valueChanged: function. A trigger when Input Value is changed.

