UsersTable App

UsersTable is a React application that displays a table of users, allows filtering by name and email, and provides details of posts for each selected user. The app fetches data from the JSONPlaceholder API.
Table of Contents

    Features
    Getting Started
    Project Structure
    Dependencies
    Usage
    Error Handling
    Loading Indicator
    Responsive Design
    Search Functionality
    Create New Post
    Logging System
    Contributing
    License

Features

    UsersTable: Displays a table of users with columns for name, email, and company name.
    Filtering: Users can filter the table by name and email.
    UserPosts: Upon selecting a user, a list of posts by that user is displayed on the right side.
    NewPost: Allows users to create a new post with validation and updates the list of user posts.
    Error Handling: Logs errors to the local storage and provides user-friendly error messages.
    Loading Indicator: Displays a loading spinner while fetching data from the API.
    Responsive Design: Optimized for both desktop and mobile devices.
    Search Functionality: Includes a search box for filtering the table by name or email.

Getting Started

Follow these steps to run the UsersTable app locally:

    Clone the repository: git clone https://github.com/your-username/UsersTable.git

    Navigate to the project directory: cd UsersTable

    Install dependencies: npm install

    Start the development server: npm start

    Open your browser and go to http://localhost:3000.

Project Structure

The project structure follows a standard React application structure:

    src/: Source code directory.
        components/: React components.
        services/: API services.
        styles/: CSS styles.
        logger/: Logging utility.
        App.js: Main application component.
        index.js: Entry point of the application.

Dependencies

The UsersTable app relies on the following key dependencies:

    React: A JavaScript library for building user interfaces.
    Primereact: A React UI library.

Usage

The UsersTable app is designed to be user-friendly. Simply navigate through the table, filter, and interact with the NewPost feature. Enjoy a responsive and efficient application experience.

Error Handling
In case of errors during data fetching, detailed error messages are logged to the local storage. Users are also provided with user-friendly error messages to enhance the experience.

Loading Indicator
A loading spinner is displayed during data fetching to indicate that the application is working in the background.

Search Functionality
The search box enables users to filter the table by name or email, providing a quick and efficient way to find specific information.

Create New Post
The NewPost feature allows users to create a new post with validation. After successful creation, the list of user posts is updated with the new post.

Logging System
UsersTable implements a logging system using detailed logs stored in local storage, aiding in debugging and troubleshooting.

Responsive Design
UsersTable is optimized for both desktop and mobile devices, ensuring a seamless experience across various screen sizes.

Contributing
Feel free to contribute to the project by submitting bug reports, feature requests, or pull requests. Your input is valuable!

License
This project is licensed under the MIT License - see the LICENSE file for details.