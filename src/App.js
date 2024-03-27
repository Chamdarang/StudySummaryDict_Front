import "./App.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import InfoListComponent from './components/InfoListComponent';
import HeaderComponent from "./components/HeaderComponent";
import HomeComponent from "./components/HomeComponent";
import AuthProvider from "./security/AuthContext";
import DocListComponent from "./components/DocListComponent";
import DocModifyComponent from "./components/DocModifyComponent";
import DocDetailComponent from "./components/DocDetailComponent";



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
              <Route path="/d" element={
                <DocListComponent/>
              }></Route>
              <Route path="/d/e/" element={
                <DocModifyComponent/>
              }></Route>
              <Route path="/d/e/:id" element={
                <DocModifyComponent/>
              }></Route>
              <Route path="/d/v/:id" element={
                <DocDetailComponent/>
              }></Route>
            </Routes>
        </BrowserRouter>
      </AuthProvider>
  );
}

export default App;
