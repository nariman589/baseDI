import MainPage from "components/pages/mainPage/MainPage";
import ToTop, { pulseAnimation } from "components/ui/ToTop";
import { useEffect, useRef, useState } from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import themeLamp from "assets/themeBtn.svg";
import NavBar from "components/layouts/navBar/NavBar";
import "@fontsource/montserrat";
import Context from "components/hocs/Context";
import { Outlet, useLocation } from "react-router-dom";
import { PageWrapper } from "components/pages/mainPage/components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const theme = {
	colors: {
		main: "#ff6700",
		black: "#1D1D1B",
		grey: "#f1f2f5",
		white: "#ffffff",
		fontColor: "#1D1D1B",
	},
	background:
		"linear-gradient(130.46deg, rgba(255, 255, 255, 0.2) -0.88%, rgba(239, 239, 239, 0.2) 121.62%)",
	boxShadow: "0px 8px 12px rgba(129, 135, 189, 0.15)",
	borderRadius: "15px",
};
const darkTheme = {
	colors: {
		main: "#ff6700",
		black: "#ffffff",
		grey: "#222222",
		white: "#1D1D1B",
		fontColor: "#ffffff",
	},
	background:
		"radial-gradient(circle, rgba(36,36,36,1) 0%, rgba(28,28,28,1) 22%, rgba(46,46,46,1) 84%, rgba(33,32,32,1) 100%);",
	boxShadow: "0px 8px 12px rgba(128, 128, 128, 0.15)",
	borderRadius: "15px",
	isDarkTheme: true,
};

function App() {
	const checkTime = () => {
		const now = new Date();
		const hours = now.getHours();
		if (hours >= 20) return "dark";
		return "ligth";
	};

	const [toggleTheme, setToggleTheme] = useState(checkTime());
	const topRef = useRef<HTMLDivElement>(null);

	const toggleTheneFunc = () => {
		setToggleTheme((prev) => (prev === "ligth" ? "dark" : "ligth"));
	};

	const localtion = useLocation();

	return (
		<ThemeProvider theme={toggleTheme === "ligth" ? theme : darkTheme}>
			<Context>
				<GlobalStyles />
				<AppWrapper>
					<SecurityMessage ref={topRef}>
						Вы несете ответственность за несанкционированный доступ и
						использование конфиденциальной информации в личных целях!
					</SecurityMessage>
					<NavBar />
					<PageWrapper>
						{localtion.pathname === "/" ? <MainPage /> : <Outlet />}
					</PageWrapper>
					<ToggleTheme src={themeLamp} alt="Тема" onClick={toggleTheneFunc} />
					<ToTop targetRef={topRef} />
					<ToastContainer
						position="bottom-right"
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
						theme="light"
					/>
				</AppWrapper>
			</Context>
		</ThemeProvider>
	);
}

const ToggleTheme = styled.img`
	position: fixed;
	right: 6rem;
	bottom: 2rem;
	width: 1.25rem;
	background-color: ${({ theme }) => theme.colors.main};
	border: 1px solid ${({ theme }) => theme.colors.main};
	color: white;
	padding: 0.5rem;
	border-radius: 3rem;
	cursor: pointer;
	/* animation: ${pulseAnimation} infinite 5s linear; */
`;

const Header = styled.div``;

const SecurityMessage = styled.div`
	display: flex;
	background-color: #1d1d1b;
	color: #ffffff;
	font-size: 12px;
	font-weight: 400;
	padding-top: 5px;
	padding-bottom: 5px;
	justify-content: center;
	align-items: center;
`;

const AppWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

const GlobalStyles = createGlobalStyle<any>`
body {
  margin: 0;
  font-size: 1rem;
  font-family: Montserrat, sans-serif;
  font-weight: 400;
  color: var(--text-color);
  background: ${({ theme }) => theme.background};
}

`;

export default App;
