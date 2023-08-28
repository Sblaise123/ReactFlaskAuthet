const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			register: async (email, password,recovery_question,recovery_answer) => {
				const opts = {
				  method: "POST",
				  headers: {
					"Content-Type": "application/json",
				  },
				  body: JSON.stringify({
					email: email,
					password: password,
					recovery_question: recovery_question,
					recovery_answer: recovery_answer,
				  }),
				};
				try {
				  const response = await fetch(
					process.env.BACKEND_URL + "/api/token",
					opts
				  );
				  if (response.status !== 200) {
					alert("Response was not a code 200.");
					return false;
				  }
				  const data = await response.json();
				  console.log("backend token: " + data);
				  sessionStorage.setItem("user", data.access_token);
				  setStore({ token: data.access_token });
				  return true;
				} catch (error) {
				  console.error("Error! Description: " + error);
				}
			  },
		
		
		
		
		
		
		
		
		
		
		
		
			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
