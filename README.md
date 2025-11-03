# Contact List Application

This is a simple Contact List web application that allows users to manage their contacts by adding, searching, and deleting them.

## Project Structure

```
ContactList
├── index.html        # Main HTML document for the application
├── styles.css        # Styles for the application
├── tries.js          # JavaScript functionality for managing contacts
├── Dockerfile        # Instructions to build a Docker image for the application
├── .dockerignore     # Files and directories to ignore when building the Docker image
└── README.md         # Documentation for the project
```

## Features

- **Search Contacts**: Users can search for contacts by name.
- **Add Contacts**: Users can add new contacts with a name and phone number.
- **Delete Contacts**: Users can delete contacts by name.

## Getting Started

To run this application locally, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   cd ContactList
   ```

2. Open `index.html` in your web browser to view the application.

## Running with Docker

To build and run the application using Docker, follow these steps:

1. Build the Docker image:
   ```
   docker build -t contact-list-app .
   ```

2. Run the Docker container:
   ```
   docker run -p 8080:80 contact-list-app
   ```

3. Open your web browser and go to `http://localhost:8080` to access the application.

## License

This project is licensed under the MIT License.