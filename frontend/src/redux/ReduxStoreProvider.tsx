"use client";
import { useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";

export default function ReduxStoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [storeAndPersistor] = useState(() => {
    return { store, persistor };
  });

  return (
    <Provider store={storeAndPersistor.store}>
      <PersistGate loading={null} persistor={storeAndPersistor.persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
