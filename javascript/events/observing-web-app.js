// Ref: https://ericbidelman.tumblr.com/post/149032341876/observing-your-web-app
//


// Listen for DOM events (both native and custom):
window.addEventListener('scroll', e => { ... });   // user scrolls the page.

el.addEventListener('focus', e => { ... });        // el is focused.
img.addEventListener('load', e => { ... });        // img is done loading.
input.addEventListener('input', e => { ... });     // user types into input.

el.addEventListener('custom-event', e => { ... }); // catch custom event fired on el.


// Listen for modifications to the DOM:
const observer = new MutationObserver(mutations => { ... });
observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true,
  characterData: true
});


// Listen the URL changes:
window.onhashchange = e => console.log(location.hash);
window.onpopstate = e => console.log(document.location, e.state);


// Listen to when the app is being viewed fullscreen:
document.addEventListener('fullscreenchange', e => console.log(document.fullscreenElement));


// Listen when someone is sending you a message:
// Cross-domain / window /worker.
window.onmessage = e => { ... };

// WebRTC.
const dc = (new RTCPeerConnection()).createDataChannel();
dc.onmessage = e => { ... };


// Listen to client-side errors:
// Client-size error?
window.onerror = (msg, src, lineno, colno, error) => { ... };

// Unhandled rejected Promise?
window.onunhandledrejection = e => console.log(e.reason);


// Listen for changes to responsiveness:
const media = window.matchMedia('(orientation: portrait)');
media.addListener(mql => console.log(mql.matches));

// Orientation of device changes.
window.addEventListener('orientationchange', e => {
  console.log(screen.orientation.angle)
});


// Listen for changes to network connectivity:
// Online/offline events.
window.addEventListener('online', e => console.assert(navigator.onLine));
window.addEventListener('offline', e => console.assert(!navigator.onLine));

// Network Information API
navigator.connection.addEventListener('change', e => {
  console.log(navigator.connection.type,
              navigator.connection.downlinkMax);
});


// Listen for changes to the device battery:
navigator.getBattery().then(battery => {
  battery.addEventListener('chargingchange', e => console.log(battery.charging));
  battery.addEventListener('levelchange', e => console.log(battery.level));
  battery.addEventListener('chargingtimechange', e => console.log(battery.chargingTime));
  battery.addEventListener('dischargingtimechange', e => console.log(battery.dischargingTime));
});


// Know when the tab/page is visible or in focus:
document.addEventListener('visibilitychange', e => console.log(document.hidden));


// Know when the user’s position changes:
navigator.geolocation.watchPosition(pos => console.log(pos.coords))


// Know when the permission of an API changes:
const q = navigator.permissions.query({name: 'geolocation'})
q.then(permission => {
  permission.addEventListener('change', e => console.log(e.target.state));
});


// Know when another tab updates localStorage/sessionStorage:
window.addEventListener('storage', e => alert(e))


// Know when an element enters/leaves the viewport (e.g. “Is this element visible?”):
const observer = new IntersectionObserver(changes => { ... }, {threshold: [0.25]});
observer.observe(document.querySelector('#watchMe'));


// Know when the browser is idle (to perform extra work):
requestIdleCallback(deadline => { ... }, {timeout: 2000});


// Know when the browser fetches a resource, or a User Timing event is recorded/measured:
const observer = new PerformanceObserver(list => console.log(list.getEntries()));
observer.observe({entryTypes: ['resource', 'mark', 'measure']});


// Know when properties of an object change (including DOM properties):
// Observe changes to a DOM node's .textContent.
// From https://gist.github.com/ebidel/d923001dd7244dbd3fe0d5116050d227
const proxy = new Proxy(document.querySelector('#target'), {
  set(target, propKey, value, receiver) {
    if (propKey === 'textContent') {
      console.log('textContent changed to: ' + value);
    }
    target[propKey] = value;
  }
});
proxy.textContent = 'Updated content!';


// listen to reactions in web components, that you can define to observe important things in the element’s lifecycle:

class AppDrawer extends HTMLElement {
  constructor() {
    super(); // always need to call super() first in the ctor.
    // Instance of the element is instantiated.
  }
  connectedCallback() {
    // Called every time the element is inserted into the DOM.
  }
  disconnectedCallback() {
    // Called every time the element is removed from the DOM.
  }
  attributeChangedCallback(attrName, oldVal, newVal) {
    // An attribute was added, removed, updated, or replaced.
  }
  adoptedCallback() {
    // Called when the element is moved into a new document.
  }
}
window.customElements.define('app-drawer', AppDrawer);
