# City Wanderer diary

This project implements an application able to manage all the CRUD operations taking the information from a given Backend API focused on geographic locations.

The application included a main page divided in two parts:

* #### Map
  The map is based on MapBox. It locates every city with coordinates provided within the map. **Beware that due to the exactitude required when given especific coordinates, a change of a few decimals can move the marker a bit out of place**. Also, if latitutde and longitude would be inverted, the positioning would be totally off.

* #### City list
  On city list an automatic list with all the places is generated to access easily the information. By passing over the images, you will be shown the information related to the place and given the option to delete completely (**Beware, this action will effectively remove the entry from the API**).
  On this page you can create new entries using the modal form provided. On creation, the entry will be added to the API.
  Clicking on the information will show the city details page. On this page the Image, title and Description are shown and the last two can be updated dinamically (**Beware, updating them here will also modify the API entry**)

## Technical information

  All application is SPA. The routes are managed with react-router-dom. Apart from the main route that includes both the map and the cities list (handled by toggling), the city details have their own dynamic routes. There is also a 404 page for any broken route.

  All components are functional. The state and lifecycle are handled via hooks. All the global state is managed with react-context.

  For performance, rect-lazy is used to optimize component loading. This helps with load charge for components but won't avoid some lagging on the map. This is due to the high volume of data Mapbox is rendering. Due to this, the map has been optimized as much as posible using a simpler style to reduce layers.

  For styling SCSS is used as preprocessor.

  The main focus one choosing tools has been to avoid external dependices wherever possible. This ensures some less third party dependency. The external tools used are only Mapbox, react-map, react-router and classnames. All of  them are well maintained projects widely used.

## Deployed application

The application can be accessed on its deployed version in **Netlify**

https://city-explorer-diary.netlify.app/

## Available Scripts

### `yarn start`

### `yarn test`

### `yarn build`

### `yarn eject`

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).