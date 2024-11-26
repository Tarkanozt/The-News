import notifyLogo from "../logo.svg";

export function sendNotification(title, body) {
  if (!("Notification" in window)) {
    console.error("This browser does not support notifications.");
    return;
  }

  if (Notification.permission === "granted") {
    new Notification(title, {
      body,
      icon: notifyLogo,
    });
  } else if (Notification.permission !== "denied") {
    // Request permission if not already denied
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification(title, {
          body,
          icon: notifyLogo,
        });
      }
    });
  } else {
    console.warn("Notifications are denied by the user.");
  }
}
