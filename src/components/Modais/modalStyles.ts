import styled from "styled-components";

export const LoginModalBackground = styled.div`
  height: 32rem;
  width: 28rem;

  background-color: #fffbf7;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  z-index: 9;

  display: flex;
  flex-direction: column;
  align-items: center;

  border-radius: 10px;

  padding: 50px 50px 60px 50px;

  header {
    text-align: center;
  }

  main {

    width: 100%;

    margin-top: 50px;

    /* border: 2px solid red; */

    p {
        font-size: 15px;
        font-weight: 500;
        color: #F8DDC2;
        
        margin-bottom: 5px;

    }
  }

  footer {
    width: 100%;

    margin-top: 40px;

    text-align: center;

    position: relative;

    p {
        color: #F8DDC2;
        font-weight: 500;
        font-size: 14px;

        margin-top: 20px;
    }

    span {
        color: #C9303E;
        font-weight: 700;
        cursor: pointer;
    }

    button {
        background-color: #C9303E;

        width: 100%;

        font-size: 16px;
        font-weight: 600;
        color: #F7E5BE;

        outline: none;
        border: 0;
        border-radius: 0.5rem;

        height: 2.5rem;

        cursor: pointer;

    }
  }
`;