function listener(event) {
  console.log("backgroud onmessage", event);
  return event.blob.arrayBuffer().then(
    buffer => browser.clipboard.setImageData(buffer, "png")
  ).then(() => {
    return browser.notifications.create("screenshot-notification", {
      type: "basic",
      title: "YTSS",
      message: "screenshot taken successfully"
    })
  })
}

browser.runtime.onMessage.addListener(listener)