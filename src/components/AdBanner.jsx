import { useEffect, useRef } from "react";

const AdBanner = () => {
  const bannerRef = useRef(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const bannerWidth = isMobile ? 400 : 728;
    const bannerHeight = isMobile ? 50 : 90;

    const configScript = document.createElement("script");
    configScript.type = "text/javascript";
    configScript.innerHTML = `
      atOptions = {
        'key' : '329e4e16be857e74719c7bd77be59ed9',
        'format' : 'iframe',
        'height' : ${bannerHeight},
        'width' : ${bannerWidth},
        'params' : {}
      };
    `;

    const bannerScript = document.createElement("script");
    bannerScript.type = "text/javascript";
    bannerScript.src = "//trashycontinuousbubbly.com/329e4e16be857e74719c7bd77be59ed9/invoke.js";
    bannerScript.async = true;

    if (bannerRef.current) {
      bannerRef.current.innerHTML = "";
      bannerRef.current.appendChild(configScript);
      bannerRef.current.appendChild(bannerScript);
    }

    // Optional: popup script
    const popupScript = document.createElement("script");
    popupScript.type = "text/javascript";
    popupScript.src = "//trashycontinuousbubbly.com/33/15/ed/3315edce9b2d181ee4fb1da4836791ce.js";
    popupScript.async = true;
    document.body.appendChild(popupScript);
  }, []);

  return (
    <div
      ref={bannerRef}
      style={{
        width: "100%",
        maxWidth: window.innerWidth < 768 ? "390px" : "728px", // responsive width
        height: "auto",
        marginLeft: "0",
        textAlign: "left",
        overflow: "hidden",
      }}
    />
  );
};

export default AdBanner;
