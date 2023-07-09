import React, {useState} from 'react'


export default function TextForm(props) {
    
    const [text, setText] = useState('');

    const handleUpperCaseClick = () => {
        //console.log( text )
        let upperCaseText = text.toUpperCase();
        //console.log(upperCaseText)
        setText(upperCaseText)
        props.showAlert("Converted to Upper Case !", 'success')
    }

    const handleLowerCaseClick = () => {
        //console.log( text )
        let lowerCaseText = text.toLowerCase();
        //console.log(lowerCaseText)
        setText(lowerCaseText)
        props.showAlert("Converted to lower Case !", 'success')
    }

    const handleClearTextClick = (event) => {
        //console.log("On Change ")
        setText("")
        props.showAlert("Text Cleared !", 'success')
    }

    // function isEnglishText(text) {
    //     const englishRegex = /^[A-Za-z\s]+$/;
    //     return englishRegex.test(text);
    //   }

    const handleTranslateClick = (event) => {
        let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=EN|HI`;
        fetch(apiUrl)
            .then((res) => res.json())
            .then((data) => {
                //console.log(data)
                setText(data.responseData.translatedText);
                if (data.responseData.translatedText === text){
                    props.showAlert("Text Can't be Translated !", 'warning')
                }
                else(
                    props.showAlert("Text Translated Successfully !", 'success')
                )
            });
        
    }

    const handleSpeak = (event) => {
        props.showAlert("Turn Up your Volume to hear !!", 'warning')
        let msg = new SpeechSynthesisUtterance();
        msg.text = text;
        window.speechSynthesis.speak(msg);
        props.showAlert("Voice message !", 'success')
    }

    const handleCopy = (event) =>{
        var text1 = document.getElementById("exampleFormControlTextarea1")
        text1.select()
        navigator.clipboard.writeText(text1.value)
        props.showAlert("Text copied to clipboard ! Paste Anywhere", 'success')
    }

    const handleDuplicates= () => {
        let wordArr = text.split(" ");
        let newText = wordArr.filter((item, pos)=>{
            return wordArr.indexOf(item) === pos;
        })
        newText = newText.join(" ");
        setText(newText);
        props.showAlert("All Duplicates has been removed !", 'success')
    }

    const handleReverse = ()=>{
        let spl = text.split(" ")
        let rev = spl.reverse();
        let join = rev.join(" ");
        setText(join)
        props.showAlert("Your Text has been reversed !", 'success')
    }

    const handleWhiteSpace = () => {
        let newText = text.replace(/\s+/g, ' ').trim();
        setText(newText)
        props.showAlert("All extra White Spaces removed !", 'success')
    }

    const handleOnChange = (event) => {
        //console.log("On Change ")
        setText(event.target.value)
    }



    //text = "New text"; cant change value of this variable like this
    //setText('New Text'); correct way of assigning new value
    // const[ myStyle , setMystyle ] = useState({
    //     color : 'white',
    //     backgroundColor : 'black' ,
    //   });
    
    //   const [ btnText , setBtnText ] = useState('Enable Dark Mode')
    
    //   const toggleStyle = () =>{
    //     if(myStyle.color === 'white'){
    //       setMystyle({
    //         color : 'Black' ,
    //         backgroundColor : 'white',
    //         border : '1px solid white'
    //       })
    //       setBtnText('Enable Dark Mode')
    //     }
    //     else{
    //       setMystyle({
    //         color : 'white' ,
    //         backgroundColor : 'black'
    //       })
    //       setBtnText('Enable Light Mode')
    //     }
    //   }

    

    return (
    <>
    <div className="main" style={{backgroundColor : props.mode === 'light' ? 'white':'black' }} >
            <div className='container my-3' display="flex">
                <h2>{props.heading}</h2>
                <div className="mb-3" style={{backgroundColor : props.mode==='light' ?'dark':'light' }}>
                    <textarea className="form-control" id="exampleFormControlTextarea1" style={{backgroundColor : props.mode === 'light' ? 'white':'black', color : props.mode === 'light' ? 'black':'white' }} value={text} onChange={handleOnChange} rows="8" placeholder='Enter Your Text here'></textarea>
                </div>
                <button className="btn btn-primary mx-2 my-2" onClick={handleUpperCaseClick} >Convert to UPPERCASE</button>
                <button className="btn btn-primary mx-2 my-2" onClick={handleLowerCaseClick} style= {{marginLeft: '20px' }}>Convert to lowercase</button>
                <button className="btn btn-primary mx-2 my-2" onClick={handleReverse} style= {{marginLeft: '20px' }}>Reverse text</button>
                <button className="btn btn-primary mx-2 my-2" onClick={handleDuplicates} style= {{marginLeft: '20px' }}>Remove duplicates</button>
                <button className="btn btn-primary mx-2 my-2" onClick={handleWhiteSpace} style= {{marginLeft: '20px' }}>Remove Extra WhiteSpaces</button>
                <button className="btn btn-primary mx-2 my-2" onClick={handleCopy} style= {{marginLeft: '20px' }}>Copy Text</button>
                <button className="btn btn-primary mx-2 my-2" onClick={handleClearTextClick} style= {{marginLeft: '20px' }}>Clear Text</button>
                <button className="btn btn-primary mx-2 my-2 " onClick={handleTranslateClick} style= {{marginLeft: '20px' }}>Translate to हिंदी</button>
                <button type="submit" className="btn btn-primary mx-2 my-2" onClick={handleSpeak} style= {{marginLeft: '20px' }}>Speak</button>
                {/* <div className="form-check form-switch my-3"> 
                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onClick={toggleStyle}/>
                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">{btnText}</label>
                </div>*/}
                
            </div>

            <div className="container my-3" display='flex'>
                <h2> Text Contents </h2>
                <p> Your text containes :</p>
                <p style= {{marginLeft: '80px' }}>{text.split(" ").filter((element)=>{return element.length!== 0 }).length} words,</p> 
                <p style= {{marginLeft: '80px' }}>{text.length} characters.</p>
                <p style= {{marginLeft: '80px' }}>{0.008 * text.split(" ").filter((element)=>{return element.length!== 0 }).length} minutes read</p>
                <h3>Preview</h3>
                <p style= {{marginLeft: '80px' }} >{text.length>0? text : 'No text Entered Yet'}</p>
            </div>

            <div className='container my-4' style={{backgroundColor : props.mode === 'light' ? 'white':'black' }}>
            <h2 className='mu-4'>About Us</h2>
            <div className="accordion" id="accordionExample" style={{backgroundColor : props.mode === 'light' ? 'white':'black' }}>
                <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button" style={{backgroundColor : props.mode === 'light' ? 'white':'black' , color : props.mode === 'light' ? 'black':'white'}} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Accordion Item #1
                    </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                    <div className="accordion-body" style={{backgroundColor : props.mode === 'light' ? 'white':'black' , color : props.mode === 'light' ? 'black':'white'}}>
                    <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                    </div>
                </div>
                </div>
                <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button collapsed" style={{backgroundColor : props.mode === 'light' ? 'white':'black' , color : props.mode === 'light' ? 'black':'white'}} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Accordion Item #2
                    </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div className="accordion-body" style={{backgroundColor : props.mode === 'light' ? 'white':'black' , color : props.mode === 'light' ? 'black':'white'}}>
                    <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                    </div>
                </div>
                </div>
                <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button collapsed" style={{backgroundColor : props.mode === 'light' ? 'white':'black' , color : props.mode === 'light' ? 'black':'white'}} type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Accordion Item #3
                    </button>
                </h2>
                <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div className="accordion-body" style={{backgroundColor : props.mode === 'light' ? 'white':'black' , color : props.mode === 'light' ? 'black':'white'}}>
                    <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    </>
  )
}
