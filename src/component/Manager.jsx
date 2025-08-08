import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useRef } from 'react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])
    const ref = useRef()
    const passref = useRef()

    useEffect(() => {
        // let passwords=localStorage.getItem("passwords")
        // if(passwords){
        //     setpasswordArray(JSON.parse(passwords))
        // }

        let pass = localStorage.getItem("passwords")
        if (pass) {
            setpasswordArray(JSON.parse(pass))
        }
    }, [])



    const Showpassword = () => {
        // alert("show the password")
        passref.current.type = "password"
        console.log(ref.current.src)
        if (ref.current.src.includes("icons/cross.png")) {
            passref.current.type = "text"
            ref.current.src = "icons/eye.png"
        }
        else {
            ref.current.src = "icons/cross.png"
            passref.current.type = "password"

        }
    }

    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const savePassword = () => {     //main step  
        // setpasswordArray([...passwordArray,form])
        // localStorage.setItem("passwords",JSON.stringify([...passwordArray,form]))
        // console.log([...passwordArray,form])

        // setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
        // toast('Password Saved', {
        //     position: "top-right",
        //     autoClose: 5000,
        //     hideProgressBar: false,
        //     closeOnClick: false,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "light",
        // });
        // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
        // setform({ site: "", username: "", password: "" })
        // console.log([...passwordArray, { ...form, id: uuidv4() }])

        if(form.site.length>3 && form.username.length>3 && form.password.length>3){
            
       

        if (editingId) { //  If editing an existing password
            const updatedPasswords = passwordArray.map(item =>
                item.id === editingId ? { ...form, id: editingId } : item // Update instead of deleting
            );
            setpasswordArray(updatedPasswords);
            setEditingId(null); // Reset editing state
        } else {
            //  Save as a new password if not editing
            const newPass = { ...form, id: uuidv4() };
            setpasswordArray([...passwordArray, newPass]);
        }
    
        // Save updated list to localStorage
        localStorage.setItem("passwords", JSON.stringify(passwordArray));
    
        //  Reset input fields after saving
        setform({ site: "", username: "", password: "" });
    
        //  Show success message
        toast('Password Saved', { position: "top-right", autoClose: 5000, theme: "light" });
    }
    else{
        toast("Password not saved");
        toast("Some of the input feild is empty");
    }
    }

    const copytext = (text) => {
        // alert("the text is copied"+text)
        toast('Copied to Clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text)
    }
    const deletepass = (id) => {
        console.log(id)
        let c = confirm("Do You Really Want To Delete This Password ?")
        if (c) {
            setpasswordArray(passwordArray.filter(items => items.id != id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(items => items.id != id)))
        }

    }
    const [editingId, setEditingId] = useState(null); //  New state to track the password being edited
    const editpass = (id) => {
        // setform(passwordArray.filter(items => items.id === id)[0])
        // setpasswordArray(passwordArray.filter(items => items.id != id))
        const selectedPass = passwordArray.find(item => item.id === id);
    if (selectedPass) {
        setform(selectedPass); // Fill input fields with selected password
        setEditingId(id); // Store the ID of the password being edited
    }
    }
    return (
        <>
        <div className='pt-16 pb-24 bg-gray-50 min-h-screen'>
    <ToastContainer />

    <div className="mycontainer max-w-5xl mx-auto px-4">
        <h1 className='text-4xl font-bold text-center'>
            <span className='text-green-500'>&lt;</span>
            Pass
            <span className='text-green-500'>OP/&gt;</span>
        </h1>

        <p className='font-bold text-center text-green-500 text-lg mb-6'>
            Your Own Password Manager
        </p>

        {/* Form */}
        <div className='p-4 bg-white rounded-lg shadow-md flex flex-col gap-4'>
            {/* Website URL */}
            <input
                onChange={handlechange}
                value={form.site}
                name='site'
                placeholder='Enter Website URL'
                className='w-full rounded-lg bg-white border border-green-700 py-2 px-3 focus:ring-2 focus:ring-green-400 outline-none transition'
                type="text"
            />

            <div className='flex flex-col md:flex-row gap-4'>
                {/* Username */}
                <input
                    onChange={handlechange}
                    value={form.username}
                    name='username'
                    placeholder='Enter Your Username'
                    className='rounded-lg bg-white border border-green-700 py-2 px-3 w-full focus:ring-2 focus:ring-green-400 outline-none transition'
                    type="text"
                />

                {/* Password */}
                <div className='relative w-full md:w-[250px]'>
                    <input
                        ref={passref}
                        onChange={handlechange}
                        value={form.password}
                        name='password'
                        placeholder='Enter Password'
                        className='rounded-lg bg-white border border-green-700 w-full py-2 px-3 focus:ring-2 focus:ring-green-400 outline-none transition'
                        type="password"
                    />
                    <span
                        className='absolute right-2 top-2 cursor-pointer bg-green-100 hover:bg-green-200 rounded-full p-1 transition'
                        onClick={Showpassword}
                    >
                        <img ref={ref} width={22} src="icons/cross.png" alt="toggle" />
                    </span>
                </div>
            </div>

            {/* Save Button */}
            <button
                onClick={savePassword}
                className='cursor-pointer flex px-6 py-2 bg-green-500 hover:bg-green-400 active:scale-95 justify-center rounded-lg items-center w-fit border gap-2 transition'
            >
                <lord-icon
                    src="https://cdn.lordicon.com/jgnvfzqg.json"
                    trigger="hover"
                ></lord-icon>
                <div className='font-bold text-lg text-white'>Save</div>
            </button>
        </div>

        {/* Password List */}
        <div className="passwords mt-6">
            <h2 className='text-green-500 font-bold text-2xl p-4'>
                Your Passwords
            </h2>

            {passwordArray.length === 0 && (
                <div className='font-bold text-xl text-gray-500 flex justify-center'>
                    No Passwords Yet
                </div>
            )}

            {passwordArray.length !== 0 && (
                <div className='border border-green-300 rounded-lg overflow-hidden shadow-sm'>
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full text-sm">
                            <thead className='bg-green-800 text-white'>
                                <tr>
                                    <th className='py-2 px-4 text-left'>Site</th>
                                    <th className='py-2 px-4 text-left'>UserName</th>
                                    <th className='py-2 px-4 text-left'>Password</th>
                                    <th className='py-2 px-4 text-center'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-50'>
                                {passwordArray.map((items, index) => (
                                    <tr key={index} className='border-t border-green-200 hover:bg-green-100 transition'>
                                        <td className='py-2 px-4'>
                                            <div className='flex items-center gap-2'>
                                                <a
                                                    href={items.site}
                                                    target='_blank'
                                                    className='text-blue-600 hover:underline break-words'
                                                    rel="noreferrer"
                                                >
                                                    {items.site}
                                                </a>
                                                <div className='cursor-pointer' onClick={() => copytext(items.site)}>
                                                    <lord-icon
                                                        style={{ width: "22px", height: "22px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover"
                                                    ></lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='py-2 px-4'>
                                            <div className='flex items-center gap-2'>
                                                {items.username}
                                                <div className='cursor-pointer' onClick={() => copytext(items.username)}>
                                                    <lord-icon
                                                        style={{ width: "22px", height: "22px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover"
                                                    ></lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='py-2 px-4'>
                                            <div className='flex items-center gap-2'>
                                                {items.password.replace(/./g, '•')}
                                                <div className='cursor-pointer' onClick={() => copytext(items.password)}>
                                                    <lord-icon
                                                        style={{ width: "22px", height: "22px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover"
                                                    ></lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='py-2 px-4 flex justify-center gap-3'>
                                            <span
                                                className='cursor-pointer hover:scale-110 transition'
                                                onClick={() => editpass(items.id)}
                                            >
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                    trigger="hover"
                                                    style={{ width: "24px", height: "24px" }}
                                                ></lord-icon>
                                            </span>
                                            <span
                                                className='cursor-pointer hover:scale-110 transition'
                                                onClick={() => deletepass(items.id)}
                                            >
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    style={{ width: "24px", height: "24px" }}
                                                ></lord-icon>
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    </div>
</div>

        </>
    )
}

export default Manager