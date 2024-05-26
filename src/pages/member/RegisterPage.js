import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUSer } from '../../api/UserApi';


const RegisterPage = () => {

  const thumbUserImgRef = useRef();

  // 페이지 이동 훅
  const navigate = useNavigate();

  const [user, setUser] = useState({
    "userId" : "",
    "userPw" : "",
    "userName" : "",
    "userAge" : "",
    "userHp" : "",
  })

  const hanleChange = (e) => {
    const {name, value} = e.target;
    setUser(prevState => ({...prevState, [name]:value}));
    console.log(value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userImg = thumbUserImgRef.current.files[0];
    const formData = new FormData();
    formData.append("thumbUserImg", userImg);

    for (const key in user){
      formData.append(key, user[key]);
    }

    try{
      const response = await registerUSer(formData);
      console.log(response);
      if(response.data>0){
        alert("성공");
        navigate(`/`);
        
      }else{
        alert("실패");
        navigate(`/register`);
      }
    }catch(err){
      console.log(err);
    }
  }

return (
    <div>
        <p className='title'>회원가입</p>

        <form action="">
            <table>
              <tr>
                <td>프로필 사진</td>
                <td>
                  <p>
                    <input type='file' name='thumbUserImg' ref={thumbUserImgRef}/>
                  </p>
                </td>
              </tr>
              <tr>
                <td>아이디</td>
                <td>
                  <input type="text" name='userId' onBlur={hanleChange} />
                </td>
              </tr>
              <tr>
                <td>비밀번호</td>
                <td>
                  <input type="password" name='userPw' onBlur={hanleChange}/>
                </td>
              </tr>
              <tr>
                <td>이름</td>
                <td>
                  <input type="text" name='userName' onBlur={hanleChange}/>
                </td>
              </tr>
              <tr>
                <td>나이</td>
                <td>
                  <input type="number" name='userAge' onBlur={hanleChange}/>
                </td>
              </tr>
              <tr>
                <td>연락처</td>
                <td>
                  <input type="text" name='userHp' onBlur={hanleChange}/>
                </td>
              </tr>
            </table>
            <Link className='btn' to="">취소</Link>
            <input className='btn' type="submit" value="가입"  onClick={handleSubmit}/>
        </form>
    </div>
  )

}
export default RegisterPage