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

### typeing in the express app

- add the `tsc` command to the list of executable scripts in the package.json file

  ```js
  {
  // ..
  "scripts": {
    "tsc": "tsc",  },
  // ..
  }

  // then run in terminal to initialise tsconfig.json
  // the extra -- before the actual argument! Arguments before the -- are interpreted for the command npm and ones after are for the command that is run through the script.
  npm run tsc -- --init
  ```

  ```bash
  npm install express
  npm install --save-dev eslint @types/express @typescript-eslint/eslint-plugin @typescript-eslint/parser
  # doing the same thing as th nodemon
  npm install --save-dev ts-node-dev
  ```

- We should never use type assertion unless there is no other way to proceed, as there is always the danger we assert an unfit type to an object and cause a nasty runtime error.

```js
const diaries: Array<DiaryEntry> = diaryData as Array<DiaryEntry>;
```

### problem when using the tsconfig resolveJsonModule option

- According to the node documentation for file modules, node will try to resolve modules in order of extensions. In typescript, with the resolveJsonModule option set to true, the file `myModule.json` becomes a valid node module.
- In order to avoid time eating bugs, it is recommended that within a flat directory, each file with a valid node module extension has a unique filename.

```js
{
  "compilerOptions": {
    // ...
    "resolveJsonModule": true  }
}
```

### Utility Types

- to use a specific modification of a type
- [Pick utility type](https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys) - allows us to choose which fields of an existing type we want to use.

```ts
// the compiler would expect the function to return an array of values of the modified DiaryEntry type
const getNonSensitiveEntries = (): Pick<
  DiaryEntry,
  "id" | "date" | "weather" | "visibility"
>[] => {
  // ...
};
```

- [Omit utility type](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys) - allows us to exclude one field

```ts
const getNonSensitiveEntries = (): Omit<DiaryEntry, "comment">[] => {
  // ...
};

// to declare a completely new type for the NonSensitiveDiaryEntry
export type NonSensitiveDiaryEntry = Omit<DiaryEntry, "comment">;
//
//
// in the services/diaryService
import { NonSensitiveDiaryEntry, DiaryEntry } from "../types";

// need to exclude the files becuase TS only checks whether we have all of the required fields or not, but excess fields are not prohibited. if we dont exclude the files, it can lead to unwanted behaviour.
const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

export default { getNonSensitiveEntries };
```

```js
const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
}
//

const a = "I'm a string primitive";
const b = new String("I'm a String Object");
typeof a; --> returns 'string'
typeof b; --> returns 'object'
a instanceof String; --> returns false
b instanceof String; --> returns true
```

### Enum

- Enums are usually used when there is a set of predetermined values which are not expected to change in the future. Usually enums are used for much tighter unchanging values (for example weekdays, months, directions)

#

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

  - change the pervious exercises and give the parameters of `bmiCalculator` and `exerciseCalculator` as command line arguments.

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

  -Add an endpoint for the exercise calculator that can be used by doing a HTTP POST reauest to endpoint `exercises` with the input in the request body

  ```json
  {
    "daily_exercises": [1, 0, 2, 0, 3, 0, 2.5],
    "target": 2.5
  }
  ```

- 9.8 - 9.13

- Initialise project that will be used by the frontend. Configure eslint and tsconfig with the same configurations that are used in the material. Define an endpoint that responses to HTTP GET requests to route `/ping`. The project should be runnable with npm scripts both in development mode and as compiled code in production mod
- Ensure that backend answers to the ping request that frontend has made on startup
- Create data type Patient and set up a GET-endpoint `/api/patients` that returns all patients to the frontend excluding field `ssn`. Use a utility type to make sure you are selecting and returning only the wanted fields.
  - In this exercise you may assume that field `gender` has type string.
- Create a POST-endpoint `/api/patients` for adding patients. Ensure that you can add patients also from the frontend.
- Set up safe parsing, validation and type guards to the POST `/api/patients` reques
  - Refactor the Gender field to use an `enum` type.
