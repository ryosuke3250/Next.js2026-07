"use client";

import React, { useEffect, useState } from "react";

type MswProviderProps = {
  children: React.ReactNode;
};

export default function MswProvider({
  children,
}: MswProviderProps) {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => { 
      const startWorker = async () =>{
        const { worker } = await import("../mocks/browser");
        // MSWを起動する
        await worker.start({
          onUnhandledRequest:"bypass",
        });
        // MSWの起動完了後に画面を表示する
        setIsReady(true);
      };
      startWorker();
    },[]);
  //起動中は表示しない
  if(!isReady){
    return null;
  }

  return <>{children}</>;
}

//worker.start()でMSWを起動する役割