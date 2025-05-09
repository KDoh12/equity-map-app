﻿# Equity Map Application


## Application Overview
The Equity Map Application aims to provide insights into equity via various socio-economic and demographic factors by visualizing US Census data across different geographic levels in Kentucky with a focus on the Lexington-Fayette County area. It features interactive choropleth maps for exploring data related to income, education, health, and more.

## Technical Overview
This repository contains a web application that provides an interactive, multi-pane map feature for comparing different geographical variables. It leverages React, Leaflet, and various other libraries to enhance data visualization and user experience.

### Technical Stack

- **React**: Modular, component-based architecture enhances UI development.
- **Vite**: Fast development server and efficient hot module reloading.
- **Tailwind CSS**: Utility-first styling for responsiveness and customizability.
- **React-Leaflet**: Integrates Leaflet maps into React applications.

## Features

- Dual-pane map for variable comparison
- Dynamic map legend
- Customizable map controls
- Eztensive variable selection with dataset descriptions

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (version 14 or higher)
- npm (version 6 or higher)

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Clone the Repository

```bash
git clone https://github.com/UniversityOfKentucky/equity-map-app.git
```

### Install Dependencies
```bash
npm install
```

### Environment Variables
The US Census API requires an API key for requests greater than 500 per day. Visit [https://api.census.gov/data/key_signup.html](https://api.census.gov/data/key_signup.html) to request a key.

If you are using an API key, create a .env file in the root of the project and add your key to it.
```
VITE_CENSUS_API_KEY=your_census_api_key_here
```
and then add the variable to the `constructFetchUrl` file
```js
const apiKey = import.meta.env.VITE_CENSUS_API_KEY;
// ...other code
let url = `${baseUrl}/${year}/${dataset}?get=${queryCodes}&for=${geoCode}&key={$apiKey}`
```


### Running the Application
To start the development server, run:
```bash
npm run dev
```
This will launch the app and open it in your default web browser.

### Building for Production

To build the application for production, run:
```bash
npm run build
```
This will create an optimized production build in the `dist` directory.

### Contributing

If you want to contribute to this project, please follow these steps:

	1.	Fork the repository.
	2.	Create a new branch: git checkout -b feature/your-feature-name.
	3.	Make your changes and commit them: git commit -m 'Add some feature'.
	4.	Push to the branch: git push origin feature/your-feature-name.
	5.	Create a pull request.

### License

This project is licensed under the MIT License.

### Contact

If you have any questions or feedback, feel free to reach out to the project maintainers.
