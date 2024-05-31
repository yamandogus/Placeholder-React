import styled from "styled-components";

const FooterText = styled.footer`
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
  background-color: #b3b3b3;
  color: #000000;
`;
const Text = styled.h4`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Footer() {
  return (
    <>
      <FooterText className="mt-3">
        <Text className="mt-3">REACT ROUTER PROJECT</Text>
      </FooterText>
    </>
  );
}
