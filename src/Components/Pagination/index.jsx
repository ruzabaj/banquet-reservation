import React from 'react'

const Paginate = ({nPages, setCurrentPage, currentPage }) => {
  
    const nextPage = () => {
        if(currentPage !== nPages) 
            setCurrentPage(currentPage + 1)
    }
    const prevPage = () => {
        if(currentPage !== 1) 
            setCurrentPage(currentPage - 1)
    }
    const pageNumbers = [...Array(nPages + 1).keys()].slice(1)

    return (
        <div className='pagination-width'>
            <ul className="pagination justify-content-center">
                <li className="page-item disabled">
                    <a className="page-link" onClick={prevPage}>Previous</a>
                </li>
                {
                    pageNumbers.map((i, index) => (
                        <li className="page-item" key={index} >
                            <a className="page-link" href="#" onClick={()=>setCurrentPage(i)}>{i}</a>
                        </li>

                    ))
                }
                <li className="page-item disabled">
                    <a className="page-link" onClick={nextPage}>Next</a>
                </li>
            </ul>
        </div >
    )
}

export default Paginate