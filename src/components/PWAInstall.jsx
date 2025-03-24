import { useState, useEffect } from "react";

const PWAInstall = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault(); // Prevent automatic prompt
      setDeferredPrompt(event);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("PWA installed");
        } else {
          console.log("PWA installation dismissed");
        }
        setDeferredPrompt(null);
      });
    }
  };

  return (
    <>
      {deferredPrompt && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-5 rounded-lg shadow-lg text-white text-center">
            <h2 className="text-lg font-bold mb-4">Install Live Match Zone</h2>
            <button 
              onClick={handleInstallClick} 
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white">
              Install
            </button>
            <button 
              onClick={() => setDeferredPrompt(null)} 
              className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-lg text-white ml-2">
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PWAInstall;
