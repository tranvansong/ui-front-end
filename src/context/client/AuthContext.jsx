import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { login as loginApi } from "../../api/auth";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Trạng thái user
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [authMessage, setAuthMessage] = useState(""); // Trạng thái thông báo
  const navigate = useNavigate();

  // Khôi phục trạng thái từ token trong localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const dateNow = Date.now(); // Lấy thời gian hiện tại

        // Kiểm tra token hết hạn
        if (decoded.exp * 1000 < dateNow) {
          console.log("Token expired");
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          // Đặt lại thông tin user
          setUser({
            userId: decoded.userId,
            email: decoded.sub,
            role: decoded.Authorities[0]?.authority,
          });
        }
      } catch (error) {
        console.error("Token không hợp lệ", error);
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
    setLoading(false); // Đã khôi phục trạng thái
  }, []);

  // Hàm login
  const login = async (email, password) => {
    try {
      const data = await loginApi(email, password);
      localStorage.setItem("token", data.token);
      const decoded = jwtDecode(data.token);

      setUser({
        userId: decoded.userId,
        email: decoded.sub,
        role: decoded.Authorities[0]?.authority,
      });
      navigate("/home");
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  // Hàm logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    setAuthMessage("Đăng xuất thành công!");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, authMessage, setAuthMessage, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
