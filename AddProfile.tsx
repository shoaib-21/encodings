// import {
//   collection,
//   query,
//   where,
//   getCountFromServer,
//   updateDoc,
// } from "firebase/firestore";
// import { useState } from "react";
// import { db } from "../../firebase/firebaseConfig";
// import mqtt from "mqtt/dist/mqtt";

// export default function AddProfile() {
//   // State
//   const [name, setName] = useState("");
//   const [empId, setEmpId] = useState("");
//   //const [operation , setOperation] = useState("";)

//   // Handlers
//   function mqttConnect(data: { name: string; empId: number; }) {
//     const host = "tcp://2.tcp.ngrok.io";
//     const client = mqtt.connect(host, {
//       clientId: "mqttjs_" + Math.random().toString(16).substr(2, 8),
//       username: "mna",
//       password: "mna0845",
//       port: 13965,
//       protocol: "ws",
//     });
//     // Adding any type to client because the types are not available for mqtt
//     client.on("connect", () => {
      
        
//         console.log("connected");
//         client.publish("admin", JSON.stringify(data), {
//           qos: 1,
//           retain: true,
//         });
      
//     });
//     client.on("message", (topic, message) => {
//       console.log("message received", topic, message.toString());
//     });
//     client.on("error", (err) => {
//       console.log(err);
//     });
//     client.on("close", () => {
//       console.log("close");
//     });
//     return client;
//   }

//   async function addProfileHandler() {
//     if (name === "" || empId === "") {
//       alert("Please fill all the fields");
//       return;
//     }

//     const empIdNum = parseInt(empId);
//     if (isNaN(empIdNum)) {
//       alert("Please enter a valid empId");
//       return;
//     }

//     const snapshot = await getCountFromServer(
//       query(collection(db, "users"), where("empId", "==", empIdNum))
//     );
//     const count = snapshot.data().count;

//     if (count > 0) {
//       alert("User with the given empId already exists");
//       return;
//     }

//     const userData = {
//       name,
//       empId: empIdNum,
//     };

//     const client = mqttConnect(userData);
//     console.log(client);

//     setName("");
//     setEmpId("");
//   }

//   return (
//     <section>
//       <div>
//         <h1>Update Profile</h1>
//         <div className="flex flex-col space-y-2">
//           <label htmlFor="name">
//             Name
//             <input
//               type="text"
//               id="name"
//               className="rounded bg-gray-100 p-1 px-2 placeholder:text-gray-400"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//           </label>
//           <label htmlFor="empId">
//             Emp ID
//             <input
//               type="text"
//               id="empId"
//               className="rounded bg-gray-100 p-1 px-2 placeholder:text-gray-400"
//               value={empId}
//               onChange={(e) => setEmpId(e.target.value)}
//             />
//           </label>
          
//         </div>
//         <button
//           className="rounded bg-blue-500 p-1 px-2 text-white"
//           onClick={addProfileHandler}
//         >
//           Add
//         </button>
//       </div>
//     </section>
//   );
// }
import {
  collection,
  query,
  where,
  getCountFromServer,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import mqtt from "mqtt/dist/mqtt";

export default function AddProfile() {
  // State
  const [name, setName] = useState("");
  const [empId, setEmpId] = useState("");
  const [operation , setOperation] = useState("");

  // Handlers
  function mqttConnect(data: { name: string; empId: number;operation:string }) {
    const host = "tcp://2.tcp.ngrok.io";
    const client = mqtt.connect(host, {
      clientId: "mqttjs_" + Math.random().toString(16).substr(2, 8),
      username: "mna",
      password: "mna0845",
      port: 11920,
      protocol: "ws",
    });
    // Adding any type to client because the types are not available for mqtt
    client.on("connect", (rc) => {
      console.log(rc)
        
        console.log("connected");
        client.publish("admin", JSON.stringify(data), {
          qos: 1,
          retain: true,
        });
      
    });
    client.on("message", (topic, message) => {
      console.log("message received", topic, message.toString());
    });
    client.on("error", (err) => {
      console.log(err);
    });
    client.on("close", () => {
      console.log("close");
    });
    return client;
  }

  async function addProfileHandler() {
    if (name === "" || empId === "") {
      alert("Please fill all the fields");
      return;
    }

    const empIdNum = parseInt(empId);
    if (isNaN(empIdNum)) {
      alert("Please enter a valid empId");
      return;
    }

    const snapshot = await getCountFromServer(
      query(collection(db, "users"), where("empId", "==", empIdNum))
    );
    const count = snapshot.data().count;

    if (count > 0) {
      alert("User with the given empId already exists");
      return;
    }

    const userData = {
      name,
      empId: empIdNum,
      operation,
    };

    const client = mqttConnect(userData);
    console.log(client);

    setName("");
    setEmpId("");
    setOperation("");
  }

  return (
    <section>
      <div>
        <h1>Update Profile</h1>
        <div className="flex flex-col space-y-2">
          <label htmlFor="name">
            Name
            <input
              type="text"
              id="name"
              className="rounded bg-gray-100 p-1 px-2 placeholder:text-gray-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label htmlFor="empId">
            Emp ID
            <input
              type="text"
              id="empId"
              className="rounded bg-gray-100 p-1 px-2 placeholder:text-gray-400"
              value={empId}
              onChange={(e) => setEmpId(e.target.value)}
            />
          </label>
          <div>
            <label htmlFor="adduser">
              <input
                type="radio"
                id="adduser"
                name="operation"
                value="adduser"
                checked={operation === "adduser"}
                onChange={(e) => setOperation(e.target.value)}
              />
              Add User
            </label>
            <label htmlFor="deluser">
              <input
                type="radio"
                id="deluser"
                name="operation"
                value="deluser"
                checked={operation === "deluser"}
                onChange={(e) => setOperation(e.target.value)}
              />
              Delete User
            </label>
          </div>
      </div>
        <button
          className="rounded bg-blue-500 p-1 px-2 text-white"
          onClick={addProfileHandler}
        >
          Add
        </button>
      </div>
    </section>
  );
}
