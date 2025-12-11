import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../utils/axiosInstance';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import styles from './LeaderBoard.module.css';
import Loader from '../../components/Loader/Loader.jsx';
import { useNavigate } from 'react-router-dom';

const LeaderBoard = () => {
    const { user, loading, setLoading } = useAuth();
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        if (!user) {
            if (loading) return;
            navigate('/login');
        }
    }, [user, loading]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const res = await axiosInstance.get('/fetchUsersForLeaderBoard');

                setUsers(res.data.users || []);
            } catch (error) {
                toast.error('Something went wrong!');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [setLoading]);

    return (
        <div className={styles.leaderBoardPage}>
            <h2 className={styles.pageHeading}>LeaderBoard</h2>
            {
                loading ? <Loader /> : user &&
                    <div className={styles.userListContainer}>
                        <ul className={styles.userList}>
                            {users.map((u) => (
                                <li
                                    key={u._id}
                                    className={`${styles.user} ${u._id === user.id ? styles.currentUser : ''}`}
                                >
                                    {u.name} — {u.score}
                                </li>
                            ))}
                        </ul>
                    </div>
            }
        </div>
    )
};

export default LeaderBoard;
