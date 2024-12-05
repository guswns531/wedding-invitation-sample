import React from "react";
import { Routes, Route } from "react-router-dom";
import Bride from "./pages/Bride";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/bride" element={<Bride/>}/>
        <Route path="*" element={<Bride/>}/>
      </Routes>
    </div>
  );
};

export default App;