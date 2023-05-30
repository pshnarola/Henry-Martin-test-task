import { Routes, Route, BrowserRouter as Router } from "react-router-dom"
import { Provider } from "react-redux"
import { QueryClient, QueryClientProvider } from 'react-query';
import Dashboard from './Page/Dashboard'
import Layout from './layout';
import Contact from './Page/Contact';
import Map from './Page/Map';
import './App.css'
import ContactAddEdit from "./Page/Contact/ContactAddEdit";
import store from "./store/store";
import Details from "./Page/Contact/Details";


const queryClient = new QueryClient();

function App() {
	return (
		<div className="App">
			<QueryClientProvider client={queryClient}>
				<Provider store={store}>
					<Router>
						<Layout>
							<Routes>
								<Route path="/" element={<Dashboard />} />
								<Route path="/contact" element={<Contact />} />
								<Route path="/manage-contact" element={<ContactAddEdit />} />
								<Route path="/details" element={<Details />} />
								<Route path="/map" element={<Map />} />
							</Routes>
						</Layout>
					</Router>
				</Provider>
			</QueryClientProvider>
		</div>
	)
}

export default App
