import SortButtons from "./SortButtons"
import BarContainer from "./BarContainer"
import { useContext } from "react"
import { BarContext } from "./BarContext"
import Result from "./Result"
import { useState } from "react"

const Sorter = () => {

    const { result1, result2 } = useContext(BarContext);

    if (result1 && result2) {
        return (
            <Result />
        )
    } else {
        return (
            <>
                <SortButtons />
                <BarContainer />
            </>
        )
    }

    // return (
    //     <Result />
    // )

}

export default Sorter;