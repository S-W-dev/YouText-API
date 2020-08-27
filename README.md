# YouText-API
 The YouText API that allows you to control your phone number using a vareity of coding languages.

 You can get started in just a few easy steps!

 Step 1 • Download the YouText app for android (currently not published) (coming soon to IOS)
 Step 2 • Click the start service button in the app to start the service.
 Step 3 • Copy your API_KEY and CLIENT_SECRET into a text file. (You only need to copy them once, they never change)
 Step 4 • Find a coding language supported by our API and follow the instructions for each language below:

 ### JavaScript (Browser)

Step 1 • Add a script tag pointing to socket.io client of at least version 1.0.2 in your html.
Step 2 • Add another script tag pointing to the YouText.js or the YouText.min.js libraries that you downloaded.
Step 3 • Use the following code to get started:

```JavaScript
// Setup your new instance with an API_KEY and CLIENT_SECRET (you can have multiple instances running with different API_KEYs and CLIENT_SECRETs)
var yt = new YouText(<your API_KEY>, <your CLIENT_SECRET>);

// Connect to our servers
yt.Connect(); // you can use the following optional parameters in order: message_receivced_callback (by default console logs the message), server (by default is ours), connect_callback (by default gives a connection message), disconnect_callback (by default reloads the page)

// Verify/Authenticate with our servers, both functions serve the same purpose.
yt.Verify() // optional parameters: api_key (by default is the one you specified above)
// or
yt.Authenticate() // optional parameters: api_key (by default is the one you specified above)

yt.SendMessage(<your message>, <your recipient(s)>) // use a string for a single recipient, use an array for multiple reciptients

//to disconnect (not required)
yt.socket.disconnect()
```

