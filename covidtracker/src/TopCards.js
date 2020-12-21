import React from 'react'
import './TopCards.css';
import { Card, CardContent, Typography } from '@material-ui/core';
function TopCards({ title, cases,active,isred,isyellow,isgreen, total, ...props }) {
    return (
        <div className="topcards">
            <Card onClick={props.onClick} className={`topcards__card ${active && "topcard--selected"} ${isred && "topcard--red"} ${isyellow && "topcard--yellow"} ${isgreen && "topcard--green"}`}>
                <CardContent>
                    <Typography className="topcards__title" color="textSecondary">
                        {title} -
                    </Typography>
                    <h2 className={`topcards__cases ${isred && "topcard--red"}  ${isyellow && "topcard--yellow"}  ${isgreen && "topcard--green"} `}>{cases}</h2>
                    <Typography className="topcards__total ">
                        {total} <p className="topcards__ptotal">Total </p>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}/*topcards__cases*/

export default TopCards 
