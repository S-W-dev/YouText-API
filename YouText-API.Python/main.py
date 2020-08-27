import os
import sys
import socketio
import json


class YouText:
    def __init__(self, api_key, client_secret):
        self.api_key = api_key
        self.client_secret = client_secret
        self.sio = None

    def Connect(self, received_message_callback = lambda data: print("\n[YouText]: The following message was received from " + data['sender'] + ":\n" + data['message']),
    server = "http://concretegames.net:2345",
    connect_callback = lambda: print("[YouText]: Successfully connected to server."),
    disconnect_callback = lambda: os.execl(sys.executable, os.path.abspath(__file__), *sys.argv)):
        
        self.sio = socketio.Client()
        
        self.sio.connect(server)
        
        #self.Authenticate()

        @self.sio.event
        def connect():
            connect_callback()
        @self.sio.event
        def disconnect():
            disconnect_callback()
        @self.sio.event
        def received_message(data):
            received_message_callback(data)
    def Verify(self):
        api_key = self.api_key
        client_secret = self.client_secret
        self.sio.emit("verify", {
            'api_key': api_key,
            'client_secret': client_secret
        })
    def Authenticate(self):
        api_key = self.api_key
        client_secret = self.client_secret
        self.sio.emit("verify", {
            'api_key': api_key,
            'client_secret': client_secret
        })
    def SendMessage(self, message, recipients):
        if (isinstance(recipients, list)):
           self.sio.emit("send_messages", {
                'api_key': self.api_key,
                'message': message,
                'recipient': recipients
            })
        else:
            self.sio.emit("send_message", {
                'api_key': self.api_key,
                'message': message,
                'recipient': recipients
            })

