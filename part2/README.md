# Exercises

- 2.1 Course contents component

#

- 2.2 Show sum of the exercise of the course

#

- 2.3

#

- 2.4 Extend the application to allow for an arbitray number of courses

#

- 2.5 Separate module

#

- 2.6 The phonebook - get the form submit and input changes work

#

- 2.7 The phonebook - alert users if the name has been submitted before

#

- 2.8 The phonebook - allow users adding phone number as well as validating phone number

#

- 2.9 The phonebook - display user info through searching bar

#

- 2.10 The phonebook - separate three components from the application

#

- 2.11 The phonebook - store the initial state of the application in the file `db.json`
  - run json server
    `npx json-server --port 3001 --watch db.json`
  - install json-server in developemnt
    `npm install json-server --save-dev`
  - add script in package.json
    `"server": "json-server -p3001 db.json"`
  - install axios
    `npm install axios --save`

#

- 2.12 The countries app - build a countries searching app using [rest countries api](https://restcountries.eu/#api-endpoints-all)
- if the results have over 10 countries, show message 'to many matches, specify another filter'
- if there is only one country matching the query, show the detail info about the country
- bug: the name of country is part of the name of another country. ex:South Sudan

#

- 2.13 The countries app - show a button next the country's name when multiple countries match the query

#

- 2.14 The countries app - enhacne the app by using a [weather api](https://www.apixu.com)

#

- 2.15 The phonebook - save new created numbers to backend server

#

- 2.16 The phonebook - extract the code that handles the communication with the backend server into its own module

#

- 2.17 - The phonebook - add a deleted button to allow users delete entries and confirm the action by using the `windows.confirm` method

#

- 2.18 - The phonebook - use `put` method to update old number.If the person's information is already in the phone book, show a pop-up to confirm the action from the user

#

- 2.19, 2.20 - The phonebook - styling 'success' and 'error' notifications
