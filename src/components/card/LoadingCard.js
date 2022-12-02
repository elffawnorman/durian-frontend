import React from 'react'
import { Skeleton, Card } from 'antd';

const LoadingCard = ({ count }) => {
    const loopCard = () => {
        let cards = []
        for (let i = 0; i < count; i++) {
            cards.push(
                <div className='col-md-4'>
                    <Card key={"card" + i} >
                        <Skeleton active />
                    </Card>
                </div>
            )
        }
        return cards
    }



    return (
        <>
            <div className='container'>
                <div className='row pb-5'>
                    {loopCard()}
                </div>
            </div>
        </>
    )
};

export default LoadingCard