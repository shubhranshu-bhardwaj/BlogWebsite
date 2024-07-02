import React from 'react'
import HomePost from '../Component/HomePost'
import Navbar from '../Component/Navbar'
import axios from 'axios'
import Footer from '../Component/Footer'
import { URL } from '../Url'
import { useEffect, useState, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Loader from '../Component/Loader'
import { UserContext } from '../Context/UserContext'

const Home = () => {

const {search}=useLocation()
const [posts, setPosts]=useState([])
const [noResults, setNoResults]=useState(false)
const [loader, setLoader]=useState(false)
const {user}=useContext(UserContext)
const [cat, setCat]=useState([])
const [filterData, setFilterData]=useState([])

// const fetchPost=async()=>{
//   setLoader(true)
//   // try{
//   //   const res=await axios.get(URL +"/api/posts/")
//   //   console.log("Res data is: ",res.data)
//   //   setPosts(res.data)
//   //   setFilterData(res.data)
//   //   let catg=res.data.map((items) => items.categories)
//   //   let sets=new Set()
//   //   catg.forEach((category)=>{
//   //   category.forEach((catgr)=>{
//   //     if(catgr.length>0) sets.add(catgr)
//   //   })
//   //   })
//   //   setCat(Array.from(sets))
//   //   console.log(res.data)

//   //   if(res.data.length===0){
//   //     setNoResults(true)
//   //   }
//   //   else{
//   //     setNoResults(false)
//   //   }
//   // }
//   // catch(err){
//   //   console.log(err)
//   //   setLoader(true)
//   // }
//   // finally {
//   //   setLoader(false);
//   // }
//   try {
//     const res = await axios.get(URL + "/api/posts/");
//     console.log("Res data is: ",res.data); // This should log your posts array
//     if (Array.isArray(res.data)) {
//         setPosts(res.data);
//         setFilterData(res.data);
//         let catg = res.data.map((items) => items.categories);
//         let sets = new Set();
//         catg.forEach((category) => {
//             category.forEach((catgr) => {
//                 if (catgr.length > 0) sets.add(catgr);
//             });
//         });
//         setCat(Array.from(sets));
//         if (res.data.length === 0) {
//             setNoResults(true);
//         } else {
//             setNoResults(false);
//         }
//         setLoader(false);
//     } else {
//         throw new Error("Invalid response data");
//     }
// } catch (err) {
//     console.log(err);
//     setLoader(false);
// }
// }
const fetchPost = async () => {
  setLoader(true);
  try {
    const res = await axios.get(`${URL}/api/posts/`);
    console.log('Response data:', res.data);
    if (Array.isArray(res.data)) {
      setPosts(res.data);
      setFilterData(res.data);
      let catg = res.data.map((items) => items.categories).flat();
      let sets = new Set(catg.filter(catgr => catgr.length > 0));
      setCat(Array.from(sets));
      setNoResults(res.data.length === 0);
    } else {
      throw new Error('Invalid response data');
    }
  } catch (err) {
    console.error('Fetch posts error:', err);
    setLoader(false);
  }
  setLoader(false);
};


  useEffect(()=>{
    fetchPost()
  }, [search])

  // const filteredData=(filterData)=>{
  //   let newPost=posts.filter((pos)=>{
  //     return pos ?  pos.categories.includes(filterData) : null


  //   })
  //   setFilterData(newPost)
  // };
  const filteredData = (category) => {
    let newPost = posts.filter((post) =>
      post.categories.includes(category)
    );
    setFilterData(newPost);
  };

  return (
    <div>
      <Navbar />
      <div>
        <div className='flex flex-wrap'>
        <div className='p-3 m-5 flex flex-wrap justify-center'>
          {
            cat.length && cat.map((category)=>{
              return <button className='p-3 m-5 h-[90px] w-[150px] border text-lg font-semibold bg-white hover:shadow-blue-200 shadow shadow-black' onClick={()=>filteredData(category)}>
                {category}
              </button>
            })
          }

        </div>

        </div>
        <div className='flex flex-wrap w-[95%] justify-center'>
          {
            loader ? <div className='h-screen flex justify-center items-center'>
              <Loader />
              </div> : noResults ?
              filterData.map((post)=>{
                <div key={post._id} className='flex flex-wrap m-2 sm:w-[35vw] lg:w-[45vw] md:w-[50vw]'>
                  <Link to={user ? `/posts/post/${post._id}` : "/login"}>
                    {/* <HomePost keys={post._id} post={post} /> */}
                    <HomePost post={post} />
                  </Link>
                  </div>
              }
              ) : <h3 className='text-center font-bold mt-16'>
                No post available
              </h3>
          }
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home