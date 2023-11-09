# Fastest Growing App 🚀

Welcome to the Fastest Growing App, a Next.js-based project showcasing skills in React, Next.js, Tailwind CSS, Git, and TypeScript.

## Overview

This app includes multiple thread levels, allowing users to create threads and comments. Authentication is powered by Clerk, supporting login/sign-up via email, GitHub SSO, or the traditional email method.

## Features

- **Home Page:** Displays the latest threads.
- **Pagination System:** Shows the last 20 threads per page.
- **Search Page:** Users can search for others by username or name, with pagination for 25 users per page.
- **Activity Page:** Users can view recent activities on their threads and replies.
- **Profile Page:** Displays user threads, images, username, name, and bio.
- **Create a Thread Page:** Simple form for posting new threads.
- **Thread Details Page:** Each thread and comment has a dedicated page.
- **Responsive Design:** Ensures usability on various devices.
- **SEO-Friendly:** Optimized for search engines.
- **Accessibility:** Designed with good accessibility practices.

## Live Demo

Watch a live demo of the Fastest Growing App [here](insert_link_to_demo_video).

## Installation

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Create a `.env.local` file in the root folder with the provided content below.
4. Run the build process with `npm run build`.
5. Start the app using `npm run start`.

The content of **.env.local** file
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_Z2l2aW5nLWdvb3NlLTIwLmNsZXJrLmFjY291bnRzLmRldiQ
CLERK_SECRET_KEY=sk_test_JSXS9529VG1T6kh5nAFu12hR6GbMYZW7r8hv5Pe71v
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
MONGO_DB_URL="mongodb+srv://ahmalawneh79:31Nayuo8EXzQ28kp@cluster0.jnjpng5.mongodb.net/"
UPLOADTHING_SECRET=sk_live_2775950b91208e9cc9cdaa6d30ad802c43816b11e730cd52505db02bce1a77b4
UPLOADTHING_APP_ID=qvmlkf34ci
```

## Technologies Used

- React
- Next.js
- Tailwind CSS
- Clerk (for authentication)
- TypeScript
- Git

## Project Goal

This project aims to showcase proficiency in React, Next.js, Tailwind CSS, Git, and TypeScript.

Feel free to explore, contribute, or provide feedback! Happy coding! 🚀
