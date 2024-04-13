# Workers

## Context and Problem Statement

Consume items of Queue

## Considered Options

* Iteration
* Recursion

## Decision Outcome

Chosen option: "Iteration", because The concept of worker threads is frequently applied in scenarios where a task is broken down into smaller, similar operations that are executed simultaneously. For instance, multiple worker threads can be used to parallel processing elements of a queue, enhancing efficiency and performance.
