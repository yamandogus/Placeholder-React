import { Badge, Card } from "react-bootstrap";
import styled from "styled-components";

//* USERS STYLED COMPONENTS

export const ButonNew = styled.button`
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
  color: #fff;
  background-color: #ff5252;
  border: 2px solid #000;
  border-radius: 10px;
  box-shadow: 5px 5px 0px #000;
  transition: all 0.3s ease;
  cursor: pointer;
  align-self: center;
  &:hover {
    background-color: #fff;
    color: #ff5252;
    border: 2px solid #ff5252;
    box-shadow: 5px 5px 0px #ff5252;
  }
  &:active {
    background-color: #fcf414;
    box-shadow: none;
    transform: translateY(4px);
  }
  a {
    display: block;
    text-decoration: none;
    color: inherit;
  }
`;

export const Strong = styled.strong`
  display: inline-block;
  margin-right: 5px;
  &:hover {
    transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    transition: transform 0.7s ease-in-out;
    color: blue;
  }
`;

//* ALBUMS STYLED COMPONENTS

export const AlertDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
`;

//* USERS-DETAILS STYLED COMPONENTS

export const UsersContainer = styled.div`
  padding: 10px;
  border: 1px solid black;
  width: 300px;
  border-radius: 5px;
  background-color: #d2e8ff;
`;

export const PostList = styled.div`
  padding: 16px;
  border: 1px solid black;
  border-radius: 5px;
  background-color: #d2e8ff;
`;

//* NAVBAR STYLED COMPONENTS

export const Logo = styled.img`
  height: 40px;
  width: 80px;
  border-radius: 10%;
  box-shadow: 0px 0px 10px rgba(250, 243, 243, 0.1);
`;

export const BadgeIcon = styled(Badge)`
  color: #000000;
  border-radius: 50%;
  padding: 4px 8px;
  font-size: 12px;
  position: relative;
  top: -8px;
  right: -4px;
`;

//* FAVORITES STYLED COMPONENTS

export const NewCard = styled(Card)`
  background: #d2e8ff;
  border-radius: 10px;
  min-height: 380px;
  transition: border-radius 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const CardBody = styled(Card.Body)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

//* COMMENTS STYLED COMPONENTS

export const UserContent = styled.div`
  margin: 10px 0 10px 0;
  padding: 16px;
  border-radius: 5px;
  background-color: #d2e8ff;
  width: 300px;
  border: 1px solid black;
`;

export const PostContent = styled.div`
  padding: 16px;
  margin: 10px 0 10px 0;
  border-radius: 5px;
  background-color: #d2e8ff;
  width: 500px;
  border: 1px solid black;
`;

export const Empty = styled.h3`
  display: flex;
  justify-content: center;
  align-items: center;
  &::after {
    content: "😕";
  }
`;
