import styled from "styled-components";

function Dropdown({setScope}) {
    const handleScopeChange = (e) => {
        setScope(e.target.value);
    }

    return (
        <Div>
            <Select onChange={handleScopeChange}>
                <Option value="private">비공개</Option>
                <Option value="public">공개</Option>
                <Option value="friends">친구공개</Option>
            </Select>
        </Div>
    );
}

const Div = styled.div`
    width: 20%;
`;

const Select = styled.select`
    width: 100%;
    padding: 0.6rem;
    border: 1px solid #ccc;
    cursor: pointer;
    background-color: #95ada4;
    color: white;
`;

const Option = styled.option`
    padding: 0.5rem;
    border: 1px solid #ccc;
    cursor: pointer;
    background-color: #95ada4;
    color: white;
`;

export default Dropdown;