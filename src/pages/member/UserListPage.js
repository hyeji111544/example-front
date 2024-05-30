import React, { useEffect, useState } from 'react';
import { getUserList } from '../../api/UserApi';
import { RootUrl } from '../../api/RootUrl';

const UserListPage = () => {
    const [userList, setUserList] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getUserList();
                console.log(response);
                setUserList(response);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <p className="title">회원 목록</p>

            <table>
                <tr>
                    <th>이미지</th>
                    <th>아이디</th>
                    <th>이름</th>
                    <th>나이</th>
                    <th>전화번호</th>
                    <th>가입일</th>
                </tr>
                {userList && userList.length > 0 ? (
                    userList.map((user, index) => (
                        <tr key={index}>
                            {user.userImg && (
                                <img src={`${RootUrl()}/images/${user.userImg}`} alt="User" width="50" height="50" />
                            )}
                            <td>{user.userId}</td>
                            <td>{user.userName}</td>
                            <td>{user.userAge}</td>
                            <td>{user.userHp}</td>
                            <td>{user.rdate}</td>
                        </tr>
                    ))
                ) : (
                    <></>
                )}
            </table>
        </div>
    );
};

export default UserListPage;
