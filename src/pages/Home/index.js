import {useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {fetchCharacters} from '../../redux/charactersSlice'
import { Card, Row, Col, Divider, Button } from 'antd';
import {retry} from "@reduxjs/toolkit/query";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

function Home(props) {
    const { Meta } = Card;

    const characters = useSelector((state)=>state.characters.items)
    const status = useSelector((state)=>state.characters.status)
    const error = useSelector((state)=>state.characters.error)
    const nextPage = useSelector((state)=>state.characters.page)
    const hasNextPage = useSelector((state)=>state.characters.hasNextPage)
    const dispatch = useDispatch();

    useEffect(()=>{
        if(status === "idle"){
            dispatch(fetchCharacters())
        }

    },[dispatch,status])


    if(status === "failed"){
        return <Error message={error}/>
    }

    return (
        <div >

                <>
                    <Divider orientation={"left"}></Divider>
                    <Row gutter={[16, 24]}  justify={"space-around"}>
                        {characters.map((character)=>(
                        <Col key={character.char_id} className={"gutter-row"} xs={24} sm={16} md={8} lg={6} xl={6} xxl={4}>
                            <Link to={`/char/${character.char_id}`}>
                                <Card
                                    hoverable
                                    cover={<img style={{height:500,objectFit:"cover"}} alt="example" src={character.img} />}>
                                    <Meta title={character.name} description="www.instagram.com" />
                                </Card>
                            </Link>
                        </Col>
                        ))}
                    </Row>
                </>
            <div style={{padding:30, textAlign:"center"}}>
                {status === "loading" && <Loading/>}
                {hasNextPage || status !== "loading" ?
                    <Button onClick={()=> dispatch(fetchCharacters(nextPage))} type="primary">Learn More ({nextPage})</Button> :
                    <Button  type="primary">There is noting to be shown</Button>
                }
            </div>
        </div>
    );
}

export default Home;
