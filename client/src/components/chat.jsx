
// import React, { useEffect, useState } from 'react';
// import { io } from 'socket.io-client';
// import { useLocation } from 'react-router-dom';
// const ChatApp = () => {
//   const [socket, setSocket] = useState(null);
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [avt,setAvt] = useState(1);
//   const [name,setName] = useState(null);
//   const [set,setSte] = useState(false);
//   const location = useLocation();
//   console.log(messages)
//   const handleName =()=>{
//     setSte((e)=>!e)

//   }
//   const handleChange = ()=>{
//     console.log(avt)
//     if(avt===4){
//         setAvt(1)
//     }else {
//         console.log("Anala")
        
//         setAvt((a)=>a+1);
//         console.log(avt)
//     }
//     console.log(avt)
//   }
//   // Extract room code from URL
//   const queryParams = new URLSearchParams(location.search);
//   const roomCode = queryParams.get('code');
//   console.log(roomCode);

//   useEffect(() => {
//     const newSocket = io('http://localhost:5000'); // Backend URL
//     setSocket(newSocket);

//     // Join the room using the room code
//     newSocket.emit('join_room', { roomCode,name,avt });

//     newSocket.on('receive_message', (data) => {
//         console.log("data",data)
//       setMessages((prevMessages) => [...prevMessages, data]);
//     });

//      return () => {
//       newSocket.disconnect();
//     };
//   }, [location, roomCode,name,avt]);

//   const sendMessage = () => {
//     if (message) {
//       socket.emit('send_message', { roomCode, message ,avt,name});
//       setMessage('');
//     }
//   };

//   return (
//     <div className='bg-gradient-to-r from-gray-800 to-gray-900 h-screen flex flex-col justify-between p-4'>
//       {/* Chat Header */}
//       <div className="text-center text-white mb-6 flex justify-between items-center">
//         <div className=' flex gap-2 items-center'>
//             <div className='w-16 flex flex-col gap-2'>
//                 <img src={`/a${avt}.svg`}   />
//                 <p ><button onClick={handleChange} className='rounded-lg border border-gray-700 px-2 py-1 pb-2'>Change</button></p>
//             </div>
//             {
//                 !set?(
//                     <input
//                 onChange={(e)=>setName(e.target.value)}
//                 placeholder='enter the name'
//                 className="flex-grow px-4  rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
//             />
//                 ):
//                 (
//                     <p  className=' px-2 flex justify-center items-center relative '>
//                         {name}

//                     </p>
//                 )
//             }
//         <button
//           onClick={handleName}
//           className=" h-fit px-2 py-1  bg-blue-600 rounded-full text-white font-semibold hover:bg-blue-700 transition duration-300"
//         >
//           {!set?"set":"change"}
//         </button>
//         </div>
//         <h1 className="text-3xl font-bold mb-2">Chat Room: {roomCode}</h1>
//         <div></div>
//       </div>

//       {/* Chat Messages */}
//       <div className='flex-grow overflow-y-auto p-4  rounded-lg shadow-inner'>
//         <div className="space-y-4">
//           {messages.length > 0 ? (
//             messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className=" p-2 rounded-lg text-white bg-gray-900 w-fit px-4 "
//               >
//                 {msg}
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500">No messages yet...</p>
//           )}
//         </div>
//       </div>

//       {/* Input Field and Send Button */}
//       <div className="flex items-center mt-4">
//         <input
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder='Type your message...'
//           className="flex-grow px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
//         />
//         <button
//           onClick={sendMessage}
//           className="ml-4 px-6 py-3 bg-blue-600 rounded-full text-white font-semibold hover:bg-blue-700 transition duration-300"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatApp;
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useLocation } from 'react-router-dom';

const ChatApp = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [avt, setAvt] = useState(1);
  const [name, setName] = useState('');
  const [isNameSet, setIsNameSet] = useState(false);
  const location = useLocation();

  // Extract room code from URL
  const queryParams = new URLSearchParams(location.search);
  const roomCode = queryParams.get('code');
  console.log(roomCode);

  // Handle avatar change
  const handleChangeAvatar = () => {
    if (avt === 4) {
      setAvt(1);
    } else {
      setAvt(avt + 1);
    }
  };

  // Toggle name input
  const handleNameToggle = () => {
    setIsNameSet(!isNameSet);
  };

  useEffect(() => {
    const newSocket = io('http://localhost:5000'); // Backend URL
    setSocket(newSocket);

    // Join the room using the room code
    if (name) {
      newSocket.emit('join_room', { roomCode, name, avt });
    }

    newSocket.on('receive_message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Clean up on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, [location, roomCode, name, avt]);

  const sendMessage = () => {
    if (message) {
      socket.emit('send_message', { roomCode, message, avt, name });
      setMessage('');
    }
  };

  return (
    <div className='bg-gradient-to-r from-gray-800 to-gray-900 h-screen flex flex-col justify-between p-4'>
      {/* Chat Header */}
      <div className="text-center text-white mb-6 flex justify-between items-center">
        <div className='flex gap-2 items-center'>
          <div className='w-16 flex flex-col gap-2'>
            <img src={`/a${avt}.svg`} alt={`Avatar ${avt}`} />
            <button
              onClick={handleChangeAvatar}
              className='rounded-lg border border-gray-700 px-1 py-1 pb-2'
            >
              Change
            </button>
          </div>
          {
            !isNameSet ? (
              <input
                onChange={(e) => setName(e.target.value)}
                placeholder='Enter your name'
                className="flex-grow px-4 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            ) : (
              <p className='px-2 flex justify-center items-center'>
                {name}
              </p>
            )
          }
          <button
            onClick={handleNameToggle}
            className="h-fit px-2 py-1 bg-blue-600 rounded-full text-white font-semibold hover:bg-blue-700 transition duration-300"
          >
            {isNameSet ? "Change" : "Set Name"}
          </button>
        </div>

        
      </div>

      {/* Chat Messages */}
      <div className='flex-grow overflow-y-auto p-4 rounded-lg shadow-inner'>
        <div className="space-y-4">
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <div key={index} className="p-2 rounded-lg text-white bg-gray-900 w-fit px-4 flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <img src={`/a${msg.avt}.svg`} alt={`Avatar ${msg.avt}`} className="w-8 h-8 rounded-full" />
                  <strong>{msg.name}:</strong>
                </div>
                <p>{msg.message}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No messages yet...</p>
          )}
        </div>
      </div>

      {/* Input Field and Send Button */}
      <div className="flex items-center mt-4">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder='Type your message...'
          className="flex-grow px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button
          onClick={sendMessage}
          className="ml-4 px-6 py-3 bg-blue-600 rounded-full text-white font-semibold hover:bg-blue-700 transition duration-300"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatApp;
