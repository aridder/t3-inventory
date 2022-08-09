# Inventory App

This app is created for the purpose of playing with the T3 stack (Tailwind, tTRP, Next.js, Typescript and Prisma). When running in current form it uses sqlight as db-layer

This is a app for holding tracks of your inventory. Users can:
- signup naivly with a username
- add items to their inventory
- see their items
- transfer items to others by their id
- see metrics in the dashboard
  - number of new items
  - number of transfers
  - number of items

## Get started

1. *Install deps* - Run `yarn`
2. *Init prisma with sqlight db* Run `yarn prisma db push`
3. Optional: *Fill db with some mock data found in `./prisma/seed.ts`*
4. *Run the app* - `yarn dev`