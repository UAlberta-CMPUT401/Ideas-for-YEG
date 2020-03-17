jQuery(function($) {
  "use strict";
  var $main_wrapper = $("#appform-wrapper"),
    $modify_form = $main_wrapper.find("#panel-form"),
    $input_wrapper_class = ".appform-group",
    $form_field = $modify_form.find($input_wrapper_class),
    $empty_inputs = $modify_form.find("input").filter(function() {
      return $(this).val() != "";
    }),
    $mobile_menu_button = $(".et_mobile_menu_button"),
    $main_nav = $("#main-nav"),
    $main_header = $("#main-header"),
    $mobile_menu = $("#main-nav nav"),
    $cta = $("#bottom-info-wrapper"),
    $body = $("body"),
    $pricing_tables = $("#packages2"),
    filled_class = "appform-filled";
  $(window).scroll(function() {
    var scrollPercentage = 100 * ($(this).scrollTop() / $body.height()),
      newClass,
      header = $("#main-nav");
    if (scrollPercentage >= 50) {
      newClass = "et_highlight_nav";
    }
    $(header).addClass(newClass);
  });
  $form_field
    .focusin(function() {
      $(this).addClass(filled_class);
    })
    .focusout(function() {
      var $this = $(this);
      if ($this.find("input").val() === "") {
        $this.removeClass(filled_class);
      }
    });
})(jQuery);
