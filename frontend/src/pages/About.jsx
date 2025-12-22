import './About.css';

function About() {
  return (
    <div className="about-page">
      <div className="about-container">
        <h1>About Me</h1>
        <div className="about-content">
          <div className="about-image">
            <img 
              src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=400&fit=crop" 
              alt="About Blog"
            />
          </div>
          <div className="about-text">
            <h2>Welcome to My Blog</h2>
            <p>
              Hi! I'm a passionate developer and writer who loves sharing knowledge 
              and experiences in the world of technology. This blog is my space to 
              explore new ideas, document my learning journey, and connect with fellow 
              developers.
            </p>
            <p>
              Here you'll find articles about web development, programming best practices, 
              database optimization, and various tech topics that I find interesting. 
              My goal is to make complex concepts accessible and help others in their 
              development journey.
            </p>
            <h3>What I Write About</h3>
            <ul>
              <li>React and modern frontend development</li>
              <li>Node.js and backend architecture</li>
              <li>Database design and optimization</li>
              <li>Software engineering best practices</li>
              <li>Personal experiences and lessons learned</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
