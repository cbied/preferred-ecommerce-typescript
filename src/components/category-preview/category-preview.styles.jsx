import styled from "styled-components";

export const CategoryPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

export const Title = styled.span`
  font-size: 28px;
  margin-bottom: 25px;
  cursor: pointer;
  text-decoration: underline;
`;

export const Preview = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
`;

export const ViewMore = styled.p`
  display: flex;
  justify-content: flex-end;
  font-size: 1.5rem;
  cursor: pointer;
  text-decoration: underline;
`;
