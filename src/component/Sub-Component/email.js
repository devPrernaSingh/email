import React, { useState} from 'react';
import { Form } from 'react-bootstrap';
import Header from '../../common/header';
import './CSS/email.css';



const Email = () => {

    const [emailValues, setEmailValues] = useState({});
    const [validFrom, setValidFromId] = useState(true);
    const [validTo, setValidToId] = useState(true);
    const [validSubject, setValidSubject] = useState(true);
    const [validReply, setValidReply] = useState(true);
    const [validName, setValidName] = useState(true);
    // const [validFrom, setValidFromId] = useState(false);
    // const [validFrom, setValidFromId] = useState(false);
    const [isReply, setReply ] = useState(false);

    const fieldHandler = (event) => {
        const {name,value} = event.target;
        setEmailValues(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const checkHandler = () => {
        const checkFrom = /[A-Za-z]{5,12}/;
        const emailCheck = /[A-Za-z._0-9]{3,}@[A-za-z]{3,}[.]{1}[A-Za-z.]{2,6}/;

        const{to,from,subject,reply,reciver,content} = emailValues;
        console.log('From : ',from );
        emailValues['from'] = `${from}@vyaparapp.in`;

        
        if(emailCheck.test(from)){
            setValidFromId(true);
        }else{
            setValidFromId(false);
        }


        if(emailCheck.test(to)){
            setValidToId(true);
        }else{
            console.log('to format issue');
            setValidToId(false);
        }

        if(checkFrom.test(subject)){
            setValidSubject(true);
            console.log('Great 3');
        }else{
            setValidSubject(false);
            console.log('Subject fail');
        }

        return true;

    }

    const handleEmail = () => {
        const{to,from,subject,reply,reciver,content} = emailValues;
        const emailCheck = /[A-Za-z._0-9]{3,}@[A-za-z]{3,}[.]{1}[A-Za-z.]{2,6}/;

        console.log('Here')

        if(to && from && !(emailCheck.test(from)) && subject && content){
            let checkhandlerResult = checkHandler();

            if(checkhandlerResult){
                const requestOptions = {
                    method: 'POST',
                    mode: 'cors',
                    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*' },
                    body: JSON.stringify({to,from,content,subject })
                };

                fetch('https://api.vyaparapp.io/marketing/email/send', requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                
                    if(data.statusCode === 200){
                        console.log('Here');
                    }
                }
                    )
                .catch(error => console.log(error))
            }
            
        }else{
            alert('Please check all the required fields.')
        }

        
    }


    return (
        <div className=''>
            <div>
                <Header />
            </div>
             <div className='mx-3 border-0'>
                <div className='border mx-auto email_container'>
                    <div className='email_heading text-white p-2'>
                    New Message
                    </div>
                    <div className="emailbox border-bottom d-flex " > 
                        <label className='d-flex'>From <span className='text-danger'> *</span></label> 
                        <input type="email" className='border-0 email_field' name='from' onChange={fieldHandler} autoFocus={true} />
                        <label className=''>@vyaparapp.in</label> 
                    </div>
                    {!validFrom? <p className='errorMessage text-danger font-italic text-center'>Invalid email.</p>:null}
                    
                    <div className="emailbox border-bottom d-flex " > 
                        <label className='d-flex'>To <span className='text-danger'> *</span></label> 
                        <input type="email" className='border-0 email_field' name='to' onChange={fieldHandler} />
                    </div>
                    {!validTo ? <p className='errorMessage text-danger font-italic text-center'>Invalid email format.</p>:null }


                    <div className="emailbox border-bottom d-flex " > 
                        <label className=''>Re:</label>
                        <input type="email" className='border-0 email_field' name='reply' onChange={fieldHandler}/>
                    </div>

                    <div className="emailbox border-bottom d-flex " > 
                        <label className='d-flex'>Subject <span className='text-danger'> *</span></label> 
                        <input type="text" className='border-0 email_field' name='subject' onChange={fieldHandler} />
                    </div>
                    {!validSubject ? <p className='errorMessage text-danger font-italic text-center'>Must be greater than 5 character.</p>:null }

                    <div className="emailbox border-bottom d-flex " > 
                        <label className=''>Name</label> 
                        <input type="text" className='border-0 email_field' name='reciver' onChange={fieldHandler} />
                    </div>
                    {!validName? <p className='errorMessage text-danger font-italic text-center'>Invalid name.</p>:null}


                    <div className="emailbox border-bottom d-flex"  style={{minHeight:'200px'}}> 
                        <label className='d-flex'>Message <span className='text-danger'> *</span></label>
                        <textarea type="text" name='content' onChange={fieldHandler} style={{minHeight:'200px'},{maxHeight:'250px'},{overflowY:'scroll'}} className='border-0 email_field'></textarea>
                    </div>

                    <div className='emailbox d-flex justify-content-end mt-4 text-right'>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                            &nbsp; 
                            <label className="form-check-label" >
                                Text
                            </label>
                        </div>
                        &nbsp; &nbsp; &nbsp; 
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"  />
                            &nbsp; 
                            <label className="form-check-label" >
                                HTML
                            </label>
                        </div>
                    </div>

                    <div>
                    <button className='my-4 py-2 email_submit' onClick={handleEmail}> Send </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Email;
