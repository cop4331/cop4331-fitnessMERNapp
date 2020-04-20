import React, { useState } from "react";

function Login(props) {
  var loginName;
  var loginPassword;

  const [message, setMessage] = useState("");

  const doLogin = async (event) => {
    event.preventDefault();

      var body = '{"username":"' + loginName.value + '","password":"' + loginPassword.value + '"}';
    var xhr = new XMLHttpRequest();
	xhr.open("POST", "http://my-gym-pro.herokuapp.com/api/login", true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
       try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				var res = JSON.parse(xhr.responseText);
      
      if (res.Error == 'Username does not exist.')
      {
        setMessage("Username does not exist.");
        return;
      }
      if (res.Error == 'Incorrect password.')
      {
        setMessage('Incorrect password.');
        return;
      }
      if (res.Error == 'Email has not been verified.')
      {
        setMessage('Email has not been verified.');
        return;
      }
      
        var user = {
          username: loginName.value,
          id: res.id,
          access_token: res.AccessToken
        };
        
        localStorage.setItem("user_data", JSON.stringify(user));

        setMessage("");
        window.location.href = "/access";
			}
		};
		xhr.send(body);

       
    } catch (e) {
      alert(e.toString());
      return;
    }
  };

  return (
    <div id="loginDiv">
      <form onSubmit={doLogin}>
        <span id="inner-title">PLEASE LOG IN</span>
        <input
          type="text"
          id="loginName"
          placeholder="Username"
          ref={(c) => (loginName = c)}
        />
        <br />
        <input
          type="password"
          id="loginPassword"
          placeholder="Password"
          ref={(c) => (loginPassword = c)}
        />
        <br />
        <input
          type="submit"
          id="loginButton"
          class="buttons"
          value="Do It"
          onClick={doLogin}
        />
      </form>
      <span id="loginResult">{message}</span>
    </div>
  );
}

export default Login;
