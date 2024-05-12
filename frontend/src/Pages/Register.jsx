import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    nomComplet: '',
    email: '',
    motDePasse: '',
    confirmMotDePasse: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, nomComplet, email, motDePasse, confirmMotDePasse } = formData;

    // Check if both passwords match
    if (motDePasse !== confirmMotDePasse) {
      setError('Passwords do not match!');
      return; // Prevent the form from being submitted
    }

    try {
      // Perform the POST request to your API endpoint
      const response = await axios.post('http://localhost:8080/register', JSON.stringify({
        username: username,
        nomComplet: nomComplet,
        email: email,
        motDePasse: motDePasse
    }), {
        headers: { 'Content-Type': 'application/json' }
    });

      // Assuming the JWT is in the response
      console.log('JWT:', response.data.token);
      localStorage.setItem('jwt', response.data.token); // Storing JWT in localStorage
      navigate('/login');
      setError(''); // Clear any previous errors
      // Redirect or further processing here after successful registration
    } catch (error) {
      setError('Failed to register. ' + error.message);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-col">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold px-40">Register now!</h1>
          <p className="py-6"></p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="email" className="input input-bordered" required />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Nom Complet</span>
              </label>
              <input type="text" name="nomComplet" value={formData.nomComplet} onChange={handleChange} placeholder="Nom complet" className="input input-bordered" required />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" className="input input-bordered" required />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" name="motDePasse" value={formData.motDePasse} onChange={handleChange} className="input input-bordered" required />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input type="password" name="confirmMotDePasse" value={formData.confirmMotDePasse} onChange={handleChange} className="input input-bordered" required />
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">Register</button>
            </div>

            {error && <p className="text-red-500">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
