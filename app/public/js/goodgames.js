/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 35);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return $; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return tween; });
/* unused harmony export isIOs */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return isMobile; });
/* unused harmony export isFireFox */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return isTouch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return $wnd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return $doc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return $body; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return wndW; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return wndH; });
/* unused harmony export docH */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return debounceResize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return throttleScroll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return bodyOverflow; });
/* unused harmony export isBodyOverflowed */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return isInViewport; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return scrollTo; });
/*------------------------------------------------------------------

  Utility

-------------------------------------------------------------------*/
var $ = jQuery;
var tween = window.TweenMax;
var isIOs = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
var isMobile = /Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/g.test(navigator.userAgent || navigator.vendor || window.opera);
var isFireFox = typeof InstallTrigger !== 'undefined';
var isTouch = 'ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch;

// add 'is-mobile' or 'is-desktop' classname to html tag
$('html').addClass(isMobile ? 'is-mobile' : 'is-desktop');

/**
 * window size
 */
var $wnd = $(window);
var $doc = $(document);
var $body = $('body');
var wndW = 0;
var wndH = 0;
var docH = 0;
function getWndSize() {
    wndW = $wnd.width();
    wndH = $wnd.height();
    docH = $doc.height();
}
getWndSize();
$wnd.on('resize load orientationchange', getWndSize);

/**
 * Debounce resize
 */
var resizeArr = [];
var resizeTimeout = void 0;
function debounceResized() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
        if (resizeArr.length) {
            for (var k = 0; k < resizeArr.length; k++) {
                resizeArr[k]();
            }
        }
    }, 50);
}
$wnd.on('ready load resize orientationchange', debounceResized);
debounceResized();

function debounceResize(func) {
    if (typeof func === 'function') {
        resizeArr.push(func);
    } else {
        window.dispatchEvent(new Event('resize'));
    }
}

/**
 * Throttle scroll
 * thanks: https://jsfiddle.net/mariusc23/s6mLJ/31/
 */
var hideOnScrollList = [];
var didScroll = void 0;
var lastST = 0;

$wnd.on('scroll load resize orientationchange', function () {
    if (hideOnScrollList.length) {
        didScroll = true;
    }
});

function hasScrolled() {
    var ST = $wnd.scrollTop();

    var type = ''; // [up, down, end, start]

    if (ST > lastST) {
        type = 'down';
    } else if (ST < lastST) {
        type = 'up';
    } else {
        type = 'none';
    }

    if (ST === 0) {
        type = 'start';
    } else if (ST >= docH - wndH) {
        type = 'end';
    }

    hideOnScrollList.forEach(function (item) {
        if (typeof item === 'function') {
            item(type, ST, lastST, $wnd);
        }
    });

    lastST = ST;
}

setInterval(function () {
    if (didScroll) {
        didScroll = false;
        window.requestAnimationFrame(hasScrolled);
    }
}, 250);

function throttleScroll(callback) {
    hideOnScrollList.push(callback);
}

/**
 * Body Overflow
 * Thanks https://jsfiddle.net/mariusc23/s6mLJ/31/
 * Usage:
 *    // enable
 *    bodyOverflow(1);
 *
 *    // disable
 *    bodyOverflow(0);
 */
var bodyOverflowEnabled = void 0;
var isBodyOverflowing = void 0;
var scrollbarWidth = void 0;
var originalBodyPadding = void 0;
var $headerContent = $('.nk-header > *');
function isBodyOverflowed() {
    return bodyOverflowEnabled;
}
function bodyGetScrollbarWidth() {
    // thx d.walsh
    var scrollDiv = document.createElement('div');
    scrollDiv.className = 'nk-body-scrollbar-measure';
    $body[0].appendChild(scrollDiv);
    var result = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    $body[0].removeChild(scrollDiv);
    return result;
}
function bodyCheckScrollbar() {
    var fullWindowWidth = window.innerWidth;
    if (!fullWindowWidth) {
        // workaround for missing window.innerWidth in IE8
        var documentElementRect = document.documentElement.getBoundingClientRect();
        fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
    }
    isBodyOverflowing = $body[0].clientWidth < fullWindowWidth;
    scrollbarWidth = bodyGetScrollbarWidth();
}
function bodySetScrollbar() {
    if (typeof originalBodyPadding === 'undefined') {
        originalBodyPadding = $body.css('padding-right') || '';
    }

    if (isBodyOverflowing) {
        $body.add($headerContent).css('paddingRight', scrollbarWidth + 'px');
    }
}
function bodyResetScrollbar() {
    $body.css('paddingRight', originalBodyPadding);
    $headerContent.css('paddingRight', '');
}
function bodyOverflow(enable) {
    if (enable && !bodyOverflowEnabled) {
        bodyOverflowEnabled = 1;
        bodyCheckScrollbar();
        bodySetScrollbar();
        $body.css('overflow', 'hidden');
    } else if (!enable && bodyOverflowEnabled) {
        bodyOverflowEnabled = 0;
        $body.css('overflow', '');
        bodyResetScrollbar();
    }
}

/**
 * In Viewport checker
 * return visible percent from 0 to 1
 */
function isInViewport($item, returnRect) {
    var rect = $item[0].getBoundingClientRect();
    var result = 1;

    if (rect.right <= 0 || rect.left >= wndW) {
        result = 0;
    } else if (rect.bottom < 0 && rect.top <= wndH) {
        result = 0;
    } else {
        var beforeTopEnd = Math.max(0, rect.height + rect.top);
        var beforeBottomEnd = Math.max(0, rect.height - (rect.top + rect.height - wndH));
        var afterTop = Math.max(0, -rect.top);
        var beforeBottom = Math.max(0, rect.top + rect.height - wndH);
        if (rect.height < wndH) {
            result = 1 - (afterTop || beforeBottom) / rect.height;
        } else if (beforeTopEnd <= wndH) {
            result = beforeTopEnd / wndH;
        } else if (beforeBottomEnd <= wndH) {
            result = beforeBottomEnd / wndH;
        }
        result = result < 0 ? 0 : result;
    }
    if (returnRect) {
        return [result, rect];
    }
    return result;
}

/**
 * Scroll To
 */
function scrollTo($to, callback) {
    var scrollPos = false;
    var speed = this.options.scrollToAnchorSpeed / 1000;

    if ($to === 'top') {
        scrollPos = 0;
    } else if ($to === 'bottom') {
        scrollPos = Math.max(0, docH - wndH);
    } else if (typeof $to === 'number') {
        scrollPos = $to;
    } else {
        scrollPos = $to.offset ? $to.offset().top : false;
    }

    if (scrollPos !== false && $wnd.scrollTop() !== scrollPos) {
        tween.to($wnd, speed, {
            scrollTo: {
                y: scrollPos,

                // disable autokill on iOs (buggy scrolling)
                autoKill: !isIOs
            },
            ease: Power2.easeOut,
            overwrite: 5
        });
        if (callback) {
            tween.delayedCall(speed, callback);
        }
    } else if (typeof callback === 'function') {
        callback();
    }
}



/***/ }),
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return options; });
/*------------------------------------------------------------------

  Theme Options

-------------------------------------------------------------------*/
var options = {
    scrollToAnchorSpeed: 700,

    templates: {
        secondaryNavbarBackItem: 'Back',

        plainVideoIcon: '<span class="nk-video-icon"><span class="fa fa-play pl-5"></span></span>',
        plainVideoLoadIcon: '<span class="nk-video-icon"><span class="nk-loading-icon"></span></span>',

        audioPlainButton: '<div class="nk-audio-plain-play-pause">\n                <span class="nk-audio-plain-play">\n                    <span class="ion-play ml-3"></span>\n                </span>\n                <span class="nk-audio-plain-pause">\n                    <span class="ion-pause"></span>\n                </span>\n            </div>',

        instagram: '<div class="col-4">\n                <a href="{{link}}" target="_blank">\n                    <img src="{{image}}" alt="{{caption}}" class="nk-img-stretch">\n                </a>\n            </div>',
        instagramLoadingText: 'Loading...',
        instagramFailText: 'Failed to fetch data',
        instagramApiPath: 'php/instagram/instagram.php',

        twitter: '<div class="nk-twitter">\n                <span class="nk-twitter-icon fab fa-twitter"></span>\n                <div class="nk-twitter-name">\n                      <a href="https://twitter.com/{{screen_name}}" target="_blank">@{{screen_name}}</a>\n                </div>\n                <div class="nk-twitter-date">\n                    <span>{{date}}</span>\n                </div>\n                <div class="nk-twitter-text">\n                   {{tweet}}\n                </div>\n            </div>',
        twitterLoadingText: 'Loading...',
        twitterFailText: 'Failed to fetch data',
        twitterApiPath: 'php/twitter/tweet.php',

        countdown: '<div class="nk-hexagon">\n                <div class="nk-hexagon-inner"></div>\n                <span>%D</span>\n                <small>Days</small>\n            </div>\n            <div class="nk-hexagon">\n                <div class="nk-hexagon-inner"></div>\n                <span>%H</span>\n                <small>Hours</small>\n            </div>\n            <div class="nk-hexagon">\n                <div class="nk-hexagon-inner"></div>\n                <span>%M</span>\n                <small>Minutes</small>\n            </div>\n            <div class="nk-hexagon">\n                <div class="nk-hexagon-inner"></div>\n                <span>%S</span>\n                <small>Seconds</small>\n            </div>'
    }
};



/***/ }),
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(36);


/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__parts_options__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__parts_utility__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__parts_setOptions__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__parts_initNavbar__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__parts_initNavbarSide__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__parts_initNavbarDropEffect1__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__parts_initBackgrounds__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__parts_initCounters__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__parts_initStore__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__parts_initNewsBox__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__parts_initAnchors__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__parts_initVideoBlocks__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__parts_initGIF__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__parts_initInfoBoxes__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__parts_initForms__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__parts_initFormsMailChimp__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__parts_initAudioPlayer__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__parts_initImageSlider__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__parts_initFacebook__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__parts_initInstagram__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__parts_initTwitter__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__parts_initPluginStickySidebar__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__parts_initPluginFastClick__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__parts_initPluginNano__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__parts_initPluginJarallax__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__parts_initPluginFlickity__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__parts_initPluginPhotoswipe__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__parts_initPluginModal__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__parts_initPluginTabs__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__parts_initPluginAccordions__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__parts_initPluginCountdown__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__parts_initPluginSeiyriaBootstrapSlider__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__parts_initPluginSummernote__ = __webpack_require__(67);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }























/* Plugins */













/*------------------------------------------------------------------

  Khaki Class

-------------------------------------------------------------------*/

var GOODGAMES = function () {
    function GOODGAMES() {
        _classCallCheck(this, GOODGAMES);

        this.options = __WEBPACK_IMPORTED_MODULE_0__parts_options__["a" /* options */];
    }

    _createClass(GOODGAMES, [{
        key: 'init',
        value: function init() {
            // prt:sc:dm

            var self = this;

            // run sidebar first because of may occurs some troubles with other functions
            self.initPluginStickySidebar();

            self.initNavbar();
            self.initNavbarSide();
            self.initNavbarDropEffect1();
            self.initStore();
            self.initBackgrounds();
            self.initCounters();
            self.initNewsBox();
            self.initAnchors();
            self.initVideoBlocks();
            self.initGIF();
            self.initInfoBoxes();
            self.initForms();
            self.initFormsMailChimp();
            self.initAudioPlayer();
            self.initImageSlider();
            self.initFacebook();
            self.initInstagram();
            self.initTwitter();

            // init plugins
            self.initPluginFastClick();
            self.initPluginNano();
            self.initPluginJarallax();
            self.initPluginFlickity();
            self.initPluginPhotoswipe();
            self.initPluginModal();
            self.initPluginTabs();
            self.initPluginAccordions();
            self.initPluginCountdown();
            self.initPluginSeiyriaBootstrapSlider();
            self.initPluginSummernote();

            return self;
        }
    }, {
        key: 'setOptions',
        value: function setOptions(newOpts) {
            return __WEBPACK_IMPORTED_MODULE_2__parts_setOptions__["a" /* setOptions */].call(this, newOpts);
        }
    }, {
        key: 'debounceResize',
        value: function debounceResize(func) {
            return __WEBPACK_IMPORTED_MODULE_1__parts_utility__["f" /* debounceResize */].call(this, func);
        }
    }, {
        key: 'throttleScroll',
        value: function throttleScroll(callback) {
            return __WEBPACK_IMPORTED_MODULE_1__parts_utility__["k" /* throttleScroll */].call(this, callback);
        }
    }, {
        key: 'bodyOverflow',
        value: function bodyOverflow(type) {
            return __WEBPACK_IMPORTED_MODULE_1__parts_utility__["e" /* bodyOverflow */].call(this, type);
        }
    }, {
        key: 'isInViewport',
        value: function isInViewport($item, returnRect) {
            return __WEBPACK_IMPORTED_MODULE_1__parts_utility__["g" /* isInViewport */].call(this, $item, returnRect);
        }
    }, {
        key: 'scrollTo',
        value: function scrollTo($to, callback) {
            return __WEBPACK_IMPORTED_MODULE_1__parts_utility__["j" /* scrollTo */].call(this, $to, callback);
        }
    }, {
        key: 'initNavbar',
        value: function initNavbar() {
            return __WEBPACK_IMPORTED_MODULE_3__parts_initNavbar__["a" /* initNavbar */].call(this);
        }
    }, {
        key: 'initNavbarSide',
        value: function initNavbarSide() {
            return __WEBPACK_IMPORTED_MODULE_4__parts_initNavbarSide__["a" /* initNavbarSide */].call(this);
        }
    }, {
        key: 'initNavbarDropEffect1',
        value: function initNavbarDropEffect1() {
            return __WEBPACK_IMPORTED_MODULE_5__parts_initNavbarDropEffect1__["a" /* initNavbarDropEffect1 */].call(this);
        }
    }, {
        key: 'initBackgrounds',
        value: function initBackgrounds($context) {
            return __WEBPACK_IMPORTED_MODULE_6__parts_initBackgrounds__["a" /* initBackgrounds */].call(this, $context);
        }
    }, {
        key: 'initCounters',
        value: function initCounters() {
            return __WEBPACK_IMPORTED_MODULE_7__parts_initCounters__["a" /* initCounters */].call(this);
        }
    }, {
        key: 'initStore',
        value: function initStore() {
            return __WEBPACK_IMPORTED_MODULE_8__parts_initStore__["a" /* initStore */].call(this);
        }
    }, {
        key: 'initNewsBox',
        value: function initNewsBox() {
            return __WEBPACK_IMPORTED_MODULE_9__parts_initNewsBox__["a" /* initNewsBox */].call(this);
        }
    }, {
        key: 'initAnchors',
        value: function initAnchors() {
            return __WEBPACK_IMPORTED_MODULE_10__parts_initAnchors__["a" /* initAnchors */].call(this);
        }
    }, {
        key: 'initVideoBlocks',
        value: function initVideoBlocks() {
            return __WEBPACK_IMPORTED_MODULE_11__parts_initVideoBlocks__["a" /* initVideoBlocks */].call(this);
        }
    }, {
        key: 'initGIF',
        value: function initGIF() {
            return __WEBPACK_IMPORTED_MODULE_12__parts_initGIF__["a" /* initGIF */].call(this);
        }
    }, {
        key: 'initInfoBoxes',
        value: function initInfoBoxes() {
            return __WEBPACK_IMPORTED_MODULE_13__parts_initInfoBoxes__["a" /* initInfoBoxes */].call(this);
        }
    }, {
        key: 'initForms',
        value: function initForms() {
            return __WEBPACK_IMPORTED_MODULE_14__parts_initForms__["a" /* initForms */].call(this);
        }
    }, {
        key: 'initFormsMailChimp',
        value: function initFormsMailChimp() {
            return __WEBPACK_IMPORTED_MODULE_15__parts_initFormsMailChimp__["a" /* initFormsMailChimp */].call(this);
        }
    }, {
        key: 'initAudioPlayer',
        value: function initAudioPlayer() {
            return __WEBPACK_IMPORTED_MODULE_16__parts_initAudioPlayer__["a" /* initAudioPlayer */].call(this);
        }
    }, {
        key: 'initImageSlider',
        value: function initImageSlider() {
            return __WEBPACK_IMPORTED_MODULE_17__parts_initImageSlider__["a" /* initImageSlider */].call(this);
        }
    }, {
        key: 'initFacebook',
        value: function initFacebook() {
            return __WEBPACK_IMPORTED_MODULE_18__parts_initFacebook__["a" /* initFacebook */].call(this);
        }
    }, {
        key: 'initInstagram',
        value: function initInstagram() {
            return __WEBPACK_IMPORTED_MODULE_19__parts_initInstagram__["a" /* initInstagram */].call(this);
        }
    }, {
        key: 'initTwitter',
        value: function initTwitter() {
            return __WEBPACK_IMPORTED_MODULE_20__parts_initTwitter__["a" /* initTwitter */].call(this);
        }
    }, {
        key: 'initPluginStickySidebar',
        value: function initPluginStickySidebar() {
            return __WEBPACK_IMPORTED_MODULE_21__parts_initPluginStickySidebar__["a" /* initPluginStickySidebar */].call(this);
        }
    }, {
        key: 'initPluginFastClick',
        value: function initPluginFastClick() {
            return __WEBPACK_IMPORTED_MODULE_22__parts_initPluginFastClick__["a" /* initPluginFastClick */].call(this);
        }
    }, {
        key: 'initPluginNano',
        value: function initPluginNano($context) {
            return __WEBPACK_IMPORTED_MODULE_23__parts_initPluginNano__["a" /* initPluginNano */].call(this, $context);
        }
    }, {
        key: 'initPluginJarallax',
        value: function initPluginJarallax($context) {
            return __WEBPACK_IMPORTED_MODULE_24__parts_initPluginJarallax__["a" /* initPluginJarallax */].call(this, $context);
        }
    }, {
        key: 'initPluginFlickity',
        value: function initPluginFlickity($context) {
            return __WEBPACK_IMPORTED_MODULE_25__parts_initPluginFlickity__["a" /* initPluginFlickity */].call(this, $context);
        }
    }, {
        key: 'initPluginPhotoswipe',
        value: function initPluginPhotoswipe($context) {
            return __WEBPACK_IMPORTED_MODULE_26__parts_initPluginPhotoswipe__["a" /* initPluginPhotoswipe */].call(this, $context);
        }
    }, {
        key: 'initPluginModal',
        value: function initPluginModal($context) {
            return __WEBPACK_IMPORTED_MODULE_27__parts_initPluginModal__["a" /* initPluginModal */].call(this, $context);
        }
    }, {
        key: 'initPluginTabs',
        value: function initPluginTabs($context) {
            return __WEBPACK_IMPORTED_MODULE_28__parts_initPluginTabs__["a" /* initPluginTabs */].call(this, $context);
        }
    }, {
        key: 'initPluginAccordions',
        value: function initPluginAccordions($context) {
            return __WEBPACK_IMPORTED_MODULE_29__parts_initPluginAccordions__["a" /* initPluginAccordions */].call(this, $context);
        }
    }, {
        key: 'initPluginCountdown',
        value: function initPluginCountdown($context) {
            return __WEBPACK_IMPORTED_MODULE_30__parts_initPluginCountdown__["a" /* initPluginCountdown */].call(this, $context);
        }
    }, {
        key: 'initPluginSeiyriaBootstrapSlider',
        value: function initPluginSeiyriaBootstrapSlider($context) {
            return __WEBPACK_IMPORTED_MODULE_31__parts_initPluginSeiyriaBootstrapSlider__["a" /* initPluginSeiyriaBootstrapSlider */].call(this, $context);
        }
    }, {
        key: 'initPluginSummernote',
        value: function initPluginSummernote($context) {
            return __WEBPACK_IMPORTED_MODULE_32__parts_initPluginSummernote__["a" /* initPluginSummernote */].call(this, $context);
        }
    }]);

    return GOODGAMES;
}();

/*------------------------------------------------------------------

  Init GoodGames

-------------------------------------------------------------------*/


window.GoodGames = new GOODGAMES();

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return setOptions; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility__ = __webpack_require__(0);


/*------------------------------------------------------------------

  Set Custom Options

-------------------------------------------------------------------*/
function setOptions(newOpts) {
    var self = this;

    var optsTemplates = __WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */].extend({}, this.options.templates, newOpts && newOpts.templates || {});
    var optsShortcuts = __WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */].extend({}, this.options.shortcuts, newOpts && newOpts.shortcuts || {});
    var optsEvents = __WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */].extend({}, this.options.events, newOpts && newOpts.events || {});

    self.options = __WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */].extend({}, self.options, newOpts);
    self.options.templates = optsTemplates;
    self.options.shortcuts = optsShortcuts;
    self.options.events = optsEvents;
}



/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return initNavbar; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility__ = __webpack_require__(0);


/*------------------------------------------------------------------

  Init Navbar

-------------------------------------------------------------------*/
function initNavbar() {
    var self = this;
    var $navbarTop = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])('.nk-navbar-top');

    // add mobile navbar
    var $mobileNavItems = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])('[data-nav-mobile]');
    if ($mobileNavItems.length) {
        $mobileNavItems.each(function () {
            var $nav = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this).html());
            var $mobileNav = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this).attr('data-nav-mobile'));

            // insert into mobile nav
            $mobileNav.find('.nk-navbar-mobile-content > ul.nk-nav').append($nav);
        });

        var $nav = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])('.nk-navbar-mobile-content > ul.nk-nav');

        // remove background images
        $nav.find('.bg-image, .bg-video').remove();

        // remove mega menus
        $nav.find('.nk-mega-item > .dropdown').each(function () {
            var $drop = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this).children('ul').addClass('dropdown');

            // fix mega menu columns
            $drop.find('> li > label').each(function () {
                Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this).next().addClass('dropdown');
                Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this).parent().addClass('nk-drop-item');
                Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this).replaceWith(Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])('<a href="#"></a>').html(Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this).html()));
            });

            Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this).replaceWith($drop);
        });
        $nav.find('.nk-mega-item').removeClass('nk-mega-item');
    }

    // sticky navbar
    var navbarTop = $navbarTop.length ? $navbarTop.offset().top : 0;
    // fake hidden navbar to prevent page jumping on stick
    var $navbarFake = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])('<div>').hide();
    function onScrollNav() {
        var stickyOn = __WEBPACK_IMPORTED_MODULE_0__utility__["d" /* $wnd */].scrollTop() >= navbarTop;

        if (stickyOn) {
            $navbarTop.addClass('nk-navbar-fixed');
            $navbarFake.show();
        } else {
            $navbarTop.removeClass('nk-navbar-fixed');
            $navbarFake.hide();
        }
    }
    if ($navbarTop.hasClass('nk-navbar-sticky')) {
        __WEBPACK_IMPORTED_MODULE_0__utility__["d" /* $wnd */].on('scroll resize', onScrollNav);
        onScrollNav();

        $navbarTop.after($navbarFake);
        self.debounceResize(function () {
            $navbarFake.height($navbarTop.innerHeight());
        });
    }

    // correct dropdown position
    function correctDropdown($item) {
        if ($item.parent().is('.nk-nav')) {
            var $dropdown = $item.children('.dropdown');
            var $parent = $item.closest('.nk-navbar');
            var $parentContainer = $parent.children('.container');
            $parentContainer = $parentContainer.length ? $parentContainer : $parent;

            // fix right value when sub menu is not hidden
            var css = {
                marginLeft: '',
                marginRight: '',
                marginTop: 0,
                display: 'block'
            };

            $dropdown.css(css);

            var rect = $dropdown[0].getBoundingClientRect();
            var rectContainer = $parentContainer[0].getBoundingClientRect();
            var itemRect = $item[0].getBoundingClientRect();

            // move dropdown from right corner (right corner will check in nav container)
            if (rect.right > rectContainer.right) {
                css.marginLeft = rectContainer.right - rect.right;
                $dropdown.css(css);
                rect = $dropdown[0].getBoundingClientRect();
            }

            // move dropdown from left corner
            if (rect.left < 0) {
                css.marginLeft = -rect.left;
                $dropdown.css(css);
                rect = $dropdown[0].getBoundingClientRect();
            }

            // check if dropdown not under item
            var currentLeftPost = rect.left + (css.marginLeft || 0);
            if (currentLeftPost > itemRect.left) {
                css.marginLeft = (css.marginLeft || 0) - (currentLeftPost - itemRect.left);
            }

            // correct top position
            // 10 - transform value
            css.marginTop = $parent.innerHeight() - $dropdown.offset().top + $parent.offset().top + 5;

            // hide menu
            css.display = 'none';

            $dropdown.css(css);
        }
    }

    // toggle dropdown
    function closeSubmenu($item) {
        if ($item.length) {
            $item.removeClass('open');
            __WEBPACK_IMPORTED_MODULE_0__utility__["l" /* tween */].to($item.children('.dropdown'), 0.3, {
                opacity: 0,
                display: 'none'
            });
            __WEBPACK_IMPORTED_MODULE_0__utility__["d" /* $wnd */].trigger('nk-closed-submenu', [$item]);
        }
    }
    function openSubmenu($item) {
        if (!$item.hasClass('open')) {
            correctDropdown($item);
            __WEBPACK_IMPORTED_MODULE_0__utility__["l" /* tween */].to($item.children('.dropdown'), 0.3, {
                opacity: 1,
                display: 'block'
            });
            $item.addClass('open');
            __WEBPACK_IMPORTED_MODULE_0__utility__["d" /* $wnd */].trigger('nk-opened-submenu', [$item]);
        }
    }
    var dropdownTimeout = void 0;
    $navbarTop.on('mouseenter', 'li.nk-drop-item', function () {
        var $item = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this);
        var $openedSiblings = $item.siblings('.open').add($item.siblings().find('.open')).add($item.parents('.nk-nav:eq(0)').siblings().find('.open')).add($item.parents('.nk-nav:eq(0)').siblings('.open')).add($item.parents('.nk-nav:eq(0)').parent().siblings().find('.open'));

        clearTimeout(dropdownTimeout);
        closeSubmenu($openedSiblings);
        openSubmenu($item);
    }).on('mouseleave', 'li.nk-drop-item', function () {
        var $item = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this);
        clearTimeout(dropdownTimeout);
        dropdownTimeout = setTimeout(function () {
            closeSubmenu($item);
        }, 200);
    });
    $navbarTop.on('mouseleave', function () {
        clearTimeout(dropdownTimeout);
        dropdownTimeout = setTimeout(function () {
            closeSubmenu($navbarTop.find('.open'));
        }, 400);
    });

    // hide / show
    // add / remove solid color
    var $autohideNav = $navbarTop.filter('.nk-navbar-autohide');
    self.throttleScroll(function (type, scroll) {
        var start = 400;
        var hideClass = 'nk-onscroll-hide';
        var showClass = 'nk-onscroll-show';

        // hide / show
        if (type === 'down' && scroll > start) {
            $autohideNav.removeClass(showClass).addClass(hideClass);
        } else if (type === 'up' || type === 'end' || type === 'start') {
            $autohideNav.removeClass(hideClass).addClass(showClass);
        }

        // add solid color
        if ($navbarTop.hasClass('nk-navbar-transparent')) {
            $navbarTop[(scroll > 70 ? 'add' : 'remove') + 'Class']('nk-navbar-solid');
        }
    });
}



/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return initNavbarSide; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility__ = __webpack_require__(0);


/*------------------------------------------------------------------

  Init Navbar Side

-------------------------------------------------------------------*/
function initNavbarSide() {
    var self = this;
    var $overlay = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])('<div class="nk-navbar-overlay">').appendTo(__WEBPACK_IMPORTED_MODULE_0__utility__["b" /* $body */]);

    // side navbars
    var $leftSide = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])('.nk-navbar-left-side');
    var $rightSide = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])('.nk-navbar-right-side');
    var $sideNavs = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])('.nk-navbar-side');

    // toggle navbars
    function updateTogglers() {
        Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])('[data-nav-toggle]').each(function eachNavToggle() {
            var active = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this).attr('data-nav-toggle')).hasClass('open');
            Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this)[(active ? 'add' : 'remove') + 'Class']('active');
        });
    }
    self.toggleSide = function ($side, speed) {
        self[$side.hasClass('open') ? 'closeSide' : 'openSide']($side, speed);
    };
    self.openSide = function ($side, speed) {
        if ($side.css('display') === 'none') {
            return;
        }

        $side.addClass('open');

        // show sidebar
        __WEBPACK_IMPORTED_MODULE_0__utility__["l" /* tween */].to($side, speed || 0.4, {
            x: $side.hasClass('nk-navbar-left-side') ? '100%' : '-100%',
            force3D: true
        });

        // show overlay
        if ($side.hasClass('nk-navbar-overlay-content')) {
            __WEBPACK_IMPORTED_MODULE_0__utility__["l" /* tween */].to($overlay, 0.3, {
                opacity: 0.8,
                display: 'block',
                force3D: true
            });
        }

        updateTogglers();
    };
    self.closeSide = function ($side, speed) {
        $side.each(function eachSide() {
            Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this).removeClass('open');

            // hide sidebar
            __WEBPACK_IMPORTED_MODULE_0__utility__["l" /* tween */].to(this, speed || 0.4, {
                x: '0%',
                force3D: true
            });
            updateTogglers();
        });

        if (!$sideNavs.filter('.nk-navbar-overlay-content.open').length) {
            // hide overlay
            __WEBPACK_IMPORTED_MODULE_0__utility__["l" /* tween */].to($overlay, 0.3, {
                opacity: 0,
                display: 'none',
                force3D: true
            });
        }
    };
    __WEBPACK_IMPORTED_MODULE_0__utility__["c" /* $doc */].on('click', '[data-nav-toggle]', function onNavToggleClick(e) {
        var $nav = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this).attr('data-nav-toggle'));
        if ($nav.hasClass('open')) {
            self.closeSide($nav);
        } else {
            // hide another navigations
            Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])('[data-nav-toggle]').each(function eachNavToggle() {
                self.closeSide(Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this).attr('data-nav-toggle')));
            });

            self.openSide($nav);
        }
        e.preventDefault();
    });

    // overlay
    __WEBPACK_IMPORTED_MODULE_0__utility__["c" /* $doc */].on('click', '.nk-navbar-overlay', function () {
        self.closeSide($sideNavs);
    });

    // hide sidebar if it invisible
    self.debounceResize(function () {
        $sideNavs.filter('.open').each(function eachOpenedNavs() {
            if (!Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this).is(':visible')) {
                self.closeSide(Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this));
            }
        });
    });

    // swipe side navbars
    if (!__WEBPACK_IMPORTED_MODULE_0__utility__["i" /* isTouch */] || typeof Hammer === 'undefined') {
        return;
    }
    var swipeStartSize = 50;
    var $swipeItem = void 0;
    var navSize = void 0;
    var openNav = void 0;
    var closeNav = void 0;
    var isRightSide = void 0;
    var isLeftSide = void 0;
    var isScrolling = 0;
    var swipeDir = void 0;
    var sidePos = false;
    var startSwipe = false;
    var endSwipe = false;

    // strange solution to fix pan events on the latest Chrome
    // https://github.com/hammerjs/hammer.js/issues/1065
    var mc = new Hammer.Manager(document, {
        touchAction: 'auto',
        inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput,
        recognizers: [[Hammer.Pan, { direction: Hammer.DIRECTION_HORIZONTAL }]]
    });

    // If we detect a scroll before a panleft/panright, disable panning
    // thanks: https://github.com/hammerjs/hammer.js/issues/771
    mc.on('panstart', function (e) {
        if (e.additionalEvent === 'panup' || e.additionalEvent === 'pandown') {
            isScrolling = 1;
        }
    });
    // Reenable panning
    mc.on('panend', function (e) {
        if (!isScrolling) {
            if ($swipeItem) {
                var swipeSize = void 0;
                if (sidePos) {
                    if (openNav) {
                        swipeSize = sidePos;
                    } else if (closeNav) {
                        swipeSize = navSize - sidePos;
                    } else {
                        swipeSize = 0;
                    }
                } else {
                    swipeSize = 0;
                }

                var transitionTime = Math.max(0.15, 0.4 * (navSize - swipeSize) / navSize);
                var swiped = 0;

                if (swipeSize && swipeSize > 10) {
                    var velocityTest = Math.abs(e.velocityX) > 0.7;
                    if (swipeSize >= navSize / 3 || velocityTest) {
                        swiped = 1;
                        if (openNav) {
                            self.openSide($swipeItem, transitionTime);
                        } else {
                            self.closeSide($swipeItem, transitionTime);
                        }
                    }
                }
                if (!swiped) {
                    if (openNav) {
                        self.closeSide($swipeItem, transitionTime);
                    } else {
                        self.openSide($swipeItem, transitionTime);
                    }
                }
            }
            openNav = false;
            closeNav = false;
            isRightSide = false;
            isLeftSide = false;
            swipeDir = false;
            sidePos = false;
            $swipeItem = false;
            startSwipe = false;
            endSwipe = false;
        }
        isScrolling = 0;
    });
    mc.on('panleft panright panup pandown', function (e) {
        if (isScrolling) {
            return;
        }

        var isFirst = false;
        var isFinal = e.isFinal;

        if (startSwipe === false) {
            startSwipe = e.center.x;
            isFirst = true;
        }
        endSwipe = e.center.x;

        // init
        if (isFirst) {
            if (e.direction === 2) {
                swipeDir = 'left';
            } else if (e.direction === 4) {
                swipeDir = 'right';
            } else {
                swipeDir = false;
            }

            // right side
            if ($rightSide && $rightSide.length) {
                navSize = $rightSide.width();

                // open
                if (__WEBPACK_IMPORTED_MODULE_0__utility__["n" /* wndW */] - startSwipe <= swipeStartSize && !$rightSide.hasClass('open') && !$leftSide.hasClass('open')) {
                    openNav = 1;
                    isRightSide = 1;

                    // close
                } else if (__WEBPACK_IMPORTED_MODULE_0__utility__["n" /* wndW */] - startSwipe >= navSize - 100 && $rightSide.hasClass('open')) {
                    closeNav = 1;
                    isRightSide = 1;
                }
            }

            // left side
            if ($leftSide && $leftSide.length && !isRightSide && $leftSide.is(':visible')) {
                navSize = $leftSide.width();

                // open
                if (startSwipe <= swipeStartSize && !$rightSide.hasClass('open') && !$leftSide.hasClass('open')) {
                    openNav = 1;
                    isLeftSide = 1;

                    // close
                } else if (startSwipe >= navSize - 100 && $leftSide.hasClass('open')) {
                    closeNav = 1;
                    isLeftSide = 1;
                }
            }

            // swipe item
            if (isLeftSide) {
                $swipeItem = $leftSide;
            } else if (isRightSide) {
                $swipeItem = $rightSide;
            } else {
                $swipeItem = false;
            }

            // move
        } else if (!isFinal && $swipeItem) {
            if (isRightSide && (openNav && swipeDir === 'left' || closeNav && swipeDir === 'right')) {
                // open side navbar
                if (openNav) {
                    sidePos = Math.min(navSize, Math.max(0, startSwipe - endSwipe));
                }

                // close side navbar
                if (closeNav) {
                    var curPos = startSwipe - endSwipe;
                    if (startSwipe < __WEBPACK_IMPORTED_MODULE_0__utility__["n" /* wndW */] - navSize) {
                        curPos = __WEBPACK_IMPORTED_MODULE_0__utility__["n" /* wndW */] - navSize - endSwipe;
                    }
                    sidePos = navSize - Math.abs(Math.max(-navSize, Math.min(0, curPos)));
                }

                __WEBPACK_IMPORTED_MODULE_0__utility__["l" /* tween */].set($swipeItem, {
                    x: -100 * sidePos / navSize + '%'
                });
            } else if (isLeftSide && (openNav && swipeDir === 'right' || closeNav && swipeDir === 'left')) {
                // open mobile navbar
                if (openNav) {
                    sidePos = Math.min(navSize, Math.max(0, endSwipe - startSwipe));
                }

                // close mobile navbar
                if (closeNav) {
                    var curPos2 = endSwipe - startSwipe;
                    if (startSwipe > navSize) {
                        curPos2 = endSwipe - navSize;
                    }
                    sidePos = navSize - Math.abs(Math.max(-navSize, Math.min(0, curPos2)));
                }

                __WEBPACK_IMPORTED_MODULE_0__utility__["l" /* tween */].set($swipeItem, {
                    x: 100 * sidePos / navSize + '%'
                });
            }
        }
    });

    // prevent scrolling when opening/hiding navigation
    window.addEventListener('touchmove', function (e) {
        if (isRightSide || isLeftSide) {
            e.srcEvent.preventDefault();
            e.preventDefault();
        }
    }, { passive: false });
}



/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return initNavbarDropEffect1; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility__ = __webpack_require__(0);


/*------------------------------------------------------------------

  Init Dropdown Effect 1 for side navbars and fullscreen

-------------------------------------------------------------------*/
function initNavbarDropEffect1() {
    var self = this;
    var $navbars = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])('.nk-navbar-side, .nk-navbar-full');

    // add back item for dropdowns
    $navbars.find('.dropdown').prepend('<li class="bropdown-back"><a href="#">' + self.options.templates.secondaryNavbarBackItem + '</a></li>');

    // change height of opened dropdown
    function updateSideNavDropdown($item) {
        var $nav = $item.parents('.nk-navbar:eq(0)');
        var $khNav = $nav.find('.nk-nav');
        var $nanoCont = $khNav.children('.nano-content');
        var $khNavRow = $khNav.parent();
        var $drop = $nav.find('.nk-drop-item.open > .dropdown:not(.closed)');

        if ($drop.length) {
            var dropHeight = $drop.innerHeight();

            // vertical center for dropdown
            if ($khNavRow.hasClass('nk-nav-row-center')) {
                $drop.css({
                    top: 0
                });

                $khNav.hide();
                var nanoHeight = $khNavRow.innerHeight();
                $khNav.show();
                var nanoNavRowHeight = nanoHeight;
                var nanoTop = $khNavRow.offset().top;
                var dropTop = $drop.offset().top;

                var top = nanoTop - dropTop;
                if (dropHeight < nanoNavRowHeight) {
                    top += (nanoHeight - dropHeight) / 2;
                }

                $drop.css({
                    top: top
                });
            }

            $khNav.css('height', dropHeight);
            self.initPluginNano($nav);

            // scroll to top
            __WEBPACK_IMPORTED_MODULE_0__utility__["l" /* tween */].to($nanoCont, 0.3, {
                scrollTo: { y: 0 },
                delay: 0.2
            });
        } else {
            $khNav.css('height', '');
        }
        self.initPluginNano($nav);
    }

    // open / close submenu
    function toggleSubmenu(open, $drop) {
        var $newItems = $drop.find('> .dropdown > li > a');
        var $oldItems = $drop.parent().find('> li > a');

        if (open) {
            $drop.addClass('open').parent().addClass('closed');
        } else {
            $drop.removeClass('open').parent().removeClass('closed');

            var tmp = $newItems;
            $newItems = $oldItems;
            $oldItems = tmp;
        }

        // show items
        __WEBPACK_IMPORTED_MODULE_0__utility__["l" /* tween */].set($newItems, {
            x: open ? '20%' : '-20%',
            opacity: 0,
            display: 'block'
        }, 0.1);
        __WEBPACK_IMPORTED_MODULE_0__utility__["l" /* tween */].staggerTo($newItems, 0.2, {
            x: '0%',
            opacity: 1,
            delay: 0.1
        }, 0.05);

        // hide items
        __WEBPACK_IMPORTED_MODULE_0__utility__["l" /* tween */].staggerTo($oldItems, 0.2, {
            x: open ? '-20%' : '20%',
            opacity: 0
        }, 0.05, function () {
            $oldItems.css('display', 'none');
        });
    }

    $navbars.on('click', '.nk-drop-item > a', function (e) {
        toggleSubmenu(true, Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this).parent());
        updateSideNavDropdown(Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this));
        e.preventDefault();
    });
    $navbars.on('click', '.bropdown-back > a', function (e) {
        toggleSubmenu(false, Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this).parent().parent().parent());
        updateSideNavDropdown(Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this));
        e.preventDefault();
    });
}



/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return initBackgrounds; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility__ = __webpack_require__(0);


/* Bootstrap Backgrounds */
function initBackgrounds() {
    if (typeof MutationObserver === 'undefined') {
        return;
    }

    // fix page backgrounds right offset when body padding changed (for example when showed bootstrap modal).
    var $backgrounds = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])('.nk-page-background-top, .nk-page-background-bottom, .nk-page-background-fixed');
    if ($backgrounds.length) {
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function () {
                var right = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])('body').css('padding-right');
                if (right) {
                    $backgrounds.css('width', 'calc(100% - ' + right + ')');
                } else {
                    $backgrounds.css('width', '');
                }
            });
        });

        observer.observe(__WEBPACK_IMPORTED_MODULE_0__utility__["b" /* $body */][0], { attributes: true, attributeFilter: ['style'] });
    }
}



/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return initCounters; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility__ = __webpack_require__(0);


/*------------------------------------------------------------------

  Init Counters

-------------------------------------------------------------------*/
function initCounters() {
    var self = this;
    var $progressCount = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])('.nk-progress.nk-count');
    var $numberCount = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])('.nk-count:not(.nk-progress)');

    // set default progress
    $progressCount.each(function () {
        Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this).attr('data-nk-count', Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this).attr('data-progress')).attr('data-nk-mask', Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this).attr('data-progress-mask')).find('.nk-progress-line > div').css('width', (Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this).attr('data-nk-count-from') || '0') + '%').find('.nk-progress-percent').html('');
    });

    // set default numbers
    $numberCount.each(function () {
        Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this).attr('data-nk-count', Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this).attr('data-nk-count') || parseInt(Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this).text(), 10)).html(Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this).attr('data-nk-count-from') || '0');
    });

    var countersNum = 1;
    function runCounters() {
        if (!countersNum) {
            return;
        }

        var progress = $progressCount.filter('[data-nk-count]');
        var numbers = $numberCount.filter('[data-nk-count]');
        countersNum = progress.length + numbers.length;

        // progress
        $progressCount.filter('[data-nk-count]').each(function () {
            var $item = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this);
            if (self.isInViewport($item)) {
                var count = {
                    curr: $item.attr('data-nk-count-from') || '0',
                    to: $item.attr('data-nk-count'),
                    mask: $item.attr('data-nk-mask') || '{$}%'
                };
                var $itemLine = $item.find('.nk-progress-line > div');
                var $itemLabel = $item.find('.nk-progress-percent');

                __WEBPACK_IMPORTED_MODULE_0__utility__["l" /* tween */].to($itemLine, 1, {
                    width: count.to + '%'
                });
                __WEBPACK_IMPORTED_MODULE_0__utility__["l" /* tween */].to(count, 1, {
                    curr: count.to,
                    roundProps: 'curr',
                    ease: Circ.easeIn,
                    onUpdate: function onUpdate() {
                        $itemLabel.text(count.mask.replace('{$}', count.curr));
                    }
                });
                $item.removeAttr('data-nk-count');
            }
        });

        // number
        $numberCount.filter('[data-nk-count]').each(function () {
            var $item = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this);
            if (self.isInViewport($item)) {
                var count = {
                    curr: $item.text(),
                    to: $item.attr('data-nk-count')
                };
                $item.removeAttr('data-nk-count data-nk-count-from');
                __WEBPACK_IMPORTED_MODULE_0__utility__["l" /* tween */].to(count, 1, {
                    curr: count.to,
                    roundProps: 'curr',
                    ease: Circ.easeIn,
                    onUpdate: function onUpdate() {
                        $item.text(count.curr);
                    }
                });
            }
        });
    }

    self.throttleScroll(runCounters);
    runCounters();
}



/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return initStore; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility__ = __webpack_require__(0);


/*------------------------------------------------------------------

  Init Store

-------------------------------------------------------------------*/
function initStore() {
    var self = this;

    // scroll to ratings
    __WEBPACK_IMPORTED_MODULE_0__utility__["c" /* $doc */].on('click', 'a.nk-product-rating', function (e) {
        var isHash = this.hash;
        if (isHash) {
            var $hashBlock = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(isHash).parents('.nk-tabs:eq(0)');
            if ($hashBlock.length) {
                self.scrollTo($hashBlock);
            }
            Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])('.nk-tabs').find('[data-toggle="tab"][href="' + isHash + '"]').click();
        }
        e.preventDefault();
    });
}



/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return initNewsBox; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility__ = __webpack_require__(0);


/*------------------------------------------------------------------

 Init News Box

 -------------------------------------------------------------------*/
function initNewsBox() {
    __WEBPACK_IMPORTED_MODULE_0__utility__["c" /* $doc */].on('click', '.nk-news-box .nk-news-box-item', function () {
        var $this = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this);
        var $info = $this.parents('.nk-news-box:eq(0)').find('.nk-news-box-each-info');

        // get data
        var data = {
            title: $this.find('.nk-news-box-item-title').html(),
            img: $this.find('.nk-news-box-item-full-img').attr('src'),
            img_alt: $this.find('.nk-news-box-item-full-img').attr('alt'),
            categories: $this.find('.nk-news-box-item-categories').html(),
            text: $this.find('.nk-news-box-item-text').html(),
            url: $this.find('.nk-news-box-item-url').attr('href'),
            date: $this.find('.nk-news-box-item-date').html()
        };

        // set data
        $info.find('.nk-news-box-item-title').html(data.title);
        if ($info.find('.nk-news-box-item-image > img').length) {
            $info.find('.nk-news-box-item-image > img').attr('src', data.img).attr('alt', data.img_alt);
        } else {
            $info.find('.nk-news-box-item-image').css('background-image', 'url("' + data.img + '")');
        }
        $info.find('.nk-news-box-item-categories').html(data.categories);
        $info.find('.nk-news-box-item-text').html(data.text);
        $info.find('.nk-news-box-item-more').attr('href', data.url);
        $info.find('.nk-news-box-item-date').html(data.date);

        // activate item
        $this.addClass('nk-news-box-item-active').siblings().removeClass('nk-news-box-item-active');
    });

    // click on active item on load
    Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])('.nk-news-box .nk-news-box-item-active').trigger('click');
}



/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return initAnchors; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility__ = __webpack_require__(0);


/*------------------------------------------------------------------

  Anchors

-------------------------------------------------------------------*/
function initAnchors() {
    var self = this;

    // click on anchors
    var $leftSideNav = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])('.nk-navbar-left-side');
    var $rightSideNav = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])('.nk-navbar-right-side');
    function closeNavs() {
        self.closeSide($leftSideNav);
        self.closeSide($rightSideNav);
        self.closeFullscreenNavbar();
    }
    __WEBPACK_IMPORTED_MODULE_0__utility__["c" /* $doc */].on('click', '.navbar a, .nk-navbar a, a.btn, a.nk-btn, a.nk-anchor', function (e) {
        var isHash = this.hash;
        var isURIsame = this.baseURI === window.location.href;

        if (isHash && isURIsame) {
            // sometimes hashs have no valid selector like ##hash, it will throw errors
            try {
                var $hashBlock = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(isHash);
                var hash = isHash.replace(/^#/, '');
                if ($hashBlock.length || hash === 'top' || hash === 'bottom') {
                    // close navigations
                    closeNavs();

                    // scroll to block
                    self.scrollTo($hashBlock.length ? $hashBlock : hash);

                    e.preventDefault();
                }
                // eslint-disable-next-line
            } catch (evt) {}
        }
    });

    // add active class on navbar items
    var $anchorItems = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])('.nk-navbar .nk-nav > li > a[href*="#"]');
    var anchorBlocks = [];
    function hashInArray(item) {
        for (var k = 0; k < anchorBlocks.length; k++) {
            if (anchorBlocks[k].hash === item) {
                return k;
            }
        }
        return false;
    }
    // get all anchors + blocks on the page
    $anchorItems.each(function () {
        var hash = this.hash.replace(/^#/, '');
        if (!hash) {
            return;
        }

        var $item = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this).parent();
        var $block = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])('#' + hash);

        if (hash && $block.length || hash === 'top') {
            var inArray = hashInArray(hash);
            if (inArray === false) {
                anchorBlocks.push({
                    hash: hash,
                    $item: $item,
                    $block: $block
                });
            } else {
                anchorBlocks[inArray].$item = anchorBlocks[inArray].$item.add($item);
            }
        }
    });
    // prepare anchor list and listen for scroll to activate items in navbar
    function updateAnchorItemsPositions() {
        for (var k = 0; k < anchorBlocks.length; k++) {
            var item = anchorBlocks[k];
            var blockTop = 0;
            var blockH = __WEBPACK_IMPORTED_MODULE_0__utility__["m" /* wndH */];
            if (item.$block.length) {
                blockTop = item.$block.offset().top;
                blockH = item.$block.innerHeight();
            }
            item.activate = blockTop - __WEBPACK_IMPORTED_MODULE_0__utility__["m" /* wndH */] / 2;
            item.deactivate = blockTop + blockH - __WEBPACK_IMPORTED_MODULE_0__utility__["m" /* wndH */] / 2;
        }
    }
    function setAnchorActiveItem(type, ST) {
        for (var k = 0; k < anchorBlocks.length; k++) {
            var item = anchorBlocks[k];
            var active = ST >= item.activate && ST < item.deactivate;
            item.$item[active ? 'addClass' : 'removeClass']('active');
        }
    }
    if (anchorBlocks.length) {
        updateAnchorItemsPositions();
        setAnchorActiveItem('static', __WEBPACK_IMPORTED_MODULE_0__utility__["d" /* $wnd */].scrollTop());
        self.throttleScroll(setAnchorActiveItem);
        self.debounceResize(updateAnchorItemsPositions);
    }
}



/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return initVideoBlocks; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility__ = __webpack_require__(0);


/*------------------------------------------------------------------

  Init Video Blocks

-------------------------------------------------------------------*/
function initVideoBlocks() {
    if (typeof window.VideoWorker === 'undefined') {
        return;
    }
    var self = this;

    // init plain video
    function addPlainPlayButton($plainCont) {
        $plainCont.find('.nk-video-plain-toggle').html(self.options.templates.plainVideoIcon);
    }
    function addPlainLoadButton($plainCont) {
        $plainCont.find('.nk-video-plain-toggle').html(self.options.templates.plainVideoLoadIcon);
    }
    Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])('.nk-plain-video[data-video]').each(function () {
        var $plainCont = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this);
        var $plainIframe = void 0;
        var url = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this).attr('data-video');
        var thumb = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this).attr('data-video-thumb');
        var api = new VideoWorker(url, {
            autoplay: 0,
            loop: 0,
            mute: 0,
            controls: 1
        });

        if (api && api.isValid()) {
            var loaded = 0;
            var clicked = 0;

            // add play event
            $plainCont.on('click', function () {
                if (__WEBPACK_IMPORTED_MODULE_0__utility__["h" /* isMobile */]) {
                    window.open(api.url);
                    return;
                }

                if (clicked) {
                    return;
                }
                clicked = 1;

                // add loading button
                if (!loaded) {
                    addPlainLoadButton($plainCont);

                    api.getIframe(function (iframe) {
                        // add iframe
                        $plainIframe = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(iframe);
                        var $parent = $plainIframe.parent();
                        __WEBPACK_IMPORTED_MODULE_0__utility__["l" /* tween */].set(iframe, {
                            opacity: 0
                        });
                        $plainIframe.appendTo($plainCont);
                        $parent.remove();
                        api.play();
                    });
                } else {
                    api.play();
                }
            });

            // add play button
            $plainCont.append('<span class="nk-video-plain-toggle"></span>');
            addPlainPlayButton($plainCont);

            // set thumb
            if (thumb) {
                $plainCont.css('background-image', 'url("' + thumb + '")');
            } else {
                api.getImageURL(function (imgSrc) {
                    $plainCont.css('background-image', 'url("' + imgSrc + '")');
                });
            }

            if (__WEBPACK_IMPORTED_MODULE_0__utility__["h" /* isMobile */]) {
                return;
            }

            api.on('ready', function () {
                api.play();
            });
            api.on('play', function () {
                __WEBPACK_IMPORTED_MODULE_0__utility__["l" /* tween */].to($plainIframe, 0.5, {
                    opacity: 1,
                    onComplete: function onComplete() {
                        // add play button
                        if (!loaded) {
                            addPlainPlayButton($plainCont);
                            loaded = 1;
                        }
                    }
                });

                // pause audio
                if (typeof soundManager !== 'undefined') {
                    soundManager.pauseAll();
                }
            });
            api.on('pause', function () {
                __WEBPACK_IMPORTED_MODULE_0__utility__["l" /* tween */].to($plainIframe, 0.5, {
                    opacity: 0,
                    onComplete: function onComplete() {
                        __WEBPACK_IMPORTED_MODULE_0__utility__["l" /* tween */].set($plainIframe, {
                            opacity: 0
                        });
                        clicked = 0;
                    }
                });
            });
        }
    });
}



/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return initGIF; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility__ = __webpack_require__(0);


/*------------------------------------------------------------------

  Init GIFs

-------------------------------------------------------------------*/
function initGIF() {
    var self = this;

    // load gif in background
    function loadGif(url, cb) {
        var temp = new Image();
        temp.onload = function () {
            cb();
        };
        temp.src = url;
    }

    // play gif
    function playGif(item) {
        var $item = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(item);
        if (!item.gifPlaying) {
            item.gifPlaying = true;
            if (item.khGifLoaded) {
                $item.addClass('nk-gif-playing');
                $item.find('img').attr('src', $item.find('img').attr('data-gif'));
            } else if (!item.khGifLoading) {
                item.khGifLoading = 1;
                $item.addClass('nk-gif-loading');
                loadGif($item.find('img').attr('data-gif'), function () {
                    item.khGifLoaded = 1;
                    $item.removeClass('nk-gif-loading');
                    if (item.gifPlaying) {
                        item.gifPlaying = false;
                        playGif(item);
                    }
                });
            }
        }
    }

    // stop playing gif
    function stopGif(item) {
        var $item = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(item);
        if (item.gifPlaying) {
            item.gifPlaying = false;
            $item.removeClass('nk-gif-playing');
            $item.find('img').attr('src', $item.find('img').attr('data-gif-static'));
        }
    }

    // prepare gif containers
    Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])('.nk-gif').each(function () {
        var $this = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this);
        // add toggle button
        $this.append('<a class="nk-gif-toggle">' + self.options.templates.gifIcon + '</a>');

        // add loading circle
        $this.append('<div class="nk-loading-spinner"><i></i></div>');

        $this.find('img').attr('data-gif-static', $this.find('img').attr('src'));
    });

    // hover gif
    Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])('.nk-gif-hover').on('mouseenter', function () {
        Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this).addClass('hover');
        playGif(this);
    }).on('mouseleave', function () {
        Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this).removeClass('hover');
        stopGif(this);
    });

    // click gif
    Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])('.nk-gif-click').on('click', function () {
        if (this.gifPlaying) {
            Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this).removeClass('hover');
            stopGif(this);
        } else {
            Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this).addClass('hover');
            playGif(this);
        }
    });

    // autoplay in viewport
    var $gifVP = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])('.nk-gif-viewport');
    if ($gifVP.length) {
        self.throttleScroll(function () {
            $gifVP.each(function () {
                var inVP = self.isInViewport(Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this), 1);
                if (inVP[0]) {
                    if (inVP[1].height / __WEBPACK_IMPORTED_MODULE_0__utility__["m" /* wndH */] < 0.7) {
                        if (inVP[0] === 1) {
                            playGif(this);
                        } else {
                            stopGif(this);
                        }
                    } else if (inVP[0] >= 0.7) {
                        playGif(this);
                    } else {
                        stopGif(this);
                    }
                } else {
                    stopGif(this);
                }
            });
        });
    }

    // autoplay gif
    Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])('.nk-gif:not(.nk-gif-click):not(.nk-gif-hover):not(.nk-gif-viewport)').each(function () {
        playGif(this);
    });
}



/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return initInfoBoxes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility__ = __webpack_require__(0);


/*------------------------------------------------------------------

  Init Info Boxes / Alerts

-------------------------------------------------------------------*/
function initInfoBoxes() {
    var self = this;

    // close
    __WEBPACK_IMPORTED_MODULE_0__utility__["c" /* $doc */].on('click', '.nk-info-box .nk-info-box-close', function (e) {
        e.preventDefault();
        var $box = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this).parents('.nk-info-box:eq(0)');
        __WEBPACK_IMPORTED_MODULE_0__utility__["l" /* tween */].to($box, 0.3, {
            opacity: 0,
            onComplete: function onComplete() {
                __WEBPACK_IMPORTED_MODULE_0__utility__["l" /* tween */].to($box, 0.3, {
                    height: 0,
                    padding: 0,
                    margin: 0,
                    display: 'none',
                    onComplete: function onComplete() {
                        self.debounceResize();
                    }
                });
            }
        });
    });
}



/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return initForms; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility__ = __webpack_require__(0);


/*------------------------------------------------------------------

  Init AJAX Forms

-------------------------------------------------------------------*/
function initForms() {
    if (typeof __WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */].validator === 'undefined') {
        return;
    }
    var self = this;

    // Validate Khaki Forms
    Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])('form:not(.nk-form-ajax):not(.nk-mchimp):not([novalidate])').each(function () {
        Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this).validate({
            errorClass: 'nk-error',
            errorElement: 'div',
            errorPlacement: function errorPlacement(error, element) {
                var $parent = element.parent('.input-group');
                if ($parent.length) {
                    $parent.after(error);
                } else {
                    element.after(error);
                }
                self.debounceResize();
            }
        });
    });
    // ajax form
    Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])('form.nk-form-ajax:not([novalidate])').each(function () {
        Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this).validate({
            errorClass: 'nk-error',
            errorElement: 'div',
            errorPlacement: function errorPlacement(error, element) {
                var $parent = element.parent('.input-group');
                if ($parent.length) {
                    $parent.after(error);
                } else {
                    element.after(error);
                }
                self.debounceResize();
            },

            // Submit the form via ajax (see: jQuery Form plugin)
            submitHandler: function submitHandler(form) {
                var $responseSuccess = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(form).find('.nk-form-response-success');
                var $responseError = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(form).find('.nk-form-response-error');
                var $form = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(form);

                __WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */].ajax({
                    type: 'POST',
                    url: $form.attr('action'),
                    data: $form.serialize(),
                    success: function success(response) {
                        response = JSON.parse(response);
                        if (response.type && response.type === 'success') {
                            $responseError.hide();
                            $responseSuccess.html(response.response).show();
                            form.reset();
                        } else {
                            $responseSuccess.hide();
                            $responseError.html(response.response).show();
                        }
                        self.debounceResize();
                    },
                    error: function error(response) {
                        $responseSuccess.hide();
                        $responseError.html(response.responseText).show();
                        self.debounceResize();
                    }
                });
            }
        });
    });
}



/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return initFormsMailChimp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility__ = __webpack_require__(0);


/*------------------------------------------------------------------

  Init MailChimp

-------------------------------------------------------------------*/
function initFormsMailChimp() {
    var $mchimp = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])('form.nk-mchimp');
    if (typeof __WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */].validator === 'undefined' || !$mchimp.length) {
        return;
    }
    var self = this;

    // Additional Validate Methods From MailChimp
    // Validate a multifield birthday
    __WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */].validator.addMethod('mc_birthday', function (date, element, groupingClass) {
        var isValid = false;
        var $fields = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])('input:not(:hidden)', Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(element).closest(groupingClass));
        if ($fields.filter(':filled').length === 0 && this.optional(element)) {
            isValid = true; // None have been filled out, so no error
        } else {
            var dateArray = [];
            dateArray.month = $fields.filter('input[name*="[month]"]').val();
            dateArray.day = $fields.filter('input[name*="[day]"]').val();

            // correct month value
            dateArray.month -= 1;

            var testDate = new Date(1970, dateArray.month, dateArray.day);
            if (testDate.getDate() !== dateArray.day || testDate.getMonth() !== dateArray.month) {
                isValid = false;
            } else {
                isValid = true;
            }
        }
        return isValid;
    }, 'Please enter a valid month and day.');

    // Validate a multifield date
    __WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */].validator.addMethod('mc_date', function (date, element, groupingClass) {
        var isValid = false;
        var $fields = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])('input:not(:hidden)', Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(element).closest(groupingClass));
        if ($fields.filter(':filled').length === 0 && this.optional(element)) {
            isValid = true; // None have been filled out, so no error
        } else {
            var dateArray = [];
            dateArray.month = $fields.filter('input[name*="[month]"]').val();
            dateArray.day = $fields.filter('input[name*="[day]"]').val();
            dateArray.year = $fields.filter('input[name*="[year]"]').val();

            // correct month value
            dateArray.month -= 1;

            // correct year value
            if (dateArray.year.length < 4) {
                dateArray.year = parseInt(dateArray.year, 10) < 50 ? 2000 + parseInt(dateArray.year, 10) : 1900 + parseInt(dateArray.year, 10);
            }

            var testDate = new Date(dateArray.year, dateArray.month, dateArray.day);
            if (testDate.getDate() !== dateArray.day || testDate.getMonth() !== dateArray.month || testDate.getFullYear() !== dateArray.year) {
                isValid = false;
            } else {
                isValid = true;
            }
        }
        return isValid;
    }, 'Please enter a valid date');

    // Validate a multifield phone number
    __WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */].validator.addMethod('mc_phone', function (phoneNumber, element, groupingClass) {
        var isValid = false;
        var $fields = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])('input:filled:not(:hidden)', Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(element).closest(groupingClass));
        if ($fields.length === 0 && this.optional(element)) {
            isValid = true; // None have been filled out, so no error
        } else {
            phoneNumber = $fields.eq(0).val() + $fields.eq(1).val() + $fields.eq(2).val();
            isValid = phoneNumber.length === 10 && phoneNumber.match(/[0-9]{9}/);
        }
        return isValid;
    }, 'Please specify a valid phone number');

    __WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */].validator.addMethod('skip_or_complete_group', function (value, element, groupingClass) {
        var $fields = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])('input:not(:hidden)', Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(element).closest(groupingClass));
        var $fieldsFirst = $fields.eq(0);
        var validator = $fieldsFirst.data('valid_skip') ? $fieldsFirst.data('valid_skip') : __WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */].extend({}, this);
        var numberFilled = $fields.filter(function () {
            return validator.elementValue(this);
        }).length;
        var isValid = numberFilled === 0 || numberFilled === $fields.length;

        // Store the cloned validator for future validation
        $fieldsFirst.data('valid_skip', validator);

        // If element isn't being validated, run each field's validation rules
        if (!Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(element).data('being_validated')) {
            $fields.data('being_validated', true);
            $fields.each(function () {
                validator.element(this);
            });
            $fields.data('being_validated', false);
        }
        return isValid;
    }, __WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */].validator.format('Please supply missing fields.'));

    __WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */].validator.addMethod('skip_or_fill_minimum', function (value, element, options) {
        var $fields = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(options[1], element.form);
        var $fieldsFirst = $fields.eq(0);
        var validator = $fieldsFirst.data('valid_skip') ? $fieldsFirst.data('valid_skip') : __WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */].extend({}, this);
        var numberFilled = $fields.filter(function () {
            return validator.elementValue(this);
        }).length;
        var isValid = numberFilled === 0 || numberFilled >= options[0];
        // Store the cloned validator for future validation
        $fieldsFirst.data('valid_skip', validator);

        // If element isn't being validated, run each skip_or_fill_minimum field's validation rules
        if (!Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(element).data('being_validated')) {
            $fields.data('being_validated', true);
            $fields.each(function () {
                validator.element(this);
            });
            $fields.data('being_validated', false);
        }
        return isValid;
    }, __WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */].validator.format('Please either skip these fields or fill at least {0} of them.'));

    __WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */].validator.addMethod('zipcodeUS', function (value, element) {
        return this.optional(element) || /^\d{5}-\d{4}$|^\d{5}$/.test(value);
    }, 'The specified US ZIP Code is invalid');

    $mchimp.each(function () {
        var $form = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this);
        if (!$form.length) {
            return;
        }

        var validator = $form.validate({
            errorClass: 'nk-error',
            errorElement: 'div',
            // Grouping fields makes jQuery Validation display one error for all the fields in the group
            // It doesn't have anything to do with how the fields are validated (together or separately),
            // it's strictly for visual display of errors
            groups: function groups() {
                var groups = {};
                $form.find('.input-group').each(function () {
                    // TODO: What about non-text inputs like number?
                    var inputs = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this).find('input:text:not(:hidden)');
                    if (inputs.length > 1) {
                        var mergeName = inputs.first().attr('name');
                        var fieldNames = __WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */].map(inputs, function (f) {
                            return f.name;
                        });
                        groups[mergeName.substring(0, mergeName.indexOf('['))] = fieldNames.join(' ');
                    }
                });
                return groups;
            },

            // Place a field's inline error HTML just before the div.input-group closing tag
            errorPlacement: function errorPlacement(error, element) {
                element.closest('.input-group').after(error);
                self.debounceResize();
            },

            // Submit the form via ajax (see: jQuery Form plugin)
            submitHandler: function submitHandler() {
                var $responseSuccess = $form.find('.nk-form-response-success');
                var $responseError = $form.find('.nk-form-response-error');
                var url = $form.attr('action');
                url = url.replace('/post?u=', '/post-json?u=');
                url += '&c=?';

                __WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */].ajax({
                    dataType: 'jsonp',
                    url: url,
                    data: $form.serializeArray(),
                    success: function success(resp) {
                        $responseSuccess.hide();
                        $responseError.hide();

                        // On successful form submission, display a success message and reset the form
                        if (resp.result === 'success') {
                            $responseSuccess.show().html(resp.msg);
                            $form[0].reset();

                            // If the form has errors, display them, inline if possible, or appended to #mce-error-response
                        } else {
                            // Example errors - Note: You only get one back at a time even if you submit several that are bad.
                            // Error structure - number indicates the index of the merge field that was invalid, then details
                            // Object {result: "error", msg: "6 - Please enter the date"}
                            // Object {result: "error", msg: "4 - Please enter a value"}
                            // Object {result: "error", msg: "9 - Please enter a complete address"}

                            // Try to parse the error into a field index and a message.
                            // On failure, just put the dump thing into in the msg letiable.
                            var index = -1;
                            var msg = void 0;
                            try {
                                var parts = resp.msg.split(' - ', 2);
                                if (typeof parts[1] === 'undefined') {
                                    msg = resp.msg;
                                } else {
                                    var i = parseInt(parts[0], 10);
                                    if (i.toString() === parts[0]) {
                                        index = parts[0];
                                        msg = parts[1];
                                    } else {
                                        index = -1;
                                        msg = resp.msg;
                                    }
                                }
                            } catch (e) {
                                index = -1;
                                msg = resp.msg;
                            }

                            try {
                                // If index is -1 if means we don't have data on specifically which field was invalid.
                                // Just lump the error message into the generic response div.
                                if (index === -1) {
                                    $responseError.show().html(msg);
                                } else {
                                    var fieldName = $form.find('input[name]:eq(' + index + ')').attr('name'); // Make sure this exists
                                    var data = {};
                                    data[fieldName] = msg;
                                    validator.showErrors(data);
                                }
                            } catch (e) {
                                $responseError.show().html(msg);
                            }
                        }
                        self.debounceResize();
                    },
                    error: function error(response) {
                        $responseSuccess.hide();
                        $responseError.html(response.responseText).show();
                        self.debounceResize();
                    }
                });
            }
        });
    });

    // Custom validation methods for fields with certain css classes
    __WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */].validator.addClassRules('birthday', { digits: true, mc_birthday: '.datefield' });
    __WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */].validator.addClassRules('datepart', { digits: true, mc_date: '.datefield' });
    __WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */].validator.addClassRules('phonepart', { digits: true, mc_phone: '.phonefield' });
}



/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return initAudioPlayer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility__ = __webpack_require__(0);


/*------------------------------------------------------------------

 Init Audio Player

 -------------------------------------------------------------------*/
function initAudioPlayer() {
    if (typeof soundManager === 'undefined') {
        return;
    }

    var _self = this;
    var progressBusy = false; // busy when user drag progress bar

    /* Plain audio players */
    var $playersPlain = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])('.nk-audio-plain');
    // add play and pause buttons
    $playersPlain.prepend(_self.options.templates.audioPlainButton);
    var PlayersPlain = function PlayersPlain($item) {
        var self = this;
        self.$item = $item;
        self.url = $item.attr('data-src');
        self.$playPauseBtn = $item.find('.nk-audio-plain-play-pause');
        self.$progress = $item.find('.nk-audio-progress-current');

        self.$timer = $item.find('.nk-audio-plain-duration');
        self.$timer.attr('data-duration', self.$timer.text());

        function onPlay() {
            $item.addClass('nk-audio-plain-playing');
        }
        function onStop() {
            self.seek(0);
            self.step();
            self.$item.removeClass('nk-audio-plain-playing');
            self.$timer.text(self.$timer.attr('data-duration'));
        }
        self.api = soundManager.createSound({
            volume: 100,
            whileplaying: function whileplaying() {
                self.step();
            },

            onplay: onPlay,
            onresume: onPlay,
            onpause: function onpause() {
                self.$item.removeClass('nk-audio-plain-playing');
                self.$timer.text(self.$timer.attr('data-duration'));
            },

            onstop: onStop,
            onfinish: onStop,
            onload: function onload(ok) {
                if (!ok && this._iO && this._iO.onerror) {
                    this._iO.onerror();
                }
            }
        });

        self.$playPauseBtn.on('click', function () {
            if (!self.api.paused && self.api.playState && self.api.url) {
                self.pause();
            } else {
                self.play();
            }
        });
    };
    PlayersPlain.prototype = {
        /**
         * Play a song in the playlist.
         * @param  {Number} index Index of the song in the playlist (leave empty to play the first or current).
         */
        play: function play() {
            // pause all players
            soundManager.pauseAll();

            // Begin playing the sound.
            this.api.play({
                url: this.url
            });
        },


        /**
         * Pause the currently playing track.
         */
        pause: function pause() {
            // Puase the sound.
            soundManager.pauseAll();
        },

        /**
         * Seek to a new position in the currently playing track.
         * @param  {Number} per Percentage through the song to skip.
         */
        seek: function seek(per) {
            this.api.setPosition(this.api.duration * per);
        },

        /**
         * The step called within requestAnimationFrame to update the playback position.
         */
        step: function step() {
            var self = this;
            // Determine our current seek position.
            var seek = self.api.position || 0;
            self.progress = seek / self.api.duration;
            self.$timer[0].innerHTML = self.formatTime(Math.round(seek));

            if (!progressBusy) {
                self.$progress[0].style.width = (self.progress * 100 || 0) + '%';
            }
        },


        /**
         * Format the time from seconds to M:SS.
         * @param  {Number} secs Seconds to format.
         * @return {String}      Formatted time.
         */
        formatTime: function formatTime(msec) {
            var secs = Math.round(msec / 1000) || 0;
            var minutes = Math.floor(secs / 60) || 0;
            minutes = (minutes < 10 ? '0' : 0) + minutes;
            var seconds = secs - minutes * 60;
            return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
        }
    };

    // progress
    if (typeof Hammer !== 'undefined') {
        var $progresses = $playersPlain.find('.nk-audio-progress');
        $progresses.each(function () {
            var $curProgressCont = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this);
            var $curProgres = $curProgressCont.children();
            var curApi = void 0;
            var progressW = void 0;
            var progressCurW = void 0;
            var progressStart = false;
            var HammerProgress = new Hammer.Manager($curProgressCont[0]);
            HammerProgress.add(new Hammer.Pan({
                pointers: 1,
                threshold: 0
            }));
            HammerProgress.add(new Hammer.Press({
                time: 1
            }));
            HammerProgress.on('pan press pressup', function (e) {
                // start
                if (e.type === 'press' || progressStart === false) {
                    progressBusy = true;
                    progressW = $curProgressCont.width();
                    progressStart = e.pointers[0].clientX - $curProgressCont[0].getBoundingClientRect().left;
                    $curProgressCont.addClass('hover');
                }

                // each
                progressCurW = Math.min(1, Math.max(0, (progressStart + e.deltaX) / progressW));
                $curProgres[0].style.width = progressCurW * 100 + '%';

                // end
                if (e.isFinal || e.type === 'pressup') {
                    if (!curApi) {
                        curApi = $curProgressCont.parents('.nk-audio-player-main, .nk-audio-plain')[0].audioAPI;
                    }
                    if (curApi) {
                        curApi.seek(progressCurW);
                    }

                    $curProgressCont.removeClass('hover');
                    progressBusy = false;
                    progressStart = false;
                }

                e.preventDefault();
            });
        });
    }

    soundManager.onready(function () {
        if ($playersPlain.length) {
            $playersPlain.each(function () {
                this.audioAPI = new PlayersPlain(Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this));
            });
        }
    });
}



/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return initImageSlider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility__ = __webpack_require__(0);


/*------------------------------------------------------------------

 Init Image Slider

 -------------------------------------------------------------------*/
function initImageSlider() {
    var $sliders = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])('.nk-image-slider');

    // transition animation
    function transitionStart(data, currentSlide, cb) {
        // set new bg
        data.$bgTransition.css({
            'background-image': 'url(\'' + currentSlide.image + '\')'
        });
        __WEBPACK_IMPORTED_MODULE_0__utility__["l" /* tween */].set(data.$bgTransition, {
            scale: 1.4,
            opacity: 0
        });
        __WEBPACK_IMPORTED_MODULE_0__utility__["l" /* tween */].to(data.$bgTransition, 0.5, {
            scale: 1,
            opacity: 1,
            zIndex: -1,
            onComplete: function onComplete() {
                // change default background image
                data.$bg.css({
                    'background-image': 'url(\'' + currentSlide.image + '\')'
                });
                __WEBPACK_IMPORTED_MODULE_0__utility__["l" /* tween */].set(data.$bgTransition, {
                    opacity: 0,
                    zIndex: -2
                });
            }
        });

        // set new content
        __WEBPACK_IMPORTED_MODULE_0__utility__["l" /* tween */].to(data.$contentWrapper, 0.5, {
            opacity: 0,
            onComplete: function onComplete() {
                data.$content.html(currentSlide.content);
                if (currentSlide.content) {
                    __WEBPACK_IMPORTED_MODULE_0__utility__["l" /* tween */].to(data.$contentWrapper, 0.5, {
                        opacity: 1
                    });
                }
                if (cb) {
                    cb();
                }
            }
        });
    }

    // select slide
    var busy = 0;
    function selectSlide($slider) {
        var slideNum = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        if (busy) {
            return;
        }
        busy = 1;
        var data = $slider.data('nk-image-slider');

        // get next slide
        if (slideNum === false) {
            slideNum = data.$thumbs.find('.nk-image-slider-thumbs-active').index() + 1;
        }

        var currentSlide = data.slides[slideNum];

        // in there is no selected slide
        if (typeof currentSlide === 'undefined') {
            slideNum = 0;
            currentSlide = data.slides[slideNum];
        }

        // stop autoplay
        data.stopAutoplay();

        // select thumb
        data.selectThumb(slideNum);

        // start transition
        transitionStart(data, currentSlide, function () {
            // update nano
            if (typeof __WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */].fn.nanoScroller !== 'undefined') {
                data.$content.parent('.nano').nanoScroller();
            }

            // run autoplay
            data.runAutoplay();
            busy = 0;
        });
    }

    // convert time for timer format from ms to ceil second
    function convertTime(time) {
        return Math.ceil(time / 1000);
    }

    // prepare each slider
    $sliders.each(function () {
        var $this = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this);
        var autoplay = parseInt($this.attr('data-autoplay'), 10) || false;
        var slides = [];
        var defaultSlide = 0;

        // parse all slides
        $this.find('.nk-image-slider-item').each(function () {
            var $slide = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this);
            slides.push({
                image: $slide.find('.nk-image-slider-img').attr('src'),
                thumb: $slide.find('.nk-image-slider-img').attr('data-thumb'),
                content: $slide.find('.nk-image-slider-content').html() || ''
            });
        });

        // no slides
        if (!slides.length) {
            $this.remove();
            return;
        }

        // prepare slider inner template
        var thumbs = '';
        slides.forEach(function (item, k) {
            thumbs += '<li class="' + (k === defaultSlide ? 'nk-image-slider-thumbs-active' : '') + '" style="background-image: url(\'' + item.thumb + '\');"><div class="nk-image-slider-thumbs-overlay"></div></li>';
        });
        var template = '\n            <div class="nk-image-slider-bg" style="background-image: url(\'' + slides[defaultSlide].image + '\');"></div>\n            <div class="nk-image-slider-bg-transition"></div>\n            <div class="nk-image-slider-content" style="' + (slides[defaultSlide].content ? '' : 'opacity: 0;') + '">\n                <div class="nano">\n                    <div class="nano-content">' + slides[defaultSlide].content + '</div>\n                </div>\n            </div>\n            <div class="nk-image-slider-thumbs">\n                <ul>' + thumbs + '</ul>\n            </div>\n        ';

        // append template in slider
        $this.append(template);

        // move thumbs cont
        var $thumbs = $this.find('.nk-image-slider-thumbs');
        var $thumbsCont = $thumbs.find('> ul');
        var startX = false;
        var curX = 0;
        var thumbsW = 0;
        var thumbsContW = 0;

        function updateThumbsData() {
            if ($thumbsCont[0]._gsTransform && $thumbsCont[0]._gsTransform.x) {
                curX = $thumbsCont[0]._gsTransform.x;
            } else {
                curX = 0;
            }
            thumbsW = $thumbs.width();
            thumbsContW = $thumbsCont[0].scrollWidth;
        }

        // select current thumb and scroll
        function selectThumb(i) {
            $thumbs.find('li:eq(' + i + ')').addClass('nk-image-slider-thumbs-active').siblings().removeClass('nk-image-slider-thumbs-active');

            //
            var $nextItem = $thumbs.find('li:eq(' + (i + 1) + ')');
            if (!$nextItem.length) {
                $nextItem = $thumbs.find('li:eq(' + 0 + ')');
            }

            // scroll nav
            updateThumbsData();
            var nextLeft = $nextItem.position().left;
            if (nextLeft < 0) {
                __WEBPACK_IMPORTED_MODULE_0__utility__["l" /* tween */].to($thumbsCont, 0.2, {
                    x: curX - nextLeft
                });
            } else {
                var nextW = $nextItem.width();
                if (nextLeft + nextW > thumbsW) {
                    __WEBPACK_IMPORTED_MODULE_0__utility__["l" /* tween */].to($thumbsCont, 0.2, {
                        x: curX - (nextLeft + nextW - thumbsW)
                    });
                }
            }
        }

        var mc = new Hammer.Manager($thumbs[0]);
        mc.add(new Hammer.Pan({
            pointers: 1,
            threshold: 0
        }));
        mc.on('pan press', function (e) {
            e.preventDefault();

            // init
            if (startX === false) {
                startX = curX;
                updateThumbsData();
                $thumbs.addClass('is-dragging');
            }

            // move
            if (thumbsContW > thumbsW) {
                curX = Math.min(0, Math.max(e.deltaX + startX, thumbsW - thumbsContW));
                __WEBPACK_IMPORTED_MODULE_0__utility__["l" /* tween */].set($thumbsCont, {
                    x: curX
                });
            }
            if (e.isFinal) {
                $thumbs.removeClass('is-dragging');
                startX = false;
            }
        });

        // setup autoplay
        var autoplayInterval = void 0;
        var autoplayStart = new Date();
        var autoplayPaused = void 0;
        function stopAutoplay() {
            var dontTouchCount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

            if (!autoplay) {
                return;
            }
            clearInterval(autoplayInterval);
            if (!dontTouchCount) {
                $thumbs.find('.nk-image-slider-thumbs-count').remove();
            }
        }
        function runAutoplay() {
            if (!autoplay) {
                return;
            }
            var $currentThumb = $thumbs.find('.nk-image-slider-thumbs-active');
            var $nextThumb = $currentThumb.next();
            if (!$nextThumb.length) {
                $nextThumb = $thumbs.find('li:eq(0)');
            }

            // remove old timer
            $thumbs.find('.nk-image-slider-thumbs-count').remove();

            // add new timer
            var $timer = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])('<div class="nk-image-slider-thumbs-count"></div>').text(convertTime(autoplay));
            $nextThumb.append($timer);

            autoplayStart = +new Date();

            stopAutoplay(1);
            var prevValue = autoplay;
            autoplayInterval = setInterval(function () {
                if (autoplayPaused) {
                    return;
                }
                var currentTime = autoplayStart + autoplay - new Date();

                // fix if counter > autoplay (occurs when you click on thumbnails)
                if (currentTime > autoplay) {
                    autoplayStart = +new Date();
                    currentTime = autoplay;
                }

                // update value on thumbnail when counter was changed
                if (prevValue !== convertTime(currentTime)) {
                    prevValue = convertTime(currentTime);
                    $timer.text(prevValue);
                }

                // stop autoplay and select next slide
                if (currentTime <= 0) {
                    stopAutoplay();
                    selectSlide($this);
                }
            }, 100);
        }
        function pauseAutoplay() {
            autoplayPaused = +new Date();
        }
        function resumeAutoplay() {
            autoplayStart += new Date() - autoplayPaused;
            autoplayPaused = false;
        }

        // save slider data
        var data = {
            slides: slides,
            autoplay: autoplay,
            $thumbs: $thumbs,
            $thumbsCont: $thumbsCont,
            $content: $this.find('.nk-image-slider-content .nano-content'),
            $contentWrapper: $this.find('.nk-image-slider-content'),
            $bg: $this.find('.nk-image-slider-bg'),
            $bgTransition: $this.find('.nk-image-slider-bg-transition'),
            runAutoplay: runAutoplay,
            stopAutoplay: stopAutoplay,
            pauseAutoplay: pauseAutoplay,
            resumeAutoplay: resumeAutoplay,
            selectThumb: selectThumb
        };
        $this.data('nk-image-slider', data);

        // start autoplay
        runAutoplay();
    });

    // click handler
    __WEBPACK_IMPORTED_MODULE_0__utility__["c" /* $doc */].on('click', '.nk-image-slider .nk-image-slider-thumbs li:not(.nk-image-slider-thumbs-active)', function () {
        var $li = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this);
        var $slider = $li.parents('.nk-image-slider:eq(0)');
        selectSlide($slider, $li.index());
    });

    // pause autoplay on mouseenter
    __WEBPACK_IMPORTED_MODULE_0__utility__["c" /* $doc */].on('mouseenter', '.nk-image-slider', function () {
        var data = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this).data('nk-image-slider');
        if (data) {
            data.pauseAutoplay();
        }
    });
    __WEBPACK_IMPORTED_MODULE_0__utility__["c" /* $doc */].on('mouseleave', '.nk-image-slider', function () {
        var data = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this).data('nk-image-slider');
        if (data) {
            data.resumeAutoplay();
        }
    });
}



/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return initFacebook; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility__ = __webpack_require__(0);


/*------------------------------------------------------------------

  Facebook

-------------------------------------------------------------------*/
function initFacebook() {
    if (!Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])('.fb-page').length) {
        return;
    }

    __WEBPACK_IMPORTED_MODULE_0__utility__["b" /* $body */].append('<div id="fb-root"></div>');

    (function (d, s, id) {
        if (window.location.protocol === 'file:') {
            return;
        }
        var fjs = d.getElementsByTagName(s)[0];

        if (d.getElementById(id)) {
            return;
        }

        var js = d.createElement(s);js.id = id;
        js.src = '//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4';
        fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
}



/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return initInstagram; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility__ = __webpack_require__(0);


/*------------------------------------------------------------------

  Init Instagram

-------------------------------------------------------------------*/
function initInstagram() {
    var self = this;
    var $instagram = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])('.nk-instagram');
    if (!$instagram.length || !self.options.templates.instagram) {
        return;
    }

    /**
     * Templating a instagram item using '{{ }}' braces
     * @param  {Object} data Instagram item details are passed
     * @return {String} Templated string
     */
    function templating(data, temp) {
        var tempVariables = ['link', 'image', 'caption'];

        for (var i = 0, len = tempVariables.length; i < len; i++) {
            temp = temp.replace(new RegExp('{{' + tempVariables[i] + '}}', 'gi'), data[tempVariables[i]]);
        }

        return temp;
    }

    $instagram.each(function () {
        var $this = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this);
        var options = {
            userID: $this.attr('data-instagram-user-id') || null,
            count: $this.attr('data-instagram-count') || 6,
            template: $this.attr('data-instagram-template') || self.options.templates.instagram,
            quality: $this.attr('data-instagram-quality') || 'sm', // sm, md, lg
            loadingText: self.options.templates.instagramLoadingText,
            failText: self.options.templates.instagramFailText,
            apiPath: self.options.templates.instagramApiPath
        };

        // stop if running in file protocol
        if (window.location.protocol === 'file:') {
            $this.html('<div class="col-12">' + options.failText + '</div>');
            // eslint-disable-next-line
            console.error('You should run you website on webserver with PHP to get working Instagram');
            return;
        }

        $this.html('<div class="col-12">' + options.loadingText + '</div>');

        // Fetch instagram images
        __WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */].getJSON(options.apiPath, {
            userID: options.userID,
            count: options.count
        }, function (response) {
            $this.html('');

            for (var i = 0; i < options.count; i++) {
                var instaItem = false;
                if (response[i]) {
                    instaItem = response[i];
                } else if (response.statuses && response.statuses[i]) {
                    instaItem = response.statuses[i];
                } else {
                    break;
                }

                var resolution = 'thumbnail';
                if (options.quality === 'md') {
                    resolution = 'low_resolution';
                }
                if (options.quality === 'lg') {
                    resolution = 'standard_resolution';
                }

                var tempData = {
                    link: instaItem.link,
                    image: instaItem.images[resolution].url,
                    caption: instaItem.caption
                };

                $this.append(templating(tempData, options.template));
            }

            // resize window
            self.debounceResize();
        }).fail(function (a) {
            $this.html('<div class="col-12">' + options.failText + '</div>');
            __WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */].error(a.responseText);
        });
    });
}



/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return initTwitter; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility__ = __webpack_require__(0);


/*------------------------------------------------------------------

  Init Twitter

-------------------------------------------------------------------*/
function initTwitter() {
    var self = this;
    var $twtFeeds = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])('.nk-twitter-list');
    if (!$twtFeeds.length || !self.options.templates.twitter) {
        return;
    }

    /**
     * Templating a tweet using '{{ }}' braces
     * @param  {Object} data Tweet details are passed
     * @return {String}      Templated string
     */
    function templating(data, temp) {
        var tempVariables = ['date', 'tweet', 'avatar', 'url', 'retweeted', 'screen_name', 'user_name'];

        for (var i = 0, len = tempVariables.length; i < len; i++) {
            temp = temp.replace(new RegExp('{{' + tempVariables[i] + '}}', 'gi'), data[tempVariables[i]]);
        }

        return temp;
    }

    $twtFeeds.each(function () {
        var $this = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this);
        var options = {
            username: $this.attr('data-twitter-user-name') || null,
            list: null,
            hashtag: $this.attr('data-twitter-hashtag') || null,
            count: $this.attr('data-twitter-count') || 2,
            hideReplies: $this.attr('data-twitter-hide-replies') === 'true',
            template: $this.attr('data-twitter-template') || self.options.templates.twitter,
            loadingText: self.options.templates.twitterLoadingText,
            failText: self.options.templates.twitterFailText,
            apiPath: self.options.templates.twitterApiPath
        };

        // stop if running in file protocol
        if (window.location.protocol === 'file:') {
            $this.html(options.failText);
            // eslint-disable-next-line
            console.error('You should run you website on webserver with PHP to get working Twitter');
            return;
        }

        // Set loading
        $this.html('<span>' + options.loadingText + '</span>');

        // Fetch tweets
        __WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */].getJSON(options.apiPath, {
            username: options.username,
            list: options.list,
            hashtag: options.hashtag,
            count: options.count,
            exclude_replies: options.hideReplies
        }, function (twt) {
            $this.html('');

            for (var i = 0; i < options.count; i++) {
                var tweet = false;
                if (twt[i]) {
                    tweet = twt[i];
                } else if (twt.statuses && twt.statuses[i]) {
                    tweet = twt.statuses[i];
                } else {
                    break;
                }

                var tempData = {
                    user_name: tweet.user.name,
                    date: tweet.date_formatted,
                    tweet: tweet.text_entitled,
                    avatar: '<img src="' + tweet.user.profile_image_url + '" />',
                    url: 'https://twitter.com/' + tweet.user.screen_name + '/status/' + tweet.id_str,
                    retweeted: tweet.retweeted,
                    screen_name: tweet.user.screen_name
                };

                $this.append(templating(tempData, options.template));
            }

            // resize window
            self.debounceResize();
        }).fail(function (a) {
            $this.html(options.failText);
            __WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */].error(a.responseText);
        });
    });
}



/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return initPluginStickySidebar; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility__ = __webpack_require__(0);


/*------------------------------------------------------------------

  Init Plugin Sticky Sidebar

-------------------------------------------------------------------*/
function initPluginStickySidebar() {
    if (typeof __WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */].fn.stick_in_parent === 'undefined') {
        return;
    }

    Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])('.nk-sidebar-sticky').each(function () {
        var $this = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this);
        var $parent = $this.parent();

        $parent.addClass('nk-sidebar-sticky-parent');

        $this.wrapInner('<div>').children().stick_in_parent({
            parent: $parent,
            recalc_every: 50,
            offset_top: parseInt($this.attr('data-offset-top'), 10) || 130,

            // fixed ADS reloading issue https://github.com/leafo/sticky-kit/issues/45
            spacer: false
        })

        // we need to set min height on parent block (in theme it is equal height column) to prevent sidebar content jumping
        .on('sticky_kit:unbottom sticky_kit:stick sticky_kit:bottom', function () {
            $parent.css('min-height', Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this).height());
        }).on('sticky_kit:unstick', function () {
            $parent.css('min-height', '');
        });
    });
}



/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return initPluginFastClick; });
/* FastClick */
function initPluginFastClick() {
    if (typeof FastClick !== 'undefined') {
        FastClick.attach(document.body);
    }
}



/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return initPluginNano; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility__ = __webpack_require__(0);


/* Nano Scroller */
function initPluginNano($context) {
    if (typeof __WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */].fn.nanoScroller !== 'undefined') {
        ($context || __WEBPACK_IMPORTED_MODULE_0__utility__["c" /* $doc */]).find('.nano').nanoScroller();
    }
}



/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return initPluginJarallax; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility__ = __webpack_require__(0);


/* Jarallax */
function initPluginJarallax() {
    if (typeof __WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */].fn.jarallax === 'undefined') {
        return;
    }
    var self = this;

    // video backgrounds
    Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])('.bg-video[data-video]').each(function () {
        Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this).attr('data-jarallax-video', Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this).attr('data-video'));
        Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this).removeAttr('data-video');
    });

    // primary parallax
    Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])('.bg-image-parallax, .bg-video-parallax').jarallax({
        speed: self.options.parallaxSpeed
    });

    // video without parallax
    Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])('.bg-video:not(.bg-video-parallax)').jarallax({
        speed: 1
    });
}



/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return initPluginFlickity; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility__ = __webpack_require__(0);


/* Flickity */
function initPluginFlickity() {
    if (typeof window.Flickity === 'undefined') {
        return;
    }

    function addDefaultArrows($carousel) {
        Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])('<div class="nk-flickity-arrow nk-flickity-arrow-prev"><span class="ion-ios-arrow-back"></span></div>').on('click', function () {
            $carousel.flickity('previous');
        }).appendTo($carousel);

        Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])('<div class="nk-flickity-arrow nk-flickity-arrow-next"><span class="ion-ios-arrow-forward"></span></div>').on('click', function () {
            $carousel.flickity('next');
        }).appendTo($carousel);
    }

    // prevent click event fire when drag carousel
    function noClickEventOnDrag($carousel) {
        $carousel.on('dragStart.flickity', function () {
            Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this).find('.flickity-viewport').addClass('is-dragging');
        });
        $carousel.on('dragEnd.flickity', function () {
            Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this).find('.flickity-viewport').removeClass('is-dragging');
        });
    }

    // carousel
    Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])('.nk-carousel > .nk-carousel-inner').each(function () {
        Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this).flickity({
            pageDots: Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this).parent().attr('data-dots') === 'true' || false,
            autoPlay: parseFloat(Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this).parent().attr('data-autoplay')) || false,
            prevNextButtons: false,
            wrapAround: true,
            imagesLoaded: true,
            cellAlign: Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this).parent().attr('data-cell-align') || 'center'
        });
        if (Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this).parent().attr('data-arrows') === 'true') {
            addDefaultArrows(Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this));
        }
        noClickEventOnDrag(Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this));
    });
}



/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return initPluginPhotoswipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility__ = __webpack_require__(0);


/* PhotoSwipe */
function initPluginPhotoswipe() {
    var $gallery = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])('.nk-popup-gallery');
    if (typeof PhotoSwipe === 'undefined' || !$gallery.length) {
        return;
    }

    // prepare photoswipe markup
    var markup = '<div id="gallery" class="pswp" tabindex="-1" role="dialog" aria-hidden="true">\n          <div class="pswp__bg"></div>\n          <div class="pswp__scroll-wrap">\n            <div class="pswp__container">\n              <div class="pswp__item"></div>\n              <div class="pswp__item"></div>\n              <div class="pswp__item"></div>\n            </div>\n            <div class="pswp__ui pswp__ui--hidden">\n              <div class="pswp__top-bar">\n                <div class="pswp__counter"></div>\n                <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>\n                <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>\n                <div class="pswp__preloader">\n                  <div class="pswp__preloader__icn">\n                    <div class="pswp__preloader__cut">\n                      <div class="pswp__preloader__donut"></div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n              <div class="pswp__loading-indicator"><div class="pswp__loading-indicator__line"></div></div>\n              <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>\n              <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>\n              <div class="pswp__caption">\n                <div class="pswp__caption__center">\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>';
    __WEBPACK_IMPORTED_MODULE_0__utility__["b" /* $body */].append(markup);

    // init code
    function parseThumbnailElements(el) {
        var thumbElements = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(el).find('a.nk-gallery-item');
        var items = [];
        var descrElement = void 0;
        var size = void 0;
        var item = void 0;

        thumbElements.each(function eachThumbs() {
            descrElement = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this).next('.nk-gallery-item-description');
            size = (this.getAttribute('data-size') || '1920x1080').split('x');

            // create slide object
            item = {
                src: this.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10),
                author: this.getAttribute('data-author')
            };

            if (descrElement.length) {
                item.title = descrElement.html();
            }

            var mediumSrc = this.getAttribute('data-med') || item.src;
            if (mediumSrc) {
                size = (this.getAttribute('data-med-size') || this.getAttribute('data-size') || '1920x1080').split('x');
                // "medium-sized" image
                item.m = {
                    src: mediumSrc,
                    w: parseInt(size[0], 10),
                    h: parseInt(size[1], 10)
                };
            }
            // original image
            item.o = {
                src: item.src,
                w: item.w,
                h: item.h
            };
            items.push(item);
        });

        return items;
    }

    function openPhotoSwipe(index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])('.pswp')[0];
        var items = parseThumbnailElements(galleryElement);

        // define options (if needed)
        var options = {
            captionAndToolbarShowEmptyCaptions: false,
            mainClass: 'pswp--minimal--dark',
            barsSize: { top: 0, bottom: 0 },
            captionEl: true,
            fullscreenEl: false,
            shareEl: false,
            bgOpacity: 0.85,
            tapToClose: true,
            tapToToggleControls: false,
            showHideOpacity: true,

            // Function builds caption markup
            addCaptionHTMLFn: function addCaptionHTMLFn(item, captionEl) {
                // item      - slide object
                // captionEl - caption DOM element
                // isFake    - true when content is added to fake caption container
                //             (used to get size of next or previous caption)

                if (!item.title && !item.author) {
                    captionEl.children[0].innerHTML = '';
                    return false;
                }
                var caption = '';
                if (item.title) {
                    caption += item.title;
                }
                if (item.author) {
                    if (item.title) {
                        caption += '<br>';
                    }
                    caption += '<small>' + item.author + '</small>';
                }
                captionEl.children[0].innerHTML = caption;
                return true;
            },


            galleryUID: galleryElement.getAttribute('data-pswp-uid')
        };

        if (fromURL) {
            if (options.galleryPIDs) {
                // parse real index when custom PIDs are used
                // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                for (var j = 0; j < items.length; j++) {
                    if (items[j].pid === index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }

        // exit if index not found
        if (Number.isNaN(options.index)) {
            return;
        }

        if (disableAnimation) {
            options.showAnimationDuration = 0;
        }

        // Pass data to PhotoSwipe and initialize it
        var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);

        // see: http://photoswipe.com/documentation/responsive-images.html
        var realViewportWidth = void 0;
        var useLargeImages = false;
        var firstResize = true;
        var imageSrcWillChange = void 0;

        gallery.listen('beforeResize', function () {
            var dpiRatio = window.devicePixelRatio ? window.devicePixelRatio : 1;
            dpiRatio = Math.min(dpiRatio, 2.5);
            realViewportWidth = gallery.viewportSize.x * dpiRatio;

            if (realViewportWidth >= 1200 || !gallery.likelyTouchDevice && realViewportWidth > 800 || __WEBPACK_IMPORTED_MODULE_0__utility__["n" /* wndW */] > 1200) {
                if (!useLargeImages) {
                    useLargeImages = true;
                    imageSrcWillChange = true;
                }
            } else if (useLargeImages) {
                useLargeImages = false;
                imageSrcWillChange = true;
            }

            if (imageSrcWillChange && !firstResize) {
                gallery.invalidateCurrItems();
            }

            if (firstResize) {
                firstResize = false;
            }

            imageSrcWillChange = false;
        });

        gallery.listen('gettingData', function (idx, item) {
            if (useLargeImages) {
                item.src = item.o.src;
                item.w = item.o.w;
                item.h = item.o.h;
            } else {
                item.src = item.m.src;
                item.w = item.m.w;
                item.h = item.m.h;
            }
        });

        gallery.init();
    }

    function photoswipeParseHash() {
        var hash = window.location.hash.substring(1);
        var params = {};

        if (hash.length < 5) {
            // pid=1
            return params;
        }

        var vars = hash.split('&');
        for (var _i = 0; _i < vars.length; _i++) {
            if (!vars[_i]) {
                continue;
            }
            var pair = vars[_i].split('=');
            if (pair.length < 2) {
                continue;
            }
            params[pair[0]] = pair[1];
        }

        if (params.gid) {
            params.gid = parseInt(params.gid, 10);
        }

        return params;
    }

    // select all gallery elements
    var i = 0;
    $gallery.each(function eachGallery() {
        var $thisGallery = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this);
        $thisGallery.attr('data-pswp-uid', i + 1);

        $thisGallery.on('click', 'a.nk-gallery-item', function onGalleryItemClick(e) {
            e.preventDefault();
            var index = 0;
            var clicked = this;
            $thisGallery.find('a.nk-gallery-item').each(function eachGalleryItem(idx) {
                if (this === clicked) {
                    index = idx;
                    return false;
                }
                return true;
            });
            openPhotoSwipe(index, $thisGallery[0]);
        });
        i++;
    });

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if (hashData.pid && hashData.gid) {
        openPhotoSwipe(hashData.pid, $gallery.get(hashData.gid - 1), true, true);
    }
}



/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return initPluginModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility__ = __webpack_require__(0);


/* Bootstrap Modal */
function initPluginModal() {
    __WEBPACK_IMPORTED_MODULE_0__utility__["c" /* $doc */].on('shown.bs.modal', function () {
        Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this).find('[autofocus]').focus();
    });
}



/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return initPluginTabs; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility__ = __webpack_require__(0);


/* Bootstrap Tabs */
function initPluginTabs() {
    var self = this;
    __WEBPACK_IMPORTED_MODULE_0__utility__["d" /* $wnd */].on('shown.bs.tab', function () {
        self.debounceResize();
    });
}



/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return initPluginAccordions; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility__ = __webpack_require__(0);


/* Bootstrap Accordions */
function initPluginAccordions() {
    var self = this;
    __WEBPACK_IMPORTED_MODULE_0__utility__["d" /* $wnd */].on('shown.bs.collapse', function () {
        self.debounceResize();
    });
}



/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return initPluginCountdown; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility__ = __webpack_require__(0);


/* Countdown */
function initPluginCountdown() {
    if (typeof __WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */].fn.countdown === 'undefined' || typeof moment === 'undefined' || typeof moment.tz === 'undefined') {
        return;
    }
    var self = this;

    Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])('.nk-countdown').each(function () {
        var tz = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this).attr('data-timezone');
        var end = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this).attr('data-end');
        end = moment.tz(end, tz).toDate();

        Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this).countdown(end, function (event) {
            Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this).html(event.strftime(self.options.templates.countdown));
        });
    });
}



/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return initPluginSeiyriaBootstrapSlider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility__ = __webpack_require__(0);


/* Bootstrap Slider */
function initPluginSeiyriaBootstrapSlider() {
    if (typeof __WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */].fn.bootstrapSlider === 'undefined') {
        return;
    }

    // set labels on slider change
    function setLabels($labels, values) {
        var force = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        for (var k = 0; k < values.newValue.length; k++) {
            if (typeof $labels[k] !== 'undefined' && (force || values.newValue[k] !== values.oldValue[k])) {
                $labels[k].text(values.newValue[k]);
            }
        }
    }

    Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])('.nk-input-slider').each(function () {
        var $this = Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])(this);
        var $input = $this.find('input');
        var $labels = [];

        for (var k = 0; k < 3; k++) {
            $labels.push($this.find('.nk-input-slider-value-' + k));
        }

        $input.bootstrapSlider().on('change', function (e) {
            if (e.value && e.value.newValue) {
                setLabels($labels, e.value);
            }
        });

        // set default labels
        setLabels($labels, {
            newValue: $input.bootstrapSlider('getValue')
        }, true);
    });
}



/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return initPluginSummernote; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility__ = __webpack_require__(0);


/*------------------------------------------------------------------

  Init Blog

-------------------------------------------------------------------*/
function initPluginSummernote() {
    if (typeof __WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */].fn.summernote === 'undefined') {
        return;
    }

    Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])('.nk-summernote').summernote({
        height: 300,
        dialogsInBody: true,
        toolbar: [
        // [groupName, [list of button]]
        ['style', ['bold', 'italic', 'underline']], ['fontsize', ['fontsize']], ['color', ['color']], ['insert', ['link', 'picture', 'video']], ['para', ['ul', 'ol', 'paragraph']], ['height', ['height']], ['misc', ['codeview']]]
    });

    // fix after load popovers are visible
    Object(__WEBPACK_IMPORTED_MODULE_0__utility__["a" /* $ */])('.note-popover').hide();
}



/***/ })
/******/ ]);