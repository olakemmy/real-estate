if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("/serviceWorker.js").then(
      function (registration) {
        console.log(
          "ServiceWorker registration successful with scope: ",
          registration.scope
        );
      },
      function (err) {
        console.log("ServiceWorker registration failed: ", err);
      }
    );
  });
}

// serviceWorker.js
self.addEventListener("activate", function (event) {
  // Optional: Get the socket.io client script
  importScripts(
    "https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.0.1/socket.io.min.js"
  );

  const socket = io("http://localhost:5000");

  socket.on("message", function (message) {
    // Handle the message
    // You can show a notification or update the Redux state using postMessage

    // Check if the message is not sent by the current user
    if (message.senderId !== message.userId) {
      // Send the message to the main thread
      self.clients.matchAll().then(function (clients) {
        clients.forEach(function (client) {
          client.postMessage({
            type: "NEW_MESSAGE",
            payload: message,
          });
        });
      });
    }
  });
});

// In your main JavaScript file
navigator.serviceWorker.addEventListener("message", function (event) {
  const message = event.data;
  // Dispatch the incrementUnread action
  if (message.senderId !== message.userId) {
    dispatch(
      incrementUnread({
        userId: message.userId,
        listingId: message.listingId,
      })
    );
  }
});


