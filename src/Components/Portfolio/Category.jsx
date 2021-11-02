import React from 'react';
import './Category.css';
import RpsLogo from '../../assets/CardImages/rpsgame.png';
import ExpenseTrackerLogo from '../../assets/CardImages/expense-tracker.png';
import CovidTrackerLogo from '../../assets/CardImages/covid-19.jpg';
import BlackJackGameLogo from '../../assets/CardImages/black-jack.jpg';
import EmployeeCrudLogo from '../../assets/CardImages/employee.png';
import SlackCloneLogo from '../../assets/CardImages/slack-clone.png';
import PageAppLogo from '../../assets/CardImages/page-app-logo.png'; 
import InstagramLogo from '../../assets/CardImages/instagram-logo.jpeg'; 
import RpsGame from './RpsGame/RpsGame';
import ExpenseTracker from './ExpenseTracker/ExpenseTracker';
import CovidTracker from './CovidTracker/CovidTracker';
import BlackJackGame from './BlackJackGame/BlackJackGame';

import Project from './Project';

const projType = (title) => {
    switch (title) {
        case 'Basic':
            return (
                <>
                    <Project image={RpsLogo} title="RPS Game" description="Rock, Paper and Sciscor Game" project={<RpsGame />} isDialog />
                    <Project image={ExpenseTrackerLogo} title="Expense Tracker" description="Income and Expense Calculation" project={<ExpenseTracker />} isDialog />
                </>

            )
        case 'Intermediate':
            return (
                <>
                    <Project image={CovidTrackerLogo} title="Covid-19 Tracker" description="Live Covid-19 Tracker Worldwide(REST API)" project={<CovidTracker />} isDialog />
                    <Project image={BlackJackGameLogo} title="Black Jack Game" description="Play Black Jack Game Online" project={<BlackJackGame />} isDialog />
                    <Project image={InstagramLogo} title="Instagram Clone" description="Instagram clone with Firebase backend" url="https://instragram-clone-kbtech.web.app"  />
                </>
            )
        case 'Advance':
            return (
                <>
                    <Project image={EmployeeCrudLogo} title="Employee CRUD" description="Full Stack Web Development with Spring Boot Backend" url="https://kai-bal-tech-website.web.app/employees" />
                    <Project image={SlackCloneLogo} title="Slack Clone" description="Slack clone with Firebase Backend and Google Authentication" url="https://kaibal-tech-slack-clone.web.app/" />
                    <Project image={PageAppLogo} title="Page Application" description="Full Stack Desktop Application with JavaFX and Hibernate" url="https://drive.google.com/file/d/1yCcGlHcQFZu6hpymUwmurxj4C448cOqA/view?usp=sharing"  />
                </>
            )

             default :
                return null;
    }
}

const Catergory = ({ title }) => {
    return (
        <div className="category">
            <h2>{title}</h2>
            <div className="category__proj">
                {projType(title)}
            </div>
        </div>
    )
}

export default Catergory
