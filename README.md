# SustainWear

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Local Hosting Instructions

1. Download this repository. E. g. via:

  ```bash
  git clone https://github.com/Kaytster/SoftwareEngineering-Project.git
  ```

2. Navigate to the project's root directory:

  ```bash
  cd ./SoftwareEngineering-Project
  ```

3. Install the required NPM dependencies:

  ```bash
  npm install
  ```

  Make sure you have NodeJS and NPM (or similar Node package manager of your choice) installed on your system. For a quick check, run:

  ```bash
  node --version
  ```

  and

  ```bash
  npm --version
  ```

4. Rename `.env-template` file in the project root to simply `.env` and make sure to replace placeholder values there with real environment variables. These variables are necessary for the software to work. Do not share your `.env` file with the public unless you know what you are doing.

5. To run the project in development mode with [Fast Refresh](https://nextjs.org/docs/architecture/fast-refresh):

  ```bash
  npm run dev
  ```

6. To run the project in an optimised production mode, build first:

  ```bash
  npm run build
  ```

  then start the project:

  ```bash
  npm start
  ```

7. In either case, the live version of the software should be available in your browser at <http://localhost:3000/>

