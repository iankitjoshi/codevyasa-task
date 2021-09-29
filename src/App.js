import { useState } from 'react';
import './App.scss';
import start from './images/star.png'
import yellowStart from './images/star-yellow.png'
import deleteIcon from './images/trash.png'

function App() {
  const [friends, setFriends] = useState([])
  const [name, setName] = useState('')
  const [isAlreadyExist, setIsAlreadyExist] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [friendId, setFriendId] = useState(null)
  const [search, setSearch] = useState('')

  const handleNameChange = (e) => {
    const {value = ""} = e.target
    setName(value)
    setIsAlreadyExist(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isAlreadyExist = friends.some(friend => friend.name == name)
    if (isAlreadyExist){
      setIsAlreadyExist(isAlreadyExist) 
    }else{
      setFriends([...friends, { name, favourite: false } ])
      setName('')
    }
  }

  const changeFavourite = (id) => {
    let newFriendsList = friends.map((friend,index) => {
      if(id == index ) return { ...friend, favourite: !friend.favourite }
        return friend
    })
    setFriends(newFriendsList)
  }

  const deleteFriendModal = (id) => {
    setOpenDeleteModal(true)
    setFriendId(id)
  }

  const deleteFriend = () => {
    const deleteFriend = friends.filter((friend, index) => index !== friendId)
    setFriends(deleteFriend)
    setOpenDeleteModal(false)
    setFriendId(null)
  }

  const closeModal = () => {
    setOpenDeleteModal(false)
    setFriendId(null)
  }

  const handleSearch = (e) => {
    const {value = ""} = e.target
    setSearch(value)
    let searchFriends = friends.filter(friend => friend.name.includes(value))
    setFriends(searchFriends)
  }

  return (
    <div className="App">
      <h2> Add Friend </h2>
      <form onSubmit={handleSubmit} >
        <label htmlFor="name">Name:</label>
        <input value={name} onChange={handleNameChange} />
        <button type="submit" className={name.length ? 'submit-btn' : 'submit-btn disabled'} >Submit</button>
      </form>
        {isAlreadyExist ? <span className="error" > Name is already exist, Please enter another name </span> : null }
      
      <hr />

      <div className="table-container" >
        <h2> Friends List </h2>
        <label htmlFor="Search">Search:</label>
        <input value={search} onChange={handleSearch} />

      {friends.length ?
        <table className="styled-table" >
            <thead>
              <tr>
                <th>SR NO.</th>
                <th>NAME</th>
                <th>ACTION</th>
              </tr>
            </thead>
        {
          friends && friends.map((friend,i) => {
                const { name = "-", favourite = false } = friend || {}
            return <tbody key={i}>
                  <tr>
                    <td>{i+1}. </ td>
                    <td>
                      {name} 
                      <span></span>
                     </ td>
                    <td> 
                      <img onClick={() => changeFavourite(i)} src={ favourite ? yellowStart : start} /> 
                      <img onClick={() => deleteFriendModal(i)} src={deleteIcon} />
                    </td>
                  </tr>
                </tbody>
            }) 
          }
      </table> : null

      }
      </div>

      { openDeleteModal ?
        <div className="delete-modal" >
          <h3>Are you sure you want to delete?</h3>
          <button onClick={closeModal} className="closeModal-btn" > Close </button>
          <button onClick={() => deleteFriend()} className="delete-btn" > Delete </button>
        </div>
        :
        null
      }
      
    </div>
  );
}

export default App;