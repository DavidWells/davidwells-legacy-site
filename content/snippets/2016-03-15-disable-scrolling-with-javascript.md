---
title: Disable Scrolling with JavaScript
author: David Wells
date: 2016-03-15
layout: Post
tags:
  - JavaScript
---

Handy for modals and other cases where you don't want the user to be able to scroll

```js
function noscroll() {
  window.scrollTo( 0, 0 );
}

// add listener to disable scroll
window.addEventListener('scroll', noscroll);

// Remove listener to disable scroll
window.removeEventListener('scroll', noscroll);

```
