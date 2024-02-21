import React from "react";
import styled from "styled-components";

export function ListScope({ scope }) {
        if (scope === 'private') {
            return (
                <Div>
                    <Icon className="material-icons">lock</Icon>
                    <ScopeText>PRIVATE</ScopeText>
                </Div>
            )
        }

    if (scope === 'public') {
        return (
            <Div>
                <Icon className="material-icons">lock_open_right</Icon>
                <ScopeText>PUBLIC</ScopeText>
            </Div>
        )
    }

    if (scope === 'friends') {
        return (
            <Div>
                <Icon className="material-symbols-outlined">lock_open</Icon>
                <ScopeText>FRIENDS</ScopeText>
            </Div>
        )
    }
}

export function ListMyLike({ myLike }) {
    if (myLike === true) {
        return (
            <>
                <Icon className="material-icons">favorite</Icon>
            </>
        )
    }
    if (myLike === false) {
        return (
            <>
                <span class="material-symbols-outlined">favorite</span>
            </>
        )
    }
}

const Div = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    max-width: 2rem;
`;

const Icon = styled.span`
    font-size: 1.5rem;
    width: 24px;
    height: 24px;
    margin-left: 0.5rem;
    margin-right: 0.1rem;
    color: #6f6f6f;
`;

const ScopeText = styled.div`
    font-size: 1rem;
    color: #6f6f6f;
`;