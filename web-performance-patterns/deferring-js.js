// From Smashing Mag
// http://www.smashingmagazine.com/2014/09/08/improving-smashing-magazine-performance-case-study/

function downloadJSAtOnload() {
   var element = document.createElement("script");
   element.src = "defer.js";
   document.body.appendChild(element);
}
if (window.addEventListener)
   window.addEventListener("load", downloadJSAtOnload, false);
else if (window.attachEvent)
   window.attachEvent("onload", downloadJSAtOnload);
else
   window.onload = downloadJSAtOnload;