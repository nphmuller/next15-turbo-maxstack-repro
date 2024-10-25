"use client";

import { createTheme } from "@mui/material/styles";
import InfoSharp from "@mui/icons-material/InfoSharp";

createTheme({
  components: {
    MuiCheckbox: {
      defaultProps: {
        // Comment this out and the error goes away
        icon: <InfoSharp />,
      },
    },
  },
});

// If we don't render anything and just import for the side effect, the error doesn't happen
// For the error to happen we need to import this wrapper and render it somewhere
export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      {/* If the reference to InfoSharp above is commented out, and it is rendered here, the error also doesn't happen */}
      {/* <InfoSharp /> */}
    </>
  );
}
