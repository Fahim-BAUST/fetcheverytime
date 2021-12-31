import React from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav style={{ marginInline: "15px", textAlign: "center", marginTop: 20, marginBottom: "50px" }}>

            {pageNumbers.map(number => (

                <button style={{ paddingInline: "15px", marginRight: "15px" }} onClick={() => paginate(number)} className='page-link'>
                    {number}
                </button>

            ))}

        </nav>
    );
};
export default Pagination;