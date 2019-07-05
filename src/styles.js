import styled from 'styled-components';

export const Card = styled.div`

`;

export const BoxPost = styled.div`
    border: 1px solid #e4e4e4;
    border-radius: 10px;
    width: 100%;
    padding: 10px;
    margin: 10px;
`;

export const Col = styled.div`

`;

export const Header = styled.div`
    position: relative;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;

`;

export const Form = styled.div`

`;

export const Cards = styled.div`
  margin: 20px 0;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

export const TitleCategory = styled.div`
    color: red;
    font-size: 22px;
    text-transform: uppercase;
`;

export const Post = styled.div`
    margin: 10px;
    border: 1px solid #e4e4e4;
    border-radius: 10px;
    padding: 20px;
    position: relative;
    width: 100%;
`;

export const TitlePost = styled.div`
    font-size: 16px;
`;

export const Author = styled.div`
    font-size: 13px;
    font-style: italic;
    opacity: 0.7;
    width: 100%;
    border-top: 1px solid #e4e4e4;
    display: flex;
    justify-content: flex-end;
`;

export const CommentAuthor = styled.span`
    font-size: 13px;
    font-style: italic;
    color: #00f;
`;


export const CommentCounter = styled.div`
    font-size: 11px;
    color: orange;    
`;

export const ActionButtons = styled.div`
    &>:first-child{
        svg{
            fill: blue;
        }
    }
    &>:last-child{
        svg{
            fill: #f00;
        }
    }
`;

export const GroupButtons = styled.div`
    display: flex;
`;


export const VoteButtons = styled.div`
    &>:first-child{
        svg{
            fill: #0f0;
        }
    }
    &>:last-child{
        svg{
            fill: #f00;
        }
    }
`;

export const Button = styled.button`
    border: 0;
    outline: 0 !important;
`;

export const CommentPanel = styled.div`
    position: relative;
    min-height: 50px;
    margin: 20px 0;
    border: 1px solid #e4e4e4;
    padding: 10px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;

`;

export const Comments = styled.div`

`;
