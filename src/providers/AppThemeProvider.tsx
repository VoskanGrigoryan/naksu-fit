import { ConfigProvider, theme } from "antd";
import { gray, blue } from "@ant-design/colors";

const AppThemeProvider = ({ children }: { children: React.ReactNode }) => (
  <ConfigProvider
    theme={{
      algorithm: theme.darkAlgorithm,
      token: {
        colorBgBase: gray[9],
        colorPrimary: blue[5],
      },
    }}
  >
    <div
      style={
        {
          "--bg-base": gray[7],
          "--bg-container": "#1f1f1f",
          "--primary": blue[5],
          "--text-base": "#ffffff",
          "--border": "#303030",
          minHeight: "100vh",
          overflow: "hidden",
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  </ConfigProvider>
);

export default AppThemeProvider;
