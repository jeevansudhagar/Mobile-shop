import React from 'react';
import '../Components/Contact.css';

function Contact() {
    return (
        <>
            <div className='contact'>
                <div className='container'>
                    <div className='form'>
                        <h2>#Contact us</h2>
                        <form method='POST'>
                            <div className='box1'>
                                <div className='label'>
                                    <h4>Name</h4>

                                </div>
                                <div className='input'>
                                    <input type='text' placeholder='Name' value='' name=''></input>

                                </div>
                            </div>
                            <div className='box1'>
                                <div className='label'>
                                    <h4>E-mail</h4>

                                </div>
                                <div className='input'>
                                    <input type='email' placeholder='e-mail' value="" name=''></input>

                                </div>

                            </div>
                            <div className='box1'>
                                <div className='label'>
                                    <h4>Subject</h4>

                                </div>
                                <div className='input'>
                                    <input type='text' placeholder='subject' value="" name=''></input>

                                </div>

                            </div>
                            <div className='box1'>
                                <div className='label'>
                                    <h4>Message</h4>

                                </div>
                                <div className='input'>
                                    <textarea placeholder='message !' name='' value=""></textarea>

                                </div>

                            </div>
                            <button className='sub-btn' type='submit'>Submit</button>
                        </form>

                    </div>

                </div>

            </div>
        </>
    )
}

export default Contact;