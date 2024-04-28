# Sitemap Output

## Context and Problem Statement

Output a simple Sitemap

## Considered Options

* Frontend
* Backend

## Decision Outcome

Chosen option: "Frontend", because Implementing a tree-type structure significantly enhances data visualization and comprehension, providing a clear and intuitive overview. Additionally, the system supports exporting results to a standard sitemap XML file. However, working with large datasets posed substantial challenges, especially when plotting the graph tree using D3.js. The application often crashed due to excessive memory consumption, in response, I invested numerous hours in refactoring and testing to achieve functionality. To efficiently handle huge datasets (>20K items), it is crucial to implement a streaming approach within the application. While this feature was not included in the prototype, it is a vital enhancement for achieving production readiness.