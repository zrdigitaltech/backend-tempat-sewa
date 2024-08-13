import React, { useState } from 'react';

const Index = (props) => {
  const {isFormVisible, setIsFormVisible} = props;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    complaint: '',
  });

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('Form data submitted:', formData);
  //   // Add form submission logic here
  //   setIsFormVisible(false); // Close form after submission
  // };

  const closeForm = () => {
    setIsFormVisible(false);
  };

  return (
    <div>
      <button 
        className="floating-pengaduan" 
        onClick={toggleFormVisibility}
      >
        {isFormVisible ? '-' : '+'}
      </button>

      {isFormVisible && (
        // onMouseLeave={closeForm}
        <div id="contactus" className="pengaduan-form contactus" > 
        <div className='pengaduan-form-close' onClick={closeForm}>
        <svg focusable="false" viewBox="0 0 24 24" width="24" height="24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
        </div>
          <h2>Form Pengaduan</h2>
          <div className="contact-form">
            <form method="post" id="contact-form">
              <div className="row">
                <div className="col-sm-12">
                  <input className="con-field" name="name" required placeholder="Nama" type="text" />
                </div>
                <div className="col-sm-12">
                  <input className="con-field" name="phone" required id="phone" placeholder="No Whatsapp" type="text" />
                </div>
                <div className="col-sm-12">
                  <input className="con-field" name="name" required placeholder="Nama Kontrakan" type="text" />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <textarea className="con-field" name="pengaduan" rows="6"
                    placeholder="Pengaduan"></textarea>
                  <div className="submit-area">
                    <button className="btn-one w-100">Kirim</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Index;
