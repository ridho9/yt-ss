function getScreenshot() {
  try {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const video = document.querySelector("video");
    console.log("video", video);
    canvas.width = video.offsetWidth;
    canvas.height = video.offsetHeight;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    console.log("drawed image");

    canvas.toBlob(blob => {
      console.log("blob to send", blob);
      if(blob === null) {
        return;
      }
      browser.runtime.sendMessage({blob})
      .then(e => console.log(e))
      .catch(err => console.error(e));
    })

  } catch(e) {
    console.error(e);
  }
}


function attach() {
  window.addEventListener("keydown", function (ev){
    if(ev.type === "keydown" && ev.code === "KeyS" && ev.altKey && ev.shiftKey && !ev.ctrlKey) { 
      getScreenshot();
    }
  });

  console.log("attached ss event");
};

let init = () => {
  console.log("running init");
  if (window.top.document.readyState === 'complete') {
      attach();
  } else {
      window.top.addEventListener('load', attach);
  }
};

init();
console.log("end of script");
