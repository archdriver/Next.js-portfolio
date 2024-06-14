"use client";
import { useEffect } from "react";

interface Props {
  twitter?: any;
  children?: any;
}

const TwitterEmbededHandler = ({ twitter, children }: Props) => {
  useEffect(() => {
    // scriptを読み込み
    const script: HTMLScriptElement = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    document.body.appendChild(script);

    // アンマウント時に一応scriptタグを消しておく
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: twitter || children }}></div>;
};

export default TwitterEmbededHandler;
