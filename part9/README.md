- Main principle
  - The language
    - syntax, keywords, type annotations
  - The compiler
    - responses to type information erasure (removing the typing information) and the code transformations
    - performs a static code analysis
  - The language service
    - collects type information from the source code
- Key features
  - type annotations
  - structural typing
  - type inference
  - type erasure

### setup

```
npm install -g ts-node typescript
```

- set scripts

```js
{
  // ..
  "scripts": {
    "ts-node": "ts-node"  },
  // ..
}

// then run
npm run ts-node -- file.ts
```

### types

```ts
type Operation = "multiply" | "add" | "divide";
```

- @types/{npm_package}

```
npm install --save-dev @types/node
```

### use express

- [ TypeScript modules](https://www.typescriptlang.org/docs/handbook/modules.html)

```js
npm i express
npm install --save-dev @types/express
npm install --save-dev ts-node-dev  // for auto reloading

// index.ts
import express from 'express';
```

- **The implicitly [Any](https://www.typescriptlang.org/docs/handbook/basic-types.html#any)**

  - [disallow explicit any](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-explicit-any.md)

  ```
  npm install --save-dev eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser
  ```

  - mutes the rule

  ```
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ```

# Exercises

- 9.1 - 9.7

  - write a function `calculateBmi` that counts BMI based on given height and weight and returns a message

    ```js
    console.log(calculateBmi(180, 74))
    // print out
    Normal (healthy weight)
    ```

  - write a function `calculateExercises` that calculates the average time of daily exercise hours and compares it to the target amount of daily hours and returns an object.

    ```js
    // input
    [3, 0, 2, 4.5, 0, 3, 1]
    // output
    {
    periodLength: 7,
    trainingDays: 5,
    success: false,
    rating: 2,
    ratingDescription: 'not too bad but could be better',
    target: 2,
    average: 1.9285714285714286
    }
    ```

  - change the perious exercises and give the parameters of `bmiCalculator` and `exerciseCalculator` as command line arguments.

    ```js
    $ npm run calculateBmi 180 91
    // output
    Overweight

    $ npm run calculateExercises 2 1 0 2 4.5 0 3 1 0 4
    // output
    { periodLength: 9,
    trainingDays: 6,
    success: false,
    rating: 2,
    ratingDescription: 'not too bad but could be better',
    target: 2,
    average: 1.7222222222222223 }
    ```

  - Add an endpoint for BMI-calculator that can be used by doing a HTTP GET request to endpoint bmi and specifying the input with query string parameters. For example to get bmi for a person having height 180 and weight 72, the url is `http://localhost:3002/bmi?height=180&weight=72`
