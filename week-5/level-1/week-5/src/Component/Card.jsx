import React from 'react';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    border: '4px solid black',
    padding: '40px',
    margin: '20px',
    backgroundColor: '#f0f0f0',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  header: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  image: {
    width: '80%',
    maxWidth: '300px',
    borderRadius: '10px',
    marginBottom: '10px',
  },
  description: {
    fontSize: '16px',
    marginBottom: '10px',
  },
  socialLinks: {
    display: 'flex',
    justifyContent: 'space-evenly', // Use 'space-evenly' for even spacing
    width: '100%',
    marginBottom: '10px',
  },
  socialButton: {
    backgroundColor: 'blue',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  hr: {
    width: '100%',
    border: '1px solid #ccc',
    margin: '10px 0',
  },
  interests: {
    fontSize: '14px',
    color: '#555',
  },
};

function Card(props) {
  return (
    <div style={styles.container}>
      <div>
        <h1 style={styles.header}>Name: {props.name}</h1>
        <h2 style={styles.description}>Description: {props.description}</h2>
        <div style={styles.socialLinks}>
          <button style={styles.socialButton}>LinkedIn</button>
          <button style={styles.socialButton}>Github</button>
          <button style={styles.socialButton}>Portfolio</button>
        </div>
        <hr style={styles.hr} />
        <p style={styles.interests}>Interests: {props.interests}</p>
      </div>
      <img style={styles.image} src={props.image} alt="Profile" />
    </div>
  );
}

export default Card;

