/**
 * Created by NeoNemo on 15.12.2016.
 */
var main = function () {
    var menuItem = $('.main-menu .menu-item'),
        section = function (id) {
            return $('main section[data-id="' + id + '"]');
        },
        contacts = $('.contacts caption'),
        setSections = function () {
            menuItem.each(function () {
                var id = $(this).data('id'),
                    width = $(this).css('width'),
                    targetSection = section(id);
                targetSection.css('max-width', width);
            });
        };
    $(window).resize(function () {
       setSections();
    });
    menuItem.click(function () {
        var id = $(this).data('id'),
            targetSection = section(id);
        targetSection.toggleClass('active');
        setSections();
    });
    contacts.click(function () {
        $(this).siblings('tbody').fadeToggle(300);
    });
    section('diy').click(function () {
        $(this).children('#reg').slideDown(300);
        $('#reg').css('display', 'flex');
    });
    section('life-beauty').click(function () {
        $(this).children('h2').slideDown(300);
    });
    section('smart-house').click(function () {
        $(this).children('h2').slideDown(300);
    });
    section('jonco').click(function () {
        window.location.href = 'http://joncolab.pro';
    });
};
$(document).ready(main);