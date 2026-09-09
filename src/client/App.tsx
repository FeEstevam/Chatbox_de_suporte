import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ChatSupport from "./pages/ChatSupport";

/**
 * App — Router principal da aplicação CashFlow Chatbox
 *
 * Rotas:
 *   /         → redireciona para /chat
 *   /chat     → página do chatbot de suporte
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/chat" replace />} />
        <Route path="/chat" element={<ChatSupport />} />
        {/* Compatibilidade com rota antiga /suporte */}
        <Route path="/suporte" element={<Navigate to="/chat" replace />} />
        {/* 404 fallback */}
        <Route path="*" element={<Navigate to="/chat" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
