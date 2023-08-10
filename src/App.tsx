import { CssBaseline } from "@mui/material";
import {
  StyledEngineProvider,
  Experimental_CssVarsProvider,
  experimental_extendTheme,
  THEME_ID,
} from "@mui/material/styles";

import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Auth from "./components/Auth";

function App() {
  const materialTheme = experimental_extendTheme();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />} path="/">
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route element={<Auth />}>
          <Route index element={<Home />} />
        </Route>
      </Route>
    )
  );

  return (
    <StyledEngineProvider injectFirst>
      <Experimental_CssVarsProvider theme={{ [THEME_ID]: materialTheme }}>
        <CssBaseline enableColorScheme />
        <RouterProvider router={router} />
      </Experimental_CssVarsProvider>
    </StyledEngineProvider>
  );
}

export default App;
