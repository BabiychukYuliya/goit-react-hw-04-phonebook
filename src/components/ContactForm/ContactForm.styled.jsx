import styled from '@emotion/styled';

export const FormStyle = styled.div`
  padding: 0 20px;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
  font-weight: 500;
`;

export const Input = styled.input`
  width: 300px;
  height: 29px;
  &:hover {
    box-shadow: 10px 5px 5px blue;
  }
`;

export const ButtonAdd = styled.button`
  font-size: 16px;
  border-radius: 4px;
  color: black;
  &:hover {
    background-color: blue;
    color: black;
  }
  }
`;
