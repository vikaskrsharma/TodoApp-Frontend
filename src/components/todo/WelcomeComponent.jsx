import axios from "axios";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { retrieveHelloWorld, retrieveHelloWorldBean, retrieveHelloWorldBeanWithPathVariable } from "./api/HelloWorldApiService";
import { useAuth } from "./security/AuthContext";

function WelcomeComponent() {
    const { username } = useParams();
    const [message, setMessage] = useState(null);

    const authContext = useAuth();
    const token = authContext.token;

    function callHelloWorld() {
        retrieveHelloWorld(token)                                     //http://localhost:8080/hello-world
            .then((response) => successfulResposne(response))
            .catch((error) => errorResposne(error))
            .finally(() => console.log('finally cleanup'));
    }

    function callHelloWorldBean() {
        retrieveHelloWorldBean(token)                                  //http://localhost:8080/hello-world
            .then((response) => successfulResposne(response))
            .catch((error) => errorResposne(error))
            .finally(() => console.log('finally cleanup'));
    }

    function callHelloWorldBeanWithPathVariable() {
        retrieveHelloWorldBeanWithPathVariable('Vick', token)                                  //http://localhost:8080/hello-world
            .then((response) => successfulResposne(response))
            .catch((error) => errorResposne(error))
            .finally(() => console.log('finally cleanup'));
    }

    function successfulResposne(response) {
        // setMessage(response.data);
        setMessage(response.data.message);
        console.log(response);
    }

    function errorResposne(error) {
        console.log(error);
    }

    return (
        <div>
            <h1>Welcome {username}</h1>
            <div className="Welcome">
                Your todos. - <Link to='/todos'>Go Here</Link>
            </div>
            <div>
                <button className="btn btn-success m-3" onClick={callHelloWorld}>Call Hello World</button>
            </div>
            <div>
                <button className="btn btn-success m-3" onClick={callHelloWorldBean}>Call Hello World Bean</button>
            </div>
            <div>
                <button className="btn btn-success m-3" onClick={callHelloWorldBeanWithPathVariable}>
                    Call Hello World Bean With Variable</button>
            </div>
            <div className="text-info">{message}</div>
        </div>

    )
}

export default WelcomeComponent;