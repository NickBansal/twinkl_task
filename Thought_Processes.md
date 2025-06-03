# Thought processes

## Additional packages

When building this application, I carefully selected a few key packages to streamline development and enhance the overall experience.

For styling, I chose [TailwindCSS](https://tailwindcss.com/). While there are many styling libraries available, Tailwind stood out for its lightweight nature, simple installation, and intuitive utility-first approach, which significantly sped up the design process.

For handling HTTP requests, I opted for [Axios](https://axios-http.com/). Axios provides useful features like automatic JSON parsing, built-in error handling, and clear error codes, making it a reliable choice for managing API calls.

Both of these tools are widely adopted in the industry, well-maintained, and continue to evolve with regular updates and new features.

## Step-by-step

### Step 1 - Choosing the correct state management

With the wide range of state management options available, choosing the right one can be challenging. For this project, I chose to use React’s built-in Context API. I opted against lifting state to a top-level component, as I wanted to avoid prop drilling, especially if the application grows in complexity. Prop drilling across multiple layers can make data flow harder to trace and maintain. Using Context provided a cleaner, more scalable solution for managing shared state without introducing unnecessary complexity at this stage.

### Step 2 - Separating components into their own file

A major advantage of using React is how it makes full use of reusable, self-contained components. For this app I have decided to pull out each component into its own file and test the components individually. This is where the context really comes into use as there was no need for prop drilling making for cleaner more readable code

### Step 3 - Integration testing

To enhance the app’s reliability and security, I implemented an integration test that covers the entire user journey. Combined with unit tests, this gives me confidence that the user experience remains consistent and unaffected by potential code issues.

### Step 4 - Accessibility checking

To ensure the app is as accessible as possible for all users, I performed regular accessibility (A11y) checks throughout development. I used Chrome’s built-in Lighthouse tool to verify that the HTML structure was semantic and that text was clear and readable for everyone.

### Step 5 - Things to do to improve

I tried to follow the instructions as precisely as possible, which sometimes made it difficult for me not to go further and add in extra functionality into the app. I reflect on real world clients and how important it is to stick to their specifications.
Here's a few extra ideas I would have implemented:

- Add in the capability to edit a posts
- Add in the capability to create a new post
- Add in pagination for all the posts
