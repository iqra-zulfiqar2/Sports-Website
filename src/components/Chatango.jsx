import { useEffect } from "react";


const Chatango = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.id = "cid0020000404048443282";
    script.dataset.cfasync = "false";
    script.async = true;
    script.src = "//st.chatango.com/js/gz/emb.js";
    script.style.width = "100%";
    script.style.height = "100%";
    script.innerHTML = JSON.stringify({
      handle: "livematchzonebookmar",
      arch: "js",
      styles: {
        b: 100,
        c: "000000", // Background color (black)
        d: "000000", // Border color (black)
        l: "FFFFFF", // Link color (white)
        m: "FFFFFF", // Message text color (white)
        p: "10", // Padding
        r: 100, // Rounded corners
        surl: 0,
        allowpm: 0,
        fwtickm: 1,
      },
    });

    const chatDiv = document.getElementById("chatango-container");
    if (chatDiv) chatDiv.appendChild(script);

    return () => {
      if (chatDiv) chatDiv.innerHTML = ""; // Cleanup on unmount
    };
  }, []);

  return (
    <div
      id="chatango-container"
      style={{
        position: "fixed",
        right: 0, // Position it on the right side
        bottom: "50px",
        width: "300px",
        height: "500px",
        zIndex: 1000,
        backgroundColor: "#000000", // Black background
        color: "#FFFFFF", // White text
        marginTop: "20px", // Added margin top
      }}
    ></div>
  );
};

export default Chatango;
