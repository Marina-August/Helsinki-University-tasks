import StatisticLine from "./StatisticLine";

const Statistics =({all, good, neutral, bad, average, positive})=>{
    return(
        <table>
            <tbody>
                <tr>
                    <StatisticLine text='good' value={good}/> 
                </tr>
                <tr>
                    <StatisticLine text='neutral' value={neutral}/>
                </tr>
                <tr>
                    <StatisticLine text='bad' value={bad}/>
                </tr>
                <tr>
                    <StatisticLine text='all' value={all}/>
                </tr>
                <tr>
                    <StatisticLine text='average' value={average}/>
                </tr>
                <tr>
                    <StatisticLine text='positive' value={positive+'%'}/>
                </tr>
            </tbody>
        </table>
    )

}

export default Statistics;