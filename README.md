# Hooks

This library serves as entrypoint to access all React custom hooks provided by inubekit.

## Installation

```bash
npm install @inubekit/hooks
```

## Hooks

### useFonts

This hooks is useful for loading and setting a font-faces in an application during runtime. To make it work, this hook has to make use of the browser FontFace API.

If you want to know all the little details about how to use this hook and how to connect it with a fonts provider like Google Fonts check this [article](https://medium.com/@wfercanas/load-fonts-on-demand-with-react-206ce12174c0).

### useMediaQuery

This hook helps you control the responsiveness of your application by reacting to changes in the viewport. The usage of events in the browser and its corresponding handler function allows apps to change the rendering of the application.

There are some key factors that makes this hook work:

1. `matchMedia()` is a method that belongs to the `window` object in browsers. It receives a media query string as a parameter and returns a `MediaQueryList` object. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) docs.
2. `MediaQueryList`: is an object created and returned by `matchMedia()` which lets you know if the query you passed matches the viewport (`boolean`). That answer is obtained by calling the `matches()` method of the object.
3. The `MediaQueryList` object also lets you add event listeners of type "change" to it, so the browser lets you know when the `matches()` value changes.
4. With the event listener in place, the hook can then update the hook state. With that update, you can control the layout of your screens.
5. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList) docs for details about `MediaQueryList`.

#### useMediaQueries

The difference between this hook and the [useMediaQuery](#usemediaquery) hook is that instead of passing just one media query string for a single breakpoint, you can pass an array of media queries (`[]string`). Internally the hook:

1. Creates a `MediaQueryList` object per media query.
2. Adds an "onchage" event listener to each `MediaQueryList` object to control monitor the change of each breakpoint.
3. Instead of returning a single boolean, returns an object whose keys are the media queries passed and whose values are booleans.

A proper usage demands that the ranges you pass as media queries (breakpoints) are not overlapping. That will let you know exactly the range the viewport is currently working on and thus you can handle the rendering of the app.
