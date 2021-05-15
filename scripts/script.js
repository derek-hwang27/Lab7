// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach((entry,index) => {
        let newPost = document.createElement('journal-entry');
        newPost.id = index + 1;
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);
      });
    });
  history.pushState({type: "Home"}, "Home", "/");
});

let myHeader = document.querySelector("h1");
myHeader.addEventListener('click', () => {
  history.pushState({type: "Home"}, "Home", "/");
  router.setState("Home", null);
  
})


let mySettings = document.querySelector("img");
mySettings.addEventListener('click', () =>{
  history.pushState({type: "Settings"}, "Settings", "#settings");
  router.setState("Settings", null);
  
})

let myMain = document.querySelector("main");
myMain.addEventListener('click', (event) => {

  let entryID = event.target.id;

  let currentEntry = event.target.entry;

  history.pushState({type: "Entry", data: currentEntry, id: entryID}, "Entry", "#entry" + entryID);
  router.setState("Entry", currentEntry, entryID);
  
})

window.addEventListener('popstate', () => {

  //console.log(window.location);

  console.log("state: ");
  console.log(history.state);

  router.setState(history.state.type, history.state.data, history.state.id);
  //console.log("returned");
})

//Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
