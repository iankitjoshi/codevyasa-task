import { useState } from 'react';
import './App.scss';
import start from './images/star.png'
import yellowStart from './images/star-yellow.png'
import deleteIcon from './images/trash.png'
import Pagination from './pagination';

function App() {
    const [friends, setFriends] = useState([])
    const [name, setName] = useState('')
    const [isAlreadyExist, setIsAlreadyExist] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [friendId, setFriendId] = useState(null)
    const [search, setSearch] = useState('')
    const [filterFriend, setFilterFriend] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [dataPerPage, setDataInPage] = useState(4)
    const [selectedFriend, setSelectedFriend] = useState('')
    const [errors, serErrors] = useState('')

    const handleNameChange = (e) => {
        const { value = "" } = e.target
        setName(value)
        setIsAlreadyExist(false)
        serErrors('')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!/\S/.test(name)){
            serErrors('* Please enter valid name')
            return
        }
        const isAlreadyExist = friends.some(friend => friend.name.toLowerCase() == name.toLowerCase())
        if (isAlreadyExist) {
            setIsAlreadyExist(isAlreadyExist)
        } else {
            setFriends([...friends, { name, favourite: false, id: Date.now() }])
            setName('')
        }
    }

    const changeFavourite = (id) => {
        let newFriendsList = friends.map((friend, index) => {
            if (id == friend.id) return { ...friend, favourite: !friend.favourite }
            return friend
        })
        newFriendsList = newFriendsList.sort((a, b) => b.favourite - a.favourite);
        setFriends(newFriendsList)
        setCurrentPage(1)
        setSearch('')
    }

    const deleteFriendModal = (friend) => {
        const { id = "", name = "" } = friend
        setOpenDeleteModal(true)
        setFriendId(id)
        setSelectedFriend(name)
    }

    const deleteFriend = () => {
        const deleteFriend = friends.filter((friend, index) => friend.id !== friendId)
        setFriends(deleteFriend)
        setOpenDeleteModal(false)
        setFriendId(null)
        setCurrentPage(1)
        setSearch('')
    }

    const closeModal = () => {
        setOpenDeleteModal(false)
        setFriendId(null)
        setSelectedFriend('')
    }

    const handleSearch = (e) => {
        const { value = "" } = e.target
        setSearch(value)
        let searchFriends = friends.filter(friend => friend.name.toLowerCase().includes(value.toLowerCase()))
        setFilterFriend(searchFriends);
        setCurrentPage(1)
    }

    const previousPageHandle = () => {
        if (currentPage === 1) return;
        setCurrentPage(currentPage - 1);
    }

    const nextPageHandle = () => {
        let data = search.length ? filterFriend : friends;
        let totalPage = Math.ceil((data.length) / dataPerPage);
        if (currentPage === totalPage) return;
        setCurrentPage(currentPage + 1);
    }

    let data = search.length ? filterFriend : friends;
    let totalPage = Math.ceil((data.length) / dataPerPage);
    let totalResult = search.length ? filterFriend.length : friends.length;
    data = data.slice((currentPage - 1) * dataPerPage, ((currentPage - 1) * dataPerPage) + dataPerPage);

    return (
        <div className="App">
            <div className="top-sec">
                <div className="top-sec-inner">
                    <h2> Add Friend </h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">Name:</label>
                        <div className="field-rep">
                            <input value={name} maxLength="40" placeholder="Enter your friend's name" onChange={handleNameChange} />
                            <button type="submit" className={/\S/.test(name) ? 'submit-btn' : 'submit-btn disabled'} >Submit</button>
                        </div>
                    </form>
                    {isAlreadyExist ? <span className="error" >* Friend's name is already exist, Please enter another name. </span> : null}
                    {errors ? <span className="error" > {errors} </span> : null}
                </div>
            </div>

            <div className="table-container">
                <div className="table-container-inner">
                    <div className="friend-list">
                        <h2> Friend's List </h2>
                        <label htmlFor="Search">Search:</label>
                        <input type="search" value={search} maxLength="30" placeholder="Search your friend's name" onChange={handleSearch} />
                    </div>
                    <div className="cus-table">
                        <table className="styled-table">
                            <thead>
                                <tr>
                                    <th>S NO.</th>
                                    <th>NAME</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            {data.length ?
                                data && data.map((friend, i) => {
                                    const { name = "-", favourite = false, id = "" } = friend || {}
                                    return <tbody key={id}>
                                        <tr>
                                            <td>{((currentPage - 1) * dataPerPage) + (i + 1)}. </ td>
                                            <td>
                                                {name}
                                                <p>{`is your ${favourite ? 'favourite' : ''} friend.`} </p>
                                            </ td>
                                            <td>
                                                <img onClick={() => changeFavourite(id)} src={favourite ? yellowStart : start} alt="" />
                                                {favourite ? null : <img onClick={() => deleteFriendModal(friend)} src={deleteIcon} alt="" />}
                                            </td>
                                        </tr>
                                    </tbody>
                                }) :
                                <tbody>
                                    <td colSpan={3} className="no-data" > No Friends</td>
                                </tbody>
                            }
                        </table>
                        <Pagination
                            currentPage={currentPage}
                            totalPage={totalPage || 1}
                            showData={dataPerPage}
                            totalData={totalResult || 0}
                            previousPageHandle={previousPageHandle}
                            nextPageHandle={nextPageHandle}
                        />
                    </div>
                </div>
            </div>

            {openDeleteModal ?
                <div className="delete-modal-inner">
                    <div className="delete-modal">
                        <h3>{`Are you sure you want to remove ${selectedFriend} from your friend list?`}</h3>
                        <button onClick={closeModal} className="closeModal-btn" > No, Cancel </button>
                        <button onClick={() => deleteFriend()} className="delete-btn" > Yes, Remove </button>
                    </div>
                </div>
                :
                null
            }

        </div>
    );
}

export default App;