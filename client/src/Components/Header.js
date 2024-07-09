import { Box, Button, Text } from "grommet";
import React from "react";

function Header(){
    return(
        <Box direction="row" border="2px solid black" pad="xsmall">
            <Box margin={{top: "xsmall"}}>
                <Text weight="bolder">FriendPost</Text>
            </Box>
            <Box margin={{left: "auto"}}>
                <Button label="S"/>
            </Box>
        </Box>
    )
}

export default Header;