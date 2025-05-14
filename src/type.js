'use strict';

new TypeIt('.home__title--strong', {
  loop: true,
  speed: 100,
}) // Dream Coder|
  .move(-20)
  .type('Amazing ') //Amazing |Dream Coder
  .pause(1000)
  .move(null, { to: 'END' }) //Amazing Dream Coder|
  .delete() //|
  .type('Flutter Developer') //Front-end Engineer|
  .pause(1000)
  .move(-10) //Front-end| Engineer
  .delete(10) //| Engineer
  .type('Mobile') //Back-end| Engineer
  .pause(1000)
  .delete(9) //| Engineer
  .type('Full-stack') //Full-stack| Engineer
  .pause(1000)
  .move(10) //Full-stack Engineer|
  .delete()
  .go();
