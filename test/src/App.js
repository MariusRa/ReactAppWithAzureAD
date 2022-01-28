import './App.css';
import Home from './Home';
import WeatherController from "./WeatherController";
import {BrowserRouter, Route, NavLink, Routes} from 'react-router-dom';
import {PageLayout} from "./components/PageLayout";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { loginRequest } from "./authConfig";
import Button from "react-bootstrap/Button";
import {useState} from "react";
import { ProfileData } from "./components/ProfileData";
import { callMsGraph } from "./graph";



function ProfileContent() {
    const { instance, accounts } = useMsal();
    const [graphData, setGraphData] = useState(null);

    const name = accounts[0] && accounts[0].name;

    function RequestProfileData() {
        const request = {
            ...loginRequest,
            account: accounts[0]
        };

        // Silently acquires an access token which is then attached to a request for Microsoft Graph data
        instance.acquireTokenSilent(request).then((response) => {
            callMsGraph(response.accessToken).then(response => setGraphData(response));
        }).catch((e) => {
            instance.acquireTokenPopup(request).then((response) => {
                callMsGraph(response.accessToken).then(response => setGraphData(response));
            });
        });
    }

    return (
        <>
            <h5 className="card-title">Welcome {name}</h5>
            {graphData ?
                <ProfileData graphData={graphData} />
                :
                <Button variant="secondary" onClick={RequestProfileData}>Request Profile Information</Button>
            }
        </>
    );
};



function App() {
    return (
        <BrowserRouter>
            <div className="App container">
                <h3 className="d-flex justify-content-center m-3">
                    React JS Frontend
                </h3>
                <PageLayout>
                    <AuthenticatedTemplate>
                        <ProfileContent />
                    </AuthenticatedTemplate>
                    <UnauthenticatedTemplate>
                        <p>You are not signed in! Please sign in.</p>
                    </UnauthenticatedTemplate>
                </PageLayout>

                <nav className="navbar navbar-expand-sm bg-light navbar-dark">
                    <ul className="navbar-nav">
                        <li className="nav-item- m-1">
                            <NavLink className="btn btn-light btn-outline-primary" to="/home">
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item- m-1">
                            <NavLink className="btn btn-light btn-outline-primary" to="/weather">
                                WeatherController
                            </NavLink>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route path='/home' element={<Home/>}/>
                    <Route path='/weather' element={<WeatherController/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
