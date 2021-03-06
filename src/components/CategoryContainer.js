import React, { useState } from 'react'
import { Link, Route, useParams, useRouteMatch } from 'react-router-dom'
import PartsCard from './PartsCard'
import Styled from "styled-components"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


const CategoryDiv = Styled.div`
margin-top: 5%;
display:flex;
flex-wrap: wrap;
justify-content:space-evenly;
width: 100%;
`
const ItemDiv = Styled.div`
margin:2%;
box-shadow: 5px 10px 8px black;
border: 1px solid black;
padding: 1%;
background-color: white;
border-radius: 25px;
`

export default function CategoryContainer(props) {
    
    const { id } = useParams()
    const match = useRouteMatch()

    const categories = []
    for(let obj in props.parts) {   
        categories.push({name: obj, image: props.parts[obj][0].url})
    }
    
    const [modal, setModal] = useState(false);
    const [displayedItem, setDisplayedItem] = useState()

    const toggleModal = () => setModal(!modal);

    return (
        <CategoryDiv>
            {categories.length > 0 && props.parts[`${categories[id].name}`].map((item, index) => {
                return (
                    <>
                        <ItemDiv onClick={() => {
                            toggleModal()
                            setDisplayedItem(item)
                            }}>
                            <h3>{item.name}</h3>
                            <img style={{
                        maxWidth: "100%",
                        maxHeight: "173px"
                    }} src={item.url} />
                            <p>{item.price}</p>
                        </ItemDiv>      
                    </>
                )
            })}
            {displayedItem ? <PartsCard toggleModal={toggleModal} modal={modal} part={displayedItem} cart={props.cart} cartRemove={props.cartRemove} cartAdd={props.cartAdd} /> : null}
        </CategoryDiv>

    )
}
