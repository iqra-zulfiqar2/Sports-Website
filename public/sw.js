self.addEventListener("notificationclick", function (event) {
    event.notification.close();
    event.waitUntil(
        self.clients.matchAll({ type: "window", includeUncontrolled: true })
            .then((allClients) => {
                if (allClients.length > 0) {
                    return allClients[0].focus();
                }
                return self.clients.openWindow(event.notification.data.url);
            })
            .catch((err) => console.error("Error opening window:", err))
    );
});
