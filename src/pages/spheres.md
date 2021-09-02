---
path: '/spheres'
title: 'spheres'
sceneCode: 'SPHERES'
---

colorA and colorB are interpolated and a color parette of [colors] is generated. Changing the spheres count will reset the animation.

The box moves with your mouse. If it's too distracting, click anywhere on the screen to pause it. Also, every sphere you lose will come back from the top because there's Portals here.

It's worthy to note that becauase Three.js doesn't support continuous collision detection, it's not very reliable when it comes to thin walls and fast objects. You will notice that the little spheres will gladly go through the side walls, but not the bottom plane. It's because the latter is stealthily thicker in the Cannon physics world. It'd be harder to get away with when it comes to the side walls though.
