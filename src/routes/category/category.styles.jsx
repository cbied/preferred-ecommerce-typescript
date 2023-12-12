import styled from "styled-components";

export const CategoryContainer = styled.div`
    width: 100%;
    height: auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 20px;
`;

export const CategoryTitle = styled.div`
    font-size: 2rem;
    text-align: center;
`;