import React, { useEffect } from 'react';
import './SlackClone'

const SlackClone = () => {

    useEffect(() => {
        fetch("https://kaibal-tech-slack-clone.web.app/")
            .then(response => response.text())
            .then(html => {
                document.getElementById("slack").innerHTML = html;
            })
            .catch(error => {
                console.log(error);
            })
    }, [])


    return (
        <div className="slack" id="slack">

        </div>
    )
}

export default SlackClone

