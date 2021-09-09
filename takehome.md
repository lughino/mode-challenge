# Mode take home test

Thanks for taking the time to do our full-stack coding test. The challenge has two parts:

- A task to create a basic service and UI to allow users to track their spending.
- Some follow-up questions

## Task

We need to create a service that allows users to keep track of the balance in their wallet.

The service allows for transfers to be made against that wallet. Those transfers can be credit, which increase available balance, and debit, which decrease available balance.

If at any point the available funds reach 0 or bellow the API should return an error and stop accepting debits, but keep accepting credits.

### Service Details

Use Node.js and Typescript for the backend with whatever libraries you feel comfortable with. **We can assume the data store already has a wallet created, so you don't need to write this logic unless, of course, you want to.**

Data should be persisted in some sort of data store (of your choice).
The service should have endpoints to support the following:

- Create a transfer (debit and credit)
- Stop Debits if balance is <=0
- You do not have to worry about authorization and authentication, but worth considering how you would do it, as we might ask some questions around it.
- Any other endpoints or functionality you see fit.

### Client Details

We'd like you to use React. On top of that, use whatever front-end or support libraries you feel comfortable with.

Design the UI anyway you see fit, it should have and allow:

- User to create transfers (with any value) against a wallet.
- Show a warning when balance reaches 0.
- Show up to date balance information.
- Any other endpoints or functionality you see fit.

## Running the project

To startup the client and server add the following commands (or their equivalent in npm).

```
yarn start - This will start the application in dev
yarn build - Will create a production optimized build
yarn test - Will run the tests
```

If it's containarised, the docker build command with any arguments that we may need (or properly configured docker-compose file).

## Task requirements

Feel free to spend as much or as little time on the exercise as you like as long as the following requirements have been met.

Your code should compile and run and also include unit tests.

Feel free to use whatever frameworks / libraries / packages you like.

Please avoid including artifacts from your local build (line node dependencies) in your final ZIP file.

The project should have a Dockerfile for the API at least, bonus points if it has a docker-compose with the API/UI and all dependencies.

**The objective of the test is to see code style, problem solving, the solution itself and the approach. And less about doing every single requirement with no thought on code quality and architecture.**

## Technical Questions

- Did you have time to complete the coding test?

- What would you add (or change) to your solution if you had more time, or needed to productionalise it?

- How would you optimise your solution?

- What are the performance implications of your solution?
- How would it scale with a growing user base?

- What would you change to ensure it could keep growing?

- What are the security issues you can see in your solution?

- How does your solution handle concurrency in order to maintain correct ordering of transfers.

- List a few of your preferred JavaScript frameworks (also let us know in which situations you would choose to use/not use them).

- How would you change this test, if at all?

## Submission

Please make this a single zip file named `{yourname}.zip` containing:

- A single markdown file with the answers to the technical questions.
- One folder containing the technical test.

You can also provide a url to a github repo or similar if preferred.
