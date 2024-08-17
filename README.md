## Getting started with Next.js and Replicate

This is a [Next.js](https://nextjs.org/) playground for to working with Replicate's API.

You can use this as a quick jumping-off point to build a web app using Replicate's API, or you can recreate this codebase from scratch by following the guide at [replicate.com/docs/get-started/nextjs](https://replicate.com/docs/get-started/nextjs)

## Important files

- [src/app/page.tsx](src/app/page.tsx) - The React frontend that renders the home page in the browser
- [src/app/api/predictions/route.ts](src/app/api/predictions/route.ts) - The backend API endpoint that calls Replicate's API to create a prediction

## Usage

- clone this repo
- copy `.env.example` to `.env.local`
- browse models at https://replicate.com/explore
- add the model path to `route.ts`

Cloned from [replicate.com/docs/get-started/nextjs](https://replicate.com/docs/get-started/nextjs)
