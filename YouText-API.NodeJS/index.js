const io = require('socket.io-client');

/*
This API was created by ConcreteGames LLC and was made for commercial use. 

DO NOT COPY

Dependencies:
Socket.IO for JavaScript
*/
/**
 * The YouText API that allows you to send, read, and receive text messages using your phone and phone number.
 * @function Connect • Setup initial connection to our servers
 * @function Verify • Authenticate with our servers in order to send and receive messages
 * @function SendMessage • Send a text message
 */
class YouText {
    /**
     * Creates a new instance of the API
     * @param {*} api_key The API_KEY that you coppied from the app
     * @param {*} client_secret The CLIENT_SECRET that you coppied from the app
     */
    constructor(api_key, client_secret) {
        try {
            io;
            this.api_key = api_key || undefined;
            this.client_secret = client_secret || undefined;
            this.socket = undefined;
            return true;
        } catch (x) {
            console.log("Please add socket.io to your project.");
            return false;
        }
    }
    /**
     * Setup initial connection to our servers
     * @param {*} received_message_callback The function to be called when a message is recevied
     * @param {*} server The server to connect to
     * @param {*} connect_callback The function to be called on connection
     * @param {*} disconnect_callback The function to be called on disconnect
     */
    Connect(received_message_callback = (data) => {
        console.log("[YouText]: The following message was received from " + data.sender + ":\n" + data.message);
    }, server = 'http://concretegames.net:2345', connect_callback = () => {
        console.log("[YouText]: Successfully connected to server.");
    }, disconnect_callback = () => {
        console.log();
        //window.location.reload();
    }) {

        this.socket = io.connect(server);
        this.socket.on('disconnect', disconnect_callback);
        this.socket.on('connect', connect_callback);
        this.socket.on('received_message', received_message_callback)

    }
    /**
     * Authenticate with our servers in order to send and receive messages
     * @param {*} api_key The API_KEY that you coppied from the app • NOT REQUIRED
     * @param {*} client_secret The CLIENT_SECRET that you coppied from the app • NOT REQUIRED
     */
    Verify(api_key = this.api_key, client_secret = this.client_secret) {
        this.socket.emit("verify", {
            api_key: api_key,
            client_secret: client_secret
        });
    }

    /**
     * Authenticate with our servers in order to send and receive messages
     * @param {*} api_key The API_KEY that you coppied from the app • NOT REQUIRED
     * @param {*} client_secret The CLIENT_SECRET that you coppied from the app • NOT REQUIRED
     */
    Authenticate(api_key = this.api_key, client_secret = this.client_secret) {
        this.socket.emit("verify", {
            api_key: api_key,
            client_secret: client_secret
        });
    }
    /**
     * Send a text message
     * @param {*} message The text message to be sent
     * @param {*} recipients Phone number of recipient(s)
     */
    SendMessage(message, recipients) {
        if (Array.isArray(recipients)) {
            //multiple recipients
            this.socket.emit("send_messages", {
                api_key: this.api_key,
                message: message,
                recipient: recipients
            });
        } else {
            this.socket.emit("send_message", {
                api_key: this.api_key,
                message: message,
                recipient: recipients
            });
        }
    }
}

module.exports = YouText;
