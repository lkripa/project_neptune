# Project Neptune

Web App for Post-Covid Times <br />
Want to meet your friend in another city and are having trouble finding the cheapest flight for both of you? <br />
Choose an airport city for you and your friend and we'll give you the 3 cheapest options to see each other! <br />
Visit it on: https://projectneptune-167d5.web.app

*For the full webapp functionality, check out [this repo](https://github.com/alexgastone/flight_finder) with Alex's back-end work!*

### Installation
 - Install [npm](https://www.npmjs.com/get-npm)
 - Download this repo with `git clone https://github.com/lkripa/projectNeptune.git`
 - Run `npm install` within the main folder 

### Start Local Flask Server
1. Clone [the flight_finder repo](https://github.com/alexgastone/flight_finder)
2. Set up  Environment 
- `python3 -m venv venv`
- `source venv/bin/activate`
- `pip install -r requirements.txt`
3. Run `flask run` to start server
4. Run `$python calculate_cheapest.py`. You will be prompted to provide two user cities, possible destination cities that you wish to consider, outbound and inbound flight dates, and number of flights (ranked in order of total price) to display
  * Note: You'll have to provide your personal [RapidAPI key](https://rapidapi.com/skyscanner/api/skyscanner-flight-search) (free!). Once you have one, assign `api_key` in a new `config.py` file. 

### Run this code locally
Simply run: `npm start` <br />
Then checkout the website on `localhost:3000`

### Deploy code
First build the code to make it smaller and unreadable: `npm run build` <br />
Then deploy it with firebase (need to be setup and point to the `build` instead of the `public` folder)
