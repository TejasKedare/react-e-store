
import { AppProvider } from "./context/AppProvider";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <AppProvider>
      <Header />
        <main className="flex-grow">
          <AppRoutes />
        </main>
      <Footer />
      </AppProvider>
    </div>
  );
}

export default App;
