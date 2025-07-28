# react-ts-tech-test

This is Convex React TypeScript Tech Test.

![Preview of Frontend](public/preview.png)

## Requirements

- npm >=8.0.0 <9.0.0
- Access to the Internet
- Suitable development environment

## Getting Started

```
git clone git@github.com:felops/react-ts.git
cd react-ts
npm i
npm start
npm test
npm run test:e2e
```

- Run it: `npm start`
- Test it: `npm test`
- Build it: `npm build`

## Improvements Philosophy
The goal was to improve the existing code based on the user story, while keeping changes minimal. This approach helps maintain clarity in pull requests, especially when collaborating with teams. I focused on delivering only the necessary features and making targeted improvements required for those features.

The project now has a more organized structure. That said, there’s still room for improvement — for example, creating dedicated components (like one for Favorites), and moving all type definitions to a separate folder to enhance consistency. However, I intentionally avoided those broader changes to keep things simple and only refactor when there's a clear need.

Initially, I considered rebuilding the project from scratch using Next.js (which would offer built-in routing, a clean file structure, and updated dependencies). But I decided against it, understanding that the goal of the exercise is likely to evaluate improvements within the existing codebase, not a complete rewrite.


## Tests
Tests were written to validate the user stories and ensure all Acceptance Criteria are met, helping to prevent regressions. End-to-end (E2E) tests were added later to cover scenarios that unit tests couldn’t fully address, focusing on real user interactions and flows.
The command `test:e2e` was added to the package.json for convenience. To run the E2E tests, make sure the project is running locally first:
1. `npm start`
2. `npm run test:e2e`


## React-query
To improve network management and provide built-in caching, I chose to use React Query. Although it wasn't explicitly required in the User Stories, it enhances the user experience by caching previously fetched data. This is especially helpful given the API’s slower response times, allowing for quicker display of data the user has already accessed.


## Tooling

Tooling is an area I initially aimed to improve, but I ultimately chose not to invest further time in it after hitting some roadblocks. I tried replacing `react-scripts` with Vite and try to experiment with Vitest for faster test runs, but ran into issues that weren't worth the time investment for this task. I also considered setting up ESLint for both linting and formatting (avoiding Prettier to keep everything in one tool), but I avoided and tried to keep consistency by myself - in a real-world scenario or larger project, I would revisit these improvements.


## Style
I considered using a component library to improve the UI, but introducing one would have required significant changes to the existing codebase. I also attempted to integrate Tailwind CSS and even tried migrating from Create React App (CRA) to Vite to make that setup smoother. However, the configuration took more time than expected, and I decided it wasn’t worth the effort for this task’s scope.
Instead, I made a few small UI adjustments to improve the visual experience. Ideally, I would use Tailwind CSS for styling, as it provides flexibility and maintainability without the overhead of a full component library.