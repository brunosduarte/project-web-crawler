# Queue

## Context and Problem Statement

Generate a queue of links for systematic processing

## Considered Options

* Queue
* Pub-Sub

## Decision Outcome

Chosen option: "Queue", because The decision to use a queue with concurrency capabilities (P-Queue), is aligned with the need for systematic, efficient, and reliable processing of a sequence of links. This setup ensures that each link is handled in a controlled manner, while still allowing for multiple links to be processed simultaneously. This combination of orderliness with concurrency I think that makes the queue a better choice over a pub-sub model for this specific task.
