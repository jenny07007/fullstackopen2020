- [useParams](https://reacttraining.com/react-router/web/api/Hooks/useparams)
- [useHistory](https://reacttraining.com/react-router/web/api/Hooks/usehistory)
- [useRouteMatch](https://reacttraining.com/react-router/web/api/Hooks/useroutematch)

##

- [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks) - verify that the application uses hooks correctly, has configured by `create-react-app`

#

- [react-bootstrap](https://react-bootstrap.github.io/)
- [semantic-ui](https://react.semantic-ui.com/)

#

##### config webpage

- create package.json
- install `webpack` and `webpack-cli`
- define the `webpack.config.js`

  ```js
  const path = require("path");

  const config = {
    entry: "./src/index.js", // the enter point for bundling the app
    output: {
      // where the bundled code will be stored
      path: path.resolve(__dirname, "build"), // must be an absolute path
      filename: "main.js",
    },
    devServer: {
      //webpack-dev-server config
      contentBase: path.resolve(__dirname, "build"),
      compress: true,
      port: 3000,
    },
  };
  module.exports = config;
  ```

- `package.json` script
  ```js
  "scripts": {
    "build": "webpack --mode=development"
  },
  ```
- bundle the application `npm run build`
- create react app `react react-dom`
- use [loaders](https://webpack.js.org/concepts/loaders/)
- `webpack.config.js`

  ```js
  ...// output:{},
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          query: {
            presets: ['@babel/preset-env', '@babel/preset-react'], //transpiling the source code
            },
          },
          { // css loaders
            test: /\.css$/,
            loaders: ['style-loader', 'css-loader'],
          },
        ],
      },
  ...
  ```

- install the loader and required packages as save-dev
  ```js
    @babel/core babel-loader @babel/preset-react
  ```
- [error](https://stackoverflow.com/questions/33527653/babel-6-regeneratorruntime-is-not-defined)
- install the `@babel/polyfill` and change the entry point in the `webpack.config.js`
  ```js
  entry: ["@babel/polyfill", "./src/index.js"];
  ```
- transpile: compiling source code by transforming it from a language to another
- install `@babel/preset-env` present for ES5 standard
- css loader: loading css files
- style loader: injecting css into the DOM
- [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)

##### webpack-dev-server

```js
  npm install --save-dev webpack-dev-server


  {
  // ...
  "scripts": {
    "build": "webpack --mode=development",
    "start": "webpack-dev-server --mode=development"  },
  // ...
}
```

- _🔸 when using the dev-server, the code is not bundled into the `main.js`. the result of the bundling exists only in memory._

- _🔸 need to pay attention to the console, because the error messages won't be shown up the same way like using the create-react-app_

- [devtool(source-map)](https://webpack.js.org/configuration/devtool/) - show the actual source code of the error message

##### minifying the code

- [uglifyjs](http://lisperator.net/uglifyjs/)
- change the script of 'build' to production mode in the package.json
  ```js
    "build": "webpack --mode=production",
  ```

##### development and production configuration

- [DefinePlugin](https://webpack.js.org/plugins/define-plugin/) - create global constants which can be configured at compile time.
- change the `webpack.config.js` object to ba a function
- require webpack
- set up backend_urls
- set up the plugins configuration with `DefinePlugin`
- inspect the bundled production version locally
  ```js
    npx static-server
  ```

####

- [separate the configuration](https://webpack.js.org/guides/production/) if the configuration for development and production differs a lot

##### IE-compatible

- [polyfill](https://remysharp.com/2010/10/08/what-is-a-polyfill)
- [@babel-polyfill](https://babeljs.io/docs/en/babel-polyfill/)
- [promise-polyfill](https://www.npmjs.com/package/promise-polyfill)

```js
import PromisePolyfill from "promise-polyfill";

if (!window.Promise) {
  window.Promise = PromisePolyfill;
}
```

- [HTML5-Cross-browser-Polyfills](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-browser-Polyfills)

##### Eject

- [npm-run-eject](https://create-react-app.dev/docs/available-scripts/#npm-run-eject)

# Exercises

- 7.1 routed anecdotes
  - add react-router to the application so that by clicking links in the `Menu` component the view can be changed
  - at the root of the application, show the list of anecdotes
  - the `Footer` component should always be shown at the bottom
  - the `create a new anecdote` component should be in the path - `http://localhost:3000/create`

#

- 7.2
  - show a single anecdote when users click the name of the anecdote

#

- 7.3
  - set a notification to show message in 10 seconds when users create a new anecdote

#

- 7.4- 7.6 anecdotes and hooks

  - use `useField` custom hook to simplify the anecdote creation form
  - save the new hook to path `/src/hooks/`
  - add a button to the form for clearing out all the input fields and implement the logic in `useField` hook with a `reset` operation
  - get rid of the `Invaild value for prop reset on <input> tag` error if it happens

  #

- 7.7 country hook

  - implement a custom hook `useCountry` for searching the details of the country
  - use the api endpoint (https://restcountries.eu/rest/v2/name/aruba?fullText=true) to fetch country details in a `useEffect` hook in the custom hook

  #

- 7.8 ultimate hooks
  - extract the code for communicating with the backend into its own `useResource` hook
  - testing at port 3005 so that the `useResoure` hook can be used both notes and phone numbers

#

- 7.9 - 7.21 extending the bloglist
