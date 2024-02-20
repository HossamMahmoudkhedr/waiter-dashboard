import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from 'react-router-dom';
import './App.css';
import RootLayout from './pages/rootLayout';
import Home from './components/home';
import AppBuilder from './components/appBuilder';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route
			path="/"
			element={<RootLayout />}>
			<Route
				index
				element={<Home />}
			/>
			<Route
				path="/appBuilder"
				element={<AppBuilder />}
			/>
		</Route>
	)
);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
