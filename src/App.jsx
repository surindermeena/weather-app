import { BrowserRouter, Route, Routes } from "react-router-dom";
import WeatherNewComp from "./Components/weatherNewComp";

function AppComponent() {
  return (
    <>
      <BrowserRouter future={{ v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<WeatherNewComp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AppComponent;
