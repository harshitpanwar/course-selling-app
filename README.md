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
![image](https://github.com/harshitpanwar/course-selling-app/assets/54681032/0895c204-d82e-49cc-be1b-530def8d13cd)
![image](https://github.com/harshitpanwar/course-selling-app/assets/54681032/0fc9e276-f5c4-4ce3-84e3-86e8a375d13c)
![image](https://github.com/harshitpanwar/course-selling-app/assets/54681032/e537bc90-7c40-4b4a-943f-33e11830f28a)
![image](https://github.com/harshitpanwar/course-selling-app/assets/54681032/3d93404d-1a75-432b-8d44-25cc0097e42c)
![image](https://github.com/harshitpanwar/course-selling-app/assets/54681032/9eabd1c3-992e-4a6f-aeb6-0e788042bb1e)


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
