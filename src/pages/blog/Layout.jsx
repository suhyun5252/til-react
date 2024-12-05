import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <div style={{ backgroundColor: "pink" }}>로컬메뉴</div>
      <div>
        <h2> Outlet 자리</h2>
        <div
          style={{
            backgroundColor: "yellowgreen",
            width: "100%",
            minHeight: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 250,
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
export default Layout;
