# Contact Management App
The Contact Management App is a comprehensive solution designed for managing contacts efficiently. The app features full CRUD (Create, Read, Update, Delete) operations to handle contact information and also includes a dashboard that provides insights into COVID-19 cases. The dashboard displays a graph of COVID-19 cases over time and a map highlighting country-wise distribution of cases. This app is created using NextJS framework which is built on top of ReactJS to provide a more structured and optimized codebase.

## Features
### Contacts Management
- Create, Read, Update, Delete operations for contacts for managing contacts efficiently
- Easy operations of contacts in just few step

### Dashboard
- A dashboard showing covid reports till date
- A line chart showing the cases fluctuations of COVID-19 cases over time
- A map highlighting country-wise distribution of cases

## Libraries Used
- Typescript to type-check the code providing a better developing experince
- Tailwind CSS for mobile-first approach stylling providing responsive UI
- Redux is used to store the contacts data
- React-chart-js2 for plotting the graph of COVID-19 cases
- React-Leaflet for showing the country-wise distribution of COVID-19 cases on map

## APIs Used
- World wide data of cases: https://disease.sh/v3/covid-19/all
- Country Specific data of cases: https://disease.sh/v3/covid-19/countries
- Graph data for cases with date: https://disease.sh/v3/covid-19/historical/all?lastdays=all

## Quick Start: Installing and Running Your App
1. Clone the repository: `git clone https://github.com/Glitch-dm7/contact-management-app.git`
2. Install dependencies: `npm i`
3. Start the app in dev mode: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
