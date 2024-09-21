
## Authors
   - [@iolmstead23](https://github.com/iolmstead23)

## Demo
   [Vercel Deployment](https://olmstead-garden.vercel.app/)

# Project Summary

## Project Description

   This project is a web application designed to manage and visualize garden plots. It allows users to input and track various details about their garden plots, including planting dates, harvest dates, and other relevant information. The application provides a user-friendly interface for managing garden data and visualizing the status of different plots.

## Languages and Frameworks

- **Languages:** TypeScript, JavaScript
- **Frameworks:** React, Tailwind CSS
- **Libraries:** Flowbite, React Router, React Hook Form

## Features

### 1. **Theme Selection**
   - **Description:** Users can select from a list of predefined themes to customize the appearance of the application.
   - **Implementation:** The `ChangeThemeDropdown` component provides a dropdown menu for selecting a theme. The available themes include "bulbasaur", "squirtle", and "charmander". The selected theme is applied to the application state and updates the UI accordingly.

### 2. **Plot Creation and Management**
   - **Description:** Users can create and manage garden plots by inputting various details such as planting dates and harvest dates.
   - **Implementation:** The application includes forms for entering plot information, and the data is used to calculate and display relevant statistics. The `DatepickerModalWrapper` component allows users to select planting dates, which are then used to calculate harvest dates.

### 3. **Responsive Design**
   - **Description:** The application is designed to be responsive and works well on different screen sizes.
   - **Implementation:** Tailwind CSS is used to ensure that the layout adjusts appropriately for various devices, providing a seamless user experience.

### 4. **Data Visualization**
   - **Description:** The application provides visual representations of garden data, making it easy for users to understand the status of their plots.
   - **Implementation:** The `ResourceStats` component displays various statistics related to the garden plots, including the number of plots, types of plants, and other relevant information.

## How to Run the Project

### 1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-repo/garden-manager.git
   cd garden-manager
   ```

### 2. **Install dependencies:**
   ``` npm install ```

### 3. **Start the development server:**
   ``` npm run dev ```

   Open the application in your browser: Navigate to http://localhost:3000 to view the application.

### **Conclusion**
   This project provides a comprehensive solution for managing and visualizing garden plots. With its user-friendly interface and robust functionality, it helps users keep track of their garden data efficiently. The use of modern frameworks and libraries ensures a smooth and responsive user experience.

## **License**
   [GNU Affero General Public License v3.0](https://choosealicense.com/licenses/agpl-3.0/)