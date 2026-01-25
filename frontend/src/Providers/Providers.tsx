"use client";

import UserProvider from "@/context/UserContext";
import MyContextProvider from "@/lib/MyContextProvider";
import SessionProviderForNextAuth from "@/nextAuth/SessionProviderForNextAuth";
import ReduxStoreProvider from "@/redux/ReduxStoreProvider";
import { Toaster } from "sonner";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <MyContextProvider>
      <SessionProviderForNextAuth>
        <UserProvider>
          <ReduxStoreProvider>
            <Toaster />
            {children}
          </ReduxStoreProvider>
        </UserProvider>
      </SessionProviderForNextAuth>
    </MyContextProvider>
  );
};

export default Providers;
