import React, { useState} from 'react';
import Header from '../../common/header';
import './CSS/email.css';



const Email = () => {

    const [emailValues, setEmailValues] = useState({});
    const [isReply, setIsReply] = useState(false);
    const [hasHtmlContent, setHasHtmlContent]  = useState(false);

    const [validFrom, setValidFromId] = useState(true);
    const [validTo, setValidToId] = useState(true);
    const [validSubject, setValidSubject] = useState(true);
    const [validName, setValidName] = useState(true);

    const [validContent, setValidContent] = useState(true);
    // const [validFrom, setValidFromId] = useState(false);
    // const [isReply, setReply ] = useState(false);

    const fieldHandler = (event) => {
        const {name,value} = event.target;
        setEmailValues(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const checkHandler = () => {
        const commonCheck = /[A-Za-z]{5,12}/;
        const contentCheck = /[A-Za-z0-9]/;
        const nameCheck = /[A-Za-z]{5,30}/;
        const emailCheck = /[A-Za-z._0-9]{3,}@[A-za-z]{3,}[.]{1}[A-Za-z.]{2,6}/;

        const{to,from,subject,reciver,content} = emailValues;
        
        if(emailCheck.test(from)){
            setValidFromId(true);
        }else{
            setValidFromId(false);
            return false;
        }

        if(emailCheck.test(to)){
            setValidToId(true);
        }else{
            setValidToId(false);
            return false;

        }

        if(commonCheck.test(subject)){
            setValidSubject(true);
        }else{
            setValidSubject(false);
            return false;
        }

        if(!reciver){
            setValidName(true);
        }else{
            if(nameCheck.test(reciver)){
                setValidName(true);
            }else{
                setValidName(false);
                return false;
            }
        }

        if(content && content.length >= 50){
            setValidContent(true);
        }else{
            setValidContent(false);
            return false;
        }

        return true;

    }

    const handleEmail = () => {
        const{from} = emailValues;

        if(from.includes("@vyaparapp.io")){
            check();
        }else{
            emailValues['from'] = `${from}@vyaparapp.io`;
            check();
        }
    }
        function check(){

            const{to,from,subject,content,reciver} = emailValues;
    

        if(to && from && subject && content){
            let checkhandlerResult = checkHandler();

            if(checkhandlerResult){

                try{
                    var requestOptions = {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({to,from,subject,content,name: reciver ,isReply,hasHtmlContent})
                    };
                }catch(error){
                    console.log('Error',error);
                }
               
                fetch('https://api.vyaparapp.io/marketing/email/send', requestOptions)
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    if(data.statusCode === 200){
                        console.log('Here');
                    }
                })
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
                        <input type="email" className='border-0 email_field' name='from' onChange={fieldHandler} autoFocus />
                        <label className=''>@vyaparapp.io</label> 
                    </div>
                    {!validFrom? <p className='errorMessage text-danger font-italic text-left '>Invalid email.</p>:null}
                    
                    <div className="emailbox border-bottom d-flex " > 
                        <label className='d-flex'>To <span className='text-danger'> *</span></label> 
                        <input type="email" className='border-0 email_field' name='to' onChange={fieldHandler} />
                    </div>
                    {!validTo ? <p className='errorMessage text-danger font-italic text-left '>Invalid email format.</p>:null }

                    <div className="emailbox border-bottom d-flex " > 
                        <label className='d-flex'>Subject <span className='text-danger'> *</span></label> 
                        <input type="text" className='border-0 email_field' name='subject' onChange={fieldHandler} />
                    </div>
                    {!validSubject ? <p className='errorMessage text-danger font-italic text-left '>Must be greater than 5 character.</p>:null }

                    <div className="emailbox border-bottom d-flex " > 
                        <label className=''>Name</label> 
                        <input type="text" className='border-0 email_field' name='reciver' onChange={fieldHandler} />
                    </div>
                    {!validName? <p className='errorMessage text-danger font-italic text-center'>Name must be greater than 5 character.</p>:null}

                    <div className="emailbox text-bottom py-0 d-flex " > 
                        <input type="checkbox" className='margintop' id="vehicle1" name="vehicle1" value="Bike" checked={isReply} onClick={()=>{
                            setIsReply(!isReply);
                        }}/>
                        <label className='px-5-3'>Reply</label>
                    </div>
                    
                    <div className="emailbox border-bottom d-flex"  style={{minHeight:'200px'}}> 
                        <label className='d-flex'>Message <span className='text-danger'> *</span></label>
                        <textarea type="text" name='content' onChange={fieldHandler} className='border-0 email_field textField'></textarea>
                    </div>
                    {!validContent ? <p className='errorMessage text-danger font-italic text-center'>Content must be greater than 50 character.</p>:null}

                    <div className='emailbox d-flex justify-content-end mt-4 text-right'>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked={!hasHtmlContent} onClick={() => {
                                setHasHtmlContent(!hasHtmlContent)
                            }}/>
                            &nbsp; 
                            <label className="form-check-label" >
                                Text
                            </label>
                        </div>
                        &nbsp; &nbsp; &nbsp; 
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"  checked={hasHtmlContent} onClick={() => {
                                setHasHtmlContent(!hasHtmlContent);
                            }}/>
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
