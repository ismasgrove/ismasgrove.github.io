---
path: '/boids'
title: 'boids'
sceneCode: 'BOIDS'
---

This is an implenetation of Craig Reynolds' [Boids](https://en.wikipedia.org/wiki/Boids) algorithm, which simulates the flocking of birds, as was presented in [The Nature of Code](https://natureofcode.com/book/) which is a book for Processing. Part of me feels bad for missing out on the Processing age, if only I was introduced to programming a little earlier!

What the book helped the most with was its explanation of steering force. threejs doesn't have a native applyForce function as its not a physics library, but I figured something like Cannon would be a bit overkill here (on an already computationally intensive scene). Of course, representing birds in terms of objects with velocity/acceleration properties (as was done in Processing) would've been straightforward enough, but I had to learn about forwardRefs! (among other things)

**flockSize**: number of birds

**separVal**: separation - steering to avoid nearby crowding flockmates

**alignVal**: alignment - steering towards the average direction of nearby flockmates

**cohesVal**: cohesion - steering to move towards the average position of nearby flockmates

**windVal**: force in x-axis

**bounds**: size of the invisible square. once birds reach its end, they portal-jump to the other side

**spawnRange**: boundary of the region birds first spawn in. should always be smaller than bounds
