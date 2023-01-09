# TenchiSecurityCoding

## Features

### Character

- List
- Detail
- List of Episodes

### Episode

- List
- Detail
- List of Character

### Location

- List
- Detail
- List of Character

### Dashboard

- Number of Character
- Number of Locations
- Number of Episodes
- Total Character per Episodes
- Total Character per Location
- Chart of Character per Episode
- Chart of Character per Location

## Run

```bash
npm run start
```

## Build

```bash
npm run build
```

## Test

```bash
npm run test
```

## Quest

- Briefly describe in which scenarios one would use a HASH TABLE versus a TREE. Why?
  R: ...

- How do you test your code and what are the different ways you've done it in the past? Briefly discuss each different type of test.
  R: For the tests we can use the test pyramid. Where at the top we have E2E, in the middle Integration and at the base UNIT.

  I believe unit tests are necessary in any project as we can apply TDD and build clearer and cleaner code.

  I believe that integration tests are necessary when the project needs to have a guarantee that all internal and external services are working harmoniously.

  E2E tests are the most expensive and are almost never implemented because it is necessary to have an infrastructure prepared for them, but in the case of the front they are more than necessary because there is no point in having everything working in harmony, but it is not what the customer is seeing on the screen .

- Why is it important to do CODE REVIEWS? When should one NOT do code reviews? Why?
  R: CR is important because it is the only moment before the merge is done that anyone at the time can change their changes and comment on these and also where we can evolve the code that was written. I believe that without CR no code should be accepted as valid as we follow up with them.

- At a startup, when is it time to implement your own DATABASE service versus use an off-the-shelf one? Why?
  R: It is a difficult decision involving so many issues, but I believe that when we choose our own DATABASE to implement we will have difficulties with performance and memory consumption, different from when we already use an off-the-shelf one.

- What are some good QA practices for launching a new software release to production? What are some things to look for and some things to avoid?
  R: First it is necessary to understand for who is the software and which problem will be resolve.
  Second it is necessary to understand the business rules and use cases.
  Thirdly, it is necessary to create an MVP and collect feedback during an established period with a pilot client.

- What’s DEPENDENCY INJECTION and why is it important?
  R: DI is a way of constructing the code (pattern) to avoid high level compliance within the code. It is important because each and every dependency must be injected in the constructor or as a parameter, facilitating testing and understanding the code.

- What’s a REST API and what are some common examples?
  R: Way for two computer systems to communicate using the HTTP technologies found in web browsers and servers.
  For example a payment system needs to export all methods for a pay then it is create a REST API for communicate with any client using HTTP.

- What is Cross-Site Request Forgery (CSRF) and how can one prevent it?
  R: CSRF is an attack that attempts to impersonate a legitimate user.
  For prevent it you can use a SameSite, exist two ways for use SameSite.
  Strix the navigator will not send the cookie when will be a cross-site
  Lax the navigator will send when a request is safe like (GET,HEAD, OPTION, TRACE) and will not send when a request is not safe (POST)

- Why is it important to instrument code and what are some examples of useful instrumentation and why?
  R: It is necessary because a code instrument refers to its performance, when we use an application and it is slow we need to find out which part of the code is causing the slowness.
  Ex: API performance test for response time.

- How do you plan before writing code? What are some important first steps before actually writing the code?
  R: There are many ways to start writing code, for me it is necessary to understand the scope that I am going to write, if it is a BF (Business Feature) discuss with people what are the use cases.
