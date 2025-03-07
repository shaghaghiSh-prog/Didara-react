import { createRoot } from "react-dom/client";
import React from "react";
import Alert from "./alert";

let alertContainer = null;
let alertRoot = null;
let alerts = [];

const customAlert = (message, type = "info") => {
  if (!alertContainer) {
    alertContainer = document.createElement("div");
    alertContainer.style.position = "fixed";
    alertContainer.style.top = "20px";
    alertContainer.style.right = "20px";
    alertContainer.style.display = "flex";
    alertContainer.style.flexDirection = "column";
    alertContainer.style.alignItems = "flex-end";
    alertContainer.style.zIndex = "9999999999999";
    document.body.appendChild(alertContainer);
    alertRoot = createRoot(alertContainer);
  }

  const alertId = Date.now();
  alerts.push({ id: alertId, message, type });

  const removeAlert = (id) => {
    alerts = alerts.filter((alert) => alert.id !== id);
    renderAlerts();
  };

  renderAlerts();

  setTimeout(() => removeAlert(alertId), 4055);
};

const renderAlerts = (removeAlert) => {
  alertRoot.render(
    <>
      {alerts.map((alert, index) => (
        <Alert
          key={alert.id}
          message={alert.message}
          type={alert.type}
          onClose={() => removeAlert(alert.id)}
          style={{ marginBottom: index < alerts.length - 1 ? "10px" : "0" }}
        />
      ))}
    </>
  );
};

export default customAlert;
