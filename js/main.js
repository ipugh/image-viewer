// Directories to sort through
var dirs = {"a": 3, "b": 2};

// Type of file extension
var type = "png";

// Initialize variables
var next = 0;
var prev = 0;
var scroll = 0;
var num = 0;
var id = "";

var dir;
var num;

// Constants
//const dir = "a";
//const numb = 26;

// Loads images on document ready
$(document).ready(function() {everything()});

// Fixes button and large image when the page is resized
$(window).resize(function() {fix()});

// resets displayed image
function fix() {
    closeB();
    displayLarge();
    setButtons();
}

// Puts in header and readies imageClick()
function everything() {
    for (var k in dirs) {
        if (dirs.hasOwnProperty(k)) {
            addImages(k, dirs[k]);
            console.log("Photo set " + k + " loaded");
        }
    }
    imageClick();
}

// Adds images to the document
function addImages(dir, numb) {
    for (var i = 1; i <= numb; i++) {
        $("body").append('<li>' +
        '<div id="'+ dir + '-' + i + '" ' +
        'class="image" ' +
        'style="background-image:url(\'images/' + dir + '/thumbs/' + i + '.' + type + '\')">' +
        '</div></li>')
    }
}

// Handles clicks on images
function imageClick() {
    $('.image').on("click", function() {
        closeB();
        scroll = $(document).scrollTop();
        id = $(this).attr('id');
        dir = id.substring(0, id.indexOf('-'));
        num = id.substring(id.indexOf('-') + 1, id.length);
        displayLarge();
    });
}

// Puts bigger image of photo clicked on the screen
function displayLarge() {
    closeB();
    prev = parseInt(num, 10) - 1;
    next = parseInt(num, 10) + 1;
    $("body").append('<div><img class="displayLarge" src="images/' + dir + '/' + num + '.' + type + '"></div>');
    $(".displayLarge").hide();
    $(".displayLarge").load(function() {
        $(".displayLarge").show();
    });
    $('body').append('<div><img class="x-button" height="32" src="images/x.png"></div>');
    if (prev > 0) {
        $('body').append('<div><img class="left-move" height="32" src="images/prev.png"></div>');
    }
    if (next < dirs[dir] + 1) {
        $('body').append('<div><img class="right-move" height="32" src="images/next.png"></div>');
    }
    setButtons();
    setClicks();
}

// Closes any previously open buttons and image
function closeB() {
    $('.displayLarge').parent().remove();
    $('.x-button').parent().remove();
    $('.left-move').parent().remove();
    $('.right-move').parent().remove();
}

// Places buttons in the correct locations relative to the image
function setButtons() {
    $('.displayLarge').one('load',function() {
        offset = $('.displayLarge').offset();
        $('.x-button').css("left", offset.left + $('.displayLarge').width() - 16);
        $('.x-button').css("top", offset.top - 16 - scroll); // if firefox - 12, if chrome - 24

        $('.left-move').css("left", offset.left - 16);
        $('.left-move').css("top", offset.top - scroll + $('.displayLarge').height()/2);

        $('.right-move').css("left", offset.left + $('.displayLarge').width() - 16);
        $('.right-move').css("top", offset.top - scroll + $('.displayLarge').height()/2);
    });
}

// Handles clicks on buttons
function setClicks() {
    $('.x-button').on("click", function() {
        $('.displayLarge').parent().remove();
        $('.x-button').parent().remove();
        $('.left-move').parent().remove();
        $('.right-move').parent().remove();
    });

    $('.left-move').on("click", function() {
        closeB();
        num--;
        displayLarge();
    });

    $('.right-move').on("click", function() {
        closeB();
        num++;
        displayLarge();
    });
}
