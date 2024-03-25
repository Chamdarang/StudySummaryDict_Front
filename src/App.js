import "./App.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import InfoListComponent from './components/InfoListComponent';
import InfoDetailComponent from "./components/InfoDetailComponent";
import HeaderComponent from "./components/HeaderComponent";
import HomeComponent from "./components/HomeComponent";
import AuthProvider from "./security/AuthContext";



function App() {
  return (
      <AuthProvider>
        <BrowserRouter>
          <HeaderComponent/>
            <Routes>
            <Route path="/" element={
                <HomeComponent/>
              }></Route>
              <Route path="/l" element={
                <InfoListComponent/>
              }></Route>
              <Route path="/d/:id" element={
                <InfoDetailComponent/>
              }></Route>
            </Routes>
        </BrowserRouter>
      </AuthProvider>
  );
}

export default App;
