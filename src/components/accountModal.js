import { CopyToClipboard } from 'react-copy-to-clipboard';
import React, { useEffect, useRef, useState } from 'react';
import { Snackbar, Button } from '@mui/material';

const FadeInSection = ({ children }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target); // 중복 관찰 방지
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
    >
      {children}
    </div>
  );
};


const accountModal = ({clickedAccountData, setClickedAccountData, copiedAccount, setCopiedAccount}) => {

    const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
    );

    const accountClick = (e) => {
        if (e.target.classList.contains("dismiss")) {
            setClickedAccountData(null);
            setCopiedAccount(null);
        }
    };

    const copyAccountNumber = async (account_number) => {
        // navigator.clipboard.writeText(account_number);
        setCopiedAccount(account_number);
        await delay(3000);
        setCopiedAccount(null);

    };

    return <>
    <div className="overlay dismiss" onClick={accountClick}>
        <div className="account-popup">
            <div className="account-info-area"></div>
            {clickedAccountData.map((item, index) => (
                <div key={index} className="account-info-each">
                    <div className="each-header">
                        <div className="each-title">{item.title}</div>
                    </div>
                    <hr className="each-line"></hr>
                    <div className="each-body">
                        <p className="each-account-text">
                            {item.bank_name} (예금주 : {item.account_owner}) <br/>
                            {item.account_number}
                        </p>
                        <CopyToClipboard
                        text={item.account_number}
                        onCopy={() => copyAccountNumber(item.account_number)}
                        >
                            <div className="each-copy-btn" 
                            >복사하기</div>
                        </CopyToClipboard>
                        
                    </div>
                    { copiedAccount === item.account_number && <FadeInSection><div className="copy-success">복사되었습니다.</div></FadeInSection>}
                    
                </div>
            ))}
            <div className="account-popup-close dismiss" onClick={accountClick}>닫기</div>
        </div>
    </div>
    </>

}

export default accountModal;
