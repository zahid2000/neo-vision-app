$(function () {
  new WOW().init();
});

$(document).ready(function () {
  "use strict";

  $("#campPopup").modal("show");

  $("#back-to-top").click(function (event) {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      1000,
      "easeInOutExpo"
    );
  });

  // scrollspy-i yalnız #mainNav varsa işə sal
  if ($("#mainNav").length) {
    $("body").scrollspy({
      target: "#mainNav",
      offset: 62,
    });
  }

  if ($(".toggle .toggle-title").hasClass("active")) {
    $(".toggle .toggle-title.active")
      .closest(".toggle")
      .find(".toggle-inner")
      .show();
  }

  $(".toggle .toggle-title").click(function () {
    if ($(this).hasClass("active")) {
      $(this)
        .removeClass("active")
        .closest(".toggle")
        .find(".toggle-inner")
        .slideUp(200);
    } else {
      $(this)
        .addClass("active")
        .closest(".toggle")
        .find(".toggle-inner")
        .slideDown(200);
    }
  });

  if ($("body").width() > 991) {
    $(".dropdown").hover(
      function () {
        $(this).find(".dropdown-menu").stop(true, true).fadeIn();
      },
      function () {
        $(this).find(".dropdown-menu").stop(true, true).fadeOut();
      }
    );
  }

  $(".carousel").carousel();

  $("#clients-list").owlCarousel({
    items: 6,
    autoplay: true,
    smartSpeed: 700,
    loop: true,
    dots: false,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      },
      480: {
        items: 3,
      },
      768: {
        items: 5,
      },
      992: {
        items: 6,
      },
    },
  });

  $("#thought").owlCarousel({
    autoplay: true,
    autoplayTimeout: 3000,
    loop: true,
    margin: 20,
    autoplayHoverPause: true,
    dots: false,
    responsive: {
      0: {
        items: 2,
      },
      768: {
        items: 4,
      },
      992: {
        items: 6,
      },
    },
  });

  $("#ourrefs").owlCarousel({
    autoplay: true,
    autoplayTimeout: 1750,
    loop: true,
    margin: 10,
    autoplayHoverPause: true,
    responsive: {
      0: {
        dots: false,
        items: 3,
      },
      480: {
        dots: false,
        items: 3,
      },
      768: {
        items: 4,
      },
      992: {
        items: 8,
      },
    },
  });

  $("#customers-testimonials").owlCarousel({
    items: 1,
    autoplay: true,
    smartSpeed: 700,
    loop: true,
    autoplayHoverPause: true,
  });

  $(".thumbnail-blogs").hover(
    function () {
      $(this).find(".caption").slideDown(250);
    },
    function () {
      $(this).find(".caption").slideUp(205);
    }
  );

  $(".doValidateAndSend").submit(function (e) {
    var result = true;
    var msg = $(this).attr("data-msg");
    $(this)
      .find(":input")
      .each(function () {
        if ($(this).prop("required")) {
          var val = getVal($(this));
          var type = $(this).attr("type");
          if (val == null || (type == "email" && !isEmail(val))) {
            $(this).removeClass("is-valid").addClass("is-invalid");
            if (result) doToast("e", msg);
            result = false;
            e.preventDefault();
          } else {
            $(this).removeClass("is-invalid").addClass("is-valid");
          }
        }
      });
  });

  $(".doValidateAndAjax").submit(function (e) {
    e.preventDefault();
    var result = true;
    var msg = $(this).attr("data-msg");
    $(this)
      .find(":input")
      .each(function () {
        if ($(this).prop("required")) {
          var val = getVal($(this));
          var type = $(this).attr("type");
          if (val == null || (type == "email" && !isEmail(val))) {
            $(this).removeClass("is-valid").addClass("is-invalid");
            if (result) doToast("e", msg);
            result = false;
          } else {
            $(this).removeClass("is-invalid").addClass("is-valid");
          }
        }
      });
    if (result) {
      var frm = $(this).get(0);
      $.ajax({
        type: frm.method,
        url: frm.action,
        data: new FormData(frm),
        processData: false,
        contentType: false,
        dataType: "json",
        success: function (data) {
          doToast(data.type, data.content);
          if (data.refresh) location.reload();
        },
        error: function (request, status, error) {
          alert(request.responseText);
        },
      });
    }
    return false;
  });

  $("#form-contact").submit(function (e) {
    e.preventDefault();
    $(this).find(".error-message, .sent-message").hide();
    var v1 = $("#namesurname").val();
    var v4 = $("#phone").val();
    var v2 = $("#subject").val();
    var v3 = $("#email").val();
    var v5 = $("#message").val();

    if (
      v1.length < 3 ||
      v2.length < 3 ||
      v3.length < 3 ||
      v4.length < 3 ||
      v5.length < 3
    ) {
      $(".error-message").html($(".error-message").attr("data-msg")).fadeIn();
    } else {
      var frm = $("#form-contact");
      $("#form-contact button").prop("disabled", true);
      $(".loading-form").show();
      $.ajax({
        type: frm.attr("method"),
        url: frm.attr("action"),
        data: frm.serialize(),
        dataType: "json",
        success: function (data) {
          $(".loading-form").hide();
          if (data.type == "e") {
            $(".error-message").html(data.content).fadeIn();
            $("#form-contact button").prop("disabled", false);
          } else {
            $(".sent-message").html(data.content).fadeIn();
          }
        },
        error: function (request, status, error) {
          alert(request.responseText);
        },
      });
    }
    return false;
  });
  // --- DROPDOWN FIX FOR MOBILE WITH ANIMATION ---
  $(document).on("click", ".navbar-nav .dropdown-toggle", function (e) {
    if ($(window).width() < 992) {
      e.preventDefault();
      var $parent = $(this).parent();
      var $menu = $parent.find(".dropdown-menu");
      // Close other open dropdowns with animation
      $(".navbar .dropdown-menu.show")
        .not($menu)
        .slideUp(200, function () {
          $(this).removeClass("show");
        });
      if ($menu.hasClass("show")) {
        $menu.slideUp(200, function () {
          $menu.removeClass("show");
        });
      } else {
        $menu.slideDown(200, function () {
          $menu.addClass("show");
        });
      }
    }
  });
  // Close dropdowns when burger menu is closed
  $(document).on("click", ".navbar-toggler", function () {
    if ($(".navbar-collapse").hasClass("show") === false) {
      $(".navbar .dropdown-menu.show").slideUp(200, function () {
        $(this).removeClass("show");
      });
    }
  });
  // Ekran ölçüsü dəyişəndə və səhifə yüklənəndə bütün style-ları və show class-ını tam sıfırla (desktop üçün)
  function resetDropdownMenus() {
    $(".navbar .dropdown-menu").each(function () {
      $(this).removeAttr("style").removeClass("show");
    });
  }
  $(window).on("resize", function () {
    if ($(window).width() >= 992) {
      resetDropdownMenus();
    }
  });
  if ($(window).width() >= 992) {
    resetDropdownMenus();
  }
  // Angular navbar collapse event trigger for desktop
  function setNavbarOpenOnDesktop() {
    if (window.innerWidth >= 992) {
      var ngComponent =
        window.ng &&
        window.ng.getComponent &&
        window.ng.getComponent(document.querySelector("app-navbar"));
      if (ngComponent) {
        ngComponent.isNavbarCollapsed = false;
      }
    }
  }
  window.addEventListener("resize", setNavbarOpenOnDesktop);
  // Həmçinin səhifə yüklənəndə də yoxla
  setNavbarOpenOnDesktop();
});

function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

function getVal(Jelem) {
  var result = null;
  switch (Jelem.prop("tagName")) {
    case "INPUT":
      switch (Jelem.prop("type")) {
        case "text":
        case "email":
        case "file":
        case "number":
        case "password":
          var val = Jelem.val();
          if (val != "") result = val;
          break;
        case "radio":
        case "checkbox":
          if (Jelem.is(":checked")) result = Jelem.val();
          break;
      }
      break;
    case "SELECT":
      var val = Jelem.children("option:selected").val();
      if (val != -1) result = val;
      break;
    case "TEXTAREA":
      var val = Jelem.val();
      if (val != "") result = val;
      break;
    default:
      result = null;
      break;
  }
  return result;
}

function doToast(ttype, tmsg) {
  switch (ttype) {
    case "s":
      toastr.success(tmsg);
      break;
    case "w":
      toastr.warning(tmsg);
      break;
    case "i":
      toastr.info(tmsg);
      break;
    case "e":
      toastr.error(tmsg);
      break;
    default:
      toastr.info(tmsg);
      break;
  }
}

$(window).scroll(function () {
  if ($(this).scrollTop() < 50) {
    $("nav").removeClass("vesco-top-nav");
    $("#back-to-top").fadeOut();
  } else {
    $("nav").addClass("vesco-top-nav");
    $("#back-to-top").fadeIn();
  }
});
