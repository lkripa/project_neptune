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
1. Download [the flight_finder repo](https://github.com/alexgastone/flight_finder) `git clone https://github.com/alexgastone/flight_finder.git`
2. Set up  Environment 
- `python3 -m venv venv`
- `source venv/bin/activate`
- `pip install -r requirements.txt`
3. Run `flask run` to start server on [http://127.0.0.1:5000/](http://127.0.0.1:5000/)
4. Run `$python calculate_cheapest.py`. You will be prompted to provide two user cities, possible destination cities that you wish to consider, outbound and inbound flight dates, and number of flights (ranked in order of total price) to display
  * Note: You'll have to provide your personal [RapidAPI key](https://rapidapi.com/skyscanner/api/skyscanner-flight-search) (free!). Once you have one, assign `get_key()` in a separate `config_api.py` file. 
  ``` 
  def get_key():
    api_key = 'key here'
    return api_key 
  ```

### Obtain MapBox accessToken
1. Sign up for a MapBox Account [here](https://account.mapbox.com/auth/signup/)
2. Create a `config.js` file in ./data/config.js and add token
`export var accessToken = 'access token string here';`
3. Add empty string for serverURL
`export var serverURL = '';`

### Run this code locally
Simply run: `npm start` <br />
Then checkout the website on `localhost:3000`

### Deploy code
First build the code to make it smaller and unreadable: `npm run build` <br />
<!-- Then deploy it with firebase (need to be setup and point to the `build` instead of the `public` folder) -->
