# Course Selling App

- This is a web application for selling and managing courses, built using Next.js, TypeScript, MySQL database, Prisma, AWS S3 for image uploads, Razorpay for payment processing, and JWT authentication. It allows two types of users - ADMIN and NON-ADMIN, with different access and functionality.
- The Project has been deployed here -> https://course-selling-app-pink.vercel.app/

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Prerequisites](#prerequisites)
- [Configuration](#configuration)
- [Contributing](#contributing)

## Features

- **User Types:**
  - **ADMIN:** Can create and manage courses, as well as purchase courses.
  - **NON-ADMIN:** Can purchase courses.

- **User Authentication:** Uses JWT for secure user authentication.

- **Course Management:**
  - Create, edit, and delete courses.
  - Upload and manage course images using AWS S3.

- **Payment Gateway Integration:** Razorpay for processing payments using UPI ID `success@razorpay`.

- **Technology Stack:**
  - Next.js for the frontend.
  - TypeScript for type safety.
  - MySQL database for data storage.
  - Prisma for database operations.
  - AWS S3 for image uploads.

## Demo

Check out the live demo of the project [here](https://course-selling-app-pink.vercel.app/).

### Admin Login

- Email: admin@gmail.com
- Password: admin

### Non-Admin Login

- Email: test@gmail.com
- Password: test123

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- MySQL server
- AWS S3 account (for image uploads)
- Razorpay account (for payment processing)

## Configuration

Make sure to configure the following environment variables in your `.env` file:

- `DB_URL`: URL to your MySQL database.
- `AWS_S3_BUCKET`: Your AWS S3 bucket name.
- `RAZORPAY_API_KEY`: Your Razorpay API key.

## Contributing

Contributions to this project are welcome. Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix: `git checkout -b feature-name`.
3. Make your changes and commit them: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request with a detailed description of the changes.
