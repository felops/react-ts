import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Route, Routes } from "react-router";
import EstabilishmentDetailsPage from "./pages/EstabilishmentDetailsPage";
import Wrapper from "./pages/Wrapper";

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Wrapper />}>
            <Route index element={<HomePage />} />
            <Route path=":id/details" element={<EstabilishmentDetailsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App;
