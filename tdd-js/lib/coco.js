/*jslint indent: 2, onevar: false, plusplus: false, eqeqeq: false, nomen: false*/
/*globals document, window*/
var coco = (function () {
  function namespace(string) {
    var object = this;
    var levels = string.split(".");

    for (var i = 0, l = levels.length; i < l; i++) {
      if (typeof object[levels[i]] == "undefined") {
        object[levels[i]] = {};
      }

      object = object[levels[i]];
    }

    return object;
  }

  return {
    namespace: namespace
  };
}());

coco.isOwnProperty = (function () {
  var hasOwn = Object.prototype.hasOwnProperty;

  if (typeof hasOwn == "function") {
    return function (object, property) {
      return hasOwn.call(object, property);
    };
  } else {
    // Provide an emulation if you can live with possibly
    // inaccurate results
  }
}());

coco.each = (function () {
  // Returns an array of properties that are not exposed
  // in a for-in loop
  function unEnumerated(object, properties) {
    var length = properties.length;

    for (var i = 0; i < length; i++) {
      object[properties[i]] = true;
    }

    var enumerated = length;

    for (var prop in object) {
      if (coco.isOwnProperty(object, prop)) {
        enumerated -= 1;
        object[prop] = false;
      }
    }

    if (!enumerated) {
      return;
    }

    var needsFix = [];

    for (i = 0; i < length; i++) {
      if (object[properties[i]]) {
        needsFix.push(properties[i]);
      }
    }

    return needsFix;
  }

  var oFixes = unEnumerated({},
    ["toString", "toLocaleString", "valueOf",
     "hasOwnProperty", "isPrototypeOf",
     "constructor", "propertyIsEnumerable"]);

  var fFixes = unEnumerated(
    function () {}, ["call", "apply", "prototype"]);

  if (fFixes && oFixes) {
    fFixes = oFixes.concat(fFixes);
  }

  var needsFix = { "object": oFixes, "function": fFixes };

  return function (object, callback) {
    if (typeof callback != "function") {
      throw new TypeError("callback is not a function");
    }

    // Normal loop, should expose all enumerable properties
    // in conforming browsers
    for (var prop in object) {
      if (coco.isOwnProperty(object, prop)) {
        callback(prop, object[prop]);
      }
    }

    // Loop additional properties in non-conforming browsers
    var fixes = needsFix[typeof object];

    if (fixes) {
      var property;

      for (var i = 0, l = fixes.length; i < l; i++) {
        property = fixes[i];

        if (coco.isOwnProperty(object, property)) {
          callback(property, object[property]);
        }
      }
    }
  };
}());

coco.extend = (function () {
  function extend(target, source) {
    target = target || {};

    if (!source) {
      return target;
    }

    coco.each(source, function (prop, val) {
      target[prop] = val;
    });

    return target;
  }
  return extend;
}());

coco.isHostMethod = (function () {
  function isHostMethod(object, property) {
    var type = typeof object[property];

    return type == "function" ||
           (type == "object" && !!object[property]) ||
           type == "unknown";
  }
  return isHostMethod;
}());

coco.isLocal = (function(){
  function isLocal(){
    return !!(window.location && window.location.protocol.indexOf("file:") === 0);
  }
  return isLocal;
}());

coco.isEventSupported = (function () {
  var TAGNAMES = {
    select: "input",
    change: "input",
    submit: "form",
    reset: "form",
    error: "img",
    load: "img",
    abort: "img"
  };

  function isEventSupported(eventName) {
    var tagName = TAGNAMES[eventName];
    var el = document.createElement(tagName || "div");
    eventName = "on" + eventName;
    var isSupported = (eventName in el);

    if (!isSupported) {
      el.setAttribute(eventName, "return;");
      isSupported = typeof el[eventName] == "function";
    }

    el = null;

    return isSupported;
  }

  return isEventSupported;
}());

(function () {
  var dom = coco.namespace("dom");
  var _addEventHandler;

  if (!Function.prototype.call) {
    return;
  }

  function normalizeEvent(event) {
    event.preventDefault = function () {
      event.returnValue = false;
    };

    event.target = event.srcElement;
    // More normalization

    return event;
  }

  if (coco.isHostMethod(document, "addEventListener")) {
    _addEventHandler = function (element, event, listener) {
      element.addEventListener(event, listener, false);
    };
  } else if (coco.isHostMethod(document, "attachEvent")) {
    _addEventHandler = function (element, event, listener) {
      element.attachEvent("on" + event, function () {
        var event = normalizeEvent(window.event);
        listener.call(element, event);

        return event.returnValue;
      });
    };
  } else {
    return;
  }

  function mouseenter(el, listener) {
    var current = null;

    _addEventHandler(el, "mouseover", function (event) {
      if (current !== el) {
        current = el;
        listener.call(el, event);
      }
    });

    _addEventHandler(el, "mouseout", function (e) {
      var target = e.relatedTarget || e.toElement;

      try {
        if (target && !target.nodeName) {
          target = target.parentNode;
        }
      } catch (exp) {
        return;
      }

      if (el !== target && !dom.contains(el, target)) {
        current = null;
      }
    });
  }

  var custom = dom.customEvents = {};

  if (!coco.isEventSupported("mouseenter") &&
      coco.isEventSupported("mouseover") &&
      coco.isEventSupported("mouseout")) {
    custom.mouseenter = mouseenter;
  }

  dom.supportsEvent = function (event) {
    return coco.isEventSupported(event) || !!custom[event];
  };

  function addEventHandler(element, event, listener) {
    if (dom.customEvents && dom.customEvents[event]) {
      return dom.customEvents[event](element, listener);
    }

    return _addEventHandler(element, event, listener);
  }

  dom.addEventHandler = addEventHandler;
}());


// TODO: transfer to Util
// from Professional JS
coco.addURLParam = (function(){
  function addURLParam(url, name, value){
    url += (url.indexOf("?") == -1 ? "?" : "&");
    url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
    return url;
  }
  return addURLParam;
}());

coco.serialize = (function(){
    function serialize(form){
        var parts = [],         //holds the parts of the string that will be created
            field = null,       
            i,
            len,
            j,
            optLen,
            option,
            optValue;

        // we iterate over each form field to get all elements and extract values
        for (i=0, len=form.elements.length; i < len; i++){
            field = form.elements[i];

            switch(field.type){
                case "select-one":
                case "select-multiple":

                    if (field.name.length){
                        for (j=0, optLen = field.options.length; j < optLen; j++){
                            option = field.options[j];
                            if(option.selected){
                                optValue = "";
                                if (option.hasAttribute){
                                    optValue = (option.hasAttribute("value") ? option.value : option.text);
                                }else{
                                    // for IE8 and earlier
                                    optValue = (option.attributes["value"].specified ? option.value : option.text);
                                }
                                parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(optValue));
                            }
                        }
                    }
                    break;

                case undefined:     //fieldset elements have no type property
                case "file":        //file input
                case "submit":      //submit button
                case "reset":       //reset button
                case "button":      //custom button
                    break;

                case "radio":       //radio button
                case "checkbox":    //checkbox
                    if(!field.checked){
                        break;
                    }
                    /* falls through */

                default:
                    //don't include form fields without names
                    if(field.name.length){
                        parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
                    }
            }
        }
        // we give the output in query string format, but it could be modified
        return parts.join("&");
    }
    return serialize;
}());

