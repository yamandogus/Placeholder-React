import styled from "styled-components";

const FooterText = styled.footer`
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
  background-color: #eeeeee;
  color: #000000;
  z-index: +1;
`;
const Text = styled.h5`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Footer() {
  return (
    <>
      <FooterText className="mt-3 mt-5">
        <Text className="mt-3">REACT ROUTER PROJECT</Text>
      </FooterText>
    </>
  );
}
