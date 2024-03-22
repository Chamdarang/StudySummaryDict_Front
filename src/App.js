import "./App.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import InfoListComponent from './components/InfoListComponent';
import HeaderComponent from './components/HeaderComponent';
import InfoDetailComponent from "./components/InfoDetailComponent";
import AuthProvider from "./security/AuthContext";

function App() {
  return (
      <AuthProvider>
        <BrowserRouter>
          <HeaderComponent/>
            <Routes>
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
