import React, { useState,useEffect } from 'react'

const App = () => {

    const [userName, setuserName] = useState("");
    const [userEmail, setuserEmail] = useState("");
    const [userImage, setuserImage] = useState("");
    const [userTel, setuserTel] = useState("")
    const [allData, setallData] = useState([])

    const [editIndex, setEditIndex] = useState(null);

    const formHandler = (e)=>{
        e.preventDefault();
        

        if (editIndex !== null) {
          const updatedData = [...allData];
          updatedData[editIndex] = { userName, userEmail, userImage, userTel };
          setallData(updatedData);
          setEditIndex(null);
        } else {
          const copyUser = [...allData, { userName, userEmail, userImage, userTel }];
          setallData(copyUser);
        }

        setuserEmail('')
        setuserImage('')
        setuserName('')
        setuserTel('')
    }
    const deleteUser = (idx) => {
        const updatedData = [...allData];  
        updatedData.splice(idx, 1);       
        setallData(updatedData);           
    }

    const editUser = (idx) => {
      const user = allData[idx];
      setuserName(user.userName);
      setuserEmail(user.userEmail);
      setuserImage(user.userImage);
      setuserTel(user.userTel);
      setEditIndex(idx);
    };

    useEffect(() => {
        const savedData = localStorage.getItem('allData');
        if (savedData) {
            setallData(JSON.parse(savedData));
        }
    }, []);
    
    useEffect(() => {
        if(allData.length>0){
            localStorage.setItem("allData",JSON.stringify(allData))
        }
    }, [allData])
    
return (
    <div className='w-screen h-screen flex'>
        <div className='left bg-blue-400 w-1/3 h-full flex items-center justify-center'>

            <form
            onSubmit={(e)=>{
                formHandler(e);
            }}
            className='rounded-md bg-white px-5 py-5 w-2/3'>
                <h1 className='font-bold text-2xl mb-3 text-blue-400'>User Information Form</h1>

                <label htmlFor="name" className=" text-lg font-semibold text-gray-700 mb-2">Name : </label>
                <input
                value={userName}
                onChange={(e)=>{
                    setuserName(e.target.value);
                }}
                type="text" id='name' required className="w-full mb-3 border border-gray-400 rounded-md p-1 text-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter name"/>
                <br />

                <label htmlFor="email" className=" text-lg font-semibold text-gray-700 mb-2">Email : </label>
                <input
                 value={userEmail}
                 onChange={(e)=>{
                    setuserEmail(e.target.value);
                 }}
                type="text" id='name' required className="mb-3 w-full border border-gray-400 rounded-md p-1 text-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter email"/>
                <br />

                <label htmlFor="image" className=" text-lg font-semibold text-gray-700 mb-2">Image Url : </label>
                <input
                value={userImage}
                onChange={(e)=>{
                   setuserImage(e.target.value);
                }}
                 type="text" id='image' required className="w-full mb-3 border border-gray-400 rounded-md p-1 text-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter Image Url"/>
                <br />

                <label htmlFor="tel" className=" text-lg font-semibold text-gray-700 mb-2">Tel. No. : </label>
                <input
                value={userTel}
                onChange={(e)=>{
                   setuserTel(e.target.value);
                }}
                 maxLength="10" pattern="[0-9]{10}" type="text" id='name' required className="mb-3 w-full border border-gray-400 rounded-md p-1 text-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="123-456-7890"/>
                <button type="submit" className='bg-green-600 px-4 py-2 rounded-md font-bold text-white w-full'>Submit</button>
            </form>
            <div>
                {}
            </div>
        </div>


        <div className='right bg-blue-300 w-2/3 h-full p-5'>
            {allData.map(function(elem,idx){
                    return<div key={idx} className="card bg-white px-5 m-3 max-w-50 py-4 inline-flex flex-col items-center rounded-md">
                        <img className='h-30 w-30 rounded-md object-cover' src={elem.userImage} alt="" />
                        <h1 className='font-bold text-1xl'>{elem.userName}</h1>
                        <h4 className='text-1xl'>{elem.userEmail}</h4>
                        <p className='text-sm'>{elem.userTel}</p>

                    <div className='flex items-center justify-between gap-5'>
                    <button
                        onClick={() => deleteUser(idx)}
                        className='bg-red-500 px-2 rounded-md text-white font-bold mt-3 py-1'>
                        Delete
                    </button>
                    <button
                        onClick={() => editUser(idx)}
                        className='bg-green-600 px-2 rounded-md text-white font-bold mt-3 py-1'>
                        Edit
                    </button>
                    </div>
                 </div>
            })}            
        </div>
    </div>
  )
}

export default App
