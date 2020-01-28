import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faFreeCodeCamp, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope} from '@fortawesome/free-solid-svg-icons';
import CodeAcademy from './codeacademy.js';

library.add(faGithub, faFreeCodeCamp, faLinkedin, faEnvelope);

class About extends Component {
	render() {
		return(
			<div className="about-me-body">
				<div class="about-me-paragraphs-div">
					<p class="about-me-paragraphs">
						My name is Seth Ely, and I have been teaching myself to code for the past year. 
						I have been using resources like FreeCodeCamp.org and CodeAcademy and have been really enjoying it so far. 
						For a good example of where I am currently at skill-wise, make sure and take a look at my "simple-task" 
						web app I made using React.js, with a node.js backend.
					</p> 
					<p class="about-me-paragraphs">
						Besides programming, I also really enjoy baking bread, working on my 1975 Ford Bronco, and building electronic 
						guitar effects pedals.
					</p>
				</div>
				<div className="profile-links-div">
					<a className="profile-links" href="https://github.com/seely1991">
						<FontAwesomeIcon icon={["fab", "github"]} />
					</a>
					<a className="profile-links" href="https://www.freecodecamp.org/seely1991">
						<FontAwesomeIcon icon={["fab", "free-code-camp"]} />
					</a>
					{/*<a className="profile-links" id="code-academy-logo" href="https://www.codecademy.com/seely1991">
						<CodeAcademy />
					</a>*/}
					<a className="profile-links" href="https://www.linkedin.com/in/seth-ely">
						<FontAwesomeIcon icon={["fab", "linkedin"]} />
					</a>
					<a className="email-link profile-links" href="mailto: sethmartinely@gmail.com">
						<FontAwesomeIcon icon={"envelope"} />
					</a>
				</div>
			</div>
		)
	}
}

export default About;