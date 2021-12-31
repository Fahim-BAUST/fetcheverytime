import axios, { } from 'axios';
import React, { useEffect, useState } from 'react';

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Pagination from './Pagination';

const Home = () => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(20);
    let page = 0;


    const UseLocaldd = (value) => {
        var users = JSON.parse(localStorage.getItem("users") || "[]");
        setPosts(users)
        console.log("# of users: " + users.length);

        // Modifying

        users.push(...value);
        console.log("Added user #" + value);

        // Saving
        localStorage.setItem("users", JSON.stringify(users));


    }



    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            page = page + 1;
            const res = await axios.get(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`);
            setPosts(res.data.hits);

            UseLocaldd(res.data.hits)

            console.log("page number", page);

            setLoading(false);
        };

        setInterval(fetchPosts, 10000)
    }, []);


    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);



    return (
        <div>
            <h1>All Post</h1>
            {loading ? <h1>Loading....</h1> : <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell align="right">URL</TableCell>
                            <TableCell align="right">Created at</TableCell>
                            <TableCell align="right">Author</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {currentPosts.map((row) => (
                            <TableRow
                                key={row.title}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.title}
                                </TableCell>
                                <TableCell align="right">{row.url}</TableCell>
                                <TableCell align="right">{row.created_at}</TableCell>
                                <TableCell align="right">{row.author}</TableCell>

                            </TableRow>

                        ))}
                    </TableBody>
                </Table>
            </TableContainer>}
            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={posts.length}
                paginate={paginate}

            ></Pagination>






        </div>
    );
};

export default Home;