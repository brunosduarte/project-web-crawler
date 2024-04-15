# Improvements

## Context and Problem Statement

Implementation of a in-memory Database

## Considered Options

* Valkey
* Redis

## Decision Outcome

Chosen option: "Valkey", because For real-world projects, maintaining a reliable database for data storage is essential to ensure resilience in case of unexpected events. Initially, Redis was considered for this purpose, however, given the current scenario, Valkey offers a more suitable approach due to its enhanced features and compatibility with project requirements. In addition, implementing a database will be possible to process data using multiple Docker containers, significantly increasing the overall speed of the application.
