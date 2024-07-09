import React, { useEffect } from "react";
import {Box, Text} from 'grommet';
import axios from "axios";

import Header from "./Header";

function Timeline(){

    const [userID, setUserID] = React.useState("1")
    const [timelineData, setTimelineData] = React.useState([]);

    useEffect(()=>{
        axios.get(`http://localhost:3002/timeline/${userID}`)
        .then(response => {
            setTimelineData(response.data);
        })
    },[])


    return(
        <Box align="center">
            <Box pad="small" width="large" elevation="medium">
                <Box>
                    <Header/>
                </Box>
                <Box overflow="scroll" height="50em" margin={{top: "small"}}>
                    {timelineData.map((item,index)=>{
                        return(
                            <div>
                                <Box elevation="medium" margin="medium" pad="small" direction="column" gap="small">
                                    <Box>
                                        <Text weight="bolder" size="small">{item.userName}</Text>
                                    </Box>
                                    <Box>
                                        <Text>{item.content}</Text>
                                    </Box>
                                    <Box>
                                        <Text size="xsmall">{item.date}</Text>
                                    </Box>
                                </Box>
                            </div>
                        )
                    })}
                </Box>
            </Box>
        </Box>
    )
}

export default Timeline;