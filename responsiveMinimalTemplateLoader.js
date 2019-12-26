var gameInstance = null;
var gameContainer = null;
var gameCanvas = null;
var runtimeInitialized = false;
var canvasAspectRatio = false;

var ua = null;
var browserType = null;

gameInstance = UnityLoader.instantiate("unityContainer", "Build/Build.json",  {
    onProgress: UnityProgress,
    Module: {
        backgroundColor: "#FFDA16",
        onRuntimeInitialized: OnRuntimeIntialized
    }
});

function UnityProgress(unityInstance, progress) {
    if (!unityInstance.Module)
      return;
    
    if (!unityInstance.logo) {
      unityInstance.logo = document.createElement("div");
      unityInstance.logo.className = "logo " + unityInstance.Module.splashScreenStyle;
      unityInstance.container.appendChild(unityInstance.logo);
    }
    if (!unityInstance.progress) {    
      unityInstance.progress = document.createElement("div");
      unityInstance.progress.className = "progress " + unityInstance.Module.splashScreenStyle;
      unityInstance.progress.empty = document.createElement("div");
      unityInstance.progress.empty.className = "empty";
      unityInstance.progress.appendChild(unityInstance.progress.empty);
      unityInstance.progress.full = document.createElement("div");
      unityInstance.progress.full.className = "full";
      unityInstance.progress.appendChild(unityInstance.progress.full);
      unityInstance.container.appendChild(unityInstance.progress);
    }
    unityInstance.progress.full.style.width = (100 * progress) + "%";
    unityInstance.progress.empty.style.width = (100 * (1 - progress)) + "%";
    if (progress == 1)
      unityInstance.logo.style.display = unityInstance.progress.style.display = "none";
}

function OnRuntimeIntialized() {
    runtimeInitialized = true;
    gameCanvas = gameInstance.container.querySelector("canvas");
    handleResize();
}

function CheckBrowser() {
    ua = window.navigator.userAgent.toLowerCase();

    if (ua.indexOf('msie') != -1 || ua.indexOf('trident') != -1) {
        browserType = "IE";
    }
    else if (ua.indexOf('edge') != -1) {
        browserType = "Edge";
    }
    else if (ua.indexOf('chrome') != -1) {
        browserType = "Chrome";
    }
    else if (ua.indexOf('firefox') != -1) {
        browserType = "FireFox";
    }
    else if (ua.indexOf('safari') != -1) {
        browserType = "Safari";
    }

    if (ua.indexOf('iphone') != -1) {
        browserType = "iPhone";
    }
    else if (ua.indexOf('ipad') != -1) {
        browserType = "iPad";
    }
    else if (ua.indexOf('android') != -1) {
        if (ua.indexOf('mobile') != -1) {
            browserType = "Android";
        }
        else {
            browserType = "Android - Tablet";
        }
    }

    SendUserAgent(browserType);
}

function handleResize() {
    var windowHeight = window.innerHeight;

    if(gameCanvas != null) {
        var canvasSize = getCanvasSize();
        gameCanvas.width = canvasSize.width;
        gameCanvas.height = canvasSize.height;
    }

    gameContainer.style.height = windowHeight+"px";
}

document.addEventListener("DOMContentLoaded", function(event) {
    gameContainer = document.body.querySelector("#unityContainer");
    window.addEventListener("resize", handleResize);
    handleResize();
});

function getCanvasSize() {
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;

    if(canvasAspectRatio) {
        var aspectWindowHeight = windowWidth / canvasAspectRatio;
        if(aspectWindowHeight > windowHeight) {
            windowWidth = windowHeight * canvasAspectRatio;
        }
        else {
            windowHeight = aspectWindowHeight;
        }
    }

    return {width:windowWidth,height:windowHeight};
}
