import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import ExchangeRatesPage from "./pages/exchangRates";
import Nav from "./components/Nav";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/exchange-rates" element={<ExchangeRatesPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
