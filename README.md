# Bingo Draw App

Bingo Draw App is a real-time bingo drawing application that helps you entertain your friends or family during gatherings. Generate random bingo numbers and keep track of all the drawn numbers.

## Features

- Start, pause, and reset the bingo drawing
- Display the current drawn number
- Show a table with all the numbers and highlight the drawn ones
- Set the interval time between each draw

## Installation

1. Clone the repository
```sh
git clone https://github.com/yourusername/bingo-draw-app.git
```

2. Navigate to the project directory
```sh
cd bingo-draw-app
```

3. Install the required dependencies
```sh
npm install
```

4. Create a `.env` file at the root of the project and set the configuration variables
```sh
BINGO_RANGE_MIN=1
BINGO_RANGE_MAX=90
DEFAULT_TIMER=4
```

5. Start the development server
```sh
npm run dev
```

The application should now be running at **http://localhost:3000**.

## Configuration

You can configure the range of numbers used in the bingo draw and the default timer by setting the environment variables in the `.env` file.

```makefile
BINGO_RANGE_MIN=1
BINGO_RANGE_MAX=90
DEFAULT_TIMER=4
```

Change the **`BINGO_RANGE_MIN`** and **`BINGO_RANGE_MAX`** values to adjust the range of numbers used in the bingo draw. Set the **`DEFAULT_TIMER`** to control the default interval time between each draw.

## License

This project is **[MIT licensed](https://opensource.org/licenses/MIT)**.