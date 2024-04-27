# Storage

## Context and Problem Statement

How to store the data?

## Considered Options

* In-Memory
* In-Memory Databases

## Decision Outcome

Chosen option: "In-Memory", because For the prototype, a database was not utilized to avoid increasing complexity. However, for production, incorporating a database is essential and In-Memory Databases are considered the optimal choice due to their ability to store all data in the computer's main memory, as opposed to traditional databases that store data on disk. The primary advantage is their speed, significantly enhancing performance.
