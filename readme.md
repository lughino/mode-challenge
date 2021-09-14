# Mode Challenge

![Home Page](/app-view.png)

## Installation

In order to work locally, run the following commands in the root of the project:

```bash
yarn install

yarn build # will build both client and server
```

## Usage

### Local usage

To launch the application, run the following commands:

```bash
yarn dev:client
yarn dev:server
```

To run the application with production builds (after launching the `yarn build`), run the following commands:

```bash
yarn start:client
yarn start:server
```

### Docker env usage

If preferred, it is possible to run the whole application inside docker.
Just run this command from the root of the project:

```bash
docker-compose up
```

# Testing

To launch the tests, run the following commands:

```bash
yarn test:client
yarn test:server
```

## Techinical Questions

> Did you have time to complete the coding test?

Yes, but the exercise was open to interpretation about how deep you should go, so it may end up being a big exercise for the time given.

> What would you add (or change) to your solution if you had more time, or needed to productionalise it?

Several things:

client side:

- more testing: I'm not a fun of unit testing per component, but more on integration style. More testing to resemble the user interaction at different level of components. Also, a layer of e2e tests which are essential
- more ui features, like the creation of wallets, user persona, authentication, authorization

server side:

- more testing: more integration and a layer of e2e
- a lot of small improvements, like security with more strict cors, use fastify instead of express for the inner web framework used by nestjs
- new features like user persona with related wallet service attached to it, the possibility of sending transactions to different wallets to make the app more real world scenario

infra:

- the use of a real database is the most important one. For sake of time I chose sqlite, whereas postgres should have been a way better choice. On the cose side, it is already abstracted so it should be possible to swap db with little/no changes.
- better configuration of docker to include dev and prod environment choices on dockerfile/docker-compose
- introduce terraform to provision architecture for cloud builds

> How would you optimise your solution?

Answered above

> What are the performance implications of your solution?

The solution itself uses a direct flow, which is definitely not the best architecture choice. In a real-world feature, an event driver architecture would be the best choice for this feature, with the benefit of scaling horizontally quite easy due to the idempotency nature of the services

> How would it scale with a growing user base?

- event driven architecture
- either rely on serverless architecture or container orchestrator, like kubernetes, to scale indipendently the services depending to arbitrary factors

> What would you change to ensure it could keep growing?

Answered above

> What are the security issues you can see in your solution?

At the moment, there is no user persona, making the feature not realistic for the real-world scenario.
In a real world, attaching the wallets to a user where would be possible to have user to user interaction, introducing different level of authorization per action

> How does your solution handle concurrency in order to maintain correct ordering of transfers.

Considering the direct architecture, the concurrency in handled by transactions at db level

List a few of your preferred JavaScript frameworks (also let us know in which situations you would choose to use/not use them).

- mswjs (testing mocking system)
- react
- react native
- nextjs
- react testing library (testing)
- cypress (e2e testing)
- storybook
- chackra ui
- styled-components
- nestjs (backend framework, huge fan of it)

> How would you change this test, if at all?

The exercise is good. I would personally reword it creating a hard line on what the requirements are.
The exercise does not resemble a realworld scenario, but it mentions various times to
think about realworld use.
Creating an exercise that does not resemble a realworld scenario is absolutely fine, as it shows the candidate skills on the coding side and architecture, but thinking about authentication or authorization is hard because of the absence of the user persona in the exercise.
