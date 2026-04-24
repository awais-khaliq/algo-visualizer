# Algorithm Visualizer

A web-based visualization tool for understanding how various sorting algorithms process data in real-time. Built to help computer science students and developers intuitively grasp algorithmic time complexities and data manipulation.

## Overview

Sorting algorithms can be abstract and difficult to comprehend through code alone. This application provides a step-by-step visual representation of popular sorting methods. It renders a dynamic array of values and visually tracks the comparisons, swaps, and sorted elements as the algorithm executes.

## Features

* Real-Time Visualization: Watch elements swap and sort interactively.
* Multiple Algorithms: Includes implementations for Bubble Sort, Merge Sort, Quick Sort, and more.
* Adjustable Constraints: Modify the size of the dataset and the speed of the visualization to observe performance differences.
* Responsive Interface: Clean, custom CSS styling focused on content visibility and user control.

## Technology Stack

* Frontend Framework: React (initialized via Vite for modern fast-refresh builds)
* Styling: Custom CSS
* State Management: React Hooks

## How to Run Locally

1. Clone this repository.
2. Navigate into the project directory and install the necessary dependencies:
   ```bash
   npm install
   ```
3. Start the local development server:
   ```bash
   npm run dev
   ```
4. The application will be accessible at http://localhost:5173.

## Usage

Once the application is running, generate a new array using the control panel. Select a sorting algorithm and click "Sort" to begin the visualization. The speed slider lets you slow down or speed up the animation.
