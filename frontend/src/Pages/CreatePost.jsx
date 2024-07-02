import React from 'react'
import Footer from '../Component/Footer'
import { ImCross } from 'react-icons/im'
import { useContext, useState } from 'react'
import axios from 'axios'
import { UserContext } from '../Context/UserContext'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Component/Navbar'


const CreatePost = () => {
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [image, setImage] = useState(null)
  const [cat, setCat] = useState('a')
  const [catg, setCatg] = useState([])
  const { user } = useContext(UserContext)
  const navigate = useNavigate()

  const addCategory = () => {
    let upatedCatg = [...catg]
    upatedCatg.push(cat)
    setCatg("")
    setCatg(upatedCatg)

  }

  const deleteCategory = () => {
    let upatedCatg = [...catg]
    upatedCatg.splice(i)
    setCatg(upatedCatg)
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    const post = {
      title, desc,
      username: user.username,
      userId: user.userId,
      category: catg
    }
    if (image) {
      const data = new FormData()
      const filename = Date.now() + image.name
      data.append("img", filename)
      data.aapend("image", image)
      post.photo = filename

      try {
        const imgUpload = await axios.post("api/upload", data)
      }
      catch (err) {
        console.log(err)
      }
    }

    try {
      const res = await axios.post("/api/posts/post/create", post, { withCredentials: true })
      navigate("/posts/post/" + res.data._id)
    }
    catch (err) {
      console.log(err)
    }
  }



  return (
    <div>
      <Navbar />

      <div className='flex justify-center'>
        <div className='px-6 m-4 border flex flex-col w-[79%] shadow-xl md:px-[200px] mt-8'>
          <h1 className='font-bold md:text-2xl text-2xl mt-3 flex justify-center'>
            Create Post
          </h1>
          <form className='w-full flex flex-col space-y-4 md:space-y-8 mt-4'>
            <input
              className='px-4 py-2 outline-none'
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder='Enter your title'
            />
            <input
              className='px-4 py-2 outline-none'
              onChange={(e) => setImage(e.target.files[0])}
              type='file'
              placeholder='Enter your title'
            />

            <div className='flex flex-col'>
              <div className='flex items-center space-x-4 md:space-x-8'>
                <select name="" id="" value={cat}
                  onChange={(e) => setCat(e.target.value)}>
                  <option value='Big Data'>Big Data</option>
                  <option value='IOT'>IOT</option>
                  <option value='ML'>ML</option>

                </select>

                <div onClick={addCategory} className='bg-black text-white px-4 py-3 font-semibold cursor-pointer'>
                  Add
                </div>

              </div>

              <div className='flex px-4 mt-3'>
                {
                  catg ? catg.map((c, i) => {
                    <div key={i} className='flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md'>
                      <p>
                        {c}
                      </p>
                      <p onClick={() => deleteCategory(i)} className='text-white bg-black rounded-full cursor-pointer p-1 text-sm'>
                        <ImCross />
                      </p>
                    </div>
                  }) : null
                }
              </div>

              <textarea onChange={(e)=>setDesc(e.target.value)} name="" id="" cols="30" rows="10"
              className='px-4 py-2 outline-none ' placeholder='Description'>

              </textarea>
                <button onClick={handleCreate} className='bg-black w-full md:w-[20%] mx:auto text-white font-semibold px-4 py-2 md:text-xl text-lg'>
                  Create
                </button>
            </div>

          </form>
        </div>

      </div>

      <Footer />

    </div>
  )
}

export default CreatePost