/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-99d8380f'], (function (workbox) { 'use strict';

  self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
  });

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "assets/index-j5uoz452.js",
    "revision": null
  }, {
    "url": "assets/index-POVfJ_Kx.css",
    "revision": null
  }, {
    "url": "index.html",
    "revision": "31f5c997bba38781a8471802b6fc671d"
  }, {
    "url": "registerSW.js",
    "revision": "2ec919e5fee6f989fd9460f9756c8ae9"
  }, {
    "url": "favicon.svg",
    "revision": "52be0e28fa10e09f48ab33f6c6fed26a"
  }, {
    "url": "pwa-64x64.png",
    "revision": "9124ba240dd98994fb9fc0057264b619"
  }, {
    "url": "pwa-192x192.png",
    "revision": "dc9d9e8dcfbc89833c349b0bc18b05e3"
  }, {
    "url": "pwa-512x512.png",
    "revision": "cf0c96568a19fd7aa0394b9233cd6f64"
  }, {
    "url": "apple-touch-icon-180x180.png",
    "revision": "8b277526addc097e88571697cf3eff05"
  }, {
    "url": "maskable-icon-512x512.png",
    "revision": "1b129ecf6bc4a3b51a5672c479e14cb6"
  }, {
    "url": "manifest.webmanifest",
    "revision": "def114b9a71d0608d2366e688cc97e31"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));

}));
