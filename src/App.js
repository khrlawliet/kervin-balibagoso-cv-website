import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Components/Header.jsx';
import About from './Components/About.jsx';
import Resume from './Components/Resume.jsx';
import Portfolio from './Components/Portfolio.jsx';
import Testimonials from './Components/Testimonials.jsx';
import Contact from './Components/Contact.jsx';
import Footer from './Components/Footer.jsx';

function App2() {

    const [resumeData, setResumeData] = useState({});

    useEffect(() => {
        fetch('/resumeData.json')
            .then(response => response.json())
            .then(data => setResumeData(data))
    }, [])


    return (
        <div className="App">
            <Header data={resumeData.main} />
            <About data={resumeData.main} />
            <Resume data={resumeData.resume} />
            <Portfolio data={resumeData.portfolio} />
            <Testimonials data={resumeData.testimonials} />
            <Contact data={resumeData.main} />
            <Footer data={resumeData.main} />
        </div>
    )
}

export default App2
