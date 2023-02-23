import styled from "@emotion/styled";
import { Box, Container } from "@mui/material";
import Block from "../../components/Block/Block";
export default function PageView() {
  const Box = styled.html`
    width: 100%%;
    min-width: 200px;
    margin: 5% 20%;
  `;

  return (
    <Container fixed>
      <Box>
        <Block />
      </Box>
    </Container>
  );
}
