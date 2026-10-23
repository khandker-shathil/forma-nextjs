# Forma — considered furniture, everyday living

A responsive furniture catalog built for the Remontada assessment using **Next.js App Router, JavaScript, React, and Firebase Authentication**. No TypeScript application code.

## Features

- Seven-part landing page: sticky navbar, hero, values, featured products, brand story, collections, footer.
- Six initial products, text search, category and price filters, dynamic product details and related products.
- Email/password registration and login, optional Google login, Firebase auth state through Context, sign-out, account dropdown.
- Protected add/manage routes; signed-out visitors redirect to `/login`. Successful authentication redirects to `/`.
- Product validation, success/error messages, image fallback, deletion confirmation, responsive management table.
- Local storage persistence, accessible labels and focus states, reduced motion support, mobile navigation.

## Setup

Requires Node.js 20.9+ and npm.

```sh
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. Without Firebase configuration, public pages work and authentication displays a setup notice. There is no fake login or authentication bypass.

### Firebase

1. Create a project at https://console.firebase.google.com and register a Web app.
2. Copy the public `apiKey`, `authDomain`, `projectId`, and `appId` into the corresponding `NEXT_PUBLIC_FIREBASE_*` variables in `.env.local`.
3. Enable Authentication → Sign-in method → Email/Password. Optionally enable Google and select a support email.
4. Add `localhost` and your deployment hostname under Authentication → Settings → Authorized domains.
5. Restart the dev server. Register an account and verify add/delete workflows.

The Firebase web configuration is public client configuration, not an Admin SDK credential. Never add service-account keys to the frontend. Firebase integration reference: https://firebase.google.com/codelabs/firebase-nextjs

### Data and protection scope

Products are stored in this browser's `localStorage` under `forma-products`, initialized with six sample products. Changes do not synchronize across browsers or devices. All signed-in accounts in the same browser share the catalog. Clearing this storage restores the initial products on reload. A browser-local assessment does not provide server authorization: route guards hide management UI and mutation handlers check current Firebase user state, but local data is editable through browser tools. For production, move writes to Firestore with authenticated security rules or a server that verifies Firebase ID tokens.

Remote product imagery uses Unsplash, with a local SVG fallback; fonts use Google Fonts with system fallbacks. Hero images require network access. The catalog does not include checkout.

## Routes

| Route | Access | Purpose |
| --- | --- | --- |
| `/` | Public | Landing page |
| `/items` | Public | Search/filter catalog |
| `/items/[id]` | Public | Product details and related items |
| `/collections` | Public | Category collections |
| `/about` | Public | Brand story |
| `/login` | Public | Email/password and Google sign-in |
| `/register` | Public | Account registration |
| `/items/add` | Signed in | Add a product |
| `/items/manage` | Signed in | View and delete products |

## Production and submission

```sh
npm run build
npm start
```

Create a GitHub repository and push this directory. Import that repository into Vercel as a Next.js project. Set all four environment variables before deploying, then authorize the live hostname in Firebase. Environment changes require a new deployment.

- GitHub repository: not created — requires your GitHub account.
- Live demo: not deployed — requires hosting and Firebase setup.

## Verification checklist

- Browse all public routes at mobile and desktop widths.
- Search and combine category/price filters; reset an empty result.
- Open a product and its related item; open an unknown ID.
- Visit both protected routes while signed out and confirm redirect.
- Configure Firebase, register, sign out, log in, and optionally test Google.
- Add a product, refresh, view its details, cancel deletion, then delete it.
- Test required fields, invalid image URL, and storage failure messages.

Build validation can run without Firebase configuration; live authentication requires an actual Firebase project.

## Checks completed

- Production build passed for all routes.
- HTTP smoke checks returned 200 for all nine application routes (including client-guarded pages; this does not validate browser redirects).
- Dependency audit reported zero vulnerabilities after overriding `@grpc/grpc-js` to a patched compatible version.
- Browser visual checks and live Firebase authentication were not performed in this environment.
# forma-nextjs
