
function Pagination(props) {
    const {
        currentPage = 1,
        totalData ,
        totalPage ,
        previousPageHandle = () => { },
        nextPageHandle = () => { }
    } = props

    return (
        <div className="pagination-head">
            <span className="total" > Total Friends - {totalData || 0} </span>
            <button onClick={() => previousPageHandle()} className={`submit-btn ${currentPage === 1 ? 'disabled' : ''}`} >Previous</button>
            <span> {currentPage} / {totalPage}</span>
            <button onClick={() => nextPageHandle()} className={`submit-btn ${currentPage === totalPage ? 'disabled' : ''}`} >Next</button>
        </div>
    )
}

export default Pagination